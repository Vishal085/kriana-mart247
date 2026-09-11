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
  Phone,
  Store,
  MapPin,
  Printer,
  PackageCheck,
  Loader2,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

interface DemandItem {
  id: string;
  requestedQty: number;
  deliveredQty?: number | null;
  rate?: number | null;
  amount?: number | null;
  dairyProductId: string;
  dairyProduct: {
    id: string;
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
  shopkeeper: {
    id: string;
    fullName: string;
    mobile: string;
    shopkeeperProfile?: {
      shopName?: string | null;
      shopAddress?: string | null;
    } | null;
  };
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

export default function AdminDemandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [demand, setDemand] = useState<DemandDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fulfillment form states
  const [suppliedQuantities, setSuppliedQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchDemand();
  }, [resolvedParams.id]);

  const fetchDemand = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/demands/${resolvedParams.id}`);
      if (!res.ok) {
        throw new Error('Failed to load demand');
      }
      const data = await res.json();
      const dem: DemandDetail = data.demand || data;
      setDemand(dem);

      // Initialize supplied quantities
      const initialSupplied: Record<string, number> = {};
      dem.items.forEach((item) => {
        initialSupplied[item.id] =
          item.deliveredQty !== null && item.deliveredQty !== undefined
            ? Number(item.deliveredQty)
            : Number(item.requestedQty);
      });
      setSuppliedQuantities(initialSupplied);
    } catch (err: any) {
      setError(err.message || 'Error loading demand');
    } finally {
      setLoading(false);
    }
  };

  const handleStartProcessing = async () => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/demands/${resolvedParams.id}/process`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start processing');
      fetchDemand();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFulfillDemand = async () => {
    try {
      setActionLoading(true);
      const itemsPayload = demand?.items.map((item) => ({
        dairyProductId: item.dairyProductId,
        deliveredQty: Math.max(0, suppliedQuantities[item.id] ?? Number(item.requestedQty)),
        rate: Number(item.dairyProduct.defaultRate),
      }));

      const res = await fetch(`/api/admin/demands/${resolvedParams.id}/fulfill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fulfill demand');

      alert('Demand fulfillment recorded & receipt generated!');
      fetchDemand();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendWhatsApp = async () => {
    try {
      const res = await fetch(`/api/admin/demands/${resolvedParams.id}/whatsapp`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.waUrl) {
        window.open(data.waUrl, '_blank');
      } else {
        alert(data.error || 'Could not generate WhatsApp receipt link.');
      }
    } catch (err) {
      alert('Error connecting to WhatsApp');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#073B6F]" />
        <p className="text-sm font-medium text-slate-500">Loading demand file...</p>
      </div>
    );
  }

  if (error || !demand) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-red-900">Demand Not Found</h2>
          <p className="text-xs text-red-700 mt-1">{error}</p>
          <Link
            href="/dashboard/admin/demands"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#073B6F] text-white rounded-xl font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demands List
          </Link>
        </div>
      </div>
    );
  }

  const isNew = demand.status === 'NEW';
  const isProcessing = demand.status === 'PROCESSING';
  const isFulfilled =
    demand.status === 'DELIVERED' || demand.status === 'PARTIALLY_DELIVERED';

  const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;
  const shopAddress = demand.shopkeeper.shopkeeperProfile?.shopAddress;

  const estimatedTotal = demand.items.reduce(
    (sum, item) => sum + Number(item.requestedQty) * Number(item.dairyProduct.defaultRate),
    0
  );

  return (
    <div className="relative max-w-5xl mx-auto p-4 sm:p-6 space-y-6 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      {/* Top Decorative Brand Graphic Accent Bar */}
      <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-[#073B6F] via-[#39A9E8] to-[#72B82A] shadow-xs" />

      {/* Official Branded Header with Background Graphics */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 p-5 sm:p-6 shadow-xs">
        {/* Background Graphic Watermark Shapes */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#39A9E8]/15 to-[#073B6F]/5 blur-2xl select-none" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-[#72B82A]/10 blur-xl select-none" />
        <div className="pointer-events-none absolute right-1/4 bottom-0 opacity-[0.04] print:opacity-[0.06] select-none">
          <img src="/brand/logo.png" alt="" className="h-32 w-32 object-contain" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src="/brand/logo.png"
              alt="KiranaMart Logo"
              className="h-14 w-14 sm:h-16 sm:sm:w-16 rounded-2xl object-contain bg-white border border-blue-100 shadow-xs p-1 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-[#073B6F] tracking-tight">
                  Kirana<span className="text-[#39A9E8]">Mart</span>
                </span>
                <span className="rounded-full bg-blue-100/90 border border-blue-200 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#073B6F]">
                  Wholesale Dairy Dispatch
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                Official Merchant Demand &amp; Dispatch Statement
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>Govt Regd APMC &amp; FMCG Direct Supply</span>
                <span>•</span>
                <span>Wholesale Support: +91 85100 83082</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-blue-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-[#073B6F]">
                #{demand.demandNumber}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs ${
                  demand.status === 'NEW'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : demand.status === 'PROCESSING'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : demand.status === 'DELIVERED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : demand.status === 'PARTIALLY_DELIVERED'
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {demand.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Placed on {new Date(demand.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Screen Action Bar (Hidden in Print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <Link
          href="/dashboard/admin/demands"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#073B6F] transition px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Demands
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {isNew && (
            <button
              onClick={handleStartProcessing}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#073B6F] hover:bg-[#0B5FA5] text-white rounded-xl font-bold text-xs shadow-xs transition disabled:opacity-50"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PackageCheck className="w-4 h-4" />}
              Start Processing Demand
            </button>
          )}

          {isFulfilled && (
            <button
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition"
            >
              <MessageCircle className="w-4 h-4" /> Send WhatsApp Receipt
            </button>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-600" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Grid: Shopkeeper Info & Demand Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Shopkeeper Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-black uppercase tracking-wider">
            <Store className="w-4 h-4 text-[#073B6F]" /> Shopkeeper Details
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">
              {shopName}
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Contact: {demand.shopkeeper.fullName}
            </p>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <a href={`tel:${demand.shopkeeper.mobile}`} className="hover:underline text-[#0B5FA5]">
                {demand.shopkeeper.mobile}
              </a>
            </p>
            {shopAddress && (
              <p className="text-xs text-slate-500 flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                {shopAddress}
              </p>
            )}
          </div>
        </div>

        {/* Logistics Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="text-slate-400 text-[11px] font-black uppercase tracking-wider">
            Logistics &amp; Summary
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Requisition Value:</span>
              <span className="font-bold text-slate-900">
                ₹{estimatedTotal.toFixed(2)}
              </span>
            </div>
            {demand.receipt && (
              <>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-100 pt-2">
                  <span>Final Fulfilled Value:</span>
                  <span className="text-base font-black">₹{Number(demand.receipt.grandTotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Receipt Number:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {demand.receipt.receiptNumber}
                  </span>
                </div>
              </>
            )}
            {demand.notes && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">Shopkeeper Note:</span>
                <p className="text-xs text-slate-700 italic mt-0.5">&ldquo;{demand.notes}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items Breakdown & Fulfillment Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden relative">
        {/* Subtle Watermark Background Graphic across the items table */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.028] print:opacity-[0.05] select-none z-0">
          <div className="flex flex-col items-center justify-center -rotate-12">
            <img src="/brand/logo.png" alt="" className="w-72 h-72 object-contain" />
            <span className="mt-2 text-xl font-black tracking-widest text-[#073B6F] uppercase">
              KiranaMart Verified Dispatch
            </span>
          </div>
        </div>

        <div className="relative z-10 p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Milk className="w-5 h-5 text-[#073B6F]" /> Requisitioned Dairy Products
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isProcessing
                ? 'Enter actual quantities supplied during dispatch to generate an accurate delivery receipt.'
                : 'Summary of requested and supplied dairy items.'}
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-700 shadow-2xs">
            {demand.items.length} Products
          </span>
        </div>

        <div className="relative z-10 overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[560px]">
            <thead className="bg-[#F8FAFC] border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Brand</th>
                <th className="px-5 py-3.5 text-center">Requested Qty</th>
                <th className="px-5 py-3.5 text-center">
                  {isProcessing ? 'Actual Supplied Qty' : 'Supplied Qty'}
                </th>
                <th className="px-5 py-3.5 text-right">Unit Rate</th>
                <th className="px-5 py-3.5 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demand.items.map((item) => {
                const reqQty = Number(item.requestedQty);
                const supplied = suppliedQuantities[item.id] ?? reqQty;
                const rate = Number(item.rate ?? item.dairyProduct.defaultRate);
                const lineTotal = (isFulfilled ? Number(item.deliveredQty ?? reqQty) : supplied) * rate;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-slate-900">{item.dairyProduct.name}</p>
                      {item.dairyProduct.variant && (
                        <p className="text-[10px] text-slate-400">{item.dairyProduct.variant}</p>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-700">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px]">
                        {item.dairyProduct.brand}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center font-bold text-slate-600">
                      {reqQty} {item.dairyProduct.unit}
                    </td>

                    {/* Actual Supplied Control */}
                    <td className="px-5 py-3.5 text-center">
                      {isProcessing ? (
                        <div className="inline-flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={supplied}
                            onChange={(e) => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              setSuppliedQuantities((prev) => ({
                                ...prev,
                                [item.id]: val,
                              }));
                            }}
                            className="w-16 px-2 py-1 text-center font-black text-xs rounded-lg border border-slate-300 focus:border-[#073B6F] focus:outline-hidden"
                          />
                          <span className="text-[10px] font-bold text-slate-400">
                            {item.dairyProduct.unit}
                          </span>
                        </div>
                      ) : (
                        <span
                          className={`font-black ${
                            Number(item.deliveredQty ?? reqQty) < reqQty
                              ? 'text-amber-600'
                              : 'text-slate-900'
                          }`}
                        >
                          {Number(item.deliveredQty ?? reqQty)} {item.dairyProduct.unit}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right font-medium text-slate-600">
                      ₹{rate.toFixed(2)}
                    </td>

                    <td className="px-5 py-3.5 text-right font-black text-slate-900">
                      ₹{lineTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-[#F8FAFC] border-t border-slate-200 font-bold text-slate-900">
              <tr>
                <td colSpan={5} className="px-5 py-3 text-right text-xs">
                  Grand Total Amount:
                </td>
                <td className="px-5 py-3 text-right text-sm font-black text-[#073B6F]">
                  ₹{(demand.receipt ? Number(demand.receipt.grandTotal) : estimatedTotal).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Fulfillment Action Form for Admin (Hidden in print) */}
        {isProcessing && (
          <div className="print:hidden p-6 bg-blue-50/40 border-t border-blue-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Note: If supplied quantity is less than requested, status will automatically record as{' '}
                <strong className="text-teal-700">Partially Delivered</strong>.
              </p>
              <button
                type="button"
                onClick={handleFulfillDemand}
                disabled={actionLoading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PackageCheck className="w-4 h-4" />
                )}
                Confirm Dispatch &amp; Generate Receipt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Official Signatures & Verification Box (Prints on paper) */}
      <div className="hidden print:grid grid-cols-3 gap-5 pt-6 border-t-2 border-dashed border-slate-300 mt-6 text-xs text-slate-700 break-inside-avoid">
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/70">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">KiranaMart Dispatch Officer</p>
          <div className="h-12 flex items-end">
            <div className="w-full border-b border-slate-400"></div>
          </div>
          <p className="text-[9px] text-slate-500 mt-1">Authorized Sign &amp; Date</p>
        </div>

        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/70">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Shopkeeper / Receiver</p>
          <div className="h-12 flex items-end">
            <div className="w-full border-b border-slate-400"></div>
          </div>
          <p className="text-[9px] text-slate-500 mt-1">Received in Good Order</p>
        </div>

        <div className="border border-emerald-200 rounded-xl p-3 bg-emerald-50/50 text-center flex flex-col items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-1 shadow-2xs">
            ✓
          </div>
          <p className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Official Wholesale Seal</p>
          <p className="text-[9px] text-emerald-600 mt-0.5">KiranaMart.com Mandi Network</p>
        </div>
      </div>

      {/* Admin Quick Tips Card (Screen only - Hidden in print) */}
      <div className="print:hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-800">Admin Demand Operations</p>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            1. Keep demands in &apos;PROCESSING&apos; while vehicles are loading. This prevents the shopkeeper from altering quantities mid-dispatch.
            <br />
            2. When delivery completes, mark actual items supplied. If items are out of stock, adjust quantity down — total billed amount will adjust automatically.
            <br />
            3. Tap &apos;Send WhatsApp Receipt&apos; to instantly dispatch an itemized statement to the shopkeeper.
          </p>
        </div>
      </div>
    </div>
  );
}
