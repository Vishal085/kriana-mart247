import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Direction } from '@prisma/client';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ShoppingBag,
  Store,
  ShieldCheck,
  Sparkles,
  Search,
  Truck,
  CreditCard,
  Layers,
  Bot,
  Scale,
  Activity,
  Bookmark,
  Building2,
  MapPin,
} from 'lucide-react';
import { MandiSelector } from '@/components/mandis/MandiSelector';
import { ProductCard } from '@/components/ProductCard';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';
import { normalizeRate, getRateSourceMeta } from '@/lib/rates';
import { MANDI_COMMODITY_CATEGORIES, RETAIL_ONLY_CATEGORIES } from '@/services/rates.service';

export const revalidate = 60; // Refresh cache every minute

export default async function HomePage() {
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
  };

  const [categories, popularProducts, mandis, rates, rateSummary, topGainers, topLosers] =
    await Promise.all([
      prisma.category.findMany({
        where: { active: true },
        take: 8,
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.product.findMany({
        where: { active: true },
        include: {
          brand: true,
          category: true,
          images: { where: { active: true }, take: 1 },
        },
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mandi.findMany({
        where: { active: true },
        include: {
          _count: { select: { rates: true } },
        },
        take: 6,
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.mandiRate.findMany({
        where: mandiCommodityWhere,
        include: {
          product: { include: { category: true, brand: true } },
          mandi: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: 10,
      }),
      prisma.mandiRate.groupBy({
        by: ['direction'],
        where: mandiCommodityWhere,
        _count: { direction: true },
      }),
      prisma.mandiRate.findMany({
        where: { ...mandiCommodityWhere, direction: Direction.RISING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'desc' },
        take: 5,
      }),
      prisma.mandiRate.findMany({
        where: { ...mandiCommodityWhere, direction: Direction.FALLING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'asc' },
        take: 5,
      }),
    ]);

  const summary = {
    rising: rateSummary.find((item: any) => item.direction === Direction.RISING)?._count.direction ?? 0,
    falling: rateSummary.find((item: any) => item.direction === Direction.FALLING)?._count.direction ?? 0,
    stable: rateSummary.find((item: any) => item.direction === Direction.STABLE)?._count.direction ?? 0,
  };
  const totalTracked = summary.rising + summary.falling + summary.stable;

  return (
    <main className="min-h-screen bg-[#F7FAFC] text-slate-800">
      {/* 1. HERO SECTION — WHOLESALE MANDI INTELLIGENCE TERMINAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5FC]/90 via-[#F7FAFC] to-[#F7FAFC] py-10 lg:py-16 border-b border-slate-200/60">
        {/* Ambient decorative glow orbs */}
        <div className="ambient-orb -top-20 -left-20 h-96 w-96 bg-sky-300/30 animate-float-slow" />
        <div className="ambient-orb top-10 right-0 h-80 w-80 bg-emerald-300/25 animate-pulse-subtle" />
        <div className="ambient-orb -bottom-20 left-1/3 h-72 w-72 bg-blue-300/20 animate-float-slow" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              {/* Primary Identity Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0B5FA5]/30 bg-white/80 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#073B6F] shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Wholesale Mandi Spot Rate & Price Intelligence Terminal</span>
              </div>

              {/* Primary Headline & Supporting Subtitle */}
              <h1 className="hero-heading mt-4 text-3xl font-black tracking-tight text-[#073B6F] sm:text-5xl lg:text-6xl">
                Live Wholesale Mandi Rates.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0B5FA5] via-[#39A9E8] to-[#073B6F]">
                  Spot Intelligence & Spreads.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Track physical mandi spot prices, APMC auction movements, inter-mandi spreads, and verified market intelligence across Delhi-NCR, Uttar Pradesh, and Haryana.
              </p>

              {/* Priority 2 & 3: State & Market/Mandi Selection Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-500 text-[11px] uppercase mr-1">Region:</span>
                {[
                  { name: 'All Mandis', href: '/mandi-rates' },
                  { name: 'Delhi APMC', href: '/mandi-rates?state=Delhi' },
                  { name: 'Uttar Pradesh', href: '/mandi-rates?state=Uttar+Pradesh' },
                  { name: 'Haryana', href: '/mandi-rates?state=Haryana' },
                ].map((st) => (
                  <Link
                    key={st.name}
                    href={st.href}
                    className="rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/90 px-3 py-1 font-bold text-slate-700 hover:border-[#39A9E8] hover:text-[#073B6F] hover:shadow-xs transition-all duration-200"
                  >
                    {st.name}
                  </Link>
                ))}
              </div>

              {/* Priority 4: Commodity Search Form */}
              <div className="mt-5 max-w-xl">
                <form
                  action="/mandi-rates"
                  method="GET"
                  className="relative flex items-center shadow-[0_4px_24px_-4px_rgba(7,59,111,0.08)] rounded-2xl bg-white border border-slate-200/90 p-1.5 focus-within:border-[#39A9E8] focus-within:ring-3 focus-within:ring-[#39A9E8]/20 transition-all duration-200"
                >
                  <Search className="h-5 w-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search wholesale commodity: 'Basmati Rice', 'Mustard Oil', 'Wheat'..."
                    className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md hover:brightness-105 transition-all duration-200 shrink-0 cursor-pointer active:scale-95"
                  >
                    Track Rate
                  </button>
                </form>
              </div>

              {/* Priority 5: Major Mandi Category Filter Chips */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-400 text-[11px] uppercase mr-1">Wholesale:</span>
                {[
                  { name: 'Wheat & Grains', href: '/mandi-rates?category=atta-maida-suji' },
                  { name: 'Basmati Rice', href: '/mandi-rates?category=rice' },
                  { name: 'Mustard & Edible Oil', href: '/mandi-rates?category=cooking-oil' },
                  { name: 'Dal & Pulses', href: '/mandi-rates?category=dal-pulses' },
                  { name: 'Sugar & Salt', href: '/mandi-rates?category=sugar-salt-jaggery' },
                  { name: 'Spices', href: '/mandi-rates?category=masala-spices' },
                ].map((pill) => (
                  <Link
                    key={pill.name}
                    href={pill.href}
                    className="rounded-full bg-white/90 border border-slate-200/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 hover:border-[#39A9E8] hover:text-[#073B6F] hover:bg-sky-50/50 transition-all duration-200"
                  >
                    {pill.name}
                  </Link>
                ))}
              </div>

              {/* Terminal Quick CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/mandi-rates"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#073B6F] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#0B5FA5] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4 text-[#39A9E8]" />
                  Open Live Rate Board
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#073B6F] shadow-2xs transition-all duration-200 hover:border-[#39A9E8] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <Scale className="h-4 w-4 text-[#0B5FA5]" />
                  Compare Mandis
                </Link>
                <Link
                  href="/trends"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-[#39A9E8] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <BarChart3 className="h-4 w-4 text-[#0B5FA5]" />
                  Price Trends
                </Link>
              </div>
            </div>

            {/* Market Snapshot Terminal Card (Right Column) */}
            <div className="market-card rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-[0_12px_32px_-6px_rgba(7,59,111,0.08)] hover:shadow-[0_16px_40px_-6px_rgba(7,59,111,0.12)] transition-all duration-300">
              <div className="market-card-header flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Live Session Metrics
                  </span>
                  <h2 className="text-xl font-black text-[#073B6F]">APMC Market Pulse</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF5FC] to-sky-100 text-[#0B5FA5] shadow-2xs">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>

              {/* Mandi Selector directly inside Hero Snapshot */}
              <div className="mt-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Active Mandi Hub:
                </div>
                <MandiSelector variant="hero" />
              </div>

              {/* Priority 6: Rising / Falling / Stable Counters */}
              <div className="market-card-stats mt-4 grid grid-cols-3 gap-2.5 text-center">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tracked</div>
                  <div className="stat-number mt-0.5 text-xl font-black text-[#073B6F]">{totalTracked}</div>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Rising (Bull)</div>
                  <div className="stat-number mt-0.5 text-xl font-black text-emerald-600">
                    {summary.rising}
                  </div>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-2.5">
                  <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Falling (Bear)</div>
                  <div className="stat-number mt-0.5 text-xl font-black text-rose-600">
                    {summary.falling}
                  </div>
                </div>
              </div>

              {/* Movement Preview Rows */}
              <div className="market-card-movement mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Top Gainer</span>
                  </div>
                  <div className="font-bold text-emerald-600 truncate max-w-[170px] text-right">
                    {topGainers[0]
                      ? `${topGainers[0].product.name} (+${Number(topGainers[0].percentageChange).toFixed(1)}%)`
                      : 'None'}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <TrendingDown className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span>Top Discount</span>
                  </div>
                  <div className="font-bold text-rose-600 truncate max-w-[170px] text-right">
                    {topLosers[0]
                      ? `${topLosers[0].product.name} (${Number(topLosers[0].percentageChange).toFixed(1)}%)`
                      : 'None'}
                  </div>
                </div>
              </div>

              {/* Priority 7: Watchlist and Full Board Links */}
              <div className="market-card-footer mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <Link
                  href="/watchlist"
                  className="flex items-center gap-1 text-slate-600 hover:text-[#0B5FA5]"
                >
                  <Bookmark className="h-3.5 w-3.5 text-[#0B5FA5]" />
                  <span>Mandi Watchlist</span>
                </Link>
                <Link
                  href="/mandi-rates"
                  className="flex items-center gap-1 text-[#0B5FA5] hover:underline font-bold"
                >
                  <span>Full 30+ Board</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRIORITY 1 & 10: TODAY'S MANDI RATES BOARD (PRIMARY TERMINAL VIEW) */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">
                  Physical Mandi Terminal
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Verified APMC Data
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#073B6F] mt-1">
                Latest Mandi Wholesale Rates
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/mandi-rates"
                className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5] transition shadow-xs"
              >
                Open Full Rate Board <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Commodity & Variety</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Mandi / Yard</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Wholesale Rate</th>
                  <th className="px-4 py-3">Normalized (Kg)</th>
                  <th className="px-4 py-3">Previous</th>
                  <th className="px-4 py-3">Change</th>
                  <th className="px-4 py-3 rounded-r-xl">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rates.map((row: any) => {
                  const norm = normalizeRate(row.currentRate, row.unit);
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                        <Link href={`/products/${row.product.slug}`} className="hover:underline">
                          {row.product.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600">{row.product.category?.name || 'Staples'}</td>
                      <td className="px-4 py-3.5 font-medium text-slate-700">
                        <div>{row.mandi.name}</div>
                        <div className="text-[10px] text-slate-400">{row.mandi.city}</div>
                      </td>
                      <td className="px-4 py-3.5 font-medium text-slate-600">{row.unit}</td>
                      <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                        ₹{Number(row.currentRate).toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5">
                        {norm.displayText ? (
                          <span className="inline-flex rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-800">
                            {norm.displayText}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">
                        ₹{Number(row.previousRate).toFixed(2)}
                      </td>
                      <td
                        className={`px-4 py-3.5 font-bold ${
                          row.direction === Direction.RISING
                            ? 'text-emerald-600'
                            : row.direction === Direction.FALLING
                            ? 'text-rose-600'
                            : 'text-slate-500'
                        }`}
                      >
                        ₹{Number(row.absoluteChange).toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5">
                        <RateTrendBadge direction={row.direction} percentage={Number(row.percentageChange)} size="sm" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. PRIORITY 6 & 8: TOP GAINERS & TOP LOSERS DUAL TERMINAL SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Gainers */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Today&apos;s Top Bullish Movers</h3>
                  <p className="text-[11px] text-slate-400">Upward auction price momentum</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Rising
              </span>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {topGainers.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/products/${r.product.slug}`} className="font-bold text-[#073B6F] hover:underline text-sm">
                      {r.product.name}
                    </Link>
                    <div className="text-xs text-slate-500">{r.mandi.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 text-sm">₹{Number(r.currentRate).toFixed(2)}/{r.unit}</div>
                    <div className="text-xs font-bold text-emerald-600">
                      +{Number(r.percentageChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
              {topGainers.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">No rising commodities recorded today</div>
              )}
            </div>
          </div>

          {/* Top Losers */}
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-rose-50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Today&apos;s Discount Movers</h3>
                  <p className="text-[11px] text-slate-400">Cost reduction / procurement savings</p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                Falling
              </span>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {topLosers.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/products/${r.product.slug}`} className="font-bold text-[#073B6F] hover:underline text-sm">
                      {r.product.name}
                    </Link>
                    <div className="text-xs text-slate-500">{r.mandi.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 text-sm">₹{Number(r.currentRate).toFixed(2)}/{r.unit}</div>
                    <div className="text-xs font-bold text-rose-600">
                      {Number(r.percentageChange).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
              {topLosers.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">No falling commodities recorded today</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRIORITY 8 & 9: PRICE TRENDS & COMPARISON TOOLS CALLOUT */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1: Mandi Price Trends */}
          <div className="rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#39A9E8]">
                <Activity className="h-3.5 w-3.5" />
                Historical Analytics
              </div>
              <h3 className="mt-3 text-xl font-black">Commodity Price Trends & Volatility</h3>
              <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                Inspect 30-day moving averages, price trajectory charts, and high/low auction spreads for all wholesale staples.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/trends"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-[#073B6F] hover:bg-[#EAF5FC] transition shadow-sm"
              >
                <span>Open Price Trends Terminal →</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Cross-Mandi Price Comparison */}
          <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-700">
                <Scale className="h-3.5 w-3.5" />
                Cross-Market Spread
              </div>
              <h3 className="mt-3 text-xl font-black text-[#073B6F]">Mandi Price Comparison Tool</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Compare wholesale rates across Delhi, UP, and Haryana mandis side-by-side to identify the best procurement prices.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B5FA5] transition shadow-sm"
              >
                <span>Launch Compare Tool →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIORITY 3 & 7: REGISTERED WHOLESALE MANDIS DIRECTORY */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">APMC Hubs</span>
            <h2 className="text-2xl font-black text-[#073B6F]">Registered Wholesale Mandis</h2>
          </div>
          <Link href="/mandis" className="text-xs font-bold text-[#0B5FA5] hover:underline flex items-center gap-1">
            View All Mandis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mandis.map((m: any) => (
            <div
              key={m.id}
              className="group rounded-3xl border border-slate-200/70 bg-white/95 backdrop-blur-md p-5.5 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#39A9E8]/60 hover:shadow-[0_16px_32px_-8px_rgba(7,59,111,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF5FC] to-sky-100 text-[#073B6F] shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Store className="h-5 w-5" />
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {m._count?.rates || 16} Commodities
                  </span>
                </div>
                <h3 className="mt-3.5 font-bold text-base text-[#073B6F] group-hover:text-[#0B5FA5] transition-colors">{m.name}</h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">{m.address || `${m.city}, ${m.state}`}</p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/mandis/${m.slug}`}
                  className="font-bold text-[#0B5FA5] hover:underline flex items-center gap-1"
                >
                  Spot Rates <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href={`/mandi-rates?mandiId=${m.id}`}
                  className="rounded-full bg-[#EAF5FC] px-3.5 py-1.5 font-bold text-[#073B6F] hover:bg-[#073B6F] hover:text-white transition-all duration-200 shadow-2xs cursor-pointer"
                >
                  View Quotes →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PRIORITY 10: DATA SOURCES & VERIFICATION DISCLAIMER */}
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
        <MandiSourcesDisclaimer />
      </div>

      {/* 7. PRIORITY 11: OPTIONAL COMMERCE / FEATURED KIRANA PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6 border-t border-slate-200/60 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-[10px] font-bold text-amber-800 mb-1">
              <ShoppingBag className="h-3 w-3" />
              Optional Grocery Procurement
            </div>
            <h2 className="text-2xl font-black text-[#073B6F]">Featured Kirana Products</h2>
            <p className="text-xs text-slate-500 mt-0.5">Order retail & wholesale packaged grocery items directly for home or store delivery.</p>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#0B5FA5] hover:underline">
            View All Products →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {popularProducts.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              brand={p.brand}
              category={p.category}
              unit={p.unit}
              retailPrice={Number(p.retailPrice)}
              mrp={p.mrp ? Number(p.mrp) : null}
              stockQuantity={p.stockQuantity ?? 100}
              weight={p.weight}
              minimumQuantity={p.minimumQuantity}
              maximumQuantity={p.maximumQuantity}
              images={p.images}
            />
          ))}
        </div>
      </section>

      {/* 8. XYON AI ASSISTANT PROMO */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#39A9E8]/40 bg-gradient-to-br from-[#05284D] via-[#073B6F] to-[#0B5FA5] p-8 sm:p-10 text-white shadow-xl">
          {/* Internal ambient orbs */}
          <div className="ambient-orb -right-10 -bottom-10 h-64 w-64 bg-cyan-400/20 animate-pulse-subtle" />
          <div className="ambient-orb -left-10 -top-10 h-64 w-64 bg-emerald-400/15 animate-float-slow" />

          <div className="relative z-10 ai-promo-grid grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#39A9E8] border border-white/20">
                <Bot className="h-4 w-4 text-[#72B82A]" /> Meet Xyon
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-black">
                Instant Mandi Rate Intelligence at your Fingertips
              </h2>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed max-w-xl font-normal">
                Ask questions in Hindi, English, or Hinglish like &quot;What is today&apos;s Basmati rice rate in Delhi?&quot; or &quot;Which mandi has cheapest mustard oil?&quot; — powered by live verified PostgreSQL market data.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 backdrop-blur-xs px-3 py-1 text-slate-200 border border-white/10">🔍 Real-time Rate Verification</span>
                <span className="rounded-full bg-white/10 backdrop-blur-xs px-3 py-1 text-slate-200 border border-white/10">📊 Mandi Comparisons</span>
                <span className="rounded-full bg-white/10 backdrop-blur-xs px-3 py-1 text-slate-200 border border-white/10">🛒 Optional Grocery Orders</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-[#39A9E8]">Try Asking:</div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="rounded-xl bg-white/15 p-2.5 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">💬 &quot;What is today&apos;s wheat rate in Azadpur?&quot;</div>
                <div className="rounded-xl bg-white/15 p-2.5 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">💬 &quot;Which commodities are rising today?&quot;</div>
                <div className="rounded-xl bg-white/15 p-2.5 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">💬 &quot;Show me Mustard oil quotes in Naya Bazar&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW KIRANAMART WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">Transparent Architecture</span>
          <h2 className="mt-2 text-3xl font-black text-[#073B6F]">How KiranaMart Operates</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F] font-black text-lg">
              1
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800">Track Daily Rates</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Select your local wholesale APMC mandi to view live auction rates, price spreads, and daily market movements.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#0B5FA5] font-black text-lg">
              2
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800">Analyze Market Trends</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Examine historical price charts and set price alerts to receive immediate notifications when rates meet your target.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#39A9E8] font-black text-lg">
              3
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800">Procure Wholesale Staples</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Order wholesale staples, dairy, and grocery items directly with automated WhatsApp order status tracking.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
