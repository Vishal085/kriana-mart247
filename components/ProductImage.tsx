'use client';

import React from 'react';

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
}: ProductImageProps) {
  const fallbackSrc = '/products/placeholder.svg';
  const effectiveSrc = src || fallbackSrc;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        if (!target.src.endsWith('/products/placeholder.svg')) {
          target.src = fallbackSrc;
        }
      }}
      className={className}
    />
  );
}
