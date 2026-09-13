'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Truck,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { useCart, FREE_DELIVERY_THRESHOLD } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';

export function SlideOverCartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (!isDrawerOpen) return null;

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const bulkSavings = cart?.bulkSavings || 0;
  const deliveryCharge = cart?.deliveryCharge || 0;
  const grandTotal = cart?.grandTotal || 0;

  // Free delivery progress
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  // Dynamic WhatsApp Order Message Generator
  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    let msg = `*Namaste KiranaMart.com!* 🛒\n\nI want to place this wholesale order (${dateStr}):\n\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.quantity} × ${item.product.name}* (${item.product.unit}) — ₹${(item.unitPrice * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n-------------------------\n`;
    msg += `*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
    if (bulkSavings > 0) {
      msg += `*Bulk Wholesale Savings:* -₹${bulkSavings.toFixed(2)} 🔥\n`;
    }
    msg += `*Delivery Fee:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}\n`;
    msg += `*Grand Total:* ₹${grandTotal.toFixed(2)}\n`;
    msg += `-------------------------\n\nPlease confirm order availability and dispatch timing. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER || '918510083082';
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank');
    toast.success('Opening WhatsApp with your order summary!');
  };

  const handleCheckout = () => {
    closeDrawer();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#073B6F] font-heading">Wholesale Basket</h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'} • Fast APMC Sourcing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  toast.success('Cart has been emptied');
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline px-2 py-1"
                title="Clear all items from cart"
              >
                Empty Cart
              </button>
            )}
            <button
              onClick={closeDrawer}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        <div className="border-b border-slate-100 bg-[#F8FAFC] px-5 py-3">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1 text-slate-700">
              <Truck className="h-3.5 w-3.5 text-[#0B5FA5]" />
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-bold">🎉 FREE Mandi Delivery Unlocked!</span>
              ) : (
                <span>
                  Add <strong className="text-[#073B6F]">₹{remainingForFreeDelivery.toFixed(0)}</strong> more for FREE Delivery
                </span>
              )}
            </span>
            <span className="text-[11px] text-slate-500 font-bold">{freeDeliveryProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                remainingForFreeDelivery === 0 ? 'bg-emerald-500' : 'bg-[#39A9E8]'
              }`}
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EAF5FC] text-[#0B5FA5] mb-4">
                <ShoppingBag className="h-10 w-10 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-slate-800 font-heading">Your cart is empty</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Browse our 30+ daily wholesale kirana categories and mandi rates to start shopping.
              </p>
              <button
                onClick={() => {
                  closeDrawer();
                  router.push('/shop');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0B5FA5] transition"
              >
                Explore Wholesale Catalog <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs hover:border-[#39A9E8]/50 transition"
              >
                {/* Product Thumbnail */}
                <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-50 p-1 flex items-center justify-center overflow-hidden border border-slate-100">
                  <img
                    src={item.product.image || '/products/placeholder.svg'}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      if (!t.src.endsWith('/products/placeholder.svg')) {
                        t.src = '/products/placeholder.svg';
                      }
                    }}
                  />
                </div>


                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeDrawer}
                    className="text-xs font-bold text-[#073B6F] hover:underline line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.product.brand} • {item.product.unit}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-900">
                        ₹{(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">
                        (₹{item.unitPrice.toFixed(2)}/unit)
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center rounded-lg border border-slate-200 bg-[#F8FAFC]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-l-lg transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-600 hover:text-[#0B5FA5] hover:bg-slate-100 rounded-r-lg transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trash */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 transition shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Summary & CTAs */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 bg-[#F8FAFC] p-5 space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart?.totalItems} items)</span>
                <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
              </div>

              {bulkSavings > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Wholesale Tier Savings
                  </span>
                  <span>-₹{bulkSavings.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span className="font-semibold text-slate-800">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-[#073B6F]">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#073B6F] hover:bg-[#0B5FA5] py-3 text-xs font-bold text-white shadow-md transition active:scale-[0.99]"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-emerald-500 bg-emerald-50 hover:bg-emerald-100 py-2.5 text-xs font-bold text-emerald-800 transition"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                Order via WhatsApp (Instant Bill)
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>100% Genuine APMC Regulated Wholesale Quality</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
