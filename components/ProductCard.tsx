'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ProductImage } from '@/components/ProductImage';

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  brand?: { name: string } | null;
  category?: { name: string } | null;
  unit: string;
  retailPrice: number | string;
  minimumQuantity?: number;
  maximumQuantity?: number | null;
  images?: Array<{ url: string; altText?: string | null }>;
}

export function ProductCard({
  id,
  name,
  slug,
  brand,
  category,
  unit,
  retailPrice,
  minimumQuantity = 1,
  maximumQuantity,
  images = [],
}: ProductCardProps) {
  const { cart, addItem, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const imageUrl = images[0]?.url || '/brand/logo.svg';
  const price = Number(retailPrice);

  // Check if this product is already in the user's cart
  const cartItem = cart?.items.find((item) => item.productId === id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login/customer');
      return;
    }

    setAdding(true);
    const res = await addItem(id, minimumQuantity);
    setAdding(false);

    if (res.error) {
      alert(res.error);
    }
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem || updating) return;

    if (maximumQuantity && cartItem.quantity >= maximumQuantity) {
      return;
    }

    setUpdating(true);
    await updateQuantity(cartItem.id, cartItem.quantity + 1);
    setUpdating(false);
  };

  const handleDecrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem || updating) return;

    setUpdating(true);
    if (cartItem.quantity <= (minimumQuantity || 1)) {
      await removeItem(cartItem.id);
    } else {
      await updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
    setUpdating(false);
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login/customer');
      return;
    }

    try {
      if (wishlisted) {
        await fetch(`/api/wishlist?productId=${id}`, { method: 'DELETE' });
        setWishlisted(false);
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id }),
        });
        setWishlisted(true);
      }
    } catch (err) {
      console.error('Wishlist error:', err);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#39A9E8]/50 hover:shadow-xl">
      <div>
        {/* Top Badges & Wishlist */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#EAF5FC] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
            {brand?.name || 'Generic'}
          </span>
          <button
            onClick={handleToggleWishlist}
            aria-label="Add to Wishlist"
            className={`rounded-full p-2 transition ${
              wishlisted
                ? 'bg-rose-50 text-rose-500'
                : 'text-slate-400 hover:bg-slate-50 hover:text-rose-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/products/${slug}`} className="mt-2 block">
          <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-white border border-slate-100 p-2 shadow-xs transition-transform duration-300 group-hover:scale-102">
            <ProductImage
              src={images[0]?.url || `/products/${id.toLowerCase()}.svg`}
              alt={name}
              brandName={brand?.name || undefined}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="mt-4">
          <div className="text-[11px] font-medium text-slate-500">
            {category?.name || 'Grocery'} • {unit}
          </div>
          <Link href={`/products/${slug}`} className="hover:underline">
            <h3 className="mt-1 text-base font-bold text-[#172033] line-clamp-1">
              {name}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xs text-slate-500 font-medium">Retail Price: </span>
            <span className="text-xl font-black text-[#073B6F]">
              ₹{price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/{unit}</span>
          </div>
        </div>

        {/* Dynamic Action: Initial 'Add' button OR Active Quantity Stepper after adding */}
        <div>
          {cartItem ? (
            /* Active Stepper once product is in cart */
            <div className="flex items-center justify-between rounded-2xl border border-[#073B6F]/20 bg-[#EAF5FC] p-1 shadow-xs animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={handleDecrease}
                disabled={updating}
                aria-label="Decrease Quantity"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#073B6F] font-black shadow-xs transition hover:bg-[#073B6F] hover:text-white disabled:opacity-50"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              
              <div className="text-center">
                <span className="text-xs font-black text-[#073B6F]">
                  {cartItem.quantity}
                </span>
                <span className="block text-[9px] font-bold text-slate-400">
                  in Cart
                </span>
              </div>

              <button
                onClick={handleIncrease}
                disabled={updating || Boolean(maximumQuantity && cartItem.quantity >= maximumQuantity)}
                aria-label="Increase Quantity"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#073B6F] text-white font-black shadow-xs transition hover:bg-[#0B5FA5] disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            /* Initial 'Add' button */
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#073B6F] py-2.5 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#0B5FA5] hover:shadow active:scale-98 disabled:opacity-60"
            >
              {adding ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
