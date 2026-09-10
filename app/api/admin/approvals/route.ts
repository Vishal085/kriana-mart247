import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SellerStore } from '@/lib/seller-store';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status') || 'PENDING_REVIEW';
    const search = (searchParams.get('search') || '').toLowerCase().trim();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Get all combined products from store
    const allProducts = SellerStore.getAllCombinedProducts();

    // Calculate status counts across all listings
    const counts = {
      all: allProducts.length,
      pending: allProducts.filter((p) => p.status === 'PENDING_REVIEW').length,
      needsChanges: allProducts.filter((p) => p.status === 'NEEDS_CHANGES').length,
      published: allProducts.filter((p) => (p.status || 'PUBLISHED') === 'PUBLISHED').length,
      rejected: allProducts.filter((p) => p.status === 'REJECTED').length,
      draft: allProducts.filter((p) => p.status === 'DRAFT').length,
    };

    // Filter by status
    let filtered = allProducts;
    if (statusParam && statusParam !== 'ALL') {
      filtered = filtered.filter((p) => (p.status || 'PUBLISHED') === statusParam);
    }

    // Filter by search query
    if (search) {
      filtered = filtered.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const brand = (p.brand?.name || p.brand || '').toLowerCase();
        const sku = (p.sku || '').toLowerCase();
        const shop = (p.shopName || '').toLowerCase();
        const seller = (p.seller?.fullName || '').toLowerCase();
        return (
          name.includes(search) ||
          brand.includes(search) ||
          sku.includes(search) ||
          shop.includes(search) ||
          seller.includes(search)
        );
      });
    }

    // Sort: Pending review first, then most recently updated
    filtered.sort((a, b) => {
      if (a.status === 'PENDING_REVIEW' && b.status !== 'PENDING_REVIEW') return -1;
      if (b.status === 'PENDING_REVIEW' && a.status !== 'PENDING_REVIEW') return 1;
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      products: paginated,
      counts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error('Admin approvals GET error:', error);
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || 'Failed to fetch approval queue' },
      { status: 500 }
    );
  }
}
