import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Direction } from '@prisma/client';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Store,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  Scale,
  Activity,
  Layers,
  Info,
} from 'lucide-react';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';
import { HistoricalPriceChart } from '@/components/HistoricalPriceChart';
import { MANDI_COMMODITY_CATEGORIES, RETAIL_ONLY_CATEGORIES } from '@/services/rates.service';

export const revalidate = 60; // Refresh every 60 seconds

export const metadata = {
  title: 'Mandi Price Trends & Volatility Terminal • Live Kirana Intelligence | KiranaMart',
  description:
    'Track wholesale commodity price trends, 30-day moving averages, APMC auction volatility, and historical price spreads across registered mandis.',
};

export default async function MandiTrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ commodity?: string; mandiId?: string }>;
}) {
  const { commodity: selectedSlug, mandiId } = await searchParams;

  const mandiCommodityWhere = {
    active: true,
    product: {
      category: {
        slug: {
          in: MANDI_COMMODITY_CATEGORIES,
          notIn: RETAIL_ONLY_CATEGORIES,
        },
      },
    },
    ...(mandiId ? { mandiId } : {}),
  };

  // Fetch commodities, top gainers, top losers, mandis, and active selected commodity
  const [commodities, mandis, topGainers, topLosers, selectedProduct] = await Promise.all([
    prisma.product.findMany({
      where: {
        active: true,
        category: {
          slug: {
            in: MANDI_COMMODITY_CATEGORIES,
            notIn: RETAIL_ONLY_CATEGORIES,
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        unit: true,
        category: { select: { name: true } },
      },
      orderBy: { name: 'asc' },
    }),
    prisma.mandi.findMany({
      where: { active: true },
      select: { id: true, name: true, city: true, state: true },
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.mandiRate.findMany({
      where: { ...mandiCommodityWhere, direction: Direction.RISING },
      include: { product: true, mandi: true },
      orderBy: { percentageChange: 'desc' },
      take: 6,
    }),
    prisma.mandiRate.findMany({
      where: { ...mandiCommodityWhere, direction: Direction.FALLING },
      include: { product: true, mandi: true },
      orderBy: { percentageChange: 'asc' },
      take: 6,
    }),
    selectedSlug
      ? prisma.product.findUnique({
          where: { slug: selectedSlug },
          include: {
            category: true,
            rateHistory: {
              include: { mandi: true },
              orderBy: { date: 'asc' },
              take: 60,
            },
            rates: {
              where: { active: true },
              include: { mandi: true },
              orderBy: { currentRate: 'asc' },
            },
          },
        })
      : prisma.product.findFirst({
          where: {
            active: true,
            category: {
              slug: { in: MANDI_COMMODITY_CATEGORIES, notIn: RETAIL_ONLY_CATEGORIES },
            },
            rateHistory: { some: {} },
          },
          include: {
            category: true,
            rateHistory: {
              include: { mandi: true },
              orderBy: { date: 'asc' },
              take: 60,
            },
            rates: {
              where: { active: true },
              include: { mandi: true },
              orderBy: { currentRate: 'asc' },
            },
          },
        }),
  ]);

  const activeProduct = selectedProduct || commodities[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/mandi-rates" className="hover:text-[#0B5FA5]">Mandi Rates</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#073B6F]">Price Trends & Volatility</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <h1 className="text-3xl font-black text-[#073B6F]">
              Mandi Price Trends & Volatility Terminal
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 shadow-2xs">
              <Activity className="h-3.5 w-3.5 text-[#0B5FA5] animate-pulse" />
              Historical Spot Intelligence
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Analyze multi-session price momentum, 30-day auction spreads, and inter-mandi volatility based on authentic physical lot transactions.
          </p>
        </div>

        {/* Action Button to Compare */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#073B6F] shadow-xs hover:border-[#39A9E8] transition"
          >
            <Scale className="h-4 w-4 text-[#0B5FA5]" />
            <span>Cross-Mandi Compare</span>
          </Link>
          <Link
            href="/mandi-rates"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Live Rate Board</span>
          </Link>
        </div>
      </div>

      {/* Commodity Quick Selector Filter Strip */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#0B5FA5]" />
            <span className="text-xs font-bold text-slate-800">Select Commodity to Analyze:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {commodities.slice(0, 8).map((c: any) => {
              const isSelected = activeProduct?.slug === c.slug;
              return (
                <Link
                  key={c.id}
                  href={`/trends?commodity=${c.slug}${mandiId ? `&mandiId=${mandiId}` : ''}`}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
                    isSelected
                      ? 'bg-[#073B6F] text-white shadow-xs'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Trend Chart Section */}
      {activeProduct && (
        <div className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                  {activeProduct.category?.name || 'Kirana Commodity'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#073B6F]">
                  {activeProduct.name} Price Trajectory
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Historical lot rates recorded per <span className="font-bold text-slate-700">{activeProduct.unit}</span> across terminal APMC mandis.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:border-[#39A9E8] transition"
                >
                  Commodity Details →
                </Link>
              </div>
            </div>

            {/* Historical Price Chart Component */}
            <div className="mt-6">
              <HistoricalPriceChart
                productId={activeProduct.id}
                productName={activeProduct.name}
                unit={activeProduct.unit}
                initialHistory={(activeProduct as any).rateHistory || []}
              />
            </div>

            {/* Active Mandi Quotes for this Commodity */}
            {(activeProduct as any).rates && (activeProduct as any).rates.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    Latest Session Quotes by Mandi
                  </h3>
                  <span className="text-xs text-slate-400">
                    {(activeProduct as any).rates.length} Mandi Hubs
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(activeProduct as any).rates.map((rate: any) => (
                    <div
                      key={rate.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-[#073B6F]">{rate.mandi.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {rate.mandi.city}, {rate.mandi.state}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-sm text-slate-900">
                          ₹{Number(rate.currentRate).toFixed(2)}
                        </div>
                        <RateTrendBadge
                          direction={rate.direction}
                          percentage={Number(rate.percentageChange)}
                          size="sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Top Gainers & Losers Dual Intelligence Board */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Gainers */}
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-50">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Top Bullish Movers</h3>
                <p className="text-[11px] text-slate-400">Highest upward percentage velocity</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Bullish Spread
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {topGainers.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <Link
                    href={`/trends?commodity=${r.product.slug}`}
                    className="font-bold text-[#073B6F] hover:underline text-sm flex items-center gap-1.5"
                  >
                    <span>{r.product.name}</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                  </Link>
                  <div className="text-xs text-slate-500">{r.mandi.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-900 text-sm">
                    ₹{Number(r.currentRate).toFixed(2)}/{r.unit}
                  </div>
                  <div className="text-xs font-bold text-emerald-600">
                    +{Number(r.percentageChange).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
            {topGainers.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No upward commodity movements recorded today
              </div>
            )}
          </div>
        </div>

        {/* Losers */}
        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-rose-50">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Top Discount / Bearish Movers</h3>
                <p className="text-[11px] text-slate-400">Largest procurement discount opportunities</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
              Discount Movement
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {topLosers.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <Link
                    href={`/trends?commodity=${r.product.slug}`}
                    className="font-bold text-[#073B6F] hover:underline text-sm flex items-center gap-1.5"
                  >
                    <span>{r.product.name}</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                  </Link>
                  <div className="text-xs text-slate-500">{r.mandi.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-slate-900 text-sm">
                    ₹{Number(r.currentRate).toFixed(2)}/{r.unit}
                  </div>
                  <div className="text-xs font-bold text-rose-600">
                    {Number(r.percentageChange).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
            {topLosers.length === 0 && (
              <div className="py-6 text-center text-xs text-slate-400">
                No falling commodity movements recorded today
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentic Sources Disclaimer */}
      <div className="mt-10">
        <MandiSourcesDisclaimer />
      </div>
    </main>
  );
}
