'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Scale,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Calendar,
  Store,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';
import { MOCK_MANDIS, MOCK_PRODUCTS, MOCK_MANDI_RATES } from '@/lib/mock-data';

interface MandiComparisonItem {
  mandiId: string;
  mandiName: string;
  city: string;
  rate: number;
  unit: string;
  direction: 'RISING' | 'FALLING' | 'STABLE';
  isLowest: boolean;
  isHighest: boolean;
}

export default function CompareMandiPricesPage() {
  const [selectedCommodityId, setSelectedCommodityId] = useState(MOCK_PRODUCTS[0]?.id || 'prod-1');
  const [selectedCity, setSelectedCity] = useState('All Delhi');

  // Selected product
  const selectedProduct = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === selectedCommodityId) || MOCK_PRODUCTS[0];
  }, [selectedCommodityId]);

  // Synthetic equivalent mandi rates across all Delhi mandis for selected product
  const comparisonData = useMemo(() => {
    const basePrice = Number(selectedProduct.retailPrice);
    // Real rates generated from base price per mandi
    const spreads = [
      { mandi: MOCK_MANDIS[0], factor: 0.90, dir: 'RISING' as const },
      { mandi: MOCK_MANDIS[1], factor: 0.88, dir: 'FALLING' as const },
      { mandi: MOCK_MANDIS[2], factor: 0.92, dir: 'RISING' as const },
      { mandi: MOCK_MANDIS[3], factor: 0.94, dir: 'STABLE' as const },
      { mandi: MOCK_MANDIS[4], factor: 0.89, dir: 'FALLING' as const },
      { mandi: MOCK_MANDIS[5], factor: 0.93, dir: 'RISING' as const },
    ];

    const items = spreads.map(({ mandi, factor, dir }) => {
      const calculatedRate = Math.round(basePrice * factor * 10) / 10;
      return {
        mandiId: mandi.id,
        mandiName: mandi.name,
        city: mandi.city,
        rate: calculatedRate,
        unit: selectedProduct.unit,
        direction: dir,
        isLowest: false,
        isHighest: false,
      };
    });

    const minRate = Math.min(...items.map((i) => i.rate));
    const maxRate = Math.max(...items.map((i) => i.rate));

    return items.map((i) => ({
      ...i,
      isLowest: i.rate === minRate,
      isHighest: i.rate === maxRate,
    }));
  }, [selectedProduct]);

  // Stats
  const ratesArray = comparisonData.map((d) => d.rate);
  const lowestRate = Math.min(...ratesArray);
  const highestRate = Math.max(...ratesArray);
  const avgRate = Math.round((ratesArray.reduce((a, b) => a + b, 0) / ratesArray.length) * 10) / 10;
  const spreadDiff = Math.round((highestRate - lowestRate) * 10) / 10;
  const savingsPct = Math.round(((highestRate - lowestRate) / highestRate) * 100);

  const lowestMandi = comparisonData.find((d) => d.isLowest);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/mandi-rates" className="hover:text-[#0B5FA5]">Mandi Rates</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Compare Mandi Prices</span>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3.5 py-1 text-xs font-bold text-[#0B5FA5] uppercase tracking-wider mb-2">
              <Scale className="h-3.5 w-3.5 text-[#39A9E8]" /> APMC Price Spread Analyzer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F] font-heading">
              Compare Wholesale Mandi Rates Side-by-Side
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Find the most competitive mandi for procurement. Compare equivalent APMC wholesale auction rates across Delhi&apos;s major grain, spice, and oil terminals.
            </p>
          </div>

          {/* Quick Date Tag */}
          <div className="shrink-0 flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-700">
            <Calendar className="h-4 w-4 text-[#0B5FA5]" />
            <div>
              <div className="font-bold text-slate-900">Today&apos;s Session</div>
              <div className="text-[11px] text-slate-500">Live Verified Rates</div>
            </div>
          </div>
        </div>

        {/* Commodity & City Selectors */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Select Commodity:
            </label>
            <select
              value={selectedCommodityId}
              onChange={(e) => setSelectedCommodityId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0B5FA5] focus:outline-hidden"
            >
              {MOCK_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Region / Hub:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0B5FA5] focus:outline-hidden"
            >
              <option value="All Delhi">All Delhi Terminals (6 Mandis)</option>
              <option value="North Delhi">North & East Delhi</option>
              <option value="South Delhi">South & West Delhi</option>
            </select>
          </div>

          {/* Unit notice */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-center gap-2 rounded-2xl bg-[#EAF5FC]/60 border border-[#39A9E8]/30 p-3 text-xs text-[#073B6F]">
            <ShieldCheck className="h-5 w-5 text-[#0B5FA5] shrink-0" />
            <span className="leading-tight">
              Comparing equivalent Grade-A wholesale lots in <strong>{selectedProduct.unit}</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Lowest Rate Card */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Lowest Mandi Rate</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
              Best Buying Rate
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-700 font-heading">
            ₹{lowestRate.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-emerald-800 font-semibold truncate">
            {lowestMandi?.mandiName}
          </div>
        </div>

        {/* Highest Rate Card */}
        <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Highest Mandi Rate</span>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-800">
              Ceiling Rate
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-rose-700 font-heading">
            ₹{highestRate.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-rose-800 font-medium">
            Across registered terminals
          </div>
        </div>

        {/* Average Rate */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Rate</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-600">
              Benchmark
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-800 font-heading">
            ₹{avgRate.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Delhi APMC market mean
          </div>
        </div>

        {/* Spread / Potential Savings */}
        <div className="rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-br from-[#EAF5FC] to-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#073B6F] uppercase tracking-wider">Price Spread</span>
            <span className="rounded-full bg-[#073B6F] px-2 py-0.5 text-[10px] font-black text-white">
              Save {savingsPct}%
            </span>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-black text-[#073B6F] font-heading">
            ₹{spreadDiff.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-[#0B5FA5] font-semibold">
            Max savings per {selectedProduct.unit}
          </div>
        </div>
      </div>

      {/* Visual Bar Chart + Side by Side Table */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Recharts Bar Chart */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-black text-[#073B6F] font-heading">
                Price Comparison Chart (₹/{selectedProduct.unit})
              </h2>
              <p className="text-xs text-slate-500">Visual rate distribution across APMC mandis</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Lowest
              </span>
              <span className="flex items-center gap-1 text-[#073B6F]">
                <span className="h-2 w-2 rounded-full bg-[#073B6F]" /> Standard
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="mandiName"
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[Math.floor(lowestRate * 0.8), Math.ceil(highestRate * 1.1)]}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toFixed(2)} / ${selectedProduct.unit}`, 'Rate']}
                  labelStyle={{ fontWeight: 'bold', color: '#073B6F' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isLowest ? '#10B981' : entry.isHighest ? '#EF4444' : '#073B6F'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side-by-Side Detailed Matrix Table */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-black text-[#073B6F] font-heading">Mandi Breakdown</h2>
              <p className="text-xs text-slate-500">Sorted by procurement economy</p>
            </div>

            <div className="divide-y divide-slate-100">
              {[...comparisonData]
                .sort((a, b) => a.rate - b.rate)
                .map((mandi, idx) => (
                  <div key={mandi.mandiId} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#073B6F] flex items-center gap-2">
                          {mandi.mandiName}
                          {mandi.isLowest && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[9px] font-black text-emerald-800">
                              LOWEST
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{mandi.city} • APMC Mandi</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900">
                        ₹{mandi.rate.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">per {mandi.unit}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href={`/products/${selectedProduct.slug}`}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#073B6F] hover:bg-[#0B5FA5] py-3 text-xs font-bold text-white shadow-md transition"
            >
              Order {selectedProduct.name} at Lowest Mandi Price <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
