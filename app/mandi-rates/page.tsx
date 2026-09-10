'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Store,
  ChevronRight,
  Bell,
  Scale,
} from 'lucide-react';
import { useMandi } from '@/context/MandiContext';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import { PriceAlertModal } from '@/components/mandis/PriceAlertModal';
import { MandiRateRowSkeleton } from '@/components/ui/Skeleton';

export default function MandiRatesPage() {
  const { mandis, selectedMandi, selectMandiById } = useMandi();
  const [rates, setRates] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    rising: 0,
    falling: 0,
    stable: 0,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertItem, setAlertItem] = useState<{
    commodityName: string;
    mandiName: string;
    currentPrice: number;
    unit: string;
    productId?: string;
    mandiId?: string;
  } | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [direction, setDirection] = useState('');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'rate' | 'change' | 'changePercent' | 'name'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(selectedMandi ? { mandiId: selectedMandi.id } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(direction ? { direction } : {}),
        ...(search ? { search } : {}),
        sortBy,
        sortOrder,
        limit: '50',
      });

      const [ratesRes, summaryRes, catsRes] = await Promise.all([
        fetch(`/api/rates?${params.toString()}`),
        fetch(`/api/rates/today${selectedMandi ? `?mandiId=${selectedMandi.id}` : ''}`),
        fetch('/api/categories'),
      ]);

      if (ratesRes.ok) {
        const data = await ratesRes.json();
        setRates(data.items || []);
      }
      if (summaryRes.ok) {
        const sumData = await summaryRes.json();
        setSummary({
          total: sumData.total || 0,
          rising: sumData.rising || 0,
          falling: sumData.falling || 0,
          stable: sumData.stable || 0,
        });
      }
      if (catsRes.ok) {
        const catData = await catsRes.json();
        setCategories(catData.categories || []);
      }
    } catch (err) {
      console.error('Failed to load rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [selectedMandi, categoryId, direction, sortBy, sortOrder]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRates();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#073B6F]">Mandi Rates</span>
          </div>
          <h1 className="mt-2 text-3xl font-black text-[#073B6F]">
            Today&apos;s Mandi Wholesale Rates
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Live commodity prices, daily price changes, and auction movements across authorized mandis.
          </p>
        </div>

        {/* Mandi Selector Quick Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Mandi:</label>
          <select
            value={selectedMandi?.id || ''}
            onChange={(e) => {
              if (e.target.value) selectMandiById(e.target.value);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#073B6F] outline-none shadow-sm focus:border-[#39A9E8]"
          >
            {mandis.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Summary Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tracked Items</span>
            <BarChart3 className="h-4 w-4 text-[#0B5FA5]" />
          </div>
          <div className="mt-2 text-2xl font-black text-[#073B6F]">{summary.total}</div>
        </div>

        <button
          onClick={() => setDirection(direction === 'RISING' ? '' : 'RISING')}
          className={`rounded-2xl border p-4 text-left shadow-sm transition ${
            direction === 'RISING'
              ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400'
              : 'border-emerald-100 bg-white hover:bg-emerald-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rising Today</span>
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-600">{summary.rising}</div>
        </button>

        <button
          onClick={() => setDirection(direction === 'FALLING' ? '' : 'FALLING')}
          className={`rounded-2xl border p-4 text-left shadow-sm transition ${
            direction === 'FALLING'
              ? 'border-red-500 bg-red-50 ring-2 ring-red-400'
              : 'border-red-100 bg-white hover:bg-red-50/50'
          }`}
        >
          <div className="flex items-center justify-between text-red-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Falling Today</span>
            <TrendingDown className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-black text-red-600">{summary.falling}</div>
        </button>

        <button
          onClick={() => setDirection(direction === 'STABLE' ? '' : 'STABLE')}
          className={`rounded-2xl border p-4 text-left shadow-sm transition ${
            direction === 'STABLE'
              ? 'border-slate-400 bg-slate-100 ring-2 ring-slate-400'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">Stable</span>
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-700">{summary.stable}</div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search commodity or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#39A9E8] focus:bg-white"
            />
          </form>

          {/* Category Filter */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#39A9E8]"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Direction Filter */}
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#39A9E8]"
          >
            <option value="">All Market Trends</option>
            <option value="RISING">📈 Rising Only</option>
            <option value="FALLING">📉 Falling Only</option>
            <option value="STABLE">➖ Stable Only</option>
          </select>

          {/* Sort By */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split('-') as [any, any];
              setSortBy(sb);
              setSortOrder(so);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#39A9E8]"
          >
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="rate-desc">Highest Rate First</option>
            <option value="rate-asc">Lowest Rate First</option>
            <option value="changePercent-desc">Biggest Gainers</option>
            <option value="changePercent-asc">Biggest Losers</option>
            <option value="name-asc">Commodity Name A-Z</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setCategoryId('');
              setDirection('');
              setSortBy('updatedAt');
              setSortOrder('desc');
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Rates Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Commodity</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Mandi</th>
                <th className="px-4 py-3.5">Unit</th>
                <th className="px-4 py-3.5">Today&apos;s Rate</th>
                <th className="px-4 py-3.5">Previous</th>
                <th className="px-4 py-3.5">Change (₹)</th>
                <th className="px-4 py-3.5">Trend</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && rates.length === 0 && (
                <>
                  <MandiRateRowSkeleton />
                  <MandiRateRowSkeleton />
                  <MandiRateRowSkeleton />
                  <MandiRateRowSkeleton />
                  <MandiRateRowSkeleton />
                </>
              )}
              {rates.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                    <Link
                      href={`/products/${row.product.slug}`}
                      className="hover:underline flex items-center gap-1.5"
                    >
                      {row.product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">
                    {row.product.category.name}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700">
                    {row.mandi.name}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-500">
                    {row.unit}
                  </td>
                  <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                    ₹{Number(row.currentRate).toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-medium">
                    ₹{Number(row.previousRate).toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-3.5 font-bold ${
                      row.direction === 'RISING'
                        ? 'text-emerald-600'
                        : row.direction === 'FALLING'
                        ? 'text-red-600'
                        : 'text-slate-500'
                    }`}
                  >
                    ₹{Number(row.absoluteChange).toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5">
                    <RateTrendBadge
                      direction={row.direction}
                      percentage={Number(row.percentageChange)}
                      size="sm"
                    />
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() =>
                          setAlertItem({
                            commodityName: row.product.name,
                            mandiName: row.mandi.name,
                            currentPrice: Number(row.currentRate),
                            unit: row.unit,
                            productId: row.productId,
                            mandiId: row.mandiId,
                          })
                        }
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition"
                        title="Set Mandi Price Alert"
                        aria-label="Set Mandi Price Alert"
                      >
                        <Bell className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/products/${row.product.slug}`}
                        className="inline-flex items-center rounded-lg bg-[#EAF5FC] px-2.5 py-1 text-[11px] font-bold text-[#0B5FA5] hover:bg-[#073B6F] hover:text-white transition"
                      >
                        Spread →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {rates.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    No commodity rates match your current search/filter parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compare Mandis Floating CTA Banner */}
      <div className="mt-8 rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-lg font-black font-heading">Looking for the lowest rate in Delhi?</h3>
          <p className="text-xs text-slate-200 mt-0.5">
            Compare wholesale rates across all 6 APMC terminal mandis side-by-side with interactive spread charts.
          </p>
        </div>
        <Link
          href="/compare"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-black text-[#073B6F] hover:bg-[#EAF5FC] shadow-md transition"
        >
          <Scale className="h-4 w-4 text-[#0B5FA5]" />
          <span>Open Price Comparison Tool →</span>
        </Link>
      </div>

      {/* Price Alert Modal */}
      {alertItem && (
        <PriceAlertModal
          isOpen={true}
          onClose={() => setAlertItem(null)}
          commodityName={alertItem.commodityName}
          mandiName={alertItem.mandiName}
          currentPrice={alertItem.currentPrice}
          unit={alertItem.unit}
          productId={alertItem.productId}
          mandiId={alertItem.mandiId}
        />
      )}
    </main>
  );
}
