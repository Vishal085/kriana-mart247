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
  ShieldCheck,
  Milk,
} from 'lucide-react';
import { AiRateUpdaterCard } from '@/components/admin/AiRateUpdaterCard';

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
    ordersPaid,
    recentOrders,
    pendingApprovalsCount,
    demandsNewCount,
    demandsProcessingCount,
    demandsTotalCount,
    recentDemands,
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
    prisma.order.count({ where: { paymentStatus: 'PAID' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { fullName: true, mobile: true } } },
    }),
    prisma.product.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.demand.count({ where: { status: 'NEW' } }),
    prisma.demand.count({ where: { status: 'PROCESSING' } }),
    prisma.demand.count(),
    prisma.demand.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        shopkeeper: { select: { fullName: true, mobile: true, shopName: true } },
        items: { include: { dairyProduct: true } },
      },
    }),
  ]);

  const rising = rateDirections.find((r: any) => r.direction === Direction.RISING)?._count.direction ?? 0;
  const falling = rateDirections.find((r: any) => r.direction === Direction.FALLING)?._count.direction ?? 0;
  const stable = rateDirections.find((r: any) => r.direction === Direction.STABLE)?._count.direction ?? 0;

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
                KiranaMart Admin Console
              </h1>
              <div className="text-xs text-slate-500">Logged in as {admin.fullName}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/admin/demands"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <Milk className="h-4 w-4" />
              Dairy Demands
              {demandsNewCount > 0 && (
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-blue-700">
                  {demandsNewCount} New
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/admin/approvals"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600 transition"
            >
              <ShieldCheck className="h-4 w-4" />
              Product Approvals
              {pendingApprovalsCount > 0 && (
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-amber-600">
                  {pendingApprovalsCount}
                </span>
              )}
            </Link>
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

      {/* AI Rate Auto-Updater & Daily 10:30 AM Schedule */}
      <div className="mt-6">
        <AiRateUpdaterCard />
      </div>

      {/* Admin Modules Navigation */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9 text-xs font-bold text-slate-700">
        <Link
          href="/dashboard/admin/demands"
          className="flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/70 p-3 hover:border-blue-400 hover:text-blue-900 transition relative"
        >
          <Milk className="h-4 w-4 text-blue-700" /> Demands
          {demandsNewCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
              {demandsNewCount}
            </span>
          )}
        </Link>
        <Link
          href="/dashboard/admin/approvals"
          className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-3 hover:border-amber-400 hover:text-amber-900 transition relative"
        >
          <ShieldCheck className="h-4 w-4 text-amber-600" /> Approvals
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white">
              {pendingApprovalsCount}
            </span>
          )}
        </Link>
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
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
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
          <div className="text-[11px] font-bold uppercase text-slate-400">Rates Tracked</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{ratesCount}</div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-emerald-800">Paid Orders</div>
          <div className="mt-1 text-2xl font-black text-emerald-600">{ordersPaid}</div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-amber-700">Pending Orders</div>
          <div className="mt-1 text-2xl font-black text-amber-600">{ordersPending}</div>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-[#073B6F]">Delivered Orders</div>
          <div className="mt-1 text-2xl font-black text-[#073B6F]">{ordersDelivered}</div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 shadow-sm">
          <div className="text-[11px] font-bold uppercase text-blue-800">Dairy Demands</div>
          <div className="mt-1 text-2xl font-black text-blue-900 flex items-baseline gap-1.5">
            {demandsTotalCount}
            {demandsNewCount > 0 && (
              <span className="text-xs font-bold text-amber-600">({demandsNewCount} new)</span>
            )}
          </div>
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

      {/* Recent Shopkeeper Dairy Demands Section (SEPARATE from Customer Orders) */}
      <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Milk className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-black text-[#073B6F]">Recent Shopkeeper Dairy Demands</h2>
          </div>
          <Link
            href="/dashboard/admin/demands"
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            Manage All Demands ({demandsNewCount} New) →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-4 py-3">Demand #</th>
                <th className="px-4 py-3">Shopkeeper</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Products Demanded</th>
                <th className="px-4 py-3">Est. Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentDemands.map((dem: any) => (
                <tr key={dem.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-[#073B6F]">
                    #{dem.demandNumber}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    {dem.shopkeeper?.shopkeeperProfile?.shopName || dem.shopkeeper?.shopName || dem.shopkeeper?.fullName || 'Shopkeeper'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{dem.shopkeeper?.mobile || 'N/A'}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {dem.items?.length || 0} items ({dem.items?.reduce((s: number, i: any) => s + Number(i.requestedQty || i.quantity || 0), 0) || 0} units)
                  </td>
                  <td className="px-4 py-3 font-black text-slate-900">
                    ₹{(
                      Number(dem.receipt?.grandTotal) ||
                      dem.items?.reduce((sum: number, it: any) => sum + (Number(it.requestedQty || 0) * Number(it.rate || it.dairyProduct?.defaultRate || 0)), 0) ||
                      0
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        dem.status === 'NEW'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : dem.status === 'PROCESSING'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : dem.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : dem.status === 'PARTIALLY_DELIVERED'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {dem.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(dem.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/admin/demands/${dem.id}`}
                      className="text-xs font-bold text-blue-700 hover:underline"
                    >
                      Manage Demand →
                    </Link>
                  </td>
                </tr>
              ))}
              {recentDemands.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No dairy demands submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Placed At</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-[#073B6F]">{ord.orderNumber}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{ord.deliveryName}</td>
                  <td className="px-4 py-3 text-slate-600">{ord.deliveryPhone}</td>
                  <td className="px-4 py-3 font-black text-slate-900">₹{Number(ord.total).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        ord.paymentStatus === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ord.paymentStatus === 'FAILED'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
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
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No customer orders placed yet.
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
