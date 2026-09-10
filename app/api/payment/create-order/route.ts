import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { PaymentService } from '@/services/payment.service';
import { createPaymentOrderSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = createPaymentOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid order ID provided', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const paymentOrder = await PaymentService.createRazorpayOrder(
      parsed.data.orderId,
      user.id
    );

    return NextResponse.json({
      success: true,
      paymentOrder,
    });
  } catch (error: any) {
    const errorMsg =
      error?.message ||
      error?.error?.description ||
      (typeof error === 'string' ? error : 'Failed to initialize payment order');

    if (errorMsg.includes('Forbidden') || errorMsg.includes('Unauthorized')) {
      return NextResponse.json({ error: errorMsg }, { status: 401 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}
