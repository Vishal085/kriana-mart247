'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Shield, ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  // Enforce admin role strictly
  if (!user || user.role !== 'ADMIN') {
    return (
      <main className="flex min-h-[75vh] items-center justify-center px-4 py-12 bg-slate-950 text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-4">
            <BrandMark size="sm" />
          </div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-800/40">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-black text-white">Restricted Administrator Area</h1>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            This administration console is strictly restricted to verified KiranaMart system administrators.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/login/admin?redirect=/dashboard/admin"
              className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-sky-500"
            >
              Authenticate as Admin <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
