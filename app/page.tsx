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
  Bot,
  Layers,
  Search,
} from 'lucide-react';
import { MandiSelector } from '@/components/mandis/MandiSelector';
import { ProductCard } from '@/components/ProductCard';
import { RateTrendBadge } from '@/components/RateTrendBadge';

export const revalidate = 60; // Refresh cache every minute

export default async function HomePage() {
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
        take: 6,
        orderBy: { displayOrder: 'asc' },
      }),
      prisma.mandiRate.findMany({
        where: { active: true },
        include: {
          product: { include: { category: true, brand: true } },
          mandi: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: 8,
      }),
      prisma.mandiRate.groupBy({
        by: ['direction'],
        where: { active: true },
        _count: { direction: true },
      }),
      prisma.mandiRate.findMany({
        where: { active: true, direction: Direction.RISING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'desc' },
        take: 4,
      }),
      prisma.mandiRate.findMany({
        where: { active: true, direction: Direction.FALLING },
        include: { product: true, mandi: true },
        orderBy: { percentageChange: 'asc' },
        take: 4,
      }),
    ]);

  const summary = {
    rising: rateSummary.find((item) => item.direction === Direction.RISING)?._count.direction ?? 0,
    falling: rateSummary.find((item) => item.direction === Direction.FALLING)?._count.direction ?? 0,
    stable: rateSummary.find((item) => item.direction === Direction.STABLE)?._count.direction ?? 0,
  };
  const totalTracked = summary.rising + summary.falling + summary.stable;

  return (
    <main className="min-h-screen bg-[#F7FAFC] text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5FC]/50 to-transparent py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              {/* Brand Tagline Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#39A9E8]/40 bg-[#EAF5FC] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">
                <Sparkles className="h-3.5 w-3.5 text-[#39A9E8]" />
                Today&apos;s Wholesale Rates & Kirana Mandi
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-[#073B6F] sm:text-5xl lg:text-6xl">
                Daily Kirana Mandi Rates.{' '}
                <span className="block text-[#0B5FA5]">Better Buying Decisions.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg leading-relaxed">
                Track wholesale mandi prices, compare market rates, and shop essential kirana products — all in one unified platform.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/mandi-rates"
                  className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#0B5FA5]"
                >
                  View Today&apos;s Mandi Rates <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-[#073B6F] shadow-sm transition hover:border-[#39A9E8]"
                >
                  <ShoppingBag className="h-4 w-4 text-[#39A9E8]" />
                  Shop Kirana Products
                </Link>
              </div>

              {/* Mandi Selector in Hero */}
              <div className="mt-8 max-w-md">
                <MandiSelector variant="hero" />
              </div>
            </div>

            {/* Market Snapshot Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Live Session
                  </span>
                  <h2 className="text-2xl font-black text-[#073B6F]">Today&apos;s Market</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#0B5FA5]">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>

              {/* Metric Counters */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Tracked</div>
                  <div className="mt-1 text-2xl font-black text-[#073B6F]">{totalTracked}</div>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase">Rising</div>
                  <div className="mt-1 text-2xl font-black text-emerald-600">
                    {summary.rising}
                  </div>
                </div>
                <div className="rounded-2xl border border-red-100 bg-red-50 p-3">
                  <div className="text-[11px] font-bold text-red-700 uppercase">Falling</div>
                  <div className="mt-1 text-2xl font-black text-red-600">
                    {summary.falling}
                  </div>
                </div>
              </div>

              {/* Movement Preview Rows */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center justify-between rounded-xl bg-[#F7FAFC] p-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <TrendingUp className="h-4 w-4 text-emerald-600" /> Top Gainer Today
                  </div>
                  <div className="font-bold text-emerald-600">
                    {topGainers[0]
                      ? `${topGainers[0].product.name} (+${Number(topGainers[0].percentageChange).toFixed(1)}%)`
                      : 'None'}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#F7FAFC] p-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <TrendingDown className="h-4 w-4 text-red-600" /> Top Loser Today
                  </div>
                  <div className="font-bold text-red-600">
                    {topLosers[0]
                      ? `${topLosers[0].product.name} (${Number(topLosers[0].percentageChange).toFixed(1)}%)`
                      : 'None'}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/mandi-rates"
                  className="flex items-center justify-center gap-2 text-xs font-bold text-[#0B5FA5] hover:underline"
                >
                  View complete rate board with 30+ commodities <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP GAINERS & TOP LOSERS DUAL SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Top Gainers */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-800">Today&apos;s Top Gainers</h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Bullish Rates
              </span>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {topGainers.map((r) => (
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
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-red-50">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-red-100 p-2 text-red-700">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-800">Today&apos;s Top Losers</h3>
              </div>
              <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
                Discount Movement
              </span>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {topLosers.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link href={`/products/${r.product.slug}`} className="font-bold text-[#073B6F] hover:underline text-sm">
                      {r.product.name}
                    </Link>
                    <div className="text-xs text-slate-500">{r.mandi.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 text-sm">₹{Number(r.currentRate).toFixed(2)}/{r.unit}</div>
                    <div className="text-xs font-bold text-red-600">
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

      {/* 3. POPULAR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Browse Catalog</span>
            <h2 className="text-2xl font-black text-[#073B6F]">Popular Categories</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#0B5FA5] hover:underline">
            All Categories →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?categoryId=${cat.id}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F]">
                <Layers className="h-6 w-6" />
              </div>
              <span className="mt-3 text-xs font-bold text-slate-800 line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. TODAY'S MANDI RATES BOARD PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">Market Board</span>
              <h2 className="text-2xl font-black text-[#073B6F]">Latest Mandi Rates</h2>
            </div>
            <Link
              href="/mandi-rates"
              className="inline-flex items-center gap-2 rounded-full bg-[#EAF5FC] px-5 py-2.5 text-xs font-bold text-[#073B6F] hover:bg-[#073B6F] hover:text-white transition"
            >
              Open Full Rate Board <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-[#F7FAFC] text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Commodity</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Mandi</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Today&apos;s Rate</th>
                  <th className="px-4 py-3">Previous</th>
                  <th className="px-4 py-3">Change</th>
                  <th className="px-4 py-3 rounded-r-xl">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rates.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      <Link href={`/products/${row.product.slug}`} className="hover:underline">
                        {row.product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{row.product.category.name}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-700">{row.mandi.name}</td>
                    <td className="px-4 py-3.5">{row.unit}</td>
                    <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                      ₹{Number(row.currentRate).toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      ₹{Number(row.previousRate).toFixed(2)}
                    </td>
                    <td className={`px-4 py-3.5 font-bold ${row.direction === Direction.RISING ? 'text-emerald-600' : row.direction === Direction.FALLING ? 'text-red-600' : 'text-slate-500'}`}>
                      ₹{Number(row.absoluteChange).toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <RateTrendBadge direction={row.direction} percentage={Number(row.percentageChange)} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. POPULAR KIRANA SHOP PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">Online Shopping</span>
            <h2 className="text-2xl font-black text-[#073B6F]">Featured Kirana Products</h2>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#0B5FA5] hover:underline">
            View All Products →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {popularProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              slug={p.slug}
              brand={p.brand}
              category={p.category}
              unit={p.unit}
              retailPrice={Number(p.retailPrice)}
              minimumQuantity={p.minimumQuantity}
              maximumQuantity={p.maximumQuantity}
              images={p.images}
            />
          ))}
        </div>
      </section>

      {/* 6. XYON AI ASSISTANT PROMO */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] p-8 sm:p-12 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#39A9E8]">
                <Bot className="h-4 w-4 text-[#72B82A]" /> Meet Xyon
              </div>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Instant Mandi Rate Intelligence at your Fingertips
              </h2>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed max-w-xl">
                Ask questions in Hindi, English, or Hinglish like &quot;What is today&apos;s Basmati rice rate in Delhi?&quot; or &quot;Which mandi has cheapest mustard oil?&quot; — powered by live verified PostgreSQL market data.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">🔍 Real-time Rate Verification</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">📊 Mandi Comparisons</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">🛒 Cart & Order Assistant</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20">
              <div className="text-xs font-bold uppercase tracking-wider text-[#39A9E8]">Try Asking:</div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="rounded-xl bg-white/10 p-2.5">💬 &quot;What is today&apos;s wheat rate in Azadpur?&quot;</div>
                <div className="rounded-xl bg-white/10 p-2.5">💬 &quot;Which commodities are rising today?&quot;</div>
                <div className="rounded-xl bg-white/10 p-2.5">💬 &quot;Show me Amul products&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">Seamless Workflow</span>
          <h2 className="mt-2 text-3xl font-black text-[#073B6F]">How KiranaMart247 Works</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F] font-black text-xl">
              1
            </div>
            <h3 className="mt-6 text-lg font-bold text-slate-800">Track Daily Rates</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Select your local wholesale mandi to view live auction rates, price spreads, and daily market movements.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#0B5FA5] font-black text-xl">
              2
            </div>
            <h3 className="mt-6 text-lg font-bold text-slate-800">Analyze Market Trends</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Examine historical price charts and set price alerts to receive immediate notifications when rates meet your target.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#39A9E8] font-black text-xl">
              3
            </div>
            <h3 className="mt-6 text-lg font-bold text-slate-800">Shop Kirana Essentials</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Order wholesale staples, dairy, and grocery items directly with automated WhatsApp order status tracking.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
