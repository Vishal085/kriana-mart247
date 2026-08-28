'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Bell, CheckCheck, Package, TrendingUp } from 'lucide-react';

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });
      setNotifications(notifications.map((n) => ({ ...n, readAt: new Date() })));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Notifications</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Notification Center</h1>
          <p className="mt-1 text-xs text-slate-500">
            Real-time order status updates, price alert triggers, and system messages.
          </p>
        </div>

        {notifications.some((n) => !n.readAt) && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-4 py-2 text-xs font-bold text-[#073B6F] hover:bg-[#073B6F] hover:text-white transition"
          >
            <CheckCheck className="h-4 w-4" /> Mark All as Read
          </button>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 rounded-3xl border p-5 transition shadow-sm ${
              n.readAt ? 'border-slate-200 bg-white' : 'border-[#39A9E8]/40 bg-[#EAF5FC]/40'
            }`}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#073B6F] text-white">
              {n.type === 'ORDER' ? (
                <Package className="h-5 w-5" />
              ) : (
                <TrendingUp className="h-5 w-5" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                <span className="text-[10px] text-slate-400">
                  {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && !loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-3 text-base font-bold text-slate-700">No Notifications</h2>
            <p className="mt-1 text-xs text-slate-500">You are all caught up!</p>
          </div>
        )}
      </div>
    </main>
  );
}
