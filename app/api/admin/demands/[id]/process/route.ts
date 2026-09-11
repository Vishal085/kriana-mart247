import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: Request, { params }: Params) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;
    await DemandService.processDemand(id, admin.id);
    return NextResponse.json({ message: 'Demand marked as Processing.' });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: error.message || 'Failed to process demand' }, { status: 400 });
  }
}
