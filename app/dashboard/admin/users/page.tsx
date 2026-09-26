'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Search,
  UserCheck,
  UserX,
  User,
  UserPlus,
  Store,
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Add Customer Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Delhi');
  const [pinCode, setPinCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [createdNote, setCreatedNote] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?limit=100${search ? `&search=${encodeURIComponent(search)}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const nextActive = !currentActive;
    if (!confirm(`Are you sure you want to ${nextActive ? 'activate' : 'deactivate'} this customer account?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: nextActive }),
      });

      if (res.ok) {
        setUsers(users.map((u) => (u.id === id ? { ...u, active: nextActive } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setCreatedNote(null);

    if (!name.trim()) {
      setFormError('Customer Name is required');
      return;
    }
    const cleanMobile = contactNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setFormError('Please enter a valid 10-digit Indian contact number starting with 6, 7, 8, or 9');
      return;
    }
    if (!storeName.trim()) {
      setFormError('Store Name is required');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contactNumber: cleanMobile,
          storeName: storeName.trim(),
          email: email.trim() || undefined,
          city: city.trim() || 'Delhi',
          pinCode: pinCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add customer');
      }

      setFormSuccess(data.message || `Customer "${name}" (${storeName}) added successfully!`);
      setCreatedNote(data.defaultPasswordNote || null);

      // Reset form fields
      setName('');
      setContactNumber('');
      setStoreName('');
      setEmail('');
      setPinCode('');

      // Refresh list
      fetchUsers();
    } catch (err: any) {
      setFormError(err.message || 'Failed to add customer');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Customer Management</span>
      </div>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Registered Customer Accounts</h1>
          <p className="mt-1 text-xs text-slate-500">
            Search registered customers, inspect order histories, manage store details, and onboard new buyers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profile?tab=add-customer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-[#073B6F] hover:text-[#073B6F] transition"
          >
            <User className="h-3.5 w-3.5" />
            <span>Admin Profile</span>
          </Link>
          <button
            onClick={() => {
              setFormError(null);
              setFormSuccess(null);
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5] transition"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchUsers();
          }}
          className="relative w-full max-w-md"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, store name, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
          />
        </form>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="rounded-full bg-[#EAF5FC] px-2.5 py-1 text-[#073B6F]">
            {users.length} Customers Loaded
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
              <tr>
                <th className="px-4 py-3.5">Store Name</th>
                <th className="px-4 py-3.5">Customer Name</th>
                <th className="px-4 py-3.5">Contact Number</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">City & PIN</th>
                <th className="px-4 py-3.5">Orders</th>
                <th className="px-4 py-3.5">Joined Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const store = u.customerProfile?.storeName || u.customerProfile?.address || 'Kirana Store';
                return (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      <div className="flex items-center gap-1.5">
                        <Store className="h-3.5 w-3.5 text-[#39A9E8] flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{store}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">{u.fullName}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span>{u.mobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {u.email && !u.email.endsWith('@customer.kiranamart.internal') ? u.email : 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">
                      {u.customerProfile?.city
                        ? `${u.customerProfile.city} ${u.customerProfile.pinCode ? `(${u.customerProfile.pinCode})` : ''}`
                        : 'Delhi'}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#073B6F]">
                      {u._count?.orders || 0} Orders
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          u.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {u.active ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => handleToggleActive(u.id, u.active)}
                        className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-bold transition ${
                          u.active
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {u.active ? (
                          <>
                            <UserX className="h-3.5 w-3.5" /> Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3.5 w-3.5" /> Activate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No customer accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#073B6F]">Add Customer</h2>
                  <p className="text-[10px] text-slate-500">Name, Contact number & Store Name required</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Notifications */}
            {formSuccess && (
              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-700">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              </div>
            )}

            {formError && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-bold text-red-600">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAddCustomer} className="mt-3 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Customer Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Store Name *
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gupta Kirana Store"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#0B5FA5] disabled:opacity-50"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>{submitting ? 'Adding...' : 'Add Customer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
