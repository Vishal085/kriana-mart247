'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMandi } from '@/context/MandiContext';
import { MapPin, ChevronDown, Check, Search, Store } from 'lucide-react';

export function MandiSelector({ variant = 'header' }: { variant?: 'header' | 'compact' | 'hero' }) {
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

  if (variant === 'hero') {
    return (
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-[#39A9E8]/30 bg-white px-5 py-4 shadow-sm transition hover:border-[#0B5FA5]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected Mandi</div>
              <div className="font-bold text-[#073B6F]">
                {loading ? 'Loading Mandis...' : selectedMandi ? `${selectedMandi.name}, ${selectedMandi.city}` : 'Select Mandi'}
              </div>
            </div>
          </div>
          <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[320px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search city or mandi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-[#39A9E8]"
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
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      isSelected ? 'bg-[#EAF5FC] font-semibold text-[#073B6F]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div>{m.name}</div>
                      <div className="text-xs text-slate-500">{m.city}, {m.state}</div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-[#0B5FA5]" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500">No mandis found matching &quot;{search}&quot;</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#F7FAFC] px-3 py-1.5 text-xs font-semibold text-[#073B6F] transition hover:border-[#39A9E8] hover:bg-white"
        title="Select Mandi for live rates"
      >
        <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
        <span className="max-w-[130px] truncate">
          {selectedMandi ? selectedMandi.name : 'Select Mandi'}
        </span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">
            Choose Wholesale Mandi
          </div>
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search mandi / city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2.5 text-xs text-slate-800 outline-none focus:border-[#39A9E8]"
            />
          </div>
          <div className="max-h-52 overflow-y-auto space-y-1">
            {filtered.map((m) => {
              const isSelected = selectedMandi?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    selectMandi(m);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                    isSelected ? 'bg-[#EAF5FC] font-bold text-[#073B6F]' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate">
                    <div className="truncate">{m.name}</div>
                    <div className="text-[10px] text-slate-500">{m.city}, {m.state}</div>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#0B5FA5] flex-shrink-0" />}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="p-3 text-center text-xs text-slate-500">No mandis found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
