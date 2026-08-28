import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { brandSchema } from '@/validators';

export class BrandService {
  static async getAll(activeOnly = true) {
    return prisma.brand.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  static async getById(id: string) {
    return prisma.brand.findUnique({ where: { id } });
  }

  static async create(data: z.infer<typeof brandSchema>) {
    return prisma.brand.create({ data });
  }

  static async update(id: string, data: Partial<z.infer<typeof brandSchema>>) {
    return prisma.brand.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.brand.delete({ where: { id } });
  }
}
