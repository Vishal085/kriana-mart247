import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { mandiSchema } from '@/validators';

export class MandiService {
  static async getAll(activeOnly = true, city?: string, state?: string, search?: string) {
    return prisma.mandi.findMany({
      where: {
        ...(activeOnly ? { active: true } : {}),
        ...(city ? { city: { equals: city, mode: 'insensitive' } } : {}),
        ...(state ? { state: { equals: state, mode: 'insensitive' } } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { city: { contains: search, mode: 'insensitive' } },
                { state: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });
  }

  static async getBySlug(slug: string) {
    return prisma.mandi.findUnique({
      where: { slug },
      include: {
        rates: {
          where: { active: true },
          include: {
            product: {
              include: { category: true, brand: true },
            },
          },
          orderBy: { updatedAt: 'desc' },
        },
      },
    });
  }

  static async getById(id: string) {
    return prisma.mandi.findUnique({ where: { id } });
  }

  static async create(data: z.infer<typeof mandiSchema>) {
    return prisma.mandi.create({ data });
  }

  static async update(id: string, data: Partial<z.infer<typeof mandiSchema>>) {
    return prisma.mandi.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.mandi.delete({ where: { id } });
  }
}
