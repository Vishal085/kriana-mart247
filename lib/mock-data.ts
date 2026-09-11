// AUTO-GENERATED AUDITED PRODUCTION-READY MOCK DATA FOR KIRANAMART247

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  displayOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MockBrand {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MockMandi {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  address: string;
  description: string;
  active: boolean;
  displayOrder: number;
  _count: { rates: number };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MockProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  brandId: string;
  brand: MockBrand;
  categoryId: string;
  category: MockCategory;
  subCategoryName?: string;
  searchKeywords?: string;
  unit: string;
  retailPrice: number;
  minimumQuantity: number;
  maximumQuantity: number;
  active: boolean;
  images: Array<{ id: string; url: string; altText: string; active: boolean; sortOrder: number }>;
  rates?: any[];
  rateHistory?: any[];
  baseRate?: number;
  // Seller and Approval Fields
  sellerId?: string | null;
  seller?: any;
  status?: 'DRAFT' | 'PENDING_REVIEW' | 'NEEDS_CHANGES' | 'PUBLISHED' | 'REJECTED';
  aiDescriptionStatus?: 'NOT_GENERATED' | 'GENERATING' | 'GENERATED' | 'FAILED' | 'ADMIN_EDITED';
  shortDescription?: string | null;
  aiDescription?: string | null;
  finalDescription?: string | null;
  highlights?: string[];
  productTags?: string[];
  mrp?: number | null;
  wholesalePrice?: number | null;
  stockQuantity?: number;
  weight?: string | null;
  mandi?: string | null;
  location?: string | null;
  shopName?: string | null;
  shopAddress?: string | null;
  deliveryAvailability?: string | null;
  gstPercent?: number | null;
  expiryDate?: string | null;
  adminNotes?: string | null;
  rejectionReason?: string | null;
  approvedAt?: Date | string | null;
  approvedBy?: string | null;
  publishedVersionId?: string | null;
  auditLogs?: any[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MockMandiRate {
  id: string;
  productId: string;
  product: MockProduct;
  mandiId: string;
  mandi: MockMandi;
  date: Date | string;
  currentRate: number;
  previousRate: number;
  minimumRate: number;
  maximumRate: number;
  unit: string;
  absoluteChange: number;
  percentageChange: number;
  direction: 'RISING' | 'FALLING' | 'STABLE';
  active: boolean;
  updatedAt: Date | string;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    "id": "cat-1",
    "name": "Milk & Dairy",
    "slug": "milk-dairy",
    "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
    "active": true,
    "displayOrder": 1,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-2",
    "name": "Cold Drinks & Beverages",
    "slug": "cold-drinks-beverages",
    "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
    "active": true,
    "displayOrder": 2,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-3",
    "name": "Ration & Spices",
    "slug": "ration-spices",
    "description": "Daily staple grains, flours, pulses, whole & blended spices",
    "active": true,
    "displayOrder": 3,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-4",
    "name": "Soaps & Personal Care",
    "slug": "soaps-personal-care",
    "description": "Bathing soaps, body washes, skin creams, and hygiene",
    "active": true,
    "displayOrder": 4,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-5",
    "name": "Rice",
    "slug": "rice",
    "description": "Premium Basmati, Kolam, Sona Masoori, and everyday rice",
    "active": true,
    "displayOrder": 5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-6",
    "name": "Cooking Oil",
    "slug": "cooking-oil",
    "description": "Kachi Ghani Mustard oil, groundnut oil, and traditional cooking oils",
    "active": true,
    "displayOrder": 6,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-7",
    "name": "Refined Oil",
    "slug": "refined-oil",
    "description": "Refined sunflower oil, soybean oil, and rice bran oil",
    "active": true,
    "displayOrder": 7,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-8",
    "name": "Ghee & Butter",
    "slug": "ghee-butter",
    "description": "Pure cow ghee, desi danedaar ghee, salted & unsalted butter",
    "active": true,
    "displayOrder": 8,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-9",
    "name": "Biscuits & Bakery",
    "slug": "biscuits-bakery",
    "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
    "active": true,
    "displayOrder": 9,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-10",
    "name": "Snacks & Namkeen",
    "slug": "snacks-namkeen",
    "description": "Bhujia, mixture, roasted nuts, chana dal, and traditional namkeen",
    "active": true,
    "displayOrder": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-11",
    "name": "Atta, Maida & Suji",
    "slug": "atta-maida-suji",
    "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
    "active": true,
    "displayOrder": 11,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-12",
    "name": "Dal & Pulses",
    "slug": "dal-pulses",
    "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
    "active": true,
    "displayOrder": 12,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-13",
    "name": "Sugar, Salt & Jaggery",
    "slug": "sugar-salt-jaggery",
    "description": "Iodized salt, crystal sugar, bura, and organic gur/jaggery",
    "active": true,
    "displayOrder": 13,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-14",
    "name": "Tea & Coffee",
    "slug": "tea-coffee",
    "description": "Kadak CTC tea, green tea, instant coffee, and filter coffee",
    "active": true,
    "displayOrder": 14,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-15",
    "name": "Dry Fruits & Nuts",
    "slug": "dry-fruits-nuts",
    "description": "Almonds, cashews, raisins, walnuts, pistachios, and foxnuts",
    "active": true,
    "displayOrder": 15,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-16",
    "name": "Masala & Spices",
    "slug": "masala-spices",
    "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
    "active": true,
    "displayOrder": 16,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-17",
    "name": "Noodles & Pasta",
    "slug": "noodles-pasta",
    "description": "Instant 2-minute noodles, macaroni, penne pasta, and vermicelli",
    "active": true,
    "displayOrder": 17,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-18",
    "name": "Chocolates & Candies",
    "slug": "chocolates-candies",
    "description": "Milk chocolates, wafer bars, toffees, lollipops, and sweets",
    "active": true,
    "displayOrder": 18,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-19",
    "name": "Chips & Packaged Snacks",
    "slug": "chips-packaged-snacks",
    "description": "Potato chips, kurkure, nachos, extruded snacks, and papad",
    "active": true,
    "displayOrder": 19,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-20",
    "name": "Detergent & Dishwash",
    "slug": "detergent-dishwash",
    "description": "Washing powders, liquid detergents, detergent bars, dishwash bars & gels",
    "active": true,
    "displayOrder": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-21",
    "name": "Shampoo & Hair Care",
    "slug": "shampoo-hair-care",
    "description": "Anti-dandruff shampoo, hair oils, conditioners, and ₹2-₹5 sachets",
    "active": true,
    "displayOrder": 21,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-22",
    "name": "Toothpaste & Oral Care",
    "slug": "toothpaste-oral-care",
    "description": "Herbal & fluoride toothpaste, toothbrushes, and mouthwash",
    "active": true,
    "displayOrder": 22,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-23",
    "name": "Shaving & Grooming",
    "slug": "shaving-grooming",
    "description": "Razors, shaving creams, foam, blades, and aftershave",
    "active": true,
    "displayOrder": 23,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-24",
    "name": "Household Cleaning",
    "slug": "household-cleaning",
    "description": "Floor cleaners, toilet cleaners, glass cleaners, and phenyl",
    "active": true,
    "displayOrder": 24,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-25",
    "name": "Tissue, Napkins & Disposable",
    "slug": "tissue-napkins-disposable",
    "description": "Kitchen towels, facial tissues, foil, and paper disposables",
    "active": true,
    "displayOrder": 25,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-26",
    "name": "Pooja & Daily Essentials",
    "slug": "pooja-daily-essentials",
    "description": "Agarbatti, matchboxes, dhoop, camphor (kapoor), and cotton wicks",
    "active": true,
    "displayOrder": 26,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-27",
    "name": "Baby Care",
    "slug": "baby-care",
    "description": "Baby diapers, wet wipes, baby soap, and talc",
    "active": true,
    "displayOrder": 27,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-28",
    "name": "Water & Packaged Drinks",
    "slug": "water-packaged-drinks",
    "description": "Packaged mineral water, soda, and tonic water",
    "active": true,
    "displayOrder": 28,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-29",
    "name": "Instant Food & Ready-to-Cook",
    "slug": "instant-food-ready-to-cook",
    "description": "Poha, soup mixes, gulab jamun mix, ketchup, and sauces",
    "active": true,
    "displayOrder": 29,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "cat-30",
    "name": "Other Kirana Essentials",
    "slug": "other-kirana-essentials",
    "description": "Batteries, mosquito repellents, candles, and utility essentials",
    "active": true,
    "displayOrder": 30,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
];

export const MOCK_BRANDS: MockBrand[] = [
  {
    "id": "brand-1",
    "name": "Amul",
    "slug": "amul",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-2",
    "name": "Mother Dairy",
    "slug": "mother-dairy",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-3",
    "name": "Parle",
    "slug": "parle",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-4",
    "name": "Britannia",
    "slug": "britannia",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-5",
    "name": "ITC Aashirvaad",
    "slug": "itc-aashirvaad",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-6",
    "name": "Tata",
    "slug": "tata",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-7",
    "name": "Fortune",
    "slug": "fortune",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-8",
    "name": "Saffola",
    "slug": "saffola",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-9",
    "name": "Dhara",
    "slug": "dhara",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-10",
    "name": "MDH",
    "slug": "mdh",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-11",
    "name": "Everest",
    "slug": "everest",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-12",
    "name": "Catch",
    "slug": "catch",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-13",
    "name": "Maggi",
    "slug": "maggi",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-14",
    "name": "Coca-Cola",
    "slug": "coca-cola",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-15",
    "name": "Pepsi",
    "slug": "pepsi",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-16",
    "name": "Thums Up",
    "slug": "thums-up",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-17",
    "name": "Sprite",
    "slug": "sprite",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-18",
    "name": "Sting",
    "slug": "sting",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-19",
    "name": "Haldiram's",
    "slug": "haldiram-s",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-20",
    "name": "Bikaji",
    "slug": "bikaji",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-21",
    "name": "Lay's",
    "slug": "lay-s",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-22",
    "name": "Kurkure",
    "slug": "kurkure",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-23",
    "name": "Cadbury Dairy Milk",
    "slug": "cadbury-dairy-milk",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-24",
    "name": "KitKat",
    "slug": "kitkat",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-25",
    "name": "Nestle",
    "slug": "nestle",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-26",
    "name": "Surf Excel",
    "slug": "surf-excel",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-27",
    "name": "Ariel",
    "slug": "ariel",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-28",
    "name": "Rin",
    "slug": "rin",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-29",
    "name": "Vim",
    "slug": "vim",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-30",
    "name": "Pril",
    "slug": "pril",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-31",
    "name": "Dettol",
    "slug": "dettol",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-32",
    "name": "Lifebuoy",
    "slug": "lifebuoy",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-33",
    "name": "Lux",
    "slug": "lux",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-34",
    "name": "Dove",
    "slug": "dove",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-35",
    "name": "Colgate",
    "slug": "colgate",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-36",
    "name": "Pepsodent",
    "slug": "pepsodent",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-37",
    "name": "Dabur",
    "slug": "dabur",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-38",
    "name": "Clinic Plus",
    "slug": "clinic-plus",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-39",
    "name": "Head & Shoulders",
    "slug": "head-shoulders",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-40",
    "name": "Gillette",
    "slug": "gillette",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-41",
    "name": "Harpic",
    "slug": "harpic",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-42",
    "name": "Lizol",
    "slug": "lizol",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-43",
    "name": "Colin",
    "slug": "colin",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-44",
    "name": "Good Knight",
    "slug": "good-knight",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-45",
    "name": "All Out",
    "slug": "all-out",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-46",
    "name": "Cycle",
    "slug": "cycle",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-47",
    "name": "Mangaldeep",
    "slug": "mangaldeep",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-48",
    "name": "Pampers",
    "slug": "pampers",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-49",
    "name": "MamyPoko",
    "slug": "mamypoko",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-50",
    "name": "Bisleri",
    "slug": "bisleri",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-51",
    "name": "Kinley",
    "slug": "kinley",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-52",
    "name": "Knorr",
    "slug": "knorr",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-53",
    "name": "Kissan",
    "slug": "kissan",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-54",
    "name": "Everest Masala",
    "slug": "everest-masala",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-55",
    "name": "MDH Spices",
    "slug": "mdh-spices",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-56",
    "name": "Patanjali",
    "slug": "patanjali",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-57",
    "name": "Gowardhan",
    "slug": "gowardhan",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-58",
    "name": "Fortune Sunlite",
    "slug": "fortune-sunlite",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-59",
    "name": "India Gate",
    "slug": "india-gate",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-60",
    "name": "Daawat",
    "slug": "daawat",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "brand-61",
    "name": "Gemini",
    "slug": "gemini",
    "active": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
];

export const MOCK_MANDIS: MockMandi[] = [
  {
    "id": "mandi-1",
    "name": "Naya Bazar Mandi",
    "slug": "naya-bazar-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Naya Bazar, Chandni Chowk, Old Delhi 110006",
    "description": "Asia's premier wholesale foodgrain, basmati rice, pulses, and mustard oil terminal market.",
    "active": true,
    "displayOrder": 1,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-2",
    "name": "Khari Baoli Spice Mandi",
    "slug": "khari-baoli-spice-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Khari Baoli, Chandni Chowk, Delhi 110006",
    "description": "Asia's largest wholesale spice, dry fruits, herbs, and condiments trading market.",
    "active": true,
    "displayOrder": 2,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-3",
    "name": "Azadpur APMC Mandi",
    "slug": "azadpur-apmc-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "GT Karnal Road, Azadpur, Delhi 110033",
    "description": "National capital's mega APMC terminal market regulating daily wholesale commodity auctions.",
    "active": true,
    "displayOrder": 3,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-4",
    "name": "Okhla APMC Mandi",
    "slug": "okhla-mandi",
    "city": "New Delhi",
    "state": "Delhi",
    "address": "Okhla Industrial Area Phase II, New Delhi 110020",
    "description": "South Delhi wholesale agro-commodity auction and redistribution terminal.",
    "active": true,
    "displayOrder": 4,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-5",
    "name": "Ghazipur APMC Mandi",
    "slug": "ghazipur-apmc-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Ghazipur, Trans-Yamuna, East Delhi 110096",
    "description": "East Delhi & UP border primary wholesale commodity and perishables exchange.",
    "active": true,
    "displayOrder": 5,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-6",
    "name": "Keshopur APMC Mandi",
    "slug": "keshopur-apmc-mandi",
    "city": "New Delhi",
    "state": "Delhi",
    "address": "Outer Ring Road, Tilak Nagar, West Delhi 110018",
    "description": "West Delhi primary wholesale grain, fruit, and grocery distribution terminal.",
    "active": true,
    "displayOrder": 6,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-7",
    "name": "Shahdara Anaj Mandi",
    "slug": "shahdara-grain-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Old Shahdara, North East Delhi 110032",
    "description": "Trans-Yamuna wholesale grains, sugar, edible oils, and daily staples trading center.",
    "active": true,
    "displayOrder": 7,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-8",
    "name": "Najafgarh Anaj Mandi",
    "slug": "najafgarh-grain-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Najafgarh Main Road, South West Delhi 110043",
    "description": "South-West Delhi agro-wholesale hub and grain procurement market.",
    "active": true,
    "displayOrder": 8,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-9",
    "name": "Narela Anaj Mandi",
    "slug": "narela-anaj-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Narela Mandi, GT Karnal Road, North Delhi 110040",
    "description": "Delhi's largest specialized wheat, paddy, and grain APMC terminal.",
    "active": true,
    "displayOrder": 9,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-10",
    "name": "Ghaziabad Mandi",
    "slug": "ghaziabad-mandi",
    "city": "Ghaziabad",
    "state": "Uttar Pradesh",
    "address": "Site 4, Sahibabad Industrial Area, Ghaziabad 201005",
    "description": "Ghaziabad district primary wholesale foodgrain, pulse, and edible oil terminal market.",
    "active": true,
    "displayOrder": 10,
    "_count": { "rates": 46 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-11",
    "name": "Noida Sector 88 Krishi Mandi",
    "slug": "noida-sector-88-mandi",
    "city": "Noida",
    "state": "Uttar Pradesh",
    "address": "Sector 88, Phase 2, Noida, Gautam Buddha Nagar 201305",
    "description": "Gautam Buddha Nagar primary wholesale agricultural and grocery distribution center.",
    "active": true,
    "displayOrder": 11,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-12",
    "name": "Dadri Anaj & Kirana Mandi",
    "slug": "dadri-anaj-mandi",
    "city": "Greater Noida",
    "state": "Uttar Pradesh",
    "address": "Railway Road, Dadri, Greater Noida 203207",
    "description": "Greater Noida regional wholesale grain, pulse, and country jaggery exchange.",
    "active": true,
    "displayOrder": 12,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-13",
    "name": "Gurugram Khandsa Anaj Mandi",
    "slug": "gurugram-khandsa-mandi",
    "city": "Gurugram",
    "state": "Haryana",
    "address": "Khandsa Road, Near Hero Honda Chowk, Gurugram 122001",
    "description": "Gurugram & South Haryana-NCR primary foodgrain and wholesale grocery exchange.",
    "active": true,
    "displayOrder": 13,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-14",
    "name": "Faridabad NIT Old Anaj Mandi",
    "slug": "faridabad-nit-mandi",
    "city": "Faridabad",
    "state": "Haryana",
    "address": "Old Faridabad Railway Road, NIT, Faridabad 121001",
    "description": "Faridabad district central wholesale grain, oilseeds, and spice market.",
    "active": true,
    "displayOrder": 14,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-15",
    "name": "Ballabhgarh Anaj Mandi",
    "slug": "ballabhgarh-anaj-mandi",
    "city": "Faridabad",
    "state": "Haryana",
    "address": "Tigaon Road, Ballabhgarh, Faridabad 121004",
    "description": "South Haryana-NCR APMC grain and pulse auction exchange.",
    "active": true,
    "displayOrder": 15,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-16",
    "name": "Sonipat New Grain Market",
    "slug": "sonipat-grain-market",
    "city": "Sonipat",
    "state": "Haryana",
    "address": "Murthal Road, New Grain Market, Sonipat 131001",
    "description": "GT Road Haryana-Delhi NCR premium Basmati paddy and wheat auction hub.",
    "active": true,
    "displayOrder": 16,
    "_count": { "rates": 16 },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    "id": "prod-1",
    "sku": "KM-BIS-PARLE-50G",
    "name": "Parle-G Glucose Biscuits (₹5 Small Pack - 50g)",
    "slug": "parle-g-glucose-biscuits-50g-rs-5",
    "description": "Original Parle-G glucose biscuits small ₹5 kirana pocket pack. Rich in milk and wheat goodness.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Glucose Biscuits",
    "searchKeywords": "parle g, biscuit, parle 5 rupee, glucose biscuit, tea snack, 50g",
    "unit": "50g Pack",
    "retailPrice": 5,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-1",
        "url": "/products/km-bis-parle-50g.svg",
        "altText": "Parle-G Glucose Biscuits (₹5 Small Pack - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-2",
    "sku": "KM-BIS-PARLE-110G",
    "name": "Parle-G Glucose Biscuits (₹10 Regular Pack - 110g)",
    "slug": "parle-g-glucose-biscuits-110g-rs-10",
    "description": "Standard ₹10 Parle-G daily family pack. Fresh and crispy with hot chai.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Glucose Biscuits",
    "searchKeywords": "parle g 10 rs, 110g, biscuits, tea time snack",
    "unit": "110g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-2",
        "url": "/products/km-bis-parle-110g.svg",
        "altText": "Parle-G Glucose Biscuits (₹10 Regular Pack - 110g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-3",
    "sku": "KM-BIS-PARLE-800G",
    "name": "Parle-G Glucose Biscuits Family Mega Pack (800g)",
    "slug": "parle-g-glucose-biscuits-800g-family-pack",
    "description": "Mega value family pack of Parle-G 800g. Best savings for monthly grocery.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Glucose Biscuits",
    "searchKeywords": "parle g family pack, 800g, wholesale biscuit, bulk",
    "unit": "800g Pack",
    "retailPrice": 78,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-3",
        "url": "/products/km-bis-parle-800g.svg",
        "altText": "Parle-G Glucose Biscuits Family Mega Pack (800g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 78,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-4",
    "sku": "KM-BIS-MARIE-75G",
    "name": "Britannia Marie Gold Biscuits (₹10 Small Pack - 75g)",
    "slug": "britannia-marie-gold-75g-rs-10",
    "description": "Light, crispy tea-time Marie Gold biscuit in convenient ₹10 pack. Zero trans fat.",
    "brandId": "brand-4",
    "brand": {
      "id": "brand-4",
      "name": "Britannia",
      "slug": "britannia",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cookies & Marie",
    "searchKeywords": "marie gold, britannia marie, 10 rs marie, tea biscuit",
    "unit": "75g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-4",
        "url": "/products/km-bis-marie-75g.svg",
        "altText": "Britannia Marie Gold Biscuits (₹10 Small Pack - 75g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-5",
    "sku": "KM-BIS-MARIE-250G",
    "name": "Britannia Marie Gold Tea Biscuits (250g Regular)",
    "slug": "britannia-marie-gold-250g-regular",
    "description": "Popular 250g Marie Gold pack for daily morning & evening family chai.",
    "brandId": "brand-4",
    "brand": {
      "id": "brand-4",
      "name": "Britannia",
      "slug": "britannia",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cookies & Marie",
    "searchKeywords": "marie gold 250g, britannia biscuit, tea biscuit",
    "unit": "250g Pack",
    "retailPrice": 35,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-5",
        "url": "/products/km-bis-marie-250g.svg",
        "altText": "Britannia Marie Gold Tea Biscuits (250g Regular)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 35,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-6",
    "sku": "KM-BIS-GOODDAY-35G",
    "name": "Britannia Good Day Butter Cookies (₹5 Small Pack - 35g)",
    "slug": "britannia-good-day-butter-cookies-35g-rs-5",
    "description": "Rich buttery smile cookies in convenient ₹5 small snack pack.",
    "brandId": "brand-4",
    "brand": {
      "id": "brand-4",
      "name": "Britannia",
      "slug": "britannia",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cookies & Marie",
    "searchKeywords": "good day 5 rs, butter cookies, britannia good day, 35g",
    "unit": "35g Pack",
    "retailPrice": 5,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-6",
        "url": "/products/km-bis-goodday-35g.svg",
        "altText": "Britannia Good Day Butter Cookies (₹5 Small Pack - 35g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-7",
    "sku": "KM-BIS-GOODDAY-66G",
    "name": "Britannia Good Day Cashew Cookies (₹10 Pack - 66g)",
    "slug": "britannia-good-day-cashew-cookies-66g-rs-10",
    "description": "Loaded with real crunchy kaju cashew nuts in classic ₹10 pack.",
    "brandId": "brand-4",
    "brand": {
      "id": "brand-4",
      "name": "Britannia",
      "slug": "britannia",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cookies & Marie",
    "searchKeywords": "good day kaju 10 rs, cashew cookies, britannia",
    "unit": "66g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-7",
        "url": "/products/km-bis-goodday-66g.svg",
        "altText": "Britannia Good Day Cashew Cookies (₹10 Pack - 66g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-8",
    "sku": "KM-BIS-BOURBON-50G",
    "name": "Britannia Bourbon Chocolate Cream Biscuits (₹10 Pack - 50g)",
    "slug": "britannia-bourbon-chocolate-cream-50g-rs-10",
    "description": "Delicious chocolate cream filled crunchy biscuits sprinkled with sugar crystals.",
    "brandId": "brand-4",
    "brand": {
      "id": "brand-4",
      "name": "Britannia",
      "slug": "britannia",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cream & Salted Biscuits",
    "searchKeywords": "bourbon biscuit 10 rs, chocolate cream biscuit, britannia",
    "unit": "50g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-8",
        "url": "/products/km-bis-bourbon-50g.svg",
        "altText": "Britannia Bourbon Chocolate Cream Biscuits (₹10 Pack - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-9",
    "sku": "KM-BIS-HIDE-SEEK-33G",
    "name": "Parle Hide & Seek Choco Chip Biscuits (₹10 Pack - 33g)",
    "slug": "parle-hide-and-seek-choco-chip-33g-rs-10",
    "description": "Mouth melting rich chocolate cookies with real chocolate chips in ₹10 pack.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cookies & Marie",
    "searchKeywords": "hide and seek 10 rs, choco chip biscuit, parle hide seek",
    "unit": "33g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-9",
        "url": "/products/km-bis-hide-seek-33g.svg",
        "altText": "Parle Hide & Seek Choco Chip Biscuits (₹10 Pack - 33g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-10",
    "sku": "KM-BIS-MONACO-50G",
    "name": "Parle Monaco Salted Classic Biscuits (₹10 Pack - 50g)",
    "slug": "parle-monaco-salted-biscuits-50g-rs-10",
    "description": "Light, crunchy and salty classic Monaco biscuits for evening snacks.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cream & Salted Biscuits",
    "searchKeywords": "monaco biscuit 10 rs, salted biscuit, parle monaco",
    "unit": "50g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-10",
        "url": "/products/km-bis-monaco-50g.svg",
        "altText": "Parle Monaco Salted Classic Biscuits (₹10 Pack - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-11",
    "sku": "KM-BIS-KRACKJACK-60G",
    "name": "Parle Krackjack Sweet & Salty Biscuits (₹10 Pack - 60g)",
    "slug": "parle-krackjack-sweet-and-salty-60g-rs-10",
    "description": "India\\",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-9",
    "category": {
      "id": "cat-9",
      "name": "Biscuits & Bakery",
      "slug": "biscuits-bakery",
      "description": "Glucose biscuits, Marie, cookies, cream biscuits, rusk, and breads",
      "active": true,
      "displayOrder": 9,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Cream & Salted Biscuits",
    "searchKeywords": "krackjack 10 rs, sweet salty biscuit, parle",
    "unit": "60g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-11",
        "url": "/products/km-bis-krackjack-60g.svg",
        "altText": "Parle Krackjack Sweet & Salty Biscuits (₹10 Pack - 60g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-12",
    "sku": "KM-DAIRY-AMUL-TONED-500ML",
    "name": "Amul Taaza Homogenised Toned Milk (500ml Pouch)",
    "slug": "amul-taaza-toned-milk-500ml-pouch",
    "description": "Fresh pasteurised toned milk with 3.0% Fat and 8.5% SNF. Daily fresh supply.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Milk Pouches",
    "searchKeywords": "amul taaza milk 500ml, toned milk pouch, fresh amul doodh",
    "unit": "500ml Pouch",
    "retailPrice": 28,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-12",
        "url": "/products/km-dairy-amul-toned-500ml.svg",
        "altText": "Amul Taaza Homogenised Toned Milk (500ml Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 26.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-13",
    "sku": "KM-DAIRY-AMUL-GOLD-500ML",
    "name": "Amul Gold Full Cream Milk (500ml Pouch)",
    "slug": "amul-gold-full-cream-milk-500ml-pouch",
    "description": "Rich full cream milk with 6.0% Fat and 9.0% SNF. Perfect for tea, sweets, and paneer.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Milk Pouches",
    "searchKeywords": "amul gold milk, full cream milk pouch, 500ml",
    "unit": "500ml Pouch",
    "retailPrice": 34,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-13",
        "url": "/products/km-dairy-amul-gold-500ml.svg",
        "altText": "Amul Gold Full Cream Milk (500ml Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 32,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-14",
    "sku": "KM-DAIRY-MD-TONED-500ML",
    "name": "Mother Dairy Toned Fresh Milk (500ml Pouch)",
    "slug": "mother-dairy-toned-milk-500ml-pouch",
    "description": "Vitamin A & D enriched pasteurised toned milk from Mother Dairy.",
    "brandId": "brand-2",
    "brand": {
      "id": "brand-2",
      "name": "Mother Dairy",
      "slug": "mother-dairy",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Milk Pouches",
    "searchKeywords": "mother dairy milk 500ml, toned milk, delhi fresh milk",
    "unit": "500ml Pouch",
    "retailPrice": 28,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-14",
        "url": "/products/km-dairy-md-toned-500ml.svg",
        "altText": "Mother Dairy Toned Fresh Milk (500ml Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 26.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-15",
    "sku": "KM-DAIRY-AMUL-BUTTER-20G",
    "name": "Amul Pasteurised Salted Butter (₹10 Single Serve Blister - 20g)",
    "slug": "amul-butter-20g-rs-10-blister",
    "description": "Single serving ₹10 Amul Butter tub. Ideal for single toast or paratha.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Butter & Paneer",
    "searchKeywords": "amul butter 10 rs, small butter pack, 20g amul butter",
    "unit": "20g Blister Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-15",
        "url": "/products/km-dairy-amul-butter-20g.svg",
        "altText": "Amul Pasteurised Salted Butter (₹10 Single Serve Blister - 20g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-16",
    "sku": "KM-DAIRY-AMUL-BUTTER-100G",
    "name": "Amul Pasteurised Salted Butter (100g Block)",
    "slug": "amul-butter-100g-block",
    "description": "Taste of India classic 100g butter block. Delicious on breakfast toast.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Butter & Paneer",
    "searchKeywords": "amul butter 100g, yellow butter, salted butter",
    "unit": "100g Pack",
    "retailPrice": 58,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-16",
        "url": "/products/km-dairy-amul-butter-100g.svg",
        "altText": "Amul Pasteurised Salted Butter (100g Block)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 58,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-17",
    "sku": "KM-DAIRY-AMUL-PANEER-200G",
    "name": "Amul Malai Fresh Paneer (200g Vacuum Pack)",
    "slug": "amul-malai-fresh-paneer-200g",
    "description": "Soft and succulent fresh malai paneer for curries, shahi paneer, and tikkas.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Butter & Paneer",
    "searchKeywords": "amul paneer 200g, malai paneer, fresh paneer block",
    "unit": "200g Pack",
    "retailPrice": 92,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-17",
        "url": "/products/km-dairy-amul-paneer-200g.svg",
        "altText": "Amul Malai Fresh Paneer (200g Vacuum Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 85,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-18",
    "sku": "KM-DAIRY-AMUL-DAHI-200G",
    "name": "Amul Masti Dahi Pouch (₹15 Small Pack - 200g)",
    "slug": "amul-masti-dahi-200g-pouch",
    "description": "Thick, creamy and delicious homestyle curd in ₹15 pouch.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-1",
    "category": {
      "id": "cat-1",
      "name": "Milk & Dairy",
      "slug": "milk-dairy",
      "description": "Fresh milk pouches, butter, paneer, curd, fresh cream, and cheese",
      "active": true,
      "displayOrder": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Curd & Cream",
    "searchKeywords": "amul dahi 200g, masti dahi, curd pouch, yogurt",
    "unit": "200g Pouch",
    "retailPrice": 15,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-18",
        "url": "/products/km-dairy-amul-dahi-200g.svg",
        "altText": "Amul Masti Dahi Pouch (₹15 Small Pack - 200g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 15,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-19",
    "sku": "KM-BEV-STING-250ML",
    "name": "Sting Energy Drink (₹20 Bottle - 250ml)",
    "slug": "sting-energy-drink-250ml-rs-20",
    "description": "Instant energy booster cold drink in popular ₹20 chilled PET bottle.",
    "brandId": "brand-18",
    "brand": {
      "id": "brand-18",
      "name": "Sting",
      "slug": "sting",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-2",
    "category": {
      "id": "cat-2",
      "name": "Cold Drinks & Beverages",
      "slug": "cold-drinks-beverages",
      "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
      "active": true,
      "displayOrder": 2,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Energy & Canned Drinks",
    "searchKeywords": "sting 20 rs, sting energy drink 250ml, red energy drink",
    "unit": "250ml Bottle",
    "retailPrice": 20,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-19",
        "url": "/products/km-bev-sting-250ml.svg",
        "altText": "Sting Energy Drink (₹20 Bottle - 250ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-20",
    "sku": "KM-BEV-COCACOLA-250ML",
    "name": "Coca-Cola Soft Drink (₹20 Small Bottle - 250ml)",
    "slug": "coca-cola-250ml-bottle-rs-20",
    "description": "Classic refreshing Coca-Cola in handy single-serve ₹20 PET bottle.",
    "brandId": "brand-14",
    "brand": {
      "id": "brand-14",
      "name": "Coca-Cola",
      "slug": "coca-cola",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-2",
    "category": {
      "id": "cat-2",
      "name": "Cold Drinks & Beverages",
      "slug": "cold-drinks-beverages",
      "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
      "active": true,
      "displayOrder": 2,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Carbonated Soft Drinks",
    "searchKeywords": "coca cola 250ml, coke 20 rs, cold drink small bottle",
    "unit": "250ml Bottle",
    "retailPrice": 20,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-20",
        "url": "/products/km-bev-cocacola-250ml.svg",
        "altText": "Coca-Cola Soft Drink (₹20 Small Bottle - 250ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-21",
    "sku": "KM-BEV-THUMSUP-250ML",
    "name": "Thums Up Charged Soft Drink (₹20 Small Bottle - 250ml)",
    "slug": "thums-up-250ml-bottle-rs-20",
    "description": "Toofani strong fizzy cola taste in handy ₹20 bottle.",
    "brandId": "brand-16",
    "brand": {
      "id": "brand-16",
      "name": "Thums Up",
      "slug": "thums-up",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-2",
    "category": {
      "id": "cat-2",
      "name": "Cold Drinks & Beverages",
      "slug": "cold-drinks-beverages",
      "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
      "active": true,
      "displayOrder": 2,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Carbonated Soft Drinks",
    "searchKeywords": "thums up 250ml, thumps up 20 rs, strong cola",
    "unit": "250ml Bottle",
    "retailPrice": 20,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-21",
        "url": "/products/km-bev-thumsup-250ml.svg",
        "altText": "Thums Up Charged Soft Drink (₹20 Small Bottle - 250ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-22",
    "sku": "KM-BEV-SPRITE-250ML",
    "name": "Sprite Lemon-Lime Soft Drink (₹20 Small Bottle - 250ml)",
    "slug": "sprite-250ml-bottle-rs-20",
    "description": "Clear lime refreshment with 100% crisp taste in ₹20 bottle.",
    "brandId": "brand-17",
    "brand": {
      "id": "brand-17",
      "name": "Sprite",
      "slug": "sprite",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-2",
    "category": {
      "id": "cat-2",
      "name": "Cold Drinks & Beverages",
      "slug": "cold-drinks-beverages",
      "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
      "active": true,
      "displayOrder": 2,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Carbonated Soft Drinks",
    "searchKeywords": "sprite 250ml, sprite 20 rs, lemon cold drink",
    "unit": "250ml Bottle",
    "retailPrice": 20,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-22",
        "url": "/products/km-bev-sprite-250ml.svg",
        "altText": "Sprite Lemon-Lime Soft Drink (₹20 Small Bottle - 250ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-23",
    "sku": "KM-BEV-FROOTI-125ML",
    "name": "Parle Frooti Mango Drink (₹10 Tetra Pack - 125ml)",
    "slug": "parle-frooti-mango-125ml-rs-10",
    "description": "Real Alphonso mango pulp juice with straw in iconic ₹10 pack.",
    "brandId": "brand-3",
    "brand": {
      "id": "brand-3",
      "name": "Parle",
      "slug": "parle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-2",
    "category": {
      "id": "cat-2",
      "name": "Cold Drinks & Beverages",
      "slug": "cold-drinks-beverages",
      "description": "Soft drinks, fruit juices, energy drinks, and flavored drinks",
      "active": true,
      "displayOrder": 2,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Fruit Juices & Drinks",
    "searchKeywords": "frooti 10 rs, mango juice tetra pack, parle frooti",
    "unit": "125ml Tetra Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-23",
        "url": "/products/km-bev-frooti-125ml.svg",
        "altText": "Parle Frooti Mango Drink (₹10 Tetra Pack - 125ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-24",
    "sku": "KM-BEV-BISLERI-500ML",
    "name": "Bisleri Packaged Mineral Water (₹10 Bottle - 500ml)",
    "slug": "bisleri-mineral-water-500ml-rs-10",
    "description": "Purified mineral water with essential minerals in ₹10 travel bottle.",
    "brandId": "brand-50",
    "brand": {
      "id": "brand-50",
      "name": "Bisleri",
      "slug": "bisleri",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-28",
    "category": {
      "id": "cat-28",
      "name": "Water & Packaged Drinks",
      "slug": "water-packaged-drinks",
      "description": "Packaged mineral water, soda, and tonic water",
      "active": true,
      "displayOrder": 28,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Packaged Mineral Water",
    "searchKeywords": "bisleri 500ml, water bottle 10 rs, mineral water",
    "unit": "500ml Bottle",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-24",
        "url": "/products/km-bev-bisleri-500ml.svg",
        "altText": "Bisleri Packaged Mineral Water (₹10 Bottle - 500ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-25",
    "sku": "KM-BEV-BISLERI-1L",
    "name": "Bisleri Packaged Mineral Water (1 Litre Bottle)",
    "slug": "bisleri-mineral-water-1l-bottle",
    "description": "Standard 1L Bisleri drinking water with tamper-evident seal.",
    "brandId": "brand-50",
    "brand": {
      "id": "brand-50",
      "name": "Bisleri",
      "slug": "bisleri",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-28",
    "category": {
      "id": "cat-28",
      "name": "Water & Packaged Drinks",
      "slug": "water-packaged-drinks",
      "description": "Packaged mineral water, soda, and tonic water",
      "active": true,
      "displayOrder": 28,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Packaged Mineral Water",
    "searchKeywords": "bisleri 1 litre, water bottle 20 rs, packaged water",
    "unit": "1 Litre Bottle",
    "retailPrice": 20,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-25",
        "url": "/products/km-bev-bisleri-1l.svg",
        "altText": "Bisleri Packaged Mineral Water (1 Litre Bottle)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 20,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-26",
    "sku": "KM-RATION-AASH-ATTA-1KG",
    "name": "Aashirvaad Shudh Chakki Atta (1kg Small Trial Pack)",
    "slug": "aashirvaad-chakki-atta-1kg-pack",
    "description": "100% pure whole wheat MP grains ground with chakki-fresh technology.",
    "brandId": "brand-5",
    "brand": {
      "id": "brand-5",
      "name": "ITC Aashirvaad",
      "slug": "itc-aashirvaad",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Whole Wheat Atta",
    "searchKeywords": "aashirvaad atta 1kg, wheat flour, chakki atta, roti flour",
    "unit": "1kg Pouch",
    "retailPrice": 48,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-26",
        "url": "/products/km-ration-aash-atta-1kg.svg",
        "altText": "Aashirvaad Shudh Chakki Atta (1kg Small Trial Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 44,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-27",
    "sku": "KM-RATION-AASH-ATTA-5KG",
    "name": "Aashirvaad Shudh Chakki Atta (5kg Family Pack)",
    "slug": "aashirvaad-chakki-atta-5kg-pack",
    "description": "Standard 5kg family pack for soft rotis and fluffy phulkas.",
    "brandId": "brand-5",
    "brand": {
      "id": "brand-5",
      "name": "ITC Aashirvaad",
      "slug": "itc-aashirvaad",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Whole Wheat Atta",
    "searchKeywords": "aashirvaad atta 5kg, wheat atta bag, wholesale atta",
    "unit": "5kg Bag",
    "retailPrice": 235,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-27",
        "url": "/products/km-ration-aash-atta-5kg.svg",
        "altText": "Aashirvaad Shudh Chakki Atta (5kg Family Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 215,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-28",
    "sku": "KM-RATION-AASH-ATTA-10KG",
    "name": "Aashirvaad Shudh Chakki Atta (10kg Wholesale Bag)",
    "slug": "aashirvaad-chakki-atta-10kg-bag",
    "description": "Wholesale 10kg family monthly ration bag at direct mandi discount.",
    "brandId": "brand-5",
    "brand": {
      "id": "brand-5",
      "name": "ITC Aashirvaad",
      "slug": "itc-aashirvaad",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Whole Wheat Atta",
    "searchKeywords": "aashirvaad atta 10kg, bulk wheat flour, wholesale bag",
    "unit": "10kg Bag",
    "retailPrice": 460,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-28",
        "url": "/products/km-ration-aash-atta-10kg.svg",
        "altText": "Aashirvaad Shudh Chakki Atta (10kg Wholesale Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 420,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-29",
    "sku": "KM-RATION-MAIDA-500G",
    "name": "Premium Superfine Maida (1kg Pouch)",
    "slug": "premium-superfine-maida-500g",
    "description": "Super fine all-purpose refined wheat flour for samosa, bhature, and cakes.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Maida & Suji",
    "searchKeywords": "maida 500g, refined flour, all purpose flour, samosa maida",
    "unit": "1kg Pouch","retailPrice": 54,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 48,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-30",
    "sku": "KM-RATION-SUJI-500G",
    "name": "Crispy Roasted Sooji / Rawa (1kg Pouch)",
    "slug": "crispy-sooji-rawa-500g",
    "description": "Granular semolina rawa for crispy halwa, upma, idli, and chilla.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Maida & Suji",
    "searchKeywords": "suji 500g, rawa, semolina, halwa suji",
    "unit": "1kg Pouch","retailPrice": 62,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 55,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-31",
    "sku": "KM-RATION-BESAN-500G",
    "name": "Tata Sampann Pure Gram Flour Besan (1kg Pack)",
    "slug": "tata-sampann-gram-flour-besan-500g",
    "description": "100% unpolished chana dal besan for pakodas, kadhi, and laddoos.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-11",
    "category": {
      "id": "cat-11",
      "name": "Atta, Maida & Suji",
      "slug": "atta-maida-suji",
      "description": "Chakki fresh whole wheat atta, fine maida, suji, and besan",
      "active": true,
      "displayOrder": 11,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Besan & Sattu",
    "searchKeywords": "besan 500g, tata besan, chana dal flour, gram flour",
    "unit": "1kg Pack","retailPrice": 112,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 98,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-32",
    "sku": "KM-DAL-TOOR-500G",
    "name": "Unpolished Desi Toor / Arhar Dal (1kg Bag)",
    "slug": "unpolished-desi-toor-arhar-dal-500g",
    "description": "Naturally unpolished protein-rich yellow Arhar/Toor dal from Naya Bazar Mandi.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-12",
    "category": {
      "id": "cat-12",
      "name": "Dal & Pulses",
      "slug": "dal-pulses",
      "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
      "active": true,
      "displayOrder": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Toor & Arhar Dal",
    "searchKeywords": "toor dal 500g, arhar dal, yellow dal, pulses",
    "unit": "1kg Bag","retailPrice": 165,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 152,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-33",
    "sku": "KM-DAL-TOOR-1KG",
    "name": "Unpolished Desi Toor / Arhar Dal (1kg Bag)",
    "slug": "unpolished-desi-toor-arhar-dal-1kg",
    "description": "Pure 1kg Toor dal bag for everyday nutritious dal-tadka.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-12",
    "category": {
      "id": "cat-12",
      "name": "Dal & Pulses",
      "slug": "dal-pulses",
      "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
      "active": true,
      "displayOrder": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Toor & Arhar Dal",
    "searchKeywords": "toor dal 1kg, arhar dal 1kg, wholesale dal",
    "unit": "1kg Bag",
    "retailPrice": 165,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-33",
        "url": "/products/km-dal-toor-1kg.svg",
        "altText": "Unpolished Desi Toor / Arhar Dal (1kg Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 152,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-34",
    "sku": "KM-DAL-MOONG-DHULI-500G",
    "name": "Moong Dal Dhuli (Yellow Split - 1kg Bag)",
    "slug": "moong-dal-dhuli-yellow-split-500g",
    "description": "Quick-cooking, easy-to-digest yellow split moong dal for khichdi and soups.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-12",
    "category": {
      "id": "cat-12",
      "name": "Dal & Pulses",
      "slug": "dal-pulses",
      "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
      "active": true,
      "displayOrder": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Moong & Masoor Dal",
    "searchKeywords": "moong dal 500g, dhuli moong, yellow split dal, khichdi dal",
    "unit": "1kg Bag","retailPrice": 120,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 108,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-35",
    "sku": "KM-DAL-CHANA-500G",
    "name": "Desi Chana Dal (1kg Bag)",
    "slug": "desi-chana-dal-500g-pouch",
    "description": "Crisp unpolished chana dal for tadka, vada, and dal fry.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-12",
    "category": {
      "id": "cat-12",
      "name": "Dal & Pulses",
      "slug": "dal-pulses",
      "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
      "active": true,
      "displayOrder": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Chana & Urad Dal",
    "searchKeywords": "chana dal 500g, bengal gram split, dal",
    "unit": "1kg Bag","retailPrice": 95,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 85,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-36",
    "sku": "KM-DAL-RAJMA-CHITRA-500G",
    "name": "Kashmiri Chitra Rajma (Kidney Beans - 1kg Bag)",
    "slug": "kashmiri-chitra-rajma-500g",
    "description": "Soft-boiling authentic speckled Chitra Rajma for Punjabi Rajma Chawal.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-12",
    "category": {
      "id": "cat-12",
      "name": "Dal & Pulses",
      "slug": "dal-pulses",
      "description": "Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma",
      "active": true,
      "displayOrder": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Rajma & Chhole",
    "searchKeywords": "rajma 1kg, chitra rajma, kidney beans, rajma chawal",
    "unit": "1kg Bag",
    "retailPrice": 150,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-36",
        "url": "/products/km-dal-rajma-chitra-500g.svg",
        "altText": "Kashmiri Chitra Rajma (Kidney Beans - 1kg Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 135,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-37",
    "sku": "KM-RICE-BASMATI-FEAST-1KG",
    "name": "India Gate Feast Rozzana Basmati Rice (1kg Pack)",
    "slug": "india-gate-rozzana-basmati-rice-1kg",
    "description": "Fluffy, aromatic medium-long grain basmati rice for daily family meals.",
    "brandId": "brand-59",
    "brand": {
      "id": "brand-59",
      "name": "India Gate",
      "slug": "india-gate",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-5",
    "category": {
      "id": "cat-5",
      "name": "Rice",
      "slug": "rice",
      "description": "Premium Basmati, Kolam, Sona Masoori, and everyday rice",
      "active": true,
      "displayOrder": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Basmati Rice",
    "searchKeywords": "india gate basmati 1kg, rozzana rice, daily basmati",
    "unit": "1kg Bag",
    "retailPrice": 95,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-37",
        "url": "/products/km-rice-basmati-feast-1kg.svg",
        "altText": "India Gate Feast Rozzana Basmati Rice (1kg Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 88,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-38",
    "sku": "KM-RICE-BASMATI-CLASSIC-5KG",
    "name": "India Gate Classic Royal Basmati Rice (5kg Bag)",
    "slug": "india-gate-classic-royal-basmati-5kg-bag",
    "description": "Aged extra long grain pearl white basmati rice for royal biryani & pulao.",
    "brandId": "brand-59",
    "brand": {
      "id": "brand-59",
      "name": "India Gate",
      "slug": "india-gate",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-5",
    "category": {
      "id": "cat-5",
      "name": "Rice",
      "slug": "rice",
      "description": "Premium Basmati, Kolam, Sona Masoori, and everyday rice",
      "active": true,
      "displayOrder": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Basmati Rice",
    "searchKeywords": "india gate classic 5kg, biryani basmati rice, royal basmati",
    "unit": "5kg Bag",
    "retailPrice": 590,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-38",
        "url": "/products/km-rice-basmati-classic-5kg.svg",
        "altText": "India Gate Classic Royal Basmati Rice (5kg Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 540,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-39",
    "sku": "KM-RICE-SONA-MASOORI-1KG",
    "name": "Premium Sona Masoori Raw Rice (1kg Pouch)",
    "slug": "premium-sona-masoori-rice-1kg",
    "description": "Lightweight, fragrant South Indian Sona Masoori rice for daily rice & sambar.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-5",
    "category": {
      "id": "cat-5",
      "name": "Rice",
      "slug": "rice",
      "description": "Premium Basmati, Kolam, Sona Masoori, and everyday rice",
      "active": true,
      "displayOrder": 5,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Non-Basmati & Kolam",
    "searchKeywords": "sona masoori 1kg, raw rice, non basmati rice",
    "unit": "1kg Bag",
    "retailPrice": 58,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-39",
        "url": "/products/km-rice-sona-masoori-1kg.svg",
        "altText": "Premium Sona Masoori Raw Rice (1kg Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 52,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-40",
    "sku": "KM-OIL-FORTUNE-MUSTARD-500ML",
    "name": "Fortune Kachi Ghani Pure Mustard Oil (1 Litre Bottle)",
    "slug": "fortune-kachi-ghani-mustard-oil-500ml-bottle",
    "description": "Pungent cold-pressed raw mustard oil in convenient 500ml PET bottle.",
    "brandId": "brand-7",
    "brand": {
      "id": "brand-7",
      "name": "Fortune",
      "slug": "fortune",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-6",
    "category": {
      "id": "cat-6",
      "name": "Cooking Oil",
      "slug": "cooking-oil",
      "description": "Kachi Ghani Mustard oil, groundnut oil, and traditional cooking oils",
      "active": true,
      "displayOrder": 6,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Mustard Oil (Kachi Ghani)",
    "searchKeywords": "fortune mustard oil 500ml, sarson ka tel, kachi ghani",
    "unit": "1 Litre Bottle","retailPrice": 165,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 150,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-41",
    "sku": "KM-OIL-FORTUNE-MUSTARD-1L",
    "name": "Fortune Kachi Ghani Pure Mustard Oil (1 Litre Pouch)",
    "slug": "fortune-kachi-ghani-mustard-oil-1l-pouch",
    "description": "Traditional cold pressed pungent mustard oil pouch with natural antioxidants.",
    "brandId": "brand-7",
    "brand": {
      "id": "brand-7",
      "name": "Fortune",
      "slug": "fortune",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-6",
    "category": {
      "id": "cat-6",
      "name": "Cooking Oil",
      "slug": "cooking-oil",
      "description": "Kachi Ghani Mustard oil, groundnut oil, and traditional cooking oils",
      "active": true,
      "displayOrder": 6,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Mustard Oil (Kachi Ghani)",
    "searchKeywords": "fortune mustard oil 1 litre pouch, sarson tel, cooking oil",
    "unit": "1 Litre Pouch",
    "retailPrice": 158,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-41",
        "url": "/products/km-oil-fortune-mustard-1l.svg",
        "altText": "Fortune Kachi Ghani Pure Mustard Oil (1 Litre Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 145,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-42",
    "sku": "KM-OIL-FORTUNE-SUNLITE-1L",
    "name": "Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)",
    "slug": "fortune-sunlite-refined-sunflower-oil-1l-pouch",
    "description": "Light, non-sticky sunflower cooking oil rich in Vitamin E.",
    "brandId": "brand-58",
    "brand": {
      "id": "brand-58",
      "name": "Fortune Sunlite",
      "slug": "fortune-sunlite",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-7",
    "category": {
      "id": "cat-7",
      "name": "Refined Oil",
      "slug": "refined-oil",
      "description": "Refined sunflower oil, soybean oil, and rice bran oil",
      "active": true,
      "displayOrder": 7,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Refined Sunflower Oil",
    "searchKeywords": "fortune sunflower oil 1l, refined oil pouch, sunlite",
    "unit": "1 Litre Pouch",
    "retailPrice": 142,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-42",
        "url": "/products/km-oil-fortune-sunlite-1l.svg",
        "altText": "Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 130,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-43",
    "sku": "KM-OIL-FORTUNE-SOYA-1L",
    "name": "Fortune Soya Health Refined Soybean Oil (1 Litre Pouch)",
    "slug": "fortune-refined-soybean-oil-1l-pouch",
    "description": "Enriched with Omega-3 and Vitamin A & D for healthy heart cooking.",
    "brandId": "brand-7",
    "brand": {
      "id": "brand-7",
      "name": "Fortune",
      "slug": "fortune",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-7",
    "category": {
      "id": "cat-7",
      "name": "Refined Oil",
      "slug": "refined-oil",
      "description": "Refined sunflower oil, soybean oil, and rice bran oil",
      "active": true,
      "displayOrder": 7,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Refined Soybean Oil",
    "searchKeywords": "fortune soybean oil 1l, soya oil pouch, refined cooking oil",
    "unit": "1 Litre Pouch",
    "retailPrice": 128,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-43",
        "url": "/products/km-oil-fortune-soya-1l.svg",
        "altText": "Fortune Soya Health Refined Soybean Oil (1 Litre Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 118,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-44",
    "sku": "KM-GHEE-AMUL-PURE-200ML",
    "name": "Amul Pure Danedaar Desi Ghee (1 Litre Jar)",
    "slug": "amul-pure-desi-ghee-200ml-pouch",
    "description": "Rich aroma, golden granular texture pure milk fat ghee in 200ml trial pack.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-8",
    "category": {
      "id": "cat-8",
      "name": "Ghee & Butter",
      "slug": "ghee-butter",
      "description": "Pure cow ghee, desi danedaar ghee, salted & unsalted butter",
      "active": true,
      "displayOrder": 8,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Desi Cow Ghee",
    "searchKeywords": "amul ghee 200ml, small ghee pack, desi ghee pouch",
    "unit": "1 Litre Jar","retailPrice": 610,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 560,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-45",
    "sku": "KM-GHEE-AMUL-PURE-1L",
    "name": "Amul Pure Danedaar Desi Ghee (1 Litre Ceka Pack)",
    "slug": "amul-pure-desi-ghee-1l-ceka-pack",
    "description": "Authentic pure ghee for rotis, dal tadka, sweets, and pooja.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-8",
    "category": {
      "id": "cat-8",
      "name": "Ghee & Butter",
      "slug": "ghee-butter",
      "description": "Pure cow ghee, desi danedaar ghee, salted & unsalted butter",
      "active": true,
      "displayOrder": 8,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Desi Cow Ghee",
    "searchKeywords": "amul ghee 1 litre, desi cow ghee 1kg, pure ghee",
    "unit": "1 Litre Pack",
    "retailPrice": 590,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-45",
        "url": "/products/km-ghee-amul-pure-1l.svg",
        "altText": "Amul Pure Danedaar Desi Ghee (1 Litre Ceka Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 550,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-46",
    "sku": "KM-SPC-MDH-HALDI-10RS",
    "name": "MDH Agmark Haldi Turmeric Powder (₹10 Sachet - 25g)",
    "slug": "mdh-haldi-powder-25g-rs-10",
    "description": "Pure aromatic turmeric with high curcumin content in pocket ₹10 sachet.",
    "brandId": "brand-10",
    "brand": {
      "id": "brand-10",
      "name": "MDH",
      "slug": "mdh",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-16",
    "category": {
      "id": "cat-16",
      "name": "Masala & Spices",
      "slug": "masala-spices",
      "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
      "active": true,
      "displayOrder": 16,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "₹10 Spice Sachets",
    "searchKeywords": "mdh haldi 10 rs, turmeric sachet, haldi powder small pack",
    "unit": "25g Sachet",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-46",
        "url": "/products/km-spc-mdh-haldi-10rs.svg",
        "altText": "MDH Agmark Haldi Turmeric Powder (₹10 Sachet - 25g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 8.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-47",
    "sku": "KM-SPC-MDH-MIRCH-10RS",
    "name": "MDH Deggi Mirch Red Chili Powder (₹10 Sachet - 20g)",
    "slug": "mdh-deggi-mirch-20g-rs-10",
    "description": "Famous vibrant red color and mild spicy flavor in ₹10 pouch.",
    "brandId": "brand-10",
    "brand": {
      "id": "brand-10",
      "name": "MDH",
      "slug": "mdh",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-16",
    "category": {
      "id": "cat-16",
      "name": "Masala & Spices",
      "slug": "masala-spices",
      "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
      "active": true,
      "displayOrder": 16,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "₹10 Spice Sachets",
    "searchKeywords": "mdh mirch 10 rs, deggi mirch sachet, red chili powder",
    "unit": "20g Sachet",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-47",
        "url": "/products/km-spc-mdh-mirch-10rs.svg",
        "altText": "MDH Deggi Mirch Red Chili Powder (₹10 Sachet - 20g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 8.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-48",
    "sku": "KM-SPC-EV-GARAM-10RS",
    "name": "Everest Super Garam Masala (₹10 Box - 15g)",
    "slug": "everest-garam-masala-15g-rs-10",
    "description": "Blend of 13 whole aromatic spices in classic ₹10 carton.",
    "brandId": "brand-11",
    "brand": {
      "id": "brand-11",
      "name": "Everest",
      "slug": "everest",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-16",
    "category": {
      "id": "cat-16",
      "name": "Masala & Spices",
      "slug": "masala-spices",
      "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
      "active": true,
      "displayOrder": 16,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "₹10 Spice Sachets",
    "searchKeywords": "everest garam masala 10 rs, 15g box, spice blend",
    "unit": "15g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-48",
        "url": "/products/km-spc-ev-garam-10rs.svg",
        "altText": "Everest Super Garam Masala (₹10 Box - 15g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 8.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-49",
    "sku": "KM-SPC-CATCH-CHAAT-10RS",
    "name": "Catch Chatpata Chaat Masala Sprinkler (₹10 Pack - 15g)",
    "slug": "catch-chaat-masala-15g-rs-10",
    "description": "Tangy, zesty sprinkler seasoning for salads, fruits, and chaat.",
    "brandId": "brand-12",
    "brand": {
      "id": "brand-12",
      "name": "Catch",
      "slug": "catch",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-16",
    "category": {
      "id": "cat-16",
      "name": "Masala & Spices",
      "slug": "masala-spices",
      "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
      "active": true,
      "displayOrder": 16,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "₹10 Spice Sachets",
    "searchKeywords": "catch chaat masala 10 rs, chatpata masala, seasoning",
    "unit": "15g Pack",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-49",
        "url": "/products/km-spc-catch-chaat-10rs.svg",
        "altText": "Catch Chatpata Chaat Masala Sprinkler (₹10 Pack - 15g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 8.5,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-50",
    "sku": "KM-SPC-MDH-CHANA-100G",
    "name": "MDH Chana Masala Powder (100g Carton)",
    "slug": "mdh-chana-masala-100g-carton",
    "description": "Authentic Amritsari Chhole masala blend with rich pomegranate seeds and amchur.",
    "brandId": "brand-10",
    "brand": {
      "id": "brand-10",
      "name": "MDH",
      "slug": "mdh",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-16",
    "category": {
      "id": "cat-16",
      "name": "Masala & Spices",
      "slug": "masala-spices",
      "description": "Haldi, mirch, dhaniya, garam masala, and ₹10 spice sachets",
      "active": true,
      "displayOrder": 16,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Blended Masala Powders",
    "searchKeywords": "mdh chana masala 100g, chhole masala, blended spice",
    "unit": "100g Box",
    "retailPrice": 78,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-50",
        "url": "/products/km-spc-mdh-chana-100g.svg",
        "altText": "MDH Chana Masala Powder (100g Carton)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 70,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-51",
    "sku": "KM-SALT-TATA-LITE-500G",
    "name": "Tata Salt Vacuum Evaporated Iodized Salt (1kg Pouch)",
    "slug": "tata-salt-vacuum-evaporated-500g",
    "description": "Desh Ka Namak - pure vacuum evaporated iodized salt in 500g pack.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-13",
    "category": {
      "id": "cat-13",
      "name": "Sugar, Salt & Jaggery",
      "slug": "sugar-salt-jaggery",
      "description": "Iodized salt, crystal sugar, bura, and organic gur/jaggery",
      "active": true,
      "displayOrder": 13,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Iodized Salt",
    "searchKeywords": "tata salt 500g, namak, iodized salt",
    "unit": "1kg Pouch","retailPrice": 28,"minimumQuantity": 1,"maximumQuantity": 50,"active": true,"images": [],"baseRate": 24,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-52",
    "sku": "KM-SALT-TATA-1KG",
    "name": "Tata Salt Vacuum Evaporated Iodized Salt (1kg Pack)",
    "slug": "tata-salt-iodized-1kg-pack",
    "description": "India\\",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-13",
    "category": {
      "id": "cat-13",
      "name": "Sugar, Salt & Jaggery",
      "slug": "sugar-salt-jaggery",
      "description": "Iodized salt, crystal sugar, bura, and organic gur/jaggery",
      "active": true,
      "displayOrder": 13,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Iodized Salt",
    "searchKeywords": "tata salt 1kg, desh ka namak, iodized table salt",
    "unit": "1kg Pouch",
    "retailPrice": 28,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-52",
        "url": "/products/km-salt-tata-1kg.svg",
        "altText": "Tata Salt Vacuum Evaporated Iodized Salt (1kg Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 24,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-53",
    "sku": "KM-SUGAR-REFINED-1KG",
    "name": "Premium Sparkling White Sulphur-Free Sugar (1kg Bag)",
    "slug": "premium-white-sugar-1kg-bag",
    "description": "100% pure crystal white sugar from Naya Bazar grain market.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-13",
    "category": {
      "id": "cat-13",
      "name": "Sugar, Salt & Jaggery",
      "slug": "sugar-salt-jaggery",
      "description": "Iodized salt, crystal sugar, bura, and organic gur/jaggery",
      "active": true,
      "displayOrder": 13,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Refined Sugar & Bura",
    "searchKeywords": "sugar 1kg, chini, white crystal sugar",
    "unit": "1kg Bag",
    "retailPrice": 48,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-53",
        "url": "/products/km-sugar-refined-1kg.svg",
        "altText": "Premium Sparkling White Sulphur-Free Sugar (1kg Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 42,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-54",
    "sku": "KM-TEA-TATA-PREM-100G",
    "name": "Tata Tea Premium Desh Ki Chai (₹35 Pack - 100g)",
    "slug": "tata-tea-premium-100g-pack",
    "description": "Blend of big grains for taste and small grains for strength.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-14",
    "category": {
      "id": "cat-14",
      "name": "Tea & Coffee",
      "slug": "tea-coffee",
      "description": "Kadak CTC tea, green tea, instant coffee, and filter coffee",
      "active": true,
      "displayOrder": 14,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "CTC Leaf Tea",
    "searchKeywords": "tata tea 100g, tata premium chai, ctc tea",
    "unit": "100g Pack",
    "retailPrice": 35,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-54",
        "url": "/products/km-tea-tata-prem-100g.svg",
        "altText": "Tata Tea Premium Desh Ki Chai (₹35 Pack - 100g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 30,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-55",
    "sku": "KM-TEA-TATA-PREM-250G",
    "name": "Tata Tea Premium Desh Ki Chai (250g Carton)",
    "slug": "tata-tea-premium-250g-carton",
    "description": "Popular 250g family tea pack for kadak morning chai.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-14",
    "category": {
      "id": "cat-14",
      "name": "Tea & Coffee",
      "slug": "tea-coffee",
      "description": "Kadak CTC tea, green tea, instant coffee, and filter coffee",
      "active": true,
      "displayOrder": 14,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "CTC Leaf Tea",
    "searchKeywords": "tata tea 250g, ctc chai, black tea leaves",
    "unit": "250g Pack",
    "retailPrice": 110,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-55",
        "url": "/products/km-tea-tata-prem-250g.svg",
        "altText": "Tata Tea Premium Desh Ki Chai (250g Carton)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 98,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-56",
    "sku": "KM-COFFEE-NESCAFE-SACHET",
    "name": "Nescafe Classic Instant Coffee (₹10 Single Sachet - 7.5g)",
    "slug": "nescafe-classic-instant-coffee-sachet-rs-10",
    "description": "100% pure instant coffee sachet. Makes 1-2 cups of rich frothy coffee.",
    "brandId": "brand-25",
    "brand": {
      "id": "brand-25",
      "name": "Nestle",
      "slug": "nestle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-14",
    "category": {
      "id": "cat-14",
      "name": "Tea & Coffee",
      "slug": "tea-coffee",
      "description": "Kadak CTC tea, green tea, instant coffee, and filter coffee",
      "active": true,
      "displayOrder": 14,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Instant & Filter Coffee",
    "searchKeywords": "nescafe 10 rs, coffee sachet, instant coffee pouch",
    "unit": "7.5g Sachet",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-56",
        "url": "/products/km-coffee-nescafe-sachet.svg",
        "altText": "Nescafe Classic Instant Coffee (₹10 Single Sachet - 7.5g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-57",
    "sku": "KM-NOOD-MAGGI-35G",
    "name": "Maggi 2-Minute Masala Noodles (₹7 Chhota Pack - 35g)",
    "slug": "maggi-2-minute-noodles-35g-rs-7",
    "description": "Classic favorite Maggi noodles with authentic tastemaker in ₹7 snack pack.",
    "brandId": "brand-13",
    "brand": {
      "id": "brand-13",
      "name": "Maggi",
      "slug": "maggi",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-17",
    "category": {
      "id": "cat-17",
      "name": "Noodles & Pasta",
      "slug": "noodles-pasta",
      "description": "Instant 2-minute noodles, macaroni, penne pasta, and vermicelli",
      "active": true,
      "displayOrder": 17,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Instant 2-Minute Noodles",
    "searchKeywords": "maggi 7 rs, chhota maggi, 2 minute noodles small pack",
    "unit": "35g Pack",
    "retailPrice": 7,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-57",
        "url": "/products/km-nood-maggi-35g.svg",
        "altText": "Maggi 2-Minute Masala Noodles (₹7 Chhota Pack - 35g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 7,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-58",
    "sku": "KM-NOOD-MAGGI-70G",
    "name": "Maggi 2-Minute Masala Noodles (₹14 Single Pack - 70g)",
    "slug": "maggi-2-minute-noodles-70g-rs-14",
    "description": "Standard single serve Maggi noodles pack with favorite masala tastemaker.",
    "brandId": "brand-13",
    "brand": {
      "id": "brand-13",
      "name": "Maggi",
      "slug": "maggi",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-17",
    "category": {
      "id": "cat-17",
      "name": "Noodles & Pasta",
      "slug": "noodles-pasta",
      "description": "Instant 2-minute noodles, macaroni, penne pasta, and vermicelli",
      "active": true,
      "displayOrder": 17,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Instant 2-Minute Noodles",
    "searchKeywords": "maggi 14 rs, maggi noodles 70g, instant masala noodles",
    "unit": "70g Pack",
    "retailPrice": 14,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-58",
        "url": "/products/km-nood-maggi-70g.svg",
        "altText": "Maggi 2-Minute Masala Noodles (₹14 Single Pack - 70g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 14,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-59",
    "sku": "KM-NOOD-MAGGI-4PACK",
    "name": "Maggi 2-Minute Masala Noodles (4-in-1 Family Pack - 280g)",
    "slug": "maggi-2-minute-noodles-4-in-1-family-pack",
    "description": "Value 4-pack of Maggi noodles for whole family snacking.",
    "brandId": "brand-13",
    "brand": {
      "id": "brand-13",
      "name": "Maggi",
      "slug": "maggi",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-17",
    "category": {
      "id": "cat-17",
      "name": "Noodles & Pasta",
      "slug": "noodles-pasta",
      "description": "Instant 2-minute noodles, macaroni, penne pasta, and vermicelli",
      "active": true,
      "displayOrder": 17,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Instant 2-Minute Noodles",
    "searchKeywords": "maggi 4 pack, family pack noodles, 280g",
    "unit": "280g Pack",
    "retailPrice": 56,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-59",
        "url": "/products/km-nood-maggi-4pack.svg",
        "altText": "Maggi 2-Minute Masala Noodles (4-in-1 Family Pack - 280g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 56,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-60",
    "sku": "KM-SNK-HALDIRAM-BHUJIA-35G",
    "name": "Haldiram\\",
    "slug": "haldirams-aloo-bhujia-35g-rs-10",
    "description": "Crispy spicy mint flavoured potato sev bhujia in classic ₹10 snack pouch.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-10",
    "category": {
      "id": "cat-10",
      "name": "Snacks & Namkeen",
      "slug": "snacks-namkeen",
      "description": "Bhujia, mixture, roasted nuts, chana dal, and traditional namkeen",
      "active": true,
      "displayOrder": 10,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Bhujia & Sev",
    "searchKeywords": "aloo bhujia 10 rs, haldiram bhujia, namkeen pouch",
    "unit": "35g Pouch",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-60",
        "url": "/products/km-snk-haldiram-bhujia-35g.svg",
        "altText": "Haldiram\\",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-61",
    "sku": "KM-SNK-HALDIRAM-BHUJIA-200G",
    "name": "Haldiram\\",
    "slug": "haldirams-aloo-bhujia-200g-pouch",
    "description": "200g family pack of India\\",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-10",
    "category": {
      "id": "cat-10",
      "name": "Snacks & Namkeen",
      "slug": "snacks-namkeen",
      "description": "Bhujia, mixture, roasted nuts, chana dal, and traditional namkeen",
      "active": true,
      "displayOrder": 10,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Bhujia & Sev",
    "searchKeywords": "haldiram aloo bhujia 200g, tea snack, namkeen",
    "unit": "200g Pouch",
    "retailPrice": 55,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-61",
        "url": "/products/km-snk-haldiram-bhujia-200g.svg",
        "altText": "Haldiram\\",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 55,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-62",
    "sku": "KM-CHP-LAYS-MAGIC-28G",
    "name": "Lay\\",
    "slug": "lays-india-magic-masala-28g-rs-10",
    "description": "Spicy, tangy Indian masala potato chips in favourite blue ₹10 pack.",
    "brandId": "brand-1",
    "brand": {
      "id": "brand-1",
      "name": "Amul",
      "slug": "amul",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-19",
    "category": {
      "id": "cat-19",
      "name": "Chips & Packaged Snacks",
      "slug": "chips-packaged-snacks",
      "description": "Potato chips, kurkure, nachos, extruded snacks, and papad",
      "active": true,
      "displayOrder": 19,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Potato Chips",
    "searchKeywords": "lays 10 rs, magic masala, blue lays, potato chips",
    "unit": "28g Pouch",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-62",
        "url": "/products/km-chp-lays-magic-28g.svg",
        "altText": "Lay\\",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-63",
    "sku": "KM-CHP-KURKURE-MASALA-38G",
    "name": "Kurkure Masala Munch Crunchy Snacks (₹10 Pack - 38g)",
    "slug": "kurkure-masala-munch-38g-rs-10",
    "description": "Tedha hai par mera hai! Crispy spiced corn & gram curls in ₹10 pouch.",
    "brandId": "brand-22",
    "brand": {
      "id": "brand-22",
      "name": "Kurkure",
      "slug": "kurkure",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-19",
    "category": {
      "id": "cat-19",
      "name": "Chips & Packaged Snacks",
      "slug": "chips-packaged-snacks",
      "description": "Potato chips, kurkure, nachos, extruded snacks, and papad",
      "active": true,
      "displayOrder": 19,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Kurkure & Extruded",
    "searchKeywords": "kurkure 10 rs, masala munch, kurkure pouch, evening snack",
    "unit": "38g Pouch",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-63",
        "url": "/products/km-chp-kurkure-masala-38g.svg",
        "altText": "Kurkure Masala Munch Crunchy Snacks (₹10 Pack - 38g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-64",
    "sku": "KM-CHOC-DAIRYMILK-13G",
    "name": "Cadbury Dairy Milk Chocolate (₹10 Small Bar - 13.2g)",
    "slug": "cadbury-dairy-milk-13g-rs-10",
    "description": "Classic creamy milk chocolate bar in ₹10 pocket size.",
    "brandId": "brand-23",
    "brand": {
      "id": "brand-23",
      "name": "Cadbury Dairy Milk",
      "slug": "cadbury-dairy-milk",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-18",
    "category": {
      "id": "cat-18",
      "name": "Chocolates & Candies",
      "slug": "chocolates-candies",
      "description": "Milk chocolates, wafer bars, toffees, lollipops, and sweets",
      "active": true,
      "displayOrder": 18,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Milk & Dark Chocolates",
    "searchKeywords": "dairy milk 10 rs, cadbury chocolate, small dairy milk",
    "unit": "13.2g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-64",
        "url": "/products/km-choc-dairymilk-13g.svg",
        "altText": "Cadbury Dairy Milk Chocolate (₹10 Small Bar - 13.2g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-65",
    "sku": "KM-CHOC-KITKAT-12G",
    "name": "Nestle KitKat Crisp Wafer Bar (₹10 2-Finger Bar - 12.8g)",
    "slug": "nestle-kitkat-12g-rs-10",
    "description": "Have a break, have a KitKat! Crispy wafer fingers covered with milk choc in ₹10 pack.",
    "brandId": "brand-24",
    "brand": {
      "id": "brand-24",
      "name": "KitKat",
      "slug": "kitkat",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-18",
    "category": {
      "id": "cat-18",
      "name": "Chocolates & Candies",
      "slug": "chocolates-candies",
      "description": "Milk chocolates, wafer bars, toffees, lollipops, and sweets",
      "active": true,
      "displayOrder": 18,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Wafer Bars & Toffees",
    "searchKeywords": "kitkat 10 rs, chocolate wafer, nestle kitkat",
    "unit": "12.8g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-65",
        "url": "/products/km-choc-kitkat-12g.svg",
        "altText": "Nestle KitKat Crisp Wafer Bar (₹10 2-Finger Bar - 12.8g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-66",
    "sku": "KM-SOAP-DETTOL-ORIG-45G",
    "name": "Dettol Original Germ Protection Bath Soap (₹10 Small Bar - 45g)",
    "slug": "dettol-original-soap-45g-rs-10",
    "description": "100% better germ protection antibacterial bath soap in ₹10 single bar.",
    "brandId": "brand-31",
    "brand": {
      "id": "brand-31",
      "name": "Dettol",
      "slug": "dettol",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-4",
    "category": {
      "id": "cat-4",
      "name": "Soaps & Personal Care",
      "slug": "soaps-personal-care",
      "description": "Bathing soaps, body washes, skin creams, and hygiene",
      "active": true,
      "displayOrder": 4,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Bathing Soap Bars",
    "searchKeywords": "dettol soap 10 rs, small dettol, bath soap, antibacterial",
    "unit": "45g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-66",
        "url": "/products/km-soap-dettol-orig-45g.svg",
        "altText": "Dettol Original Germ Protection Bath Soap (₹10 Small Bar - 45g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-67",
    "sku": "KM-SOAP-LIFEBUOY-TOTAL-50G",
    "name": "Lifebuoy Total 10 Germ Protection Soap (₹10 Bar - 50g)",
    "slug": "lifebuoy-total-10-soap-50g-rs-10",
    "description": "Active silver formula for 100% stronger germ fight in ₹10 bar.",
    "brandId": "brand-32",
    "brand": {
      "id": "brand-32",
      "name": "Lifebuoy",
      "slug": "lifebuoy",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-4",
    "category": {
      "id": "cat-4",
      "name": "Soaps & Personal Care",
      "slug": "soaps-personal-care",
      "description": "Bathing soaps, body washes, skin creams, and hygiene",
      "active": true,
      "displayOrder": 4,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Bathing Soap Bars",
    "searchKeywords": "lifebuoy soap 10 rs, red soap, germ protection",
    "unit": "50g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-67",
        "url": "/products/km-soap-lifebuoy-total-50g.svg",
        "altText": "Lifebuoy Total 10 Germ Protection Soap (₹10 Bar - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-68",
    "sku": "KM-SOAP-LUX-ROSE-50G",
    "name": "Lux Soft Rose Glow Beauty Soap (₹10 Small Bar - 50g)",
    "slug": "lux-soft-rose-beauty-soap-50g-rs-10",
    "description": "French rose essence and almond oil for glowing, fragrant skin in ₹10 bar.",
    "brandId": "brand-33",
    "brand": {
      "id": "brand-33",
      "name": "Lux",
      "slug": "lux",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-4",
    "category": {
      "id": "cat-4",
      "name": "Soaps & Personal Care",
      "slug": "soaps-personal-care",
      "description": "Bathing soaps, body washes, skin creams, and hygiene",
      "active": true,
      "displayOrder": 4,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Bathing Soap Bars",
    "searchKeywords": "lux soap 10 rs, beauty soap, rose soap",
    "unit": "50g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-68",
        "url": "/products/km-soap-lux-rose-50g.svg",
        "altText": "Lux Soft Rose Glow Beauty Soap (₹10 Small Bar - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-69",
    "sku": "KM-SHMP-CLINIC-PLUS-6ML",
    "name": "Clinic Plus Strong & Long Shampoo (₹2 Single Sachet - 6ml)",
    "slug": "clinic-plus-shampoo-sachet-6ml-rs-2",
    "description": "Milk protein formula for 35x stronger hair. 3 single-use sachets.",
    "brandId": "brand-38",
    "brand": {
      "id": "brand-38",
      "name": "Clinic Plus",
      "slug": "clinic-plus",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-21",
    "category": {
      "id": "cat-21",
      "name": "Shampoo & Hair Care",
      "slug": "shampoo-hair-care",
      "description": "Anti-dandruff shampoo, hair oils, conditioners, and ₹2-₹5 sachets",
      "active": true,
      "displayOrder": 21,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Hair Shampoo & Sachets",
    "searchKeywords": "clinic plus sachet, shampoo sachet 2 rs, hair wash",
    "unit": "6ml Sachet (Pack of 3)",
    "retailPrice": 6,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-69",
        "url": "/products/km-shmp-clinic-plus-6ml.svg",
        "altText": "Clinic Plus Strong & Long Shampoo (₹2 Single Sachet - 6ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 6,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-70",
    "sku": "KM-SHMP-HNS-COOL-6ML",
    "name": "Head & Shoulders Cool Menthol Anti-Dandruff (₹4 Sachet - 6ml)",
    "slug": "head-and-shoulders-cool-menthol-sachet-rs-4",
    "description": "100% dandruff free scalp with icy menthol cooling in single sachet.",
    "brandId": "brand-39",
    "brand": {
      "id": "brand-39",
      "name": "Head & Shoulders",
      "slug": "head-shoulders",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-21",
    "category": {
      "id": "cat-21",
      "name": "Shampoo & Hair Care",
      "slug": "shampoo-hair-care",
      "description": "Anti-dandruff shampoo, hair oils, conditioners, and ₹2-₹5 sachets",
      "active": true,
      "displayOrder": 21,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Hair Shampoo & Sachets",
    "searchKeywords": "head and shoulders sachet, anti dandruff shampoo sachet",
    "unit": "6ml Sachet",
    "retailPrice": 4,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-70",
        "url": "/products/km-shmp-hns-cool-6ml.svg",
        "altText": "Head & Shoulders Cool Menthol Anti-Dandruff (₹4 Sachet - 6ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 4,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-71",
    "sku": "KM-TOOTH-COLGATE-STRONG-20G",
    "name": "Colgate Strong Teeth Dental Cream (₹10 Small Tube - 20g)",
    "slug": "colgate-strong-teeth-20g-rs-10",
    "description": "Calcium boost formula for cavity protection in ₹10 travel/pocket tube.",
    "brandId": "brand-35",
    "brand": {
      "id": "brand-35",
      "name": "Colgate",
      "slug": "colgate",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-22",
    "category": {
      "id": "cat-22",
      "name": "Toothpaste & Oral Care",
      "slug": "toothpaste-oral-care",
      "description": "Herbal & fluoride toothpaste, toothbrushes, and mouthwash",
      "active": true,
      "displayOrder": 22,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Toothpaste & Powders",
    "searchKeywords": "colgate 10 rs, colgate 20g, small toothpaste tube",
    "unit": "20g Tube",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-71",
        "url": "/products/km-tooth-colgate-strong-20g.svg",
        "altText": "Colgate Strong Teeth Dental Cream (₹10 Small Tube - 20g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-72",
    "sku": "KM-TOOTH-COLGATE-STRONG-100G",
    "name": "Colgate Strong Teeth Dental Cream (100g Regular Tube)",
    "slug": "colgate-strong-teeth-100g-tube",
    "description": "Daily oral protection toothpaste tube for whole family smile.",
    "brandId": "brand-35",
    "brand": {
      "id": "brand-35",
      "name": "Colgate",
      "slug": "colgate",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-22",
    "category": {
      "id": "cat-22",
      "name": "Toothpaste & Oral Care",
      "slug": "toothpaste-oral-care",
      "description": "Herbal & fluoride toothpaste, toothbrushes, and mouthwash",
      "active": true,
      "displayOrder": 22,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Toothpaste & Powders",
    "searchKeywords": "colgate 100g, toothpaste tube, dental cream",
    "unit": "100g Tube",
    "retailPrice": 58,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-72",
        "url": "/products/km-tooth-colgate-strong-100g.svg",
        "altText": "Colgate Strong Teeth Dental Cream (100g Regular Tube)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 58,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-73",
    "sku": "KM-DET-SURF-EXCEL-80G",
    "name": "Surf Excel Easy Wash Detergent Powder (₹10 Sachet - 80g)",
    "slug": "surf-excel-easy-wash-80g-rs-10",
    "description": "Super tough stain removal in single wash in ₹10 trial sachet.",
    "brandId": "brand-26",
    "brand": {
      "id": "brand-26",
      "name": "Surf Excel",
      "slug": "surf-excel",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-20",
    "category": {
      "id": "cat-20",
      "name": "Detergent & Dishwash",
      "slug": "detergent-dishwash",
      "description": "Washing powders, liquid detergents, detergent bars, dishwash bars & gels",
      "active": true,
      "displayOrder": 20,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Washing Powders",
    "searchKeywords": "surf excel 10 rs, washing powder sachet, detergent",
    "unit": "80g Sachet",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-73",
        "url": "/products/km-det-surf-excel-80g.svg",
        "altText": "Surf Excel Easy Wash Detergent Powder (₹10 Sachet - 80g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-74",
    "sku": "KM-DET-SURF-EXCEL-1KG",
    "name": "Surf Excel Easy Wash Detergent Powder (1kg Poly Bag)",
    "slug": "surf-excel-easy-wash-1kg-poly-bag",
    "description": "1kg regular laundry washing powder for bucket and machine wash.",
    "brandId": "brand-26",
    "brand": {
      "id": "brand-26",
      "name": "Surf Excel",
      "slug": "surf-excel",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-20",
    "category": {
      "id": "cat-20",
      "name": "Detergent & Dishwash",
      "slug": "detergent-dishwash",
      "description": "Washing powders, liquid detergents, detergent bars, dishwash bars & gels",
      "active": true,
      "displayOrder": 20,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Washing Powders",
    "searchKeywords": "surf excel 1kg, washing powder 1kg bag, detergent",
    "unit": "1kg Bag",
    "retailPrice": 140,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-74",
        "url": "/products/km-det-surf-excel-1kg.svg",
        "altText": "Surf Excel Easy Wash Detergent Powder (1kg Poly Bag)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 140,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-75",
    "sku": "KM-DET-RIN-BAR-140G",
    "name": "Rin Advanced Detergent Washing Bar (₹10 Bar - 140g)",
    "slug": "rin-detergent-bar-140g-rs-10",
    "description": "Dazzling whites on collars and cuffs in classic ₹10 Rin sabun bar.",
    "brandId": "brand-28",
    "brand": {
      "id": "brand-28",
      "name": "Rin",
      "slug": "rin",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-20",
    "category": {
      "id": "cat-20",
      "name": "Detergent & Dishwash",
      "slug": "detergent-dishwash",
      "description": "Washing powders, liquid detergents, detergent bars, dishwash bars & gels",
      "active": true,
      "displayOrder": 20,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Detergent Bars",
    "searchKeywords": "rin bar 10 rs, kapde dhone ka sabun, washing soap",
    "unit": "140g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-75",
        "url": "/products/km-det-rin-bar-140g.svg",
        "altText": "Rin Advanced Detergent Washing Bar (₹10 Bar - 140g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-76",
    "sku": "KM-DET-VIM-BAR-150G",
    "name": "Vim Dishwash Bar with Real Lemon Juice (₹10 Bar - 150g)",
    "slug": "vim-dishwash-bar-150g-rs-10",
    "description": "Degreases 100 oily utensils with power of 100 lemons in ₹10 bar.",
    "brandId": "brand-29",
    "brand": {
      "id": "brand-29",
      "name": "Vim",
      "slug": "vim",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-20",
    "category": {
      "id": "cat-20",
      "name": "Detergent & Dishwash",
      "slug": "detergent-dishwash",
      "description": "Washing powders, liquid detergents, detergent bars, dishwash bars & gels",
      "active": true,
      "displayOrder": 20,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Dishwash Bars & Liquids",
    "searchKeywords": "vim bar 10 rs, bartan dhone ka sabun, dishwash bar",
    "unit": "150g Bar",
    "retailPrice": 10,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-76",
        "url": "/products/km-det-vim-bar-150g.svg",
        "altText": "Vim Dishwash Bar with Real Lemon Juice (₹10 Bar - 150g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 10,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-77",
    "sku": "KM-CLN-HARPIC-200ML",
    "name": "Harpic Power Plus Disinfectant Toilet Cleaner (200ml Small Bottle)",
    "slug": "harpic-power-plus-toilet-cleaner-200ml",
    "description": "10x better stain remover and 99.9% germ kill in convenient 200ml bottle.",
    "brandId": "brand-41",
    "brand": {
      "id": "brand-41",
      "name": "Harpic",
      "slug": "harpic",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-24",
    "category": {
      "id": "cat-24",
      "name": "Household Cleaning",
      "slug": "household-cleaning",
      "description": "Floor cleaners, toilet cleaners, glass cleaners, and phenyl",
      "active": true,
      "displayOrder": 24,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Floor & Toilet Cleaners",
    "searchKeywords": "harpic 200ml, toilet cleaner small bottle, blue harpic",
    "unit": "200ml Bottle",
    "retailPrice": 42,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-77",
        "url": "/products/km-cln-harpic-200ml.svg",
        "altText": "Harpic Power Plus Disinfectant Toilet Cleaner (200ml Small Bottle)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 42,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-78",
    "sku": "KM-CLN-LIZOL-FLOR-500ML",
    "name": "Lizol Disinfectant Citrus Surface Floor Cleaner (500ml Bottle)",
    "slug": "lizol-floor-cleaner-citrus-500ml",
    "description": "Kills 99.9% germs and leaves refreshing citrus fragrance on floor tiles.",
    "brandId": "brand-42",
    "brand": {
      "id": "brand-42",
      "name": "Lizol",
      "slug": "lizol",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-24",
    "category": {
      "id": "cat-24",
      "name": "Household Cleaning",
      "slug": "household-cleaning",
      "description": "Floor cleaners, toilet cleaners, glass cleaners, and phenyl",
      "active": true,
      "displayOrder": 24,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Floor & Toilet Cleaners",
    "searchKeywords": "lizol 500ml, floor cleaner, pocha liquid, disinfectant",
    "unit": "500ml Bottle",
    "retailPrice": 99,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-78",
        "url": "/products/km-cln-lizol-flor-500ml.svg",
        "altText": "Lizol Disinfectant Citrus Surface Floor Cleaner (500ml Bottle)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 99,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-79",
    "sku": "KM-POOJA-MATCHBOX-BUNDLE",
    "name": "Safety Matchboxes Kirana Household Pack (Bundle of 10 Boxes)",
    "slug": "safety-matchboxes-bundle-10-boxes",
    "description": "Damp-proof safety matchboxes bundle for kitchen stove and pooja diya.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-26",
    "category": {
      "id": "cat-26",
      "name": "Pooja & Daily Essentials",
      "slug": "pooja-daily-essentials",
      "description": "Agarbatti, matchboxes, dhoop, camphor (kapoor), and cotton wicks",
      "active": true,
      "displayOrder": 26,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Matchbox & Camphor",
    "searchKeywords": "matchbox 10 pack, machis, safety matches",
    "unit": "Bundle (10 Pcs)",
    "retailPrice": 15,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-79",
        "url": "/products/km-pooja-matchbox-bundle.svg",
        "altText": "Safety Matchboxes Kirana Household Pack (Bundle of 10 Boxes)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 15,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-80",
    "sku": "KM-POOJA-CYCLE-AGAR-50G",
    "name": "Cycle Pure Three in One Agarbatti (₹15 Pack - 50g)",
    "slug": "cycle-three-in-one-agarbatti-50g",
    "description": "Natural floral, woody & herbal fragrance incense sticks for daily pooja.",
    "brandId": "brand-46",
    "brand": {
      "id": "brand-46",
      "name": "Cycle",
      "slug": "cycle",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-26",
    "category": {
      "id": "cat-26",
      "name": "Pooja & Daily Essentials",
      "slug": "pooja-daily-essentials",
      "description": "Agarbatti, matchboxes, dhoop, camphor (kapoor), and cotton wicks",
      "active": true,
      "displayOrder": 26,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Agarbatti & Dhoop",
    "searchKeywords": "cycle agarbatti 15 rs, pooja incense sticks, dhoop batti",
    "unit": "50g Box",
    "retailPrice": 15,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-80",
        "url": "/products/km-pooja-cycle-agar-50g.svg",
        "altText": "Cycle Pure Three in One Agarbatti (₹15 Pack - 50g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 15,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-81",
    "sku": "KM-POOJA-CAMPHOR-50G",
    "name": "Pure Bhimseni Camphor Kapoor Tablets (50g Box)",
    "slug": "pure-bhimseni-camphor-kapoor-50g",
    "description": "100% pure white camphor tablets that burn completely without residue.",
    "brandId": "brand-47",
    "brand": {
      "id": "brand-47",
      "name": "Mangaldeep",
      "slug": "mangaldeep",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-26",
    "category": {
      "id": "cat-26",
      "name": "Pooja & Daily Essentials",
      "slug": "pooja-daily-essentials",
      "description": "Agarbatti, matchboxes, dhoop, camphor (kapoor), and cotton wicks",
      "active": true,
      "displayOrder": 26,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Matchbox & Camphor",
    "searchKeywords": "kapoor 50g, camphor tablets, aarti kapoor, pooja samagri",
    "unit": "50g Box",
    "retailPrice": 45,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-81",
        "url": "/products/km-pooja-camphor-50g.svg",
        "altText": "Pure Bhimseni Camphor Kapoor Tablets (50g Box)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 45,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-82",
    "sku": "KM-OTHER-GOODKNIGHT-REFILL",
    "name": "Good Knight Gold Flash Liquid Mosquito Vaporizer Refill (45ml)",
    "slug": "good-knight-gold-flash-refill-45ml",
    "description": "Dual mode mosquito protection against dengue and malaria mosquitoes.",
    "brandId": "brand-44",
    "brand": {
      "id": "brand-44",
      "name": "Good Knight",
      "slug": "good-knight",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-30",
    "category": {
      "id": "cat-30",
      "name": "Other Kirana Essentials",
      "slug": "other-kirana-essentials",
      "description": "Batteries, mosquito repellents, candles, and utility essentials",
      "active": true,
      "displayOrder": 30,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Mosquito Repellents",
    "searchKeywords": "good knight refill, machar marne ki liquid, mosquito repellent",
    "unit": "45ml Refill",
    "retailPrice": 85,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-82",
        "url": "/products/km-other-goodknight-refill.svg",
        "altText": "Good Knight Gold Flash Liquid Mosquito Vaporizer Refill (45ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 85,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-83",
    "sku": "KM-BABY-PAMPERS-S-1PC",
    "name": "Pampers All-Round Protection Baby Diaper Pants (Size M - 1 Pc / ₹10 Pack)",
    "slug": "pampers-baby-diaper-pants-m-single-pc",
    "description": "Single emergency sample pack with magic gel lock for baby comfort.",
    "brandId": "brand-48",
    "brand": {
      "id": "brand-48",
      "name": "Pampers",
      "slug": "pampers",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-27",
    "category": {
      "id": "cat-27",
      "name": "Baby Care",
      "slug": "baby-care",
      "description": "Baby diapers, wet wipes, baby soap, and talc",
      "active": true,
      "displayOrder": 27,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Baby Diapers & Wipes",
    "searchKeywords": "pampers single diaper, baby diaper 10 rs, size M diaper",
    "unit": "1 Diaper Pant",
    "retailPrice": 12,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-83",
        "url": "/products/km-baby-pampers-s-1pc.svg",
        "altText": "Pampers All-Round Protection Baby Diaper Pants (Size M - 1 Pc / ₹10 Pack)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 12,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-84",
    "sku": "KM-DRY-ALMOND-100G",
    "name": "California Premium Crunchy Almonds Badam (100g Pouch)",
    "slug": "california-premium-almonds-badam-100g",
    "description": "Crispy, sweet California almonds loaded with natural Vitamin E & protein.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-15",
    "category": {
      "id": "cat-15",
      "name": "Dry Fruits & Nuts",
      "slug": "dry-fruits-nuts",
      "description": "Almonds, cashews, raisins, walnuts, pistachios, and foxnuts",
      "active": true,
      "displayOrder": 15,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Almonds & Cashews",
    "searchKeywords": "badam 100g, almonds pouch, dry fruits, khari baoli badam",
    "unit": "100g Pouch",
    "retailPrice": 95,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-84",
        "url": "/products/km-dry-almond-100g.svg",
        "altText": "California Premium Crunchy Almonds Badam (100g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 85,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-85",
    "sku": "KM-DRY-CASHEW-100G",
    "name": "Goa Whole White Cashews Kaju W320 (100g Pouch)",
    "slug": "goa-whole-cashews-kaju-w320-100g",
    "description": "Whole, cream-white premium grade W320 cashews for sweets and snacking.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-15",
    "category": {
      "id": "cat-15",
      "name": "Dry Fruits & Nuts",
      "slug": "dry-fruits-nuts",
      "description": "Almonds, cashews, raisins, walnuts, pistachios, and foxnuts",
      "active": true,
      "displayOrder": 15,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Almonds & Cashews",
    "searchKeywords": "kaju 100g, cashew nuts, whole kaju w320, dry fruits",
    "unit": "100g Pouch",
    "retailPrice": 110,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-85",
        "url": "/products/km-dry-cashew-100g.svg",
        "altText": "Goa Whole White Cashews Kaju W320 (100g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 98,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-86",
    "sku": "KM-INST-POHA-500G",
    "name": "Thick Poha / Flattened Rice (1kg Bag)",
    "slug": "thick-poha-flattened-rice-500g",
    "description": "Clean, spotless flattened rice for soft, fluffy Kanda Batata Poha breakfast.",
    "brandId": "brand-6",
    "brand": {
      "id": "brand-6",
      "name": "Tata",
      "slug": "tata",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-29",
    "category": {
      "id": "cat-29",
      "name": "Instant Food & Ready-to-Cook",
      "slug": "instant-food-ready-to-cook",
      "description": "Poha, soup mixes, gulab jamun mix, ketchup, and sauces",
      "active": true,
      "displayOrder": 29,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Poha & Ready Mixes",
    "searchKeywords": "poha 500g, flattened rice, chivda, breakfast poha",
    "unit": "500g Pouch",
    "retailPrice": 34,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-86",
        "url": "/products/km-inst-poha-500g.svg",
        "altText": "Thick Poha / Flattened Rice (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 30,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-87",
    "sku": "KM-INST-KISSAN-KETCHUP-100G",
    "name": "Kissan Fresh Tomato Ketchup (₹15 Small Squeezy Pouch - 100g)",
    "slug": "kissan-fresh-tomato-ketchup-100g-pouch",
    "description": "100% real ripe tomatoes ketchup in convenient ₹15 squeezy spout pack.",
    "brandId": "brand-53",
    "brand": {
      "id": "brand-53",
      "name": "Kissan",
      "slug": "kissan",
      "active": true,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "categoryId": "cat-29",
    "category": {
      "id": "cat-29",
      "name": "Instant Food & Ready-to-Cook",
      "slug": "instant-food-ready-to-cook",
      "description": "Poha, soup mixes, gulab jamun mix, ketchup, and sauces",
      "active": true,
      "displayOrder": 29,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "subCategoryName": "Sauces & Ketchup",
    "searchKeywords": "kissan ketchup 15 rs, tomato sauce pouch, 100g ketchup",
    "unit": "100g Pouch",
    "retailPrice": 15,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-87",
        "url": "/products/km-inst-kissan-ketchup-100g.svg",
        "altText": "Kissan Fresh Tomato Ketchup (₹15 Small Squeezy Pouch - 100g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 15,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    id: 'prod-88',
    sku: 'KM-WHEAT-SHAR-50KG',
    name: 'MP Sharbati Desi Gehun / Whole Wheat Grains (50kg Wholesale Bori)',
    slug: 'mp-sharbati-gehun-wheat-50kg-bori',
    description: 'Premier Sehore MP Sharbati golden wheat grains, machine cleaned, 100% Sortex. Direct from Narela & Naya Bazar mandi auctions.',
    brandId: 'brand-5',
    brand: { id: 'brand-5', name: 'ITC Aashirvaad', slug: 'itc-aashirvaad', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-11',
    category: { id: 'cat-11', name: 'Atta, Maida & Suji', slug: 'atta-maida-suji', description: 'Chakki fresh whole wheat atta, fine maida, suji, and besan', active: true, displayOrder: 11, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Wheat Grains',
    searchKeywords: 'gehun, wheat grains, sharbati gehun, 50kg gehun bori, mandi wheat',
    unit: '50kg Bag',
    retailPrice: 1550,
    baseRate: 1420,
    minimumQuantity: 1,
    maximumQuantity: 20,
    active: true,
    images: [{ id: 'img-88', url: '/products/km-wheat-sharbati.svg', altText: 'MP Sharbati Desi Gehun 50kg Bori', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-89',
    sku: 'KM-SUGAR-BORI-50KG',
    name: 'Pure Sparkling White Crystal Sugar (50kg Wholesale Mandi Bori)',
    slug: 'pure-white-sugar-50kg-wholesale-bori',
    description: 'M-30 grade sulphur-free premium crystal sugar. Direct mill dispatch lot traded at Naya Bazar and Ghaziabad mandi.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-13',
    category: { id: 'cat-13', name: 'Sugar, Salt & Jaggery', slug: 'sugar-salt-jaggery', description: 'Iodized salt, crystal sugar, bura, and organic gur/jaggery', active: true, displayOrder: 13, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Crystal Sugar Bori',
    searchKeywords: 'chini 50kg, sugar bori, wholesale sugar, m30 sugar, mandi chini',
    unit: '50kg Bag',
    retailPrice: 2150,
    baseRate: 1980,
    minimumQuantity: 1,
    maximumQuantity: 20,
    active: true,
    images: [{ id: 'img-89', url: '/products/km-sugar-50kg.svg', altText: 'Pure White Sugar 50kg Bori', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-90',
    sku: 'KM-GUR-KOLHAPUR-1KG',
    name: 'Kolhapur Natural Desi Gur / Jaggery Block (1kg Pack)',
    slug: 'kolhapur-desi-gur-jaggery-1kg',
    description: 'Traditional unrefined chemical-free golden jaggery. Traded prominently at Dadri and Khari Baoli mandis.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-13',
    category: { id: 'cat-13', name: 'Sugar, Salt & Jaggery', slug: 'sugar-salt-jaggery', description: 'Iodized salt, crystal sugar, bura, and organic gur/jaggery', active: true, displayOrder: 13, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Desi Gur & Jaggery',
    searchKeywords: 'gur 1kg, jaggery block, kolhapur gur, desi gud, organic jaggery',
    unit: '1kg Block',
    retailPrice: 65,
    baseRate: 52,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-90', url: '/products/km-gur-kolhapur.svg', altText: 'Kolhapur Desi Gur 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-91',
    sku: 'KM-OIL-MUSTARD-15L-TIN',
    name: 'Kachi Ghani Pure Mustard Oil Wholesale Tin (15 Litre Pipa)',
    slug: 'kachi-ghani-mustard-oil-15l-tin',
    description: '100% pure cold-pressed pungent kachi ghani mustard oil in 15-litre commercial tin. Benchmark commodity at Ghaziabad & Naya Bazar mandis.',
    brandId: 'brand-7',
    brand: { id: 'brand-7', name: 'Fortune', slug: 'fortune', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-6',
    category: { id: 'cat-6', name: 'Cooking Oil', slug: 'cooking-oil', description: 'Kachi Ghani Mustard oil, groundnut oil, and traditional cooking oils', active: true, displayOrder: 6, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Mustard Oil Tin',
    searchKeywords: 'mustard oil pipa, 15l sarson tel, kachi ghani tin, wholesale oil',
    unit: '15 Litre Tin',
    retailPrice: 2280,
    baseRate: 2050,
    minimumQuantity: 1,
    maximumQuantity: 20,
    active: true,
    images: [{ id: 'img-91', url: '/products/km-oil-mustard-15l.svg', altText: 'Mustard Oil 15L Tin', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-92',
    sku: 'KM-DAL-URAD-DHULI-1KG',
    name: 'Unpolished Urad Dal Dhuli (White Split Black Gram - 1kg Bag)',
    slug: 'unpolished-urad-dal-dhuli-1kg',
    description: 'Clean sortex quality white split urad dal for dal makhani, idli-dosa batter and papad.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-12',
    category: { id: 'cat-12', name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma', active: true, displayOrder: 12, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Urad Dal',
    searchKeywords: 'urad dhuli 1kg, safed urad dal, split urad dal',
    unit: '1kg Bag',
    retailPrice: 148,
    baseRate: 132,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-92', url: '/products/km-dal-urad-dhuli.svg', altText: 'Urad Dal Dhuli 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-93',
    sku: 'KM-DAL-URAD-CHILKA-1KG',
    name: 'Unpolished Urad Dal Chilka (Black Split Gram with Skin - 1kg Bag)',
    slug: 'unpolished-urad-dal-chilka-1kg',
    description: 'High fibre split black gram with green-black skin. Traditional North Indian tadka dal.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-12',
    category: { id: 'cat-12', name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma', active: true, displayOrder: 12, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Urad Dal',
    searchKeywords: 'urad chilka 1kg, black split urad, chilka dal',
    unit: '1kg Bag',
    retailPrice: 138,
    baseRate: 122,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-93', url: '/products/km-dal-urad-chilka.svg', altText: 'Urad Dal Chilka 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-94',
    sku: 'KM-DAL-MASOOR-MALKA-1KG',
    name: 'Red Lentils / Lal Masoor Dal Malka (1kg Bag)',
    slug: 'lal-masoor-dal-malka-1kg',
    description: 'Quick cooking split orange-red lentils. High protein staple from Naya Bazar and Najafgarh pulse markets.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-12',
    category: { id: 'cat-12', name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma', active: true, displayOrder: 12, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Masoor Dal',
    searchKeywords: 'masoor dal 1kg, lal dal, malka masoor, red lentils',
    unit: '1kg Bag',
    retailPrice: 110,
    baseRate: 94,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-94', url: '/products/km-dal-masoor.svg', altText: 'Lal Masoor Dal 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-95',
    sku: 'KM-CHANA-KABULI-1KG',
    name: 'Super Bold Kabuli Chana / Safed Chole (12mm Size - 1kg Bag)',
    slug: 'super-bold-kabuli-chana-safed-chole-1kg',
    description: 'Super large 12mm bold white chickpeas for restaurant quality Amritsari pindi chole.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-12',
    category: { id: 'cat-12', name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma', active: true, displayOrder: 12, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Kabuli Chana',
    searchKeywords: 'kabuli chana 1kg, safed chole, bold chickpeas, chole bhature',
    unit: '1kg Bag',
    retailPrice: 165,
    baseRate: 145,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-95', url: '/products/km-chana-kabuli.svg', altText: 'Kabuli Chana 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-96',
    sku: 'KM-CHANA-KALA-DESI-1KG',
    name: 'Desi Kala Chana / Small Brown Chickpeas (1kg Bag)',
    slug: 'desi-kala-chana-brown-chickpeas-1kg',
    description: 'Authentic desi black chickpeas, rich in iron and fibre. Ideal for morning sprouts and pooja chana.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-12',
    category: { id: 'cat-12', name: 'Dal & Pulses', slug: 'dal-pulses', description: 'Toor dal, Moong dal, Chana dal, Urad dal, Masoor dal, and Rajma', active: true, displayOrder: 12, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Kala Chana',
    searchKeywords: 'kala chana 1kg, desi chana, brown chickpeas, sprouts',
    unit: '1kg Bag',
    retailPrice: 95,
    baseRate: 80,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-96', url: '/products/km-chana-kala.svg', altText: 'Desi Kala Chana 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-97',
    sku: 'KM-RICE-1121-STEAM-10KG',
    name: '1121 XXL Extra Long Grain Steam Basmati Rice (10kg Wholesale Bag)',
    slug: '1121-xxl-steam-basmati-rice-10kg-bag',
    description: 'Premier 8.35mm raw grain length 1121 steam basmati rice. Renowned Sonipat & Naya Bazar mandi specialty.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-5',
    category: { id: 'cat-5', name: 'Rice', slug: 'rice', description: 'Premium Basmati, Kolam, Sona Masoori, and everyday rice', active: true, displayOrder: 5, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: '1121 Basmati Rice',
    searchKeywords: '1121 basmati rice 10kg, steam basmati, biryani rice, sonipat rice',
    unit: '10kg Bag',
    retailPrice: 1180,
    baseRate: 1040,
    minimumQuantity: 1,
    maximumQuantity: 20,
    active: true,
    images: [{ id: 'img-97', url: '/products/km-rice-1121.svg', altText: '1121 Steam Basmati Rice 10kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-98',
    sku: 'KM-SPICE-JEERA-SABUT-500G',
    name: 'Unpolished Machine Cleaned Sabut Jeera / Cumin Seeds (500g Bag)',
    slug: 'unpolished-sabut-jeera-cumin-seeds-500g',
    description: '100% natural aromatic bold cumin seeds. Sourced directly from Khari Baoli spice mandi benchmark auctions.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'sabut jeera 500g, cumin seeds, khari baoli jeera, zeera',
    unit: '500g Bag',
    retailPrice: 240,
    baseRate: 205,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-98', url: '/products/km-spice-jeera.svg', altText: 'Sabut Jeera 500g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-99',
    sku: 'KM-SPICE-DHANIYA-SABUT-500G',
    name: 'Rajasthan Green Whole Coriander Seeds / Sabut Dhaniya (500g Bag)',
    slug: 'rajasthan-whole-coriander-seeds-sabut-dhaniya-500g',
    description: 'Rich fragrance natural green coriander seeds from Khari Baoli spice exchange.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'sabut dhaniya 500g, coriander seeds, whole dhaniya, khari baoli',
    unit: '500g Bag',
    retailPrice: 110,
    baseRate: 90,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-99', url: '/products/km-spice-dhaniya.svg', altText: 'Sabut Dhaniya 500g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-100',
    sku: 'KM-SPICE-KALI-MIRCH-200G',
    name: 'Malabar Bold Whole Black Pepper / Sabut Kali Mirch (200g Pouch)',
    slug: 'malabar-bold-whole-black-pepper-kali-mirch-200g',
    description: 'Black bold peppercorns with intense pungency and high piperine content.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'kali mirch 200g, black pepper, sabut kali mirch, spice mandi',
    unit: '200g Pouch',
    retailPrice: 185,
    baseRate: 155,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-100', url: '/products/km-spice-kali-mirch.svg', altText: 'Sabut Kali Mirch 200g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-101',
    sku: 'KM-SPICE-RAI-KALI-200G',
    name: 'Chhoti Kali Rai / Small Mustard Seeds (200g Pouch)',
    slug: 'chhoti-kali-rai-mustard-seeds-200g',
    description: 'Tiny pungent dark mustard seeds for traditional South Indian and Gujarati tadka.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'rai 200g, mustard seeds, kali rai, tadka rai',
    unit: '200g Pouch',
    retailPrice: 42,
    baseRate: 32,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-101', url: '/products/km-spice-rai.svg', altText: 'Kali Rai 200g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-102',
    sku: 'KM-SPICE-METHI-200G',
    name: 'Desi Methi Dana / Pure Whole Fenugreek Seeds (200g Pouch)',
    slug: 'desi-methi-dana-fenugreek-seeds-200g',
    description: 'Golden-yellow aromatic fenugreek seeds for pickles, sambhar and ayurvedic water.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'methi dana 200g, fenugreek seeds, whole methi',
    unit: '200g Pouch',
    retailPrice: 38,
    baseRate: 28,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-102', url: '/products/km-spice-methi.svg', altText: 'Methi Dana 200g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-103',
    sku: 'KM-SPICE-SAUNF-200G',
    name: 'Moti Desi Saunf / Sweet Whole Fennel Seeds (200g Pouch)',
    slug: 'moti-desi-saunf-fennel-seeds-200g',
    description: 'Naturally fragrant sweet green fennel seeds for cooking tadka and traditional mukhwas.',
    brandId: 'brand-10',
    brand: { id: 'brand-10', name: 'MDH', slug: 'mdh', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-16',
    category: { id: 'cat-16', name: 'Masala & Spices', slug: 'masala-spices', description: 'Whole spices, powdered spices, blended masala, and seasonings', active: true, displayOrder: 16, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Whole Spices',
    searchKeywords: 'saunf 200g, fennel seeds, moti saunf, mukhwas',
    unit: '200g Pouch',
    retailPrice: 55,
    baseRate: 44,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-103', url: '/products/km-spice-saunf.svg', altText: 'Moti Saunf 200g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-104',
    sku: 'KM-MAKHANA-JUMBO-250G',
    name: 'Jumbo 5-Star Phool Makhana / Foxnuts (250g Wholesale Bag)',
    slug: 'jumbo-phool-makhana-foxnuts-250g',
    description: 'Crispy hand-picked large white foxnuts from Bihar-Mandi wholesale lots.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-15',
    category: { id: 'cat-15', name: 'Dry Fruits & Nuts', slug: 'dry-fruits-nuts', description: 'Almonds, cashews, raisins, walnuts, pistachios, and makhana', active: true, displayOrder: 15, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Phool Makhana',
    searchKeywords: 'makhana 250g, phool makhana, fox nuts, roasted makhana',
    unit: '250g Bag',
    retailPrice: 280,
    baseRate: 235,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-104', url: '/products/km-makhana-jumbo.svg', altText: 'Phool Makhana 250g', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'prod-105',
    sku: 'KM-SALT-SENDHA-1KG',
    name: 'Natural Himalayan Rock Salt / Sendha Namak Powder (1kg Pouch)',
    slug: 'himalayan-rock-salt-sendha-namak-1kg',
    description: 'Pure pink rock salt powder, unrefined with 84 trace minerals. Ideal for daily health & fasting/vrat.',
    brandId: 'brand-6',
    brand: { id: 'brand-6', name: 'Tata', slug: 'tata', active: true, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    categoryId: 'cat-13',
    category: { id: 'cat-13', name: 'Sugar, Salt & Jaggery', slug: 'sugar-salt-jaggery', description: 'Iodized salt, crystal sugar, bura, and organic gur/jaggery', active: true, displayOrder: 13, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
    subCategoryName: 'Rock Salt',
    searchKeywords: 'sendha namak 1kg, rock salt, himalayan pink salt, vrat namak',
    unit: '1kg Pouch',
    retailPrice: 65,
    baseRate: 48,
    minimumQuantity: 1,
    maximumQuantity: 50,
    active: true,
    images: [{ id: 'img-105', url: '/products/km-salt-sendha.svg', altText: 'Sendha Namak 1kg', active: true, sortOrder: 1 }],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  }
];

// -------------------------------------------------------------
// LIVE MANDI WHOLESALE RATES ACROSS ALL 16 DELHI-NCR MANDIS
// PURE RATION COMMODITIES ONLY: DAL, TEL, ATTA, CHINI, CHAWAL, MASALE, GUR
// -------------------------------------------------------------

const MANDI_SPECIALTY_MODIFIERS: Record<string, { [catSlug: string]: number; default: number }> = {
  // 1. Naya Bazar (Old Delhi) - Benchmark bulk foodgrain, basmati, pulse terminal
  'mandi-1': { 'rice': -0.04, 'dal-pulses': -0.035, 'atta-maida-suji': -0.03, 'cooking-oil': -0.02, default: -0.02 },
  // 2. Khari Baoli (Chandni Chowk) - Asia's largest spice and dry fruits market
  'mandi-2': { 'masala-spices': -0.05, 'dry-fruits-nuts': -0.05, default: -0.01 },
  // 3. Azadpur APMC (GT Karnal Road) - National mega APMC terminal
  'mandi-3': { 'atta-maida-suji': -0.02, 'rice': -0.02, 'sugar-salt-jaggery': -0.02, default: 0 },
  // 4. Okhla APMC (South Delhi) - South Delhi redistribution hub
  'mandi-4': { default: 0.01 },
  // 5. Ghazipur APMC (East Delhi) - Trans-Yamuna & UP border wholesale
  'mandi-5': { 'sugar-salt-jaggery': -0.03, 'cooking-oil': -0.02, default: 0 },
  // 6. Keshopur APMC (West Delhi) - West Delhi terminal
  'mandi-6': { default: 0.005 },
  // 7. Shahdara Anaj Mandi (North East Delhi) - Daily staples & grain market
  'mandi-7': { 'atta-maida-suji': -0.02, 'sugar-salt-jaggery': -0.02, default: 0 },
  // 8. Najafgarh Anaj Mandi (South West Delhi) - Direct farmer procurement wheat & mustard
  'mandi-8': { 'atta-maida-suji': -0.035, 'cooking-oil': -0.03, default: -0.01 },
  // 9. Narela Anaj Mandi (North Delhi) - Delhi's largest wheat, paddy and grain terminal
  'mandi-9': { 'atta-maida-suji': -0.04, 'rice': -0.03, default: -0.02 },
  // 10. Ghaziabad Mandi (Ghaziabad, NCR) - Western UP mustard oil & sugar gateway
  'mandi-10': { 'cooking-oil': -0.04, 'refined-oil': -0.03, 'sugar-salt-jaggery': -0.03, default: -0.015 },
  // 11. Noida Sector 88 Krishi Mandi (Noida, NCR) - GB Nagar wholesale hub
  'mandi-11': { default: 0.005 },
  // 12. Dadri Anaj & Kirana Mandi (Greater Noida, NCR) - Regional gur/jaggery & pulses
  'mandi-12': { 'sugar-salt-jaggery': -0.05, 'dal-pulses': -0.03, default: -0.015 },
  // 13. Gurugram Khandsa Anaj Mandi (Gurugram, NCR) - Haryana APMC, premium wheat & desi ghee
  'mandi-13': { 'ghee-butter': -0.04, 'atta-maida-suji': -0.025, default: 0.01 },
  // 14. Faridabad NIT Old Anaj Mandi (Faridabad, NCR) - Industrial belt wholesale
  'mandi-14': { 'atta-maida-suji': -0.02, 'cooking-oil': -0.02, default: 0 },
  // 15. Ballabhgarh Anaj Mandi (Faridabad/Ballabhgarh, NCR) - Farmer-trader link
  'mandi-15': { 'atta-maida-suji': -0.03, 'cooking-oil': -0.025, default: -0.01 },
  // 16. Sonipat New Grain Market (Sonipat, NCR) - Haryana gateway, 1121 Basmati & wheat auctions
  'mandi-16': { 'rice': -0.05, 'atta-maida-suji': -0.035, default: -0.02 },
};

// 100% AUTHENTIC WHOLESALE MANDI RATION COMMODITIES (WHEAT, ATTA, DAL, EDIBLE OIL, SUGAR, GUR, RICE, SALT)
// STANDARD MANDI WHOLESALE UNITS: 1kg, 5kg, 10kg Bag, 50kg Bori, 1 Litre, 15 Litre Tin
// STRICTLY NO 500g, NO 200ml, NO 25g SACHETS, NO BISCUITS
const PURE_MANDI_RATION_IDS = [
  // 1. ATTA & GRAINS (आटा, गेहूं 50kg बोरी, चक्की आटा 10kg, मैदा 1kg, सूजी 1kg, बेसन 1kg)
  'prod-88', // MP Sharbati Desi Gehun (50kg Wholesale Bori)
  'prod-28', // Aashirvaad Shudh Chakki Atta (10kg Wholesale Bag)
  'prod-27', // Aashirvaad Shudh Chakki Atta (5kg Bag)
  'prod-26', // Aashirvaad Shudh Chakki Atta (1kg Bag)
  'prod-29', // Premium Superfine Maida (1kg Pouch)
  'prod-30', // Crispy Roasted Sooji / Rawa (1kg Pouch)
  'prod-31', // Tata Sampann Pure Besan (1kg Pack)

  // 2. DAL & PULSES (अरहर दाल 1kg, मूंग दाल 1kg, चना दाल 1kg, उड़द दाल 1kg, मसूर दाल 1kg, राजमा 1kg, छोले 1kg, काला चना 1kg)
  'prod-33', // Unpolished Desi Toor / Arhar Dal (1kg Bag)
  'prod-34', // Moong Dal Dhuli (Yellow Split - 1kg Bag)
  'prod-35', // Desi Chana Dal (1kg Bag)
  'prod-92', // Unpolished Urad Dal Dhuli (1kg Bag)
  'prod-93', // Unpolished Urad Dal Chilka (1kg Bag)
  'prod-94', // Lal Masoor Dal Malka (1kg Bag)
  'prod-95', // Super Bold Kabuli Chana / Safed Chole (1kg Bag)
  'prod-96', // Desi Kala Chana (1kg Bag)
  'prod-36', // Kashmiri Chitra Rajma (1kg Bag)

  // 3. EDIBLE OILS & DESI GHEE (सरसों तेल 15L पीपा, सरसों तेल 1L, रिफाइंड तेल 1L, सोयाबीन तेल 1L, अमूल देसी घी 1L)
  'prod-91', // Kachi Ghani Mustard Oil Wholesale Tin (15 Litre Pipa)
  'prod-41', // Fortune Kachi Ghani Mustard Oil (1 Litre Pouch)
  'prod-42', // Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)
  'prod-43', // Fortune Soya Health Refined Soybean Oil (1 Litre Pouch)
  'prod-45', // Amul Pure Danedaar Desi Ghee (1 Litre Tin/Jar)

  // 4. CHINI, GUR & NAMAK (चीनी 50kg बोरी, चीनी 1kg, कोल्हापुर देसी गुड़ 1kg, टाटा नमक 1kg, सेंधा नमक 1kg)
  'prod-89',  // Pure Sparkling White Crystal Sugar (50kg Wholesale Mandi Bori)
  'prod-53',  // Premium White Crystal Sugar (1kg Bag)
  'prod-90',  // Kolhapur Natural Desi Gur / Jaggery Block (1kg Pack)
  'prod-52',  // Tata Salt Vacuum Evaporated Iodized Salt (1kg Pack)
  'prod-105', // Himalayan Rock Salt / Sendha Namak (1kg Pack)

  // 5. RICE (1121 बासमती 10kg, इंडिया गेट क्लासिक 5kg, इंडिया गेट रोज़ाना 1kg, सोना मसूरी 1kg)
  'prod-97', // 1121 XXL Steam Basmati Rice (10kg Bag)
  'prod-38', // India Gate Classic Royal Basmati Rice (5kg Bag)
  'prod-37', // India Gate Feast Rozzana Basmati Rice (1kg Bag)
  'prod-39', // Premium Sona Masoori Raw Rice (1kg Bag)
];

function generateMandiRates(): MockMandiRate[] {
  const stapleProducts = MOCK_PRODUCTS.filter((p) => PURE_MANDI_RATION_IDS.includes(p.id));
  const rates: MockMandiRate[] = [];
  let rateIndex = 1;

  for (const mandi of MOCK_MANDIS) {
    const mandiMods = MANDI_SPECIALTY_MODIFIERS[mandi.id] || { default: 0 };

    for (const prod of stapleProducts) {
      const catSlug = prod.category?.slug || '';
      const modifier = mandiMods[catSlug] !== undefined ? mandiMods[catSlug] : mandiMods.default;

      const seed = (prod.id.charCodeAt(5) || 1) * 17 + (mandi.id.charCodeAt(6) || 1) * 31;
      const dayVariation = ((seed % 11) - 5) / 100;

      const base = Number(prod.baseRate) || Number(prod.retailPrice) || 20;
      const adjustedBase = base * (1 + modifier);
      const currentRate = Math.round(adjustedBase * (1 + dayVariation) * 100) / 100;
      const previousRate = Math.round(adjustedBase * 100) / 100;
      const absoluteChange = Math.round((currentRate - previousRate) * 100) / 100;
      const percentageChange = previousRate > 0 ? Math.round((absoluteChange / previousRate) * 10000) / 100 : 0;

      let direction: 'RISING' | 'FALLING' | 'STABLE' = 'STABLE';
      if (percentageChange > 0.3) direction = 'RISING';
      else if (percentageChange < -0.3) direction = 'FALLING';

      const minRate = Math.round(currentRate * 0.96 * 100) / 100;
      const maxRate = Math.round(currentRate * 1.04 * 100) / 100;

      const unit = prod.unit || 'pack';

      rates.push({
        id: `rate-${rateIndex++}`,
        productId: prod.id,
        product: prod,
        mandiId: mandi.id,
        mandi: {
          ...mandi,
          _count: { rates: stapleProducts.length },
        },
        date: '2026-09-10T00:00:00.000Z',
        currentRate,
        previousRate,
        minimumRate: minRate,
        maximumRate: maxRate,
        unit,
        absoluteChange,
        percentageChange,
        direction,
        active: true,
        updatedAt: '2026-09-10T06:30:00.000Z',
      });
    }
  }

  return rates;
}

export const MOCK_MANDI_RATES: MockMandiRate[] = generateMandiRates();

export const MOCK_RATE_SUMMARY = [
  { direction: 'RISING', _count: { direction: MOCK_MANDI_RATES.filter((r) => r.direction === 'RISING').length } },
  { direction: 'FALLING', _count: { direction: MOCK_MANDI_RATES.filter((r) => r.direction === 'FALLING').length } },
  { direction: 'STABLE', _count: { direction: MOCK_MANDI_RATES.filter((r) => r.direction === 'STABLE').length } },
];

export interface MockDairyProduct {
  id: string;
  brand: string;
  name: string;
  variant?: string | null;
  unit: string;
  defaultRate: number;
  active: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export const MOCK_DAIRY_PRODUCTS: MockDairyProduct[] = [
  // ── Mother Dairy ──────────────────────────────────────────────
  { id: 'dp-1', brand: 'Mother Dairy', name: 'Full Cream Milk', variant: '500ml', unit: 'Packet', defaultRate: 32, active: true, displayOrder: 1 },
  { id: 'dp-2', brand: 'Mother Dairy', name: 'Full Cream Milk', variant: '1L',    unit: 'Packet', defaultRate: 64, active: true, displayOrder: 2 },
  { id: 'dp-3', brand: 'Mother Dairy', name: 'Cow Milk',        variant: '500ml', unit: 'Packet', defaultRate: 29, active: true, displayOrder: 3 },
  { id: 'dp-4', brand: 'Mother Dairy', name: 'Cow Milk',        variant: '1L',    unit: 'Packet', defaultRate: 58, active: true, displayOrder: 4 },
  { id: 'dp-5', brand: 'Mother Dairy', name: 'Dahi',            variant: '400g',  unit: 'Piece',  defaultRate: 38, active: true, displayOrder: 5 },
  { id: 'dp-6', brand: 'Mother Dairy', name: 'Dahi',            variant: '200g',  unit: 'Piece',  defaultRate: 22, active: true, displayOrder: 6 },
  { id: 'dp-7', brand: 'Mother Dairy', name: 'Dahi',            variant: '1kg',   unit: 'Piece',  defaultRate: 85, active: true, displayOrder: 7 },
  { id: 'dp-8', brand: 'Mother Dairy', name: 'Chhach',          variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 8 },
  { id: 'dp-9', brand: 'Mother Dairy', name: 'Chhach',          variant: '500ml', unit: 'Packet', defaultRate: 24, active: true, displayOrder: 9 },

  // ── Madhusudan ────────────────────────────────────────────────
  { id: 'dp-10', brand: 'Madhusudan', name: 'Chhach Plain',   variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 10 },
  { id: 'dp-11', brand: 'Madhusudan', name: 'Chhach Masala',  variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 11 },
  { id: 'dp-12', brand: 'Madhusudan', name: 'Milk',           variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 12 },
  { id: 'dp-13', brand: 'Madhusudan', name: 'Milk',           variant: '500ml', unit: 'Packet', defaultRate: 25, active: true, displayOrder: 13 },
  { id: 'dp-14', brand: 'Madhusudan', name: 'Dahi',           variant: '200g',  unit: 'Piece',  defaultRate: 18, active: true, displayOrder: 14 },

  // ── Arlys / Arvind Dairy ──────────────────────────────────────
  { id: 'dp-15', brand: 'Arlys', name: 'Milk',        variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 15 },
  { id: 'dp-16', brand: 'Arlys', name: 'Family Milk', variant: '500ml', unit: 'Packet', defaultRate: 20, active: true, displayOrder: 16 },
  { id: 'dp-17', brand: 'Arlys', name: 'Pro Milk',    variant: '500ml', unit: 'Packet', defaultRate: 26, active: true, displayOrder: 17 },
  { id: 'dp-18', brand: 'Arlys', name: 'Milk',        variant: '1L',    unit: 'Packet', defaultRate: 40, active: true, displayOrder: 18 },
  { id: 'dp-19', brand: 'Arlys', name: 'Dahi',        variant: '200g',  unit: 'Piece',  defaultRate: 20, active: true, displayOrder: 19 },
  { id: 'dp-20', brand: 'Arlys', name: 'Dahi',        variant: '400g',  unit: 'Piece',  defaultRate: 38, active: true, displayOrder: 20 },
  { id: 'dp-21', brand: 'Arlys', name: 'Chhach',      variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 21 },

  // ── Amul ──────────────────────────────────────────────────────
  { id: 'dp-22', brand: 'Amul', name: 'Taaza Milk', variant: '500ml', unit: 'Packet', defaultRate: 30, active: true, displayOrder: 22 },
  { id: 'dp-23', brand: 'Amul', name: 'Taaza Milk', variant: '1L',    unit: 'Packet', defaultRate: 60, active: true, displayOrder: 23 },
  { id: 'dp-24', brand: 'Amul', name: 'Gold Milk',  variant: '500ml', unit: 'Packet', defaultRate: 34, active: true, displayOrder: 24 },
  { id: 'dp-25', brand: 'Amul', name: 'Gold Milk',  variant: '1L',    unit: 'Packet', defaultRate: 68, active: true, displayOrder: 25 },
  { id: 'dp-26', brand: 'Amul', name: 'Dahi',       variant: '200g',  unit: 'Piece',  defaultRate: 24, active: true, displayOrder: 26 },
  { id: 'dp-27', brand: 'Amul', name: 'Dahi',       variant: '400g',  unit: 'Piece',  defaultRate: 44, active: true, displayOrder: 27 },
  { id: 'dp-28', brand: 'Amul', name: 'Dahi',       variant: '1kg',   unit: 'Piece',  defaultRate: 98, active: true, displayOrder: 28 },
  { id: 'dp-29', brand: 'Amul', name: 'Chhach',     variant: '200ml', unit: 'Packet', defaultRate: 10, active: true, displayOrder: 29 },
  { id: 'dp-30', brand: 'Amul', name: 'Chhach',     variant: '1L',    unit: 'Packet', defaultRate: 44, active: true, displayOrder: 30 },
];
