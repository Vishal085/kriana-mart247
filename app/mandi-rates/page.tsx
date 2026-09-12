'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  MapPin,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useMandi } from '@/context/MandiContext';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import { PriceAlertModal } from '@/components/mandis/PriceAlertModal';
import { MandiRateRowSkeleton } from '@/components/ui/Skeleton';
import { MandiCommodityRowAction } from '@/components/mandis/MandiCommodityRowAction';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';
import { normalizeRate, getRateSourceMeta } from '@/lib/rates';

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
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedMandiId, setSelectedMandiId] = useState<string>('');
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [unitFilter, setUnitFilter] = useState('');
  const [direction, setDirection] = useState('');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'rate' | 'change' | 'changePercent' | 'name'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Dynamically compute states from active mandis in database
  const availableStates = useMemo(() => {
    const countsByState: Record<string, number> = {};
    for (const m of mandis) {
      const st = m.state || 'Delhi';
      countsByState[st] = (countsByState[st] || 0) + 1;
    }
    const list = Object.entries(countsByState).map(([st, cnt]) => ({
      id: st,
      label: `${st} (${cnt} Mandis)`,
    }));
    return [
      { id: '', label: `All Regions (${mandis.length} Mandis)` },
      ...list,
    ];
  }, [mandis]);

  // Filter mandis based on selected state
  const stateFilteredMandis = useMemo(() => {
    if (!selectedState) return mandis;
    return mandis.filter(
      (m) => m.state?.toLowerCase() === selectedState.toLowerCase()
    );
  }, [mandis, selectedState]);

  // Handle state filter change
  const handleStateChange = (stateVal: string) => {
    setSelectedState(stateVal);
    // If current selected mandi is not in new state, reset it
    if (stateVal && selectedMandiId) {
      const match = mandis.find(
        (m) => m.id === selectedMandiId && m.state?.toLowerCase() === stateVal.toLowerCase()
      );
      if (!match) setSelectedMandiId('');
    }
  };

  const fetchRates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(selectedMandiId ? { mandiId: selectedMandiId } : {}),
        ...(selectedState ? { state: selectedState } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(unitFilter ? { unit: unitFilter } : {}),
        ...(direction ? { direction } : {}),
        ...(search ? { search } : {}),
        sortBy,
        sortOrder,
        limit: '60',
      });

      const [ratesRes, summaryRes, catsRes] = await Promise.all([
        fetch(`/api/rates?${params.toString()}`),
        fetch(`/api/rates/today${selectedMandiId ? `?mandiId=${selectedMandiId}` : ''}`),
        fetch('/api/rates/categories'),
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
  }, [selectedState, selectedMandiId, categoryId, unitFilter, direction, sortBy, sortOrder]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRates();
  };

  // Helper to categorize market type
  const getMarketTypeBadge = (mandiName: string) => {
    const name = mandiName.toLowerCase();
    if (name.includes('apmc') || name.includes('azadpur') || name.includes('narela') || name.includes('okhla') || name.includes('ghazipur') || name.includes('keshopur')) {
      return { label: 'APMC Terminal', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
    if (name.includes('naya bazar') || name.includes('khari baoli')) {
      return { label: 'Wholesale Hub', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
    }
    return { label: 'Grain Mandi', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#073B6F]">Wholesale Mandi Terminal</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <h1 className="text-3xl font-black text-[#073B6F]">
              Wholesale Kirana Mandi Terminal
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Market Intelligence
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            State-wise physical mandi rates, authentic APMC & trade chamber auction records with per-kg normalized spreads.
          </p>
        </div>

        {/* State Selection Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {availableStates.map((st) => (
            <button
              key={st.id}
              onClick={() => handleStateChange(st.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-xs ${
                selectedState === st.id
                  ? 'bg-[#073B6F] text-white shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mandi Quick Selector */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#0B5FA5]" />
          <span className="text-xs font-bold text-slate-700">Filter by Specific Market:</span>
          <select
            value={selectedMandiId}
            onChange={(e) => setSelectedMandiId(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#073B6F] outline-none shadow-xs focus:border-[#39A9E8]"
          >
            <option value="">All Markets in {selectedState || 'Delhi-NCR'} ({stateFilteredMandis.length})</option>
            {stateFilteredMandis.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.city}, {m.state})
              </option>
            ))}
          </select>
        </div>

        {selectedMandiId && (
          <button
            onClick={() => setSelectedMandiId('')}
            className="text-xs font-bold text-[#0B5FA5] hover:underline"
          >
            Show All Mandis in {selectedState || 'Region'} ✕
          </button>
        )}
      </div>

      {/* Market Summary Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tracked Quotes</span>
            <BarChart3 className="h-4 w-4 text-[#0B5FA5]" />
          </div>
          <div className="mt-2 text-2xl font-black text-[#073B6F]">{summary.total}</div>
          <p className="mt-1 text-[11px] text-slate-400">Authentic auction lots</p>
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
          <p className="mt-1 text-[11px] text-emerald-600/70">Upward market pressure</p>
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
          <p className="mt-1 text-[11px] text-red-600/70">Discounted procurement</p>
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
            <span className="text-[11px] font-bold uppercase tracking-wider">Stable Rates</span>
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-700">{summary.stable}</div>
          <p className="mt-1 text-[11px] text-slate-400">Zero price variation</p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mandi-filter-grid grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search commodity or variety..."
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
            <option value="">All Mandi Commodities</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Unit Filter */}
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#39A9E8]"
          >
            <option value="">All Packaging Units</option>
            <option value="50kg Bag">50kg Wholesale Bori</option>
            <option value="15 Litre Tin">15L Wholesale Tin</option>
            <option value="10kg Bag">10kg Bag</option>
            <option value="1kg Bag">1kg Pack</option>
            <option value="500g Bag">500g Pack</option>
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
            <option value="updatedAt-desc">Recently Quoted</option>
            <option value="rate-desc">Highest Rate First</option>
            <option value="rate-asc">Lowest Rate First</option>
            <option value="changePercent-desc">Biggest Gainers</option>
            <option value="changePercent-asc">Biggest Losers</option>
            <option value="name-asc">Commodity Name A-Z</option>
          </select>

          <button
            onClick={() => {
              setSelectedState('');
              setSelectedMandiId('');
              setSearch('');
              setCategoryId('');
              setUnitFilter('');
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
                <th className="px-4 py-3.5">Commodity & Variety</th>
                <th className="px-4 py-3.5">Mandi / State</th>
                <th className="px-4 py-3.5">Market Type</th>
                <th className="px-4 py-3.5">Wholesale Rate (Lot Unit)</th>
                <th className="px-4 py-3.5">Normalized Equivalent</th>
                <th className="px-4 py-3.5">Previous</th>
                <th className="px-4 py-3.5">Movement</th>
                <th className="px-4 py-3.5">Source & Verification</th>
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
              {rates.map((row) => {
                const norm = normalizeRate(row.currentRate, row.unit);
                const sourceMeta = getRateSourceMeta(row);
                const marketType = getMarketTypeBadge(row.mandi.name);

                return (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition">
                    {/* Commodity */}
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/products/${row.product.slug}`}
                        className="font-bold text-[#073B6F] hover:underline flex flex-col"
                      >
                        <span>{row.product.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {row.product.category?.name || 'Kirana Commodity'}
                        </span>
                      </Link>
                    </td>

                    {/* Mandi / State */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-800">{row.mandi.name}</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {row.mandi.city}, {row.mandi.state}
                      </div>
                    </td>

                    {/* Market Type */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold ${marketType.bg}`}>
                        {marketType.label}
                      </span>
                    </td>

                    {/* Wholesale Rate (Lot Unit) */}
                    <td className="px-4 py-3.5">
                      <div className="font-black text-slate-900 text-sm">
                        ₹{Number(row.currentRate).toFixed(2)}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">
                        per {row.unit}
                      </div>
                    </td>

                    {/* Normalized Equivalent */}
                    <td className="px-4 py-3.5">
                      {norm.displayText ? (
                        <span className="inline-flex rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-800">
                          {norm.displayText}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Previous Rate */}
                    <td className="px-4 py-3.5 text-slate-500 font-medium">
                      ₹{Number(row.previousRate).toFixed(2)}
                    </td>

                    {/* Movement */}
                    <td className="px-4 py-3.5">
                      <RateTrendBadge
                        direction={row.direction}
                        percentage={Number(row.percentageChange)}
                        size="sm"
                      />
                    </td>

                    {/* Source & Verification Status */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            sourceMeta.statusColor === 'emerald'
                              ? 'bg-emerald-50 text-emerald-700'
                              : sourceMeta.statusColor === 'blue'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {sourceMeta.statusLabel}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {sourceMeta.freshnessLabel}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
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
                        <MandiCommodityRowAction
                          product={row.product}
                          mandiRate={Number(row.currentRate)}
                          unit={row.unit}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rates.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="mx-auto flex max-w-md flex-col items-center">
                      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                      <p className="text-sm font-bold text-slate-700">
                        Data currently unavailable for selected mandi & filter
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        KiranaMart247 never generates synthetic or fake prices. Rates appear once authentic APMC or trade chamber market reports are verified.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedState('');
                          setSelectedMandiId('');
                          setCategoryId('');
                          setSearch('');
                          setUnitFilter('');
                        }}
                        className="mt-4 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5]"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compare Mandis Floating CTA Banner */}
      <div className="compare-banner mt-8 rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="text-lg font-black font-heading">Need to analyze mandi price spreads?</h3>
          <p className="text-xs text-slate-200 mt-0.5">
            Compare wholesale rates across all 16 Delhi, UP, and Haryana APMC & terminal mandis side-by-side with live spreads.
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

      {/* Authoritative Sources & Methodology Disclaimer */}
      <MandiSourcesDisclaimer currentMandiName={selectedMandi?.name} />

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
