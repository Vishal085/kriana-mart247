import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MANDI_COMMODITY_CATEGORIES = [
  'atta-maida-suji',
  'dal-pulses',
  'rice',
  'cooking-oil',
  'refined-oil',
  'sugar-salt-jaggery',
  'ghee-butter',
  'ration-spices',
];

const RETAIL_ONLY_CATEGORIES = [
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

async function main() {
  console.log('🔍 Auditing Mandi Rates for unauthorized retail FMCG items...');

  // 1. Find all rates attached to products with retail categories
  const invalidRates = await prisma.mandiRate.findMany({
    where: {
      product: {
        OR: [
          { category: { slug: { in: RETAIL_ONLY_CATEGORIES } } },
          { category: { slug: { notIn: MANDI_COMMODITY_CATEGORIES } } },
        ],
      },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          unit: true,
          category: { select: { name: true, slug: true } },
        },
      },
      mandi: { select: { name: true } },
    },
  });

  console.log(`Found ${invalidRates.length} invalid retail rate records in MandiRate table:`);
  const uniqueProducts = new Map<string, string>();
  for (const r of invalidRates) {
    uniqueProducts.set(
      r.productId,
      `[${r.product.category.name}] ${r.product.name} (${r.product.unit})`
    );
  }

  for (const [prodId, desc] of uniqueProducts.entries()) {
    console.log(` - ${desc} (ID: ${prodId})`);
  }

  if (invalidRates.length > 0) {
    const invalidProductIds = Array.from(uniqueProducts.keys());

    const deletedHistories = await prisma.rateHistory.deleteMany({
      where: { productId: { in: invalidProductIds } },
    });
    console.log(`🗑️ Deleted ${deletedHistories.count} RateHistory records for retail goods.`);

    const deletedRates = await prisma.mandiRate.deleteMany({
      where: { productId: { in: invalidProductIds } },
    });
    console.log(`🗑️ Deleted ${deletedRates.count} MandiRate records for retail goods.`);
  }

  // 2. Summary of remaining authentic commodity rates
  const remainingRates = await prisma.mandiRate.count();
  const commodityProducts = await prisma.mandiRate.groupBy({
    by: ['productId'],
  });

  console.log(`\n✅ Database Cleaned!`);
  console.log(`Remaining authentic Mandi commodity rates: ${remainingRates}`);
  console.log(`Distinct authentic commodities tracked: ${commodityProducts.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
