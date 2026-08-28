import { prisma } from '@/lib/prisma';
import { RateService } from './rates.service';
import { z } from 'zod';
import { bulkRateImportSchema } from '@/validators';

export class RateImportService {
  static async importBulkRates(input: z.infer<typeof bulkRateImportSchema>, updatedBy = 'BULK_IMPORT') {
    const results = {
      total: input.rates.length,
      successCount: 0,
      failedCount: 0,
      errors: [] as Array<{ index: number; reason: string }>,
    };

    // Cache products and mandis for high efficiency
    const [products, mandis] = await Promise.all([
      prisma.product.findMany({ select: { id: true, sku: true, name: true, unit: true } }),
      prisma.mandi.findMany({ select: { id: true, slug: true, name: true } }),
    ]);

    const productMap = new Map(products.map((p) => [p.sku.toLowerCase(), p]));
    const mandiMap = new Map(mandis.map((m) => [m.slug.toLowerCase(), m]));

    for (let i = 0; i < input.rates.length; i++) {
      const item = input.rates[i];
      try {
        const product = productMap.get(item.productSku.toLowerCase());
        if (!product) {
          throw new Error(`Product with SKU "${item.productSku}" not found`);
        }

        const mandi = mandiMap.get(item.mandiSlug.toLowerCase());
        if (!mandi) {
          throw new Error(`Mandi with slug "${item.mandiSlug}" not found`);
        }

        await RateService.upsertRate(
          {
            productId: product.id,
            mandiId: mandi.id,
            date: new Date(item.date),
            currentRate: item.currentRate,
            previousRate: item.previousRate ?? 0,
            minimumRate: item.currentRate,
            maximumRate: item.currentRate,
            unit: item.unit || product.unit,
            active: true,
          },
          updatedBy
        );

        results.successCount++;
      } catch (err: any) {
        results.failedCount++;
        results.errors.push({ index: i + 1, reason: err.message || 'Import error' });
      }
    }

    return results;
  }
}
