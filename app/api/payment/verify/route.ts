import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { PaymentService } from '@/services/payment.service';
import { paymentVerifySchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = paymentVerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payment verification payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const result = await PaymentService.verifyPayment(user.id, parsed.data);

    return NextResponse.json({
      message: 'Payment verified and order confirmed successfully',
      ...result,
    });
  } catch (error: any) {
    const errorMsg =
      error?.message ||
      error?.error?.description ||
      (typeof error === 'string' ? error : 'Payment verification failed');

    if (errorMsg.includes('Forbidden') || errorMsg.includes('Unauthorized')) {
      return NextResponse.json({ error: errorMsg }, { status: 401 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}
