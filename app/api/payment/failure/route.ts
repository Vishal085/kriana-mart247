import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { PaymentService } from '@/services/payment.service';
import { paymentFailureSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = paymentFailureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid failure payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const order = await PaymentService.handlePaymentFailure(
      parsed.data.orderId,
      user.id,
      {
        errorCode: parsed.data.errorCode,
        errorDescription: parsed.data.errorDescription,
        errorReason: parsed.data.errorReason,
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Payment failure recorded',
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process failure report' },
      { status: 400 }
    );
  }
}
