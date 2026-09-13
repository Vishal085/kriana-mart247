import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MandiService } from '@/services/mandis.service';
import { getMandiDistrict, matchMandiForLocation } from '@/context/MandiContext';
import { MANDI_COMMODITY_CATEGORIES, RETAIL_ONLY_CATEGORIES } from '@/services/rates.service';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import {
  ChevronRight,
  TrendingUp,
  Store,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Bell,
  Scale,
} from 'lucide-react';
import { Direction } from '@prisma/client';

export default async function CustomerKiranaMandiPage({
  searchParams,
}: {
  searchParams: Promise<{ mandiId?: string; category?: string }>;
}) {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const { mandiId, category } = await searchParams;

  // 1. Check user profile for registered city/district
  const userWithProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: { customerProfile: true },
  });

  // 2. Fetch mandis via MandiService
  const mandis = (await MandiService.getAll(true)).map((m: any) => ({
    ...m,
    district: m.district || getMandiDistrict(m),
  }));

  // 3. Auto-match mandi if not explicitly specified in URL query
  let effectiveMandiId = mandiId;
  if (!effectiveMandiId && userWithProfile?.customerProfile?.city) {
    const matched = matchMandiForLocation(userWithProfile.customerProfile.city, undefined, mandis);
    if (matched) {
      effectiveMandiId = matched.id;
    }
  }

  // 4. Default to Ghaziabad Mandi if still unset
  if (!effectiveMandiId) {
    const gzb = mandis.find((m) => m.slug === 'ghaziabad-mandi');
    if (gzb) effectiveMandiId = gzb.id;
  }

  const [commodityCategories, rates] = await Promise.all([
    prisma.category.findMany({
      where: {
        active: true,
        slug: {
          in: MANDI_COMMODITY_CATEGORIES,
          notIn: RETAIL_ONLY_CATEGORIES,
        },
      },
      orderBy: { displayOrder: 'asc' },
    }),
    prisma.mandiRate.findMany({
      where: {
        active: true,
        ...(effectiveMandiId ? { mandiId: effectiveMandiId } : {}),
        product: {
          category: {
            slug: {
              in: category ? [category] : MANDI_COMMODITY_CATEGORIES,
              notIn: RETAIL_ONLY_CATEGORIES,
            },
          },
        },
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
        mandi: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 50,
    }),
  ]);

  const activeMandi = effectiveMandiId ? mandis.find((m) => m.id === effectiveMandiId) : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">
          Customer Portal
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F] font-bold">Kirana Mandi</span>
      </div>

      {/* Hero Banner with Mandi Badge */}
      <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-black text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Wholesale APMC Rates • Zero Retail Goods
            </div>
            <h1 className="mt-2.5 text-2xl sm:text-3xl font-black text-[#073B6F]">
              Kirana Mandi Rates (किराना मंडी थोक भाव)
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Track authentic physical mandi rates for grains, pulses, edible oils, sugar, and staples.
              Retail FMCG goods are strictly isolated to provide pure commodity market intelligence.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/mandi-rates"
              className="rounded-full bg-[#073B6F] px-4 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5] transition flex items-center gap-1.5"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Full Market Board
            </Link>
            <Link
              href="/dashboard/customer/alerts"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5"
            >
              <Bell className="h-3.5 w-3.5 text-amber-500" />
              My Price Alerts
            </Link>
          </div>
        </div>

        {/* Commodity Category Badges */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-4">
          <span className="shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Commodity:
          </span>
          <Link
            href={`/dashboard/customer/mandi${mandiId ? `?mandiId=${mandiId}` : ''}`}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
              !category
                ? 'bg-[#073B6F] text-white shadow-2xs'
                : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Commodities ({rates.length})
          </Link>
          {commodityCategories.map((c) => {
            const isCatActive = category === c.slug;
            return (
              <Link
                key={c.id}
                href={`/dashboard/customer/mandi?category=${c.slug}${mandiId ? `&mandiId=${mandiId}` : ''}`}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                  isCatActive
                    ? 'bg-[#0B5FA5] text-white shadow-2xs'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8] hover:bg-[#EAF5FC]'
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* Mandi Filter Pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="shrink-0 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Mandi:
          </span>
          <Link
            href={`/dashboard/customer/mandi${category ? `?category=${category}` : ''}`}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
              !mandiId
                ? 'bg-slate-800 text-white shadow-2xs'
                : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Mandis
          </Link>
          {mandis.map((m) => {
            const isMandiActive = (mandiId || effectiveMandiId) === m.id;
            const isGhaziabad = m.slug === 'ghaziabad-mandi';
            return (
              <Link
                key={m.id}
                href={`/dashboard/customer/mandi?mandiId=${m.id}${category ? `&category=${category}` : ''}`}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
                  isMandiActive
                    ? 'bg-emerald-700 text-white shadow-2xs font-black'
                    : isGhaziabad
                    ? 'border-2 border-[#39A9E8] bg-[#EAF5FC] text-[#073B6F] hover:bg-[#073B6F] hover:text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50'
                }`}
              >
                📍 {m.name} ({m.city})
              </Link>
            );
          })}
        </div>
      </div>

      {/* Verified Rates Table */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-[#073B6F]">
              {activeMandi ? `${activeMandi.name} Commodity Rates` : 'Verified Mandi Commodity Rates'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Reporting authentic APMC auction prices for bulk grain bags, dal sacks, and oil tins.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {rates.length} commodities listed
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Commodity</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Reporting Mandi</th>
                <th className="px-4 py-3">Trading Unit</th>
                <th className="px-4 py-3">Current Bhav</th>
                <th className="px-4 py-3">Previous</th>
                <th className="px-4 py-3">Trend</th>
                <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
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
                  <td className="px-4 py-3.5 text-slate-600 font-medium">
                    {row.product.category.name}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {row.mandi.name}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800">
                    {row.unit}
                  </td>
                  <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                    ₹{Number(row.currentRate).toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    ₹{Number(row.previousRate).toFixed(2)}
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
                      href={`/dashboard/customer/alerts?commodity=${encodeURIComponent(row.product.name)}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-[#073B6F] hover:bg-[#EAF5FC] hover:border-[#39A9E8] transition"
                    >
                      <Bell className="h-3 w-3 text-amber-500" />
                      Set Alert
                    </Link>
                  </td>
                </tr>
              ))}

              {rates.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                    No commodity rates found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
