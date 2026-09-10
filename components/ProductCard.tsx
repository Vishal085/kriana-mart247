'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Minus, ShoppingBag, Sparkles, Zap, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

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
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const price = Number(retailPrice);
  // Realistic MRP with discount
  const mrp = Math.round(price * 1.18);
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);
  const wholesaleBulkPrice = Math.round(price * 0.94); // Tier 2 (5+ units)

  // Check if item is in cart
  const cartItem = cart?.items.find((item) => item.productId === id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Dynamic Badge criteria
  const isSmallPack = price <= 10;
  const isWholesaleDeal = discountPercent >= 15;
  const isEssential = category?.name?.includes('Oil') || category?.name?.includes('Atta') || category?.name?.includes('Rice');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAdding(true);
    const res = await addItem(id, minimumQuantity);
    setAdding(false);

    if (res.success) {
      toast.success(`${name} added to your wholesale basket!`);
    } else if (res.error) {
      toast.error(res.error);
    }
  };

  const handleIncrease = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItem || updating) return;

    if (maximumQuantity && cartItem.quantity >= maximumQuantity) {
      toast.warning(`Maximum order limit is ${maximumQuantity} units for this product.`);
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
      toast.info(`Removed ${name} from cart.`);
    } else {
      await updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
    setUpdating(false);
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info('Please log in to save items to your wishlist.');
      return;
    }

    try {
      if (wishlisted) {
        await fetch(`/api/wishlist?productId=${id}`, { method: 'DELETE' });
        setWishlisted(false);
        toast.info('Removed from wishlist');
      } else {
        await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id }),
        });
        setWishlisted(true);
        toast.success('Saved to your wishlist!');
      }
    } catch (err) {
      console.error('Wishlist error:', err);
    }
  };

  // Safely resolve brand display name even if string or nested object
  const brandDisplayName =
    typeof brand === 'string'
      ? brand
      : typeof brand?.name === 'string'
      ? brand.name
      : typeof (brand?.name as any)?.name === 'string'
      ? (brand?.name as any).name
      : 'Kirana';

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#39A9E8]/60 hover:shadow-lg">
      <div>
        {/* Badges & Wishlist Header */}
        <div className="flex items-start justify-between gap-1 mb-2">
          <div className="flex flex-wrap gap-1">
            {isSmallPack ? (
              <span className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase tracking-tight">
                Pocket Pack
              </span>
            ) : isWholesaleDeal ? (
              <span className="rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-tight flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5 text-emerald-600" /> Wholesale Deal
              </span>
            ) : isEssential ? (
              <span className="rounded-md bg-sky-50 border border-sky-200/60 px-2 py-0.5 text-[10px] font-black text-sky-800 uppercase tracking-tight flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5 text-sky-600" /> Fast Dispatch
              </span>
            ) : null}
          </div>

          <button
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className={`rounded-full p-1.5 transition ${
              wishlisted
                ? 'bg-rose-50 text-rose-500'
                : 'text-slate-400 hover:bg-slate-100 hover:text-rose-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <Link href={`/products/${slug}`} className="block">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50/70 p-2.5 border border-slate-100/80 transition-transform duration-300 group-hover:scale-102">
            <img
              src={images[0]?.url || '/products/placeholder.svg'}
              alt={name}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith('/products/placeholder.svg')) {
                  target.src = '/products/placeholder.svg';
                }
              }}
              className="h-full w-full object-contain mix-blend-multiply"
            />
            {discountPercent > 0 && (
              <span className="absolute top-2 left-2 rounded-md bg-[#073B6F] text-white text-[10px] font-black px-1.5 py-0.5 shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </Link>

        {/* Brand & Pack Size */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-500">
          <span className="uppercase tracking-wider text-[#0B5FA5] truncate max-w-[120px]">
            {brandDisplayName}
          </span>
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600 shrink-0">
            {unit}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${slug}`} className="mt-1 block">
          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#073B6F] transition">
            {name}
          </h3>
        </Link>
      </div>

      {/* Pricing & Reactive Quantity Stepper Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-slate-900">
                ₹{price.toFixed(2)}
              </span>
              {mrp > price && (
                <span className="text-[11px] text-slate-400 line-through">
                  ₹{mrp.toFixed(2)}
                </span>
              )}
            </div>
            {/* Wholesale Tier Notice */}
            <div className="text-[10px] text-emerald-700 font-bold tracking-tight">
              ₹{wholesaleBulkPrice.toFixed(2)} in 5+ bulk lot
            </div>
          </div>

          {/* Stepper / Add Button */}
          <div>
            {currentQuantity === 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-[#EAF5FC] border-2 border-[#073B6F] px-3.5 py-1.5 text-xs font-black text-[#073B6F] shadow-xs hover:shadow-sm transition active:scale-95"
              >
                {adding ? (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#073B6F] border-t-transparent" />
                ) : (
                  <>
                    <span>ADD</span>
                    <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center rounded-xl bg-[#073B6F] text-white shadow-xs">
                <button
                  onClick={handleDecrease}
                  disabled={updating}
                  className="px-2 py-1.5 hover:bg-[#0B5FA5] rounded-l-xl transition text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3 stroke-[2.5]" />
                </button>
                <span className="px-1.5 text-xs font-black text-white min-w-[20px] text-center">
                  {currentQuantity}
                </span>
                <button
                  onClick={handleIncrease}
                  disabled={updating}
                  className="px-2 py-1.5 hover:bg-[#0B5FA5] rounded-r-xl transition text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
