import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Direction } from '@prisma/client';

interface RateTrendBadgeProps {
  direction: Direction | string;
  change?: number | string;
  percentage?: number | string;
  size?: 'sm' | 'md' | 'lg';
}

export function RateTrendBadge({
  direction,
  change,
  percentage,
  size = 'md',
}: RateTrendBadgeProps) {
  const isRising = direction === 'RISING';
  const isFalling = direction === 'FALLING';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  if (isRising) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 ${sizeClasses[size]}`}
      >
        <TrendingUp className={iconSizes[size]} />
        <span>RISING</span>
        {percentage !== undefined && (
          <span className="ml-0.5 opacity-90">
            (+{Number(percentage).toFixed(1)}%)
          </span>
        )}
      </span>
    );
  }

  if (isFalling) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-bold border border-red-200 bg-red-50 text-red-700 ${sizeClasses[size]}`}
      >
        <TrendingDown className={iconSizes[size]} />
        <span>FALLING</span>
        {percentage !== undefined && (
          <span className="ml-0.5 opacity-90">
            ({Number(percentage).toFixed(1)}%)
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold border border-slate-200 bg-slate-100 text-slate-600 ${sizeClasses[size]}`}
    >
      <Minus className={iconSizes[size]} />
      <span>STABLE</span>
    </span>
  );
}
