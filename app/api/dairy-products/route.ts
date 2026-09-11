import { NextResponse } from 'next/server';
import { requireShopkeeper } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';

export async function GET() {
  try {
    const grouped = await DemandService.listDairyProducts();
    return NextResponse.json({ products: grouped });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch dairy products' }, { status: 500 });
  }
}
