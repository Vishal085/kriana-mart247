'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF5FC] text-[#073B6F]">
          <ShoppingCart className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-black text-[#073B6F]">Please Log In to View Your Cart</h1>
        <p className="mt-2 text-xs text-slate-500">
          Sign in to your customer account to manage your shopping cart and place orders.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/login/customer"
            className="rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
          >
            Customer Login
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-[#073B6F]"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center text-xs text-slate-400">
        Loading your cart...
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EAF5FC] text-[#073B6F]">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="mt-4 text-2xl font-black text-[#073B6F]">Your Cart is Empty</h1>
        <p className="mt-2 text-xs text-slate-500">
          Looks like you haven&apos;t added any kirana items to your cart yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-8 py-3 text-xs font-bold text-white shadow hover:bg-[#0B5FA5]"
        >
          Explore Kirana Shop <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Your Shopping Cart</h1>
          <p className="mt-1 text-xs text-slate-500">
            Review your selected kirana items and proceed to secure checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Cart Items List */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F7FAFC] p-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B5FA5]">
                    {item.product.brand}
                  </span>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="block font-bold text-[#073B6F] hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <div className="mt-1 text-xs text-slate-500">
                    ₹{item.unitPrice.toFixed(2)} / {item.product.unit}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Quantity Buttons */}
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 hover:bg-white"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-slate-900">
                    ₹{item.subtotal.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                  title="Remove Item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">Order Summary</h2>

            <div className="mt-5 space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({cart.totalItems} items)</span>
                <span className="font-bold text-slate-800">₹{cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST Tax (5%)</span>
                <span className="font-bold text-slate-800">₹{cart.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-slate-800">
                  {cart.deliveryCharge === 0 ? (
                    <span className="text-emerald-600">FREE (Orders &gt; ₹1000)</span>
                  ) : (
                    `₹${cart.deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between text-base font-black text-[#073B6F]">
                <span>Total Amount</span>
                <span className="text-xl">₹{cart.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#073B6F] py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5FA5]"
            >
              Proceed to Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
              <ShieldCheck className="h-4 w-4 text-[#72B82A]" /> Guaranteed Quality & Mandi Prices
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
