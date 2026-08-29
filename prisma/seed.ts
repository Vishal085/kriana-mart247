import { PrismaClient, Role, Direction } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding KiranaMart247 comprehensive database with ₹10 spices & real product images...');

  // Clean slate in correct dependency order
  await prisma.notification.deleteMany();
  await prisma.whatsAppNotificationLog.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.priceAlert.deleteMany();
  await prisma.mandiWatchlistItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.rateHistory.deleteMany();
  await prisma.mandiRate.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.mandi.deleteMany();
  await prisma.user.deleteMany();

  // 1. Categories
  const categoriesData = [
    { name: 'Rice & Grains', slug: 'rice-grains', description: 'Basmati rice, non-basmati, wheat, atta, maida, suji, poha' },
    { name: 'Pulses & Lentils', slug: 'pulses-lentils', description: 'Toor dal, chana dal, moong dal, urad dal, masoor dal, rajma' },
    { name: 'Oils & Ghee', slug: 'oils-ghee', description: 'Mustard oil, sunflower oil, soybean oil, groundnut oil, desi ghee' },
    { name: 'Spices & Masala', slug: 'spices-masala', description: 'Turmeric, chili, coriander, cumin, garam masala, ₹10 sachets, whole spices' },
    { name: 'Dairy Products', slug: 'dairy-products', description: 'Fresh milk, butter, paneer, curd, cheese, fresh cream' },
    { name: 'Beverages', slug: 'beverages', description: 'Cold drinks, juices, mineral water, premium tea, filter coffee' },
    { name: 'Snacks & Packaged Foods', slug: 'snacks-packaged-foods', description: 'Biscuits, namkeen, chips, instant noodles, pasta' },
    { name: 'Household & Cleaning', slug: 'household-cleaning', description: 'Detergents, dishwash liquids, floor cleaners, disinfectants' },
    { name: 'Personal Care', slug: 'personal-care', description: 'Bath soaps, shampoos, toothpaste, toothbrushes, handwash' },
    { name: 'General Store', slug: 'general-store', description: 'Sugar, jaggery, iodized salt, dry fruits, grocery essentials' },
  ];

  const categoryMap = new Map<string, string>();
  for (let i = 0; i < categoriesData.length; i++) {
    const cat = await prisma.category.create({
      data: { ...categoriesData[i], displayOrder: i + 1, active: true },
    });
    categoryMap.set(cat.name, cat.id);
  }

  // 2. SubCategories
  const subcategoriesList: Array<[string, string]> = [
    ['Rice & Grains', 'Basmati Rice'],
    ['Rice & Grains', 'Non-Basmati Rice'],
    ['Rice & Grains', 'Wheat'],
    ['Rice & Grains', 'Atta'],
    ['Rice & Grains', 'Maida'],
    ['Rice & Grains', 'Suji'],
    ['Rice & Grains', 'Poha'],
    ['Pulses & Lentils', 'Toor Dal'],
    ['Pulses & Lentils', 'Chana Dal'],
    ['Pulses & Lentils', 'Moong Dal'],
    ['Pulses & Lentils', 'Urad Dal'],
    ['Pulses & Lentils', 'Rajma'],
    ['Oils & Ghee', 'Mustard Oil'],
    ['Oils & Ghee', 'Sunflower Oil'],
    ['Oils & Ghee', 'Soybean Oil'],
    ['Oils & Ghee', 'Ghee'],
    ['Spices & Masala', 'Red Chili Powder'],
    ['Spices & Masala', 'Turmeric Powder'],
    ['Spices & Masala', 'Coriander Powder'],
    ['Spices & Masala', 'Garam Masala'],
    ['Spices & Masala', 'Chaat Masala'],
    ['Spices & Masala', 'Sabzi Masala'],
    ['Spices & Masala', 'Seasoning & Herbs'],
    ['Spices & Masala', 'Kasuri Methi'],
    ['Spices & Masala', 'Black Pepper'],
    ['Dairy Products', 'Milk'],
    ['Dairy Products', 'Butter'],
    ['Dairy Products', 'Paneer'],
    ['Dairy Products', 'Curd'],
    ['Dairy Products', 'Cheese'],
    ['Beverages', 'Cold Drinks'],
    ['Beverages', 'Juices'],
    ['Beverages', 'Mineral Water'],
    ['Beverages', 'Tea'],
    ['Beverages', 'Coffee'],
    ['Snacks & Packaged Foods', 'Biscuits'],
    ['Snacks & Packaged Foods', 'Namkeen'],
    ['Snacks & Packaged Foods', 'Chips'],
    ['Snacks & Packaged Foods', 'Noodles'],
    ['Household & Cleaning', 'Detergent Powder'],
    ['Household & Cleaning', 'Dishwash Bar'],
    ['Household & Cleaning', 'Floor Cleaner'],
    ['Personal Care', 'Bath Soap'],
    ['Personal Care', 'Shampoo'],
    ['Personal Care', 'Toothpaste'],
    ['General Store', 'Sugar'],
    ['General Store', 'Iodized Salt'],
    ['General Store', 'Jaggery (Gud)'],
    ['General Store', 'Almonds & Dry Fruits'],
  ];

  const subCategoryMap = new Map<string, string>();
  for (const [catName, subName] of subcategoriesList) {
    const catId = categoryMap.get(catName);
    if (catId) {
      const slug = `${catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${subName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const sub = await prisma.subCategory.create({
        data: {
          categoryId: catId,
          name: subName,
          slug,
          active: true,
        },
      });
      subCategoryMap.set(`${catName}:${subName}`, sub.id);
    }
  }

  // 3. Brands
  const brandsList = [
    'Amul',
    'Mother Dairy',
    'Fortune',
    'Aashirvaad',
    'India Gate',
    'Daawat',
    'Tata',
    'Britannia',
    'Parle',
    'Haldiram\'s',
    'MDH',
    'Everest',
    'Catch',
    'Colgate',
    'Dove',
    'Surf Excel',
    'Ariel',
    'Coca-Cola',
    'Pepsi',
    'Patanjali',
    'Dabur',
    'Maggi',
    'Nescafe',
    'Generic',
  ];

  const brandMap = new Map<string, string>();
  for (const bName of brandsList) {
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const brand = await prisma.brand.create({
      data: { name: bName, slug, active: true },
    });
    brandMap.set(bName, brand.id);
  }

  // 4. Products Catalog with Real Images & ₹10 Spices
  const productsSeed = [
    // ----------------- ₹10 SPICES & MASALE -----------------
    {
      name: 'MDH Deggi Mirch Red Chili Powder (₹10 Pack)',
      sku: 'SPICE-10-001',
      cat: 'Spices & Masala',
      sub: 'Red Chili Powder',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Everest Turmeric Powder Haldi (₹10 Pack)',
      sku: 'SPICE-10-002',
      cat: 'Spices & Masala',
      sub: 'Turmeric Powder',
      brand: 'Everest',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Everest Garam Masala Sachet (₹10 Pack)',
      sku: 'SPICE-10-003',
      cat: 'Spices & Masala',
      sub: 'Garam Masala',
      brand: 'Everest',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'MDH Chunky Chat Masala (₹10 Sachet)',
      sku: 'SPICE-10-004',
      cat: 'Spices & Masala',
      sub: 'Chaat Masala',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Catch Sabzi Masala Special (₹10 Pack)',
      sku: 'SPICE-10-005',
      cat: 'Spices & Masala',
      sub: 'Sabzi Masala',
      brand: 'Catch',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Maggi Masala-e-Magic Sachet (₹10 Pack)',
      sku: 'SPICE-10-006',
      cat: 'Spices & Masala',
      sub: 'Seasoning & Herbs',
      brand: 'Maggi',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'MDH Kasoori Methi Fragrant (₹10 Pack)',
      sku: 'SPICE-10-007',
      cat: 'Spices & Masala',
      sub: 'Kasuri Methi',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Everest Coriander Dhaniya Powder (₹10 Pack)',
      sku: 'SPICE-10-008',
      cat: 'Spices & Masala',
      sub: 'Coriander Powder',
      brand: 'Everest',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Catch Kali Mirch Black Pepper (₹10 Pack)',
      sku: 'SPICE-10-009',
      cat: 'Spices & Masala',
      sub: 'Black Pepper',
      brand: 'Catch',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'MDH Kitchen King Masala (₹10 Sachet)',
      sku: 'SPICE-10-010',
      cat: 'Spices & Masala',
      sub: 'Garam Masala',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- STANDARD SPICES -----------------
    {
      name: 'MDH Deggi Mirch Red Chili Powder 100g',
      sku: 'SPICE-001',
      cat: 'Spices & Masala',
      sub: 'Red Chili Powder',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 95,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Everest Turmeric Powder Haldi 100g',
      sku: 'SPICE-002',
      cat: 'Spices & Masala',
      sub: 'Turmeric Powder',
      brand: 'Everest',
      unit: 'Pack',
      retailPrice: 65,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'MDH Garam Masala Blend 100g',
      sku: 'SPICE-003',
      cat: 'Spices & Masala',
      sub: 'Garam Masala',
      brand: 'MDH',
      unit: 'Pack',
      retailPrice: 110,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- RICE & GRAINS -----------------
    {
      name: 'India Gate Premium Basmati Rice',
      sku: 'RICE-001',
      cat: 'Rice & Grains',
      sub: 'Basmati Rice',
      brand: 'India Gate',
      unit: 'KG',
      retailPrice: 95,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Daawat Rozana Gold Basmati Rice',
      sku: 'RICE-002',
      cat: 'Rice & Grains',
      sub: 'Basmati Rice',
      brand: 'Daawat',
      unit: 'KG',
      retailPrice: 82,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sharbati Whole Wheat',
      sku: 'WHEAT-001',
      cat: 'Rice & Grains',
      sub: 'Wheat',
      brand: 'Generic',
      unit: 'KG',
      retailPrice: 34,
      minQty: 5,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Aashirvaad Shudh Chakki Atta',
      sku: 'ATTA-001',
      cat: 'Rice & Grains',
      sub: 'Atta',
      brand: 'Aashirvaad',
      unit: 'KG',
      retailPrice: 44,
      minQty: 5,
      image: 'https://images.unsplash.com/photo-1627735483796-039c0490b4d4?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- PULSES & LENTILS -----------------
    {
      name: 'Tata Sampann Premium Toor Dal',
      sku: 'DAL-001',
      cat: 'Pulses & Lentils',
      sub: 'Toor Dal',
      brand: 'Tata',
      unit: 'KG',
      retailPrice: 155,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1585994192701-f2fe4017ba59?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'MDH Desi Chana Dal Unpolished',
      sku: 'DAL-002',
      cat: 'Pulses & Lentils',
      sub: 'Chana Dal',
      brand: 'MDH',
      unit: 'KG',
      retailPrice: 98,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tata Sampann Moong Dal Dhuli',
      sku: 'DAL-003',
      cat: 'Pulses & Lentils',
      sub: 'Moong Dal',
      brand: 'Tata',
      unit: 'KG',
      retailPrice: 130,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Chitra Rajma Special',
      sku: 'DAL-004',
      cat: 'Pulses & Lentils',
      sub: 'Rajma',
      brand: 'Generic',
      unit: 'KG',
      retailPrice: 140,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- OILS & GHEE -----------------
    {
      name: 'Fortune Kachi Ghani Mustard Oil',
      sku: 'OIL-001',
      cat: 'Oils & Ghee',
      sub: 'Mustard Oil',
      brand: 'Fortune',
      unit: 'Litre',
      retailPrice: 158,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Fortune Sunlite Refined Sunflower Oil',
      sku: 'OIL-002',
      cat: 'Oils & Ghee',
      sub: 'Sunflower Oil',
      brand: 'Fortune',
      unit: 'Litre',
      retailPrice: 142,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Amul Pure Desi Ghee Tin',
      sku: 'GHEE-001',
      cat: 'Oils & Ghee',
      sub: 'Ghee',
      brand: 'Amul',
      unit: 'Litre',
      retailPrice: 630,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- DAIRY PRODUCTS -----------------
    {
      name: 'Mother Dairy Full Cream Milk',
      sku: 'MILK-001',
      cat: 'Dairy Products',
      sub: 'Milk',
      brand: 'Mother Dairy',
      unit: 'Litre',
      retailPrice: 68,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Amul Salted Butter 100g',
      sku: 'BUTTER-001',
      cat: 'Dairy Products',
      sub: 'Butter',
      brand: 'Amul',
      unit: 'Pack',
      retailPrice: 60,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Amul Fresh Malai Paneer 200g',
      sku: 'PANEER-001',
      cat: 'Dairy Products',
      sub: 'Paneer',
      brand: 'Amul',
      unit: 'Pack',
      retailPrice: 92,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mother Dairy Classic Curd Dahi',
      sku: 'DAHI-001',
      cat: 'Dairy Products',
      sub: 'Curd',
      brand: 'Mother Dairy',
      unit: 'Pack',
      retailPrice: 35,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Amul Processed Cheese Block',
      sku: 'CHEESE-001',
      cat: 'Dairy Products',
      sub: 'Cheese',
      brand: 'Amul',
      unit: 'Pack',
      retailPrice: 145,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- BEVERAGES -----------------
    {
      name: 'Coca-Cola Bottle 750ml',
      sku: 'BEV-001',
      cat: 'Beverages',
      sub: 'Cold Drinks',
      brand: 'Coca-Cola',
      unit: 'Bottle',
      retailPrice: 45,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Pepsi Refreshing Cold Drink 750ml',
      sku: 'BEV-002',
      cat: 'Beverages',
      sub: 'Cold Drinks',
      brand: 'Pepsi',
      unit: 'Bottle',
      retailPrice: 45,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tata Tea Premium Gold Pack',
      sku: 'TEA-001',
      cat: 'Beverages',
      sub: 'Tea',
      brand: 'Tata',
      unit: 'Pack',
      retailPrice: 160,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Nescafe Classic Instant Coffee Jar',
      sku: 'COFFEE-001',
      cat: 'Beverages',
      sub: 'Coffee',
      brand: 'Nescafe',
      unit: 'Jar',
      retailPrice: 195,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- SNACKS & PACKAGED FOODS -----------------
    {
      name: 'Britannia Good Day Butter Biscuits',
      sku: 'SNACK-001',
      cat: 'Snacks & Packaged Foods',
      sub: 'Biscuits',
      brand: 'Britannia',
      unit: 'Pack',
      retailPrice: 35,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Parle-G Original Glucose Biscuits',
      sku: 'SNACK-002',
      cat: 'Snacks & Packaged Foods',
      sub: 'Biscuits',
      brand: 'Parle',
      unit: 'Pack',
      retailPrice: 10,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Haldiram\'s Aloo Bhujia Namkeen',
      sku: 'SNACK-003',
      cat: 'Snacks & Packaged Foods',
      sub: 'Namkeen',
      brand: 'Haldiram\'s',
      unit: 'Pack',
      retailPrice: 60,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Maggi 2-Minute Masala Noodles 4-Pack',
      sku: 'SNACK-004',
      cat: 'Snacks & Packaged Foods',
      sub: 'Noodles',
      brand: 'Maggi',
      unit: 'Pack',
      retailPrice: 56,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- HOUSEHOLD & CLEANING -----------------
    {
      name: 'Surf Excel Quick Wash Detergent',
      sku: 'CLEAN-001',
      cat: 'Household & Cleaning',
      sub: 'Detergent Powder',
      brand: 'Surf Excel',
      unit: 'KG',
      retailPrice: 145,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dove Cream Beauty Bathing Soap',
      sku: 'CARE-001',
      cat: 'Personal Care',
      sub: 'Bath Soap',
      brand: 'Dove',
      unit: 'Piece',
      retailPrice: 58,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1607006314644-24e622ef72f9?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Colgate Strong Teeth Toothpaste',
      sku: 'CARE-002',
      cat: 'Personal Care',
      sub: 'Toothpaste',
      brand: 'Colgate',
      unit: 'Tube',
      retailPrice: 98,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&auto=format&fit=crop&q=80',
    },

    // ----------------- GENERAL STORE -----------------
    {
      name: 'M-30 Crystal Refined Sugar',
      sku: 'SUGAR-001',
      cat: 'General Store',
      sub: 'Sugar',
      brand: 'Generic',
      unit: 'KG',
      retailPrice: 42,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tata Salt Vacuum Evaporated Iodized',
      sku: 'SALT-001',
      cat: 'General Store',
      sub: 'Iodized Salt',
      brand: 'Tata',
      unit: 'KG',
      retailPrice: 28,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'Natural Kolhapur Jaggery (Gud)',
      sku: 'GUD-001',
      cat: 'General Store',
      sub: 'Jaggery (Gud)',
      brand: 'Generic',
      unit: 'KG',
      retailPrice: 58,
      minQty: 1,
      image: 'https://images.unsplash.com/photo-1608797178974-15b35a61dd75?w=500&auto=format&fit=crop&q=80',
    },
  ];

  const createdProducts: any[] = [];
  for (const item of productsSeed) {
    const categoryId = categoryMap.get(item.cat)!;
    const subCategoryId = subCategoryMap.get(`${item.cat}:${item.sub}`) || null;
    const brandId = brandMap.get(item.brand) || null;
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const p = await prisma.product.create({
      data: {
        sku: item.sku,
        name: item.name,
        slug,
        description: `${item.name} sourced directly with guaranteed quality checks and wholesale pricing.`,
        brandId,
        categoryId,
        subCategoryId,
        unit: item.unit,
        retailPrice: item.retailPrice,
        minimumQuantity: item.minQty,
        active: true,
        images: {
          create: [{ url: item.image, altText: item.name, sortOrder: 0, active: true }],
        },
      },
    });
    createdProducts.push(p);
  }

  // 5. Mandis
  const mandisData = [
    { name: 'Delhi Naya Bazar', slug: 'delhi-naya-bazar', city: 'Delhi', state: 'Delhi', address: 'Naya Bazar, Chandni Chowk, Delhi', pincode: '110006' },
    { name: 'Azadpur Mandi', slug: 'azadpur-mandi', city: 'Delhi', state: 'Delhi', address: 'Azadpur APMC Market, North Delhi', pincode: '110033' },
    { name: 'Ghaziabad Mandi', slug: 'ghaziabad-mandi', city: 'Ghaziabad', state: 'Uttar Pradesh', address: 'Sahibabad Mandi Road, Ghaziabad', pincode: '201005' },
    { name: 'Jaipur Muhana Mandi', slug: 'jaipur-muhana-mandi', city: 'Jaipur', state: 'Rajasthan', address: 'Muhana Mandi Complex, Jaipur', pincode: '302029' },
    { name: 'Agra Mandi', slug: 'agra-mandi', city: 'Agra', state: 'Uttar Pradesh', address: 'Fatehabad Road Mandi, Agra', pincode: '282001' },
    { name: 'Aligarh Mandi', slug: 'aligarh-mandi', city: 'Aligarh', state: 'Uttar Pradesh', address: 'Dhaniapur Mandi, Aligarh', pincode: '202001' },
    { name: 'Lucknow Mandi', slug: 'lucknow-mandi', city: 'Lucknow', state: 'Uttar Pradesh', address: 'Dubagga Mandi, Lucknow', pincode: '226003' },
    { name: 'Kanpur Mandi', slug: 'kanpur-mandi', city: 'Kanpur', state: 'Uttar Pradesh', address: 'Chakeri Mandi, Kanpur', pincode: '208007' },
  ];

  const createdMandis: any[] = [];
  for (let i = 0; i < mandisData.length; i++) {
    const m = await prisma.mandi.create({
      data: { ...mandisData[i], displayOrder: i + 1, active: true },
    });
    createdMandis.push(m);
  }

  // 6. Mandi Rates & Multi-day Historical Rates (7-30 Days)
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (const product of createdProducts) {
    const baseWholesale = Math.max(8, Math.round(Number(product.retailPrice) * 0.82));

    for (const mandi of createdMandis) {
      // Mandi variation
      const mandiOffset = (mandi.name.length % 5) - 2;
      const current = Math.max(8, baseWholesale + mandiOffset);
      const shift = ((product.name.length + mandi.name.length) % 5) - 2;
      const previous = Math.max(7, current - shift);
      const absolute = current - previous;
      const percentage = previous === 0 ? 0 : ((absolute / previous) * 100);
      const direction = absolute > 0 ? Direction.RISING : absolute < 0 ? Direction.FALLING : Direction.STABLE;

      // Current Rate
      await prisma.mandiRate.create({
        data: {
          productId: product.id,
          mandiId: mandi.id,
          date: baseDate,
          currentRate: current,
          previousRate: previous,
          minimumRate: Math.max(5, current - 2),
          maximumRate: current + 3,
          unit: product.unit,
          absoluteChange: absolute,
          percentageChange: percentage,
          direction,
          auctionDateTime: new Date(),
          active: true,
          updatedBy: 'APMC Session Admin',
        },
      });

      // Historical days (30 days of data for rich charts)
      for (let dayOffset = 0; dayOffset <= 30; dayOffset += 2) {
        const histDate = new Date(baseDate);
        histDate.setDate(histDate.getDate() - dayOffset);

        const histRate = Math.max(6, current + Math.sin(dayOffset) * 3);
        const histPrev = Math.max(5, histRate - 1);
        const histDiff = histRate - histPrev;

        await prisma.rateHistory.create({
          data: {
            productId: product.id,
            mandiId: mandi.id,
            date: histDate,
            rate: Math.round(histRate * 100) / 100,
            previousRate: Math.round(histPrev * 100) / 100,
            minimum: Math.round((histRate - 2) * 100) / 100,
            maximum: Math.round((histRate + 2) * 100) / 100,
            unit: product.unit,
            change: histDiff,
            changePercent: ((histDiff / histPrev) * 100),
            direction: histDiff > 0 ? Direction.RISING : histDiff < 0 ? Direction.FALLING : Direction.STABLE,
            updatedBy: 'Historical Archive',
          },
        });
      }
    }
  }

  // 7. Users: 1 Admin, 1 Demo Customer
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      fullName: 'KiranaMart247 Administrator',
      email: 'admin@kiranamart247.com',
      mobile: '9999999999',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      active: true,
      adminProfile: { create: {} },
    },
  });

  const customerPassword = await bcrypt.hash('Customer@123', 10);
  const customer = await prisma.user.create({
    data: {
      fullName: 'Vishal Gupta',
      email: 'customer@kiranamart247.com',
      mobile: '9876543210',
      passwordHash: customerPassword,
      role: Role.CUSTOMER,
      active: true,
      customerProfile: {
        create: {
          address: '42, Naya Bazar Wholesale Complex, Chandni Chowk',
          city: 'Delhi',
          pinCode: '110006',
        },
      },
    },
  });

  await prisma.cart.create({ data: { userId: customer.id } });

  const testCustomerPassword = await bcrypt.hash('Test@123', 10);
  const testCustomer = await prisma.user.create({
    data: {
      fullName: 'Test Customer',
      email: 'test@kiranamart247.com',
      mobile: '9876500001',
      passwordHash: testCustomerPassword,
      role: Role.CUSTOMER,
      active: true,
      customerProfile: {
        create: {
          address: 'Shop No. 12, Test Market Complex',
          city: 'Delhi',
          pinCode: '110006',
        },
      },
    },
  });

  await prisma.cart.create({ data: { userId: testCustomer.id } });

  console.log('✅ Comprehensive Seed Complete:', {
    admin: admin.email,
    customer: customer.email,
    categoriesCount: categoriesData.length,
    productsCount: createdProducts.length,
    mandisCount: createdMandis.length,
  });
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
