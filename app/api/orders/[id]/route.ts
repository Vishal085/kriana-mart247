import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { OrderService } from '@/services/orders.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireCustomer();
    const { id } = await params;

    const order = await OrderService.getCustomerOrderById(user.id, id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized or not found' }, { status: 401 });
  }
}
