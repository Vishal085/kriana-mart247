import { MetaTemplateComponent } from './types';

export interface OrderNotificationData {
  customerName: string;
  orderNumber: string;
  total: number;
  subtotal?: number;
  deliveryCharge?: number;
  itemCount?: number;
  address?: string;
  city?: string;
  pincode?: string;
  itemsSummary?: string;
  statusNote?: string;
  trackingNumber?: string;
}

export interface RateAlertData {
  customerName: string;
  commodityName: string;
  targetPrice: number;
  currentPrice: number;
  mandiName: string;
  unit: string;
}

export type WhatsAppTemplateName =
  | 'kiranamart_order_confirmation'
  | 'kiranamart_order_packed'
  | 'kiranamart_order_shipped'
  | 'kiranamart_out_for_delivery'
  | 'kiranamart_order_delivered'
  | 'kiranamart_order_cancelled'
  | 'kiranamart_rate_alert';

/**
 * Builds Meta Cloud API template components and plain-text fallback for WhatsApp messages
 */
export class WhatsAppTemplateBuilder {
  /**
   * 1. Order Confirmation Template
   */
  static buildOrderConfirmation(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_order_confirmation';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
          { type: 'text', text: `₹${data.total.toFixed(2)}` },
          { type: 'text', text: `${data.address || 'Address'}, ${data.city || 'Delhi'} - ${data.pincode || ''}` },
        ],
      },
    ];

    const fallbackText =
      `🛒 *KiranaMart — Order Confirmation*\n\n` +
      `Hello ${data.customerName},\n` +
      `Your order *#${data.orderNumber}* has been confirmed!\n\n` +
      `*Total Amount:* ₹${data.total.toFixed(2)}\n` +
      `*Delivery Address:* ${data.address || ''}, ${data.city || ''} - ${data.pincode || ''}\n\n` +
      (data.itemsSummary ? `*Items:*\n${data.itemsSummary}\n\n` : '') +
      `We are preparing your fresh kirana wholesale order.\n` +
      `Thank you for shopping with KiranaMart!`;

    return { templateName, components, fallbackText };
  }

  /**
   * 2. Order Packed Template
   */
  static buildOrderPacked(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_order_packed';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
          { type: 'text', text: `${data.itemCount || 1} items` },
        ],
      },
    ];

    const fallbackText =
      `📦 *KiranaMart — Order Packed & Ready*\n\n` +
      `Hello ${data.customerName},\n` +
      `Your order *#${data.orderNumber}* (${data.itemCount || 1} items) has been quality checked, packed, and is ready for dispatch.\n\n` +
      `Thank you for choosing KiranaMart!`;

    return { templateName, components, fallbackText };
  }

  /**
   * 3. Order Shipped Template
   */
  static buildOrderShipped(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_order_shipped';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
          { type: 'text', text: data.trackingNumber || 'Kirana Express Fleet' },
        ],
      },
    ];

    const fallbackText =
      `🚚 *KiranaMart — Order Dispatched*\n\n` +
      `Hello ${data.customerName},\n` +
      `Great news! Your order *#${data.orderNumber}* has been dispatched via ${data.trackingNumber || 'Kirana Express Fleet'}.\n\n` +
      `Your delivery will reach your doorstep shortly.`;

    return { templateName, components, fallbackText };
  }

  /**
   * 4. Out For Delivery Template
   */
  static buildOutForDelivery(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_out_for_delivery';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
          { type: 'text', text: `${data.address || ''}, ${data.city || ''}` },
        ],
      },
    ];

    const fallbackText =
      `🚴 *KiranaMart — Out for Delivery*\n\n` +
      `Hello ${data.customerName},\n` +
      `Our delivery executive is on the way with your order *#${data.orderNumber}*.\n\n` +
      `*Delivery Location:* ${data.address || ''}, ${data.city || ''}\n` +
      `Please ensure someone is available to receive the delivery.`;

    return { templateName, components, fallbackText };
  }

  /**
   * 5. Order Delivered Template
   */
  static buildOrderDelivered(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_order_delivered';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
        ],
      },
    ];

    const fallbackText =
      `✅ *KiranaMart — Order Delivered Successfully*\n\n` +
      `Hello ${data.customerName},\n` +
      `Your order *#${data.orderNumber}* has been successfully delivered!\n\n` +
      `We hope you are delighted with the quality and savings.\n` +
      `Have feedback? Reply directly to this message to chat with support.`;

    return { templateName, components, fallbackText };
  }

  /**
   * 6. Order Cancelled Template
   */
  static buildOrderCancelled(data: OrderNotificationData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_order_cancelled';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.orderNumber },
          { type: 'text', text: data.statusNote || 'Requested by customer / inventory adjustment' },
        ],
      },
    ];

    const fallbackText =
      `⚠️ *KiranaMart — Order Cancelled*\n\n` +
      `Hello ${data.customerName},\n` +
      `Your order *#${data.orderNumber}* has been cancelled.\n` +
      `*Reason:* ${data.statusNote || 'Customer cancellation / stock adjustment'}\n\n` +
      `If any amount was debited, it will be refunded back to your source account. Contact support for assistance.`;

    return { templateName, components, fallbackText };
  }

  /**
   * 7. Live Mandi Price Alert Template
   */
  static buildRateAlert(data: RateAlertData) {
    const templateName: WhatsAppTemplateName = 'kiranamart_rate_alert';
    const components: MetaTemplateComponent[] = [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: data.customerName },
          { type: 'text', text: data.commodityName },
          { type: 'text', text: `₹${data.currentPrice.toFixed(2)}/${data.unit}` },
          { type: 'text', text: data.mandiName },
        ],
      },
    ];

    const fallbackText =
      `📈 *KiranaMart — Mandi Price Alert Target Hit!*\n\n` +
      `Hello ${data.customerName},\n` +
      `Your price alert for *${data.commodityName}* has triggered.\n\n` +
      `*Current Mandi Rate:* ₹${data.currentPrice.toFixed(2)}/${data.unit}\n` +
      `*Target Rate:* ₹${data.targetPrice.toFixed(2)}/${data.unit}\n` +
      `*Mandi:* ${data.mandiName}\n\n` +
      `👉 Check latest market auction rates on KiranaMart.`;

    return { templateName, components, fallbackText };
  }
}
