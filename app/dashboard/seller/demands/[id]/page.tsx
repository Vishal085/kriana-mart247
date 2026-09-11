'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Milk,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit3,
  Trash2,
  FileText,
  Loader2,
  HelpCircle
} from 'lucide-react';

interface DemandItem {
  id: string;
  requestedQty: number;
  deliveredQty?: number | null;
  rate?: number | null;
  amount?: number | null;
  dairyProductId: string;
  dairyProduct: {
    name: string;
    brand: string;
    variant?: string | null;
    unit: string;
    defaultRate: number;
  };
}

interface DemandDetail {
  id: string;
  demandNumber: string;
  status: 'NEW' | 'PROCESSING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'PARTIALLY_DELIVERED' | 'CANCELLED';
  notes?: string | null;
  createdAt: string;
  items: DemandItem[];
  receipt?: {
    id: string;
    receiptNumber: string;
    grandTotal: number;
    totalRequested: number;
    totalDelivered: number;
    generatedAt: string;
  } | null;
}

export default function ShopkeeperDemandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [demand, setDemand] = useState<DemandDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    fetchDemand();
  }, [resolvedParams.id]);

  const fetchDemand = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/demands/${resolvedParams.id}`);
      if (!res.ok) {
        throw new Error('Failed to load demand details');
      }
      const data = await res.json();
      setDemand(data.demand || data);
    } catch (err: any) {
      setError(err.message || 'Error loading demand');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDemand = async () => {
    try {
      setCancelling(true);
      const res = await fetch(`/api/demands/${resolvedParams.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel demand');
      }
      setShowCancelModal(false);
      fetchDemand();
    } catch (err: any) {
      alert(err.message || 'Error cancelling demand');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#073B6F]" />
        <p className="text-sm font-medium text-slate-500">Loading demand details...</p>
      </div>
    );
  }

  if (error || !demand) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-red-900">Demand Not Found</h2>
          <p className="text-sm text-red-700 mt-1">{error || 'Could not find the requested demand.'}</p>
          <Link
            href="/dashboard/seller/demands"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#073B6F] text-white rounded-xl font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demands
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: DemandDetail['status']) => {
    switch (status) {
      case 'NEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>New (Pending Review)</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
            <span>In Processing</span>
          </span>
        );
      case 'READY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Ready for Dispatch</span>
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-orange-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Fully Delivered</span>
          </span>
        );
      case 'PARTIALLY_DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Partially Delivered</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-full text-xs font-bold shrink-0 whitespace-nowrap shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  const isEditable = demand.status === 'NEW';
  const hasReceipt = Boolean(demand.receipt || demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED');

  const estimatedTotal = demand.items.reduce(
    (sum, item) => sum + Number(item.requestedQty) * Number(item.dairyProduct.defaultRate),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <Link
            href="/dashboard/seller/demands"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#073B6F] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Demands
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Demand #{demand.demandNumber}
            </h1>
            <div className="shrink-0">{getStatusBadge(demand.status)}</div>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span>
              Submitted on{' '}
              {new Date(demand.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {hasReceipt && (
            <Link
              href={`/dashboard/seller/demands/${demand.id}/receipt`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition"
            >
              <FileText className="w-4 h-4" /> View Receipt
            </Link>
          )}

          {isEditable && (
            <>
              <Link
                href={`/dashboard/seller/demands/${demand.id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition"
              >
                <Edit3 className="w-4 h-4 text-slate-600" /> Edit Demand
              </Link>
              <button
                onClick={() => setShowCancelModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs transition"
              >
                <Trash2 className="w-4 h-4 text-rose-600" /> Cancel Demand
              </button>
            </>
          )}
        </div>
      </div>

      {/* Status Progress Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
          Demand Status Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Step 1: Created */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              ✓
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">Demand Created</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Submitted by shopkeeper</p>
            </div>
          </div>

          {/* Step 2: Processing */}
          <div
            className={`flex items-start gap-3 p-3 rounded-xl border transition ${
              demand.status !== 'NEW' && demand.status !== 'CANCELLED'
                ? 'bg-blue-50/60 border-blue-200'
                : 'bg-slate-50 border-slate-200/60 opacity-60'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                demand.status !== 'NEW' && demand.status !== 'CANCELLED'
                  ? 'bg-[#073B6F] text-white'
                  : 'bg-slate-300 text-white'
              }`}
            >
              2
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">Admin Processing</p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {demand.status === 'NEW'
                  ? 'Waiting for admin review'
                  : 'Order locked & being fulfilled'}
              </p>
            </div>
          </div>

          {/* Step 3: Delivered */}
          <div
            className={`flex items-start gap-3 p-3 rounded-xl border transition ${
              demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED'
                ? 'bg-emerald-50/60 border-emerald-200'
                : demand.status === 'CANCELLED'
                ? 'bg-rose-50 border-rose-200'
                : 'bg-slate-50 border-slate-200/60 opacity-60'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED'
                  ? 'bg-emerald-600 text-white'
                  : demand.status === 'CANCELLED'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-300 text-white'
              }`}
            >
              {demand.status === 'CANCELLED' ? '✕' : '3'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {demand.status === 'CANCELLED'
                  ? 'Cancelled'
                  : demand.status === 'PARTIALLY_DELIVERED'
                  ? 'Partially Delivered'
                  : 'Delivered & Receipt'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {demand.status === 'CANCELLED'
                  ? 'Demand was cancelled'
                  : demand.receipt
                  ? `Receipt #${demand.receipt.receiptNumber}`
                  : 'Pending dispatch'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Requisition Value</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-xs text-slate-600">Total Products:</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{demand.items.length} items</span>
          </div>
          <div className="flex items-baseline justify-between mt-1.5 pt-1.5 border-t border-slate-100">
            <span className="text-xs text-slate-600">Est. Total Amount:</span>
            <span className="text-base font-black text-[#073B6F]">₹{estimatedTotal.toFixed(2)}</span>
          </div>
          {demand.notes && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400">Shopkeeper Instructions:</p>
              <p className="text-xs text-slate-700 italic mt-0.5">&ldquo;{demand.notes}&rdquo;</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fulfillment & Receipt</p>
          {demand.receipt ? (
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                <span className="text-slate-600">Receipt #:</span>
                <span className="font-mono font-bold text-slate-900">{demand.receipt.receiptNumber}</span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-emerald-700 font-bold border-t border-slate-100 pt-1.5">
                <span>Final Delivered Amount:</span>
                <span className="text-base font-black">₹{Number(demand.receipt.grandTotal).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-500 leading-relaxed">
              {demand.status === 'NEW'
                ? 'Demand is pending review by admin. Receipt will be generated once fulfilled.'
                : demand.status === 'PROCESSING'
                ? 'Admin is currently fulfilling your dairy dispatch.'
                : 'No delivery receipt generated for this demand.'}
            </div>
          )}
        </div>
      </div>

      {/* Requested Dairy Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Milk className="w-5 h-5 text-[#073B6F]" />
            <h2 className="text-sm sm:text-base font-black text-slate-900">Demanded Dairy Items</h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
            {demand.items.length} Products
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[560px]">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3 text-center">Requested Qty</th>
                {(demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED') && (
                  <th className="px-4 py-3 text-center">Supplied Qty</th>
                )}
                <th className="px-4 py-3 text-right">Unit Rate</th>
                <th className="px-4 py-3 text-right">Estimated Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demand.items.map((item) => {
                const reqQty = Number(item.requestedQty);
                const rate = Number(item.dairyProduct.defaultRate);
                const subtotal = reqQty * rate;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      <div>{item.dairyProduct.name}</div>
                      {item.dairyProduct.variant && (
                        <span className="inline-block text-[10px] font-normal text-slate-500 mt-0.5">
                          {item.dairyProduct.variant}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold">
                        {item.dairyProduct.brand}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-900 whitespace-nowrap">
                      {reqQty} {item.dairyProduct.unit}
                    </td>
                    {(demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED') && (
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span
                          className={`font-bold ${
                            Number(item.deliveredQty ?? reqQty) < reqQty
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {Number(item.deliveredQty ?? reqQty)} {item.dairyProduct.unit}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3.5 text-right font-medium text-slate-600 whitespace-nowrap">
                      ₹{rate.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                      ₹{subtotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-50/80 border-t border-slate-200 font-bold text-slate-900">
              <tr>
                <td colSpan={(demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED') ? 5 : 4} className="px-4 py-3 text-right text-xs">
                  Estimated Total Amount:
                </td>
                <td className="px-4 py-3 text-right text-sm text-[#073B6F] whitespace-nowrap">
                  ₹{estimatedTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>


      {/* Help / Guidance Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800">Demand Management Rules</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-slate-600">
            <li>Demands remain editable or cancellable as long as they are in &quot;NEW&quot; status.</li>
            <li>Once Admin marks your demand as &quot;PROCESSING&quot;, it cannot be edited to maintain supply integrity.</li>
            <li>Upon delivery, you will receive an official dairy receipt with actual delivered quantities.</li>
          </ul>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Cancel Demand #{demand.demandNumber}?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel this demand? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Keep Demand
              </button>
              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancelDemand}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
