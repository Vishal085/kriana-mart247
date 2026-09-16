import React from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/brand-mark';
import { ShoppingBag, Store, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Register Account • KiranaMart247 Mandi & Grocery Platform',
  description: 'Create your KiranaMart247 account. Choose between a Customer account for grocery delivery & rate tracking, or a Wholesale Shopkeeper account.',
};

export default function UnifiedRegisterChoicePage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/60">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-100">
        <div className="text-center">
          <div className="flex justify-center">
            <BrandMark size="md" />
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-black text-[#073B6F] tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Select how you plan to use the KiranaMart247 Mandi & Grocery Terminal
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Option 1: Customer */}
          <Link
            href="/register/customer"
            className="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200 p-6 transition hover:border-[#073B6F] hover:shadow-md bg-white text-left"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F] group-hover:bg-[#073B6F] group-hover:text-white transition">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-black text-[#073B6F]">Customer Account</h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Track live wholesale mandi rates, compare prices across APMC yards, and order daily kirana essentials with home delivery.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#0B5FA5] group-hover:underline">
                Register as Customer
              </span>
              <ArrowRight className="h-4 w-4 text-[#073B6F] group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Option 2: Shopkeeper / Seller */}
          <Link
            href="/register/seller"
            className="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200 p-6 transition hover:border-amber-500 hover:shadow-md bg-white text-left"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition">
                <Store className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-black text-slate-800">Shopkeeper / Trader</h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                List FMCG & grocery inventory, manage dairy demand procurement, view wholesale trader spreads, and access the seller command center.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 group-hover:underline">
                Register as Shopkeeper
              </span>
              <ArrowRight className="h-4 w-4 text-amber-700 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>

        {/* Existing Account Footer */}
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#073B6F] hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
