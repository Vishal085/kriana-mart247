import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  Package,
  Heart,
  Store,
  Bell,
  User,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default async function CustomerDashboardPage() {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const [orders, wishlistCount, watchlistCount, alertsCount, unreadNotifications] =
    await Promise.all([
      prisma.order.findMany({
        where: { userId: user.id },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.wishlistItem.count({ where: { userId: user.id } }),
      prisma.mandiWatchlistItem.count({ where: { userId: user.id } }),
      prisma.priceAlert.count({ where: { userId: user.id, active: true } }),
      prisma.notification.count({ where: { userId: user.id, readAt: null } }),
    ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#073B6F] text-2xl font-black text-white">
              {user.fullName.slice(0, 1)}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                Customer Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F]">
                Welcome back, {user.fullName}!
              </h1>
              <div className="mt-1 text-xs text-slate-500">
                {user.mobile} {user.email ? `• ${user.email}` : ''}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/shop"
              className="rounded-full bg-[#073B6F] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0B5FA5]"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Quick Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Link
          href="/dashboard/customer/orders"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
            <Package className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">My Orders</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">{orders.length} placed</span>
        </Link>

        <Link
          href="/dashboard/customer/wishlist"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
            <Heart className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">Wishlist</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">{wishlistCount} items</span>
        </Link>

        <Link
          href="/dashboard/customer/watchlist"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0B5FA5]">
            <Store className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">Saved Mandis</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">{watchlistCount} mandis</span>
        </Link>

        <Link
          href="/dashboard/customer/alerts"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">Price Alerts</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">{alertsCount} active</span>
        </Link>

        <Link
          href="/dashboard/customer/notifications"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Bell className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">Notifications</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">{unreadNotifications} unread</span>
        </Link>

        <Link
          href="/dashboard/customer/profile"
          className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-[#39A9E8] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <User className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-bold text-slate-800">My Profile</span>
          <span className="mt-1 text-[10px] text-slate-500 font-semibold">Address & Info</span>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#073B6F]">Recent Orders</h2>
          <Link
            href="/dashboard/customer/orders"
            className="text-xs font-bold text-[#0B5FA5] hover:underline"
          >
            View All Orders →
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#073B6F]">
                    {order.orderNumber}
                  </span>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                    {order.status}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {order.items.length} items • Placed on {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">
                    ₹{Number(order.total).toFixed(2)}
                  </div>
                </div>
                <Link
                  href={`/dashboard/customer/orders/${order.id}`}
                  className="rounded-xl bg-[#EAF5FC] px-3.5 py-2 text-xs font-bold text-[#0B5FA5] hover:bg-[#073B6F] hover:text-white transition"
                >
                  Track Order
                </Link>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-400">
              You haven&apos;t placed any orders yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
