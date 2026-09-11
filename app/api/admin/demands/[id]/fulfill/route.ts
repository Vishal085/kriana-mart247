import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { items } = body; // [{ dairyProductId, deliveredQty, rate }]

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Fulfillment items are required.' }, { status: 400 });
    }

    for (const item of items) {
      if (Number(item.deliveredQty) < 0) {
        return NextResponse.json({ error: 'Delivered quantity cannot be negative.' }, { status: 400 });
      }
      if (Number(item.rate) <= 0) {
        return NextResponse.json({ error: 'Rate must be greater than 0.' }, { status: 400 });
      }
    }

    const result = await DemandService.fulfillDemand(id, admin.id, items);
    return NextResponse.json({
      message: `Demand marked as ${result.status.replace('_', ' ')}.`,
      ...result,
    });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: error.message || 'Failed to fulfill demand' }, { status: 400 });
  }
}
