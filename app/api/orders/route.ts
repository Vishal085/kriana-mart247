import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { OrderService } from '@/services/orders.service';
import { checkoutSchema } from '@/validators';

export async function GET() {
  try {
    const user = await requireCustomer();
    const orders = await OrderService.getCustomerOrders(user.id);
    return NextResponse.json({ orders });
  } catch (error: any) {
    if (error.message.includes('Forbidden') || error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid checkout information', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const order = await OrderService.createOrder(user.id, parsed.data);
    return NextResponse.json({ message: 'Order placed successfully', order }, { status: 201 });
  } catch (error: any) {
    if (error.message.includes('Forbidden') || error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login to checkout' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 400 });
  }
}
