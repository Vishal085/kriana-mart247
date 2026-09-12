import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ChevronRight, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin, CreditCard, AlertCircle, ExternalLink } from 'lucide-react';
import { CustomerOrderPaymentAction } from '@/components/CustomerOrderPaymentAction';
import { WhatsAppTemplateBuilder } from '@/lib/whatsapp/templates';
import { WhatsAppService } from '@/services/whatsapp.service';

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

  const receiptBuild = WhatsAppTemplateBuilder.buildOrderReceipt({
    orderNumber: order.orderNumber,
    customerName: order.deliveryName || user.fullName || 'Valued Customer',
    customerPhone: order.deliveryPhone || user.mobile || undefined,
    orderDate: order.createdAt,
    items: order.items.map((i) => ({
      name: i.productNameSnapshot,
      quantity: i.quantity,
      unit: i.unit,
      unitPrice: Number(i.unitPrice),
      subtotal: Number(i.subtotal),
    })),
    subtotal: Number(order.subtotal),
    deliveryCharge: Number(order.deliveryCharge),
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    address: order.deliveryAddress,
    city: order.city,
    pincode: order.pincode,
    orderId: order.id,
  });

  const whatsappDirectUrl = WhatsAppService.getDirectWhatsAppUrl(
    order.deliveryPhone || user.mobile,
    receiptBuild.fallbackText
  );

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

        <div className="flex flex-wrap items-center gap-2">
          {whatsappDirectUrl && (
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-1 text-xs font-bold shadow-xs transition hover:shadow-sm"
              title="Open itemized invoice receipt on WhatsApp"
            >
              <span>📲 WhatsApp Receipt</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          <span
            className={`rounded-full px-3.5 py-1 text-xs font-bold ${
              order.paymentStatus === 'PAID'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : order.paymentStatus === 'FAILED'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            Payment: {order.paymentStatus}
          </span>
          <span className="rounded-full bg-[#073B6F] px-4 py-1 text-xs font-bold text-white shadow-sm">
            Order: {order.status}
          </span>
        </div>
      </div>

      {/* Payment Action if Pending/Failed */}
      {order.paymentStatus !== 'PAID' && order.status !== 'CANCELLED' && (
        <CustomerOrderPaymentAction
          orderId={order.id}
          orderNumber={order.orderNumber}
          total={Number(order.total)}
          paymentStatus={order.paymentStatus}
        />
      )}


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

            {/* WhatsApp Receipt Card */}
            <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 text-xs text-emerald-900">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white font-bold text-lg shadow-xs">
                  📲
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-emerald-950">WhatsApp Order Receipt</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {order.whatsappLogs.length > 0 ? '✓ Auto-Dispatched' : '✓ Generated'}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-800 leading-relaxed">
                    Itemized tax invoice receipt for +91 <strong>{order.deliveryPhone || user.mobile}</strong>. Click below to view and share instantly.
                  </p>
                  {whatsappDirectUrl && (
                    <div className="mt-2.5">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:shadow"
                      >
                        <span>Open Receipt in WhatsApp</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Transaction Info */}
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-black text-[#073B6F]">Payment Information</h2>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Gateway:</span>
                <span className="font-bold text-[#073B6F]">Razorpay Secure</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Payment Status:</span>
                <span
                  className={`font-bold rounded-full px-2.5 py-0.5 text-[10px] ${
                    order.paymentStatus === 'PAID'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.paymentStatus === 'FAILED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentMethod && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Payment Method:</span>
                  <span className="font-semibold text-slate-800 uppercase">{order.paymentMethod}</span>
                </div>
              )}
              {order.razorpayPaymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Payment ID:</span>
                  <span className="font-mono text-[11px] text-slate-700 truncate max-w-[170px]">
                    {order.razorpayPaymentId}
                  </span>
                </div>
              )}
              {order.paidAt && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Paid At:</span>
                  <span className="text-slate-700">
                    {new Date(order.paidAt).toLocaleDateString()} {new Date(order.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
