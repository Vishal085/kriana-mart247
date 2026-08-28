'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Trash2, Store, MapPin } from 'lucide-react';

export default function AdminMandisPage() {
  const [mandis, setMandis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchMandis = async () => {
    try {
      const res = await fetch('/api/admin/mandis');
      if (res.ok) {
        const data = await res.json();
        setMandis(data.mandis || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandis();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/mandis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          active: true,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ name: '', slug: '', city: '', state: '', address: '', pincode: '', description: '' });
        fetchMandis();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mandi?')) return;
    try {
      await fetch(`/api/admin/mandis/${id}`, { method: 'DELETE' });
      setMandis(mandis.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Mandis</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Wholesale Mandi Locations</h1>
          <p className="mt-1 text-xs text-slate-500">Register new regional mandis and APMC auction centers.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#0B5FA5]"
        >
          <Plus className="h-4 w-4" /> Add Mandi Location
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mandis.map((m) => (
          <div key={m.id} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
                  <Store className="h-5 w-5" />
                </div>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-slate-300 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <h3 className="mt-4 font-bold text-base text-[#073B6F]">{m.name}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-[#39A9E8]" />
                <span>{m.city}, {m.state} {m.pincode ? `(${m.pincode})` : ''}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono text-slate-400">/{m.slug}</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-[#073B6F]">Register New Wholesale Mandi</h2>
            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Mandi Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kanpur Mandi"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Market Address / Locality</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#073B6F] px-5 py-2 font-bold text-white hover:bg-[#0B5FA5]"
                >
                  {submitting ? 'Registering...' : 'Add Mandi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
