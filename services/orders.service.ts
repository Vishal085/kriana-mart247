import { prisma } from '@/lib/prisma';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { z } from 'zod';
import { checkoutSchema } from '@/validators';
import { WhatsAppService } from './whatsapp.service';
import { NotificationService } from './notifications.service';
import { PaymentService } from './payment.service';

export class OrderService {
  static async createOrder(userId: string, input: z.infer<typeof checkoutSchema>) {
    let targetUserId = userId;

    // If guest user, find or create customer record linked to mobile number
    if (!targetUserId) {
      const cleanPhone = (input.deliveryPhone || '').replace(/\D/g, '').trim();
      let existingUser = await prisma.user.findFirst({
        where: { mobile: cleanPhone },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            fullName: input.deliveryName,
            mobile: cleanPhone,
            passwordHash: '$2b$10$V0rols.Px0V10tRQH87S3OKUGcuaIVQYK70evDuLHEGklUMcPi23q',
            role: 'CUSTOMER',
            whatsappOptIn: input.whatsappOptIn ?? true,
          },
        });
      }
      targetUserId = existingUser.id;
    }

    interface OrderLineItem {
      productId: string;
      product: any;
      quantity: number;
    }
    let orderItemsToCreate: OrderLineItem[] = [];

    // 1. Check database cart first
    const cart = await prisma.cart.findUnique({
      where: { userId: targetUserId },
      include: {
        items: {
          include: {
            product: {
              include: { brand: true },
            },
          },
        },
      },
    });

    if (cart && cart.items.length > 0) {
      orderItemsToCreate = cart.items.map((i: any) => ({
        productId: i.productId,
        product: i.product,
        quantity: i.quantity,
      }));
    } else if (input.items && input.items.length > 0) {
      // 2. Guest cart items passed directly from frontend localStorage
      const productIds = input.items.map((i) => i.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        include: { brand: true },
      });

      for (const it of input.items) {
        const prod = products.find((p: any) => p.id === it.productId);
        if (prod) {
          orderItemsToCreate.push({
            productId: it.productId,
            product: prod,
            quantity: it.quantity,
          });
        }
      }
    }

    if (orderItemsToCreate.length === 0) {
      throw new Error('Your cart is empty. Please add items before checking out.');
    }

    // Verify product availability and calculate server totals
    let subtotal = 0;
    for (const item of orderItemsToCreate) {
      if (!item.product.active) {
        throw new Error(`Product "${item.product.name}" is currently unavailable.`);
      }

      if (item.quantity < (item.product.minimumQuantity || 1)) {
        throw new Error(`Minimum quantity for "${item.product.name}" is ${item.product.minimumQuantity || 1}`);
      }

      if (item.product.maximumQuantity && item.quantity > item.product.maximumQuantity) {
        throw new Error(`Maximum quantity for "${item.product.name}" is ${item.product.maximumQuantity}`);
      }

      subtotal += Number(item.product.retailPrice) * item.quantity;
    }

    // FMCG & Kirana prices are strictly inclusive of all taxes
    const tax = 0;
    const deliveryCharge = subtotal >= 500 ? 0 : 40;
    const total = subtotal + tax + deliveryCharge;
    const isCOD = (input.paymentMethod || 'COD') === 'COD';

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `KIR-${dateStr}-${randomSuffix}`;

    // Execute atomic transaction to create order
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: targetUserId,
          status: isCOD ? OrderStatus.CONFIRMED : OrderStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          paymentMethod: isCOD ? 'COD' : 'ONLINE',
          subtotal,
          tax,
          deliveryCharge,
          total,
          deliveryName: input.deliveryName,
          deliveryPhone: input.deliveryPhone,
          deliveryAddress: input.deliveryAddress,
          city: input.city,
          pincode: input.pincode,
          customerNotes: input.customerNotes || null,
          whatsappOptIn: input.whatsappOptIn ?? true,
          items: {
            create: orderItemsToCreate.map((item) => ({
              productId: item.productId,
              productNameSnapshot: item.product.name,
              brandSnapshot: item.product.brand?.name || 'Generic',
              unit: item.product.unit,
              quantity: item.quantity,
              unitPrice: item.product.retailPrice,
              subtotal: Number(item.product.retailPrice) * item.quantity,
            })),
          },
          statusHistory: {
            create: [
              {
                status: isCOD ? OrderStatus.CONFIRMED : OrderStatus.PENDING,
                note: isCOD
                  ? 'Order placed with Cash on Delivery (Pay on Delivery)'
                  : 'Order initiated awaiting online payment',
              },
            ],
          },
        },
        include: {
          items: true,
          statusHistory: true,
        },
      });

      // Clear customer's cart if exists
      if (cart) {
        await tx.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }

      return newOrder;
    });

    // Trigger in-app notifications (non-blocking)
    NotificationService.createNotification(
      targetUserId,
      'ORDER' as any,
      `Order #${order.orderNumber} Placed`,
      `Your order #${order.orderNumber} for ₹${order.total} has been received successfully.`
    ).catch((e) => console.warn('Order in-app notification error:', e?.message || e));

    NotificationService.notifyAdmins(
      'ORDER' as any,
      `New Order: #${order.orderNumber}`,
      `New order received from ${order.deliveryName} for ₹${order.total} (${order.paymentMethod}).`
    ).catch((e) => console.warn('Admin notification error:', e?.message || e));

    // If COD, send immediate WhatsApp notification and return without Razorpay order
    if (isCOD) {
      if (input.whatsappOptIn) {
        WhatsAppService.sendOrderStatusNotification(order.id, OrderStatus.CONFIRMED).catch((e) =>
          console.warn('WhatsApp COD notification trigger notice:', e?.message || e)
        );
      }
      return {
        ...order,
        razorpayOrder: null,
      };
    }

    // Create Razorpay Order securely from server for ONLINE payments
    const razorpayOrder = await PaymentService.createRazorpayOrder(order.id, targetUserId);

    return {
      ...order,
      razorpayOrder,
    };
  }

  static async getCustomerOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
        whatsappMessages: { orderBy: { createdAt: 'desc' }, take: 1 },
        whatsappLogs: { orderBy: { sentAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getCustomerOrderById(userId: string, orderId: string) {
    return prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
        whatsappMessages: { orderBy: { createdAt: 'desc' } },
        whatsappLogs: { orderBy: { sentAt: 'desc' } },
      },
    });
  }

  static async getAllOrdersAdmin({
    status,
    paymentStatus,
    search,
    page = 1,
    limit = 20,
  }: {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;
    const where = {
      ...(status ? { status } : {}),
      ...(paymentStatus ? { paymentStatus } : {}),
      ...(search
        ? {
          OR: [
            { orderNumber: { contains: search, mode: 'insensitive' as const } },
            { deliveryName: { contains: search, mode: 'insensitive' as const } },
            { deliveryPhone: { contains: search, mode: 'insensitive' as const } },
            { city: { contains: search, mode: 'insensitive' as const } },
            { razorpayPaymentId: { contains: search, mode: 'insensitive' as const } },
            { razorpayOrderId: { contains: search, mode: 'insensitive' as const } },
          ],
        }
        : {}),
    };


    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          statusHistory: { orderBy: { createdAt: 'desc' }, take: 1 },
          whatsappMessages: { orderBy: { createdAt: 'desc' }, take: 1 },
          whatsappLogs: { orderBy: { sentAt: 'desc' }, take: 1 },
          user: { select: { id: true, fullName: true, email: true, mobile: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getOrderByIdAdmin(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
        whatsappMessages: { orderBy: { createdAt: 'desc' } },
        whatsappLogs: { orderBy: { sentAt: 'desc' } },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            mobile: true,
            customerProfile: true,
          },
        },
      },
    });
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus, note?: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          note: note || `Status updated to ${status}`,
        },
      });

      return res;
    });

    // Notify customer via In-App notification
    try {
      await NotificationService.createNotification(
        order.userId,
        'ORDER',
        `Order #${order.orderNumber} ${status}`,
        `Your order #${order.orderNumber} is now ${status}. ${note ? `Note: ${note}` : ''}`
      );
    } catch (e) {
      console.error('Notification error:', e);
    }

    // Trigger WhatsApp lifecycle template notification (non-blocking)
    try {
      await WhatsAppService.sendOrderStatusNotification(orderId, status, note);
    } catch (err) {
      console.error('WhatsApp lifecycle notification error:', err);
    }

    return updated;
  }
}
