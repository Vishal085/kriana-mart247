'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMandi } from '@/context/MandiContext';
import { MapPin, ChevronDown, Check, Search, Store } from 'lucide-react';

export function MandiSelector({
  variant = 'header',
}: {
  variant?: 'header' | 'compact' | 'hero';
}) {
  const { mandis, selectedMandi, selectMandi, loading } = useMandi();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState<'ALL' | 'Uttar Pradesh' | 'Delhi' | 'Haryana'>('ALL');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = mandis.filter((m) => {
    const term = search.toLowerCase().trim();
    const matchesSearch =
      !term ||
      m.name.toLowerCase().includes(term) ||
      m.city.toLowerCase().includes(term) ||
      m.state.toLowerCase().includes(term) ||
      (m.address && m.address.toLowerCase().includes(term)) ||
      (m.description && m.description.toLowerCase().includes(term)) ||
      (term === 'up' && m.state.toLowerCase().includes('uttar')) ||
      (term === 'delhi' && m.state.toLowerCase().includes('delhi')) ||
      (term === 'haryana' && m.state.toLowerCase().includes('haryana')) ||
      (term === 'ghaziabad' && (m.city.toLowerCase().includes('ghaziabad') || m.name.toLowerCase().includes('ghaziabad')));

    const matchesState =
      stateFilter === 'ALL' || m.state.toLowerCase() === stateFilter.toLowerCase();

    return matchesSearch && matchesState;
  });

  const stateTabs = (
    <div className="flex items-center gap-1 mb-2.5 pb-1 border-b border-slate-100 overflow-x-auto">
      {(['ALL', 'Uttar Pradesh', 'Delhi', 'Haryana'] as const).map((st) => (
        <button
          key={st}
          type="button"
          onClick={() => setStateFilter(st)}
          className={`rounded-lg px-2 py-1 text-[10px] font-bold whitespace-nowrap transition ${
            stateFilter === st
              ? 'bg-[#073B6F] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {st === 'ALL' ? 'All NCR Mandis' : st === 'Uttar Pradesh' ? 'UP (Ghaziabad/Noida)' : st}
        </button>
      ))}
    </div>
  );

  const renderMandiItem = (m: any) => {
    const isSelected = selectedMandi?.id === m.id;
    const isUP = m.state.toLowerCase().includes('uttar');
    const isDelhi = m.state.toLowerCase().includes('delhi');

    return (
      <button
        key={m.id}
        onClick={() => {
          selectMandi(m);
          setIsOpen(false);
        }}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
          isSelected
            ? 'bg-[#EAF5FC] font-black text-[#073B6F] border border-[#39A9E8]/40 shadow-xs'
            : 'text-slate-700 hover:bg-slate-50 border border-transparent'
        }`}
      >
        <div className="truncate pr-2">
          <div className="font-black text-slate-800 flex items-center gap-1.5 truncate">
            <span>{m.name}</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[9px] font-black shrink-0 ${
                isUP
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : isDelhi
                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              {m.state}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="h-2.5 w-2.5 text-[#39A9E8] shrink-0" />
            <span className="font-bold text-slate-600">{m.city} District</span>
            {m.address && <span className="truncate opacity-75">• {m.address.slice(0, 35)}</span>}
          </div>
        </div>
        {isSelected ? (
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#0B5FA5] shadow-2xs shrink-0">
            <Check className="h-3 w-3" /> Selected
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-slate-400 hover:text-[#0B5FA5] shrink-0">
            Select →
          </span>
        )}
      </button>
    );
  };

  // HERO VARIANT (used in full-width cards or mobile drawer)
  if (variant === 'hero') {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-[#39A9E8]/30 bg-white px-4 py-3 shadow-xs transition hover:border-[#0B5FA5]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
              <Store className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected Mandi Hub
              </div>
              <div className="text-xs font-black text-[#073B6F]">
                {loading
                  ? 'Loading Mandis...'
                  : selectedMandi
                  ? `${selectedMandi.name} (${selectedMandi.city}, ${selectedMandi.state})`
                  : 'Ghaziabad Mandi (Uttar Pradesh)'}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Mandi, City (Ghaziabad), or State..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
                autoFocus
              />
            </div>
            {stateTabs}
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filtered.map(renderMandiItem)}
              {filtered.length === 0 && (
                <div className="p-3 text-center text-xs text-slate-400">
                  No mandis found matching &quot;{search}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // COMPACT VARIANT (used in mobile top bar)
  if (variant === 'compact') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#EAF5FC]/80 px-2.5 py-1 text-[11px] font-bold text-[#073B6F] shadow-2xs hover:bg-[#EAF5FC] transition"
          title="Change Wholesale Mandi"
        >
          <MapPin className="h-3 w-3 text-[#39A9E8] shrink-0" />
          <span className="max-w-[130px] truncate">
            {selectedMandi ? `${selectedMandi.name.replace(' APMC', '').replace(' Mandi', '')} (${selectedMandi.city})` : 'Ghaziabad'}
          </span>
          <ChevronDown
            className={`h-3 w-3 text-slate-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="fixed inset-x-4 top-14 z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Select Wholesale Mandi
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">● Live APMC</span>
            </div>
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search city (Ghaziabad, Noida) or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
                autoFocus
              />
            </div>
            {stateTabs}
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filtered.map(renderMandiItem)}
            </div>
          </div>
        )}
      </div>
    );
  }

  // DEFAULT HEADER VARIANT (desktop top bar pill next to logo)
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-[#F7FAFC] px-2.5 py-1 text-left transition hover:border-[#39A9E8] hover:bg-white shadow-2xs group"
        title="Click to Change Wholesale Mandi"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF5FC] text-[#073B6F] group-hover:bg-[#073B6F] group-hover:text-white transition">
          <MapPin className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Mandi: {selectedMandi?.state || 'UP'} • {selectedMandi?.city || 'Ghaziabad'}
          </div>
          <div className="max-w-[140px] truncate text-xs font-black text-[#073B6F]">
            {selectedMandi ? selectedMandi.name : 'Ghaziabad Mandi'}
          </div>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-88 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-black text-[#073B6F]">Wholesale Mandi Hubs</span>
              <p className="text-[10px] text-slate-500">Filter by State, District &amp; APMC hub</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
              Live Mandi
            </span>
          </div>

          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Ghaziabad, Noida, Delhi, Haryana..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
              autoFocus
            />
          </div>

          {stateTabs}

          <div className="max-h-72 overflow-y-auto space-y-1">
            {filtered.map(renderMandiItem)}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">
                No mandis found matching &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
