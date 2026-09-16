import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentSessionUser } from '@/lib/auth';
import { Bookmark, Store, ArrowRight, ShieldCheck, TrendingUp, Bell } from 'lucide-react';

export const metadata = {
  title: 'Mandi Watchlist • Pinned Markets & Custom Lot Tracking | KiranaMart',
  description: 'Pin your preferred APMC wholesale mandis and track daily auction rate fluctuations, price changes, and volatility alerts in one custom dashboard.',
};

export default async function WatchlistHubPage() {
  const user = await getCurrentSessionUser();

  if (user) {
    redirect('/dashboard/customer/watchlist');
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EAF5FC] text-[#073B6F]">
          <Bookmark className="h-10 w-10 text-[#0B5FA5]" />
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-bold text-[#073B6F]">
          Custom Market Intelligence
        </span>

        <h1 className="mt-3 text-3xl sm:text-4xl font-black text-[#073B6F]">
          Your Personal Mandi Watchlist
        </h1>

        <p className="mt-3 max-w-xl mx-auto text-sm text-slate-600 leading-relaxed">
          Pin your primary wholesale APMC mandis (Azadpur, Narela, Ghazipur, Khari Baoli, Sahibabad, and more) to follow real-time lot rate changes and set customized price alerts.
        </p>

        {/* Feature Highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left max-w-3xl mx-auto">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Store className="h-5 w-5 text-[#0B5FA5] mb-2" />
            <h3 className="font-bold text-sm text-slate-800">Pin Mandi Hubs</h3>
            <p className="text-xs text-slate-500 mt-1">Keep tabs on multiple local APMC yards simultaneously without manual search.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <TrendingUp className="h-5 w-5 text-emerald-600 mb-2" />
            <h3 className="font-bold text-sm text-slate-800">Live Rate Fluctuations</h3>
            <p className="text-xs text-slate-500 mt-1">Monitor daily lot variations, percentage swings, and volume spreads in one place.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Bell className="h-5 w-5 text-amber-600 mb-2" />
            <h3 className="font-bold text-sm text-slate-800">Price Drop Alerts</h3>
            <p className="text-xs text-slate-500 mt-1">Set target procurement prices and get WhatsApp/SMS alerts when rates drop.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login?redirect=/dashboard/customer/watchlist"
            className="rounded-full bg-[#073B6F] px-8 py-3 text-xs font-black text-white shadow-md hover:bg-[#0B5FA5] transition"
          >
            Sign In to Access Watchlist →
          </Link>
          <Link
            href="/mandis"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:border-[#39A9E8] transition"
          >
            Explore Mandi Directory
          </Link>
        </div>
      </div>
    </main>
  );
}
