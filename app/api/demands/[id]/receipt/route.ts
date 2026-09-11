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
    const demand = await DemandService.getDemandReceipt(id, user.id, user.role);
    return NextResponse.json({ demand });
  } catch (error: any) {
    if (error.message?.includes('Forbidden')) return NextResponse.json({ error: error.message }, { status: 403 });
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    if (error.message?.includes('not yet generated')) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: error.message || 'Failed to fetch receipt' }, { status: 500 });
  }
}
