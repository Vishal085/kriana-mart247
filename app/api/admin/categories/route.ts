import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { CategoryService } from '@/services/categories.service';
import { categorySchema, subCategorySchema } from '@/validators';

export async function GET() {
  try {
    await requireAdmin();
    const categories = await CategoryService.getAll(false);
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    if (body.type === 'subcategory') {
      const parsed = subCategorySchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid subcategory data', details: parsed.error.format() }, { status: 400 });
      }
      const subCategory = await CategoryService.createSubCategory(parsed.data);
      return NextResponse.json({ message: 'Subcategory created', subCategory }, { status: 201 });
    }

    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid category data', details: parsed.error.format() }, { status: 400 });
    }

    const category = await CategoryService.create(parsed.data);
    return NextResponse.json({ message: 'Category created', category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 400 });
  }
}
