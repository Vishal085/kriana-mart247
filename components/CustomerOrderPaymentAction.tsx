'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { openRazorpayCheckout } from '@/lib/razorpay-client';

interface Props {
  orderId: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
}

export function CustomerOrderPaymentAction({ orderId, orderNumber, total, paymentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (paymentStatus === 'PAID') {
    return null;
  }

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch / Create Razorpay Order
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment gateway');
      }

      const pOrder = data.paymentOrder;

      // 2. Open Razorpay Modal
      await openRazorpayCheckout({
        key: pOrder.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_51KIRANAMART24',
        amount: pOrder.amount,
        currency: pOrder.currency || 'INR',
        name: 'KiranaMart247',
        description: `Order #${pOrder.orderNumber}`,
        image: '/icon.png',
        order_id: pOrder.razorpayOrderId,
        prefill: {
          name: pOrder.customerName,
          contact: pOrder.customerPhone,
          email: pOrder.customerEmail || '',
        },
        theme: {
          color: '#073B6F',
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            router.refresh();
          } catch (err: any) {
            setError(err.message || 'Verification failed');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment was not completed. You can try again whenever you are ready.');
          },
        },
      });
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed');
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-bold text-amber-900 flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span>Payment Pending for this Order</span>
          </div>
          <p className="mt-0.5 text-[11px] text-amber-700">
            Amount Due: <span className="font-bold">₹{total.toFixed(2)}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handlePayNow}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#0B5FA5] transition active:scale-98 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-3.5 w-3.5" />
              <span>Pay Now ₹{total.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-2 text-[11px] font-semibold text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
