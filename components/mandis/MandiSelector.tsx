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

  const filtered = mandis.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase()) ||
      m.state.toLowerCase().includes(search.toLowerCase())
  );

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
                  ? `${selectedMandi.name} (${selectedMandi.city})`
                  : 'Select Wholesale Mandi'}
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
                placeholder="Search mandi or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
                autoFocus
              />
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1">
              {filtered.map((m) => {
                const isSelected = selectedMandi?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      selectMandi(m);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      isSelected
                        ? 'bg-[#EAF5FC] font-black text-[#073B6F]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{m.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {m.city}, {m.state}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-[#0B5FA5]" />}
                  </button>
                );
              })}
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
          <span className="max-w-[110px] truncate">
            {selectedMandi ? selectedMandi.name.replace(' APMC', '').replace(' Mandi', '') : 'Mandi'}
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
              <span className="text-[10px] text-emerald-600 font-bold">● Live Rates</span>
            </div>
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search city or mandi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
                autoFocus
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filtered.map((m) => {
                const isSelected = selectedMandi?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      selectMandi(m);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      isSelected
                        ? 'bg-[#EAF5FC] font-black text-[#073B6F]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{m.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {m.city}, {m.state}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-[#0B5FA5] shrink-0" />}
                  </button>
                );
              })}
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
            Mandi: {selectedMandi?.city || 'Delhi'}
          </div>
          <div className="max-w-[130px] truncate text-xs font-black text-[#073B6F]">
            {selectedMandi ? selectedMandi.name : 'Select Mandi'}
          </div>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-black text-[#073B6F]">Wholesale Mandi Hubs</span>
              <p className="text-[10px] text-slate-500">Live prices & inventory for your region</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
              Live Mandi
            </span>
          </div>

          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search mandi or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1">
            {filtered.map((m) => {
              const isSelected = selectedMandi?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    selectMandi(m);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                    isSelected
                      ? 'bg-[#EAF5FC] font-black text-[#073B6F] border border-[#39A9E8]/40'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold truncate text-slate-800">{m.name}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <span>{m.city}, {m.state}</span>
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#0B5FA5] shadow-2xs">
                      <Check className="h-3 w-3" /> Selected
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 hover:text-[#0B5FA5]">
                      Select →
                    </span>
                  )}
                </button>
              );
            })}
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
