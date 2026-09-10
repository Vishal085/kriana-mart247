'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, Sparkles, Truck, ShieldCheck, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';

interface ProductDetailActionsProps {
  productId: string;
  productName: string;
  unit: string;
  retailPrice: number;
  mrp?: number | null;
  stockQuantity?: number;
  minimumQuantity?: number;
  maximumQuantity?: number | null;
  productUrl?: string;
}

export function ProductDetailActions({
  productId,
  productName,
  unit,
  retailPrice,
  mrp,
  stockQuantity = 100,
  minimumQuantity = 1,
  maximumQuantity,
  productUrl = '',
}: ProductDetailActionsProps) {
  const { cart, addItem, updateQuantity, removeItem, openDrawer } = useCart();
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);

  const isOutOfStock = stockQuantity <= 0;
  const cartItem = cart?.items.find((item) => item.productId === productId);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const hasDiscount = mrp !== null && mrp !== undefined && mrp > retailPrice;
  const discountPercent = hasDiscount ? Math.round(((mrp - retailPrice) / mrp) * 100) : 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.warning(`${productName} is currently out of stock.`);
      return;
    }

    setAdding(true);
    const res = await addItem(productId, minimumQuantity);
    setAdding(false);

    if (res.success) {
      toast.success(`${productName} added to your cart!`);
      openDrawer();
    } else if (res.error) {
      toast.error(res.error);
    }
  };

  const handleIncrease = async () => {
    if (!cartItem || updating) return;
    if (maximumQuantity && cartItem.quantity >= maximumQuantity) {
      toast.warning(`Maximum order limit is ${maximumQuantity} units for this product.`);
      return;
    }

    setUpdating(true);
    await updateQuantity(cartItem.id, cartItem.quantity + 1);
    setUpdating(false);
  };

  const handleDecrease = async () => {
    if (!cartItem || updating) return;
    setUpdating(true);
    if (cartItem.quantity <= (minimumQuantity || 1)) {
      await removeItem(cartItem.id);
      toast.info(`Removed ${productName} from cart.`);
    } else {
      await updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
    setUpdating(false);
  };

  const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER || '918510083082';
  const cleanNumber = supportNumber.replace(/[^\d]/g, '');
  const inquiryText = encodeURIComponent(
    `Hello KiranaMart! I am inquiring about *${productName}* (${unit}) priced at ₹${retailPrice.toFixed(2)}.`
  );
  const whatsappInquiryUrl = `https://wa.me/${cleanNumber}?text=${inquiryText}`;

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Price & Discount Headline */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Retail Store Price (Inclusive of all taxes)
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-[#073B6F]">
              ₹{retailPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-base font-semibold text-slate-400 line-through">
                  ₹{mrp.toFixed(2)}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-black text-emerald-700 border border-emerald-200">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">
            Unit Pack: <span className="font-bold text-slate-800">{unit}</span>
          </div>
        </div>

        {/* Stock Pill */}
        <div>
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-700 border border-rose-200">
              ⚠️ Out of Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 border border-emerald-200">
              <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" /> In Stock
            </span>
          )}
        </div>
      </div>

      {/* Delivery & Assurance Points */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-[11px] font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-[#0B5FA5] shrink-0" />
          <span>Same-Day / 2-Hour Kirana Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>100% Genuine Sealed Packaging</span>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {currentQuantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={adding || isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-sm font-black shadow-md transition active:scale-98 ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#073B6F] hover:bg-[#0B5FA5] text-white shadow-[#073B6F]/20'
            }`}
          >
            {adding ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-between rounded-2xl bg-[#073B6F] p-1.5 text-white shadow-md">
            <button
              onClick={handleDecrease}
              disabled={updating}
              className="flex h-10 w-12 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4 stroke-[3]" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-base font-black">{currentQuantity} in Cart</span>
              <span className="text-[10px] text-white/80 font-medium">
                Total: ₹{(retailPrice * currentQuantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleIncrease}
              disabled={updating}
              className="flex h-10 w-12 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* WhatsApp Inquiry Button */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 px-4 py-3 text-xs font-bold text-emerald-800 transition"
          title="Inquire about this product on WhatsApp"
        >
          <MessageSquare className="h-4 w-4 text-[#25D366]" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
