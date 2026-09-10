import Razorpay from 'razorpay';
import crypto from 'node:crypto';

/**
 * Returns Razorpay instance initialized with server environment secrets.
 */
export function getRazorpayClient(): Razorpay {
  const rawKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const rawKeySecret = process.env.RAZORPAY_KEY_SECRET;

  const keyId = rawKeyId ? rawKeyId.trim().replace(/^["']|["']$/g, '') : '';
  const keySecret = rawKeySecret ? rawKeySecret.trim().replace(/^["']|["']$/g, '') : '';

  if (!keyId || !keySecret) {
    throw new Error(
      'Razorpay credentials are not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env'
    );
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

/**
 * Returns sanitized server-side Key ID (safe to share with client)
 */
export function getRazorpayKeyId(): string {
  const rawKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  return rawKeyId ? rawKeyId.trim().replace(/^["']|["']$/g, '') : '';
}

/**
 * Returns true if Razorpay server credentials are validly configured.
 */
export function isRazorpayConfigured(): boolean {
  const rawKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const rawKeySecret = process.env.RAZORPAY_KEY_SECRET;
  const keyId = rawKeyId ? rawKeyId.trim().replace(/^["']|["']$/g, '') : '';
  const keySecret = rawKeySecret ? rawKeySecret.trim().replace(/^["']|["']$/g, '') : '';
  return Boolean(keyId && keySecret && !keyId.includes('your_key_id') && !keySecret.includes('your_'));
}

/**
 * Validates the Razorpay Payment Signature on server-side using HMAC SHA-256.
 *
 * Algorithm:
 * generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret)
 */
export function verifyRazorpayPaymentSignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const rawKeySecret = process.env.RAZORPAY_KEY_SECRET;
  const keySecret = rawKeySecret ? rawKeySecret.trim().replace(/^["']|["']$/g, '') : '';
  if (!keySecret) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured on the server');
  }

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(payload)
    .digest('hex');

  try {
    const signatureBuffer = Buffer.from(razorpaySignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch {
    return expectedSignature === razorpaySignature;
  }
}

/**
 * Validates Razorpay Webhook Signature using HMAC SHA-256 and secret.
 */
export function verifyRazorpayWebhookSignature({
  rawBody,
  signatureHeader,
}: {
  rawBody: string;
  signatureHeader: string | null | undefined;
}): boolean {
  const rawWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const webhookSecret = rawWebhookSecret ? rawWebhookSecret.trim().replace(/^["']|["']$/g, '') : '';
  if (!webhookSecret) {
    throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured on the server');
  }

  if (!signatureHeader || !rawBody) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  try {
    const headerBuffer = Buffer.from(signatureHeader, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (headerBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(headerBuffer, expectedBuffer);
  } catch {
    return expectedSignature === signatureHeader;
  }
}
