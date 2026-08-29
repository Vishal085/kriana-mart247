'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER || '918510083082';
  const cleanNumber = supportNumber.replace(/[^\d]/g, '');

  const defaultGreeting = encodeURIComponent(
    'Hello KiranaMart! I have a question regarding products, wholesale mandi rates, or my order.'
  );

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultGreeting}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="mb-2 max-w-xs rounded-2xl border border-emerald-200 bg-white p-3.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-ping" />
              <p className="text-xs font-black text-[#073B6F]">KiranaMart WhatsApp Help</p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="rounded p-0.5 text-slate-400 hover:text-slate-600"
              aria-label="Close tooltip"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
            Need help with your grocery order or daily mandi rates? Chat with our support team directly.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-1.5 px-3 text-[11px] font-bold text-white shadow-xs hover:bg-[#1EBE5B] transition"
          >
            <span>Start Chat</span>
          </a>
        </div>
      )}

      {/* Circular Floating Trigger Button matching left bot button style */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with KiranaMart"
        title="WhatsApp Support - KiranaMart"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#1EBE5B] focus:outline-none active:scale-95"
      >
        <div className="relative flex items-center justify-center">
          <svg
            className="h-6 w-6 fill-white transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#25D366] bg-white" />
          </span>
        </div>
      </a>
    </div>
  );
}
