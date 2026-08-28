import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { OrderService } from '@/services/orders.service';
import { orderStatusUpdateSchema } from '@/validators';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const order = await OrderService.getOrderByIdAdmin(id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = orderStatusUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid status update', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await OrderService.updateOrderStatus(id, parsed.data.status, parsed.data.note || undefined);
    return NextResponse.json({ message: 'Order status updated', order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Status update failed' }, { status: 400 });
  }
}
