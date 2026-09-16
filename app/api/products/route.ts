import { NextResponse } from 'next/server';
import { ProductService } from '@/services/products.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;
    const subCategoryId = searchParams.get('subCategoryId') || undefined;
    const brandId = searchParams.get('brandId') || undefined;
    const mandiId = searchParams.get('mandiId') || undefined;
    const deals = searchParams.get('deals') || undefined;
    const search = searchParams.get('search') || undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const sortBy = (searchParams.get('sortBy') as any) || undefined;
    const sortOrder = (searchParams.get('sortOrder') as any) || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const data = await ProductService.getAll({
      category,
      categoryId,
      subCategoryId,
      brandId,
      mandiId,
      deals,
      minPrice,
      maxPrice,
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}
