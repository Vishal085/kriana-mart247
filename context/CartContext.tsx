'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export interface CartItemProduct {
  id: string;
  name: string;
  slug: string;
  unit: string;
  retailPrice: number;
  minimumQuantity: number;
  maximumQuantity?: number | null;
  brand: string;
  category: string;
  image: string;
  active: boolean;
}

export interface CartItemData {
  id: string;
  productId: string;
  quantity: number;
  product: CartItemProduct;
  unitPrice: number;
  subtotal: number;
}

export interface CartData {
  id: string;
  items: CartItemData[];
  totalItems: number;
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  bulkSavings: number;
  grandTotal: number;
}

export const FREE_DELIVERY_THRESHOLD = 500;
export const STANDARD_DELIVERY_FEE = 40;

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (productId: string, quantity?: number) => Promise<{ success: boolean; error?: string }>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  loading: false,
  itemCount: 0,
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
  addItem: async () => ({ success: false }),
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

function calculateCartTotals(items: CartItemData[]): CartData {
  let subtotal = 0;
  let totalItems = 0;
  let bulkSavings = 0;

  for (const item of items) {
    const rawTotal = item.unitPrice * item.quantity;
    let discountRate = 0;
    // Wholesale bulk tiers
    if (item.quantity >= 20) {
      discountRate = 0.10; // 10% off for bulk lot
    } else if (item.quantity >= 5) {
      discountRate = 0.06; // 6% off for medium lot
    }

    const itemSavings = rawTotal * discountRate;
    bulkSavings += itemSavings;
    subtotal += (rawTotal - itemSavings);
    totalItems += item.quantity;
  }

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || items.length === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
  const grandTotal = Math.max(0, subtotal + deliveryCharge + tax);

  return {
    id: 'active-cart',
    items,
    totalItems,
    subtotal: Math.round(subtotal * 100) / 100,
    tax,
    deliveryCharge,
    bulkSavings: Math.round(bulkSavings * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  // Load guest cart from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('km_guest_cart');
      if (saved) {
        const parsedItems: CartItemData[] = JSON.parse(saved);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setCart(calculateCartTotals(parsedItems));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save guest cart whenever cart changes
  const saveGuestCart = (items: CartItemData[]) => {
    const totals = calculateCartTotals(items);
    setCart(totals);
    try {
      localStorage.setItem('km_guest_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const refreshCart = async () => {
    if (user && user.role === 'CUSTOMER') {
      try {
        setLoading(true);
        const res = await fetch('/api/cart');
        if (res.ok) {
          const data = await res.json();
          if (data.cart?.items) {
            setCart(calculateCartTotals(data.cart.items));
          }
        }
      } catch (err) {
        console.warn('API cart load failed, keeping local cart:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (productId: string, quantity = 1): Promise<{ success: boolean; error?: string }> => {
    // 1. If logged in customer and server is reachable, try server API
    if (user && user.role === 'CUSTOMER') {
      try {
        const res = await fetch('/api/cart/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.cart?.items) {
            setCart(calculateCartTotals(data.cart.items));
            openDrawer();
            return { success: true };
          }
        }
      } catch (e) {
        console.warn('Server cart add failed, using optimistic cart:', e);
      }
    }

    // 2. Local / Guest optimistic cart
    const prod = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!prod) {
      return { success: false, error: 'Product not found' };
    }

    const currentItems = cart?.items ? [...cart.items] : [];
    const existingIndex = currentItems.findIndex((i) => i.productId === productId);

    if (existingIndex > -1) {
      const existing = currentItems[existingIndex];
      const newQty = existing.quantity + quantity;
      currentItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        subtotal: existing.unitPrice * newQty,
      };
    } else {
      currentItems.push({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId,
        quantity,
        unitPrice: Number(prod.retailPrice),
        subtotal: Number(prod.retailPrice) * quantity,
        product: {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          unit: prod.unit,
          retailPrice: Number(prod.retailPrice),
          minimumQuantity: prod.minimumQuantity,
          maximumQuantity: prod.maximumQuantity,
          brand: prod.brand.name,
          category: prod.category.name,
          image: prod.images[0]?.url || '/products/placeholder.svg',
          active: prod.active,
        },
      });
    }

    saveGuestCart(currentItems);
    openDrawer();
    return { success: true };
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (user && user.role === 'CUSTOMER') {
      fetch(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      }).catch(() => {});
    }

    const currentItems = cart?.items ? [...cart.items] : [];
    const index = currentItems.findIndex((i) => i.id === itemId);
    if (index > -1) {
      if (quantity <= 0) {
        currentItems.splice(index, 1);
      } else {
        currentItems[index] = {
          ...currentItems[index],
          quantity,
          subtotal: currentItems[index].unitPrice * quantity,
        };
      }
      saveGuestCart(currentItems);
    }
  };

  const removeItem = async (itemId: string) => {
    if (user && user.role === 'CUSTOMER') {
      fetch(`/api/cart/items/${itemId}`, { method: 'DELETE' }).catch(() => {});
    }

    const currentItems = cart?.items ? cart.items.filter((i) => i.id !== itemId) : [];
    saveGuestCart(currentItems);
  };

  const clearCart = async () => {
    if (user && user.role === 'CUSTOMER') {
      fetch('/api/cart', { method: 'DELETE' }).catch(() => {});
    }
    setCart(null);
    try {
      localStorage.removeItem('km_guest_cart');
    } catch {
      // ignore
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount: cart?.totalItems ?? 0,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
