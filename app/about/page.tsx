import Link from 'next/link';
import { ChevronRight, ShieldCheck, TrendingUp, Store, ShoppingBag } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">About Us</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F] sm:text-4xl">About KiranaMart247</h1>
      <p className="mt-2 text-sm text-[#0B5FA5] font-semibold">Today&apos;s Wholesale Rates & Kirana Mandi Platform</p>

      <div className="mt-8 space-y-6 text-sm text-slate-600 leading-relaxed rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <p>
          <strong>KiranaMart247</strong> is dedicated to bringing transparency and efficiency to India&apos;s vast kirana and wholesale commodity marketplace. We provide daily price intelligence across major agricultural mandis, enabling retail shop owners, businesses, and households to make informed purchasing decisions.
        </p>

        <h2 className="text-xl font-black text-[#073B6F] pt-4">Our Core Pillars</h2>
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          <div className="rounded-2xl bg-[#EAF5FC] p-4 text-[#073B6F]">
            <TrendingUp className="h-6 w-6 text-[#0B5FA5]" />
            <h3 className="mt-2 font-bold text-sm">Mandi Intelligence</h3>
            <p className="mt-1 text-xs text-slate-600">Daily recorded rates, percentage shifts, and multi-mandi price spreads.</p>
          </div>
          <div className="rounded-2xl bg-[#EAF5FC] p-4 text-[#073B6F]">
            <ShoppingBag className="h-6 w-6 text-[#0B5FA5]" />
            <h3 className="mt-2 font-bold text-sm">Wholesale & Retail Shop</h3>
            <p className="mt-1 text-xs text-slate-600">Direct supply of high-grade grains, pulses, dairy, oils, and packaged essentials.</p>
          </div>
          <div className="rounded-2xl bg-[#EAF5FC] p-4 text-[#073B6F]">
            <ShieldCheck className="h-6 w-6 text-[#72B82A]" />
            <h3 className="mt-2 font-bold text-sm">Transparency Guarantee</h3>
            <p className="mt-1 text-xs text-slate-600">Strict separation between wholesale mandi auction benchmarks and retail pricing.</p>
          </div>
        </div>

        <h2 className="text-xl font-black text-[#073B6F] pt-4">Rate Source & Compliance Notice</h2>
        <p className="text-xs text-slate-500">
          KiranaMart247 records mandi rates from authorized market entry points and administrative auction benchmarks for analytical reference. We do not claim official government affiliation or represent state APMC boards.
        </p>
      </div>
    </main>
  );
}
