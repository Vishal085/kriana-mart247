'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Eye, ShoppingBag } from 'lucide-react';
import { OrderStatus } from '@prisma/client';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(search ? { search } : {}),
      });

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Orders Management</span>
      </div>

      <h1 className="mt-3 text-3xl font-black text-[#073B6F]">Customer Orders Management</h1>
      <p className="mt-1 text-xs text-slate-500">
        Manage customer orders, process fulfillment status lifecycle, and review dispatch notifications.
      </p>

      {/* Filter Bar */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr_auto]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search order number, customer name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none"
            />
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-700"
          >
            <option value="">All Order Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="DISPATCHED">DISPATCHED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('');
            }}
            className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
              <tr>
                <th className="px-4 py-3.5">Order Number</th>
                <th className="px-4 py-3.5">Customer Name</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">City</th>
                <th className="px-4 py-3.5">Total Amount</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 font-mono font-bold text-[#073B6F]">{ord.orderNumber}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900">{ord.deliveryName}</td>
                  <td className="px-4 py-3.5 text-slate-600">{ord.deliveryPhone}</td>
                  <td className="px-4 py-3.5 text-slate-600">{ord.city}</td>
                  <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                    ₹{Number(ord.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ord.status === 'CANCELLED'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-[#0B5FA5] border border-blue-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={`/dashboard/admin/orders/${ord.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#EAF5FC] px-2.5 py-1 text-xs font-bold text-[#073B6F] hover:bg-[#073B6F] hover:text-white transition"
                    >
                      <Eye className="h-3.5 w-3.5" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No orders match your criteria.
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
