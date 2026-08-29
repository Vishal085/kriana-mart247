import { PrismaClient, Role, Direction } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding KiranaMart247 Full 30-Category Indian Kirana Catalogue with Small Packs (₹5/₹10)...');

  // 1. Clean slate in correct relational dependency order
  await prisma.notification.deleteMany();
  await prisma.whatsAppMessage.deleteMany();
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

  // 2. All 30 Main Categories
  const categoriesList = [
    { name: 'Milk & Dairy', slug: 'milk-dairy', description: 'Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese' },
    { name: 'Cold Drinks & Beverages', slug: 'cold-drinks-beverages', description: 'Soft drinks, fruit juices, energy drinks, and flavored drinks' },
    { name: 'Ration & Spices', slug: 'ration-spices', description: 'Daily staple grains, flours, pulses, whole & blended spices' },
    { name: 'Soaps & Personal Care', slug: 'soaps-personal-care', description: 'Bathing soaps, body washes, skin creams, and hygiene' },
    { name: 'Rice', slug: 'rice', description: 'Premium Basmati, Kolam, Sona Masoori, and everyday rice' },
    { name: 'Cooking Oil', slug: 'cooking-oil', description: 'Kachi Ghani Mustard oil, groundnut oil, and traditional cooking oils' },
    { name: 'Refined Oil', slug: 'refined-oil', description: 'Refined sunflower oil, soybean oil, and rice bran oil' },
    { name: 'Ghee & Butter', slug: 'ghee-butter', description: 'Pure cow ghee, desi danedaar ghee, salted & unsalted butter' },
    { name: 'Biscuits & Bakery', slug: 'biscuits-bakery', description: 'Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads' },
    { name: 'Snacks & Namkeen', slug: 'snacks-namkeen', description: 'Bhujia, mixture, roasted nuts, chana dal, and traditional namkeen' },
    { name: 'Atta, Maida & Suji', slug: 'atta-maida-suji', description: 'Chakki fresh whole wheat atta, fine maida, suji, and besan' },
    { name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma' },
    { name: 'Sugar, Salt & Jaggery', slug: 'sugar-salt-jaggery', description: 'Iodized salt, crystal sugar, bura, and organic gur/jaggery' },
    { name: 'Tea & Coffee', slug: 'tea-coffee', description: 'Kadak CTC tea, green tea, instant coffee, and filter coffee' },
    { name: 'Dry Fruits & Nuts', slug: 'dry-fruits-nuts', description: 'Almonds, cashews, raisins, walnuts, pistachios, and foxnuts' },
    { name: 'Masala & Spices', slug: 'masala-spices', description: 'Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets' },
    { name: 'Noodles & Pasta', slug: 'noodles-pasta', description: 'Instant 2-minute noodles, macaroni, penne pasta, and vermicelli' },
    { name: 'Chocolates & Candies', slug: 'chocolates-candies', description: 'Milk chocolates, wafer bars, toffees, lollipops, and sweets' },
    { name: 'Chips & Packaged Snacks', slug: 'chips-packaged-snacks', description: 'Potato chips, kurkure, nachos, extruded snacks, and papad' },
    { name: 'Detergent & Dishwash', slug: 'detergent-dishwash', description: 'Washing powders, liquid detergents, detergent bars, dishwash bars & gels' },
    { name: 'Shampoo & Hair Care', slug: 'shampoo-hair-care', description: 'Anti-dandruff shampoo, hair oils, conditioners, and ₹2-₹5 sachets' },
    { name: 'Toothpaste & Oral Care', slug: 'toothpaste-oral-care', description: 'Herbal & fluoride toothpaste, toothbrushes, and mouthwash' },
    { name: 'Shaving & Grooming', slug: 'shaving-grooming', description: 'Razors, shaving creams, foam, blades, and aftershave' },
    { name: 'Household Cleaning', slug: 'household-cleaning', description: 'Floor cleaners, toilet cleaners, glass cleaners, and phenyl' },
    { name: 'Tissue, Napkins & Disposable', slug: 'tissue-napkins-disposable', description: 'Kitchen towels, facial tissues, foil, and paper disposables' },
    { name: 'Pooja & Daily Essentials', slug: 'pooja-daily-essentials', description: 'Agarbatti, matchboxes, dhoop, camphor (kapoor), and cotton wicks' },
    { name: 'Baby Care', slug: 'baby-care', description: 'Baby diapers, wet wipes, baby soap, and talc' },
    { name: 'Water & Packaged Drinks', slug: 'water-packaged-drinks', description: 'Packaged mineral water, soda, and tonic water' },
    { name: 'Instant Food & Ready-to-Cook', slug: 'instant-food-ready-to-cook', description: 'Poha, soup mixes, gulab jamun mix, ketchup, and sauces' },
    { name: 'Other Kirana Essentials', slug: 'other-kirana-essentials', description: 'Batteries, mosquito repellents, candles, and utility essentials' },
  ];

  const categoryMap = new Map<string, string>();
  for (let i = 0; i < categoriesList.length; i++) {
    const cat = await prisma.category.create({
      data: { ...categoriesList[i], displayOrder: i + 1, active: true },
    });
    categoryMap.set(cat.name, cat.id);
  }

  // 3. Brands
  const brandsList = [
    'Amul', 'Mother Dairy', 'Parle', 'Britannia', 'ITC Aashirvaad', 'Tata',
    'Fortune', 'Saffola', 'Dhara', 'MDH', 'Everest', 'Catch', 'Maggi',
    'Coca-Cola', 'Pepsi', 'Thums Up', 'Sprite', 'Sting', 'Haldiram\'s',
    'Bikaji', 'Lay\'s', 'Kurkure', 'Cadbury Dairy Milk', 'KitKat', 'Nestle',
    'Surf Excel', 'Ariel', 'Rin', 'Vim', 'Pril', 'Dettol', 'Lifebuoy',
    'Lux', 'Dove', 'Colgate', 'Pepsodent', 'Dabur', 'Clinic Plus',
    'Head & Shoulders', 'Gillette', 'Harpic', 'Lizol', 'Colin', 'Good Knight',
    'All Out', 'Cycle', 'Mangaldeep', 'Pampers', 'MamyPoko', 'Bisleri',
    'Kinley', 'Knorr', 'Kissan', 'Everest Masala', 'MDH Spices', 'Patanjali',
    'Gowardhan', 'Fortune Sunlite', 'India Gate', 'Daawat', 'Gemini'
  ];

  const brandMap = new Map<string, string>();
  for (const b of brandsList) {
    const slug = b.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const createdBrand = await prisma.brand.upsert({
      where: { name: b },
      update: {},
      create: { name: b, slug, active: true },
    });
    brandMap.set(b, createdBrand.id);
  }

  // 4. SubCategories
  const subCategoriesData: Array<{ cat: string; name: string; slug: string }> = [
    // Milk & Dairy
    { cat: 'Milk & Dairy', name: 'Milk Pouches', slug: 'milk-pouches' },
    { cat: 'Milk & Dairy', name: 'Butter & Paneer', slug: 'butter-paneer' },
    { cat: 'Milk & Dairy', name: 'Curd & Cream', slug: 'curd-cream' },
    // Cold Drinks & Beverages
    { cat: 'Cold Drinks & Beverages', name: 'Carbonated Soft Drinks', slug: 'carbonated-soft-drinks' },
    { cat: 'Cold Drinks & Beverages', name: 'Fruit Juices & Drinks', slug: 'fruit-juices-drinks' },
    { cat: 'Cold Drinks & Beverages', name: 'Energy & Canned Drinks', slug: 'energy-canned-drinks' },
    // Biscuits & Bakery
    { cat: 'Biscuits & Bakery', name: 'Glucose Biscuits', slug: 'glucose-biscuits' },
    { cat: 'Biscuits & Bakery', name: 'Cookies & Marie', slug: 'cookies-marie' },
    { cat: 'Biscuits & Bakery', name: 'Cream & Salted Biscuits', slug: 'cream-salted-biscuits' },
    { cat: 'Biscuits & Bakery', name: 'Rusk & Breads', slug: 'rusk-breads' },
    // Atta, Maida & Suji
    { cat: 'Atta, Maida & Suji', name: 'Whole Wheat Atta', slug: 'whole-wheat-atta' },
    { cat: 'Atta, Maida & Suji', name: 'Maida & Suji', slug: 'maida-suji' },
    { cat: 'Atta, Maida & Suji', name: 'Besan & Sattu', slug: 'besan-sattu' },
    // Dal & Pulses
    { cat: 'Dal & Pulses', name: 'Toor & Arhar Dal', slug: 'toor-arhar-dal' },
    { cat: 'Dal & Pulses', name: 'Moong & Masoor Dal', slug: 'moong-masoor-dal' },
    { cat: 'Dal & Pulses', name: 'Chana & Urad Dal', slug: 'chana-urad-dal' },
    { cat: 'Dal & Pulses', name: 'Rajma & Chhole', slug: 'rajma-chhole' },
    // Rice
    { cat: 'Rice', name: 'Basmati Rice', slug: 'basmati-rice' },
    { cat: 'Rice', name: 'Non-Basmati & Kolam', slug: 'non-basmati-kolam' },
    // Cooking Oil & Refined Oil
    { cat: 'Cooking Oil', name: 'Mustard Oil (Kachi Ghani)', slug: 'mustard-oil' },
    { cat: 'Cooking Oil', name: 'Groundnut & Til Oil', slug: 'groundnut-til-oil' },
    { cat: 'Refined Oil', name: 'Refined Sunflower Oil', slug: 'refined-sunflower-oil' },
    { cat: 'Refined Oil', name: 'Refined Soybean Oil', slug: 'refined-soybean-oil' },
    // Ghee & Butter
    { cat: 'Ghee & Butter', name: 'Desi Cow Ghee', slug: 'desi-cow-ghee' },
    { cat: 'Ghee & Butter', name: 'Table Butter', slug: 'table-butter' },
    // Sugar, Salt & Jaggery
    { cat: 'Sugar, Salt & Jaggery', name: 'Iodized Salt', slug: 'iodized-salt' },
    { cat: 'Sugar, Salt & Jaggery', name: 'Refined Sugar & Bura', slug: 'refined-sugar-bura' },
    { cat: 'Sugar, Salt & Jaggery', name: 'Jaggery (Gur)', slug: 'jaggery-gur' },
    // Tea & Coffee
    { cat: 'Tea & Coffee', name: 'CTC Leaf Tea', slug: 'ctc-leaf-tea' },
    { cat: 'Tea & Coffee', name: 'Instant & Filter Coffee', slug: 'instant-filter-coffee' },
    // Masala & Spices
    { cat: 'Masala & Spices', name: 'Daily Ground Spices', slug: 'daily-ground-spices' },
    { cat: 'Masala & Spices', name: '₹10 Spice Sachets', slug: '10-rupee-spice-sachets' },
    { cat: 'Masala & Spices', name: 'Blended Masala Powders', slug: 'blended-masala-powders' },
    { cat: 'Masala & Spices', name: 'Whole Spices (Khada Masala)', slug: 'whole-spices' },
    // Snacks & Namkeen + Chips
    { cat: 'Snacks & Namkeen', name: 'Bhujia & Sev', slug: 'bhujia-sev' },
    { cat: 'Snacks & Namkeen', name: 'Mixtures & Namkeen', slug: 'mixtures-namkeen' },
    { cat: 'Chips & Packaged Snacks', name: 'Potato Chips', slug: 'potato-chips' },
    { cat: 'Chips & Packaged Snacks', name: 'Kurkure & Extruded', slug: 'kurkure-extruded' },
    // Noodles & Instant Food
    { cat: 'Noodles & Pasta', name: 'Instant 2-Minute Noodles', slug: 'instant-noodles' },
    { cat: 'Noodles & Pasta', name: 'Pasta & Vermicelli', slug: 'pasta-vermicelli' },
    { cat: 'Instant Food & Ready-to-Cook', name: 'Poha & Ready Mixes', slug: 'poha-ready-mixes' },
    { cat: 'Instant Food & Ready-to-Cook', name: 'Sauces & Ketchup', slug: 'sauces-ketchup' },
    // Chocolates & Candies
    { cat: 'Chocolates & Candies', name: 'Milk & Dark Chocolates', slug: 'milk-dark-chocolates' },
    { cat: 'Chocolates & Candies', name: 'Wafer Bars & Toffees', slug: 'wafer-bars-toffees' },
    // Personal Care & Soaps
    { cat: 'Soaps & Personal Care', name: 'Bathing Soap Bars', slug: 'bathing-soap-bars' },
    { cat: 'Soaps & Personal Care', name: 'Body Wash & Handwash', slug: 'body-wash-handwash' },
    { cat: 'Shampoo & Hair Care', name: 'Hair Shampoo & Sachets', slug: 'hair-shampoo-sachets' },
    { cat: 'Shampoo & Hair Care', name: 'Hair Oils', slug: 'hair-oils' },
    { cat: 'Toothpaste & Oral Care', name: 'Toothpaste & Powders', slug: 'toothpaste-powders' },
    { cat: 'Toothpaste & Oral Care', name: 'Toothbrushes', slug: 'toothbrushes' },
    { cat: 'Shaving & Grooming', name: 'Razors & Blades', slug: 'razors-blades' },
    { cat: 'Shaving & Grooming', name: 'Shaving Creams', slug: 'shaving-creams' },
    // Cleaning & Detergents
    { cat: 'Detergent & Dishwash', name: 'Washing Powders', slug: 'washing-powders' },
    { cat: 'Detergent & Dishwash', name: 'Detergent Bars', slug: 'detergent-bars' },
    { cat: 'Detergent & Dishwash', name: 'Dishwash Bars & Liquids', slug: 'dishwash-bars-liquids' },
    { cat: 'Household Cleaning', name: 'Floor & Toilet Cleaners', slug: 'floor-toilet-cleaners' },
    { cat: 'Household Cleaning', name: 'Glass Cleaners & Phenyl', slug: 'glass-cleaners-phenyl' },
    // Disposables, Pooja, Baby Care, Water, Others
    { cat: 'Tissue, Napkins & Disposable', name: 'Kitchen Foil & Tissues', slug: 'kitchen-foil-tissues' },
    { cat: 'Pooja & Daily Essentials', name: 'Agarbatti & Dhoop', slug: 'agarbatti-dhoop' },
    { cat: 'Pooja & Daily Essentials', name: 'Matchbox & Camphor', slug: 'matchbox-camphor' },
    { cat: 'Baby Care', name: 'Baby Diapers & Wipes', slug: 'baby-diapers-wipes' },
    { cat: 'Water & Packaged Drinks', name: 'Packaged Mineral Water', slug: 'packaged-mineral-water' },
    { cat: 'Dry Fruits & Nuts', name: 'Almonds & Cashews', slug: 'almonds-cashews' },
    { cat: 'Dry Fruits & Nuts', name: 'Raisins, Walnuts & Foxnuts', slug: 'raisins-walnuts-foxnuts' },
    { cat: 'Ration & Spices', name: 'Daily Whole Grains', slug: 'daily-whole-grains' },
    { cat: 'Other Kirana Essentials', name: 'Mosquito Repellents', slug: 'mosquito-repellents' },
    { cat: 'Other Kirana Essentials', name: 'Batteries & Candles', slug: 'batteries-candles' },
  ];

  const subCatMap = new Map<string, string>();
  for (let i = 0; i < subCategoriesData.length; i++) {
    const sc = subCategoriesData[i];
    const catId = categoryMap.get(sc.cat);
    if (!catId) continue;
    const created = await prisma.subCategory.create({
      data: {
        categoryId: catId,
        name: sc.name,
        slug: sc.slug,
        displayOrder: i + 1,
        active: true,
      },
    });
    subCatMap.set(sc.name, created.id);
  }

  // 5. Delhi Wholesale Mandis for Live Rates & AI updates
  const mandisData = [
    { name: 'Naya Bazar Mandi', slug: 'naya-bazar-mandi', city: 'Delhi', state: 'Delhi', address: 'Old Delhi, Delhi 110006', description: 'Asia\'s premier wholesale grain, pulses, rice, oil and dry fruit market.' },
    { name: 'Khari Baoli Spice Mandi', slug: 'khari-baoli-spice-mandi', city: 'Delhi', state: 'Delhi', address: 'Chandni Chowk, Delhi 110006', description: 'Asia\'s largest wholesale spice and dry fruits trading mandi.' },
    { name: 'Azadpur APMC Mandi', slug: 'azadpur-apmc-mandi', city: 'Delhi', state: 'Delhi', address: 'GT Karnal Road, Delhi 110033', description: 'National capital\'s largest APMC regulated terminal trading hub.' },
    { name: 'Okhla Mandi', slug: 'okhla-mandi', city: 'Delhi', state: 'Delhi', address: 'Okhla Phase II, New Delhi 110020', description: 'South Delhi wholesale commodity auction and redistribution mandi.' },
    { name: 'Ghazipur APMC Mandi', slug: 'ghazipur-apmc-mandi', city: 'Delhi', state: 'Delhi', address: 'Ghazipur, East Delhi 110096', description: 'East Delhi & UP border primary wholesale commodity market.' },
    { name: 'Keshopur APMC Mandi', slug: 'keshopur-apmc-mandi', city: 'Delhi', state: 'Delhi', address: 'Outer Ring Road, Tilak Nagar, New Delhi 110018', description: 'West Delhi primary distribution hub.' },
    { name: 'Shahdara Grain Mandi', slug: 'shahdara-grain-mandi', city: 'Delhi', state: 'Delhi', address: 'Shahdara, North East Delhi 110032', description: 'Trans-Yamuna wholesale grains and staples market.' },
    { name: 'Najafgarh Grain Mandi', slug: 'najafgarh-grain-mandi', city: 'Delhi', state: 'Delhi', address: 'Najafgarh, South West Delhi 110043', description: 'South-West Delhi agro-wholesale exchange.' },
  ];

  const mandis = [];
  for (const m of mandisData) {
    const createdMandi = await prisma.mandi.create({ data: m });
    mandis.push(createdMandi);
  }

  // 6. Comprehensive Product Catalogue with ALL Small Pack Sizes (₹5/₹10/sachets/pouches/family packs)
  interface ProductSeed {
    sku: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    brand: string;
    unit: string;
    retailPrice: number;
    description: string;
    searchKeywords: string;
    image: string;
    minQty?: number;
    maxQty?: number;
    baseRate?: number; // for mandi rate generation
  }

  const catalogue: ProductSeed[] = [
    // -------------------------------------------------------------
    // 1. BISCUITS & BAKERY (With ₹5, ₹10, ₹20 & Family Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-BIS-PARLE-50G',
      name: 'Parle-G Glucose Biscuits (₹5 Small Pack - 50g)',
      slug: 'parle-g-glucose-biscuits-50g-rs-5',
      category: 'Biscuits & Bakery',
      subCategory: 'Glucose Biscuits',
      brand: 'Parle',
      unit: '50g Pack',
      retailPrice: 5.00,
      description: 'Original Parle-G glucose biscuits small ₹5 kirana pocket pack. Rich in milk and wheat goodness.',
      searchKeywords: 'parle g, biscuit, parle 5 rupee, glucose biscuit, tea snack, 50g',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-PARLE-110G',
      name: 'Parle-G Glucose Biscuits (₹10 Regular Pack - 110g)',
      slug: 'parle-g-glucose-biscuits-110g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Glucose Biscuits',
      brand: 'Parle',
      unit: '110g Pack',
      retailPrice: 10.00,
      description: 'Standard ₹10 Parle-G daily family pack. Fresh and crispy with hot chai.',
      searchKeywords: 'parle g 10 rs, 110g, biscuits, tea time snack',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-PARLE-800G',
      name: 'Parle-G Glucose Biscuits Family Mega Pack (800g)',
      slug: 'parle-g-glucose-biscuits-800g-family-pack',
      category: 'Biscuits & Bakery',
      subCategory: 'Glucose Biscuits',
      brand: 'Parle',
      unit: '800g Pack',
      retailPrice: 78.00,
      description: 'Mega value family pack of Parle-G 800g. Best savings for monthly grocery.',
      searchKeywords: 'parle g family pack, 800g, wholesale biscuit, bulk',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-MARIE-75G',
      name: 'Britannia Marie Gold Biscuits (₹10 Small Pack - 75g)',
      slug: 'britannia-marie-gold-75g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cookies & Marie',
      brand: 'Britannia',
      unit: '75g Pack',
      retailPrice: 10.00,
      description: 'Light, crispy tea-time Marie Gold biscuit in convenient ₹10 pack. Zero trans fat.',
      searchKeywords: 'marie gold, britannia marie, 10 rs marie, tea biscuit',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-MARIE-250G',
      name: 'Britannia Marie Gold Tea Biscuits (250g Regular)',
      slug: 'britannia-marie-gold-250g-regular',
      category: 'Biscuits & Bakery',
      subCategory: 'Cookies & Marie',
      brand: 'Britannia',
      unit: '250g Pack',
      retailPrice: 35.00,
      description: 'Popular 250g Marie Gold pack for daily morning & evening family chai.',
      searchKeywords: 'marie gold 250g, britannia biscuit, tea biscuit',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-GOODDAY-35G',
      name: 'Britannia Good Day Butter Cookies (₹5 Small Pack - 35g)',
      slug: 'britannia-good-day-butter-cookies-35g-rs-5',
      category: 'Biscuits & Bakery',
      subCategory: 'Cookies & Marie',
      brand: 'Britannia',
      unit: '35g Pack',
      retailPrice: 5.00,
      description: 'Rich buttery smile cookies in convenient ₹5 small snack pack.',
      searchKeywords: 'good day 5 rs, butter cookies, britannia good day, 35g',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-GOODDAY-66G',
      name: 'Britannia Good Day Cashew Cookies (₹10 Pack - 66g)',
      slug: 'britannia-good-day-cashew-cookies-66g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cookies & Marie',
      brand: 'Britannia',
      unit: '66g Pack',
      retailPrice: 10.00,
      description: 'Loaded with real crunchy kaju cashew nuts in classic ₹10 pack.',
      searchKeywords: 'good day kaju 10 rs, cashew cookies, britannia',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-BOURBON-50G',
      name: 'Britannia Bourbon Chocolate Cream Biscuits (₹10 Pack - 50g)',
      slug: 'britannia-bourbon-chocolate-cream-50g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cream & Salted Biscuits',
      brand: 'Britannia',
      unit: '50g Pack',
      retailPrice: 10.00,
      description: 'Delicious chocolate cream filled crunchy biscuits sprinkled with sugar crystals.',
      searchKeywords: 'bourbon biscuit 10 rs, chocolate cream biscuit, britannia',
      image: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-HIDE-SEEK-33G',
      name: 'Parle Hide & Seek Choco Chip Biscuits (₹10 Pack - 33g)',
      slug: 'parle-hide-and-seek-choco-chip-33g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cookies & Marie',
      brand: 'Parle',
      unit: '33g Pack',
      retailPrice: 10.00,
      description: 'Mouth melting rich chocolate cookies with real chocolate chips in ₹10 pack.',
      searchKeywords: 'hide and seek 10 rs, choco chip biscuit, parle hide seek',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-MONACO-50G',
      name: 'Parle Monaco Salted Classic Biscuits (₹10 Pack - 50g)',
      slug: 'parle-monaco-salted-biscuits-50g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cream & Salted Biscuits',
      brand: 'Parle',
      unit: '50g Pack',
      retailPrice: 10.00,
      description: 'Light, crunchy and salty classic Monaco biscuits for evening snacks.',
      searchKeywords: 'monaco biscuit 10 rs, salted biscuit, parle monaco',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BIS-KRACKJACK-60G',
      name: 'Parle Krackjack Sweet & Salty Biscuits (₹10 Pack - 60g)',
      slug: 'parle-krackjack-sweet-and-salty-60g-rs-10',
      category: 'Biscuits & Bakery',
      subCategory: 'Cream & Salted Biscuits',
      brand: 'Parle',
      unit: '60g Pack',
      retailPrice: 10.00,
      description: 'India\'s original sweet and salty biscuit in ₹10 snack pack.',
      searchKeywords: 'krackjack 10 rs, sweet salty biscuit, parle',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 2. MILK & DAIRY (Pouches, Butter, Paneer, Curd)
    // -------------------------------------------------------------
    {
      sku: 'KM-DAIRY-AMUL-TONED-500ML',
      name: 'Amul Taaza Homogenised Toned Milk (500ml Pouch)',
      slug: 'amul-taaza-toned-milk-500ml-pouch',
      category: 'Milk & Dairy',
      subCategory: 'Milk Pouches',
      brand: 'Amul',
      unit: '500ml Pouch',
      retailPrice: 28.00,
      description: 'Fresh pasteurised toned milk with 3.0% Fat and 8.5% SNF. Daily fresh supply.',
      searchKeywords: 'amul taaza milk 500ml, toned milk pouch, fresh amul doodh',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
      baseRate: 26.50,
    },
    {
      sku: 'KM-DAIRY-AMUL-GOLD-500ML',
      name: 'Amul Gold Full Cream Milk (500ml Pouch)',
      slug: 'amul-gold-full-cream-milk-500ml-pouch',
      category: 'Milk & Dairy',
      subCategory: 'Milk Pouches',
      brand: 'Amul',
      unit: '500ml Pouch',
      retailPrice: 34.00,
      description: 'Rich full cream milk with 6.0% Fat and 9.0% SNF. Perfect for tea, sweets, and paneer.',
      searchKeywords: 'amul gold milk, full cream milk pouch, 500ml',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80',
      baseRate: 32.00,
    },
    {
      sku: 'KM-DAIRY-MD-TONED-500ML',
      name: 'Mother Dairy Toned Fresh Milk (500ml Pouch)',
      slug: 'mother-dairy-toned-milk-500ml-pouch',
      category: 'Milk & Dairy',
      subCategory: 'Milk Pouches',
      brand: 'Mother Dairy',
      unit: '500ml Pouch',
      retailPrice: 28.00,
      description: 'Vitamin A & D enriched pasteurised toned milk from Mother Dairy.',
      searchKeywords: 'mother dairy milk 500ml, toned milk, delhi fresh milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
      baseRate: 26.50,
    },
    {
      sku: 'KM-DAIRY-AMUL-BUTTER-20G',
      name: 'Amul Pasteurised Salted Butter (₹10 Single Serve Blister - 20g)',
      slug: 'amul-butter-20g-rs-10-blister',
      category: 'Milk & Dairy',
      subCategory: 'Butter & Paneer',
      brand: 'Amul',
      unit: '20g Blister Pack',
      retailPrice: 10.00,
      description: 'Single serving ₹10 Amul Butter tub. Ideal for single toast or paratha.',
      searchKeywords: 'amul butter 10 rs, small butter pack, 20g amul butter',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DAIRY-AMUL-BUTTER-100G',
      name: 'Amul Pasteurised Salted Butter (100g Block)',
      slug: 'amul-butter-100g-block',
      category: 'Milk & Dairy',
      subCategory: 'Butter & Paneer',
      brand: 'Amul',
      unit: '100g Pack',
      retailPrice: 58.00,
      description: 'Taste of India classic 100g butter block. Delicious on breakfast toast.',
      searchKeywords: 'amul butter 100g, yellow butter, salted butter',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DAIRY-AMUL-PANEER-200G',
      name: 'Amul Malai Fresh Paneer (200g Vacuum Pack)',
      slug: 'amul-malai-fresh-paneer-200g',
      category: 'Milk & Dairy',
      subCategory: 'Butter & Paneer',
      brand: 'Amul',
      unit: '200g Pack',
      retailPrice: 92.00,
      description: 'Soft and succulent fresh malai paneer for curries, shahi paneer, and tikkas.',
      searchKeywords: 'amul paneer 200g, malai paneer, fresh paneer block',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
      baseRate: 85.00,
    },
    {
      sku: 'KM-DAIRY-AMUL-DAHI-200G',
      name: 'Amul Masti Dahi Pouch (₹15 Small Pack - 200g)',
      slug: 'amul-masti-dahi-200g-pouch',
      category: 'Milk & Dairy',
      subCategory: 'Curd & Cream',
      brand: 'Amul',
      unit: '200g Pouch',
      retailPrice: 15.00,
      description: 'Thick, creamy and delicious homestyle curd in ₹15 pouch.',
      searchKeywords: 'amul dahi 200g, masti dahi, curd pouch, yogurt',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 3. COLD DRINKS & BEVERAGES (₹10/₹20 Bottles, Cans, Juices)
    // -------------------------------------------------------------
    {
      sku: 'KM-BEV-STING-250ML',
      name: 'Sting Energy Drink (₹20 Bottle - 250ml)',
      slug: 'sting-energy-drink-250ml-rs-20',
      category: 'Cold Drinks & Beverages',
      subCategory: 'Energy & Canned Drinks',
      brand: 'Sting',
      unit: '250ml Bottle',
      retailPrice: 20.00,
      description: 'Instant energy booster cold drink in popular ₹20 chilled PET bottle.',
      searchKeywords: 'sting 20 rs, sting energy drink 250ml, red energy drink',
      image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-COCACOLA-250ML',
      name: 'Coca-Cola Soft Drink (₹20 Small Bottle - 250ml)',
      slug: 'coca-cola-250ml-bottle-rs-20',
      category: 'Cold Drinks & Beverages',
      subCategory: 'Carbonated Soft Drinks',
      brand: 'Coca-Cola',
      unit: '250ml Bottle',
      retailPrice: 20.00,
      description: 'Classic refreshing Coca-Cola in handy single-serve ₹20 PET bottle.',
      searchKeywords: 'coca cola 250ml, coke 20 rs, cold drink small bottle',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-THUMSUP-250ML',
      name: 'Thums Up Charged Soft Drink (₹20 Small Bottle - 250ml)',
      slug: 'thums-up-250ml-bottle-rs-20',
      category: 'Cold Drinks & Beverages',
      subCategory: 'Carbonated Soft Drinks',
      brand: 'Thums Up',
      unit: '250ml Bottle',
      retailPrice: 20.00,
      description: 'Toofani strong fizzy cola taste in handy ₹20 bottle.',
      searchKeywords: 'thums up 250ml, thumps up 20 rs, strong cola',
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-SPRITE-250ML',
      name: 'Sprite Lemon-Lime Soft Drink (₹20 Small Bottle - 250ml)',
      slug: 'sprite-250ml-bottle-rs-20',
      category: 'Cold Drinks & Beverages',
      subCategory: 'Carbonated Soft Drinks',
      brand: 'Sprite',
      unit: '250ml Bottle',
      retailPrice: 20.00,
      description: 'Clear lime refreshment with 100% crisp taste in ₹20 bottle.',
      searchKeywords: 'sprite 250ml, sprite 20 rs, lemon cold drink',
      image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-FROOTI-125ML',
      name: 'Parle Frooti Mango Drink (₹10 Tetra Pack - 125ml)',
      slug: 'parle-frooti-mango-125ml-rs-10',
      category: 'Cold Drinks & Beverages',
      subCategory: 'Fruit Juices & Drinks',
      brand: 'Parle',
      unit: '125ml Tetra Pack',
      retailPrice: 10.00,
      description: 'Real Alphonso mango pulp juice with straw in iconic ₹10 pack.',
      searchKeywords: 'frooti 10 rs, mango juice tetra pack, parle frooti',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-BISLERI-500ML',
      name: 'Bisleri Packaged Mineral Water (₹10 Bottle - 500ml)',
      slug: 'bisleri-mineral-water-500ml-rs-10',
      category: 'Water & Packaged Drinks',
      subCategory: 'Packaged Mineral Water',
      brand: 'Bisleri',
      unit: '500ml Bottle',
      retailPrice: 10.00,
      description: 'Purified mineral water with essential minerals in ₹10 travel bottle.',
      searchKeywords: 'bisleri 500ml, water bottle 10 rs, mineral water',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BEV-BISLERI-1L',
      name: 'Bisleri Packaged Mineral Water (1 Litre Bottle)',
      slug: 'bisleri-mineral-water-1l-bottle',
      category: 'Water & Packaged Drinks',
      subCategory: 'Packaged Mineral Water',
      brand: 'Bisleri',
      unit: '1 Litre Bottle',
      retailPrice: 20.00,
      description: 'Standard 1L Bisleri drinking water with tamper-evident seal.',
      searchKeywords: 'bisleri 1 litre, water bottle 20 rs, packaged water',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 4. ATTA, MAIDA & SUJI (1kg, 5kg, 10kg Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-RATION-AASH-ATTA-1KG',
      name: 'Aashirvaad Shudh Chakki Atta (1kg Small Trial Pack)',
      slug: 'aashirvaad-chakki-atta-1kg-pack',
      category: 'Atta, Maida & Suji',
      subCategory: 'Whole Wheat Atta',
      brand: 'ITC Aashirvaad',
      unit: '1kg Pouch',
      retailPrice: 48.00,
      description: '100% pure whole wheat MP grains ground with chakki-fresh technology.',
      searchKeywords: 'aashirvaad atta 1kg, wheat flour, chakki atta, roti flour',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
      baseRate: 44.00,
    },
    {
      sku: 'KM-RATION-AASH-ATTA-5KG',
      name: 'Aashirvaad Shudh Chakki Atta (5kg Family Pack)',
      slug: 'aashirvaad-chakki-atta-5kg-pack',
      category: 'Atta, Maida & Suji',
      subCategory: 'Whole Wheat Atta',
      brand: 'ITC Aashirvaad',
      unit: '5kg Bag',
      retailPrice: 235.00,
      description: 'Standard 5kg family pack for soft rotis and fluffy phulkas.',
      searchKeywords: 'aashirvaad atta 5kg, wheat atta bag, wholesale atta',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
      baseRate: 215.00,
    },
    {
      sku: 'KM-RATION-AASH-ATTA-10KG',
      name: 'Aashirvaad Shudh Chakki Atta (10kg Wholesale Bag)',
      slug: 'aashirvaad-chakki-atta-10kg-bag',
      category: 'Atta, Maida & Suji',
      subCategory: 'Whole Wheat Atta',
      brand: 'ITC Aashirvaad',
      unit: '10kg Bag',
      retailPrice: 460.00,
      description: 'Wholesale 10kg family monthly ration bag at direct mandi discount.',
      searchKeywords: 'aashirvaad atta 10kg, bulk wheat flour, wholesale bag',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
      baseRate: 420.00,
    },
    {
      sku: 'KM-RATION-MAIDA-500G',
      name: 'Premium Superfine Maida (500g Pouch)',
      slug: 'premium-superfine-maida-500g',
      category: 'Atta, Maida & Suji',
      subCategory: 'Maida & Suji',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 28.00,
      description: 'Super fine all-purpose refined wheat flour for samosa, bhature, and cakes.',
      searchKeywords: 'maida 500g, refined flour, all purpose flour, samosa maida',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
      baseRate: 25.00,
    },
    {
      sku: 'KM-RATION-SUJI-500G',
      name: 'Crispy Roasted Sooji / Rawa (500g Pouch)',
      slug: 'crispy-sooji-rawa-500g',
      category: 'Atta, Maida & Suji',
      subCategory: 'Maida & Suji',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 32.00,
      description: 'Granular semolina rawa for crispy halwa, upma, idli, and chilla.',
      searchKeywords: 'suji 500g, rawa, semolina, halwa suji',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
      baseRate: 28.00,
    },
    {
      sku: 'KM-RATION-BESAN-500G',
      name: 'Tata Sampann Fine Pure Gram Flour Besan (500g)',
      slug: 'tata-sampann-gram-flour-besan-500g',
      category: 'Atta, Maida & Suji',
      subCategory: 'Besan & Sattu',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 58.00,
      description: '100% unpolished chana dal besan for pakodas, kadhi, and laddoos.',
      searchKeywords: 'besan 500g, tata besan, chana dal flour, gram flour',
      image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=500&auto=format&fit=crop&q=80',
      baseRate: 52.00,
    },

    // -------------------------------------------------------------
    // 5. DAL & PULSES (500g, 1kg & Small Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-DAL-TOOR-500G',
      name: 'Unpolished Desi Toor / Arhar Dal (500g Pouch)',
      slug: 'unpolished-desi-toor-arhar-dal-500g',
      category: 'Dal & Pulses',
      subCategory: 'Toor & Arhar Dal',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 84.00,
      description: 'Naturally unpolished protein-rich yellow Arhar/Toor dal from Naya Bazar Mandi.',
      searchKeywords: 'toor dal 500g, arhar dal, yellow dal, pulses',
      image: 'https://images.unsplash.com/photo-1585994192704-5e5d38e21976?w=500&auto=format&fit=crop&q=80',
      baseRate: 76.00,
    },
    {
      sku: 'KM-DAL-TOOR-1KG',
      name: 'Unpolished Desi Toor / Arhar Dal (1kg Bag)',
      slug: 'unpolished-desi-toor-arhar-dal-1kg',
      category: 'Dal & Pulses',
      subCategory: 'Toor & Arhar Dal',
      brand: 'Tata',
      unit: '1kg Bag',
      retailPrice: 165.00,
      description: 'Pure 1kg Toor dal bag for everyday nutritious dal-tadka.',
      searchKeywords: 'toor dal 1kg, arhar dal 1kg, wholesale dal',
      image: 'https://images.unsplash.com/photo-1585994192704-5e5d38e21976?w=500&auto=format&fit=crop&q=80',
      baseRate: 152.00,
    },
    {
      sku: 'KM-DAL-MOONG-DHULI-500G',
      name: 'Moong Dal Dhuli (Yellow Split - 500g Pouch)',
      slug: 'moong-dal-dhuli-yellow-split-500g',
      category: 'Dal & Pulses',
      subCategory: 'Moong & Masoor Dal',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 62.00,
      description: 'Quick-cooking, easy-to-digest yellow split moong dal for khichdi and soups.',
      searchKeywords: 'moong dal 500g, dhuli moong, yellow split dal, khichdi dal',
      image: 'https://images.unsplash.com/photo-1585994192704-5e5d38e21976?w=500&auto=format&fit=crop&q=80',
      baseRate: 56.00,
    },
    {
      sku: 'KM-DAL-CHANA-500G',
      name: 'Desi Chana Dal (500g Pouch)',
      slug: 'desi-chana-dal-500g-pouch',
      category: 'Dal & Pulses',
      subCategory: 'Chana & Urad Dal',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 49.00,
      description: 'Crisp unpolished chana dal for tadka, vada, and dal fry.',
      searchKeywords: 'chana dal 500g, bengal gram split, dal',
      image: 'https://images.unsplash.com/photo-1585994192704-5e5d38e21976?w=500&auto=format&fit=crop&q=80',
      baseRate: 44.00,
    },
    {
      sku: 'KM-DAL-RAJMA-CHITRA-500G',
      name: 'Kashmiri Chitra Rajma (Kidney Beans - 500g Pouch)',
      slug: 'kashmiri-chitra-rajma-500g',
      category: 'Dal & Pulses',
      subCategory: 'Rajma & Chhole',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 78.00,
      description: 'Soft-boiling authentic speckled Chitra Rajma for Punjabi Rajma Chawal.',
      searchKeywords: 'rajma 500g, chitra rajma, kidney beans, rajma chawal',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      baseRate: 70.00,
    },

    // -------------------------------------------------------------
    // 6. RICE (1kg, 5kg Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-RICE-BASMATI-FEAST-1KG',
      name: 'India Gate Feast Rozzana Basmati Rice (1kg Pack)',
      slug: 'india-gate-rozzana-basmati-rice-1kg',
      category: 'Rice',
      subCategory: 'Basmati Rice',
      brand: 'India Gate',
      unit: '1kg Bag',
      retailPrice: 95.00,
      description: 'Fluffy, aromatic medium-long grain basmati rice for daily family meals.',
      searchKeywords: 'india gate basmati 1kg, rozzana rice, daily basmati',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
      baseRate: 88.00,
    },
    {
      sku: 'KM-RICE-BASMATI-CLASSIC-5KG',
      name: 'India Gate Classic Royal Basmati Rice (5kg Bag)',
      slug: 'india-gate-classic-royal-basmati-5kg-bag',
      category: 'Rice',
      subCategory: 'Basmati Rice',
      brand: 'India Gate',
      unit: '5kg Bag',
      retailPrice: 590.00,
      description: 'Aged extra long grain pearl white basmati rice for royal biryani & pulao.',
      searchKeywords: 'india gate classic 5kg, biryani basmati rice, royal basmati',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
      baseRate: 540.00,
    },
    {
      sku: 'KM-RICE-SONA-MASOORI-1KG',
      name: 'Premium Sona Masoori Raw Rice (1kg Pouch)',
      slug: 'premium-sona-masoori-rice-1kg',
      category: 'Rice',
      subCategory: 'Non-Basmati & Kolam',
      brand: 'Tata',
      unit: '1kg Bag',
      retailPrice: 58.00,
      description: 'Lightweight, fragrant South Indian Sona Masoori rice for daily rice & sambar.',
      searchKeywords: 'sona masoori 1kg, raw rice, non basmati rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
      baseRate: 52.00,
    },

    // -------------------------------------------------------------
    // 7. COOKING OIL & REFINED OIL (200ml, 500ml, 1L, 5L)
    // -------------------------------------------------------------
    {
      sku: 'KM-OIL-FORTUNE-MUSTARD-500ML',
      name: 'Fortune Kachi Ghani Pure Mustard Oil (500ml Bottle)',
      slug: 'fortune-kachi-ghani-mustard-oil-500ml-bottle',
      category: 'Cooking Oil',
      subCategory: 'Mustard Oil (Kachi Ghani)',
      brand: 'Fortune',
      unit: '500ml Bottle',
      retailPrice: 88.00,
      description: 'Pungent cold-pressed raw mustard oil in convenient 500ml PET bottle.',
      searchKeywords: 'fortune mustard oil 500ml, sarson ka tel, kachi ghani',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
      baseRate: 80.00,
    },
    {
      sku: 'KM-OIL-FORTUNE-MUSTARD-1L',
      name: 'Fortune Kachi Ghani Pure Mustard Oil (1 Litre Pouch)',
      slug: 'fortune-kachi-ghani-mustard-oil-1l-pouch',
      category: 'Cooking Oil',
      subCategory: 'Mustard Oil (Kachi Ghani)',
      brand: 'Fortune',
      unit: '1 Litre Pouch',
      retailPrice: 158.00,
      description: 'Traditional cold pressed pungent mustard oil pouch with natural antioxidants.',
      searchKeywords: 'fortune mustard oil 1 litre pouch, sarson tel, cooking oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
      baseRate: 145.00,
    },
    {
      sku: 'KM-OIL-FORTUNE-SUNLITE-1L',
      name: 'Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)',
      slug: 'fortune-sunlite-refined-sunflower-oil-1l-pouch',
      category: 'Refined Oil',
      subCategory: 'Refined Sunflower Oil',
      brand: 'Fortune Sunlite',
      unit: '1 Litre Pouch',
      retailPrice: 142.00,
      description: 'Light, non-sticky sunflower cooking oil rich in Vitamin E.',
      searchKeywords: 'fortune sunflower oil 1l, refined oil pouch, sunlite',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
      baseRate: 130.00,
    },
    {
      sku: 'KM-OIL-FORTUNE-SOYA-1L',
      name: 'Fortune Soya Health Refined Soybean Oil (1 Litre Pouch)',
      slug: 'fortune-refined-soybean-oil-1l-pouch',
      category: 'Refined Oil',
      subCategory: 'Refined Soybean Oil',
      brand: 'Fortune',
      unit: '1 Litre Pouch',
      retailPrice: 128.00,
      description: 'Enriched with Omega-3 and Vitamin A & D for healthy heart cooking.',
      searchKeywords: 'fortune soybean oil 1l, soya oil pouch, refined cooking oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
      baseRate: 118.00,
    },

    // -------------------------------------------------------------
    // 8. GHEE & BUTTER (200ml, 500ml, 1L)
    // -------------------------------------------------------------
    {
      sku: 'KM-GHEE-AMUL-PURE-200ML',
      name: 'Amul Pure Danedaar Desi Ghee (₹130 Small Pack - 200ml)',
      slug: 'amul-pure-desi-ghee-200ml-pouch',
      category: 'Ghee & Butter',
      subCategory: 'Desi Cow Ghee',
      brand: 'Amul',
      unit: '200ml Pouch',
      retailPrice: 130.00,
      description: 'Rich aroma, golden granular texture pure milk fat ghee in 200ml trial pack.',
      searchKeywords: 'amul ghee 200ml, small ghee pack, desi ghee pouch',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
      baseRate: 120.00,
    },
    {
      sku: 'KM-GHEE-AMUL-PURE-1L',
      name: 'Amul Pure Danedaar Desi Ghee (1 Litre Ceka Pack)',
      slug: 'amul-pure-desi-ghee-1l-ceka-pack',
      category: 'Ghee & Butter',
      subCategory: 'Desi Cow Ghee',
      brand: 'Amul',
      unit: '1 Litre Pack',
      retailPrice: 590.00,
      description: 'Authentic pure ghee for rotis, dal tadka, sweets, and pooja.',
      searchKeywords: 'amul ghee 1 litre, desi cow ghee 1kg, pure ghee',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
      baseRate: 550.00,
    },

    // -------------------------------------------------------------
    // 9. SPICES & ₹10 SACHETS
    // -------------------------------------------------------------
    {
      sku: 'KM-SPC-MDH-HALDI-10RS',
      name: 'MDH Agmark Haldi Turmeric Powder (₹10 Sachet - 25g)',
      slug: 'mdh-haldi-powder-25g-rs-10',
      category: 'Masala & Spices',
      subCategory: '₹10 Spice Sachets',
      brand: 'MDH',
      unit: '25g Sachet',
      retailPrice: 10.00,
      description: 'Pure aromatic turmeric with high curcumin content in pocket ₹10 sachet.',
      searchKeywords: 'mdh haldi 10 rs, turmeric sachet, haldi powder small pack',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80',
      baseRate: 8.50,
    },
    {
      sku: 'KM-SPC-MDH-MIRCH-10RS',
      name: 'MDH Deggi Mirch Red Chili Powder (₹10 Sachet - 20g)',
      slug: 'mdh-deggi-mirch-20g-rs-10',
      category: 'Masala & Spices',
      subCategory: '₹10 Spice Sachets',
      brand: 'MDH',
      unit: '20g Sachet',
      retailPrice: 10.00,
      description: 'Famous vibrant red color and mild spicy flavor in ₹10 pouch.',
      searchKeywords: 'mdh mirch 10 rs, deggi mirch sachet, red chili powder',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
      baseRate: 8.50,
    },
    {
      sku: 'KM-SPC-EV-GARAM-10RS',
      name: 'Everest Super Garam Masala (₹10 Box - 15g)',
      slug: 'everest-garam-masala-15g-rs-10',
      category: 'Masala & Spices',
      subCategory: '₹10 Spice Sachets',
      brand: 'Everest',
      unit: '15g Pack',
      retailPrice: 10.00,
      description: 'Blend of 13 whole aromatic spices in classic ₹10 carton.',
      searchKeywords: 'everest garam masala 10 rs, 15g box, spice blend',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
      baseRate: 8.50,
    },
    {
      sku: 'KM-SPC-CATCH-CHAAT-10RS',
      name: 'Catch Chatpata Chaat Masala Sprinkler (₹10 Pack - 15g)',
      slug: 'catch-chaat-masala-15g-rs-10',
      category: 'Masala & Spices',
      subCategory: '₹10 Spice Sachets',
      brand: 'Catch',
      unit: '15g Pack',
      retailPrice: 10.00,
      description: 'Tangy, zesty sprinkler seasoning for salads, fruits, and chaat.',
      searchKeywords: 'catch chaat masala 10 rs, chatpata masala, seasoning',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
      baseRate: 8.50,
    },
    {
      sku: 'KM-SPC-MDH-CHANA-100G',
      name: 'MDH Chana Masala Powder (100g Carton)',
      slug: 'mdh-chana-masala-100g-carton',
      category: 'Masala & Spices',
      subCategory: 'Blended Masala Powders',
      brand: 'MDH',
      unit: '100g Box',
      retailPrice: 78.00,
      description: 'Authentic Amritsari Chhole masala blend with rich pomegranate seeds and amchur.',
      searchKeywords: 'mdh chana masala 100g, chhole masala, blended spice',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
      baseRate: 70.00,
    },

    // -------------------------------------------------------------
    // 10. SUGAR, SALT & JAGGERY
    // -------------------------------------------------------------
    {
      sku: 'KM-SALT-TATA-LITE-500G',
      name: 'Tata Salt Vacuum Evaporated (500g Pouch)',
      slug: 'tata-salt-vacuum-evaporated-500g',
      category: 'Sugar, Salt & Jaggery',
      subCategory: 'Iodized Salt',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 14.00,
      description: 'Desh Ka Namak - pure vacuum evaporated iodized salt in 500g pack.',
      searchKeywords: 'tata salt 500g, namak, iodized salt',
      image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80',
      baseRate: 12.00,
    },
    {
      sku: 'KM-SALT-TATA-1KG',
      name: 'Tata Salt Vacuum Evaporated Iodized Salt (1kg Pack)',
      slug: 'tata-salt-iodized-1kg-pack',
      category: 'Sugar, Salt & Jaggery',
      subCategory: 'Iodized Salt',
      brand: 'Tata',
      unit: '1kg Pouch',
      retailPrice: 28.00,
      description: 'India\'s most trusted iodized salt for everyday cooking health.',
      searchKeywords: 'tata salt 1kg, desh ka namak, iodized table salt',
      image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80',
      baseRate: 24.00,
    },
    {
      sku: 'KM-SUGAR-REFINED-1KG',
      name: 'Premium Sparkling White Sulphur-Free Sugar (1kg Bag)',
      slug: 'premium-white-sugar-1kg-bag',
      category: 'Sugar, Salt & Jaggery',
      subCategory: 'Refined Sugar & Bura',
      brand: 'Tata',
      unit: '1kg Bag',
      retailPrice: 48.00,
      description: '100% pure crystal white sugar from Naya Bazar grain market.',
      searchKeywords: 'sugar 1kg, chini, white crystal sugar',
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=500&auto=format&fit=crop&q=80',
      baseRate: 42.00,
    },

    // -------------------------------------------------------------
    // 11. TEA & COFFEE (₹5, ₹10 & 250g Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-TEA-TATA-PREM-100G',
      name: 'Tata Tea Premium Desh Ki Chai (₹35 Pack - 100g)',
      slug: 'tata-tea-premium-100g-pack',
      category: 'Tea & Coffee',
      subCategory: 'CTC Leaf Tea',
      brand: 'Tata',
      unit: '100g Pack',
      retailPrice: 35.00,
      description: 'Blend of big grains for taste and small grains for strength.',
      searchKeywords: 'tata tea 100g, tata premium chai, ctc tea',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80',
      baseRate: 30.00,
    },
    {
      sku: 'KM-TEA-TATA-PREM-250G',
      name: 'Tata Tea Premium Desh Ki Chai (250g Carton)',
      slug: 'tata-tea-premium-250g-carton',
      category: 'Tea & Coffee',
      subCategory: 'CTC Leaf Tea',
      brand: 'Tata',
      unit: '250g Pack',
      retailPrice: 110.00,
      description: 'Popular 250g family tea pack for kadak morning chai.',
      searchKeywords: 'tata tea 250g, ctc chai, black tea leaves',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80',
      baseRate: 98.00,
    },
    {
      sku: 'KM-COFFEE-NESCAFE-SACHET',
      name: 'Nescafe Classic Instant Coffee (₹10 Single Sachet - 7.5g)',
      slug: 'nescafe-classic-instant-coffee-sachet-rs-10',
      category: 'Tea & Coffee',
      subCategory: 'Instant & Filter Coffee',
      brand: 'Nestle',
      unit: '7.5g Sachet',
      retailPrice: 10.00,
      description: '100% pure instant coffee sachet. Makes 1-2 cups of rich frothy coffee.',
      searchKeywords: 'nescafe 10 rs, coffee sachet, instant coffee pouch',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 12. NOODLES & PASTA (₹5, ₹14, Family Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-NOOD-MAGGI-35G',
      name: 'Maggi 2-Minute Masala Noodles (₹7 Chhota Pack - 35g)',
      slug: 'maggi-2-minute-noodles-35g-rs-7',
      category: 'Noodles & Pasta',
      subCategory: 'Instant 2-Minute Noodles',
      brand: 'Maggi',
      unit: '35g Pack',
      retailPrice: 7.00,
      description: 'Classic favorite Maggi noodles with authentic tastemaker in ₹7 snack pack.',
      searchKeywords: 'maggi 7 rs, chhota maggi, 2 minute noodles small pack',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-NOOD-MAGGI-70G',
      name: 'Maggi 2-Minute Masala Noodles (₹14 Single Pack - 70g)',
      slug: 'maggi-2-minute-noodles-70g-rs-14',
      category: 'Noodles & Pasta',
      subCategory: 'Instant 2-Minute Noodles',
      brand: 'Maggi',
      unit: '70g Pack',
      retailPrice: 14.00,
      description: 'Standard single serve Maggi noodles pack with favorite masala tastemaker.',
      searchKeywords: 'maggi 14 rs, maggi noodles 70g, instant masala noodles',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-NOOD-MAGGI-4PACK',
      name: 'Maggi 2-Minute Masala Noodles (4-in-1 Family Pack - 280g)',
      slug: 'maggi-2-minute-noodles-4-in-1-family-pack',
      category: 'Noodles & Pasta',
      subCategory: 'Instant 2-Minute Noodles',
      brand: 'Maggi',
      unit: '280g Pack',
      retailPrice: 56.00,
      description: 'Value 4-pack of Maggi noodles for whole family snacking.',
      searchKeywords: 'maggi 4 pack, family pack noodles, 280g',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 13. SNACKS, NAMKEEN & CHIPS (₹5 & ₹10 Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-SNK-HALDIRAM-BHUJIA-35G',
      name: 'Haldiram\'s Aloo Bhujia (₹10 Small Pack - 35g)',
      slug: 'haldirams-aloo-bhujia-35g-rs-10',
      category: 'Snacks & Namkeen',
      subCategory: 'Bhujia & Sev',
      brand: 'Haldiram\'s',
      unit: '35g Pouch',
      retailPrice: 10.00,
      description: 'Crispy spicy mint flavoured potato sev bhujia in classic ₹10 snack pouch.',
      searchKeywords: 'aloo bhujia 10 rs, haldiram bhujia, namkeen pouch',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-SNK-HALDIRAM-BHUJIA-200G',
      name: 'Haldiram\'s Aloo Bhujia Family Pack (200g Pouch)',
      slug: 'haldirams-aloo-bhujia-200g-pouch',
      category: 'Snacks & Namkeen',
      subCategory: 'Bhujia & Sev',
      brand: 'Haldiram\'s',
      unit: '200g Pouch',
      retailPrice: 55.00,
      description: '200g family pack of India\'s favourite crunchy Aloo Bhujia.',
      searchKeywords: 'haldiram aloo bhujia 200g, tea snack, namkeen',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-CHP-LAYS-MAGIC-28G',
      name: 'Lay\'s India\'s Magic Masala Potato Chips (₹10 Pack - 28g)',
      slug: 'lays-india-magic-masala-28g-rs-10',
      category: 'Chips & Packaged Snacks',
      subCategory: 'Potato Chips',
      brand: 'Lay\'s',
      unit: '28g Pouch',
      retailPrice: 10.00,
      description: 'Spicy, tangy Indian masala potato chips in favourite blue ₹10 pack.',
      searchKeywords: 'lays 10 rs, magic masala, blue lays, potato chips',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-CHP-KURKURE-MASALA-38G',
      name: 'Kurkure Masala Munch Crunchy Snacks (₹10 Pack - 38g)',
      slug: 'kurkure-masala-munch-38g-rs-10',
      category: 'Chips & Packaged Snacks',
      subCategory: 'Kurkure & Extruded',
      brand: 'Kurkure',
      unit: '38g Pouch',
      retailPrice: 10.00,
      description: 'Tedha hai par mera hai! Crispy spiced corn & gram curls in ₹10 pouch.',
      searchKeywords: 'kurkure 10 rs, masala munch, kurkure pouch, evening snack',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 14. CHOCOLATES & CANDIES (₹5, ₹10 & ₹20 Packs)
    // -------------------------------------------------------------
    {
      sku: 'KM-CHOC-DAIRYMILK-13G',
      name: 'Cadbury Dairy Milk Chocolate (₹10 Small Bar - 13.2g)',
      slug: 'cadbury-dairy-milk-13g-rs-10',
      category: 'Chocolates & Candies',
      subCategory: 'Milk & Dark Chocolates',
      brand: 'Cadbury Dairy Milk',
      unit: '13.2g Bar',
      retailPrice: 10.00,
      description: 'Classic creamy milk chocolate bar in ₹10 pocket size.',
      searchKeywords: 'dairy milk 10 rs, cadbury chocolate, small dairy milk',
      image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-CHOC-KITKAT-12G',
      name: 'Nestle KitKat Crisp Wafer Bar (₹10 2-Finger Bar - 12.8g)',
      slug: 'nestle-kitkat-12g-rs-10',
      category: 'Chocolates & Candies',
      subCategory: 'Wafer Bars & Toffees',
      brand: 'KitKat',
      unit: '12.8g Bar',
      retailPrice: 10.00,
      description: 'Have a break, have a KitKat! Crispy wafer fingers covered with milk choc in ₹10 pack.',
      searchKeywords: 'kitkat 10 rs, chocolate wafer, nestle kitkat',
      image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 15. SOAPS, PERSONAL CARE & SHAMPOO (₹10 Bars, ₹2-₹5 Sachets)
    // -------------------------------------------------------------
    {
      sku: 'KM-SOAP-DETTOL-ORIG-45G',
      name: 'Dettol Original Germ Protection Bath Soap (₹10 Small Bar - 45g)',
      slug: 'dettol-original-soap-45g-rs-10',
      category: 'Soaps & Personal Care',
      subCategory: 'Bathing Soap Bars',
      brand: 'Dettol',
      unit: '45g Bar',
      retailPrice: 10.00,
      description: '100% better germ protection antibacterial bath soap in ₹10 single bar.',
      searchKeywords: 'dettol soap 10 rs, small dettol, bath soap, antibacterial',
      image: 'https://images.unsplash.com/photo-1607006311219-c7974e50ac15?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-SOAP-LIFEBUOY-TOTAL-50G',
      name: 'Lifebuoy Total 10 Germ Protection Soap (₹10 Bar - 50g)',
      slug: 'lifebuoy-total-10-soap-50g-rs-10',
      category: 'Soaps & Personal Care',
      subCategory: 'Bathing Soap Bars',
      brand: 'Lifebuoy',
      unit: '50g Bar',
      retailPrice: 10.00,
      description: 'Active silver formula for 100% stronger germ fight in ₹10 bar.',
      searchKeywords: 'lifebuoy soap 10 rs, red soap, germ protection',
      image: 'https://images.unsplash.com/photo-1607006311219-c7974e50ac15?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-SOAP-LUX-ROSE-50G',
      name: 'Lux Soft Rose Glow Beauty Soap (₹10 Small Bar - 50g)',
      slug: 'lux-soft-rose-beauty-soap-50g-rs-10',
      category: 'Soaps & Personal Care',
      subCategory: 'Bathing Soap Bars',
      brand: 'Lux',
      unit: '50g Bar',
      retailPrice: 10.00,
      description: 'French rose essence and almond oil for glowing, fragrant skin in ₹10 bar.',
      searchKeywords: 'lux soap 10 rs, beauty soap, rose soap',
      image: 'https://images.unsplash.com/photo-1607006311219-c7974e50ac15?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-SHMP-CLINIC-PLUS-6ML',
      name: 'Clinic Plus Strong & Long Shampoo (₹2 Single Sachet - 6ml)',
      slug: 'clinic-plus-shampoo-sachet-6ml-rs-2',
      category: 'Shampoo & Hair Care',
      subCategory: 'Hair Shampoo & Sachets',
      brand: 'Clinic Plus',
      unit: '6ml Sachet (Pack of 3)',
      retailPrice: 6.00,
      description: 'Milk protein formula for 35x stronger hair. 3 single-use sachets.',
      searchKeywords: 'clinic plus sachet, shampoo sachet 2 rs, hair wash',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-SHMP-HNS-COOL-6ML',
      name: 'Head & Shoulders Cool Menthol Anti-Dandruff (₹4 Sachet - 6ml)',
      slug: 'head-and-shoulders-cool-menthol-sachet-rs-4',
      category: 'Shampoo & Hair Care',
      subCategory: 'Hair Shampoo & Sachets',
      brand: 'Head & Shoulders',
      unit: '6ml Sachet',
      retailPrice: 4.00,
      description: '100% dandruff free scalp with icy menthol cooling in single sachet.',
      searchKeywords: 'head and shoulders sachet, anti dandruff shampoo sachet',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-TOOTH-COLGATE-STRONG-20G',
      name: 'Colgate Strong Teeth Dental Cream (₹10 Small Tube - 20g)',
      slug: 'colgate-strong-teeth-20g-rs-10',
      category: 'Toothpaste & Oral Care',
      subCategory: 'Toothpaste & Powders',
      brand: 'Colgate',
      unit: '20g Tube',
      retailPrice: 10.00,
      description: 'Calcium boost formula for cavity protection in ₹10 travel/pocket tube.',
      searchKeywords: 'colgate 10 rs, colgate 20g, small toothpaste tube',
      image: 'https://images.unsplash.com/photo-1559591937-e10323381a17?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-TOOTH-COLGATE-STRONG-100G',
      name: 'Colgate Strong Teeth Dental Cream (100g Regular Tube)',
      slug: 'colgate-strong-teeth-100g-tube',
      category: 'Toothpaste & Oral Care',
      subCategory: 'Toothpaste & Powders',
      brand: 'Colgate',
      unit: '100g Tube',
      retailPrice: 58.00,
      description: 'Daily oral protection toothpaste tube for whole family smile.',
      searchKeywords: 'colgate 100g, toothpaste tube, dental cream',
      image: 'https://images.unsplash.com/photo-1559591937-e10323381a17?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 16. DETERGENT & DISHWASH (₹10 Powders, Bars, Vim)
    // -------------------------------------------------------------
    {
      sku: 'KM-DET-SURF-EXCEL-80G',
      name: 'Surf Excel Easy Wash Detergent Powder (₹10 Sachet - 80g)',
      slug: 'surf-excel-easy-wash-80g-rs-10',
      category: 'Detergent & Dishwash',
      subCategory: 'Washing Powders',
      brand: 'Surf Excel',
      unit: '80g Sachet',
      retailPrice: 10.00,
      description: 'Super tough stain removal in single wash in ₹10 trial sachet.',
      searchKeywords: 'surf excel 10 rs, washing powder sachet, detergent',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DET-SURF-EXCEL-1KG',
      name: 'Surf Excel Easy Wash Detergent Powder (1kg Poly Bag)',
      slug: 'surf-excel-easy-wash-1kg-poly-bag',
      category: 'Detergent & Dishwash',
      subCategory: 'Washing Powders',
      brand: 'Surf Excel',
      unit: '1kg Bag',
      retailPrice: 140.00,
      description: '1kg regular laundry washing powder for bucket and machine wash.',
      searchKeywords: 'surf excel 1kg, washing powder 1kg bag, detergent',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DET-RIN-BAR-140G',
      name: 'Rin Advanced Detergent Washing Bar (₹10 Bar - 140g)',
      slug: 'rin-detergent-bar-140g-rs-10',
      category: 'Detergent & Dishwash',
      subCategory: 'Detergent Bars',
      brand: 'Rin',
      unit: '140g Bar',
      retailPrice: 10.00,
      description: 'Dazzling whites on collars and cuffs in classic ₹10 Rin sabun bar.',
      searchKeywords: 'rin bar 10 rs, kapde dhone ka sabun, washing soap',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DET-VIM-BAR-150G',
      name: 'Vim Dishwash Bar with Real Lemon Juice (₹10 Bar - 150g)',
      slug: 'vim-dishwash-bar-150g-rs-10',
      category: 'Detergent & Dishwash',
      subCategory: 'Dishwash Bars & Liquids',
      brand: 'Vim',
      unit: '150g Bar',
      retailPrice: 10.00,
      description: 'Degreases 100 oily utensils with power of 100 lemons in ₹10 bar.',
      searchKeywords: 'vim bar 10 rs, bartan dhone ka sabun, dishwash bar',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    },

    // -------------------------------------------------------------
    // 17. HOUSEHOLD CLEANING & DAILY ESSENTIALS (Harpic, Lizol, Matchbox, Agarbatti)
    // -------------------------------------------------------------
    {
      sku: 'KM-CLN-HARPIC-200ML',
      name: 'Harpic Power Plus Disinfectant Toilet Cleaner (200ml Small Bottle)',
      slug: 'harpic-power-plus-toilet-cleaner-200ml',
      category: 'Household Cleaning',
      subCategory: 'Floor & Toilet Cleaners',
      brand: 'Harpic',
      unit: '200ml Bottle',
      retailPrice: 42.00,
      description: '10x better stain remover and 99.9% germ kill in convenient 200ml bottle.',
      searchKeywords: 'harpic 200ml, toilet cleaner small bottle, blue harpic',
      image: 'https://images.unsplash.com/photo-1585670270608-b4b4f1da0d00?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-CLN-LIZOL-FLOR-500ML',
      name: 'Lizol Disinfectant Citrus Surface Floor Cleaner (500ml Bottle)',
      slug: 'lizol-floor-cleaner-citrus-500ml',
      category: 'Household Cleaning',
      subCategory: 'Floor & Toilet Cleaners',
      brand: 'Lizol',
      unit: '500ml Bottle',
      retailPrice: 99.00,
      description: 'Kills 99.9% germs and leaves refreshing citrus fragrance on floor tiles.',
      searchKeywords: 'lizol 500ml, floor cleaner, pocha liquid, disinfectant',
      image: 'https://images.unsplash.com/photo-1585670270608-b4b4f1da0d00?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-POOJA-MATCHBOX-BUNDLE',
      name: 'Safety Matchboxes Kirana Household Pack (Bundle of 10 Boxes)',
      slug: 'safety-matchboxes-bundle-10-boxes',
      category: 'Pooja & Daily Essentials',
      subCategory: 'Matchbox & Camphor',
      brand: 'Tata',
      unit: 'Bundle (10 Pcs)',
      retailPrice: 15.00,
      description: 'Damp-proof safety matchboxes bundle for kitchen stove and pooja diya.',
      searchKeywords: 'matchbox 10 pack, machis, safety matches',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-POOJA-CYCLE-AGAR-50G',
      name: 'Cycle Pure Three in One Agarbatti (₹15 Pack - 50g)',
      slug: 'cycle-three-in-one-agarbatti-50g',
      category: 'Pooja & Daily Essentials',
      subCategory: 'Agarbatti & Dhoop',
      brand: 'Cycle',
      unit: '50g Box',
      retailPrice: 15.00,
      description: 'Natural floral, woody & herbal fragrance incense sticks for daily pooja.',
      searchKeywords: 'cycle agarbatti 15 rs, pooja incense sticks, dhoop batti',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-POOJA-CAMPHOR-50G',
      name: 'Pure Bhimseni Camphor Kapoor Tablets (50g Box)',
      slug: 'pure-bhimseni-camphor-kapoor-50g',
      category: 'Pooja & Daily Essentials',
      subCategory: 'Matchbox & Camphor',
      brand: 'Mangaldeep',
      unit: '50g Box',
      retailPrice: 45.00,
      description: '100% pure white camphor tablets that burn completely without residue.',
      searchKeywords: 'kapoor 50g, camphor tablets, aarti kapoor, pooja samagri',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-OTHER-GOODKNIGHT-REFILL',
      name: 'Good Knight Gold Flash Liquid Mosquito Vaporizer Refill (45ml)',
      slug: 'good-knight-gold-flash-refill-45ml',
      category: 'Other Kirana Essentials',
      subCategory: 'Mosquito Repellents',
      brand: 'Good Knight',
      unit: '45ml Refill',
      retailPrice: 85.00,
      description: 'Dual mode mosquito protection against dengue and malaria mosquitoes.',
      searchKeywords: 'good knight refill, machar marne ki liquid, mosquito repellent',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-BABY-PAMPERS-S-1PC',
      name: 'Pampers All-Round Protection Baby Diaper Pants (Size M - 1 Pc / ₹10 Pack)',
      slug: 'pampers-baby-diaper-pants-m-single-pc',
      category: 'Baby Care',
      subCategory: 'Baby Diapers & Wipes',
      brand: 'Pampers',
      unit: '1 Diaper Pant',
      retailPrice: 12.00,
      description: 'Single emergency sample pack with magic gel lock for baby comfort.',
      searchKeywords: 'pampers single diaper, baby diaper 10 rs, size M diaper',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80',
    },
    {
      sku: 'KM-DRY-ALMOND-100G',
      name: 'California Premium Crunchy Almonds Badam (100g Pouch)',
      slug: 'california-premium-almonds-badam-100g',
      category: 'Dry Fruits & Nuts',
      subCategory: 'Almonds & Cashews',
      brand: 'Tata',
      unit: '100g Pouch',
      retailPrice: 95.00,
      description: 'Crispy, sweet California almonds loaded with natural Vitamin E & protein.',
      searchKeywords: 'badam 100g, almonds pouch, dry fruits, khari baoli badam',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=80',
      baseRate: 85.00,
    },
    {
      sku: 'KM-DRY-CASHEW-100G',
      name: 'Goa Whole White Cashews Kaju W320 (100g Pouch)',
      slug: 'goa-whole-cashews-kaju-w320-100g',
      category: 'Dry Fruits & Nuts',
      subCategory: 'Almonds & Cashews',
      brand: 'Tata',
      unit: '100g Pouch',
      retailPrice: 110.00,
      description: 'Whole, cream-white premium grade W320 cashews for sweets and snacking.',
      searchKeywords: 'kaju 100g, cashew nuts, whole kaju w320, dry fruits',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop&q=80',
      baseRate: 98.00,
    },
    {
      sku: 'KM-INST-POHA-500G',
      name: 'Thick Poha / Flattened Rice (500g Pouch)',
      slug: 'thick-poha-flattened-rice-500g',
      category: 'Instant Food & Ready-to-Cook',
      subCategory: 'Poha & Ready Mixes',
      brand: 'Tata',
      unit: '500g Pouch',
      retailPrice: 34.00,
      description: 'Clean, spotless flattened rice for soft, fluffy Kanda Batata Poha breakfast.',
      searchKeywords: 'poha 500g, flattened rice, chivda, breakfast poha',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
      baseRate: 30.00,
    },
    {
      sku: 'KM-INST-KISSAN-KETCHUP-100G',
      name: 'Kissan Fresh Tomato Ketchup (₹15 Small Squeezy Pouch - 100g)',
      slug: 'kissan-fresh-tomato-ketchup-100g-pouch',
      category: 'Instant Food & Ready-to-Cook',
      subCategory: 'Sauces & Ketchup',
      brand: 'Kissan',
      unit: '100g Pouch',
      retailPrice: 15.00,
      description: '100% real ripe tomatoes ketchup in convenient ₹15 squeezy spout pack.',
      searchKeywords: 'kissan ketchup 15 rs, tomato sauce pouch, 100g ketchup',
      image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop&q=80',
    }
  ];

  console.log(`📦 Creating ${catalogue.length} realistic Indian kirana products with ₹5/₹10 variants...`);

  const createdProducts = [];
  for (const item of catalogue) {
    const catId = categoryMap.get(item.category);
    const subCatId = subCatMap.get(item.subCategory);
    const brandId = brandMap.get(item.brand);

    if (!catId) {
      console.warn(`Category not found for product: ${item.name} (${item.category})`);
      continue;
    }

    const prod = await prisma.product.create({
      data: {
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        description: item.description,
        brandId: brandId || null,
        categoryId: catId,
        subCategoryId: subCatId || null,
        unit: item.unit,
        retailPrice: item.retailPrice,
        minimumQuantity: item.minQty || 1,
        maximumQuantity: item.maxQty || null,
        active: true,
        searchKeywords: item.searchKeywords,
        images: {
          create: [
            {
              url: fs.existsSync(path.join(process.cwd(), 'public', 'products', `${item.sku.toLowerCase()}.jpg`))
                ? `/products/${item.sku.toLowerCase()}.jpg`
                : `/products/${item.sku.toLowerCase()}.svg`,
              altText: `${item.brand} ${item.name} (${item.unit})`,
              sortOrder: 0,
              active: true,
            },
          ],
        },
      },
    });

    createdProducts.push({ ...prod, baseRate: item.baseRate || Number(item.retailPrice) });
  }

  // 7. Seed Mandi Rates for commodity tracked items
  console.log('📈 Linking Mandi Rates across Delhi wholesale trading hubs...');
  const rateVariations = [
    { multiplier: 0.96, dir: Direction.FALLING, change: -1.5 },
    { multiplier: 0.98, dir: Direction.FALLING, change: -0.8 },
    { multiplier: 1.00, dir: Direction.STABLE, change: 0.0 },
    { multiplier: 1.02, dir: Direction.RISING, change: 1.2 },
    { multiplier: 1.04, dir: Direction.RISING, change: 2.0 },
  ];

  for (const p of createdProducts) {
    // Connect to at least 4-8 mandis
    const selectedMandis = mandis.slice(0, Math.floor(Math.random() * 4) + 4);
    for (let mi = 0; mi < selectedMandis.length; mi++) {
      const mandi = selectedMandis[mi];
      const variation = rateVariations[(mi + p.name.length) % rateVariations.length];
      const currentRate = Math.round((p.baseRate * variation.multiplier) * 100) / 100;
      const previousRate = Math.round((currentRate - variation.change) * 100) / 100;
      const minRate = Math.round((currentRate * 0.95) * 100) / 100;
      const maxRate = Math.round((currentRate * 1.05) * 100) / 100;
      const absChange = Math.abs(variation.change);
      const pctChange = Math.round(((absChange / (previousRate || 1)) * 100) * 10) / 10;

      await prisma.mandiRate.create({
        data: {
          productId: p.id,
          mandiId: mandi.id,
          currentRate,
          previousRate,
          minimumRate: minRate,
          maximumRate: maxRate,
          direction: variation.dir,
          absoluteChange: absChange,
          percentageChange: pctChange,
          unit: p.unit,
          date: new Date(),
          active: true,
        },
      });

      // Add 3-day history
      const now = new Date();
      for (let day = 3; day >= 1; day--) {
        const histDate = new Date(now.getTime() - day * 24 * 60 * 60 * 1000);
        const dayRate = Math.round((currentRate - (day * 0.5)) * 100) / 100;
        await prisma.rateHistory.create({
          data: {
            productId: p.id,
            mandiId: mandi.id,
            rate: dayRate,
            previousRate: dayRate - 0.5,
            minimum: Math.round((dayRate * 0.95) * 100) / 100,
            maximum: Math.round((dayRate * 1.05) * 100) / 100,
            unit: p.unit,
            change: 0.5,
            changePercent: 1.0,
            direction: Direction.RISING,
            date: histDate,
          },
        });
      }
    }
  }

  // 8. Admin & Customer Users
  console.log('👤 Seeding Admin & Customer Accounts...');
  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('Admin@123', salt);
  const testPass = await bcrypt.hash('Test@123', salt);

  const admin = await prisma.user.create({
    data: {
      fullName: 'Vishal Gupta (Admin)',
      email: 'admin@kiranamart247.com',
      mobile: '8510083082',
      passwordHash: adminPass,
      role: Role.ADMIN,
      active: true,
      whatsappOptIn: true,
      adminProfile: {
        create: {},
      },
    },
  });

  const customer = await prisma.user.create({
    data: {
      fullName: 'Vishal Gupta (Customer)',
      email: 'customer@kiranamart247.com',
      mobile: '9876543210',
      passwordHash: testPass,
      role: Role.CUSTOMER,
      active: true,
      whatsappOptIn: true,
      customerProfile: {
        create: {
          address: 'Shop 42, Naya Bazar Wholesale Market',
          city: 'Delhi',
          pinCode: '110006',
        },
      },
    },
  });

  console.log('✅ KiranaMart247 Complete 30-Category Catalogue Populated Successfully!');
  console.log({
    categoriesCount: categoriesList.length,
    brandsCount: brandsList.length,
    productsCount: createdProducts.length,
    mandisCount: mandis.length,
    adminEmail: admin.email,
    customerEmail: customer.email,
  });
}

seed()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
