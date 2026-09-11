'use client';

import React from 'react';
import Link from 'next/link';
import { useMandi, MandiItem } from '@/context/MandiContext';
import { ArrowRight, Check, MapPin } from 'lucide-react';

export function MandiCardActions({
  mandi,
}: {
  mandi: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    address?: string | null;
    pincode?: string | null;
    description?: string | null;
    active: boolean;
  };
}) {
  const { selectedMandi, selectMandi } = useMandi();
  const isSelected = selectedMandi?.id === mandi.id;

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    selectMandi(mandi as MandiItem);
  };

  return (
    <div className="mt-5 flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
      <Link
        href={`/mandis/${mandi.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5FA5] hover:underline"
      >
        <span>View Commodities</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>

      <button
        onClick={handleSelect}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition shadow-2xs ${
          isSelected
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
            : 'bg-[#EAF5FC] text-[#073B6F] hover:bg-[#073B6F] hover:text-white'
        }`}
      >
        {isSelected ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Active Mandi</span>
          </>
        ) : (
          <>
            <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
            <span>Set as My Mandi</span>
          </>
        )}
      </button>
    </div>
  );
}

export function MandiDetailHeaderAction({
  mandi,
}: {
  mandi: {
    id: string;
    name: string;
    slug: string;
    city: string;
    state: string;
    address?: string | null;
    pincode?: string | null;
    description?: string | null;
    active: boolean;
  };
}) {
  const { selectedMandi, selectMandi } = useMandi();
  const isSelected = selectedMandi?.id === mandi.id;

  return (
    <button
      onClick={() => selectMandi(mandi as MandiItem)}
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition shadow-sm ${
        isSelected
          ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400'
          : 'bg-[#073B6F] text-white hover:bg-[#0B5FA5]'
      }`}
    >
      {isSelected ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Active Mandi Selected</span>
        </>
      ) : (
        <>
          <MapPin className="h-4 w-4 text-[#39A9E8]" />
          <span>Select as My Active Mandi</span>
        </>
      )}
    </button>
  );
}
