/**
 * Dairy Product Catalogue Seed
 * Populates DairyProduct table for Demand Management module.
 * Safe to run multiple times — skips if products already exist.
 * Does NOT touch any existing data (Orders, Products, Mandis, etc.)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dairyProducts = [
  // ── Mother Dairy ──────────────────────────────────────────────
  { brand: 'Mother Dairy', name: 'Full Cream Milk', variant: '500ml', unit: 'Packet', defaultRate: 32, displayOrder: 1 },
  { brand: 'Mother Dairy', name: 'Full Cream Milk', variant: '1L',    unit: 'Packet', defaultRate: 64, displayOrder: 2 },
  { brand: 'Mother Dairy', name: 'Cow Milk',        variant: '500ml', unit: 'Packet', defaultRate: 29, displayOrder: 3 },
  { brand: 'Mother Dairy', name: 'Cow Milk',        variant: '1L',    unit: 'Packet', defaultRate: 58, displayOrder: 4 },
  { brand: 'Mother Dairy', name: 'Dahi',            variant: '400g',  unit: 'Piece',  defaultRate: 38, displayOrder: 5 },
  { brand: 'Mother Dairy', name: 'Dahi',            variant: '200g',  unit: 'Piece',  defaultRate: 22, displayOrder: 6 },
  { brand: 'Mother Dairy', name: 'Dahi',            variant: '1kg',   unit: 'Piece',  defaultRate: 85, displayOrder: 7 },
  { brand: 'Mother Dairy', name: 'Chhach',          variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 8 },
  { brand: 'Mother Dairy', name: 'Chhach',          variant: '500ml', unit: 'Packet', defaultRate: 24, displayOrder: 9 },

  // ── Madhusudan ────────────────────────────────────────────────
  { brand: 'Madhusudan', name: 'Chhach Plain',   variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 10 },
  { brand: 'Madhusudan', name: 'Chhach Masala',  variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 11 },
  { brand: 'Madhusudan', name: 'Milk',           variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 12 },
  { brand: 'Madhusudan', name: 'Milk',           variant: '500ml', unit: 'Packet', defaultRate: 25, displayOrder: 13 },
  { brand: 'Madhusudan', name: 'Dahi',           variant: '200g',  unit: 'Piece',  defaultRate: 18, displayOrder: 14 },

  // ── Arlys / Arvind Dairy ──────────────────────────────────────
  { brand: 'Arlys', name: 'Milk',        variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 15 },
  { brand: 'Arlys', name: 'Family Milk', variant: '500ml', unit: 'Packet', defaultRate: 20, displayOrder: 16 },
  { brand: 'Arlys', name: 'Pro Milk',    variant: '500ml', unit: 'Packet', defaultRate: 26, displayOrder: 17 },
  { brand: 'Arlys', name: 'Milk',        variant: '1L',    unit: 'Packet', defaultRate: 40, displayOrder: 18 },
  { brand: 'Arlys', name: 'Dahi',        variant: '200g',  unit: 'Piece',  defaultRate: 20, displayOrder: 19 },
  { brand: 'Arlys', name: 'Dahi',        variant: '400g',  unit: 'Piece',  defaultRate: 38, displayOrder: 20 },
  { brand: 'Arlys', name: 'Chhach',      variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 21 },

  // ── Amul ──────────────────────────────────────────────────────
  { brand: 'Amul', name: 'Taaza Milk', variant: '500ml', unit: 'Packet', defaultRate: 30, displayOrder: 22 },
  { brand: 'Amul', name: 'Taaza Milk', variant: '1L',    unit: 'Packet', defaultRate: 60, displayOrder: 23 },
  { brand: 'Amul', name: 'Gold Milk',  variant: '500ml', unit: 'Packet', defaultRate: 34, displayOrder: 24 },
  { brand: 'Amul', name: 'Gold Milk',  variant: '1L',    unit: 'Packet', defaultRate: 68, displayOrder: 25 },
  { brand: 'Amul', name: 'Dahi',       variant: '200g',  unit: 'Piece',  defaultRate: 24, displayOrder: 26 },
  { brand: 'Amul', name: 'Dahi',       variant: '400g',  unit: 'Piece',  defaultRate: 44, displayOrder: 27 },
  { brand: 'Amul', name: 'Dahi',       variant: '1kg',   unit: 'Piece',  defaultRate: 98, displayOrder: 28 },
  { brand: 'Amul', name: 'Chhach',     variant: '200ml', unit: 'Packet', defaultRate: 10, displayOrder: 29 },
  { brand: 'Amul', name: 'Chhach',     variant: '1L',    unit: 'Packet', defaultRate: 44, displayOrder: 30 },
];

async function seedDairy() {
  console.log('🥛 Seeding Dairy Product Catalogue for Demand Management...');

  const existing = await prisma.dairyProduct.count();
  if (existing > 0) {
    console.log(`ℹ️  ${existing} dairy products already exist. Skipping seed.`);
    console.log('   To re-seed, delete all DairyProduct records first.');
    return;
  }

  let created = 0;
  for (const product of dairyProducts) {
    await prisma.dairyProduct.create({
      data: {
        brand: product.brand,
        name: product.name,
        variant: product.variant,
        unit: product.unit,
        defaultRate: product.defaultRate,
        displayOrder: product.displayOrder,
        active: true,
      },
    });
    created++;
    console.log(`  ✅ ${product.brand} — ${product.name} ${product.variant || ''} (₹${product.defaultRate}/${product.unit})`);
  }

  console.log(`\n✅ Dairy catalogue seeded: ${created} products across 4 brands.`);
  console.log('   Brands: Mother Dairy, Madhusudan, Arlys, Amul');
}

seedDairy()
  .catch((e) => {
    console.error('❌ Dairy seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
