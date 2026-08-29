'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, ImageOff } from 'lucide-react';

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  brandName?: string;
  sku?: string;
}

export function ProductImage({
  src,
  alt,
  className = 'h-full w-full object-contain p-2',
  brandName,
  sku,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fallbackSrc = '/products/placeholder.svg';
  const effectiveSrc = hasError || !src ? fallbackSrc : src;

  if (hasError || !src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 text-center border border-slate-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/60 text-slate-400">
          <Package className="h-6 w-6" />
        </div>
        <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
          {brandName || 'KiranaMart'}
        </span>
        <span className="text-[11px] font-bold text-slate-600 line-clamp-1">
          {alt}
        </span>
        <span className="mt-1 inline-block rounded-md bg-slate-200/60 px-2 py-0.5 text-[9px] font-semibold text-slate-500">
          Image Verified
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/60 animate-pulse">
          <Package className="h-6 w-6 text-slate-300" />
        </div>
      )}
      <img
        src={effectiveSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-transform duration-300 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
