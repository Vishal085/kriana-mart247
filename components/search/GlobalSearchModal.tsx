'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Package,
  Store,
  Layers,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchingCommodityRates, setMatchingCommodityRates] = useState<any[]>([]);
  const [matchingProducts, setMatchingProducts] = useState<any[]>([]);
  const [matchingMandis, setMatchingMandis] = useState<any[]>([]);
  const [matchingCategories, setMatchingCategories] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setMatchingCommodityRates([]);
      setMatchingProducts([]);
      setMatchingMandis([]);
      setMatchingCategories([]);
    }
  }, [isOpen]);

  // Live search debounced fetch
  useEffect(() => {
    const cleanQ = query.trim();
    if (!cleanQ) {
      setMatchingCommodityRates([]);
      setMatchingProducts([]);
      setMatchingMandis([]);
      setMatchingCategories([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const [ratesRes, prodsRes, mandisRes, catsRes] = await Promise.all([
          fetch(`/api/rates?search=${encodeURIComponent(cleanQ)}&limit=4`).catch(() => null),
          fetch(`/api/products?search=${encodeURIComponent(cleanQ)}&limit=5`).catch(() => null),
          fetch(`/api/mandis?search=${encodeURIComponent(cleanQ)}`).catch(() => null),
          fetch(`/api/categories`).catch(() => null),
        ]);

        if (ratesRes && ratesRes.ok) {
          const ratesData = await ratesRes.json();
          setMatchingCommodityRates(ratesData.rates || []);
        }

        if (prodsRes && prodsRes.ok) {
          const prodsData = await prodsRes.json();
          setMatchingProducts(prodsData.products || []);
        }

        if (mandisRes && mandisRes.ok) {
          const mandisData = await mandisRes.json();
          setMatchingMandis(mandisData.mandis || []);
        }

        if (catsRes && catsRes.ok) {
          const catsData = await catsRes.json();
          const qLower = cleanQ.toLowerCase();
          const filteredCats = (catsData.categories || [])
            .filter((c: any) => c.name.toLowerCase().includes(qLower))
            .slice(0, 4);
          setMatchingCategories(filteredCats);
        }
      } catch (err) {
        console.warn('Search query error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const cleanQ = query.trim();
  const hasResults =
    matchingCommodityRates.length > 0 ||
    matchingProducts.length > 0 ||
    matchingCategories.length > 0 ||
    matchingMandis.length > 0;

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanQ) {
      handleSelect(`/shop?search=${encodeURIComponent(cleanQ)}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200/80 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="relative flex items-center border-b border-slate-200 px-4 py-3 sm:px-6">
          <Search className="h-5 w-5 text-[#0B5FA5] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, wholesale mandis, commodities, or brands..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin text-[#0B5FA5]" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mr-2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            ESC
          </kbd>
        </form>

        {/* Search Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick empty state when nothing typed */}
          {!cleanQ && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#39A9E8]" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Basmati Rice', 'Fortune Mustard Oil', 'Aashirvaad Atta', 'Azadpur Mandi', 'Tata Salt', 'Amul Butter'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-slate-200 bg-slate-50 hover:bg-[#EAF5FC] hover:border-[#39A9E8]/40 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* If typed but nothing matched */}
          {cleanQ && !isLoading && !hasResults && (
            <div className="py-10 text-center">
              <Package className="h-10 w-10 mx-auto text-slate-300 mb-2" />
              <div className="text-sm font-bold text-slate-700">No matching items found</div>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for commodities like &quot;Rice&quot;, &quot;Oil&quot;, or wholesale mandis like &quot;Azadpur&quot;.
              </p>
            </div>
          )}

          {/* 1. Mandi Commodity Rates */}
          {matchingCommodityRates.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0B5FA5] mb-2 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> Mandi Auction Rates
              </div>
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50">
                {matchingCommodityRates.map((r: any) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect('/mandi-rates')}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-white rounded-xl transition group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#073B6F] group-hover:text-[#0B5FA5]">
                        {r.product?.name || 'Commodity'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {r.mandi?.name || 'Mandi'} • {r.unit}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900">₹{Number(r.currentRate).toFixed(2)}</div>
                      <div
                        className={`text-[10px] font-bold ${
                          r.direction === 'RISING'
                            ? 'text-emerald-600'
                            : r.direction === 'FALLING'
                            ? 'text-rose-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {Number(r.percentageChange) > 0 ? `+${r.percentageChange}%` : `${r.percentageChange}%`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Wholesale Products */}
          {matchingProducts.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-slate-500" /> Wholesale Products
              </div>
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white">
                {matchingProducts.map((p: any) => {
                  const imageUrl = p.images?.[0]?.url || p.images?.[0] || '/products/placeholder.svg';
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/products/${p.slug}`)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-[#F8FAFC] rounded-xl transition group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 p-1 flex items-center justify-center overflow-hidden">
                          <img src={imageUrl} alt={p.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#0B5FA5] truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.brand?.name || p.brand || 'KiranaMart'} • {p.unit}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-xs font-black text-slate-900">₹{Number(p.retailPrice).toFixed(2)}</div>
                        <div className="text-[10px] font-bold text-emerald-600">Wholesale Lot</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Mandis */}
          {matchingMandis.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Store className="h-3.5 w-3.5 text-slate-500" /> Wholesale Mandis
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingMandis.map((m: any) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`/mandis/${m.slug}`)}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-white hover:border-[#39A9E8] hover:bg-[#EAF5FC]/30 text-left transition"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#073B6F]">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.city}, {m.state}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Categories */}
          {matchingCategories.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-slate-500" /> Categories
              </div>
              <div className="flex flex-wrap gap-2">
                {matchingCategories.map((c: any) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/shop?category=${c.slug || c.id}`)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-[#39A9E8] hover:text-[#073B6F] transition"
                  >
                    <Layers className="h-3 w-3 text-[#39A9E8]" />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="border-t border-slate-100 bg-[#F8FAFC] px-4 py-2.5 sm:px-6 flex items-center justify-between text-[11px] text-slate-500">
          <div>Press <kbd className="font-semibold text-slate-700">Enter</kbd> to search catalog</div>
          <div className="hidden sm:block">Powered by KiranaMart.com Mandi Intelligence</div>
        </div>
      </div>
    </div>
  );
}
