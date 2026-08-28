export type RateDirection = 'RISING' | 'FALLING' | 'STABLE';

export function computeRateMetrics(current: number, previous: number) {
  const absolute = Number(current) - Number(previous);
  const safePrevious = Number(previous) === 0 ? 1 : Number(previous);
  const percentage = ((Number(current) - Number(previous)) / safePrevious) * 100;
  const direction: RateDirection =
    Number(current) > Number(previous)
      ? 'RISING'
      : Number(current) < Number(previous)
        ? 'FALLING'
        : 'STABLE';

  return {
    absolute,
    percentage,
    direction,
  };
}

export function formatCurrency(value: number | string | null | undefined) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number | string | null | undefined) {
  const number = Number(value ?? 0);
  return `${number.toFixed(2)}%`;
}

export function clampQuantity(value: number, min: number, max?: number | null) {
  const next = Math.max(value, min);
  if (max && max > 0) return Math.min(next, max);
  return next;
}
