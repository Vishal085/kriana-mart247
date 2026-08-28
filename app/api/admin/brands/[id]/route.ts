import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { BrandService } from '@/services/brands.service';
import { brandSchema } from '@/validators';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const parsed = brandSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid brand data' }, { status: 400 });
    }

    const updated = await BrandService.update(id, parsed.data);
    return NextResponse.json({ message: 'Brand updated', brand: updated });
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

    await BrandService.delete(id);
    return NextResponse.json({ message: 'Brand deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 400 });
  }
}
