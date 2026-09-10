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
    "address": "Old Delhi, Delhi 110006",
    "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
    "active": true,
    "displayOrder": 1,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-2",
    "name": "Khari Baoli Spice Mandi",
    "slug": "khari-baoli-spice-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Chandni Chowk, Delhi 110006",
    "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
    "active": true,
    "displayOrder": 2,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-3",
    "name": "Azadpur APMC Mandi",
    "slug": "azadpur-apmc-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "GT Karnal Road, Delhi 110033",
    "description": "National capital's largest APMC regulated terminal trading hub.",
    "active": true,
    "displayOrder": 3,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-4",
    "name": "Okhla Mandi",
    "slug": "okhla-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Okhla Phase II, New Delhi 110020",
    "description": "South Delhi wholesale commodity auction and redistribution mandi.",
    "active": true,
    "displayOrder": 4,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-5",
    "name": "Ghazipur APMC Mandi",
    "slug": "ghazipur-apmc-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Ghazipur, East Delhi 110096",
    "description": "East Delhi & UP border primary wholesale commodity market.",
    "active": true,
    "displayOrder": 5,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-6",
    "name": "Keshopur APMC Mandi",
    "slug": "keshopur-apmc-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
    "description": "West Delhi primary distribution hub.",
    "active": true,
    "displayOrder": 6,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-7",
    "name": "Shahdara Grain Mandi",
    "slug": "shahdara-grain-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Shahdara, North East Delhi 110032",
    "description": "Trans-Yamuna wholesale grains and staples market.",
    "active": true,
    "displayOrder": 7,
    "_count": {
      "rates": 16
    },
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "mandi-8",
    "name": "Najafgarh Grain Mandi",
    "slug": "najafgarh-grain-mandi",
    "city": "Delhi",
    "state": "Delhi",
    "address": "Najafgarh, South West Delhi 110043",
    "description": "South-West Delhi agro-wholesale exchange.",
    "active": true,
    "displayOrder": 8,
    "_count": {
      "rates": 16
    },
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
    "name": "Premium Superfine Maida (500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 28,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-29",
        "url": "/products/km-ration-maida-500g.svg",
        "altText": "Premium Superfine Maida (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 25,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-30",
    "sku": "KM-RATION-SUJI-500G",
    "name": "Crispy Roasted Sooji / Rawa (500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 32,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-30",
        "url": "/products/km-ration-suji-500g.svg",
        "altText": "Crispy Roasted Sooji / Rawa (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 28,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-31",
    "sku": "KM-RATION-BESAN-500G",
    "name": "Tata Sampann Fine Pure Gram Flour Besan (500g)",
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
    "unit": "500g Pouch",
    "retailPrice": 58,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-31",
        "url": "/products/km-ration-besan-500g.svg",
        "altText": "Tata Sampann Fine Pure Gram Flour Besan (500g)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 52,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-32",
    "sku": "KM-DAL-TOOR-500G",
    "name": "Unpolished Desi Toor / Arhar Dal (500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 84,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-32",
        "url": "/products/km-dal-toor-500g.svg",
        "altText": "Unpolished Desi Toor / Arhar Dal (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 76,
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
    "name": "Moong Dal Dhuli (Yellow Split - 500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 62,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-34",
        "url": "/products/km-dal-moong-dhuli-500g.svg",
        "altText": "Moong Dal Dhuli (Yellow Split - 500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 56,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-35",
    "sku": "KM-DAL-CHANA-500G",
    "name": "Desi Chana Dal (500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 49,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-35",
        "url": "/products/km-dal-chana-500g.svg",
        "altText": "Desi Chana Dal (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 44,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  {
    "id": "prod-36",
    "sku": "KM-DAL-RAJMA-CHITRA-500G",
    "name": "Kashmiri Chitra Rajma (Kidney Beans - 500g Pouch)",
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
    "searchKeywords": "rajma 500g, chitra rajma, kidney beans, rajma chawal",
    "unit": "500g Pouch",
    "retailPrice": 78,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-36",
        "url": "/products/km-dal-rajma-chitra-500g.svg",
        "altText": "Kashmiri Chitra Rajma (Kidney Beans - 500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 70,
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
    "name": "Fortune Kachi Ghani Pure Mustard Oil (500ml Bottle)",
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
    "unit": "500ml Bottle",
    "retailPrice": 88,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-40",
        "url": "/products/km-oil-fortune-mustard-500ml.svg",
        "altText": "Fortune Kachi Ghani Pure Mustard Oil (500ml Bottle)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 80,
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
    "name": "Amul Pure Danedaar Desi Ghee (₹130 Small Pack - 200ml)",
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
    "unit": "200ml Pouch",
    "retailPrice": 130,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-44",
        "url": "/products/km-ghee-amul-pure-200ml.svg",
        "altText": "Amul Pure Danedaar Desi Ghee (₹130 Small Pack - 200ml)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 120,
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
    "name": "Tata Salt Vacuum Evaporated (500g Pouch)",
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
    "unit": "500g Pouch",
    "retailPrice": 14,
    "minimumQuantity": 1,
    "maximumQuantity": 50,
    "active": true,
    "images": [
      {
        "id": "img-51",
        "url": "/products/km-salt-tata-lite-500g.svg",
        "altText": "Tata Salt Vacuum Evaporated (500g Pouch)",
        "active": true,
        "sortOrder": 1
      }
    ],
    "baseRate": 12,
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
    "name": "Thick Poha / Flattened Rice (500g Pouch)",
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
  }
];

export const MOCK_MANDI_RATES: MockMandiRate[] = [
  {
    "id": "rate-1",
    "productId": "prod-1",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 5,
    "previousRate": 5.2,
    "minimumRate": 4.75,
    "maximumRate": 5.25,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-2",
    "productId": "prod-2",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.2,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-3",
    "productId": "prod-3",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 78,
    "previousRate": 78,
    "minimumRate": 74.1,
    "maximumRate": 81.9,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-4",
    "productId": "prod-4",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.8,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.2,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-5",
    "productId": "prod-5",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 35,
    "previousRate": 33.6,
    "minimumRate": 33.25,
    "maximumRate": 36.75,
    "unit": "pack",
    "absoluteChange": 1.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-6",
    "productId": "prod-6",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 5,
    "previousRate": 5.2,
    "minimumRate": 4.75,
    "maximumRate": 5.25,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-7",
    "productId": "prod-7",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.2,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-8",
    "productId": "prod-8",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-9",
    "productId": "prod-9",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.8,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.2,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-10",
    "productId": "prod-10",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.6,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-11",
    "productId": "prod-11",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.4,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-12",
    "productId": "prod-12",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 26.5,
    "previousRate": 27.03,
    "minimumRate": 25.17,
    "maximumRate": 27.83,
    "unit": "pack",
    "absoluteChange": -0.53,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-13",
    "productId": "prod-13",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 32,
    "previousRate": 32,
    "minimumRate": 30.4,
    "maximumRate": 33.6,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-14",
    "productId": "prod-14",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 26.5,
    "previousRate": 25.97,
    "minimumRate": 25.17,
    "maximumRate": 27.83,
    "unit": "pack",
    "absoluteChange": 0.53,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-15",
    "productId": "prod-15",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.6,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-16",
    "productId": "prod-16",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 58,
    "previousRate": 60.32,
    "minimumRate": 55.1,
    "maximumRate": 60.9,
    "unit": "pack",
    "absoluteChange": -2.32,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-17",
    "productId": "prod-17",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 85,
    "previousRate": 86.7,
    "minimumRate": 80.75,
    "maximumRate": 89.25,
    "unit": "pack",
    "absoluteChange": -1.7,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-18",
    "productId": "prod-18",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 15,
    "previousRate": 15,
    "minimumRate": 14.25,
    "maximumRate": 15.75,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-19",
    "productId": "prod-19",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 20,
    "previousRate": 19.6,
    "minimumRate": 19,
    "maximumRate": 21,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-20",
    "productId": "prod-20",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 20,
    "previousRate": 19.2,
    "minimumRate": 19,
    "maximumRate": 21,
    "unit": "pack",
    "absoluteChange": 0.8,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-21",
    "productId": "prod-21",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 20,
    "previousRate": 20.8,
    "minimumRate": 19,
    "maximumRate": 21,
    "unit": "pack",
    "absoluteChange": -0.8,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-22",
    "productId": "prod-22",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 20,
    "previousRate": 20.4,
    "minimumRate": 19,
    "maximumRate": 21,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-23",
    "productId": "prod-23",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-24",
    "productId": "prod-24",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.8,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.2,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-25",
    "productId": "prod-25",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 20,
    "previousRate": 19.2,
    "minimumRate": 19,
    "maximumRate": 21,
    "unit": "litre",
    "absoluteChange": 0.8,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-26",
    "productId": "prod-26",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 44,
    "previousRate": 45.76,
    "minimumRate": 41.8,
    "maximumRate": 46.2,
    "unit": "kg",
    "absoluteChange": -1.76,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-27",
    "productId": "prod-27",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 215,
    "previousRate": 219.3,
    "minimumRate": 204.25,
    "maximumRate": 225.75,
    "unit": "kg",
    "absoluteChange": -4.3,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-28",
    "productId": "prod-28",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 420,
    "previousRate": 420,
    "minimumRate": 399,
    "maximumRate": 441,
    "unit": "kg",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-29",
    "productId": "prod-29",
    "product": {
      "id": "prod-29",
      "sku": "KM-RATION-MAIDA-500G",
      "name": "Premium Superfine Maida (500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 28,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-29",
          "url": "/products/km-ration-maida-500g.svg",
          "altText": "Premium Superfine Maida (500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 25,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 25,
    "previousRate": 24.5,
    "minimumRate": 23.75,
    "maximumRate": 26.25,
    "unit": "pack",
    "absoluteChange": 0.5,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-30",
    "productId": "prod-30",
    "product": {
      "id": "prod-30",
      "sku": "KM-RATION-SUJI-500G",
      "name": "Crispy Roasted Sooji / Rawa (500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 32,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-30",
          "url": "/products/km-ration-suji-500g.svg",
          "altText": "Crispy Roasted Sooji / Rawa (500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 28,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 28,
    "previousRate": 26.88,
    "minimumRate": 26.6,
    "maximumRate": 29.4,
    "unit": "pack",
    "absoluteChange": 1.12,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-31",
    "productId": "prod-31",
    "product": {
      "id": "prod-31",
      "sku": "KM-RATION-BESAN-500G",
      "name": "Tata Sampann Fine Pure Gram Flour Besan (500g)",
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
      "unit": "500g Pouch",
      "retailPrice": 58,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-31",
          "url": "/products/km-ration-besan-500g.svg",
          "altText": "Tata Sampann Fine Pure Gram Flour Besan (500g)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 52,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 52,
    "previousRate": 54.08,
    "minimumRate": 49.4,
    "maximumRate": 54.6,
    "unit": "pack",
    "absoluteChange": -2.08,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-32",
    "productId": "prod-32",
    "product": {
      "id": "prod-32",
      "sku": "KM-DAL-TOOR-500G",
      "name": "Unpolished Desi Toor / Arhar Dal (500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 84,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-32",
          "url": "/products/km-dal-toor-500g.svg",
          "altText": "Unpolished Desi Toor / Arhar Dal (500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 76,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 76,
    "previousRate": 77.52,
    "minimumRate": 72.2,
    "maximumRate": 79.8,
    "unit": "pack",
    "absoluteChange": -1.52,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-33",
    "productId": "prod-33",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 152,
    "previousRate": 152,
    "minimumRate": 144.4,
    "maximumRate": 159.6,
    "unit": "kg",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-34",
    "productId": "prod-34",
    "product": {
      "id": "prod-34",
      "sku": "KM-DAL-MOONG-DHULI-500G",
      "name": "Moong Dal Dhuli (Yellow Split - 500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 62,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-34",
          "url": "/products/km-dal-moong-dhuli-500g.svg",
          "altText": "Moong Dal Dhuli (Yellow Split - 500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 56,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 56,
    "previousRate": 54.88,
    "minimumRate": 53.2,
    "maximumRate": 58.8,
    "unit": "pack",
    "absoluteChange": 1.12,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-35",
    "productId": "prod-35",
    "product": {
      "id": "prod-35",
      "sku": "KM-DAL-CHANA-500G",
      "name": "Desi Chana Dal (500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 49,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-35",
          "url": "/products/km-dal-chana-500g.svg",
          "altText": "Desi Chana Dal (500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 44,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 44,
    "previousRate": 42.24,
    "minimumRate": 41.8,
    "maximumRate": 46.2,
    "unit": "pack",
    "absoluteChange": 1.76,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-36",
    "productId": "prod-36",
    "product": {
      "id": "prod-36",
      "sku": "KM-DAL-RAJMA-CHITRA-500G",
      "name": "Kashmiri Chitra Rajma (Kidney Beans - 500g Pouch)",
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
      "searchKeywords": "rajma 500g, chitra rajma, kidney beans, rajma chawal",
      "unit": "500g Pouch",
      "retailPrice": 78,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-36",
          "url": "/products/km-dal-rajma-chitra-500g.svg",
          "altText": "Kashmiri Chitra Rajma (Kidney Beans - 500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 70,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 70,
    "previousRate": 72.8,
    "minimumRate": 66.5,
    "maximumRate": 73.5,
    "unit": "pack",
    "absoluteChange": -2.8,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-37",
    "productId": "prod-37",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 88,
    "previousRate": 89.76,
    "minimumRate": 83.6,
    "maximumRate": 92.4,
    "unit": "kg",
    "absoluteChange": -1.76,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-38",
    "productId": "prod-38",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 540,
    "previousRate": 540,
    "minimumRate": 513,
    "maximumRate": 567,
    "unit": "kg",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-39",
    "productId": "prod-39",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 52,
    "previousRate": 50.96,
    "minimumRate": 49.4,
    "maximumRate": 54.6,
    "unit": "kg",
    "absoluteChange": 1.04,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-40",
    "productId": "prod-40",
    "product": {
      "id": "prod-40",
      "sku": "KM-OIL-FORTUNE-MUSTARD-500ML",
      "name": "Fortune Kachi Ghani Pure Mustard Oil (500ml Bottle)",
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
      "unit": "500ml Bottle",
      "retailPrice": 88,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-40",
          "url": "/products/km-oil-fortune-mustard-500ml.svg",
          "altText": "Fortune Kachi Ghani Pure Mustard Oil (500ml Bottle)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 80,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 80,
    "previousRate": 76.8,
    "minimumRate": 76,
    "maximumRate": 84,
    "unit": "pack",
    "absoluteChange": 3.2,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-41",
    "productId": "prod-41",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 145,
    "previousRate": 150.8,
    "minimumRate": 137.75,
    "maximumRate": 152.25,
    "unit": "litre",
    "absoluteChange": -5.8,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-42",
    "productId": "prod-42",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 130,
    "previousRate": 132.6,
    "minimumRate": 123.5,
    "maximumRate": 136.5,
    "unit": "litre",
    "absoluteChange": -2.6,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-43",
    "productId": "prod-43",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 118,
    "previousRate": 118,
    "minimumRate": 112.1,
    "maximumRate": 123.9,
    "unit": "litre",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-44",
    "productId": "prod-44",
    "product": {
      "id": "prod-44",
      "sku": "KM-GHEE-AMUL-PURE-200ML",
      "name": "Amul Pure Danedaar Desi Ghee (₹130 Small Pack - 200ml)",
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
      "unit": "200ml Pouch",
      "retailPrice": 130,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-44",
          "url": "/products/km-ghee-amul-pure-200ml.svg",
          "altText": "Amul Pure Danedaar Desi Ghee (₹130 Small Pack - 200ml)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 120,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 120,
    "previousRate": 117.6,
    "minimumRate": 114,
    "maximumRate": 126,
    "unit": "pack",
    "absoluteChange": 2.4,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-45",
    "productId": "prod-45",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 550,
    "previousRate": 528,
    "minimumRate": 522.5,
    "maximumRate": 577.5,
    "unit": "litre",
    "absoluteChange": 22,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-46",
    "productId": "prod-46",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 8.5,
    "previousRate": 8.84,
    "minimumRate": 8.07,
    "maximumRate": 8.93,
    "unit": "pack",
    "absoluteChange": -0.34,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-47",
    "productId": "prod-47",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 8.5,
    "previousRate": 8.67,
    "minimumRate": 8.07,
    "maximumRate": 8.93,
    "unit": "pack",
    "absoluteChange": -0.17,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-48",
    "productId": "prod-48",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 8.5,
    "previousRate": 8.5,
    "minimumRate": 8.07,
    "maximumRate": 8.93,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-49",
    "productId": "prod-49",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 8.5,
    "previousRate": 8.33,
    "minimumRate": 8.07,
    "maximumRate": 8.93,
    "unit": "pack",
    "absoluteChange": 0.17,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-50",
    "productId": "prod-50",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 70,
    "previousRate": 67.2,
    "minimumRate": 66.5,
    "maximumRate": 73.5,
    "unit": "pack",
    "absoluteChange": 2.8,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-51",
    "productId": "prod-51",
    "product": {
      "id": "prod-51",
      "sku": "KM-SALT-TATA-LITE-500G",
      "name": "Tata Salt Vacuum Evaporated (500g Pouch)",
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
      "unit": "500g Pouch",
      "retailPrice": 14,
      "minimumQuantity": 1,
      "maximumQuantity": 50,
      "active": true,
      "images": [
        {
          "id": "img-51",
          "url": "/products/km-salt-tata-lite-500g.svg",
          "altText": "Tata Salt Vacuum Evaporated (500g Pouch)",
          "active": true,
          "sortOrder": 1
        }
      ],
      "baseRate": 12,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 12,
    "previousRate": 12.48,
    "minimumRate": 11.4,
    "maximumRate": 12.6,
    "unit": "pack",
    "absoluteChange": -0.48,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-52",
    "productId": "prod-52",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 24,
    "previousRate": 24.48,
    "minimumRate": 22.8,
    "maximumRate": 25.2,
    "unit": "kg",
    "absoluteChange": -0.48,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-53",
    "productId": "prod-53",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 42,
    "previousRate": 42,
    "minimumRate": 39.9,
    "maximumRate": 44.1,
    "unit": "kg",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-54",
    "productId": "prod-54",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 30,
    "previousRate": 29.4,
    "minimumRate": 28.5,
    "maximumRate": 31.5,
    "unit": "pack",
    "absoluteChange": 0.6,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-55",
    "productId": "prod-55",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 98,
    "previousRate": 94.08,
    "minimumRate": 93.1,
    "maximumRate": 102.9,
    "unit": "pack",
    "absoluteChange": 3.92,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-56",
    "productId": "prod-56",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.4,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-57",
    "productId": "prod-57",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 7,
    "previousRate": 7.14,
    "minimumRate": 6.65,
    "maximumRate": 7.35,
    "unit": "pack",
    "absoluteChange": -0.14,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-58",
    "productId": "prod-58",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 14,
    "previousRate": 14,
    "minimumRate": 13.3,
    "maximumRate": 14.7,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-59",
    "productId": "prod-59",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 56,
    "previousRate": 54.88,
    "minimumRate": 53.2,
    "maximumRate": 58.8,
    "unit": "pack",
    "absoluteChange": 1.12,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-60",
    "productId": "prod-60",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.6,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-61",
    "productId": "prod-61",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 55,
    "previousRate": 57.2,
    "minimumRate": 52.25,
    "maximumRate": 57.75,
    "unit": "pack",
    "absoluteChange": -2.2,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-62",
    "productId": "prod-62",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.2,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-63",
    "productId": "prod-63",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-64",
    "productId": "prod-64",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.8,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.2,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-65",
    "productId": "prod-65",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.6,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-66",
    "productId": "prod-66",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.4,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-67",
    "productId": "prod-67",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.2,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.2,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-68",
    "productId": "prod-68",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-69",
    "productId": "prod-69",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 6,
    "previousRate": 5.88,
    "minimumRate": 5.7,
    "maximumRate": 6.3,
    "unit": "pack",
    "absoluteChange": 0.12,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-70",
    "productId": "prod-70",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 4,
    "previousRate": 3.84,
    "minimumRate": 3.8,
    "maximumRate": 4.2,
    "unit": "pack",
    "absoluteChange": 0.16,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-71",
    "productId": "prod-71",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.4,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-72",
    "productId": "prod-72",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 58,
    "previousRate": 59.16,
    "minimumRate": 55.1,
    "maximumRate": 60.9,
    "unit": "pack",
    "absoluteChange": -1.16,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-73",
    "productId": "prod-73",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-74",
    "productId": "prod-74",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 140,
    "previousRate": 137.2,
    "minimumRate": 133,
    "maximumRate": 147,
    "unit": "kg",
    "absoluteChange": 2.8,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-75",
    "productId": "prod-75",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 9.6,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": 0.4,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-76",
    "productId": "prod-76",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 10,
    "previousRate": 10.4,
    "minimumRate": 9.5,
    "maximumRate": 10.5,
    "unit": "pack",
    "absoluteChange": -0.4,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-77",
    "productId": "prod-77",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 42,
    "previousRate": 42.84,
    "minimumRate": 39.9,
    "maximumRate": 44.1,
    "unit": "pack",
    "absoluteChange": -0.84,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-78",
    "productId": "prod-78",
    "product": {
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 99,
    "previousRate": 99,
    "minimumRate": 94.05,
    "maximumRate": 103.95,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-79",
    "productId": "prod-79",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 15,
    "previousRate": 14.7,
    "minimumRate": 14.25,
    "maximumRate": 15.75,
    "unit": "pack",
    "absoluteChange": 0.3,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-80",
    "productId": "prod-80",
    "product": {
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
    "mandiId": "mandi-8",
    "mandi": {
      "id": "mandi-8",
      "name": "Najafgarh Grain Mandi",
      "slug": "najafgarh-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Najafgarh, South West Delhi 110043",
      "description": "South-West Delhi agro-wholesale exchange.",
      "active": true,
      "displayOrder": 8,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 15,
    "previousRate": 14.4,
    "minimumRate": 14.25,
    "maximumRate": 15.75,
    "unit": "pack",
    "absoluteChange": 0.6,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-81",
    "productId": "prod-81",
    "product": {
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
    "mandiId": "mandi-1",
    "mandi": {
      "id": "mandi-1",
      "name": "Naya Bazar Mandi",
      "slug": "naya-bazar-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Old Delhi, Delhi 110006",
      "description": "Asia's premier wholesale grain, pulses, rice, oil and dry fruit market.",
      "active": true,
      "displayOrder": 1,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 45,
    "previousRate": 46.8,
    "minimumRate": 42.75,
    "maximumRate": 47.25,
    "unit": "pack",
    "absoluteChange": -1.8,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-82",
    "productId": "prod-82",
    "product": {
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
    "mandiId": "mandi-2",
    "mandi": {
      "id": "mandi-2",
      "name": "Khari Baoli Spice Mandi",
      "slug": "khari-baoli-spice-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Chandni Chowk, Delhi 110006",
      "description": "Asia's largest wholesale spice and dry fruits trading mandi.",
      "active": true,
      "displayOrder": 2,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 85,
    "previousRate": 86.7,
    "minimumRate": 80.75,
    "maximumRate": 89.25,
    "unit": "pack",
    "absoluteChange": -1.7,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-83",
    "productId": "prod-83",
    "product": {
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
    "mandiId": "mandi-3",
    "mandi": {
      "id": "mandi-3",
      "name": "Azadpur APMC Mandi",
      "slug": "azadpur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "GT Karnal Road, Delhi 110033",
      "description": "National capital's largest APMC regulated terminal trading hub.",
      "active": true,
      "displayOrder": 3,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 12,
    "previousRate": 12,
    "minimumRate": 11.4,
    "maximumRate": 12.6,
    "unit": "pack",
    "absoluteChange": 0,
    "percentageChange": 0,
    "direction": "STABLE",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-84",
    "productId": "prod-84",
    "product": {
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
    "mandiId": "mandi-4",
    "mandi": {
      "id": "mandi-4",
      "name": "Okhla Mandi",
      "slug": "okhla-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Okhla Phase II, New Delhi 110020",
      "description": "South Delhi wholesale commodity auction and redistribution mandi.",
      "active": true,
      "displayOrder": 4,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 85,
    "previousRate": 83.3,
    "minimumRate": 80.75,
    "maximumRate": 89.25,
    "unit": "pack",
    "absoluteChange": 1.7,
    "percentageChange": 2.04,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-85",
    "productId": "prod-85",
    "product": {
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
    "mandiId": "mandi-5",
    "mandi": {
      "id": "mandi-5",
      "name": "Ghazipur APMC Mandi",
      "slug": "ghazipur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Ghazipur, East Delhi 110096",
      "description": "East Delhi & UP border primary wholesale commodity market.",
      "active": true,
      "displayOrder": 5,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 98,
    "previousRate": 94.08,
    "minimumRate": 93.1,
    "maximumRate": 102.9,
    "unit": "pack",
    "absoluteChange": 3.92,
    "percentageChange": 4.17,
    "direction": "RISING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-86",
    "productId": "prod-86",
    "product": {
      "id": "prod-86",
      "sku": "KM-INST-POHA-500G",
      "name": "Thick Poha / Flattened Rice (500g Pouch)",
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
    "mandiId": "mandi-6",
    "mandi": {
      "id": "mandi-6",
      "name": "Keshopur APMC Mandi",
      "slug": "keshopur-apmc-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Outer Ring Road, Tilak Nagar, New Delhi 110018",
      "description": "West Delhi primary distribution hub.",
      "active": true,
      "displayOrder": 6,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 30,
    "previousRate": 31.2,
    "minimumRate": 28.5,
    "maximumRate": 31.5,
    "unit": "pack",
    "absoluteChange": -1.2,
    "percentageChange": -3.85,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  },
  {
    "id": "rate-87",
    "productId": "prod-87",
    "product": {
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
    "mandiId": "mandi-7",
    "mandi": {
      "id": "mandi-7",
      "name": "Shahdara Grain Mandi",
      "slug": "shahdara-grain-mandi",
      "city": "Delhi",
      "state": "Delhi",
      "address": "Shahdara, North East Delhi 110032",
      "description": "Trans-Yamuna wholesale grains and staples market.",
      "active": true,
      "displayOrder": 7,
      "_count": {
        "rates": 16
      },
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    },
    "date": "2026-09-04T00:00:00.000Z",
    "currentRate": 15,
    "previousRate": 15.3,
    "minimumRate": 14.25,
    "maximumRate": 15.75,
    "unit": "pack",
    "absoluteChange": -0.3,
    "percentageChange": -1.96,
    "direction": "FALLING",
    "active": true,
    "updatedAt": "2026-09-04T06:00:00.000Z"
  }
];

export const MOCK_RATE_SUMMARY = [
  { direction: 'RISING', _count: { direction: 34 } },
  { direction: 'FALLING', _count: { direction: 36 } },
  { direction: 'STABLE', _count: { direction: 17 } }
];
