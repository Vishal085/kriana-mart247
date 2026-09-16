import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { productSchema } from '@/validators';

export class ProductService {
  static async getAll({
    category,
    categoryId,
    subCategoryId,
    brandId,
    mandiId,
    deals,
    minPrice,
    maxPrice,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    activeOnly = true,
    page = 1,
    limit = 20,
  }: {
    category?: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    mandiId?: string;
    deals?: boolean | string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: 'retailPrice' | 'name' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    activeOnly?: boolean;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;

    // Resolve category slug or ID
    const rawCat = category || categoryId;
    let resolvedCategoryId: string | undefined;
    if (rawCat) {
      try {
        const matched = await prisma.category.findFirst({
          where: {
            OR: [
              { id: rawCat },
              { slug: rawCat },
            ],
          },
          select: { id: true },
        });
        if (matched) {
          resolvedCategoryId = matched.id;
        }
      } catch {
        resolvedCategoryId = rawCat;
      }
    }

    // Resolve mandi products if mandiId is supplied
    let mandiProductIds: string[] | undefined;
    if (mandiId) {
      try {
        const rates = await prisma.mandiRate.findMany({
          where: {
            OR: [
              { mandiId },
              { mandi: { slug: mandiId } },
            ],
            active: true,
          },
          select: { productId: true },
          take: 150,
        });
        mandiProductIds = rates.map((r: any) => r.productId);
      } catch {
        mandiProductIds = undefined;
      }
    }

    const priceFilter: any = {};
    if (minPrice !== undefined) priceFilter.gte = minPrice;
    if (maxPrice !== undefined) priceFilter.lte = maxPrice;

    const isDeals = deals === true || deals === 'true' || deals === '1';

    const where: any = {
      ...(activeOnly ? { active: true } : {}),
      ...(resolvedCategoryId ? { categoryId: resolvedCategoryId } : {}),
      ...(subCategoryId ? { subCategoryId } : {}),
      ...(brandId ? { brandId } : {}),
      ...(mandiProductIds ? { id: { in: mandiProductIds } } : {}),
      ...(Object.keys(priceFilter).length > 0 ? { retailPrice: priceFilter } : {}),
      ...(isDeals ? { baseRate: { not: null, gt: 0 } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { sku: { contains: search, mode: 'insensitive' as const } },
              { searchKeywords: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'retailPrice') {
      orderBy = { retailPrice: sortOrder };
    } else if (sortBy === 'name') {
      orderBy = { name: sortOrder };
    } else if (sortBy === 'createdAt') {
      orderBy = { createdAt: sortOrder };
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          subCategory: true,
          images: { where: { active: true }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getBySlug(slug: string, mandiId?: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        images: { where: { active: true }, orderBy: { sortOrder: 'asc' } },
        rates: {
          where: { active: true },
          include: { mandi: true },
          orderBy: { currentRate: 'asc' },
        },
      },
    });

    if (!product) return null;

    // Fetch rate history for chart
    const historyWhere = {
      productId: product.id,
      ...(mandiId ? { mandiId } : {}),
    };

    const history = await prisma.rateHistory.findMany({
      where: historyWhere,
      include: { mandi: true },
      orderBy: { date: 'asc' },
      take: 100,
    });

    return {
      ...product,
      history,
    };
  }

  static async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        subCategory: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
  }

  static async create(data: z.infer<typeof productSchema>) {
    const { images, ...productData } = data;

    return prisma.$transaction(async (tx: any) => {
      const created = await tx.product.create({
        data: {
          ...productData,
          stockQuantity: productData.stockQuantity ?? 100,
          images: images && images.length > 0 ? {
            create: images.map((img, idx) => ({
              url: img.url,
              altText: img.altText || productData.name,
              sortOrder: img.sortOrder ?? idx,
              active: img.active ?? true,
            })),
          } : {
            create: [{
              url: '/brand/logo.svg',
              altText: productData.name,
              sortOrder: 0,
              active: true,
            }],
          },
        },
        include: { images: true, brand: true, category: true },
      });

      return created;
    });
  }

  static async update(id: string, data: Partial<z.infer<typeof productSchema>>) {
    const { images, ...productData } = data;

    return prisma.$transaction(async (tx: any) => {
      if (images) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        await tx.productImage.createMany({
          data: images.map((img, idx) => ({
            productId: id,
            url: img.url,
            altText: img.altText || productData.name || 'Product Image',
            sortOrder: img.sortOrder ?? idx,
            active: img.active ?? true,
          })),
        });
      }

      const updateData: any = { ...productData };
      if (updateData.stockQuantity === null) {
        delete updateData.stockQuantity;
      }

      return tx.product.update({
        where: { id },
        data: updateData,
        include: { images: true, brand: true, category: true },
      });
    });
  }

  static async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
