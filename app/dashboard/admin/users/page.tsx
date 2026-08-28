'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, UserCheck, UserX, Shield, User } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Customer Management</span>
      </div>

      <h1 className="mt-3 text-3xl font-black text-[#073B6F]">Registered Customer Accounts</h1>
      <p className="mt-1 text-xs text-slate-500">
        Search registered customers, inspect order histories, and toggle account activation status.
      </p>

      {/* Search Input */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchUsers();
          }}
          className="relative max-w-md"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, email or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none"
          />
        </form>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
              <tr>
                <th className="px-4 py-3.5">Customer Name</th>
                <th className="px-4 py-3.5">Mobile Number</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">City & PIN</th>
                <th className="px-4 py-3.5">Orders Placed</th>
                <th className="px-4 py-3.5">Joined Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 font-bold text-slate-900">{u.fullName}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-700">{u.mobile}</td>
                  <td className="px-4 py-3.5 text-slate-500">{u.email || 'N/A'}</td>
                  <td className="px-4 py-3.5 text-slate-600">
                    {u.customerProfile?.city ? `${u.customerProfile.city} (${u.customerProfile.pinCode})` : 'N/A'}
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
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No customer accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
