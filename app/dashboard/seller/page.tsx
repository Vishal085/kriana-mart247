'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PackagePlus,
  ArrowRight,
  TrendingUp,
  FileEdit,
  Sparkles,
} from 'lucide-react';

export default function SellerOverviewPage() {
  const [data, setData] = useState<{ products: any[]; counts: Record<string, number> }>({
    products: [],
    counts: { ALL: 0, DRAFT: 0, PENDING_REVIEW: 0, NEEDS_CHANGES: 0, PUBLISHED: 0, REJECTED: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/seller/products');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load seller dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards = [
    {
      label: 'Total Products',
      count: data.counts.ALL || 0,
      icon: Boxes,
      color: 'text-slate-900',
      bg: 'bg-white',
      border: 'border-slate-200',
    },
    {
      label: 'Pending Review',
      count: data.counts.PENDING_REVIEW || 0,
      icon: Clock,
      color: 'text-amber-700',
      bg: 'bg-amber-50/50',
      border: 'border-amber-200',
    },
    {
      label: 'Needs Changes',
      count: data.counts.NEEDS_CHANGES || 0,
      icon: AlertTriangle,
      color: 'text-orange-700',
      bg: 'bg-orange-50/50',
      border: 'border-orange-200',
    },
    {
      label: 'Live Published',
      count: data.counts.PUBLISHED || 0,
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200',
    },
    {
      label: 'Drafts',
      count: data.counts.DRAFT || 0,
      icon: FileEdit,
      color: 'text-sky-700',
      bg: 'bg-sky-50/50',
      border: 'border-sky-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome & Quick Action Card */}
      <div className="rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#073B6F] to-[#0B5FA5] p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#39A9E8]">
              <Sparkles className="h-3.5 w-3.5 text-[#72B82A]" /> AI-Powered Listing System
            </div>
            <h1 className="mt-3 text-2xl font-black sm:text-3xl">Shopkeeper Command Center</h1>
            <p className="mt-1 text-xs text-slate-200 max-w-xl leading-relaxed">
              List and manage your FMCG products for wholesale distribution. Our automated AI prepares high-converting descriptions, and our admin team reviews and publishes your catalog.
            </p>
          </div>
          <Link
            href="/dashboard/seller/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#72B82A] px-5 py-3 text-xs font-black text-white shadow-md transition hover:bg-[#609e23] shrink-0"
          >
            <PackagePlus className="h-4 w-4" /> List Your Product
          </Link>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border ${card.border} ${card.bg} p-4 shadow-2xs transition hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">{card.label}</span>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className={`mt-2 text-2xl font-black ${card.color}`}>
              {loading ? '...' : card.count}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Product Listings Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-black text-slate-900">Recent Product Submissions</h2>
            <p className="text-[11px] text-slate-500">Track moderation and publishing state</p>
          </div>
          <Link
            href="/dashboard/seller/products"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0B5FA5] hover:underline"
          >
            View All ({data.counts.ALL || 0}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading your product listings...</div>
        ) : data.products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
            <Boxes className="mx-auto h-8 w-8 text-slate-300" />
            <h3 className="mt-2 text-xs font-bold text-slate-700">No products listed yet</h3>
            <p className="mt-1 text-[11px] text-slate-400">
              Start by listing your first FMCG item for wholesale kirana distribution.
            </p>
            <Link
              href="/dashboard/seller/products/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs"
            >
              <PackagePlus className="h-3.5 w-3.5" /> List Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.products.slice(0, 6).map((p: any) => {
                  const statusColors: Record<string, string> = {
                    DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
                    PENDING_REVIEW: 'bg-amber-50 text-amber-800 border-amber-200',
                    NEEDS_CHANGES: 'bg-orange-50 text-orange-800 border-orange-200',
                    PUBLISHED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    REJECTED: 'bg-rose-50 text-rose-800 border-rose-200',
                  };

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0]?.url || '/products/placeholder.svg'}
                            alt={p.name}
                            className="h-10 w-10 rounded-xl border border-slate-100 bg-slate-50 object-contain p-1"
                          />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                            <div className="text-[10px] text-slate-400">{p.unit} • SKU: {p.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {p.category?.name || 'General'}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">₹{Number(p.retailPrice).toFixed(2)}</div>
                        {p.wholesalePrice && (
                          <div className="text-[10px] text-emerald-600">Wholesale: ₹{Number(p.wholesalePrice).toFixed(2)}</div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-semibold">
                        {p.stockQuantity ?? 100} units
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${
                            statusColors[p.status] || statusColors.DRAFT
                          }`}
                        >
                          {p.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/dashboard/seller/products/${p.id}/edit`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100"
                        >
                          <FileEdit className="h-3 w-3" /> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
