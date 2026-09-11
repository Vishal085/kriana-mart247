import { NextResponse } from 'next/server';
import { requireShopkeeper } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';
import { DemandStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const user = await requireShopkeeper();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as DemandStatus | null;
    const demands = await DemandService.getShopkeeperDemands(user.id, status || undefined);
    return NextResponse.json({ demands });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to fetch demands' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireShopkeeper();
    const body = await request.json();
    const { items, notes } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'At least one product must be selected.' }, { status: 400 });
    }

    // Validate each item
    for (const item of items) {
      if (!item.dairyProductId) {
        return NextResponse.json({ error: 'Invalid product selection.' }, { status: 400 });
      }
      const qty = Number(item.requestedQty);
      if (isNaN(qty) || qty <= 0) {
        return NextResponse.json({ error: 'All quantities must be greater than 0.' }, { status: 400 });
      }
    }

    const demand = await DemandService.createDemand(user.id, items, notes);
    return NextResponse.json({ message: 'Demand submitted successfully.', demand }, { status: 201 });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create demand' }, { status: 400 });
  }
}
