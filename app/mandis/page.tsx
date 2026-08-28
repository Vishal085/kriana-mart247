import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Store, MapPin, ArrowRight, ChevronRight } from 'lucide-react';

export default async function MandisPage() {
  const mandis = await prisma.mandi.findMany({
    where: { active: true },
    include: {
      _count: { select: { rates: { where: { active: true } } } },
    },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Mandi Directory</span>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Wholesale Mandi Directory</h1>
          <p className="mt-1 text-xs text-slate-500">
            Explore registered wholesale mandis and track daily APMC market auction rates.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mandis.map((mandi) => (
          <div
            key={mandi.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#39A9E8] hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F]">
                  <Store className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {mandi._count.rates} Commodities Tracked
                </span>
              </div>

              <h2 className="mt-4 text-xl font-black text-[#073B6F]">{mandi.name}</h2>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
                <span>{mandi.city}, {mandi.state}</span>
              </div>

              {mandi.address && (
                <p className="mt-3 text-xs text-slate-600 line-clamp-2">{mandi.address}</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/mandis/${mandi.slug}`}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0B5FA5] hover:underline"
              >
                View Today&apos;s Rates <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
