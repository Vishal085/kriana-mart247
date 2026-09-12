import { NextResponse } from 'next/server';
import { ProductService } from '@/services/products.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const mandiId = searchParams.get('mandiId') || undefined;

    let product = await ProductService.getBySlug(slug, mandiId);
    if (!product) {
      const byId = await ProductService.getById(slug);
      if (byId) {
        product = byId as any;
      }
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch product' }, { status: 500 });
  }
}
