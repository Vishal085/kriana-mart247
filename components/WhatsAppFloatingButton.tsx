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

      {/* Floating Action Button - Soft Green Squircle Outline Style */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with KiranaMart"
        title="Chat on WhatsApp"
        className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-lg active:scale-95"
      >
        <svg
          className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
}
