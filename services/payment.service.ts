import { prisma } from '@/lib/prisma';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import {
  getRazorpayClient,
  isRazorpayConfigured,
  verifyRazorpayPaymentSignature,
  verifyRazorpayWebhookSignature,
} from '@/lib/razorpay';
import { NotificationService } from './notifications.service';
import { WhatsAppService } from './whatsapp.service';

export interface RazorpayOrderResponse {
  keyId: string;
  razorpayOrderId: string;
  amount: number; // in paise
  currency: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
}

export class PaymentService {
  /**
   * Generates or fetches a Razorpay Order for an existing database order.
   * Total is calculated and enforced strictly from the database order.
   */
  static async createRazorpayOrder(
    orderId: string,
    userId?: string
  ): Promise<RazorpayOrderResponse> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: { id: true, fullName: true, email: true, mobile: true },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (userId && order.userId !== userId) {
      throw new Error('Forbidden: You do not have access to this order');
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new Error('This order has already been paid successfully.');
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      'rzp_test_51KIRANAMART24';

    // Amount strictly in paise (1 INR = 100 Paise)
    const amountInPaise = Math.round(Number(order.total) * 100);

    // If order already has a valid razorpayOrderId linked, reuse it unless forcing regeneration
    if (order.razorpayOrderId && order.paymentStatus === PaymentStatus.PENDING) {
      return {
        keyId,
        razorpayOrderId: order.razorpayOrderId,
        amount: amountInPaise,
        currency: 'INR',
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.deliveryName || order.user.fullName,
        customerPhone: order.deliveryPhone || order.user.mobile || '',
        customerEmail: order.user.email,
      };
    }

    let razorpayOrderId = '';

    // Create official Razorpay order using Razorpay API
    const razorpay = getRazorpayClient();
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.orderNumber.slice(0, 40),
      notes: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: order.userId,
      },
    };

    try {
      const rzpOrder = await razorpay.orders.create(options);
      razorpayOrderId = rzpOrder.id;
    } catch (rzpErr: any) {
      const errDesc = rzpErr?.error?.description || rzpErr?.message || '';
      console.error(
        '[Razorpay Server Error]: Order creation failed:',
        errDesc || 'Unknown API Error'
      );
      if (
        errDesc.toLowerCase().includes('auth') ||
        errDesc.toLowerCase().includes('key') ||
        errDesc.toLowerCase().includes('credential')
      ) {
        throw new Error(
          'Payment gateway configuration error. Please verify that your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env are valid and match your Razorpay Dashboard.'
        );
      }
      throw new Error(
        errDesc
          ? `Payment Gateway Error: ${errDesc}`
          : 'Payment gateway configuration error. Please contact support.'
      );
    }

    // Save razorpayOrderId to the Order
    await prisma.order.update({
      where: { id: order.id },
      data: {
        razorpayOrderId,
        paymentStatus: PaymentStatus.PENDING,
      },
    });

    return {
      keyId,
      razorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerName: order.deliveryName || order.user.fullName,
      customerPhone: order.deliveryPhone || order.user.mobile || '',
      customerEmail: order.user.email,
    };
  }

  /**
   * Verifies Razorpay Payment Signature server-side and marks order as PAID and CONFIRMED.
   */
  static async verifyPayment(
    userId: string,
    payload: {
      orderId: string;
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      paymentMethod?: string | null;
    }
  ) {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = payload;

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found or unauthorized');
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return {
        success: true,
        alreadyPaid: true,
        order,
      };
    }

    // Server-side HMAC SHA-256 signature verification (MANDATORY)
    const isSignatureValid = verifyRazorpayPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isSignatureValid) {
      // Record failed attempt
      await this.handlePaymentFailure(order.id, userId, {
        errorDescription: 'Signature verification failed on server',
      });
      throw new Error('Security Error: Razorpay payment signature verification failed');
    }

    // Attempt to inspect payment method from Razorpay API
    let paymentMethod = payload.paymentMethod || 'RAZORPAY';
    if (isRazorpayConfigured()) {
      try {
        const razorpay = getRazorpayClient();
        const paymentDetails = await razorpay.payments.fetch(razorpayPaymentId);
        if (paymentDetails && paymentDetails.method) {
          paymentMethod = paymentDetails.method.toUpperCase();
        }
      } catch (err) {
        console.warn('Could not fetch detailed payment method from Razorpay:', err);
      }
    }

    const now = new Date();

    // Atomic transaction to update order and status log
    const updatedOrder = await prisma.$transaction(async (tx) => {
      const ord = await tx.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: PaymentStatus.PAID,
          status: OrderStatus.CONFIRMED,
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          paymentMethod,
          paidAt: now,
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status: OrderStatus.CONFIRMED,
          note: `Payment verified successfully via Razorpay (${paymentMethod}). Transaction ID: ${razorpayPaymentId}`,
        },
      });

      return ord;
    });

    // 1. Notify Customer in-app
    try {
      await NotificationService.createNotification(
        order.userId,
        'ORDER',
        'Payment Successful & Order Confirmed',
        `Your payment of ₹${Number(order.total).toFixed(
          2
        )} for order #${order.orderNumber} was successfully verified (ID: ${razorpayPaymentId}). We are preparing your order!`
      );
    } catch (e) {
      console.error('Customer payment notification error:', e);
    }

    // 2. Notify Admins in-app
    try {
      await NotificationService.notifyAdmins(
        'ORDER',
        'New Paid Order Received',
        `Order #${order.orderNumber} for ₹${Number(order.total).toFixed(
          2
        )} received from ${order.deliveryName} (${paymentMethod}).`
      );
    } catch (e) {
      console.error('Admin payment notification error:', e);
    }

    // 3. Trigger WhatsApp Order Receipt Notification (non-blocking)
    let whatsappReceipt: any = null;
    try {
      whatsappReceipt = await WhatsAppService.sendOrderReceipt(order.id, true);
    } catch (err) {
      console.error('WhatsApp order receipt dispatch error:', err);
    }

    return {
      success: true,
      order: updatedOrder,
      whatsappDirectUrl: whatsappReceipt?.directUrl || null,
    };
  }

  /**
   * Records a payment failure or cancellation without prematurely altering confirmed state.
   */
  static async handlePaymentFailure(
    orderId: string,
    userId: string,
    details?: {
      errorCode?: string | null;
      errorDescription?: string | null;
      errorReason?: string | null;
    }
  ) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) return null;

    if (order.paymentStatus === PaymentStatus.PAID) {
      return order; // Do not overwrite paid order
    }

    const note = details?.errorDescription
      ? `Payment attempt failed: ${details.errorDescription} (${details.errorCode || 'UNKNOWN'})`
      : 'Payment cancelled or incomplete';

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.FAILED,
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status: order.status,
          note,
        },
      });

      return res;
    });

    return updated;
  }

  /**
   * Processes incoming Razorpay Webhook with timing-safe signature verification.
   */
  static async processWebhook(rawBody: string, signature: string | null | undefined) {
    if (isRazorpayConfigured()) {
      const isValid = verifyRazorpayWebhookSignature({
        rawBody,
        signatureHeader: signature,
      });

      if (!isValid) {
        throw new Error('Invalid Razorpay Webhook Signature');
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    // Handle Payment / Order Success events
    if (eventType === 'order.paid' || eventType === 'payment.captured') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
      const razorpayPaymentId = paymentEntity?.id;
      const paymentMethod = paymentEntity?.method?.toUpperCase() || 'RAZORPAY';

      if (razorpayOrderId) {
        const order = await prisma.order.findUnique({
          where: { razorpayOrderId },
        });

        if (order && order.paymentStatus !== PaymentStatus.PAID) {
          const now = new Date();
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: order.id },
              data: {
                paymentStatus: PaymentStatus.PAID,
                status: OrderStatus.CONFIRMED,
                razorpayPaymentId: razorpayPaymentId || order.razorpayPaymentId,
                paymentMethod,
                paidAt: now,
              },
            });

            await tx.orderStatusHistory.create({
              data: {
                orderId: order.id,
                status: OrderStatus.CONFIRMED,
                note: `Payment verified via Razorpay Webhook (${eventType}). Method: ${paymentMethod}`,
              },
            });
          });

          // Dispatches
          try {
            await NotificationService.createNotification(
              order.userId,
              'ORDER',
              'Payment Verified via Webhook',
              `Your payment for order #${order.orderNumber} has been verified.`
            );
            await WhatsAppService.sendOrderStatusNotification(order.id, OrderStatus.CONFIRMED);
          } catch (e) {
            console.error('Webhook notification dispatch error:', e);
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      if (razorpayOrderId) {
        const order = await prisma.order.findUnique({
          where: { razorpayOrderId },
        });
        if (order && order.paymentStatus !== PaymentStatus.PAID) {
          await prisma.order.update({
            where: { id: order.id },
            data: { paymentStatus: PaymentStatus.FAILED },
          });
        }
      }
    } else if (eventType === 'refund.processed') {
      const refundEntity = event.payload?.refund?.entity;
      const paymentId = refundEntity?.payment_id;
      if (paymentId) {
        const order = await prisma.order.findUnique({
          where: { razorpayPaymentId: paymentId },
        });
        if (order) {
          await prisma.order.update({
            where: { id: order.id },
            data: { paymentStatus: PaymentStatus.REFUNDED },
          });
        }
      }
    }

    return { processed: true, event: eventType };
  }
}
