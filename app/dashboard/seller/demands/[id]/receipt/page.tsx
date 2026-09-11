'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  FileCheck2,
  AlertCircle,
  Loader2,
  Milk,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface ReceiptData {
  id: string;
  demandNumber: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  shopkeeper: {
    fullName: string;
    mobile: string;
    shopkeeperProfile?: {
      shopName?: string | null;
      shopAddress?: string | null;
    } | null;
  };
  items: Array<{
    id: string;
    requestedQty: number;
    deliveredQty?: number | null;
    rate?: number | null;
    amount?: number | null;
    dairyProduct: {
      name: string;
      brand: string;
      variant?: string | null;
      unit: string;
      defaultRate: number;
    };
  }>;
  receipt?: {
    id: string;
    receiptNumber: string;
    totalRequested: number;
    totalDelivered: number;
    grandTotal: number;
    generatedAt: string;
  } | null;
}

export default function ShopkeeperReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [demand, setDemand] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReceipt();
  }, [resolvedParams.id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/demands/${resolvedParams.id}/receipt`);
      if (!res.ok) {
        throw new Error('Receipt not available yet or demand not found');
      }
      const json = await res.json();
      setDemand(json.demand || json);
    } catch (err: any) {
      setError(err.message || 'Failed to load receipt');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#073B6F]" />
        <p className="text-sm font-medium text-slate-500">Generating dairy receipt...</p>
      </div>
    );
  }

  if (error || !demand) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-amber-900">Receipt Not Available</h2>
          <p className="text-xs text-amber-700 mt-1">
            {error || 'Receipt is generated once the demand is fulfilled or marked delivered by the admin.'}
          </p>
          <Link
            href={`/dashboard/seller/demands/${resolvedParams.id}`}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#073B6F] text-white rounded-xl font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demand
          </Link>
        </div>
      </div>
    );
  }

  const receipt = demand.receipt;
  const isDelivered = demand.status === 'DELIVERED';
  const isPartial = demand.status === 'PARTIALLY_DELIVERED';
  const shopName = demand.shopkeeper.shopkeeperProfile?.shopName || demand.shopkeeper.fullName;
  const shopAddress = demand.shopkeeper.shopkeeperProfile?.shopAddress;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 print:max-w-none print:p-0 print:m-0 print:space-y-0">
      {/* Top Actions - Hidden during Print */}
      <div className="print:hidden flex items-center justify-between gap-4">
        <Link
          href={`/dashboard/seller/demands/${demand.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#073B6F] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Demand
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#073B6F] hover:bg-[#0B5FA5] text-white rounded-xl font-bold text-xs shadow-sm transition"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      {/* Printable Receipt Paper Container */}
      <div className="receipt-paper bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8 print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-3 print:rounded-none">
        {/* Receipt Header - Centered Branding */}
        <div className="border-b border-slate-200 pb-6 print:pb-3">
          {/* Centered Logo & Name */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/brand/logo.png"
              alt="KiranaMart Logo"
              className="h-16 w-16 rounded-2xl object-contain border border-slate-200 shadow-sm print:h-14 print:w-14 print:border-none print:shadow-none"
            />
            <h1 className="mt-2 text-2xl font-black text-[#073B6F] print:text-xl tracking-tight leading-tight">
              Kirana<span className="text-[#39A9E8]">Mart</span>
            </h1>
            <p className="mt-1 text-sm font-bold text-slate-600 print:text-xs tracking-wide">
              Demand full fill by Gupta Trading Company
            </p>
            <p className="text-[11px] text-slate-400 print:text-[9px] mt-1">
              Direct Mandi &amp; Dairy Delivery Network • Support: +91 98765 43210
            </p>
          </div>

          {/* Receipt Info Row below branding */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-dashed border-slate-200 print:flex-row print:pt-2 print:mt-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider print:text-[9px] print:py-0.5 print:px-2">
                {isDelivered ? 'Delivery Receipt' : 'Partial Delivery Receipt'}
              </span>
            </div>
            <div className="text-center sm:text-right space-y-0.5 print:text-right">
              <p className="text-xs font-black text-slate-900 print:text-[11px]">
                Receipt #: {receipt ? receipt.receiptNumber : `REC-${demand.demandNumber}`}
              </p>
              <p className="text-[11px] text-slate-500 print:text-[10px]">
                Demand Ref: #{demand.demandNumber}
              </p>
              <p className="text-[11px] text-slate-500 print:text-[10px]">
                Date:{' '}
                {new Date(receipt?.generatedAt || demand.createdAt).toLocaleDateString('en-IN', {
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

        {/* Bill To & Supply Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-100 print:grid-cols-2 print:p-2.5 print:gap-3 print:rounded-xl print:bg-slate-50 print:border-slate-200">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 print:text-[9px]">Delivered To:</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5 print:text-xs">
              {shopName}
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5 print:text-[10px]">
              Contact: {demand.shopkeeper.fullName} ({demand.shopkeeper.mobile})
            </p>
            {shopAddress && (
              <p className="text-xs text-slate-500 mt-0.5 print:text-[10px]">{shopAddress}</p>
            )}
          </div>

          <div className="sm:text-right print:text-right">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 print:text-[9px]">Fulfillment Status:</p>
            <div className="inline-flex items-center gap-1.5 mt-1 font-bold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 print:text-[10px] print:py-0.5 print:px-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isDelivered ? 'Complete Order Delivered' : 'Partially Delivered'}
            </div>
            {demand.notes && (
              <p className="text-[11px] text-slate-600 mt-1 italic print:text-[9px]">
                Note: {demand.notes}
              </p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full text-left text-xs print:text-[10px] min-w-[500px] print:min-w-0">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider print:bg-slate-100 print:text-[9px]">
              <tr>
                <th className="px-3 py-2.5 rounded-l-lg print:py-1.5 print:px-2">Product Details</th>
                <th className="px-3 py-2.5 text-center print:py-1.5 print:px-2">Brand</th>
                <th className="px-3 py-2.5 text-center print:py-1.5 print:px-2">Requested</th>
                <th className="px-3 py-2.5 text-center print:py-1.5 print:px-2">Supplied</th>
                <th className="px-3 py-2.5 text-right print:py-1.5 print:px-2">Rate</th>
                <th className="px-3 py-2.5 text-right rounded-r-lg print:py-1.5 print:px-2">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 print:divide-slate-200">
              {demand.items.map((item) => {
                const reqQty = Number(item.requestedQty);
                const supplied = Number(item.deliveredQty ?? reqQty);
                const rate = Number(item.rate ?? item.dairyProduct.defaultRate);
                const lineTotal = Number(item.amount ?? (supplied * rate));

                return (
                  <tr key={item.id} className="print:break-inside-avoid">
                    <td className="px-3 py-3 print:py-1.5 print:px-2">
                      <p className="font-bold text-slate-900">{item.dairyProduct.name}</p>
                      {item.dairyProduct.variant && (
                        <p className="text-[10px] text-slate-400 print:text-[9px]">{item.dairyProduct.variant}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center text-slate-700 font-semibold print:py-1.5 print:px-2">
                      {item.dairyProduct.brand}
                    </td>
                    <td className="px-3 py-3 text-center text-slate-500 print:py-1.5 print:px-2">
                      {reqQty} {item.dairyProduct.unit}
                    </td>
                    <td className="px-3 py-3 text-center font-bold text-slate-900 print:py-1.5 print:px-2">
                      <span className={supplied < reqQty ? 'text-amber-600' : 'text-slate-900'}>
                        {supplied} {item.dairyProduct.unit}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-slate-600 print:py-1.5 print:px-2">
                      ₹{rate.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-slate-900 print:py-1.5 print:px-2">
                      ₹{lineTotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="border-t border-slate-200 pt-4 print:pt-2 flex flex-col items-end print:break-inside-avoid">
          <div className="w-full sm:w-72 space-y-2 print:space-y-1 text-xs print:text-[10px]">
            <div className="flex justify-between text-slate-600">
              <span>Items Total:</span>
              <span className="font-bold">
                ₹{Number(receipt?.grandTotal ?? 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2 print:pt-1 print:text-sm">
              <span>Grand Total:</span>
              <span className="text-[#073B6F]">
                ₹{Number(receipt?.grandTotal ?? 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer info & Signature line */}
        <div className="border-t border-slate-200 pt-6 mt-6 print:pt-2 print:mt-2 grid grid-cols-2 gap-6 print:gap-4 text-[11px] text-slate-500 print:text-[9px] print:break-inside-avoid">
          <div>
            <p className="font-bold text-slate-700">Thank you for your business!</p>
            <p className="mt-0.5">
              This receipt confirms delivery of requested dairy supply. Please verify items upon receipt.
            </p>
          </div>
          <div className="text-right flex flex-col justify-end">
            <div className="w-36 border-b border-slate-300 ml-auto mb-1 print:w-28"></div>
            <p className="font-bold text-slate-700">Authorized Signatory</p>
            <p className="text-[10px] text-slate-400 print:text-[8px]">KiranaMart247 Supply Hub</p>
          </div>
        </div>
      </div>
    </div>
  );
}
