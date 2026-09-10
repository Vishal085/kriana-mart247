'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Eye,
  Store,
  Sparkles,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  FileText,
  Boxes,
} from 'lucide-react';

export default function AdminApprovalsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [counts, setCounts] = useState<any>({
    all: 0,
    pending: 0,
    needsChanges: 0,
    published: 0,
    rejected: 0,
    draft: 0,
  });
  const [activeTab, setActiveTab] = useState('PENDING_REVIEW');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab) params.set('status', activeTab);
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`/api/admin/approvals?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.products || []);
        if (data.counts) setCounts(data.counts);
      }
    } catch (err) {
      console.error('Error fetching admin approvals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, [activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApprovals();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#073B6F] text-white shadow-md">
              <ShieldCheck className="h-7 w-7 text-[#39A9E8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                  Quality Assurance & Moderation
                </span>
                {counts.pending > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black text-white animate-pulse">
                    {counts.pending} Action Needed
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Product Approval Command Center
              </h1>
              <p className="text-xs text-slate-500">
                Review shopkeeper submissions, inspect AI-generated descriptions, resolve duplicate risks, and publish to catalog.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/admin"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Admin Home
            </Link>
            <button
              onClick={fetchApprovals}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Status Count Metric Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          <button
            onClick={() => setActiveTab('PENDING_REVIEW')}
            className={`rounded-2xl border p-3.5 text-left transition ${
              activeTab === 'PENDING_REVIEW'
                ? 'border-amber-400 bg-amber-50/80 shadow-xs ring-2 ring-amber-300'
                : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-amber-900">Pending Review</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-1 text-2xl font-black text-amber-700">{counts.pending}</div>
          </button>

          <button
            onClick={() => setActiveTab('NEEDS_CHANGES')}
            className={`rounded-2xl border p-3.5 text-left transition ${
              activeTab === 'NEEDS_CHANGES'
                ? 'border-orange-400 bg-orange-50/80 shadow-xs ring-2 ring-orange-300'
                : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-orange-900">Needs Changes</span>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <div className="mt-1 text-2xl font-black text-orange-700">{counts.needsChanges}</div>
          </button>

          <button
            onClick={() => setActiveTab('PUBLISHED')}
            className={`rounded-2xl border p-3.5 text-left transition ${
              activeTab === 'PUBLISHED'
                ? 'border-emerald-400 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-300'
                : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-emerald-900">Published Live</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-700">{counts.published}</div>
          </button>

          <button
            onClick={() => setActiveTab('REJECTED')}
            className={`rounded-2xl border p-3.5 text-left transition ${
              activeTab === 'REJECTED'
                ? 'border-rose-400 bg-rose-50/80 shadow-xs ring-2 ring-rose-300'
                : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-rose-900">Rejected</span>
              <XCircle className="h-4 w-4 text-rose-600" />
            </div>
            <div className="mt-1 text-2xl font-black text-rose-700">{counts.rejected}</div>
          </button>

          <button
            onClick={() => setActiveTab('ALL')}
            className={`rounded-2xl border p-3.5 text-left transition ${
              activeTab === 'ALL'
                ? 'border-blue-400 bg-blue-50/80 shadow-xs ring-2 ring-blue-300'
                : 'border-slate-200 bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-blue-900">Total Catalog</span>
              <Boxes className="h-4 w-4 text-blue-600" />
            </div>
            <div className="mt-1 text-2xl font-black text-blue-800">{counts.all}</div>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, SKU, brand, or shopkeeper..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-20 text-xs text-slate-800 outline-none focus:border-[#39A9E8] shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1 rounded-lg bg-[#073B6F] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#0B5FA5]"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold self-end sm:self-auto">
          <span>Showing {submissions.length} listings</span>
        </div>
      </div>

      {/* Submissions List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
            <p className="text-xs font-semibold text-slate-500">Loading approval queue...</p>
          </div>
        </div>
      ) : submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-3">
            <Boxes className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Listings in this Queue</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            {activeTab === 'PENDING_REVIEW'
              ? 'Great news! All seller submissions have been reviewed and processed.'
              : `No product listings found with status "${activeTab}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((product) => {
            const primaryImg =
              Array.isArray(product.images) && product.images[0]
                ? typeof product.images[0] === 'string'
                  ? product.images[0]
                  : product.images[0].url
                : null;

            const isPending = product.status === 'PENDING_REVIEW';

            return (
              <div
                key={product.id}
                className={`rounded-2xl border bg-white p-4 sm:p-5 shadow-2xs transition hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isPending ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-200'
                }`}
              >
                {/* Left: Product Thumbnail + Title + Meta */}
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-1 flex items-center justify-center">
                    {primaryImg ? (
                      <img
                        src={primaryImg}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Boxes className="h-6 w-6 text-slate-300" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                          product.status === 'PUBLISHED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : product.status === 'PENDING_REVIEW'
                            ? 'bg-amber-100 text-amber-800'
                            : product.status === 'NEEDS_CHANGES'
                            ? 'bg-orange-100 text-orange-800'
                            : product.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {product.status?.replace('_', ' ') || 'PUBLISHED'}
                      </span>

                      {product.aiDescriptionStatus === 'GENERATED' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          <Sparkles className="h-2.5 w-2.5 text-blue-500" /> AI Description Ready
                        </span>
                      )}

                      {product.sku && (
                        <span className="text-[11px] font-semibold text-slate-400">
                          SKU: {product.sku}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>
                        Brand: <strong className="text-slate-700">{product.brand?.name || product.brand || 'Unbranded'}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Unit: <strong className="text-slate-700">{product.unit}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Store className="h-3 w-3 text-slate-400" />
                        <span>{product.shopName || product.seller?.fullName || 'Direct Partner'}</span>
                      </span>
                      <span>•</span>
                      <span>{product.location || 'Delhi NCR'}</span>
                    </div>

                    {product.rejectionReason && (
                      <div className="mt-1 text-[11px] font-medium text-rose-600 bg-rose-50 rounded-lg px-2.5 py-1 inline-block">
                        Reason: {product.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Pricing + Action Button */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                  <div className="text-right">
                    <div className="text-base font-black text-[#073B6F]">
                      ₹{product.retailPrice}
                    </div>
                    {product.wholesalePrice && (
                      <div className="text-[11px] font-bold text-emerald-700">
                        Wholesale: ₹{product.wholesalePrice}
                      </div>
                    )}
                    {product.mrp && (
                      <div className="text-[10px] text-slate-400 line-through">
                        MRP ₹{product.mrp}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/dashboard/admin/approvals/${product.id}`}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs ${
                      isPending
                        ? 'bg-[#073B6F] text-white hover:bg-[#0B5FA5]'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {isPending ? 'Review Submission' : 'View Details'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
