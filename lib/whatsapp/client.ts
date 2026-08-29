import crypto from 'node:crypto';
import {
  MetaSendResponse,
  MetaTemplateMessagePayload,
  MetaTextMessagePayload,
} from './types';
import { maskPhoneNumber, normalizePhoneNumber } from '../phone';

export interface WhatsAppConfig {
  phoneNumberId?: string;
  businessAccountId?: string;
  accessToken?: string;
  verifyToken?: string;
  appSecret?: string;
  apiVersion: string;
  baseUrl: string;
}

export type WhatsAppSendResult = {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
  simulated?: boolean;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
};

/**
 * Meta WhatsApp Cloud API Client
 */
export class WhatsAppClient {
  private static getConfig(): WhatsAppConfig {
    return {
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
      businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_API_TOKEN || '',
      verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'kiranamart_whatsapp_verify_token_2026',
      appSecret: process.env.WHATSAPP_APP_SECRET || '',
      apiVersion: process.env.WHATSAPP_API_VERSION || 'v21.0',
      baseUrl: process.env.WHATSAPP_BASE_URL || 'https://graph.facebook.com',
    };
  }

  /**
   * Check if production Meta Cloud API credentials are fully configured
   */
  static isConfigured(): boolean {
    const config = this.getConfig();
    return Boolean(config.phoneNumberId && config.accessToken);
  }

  /**
   * Verify Meta Webhook verification query during initial setup
   */
  static verifyWebhook(
    mode: string | null | undefined,
    token: string | null | undefined,
    challenge: string | null | undefined
  ): { isValid: boolean; challenge?: string } {
    const config = this.getConfig();
    if (mode === 'subscribe' && token === config.verifyToken && challenge) {
      return { isValid: true, challenge };
    }
    return { isValid: false };
  }

  /**
   * Verify HMAC-SHA256 signature of incoming Meta webhook POST requests
   */
  static verifyWebhookSignature(rawBody: string, signatureHeader: string | null | undefined): boolean {
    const config = this.getConfig();
    // If no app secret is set in dev, allow requests with warning
    if (!config.appSecret) {
      return true;
    }

    if (!signatureHeader) {
      return false;
    }

    const [prefix, signature] = signatureHeader.split('=');
    if (prefix !== 'sha256' || !signature) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', config.appSecret)
      .update(rawBody, 'utf8')
      .digest('hex');

    const signatureBuf = Buffer.from(signature, 'hex');
    const expectedBuf = Buffer.from(expectedSignature, 'hex');

    if (signatureBuf.length !== expectedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(signatureBuf, expectedBuf);
  }

  /**
   * Send Meta-Approved Template Message
   */
  static async sendTemplate(
    toPhone: string,
    templateName: string,
    components: any[] = [],
    languageCode = 'en'
  ): Promise<WhatsAppSendResult> {
    const norm = normalizePhoneNumber(toPhone);
    if (!norm.isValid) {
      return {
        success: false,
        error: `Invalid recipient phone number: ${toPhone}`,
        errorCode: 'INVALID_PHONE_NUMBER',
        status: 'FAILED',
      };
    }

    const payload: MetaTemplateMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: norm.digits,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        ...(components.length > 0 ? { components } : {}),
      },
    };

    return this.dispatchMessage(payload, norm.digits);
  }

  /**
   * Send Standard Text Message (Customer Service window / replies)
   */
  static async sendText(
    toPhone: string,
    text: string,
    previewUrl = false
  ): Promise<WhatsAppSendResult> {
    const norm = normalizePhoneNumber(toPhone);
    if (!norm.isValid) {
      return {
        success: false,
        error: `Invalid recipient phone number: ${toPhone}`,
        errorCode: 'INVALID_PHONE_NUMBER',
        status: 'FAILED',
      };
    }

    const payload: MetaTextMessagePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: norm.digits,
      type: 'text',
      text: {
        preview_url: previewUrl,
        body: text,
      },
    };

    return this.dispatchMessage(payload, norm.digits);
  }

  /**
   * Dispatches payload to Meta Graph API or runs safe local simulation
   */
  private static async dispatchMessage(
    payload: MetaTemplateMessagePayload | MetaTextMessagePayload,
    recipientDigits: string
  ): Promise<WhatsAppSendResult> {
    const config = this.getConfig();

    // Production Meta API Dispatch
    if (this.isConfigured()) {
      try {
        const url = `${config.baseUrl}/${config.apiVersion}/${config.phoneNumberId}/messages`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result: any = await response.json();

        if (!response.ok) {
          const errorDetail = result?.error;
          const errorMsg = errorDetail?.message || 'WhatsApp Cloud API request failed';
          const errorCode = String(errorDetail?.code || 'META_API_ERROR');

          console.error(`[WhatsApp] Delivery failure to ${maskPhoneNumber(recipientDigits)}:`, errorMsg);

          return {
            success: false,
            error: errorMsg,
            errorCode,
            status: 'FAILED',
          };
        }

        const messageId = result?.messages?.[0]?.id || `wamid.${Date.now()}`;
        return {
          success: true,
          messageId,
          status: 'SENT',
        };
      } catch (err: any) {
        console.error(`[WhatsApp] Network exception dispatching to ${maskPhoneNumber(recipientDigits)}:`, err.message);
        return {
          success: false,
          error: err.message || 'Network communication error with Meta API',
          errorCode: 'NETWORK_ERROR',
          status: 'FAILED',
        };
      }
    }

    // Development / Sandbox Simulation Mode
    const simulatedMessageId = `sim_wamid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return {
      success: true,
      messageId: simulatedMessageId,
      simulated: true,
      status: 'SENT',
    };
  }
}
