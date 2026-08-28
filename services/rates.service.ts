import { prisma } from '@/lib/prisma';
import { computeRateMetrics } from '@/lib/rates';
import { Direction } from '@prisma/client';
import { z } from 'zod';
import { mandiRateSchema } from '@/validators';
import { AlertService } from './alerts.service';

export class RateService {
  static async getTodayRates({
    mandiId,
    categoryId,
    brandId,
    direction,
    search,
    sortBy = 'updatedAt',
    sortOrder = 'desc',
    page = 1,
    limit = 30,
  }: {
    mandiId?: string;
    categoryId?: string;
    brandId?: string;
    direction?: Direction;
    search?: string;
    sortBy?: 'rate' | 'change' | 'changePercent' | 'name' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;

    const where = {
      active: true,
      ...(mandiId ? { mandiId } : {}),
      ...(direction ? { direction } : {}),
      ...(categoryId ? { product: { categoryId } } : {}),
      ...(brandId ? { product: { brandId } } : {}),
      ...(search
        ? {
            OR: [
              { product: { name: { contains: search, mode: 'insensitive' as const } } },
              { product: { sku: { contains: search, mode: 'insensitive' as const } } },
              { mandi: { name: { contains: search, mode: 'insensitive' as const } } },
              { mandi: { city: { contains: search, mode: 'insensitive' as const } } },
            ],
          }
        : {}),
    };

    let orderBy: any = { updatedAt: 'desc' };
    if (sortBy === 'rate') {
      orderBy = { currentRate: sortOrder };
    } else if (sortBy === 'change') {
      orderBy = { absoluteChange: sortOrder };
    } else if (sortBy === 'changePercent') {
      orderBy = { percentageChange: sortOrder };
    } else if (sortBy === 'name') {
      orderBy = { product: { name: sortOrder } };
    }

    const [items, total] = await Promise.all([
      prisma.mandiRate.findMany({
        where,
        include: {
          product: {
            include: {
              category: true,
              brand: true,
              images: { where: { active: true }, take: 1 },
            },
          },
          mandi: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.mandiRate.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getMarketSummary(mandiId?: string) {
    const where = {
      active: true,
      ...(mandiId ? { mandiId } : {}),
    };

    const [grouped, topGainers, topLosers, total] = await Promise.all([
      prisma.mandiRate.groupBy({
        by: ['direction'],
        where,
        _count: { direction: true },
      }),
      prisma.mandiRate.findMany({
        where: { ...where, direction: Direction.RISING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'desc' },
        take: 5,
      }),
      prisma.mandiRate.findMany({
        where: { ...where, direction: Direction.FALLING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'asc' },
        take: 5,
      }),
      prisma.mandiRate.count({ where }),
    ]);

    const rising = grouped.find((g) => g.direction === Direction.RISING)?._count.direction ?? 0;
    const falling = grouped.find((g) => g.direction === Direction.FALLING)?._count.direction ?? 0;
    const stable = grouped.find((g) => g.direction === Direction.STABLE)?._count.direction ?? 0;

    return {
      total,
      rising,
      falling,
      stable,
      topGainers,
      topLosers,
      lastUpdated: new Date(),
    };
  }

  static async getRateHistory(productId: string, mandiId?: string, range = '30D') {
    const daysMap: Record<string, number> = {
      '7D': 7,
      '30D': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
    };

    const days = daysMap[range] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return prisma.rateHistory.findMany({
      where: {
        productId,
        ...(mandiId ? { mandiId } : {}),
        date: { gte: cutoffDate },
      },
      include: { mandi: true },
      orderBy: { date: 'asc' },
    });
  }

  static async upsertRate(data: z.infer<typeof mandiRateSchema>, updatedBy = 'ADMIN') {
    const { absolute, percentage, direction } = computeRateMetrics(
      data.currentRate,
      data.previousRate
    );

    const rateDate = new Date(data.date);
    const normalizedDate = new Date(rateDate.getFullYear(), rateDate.getMonth(), rateDate.getDate());

    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert MandiRate
      const current = await tx.mandiRate.upsert({
        where: {
          productId_mandiId_date: {
            productId: data.productId,
            mandiId: data.mandiId,
            date: normalizedDate,
          },
        },
        update: {
          currentRate: data.currentRate,
          previousRate: data.previousRate,
          minimumRate: data.minimumRate ?? data.currentRate,
          maximumRate: data.maximumRate ?? data.currentRate,
          unit: data.unit,
          absoluteChange: absolute,
          percentageChange: percentage,
          direction: direction as Direction,
          auctionDateTime: data.auctionDateTime ? new Date(data.auctionDateTime) : new Date(),
          active: data.active ?? true,
          updatedBy,
        },
        create: {
          productId: data.productId,
          mandiId: data.mandiId,
          date: normalizedDate,
          currentRate: data.currentRate,
          previousRate: data.previousRate,
          minimumRate: data.minimumRate ?? data.currentRate,
          maximumRate: data.maximumRate ?? data.currentRate,
          unit: data.unit,
          absoluteChange: absolute,
          percentageChange: percentage,
          direction: direction as Direction,
          auctionDateTime: data.auctionDateTime ? new Date(data.auctionDateTime) : new Date(),
          active: data.active ?? true,
          updatedBy,
        },
        include: { product: true, mandi: true },
      });

      // 2. Upsert RateHistory snapshot
      await tx.rateHistory.upsert({
        where: {
          productId_mandiId_date: {
            productId: data.productId,
            mandiId: data.mandiId,
            date: normalizedDate,
          },
        },
        update: {
          rate: data.currentRate,
          previousRate: data.previousRate,
          minimum: data.minimumRate ?? data.currentRate,
          maximum: data.maximumRate ?? data.currentRate,
          unit: data.unit,
          change: absolute,
          changePercent: percentage,
          direction: direction as Direction,
          updatedBy,
        },
        create: {
          productId: data.productId,
          mandiId: data.mandiId,
          date: normalizedDate,
          rate: data.currentRate,
          previousRate: data.previousRate,
          minimum: data.minimumRate ?? data.currentRate,
          maximum: data.maximumRate ?? data.currentRate,
          unit: data.unit,
          change: absolute,
          changePercent: percentage,
          direction: direction as Direction,
          updatedBy,
        },
      });

      return current;
    });

    // 3. Trigger Price Alerts asynchronously
    try {
      await AlertService.checkAndTriggerAlerts(data.productId, data.mandiId, Number(data.currentRate));
    } catch (err) {
      console.error('Error evaluating price alerts:', err);
    }

    return result;
  }

  static async deleteRate(id: string) {
    return prisma.mandiRate.delete({ where: { id } });
  }
}
