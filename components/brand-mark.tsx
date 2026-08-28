import React from 'react';

interface BrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

export function BrandMark({ className = '', size = 'md', hideText = false }: BrandMarkProps) {
  const dimensions = {
    sm: { height: 38, width: 38 },
    md: { height: 48, width: 48 },
    lg: { height: 60, width: 60 },
  };

  const currentDim = dimensions[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/logo.png"
        alt="KiranaMart247"
        width={currentDim.width}
        height={currentDim.height}
        className="rounded-full object-contain shadow-xs transition hover:scale-105"
        style={{ height: `${currentDim.height}px`, width: 'auto' }}
      />
      {!hideText && (
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tight text-[#073B6F] leading-none">
            kiranamart<span className="text-[#39A9E8]">247</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 tracking-tight leading-tight mt-0.5">
            Today&apos;s Wholesale Rates
          </span>
        </div>
      )}
    </div>
  );
}
