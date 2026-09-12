import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { User, Store, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-[82vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <BrandMark size="lg" />
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-[#073B6F] sm:text-4xl">
            Welcome to KiranaMart
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Select your account type to sign in
          </p>
        </div>

        {/* 3 Login Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Customer Login */}
          <Link
            href="/login/customer"
            className="group relative flex flex-col items-center rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#39A9E8] hover:shadow-xl hover:shadow-blue-500/10 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF5FC] to-blue-100/60 text-[#073B6F] border border-blue-100/80 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-[#073B6F] group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
              <User className="h-7 w-7 transition-transform group-hover:scale-110 duration-200" />
            </div>
            <div className="mt-4">
              <h2 className="text-base font-black text-slate-900 group-hover:text-[#073B6F] transition-colors">
                Customer
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                Shop kirana, track orders & live mandi rates
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-4 py-2 text-xs font-bold text-[#073B6F] border border-blue-200/60 shadow-xs transition-all duration-200 group-hover:bg-[#073B6F] group-hover:text-white group-hover:border-[#073B6F] group-hover:shadow-md">
              Sign In
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Shopkeeper / Retailer Login */}
          <Link
            href="/login/seller"
            className="group relative flex flex-col items-center rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/60 text-amber-700 border border-amber-200/60 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
              <Store className="h-7 w-7 transition-transform group-hover:scale-110 duration-200" />
            </div>
            <div className="mt-4">
              <h2 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                Shopkeeper
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                B2B wholesale portal, list products & demands
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 border border-amber-200/70 shadow-xs transition-all duration-200 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:shadow-md">
              Sign In
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Admin Login */}
          <Link
            href="/login/admin"
            className="group relative flex flex-col items-center rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-500/10 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700 border border-slate-200 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
              <ShieldCheck className="h-7 w-7 transition-transform group-hover:scale-110 duration-200" />
            </div>
            <div className="mt-4">
              <h2 className="text-base font-black text-slate-900 group-hover:text-slate-900 transition-colors">
                Admin
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                Manage rates, approvals, orders & platform
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 border border-slate-200 shadow-xs transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 group-hover:shadow-md">
              Sign In
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* Footer info banner */}
        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-center text-xs text-slate-600">
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
