import { z } from 'zod';

export const customerRegisterSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  address: z.string().min(5).optional().or(z.literal('')),
  city: z.string().min(2).optional().or(z.literal('')),
  pinCode: z.string().min(4).optional().or(z.literal('')),
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
  deliveryName: z.string().min(2),
  deliveryPhone: z.string().min(10),
  deliveryAddress: z.string().min(5),
  city: z.string().min(2),
  pincode: z.string().min(4),
  customerNotes: z.string().optional().or(z.literal('')),
});
