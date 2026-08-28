'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

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
  grandTotal: number;
}

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  itemCount: number;
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
  addItem: async () => ({ success: false }),
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!user || user.role !== 'CUSTOMER') {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || null);
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addItem = async (productId: string, quantity = 1): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Please login as customer to add products to your cart' };
    }
    if (user.role !== 'CUSTOMER') {
      return { success: false, error: 'Admin accounts cannot place customer orders' };
    }

    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to add item' };
      }

      setCart(data.cart);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to update item quantity:', err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch('/api/cart', { method: 'DELETE' });
      if (res.ok) {
        setCart(null);
      }
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount: cart?.totalItems ?? 0,
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
