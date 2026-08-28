'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, Bell, Trash2, Plus, AlertCircle, Check } from 'lucide-react';

export default function CustomerAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [mandis, setMandis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState('');
  const [mandiId, setMandiId] = useState('');
  const [condition, setCondition] = useState<'ABOVE' | 'BELOW'>('BELOW');
  const [targetPrice, setTargetPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      const [alertsRes, prodsRes, mandisRes] = await Promise.all([
        fetch('/api/alerts'),
        fetch('/api/products?limit=100'),
        fetch('/api/mandis'),
      ]);

      if (alertsRes.ok) {
        const data = await alertsRes.json();
        setAlerts(data.alerts || []);
      }
      if (prodsRes.ok) {
        const pData = await prodsRes.json();
        setProducts(pData.items || []);
        if (pData.items?.[0]) setProductId(pData.items[0].id);
      }
      if (mandisRes.ok) {
        const mData = await mandisRes.json();
        setMandis(mData.mandis || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          mandiId: mandiId || null,
          condition,
          targetPrice: parseFloat(targetPrice),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create alert');

      setShowModal(false);
      setTargetPrice('');
      fetchAlerts();
    } catch (err: any) {
      setError(err.message || 'Error creating alert');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/alerts?id=${id}`, { method: 'DELETE' });
      setAlerts(alerts.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: string, active: boolean) => {
    try {
      await fetch('/api/alerts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active }),
      });
      setAlerts(alerts.map((a) => (a.id === id ? { ...a, active } : a)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Price Alerts</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Mandi Rate Price Alerts</h1>
          <p className="mt-1 text-xs text-slate-500">
            Receive automated notifications when commodity rates rise above or drop below your targets.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5]"
        >
          <Plus className="h-4 w-4" /> Create Price Alert
        </button>
      </div>

      {/* Alerts Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    alert.condition === 'BELOW'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  Rate {alert.condition}
                </span>

                <button
                  onClick={() => handleDelete(alert.id)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <h3 className="mt-3 font-bold text-base text-[#073B6F]">{alert.product.name}</h3>
              <div className="text-xs text-slate-500">
                Mandi: <span className="font-semibold text-slate-700">{alert.mandi?.name || 'All Mandis'}</span>
              </div>

              <div className="mt-4 rounded-2xl bg-[#F7FAFC] p-3 text-xs">
                <div className="text-slate-500 font-medium">Target Price Threshold</div>
                <div className="mt-1 text-xl font-black text-slate-900">
                  ₹{Number(alert.targetPrice).toFixed(2)} / {alert.product.unit}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {alert.triggered ? (
                  <span className="font-bold text-emerald-600">✓ Triggered</span>
                ) : (
                  <span>Monitoring...</span>
                )}
              </span>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <span>Active</span>
                <input
                  type="checkbox"
                  checked={alert.active}
                  onChange={(e) => handleToggle(alert.id, e.target.checked)}
                  className="rounded text-[#073B6F] focus:ring-[#073B6F]"
                />
              </label>
            </div>
          </div>
        ))}

        {alerts.length === 0 && !loading && (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-3 text-base font-bold text-slate-700">No Price Alerts Created</h2>
            <p className="mt-1 text-xs text-slate-500">Set target thresholds on commodities to get notified automatically.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-[#073B6F]">Create New Price Alert</h2>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateAlert} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">Commodity / Product</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Target Mandi (Optional)</label>
                <select
                  value={mandiId}
                  onChange={(e) => setMandiId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800"
                >
                  <option value="">Any Active Mandi</option>
                  {mandis.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Trigger Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800"
                  >
                    <option value="BELOW">Price Drops Below</option>
                    <option value="ABOVE">Price Rises Above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">Target Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 55.00"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#073B6F] px-5 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5]"
                >
                  {submitting ? 'Creating...' : 'Set Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
