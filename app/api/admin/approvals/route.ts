import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductStatus } from '@prisma/client';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status') || 'PENDING_REVIEW';
    const search = (searchParams.get('search') || '').toLowerCase().trim();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Build Prisma query condition
    const where: any = {};

    if (statusParam && statusParam !== 'ALL') {
      if (Object.values(ProductStatus).includes(statusParam as ProductStatus)) {
        where.status = statusParam as ProductStatus;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { shopName: { contains: search, mode: 'insensitive' } },
        { brand: { name: { contains: search, mode: 'insensitive' } } },
        { seller: { fullName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // Parallel fetch for counts and paginated items
    const [allCount, pendingCount, needsChangesCount, publishedCount, rejectedCount, draftCount, total, products] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { status: 'PENDING_REVIEW' } }),
        prisma.product.count({ where: { status: 'NEEDS_CHANGES' } }),
        prisma.product.count({ where: { status: 'PUBLISHED' } }),
        prisma.product.count({ where: { status: 'REJECTED' } }),
        prisma.product.count({ where: { status: 'DRAFT' } }),
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          include: {
            category: true,
            brand: true,
            images: {
              orderBy: { sortOrder: 'asc' },
            },
            seller: {
              select: {
                id: true,
                fullName: true,
                email: true,
                mobile: true,
              },
            },
            auditLogs: {
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
          orderBy: [
            // If viewing all, pending reviews first
            ...(statusParam === 'ALL' ? [{ status: 'asc' as const }] : []),
            { updatedAt: 'desc' as const },
          ],
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

    const counts = {
      all: allCount,
      pending: pendingCount,
      needsChanges: needsChangesCount,
      published: publishedCount,
      rejected: rejectedCount,
      draft: draftCount,
    };

    return NextResponse.json({
      products,
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
