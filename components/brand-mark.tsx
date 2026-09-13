import React from 'react';

interface BrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

export function BrandMark({ className = '', size = 'md', hideText = false }: BrandMarkProps) {
  const imgClasses = 
    size === 'sm' ? 'h-7 w-7 sm:h-8 sm:w-8' :
    size === 'lg' ? 'h-12 w-12 sm:h-14 sm:w-14' :
    'h-8 w-8 sm:h-10 sm:w-10';

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
      <img
        src="/brand/logo.png"
        alt="KiranaMart.com"
        className={`${imgClasses} rounded-full object-contain shadow-xs transition hover:scale-105 shrink-0`}
      />
      {!hideText && (
        <div className="flex flex-col">
          <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[#073B6F] leading-none whitespace-nowrap">
            Kirana<span className="text-[#39A9E8]">Mart</span>
          </span>
          <span className="hidden sm:block text-[10px] font-bold text-slate-500 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
            Today&apos;s Wholesale Rates
          </span>
        </div>
      )}
    </div>
  );
}
