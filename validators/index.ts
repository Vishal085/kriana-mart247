import { z } from 'zod';

const COMMON_WEAK_PASSWORDS = new Set([
  '12345678',
  '123456789',
  'password',
  'admin123',
  'qwertyui',
  'password123',
  'kirana123',
  'kiranamart',
]);

export function isStrongPassword(pwd: string): boolean {
  if (!pwd || pwd.length < 8) return false;
  if (COMMON_WEAK_PASSWORDS.has(pwd.toLowerCase())) return false;
  return true;
}

export const customerRegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((p) => isStrongPassword(p), {
      message: 'Password is too weak. Avoid common words or simple sequences.',
    }),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
  address: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const sellerRegisterSchema = z.object({
  fullName: z.string().min(2, 'Owner/Shopkeeper name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((p) => isStrongPassword(p), {
      message: 'Password is too weak. Avoid common words or simple sequences.',
    }),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  shopAddress: z.string().min(3, 'Shop address must be at least 3 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional().default('Delhi'),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits').optional().or(z.literal('')),
  gstNumber: z.string().optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const customerLoginSchema = z.object({
  identifier: z.string().min(1, 'Email or Mobile number is required'),
  password: z.string().min(1, 'Password is required'),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Valid admin email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional().nullable(),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const subCategorySchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  name: z.string().min(2, 'Subcategory name is required'),
  slug: z.string().min(2, 'Slug is required'),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  slug: z.string().min(1, 'Slug is required'),
  active: z.boolean().default(true),
});

export const productSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional().nullable(),
  brandId: z.string().optional().nullable(),
  categoryId: z.string().min(1, 'Category is required'),
  subCategoryId: z.string().optional().nullable(),
  unit: z.string().min(1, 'Unit is required'),
  retailPrice: z.number().positive('Retail price must be greater than 0'),
  mrp: z.number().positive().optional().nullable(),
  stockQuantity: z.number().int().min(0).optional().nullable(),
  weight: z.string().optional().nullable(),
  minimumQuantity: z.number().int().min(1).default(1),
  maximumQuantity: z.number().int().positive().optional().nullable(),
  barcode: z.string().optional().nullable(),
  searchKeywords: z.string().optional().nullable(),
  active: z.boolean().default(true),
  images: z.array(z.object({
    url: z.string().min(1),
    altText: z.string().optional().nullable(),
    sortOrder: z.number().int().default(0),
    active: z.boolean().default(true),
  })).optional(),
});

export const mandiSchema = z.object({
  name: z.string().min(2, 'Mandi name is required'),
  slug: z.string().min(2, 'Slug is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  address: z.string().optional().nullable(),
  pincode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits').optional().nullable().or(z.literal('')),
  description: z.string().optional().nullable(),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const mandiRateSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  mandiId: z.string().min(1, 'Mandi is required'),
  date: z.string().or(z.date()),
  currentRate: z.number().positive('Current rate must be greater than 0'),
  previousRate: z.number().min(0, 'Previous rate cannot be negative'),
  minimumRate: z.number().positive().optional().nullable(),
  maximumRate: z.number().positive().optional().nullable(),
  unit: z.string().min(1, 'Unit is required'),
  auctionDateTime: z.string().or(z.date()).optional().nullable(),
  active: z.boolean().default(true),
});

export const bulkRateImportItemSchema = z.object({
  mandiSlug: z.string().min(1),
  productSku: z.string().min(1),
  date: z.string().min(1),
  currentRate: z.number().positive(),
  previousRate: z.number().min(0).default(0),
  unit: z.string().min(1),
});

export const bulkRateImportSchema = z.object({
  rates: z.array(bulkRateImportItemSchema).min(1, 'At least one rate item is required'),
});

export const cartItemAddSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const cartItemUpdateSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const checkoutSchema = z.object({
  deliveryName: z.string().min(2, 'Name is required'),
  deliveryPhone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian mobile number is required'),
  deliveryAddress: z.string().min(3, 'Delivery address must be at least 3 characters'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
  customerNotes: z.string().optional().nullable().or(z.literal('')),
  whatsappOptIn: z.boolean().default(true).optional(),
  paymentMethod: z.enum(['COD', 'ONLINE']).default('COD').optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
  })).optional(),
});

export const priceAlertSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  mandiId: z.string().optional().nullable(),
  condition: z.enum(['ABOVE', 'BELOW']),
  targetPrice: z.number().positive('Target price must be greater than 0'),
});

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Valid mobile number is required'),
  address: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
});

export const orderStatusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'DELIVERED', 'CANCELLED']),
  note: z.string().optional().nullable(),
});

export const paymentVerifySchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpayOrderId: z.string().min(1, 'Razorpay Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Razorpay Signature is required'),
  paymentMethod: z.string().optional().nullable(),
});

export const createPaymentOrderSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
});

export const paymentFailureSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  razorpayOrderId: z.string().optional().nullable(),
  errorCode: z.string().optional().nullable(),
  errorDescription: z.string().optional().nullable(),
  errorReason: z.string().optional().nullable(),
});

