import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { User, Store, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-[640px]">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center">
            <BrandMark size="md" />
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-[#073B6F] sm:text-3xl">
            Welcome to KiranaMart
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Select your account type to sign in
          </p>
        </div>

        {/* 3 Login Cards Grid */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
          {/* Customer Login */}
          <Link
            href="/login/customer"
            className="group relative flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-3 sm:gap-0 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#39A9E8] hover:shadow-md hover:shadow-blue-500/5 text-left sm:text-center"
          >
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAF5FC] to-blue-100/60 text-[#073B6F] border border-blue-100 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-[#073B6F] group-hover:text-white group-hover:border-transparent">
              <User className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex-1 sm:mt-2.5 sm:flex-initial">
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#073B6F] transition-colors">
                Customer
              </h2>
              <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-500 leading-snug sm:min-h-[28px]">
                Shop kirana, track orders & mandi rates
              </p>
            </div>
            <span className="shrink-0 sm:mt-3 inline-flex items-center gap-1 rounded-full bg-[#EAF5FC] px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-[#073B6F] border border-blue-200/60 shadow-2xs transition-all duration-200 group-hover:bg-[#073B6F] group-hover:text-white group-hover:border-[#073B6F]">
              Sign In
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Shopkeeper / Retailer Login */}
          <Link
            href="/login/seller"
            className="group relative flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-3 sm:gap-0 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/5 text-left sm:text-center"
          >
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-orange-100/60 text-amber-700 border border-amber-200/60 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-white group-hover:border-transparent">
              <Store className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex-1 sm:mt-2.5 sm:flex-initial">
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                Shopkeeper
              </h2>
              <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-500 leading-snug sm:min-h-[28px]">
                B2B portal, list products & demands
              </p>
            </div>
            <span className="shrink-0 sm:mt-3 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-amber-800 border border-amber-200/70 shadow-2xs transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500">
              Sign In
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>

          {/* Admin Login */}
          <Link
            href="/login/admin"
            className="group relative flex flex-row sm:flex-col items-center justify-between sm:justify-start gap-3 sm:gap-0 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md hover:shadow-slate-500/5 text-left sm:text-center"
          >
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700 border border-slate-200 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent">
              <ShieldCheck className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex-1 sm:mt-2.5 sm:flex-initial">
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                Admin
              </h2>
              <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-500 leading-snug sm:min-h-[28px]">
                Manage rates, approvals & platform
              </p>
            </div>
            <span className="shrink-0 sm:mt-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-700 border border-slate-200 shadow-2xs transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900">
              Sign In
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Footer info banner */}
        <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-2.5 text-center text-[11px] text-slate-500">
          <span>New to KiranaMart? </span>
          <Link
            href="/register/customer"
            className="font-bold text-[#073B6F] hover:text-[#0B5FA5] hover:underline"
          >
            Create Customer Account
          </Link>
          <span className="text-slate-300 mx-2">|</span>
          <Link
            href="/register/seller"
            className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Register as Shopkeeper
          </Link>
        </div>
      </div>
    </main>
  );
}
