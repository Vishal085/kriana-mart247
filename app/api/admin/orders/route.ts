import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { OrderService } from '@/services/orders.service';
import { OrderStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get('status') as OrderStatus) || undefined;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const data = await OrderService.getAllOrdersAdmin({
      status,
      search,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
