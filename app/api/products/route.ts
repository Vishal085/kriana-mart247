import { NextResponse } from 'next/server';
import { ProductService } from '@/services/products.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const subCategoryId = searchParams.get('subCategoryId') || undefined;
    const brandId = searchParams.get('brandId') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const data = await ProductService.getAll({
      categoryId,
      subCategoryId,
      brandId,
      search,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}
