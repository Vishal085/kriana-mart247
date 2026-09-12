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

export interface NormalizedRate {
  normalizedPrice: number | null;
  normalizedUnit: string | null;
  displayText: string | null;
  isNormalized: boolean;
}

export function normalizeRate(rate: number | null | undefined, unit: string | null | undefined): NormalizedRate {
  if (rate == null || isNaN(Number(rate)) || Number(rate) <= 0 || !unit) {
    return {
      normalizedPrice: null,
      normalizedUnit: null,
      displayText: null,
      isNormalized: false,
    };
  }

  const numRate = Number(rate);
  const u = unit.toLowerCase().trim();

  // 1. Bulk quintal (100kg)
  if (u.includes('quintal') || u.includes('qtl') || u.includes('100kg')) {
    const pricePerKg = numRate / 100;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 2. 50kg Bags / Boris
  if (u.includes('50kg') || u.includes('50 kg')) {
    const pricePerKg = numRate / 50;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 3. 25kg Bags
  if (u.includes('25kg') || u.includes('25 kg')) {
    const pricePerKg = numRate / 25;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 4. 10kg Bags
  if (u.includes('10kg') || u.includes('10 kg')) {
    const pricePerKg = numRate / 10;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 5. 5kg Bags
  if (u.includes('5kg') || u.includes('5 kg')) {
    const pricePerKg = numRate / 5;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 6. 15 Litre Wholesale Tin / Pipa
  if (u.includes('15 litre') || u.includes('15l') || u.includes('15 l') || u.includes('15-litre')) {
    const pricePerLitre = numRate / 15;
    return {
      normalizedPrice: Math.round(pricePerLitre * 100) / 100,
      normalizedUnit: '₹/L',
      displayText: `Approx. ₹${pricePerLitre.toFixed(2)}/L`,
      isNormalized: true,
    };
  }

  // 7. 1kg Bags / Packs / Blocks
  if (u.includes('1kg') || u.includes('1 kg')) {
    return {
      normalizedPrice: Math.round(numRate * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `₹${numRate.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  // 8. Gram packs
  if (u.includes('500g') || u.includes('500 g')) {
    const pricePerKg = numRate * 2;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  if (u.includes('250g') || u.includes('250 g')) {
    const pricePerKg = numRate * 4;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  if (u.includes('200g') || u.includes('200 g')) {
    const pricePerKg = numRate * 5;
    return {
      normalizedPrice: Math.round(pricePerKg * 100) / 100,
      normalizedUnit: '₹/kg',
      displayText: `Approx. ₹${pricePerKg.toFixed(2)}/kg`,
      isNormalized: true,
    };
  }

  return {
    normalizedPrice: numRate,
    normalizedUnit: unit,
    displayText: `₹${numRate.toFixed(2)} / ${unit}`,
    isNormalized: false,
  };
}

export interface RateSourceMeta {
  sourceName: string;
  sourceType: 'GOVERNMENT_APMC' | 'TRADE_CHAMBER' | 'MARKET_BULLETIN' | 'NEEDS_VERIFICATION';
  statusLabel: string;
  statusColor: 'emerald' | 'blue' | 'amber' | 'gray';
  freshnessLabel: string;
}

export function getRateSourceMeta(rate: {
  source?: string | null;
  updatedBy?: string | null;
  updatedAt?: string | Date;
  date?: string | Date;
  mandi?: { name?: string; state?: string } | null;
}): RateSourceMeta {
  const sourceRaw = (rate.source || rate.updatedBy || '').toLowerCase();
  const mandiName = rate.mandi?.name || '';
  const mandiState = rate.mandi?.state || '';

  // Determine Source Name & Type
  let sourceName = 'APMC Auction Register';
  let sourceType: RateSourceMeta['sourceType'] = 'GOVERNMENT_APMC';
  let statusLabel = 'Verified APMC';
  let statusColor: RateSourceMeta['statusColor'] = 'emerald';

  if (sourceRaw.includes('naya bazar') || mandiName.toLowerCase().includes('naya bazar')) {
    sourceName = 'Delhi Grain Merchants Association (DGMA) / Naya Bazar Terminal';
    sourceType = 'TRADE_CHAMBER';
    statusLabel = 'Verified DGMA Chamber';
    statusColor = 'blue';
  } else if (sourceRaw.includes('khari baoli') || mandiName.toLowerCase().includes('khari baoli')) {
    sourceName = 'The Kirana Committee / Khari Baoli Spice Terminal';
    sourceType = 'TRADE_CHAMBER';
    statusLabel = 'Verified Kirana Committee';
    statusColor = 'blue';
  } else if (mandiState.toLowerCase() === 'delhi') {
    sourceName = 'Delhi Agricultural Marketing Board (DAMB) / Agmarknet APMC';
    sourceType = 'GOVERNMENT_APMC';
    statusLabel = 'Verified DAMB APMC';
    statusColor = 'emerald';
  } else if (mandiState.toLowerCase() === 'uttar pradesh') {
    sourceName = 'UP Rajya Krishi Utpadan Mandi Parishad / Agmarknet';
    sourceType = 'GOVERNMENT_APMC';
    statusLabel = 'Verified Mandi Parishad';
    statusColor = 'emerald';
  } else if (mandiState.toLowerCase() === 'haryana') {
    sourceName = 'Haryana State Agricultural Marketing Board (HSAMB) / Agmarknet';
    sourceType = 'GOVERNMENT_APMC';
    statusLabel = 'Verified HSAMB APMC';
    statusColor = 'emerald';
  } else if (sourceRaw.includes('secondary') || sourceRaw.includes('survey')) {
    sourceName = 'Secondary Mandi Survey';
    sourceType = 'NEEDS_VERIFICATION';
    statusLabel = 'Needs Verification';
    statusColor = 'amber';
  }

  // Calculate Freshness
  const dateObj = rate.date ? new Date(rate.date) : rate.updatedAt ? new Date(rate.updatedAt) : null;
  let freshnessLabel = 'Active Session';
  if (dateObj && !isNaN(dateObj.getTime())) {
    const diffHours = (Date.now() - dateObj.getTime()) / (1000 * 60 * 60);
    if (diffHours < 24) {
      freshnessLabel = 'Today';
    } else if (diffHours < 48) {
      freshnessLabel = 'Yesterday';
    } else {
      const days = Math.floor(diffHours / 24);
      freshnessLabel = `${days}d ago`;
    }
  }

  return {
    sourceName,
    sourceType,
    statusLabel,
    statusColor,
    freshnessLabel,
  };
}
