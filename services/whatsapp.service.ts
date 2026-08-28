import { prisma } from '@/lib/prisma';

export type WhatsAppOrderPayload = {
  orderId: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  items: Array<{ name: string; quantity: number; unit: string; subtotal: number }>;
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  total: number;
  address: string;
  city: string;
  pincode: string;
  orderDate: Date;
  status: string;
};

export class WhatsAppService {
  static isConfigured(): boolean {
    return Boolean(
      process.env.WHATSAPP_API_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID
    );
  }

  static async sendOrderNotification(payload: WhatsAppOrderPayload) {
    if (!this.isConfigured()) {
      // Log as NOT_CONFIGURED
      await prisma.whatsAppNotificationLog.create({
        data: {
          orderId: payload.orderId,
          status: 'NOT_CONFIGURED',
          failureReason: 'WhatsApp Cloud API credentials (WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID) not configured in environment',
        },
      });

      return {
        success: false,
        status: 'NOT_CONFIGURED',
        message: 'WhatsApp API credentials not set in environment.',
      };
    }

    try {
      const itemsList = payload.items
        .map((i) => `• ${i.name} x ${i.quantity} ${i.unit} (₹${i.subtotal.toFixed(2)})`)
        .join('\n');

      const messageBody = `🛒 *KiranaMart247 - Order Confirmation*\n\n` +
        `Hello ${payload.customerName},\n` +
        `Your order *${payload.orderNumber}* has been placed successfully!\n\n` +
        `*Items:*\n${itemsList}\n\n` +
        `Subtotal: ₹${payload.subtotal.toFixed(2)}\n` +
        `Tax: ₹${payload.tax.toFixed(2)}\n` +
        `Delivery: ₹${payload.deliveryCharge.toFixed(2)}\n` +
        `*Total: ₹${payload.total.toFixed(2)}*\n\n` +
        `*Delivery Address:* ${payload.address}, ${payload.city} - ${payload.pincode}\n` +
        `Status: ${payload.status}\n\n` +
        `Thank you for choosing KiranaMart247 - Today's Wholesale Rates!`;

      const response = await fetch(
        `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: payload.phone.startsWith('91') ? payload.phone : `91${payload.phone}`,
            type: 'text',
            text: { body: messageBody },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result?.error?.message || 'WhatsApp Cloud API request failed';
        await prisma.whatsAppNotificationLog.create({
          data: {
            orderId: payload.orderId,
            status: 'FAILED',
            failureReason: errorMsg,
          },
        });
        return { success: false, status: 'FAILED', error: errorMsg };
      }

      const messageId = result?.messages?.[0]?.id;
      await prisma.whatsAppNotificationLog.create({
        data: {
          orderId: payload.orderId,
          status: 'SENT',
          providerMessageId: messageId,
        },
      });

      return { success: true, status: 'SENT', messageId };
    } catch (err: any) {
      await prisma.whatsAppNotificationLog.create({
        data: {
          orderId: payload.orderId,
          status: 'FAILED',
          failureReason: err.message || 'Unknown network error',
        },
      });
      return { success: false, status: 'FAILED', error: err.message };
    }
  }

  static async retryNotification(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return this.sendOrderNotification({
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
  }
}
