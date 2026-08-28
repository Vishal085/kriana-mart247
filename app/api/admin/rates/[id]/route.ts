import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { RateService } from '@/services/rates.service';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await RateService.deleteRate(id);
    return NextResponse.json({ message: 'Rate deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete rate' }, { status: 400 });
  }
}
