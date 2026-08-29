'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

export function AiRateUpdaterCard({ onUpdated }: { onUpdated?: () => void }) {
  const [aiUpdating, setAiUpdating] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleRunAiAutoUpdate = async () => {
    setAiUpdating(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/admin/rates/ai-auto-update', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI update failed');
      setAiResult(data);
      if (onUpdated) onUpdated();
    } catch (err: any) {
      alert(err.message || 'AI Auto-Update error');
    } finally {
      setAiUpdating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-br from-[#073B6F] via-[#0B5FA5] to-[#073B6F] p-6 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>AI Market Intelligence Engine</span>
            <span className="text-[#39A9E8]">•</span>
            <Clock className="h-3.5 w-3.5 text-emerald-300" />
            <span className="text-emerald-200">Scheduled Daily at 10:30 AM IST</span>
          </div>

          <h2 className="text-xl font-black sm:text-2xl">
            Instant AI Rate Auto-Updater
          </h2>
          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            Fetch and update all commodity rates across all mandi locations in 1 single click with live wholesale fluctuation calculations, APMC auction spread, and instant WhatsApp confirmation dispatch to Admin.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={handleRunAiAutoUpdate}
            disabled={aiUpdating}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-xs font-black text-[#073B6F] shadow-lg transition hover:bg-[#EAF5FC] hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {aiUpdating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#073B6F] border-t-transparent" />
                <span>Scanning Mandis & Updating Rates...</span>
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 text-[#0B5FA5]" />
                <span>⚡ Run AI Auto-Update Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Execution Result Toast / Summary */}
      {aiResult && (
        <div className="mt-4 rounded-2xl border border-emerald-400/30 bg-emerald-950/40 p-4 backdrop-blur-md animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>{aiResult.message}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] sm:grid-cols-4">
            <div className="rounded-xl bg-white/5 p-2 text-center">
              <span className="block text-slate-300">Quotes Updated</span>
              <span className="text-sm font-black text-white">{aiResult.totalUpdated}</span>
            </div>
            <div className="rounded-xl bg-white/5 p-2 text-center">
              <span className="block text-slate-300">Mandis Synced</span>
              <span className="text-sm font-black text-white">{aiResult.mandisCount}</span>
            </div>
            <div className="rounded-xl bg-white/5 p-2 text-center">
              <span className="block text-slate-300">Market Trend</span>
              <span className="text-sm font-black text-emerald-300">
                🟢 {aiResult.marketTrend?.rising} | 🔴 {aiResult.marketTrend?.falling} | ⚪ {aiResult.marketTrend?.stable}
              </span>
            </div>
            <div className="rounded-xl bg-white/5 p-2 text-center">
              <span className="block text-slate-300">WhatsApp Alert</span>
              <span className="text-sm font-black text-emerald-300 inline-flex items-center gap-1 justify-center">
                <MessageSquare className="h-3.5 w-3.5" /> Sent to Admin
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
