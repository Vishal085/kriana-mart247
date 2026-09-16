import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MandiService } from '@/services/mandis.service';
import { getMandiDistrict } from '@/lib/rates';
import { filterMockRates } from '@/lib/prisma';
import { Store, ChevronRight, Building2 } from 'lucide-react';
import { RateTrendBadge } from '@/components/RateTrendBadge';
import { MandiDetailHeaderAction } from '@/components/mandis/MandiCardActions';
import { MandiCommodityRowAction } from '@/components/mandis/MandiCommodityRowAction';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams?.slug || '').trim();
  const mandi = await MandiService.getBySlug(slug).catch(() => null);

  if (!mandi) {
    return { title: 'Mandi Not Found | KiranaMart247' };
  }

  return {
    title: `${mandi.name} Today's Rates | KiranaMart247`,
    description: `Track live wholesale mandi benchmark rates for atta, dal, rice, and spices at ${mandi.name}, ${mandi.city}.`,
    alternates: {
      canonical: `https://www.kiranamart247.com/mandis/${mandi.slug}`,
    },
  };
}

export default async function MandiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || '';
  const slug = decodeURIComponent(rawSlug).trim();

  let mandi: any = null;
  try {
    mandi = await MandiService.getBySlug(slug);
  } catch (err) {
    console.error(`Error fetching mandi for slug "${slug}":`, err);
  }

  if (!mandi) return notFound();

  const district = getMandiDistrict(mandi);

  // Safe serializable mandi representation for client component boundary
  const serializableMandi = {
    id: String(mandi.id),
    name: String(mandi.name),
    slug: String(mandi.slug),
    city: String(mandi.city || ''),
    state: String(mandi.state || ''),
    address: mandi.address || '',
    pincode: mandi.pincode || '',
    description: mandi.description || '',
    active: Boolean(mandi.active ?? true),
  };

  // Safe normalization of rates with resilient fallback
  const rawRates = Array.isArray(mandi.rates) && mandi.rates.length > 0
    ? mandi.rates
    : filterMockRates({ active: true, mandiId: mandi.id });

  const safeRates = rawRates
    .filter((row: any) => row != null)
    .map((row: any) => {
      const prod = row.product || {
        id: row.productId || row.id,
        name: row.name || 'Commodity Item',
        slug: row.slug || '',
        category: { name: row.category || 'Agricultural Staples' },
      };

      const currentRate = Number(row.currentRate ?? row.modalPrice ?? 0);
      const previousRate = Number(row.previousRate ?? currentRate);
      const absoluteChange = Number(row.absoluteChange ?? 0);
      const percentageChange = Number(row.percentageChange ?? 0);

      return {
        id: String(row.id || Math.random()),
        product: {
          id: String(prod.id || ''),
          name: String(prod.name || 'Commodity Item'),
          slug: String(prod.slug || ''),
          category: {
            name: String(prod.category?.name || 'Staples & Grains'),
          },
        },
        unit: String(row.unit || 'Quintal (100 Kg)'),
        currentRate,
        previousRate,
        absoluteChange,
        percentageChange,
        direction: row.direction || 'STEADY',
      };
    });

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
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-[#EAF5FC] px-2 py-0.5 text-[11px] font-bold text-[#073B6F]">
                  <Building2 className="h-3 w-3 text-[#0B5FA5]" />
                  District: <strong>{district}</strong>
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-700">
                  {mandi.state}
                </span>
                {mandi.pincode && (
                  <span className="text-xs text-slate-400 font-medium">PIN: {mandi.pincode}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-500 uppercase font-bold">Active Commodities</div>
              <div className="text-2xl font-black text-[#073B6F]">{safeRates.length} Traded Items</div>
            </div>
            <MandiDetailHeaderAction mandi={serializableMandi} />
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
                {safeRates.map((row: any) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      {row.product.slug ? (
                        <Link href={`/products/${row.product.slug}`} className="hover:underline">
                          {row.product.name}
                        </Link>
                      ) : (
                        <span>{row.product.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{row.product.category.name}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-500">{row.unit}</td>
                    <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                      ₹{row.currentRate.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-medium">
                      ₹{row.previousRate.toFixed(2)}
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
                      ₹{row.absoluteChange.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <RateTrendBadge
                        direction={row.direction}
                        percentage={row.percentageChange}
                        size="sm"
                      />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <MandiCommodityRowAction
                        product={{
                          id: row.product.id,
                          name: row.product.name,
                          slug: row.product.slug,
                          unit: row.unit,
                        }}
                        mandiRate={row.currentRate}
                        unit={row.unit}
                      />
                    </td>
                  </tr>
                ))}
                {safeRates.length === 0 && (
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

      {/* Authoritative Sources & Methodology Disclaimer */}
      <MandiSourcesDisclaimer currentMandiName={mandi.name} />
    </main>
  );
}
