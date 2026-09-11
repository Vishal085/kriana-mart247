'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Store,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileEdit,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Milk,
  History,
} from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
      </div>
    );
  }

  // Enforce frontend role boundary: redirect non-shopkeepers
  if (!user || user.role !== 'SHOPKEEPER') {
    return (
      <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Store className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-black text-slate-900">Shopkeeper Access Required</h1>
          <p className="mt-2 text-xs text-slate-600">
            This dashboard is reserved for verified shopkeepers and merchant sellers.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/login/seller"
              className="rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5]"
            >
              Log in as Shopkeeper
            </Link>
            <Link
              href="/register/seller"
              className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Register New Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/dashboard/seller', icon: LayoutDashboard },
    { label: 'Demand', href: '/dashboard/seller/demands', icon: Milk },
    { label: 'My Products', href: '/dashboard/seller/products', icon: Boxes },
    { label: 'List Your Product', href: '/dashboard/seller/products/new', icon: PackagePlus, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 print:min-h-0 print:bg-white print:p-0 print:pb-0">
      {/* Top Banner */}
      <div className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-[#073B6F]">
                  {user.shopkeeperProfile?.shopName || user.fullName}
                </span>
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black text-emerald-700 uppercase">
                  Verified Merchant
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {user.shopkeeperProfile?.city || 'Delhi'} • {user.mobile || user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/seller/products/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#0B5FA5]"
            >
              <PackagePlus className="h-4 w-4" /> List Your Product
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 print:max-w-none print:p-0 print:m-0">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr] print:block print:w-full print:p-0 print:m-0">
          {/* Sidebar Nav */}
          <aside className="space-y-4 print:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                        item.highlight && !active
                          ? 'bg-amber-50/80 text-amber-900 hover:bg-amber-100/80 border border-amber-200/60'
                          : active
                          ? 'bg-[#073B6F] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`h-4 w-4 ${active ? 'text-white' : item.highlight ? 'text-amber-700' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 opacity-40 ${active ? 'text-white' : ''}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>

            {/* Merchant Guidelines Card */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-[#073B6F] mb-1">
                <ShieldCheck className="h-4 w-4 text-[#72B82A]" /> Listing Standards
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                All submitted products undergo administrative review and AI-assisted description tuning before going live to our wholesale kirana buyers.
              </p>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0 print:w-full print:p-0 print:m-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
