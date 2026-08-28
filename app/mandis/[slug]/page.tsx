import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Store, MapPin, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RateTrendBadge } from '@/components/RateTrendBadge';

export default async function MandiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mandi = await prisma.mandi.findUnique({
    where: { slug, active: true },
    include: {
      rates: {
        where: { active: true },
        include: {
          product: {
            include: { category: true, brand: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  });

  if (!mandi) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/mandis" className="hover:text-[#0B5FA5]">Mandis</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">{mandi.name}</span>
      </div>

      {/* Mandi Profile Banner */}
      <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F]">
              <Store className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#073B6F]">{mandi.name}</h1>
              <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
                <span>{mandi.city}, {mandi.state} {mandi.pincode ? `• PIN: ${mandi.pincode}` : ''}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase font-bold">Active Rates</div>
            <div className="text-2xl font-black text-[#073B6F]">{mandi.rates.length} Items</div>
          </div>
        </div>

        {mandi.description && (
          <p className="mt-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            {mandi.description}
          </p>
        )}
      </div>

      {/* Today's Rates at this Mandi */}
      <div className="mt-8">
        <h2 className="text-2xl font-black text-[#073B6F]">
          Today&apos;s Rates at {mandi.name}
        </h2>

        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-[#EAF5FC] text-[#073B6F] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Commodity</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Unit</th>
                  <th className="px-4 py-3.5">Current Rate</th>
                  <th className="px-4 py-3.5">Previous Rate</th>
                  <th className="px-4 py-3.5">Change</th>
                  <th className="px-4 py-3.5">Trend</th>
                  <th className="px-4 py-3.5 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mandi.rates.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      <Link href={`/products/${row.product.slug}`} className="hover:underline">
                        {row.product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{row.product.category.name}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-500">{row.unit}</td>
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
                      <Link
                        href={`/products/${row.product.slug}`}
                        className="inline-flex items-center rounded-lg bg-[#EAF5FC] px-2.5 py-1 text-[11px] font-bold text-[#0B5FA5] hover:bg-[#073B6F] hover:text-white transition"
                      >
                        View Product →
                      </Link>
                    </td>
                  </tr>
                ))}
                {mandi.rates.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No rates currently posted for this mandi today.
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
