'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Check, ArrowRight } from 'lucide-react';

interface MandiCommodityRowActionProps {
  product: {
    id: string;
    name: string;
    slug: string;
    unit?: string;
  };
  mandiRate: number;
  unit: string;
}

export function MandiCommodityRowAction({
  product,
  mandiRate,
  unit,
}: MandiCommodityRowActionProps) {
  const { addItem, openDrawer } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={handleAddToCart}
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition shadow-2xs ${
          added
            ? 'bg-emerald-600 text-white'
            : 'bg-[#073B6F] text-white hover:bg-[#0B5FA5]'
        }`}
        title={`Add ${product.name} to cart at ₹${mandiRate}`}
      >
        {added ? (
          <>
            <Check className="h-3 w-3" />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-3 w-3" />
            <span>Buy ₹{Number(mandiRate).toFixed(0)}</span>
          </>
        )}
      </button>

      <Link
        href={`/products/${product.slug}`}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-[#EAF5FC] px-2 py-1 text-[11px] font-bold text-[#073B6F] hover:bg-white transition"
      >
        <span>Detail</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
