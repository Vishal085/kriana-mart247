'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  History,
  ArrowLeft,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Loader2,
  ChevronRight,
  Milk,
  Receipt
} from 'lucide-react';

interface DemandSummary {
  id: string;
  demandNumber: string;
  status: 'DELIVERED' | 'PARTIALLY_DELIVERED' | 'CANCELLED';
  expectedDeliveryDate?: string | null;
  totalEstimatedAmount: number;
  totalActualAmount?: number | null;
  createdAt: string;
  _count?: {
    items: number;
  };
  items?: Array<{
    dairyProduct: {
      brand: string;
      name: string;
    };
    quantity: number;
  }>;
  receipt?: {
    receiptNumber: string;
  } | null;
}

export default function DemandHistoryPage() {
  const [demands, setDemands] = useState<DemandSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DELIVERED' | 'CANCELLED'>('ALL');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/demands');
      const data = await res.json();
      // Filter only historical statuses
      const hist = (data.demands || []).filter((d: any) =>
        ['DELIVERED', 'PARTIALLY_DELIVERED', 'CANCELLED'].includes(d.status)
      );
      setDemands(hist);
    } catch (err) {
      console.error('Error fetching demand history:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = demands.filter((d) => {
    if (statusFilter === 'DELIVERED' && d.status !== 'DELIVERED' && d.status !== 'PARTIALLY_DELIVERED') {
      return false;
    }
    if (statusFilter === 'CANCELLED' && d.status !== 'CANCELLED') {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        d.demandNumber.toLowerCase().includes(q) ||
        (d.receipt?.receiptNumber && d.receipt.receiptNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalDeliveredAmount = demands
    .filter((d) => d.status === 'DELIVERED' || d.status === 'PARTIALLY_DELIVERED')
    .reduce((sum, d: any) => {
      const amount =
        Number(d.receipt?.grandTotal) ||
        d.items?.reduce((s: number, it: any) => s + (Number(it.requestedQty || it.quantity || 0) * Number(it.rate || it.dairyProduct?.defaultRate || 0)), 0) ||
        Number(d.totalActualAmount) ||
        Number(d.totalEstimatedAmount) ||
        0;
      return sum + amount;
    }, 0);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/seller/demands"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#073B6F] mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Active Demands
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <History className="w-5 h-5 text-[#39A9E8]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Demand History & Receipts</h1>
              <p className="text-xs text-slate-500">
                View past fulfilled and cancelled dairy demands and access official receipts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Demands</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {demands.filter((d) => d.status === 'DELIVERED' || d.status === 'PARTIALLY_DELIVERED').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Value Fulfilled</p>
          <p className="text-2xl font-black text-[#073B6F] mt-1">
            ₹{totalDeliveredAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cancelled Demands</p>
          <p className="text-2xl font-black text-slate-600 mt-1">
            {demands.filter((d) => d.status === 'CANCELLED').length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by demand / receipt #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#073B6F]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['ALL', 'DELIVERED', 'CANCELLED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === tab
                  ? 'bg-[#073B6F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'ALL' ? 'All History' : tab === 'DELIVERED' ? 'Fulfilled' : 'Cancelled'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="min-h-[30vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#073B6F]" />
          <p className="text-xs text-slate-400">Loading history records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <Milk className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No Past Demands Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Completed or cancelled demands will be archived here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((d) => {
            const hasReceipt = d.status === 'DELIVERED' || d.status === 'PARTIALLY_DELIVERED';
            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-slate-900">
                      Demand #{d.demandNumber}
                    </span>
                    {d.status === 'DELIVERED' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Fully Delivered
                      </span>
                    )}
                    {d.status === 'PARTIALLY_DELIVERED' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" /> Partially Delivered
                      </span>
                    )}
                    {d.status === 'CANCELLED' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px] font-bold border border-rose-200">
                        <XCircle className="w-3 h-3 text-rose-600" /> Cancelled
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(d.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {d.receipt?.receiptNumber && (
                      <span className="text-slate-400">• Receipt: {d.receipt.receiptNumber}</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                    <span className="text-sm font-black text-slate-900">
                      ₹{(
                        Number(d.receipt?.grandTotal) ||
                        d.items?.reduce((sum: number, it: any) => sum + (Number(it.requestedQty || it.quantity || 0) * Number(it.rate || it.dairyProduct?.defaultRate || 0)), 0) ||
                        Number(d.totalActualAmount) ||
                        Number(d.totalEstimatedAmount) ||
                        0
                      ).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasReceipt && (
                      <Link
                        href={`/dashboard/seller/demands/${d.id}/receipt`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                      >
                        <FileText className="w-3.5 h-3.5" /> Receipt
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/seller/demands/${d.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                    >
                      Details <ChevronRight className="w-3.5 h-3.5" />
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
