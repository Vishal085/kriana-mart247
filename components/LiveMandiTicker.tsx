'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';

interface TickerRateItem {
  id: string;
  commodityName: string;
  mandiName: string;
  rate: number;
  unit: string;
  changePercent: number;
  direction: 'RISING' | 'FALLING' | 'STABLE';
}

export function LiveMandiTicker() {
  const [tickerItems, setTickerItems] = useState<TickerRateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadRates() {
      try {
        const res = await fetch('/api/rates?limit=20');
        if (res.ok) {
          const data = await res.json();
          const items = (data.items || []).map((r: any) => ({
            id: r.id,
            commodityName: r.product?.name || r.commodity || 'Commodity',
            mandiName: r.mandi?.name || 'Delhi Mandi',
            rate: Number(r.currentRate || r.rate || 0),
            unit: r.unit || 'kg',
            changePercent: Number(r.percentageChange || r.changePercent || 0),
            direction: r.direction || (Number(r.percentageChange) > 0 ? 'RISING' : Number(r.percentageChange) < 0 ? 'FALLING' : 'STABLE'),
          }));
          if (isMounted && items.length > 0) {
            setTickerItems(items);
          }
        }
      } catch (err) {
        console.warn('Ticker rate load fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadRates();
    // Refresh every 2 minutes
    const interval = setInterval(loadRates, 120000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading && tickerItems.length === 0) {
    return (
      <div className="bg-[#073B6F] text-slate-300 text-[11px] font-medium py-1.5 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="uppercase tracking-wider font-bold text-white text-[10px]">Live Mandi Ticker</span>
        </div>
        <span className="text-slate-400 text-[11px]">Syncing live APMC market auction rates...</span>
      </div>
    );
  }

  if (tickerItems.length === 0) {
    return (
      <div className="bg-[#073B6F] text-slate-300 text-[11px] font-medium py-1.5 px-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
          <span className="uppercase tracking-wider font-bold text-white text-[10px]">Market Ticker</span>
        </div>
        <span className="text-slate-400 text-[11px]">Market data unavailable</span>
      </div>
    );
  }

  return (
    <div
      className="relative bg-[#073B6F] text-white border-b border-white/10 text-xs overflow-hidden select-none z-50"
      aria-label="Live Mandi Price Ticker"
    >
      <div className="flex items-center">
        {/* Static Badge Left */}
        <div className="shrink-0 z-10 flex items-center gap-1.5 bg-[#05284D] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#39A9E8] shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Live Mandi Rates</span>
          <span className="sm:hidden">Live</span>
        </div>

        {/* Marquee Track Container */}
        <div className="flex-1 overflow-hidden py-1.5">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {/* Repeated twice for continuous loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => {
              const isRising = item.direction === 'RISING' || item.changePercent > 0;
              const isFalling = item.direction === 'FALLING' || item.changePercent < 0;
              const isNeutral = !isRising && !isFalling;

              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href="/mandi-rates"
                  className="inline-flex items-center gap-2 mx-5 text-xs text-slate-200 hover:text-white transition group"
                >
                  {/* Status Indicator */}
                  {isRising && (
                    <span className="flex items-center gap-0.5 text-emerald-400 font-bold text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                      <TrendingUp className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {isFalling && (
                    <span className="flex items-center gap-0.5 text-rose-400 font-bold text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 inline-block" />
                      <TrendingDown className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {isNeutral && (
                    <span className="flex items-center gap-0.5 text-slate-400 font-bold text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 inline-block" />
                      <Minus className="h-3 w-3" />
                    </span>
                  )}

                  {/* Mandi & Commodity */}
                  <span className="font-semibold text-white/90 group-hover:text-[#39A9E8] transition">
                    {item.mandiName}
                  </span>
                  <span className="text-slate-400 font-light">—</span>
                  <span className="text-slate-200 max-w-[160px] truncate">
                    {item.commodityName}
                  </span>

                  {/* Price */}
                  <span className="font-black text-white ml-0.5">
                    ₹{item.rate.toFixed(2)}/{item.unit}
                  </span>

                  {/* Change % */}
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                      isRising
                        ? 'text-emerald-300 bg-emerald-950/60'
                        : isFalling
                        ? 'text-rose-300 bg-rose-950/60'
                        : 'text-slate-400 bg-slate-800/60'
                    }`}
                  >
                    {isRising ? `+${item.changePercent.toFixed(1)}%` : `${item.changePercent.toFixed(1)}%`}
                  </span>

                  <span className="text-white/20 ml-2">|</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick CTA Right */}
        <Link
          href="/compare"
          className="shrink-0 hidden md:flex items-center gap-1 bg-[#05284D] hover:bg-[#073B6F] px-3 py-1.5 text-[11px] font-bold text-[#39A9E8] transition border-l border-white/10"
        >
          Compare Mandis →
        </Link>
      </div>
    </div>
  );
}
