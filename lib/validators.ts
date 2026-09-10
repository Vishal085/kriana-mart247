import { z } from 'zod';

export const customerRegisterSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  address: z.string().min(3).optional().or(z.literal('')),
  city: z.string().min(2).optional().or(z.literal('')),
  pinCode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits').optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().optional().or(z.literal('')),
  password: z.string().min(6),
});

export const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1),
});

export const checkoutSchema = z.object({
  deliveryName: z.string().min(2, 'Name is required'),
  deliveryPhone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian mobile number is required'),
  deliveryAddress: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
  customerNotes: z.string().optional().or(z.literal('')),
});
