import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Terms & Conditions</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Terms & Conditions</h1>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
        <h2 className="text-base font-bold text-[#073B6F]">1. Platform Nature & Mandi Rates</h2>
        <p>Mandi rates published on KiranaMart247 serve as informational wholesale benchmarks. While recorded from authentic trading updates, rates fluctuate based on auction dynamics.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">2. Retail Orders & Pricing</h2>
        <p>Prices listed on the Kirana Shop are retail consumer prices. Once an order is confirmed, price snapshots are preserved against future changes.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">3. User Conduct</h2>
        <p>Customers must provide accurate contact and address information. Automated scraping of market rates without permission is prohibited.</p>
      </div>
    </main>
  );
}
