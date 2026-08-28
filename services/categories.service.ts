import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { categorySchema, subCategorySchema } from '@/validators';

export class CategoryService {
  static async getAll(activeOnly = true) {
    return prisma.category.findMany({
      where: activeOnly ? { active: true } : undefined,
      include: {
        subCategories: {
          where: activeOnly ? { active: true } : undefined,
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  static async getById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { subCategories: true },
    });
  }

  static async create(data: z.infer<typeof categorySchema>) {
    return prisma.category.create({ data });
  }

  static async update(id: string, data: Partial<z.infer<typeof categorySchema>>) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }

  static async createSubCategory(data: z.infer<typeof subCategorySchema>) {
    return prisma.subCategory.create({ data });
  }

  static async updateSubCategory(id: string, data: Partial<z.infer<typeof subCategorySchema>>) {
    return prisma.subCategory.update({
      where: { id },
      data,
    });
  }

  static async deleteSubCategory(id: string) {
    return prisma.subCategory.delete({ where: { id } });
  }
}
