import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Shipping & Delivery Policy</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Shipping & Delivery Policy</h1>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
        <h2 className="text-base font-bold text-[#073B6F]">1. Delivery Timeline</h2>
        <p>Orders are dispatched from local fulfillment centers and delivered within 24 to 48 hours.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">2. Shipping Charges</h2>
        <p>Standard delivery charge is ₹40. Orders above ₹1,000 qualify for <strong>FREE DELIVERY</strong>.</p>
      </div>
    </main>
  );
}
