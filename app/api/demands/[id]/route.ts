import { NextResponse } from 'next/server';
import { getCurrentSessionUser } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'SHOPKEEPER' && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { id } = await params;
    const demand = await DemandService.getDemandById(id, user.id, user.role);
    return NextResponse.json({ demand });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error.message?.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch demand' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await getCurrentSessionUser();
    if (!user || user.role !== 'SHOPKEEPER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const { items, notes } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'At least one product must be selected.' }, { status: 400 });
    }
    for (const item of items) {
      const qty = Number(item.requestedQty);
      if (isNaN(qty) || qty <= 0) {
        return NextResponse.json({ error: 'All quantities must be greater than 0.' }, { status: 400 });
      }
    }

    const demand = await DemandService.updateDemand(id, user.id, items, notes);
    return NextResponse.json({ message: 'Demand updated successfully.', demand });
  } catch (error: any) {
    if (error.message?.includes('Forbidden')) return NextResponse.json({ error: error.message }, { status: 403 });
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: error.message || 'Failed to update demand' }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const user = await getCurrentSessionUser();
    if (!user || user.role !== 'SHOPKEEPER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    await DemandService.cancelDemand(id, user.id);
    return NextResponse.json({ message: 'Demand cancelled successfully.' });
  } catch (error: any) {
    if (error.message?.includes('Forbidden')) return NextResponse.json({ error: error.message }, { status: 403 });
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: error.message || 'Failed to cancel demand' }, { status: 400 });
  }
}
