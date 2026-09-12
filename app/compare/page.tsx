'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  MapPin,
  AlertCircle,
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
import { normalizeRate, getRateSourceMeta } from '@/lib/rates';

interface RateItem {
  id: string;
  productId: string;
  mandiId: string;
  currentRate: number;
  previousRate: number;
  unit: string;
  direction: 'RISING' | 'FALLING' | 'STABLE';
  product: {
    id: string;
    name: string;
    slug: string;
    unit: string;
    category?: { name: string };
  };
  mandi: {
    id: string;
    name: string;
    city: string;
    state: string;
  };
}

export default function CompareMandiPricesPage() {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('All States');

  // Fetch real rates from API
  useEffect(() => {
    async function loadRates() {
      setLoading(true);
      try {
        const res = await fetch('/api/rates?limit=100');
        if (res.ok) {
          const data = await res.json();
          const items: RateItem[] = data.items || [];
          setRates(items);
          if (items.length > 0 && !selectedProductId) {
            setSelectedProductId(items[0].productId);
          }
        }
      } catch (err) {
        console.error('Failed to load rates for comparison:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRates();
  }, []);

  // Unique commodities available in real rates
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, { id: string; name: string; slug: string; unit: string }>();
    for (const r of rates) {
      if (r.product && !map.has(r.productId)) {
        map.set(r.productId, {
          id: r.productId,
          name: r.product.name,
          slug: r.product.slug,
          unit: r.unit || r.product.unit || 'Unit',
        });
      }
    }
    return Array.from(map.values());
  }, [rates]);

  // Active product details
  const activeProduct = useMemo(() => {
    return uniqueProducts.find((p) => p.id === selectedProductId) || uniqueProducts[0] || null;
  }, [uniqueProducts, selectedProductId]);

  // Real comparison data for selected commodity across mandis
  const comparisonData = useMemo(() => {
    if (!selectedProductId) return [];

    let filtered = rates.filter((r) => r.productId === selectedProductId);

    if (selectedState !== 'All States') {
      filtered = filtered.filter(
        (r) => r.mandi.state?.toLowerCase() === selectedState.toLowerCase()
      );
    }

    if (filtered.length === 0) return [];

    const ratesArray = filtered.map((r) => Number(r.currentRate));
    const minRate = Math.min(...ratesArray);
    const maxRate = Math.max(...ratesArray);

    return filtered.map((r) => {
      const numRate = Number(r.currentRate);
      const norm = normalizeRate(numRate, r.unit);
      return {
        mandiId: r.mandi.id,
        mandiName: r.mandi.name,
        city: r.mandi.city,
        state: r.mandi.state,
        rate: numRate,
        normalizedText: norm.displayText,
        unit: r.unit,
        direction: r.direction,
        isLowest: numRate === minRate && filtered.length > 1,
        isHighest: numRate === maxRate && filtered.length > 1,
      };
    });
  }, [rates, selectedProductId, selectedState]);

  // Metrics calculation from verified data
  const ratesArray = comparisonData.map((d) => d.rate);
  const lowestRate = ratesArray.length > 0 ? Math.min(...ratesArray) : 0;
  const highestRate = ratesArray.length > 0 ? Math.max(...ratesArray) : 0;
  const avgRate =
    ratesArray.length > 0
      ? Math.round((ratesArray.reduce((a, b) => a + b, 0) / ratesArray.length) * 10) / 10
      : 0;
  const spreadDiff = ratesArray.length > 1 ? Math.round((highestRate - lowestRate) * 10) / 10 : 0;
  const savingsPct =
    highestRate > 0 && spreadDiff > 0
      ? Math.round((spreadDiff / highestRate) * 100)
      : 0;

  const lowestMandi = comparisonData.find((d) => d.isLowest);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/mandi-rates" className="hover:text-[#0B5FA5]">Wholesale Terminal</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Mandi Price Spread Analyzer</span>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3.5 py-1 text-xs font-bold text-[#0B5FA5] uppercase tracking-wider mb-2">
              <Scale className="h-3.5 w-3.5 text-[#39A9E8]" /> APMC & Terminal Price Spread Analyzer
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F] font-heading">
              Compare Wholesale Mandi Rates Side-by-Side
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Analyze authentic wholesale auction rates across registered mandis in Delhi, Uttar Pradesh, and Haryana. Real market rates only—zero synthetic estimations.
            </p>
          </div>

          {/* Quick Date Tag */}
          <div className="shrink-0 flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-700">
            <Calendar className="h-4 w-4 text-[#0B5FA5]" />
            <div>
              <div className="font-bold text-slate-900">Active Mandi Session</div>
              <div className="text-[11px] text-slate-500">Verified APMC Quotations</div>
            </div>
          </div>
        </div>

        {/* Commodity & State Selectors */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Select Verified Commodity:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0B5FA5] focus:outline-hidden"
            >
              {uniqueProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              State / Region:
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#0B5FA5] focus:outline-hidden"
            >
              <option value="All States">All Mandis (Delhi, UP & Haryana)</option>
              <option value="Delhi">Delhi Only (9 Mandis)</option>
              <option value="Uttar Pradesh">Uttar Pradesh Only (3 Mandis)</option>
              <option value="Haryana">Haryana Only (4 Mandis)</option>
            </select>
          </div>

          {/* Unit notice */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-center gap-2 rounded-2xl bg-[#EAF5FC]/60 border border-[#39A9E8]/30 p-3 text-xs text-[#073B6F]">
            <ShieldCheck className="h-5 w-5 text-[#0B5FA5] shrink-0" />
            <span className="leading-tight">
              Comparing authentic wholesale lot quotes in <strong>{activeProduct?.unit || 'wholesale units'}</strong>.
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
          Loading verified mandi rate data...
        </div>
      ) : comparisonData.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/50 p-8 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-amber-600 mb-2" />
          <h3 className="text-sm font-black text-amber-900">
            Data currently unavailable for selected commodity & state
          </h3>
          <p className="mt-1 text-xs text-amber-700 max-w-md mx-auto">
            KiranaMart247 does not synthesize or estimate rates when a market has no verified session. Choose another commodity or reset the region filter.
          </p>
          <button
            onClick={() => setSelectedState('All States')}
            className="mt-4 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5]"
          >
            Show All Mandis
          </button>
        </div>
      ) : (
        <>
          {/* KPI Metric Cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Lowest Rate Card */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Lowest Mandi Rate</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                  Best Procurement
                </span>
              </div>
              <div className="mt-3 text-2xl sm:text-3xl font-black text-emerald-700 font-heading">
                ₹{lowestRate.toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-emerald-800 font-semibold truncate">
                {lowestMandi ? `${lowestMandi.mandiName} (${lowestMandi.city})` : 'Registered Mandi'}
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
                Across active quotations
              </div>
            </div>

            {/* Average Rate */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Rate</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-600">
                  Market Benchmark
                </span>
              </div>
              <div className="mt-3 text-2xl sm:text-3xl font-black text-slate-800 font-heading">
                ₹{avgRate.toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Mean wholesale quote
              </div>
            </div>

            {/* Spread / Potential Savings */}
            <div className="rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-br from-[#EAF5FC] to-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#073B6F] uppercase tracking-wider">Inter-Mandi Spread</span>
                {savingsPct > 0 && (
                  <span className="rounded-full bg-[#073B6F] px-2 py-0.5 text-[10px] font-black text-white">
                    Save {savingsPct}%
                  </span>
                )}
              </div>
              <div className="mt-3 text-2xl sm:text-3xl font-black text-[#073B6F] font-heading">
                ₹{spreadDiff.toFixed(2)}
              </div>
              <div className="mt-1 text-xs text-[#0B5FA5] font-semibold">
                Per {activeProduct?.unit || 'unit'} spread
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
                    Verified Rates (₹/{activeProduct?.unit || 'unit'})
                  </h2>
                  <p className="text-xs text-slate-500">Real auction rate distribution across reporting mandis</p>
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
                  <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                      dataKey="mandiName"
                      tick={{ fill: '#64748B', fontSize: 10 }}
                      tickLine={false}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis
                      tick={{ fill: '#64748B', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[Math.floor(lowestRate * 0.9), Math.ceil(highestRate * 1.05)]}
                    />
                    <Tooltip
                      formatter={(value: any) => [`₹${Number(value).toFixed(2)} / ${activeProduct?.unit}`, 'Quoted Rate']}
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
                  <h2 className="text-lg font-black text-[#073B6F] font-heading">Mandi Comparison Breakdown</h2>
                  <p className="text-xs text-slate-500">Ranked by procurement cost</p>
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
                            <div className="text-[11px] text-slate-400">
                              {mandi.city}, {mandi.state}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-slate-900">
                            ₹{mandi.rate.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            per {mandi.unit}
                            {mandi.normalizedText && (
                              <span className="block font-bold text-sky-700">
                                {mandi.normalizedText}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {activeProduct && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#073B6F] hover:bg-[#0B5FA5] py-3 text-xs font-bold text-white shadow-md transition"
                  >
                    View {activeProduct.name} Mandi Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
