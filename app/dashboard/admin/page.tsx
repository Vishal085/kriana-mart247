import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Direction, Role } from '@prisma/client';
import {
  Users,
  Package,
  Layers,
  Tag,
  Store,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    redirect('/login/admin');
  }

  const [
    customersCount,
    productsCount,
    categoriesCount,
    brandsCount,
    mandisCount,
    ratesCount,
    rateDirections,
    ordersTotal,
    ordersPending,
    ordersDelivered,
    recentOrders,
  ] = await Promise.all([
    prisma.user.count({ where: { role: Role.CUSTOMER } }),
    prisma.product.count(),
    prisma.category.count(),
    prisma.brand.count(),
    prisma.mandi.count(),
    prisma.mandiRate.count({ where: { active: true } }),
    prisma.mandiRate.groupBy({
      by: ['direction'],
      where: { active: true },
      _count: { direction: true },
    }),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { status: 'DELIVERED' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { fullName: true, mobile: true } } },
    }),
  ]);

  const rising = rateDirections.find((r) => r.direction === Direction.RISING)?._count.direction ?? 0;
  const falling = rateDirections.find((r) => r.direction === Direction.FALLING)?._count.direction ?? 0;
  const stable = rateDirections.find((r) => r.direction === Direction.STABLE)?._count.direction ?? 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Shield className="h-7 w-7 text-[#39A9E8]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                Administrator Operations
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F]">
                KiranaMart247 Admin Console
              </h1>
              <div className="text-xs text-slate-500">Logged in as {admin.fullName}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/dashboard/admin/rates"
              className="rounded-full bg-[#073B6F] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5]"
            >
              Manage Rates
            </Link>
            <Link
              href="/dashboard/admin/orders"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-[#073B6F]"
            >
              View Orders ({ordersPending} Pending)
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Modules Navigation */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 text-xs font-bold text-slate-700">
        <Link
          href="/dashboard/admin/rates"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <TrendingUp className="h-4 w-4 text-[#0B5FA5]" /> Rates Manager
        </Link>
        <Link
          href="/dashboard/admin/orders"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <ShoppingBag className="h-4 w-4 text-[#0B5FA5]" /> Orders
        </Link>
        <Link
          href="/dashboard/admin/products"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <Package className="h-4 w-4 text-[#0B5FA5]" /> Products
        </Link>
        <Link
          href="/dashboard/admin/categories"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <Layers className="h-4 w-4 text-[#0B5FA5]" /> Categories
        </Link>
        <Link
          href="/dashboard/admin/brands"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <Tag className="h-4 w-4 text-[#0B5FA5]" /> Brands
        </Link>
        <Link
          href="/dashboard/admin/mandis"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <Store className="h-4 w-4 text-[#0B5FA5]" /> Mandis
        </Link>
        <Link
          href="/dashboard/admin/users"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#39A9E8] hover:text-[#073B6F]"
        >
          <Users className="h-4 w-4 text-[#0B5FA5]" /> Customers
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-slate-400">Total Customers</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{customersCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-slate-400">Products</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{productsCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-slate-400">Active Mandis</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{mandisCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-slate-400">Total Rates Tracked</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{ratesCount}</div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-amber-700">Pending Orders</div>
          <div className="mt-1 text-2xl font-black text-amber-600">{ordersPending}</div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-emerald-700">Delivered Orders</div>
          <div className="mt-1 text-2xl font-black text-emerald-600">{ordersDelivered}</div>
        </div>
      </div>

      {/* Market Movement Snapshot */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#073B6F]">Today&apos;s Mandi Movement Overview</h2>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
            <div className="text-xs font-bold text-emerald-700 uppercase">Rising Commodities</div>
            <div className="mt-1 text-2xl font-black text-emerald-600">{rising}</div>
          </div>
          <div className="rounded-2xl bg-red-50 p-4 border border-red-100">
            <div className="text-xs font-bold text-red-700 uppercase">Falling Commodities</div>
            <div className="mt-1 text-2xl font-black text-red-600">{falling}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <div className="text-xs font-bold text-slate-600 uppercase">Stable Commodities</div>
            <div className="mt-1 text-2xl font-black text-slate-700">{stable}</div>
          </div>
        </div>
      </div>

      {/* Recent Customer Orders Table */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-[#073B6F]">Recent Customer Orders</h2>
          <Link
            href="/dashboard/admin/orders"
            className="text-xs font-bold text-[#0B5FA5] hover:underline"
          >
            Manage All Orders →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#F7FAFC] text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Total (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Placed At</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-[#073B6F]">{ord.orderNumber}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{ord.deliveryName}</td>
                  <td className="px-4 py-3 text-slate-600">{ord.deliveryPhone}</td>
                  <td className="px-4 py-3 font-black text-slate-900">₹{Number(ord.total).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-[#0B5FA5]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/admin/orders/${ord.id}`}
                      className="text-xs font-bold text-[#0B5FA5] hover:underline"
                    >
                      Manage Order →
                    </Link>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No customer orders received yet.
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
