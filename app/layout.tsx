import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { MandiProvider } from '@/context/MandiContext';
import { CartProvider } from '@/context/CartContext';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MandiAiAssistant } from '@/components/MandiAiAssistant';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

export const metadata: Metadata = {
  title: "KiranaMart247 | Today's Wholesale Rates",
  description:
    'Track wholesale mandi prices, compare market rates, and shop essential kirana products all in one place.',
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
    <html lang="en">
      <body className="min-h-screen bg-[#F7FAFC] text-slate-800 antialiased selection:bg-[#39A9E8]/20 selection:text-[#073B6F]">
        <AuthProvider>
          <MandiProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col justify-between">
                <div>
                  <SiteHeader />
                  {children}
                </div>
                <SiteFooter />
              </div>
              <MandiAiAssistant />
              <WhatsAppFloatingButton />
            </CartProvider>
          </MandiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
