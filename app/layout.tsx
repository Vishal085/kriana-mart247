import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { MandiProvider } from '@/context/MandiContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SlideOverCartDrawer } from '@/components/cart/SlideOverCartDrawer';
import { MandiAiAssistant } from '@/components/MandiAiAssistant';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kiranamart.com'),
  title: {
    default: "KiranaMart | Online Kirana & Grocery Store • Daily Mandi Rates",
    template: "%s | KiranaMart",
  },
  description:
    'Order fresh milk, cooking oil, atta, pulses, spices, and ₹5/₹10 grocery packs online with fast same-day delivery. Track live Delhi APMC mandi wholesale rates.',
  keywords: [
    'KiranaMart',
    'online grocery store',
    'kirana delivery',
    'wholesale mandi rates',
    'atta',
    'mustard oil',
    'parle g',
    'amul milk',
    'sugar',
    'delhi mandi bhav',
  ],
  authors: [{ name: 'KiranaMart' }],
  creator: 'KiranaMart',
  publisher: 'KiranaMart',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kiranamart.com',
    siteName: 'KiranaMart',
    title: 'KiranaMart | Online Kirana & Grocery Store • Daily Mandi Rates',
    description:
      'Buy groceries, FMCG staples, and track live mandi wholesale rates. Fast home delivery and Cash on Delivery available.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'KiranaMart Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'KiranaMart | Online Kirana & Grocery Store',
    description:
      'Order groceries online with fast delivery. Track live wholesale mandi prices across APMC markets.',
    images: ['/icon.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#39A9E8]/20 selection:text-[#073B6F]">
        <ToastProvider>
          <AuthProvider>
            <MandiProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col justify-between">
                  <div>
                    {/* Sticky Header with Navigation */}
                    <SiteHeader />
                    {children}
                  </div>
                  <SiteFooter />
                </div>
                {/* Global Slide-over Cart Drawer */}
                <SlideOverCartDrawer />
                {/* Mandi AI Assistant */}
                <MandiAiAssistant />
                {/* Floating WhatsApp Support */}
                <WhatsAppFloatingButton />
              </CartProvider>
            </MandiProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
