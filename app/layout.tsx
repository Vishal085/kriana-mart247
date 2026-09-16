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
  metadataBase: new URL('https://www.kiranamart247.com'),
  title: {
    default: 'KiranaMart247 | Direct Mandi Wholesale & Retail Grocery Platform',
    template: '%s | KiranaMart247',
  },
  description:
    'Order groceries, FMCG staples, atta, pulses, and spices online with fast delivery. Track real-time APMC mandi wholesale rates across Delhi NCR & UP.',
  keywords: [
    'KiranaMart247',
    'KiranaMart',
    'online grocery store',
    'mandi rates today',
    'apmc mandi bhav',
    'wholesale grocery platform',
    'ghaziabad mandi',
    'delhi mandi rates',
  ],
  authors: [{ name: 'KiranaMart247' }],
  creator: 'KiranaMart247',
  publisher: 'KiranaMart247',
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
    url: 'https://www.kiranamart247.com',
    siteName: 'KiranaMart247',
    title: 'KiranaMart247 | Direct Mandi Wholesale & Retail Grocery Platform',
    description:
      'Buy groceries, FMCG staples, and track live mandi wholesale rates. Fast home delivery and Cash on Delivery available.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'KiranaMart247 Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'KiranaMart247 | Direct Mandi Rates & Wholesale Grocery Platform',
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
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#39A9E8]/20 selection:text-[#073B6F] overflow-x-hidden">
        <ToastProvider>
          <AuthProvider>
            <MandiProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col justify-between print:min-h-0 print:block">
                  <div>
                    {/* Sticky Header with Navigation */}
                    <div className="print:hidden">
                      <SiteHeader />
                    </div>
                    {children}
                  </div>
                  <div className="print:hidden">
                    <SiteFooter />
                  </div>
                </div>
                {/* Global Slide-over Cart Drawer, AI Assistant, WhatsApp Floating */}
                <div className="print:hidden">
                  <SlideOverCartDrawer />
                  <MandiAiAssistant />
                  <WhatsAppFloatingButton />
                </div>
              </CartProvider>
            </MandiProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
