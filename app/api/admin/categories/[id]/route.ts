import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { CategoryService } from '@/services/categories.service';
import { categorySchema, subCategorySchema } from '@/validators';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    if (body.type === 'subcategory') {
      const parsed = subCategorySchema.partial().safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
      }
      const updated = await CategoryService.updateSubCategory(id, parsed.data);
      return NextResponse.json({ message: 'Subcategory updated', subCategory: updated });
    }

    const parsed = categorySchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const updated = await CategoryService.update(id, parsed.data);
    return NextResponse.json({ message: 'Category updated', category: updated });
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
    const { searchParams } = new URL(request.url);
    const isSub = searchParams.get('type') === 'subcategory';

    if (isSub) {
      await CategoryService.deleteSubCategory(id);
      return NextResponse.json({ message: 'Subcategory deleted' });
    }

    await CategoryService.delete(id);
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 400 });
  }
}
