import { NextResponse } from 'next/server';
import { WhatsAppClient } from '@/lib/whatsapp/client';
import { WhatsAppService } from '@/services/whatsapp.service';

/**
 * GET: Meta Webhook Verification Handler
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const verification = WhatsAppClient.verifyWebhook(mode, token, challenge);

    if (verification.isValid && verification.challenge) {
      console.log('[Meta Webhook] Successfully verified webhook subscription challenge.');
      return new NextResponse(verification.challenge, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    console.warn('[Meta Webhook] Unauthorized verification attempt:', { mode, tokenReceived: Boolean(token) });
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error: any) {
    console.error('[Meta Webhook] GET verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST: Meta Webhook Event Receiver (Delivery Receipts & Inbound Messages)
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // 1. Verify Cryptographic HMAC Signature
    const isSignatureValid = WhatsAppClient.verifyWebhookSignature(rawBody, signature);
    if (!isSignatureValid) {
      console.warn('[Meta Webhook] Invalid HMAC-SHA256 signature on POST payload.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Parse payload safely
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // 3. Process events asynchronously without blocking 200 OK return
    if (payload.object === 'whatsapp_business_account') {
      const result = await WhatsAppService.handleWebhookPayload(payload);
      console.log(`[Meta Webhook] Processed ${result.processed} WhatsApp status/message events.`);
    }

    // Always respond 200 OK to Meta to acknowledge event receipt
    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
  } catch (error: any) {
    console.error('[Meta Webhook] POST processing error:', error);
    // Return 200 to prevent Meta webhook delivery retries on unhandled application bugs
    return NextResponse.json({ status: 'ERROR_RECORDED' }, { status: 200 });
  }
}
