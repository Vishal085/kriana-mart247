import { NextResponse } from 'next/server';
import { PaymentService } from '@/services/payment.service';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const result = await PaymentService.processWebhook(rawBody, signature);

    return NextResponse.json({
      status: 'ok',
      ...result,
    });
  } catch (error: any) {
    console.error('[Razorpay Webhook Error]:', error.message);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
