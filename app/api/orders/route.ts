import { NextResponse } from 'next/server';
import { requireCustomer, getCurrentSessionUser } from '@/lib/auth';
import { OrderService } from '@/services/orders.service';
import { checkoutSchema } from '@/validators';

export async function GET() {
  try {
    const user = await requireCustomer();
    const orders = await OrderService.getCustomerOrders(user.id);
    return NextResponse.json({ orders });
  } catch (error: any) {
    const errorMsg =
      error?.message ||
      error?.error?.description ||
      (typeof error === 'string' ? error : 'Failed to fetch orders');

    if (errorMsg.includes('Forbidden') || errorMsg.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentSessionUser();
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const errorMessage = firstIssue?.message || 'Invalid checkout information';
      return NextResponse.json(
        { error: errorMessage, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const order = await OrderService.createOrder(user?.id || '', parsed.data);
    return NextResponse.json({ message: 'Order placed successfully', order }, { status: 201 });
  } catch (error: any) {
    const errorMsg =
      error?.message ||
      error?.error?.description ||
      (typeof error === 'string' ? error : 'Checkout failed');

    if (errorMsg.includes('Forbidden') || errorMsg.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login to checkout' }, { status: 401 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}
