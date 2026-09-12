'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User, Lock, ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
      </div>
    );
  }

  // Enforce customer access
  if (!user || (user.role !== 'CUSTOMER' && user.role !== 'ADMIN')) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <BrandMark size="sm" />
          </div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#073B6F]">
            <User className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-black text-slate-900">Customer Login Required</h1>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Please log in with your customer account to access your orders, mandi price alerts, and delivery preferences.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/login/customer?redirect=/dashboard/customer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5]"
            >
              Log in as Customer <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register/customer?redirect=/dashboard/customer"
              className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Register New Customer Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
