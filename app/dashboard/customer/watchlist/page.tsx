import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ChevronRight, Store, MapPin, ArrowRight } from 'lucide-react';

export default async function CustomerWatchlistPage() {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const items = await prisma.mandiWatchlistItem.findMany({
    where: { userId: user.id },
    include: {
      mandi: {
        include: {
          _count: { select: { rates: { where: { active: true } } } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Mandi Watchlist</span>
      </div>

      <h1 className="mt-3 text-3xl font-black text-[#073B6F]">Saved Mandis</h1>
      <p className="mt-1 text-xs text-slate-500">
        Monitor your pinned mandis and follow local wholesale market fluctuations.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F]">
                  <Store className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {item.mandi._count.rates} Items Tracked
                </span>
              </div>

              <h2 className="mt-4 text-xl font-black text-[#073B6F]">{item.mandi.name}</h2>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
                <span>{item.mandi.city}, {item.mandi.state}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/mandis/${item.mandi.slug}`}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0B5FA5] hover:underline"
              >
                View Today&apos;s Rates <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Store className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-3 text-base font-bold text-slate-700">No Mandis Saved to Watchlist</h2>
            <p className="mt-1 text-xs text-slate-500">Browse the directory to pin wholesale markets.</p>
            <Link
              href="/mandis"
              className="mt-6 inline-block rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
            >
              Explore Mandi Directory
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
