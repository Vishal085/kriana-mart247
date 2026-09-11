'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Milk, Plus, Clock, CheckCircle2, XCircle, ChevronRight,
  Loader2, AlertCircle, Package, TrendingUp, TrendingDown,
  FileText, History
} from 'lucide-react';

type DemandStatus =
  | 'NEW' | 'PROCESSING' | 'READY' | 'OUT_FOR_DELIVERY'
  | 'DELIVERED' | 'PARTIALLY_DELIVERED' | 'CANCELLED';

interface Demand {
  id: string;
  demandNumber: string;
  status: DemandStatus;
  createdAt: string;
  items: { id: string }[];
  receipt?: { receiptNumber: string; grandTotal: number } | null;
}

const STATUS_TABS: { label: string; value: DemandStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'New', value: 'NEW' },
  { label: 'Processing', value: 'PROCESSING' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Partial', value: 'PARTIALLY_DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

const STATUS_CONFIG: Record<DemandStatus, { label: string; color: string }> = {
  NEW: { label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  PROCESSING: { label: 'Processing', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  READY: { label: 'Ready', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  DELIVERED: { label: 'Delivered', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  PARTIALLY_DELIVERED: { label: 'Partially Delivered', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-50 text-red-700 border-red-200' },
};

export default function ShopkeeperDemandsPage() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DemandStatus | 'ALL'>('ALL');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDemands();
  }, [activeTab]);

  async function fetchDemands() {
    setLoading(true);
    setError('');
    try {
      const url = activeTab === 'ALL' ? '/api/demands' : `/api/demands?status=${activeTab}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load demands');
      setDemands(data.demands || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
              <Milk className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#073B6F]">My Demands</h1>
              <p className="text-[11px] text-slate-500">Dairy &amp; milk product requisitions</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/seller/demands/history"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            <History className="h-4 w-4" /> History
          </Link>
          <Link
            href="/dashboard/seller/demands/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5] transition"
          >
            <Plus className="h-4 w-4" /> New Demand
          </Link>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              activeTab === tab.value
                ? 'bg-[#073B6F] text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-[#39A9E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-[#073B6F]" />
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && demands.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
            <Milk className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-4 text-sm font-black text-slate-800">No demands yet</h3>
          <p className="mt-1 text-xs text-slate-500">
            Submit your first dairy demand to get started.
          </p>
          <Link
            href="/dashboard/seller/demands/new"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
          >
            <Plus className="h-4 w-4" /> New Demand
          </Link>
        </div>
      )}

      {/* Demand Cards */}
      {!loading && !error && demands.length > 0 && (
        <div className="space-y-3">
          {demands.map((demand) => {
            const cfg = STATUS_CONFIG[demand.status];
            const isEditable = demand.status === 'NEW';
            const hasReceipt = demand.receipt && ['DELIVERED', 'PARTIALLY_DELIVERED'].includes(demand.status);
            return (
              <div
                key={demand.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#39A9E8] transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#073B6F]">
                        {demand.demandNumber}
                      </span>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold shrink-0 whitespace-nowrap shadow-2xs ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {new Date(demand.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      <span className="font-semibold">{demand.items.length}</span> item{demand.items.length !== 1 ? 's' : ''}
                      {demand.receipt && (
                        <span className="ml-2 font-bold text-emerald-700">
                          ₹{Number(demand.receipt.grandTotal).toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hasReceipt && (
                      <Link
                        href={`/dashboard/seller/demands/${demand.id}/receipt`}
                        className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition"
                      >
                        <FileText className="h-3.5 w-3.5" /> Receipt
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/seller/demands/${demand.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
