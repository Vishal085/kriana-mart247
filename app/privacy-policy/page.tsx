import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Privacy Policy</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Privacy Policy</h1>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
        <p>At <strong>KiranaMart247</strong>, we are committed to safeguarding the privacy and security of our customer and visitor data.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">1. Information We Collect</h2>
        <p>We collect essential delivery information including name, phone number, address, city, and pincode required for processing kirana orders and sending WhatsApp status alerts.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">2. How We Protect Your Data</h2>
        <p>All passwords are encrypted with industry-standard bcrypt hashing. Sessions are stored in secure HTTP-only cookies. We never share customer phone numbers or order histories with unauthorized third parties.</p>
        <h2 className="text-base font-bold text-[#073B6F] pt-2">3. WhatsApp Communications</h2>
        <p>Order tracking notifications are transmitted via official WhatsApp Cloud API strictly for transaction confirmation.</p>
      </div>
    </main>
  );
}
