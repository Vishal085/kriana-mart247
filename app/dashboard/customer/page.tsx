import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { MANDI_COMMODITY_CATEGORIES, RETAIL_ONLY_CATEGORIES } from '@/services/rates.service';
import { RateTrendBadge } from '@/components/RateTrendBadge';
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
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default async function CustomerDashboardPage() {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const [orders, wishlistCount, watchlistCount, alertsCount, unreadNotifications, mandiRates] =
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
      prisma.mandiRate.findMany({
        where: {
          active: true,
          product: {
            category: {
              slug: { in: MANDI_COMMODITY_CATEGORIES, notIn: RETAIL_ONLY_CATEGORIES },
            },
          },
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              unit: true,
              category: { select: { name: true } },
            },
          },
          mandi: { select: { id: true, name: true, city: true } },
        },
        orderBy: { updatedAt: 'desc' },
        take: 5,
      }),
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

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/customer/mandi"
              className="rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800 flex items-center gap-1.5 shadow-xs"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Kirana Mandi Rates
            </Link>
            <Link
              href="/shop?section=retail"
              className="rounded-full bg-[#073B6F] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0B5FA5] flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Retail Chhota Ration
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Quick Cards (with dedicated Kirana Mandi Tab) */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {/* Dedicated Kirana Mandi Tab Card */}
        <Link
          href="/dashboard/customer/mandi"
          className="flex flex-col items-center rounded-2xl border border-emerald-300 bg-gradient-to-b from-emerald-50 to-white p-4 text-center shadow-xs transition hover:border-emerald-600 hover:shadow-md relative overflow-hidden"
        >
          <span className="absolute top-1.5 right-2 text-[8px] font-black uppercase text-emerald-800 bg-emerald-200/80 px-1.5 py-0.2 rounded-full">
            Live Bhav
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="mt-3 text-xs font-black text-emerald-900">Kirana Mandi</span>
          <span className="mt-1 text-[10px] text-emerald-700 font-bold">Wholesale Rates</span>
        </Link>

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
            <Bell className="h-5 w-5" />
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

      {/* Kirana Mandi Live Bhav Preview Section */}
      <div className="mt-10 rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Kirana Mandi — Live Commodity Rates (थोक मंडी भाव)
              </h2>
              <p className="text-xs text-slate-500">
                Verified wholesale APMC auction prices for grains, dals, oils & sugar. Strictly zero retail goods.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/customer/mandi"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 hover:underline"
          >
            Open Kirana Mandi Portal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-emerald-50/60 text-emerald-950 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2.5 rounded-l-lg">Commodity</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Mandi</th>
                <th className="px-4 py-2.5">Unit</th>
                <th className="px-4 py-2.5">Today&apos;s Bhav</th>
                <th className="px-4 py-2.5">Trend</th>
                <th className="px-4 py-2.5 rounded-r-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mandiRates.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-bold text-[#073B6F]">
                    <Link href={`/products/${r.product.slug}`} className="hover:underline">
                      {r.product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.product.category.name}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{r.mandi.name}</td>
                  <td className="px-4 py-3">{r.product.unit}</td>
                  <td className="px-4 py-3 font-black text-slate-900">
                    ₹{Number(r.currentRate).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <RateTrendBadge
                      direction={r.direction}
                      percentage={Number(r.percentageChange)}
                      size="sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/customer/alerts?commodity=${encodeURIComponent(r.product.name)}`}
                      className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 transition"
                    >
                      Track
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
