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
  title: "KiranaMart.com | Today's Wholesale Rates & Mandi Intelligence",
  description:
    'Track Delhi wholesale mandi prices across APMC markets, compare commodity rates, and order grocery staples with bulk wholesale pricing.',
  icons: {
    icon: '/brand/logo.png',
    shortcut: '/brand/logo.png',
    apple: '/brand/logo.png',
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
