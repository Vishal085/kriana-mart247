import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Refund & Cancellation Policy</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Refund & Cancellation Policy</h1>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
        <h2 className="text-base font-bold text-[#073B6F]">1. Cancellation Window</h2>
        <p>Orders may be cancelled while in <strong>PENDING</strong> or <strong>CONFIRMED</strong> status prior to dispatch.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">2. Damaged or Incorrect Products</h2>
        <p>In case of damaged, expired, or incorrect staples received, notify customer support within 24 hours for full replacement or refund processing.</p>
      </div>
    </main>
  );
}
