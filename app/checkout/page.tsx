'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Building,
  Hash,
  FileText,
  AlertCircle,
  CheckCircle2,
  Lock,
  RefreshCw,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { openRazorpayCheckout } from '@/lib/razorpay-client';

type CheckoutPaymentState =
  | 'idle'
  | 'creating_order'
  | 'awaiting_payment'
  | 'verifying'
  | 'success'
  | 'failed';

interface SuccessDetails {
  orderId: string;
  orderNumber: string;
  paymentId: string;
  paymentMethod?: string;
  amount: number;
  status: string;
  whatsappDirectUrl?: string | null;
  deliveryPhone?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { cart, refreshCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    deliveryName: '',
    deliveryPhone: '',
    deliveryAddress: '',
    city: '',
    pincode: '',
    customerNotes: '',
    whatsappOptIn: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
  const [paymentState, setPaymentState] = useState<CheckoutPaymentState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastPendingOrderId, setLastPendingOrderId] = useState<string | null>(null);
  const [successDetails, setSuccessDetails] = useState<SuccessDetails | null>(null);

  // Auto-populate from customer profile if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        deliveryName: user.fullName || '',
        deliveryPhone: user.mobile || '',
        deliveryAddress: (user as any).customerProfile?.address || '',
        city: (user as any).customerProfile?.city || '',
        pincode: (user as any).customerProfile?.pinCode || '',
        whatsappOptIn: true,
      }));
    }
  }, [user]);

  if (authLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
      </main>
    );
  }

  // Require customer login before checking out
  if (!user && paymentState !== 'success') {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#073B6F]">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-black text-[#073B6F]">Sign In to Complete Checkout</h1>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            Please log in or register a customer account to place your order. Your {cart?.items?.length || 0} cart item(s) are securely saved!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login/customer?redirect=/checkout"
              className="flex-1 rounded-xl bg-[#073B6F] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5FA5]"
            >
              Sign In to Account
            </Link>
            <Link
              href="/register/customer?redirect=/checkout"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              Register as Customer
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/shop" className="text-xs font-bold text-[#0B5FA5] hover:underline">
              ← Return to Kirana Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if ((!cart || cart.items.length === 0) && paymentState !== 'success') {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-[#073B6F]">Your Cart is Empty</h1>
        <p className="mt-2 text-xs text-slate-500">Please add essential kirana products before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-[#073B6F] px-8 py-3 text-xs font-bold text-white shadow hover:bg-[#0B5FA5]"
        >
          Explore Kirana Shop
        </Link>
      </main>
    );
  }

  // If payment succeeded, show rich payment confirmation view
  if (paymentState === 'success' && successDetails) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        {/* Completed Stepper */}
        <div className="mb-6 rounded-2xl bg-white border border-emerald-100 p-4 shadow-xs">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {['1. Cart', '2. Delivery', '3. Payment', '4. Confirmation'].map((step, idx, arr) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">{step}</span>
                </div>
                {idx < arr.length - 1 && <div className="h-0.5 flex-1 bg-emerald-500 -mt-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-10 shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
            {successDetails.paymentId === 'COD-PAY-ON-DELIVERY' ? 'Order Placed & Confirmed' : 'Verified Secure Transaction'}
          </span>

          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-[#073B6F]">
            {successDetails.paymentId === 'COD-PAY-ON-DELIVERY' ? 'Order Placed Successfully!' : 'Payment & Order Confirmed!'}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Thank you, {formData.deliveryName || user?.fullName || 'Customer'}! Your order has been placed and confirmed.
          </p>

          {/* Automatic WhatsApp Receipt Card */}
          <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5 text-left transition hover:shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-md text-xl">
                📲
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-950 uppercase tracking-wide">
                    <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                    WhatsApp Receipt Dispatched Automatically
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                    ✓ Instant Delivery
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-emerald-900 leading-relaxed">
                  A complete itemized Tax Invoice & Order Receipt has been sent automatically to your WhatsApp at{' '}
                  <strong className="font-black text-emerald-950">
                    +91 {successDetails.deliveryPhone || formData.deliveryPhone}
                  </strong>
                  .
                </p>
                {successDetails.whatsappDirectUrl && (
                  <div className="mt-3.5 pt-2.5 border-t border-emerald-200/80 flex flex-wrap items-center gap-3">
                    <a
                      href={successDetails.whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#1EBE5D] hover:shadow-lg"
                    >
                      <span>💬 Open Receipt in WhatsApp</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-[11px] text-emerald-800 italic">
                      Click to view full receipt, share, or save copy
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left text-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Order Number:</span>
              <span className="font-mono font-bold text-[#073B6F]">#{successDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Payment Mode:</span>
              <span className="font-semibold text-slate-800">
                {successDetails.paymentId === 'COD-PAY-ON-DELIVERY'
                  ? 'Cash / Pay on Delivery (Cash/UPI to Rider)'
                  : 'Online (Razorpay)'}
              </span>
            </div>
            {successDetails.paymentId !== 'COD-PAY-ON-DELIVERY' && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Payment ID (Razorpay):</span>
                <span className="font-mono font-bold text-slate-800 truncate max-w-[200px]">
                  {successDetails.paymentId}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">
                {successDetails.paymentId === 'COD-PAY-ON-DELIVERY' ? 'Payable on Delivery:' : 'Amount Paid:'}
              </span>
              <span className="text-base font-black text-[#073B6F]">
                ₹{successDetails.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Order Status:</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                {successDetails.status}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {successDetails.whatsappDirectUrl && (
              <a
                href={successDetails.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1EBE5D] transition"
              >
                <span>📲 View WhatsApp Receipt</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <Link
              href={`/dashboard/customer/orders/${successDetails.orderId}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#073B6F] px-6 py-3 text-xs font-bold text-white hover:bg-[#0B5FA5] transition"
            >
              Track Order & View Receipt
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
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

  const triggerRazorpayPayment = async (orderId: string, razorpayOrder: any) => {
    setPaymentState('awaiting_payment');

    try {
      await openRazorpayCheckout({
        key: razorpayOrder.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || 'INR',
        name: 'KiranaMart.com',
        description: `Order #${razorpayOrder.orderNumber}`,
        image: '/icon.png',
        order_id: razorpayOrder.razorpayOrderId,
        prefill: {
          name: razorpayOrder.customerName || formData.deliveryName,
          contact: razorpayOrder.customerPhone || formData.deliveryPhone,
          email: razorpayOrder.customerEmail || user?.email || '',
        },
        theme: {
          color: '#073B6F',
        },
        handler: async (response) => {
          setPaymentState('verifying');
          try {
            // Verify payment on server
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            let verifyData: any = {};
            try {
              const text = await verifyRes.text();
              verifyData = text ? JSON.parse(text) : {};
            } catch {
              verifyData = { error: 'Payment verification service error' };
            }

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment signature verification failed');
            }

            await refreshCart();
            setSuccessDetails({
              orderId: orderId,
              orderNumber: razorpayOrder.orderNumber,
              paymentId: response.razorpay_payment_id,
              paymentMethod: 'ONLINE (Razorpay)',
              amount: Number(verifyData.order?.total || cart.grandTotal),
              status: verifyData.order?.status || 'CONFIRMED',
              whatsappDirectUrl: verifyData.whatsappDirectUrl || null,
              deliveryPhone: formData.deliveryPhone,
            });
            setPaymentState('success');
          } catch (verifyErr: any) {
            setError(verifyErr.message || 'Payment verification failed on the server.');
            setPaymentState('failed');
          }
        },
        modal: {
          ondismiss: async () => {
            setPaymentState('failed');
            setError('Payment cancelled. Your order details are saved — click "Retry Payment" to complete your checkout.');
            try {
              await fetch('/api/payment/failure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId,
                  razorpayOrderId: razorpayOrder.razorpayOrderId,
                  errorDescription: 'User closed payment window before completion',
                }),
              });
            } catch {}
          },
        },
      });
    } catch (checkoutErr: any) {
      console.error('Checkout error:', checkoutErr);
      setError(checkoutErr.message || 'Unable to open Razorpay payment gateway.');
      setPaymentState('failed');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentState === 'creating_order' || paymentState === 'verifying') return;

    setError(null);

    const cleanPhone = formData.deliveryPhone.replace(/\D/g, '').trim();
    const cleanPin = formData.pincode.replace(/\D/g, '').trim();

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
      return;
    }

    if (!/^\d{6}$/.test(cleanPin)) {
      setError('PIN Code must be exactly 6 digits (e.g. 110006)');
      return;
    }

    // If retrying payment on an already created pending order
    if (lastPendingOrderId && paymentState === 'failed') {
      setPaymentState('creating_order');
      try {
        const retryRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: lastPendingOrderId }),
        });

        let retryData: any = {};
        try {
          const text = await retryRes.text();
          retryData = text ? JSON.parse(text) : {};
        } catch {
          retryData = { error: 'Payment service connection error' };
        }

        if (!retryRes.ok) throw new Error(retryData.error || 'Failed to reinitialize payment');

        await triggerRazorpayPayment(lastPendingOrderId, retryData.paymentOrder);
        return;
      } catch (err: any) {
        setError(err.message || 'Payment retry failed');
        setPaymentState('failed');
        return;
      }
    }

    setPaymentState('creating_order');

    const itemsPayload = cart?.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    })) || [];

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          deliveryPhone: cleanPhone,
          pincode: cleanPin,
          paymentMethod,
          items: itemsPayload,
        }),
      });

      let data: any = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: 'Order service connection error' };
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initiate order');
      }

      const createdOrder = data.order;
      setLastPendingOrderId(createdOrder.id);

      // If Cash on Delivery, instant order success!
      if (paymentMethod === 'COD') {
        await refreshCart();
        setSuccessDetails({
          orderId: createdOrder.id,
          orderNumber: createdOrder.orderNumber,
          paymentId: 'COD-PAY-ON-DELIVERY',
          paymentMethod: 'Cash / Pay on Delivery (Cash or UPI to Delivery Partner)',
          amount: Number(createdOrder.total),
          status: 'CONFIRMED',
          whatsappDirectUrl: createdOrder.whatsappDirectUrl || null,
          deliveryPhone: formData.deliveryPhone,
        });
        setPaymentState('success');
        return;
      }

      if (createdOrder.razorpayOrder) {
        await triggerRazorpayPayment(createdOrder.id, createdOrder.razorpayOrder);
      } else {
        // Fallback: fetch/create payment order directly
        const pRes = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: createdOrder.id }),
        });

        let pData: any = {};
        try {
          const pText = await pRes.text();
          pData = pText ? JSON.parse(pText) : {};
        } catch {
          pData = { error: 'Payment initialization error' };
        }

        if (!pRes.ok) throw new Error(pData.error || 'Failed to initialize payment gateway');
        await triggerRazorpayPayment(createdOrder.id, pData.paymentOrder);
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
      setPaymentState('failed');
    }
  };

  const isProcessing =
    paymentState === 'creating_order' ||
    paymentState === 'awaiting_payment' ||
    paymentState === 'verifying';

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Secure Checkout</h1>
          <p className="mt-1 text-xs text-slate-500">
            Verify your delivery address and pay securely via Razorpay.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#073B6F] border border-blue-200">
          <Lock className="h-3.5 w-3.5 text-[#39A9E8]" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* 4-Step Checkout Progress Stepper */}
      <div className="mt-8 mb-8 rounded-2xl bg-white border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Step 1: Cart */}
          <div className="flex flex-col items-center gap-1 flex-1 text-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">1. Cart</span>
          </div>
          <div className="h-0.5 flex-1 bg-emerald-500 -mt-4" />

          {/* Step 2: Delivery */}
          <div className="flex flex-col items-center gap-1 flex-1 text-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-xs ${
              paymentState === 'idle' || paymentState === 'failed'
                ? 'bg-[#073B6F] text-white ring-4 ring-[#EAF5FC]'
                : 'bg-emerald-600 text-white'
            }`}>
              {paymentState === 'idle' || paymentState === 'failed' ? '2' : <CheckCircle2 className="h-4 w-4" />}
            </div>
            <span className="text-[11px] font-bold text-[#073B6F]">2. Delivery</span>
          </div>
          <div className={`h-0.5 flex-1 -mt-4 ${
            paymentState !== 'idle' && paymentState !== 'failed' ? 'bg-emerald-500' : 'bg-slate-200'
          }`} />

          {/* Step 3: Payment */}
          <div className="flex flex-col items-center gap-1 flex-1 text-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-xs ${
              isProcessing
                ? 'bg-[#073B6F] text-white ring-4 ring-[#EAF5FC] animate-pulse'
                : paymentState === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              {paymentState === 'success' ? <CheckCircle2 className="h-4 w-4" /> : '3'}
            </div>
            <span className={`text-[11px] font-bold ${isProcessing ? 'text-[#073B6F]' : 'text-slate-400'}`}>
              3. Payment
            </span>
          </div>
          <div className={`h-0.5 flex-1 -mt-4 ${
            paymentState === 'success' ? 'bg-emerald-500' : 'bg-slate-200'
          }`} />

          {/* Step 4: Confirmation */}
          <div className="flex flex-col items-center gap-1 flex-1 text-center">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-xs ${
              paymentState === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              4
            </div>
            <span className={`text-[11px] font-bold ${paymentState === 'success' ? 'text-emerald-700' : 'text-slate-400'}`}>
              4. Confirmation
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{error}</span>
            {lastPendingOrderId && paymentState === 'failed' && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-red-700"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Retry Payment Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {paymentState === 'verifying' && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-xs font-bold text-[#073B6F]">
          <RefreshCw className="h-5 w-5 animate-spin text-[#0B5FA5]" />
          <span>Verifying payment with bank and Razorpay servers. Please do not refresh...</span>
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
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
                    disabled={isProcessing}
                    value={formData.deliveryName}
                    onChange={(e) => setFormData({ ...formData, deliveryName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
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
                    disabled={isProcessing}
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    value={formData.deliveryPhone}
                    onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
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
                  disabled={isProcessing}
                  placeholder="Street / Locality / Landmark"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
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
                    disabled={isProcessing}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
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
                    disabled={isProcessing}
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
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
                  disabled={isProcessing}
                  placeholder="Optional delivery instructions or landmark..."
                  value={formData.customerNotes}
                  onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white disabled:opacity-60"
                />
              </div>
            </div>

            {/* WhatsApp Communication Opt-in Consent */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
              <input
                type="checkbox"
                id="whatsappOptIn"
                disabled={isProcessing}
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

        {/* Order Review & Payment Submit */}
        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#073B6F]">2. Order & Payment Review</h2>

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
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-800">₹{cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST</span>
                <span className="font-bold text-emerald-700">Included in prices</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-800">
                  {cart.deliveryCharge === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `₹${cart.deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between text-base font-black text-[#073B6F]">
                <span>Total Payable</span>
                <span className="text-xl">₹{cart.grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-800">Select Payment Method *</div>

              {/* Option 1: Cash / Pay on Delivery */}
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-[#073B6F] bg-[#EAF5FC]/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-0.5 h-4 w-4 text-[#073B6F] accent-[#073B6F]"
                />
                <div>
                  <div className="text-xs font-bold text-[#073B6F] flex items-center gap-1.5">
                    <span>💵 Cash / Pay on Delivery (COD)</span>
                    <span className="rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2">
                      Popular
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Pay securely via Cash or UPI directly to our delivery executive when your groceries arrive.
                  </p>
                </div>
              </label>

              {/* Option 2: Online Payment via Razorpay */}
              <label
                onClick={() => setPaymentMethod('ONLINE')}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition ${
                  paymentMethod === 'ONLINE'
                    ? 'border-[#073B6F] bg-[#EAF5FC]/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={paymentMethod === 'ONLINE'}
                  onChange={() => setPaymentMethod('ONLINE')}
                  className="mt-0.5 h-4 w-4 text-[#073B6F] accent-[#073B6F]"
                />
                <div>
                  <div className="text-xs font-bold text-[#073B6F] flex items-center gap-1.5">
                    <span>💳 Online Payment (Razorpay)</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Pay now instantly with UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards & NetBanking.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#073B6F] py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#0B5FA5] disabled:opacity-50 active:scale-98"
            >
              {paymentState === 'creating_order' ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Placing Your Order...</span>
                </>
              ) : paymentState === 'awaiting_payment' ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Waiting for Payment...</span>
                </>
              ) : paymentState === 'verifying' ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying Payment...</span>
                </>
              ) : paymentMethod === 'COD' ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Order (Pay ₹{cart.grandTotal.toFixed(2)} on Delivery)</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay Securely ₹{cart.grandTotal.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-400">
              <ShieldCheck className="h-4 w-4 text-[#72B82A]" />
              <span>100% Genuine Sealed Grocery Packaging • Safe Delivery</span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
