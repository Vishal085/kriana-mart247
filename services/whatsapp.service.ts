import { prisma } from '@/lib/prisma';
import { OrderStatus, WhatsAppMessageStatus, WhatsAppMessageType } from '@prisma/client';
import { WhatsAppClient } from '@/lib/whatsapp/client';
import { WhatsAppTemplateBuilder, WhatsAppTemplateName } from '@/lib/whatsapp/templates';
import { normalizePhoneNumber } from '@/lib/phone';
import { MetaWebhookPayload } from '@/lib/whatsapp/types';

export class WhatsAppService {
  /**
   * Generates 1-click WhatsApp Web chat URL
   */
  static getDirectWhatsAppUrl(phone: string, message: string): string {
    const norm = normalizePhoneNumber(phone);
    const recipient = norm.isValid ? norm.digits : phone.replace(/[^\d]/g, '');
    return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Check if production Meta Cloud API credentials are fully configured
   */
  static isConfigured(): boolean {
    return WhatsAppClient.isConfigured();
  }

  /**
   * Sends transactional WhatsApp message for an Order based on its status
   */
  static async sendOrderStatusNotification(
    orderId: string,
    status: OrderStatus = OrderStatus.PENDING,
    statusNote?: string
  ) {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: true,
          user: true,
        },
      });

      if (!order) {
        return { success: false, error: `Order ${orderId} not found` };
      }

      // Check customer opt-in consent
      if (!order.whatsappOptIn) {
        return { success: true, skipped: true, reason: 'CUSTOMER_OPTED_OUT' };
      }

      const phoneNorm = normalizePhoneNumber(order.deliveryPhone || order.user.mobile);
      if (!phoneNorm.isValid) {
        return { success: false, error: 'Invalid delivery phone number for WhatsApp' };
      }

      // Format order item summary
      const itemsSummary = order.items
        .slice(0, 3)
        .map((i) => `• ${i.productNameSnapshot} (${i.quantity} ${i.unit})`)
        .join('\n') + (order.items.length > 3 ? `\n• +${order.items.length - 3} more items` : '');

      const notificationData = {
        customerName: order.deliveryName || order.user.fullName || 'Valued Customer',
        orderNumber: order.orderNumber,
        total: Number(order.total),
        subtotal: Number(order.subtotal),
        deliveryCharge: Number(order.deliveryCharge),
        itemCount: order.items.reduce((acc, curr) => acc + curr.quantity, 0),
        address: order.deliveryAddress,
        city: order.city,
        pincode: order.pincode,
        itemsSummary,
        statusNote: statusNote || undefined,
        trackingNumber: `KM-EXP-${order.orderNumber.slice(-6)}`,
      };

      // Select Meta-approved template
      let templateBuild;
      switch (status) {
        case OrderStatus.CONFIRMED:
        case OrderStatus.PROCESSING:
          templateBuild = WhatsAppTemplateBuilder.buildOrderPacked(notificationData);
          break;
        case OrderStatus.DISPATCHED:
          templateBuild = WhatsAppTemplateBuilder.buildOrderShipped(notificationData);
          break;
        case OrderStatus.DELIVERED:
          templateBuild = WhatsAppTemplateBuilder.buildOrderDelivered(notificationData);
          break;
        case OrderStatus.CANCELLED:
          templateBuild = WhatsAppTemplateBuilder.buildOrderCancelled(notificationData);
          break;
        case OrderStatus.PENDING:
        default:
          templateBuild = WhatsAppTemplateBuilder.buildOrderConfirmation(notificationData);
          break;
      }

      // Idempotency check: Don't send the exact same template for the same order within 10 minutes
      const existingSent = await prisma.whatsAppMessage.findFirst({
        where: {
          orderId: order.id,
          templateName: templateBuild.templateName,
          status: { in: [WhatsAppMessageStatus.SENT, WhatsAppMessageStatus.DELIVERED, WhatsAppMessageStatus.READ] },
          createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) },
        },
      });

      if (existingSent) {
        return {
          success: true,
          skipped: true,
          reason: 'IDEMPOTENT_SUPPRESSION',
          messageId: existingSent.metaMessageId,
        };
      }

      // 1. Create Pending Record in WhatsAppMessage
      const messageRecord = await prisma.whatsAppMessage.create({
        data: {
          orderId: order.id,
          userId: order.userId,
          phoneNumber: phoneNorm.e164,
          messageType: WhatsAppMessageType.TEMPLATE,
          templateName: templateBuild.templateName,
          templateLanguage: 'en',
          status: WhatsAppMessageStatus.PENDING,
          payload: {
            variables: notificationData,
            components: templateBuild.components,
            fallbackText: templateBuild.fallbackText,
          },
        },
      });

      // 2. Dispatch via Meta Cloud API Client
      const result = await WhatsAppClient.sendTemplate(
        phoneNorm.digits,
        templateBuild.templateName,
        templateBuild.components,
        'en'
      );

      // 3. Update Record with dispatch result
      const now = new Date();
      await prisma.whatsAppMessage.update({
        where: { id: messageRecord.id },
        data: {
          status: result.success ? WhatsAppMessageStatus.SENT : WhatsAppMessageStatus.FAILED,
          metaMessageId: result.messageId || null,
          errorCode: result.errorCode || null,
          errorMessage: result.error || null,
          sentAt: result.success ? now : null,
          failedAt: !result.success ? now : null,
        },
      });

      // Maintain backward compatibility with legacy log table
      await prisma.whatsAppNotificationLog.create({
        data: {
          orderId: order.id,
          status: result.success ? 'SENT' : 'FAILED',
          providerMessageId: result.messageId || null,
          failureReason: result.error || null,
        },
      });

      return {
        success: result.success,
        messageId: result.messageId,
        simulated: result.simulated,
        error: result.error,
        directUrl: this.getDirectWhatsAppUrl(phoneNorm.digits, templateBuild.fallbackText),
      };
    } catch (err: any) {
      console.error('[WhatsAppService] Unexpected dispatch error:', err);
      return { success: false, error: err.message || 'Internal WhatsApp service error' };
    }
  }

  /**
   * Helper alias for order creation notification
   */
  static async sendOrderNotification(payload: {
    orderId: string;
    orderNumber: string;
    customerName: string;
    phone: string;
    items?: any[];
    subtotal?: number;
    tax?: number;
    deliveryCharge?: number;
    total: number;
    address: string;
    city: string;
    pincode: string;
    orderDate?: Date;
    status?: string;
  }) {
    return this.sendOrderStatusNotification(payload.orderId, OrderStatus.PENDING);
  }

  /**
   * Process incoming Meta Webhook events (Delivery Receipts + Inbound Messages)
   */
  static async handleWebhookPayload(payload: MetaWebhookPayload) {
    if (!payload || !payload.entry || !Array.isArray(payload.entry)) {
      return { processed: 0 };
    }

    let processedCount = 0;
    const now = new Date();

    for (const entry of payload.entry) {
      if (!entry.changes || !Array.isArray(entry.changes)) continue;

      for (const change of entry.changes) {
        const value = change.value;
        if (!value) continue;

        // 1. Process Message Delivery Status Updates (sent -> delivered -> read -> failed)
        if (value.statuses && Array.isArray(value.statuses)) {
          for (const statusObj of value.statuses) {
            const metaId = statusObj.id;
            const status = statusObj.status; // 'sent' | 'delivered' | 'read' | 'failed'

            let mappedStatus: WhatsAppMessageStatus = WhatsAppMessageStatus.SENT;
            if (status === 'delivered') mappedStatus = WhatsAppMessageStatus.DELIVERED;
            if (status === 'read') mappedStatus = WhatsAppMessageStatus.READ;
            if (status === 'failed') mappedStatus = WhatsAppMessageStatus.FAILED;

            const existing = await prisma.whatsAppMessage.findFirst({
              where: { metaMessageId: metaId },
            });

            if (existing) {
              await prisma.whatsAppMessage.update({
                where: { id: existing.id },
                data: {
                  status: mappedStatus,
                  deliveredAt: status === 'delivered' ? now : existing.deliveredAt,
                  readAt: status === 'read' ? now : existing.readAt,
                  failedAt: status === 'failed' ? now : existing.failedAt,
                  errorCode: statusObj.errors?.[0]?.code ? String(statusObj.errors[0].code) : existing.errorCode,
                  errorMessage: statusObj.errors?.[0]?.title || statusObj.errors?.[0]?.message || existing.errorMessage,
                },
              });
              processedCount++;
            }
          }
        }

        // 2. Process Inbound Messages (Customer Support Replies)
        if (value.messages && Array.isArray(value.messages)) {
          for (const msg of value.messages) {
            const fromPhone = normalizePhoneNumber(msg.from).e164;
            const messageBody = msg.text?.body || '[Media/Interactive message]';

            // Find matching user by phone
            const user = await prisma.user.findFirst({
              where: {
                OR: [
                  { mobile: msg.from },
                  { mobile: { contains: msg.from.slice(-10) } },
                ],
              },
            });

            // Log inbound message
            await prisma.whatsAppMessage.create({
              data: {
                userId: user?.id || null,
                phoneNumber: fromPhone,
                messageType: WhatsAppMessageType.TEXT,
                metaMessageId: msg.id,
                status: WhatsAppMessageStatus.READ,
                readAt: now,
                payload: {
                  inbound: true,
                  from: msg.from,
                  type: msg.type,
                  body: messageBody,
                  timestamp: msg.timestamp,
                },
              },
            });
            processedCount++;
          }
        }
      }
    }

    return { processed: processedCount };
  }

  /**
   * Retry sending a failed message
   */
  static async retryNotification(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new Error('Order not found');
    return this.sendOrderStatusNotification(order.id, order.status);
  }
}
