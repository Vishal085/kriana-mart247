'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Plus, Check, ArrowRight, TrendingDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface BasketItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  todayRate: number;
  lastWeekRate: number;
}

export function MyWholesaleBasket() {
  const { addItem, openDrawer } = useCart();
  const { toast } = useToast();
  const [addingAll, setAddingAll] = useState(false);

  // Curated staple wholesale basket for Indian kirana stores / households
  const basketItems: BasketItem[] = [
    {
      id: 'prod-28', // Aashirvaad Atta
      name: 'Aashirvaad Shudh Chakki Atta',
      unit: '10kg Bag',
      quantity: 5,
      todayRate: 420.00,
      lastWeekRate: 435.00,
    },
    {
      id: 'prod-41', // Fortune Mustard Oil
      name: 'Fortune Kachi Ghani Mustard Oil',
      unit: '1L Pouch',
      quantity: 12,
      todayRate: 148.00,
      lastWeekRate: 155.00,
    },
    {
      id: 'prod-37', // India Gate Basmati
      name: 'India Gate Feast Rozzana Basmati Rice',
      unit: '5kg Bag',
      quantity: 4,
      todayRate: 385.00,
      lastWeekRate: 400.00,
    },
    {
      id: 'prod-52', // Tata Salt
      name: 'Tata Salt Vacuum Evaporated Iodized Salt',
      unit: '1kg Pouch',
      quantity: 25,
      todayRate: 28.00,
      lastWeekRate: 28.00,
    },
  ];

  const todayTotal = basketItems.reduce((acc, item) => acc + item.todayRate * item.quantity, 0);
  const lastWeekTotal = basketItems.reduce((acc, item) => acc + item.lastWeekRate * item.quantity, 0);
  const netSavings = Math.max(0, lastWeekTotal - todayTotal);
  const savingsPct = Math.round((netSavings / lastWeekTotal) * 100);

  const handleAddAllToCart = async () => {
    setAddingAll(true);
    try {
      for (const item of basketItems) {
        await addItem(item.id, item.quantity);
      }
      toast.success(
        `Added all 4 monthly wholesale staples (${basketItems.reduce((a, b) => a + b.quantity, 0)} units) to your cart!`,
        'Basket Added'
      );
      openDrawer();
    } catch {
      toast.error('Failed to add some basket items');
    } finally {
      setAddingAll(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#0B5FA5]/20 bg-gradient-to-br from-white to-[#F8FAFC] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3 py-1 text-xs font-bold text-[#0B5FA5] uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#39A9E8]" /> 1-Click Wholesale Restock
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#073B6F] font-heading">
            My Monthly Wholesale Basket
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pre-configured standard monthly procurement list for grains, oil, and staples.
          </p>
        </div>

        {/* Pricing Summary Callout */}
        <div className="flex items-center gap-4 bg-[#EAF5FC]/60 border border-[#39A9E8]/30 rounded-2xl p-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Today&apos;s Basket Value</span>
            <div className="text-xl font-black text-[#073B6F] font-heading">₹{todayTotal.toFixed(2)}</div>
          </div>
          {netSavings > 0 && (
            <div className="border-l border-[#39A9E8]/30 pl-4">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block flex items-center gap-0.5">
                <TrendingDown className="h-3 w-3" /> Price Drop
              </span>
              <div className="text-sm font-black text-emerald-700">Save ₹{netSavings.toFixed(2)} ({savingsPct}%)</div>
            </div>
          )}
        </div>
      </div>

      {/* Basket Items Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {basketItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:border-[#39A9E8]/50 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {item.quantity} × {item.unit}
              </span>
              <span className="text-[11px] font-bold text-slate-400 line-through">
                ₹{(item.lastWeekRate * item.quantity).toFixed(0)}
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{item.name}</h3>
            <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-2 text-xs">
              <span className="text-slate-500 font-medium">₹{item.todayRate.toFixed(0)}/unit</span>
              <span className="font-black text-[#073B6F]">₹{(item.todayRate * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          Includes free APMC warehouse dispatch & wholesale tiered volume discount.
        </div>
        <button
          onClick={handleAddAllToCart}
          disabled={addingAll}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#073B6F] hover:bg-[#0B5FA5] px-8 py-3 text-xs font-black text-white shadow-md transition active:scale-95"
        >
          {addingAll ? (
            <span>Adding Basket Items...</span>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>Add Entire Basket to Cart (₹{todayTotal.toFixed(0)})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
