'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Milk,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShoppingBasket,
  Send,
  Search,
  Sparkles,
  Mic,
  Filter,
  Check
} from 'lucide-react';
import AiVoiceDemandAssistant from '@/components/demand/AiVoiceDemandAssistant';

interface DairyProduct {
  id: string;
  brand: string;
  name: string;
  variant?: string | null;
  unit: string;
  defaultRate: number;
}

interface CartItem {
  product: DairyProduct;
  qty: number;
}

const BRAND_THEMES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  'Mother Dairy': {
    bg: 'bg-blue-50/60',
    border: 'border-blue-200',
    text: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  'Madhusudan': {
    bg: 'bg-amber-50/60',
    border: 'border-amber-200',
    text: 'text-amber-900',
    badge: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  'Arlys': {
    bg: 'bg-emerald-50/60',
    border: 'border-emerald-200',
    text: 'text-emerald-900',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  'Amul': {
    bg: 'bg-yellow-50/60',
    border: 'border-yellow-200',
    text: 'text-yellow-900',
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
};

export default function NewDemandPage() {
  const router = useRouter();
  const [grouped, setGrouped] = useState<Record<string, DairyProduct[]>>({});
  const [cart, setCart] = useState<Record<string, number>>({}); // productId -> qty
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Search & Brand Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');

  // AI Assistant Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/dairy-products')
      .then((r) => r.json())
      .then((d) => {
        setGrouped(d.products || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load dairy catalogue:', err);
        setError('Failed to load dairy catalogue. Please refresh.');
        setLoading(false);
      });
  }, []);

  const allProducts: DairyProduct[] = useMemo(() => {
    return Object.values(grouped).flat();
  }, [grouped]);

  const brands = useMemo(() => {
    return Object.keys(grouped);
  }, [grouped]);

  function setQty(productId: string, qty: number) {
    if (qty <= 0) {
      setCart((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    } else {
      setCart((prev) => ({ ...prev, [productId]: qty }));
    }
  }

  function incrementQty(productId: string) {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  }

  function decrementQty(productId: string) {
    const current = cart[productId] || 0;
    setQty(productId, current - 1);
  }

  function removeItem(productId: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  // Filtered catalogue
  const filteredGrouped = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result: Record<string, DairyProduct[]> = {};

    Object.entries(grouped).forEach(([brand, products]) => {
      if (selectedBrand !== 'ALL' && brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return;
      }

      const matching = products.filter((p) => {
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          (p.variant && p.variant.toLowerCase().includes(q)) ||
          p.brand.toLowerCase().includes(q) ||
          p.unit.toLowerCase().includes(q)
        );
      });

      if (matching.length > 0) {
        result[brand] = matching;
      }
    });

    return result;
  }, [grouped, searchQuery, selectedBrand]);

  // Selected Cart Items Summary
  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({
        product: allProducts.find((p) => p.id === id)!,
        qty,
      }))
      .filter((ci) => ci.product);
  }, [cart, allProducts]);

  const totalItems = cartItems.length;
  const totalUnits = cartItems.reduce((sum, ci) => sum + ci.qty, 0);
  const estimatedTotal = cartItems.reduce((sum, ci) => sum + ci.qty * ci.product.defaultRate, 0);

  // Submit Handler
  async function handleSubmit() {
    if (submitting) return; // Prevent duplicate submission

    setValidationErrors([]);
    const errors: string[] = [];

    if (cartItems.length === 0) {
      errors.push('Please select at least one dairy product.');
    }
    for (const ci of cartItems) {
      if (ci.qty <= 0) {
        errors.push(`Quantity for ${ci.product.name} must be greater than 0.`);
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((ci) => ({
            dairyProductId: ci.product.id,
            requestedQty: ci.qty,
          })),
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demand');
      }

      setSuccessMsg(`Demand ${data.demand.demandNumber} created successfully! Redirecting...`);
      setCart({});
      
      setTimeout(() => {
        router.push(`/dashboard/seller/demands/${data.demand.id}?submitted=1`);
      }, 1200);
    } catch (e: any) {
      setError(e.message || 'An error occurred while submitting demand');
      setSubmitting(false);
    }
  }

  // Handle applying items from AI Voice Assistant
  function handleApplyAiCart(appliedCart: Record<string, number>) {
    setCart((prev) => ({
      ...prev,
      ...appliedCart
    }));
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#073B6F]" />
        <p className="mt-3 text-xs font-semibold text-slate-500">Loading Dairy Product Catalogue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-40">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/seller/demands" className="text-xs font-bold text-slate-500 hover:text-[#073B6F] transition">
            ← Demands
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-xs font-black text-[#073B6F]">New Dairy Demand</span>
        </div>

        {/* AI Voice Assistant Trigger Button */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-black text-white shadow-md hover:shadow-indigo-200/80 hover:scale-[1.02] active:scale-95 transition"
        >
          <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
          <Mic className="h-4 w-4" />
          <span>Create Demand with AI</span>
          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yellow-200">
            Voice
          </span>
        </button>
      </div>

      {/* Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <img
              src="/brand/logo.png"
              alt="KiranaMart Logo"
              className="h-11 w-11 shrink-0 rounded-xl object-contain bg-white border border-blue-100 shadow-sm p-0.5"
            />
            <div>
              <h1 className="text-base font-black text-[#073B6F]">Create Dairy &amp; Milk Demand</h1>
              <p className="mt-0.5 text-xs text-slate-600">
                Select your required products, adjust quantities, or speak directly to the AI Assistant.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition shrink-0"
          >
            <Mic className="h-4 w-4 text-indigo-600" />
            <span>Speak in Hindi / English</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 flex items-center gap-3 text-xs font-bold text-emerald-800 shadow-sm animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <div>{successMsg}</div>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 space-y-1 shadow-sm">
          {validationErrors.map((e, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-red-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" /> {e}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-3 flex items-center gap-2 text-xs font-bold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" /> {error}
        </div>
      )}

      {/* Search & Brand Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milk, chhach, dahi, full cream, cow milk..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-[#39A9E8] focus:ring-2 focus:ring-[#39A9E8]/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Brand Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedBrand('ALL')}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
              selectedBrand === 'ALL'
                ? 'bg-[#073B6F] text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Brands</span>
            <span className="text-[10px] opacity-80">({allProducts.length})</span>
          </button>
          {brands.map((brand) => {
            const count = grouped[brand]?.length || 0;
            const selectedCount = grouped[brand]?.filter((p) => cart[p.id] > 0).length || 0;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedBrand === brand
                    ? 'bg-[#073B6F] text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{brand}</span>
                <span className="text-[10px] opacity-80">({count})</span>
                {selectedCount > 0 && (
                  <span className="ml-1 rounded-full bg-emerald-500 px-1.5 py-0.2 text-[9px] font-black text-white">
                    {selectedCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Catalogue on Left, Selected Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product Catalogue */}
        <div className="lg:col-span-7 space-y-5">
          {Object.keys(filteredGrouped).length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <Milk className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-bold text-slate-600">No products found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedBrand('ALL'); }}
                className="mt-3 text-xs font-bold text-[#073B6F] underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            Object.entries(filteredGrouped).map(([brand, products]) => {
              const theme = BRAND_THEMES[brand] || {
                bg: 'bg-slate-50/60',
                border: 'border-slate-200',
                text: 'text-slate-900',
                badge: 'bg-slate-100 text-slate-700 border-slate-200'
              };
              const brandItemCount = products.filter((p) => cart[p.id] > 0).length;

              return (
                <div key={brand} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className={`flex items-center justify-between px-4 py-3 border-b ${theme.border} ${theme.bg}`}>
                    <div className="flex items-center gap-2">
                      <Milk className="h-4 w-4 text-[#073B6F]" />
                      <span className={`text-sm font-black ${theme.text}`}>{brand}</span>
                      <span className="text-[11px] text-slate-500">({products.length} products)</span>
                    </div>
                    {brandItemCount > 0 && (
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${theme.badge}`}>
                        {brandItemCount} selected
                      </span>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100">
                    {products.map((product) => {
                      const qty = cart[product.id] || 0;
                      return (
                        <div
                          key={product.id}
                          className={`flex items-center justify-between px-4 py-3 gap-3 transition ${
                            qty > 0 ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-slate-800">
                                {product.name}
                              </span>
                              {product.variant && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                                  {product.variant}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                              <span className="font-bold text-slate-700">₹{Number(product.defaultRate).toFixed(0)}</span>
                              <span>/</span>
                              <span>{product.unit}</span>
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {qty > 0 ? (
                              <div className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white p-1 shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => decrementQty(product.id)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition active:scale-90"
                                  title="Decrease"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <input
                                  type="number"
                                  min={1}
                                  value={qty}
                                  onChange={(e) => setQty(product.id, parseInt(e.target.value) || 0)}
                                  className="w-12 text-center text-xs font-black text-[#073B6F] outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => incrementQty(product.id)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#073B6F] text-white hover:bg-[#0B5FA5] transition active:scale-90"
                                  title="Increase"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => incrementQty(product.id)}
                                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-[#073B6F] hover:bg-[#EAF5FC] hover:text-[#073B6F] transition shadow-xs active:scale-95"
                              >
                                <Plus className="h-3.5 w-3.5" /> Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Items Summary + Notes */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selected Items Summary Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="h-4 w-4 text-[#073B6F]" />
                <h2 className="text-xs font-black text-[#073B6F] uppercase tracking-wider">
                  Selected Items Summary
                </h2>
              </div>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-[#073B6F]">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <ShoppingBasket className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-2 text-xs font-medium">No products selected yet.</p>
                <p className="text-[11px] text-slate-400">Add products from the left or speak to AI.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {cartItems.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-slate-800 truncate">{product.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-600">{product.brand}</span>
                        <span>•</span>
                        <span>{product.unit}</span>
                        <span>•</span>
                        <span className="font-bold text-slate-700">₹{(qty * product.defaultRate).toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => decrementQty(product.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-800">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementQty(product.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#073B6F] text-white hover:bg-[#0B5FA5] transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="ml-1 flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Summary */}
            {cartItems.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Items:</span>
                  <span className="font-bold text-slate-800">{totalItems} products ({totalUnits} units)</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#073B6F]">
                  <span>Estimated Total:</span>
                  <span>₹{estimatedTotal.toFixed(0)}</span>
                </div>
                <p className="text-[10px] text-slate-400">Final price calculated based on actual delivery quantity.</p>
              </div>
            )}
          </div>

          {/* Special Instructions / Notes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Special Instructions / Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Please deliver before 7:00 AM, separate crates for Full Cream..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8] focus:bg-white resize-none transition"
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 shadow-2xl">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <div className="text-xs text-slate-600">
                {totalItems > 0 ? (
                  <>
                    <span className="font-black text-[#073B6F]">{totalItems}</span> items ({totalUnits} units)
                    {' · '}Est. <span className="font-black text-emerald-700">₹{estimatedTotal.toFixed(0)}</span>
                  </>
                ) : (
                  <span className="text-slate-400 font-medium">No products selected</span>
                )}
              </div>
              <div className="text-[10px] text-slate-400">Demand will be sent with status: Pending</div>
            </div>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="sm:hidden flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1.5 rounded-lg"
            >
              <Mic className="h-3.5 w-3.5" /> AI Assistant
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSubmit}
              disabled={submitting || totalItems === 0}
              className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-[#073B6F] px-8 py-3 text-xs font-black text-white shadow-md transition hover:bg-[#0B5FA5] active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{submitting ? 'Submitting Demand...' : 'Submit Demand'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Voice Demand Assistant Modal */}
      <AiVoiceDemandAssistant
        products={allProducts}
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyToCart={handleApplyAiCart}
      />
    </div>
  );
}
