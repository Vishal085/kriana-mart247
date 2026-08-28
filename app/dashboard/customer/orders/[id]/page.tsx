import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ChevronRight, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';

export default async function CustomerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId: user.id },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: 'asc' } },
      whatsappLogs: { orderBy: { sentAt: 'desc' } },
    },
  });

  if (!order) return notFound();

  const statuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'DELIVERED'];
  const currentIndex = statuses.indexOf(order.status);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/dashboard/customer/orders" className="hover:text-[#0B5FA5]">My Orders</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">#{order.orderNumber}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-xs font-bold text-[#0B5FA5]">ORDER #{order.orderNumber}</span>
          <h1 className="text-3xl font-black text-[#073B6F]">Order Details & Tracking</h1>
          <div className="mt-1 text-xs text-slate-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </div>
        </div>

        <div>
          <span className="rounded-full bg-[#073B6F] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
            Status: {order.status}
          </span>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-sm font-black text-[#073B6F] uppercase tracking-wider">
          Order Progress Timeline
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {statuses.map((s, idx) => {
            const isCompleted = currentIndex >= idx;
            const isCurrent = order.status === s;

            return (
              <div key={s} className="flex flex-col items-center text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition ${
                    isCompleted
                      ? 'border-[#073B6F] bg-[#073B6F] text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                  } ${isCurrent ? 'ring-4 ring-[#39A9E8]/30' : ''}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-[#72B82A]" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="mt-3 text-xs font-bold text-slate-800">{s}</div>
                <div className="text-[10px] text-slate-400">
                  {order.statusHistory.find((h) => h.status === s)
                    ? new Date(order.statusHistory.find((h) => h.status === s)!.createdAt).toLocaleDateString()
                    : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        {order.status === 'CANCELLED' && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-center text-xs font-bold text-red-600 border border-red-200">
            This order has been cancelled.
          </div>
        )}
      </div>

      {/* Grid: Order Items & Delivery Receipt */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Items Table */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#073B6F]">Items in this Order</h2>

          <div className="mt-4 divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#0B5FA5]">{item.brandSnapshot}</span>
                  <div className="font-bold text-slate-900 text-sm">{item.productNameSnapshot}</div>
                  <div className="text-slate-500">
                    Quantity: {item.quantity} {item.unit} @ ₹{Number(item.unitPrice).toFixed(2)}
                  </div>
                </div>
                <div className="text-right font-black text-slate-900 text-sm">
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
              <span>GST (5%)</span>
              <span className="font-bold text-slate-800">₹{Number(order.tax).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-slate-800">₹{Number(order.deliveryCharge).toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between text-base font-black text-[#073B6F]">
              <span>Total Paid</span>
              <span className="text-xl">₹{Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#073B6F]">Delivery Address</h2>

          <div className="mt-4 space-y-3 text-xs text-slate-700">
            <div>
              <div className="text-slate-400 font-bold uppercase text-[10px]">Recipient</div>
              <div className="font-bold text-sm text-slate-900">{order.deliveryName}</div>
              <div className="text-slate-600">{order.deliveryPhone}</div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Shipping Address</div>
              <div className="mt-1 flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#39A9E8] flex-shrink-0 mt-0.5" />
                <span>
                  {order.deliveryAddress}, {order.city} - {order.pincode}
                </span>
              </div>
            </div>

            {order.customerNotes && (
              <div className="pt-3 border-t border-slate-100">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Customer Notes</div>
                <p className="mt-1 text-slate-600">{order.customerNotes}</p>
              </div>
            )}

            {/* WhatsApp notification indicator */}
            {order.whatsappLogs.length > 0 && (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-3.5 text-xs text-emerald-800 border border-emerald-200">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#72B82A]" /> WhatsApp Notification Dispatched
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">
                  Status: {order.whatsappLogs[0].status}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
