'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, CheckCircle2, Clock, Truck, ShieldCheck, RefreshCw, Send, AlertCircle } from 'lucide-react';
import { OrderStatus } from '@prisma/client';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<OrderStatus>('PENDING');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [retryingWhatsApp, setRetryingWhatsApp] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
        setStatus(data.order.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note: statusNote }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Status update failed');

      setMessage('Order status updated and customer notified.');
      setStatusNote('');
      fetchOrder();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleRetryWhatsApp = async () => {
    setRetryingWhatsApp(true);
    try {
      const res = await fetch(`/api/notifications/whatsapp/${orderId}/retry`, {
        method: 'POST',
      });
      const data = await res.json();
      alert(`WhatsApp dispatch result: ${data.result?.status || 'Executed'}`);
      fetchOrder();
    } catch (err: any) {
      alert('Retry error: ' + err.message);
    } finally {
      setRetryingWhatsApp(false);
    }
  };

  if (loading) {
    return <main className="mx-auto max-w-7xl px-4 py-16 text-center text-xs text-slate-400">Loading order...</main>;
  }

  if (!order) {
    return <main className="mx-auto max-w-7xl px-4 py-16 text-center text-xs text-slate-400">Order not found.</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/dashboard/admin/orders" className="hover:text-[#0B5FA5]">Orders</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">#{order.orderNumber}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-xs font-bold text-[#0B5FA5]">ORDER #{order.orderNumber}</span>
          <h1 className="text-3xl font-black text-[#073B6F]">Manage Customer Order</h1>
          <div className="text-xs text-slate-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </div>
        </div>

        <div>
          <span className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
            Current: {order.status}
          </span>
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700">
          {message}
        </div>
      )}

      {/* Grid: Details and Admin Actions */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {/* Items Table */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">Order Items Snapshot</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between py-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0B5FA5]">{item.brandSnapshot}</span>
                    <div className="font-bold text-slate-900 text-sm">{item.productNameSnapshot}</div>
                    <div className="text-slate-500">
                      {item.quantity} {item.unit} @ ₹{Number(item.unitPrice).toFixed(2)}
                    </div>
                  </div>
                  <div className="font-black text-slate-900 text-sm">
                    ₹{Number(item.subtotal).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax</span>
                <span className="font-bold text-slate-800">₹{Number(order.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-slate-800">₹{Number(order.deliveryCharge).toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between text-base font-black text-[#073B6F]">
                <span>Total Amount</span>
                <span className="text-xl">₹{Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Status Timeline Log */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">Status History Log</h2>
            <div className="mt-4 space-y-3">
              {order.statusHistory.map((h: any) => (
                <div key={h.id} className="flex items-start gap-3 text-xs">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#073B6F] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800">{h.status}</div>
                    <div className="text-slate-500">{h.note || 'Status updated'}</div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(h.createdAt).toLocaleDateString()} at {new Date(h.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Status Change Form & WhatsApp Notification Panel */}
        <div className="space-y-6">
          {/* Status Update Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">Update Fulfillment Status</h2>
            <form onSubmit={handleUpdateStatus} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700">Select Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-bold text-slate-800"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="DISPATCHED">DISPATCHED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Admin Note / Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Package dispatched via delivery rider #12"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full rounded-xl bg-[#073B6F] py-3 text-xs font-bold text-white shadow hover:bg-[#0B5FA5] transition"
              >
                {updating ? 'Updating...' : 'Commit Status Change'}
              </button>
            </form>
          </div>

          {/* Customer & Address Details */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-xs space-y-3">
            <h2 className="text-lg font-black text-[#073B6F]">Customer Info</h2>
            <div>
              <span className="font-bold text-slate-500">Name: </span>
              <span className="font-bold text-slate-900">{order.deliveryName}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500">Phone: </span>
              <span className="font-bold text-slate-900">{order.deliveryPhone}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500">Address: </span>
              <span className="text-slate-800">
                {order.deliveryAddress}, {order.city} - {order.pincode}
              </span>
            </div>
          </div>

          {/* WhatsApp Logs & Direct Customer Dispatch */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-[#073B6F]">WhatsApp Notifications</h2>
                <p className="text-[11px] text-slate-500">Live order confirmation & dispatch alerts</p>
              </div>

              <button
                onClick={handleRetryWhatsApp}
                disabled={retryingWhatsApp}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-[#EAF5FC] hover:border-[#39A9E8] transition"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${retryingWhatsApp ? 'animate-spin' : ''}`} />
                <span>{retryingWhatsApp ? 'Sending...' : 'Retry Dispatch'}</span>
              </button>
            </div>

            {/* Direct WhatsApp Chat Action */}
            <a
              href={`https://wa.me/91${order.deliveryPhone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `🛒 *KiranaMart — Order Update*\n\nHello ${order.deliveryName},\nYour order *#${order.orderNumber}* status is: *${order.status}*.\nTotal Amount: ₹${Number(order.total).toFixed(2)}\n\nDelivery Address: ${order.deliveryAddress}, ${order.city} - ${order.pincode}\n\nThank you for choosing KiranaMart!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-xs font-black text-white shadow-sm hover:bg-[#1EBE5B] transition active:scale-98"
            >
              <span>💬 Open WhatsApp Chat with Customer</span>
            </a>

            {/* Opt-in status badge */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold text-slate-500">Customer Consent:</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${order.whatsappOptIn !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {order.whatsappOptIn !== false ? '✓ Opted-in for WhatsApp Updates' : 'Opted Out'}
              </span>
            </div>

            {/* WhatsApp Messages Timeline */}
            {(order.whatsappMessages && order.whatsappMessages.length > 0) || (order.whatsappLogs && order.whatsappLogs.length > 0) ? (
              <div className="space-y-2.5 pt-1">
                {(order.whatsappMessages && order.whatsappMessages.length > 0
                  ? order.whatsappMessages
                  : order.whatsappLogs
                ).map((msg: any) => {
                  const isSent = msg.status === 'SENT';
                  const isDelivered = msg.status === 'DELIVERED';
                  const isRead = msg.status === 'READ';
                  const isFailed = msg.status === 'FAILED';

                  return (
                    <div
                      key={msg.id}
                      className={`rounded-2xl border p-3.5 transition ${
                        isRead
                          ? 'border-blue-200 bg-blue-50/50'
                          : isDelivered
                          ? 'border-emerald-200 bg-emerald-50/50'
                          : isSent
                          ? 'border-teal-200 bg-teal-50/40'
                          : isFailed
                          ? 'border-red-200 bg-red-50/60'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${
                              isRead
                                ? 'bg-blue-100 text-blue-800'
                                : isDelivered
                                ? 'bg-emerald-100 text-emerald-800'
                                : isSent
                                ? 'bg-teal-100 text-teal-800'
                                : isFailed
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isRead ? '✓✓ READ' : isDelivered ? '✓✓ DELIVERED' : isSent ? '✓ SENT' : msg.status}
                          </span>
                          {msg.templateName && (
                            <span className="font-mono text-[10px] text-slate-500 font-bold">
                              {msg.templateName}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(msg.sentAt || msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>

                      {msg.metaMessageId && (
                        <p className="mt-1.5 font-mono text-[10px] text-slate-500 truncate">
                          Meta ID: {msg.metaMessageId}
                        </p>
                      )}

                      {msg.errorMessage && (
                        <div className="mt-1.5 text-[11px] font-semibold text-red-600">
                          Error: {msg.errorMessage}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400">No WhatsApp messages dispatched yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
