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
  Search,
  FileEdit,
  Trash2,
  ExternalLink,
  Eye,
  AlertCircle,
} from 'lucide-react';

export default function SellerMyProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<{ products: any[]; counts: Record<string, number> }>({
    products: [],
    counts: { ALL: 0, DRAFT: 0, PENDING_REVIEW: 0, NEEDS_CHANGES: 0, PUBLISHED: 0, REJECTED: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (activeTab !== 'ALL') query.set('status', activeTab);
      if (search.trim()) query.set('search', search.trim());

      const res = await fetch(`/api/seller/products?${query.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete draft "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/seller/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        const json = await res.json();
        alert(json.error || 'Failed to delete listing.');
      }
    } catch (err) {
      alert('Error deleting product.');
    } finally {
      setDeletingId(null);
    }
  };

  const tabs = [
    { id: 'ALL', label: 'All Products', count: data.counts.ALL || 0 },
    { id: 'DRAFT', label: 'Drafts', count: data.counts.DRAFT || 0 },
    { id: 'PENDING_REVIEW', label: 'Pending Review', count: data.counts.PENDING_REVIEW || 0 },
    { id: 'NEEDS_CHANGES', label: 'Needs Changes', count: data.counts.NEEDS_CHANGES || 0 },
    { id: 'PUBLISHED', label: 'Published', count: data.counts.PUBLISHED || 0 },
    { id: 'REJECTED', label: 'Rejected', count: data.counts.REJECTED || 0 },
  ];

  const statusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-black text-slate-700 uppercase">Draft</span>;
      case 'PENDING_REVIEW':
        return <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase flex items-center gap-1"><Clock className="h-3 w-3" /> Under Review</span>;
      case 'NEEDS_CHANGES':
        return <span className="rounded-md bg-orange-50 border border-orange-200 px-2 py-0.5 text-[10px] font-black text-orange-800 uppercase flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Needs Changes</span>;
      case 'PUBLISHED':
        return <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black text-emerald-800 uppercase flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Live Published</span>;
      case 'REJECTED':
        return <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-black text-rose-800 uppercase flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</span>;
      default:
        return <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-black">{status}</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">My Product Catalog</h1>
          <p className="text-xs text-slate-500">Manage your wholesale listings, review drafts, and resubmit updates</p>
        </div>
        <Link
          href="/dashboard/seller/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073B6F] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition"
        >
          <PackagePlus className="h-4 w-4" /> List New Product
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                active
                  ? 'bg-[#073B6F] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, brand, or SKU..."
            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          Filter
        </button>
      </form>

      {/* Products List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400">Loading your catalog items...</div>
        ) : data.products.length === 0 ? (
          <div className="py-16 text-center">
            <Boxes className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-xs font-bold text-slate-700">No products found in this tab</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Try changing the status tab or clearing your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.products.map((p: any) => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1.5 flex items-center justify-center">
                    <img
                      src={p.images?.[0]?.url || '/products/placeholder.svg'}
                      alt={p.name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{p.name}</h3>
                      {statusBadge(p.status)}
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Brand: <span className="font-semibold text-slate-700">{p.brand?.name || 'Kirana'}</span> • Pack Size: <span className="font-semibold text-slate-700">{p.unit}</span> • SKU: <span className="font-mono text-slate-600">{p.sku}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs pt-0.5">
                      <span className="font-black text-[#073B6F]">₹{Number(p.retailPrice).toFixed(2)}</span>
                      {p.wholesalePrice && (
                        <span className="text-[11px] font-bold text-emerald-700">
                          Wholesale: ₹{Number(p.wholesalePrice).toFixed(2)}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">Stock: {p.stockQuantity ?? 100}</span>
                      {p.aiDescriptionStatus === 'GENERATED' && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded">
                          AI Description Ready
                        </span>
                      )}
                    </div>

                    {/* Show Change Request Reason or Rejection Reason if any */}
                    {p.status === 'NEEDS_CHANGES' && p.rejectionReason && (
                      <div className="mt-2 rounded-xl bg-orange-50 border border-orange-200 p-2.5 text-[11px] text-orange-900">
                        <span className="font-black">Changes Requested by Admin:</span> {p.rejectionReason}
                      </div>
                    )}
                    {p.status === 'REJECTED' && p.rejectionReason && (
                      <div className="mt-2 rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-[11px] text-rose-900">
                        <span className="font-black">Rejection Reason:</span> {p.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {p.status === 'PUBLISHED' && (
                    <Link
                      href={`/products/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-slate-400" /> View Live
                    </Link>
                  )}

                  <Link
                    href={`/dashboard/seller/products/${p.id}/edit`}
                    className="inline-flex items-center gap-1 rounded-xl bg-[#073B6F] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0B5FA5] shadow-xs"
                  >
                    <FileEdit className="h-3.5 w-3.5" /> Edit
                  </Link>

                  {p.status !== 'PUBLISHED' && (
                    <button
                      type="button"
                      disabled={deletingId === p.id}
                      onClick={() => handleDelete(p.id, p.name)}
                      className="inline-flex items-center justify-center rounded-xl border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50 transition"
                      title="Delete draft"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
