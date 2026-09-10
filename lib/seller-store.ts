import fs from 'fs';
import path from 'path';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from './mock-data';

export interface SellerProductRecord {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  brandId?: string | null;
  brand?: any;
  categoryId: string;
  category?: any;
  subCategoryId?: string | null;
  subCategoryName?: string | null;
  unit: string;
  retailPrice: number;
  minimumQuantity: number;
  maximumQuantity?: number | null;
  active: boolean;
  searchKeywords?: string;
  images: Array<{ id: string; url: string; altText: string; active: boolean; sortOrder: number }>;
  
  // Seller and Approval Fields
  sellerId: string;
  seller?: any;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'NEEDS_CHANGES' | 'PUBLISHED' | 'REJECTED';
  aiDescriptionStatus: 'NOT_GENERATED' | 'GENERATING' | 'GENERATED' | 'FAILED' | 'ADMIN_EDITED';
  shortDescription?: string | null;
  aiDescription?: string | null;
  finalDescription?: string | null;
  highlights: string[];
  productTags: string[];
  mrp?: number | null;
  wholesalePrice?: number | null;
  stockQuantity: number;
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
  approvedAt?: string | null;
  approvedBy?: string | null;
  publishedVersionId?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface ProductAuditLogRecord {
  id: string;
  productId: string;
  actorId: string;
  actorRole: string;
  actorName?: string | null;
  action: string;
  changes?: any;
  notes?: string | null;
  createdAt: string;
}

export interface CustomUserRecord {
  id: string;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  passwordHash: string;
  role: 'CUSTOMER' | 'SHOPKEEPER' | 'ADMIN';
  active: boolean;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  shopkeeperProfile?: {
    id: string;
    userId: string;
    shopName: string;
    shopAddress: string;
    city: string;
    state?: string | null;
    pinCode?: string | null;
    gstNumber?: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

interface StoreData {
  products: SellerProductRecord[];
  auditLogs: ProductAuditLogRecord[];
  users: CustomUserRecord[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'seller-store.json');

function ensureDataFile(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial: StoreData = {
        products: [],
        auditLogs: [],
        users: [
          // Pre-seeded demo shopkeeper for testing
          {
            id: 'seller-demo-1',
            fullName: 'Ramesh Gupta (Gupta Kirana Store)',
            email: 'shopkeeper@kiranamart247.com',
            mobile: '9876543210',
            passwordHash: '$2b$10$V0rols.Px0V10tRQH87S3OKUGcuaIVQYK70evDuLHEGklUMcPi23q', // bcrypt for 'shopkeeper123'
            role: 'SHOPKEEPER',
            active: true,
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-01-01T00:00:00.000Z',
            shopkeeperProfile: {
              id: 'prof-demo-1',
              userId: 'seller-demo-1',
              shopName: 'Gupta Kirana & General Store',
              shopAddress: 'Shop 14, Main Market, Azadpur',
              city: 'Delhi',
              state: 'Delhi',
              pinCode: '110033',
              gstNumber: '07AAAAA0000A1Z5',
              status: 'APPROVED',
              createdAt: '2026-01-01T00:00:00.000Z',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
          },
          // Pre-seeded demo admin for approval portal testing
          {
            id: 'admin-demo-1',
            fullName: 'Super Admin',
            email: 'admin@kiranamart247.com',
            mobile: '9999999999',
            passwordHash: '$2b$10$8tSWqxXd3SlEQ5yRmSbttOrG7Y.BOPz96RxNg9qqfq100diGLBy8K', // bcrypt for 'admin123'
            role: 'ADMIN',
            active: true,
            createdAt: '2026-01-01T00:00:00.000Z',
            updatedAt: '2026-01-01T00:00:00.000Z',
          },
        ],
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading seller store file, fallback to empty:', err);
    return { products: [], auditLogs: [], users: [] };
  }
}

function saveStoreData(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed saving seller store file:', err);
  }
}

export class SellerStore {
  static getStore(): StoreData {
    return ensureDataFile();
  }

  static getAllCombinedProducts(): any[] {
    const store = ensureDataFile();
    const customMap = new Map<string, any>();
    store.products.forEach((p) => customMap.set(p.id, p));

    // Base mock products are all published by default
    const baseList = MOCK_PRODUCTS.map((p) => {
      const customOverride = customMap.get(p.id);
      if (customOverride) return customOverride;
      return {
        ...p,
        status: p.status || 'PUBLISHED',
        aiDescriptionStatus: p.aiDescriptionStatus || 'NOT_GENERATED',
        highlights: p.highlights || [],
        productTags: p.productTags || [],
        stockQuantity: p.stockQuantity ?? 100,
        wholesalePrice: p.wholesalePrice ?? Math.round(Number(p.retailPrice) * 0.92),
        mrp: p.mrp ?? Math.round(Number(p.retailPrice) * 1.15),
      };
    });

    // Append newly created seller products that aren't in base list
    const newProducts = store.products.filter((p) => !MOCK_PRODUCTS.some((m) => m.id === p.id));
    return [...newProducts, ...baseList];
  }

  static getProductById(id: string): any | null {
    const all = this.getAllCombinedProducts();
    return all.find((p) => p.id === id) || null;
  }

  static getProductBySlug(slug: string): any | null {
    const all = this.getAllCombinedProducts();
    return all.find((p) => p.slug === slug) || null;
  }

  static createProduct(data: Partial<SellerProductRecord>): SellerProductRecord {
    const store = ensureDataFile();
    const id = `seller-prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    let brandObj: { name: string } | null = null;
    if (data.brandId) {
      brandObj = MOCK_BRANDS.find((b) => b.id === data.brandId) || null;
    }
    if (!brandObj && data.brand) {
      let bName = '';
      if (typeof data.brand === 'object' && data.brand !== null) {
        bName = typeof (data.brand as any).name === 'object' && (data.brand as any).name !== null
          ? (data.brand as any).name.name
          : (data.brand as any).name || '';
      } else {
        bName = String(data.brand);
      }
      brandObj = bName ? { name: bName } : null;
    }

    const newProd: SellerProductRecord = {
      id,
      sku: data.sku || `KM-SEL-${Date.now().toString().slice(-6)}`,
      name: data.name || 'Untitled Product',
      slug: (data.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${id.slice(-6)}`,
      description: data.description || '',
      brandId: data.brandId || null,
      brand: brandObj,
      categoryId: data.categoryId || 'cat-staples',
      category: data.category || { id: data.categoryId || 'cat-staples', name: 'Staples' },
      subCategoryId: data.subCategoryId || null,
      subCategoryName: data.subCategoryName || null,
      unit: data.unit || '1 Pack',
      retailPrice: Number(data.retailPrice || 0),
      minimumQuantity: Number(data.minimumQuantity || 1),
      maximumQuantity: data.maximumQuantity ? Number(data.maximumQuantity) : null,
      active: true,
      searchKeywords: data.searchKeywords || '',
      images: Array.isArray(data.images) && data.images.length > 0
        ? data.images
        : [{ id: `img-${id}`, url: '/products/placeholder.svg', altText: data.name || '', active: true, sortOrder: 0 }],
      
      sellerId: data.sellerId || 'seller-demo-1',
      seller: data.seller,
      status: data.status || 'DRAFT',
      aiDescriptionStatus: data.aiDescriptionStatus || 'NOT_GENERATED',
      shortDescription: data.shortDescription || null,
      aiDescription: data.aiDescription || null,
      finalDescription: data.finalDescription || data.description || null,
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      productTags: Array.isArray(data.productTags) ? data.productTags : [],
      mrp: data.mrp ? Number(data.mrp) : null,
      wholesalePrice: data.wholesalePrice ? Number(data.wholesalePrice) : null,
      stockQuantity: data.stockQuantity !== undefined ? Number(data.stockQuantity) : 50,
      weight: data.weight || null,
      mandi: data.mandi || null,
      location: data.location || null,
      shopName: data.shopName || null,
      shopAddress: data.shopAddress || null,
      deliveryAvailability: data.deliveryAvailability || null,
      gstPercent: data.gstPercent ? Number(data.gstPercent) : null,
      expiryDate: data.expiryDate || null,
      adminNotes: data.adminNotes || null,
      rejectionReason: data.rejectionReason || null,
      approvedAt: data.approvedAt || null,
      approvedBy: data.approvedBy || null,
      publishedVersionId: data.publishedVersionId || null,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.products.unshift(newProd);
    saveStoreData(store);
    return newProd;
  }

  static updateProduct(id: string, updates: Partial<SellerProductRecord>): SellerProductRecord | null {
    const store = ensureDataFile();
    let idx = store.products.findIndex((p) => p.id === id);

    let current: SellerProductRecord;
    if (idx === -1) {
      // If updating a base product, clone it into store
      const base = MOCK_PRODUCTS.find((p) => p.id === id);
      if (!base) return null;
      current = {
        ...base,
        status: (base.status || 'PUBLISHED') as any,
        aiDescriptionStatus: (base.aiDescriptionStatus || 'NOT_GENERATED') as any,
        sellerId: base.sellerId || 'admin-system',
        highlights: base.highlights || [],
        productTags: base.productTags || [],
        stockQuantity: base.stockQuantity || 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as SellerProductRecord;
      store.products.push(current);
      idx = store.products.length - 1;
    } else {
      current = store.products[idx];
    }

    if (updates.brand !== undefined) {
      let bName = '';
      if (typeof updates.brand === 'object' && updates.brand !== null) {
        bName = typeof (updates.brand as any).name === 'object' && (updates.brand as any).name !== null
          ? (updates.brand as any).name.name
          : (updates.brand as any).name || '';
      } else if (updates.brand) {
        bName = String(updates.brand);
      }
      updates.brand = bName ? { name: bName } : null;
    }

    const updated: SellerProductRecord = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    store.products[idx] = updated;
    saveStoreData(store);
    return updated;
  }

  static deleteProduct(id: string): boolean {
    const store = ensureDataFile();
    const idx = store.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      store.products.splice(idx, 1);
      saveStoreData(store);
      return true;
    }
    return false;
  }

  static createAuditLog(entry: Omit<ProductAuditLogRecord, 'id' | 'createdAt'>): ProductAuditLogRecord {
    const store = ensureDataFile();
    const log: ProductAuditLogRecord = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...entry,
      createdAt: new Date().toISOString(),
    };
    store.auditLogs.unshift(log);
    saveStoreData(store);
    return log;
  }

  static getAuditLogs(productId: string): ProductAuditLogRecord[] {
    const store = ensureDataFile();
    return store.auditLogs.filter((l) => l.productId === productId);
  }

  static getUserByEmailOrMobile(identifier: string): CustomUserRecord | null {
    const store = ensureDataFile();
    const trimmed = identifier.trim().toLowerCase();
    return (
      store.users.find(
        (u) =>
          (u.email && u.email.toLowerCase() === trimmed) ||
          (u.mobile && u.mobile.replace(/\s+/g, '') === trimmed)
      ) || null
    );
  }

  static getUserById(id: string): CustomUserRecord | null {
    const store = ensureDataFile();
    return store.users.find((u) => u.id === id) || null;
  }

  static createUser(user: Omit<CustomUserRecord, 'id' | 'createdAt' | 'updatedAt'>): CustomUserRecord {
    const store = ensureDataFile();
    const id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const record: CustomUserRecord = {
      id,
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.users.push(record);
    saveStoreData(store);
    return record;
  }
}
