'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Upload, Trash2, Edit3, TrendingUp, TrendingDown, Minus, Search, Check, Sparkles, Bot, Clock, CheckCircle2 } from 'lucide-react';
import { RateTrendBadge } from '@/components/RateTrendBadge';

export default function AdminRatesPage() {
  const [rates, setRates] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [mandis, setMandis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Auto-Updater State
  const [aiUpdating, setAiUpdating] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [mandiId, setMandiId] = useState('');

  // Single Rate Modal
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedMandiId, setSelectedMandiId] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [previousRate, setPreviousRate] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [unit, setUnit] = useState('KG');
  const [rateDate, setRateDate] = useState(new Date().toISOString().slice(0, 10));
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Bulk Import Modal
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkJson, setBulkJson] = useState('');
  const [bulkResult, setBulkResult] = useState<any>(null);

  const handleRunAiAutoUpdate = async () => {
    setAiUpdating(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/admin/rates/ai-auto-update', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI update failed');
      setAiResult(data);
      await fetchRatesData();
    } catch (err: any) {
      alert(err.message || 'AI Auto-Update error');
    } finally {
      setAiUpdating(false);
    }
  };

  const fetchRatesData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(mandiId ? { mandiId } : {}),
        ...(search ? { search } : {}),
        limit: '100',
      });

      const [ratesRes, prodsRes, mandisRes] = await Promise.all([
        fetch(`/api/admin/rates?${params.toString()}`),
        fetch('/api/admin/products?limit=100'),
        fetch('/api/admin/mandis'),
      ]);

      if (ratesRes.ok) {
        const data = await ratesRes.json();
        setRates(data.items || []);
      }
      if (prodsRes.ok) {
        const pData = await prodsRes.json();
        setProducts(pData.items || []);
        if (pData.items?.[0] && !selectedProductId) {
          setSelectedProductId(pData.items[0].id);
          setUnit(pData.items[0].unit || 'KG');
        }
      }
      if (mandisRes.ok) {
        const mData = await mandisRes.json();
        setMandis(mData.mandis || []);
        if (mData.mandis?.[0] && !selectedMandiId) {
          setSelectedMandiId(mData.mandis[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatesData();
  }, [mandiId]);

  const handleUpsertRate = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setSubmitting(true);

    try {
      const payload = {
        productId: selectedProductId,
        mandiId: selectedMandiId,
        date: rateDate,
        currentRate: parseFloat(currentRate),
        previousRate: parseFloat(previousRate || '0'),
        minimumRate: minRate ? parseFloat(minRate) : parseFloat(currentRate),
        maximumRate: maxRate ? parseFloat(maxRate) : parseFloat(currentRate),
        unit,
        active: true,
      };

      const res = await fetch('/api/admin/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update rate');

      setShowRateModal(false);
      setCurrentRate('');
      setPreviousRate('');
      setMinRate('');
      setMaxRate('');
      fetchRatesData();
    } catch (err: any) {
      setModalError(err.message || 'Error updating rate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRate = async (id: string) => {
    if (!confirm('Are you sure you want to remove this rate?')) return;
    try {
      await fetch(`/api/admin/rates/${id}`, { method: 'DELETE' });
      setRates(rates.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setBulkResult(null);
    try {
      const parsed = JSON.parse(bulkJson);
      const res = await fetch('/api/admin/rates/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      setBulkResult(data.results || data);
      fetchRatesData();
    } catch (err: any) {
      alert('Invalid JSON structure: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Rate Engine Manager</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Mandi Rate Engine</h1>
          <p className="mt-1 text-xs text-slate-500">
            Create, update daily rates with auto-computed movements, and view historical rate snapshots.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#073B6F] shadow-sm hover:border-[#39A9E8]"
          >
            <Upload className="h-4 w-4" /> Bulk Import Rates
          </button>
          <button
            onClick={() => setShowRateModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5]"
          >
            <Plus className="h-4 w-4" /> Add / Update Rate
          </button>
        </div>
      </div>

      {/* AI Rate Auto-Updater & 10:30 AM Scheduler Banner */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-br from-[#073B6F] via-[#0B5FA5] to-[#073B6F] p-6 text-white shadow-xl">
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
            <div className="mt-2 grid grid-cols-2 gap-3 text-[11px] sm:grid-cols-4">
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
                  🟢 {aiResult.marketTrend?.rising} | 🔴 {aiResult.marketTrend?.falling}
                </span>
              </div>
              <div className="rounded-xl bg-white/5 p-2 text-center">
                <span className="block text-slate-300">WhatsApp Alert</span>
                <span className="text-sm font-black text-emerald-300">✓ Dispatched</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <select
            value={mandiId}
            onChange={(e) => setMandiId(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-bold text-slate-700"
          >
            <option value="">All Mandi Locations</option>
            {mandis.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.city})
              </option>
            ))}
          </select>

          <button
            onClick={() => fetchRatesData()}
            className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Rates Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
              <tr>
                <th className="px-4 py-3.5">Commodity</th>
                <th className="px-4 py-3.5">Mandi</th>
                <th className="px-4 py-3.5">Current Rate</th>
                <th className="px-4 py-3.5">Previous Rate</th>
                <th className="px-4 py-3.5">Absolute Shift</th>
                <th className="px-4 py-3.5">Trend Direction</th>
                <th className="px-4 py-3.5">Last Updated</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rates.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 font-bold text-slate-900">{row.product.name}</td>
                  <td className="px-4 py-3.5 text-slate-600">{row.mandi.name}</td>
                  <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                    ₹{Number(row.currentRate).toFixed(2)} / {row.unit}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-medium">
                    ₹{Number(row.previousRate).toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-3.5 font-bold ${
                      row.direction === 'RISING'
                        ? 'text-emerald-600'
                        : row.direction === 'FALLING'
                        ? 'text-red-600'
                        : 'text-slate-500'
                    }`}
                  >
                    ₹{Number(row.absoluteChange).toFixed(2)} ({row.percentageChange > 0 ? '+' : ''}{Number(row.percentageChange).toFixed(1)}%)
                  </td>
                  <td className="px-4 py-3.5">
                    <RateTrendBadge direction={row.direction} percentage={Number(row.percentageChange)} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProductId(row.productId);
                        setSelectedMandiId(row.mandiId);
                        setCurrentRate(row.currentRate.toString());
                        setPreviousRate(row.previousRate.toString());
                        setUnit(row.unit);
                        setShowRateModal(true);
                      }}
                      className="text-slate-500 hover:text-[#0B5FA5]"
                      title="Edit Rate"
                    >
                      <Edit3 className="h-4 w-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDeleteRate(row.id)}
                      className="text-slate-400 hover:text-red-600"
                      title="Delete Rate"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {rates.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No rates found. Click &quot;Add / Update Rate&quot; to post today&apos;s rates.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rate Upsert Modal */}
      {showRateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-[#073B6F]">Post / Update Mandi Rate</h2>
            <p className="mt-1 text-xs text-slate-500">
              Server automatically calculates absolute change, percentage, and direction.
            </p>

            {modalError && (
              <div className="mt-3 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                {modalError}
              </div>
            )}

            <form onSubmit={handleUpsertRate} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Commodity</label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => {
                      setSelectedProductId(e.target.value);
                      const prod = products.find((p) => p.id === e.target.value);
                      if (prod) setUnit(prod.unit);
                    }}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Mandi Location</label>
                  <select
                    value={selectedMandiId}
                    onChange={(e) => setSelectedMandiId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800"
                  >
                    {mandis.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.city})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Today&apos;s Current Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 72.50"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Previous Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 68.00"
                    value={previousRate}
                    onChange={(e) => setPreviousRate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Min Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Optional"
                    value={minRate}
                    onChange={(e) => setMinRate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Max Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Optional"
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Unit</label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Rate Auction Date</label>
                <input
                  type="date"
                  value={rateDate}
                  onChange={(e) => setRateDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRateModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#073B6F] px-5 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5]"
                >
                  {submitting ? 'Saving...' : 'Commit Rate Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-[#073B6F]">Bulk Import Rates (JSON / CSV Format)</h2>
            <p className="mt-1 text-xs text-slate-500">
              Paste array with format: <code>&#123;&quot;rates&quot;: [&#123;&quot;productSku&quot;: &quot;RICE-001&quot;, &quot;mandiSlug&quot;: &quot;delhi-naya-bazar&quot;, &quot;date&quot;: &quot;2026-08-29&quot;, &quot;currentRate&quot;: 75, &quot;previousRate&quot;: 70, &quot;unit&quot;: &quot;KG&quot;&#125;]&#125;</code>
            </p>

            <form onSubmit={handleBulkImport} className="mt-4 space-y-3">
              <textarea
                rows={7}
                required
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                placeholder='{"rates": [{"productSku": "RICE-001", "mandiSlug": "delhi-naya-bazar", "date": "2026-08-29", "currentRate": 75, "previousRate": 70, "unit": "KG"}]}'
                className="w-full font-mono rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800"
              />

              {bulkResult && (
                <div className="rounded-xl bg-slate-100 p-3 text-xs">
                  <div>Success: <strong className="text-emerald-600">{bulkResult.successCount}</strong></div>
                  <div>Failed: <strong className="text-red-600">{bulkResult.failedCount}</strong></div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#073B6F] px-5 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5]"
                >
                  {submitting ? 'Importing...' : 'Run Bulk Import'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
