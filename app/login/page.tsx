import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';

export default function LoginPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <BrandMark size="lg" />
          </div>
          <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Welcome to KiranaMart247</h1>
          <p className="mt-2 text-sm text-slate-500">
            Select your account type to sign in
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Customer Login */}
          <Link
            href="/login/customer"
            className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#39A9E8] hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F] group-hover:bg-[#073B6F] group-hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="text-center">
              <h2 className="text-sm font-black text-[#073B6F]">Customer</h2>
              <p className="mt-1 text-[11px] text-slate-500">Shop kirana, track orders & mandi rates</p>
            </div>
            <span className="mt-auto rounded-full bg-[#EAF5FC] px-4 py-1.5 text-[11px] font-bold text-[#073B6F] group-hover:bg-[#073B6F] group-hover:text-white transition">
              Sign In →
            </span>
          </Link>

          {/* Shopkeeper / Retailer Login */}
          <Link
            href="/login/seller"
            className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>
            </div>
            <div className="text-center">
              <h2 className="text-sm font-black text-[#073B6F]">Shopkeeper</h2>
              <p className="mt-1 text-[11px] text-slate-500">B2B portal, list products & demands</p>
            </div>
            <span className="mt-auto rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-bold text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition">
              Sign In →
            </span>
          </Link>

          {/* Admin Login */}
          <Link
            href="/login/admin"
            className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
            </div>
            <div className="text-center">
              <h2 className="text-sm font-black text-[#073B6F]">Admin</h2>
              <p className="mt-1 text-[11px] text-slate-500">Manage rates, orders & platform</p>
            </div>
            <span className="mt-auto rounded-full bg-slate-100 px-4 py-1.5 text-[11px] font-bold text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition">
              Sign In →
            </span>
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          New to KiranaMart247?{' '}
          <Link href="/register/customer" className="font-bold text-[#0B5FA5] hover:underline">
            Create Customer Account
          </Link>
          {' '}or{' '}
          <Link href="/register/seller" className="font-bold text-[#0B5FA5] hover:underline">
            Register as Shopkeeper
          </Link>
        </div>
      </div>
    </main>
  );
}
