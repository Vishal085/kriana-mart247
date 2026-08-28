'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(minimumQuantity);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const imageUrl = images[0]?.url || '/brand/logo.svg';
  const price = Number(retailPrice);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login/customer');
      return;
    }

    setAdding(true);
    const res = await addItem(id, quantity);
    setAdding(false);

    if (res.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else if (res.error) {
      alert(res.error);
    }
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
          <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-[#F7FAFC] p-4 transition-transform duration-300 group-hover:scale-105">
            <img
              src={imageUrl}
              alt={name}
              className="max-h-36 max-w-full object-contain"
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
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Retail Price: </span>
            <span className="text-xl font-black text-[#073B6F]">
              ₹{price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/{unit}</span>
          </div>
        </div>

        {/* Quantity Controls & Add to Cart */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setQuantity(Math.max(minimumQuantity, quantity - 1))}
              disabled={quantity <= minimumQuantity}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-30"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => {
                if (!maximumQuantity || quantity < maximumQuantity) {
                  setQuantity(quantity + 1);
                }
              }}
              disabled={Boolean(maximumQuantity && quantity >= maximumQuantity)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white disabled:opacity-30"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold text-white transition shadow-sm ${
              added
                ? 'bg-emerald-600'
                : 'bg-[#073B6F] hover:bg-[#0B5FA5]'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
