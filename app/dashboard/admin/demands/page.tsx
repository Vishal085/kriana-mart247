'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Milk,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Loader2,
  ChevronRight,
  FileText,
  Phone,
  PackageCheck
} from 'lucide-react';

type DemandStatus =
  | 'ALL'
  | 'NEW'
  | 'PROCESSING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'PARTIALLY_DELIVERED'
  | 'CANCELLED';

interface DemandSummary {
  id: string;
  demandNumber: string;
  status: 'NEW' | 'PROCESSING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'PARTIALLY_DELIVERED' | 'CANCELLED';
  notes?: string | null;
  createdAt: string;
  shopkeeper: {
    id: string;
    fullName: string;
    mobile: string;
    shopkeeperProfile?: {
      shopName?: string | null;
    } | null;
  };
  items: Array<{
    id: string;
    requestedQty: number;
    deliveredQty?: number | null;
    rate?: number | null;
    amount?: number | null;
    dairyProduct: {
      brand: string;
      name: string;
      variant?: string | null;
      unit: string;
      defaultRate: number;
    };
  }>;
  receipt?: {
    id: string;
    receiptNumber: string;
    grandTotal: number;
  } | null;
}

export default function AdminDemandsPage() {
  const [demands, setDemands] = useState<DemandSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusTab, setStatusTab] = useState<DemandStatus>('ALL');
  const [search, setSearch] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchDemands();
  }, [statusTab]);

  const fetchDemands = async () => {
    try {
      setLoading(true);
      const url = statusTab === 'ALL'
        ? '/api/admin/demands'
        : `/api/admin/demands?status=${statusTab}`;
      const res = await fetch(url);
      const data = await res.json();
      setDemands(data.demands || []);
    } catch (err) {
      console.error('Failed to fetch admin demands:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartProcessing = async (id: string) => {
    try {
      setProcessingId(id);
      const res = await fetch(`/api/admin/demands/${id}/process`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start processing');
      }
      fetchDemands();
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredDemands = demands.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const shopName = d.shopkeeper.shopkeeperProfile?.shopName || '';
    return (
      d.demandNumber.toLowerCase().includes(q) ||
      d.shopkeeper.fullName.toLowerCase().includes(q) ||
      d.shopkeeper.mobile.includes(q) ||
      shopName.toLowerCase().includes(q)
    );
  });

  const countNew = demands.filter((d) => d.status === 'NEW').length;
  const countProcessing = demands.filter((d) => d.status === 'PROCESSING').length;
  const countDelivered = demands.filter(
    (d) => d.status === 'DELIVERED' || d.status === 'PARTIALLY_DELIVERED'
  ).length;

  const getStatusBadge = (status: DemandSummary['status']) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-amber-600" /> New
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-blue-600 animate-spin" /> Processing
          </span>
        );
      case 'READY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-purple-600" /> Ready
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 text-orange-800 rounded-full text-[11px] font-bold">
            <Clock className="w-3 h-3 text-orange-600" /> Out for Delivery
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Delivered
          </span>
        );
      case 'PARTIALLY_DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-teal-600" /> Partial
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-full text-[11px] font-bold">
            <XCircle className="w-3 h-3 text-rose-600" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-sm">
              <Milk className="h-7 w-7 text-blue-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                Dairy Demand Fulfillment Module
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F]">
                Shopkeeper Dairy Demands
              </h1>
              <p className="text-xs text-slate-500">
                Manage dairy requisitions, process morning supply batches, and generate delivery receipts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/admin"
              className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition"
            >
              ← Admin Home
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-slate-400">Total Demands</p>
          <p className="text-2xl font-black text-[#073B6F] mt-1">{demands.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-amber-700">New (Awaiting Review)</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{countNew}</p>
        </div>
        <div className="bg-white rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-blue-700">In Processing</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{countProcessing}</p>
        </div>
        <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase text-emerald-700">Delivered</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{countDelivered}</p>
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by demand #, shop, or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#073B6F]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['ALL', 'NEW', 'PROCESSING', 'DELIVERED', 'PARTIALLY_DELIVERED', 'CANCELLED'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  statusTab === tab
                    ? 'bg-[#073B6F] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'ALL'
                  ? 'All'
                  : tab === 'NEW'
                  ? `New (${countNew})`
                  : tab === 'PROCESSING'
                  ? `Processing (${countProcessing})`
                  : tab === 'DELIVERED'
                  ? 'Delivered'
                  : tab === 'PARTIALLY_DELIVERED'
                  ? 'Partial'
                  : 'Cancelled'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Demands Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-[#073B6F]" />
            <p className="text-xs text-slate-400 font-medium">Loading demands...</p>
          </div>
        ) : filteredDemands.length === 0 ? (
          <div className="py-16 text-center">
            <Milk className="w-12 h-12 text-slate-200 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No demands found</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {statusTab === 'ALL'
                ? 'No shopkeepers have placed dairy demands yet.'
                : `No demands currently in ${statusTab} status.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-4">Demand Ref</th>
                  <th className="px-5 py-4">Shopkeeper &amp; Store</th>
                  <th className="px-5 py-4">Items Summary</th>
                  <th className="px-5 py-4">Est. Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date Placed</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDemands.map((demand) => {
                  const totalUnits = demand.items.reduce((s, i) => s + Number(i.requestedQty), 0);
                  const estAmount = demand.items.reduce(
                    (s, i) => s + Number(i.requestedQty) * Number(i.dairyProduct.defaultRate),
                    0
                  );
                  const isNew = demand.status === 'NEW';
                  const isProcessing = demand.status === 'PROCESSING';
                  const isFulfilled =
                    demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED';
                  const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;

                  return (
                    <tr key={demand.id} className="hover:bg-slate-50/70 transition">
                      {/* Demand Ref */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/dashboard/admin/demands/${demand.id}`}
                          className="font-black text-[#073B6F] hover:underline flex items-center gap-1.5"
                        >
                          #{demand.demandNumber}
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                      </td>

                      {/* Shopkeeper */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">
                          {shopName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {demand.shopkeeper.fullName} ({demand.shopkeeper.mobile})
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-800">
                          {demand.items.length} Products ({totalUnits} Units)
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                          {demand.items.map((i) => `${i.requestedQty}x ${i.dairyProduct.name}`).join(', ')}
                        </div>
                      </td>

                      {/* Est Amount */}
                      <td className="px-5 py-4 font-black text-slate-900">
                        ₹{(demand.receipt ? Number(demand.receipt.grandTotal) : estAmount).toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        {getStatusBadge(demand.status)}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-slate-500 text-[11px]">
                        {new Date(demand.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isNew && (
                            <button
                              onClick={() => handleStartProcessing(demand.id)}
                              disabled={processingId === demand.id}
                              className="px-3 py-1.5 bg-[#073B6F] hover:bg-[#0B5FA5] text-white font-bold rounded-lg text-xs shadow-xs transition disabled:opacity-50"
                            >
                              {processingId === demand.id ? 'Starting...' : 'Process'}
                            </button>
                          )}

                          {isProcessing && (
                            <Link
                              href={`/dashboard/admin/demands/${demand.id}`}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center gap-1"
                            >
                              <PackageCheck className="w-3.5 h-3.5" /> Fulfill
                            </Link>
                          )}

                          {isFulfilled && (
                            <Link
                              href={`/dashboard/admin/demands/${demand.id}`}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" /> Receipt
                            </Link>
                          )}

                          <Link
                            href={`/dashboard/admin/demands/${demand.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#073B6F] hover:bg-slate-100 transition"
                            title="View Demand Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
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
