import React from 'react';
import Link from 'next/link';
import { BrandMark } from './brand-mark';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export function SiteFooter() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/919999999999';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';

  return (
    <footer className="border-t border-slate-200 bg-white pt-14 pb-8 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <BrandMark size="lg" />
            <p className="text-xs leading-relaxed text-slate-500">
              KiranaMart247 is India&apos;s leading platform providing daily Kirana Mandi wholesale rate intelligence, market trends, and reliable online grocery ordering.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FC] text-[#073B6F] transition hover:bg-[#72B82A] hover:text-white"
                title="WhatsApp"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FC] text-[#073B6F] transition hover:bg-[#39A9E8] hover:text-white"
                title="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FC] text-[#073B6F] transition hover:bg-red-600 hover:text-white"
                title="YouTube"
              >
                <span className="text-xs font-bold">YT</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5FC] text-[#073B6F] transition hover:bg-[#0B5FA5] hover:text-white"
                title="Facebook"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
            </div>
          </div>

          {/* Col 2: Mandi Rates & Directory */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#073B6F]">
              Mandi Intelligence
            </h4>
            <ul className="mt-4 space-y-2 text-xs font-medium">
              <li>
                <Link href="/mandi-rates" className="hover:text-[#0B5FA5]">
                  Today&apos;s Mandi Rates
                </Link>
              </li>
              <li>
                <Link href="/mandis" className="hover:text-[#0B5FA5]">
                  Wholesale Mandi Directory
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#0B5FA5]">
                  Kirana Store Products
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customer/alerts" className="hover:text-[#0B5FA5]">
                  Price Alert Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer & Portals */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#073B6F]">
              Customer & Portals
            </h4>
            <ul className="mt-4 space-y-2 text-xs font-medium">
              <li>
                <Link href="/login/customer" className="hover:text-[#0B5FA5]">
                  Customer Login
                </Link>
              </li>
              <li>
                <Link href="/register/customer" className="hover:text-[#0B5FA5]">
                  Create Customer Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customer/orders" className="hover:text-[#0B5FA5]">
                  Track My Orders
                </Link>
              </li>
              <li>
                <Link href="/login/admin" className="text-slate-500 hover:text-[#073B6F]">
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#073B6F]">
              Policies & Legal
            </h4>
            <ul className="mt-4 space-y-2 text-xs font-medium">
              <li>
                <Link href="/about" className="hover:text-[#0B5FA5]">
                  About KiranaMart247
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0B5FA5]">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#0B5FA5]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0B5FA5]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#0B5FA5]">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#0B5FA5]">
                  Shipping & Delivery Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 border-t border-slate-100 pt-6 text-center text-[11px] text-slate-400">
          <p>
            Mandi rates displayed on KiranaMart247 are recorded from authorized market intelligence reports and mandi auction entries for informational reference.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} KiranaMart247. All rights reserved. Built with precision for Indian Kirana Mandis.
          </p>
        </div>
      </div>
    </footer>
  );
}
