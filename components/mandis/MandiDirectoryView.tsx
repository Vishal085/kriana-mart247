'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useMandi, getMandiDistrict, MandiItem } from '@/context/MandiContext';
import { Store, MapPin, Search, Check, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';

interface MandiWithCount extends MandiItem {
  _count?: {
    rates: number;
  };
}

export function MandiDirectoryView({
  initialMandis = [],
}: {
  initialMandis?: any[];
}) {
  const { mandis: contextMandis, selectedMandi, selectMandi } = useMandi();
  const [selectedState, setSelectedState] = useState<'ALL' | 'Uttar Pradesh' | 'Delhi' | 'Haryana'>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  // Merge mandis from server or context
  const allMandis: MandiWithCount[] = useMemo(() => {
    const baseList = initialMandis.length > 0 ? initialMandis : contextMandis;
    return baseList.map((m: any) => ({
      ...m,
      district: m.district || getMandiDistrict(m),
    }));
  }, [initialMandis, contextMandis]);

  // Compute available districts for the selected state
  const availableDistricts = useMemo(() => {
    const set = new Set<string>();
    for (const m of allMandis) {
      if (selectedState === 'ALL' || m.state.toLowerCase() === selectedState.toLowerCase()) {
        const d = m.district || getMandiDistrict(m);
        if (d) set.add(d);
      }
    }
    return Array.from(set).sort();
  }, [allMandis, selectedState]);

  // Filter mandis based on State, District, and Search
  const filteredMandis = useMemo(() => {
    return allMandis.filter((m) => {
      // 1. State filter
      if (selectedState !== 'ALL' && m.state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }

      // 2. District filter
      const mandiDist = (m.district || getMandiDistrict(m)).toLowerCase();
      if (selectedDistrict !== 'ALL' && mandiDist !== selectedDistrict.toLowerCase()) {
        return false;
      }

      // 3. Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matches =
          m.name.toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          mandiDist.includes(q) ||
          m.state.toLowerCase().includes(q) ||
          (m.address && m.address.toLowerCase().includes(q)) ||
          (m.description && m.description.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [allMandis, selectedState, selectedDistrict, search]);

  const handleStateSelect = (st: 'ALL' | 'Uttar Pradesh' | 'Delhi' | 'Haryana') => {
    setSelectedState(st);
    setSelectedDistrict('ALL');
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Controls Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Mandi name, District (Ghaziabad), City, or State..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
          />
        </div>

        {/* State Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">State:</span>
          {(['ALL', 'Uttar Pradesh', 'Delhi', 'Haryana'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => handleStateSelect(st)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedState === st
                  ? 'bg-[#073B6F] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL'
                ? `All States (${allMandis.length})`
                : st === 'Uttar Pradesh'
                ? 'Uttar Pradesh (Ghaziabad / Noida)'
                : st === 'Delhi'
                ? 'Delhi (NCT APMC)'
                : 'Haryana (NCR)'}
            </button>
          ))}
        </div>

        {/* District Filter Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">District:</span>
          <button
            type="button"
            onClick={() => setSelectedDistrict('ALL')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
              selectedDistrict === 'ALL'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Districts
          </button>
          {availableDistricts.map((dist) => (
            <button
              key={dist}
              type="button"
              onClick={() => setSelectedDistrict(dist)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                selectedDistrict.toLowerCase() === dist.toLowerCase()
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dist}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold text-slate-500">
          Showing <span className="font-black text-[#073B6F]">{filteredMandis.length}</span> wholesale mandis
          {selectedState !== 'ALL' ? ` in ${selectedState}` : ''}
          {selectedDistrict !== 'ALL' ? ` • ${selectedDistrict} District` : ''}
        </div>
        {selectedMandi && (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Active Mandi: <strong>{selectedMandi.name}</strong></span>
          </div>
        )}
      </div>

      {/* Mandis Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMandis.map((mandi) => {
          const isSelected = selectedMandi?.id === mandi.id;
          const isGhaziabad = mandi.slug === 'ghaziabad-mandi' || mandi.city.toLowerCase() === 'ghaziabad';
          const districtName = mandi.district || getMandiDistrict(mandi);
          const isUP = mandi.state.toLowerCase().includes('uttar');
          const isDelhi = mandi.state.toLowerCase().includes('delhi');

          return (
            <div
              key={mandi.id}
              className={`relative flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                  : isGhaziabad
                  ? 'border-[#39A9E8] shadow-md'
                  : 'border-slate-200 hover:border-[#39A9E8]'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5FC] text-[#073B6F]">
                    <Store className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isGhaziabad && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-black text-amber-900 shadow-2xs">
                        <Sparkles className="h-3 w-3 text-amber-600" /> Primary UP Mandi Hub
                      </span>
                    )}
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                        <Check className="h-3 w-3 text-emerald-600" /> Active Account Mandi
                      </span>
                    )}
                  </div>
                </div>

                {/* Mandi Title & District Badge */}
                <h2 className="mt-4 text-xl font-black text-[#073B6F] leading-snug">{mandi.name}</h2>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    <Building2 className="h-3 w-3 text-slate-400" />
                    District: <strong className="text-slate-900">{districtName}</strong>
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                      isUP
                        ? 'bg-amber-100 text-amber-900'
                        : isDelhi
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {mandi.state}
                  </span>
                </div>

                {/* Location and Address */}
                <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-[#39A9E8] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{mandi.address || `${mandi.city}, ${mandi.state}`}</span>
                </div>

                {mandi.description && (
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {mandi.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/mandis/${mandi.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#0B5FA5] hover:underline"
                  >
                    <span>Commodities & Rates</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={() => selectMandi(mandi)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black transition shadow-xs ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : 'bg-[#073B6F] text-white hover:bg-[#0B5FA5]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
                        <span>Set as My Mandi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMandis.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <Store className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-3 text-base font-bold text-slate-700">No Wholesale Mandis Found</h3>
          <p className="mt-1 text-xs text-slate-500">
            No mandis matched your search query &quot;{search}&quot; in {selectedState} ({selectedDistrict} District).
          </p>
          <button
            onClick={() => {
              setSelectedState('ALL');
              setSelectedDistrict('ALL');
              setSearch('');
            }}
            className="mt-4 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Authoritative Sources & Methodology Disclaimer */}
      <MandiSourcesDisclaimer />
    </div>
  );
}
