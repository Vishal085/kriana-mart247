import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ChevronRight, Package, ArrowRight } from 'lucide-react';

export default async function CustomerOrdersPage() {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">My Orders</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Order History & Tracking</h1>
          <p className="mt-1 text-xs text-slate-500">
            View all placed orders, check status timelines, and inspect historical item receipts.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-sm font-bold text-[#073B6F]">
                  #{order.orderNumber}
                </span>
                <div className="text-xs text-slate-500">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#0B5FA5]">
                  {order.status}
                </span>
                <Link
                  href={`/dashboard/customer/orders/${order.id}`}
                  className="rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5] transition"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Items Ordered</div>
                <div className="mt-1 text-xs font-semibold text-slate-800">
                  {order.items.map((i) => `${i.productNameSnapshot} (${i.quantity} ${i.unit})`).join(', ')}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Delivery Address</div>
                <div className="mt-1 text-xs text-slate-600">
                  {order.deliveryAddress}, {order.city} - {order.pincode}
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-[11px] font-bold uppercase text-slate-400">Total Amount</div>
                <div className="mt-1 text-lg font-black text-slate-900">
                  ₹{Number(order.total).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-3 text-base font-bold text-slate-700">No Orders Placed Yet</h2>
            <p className="mt-1 text-xs text-slate-500">Visit our kirana shop to place your first grocery order!</p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
