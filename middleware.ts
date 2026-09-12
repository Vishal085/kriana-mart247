import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface SessionPayload {
  id: string;
  fullName: string;
  role: string;
  active: boolean;
  exp?: number;
}

function parseSessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadBase64] = parts;
    let jsonStr: string;
    if (typeof atob === 'function') {
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const binStr = atob(base64);
      jsonStr = decodeURIComponent(
        Array.prototype.map.call(binStr, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
    } else {
      jsonStr = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    }
    const parsed = JSON.parse(jsonStr) as SessionPayload;
    if (parsed.exp && Math.floor(Date.now() / 1000) > parsed.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('km247_session')?.value;
  const session = sessionCookie ? parseSessionToken(sessionCookie) : null;

  // 1. Protect Admin Dashboard Routes
  if (pathname.startsWith('/dashboard/admin')) {
    if (!session || session.role !== 'ADMIN' || !session.active) {
      const redirectUrl = new URL('/login/admin', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 2. Protect Seller / Shopkeeper Dashboard Routes
  if (pathname.startsWith('/dashboard/seller')) {
    if (!session || (session.role !== 'SHOPKEEPER' && session.role !== 'ADMIN') || !session.active) {
      const redirectUrl = new URL('/login/seller', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Protect Customer Dashboard Routes
  if (pathname.startsWith('/dashboard/customer')) {
    if (!session || !session.active) {
      const redirectUrl = new URL('/login/customer', request.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 4. Protect Checkout Route
  if (pathname === '/checkout' || pathname.startsWith('/checkout/')) {
    if (!session || !session.active) {
      const redirectUrl = new URL('/login/customer', request.url);
      redirectUrl.searchParams.set('redirect', '/checkout');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/admin/:path*',
    '/dashboard/seller/:path*',
    '/dashboard/customer/:path*',
    '/checkout',
    '/checkout/:path*',
  ],
};
