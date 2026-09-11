'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Milk,
  Plus,
  Minus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Save,
  CheckCircle2
} from 'lucide-react';

interface DairyProduct {
  id: string;
  name: string;
  brand: string;
  variant?: string | null;
  unit: string;
  defaultRate: number;
}

export default function EditDemandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [catalogue, setCatalogue] = useState<DairyProduct[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [demandNumber, setDemandNumber] = useState('');

  useEffect(() => {
    fetchData();
  }, [resolvedParams.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Fetch dairy catalogue
      const catRes = await fetch('/api/dairy-products');
      const catData = await catRes.json();
      const allProducts: DairyProduct[] = [];
      if (catData.grouped) {
        Object.values(catData.grouped).forEach((list: any) => {
          allProducts.push(...list);
        });
      }
      setCatalogue(allProducts);

      // 2. Fetch existing demand
      const demRes = await fetch(`/api/demands/${resolvedParams.id}`);
      if (!demRes.ok) {
        throw new Error('Demand not found');
      }
      const rawData = await demRes.json();
      const demData = rawData.demand || rawData;

      if (demData.status !== 'NEW') {
        alert('This demand has already begun processing and cannot be edited.');
        router.push(`/dashboard/seller/demands/${resolvedParams.id}`);
        return;
      }

      setDemandNumber(demData.demandNumber);
      setNotes(demData.notes || '');

      const itemMap: Record<string, number> = {};
      demData.items.forEach((item: any) => {
        itemMap[item.dairyProductId] = Number(item.requestedQty);
      });
      setSelectedItems(itemMap);
    } catch (err: any) {
      setError(err.message || 'Error loading demand');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string, qty: number) => {
    const validQty = Math.max(0, Math.floor(qty));
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (validQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = validQty;
      }
      return updated;
    });
  };

  const totalItemsCount = Object.values(selectedItems).reduce((sum, q) => sum + q, 0);

  const calculateTotalAmount = () => {
    return Object.entries(selectedItems).reduce((sum, [pId, qty]) => {
      const p = catalogue.find((item) => item.id === pId);
      return sum + (p ? Number(p.defaultRate) * qty : 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItemsCount <= 0) {
      setError('Please add at least 1 product with a quantity greater than 0.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const items = Object.entries(selectedItems).map(([dairyProductId, requestedQty]) => ({
        dairyProductId,
        requestedQty,
      }));

      const res = await fetch(`/api/demands/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update demand');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/seller/demands/${resolvedParams.id}`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to update demand');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#073B6F]" />
        <p className="text-sm font-medium text-slate-500">Loading demand for editing...</p>
      </div>
    );
  }

  // Group catalogue by brand for editing
  const groupedCatalogue: Record<string, DairyProduct[]> = {};
  catalogue.forEach((p) => {
    if (!groupedCatalogue[p.brand]) groupedCatalogue[p.brand] = [];
    groupedCatalogue[p.brand].push(p);
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href={`/dashboard/seller/demands/${resolvedParams.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#073B6F] mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel & Back
          </Link>
          <h1 className="text-2xl font-black text-slate-900">
            Edit Demand #{demandNumber}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update quantities or adjust dairy items. All quantities must be greater than 0.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Demand updated successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            1. Special Instructions / Notes
          </h2>
          <div>
            <input
              type="text"
              placeholder="e.g. Please supply by 6:00 AM"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#073B6F]"
            />
          </div>
        </div>

        {/* Product Catalogue Selection */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            2. Adjust Dairy Items
          </h2>

          {Object.entries(groupedCatalogue).map(([brand, products]) => (
            <div key={brand} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="font-black text-xs text-slate-800 uppercase tracking-wide">
                  {brand}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  {products.length} Items Available
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {products.map((product) => {
                  const currentQty = selectedItems[product.id] || 0;
                  return (
                    <div
                      key={product.id}
                      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition ${
                        currentQty > 0 ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {product.name}
                          {product.variant && ` (${product.variant})`}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ₹{Number(product.defaultRate).toFixed(2)} per {product.unit}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        {currentQty === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#073B6F] hover:text-white text-slate-700 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center bg-white border border-[#073B6F]/30 rounded-xl overflow-hidden shadow-xs">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(product.id, currentQty - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={currentQty}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                              className="w-12 text-center text-xs font-black text-slate-900 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(product.id, currentQty + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                        {currentQty > 0 && (
                          <span className="text-xs font-black text-slate-900 w-16 text-right">
                            ₹{(Number(product.defaultRate) * currentQty).toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">
                {totalItemsCount} units selected
              </p>
              <p className="text-lg font-black text-slate-900">
                ₹{calculateTotalAmount().toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/seller/demands/${resolvedParams.id}`}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || totalItemsCount === 0}
                className="px-6 py-2.5 rounded-xl bg-[#073B6F] hover:bg-[#0B5FA5] text-white font-black text-xs shadow-md transition disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Demand Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
