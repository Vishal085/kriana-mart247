import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { productSchema } from '@/validators';

export class ProductService {
  static async getAll({
    categoryId,
    subCategoryId,
    brandId,
    search,
    activeOnly = true,
    page = 1,
    limit = 20,
  }: {
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    search?: string;
    activeOnly?: boolean;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;
    const where = {
      ...(activeOnly ? { active: true } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(subCategoryId ? { subCategoryId } : {}),
      ...(brandId ? { brandId } : {}),
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

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
          subCategory: true,
          images: { where: { active: true }, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
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

    return prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          ...productData,
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

    return prisma.$transaction(async (tx) => {
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

      return tx.product.update({
        where: { id },
        data: productData,
        include: { images: true, brand: true, category: true },
      });
    });
  }

  static async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
