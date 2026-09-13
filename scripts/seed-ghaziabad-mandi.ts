import { PrismaClient, Direction } from '@prisma/client';

const prisma = new PrismaClient();

const ncrMandis = [
  {
    name: 'Ghaziabad Mandi',
    slug: 'ghaziabad-mandi',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    address: 'Site 4, Sahibabad Industrial Area, Ghaziabad 201005',
    description: 'Ghaziabad district primary wholesale foodgrain, pulse, and edible oil terminal market.',
    displayOrder: 1, // Prioritize Ghaziabad Mandi so it is immediately prominent
    active: true,
  },
  {
    name: 'Noida Sector 88 Krishi Mandi',
    slug: 'noida-sector-88-mandi',
    city: 'Noida',
    state: 'Uttar Pradesh',
    address: 'Sector 88, Phase 2, Noida, Gautam Buddha Nagar 201305',
    description: 'Gautam Buddha Nagar primary wholesale agricultural and grocery distribution center.',
    displayOrder: 2,
    active: true,
  },
  {
    name: 'Dadri Anaj & Kirana Mandi',
    slug: 'dadri-anaj-mandi',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    address: 'Railway Road, Dadri, Greater Noida 203207',
    description: 'Greater Noida regional wholesale grain, pulse, and country jaggery exchange.',
    displayOrder: 3,
    active: true,
  },
  {
    name: 'Naya Bazar Mandi',
    slug: 'naya-bazar-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Naya Bazar, Chandni Chowk, Old Delhi 110006',
    description: "Asia's premier wholesale foodgrain, basmati rice, pulses, and mustard oil terminal market.",
    displayOrder: 4,
    active: true,
  },
  {
    name: 'Khari Baoli Spice Mandi',
    slug: 'khari-baoli-spice-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Khari Baoli, Chandni Chowk, Delhi 110006',
    description: "Asia's largest wholesale spice, dry fruits, herbs, and condiments trading market.",
    displayOrder: 5,
    active: true,
  },
  {
    name: 'Azadpur APMC Mandi',
    slug: 'azadpur-apmc-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'GT Karnal Road, Azadpur, Delhi 110033',
    description: "National capital's mega APMC terminal market regulating daily wholesale commodity auctions.",
    displayOrder: 6,
    active: true,
  },
  {
    name: 'Ghazipur APMC Mandi',
    slug: 'ghazipur-apmc-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Ghazipur, Trans-Yamuna, East Delhi 110096',
    description: 'East Delhi & UP border primary wholesale commodity and perishables exchange.',
    displayOrder: 7,
    active: true,
  },
  {
    name: 'Okhla APMC Mandi',
    slug: 'okhla-mandi',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'Okhla Industrial Area Phase II, New Delhi 110020',
    description: 'South Delhi wholesale agro-commodity auction and redistribution terminal.',
    displayOrder: 8,
    active: true,
  },
  {
    name: 'Keshopur APMC Mandi',
    slug: 'keshopur-apmc-mandi',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'Outer Ring Road, Tilak Nagar, West Delhi 110018',
    description: 'West Delhi primary wholesale grain, fruit, and grocery distribution terminal.',
    displayOrder: 9,
    active: true,
  },
  {
    name: 'Shahdara Anaj Mandi',
    slug: 'shahdara-grain-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Old Shahdara, North East Delhi 110032',
    description: 'Trans-Yamuna wholesale grains, sugar, edible oils, and daily staples trading center.',
    displayOrder: 10,
    active: true,
  },
  {
    name: 'Najafgarh Anaj Mandi',
    slug: 'najafgarh-grain-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Najafgarh Main Road, South West Delhi 110043',
    description: 'South-West Delhi agro-wholesale hub and grain procurement market.',
    displayOrder: 11,
    active: true,
  },
  {
    name: 'Narela Anaj Mandi',
    slug: 'narela-anaj-mandi',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Narela Mandi, GT Karnal Road, North Delhi 110040',
    description: "Delhi's largest specialized wheat, paddy, and grain APMC terminal.",
    displayOrder: 12,
    active: true,
  },
  {
    name: 'Gurugram Khandsa Anaj Mandi',
    slug: 'gurugram-khandsa-mandi',
    city: 'Gurugram',
    state: 'Haryana',
    address: 'Khandsa Road, Near Hero Honda Chowk, Gurugram 122001',
    description: 'Gurugram & South Haryana-NCR primary foodgrain and wholesale grocery exchange.',
    displayOrder: 13,
    active: true,
  },
  {
    name: 'Faridabad NIT Old Anaj Mandi',
    slug: 'faridabad-nit-mandi',
    city: 'Faridabad',
    state: 'Haryana',
    address: 'Old Faridabad Railway Road, NIT, Faridabad 121001',
    description: 'Faridabad district central wholesale grain, oilseeds, and spice market.',
    displayOrder: 14,
    active: true,
  },
  {
    name: 'Ballabhgarh Anaj Mandi',
    slug: 'ballabhgarh-anaj-mandi',
    city: 'Ballabhgarh',
    state: 'Haryana',
    address: 'Grain Market Road, Ballabhgarh, Faridabad 121004',
    description: 'South NCR gateway grain procurement center and essential groceries mandi.',
    displayOrder: 15,
    active: true,
  },
  {
    name: 'Sonipat New Grain Market',
    slug: 'sonipat-grain-mandi',
    city: 'Sonipat',
    state: 'Haryana',
    address: 'New Anaj Mandi, GT Road, Sonipat 131001',
    description: 'North NCR premier agricultural terminal, renowned for 1121 & Pusa Basmati rice auctions.',
    displayOrder: 16,
    active: true,
  },
];

async function main() {
  console.log('Seeding and verifying all NCR Wholesale Mandis including Ghaziabad Mandi...');

  const mandiMap = new Map<string, string>();

  for (const m of ncrMandis) {
    const existing = await prisma.mandi.findFirst({
      where: {
        OR: [{ slug: m.slug }, { name: m.name }],
      },
    });

    if (existing) {
      const updated = await prisma.mandi.update({
        where: { id: existing.id },
        data: {
          name: m.name,
          slug: m.slug,
          city: m.city,
          state: m.state,
          address: m.address,
          description: m.description,
          displayOrder: m.displayOrder,
          active: true,
        },
      });
      mandiMap.set(m.slug, updated.id);
      console.log(`[UPDATED] ${m.name} (${m.slug}, order: ${m.displayOrder})`);
    } else {
      const created = await prisma.mandi.create({
        data: m,
      });
      mandiMap.set(m.slug, created.id);
      console.log(`[CREATED] ${m.name} (${m.slug}, order: ${m.displayOrder})`);
    }
  }

  // Get wholesale commodities to link Mandi Rates for Ghaziabad Mandi and other NCR mandis
  const MANDI_CATEGORIES = [
    'Atta, Maida & Suji',
    'Dal & Pulses',
    'Rice',
    'Cooking Oil',
    'Refined Oil',
    'Sugar, Salt & Jaggery',
    'Ghee & Butter',
    'Spices & Masalas',
  ];

  const products = await prisma.product.findMany({
    where: {
      active: true,
      category: {
        name: { in: MANDI_CATEGORIES },
      },
    },
    include: { category: true },
  });

  console.log(`Found ${products.length} wholesale commodity products to link with Mandi Rates`);

  const allMandis = await prisma.mandi.findMany({ where: { active: true } });

  let rateCreatedCount = 0;
  for (const mandi of allMandis) {
    // Check existing rates for this mandi
    const existingRateCount = await prisma.mandiRate.count({
      where: { mandiId: mandi.id },
    });

    if (existingRateCount < 10) {
      console.log(`Adding commodity rates to ${mandi.name}...`);
      for (const prod of products) {
        const existing = await prisma.mandiRate.findFirst({
          where: { mandiId: mandi.id, productId: prod.id },
        });

        if (!existing) {
          const basePrice = Number(prod.retailPrice) || 50;
          // Apply slight realistic geographic variation based on mandi
          const mandiFactor = mandi.slug === 'ghaziabad-mandi' ? 0.97 : 0.99;
          const currentRate = Math.round(basePrice * mandiFactor * 100) / 100;
          const previousRate = Math.round((currentRate * 0.98) * 100) / 100;
          const diff = Math.round((currentRate - previousRate) * 100) / 100;
          const pct = Math.round(((diff / previousRate) * 100) * 10) / 10;

          await prisma.mandiRate.create({
            data: {
              productId: prod.id,
              mandiId: mandi.id,
              currentRate,
              previousRate,
              minimumRate: Math.round(currentRate * 0.94 * 100) / 100,
              maximumRate: Math.round(currentRate * 1.05 * 100) / 100,
              direction: diff > 0 ? Direction.RISING : diff < 0 ? Direction.FALLING : Direction.STABLE,
              absoluteChange: Math.abs(diff),
              percentageChange: Math.abs(pct),
              unit: prod.unit,
              date: new Date(),
              active: true,
            },
          });
          rateCreatedCount++;
        }
      }
    }
  }

  console.log(`Successfully created ${rateCreatedCount} new Mandi Rate records!`);

  // Final count
  const finalMandiCount = await prisma.mandi.count();
  const finalRateCount = await prisma.mandiRate.count();
  console.log(`\nFinal Mandi count in DB: ${finalMandiCount}`);
  console.log(`Final Mandi Rate count in DB: ${finalRateCount}`);

  const ghaziabad = await prisma.mandi.findFirst({
    where: { slug: 'ghaziabad-mandi' },
    include: { _count: { select: { rates: true } } },
  });
  console.log('Ghaziabad Mandi Details in DB:', ghaziabad);
}

main()
  .catch((e) => {
    console.error('Error seeding mandis:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
