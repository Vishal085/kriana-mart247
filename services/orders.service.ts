import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { z } from 'zod';
import { checkoutSchema } from '@/validators';
import { WhatsAppService } from './whatsapp.service';
import { NotificationService } from './notifications.service';

export class OrderService {
  static async createOrder(userId: string, input: z.infer<typeof checkoutSchema>) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
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

    if (!cart || cart.items.length === 0) {
      throw new Error('Your cart is empty');
    }

    // Verify product availability and calculate server totals
    let subtotal = 0;
    for (const item of cart.items) {
      if (!item.product.active) {
        throw new Error(`Product "${item.product.name}" is currently unavailable.`);
      }

      if (item.quantity < item.product.minimumQuantity) {
        throw new Error(`Minimum quantity for "${item.product.name}" is ${item.product.minimumQuantity}`);
      }

      if (item.product.maximumQuantity && item.quantity > item.product.maximumQuantity) {
        throw new Error(`Maximum quantity for "${item.product.name}" is ${item.product.maximumQuantity}`);
      }

      subtotal += Number(item.product.retailPrice) * item.quantity;
    }

    const tax = subtotal * 0.05;
    const deliveryCharge = subtotal >= 1000 ? 0 : 40;
    const total = subtotal + tax + deliveryCharge;

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `KIR-${dateStr}-${randomSuffix}`;

    // Execute atomic transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: OrderStatus.PENDING,
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
          items: {
            create: cart.items.map((item) => ({
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
                status: OrderStatus.PENDING,
                note: 'Order placed by customer',
              },
            ],
          },
        },
        include: {
          items: true,
          statusHistory: true,
        },
      });

      // Clear customer's cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    // Create in-app notification
    try {
      await NotificationService.createNotification(
        userId,
        'ORDER',
        'Order Placed Successfully',
        `Your order #${order.orderNumber} for ₹${Number(order.total).toFixed(2)} has been received and is pending confirmation.`
      );
    } catch (e) {
      console.error('Notification error:', e);
    }

    // Trigger WhatsApp notification (non-blocking)
    try {
      await WhatsAppService.sendOrderNotification({
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.deliveryName,
        phone: order.deliveryPhone,
        items: order.items.map((i) => ({
          name: i.productNameSnapshot,
          quantity: i.quantity,
          unit: i.unit,
          subtotal: Number(i.subtotal),
        })),
        subtotal: Number(order.subtotal),
        tax: Number(order.tax),
        deliveryCharge: Number(order.deliveryCharge),
        total: Number(order.total),
        address: order.deliveryAddress,
        city: order.city,
        pincode: order.pincode,
        orderDate: order.createdAt,
        status: order.status,
      });
    } catch (err) {
      console.error('WhatsApp dispatch error:', err);
    }

    return order;
  }

  static async getCustomerOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
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
        whatsappLogs: { orderBy: { sentAt: 'desc' } },
      },
    });
  }

  static async getAllOrdersAdmin({
    status,
    search,
    page = 1,
    limit = 20,
  }: {
    status?: OrderStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;
    const where = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { orderNumber: { contains: search, mode: 'insensitive' as const } },
              { deliveryName: { contains: search, mode: 'insensitive' as const } },
              { deliveryPhone: { contains: search, mode: 'insensitive' as const } },
              { city: { contains: search, mode: 'insensitive' as const } },
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

    // Notify customer
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

    return updated;
  }
}
