'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';

interface HistoricalChartProps {
  productId: string;
  productName: string;
  unit: string;
  initialHistory?: any[];
  mandiId?: string;
}

export function HistoricalPriceChart({
  productId,
  productName,
  unit,
  initialHistory = [],
  mandiId,
}: HistoricalChartProps) {
  const [range, setRange] = useState<'7D' | '30D' | '3M' | '6M' | '1Y'>('30D');
  const [data, setData] = useState<any[]>(initialHistory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          productId,
          range,
          ...(mandiId ? { mandiId } : {}),
        });

        const res = await fetch(`/api/rates/history?${query.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.history || []);
        }
      } catch (err) {
        console.error('Error fetching historical rates:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [productId, range, mandiId]);

  const formattedData = data.map((item) => ({
    date: format(new Date(item.date), 'dd MMM'),
    rate: Number(item.rate),
    minimum: Number(item.minimum),
    maximum: Number(item.maximum),
    mandi: item.mandi?.name || 'Mandi',
  }));

  const minPrice = formattedData.length > 0 ? Math.min(...formattedData.map((d) => d.rate)) : 0;
  const maxPrice = formattedData.length > 0 ? Math.max(...formattedData.map((d) => d.rate)) : 100;
  const yDomain = [Math.floor(minPrice * 0.9), Math.ceil(maxPrice * 1.1)];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Wholesale Price Movement
          </div>
          <h3 className="mt-1 text-xl font-black text-[#073B6F]">
            {productName} Rate Trend (₹/{unit})
          </h3>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
          {(['7D', '30D', '3M', '6M', '1Y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1.5 transition ${
                range === r
                  ? 'bg-white font-bold text-[#073B6F] shadow-sm'
                  : 'hover:text-[#073B6F]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Loading price movement data...
          </div>
        ) : formattedData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-slate-500">
              No historical rate records available for this selected range.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              New rate entries are recorded daily at mandi auctions.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39A9E8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#39A9E8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={yDomain}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                        <div className="text-xs font-bold text-slate-500">{label}</div>
                        <div className="mt-1 text-base font-black text-[#073B6F]">
                          ₹{d.rate.toFixed(2)} / {unit}
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500">{d.mandi}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#0B5FA5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#rateGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
