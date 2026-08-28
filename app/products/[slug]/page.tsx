import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ChevronRight, ShoppingCart, Heart, ShieldCheck, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { HistoricalPriceChart } from '@/components/HistoricalPriceChart';
import { RateTrendBadge } from '@/components/RateTrendBadge';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      brand: true,
      category: true,
      subCategory: true,
      images: { where: { active: true }, orderBy: { sortOrder: 'asc' } },
      rates: {
        where: { active: true },
        include: { mandi: true },
        orderBy: { currentRate: 'asc' },
      },
      rateHistory: {
        include: { mandi: true },
        orderBy: { date: 'asc' },
        take: 50,
      },
    },
  });

  if (!product) return notFound();

  const lowestRate = product.rates.length > 0 ? product.rates[0] : null;
  const highestRate = product.rates.length > 0 ? product.rates[product.rates.length - 1] : null;
  const priceSpread = lowestRate && highestRate ? Number(highestRate.currentRate) - Number(lowestRate.currentRate) : 0;
  const mainImage = product.images[0]?.url || '/brand/logo.svg';

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-[#0B5FA5]">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?categoryId=${product.categoryId}`} className="hover:text-[#0B5FA5]">
          {product.category.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F] truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Main Product Hero */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: Product Images */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-[#F7FAFC] p-6">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-64 max-w-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-[#F7FAFC] p-2"
                >
                  <img src={img.url} alt={img.altText || product.name} className="max-h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Metadata & Pricing */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="rounded-full bg-[#EAF5FC] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">
              {product.brand?.name || 'Generic Brand'}
            </span>

            <h1 className="mt-3 text-3xl font-black text-[#073B6F] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-2 text-xs text-slate-500 font-medium">
              SKU: <span className="font-mono text-slate-700 font-bold">{product.sku}</span> • Category: <span className="text-[#0B5FA5] font-semibold">{product.category.name}</span>
            </div>

            {/* Clear distinction between Retail Price & Wholesale Rate */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Retail Shop Price
                  </div>
                  <div className="mt-1 text-3xl font-black text-[#073B6F]">
                    ₹{Number(product.retailPrice).toFixed(2)}
                    <span className="text-sm font-semibold text-slate-500"> / {product.unit}</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  Min. Order: <span className="font-bold text-slate-800">{product.minimumQuantity} {product.unit}</span>
                  {product.maximumQuantity && (
                    <div>Max: {product.maximumQuantity} {product.unit}</div>
                  )}
                </div>
              </div>
            </div>

            {product.description && (
              <p className="mt-6 text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Mandi Wholesale Summary Cards */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lowest Mandi Rate
              </div>
              <div className="mt-1 text-base font-black text-emerald-600">
                {lowestRate ? `₹${Number(lowestRate.currentRate).toFixed(2)}` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">{lowestRate?.mandi.name}</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Highest Mandi Rate
              </div>
              <div className="mt-1 text-base font-black text-red-600">
                {highestRate ? `₹${Number(highestRate.currentRate).toFixed(2)}` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">{highestRate?.mandi.name}</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Mandi Spread
              </div>
              <div className="mt-1 text-base font-black text-[#073B6F]">
                {lowestRate && highestRate ? `₹${priceSpread.toFixed(2)}` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500">{product.rates.length} Mandis Tracked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Historical Price Chart */}
      <div className="mt-12">
        <HistoricalPriceChart
          productId={product.id}
          productName={product.name}
          unit={product.unit}
          initialHistory={product.rateHistory}
        />
      </div>

      {/* Mandi Wholesale Rates Table */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5]">Market Comparison</span>
            <h2 className="text-2xl font-black text-[#073B6F]">
              Mandi Wholesale Rates for {product.name}
            </h2>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Mandi Location</th>
                  <th className="px-4 py-3.5">City & State</th>
                  <th className="px-4 py-3.5">Wholesale Rate</th>
                  <th className="px-4 py-3.5">Previous Session</th>
                  <th className="px-4 py-3.5">Change</th>
                  <th className="px-4 py-3.5">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {product.rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      <Link href={`/mandis/${rate.mandi.slug}`} className="hover:underline">
                        {rate.mandi.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{rate.mandi.city}, {rate.mandi.state}</td>
                    <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                      ₹{Number(rate.currentRate).toFixed(2)} / {rate.unit}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-medium">
                      ₹{Number(rate.previousRate).toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-3.5 font-bold ${
                        rate.direction === 'RISING'
                          ? 'text-emerald-600'
                          : rate.direction === 'FALLING'
                          ? 'text-red-600'
                          : 'text-slate-500'
                      }`}
                    >
                      ₹{Number(rate.absoluteChange).toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <RateTrendBadge
                        direction={rate.direction}
                        percentage={Number(rate.percentageChange)}
                        size="sm"
                      />
                    </td>
                  </tr>
                ))}
                {product.rates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      No active mandi rates currently recorded for this commodity.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
