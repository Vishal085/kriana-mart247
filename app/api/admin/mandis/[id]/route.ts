import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { MandiService } from '@/services/mandis.service';
import { mandiSchema } from '@/validators';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = mandiSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const updated = await MandiService.update(id, parsed.data);
    return NextResponse.json({ message: 'Mandi updated', mandi: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await MandiService.delete(id);
    return NextResponse.json({ message: 'Mandi deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 400 });
  }
}
