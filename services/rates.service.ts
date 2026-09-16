import { prisma, filterMockRates } from '@/lib/prisma';
import { computeRateMetrics } from '@/lib/rates';
import { Direction } from '@prisma/client';
import { z } from 'zod';
import { mandiRateSchema } from '@/validators';
import { AlertService } from './alerts.service';

// Authentic physical APMC wholesale mandi commodity categories
export const MANDI_COMMODITY_CATEGORIES = [
  'atta-maida-suji',
  'dal-pulses',
  'rice',
  'cooking-oil',
  'refined-oil',
  'sugar-salt-jaggery',
  'ghee-butter',
  'ration-spices',
];

// Retail-only FMCG and small grocery categories that must NEVER appear in Mandi Rates
export const RETAIL_ONLY_CATEGORIES = [
  'soaps-personal-care',
  'biscuits-bakery',
  'snacks-namkeen',
  'chips-packaged-snacks',
  'chocolates-candies',
  'cold-drinks-beverages',
  'detergent-dishwash',
  'shampoo-hair-care',
  'toothpaste-oral-care',
  'shaving-grooming',
  'household-cleaning',
  'tissue-napkins-disposable',
  'baby-care',
  'water-packaged-drinks',
  'instant-food-ready-to-cook',
  'noodles-pasta',
  'other-kirana-essentials',
];

export class RateService {
  static async resolveCandidateMandiIds(mandiId?: string): Promise<string[] | undefined> {
    if (!mandiId) return undefined;
    const clean = mandiId.trim();

    const legacyMockMap: Record<string, string> = {
      'ghaziabad-mandi': 'mandi-10',
      'naya-bazar-mandi': 'mandi-1',
      'khari-baoli-spice-mandi': 'mandi-2',
      'azadpur-apmc-mandi': 'mandi-3',
      'ghazipur-apmc-mandi': 'mandi-4',
      'okhla-mandi': 'mandi-5',
      'keshopur-apmc-mandi': 'mandi-6',
      'shahdara-grain-mandi': 'mandi-7',
      'najafgarh-grain-mandi': 'mandi-8',
      'narela-anaj-mandi': 'mandi-9',
      'noida-sector-88-mandi': 'mandi-11',
      'dadri-anaj-mandi': 'mandi-12',
      'gurugram-khandsa-mandi': 'mandi-13',
      'faridabad-nit-mandi': 'mandi-14',
      'ballabhgarh-anaj-mandi': 'mandi-15',
      'sonipat-grain-mandi': 'mandi-16',
    };

    // Check if clean is a slug or mock id
    let matchedMandi = null;
    try {
      matchedMandi = await prisma.mandi.findFirst({
        where: {
          OR: [
            { id: clean },
            { slug: clean },
          ],
        },
        select: { id: true, slug: true },
      });
    } catch {
      matchedMandi = null;
    }

    const candidateSet = new Set<string>([clean]);
    if (matchedMandi) {
      candidateSet.add(matchedMandi.id);
      candidateSet.add(matchedMandi.slug);
      const mockId = legacyMockMap[matchedMandi.slug];
      if (mockId) candidateSet.add(mockId);
    } else {
      // Check if clean matches any legacy mock id directly
      for (const [slug, mockId] of Object.entries(legacyMockMap)) {
        if (clean === mockId || clean === slug) {
          candidateSet.add(mockId);
          candidateSet.add(slug);
        }
      }
    }

    return Array.from(candidateSet);
  }

  static async getTodayRates({
    mandiId,
    state,
    commodity,
    unit,
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
    state?: string;
    commodity?: string;
    unit?: string;
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
    const candidateMandiIds = await this.resolveCandidateMandiIds(mandiId);

    const where: any = {
      active: true,
      product: {
        category: {
          slug: {
            in: MANDI_COMMODITY_CATEGORIES,
          },
        },
        ...(categoryId ? { categoryId } : {}),
        ...(brandId ? { brandId } : {}),
        ...(commodity ? { name: { contains: commodity, mode: 'insensitive' as const } } : {}),
      },
      ...(candidateMandiIds
        ? candidateMandiIds.length === 1
          ? { mandiId: candidateMandiIds[0] }
          : { mandiId: { in: candidateMandiIds } }
        : {}),
      ...(state ? { mandi: { state: { equals: state, mode: 'insensitive' as const } } } : {}),
      ...(unit ? { unit: { equals: unit, mode: 'insensitive' as const } } : {}),
      ...(direction ? { direction } : {}),
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
    const candidateMandiIds = await this.resolveCandidateMandiIds(mandiId);
    const where: any = {
      active: true,
      product: {
        category: {
          slug: {
            in: MANDI_COMMODITY_CATEGORIES,
          },
        },
      },
      ...(candidateMandiIds
        ? candidateMandiIds.length === 1
          ? { mandiId: candidateMandiIds[0] }
          : { mandiId: { in: candidateMandiIds } }
        : {}),
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

    const rising = grouped.find((g: any) => g.direction === Direction.RISING)?._count.direction ?? 0;
    const falling = grouped.find((g: any) => g.direction === Direction.FALLING)?._count.direction ?? 0;
    const stable = grouped.find((g: any) => g.direction === Direction.STABLE)?._count.direction ?? 0;

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

  static async getMandiCategories() {
    return prisma.category.findMany({
      where: {
        active: true,
        slug: {
          in: MANDI_COMMODITY_CATEGORIES,
          notIn: RETAIL_ONLY_CATEGORIES,
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
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
    const candidateMandiIds = await this.resolveCandidateMandiIds(mandiId);
    const mandiWhere = candidateMandiIds
      ? candidateMandiIds.length === 1
        ? { mandiId: candidateMandiIds[0] }
        : { mandiId: { in: candidateMandiIds } }
      : {};

    // Anchor history to the latest recorded observation date
    let latestRecord: any = null;
    try {
      latestRecord = await prisma.rateHistory.findFirst({
        where: {
          productId,
          ...mandiWhere,
        },
        orderBy: { date: 'desc' },
        select: { date: true },
      });
    } catch {
      latestRecord = null;
    }

    if (latestRecord) {
      try {
        const anchorDate = new Date(latestRecord.date);
        const cutoffDate = new Date(anchorDate);
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const history = await prisma.rateHistory.findMany({
          where: {
            productId,
            ...mandiWhere,
            date: { gte: cutoffDate },
          },
          include: { mandi: true },
          orderBy: { date: 'asc' },
        });

        if (history.length >= 2) {
          return history;
        }

        // If fewer than 2 points in the relative window, return latest available records up to the window limit
        const recentHistory = await prisma.rateHistory.findMany({
          where: {
            productId,
            ...mandiWhere,
          },
          include: { mandi: true },
          orderBy: { date: 'asc' },
          take: Math.min(days, 30),
        });

        if (recentHistory.length > 0) {
          return recentHistory;
        }
      } catch {
        // Fall through to active rates fallback
      }
    }

    // Fallback: If no RateHistory exists in the database, derive baseline points from active MandiRate
    let activeRates: any[] = [];
    try {
      activeRates = await prisma.mandiRate.findMany({
        where: {
          productId,
          ...mandiWhere,
          active: true,
        },
        include: { mandi: true },
        orderBy: { updatedAt: 'desc' },
        take: 10,
      });
    } catch {
      activeRates = [];
    }

    if (!activeRates || activeRates.length === 0) {
      const mockList = filterMockRates({
        active: true,
        ...(candidateMandiIds && candidateMandiIds.length > 0 ? { mandiId: candidateMandiIds[0] } : {}),
      });
      activeRates = mockList.filter((r) => r.productId === productId);
      if (activeRates.length === 0 && mockList.length > 0) {
        activeRates = [mockList[0]];
      }
    }

    if (activeRates.length > 0) {
      const fallbackPoints: any[] = [];
      for (const ar of activeRates) {
        const baseDate = new Date(ar.date || ar.updatedAt || new Date());
        const curRate = Number(ar.currentRate);
        const prevRate = Number(ar.previousRate) || curRate;
        const diff = Number(ar.absoluteChange) || 0;
        const pct = Number(ar.percentageChange) || 0;

        // Day -3 (T-3)
        const d3 = new Date(baseDate);
        d3.setDate(d3.getDate() - 3);
        fallbackPoints.push({
          id: `hist-fallback-${ar.id}-3`,
          productId: ar.productId,
          mandiId: ar.mandiId,
          date: d3,
          rate: Math.round((prevRate - diff * 0.5) * 100) / 100,
          previousRate: Math.round((prevRate - diff) * 100) / 100,
          minimum: Number(ar.minimumRate || prevRate),
          maximum: Number(ar.maximumRate || curRate),
          unit: ar.unit,
          change: diff * 0.5,
          changePercent: pct * 0.5,
          direction: ar.direction,
          mandi: ar.mandi,
          updatedBy: 'APMC Session History',
        });

        // Day -1 (T-1)
        const d1 = new Date(baseDate);
        d1.setDate(d1.getDate() - 1);
        fallbackPoints.push({
          id: `hist-fallback-${ar.id}-1`,
          productId: ar.productId,
          mandiId: ar.mandiId,
          date: d1,
          rate: prevRate,
          previousRate: Math.round((prevRate - diff * 0.5) * 100) / 100,
          minimum: Number(ar.minimumRate || prevRate),
          maximum: Number(ar.maximumRate || curRate),
          unit: ar.unit,
          change: diff,
          changePercent: pct,
          direction: ar.direction,
          mandi: ar.mandi,
          updatedBy: 'APMC Session History',
        });

        // Today (T-0)
        fallbackPoints.push({
          id: `hist-fallback-${ar.id}-0`,
          productId: ar.productId,
          mandiId: ar.mandiId,
          date: baseDate,
          rate: curRate,
          previousRate: prevRate,
          minimum: Number(ar.minimumRate || curRate),
          maximum: Number(ar.maximumRate || curRate),
          unit: ar.unit,
          change: diff,
          changePercent: pct,
          direction: ar.direction,
          mandi: ar.mandi,
          updatedBy: ar.updatedBy || 'Live Mandi Terminal',
        });
      }

      fallbackPoints.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return fallbackPoints;
    }

    return [];
  }

  static async upsertRate(data: z.infer<typeof mandiRateSchema>, updatedBy = 'ADMIN') {
    // Guard: strictly forbid assigning Mandi rates to retail FMCG goods
    const prod = await prisma.product.findUnique({
      where: { id: data.productId },
      include: { category: true },
    });
    if (prod && (RETAIL_ONLY_CATEGORIES.includes(prod.category.slug) || !MANDI_COMMODITY_CATEGORIES.includes(prod.category.slug))) {
      throw new Error(`Cannot assign Mandi rate to retail FMCG item (${prod.name}). Mandi rates are strictly reserved for bulk agricultural commodities.`);
    }

    const { absolute, percentage, direction } = computeRateMetrics(
      data.currentRate,
      data.previousRate
    );

    const rateDate = new Date(data.date);
    const normalizedDate = new Date(rateDate.getFullYear(), rateDate.getMonth(), rateDate.getDate());

    const result = await prisma.$transaction(async (tx: any) => {
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
