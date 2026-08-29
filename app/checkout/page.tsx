'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, ArrowRight, User, Phone, MapPin, Building, Hash, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, refreshCart } = useCart();

  const [formData, setFormData] = useState({
    deliveryName: '',
    deliveryPhone: '',
    deliveryAddress: '',
    city: '',
    pincode: '',
    customerNotes: '',
    whatsappOptIn: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-populate from customer profile if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        deliveryName: user.fullName || '',
        deliveryPhone: user.mobile || '',
        deliveryAddress: user.customerProfile?.address || '',
        city: user.customerProfile?.city || '',
        pincode: user.customerProfile?.pinCode || '',
        whatsappOptIn: true,
      }));
    }
  }, [user]);

  if (!user) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-[#073B6F]">Please Log In to Checkout</h1>
        <p className="mt-2 text-xs text-slate-500">Sign in to complete your grocery order.</p>
        <Link
          href="/login/customer"
          className="mt-6 inline-block rounded-full bg-[#073B6F] px-8 py-3 text-xs font-bold text-white"
        >
          Customer Login
        </Link>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-[#073B6F]">Your Cart is Empty</h1>
        <p className="mt-2 text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[#073B6F] px-8 py-3 text-xs font-bold text-white"
        >
          Browse Shop
        </Link>
      </main>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submissions

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      await refreshCart();
      router.push(`/dashboard/customer/orders/${data.order.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <h1 className="text-3xl font-black text-[#073B6F]">Secure Checkout</h1>
      <p className="mt-1 text-xs text-slate-500">
        Verify your delivery address and confirm your kirana order.
      </p>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Delivery Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-black text-[#073B6F]">1. Delivery Information</h2>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">Recipient Name *</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.deliveryName}
                    onChange={(e) => setFormData({ ...formData, deliveryName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Mobile Number (10 Digits) *</label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    value={formData.deliveryPhone}
                    onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Complete Address *</label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Street / Locality / Landmark"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">City *</label>
                <div className="relative mt-1">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">PIN Code (6 digits) *</label>
                <div className="relative mt-1">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Delivery Instructions / Notes</label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  rows={2}
                  placeholder="Optional delivery instructions or landmark..."
                  value={formData.customerNotes}
                  onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>

            {/* WhatsApp Communication Opt-in Consent */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
              <input
                type="checkbox"
                id="whatsappOptIn"
                checked={formData.whatsappOptIn}
                onChange={(e) => setFormData({ ...formData, whatsappOptIn: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="whatsappOptIn" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <span className="font-bold text-[#073B6F]">Send order tracking & updates on WhatsApp</span>
                <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Receive instant order confirmation, packing, dispatch, and delivery tracking alerts directly on WhatsApp.
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Order Review & Submit */}
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">2. Order Review</h2>

            {/* Items List */}
            <div className="mt-4 divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2.5 text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{item.product.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {item.quantity} x ₹{item.unitPrice.toFixed(2)} / {item.product.unit}
                    </div>
                  </div>
                  <div className="font-bold text-slate-900">₹{item.subtotal.toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (5%)</span>
                <span className="font-bold text-slate-800">₹{cart.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-800">
                  {cart.deliveryCharge === 0 ? 'FREE' : `₹${cart.deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between text-base font-black text-[#073B6F]">
                <span>Total Payable</span>
                <span className="text-xl">₹{cart.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#073B6F] py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#0B5FA5] disabled:opacity-50"
            >
              {loading ? 'Processing Order...' : 'Confirm & Place Order'}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
              <ShieldCheck className="h-4 w-4 text-[#72B82A]" /> Transactional Prisma Database Guarantee
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
