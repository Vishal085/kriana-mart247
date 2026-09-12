import { cookies } from 'next/headers';
import { createHmac } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

const SESSION_SECRET = process.env.AUTH_SECRET || (
  process.env.NODE_ENV === 'production'
    ? (() => { throw new Error('FATAL: AUTH_SECRET must be set in production!'); })()
    : 'kiranamart247-local-dev-session-key-32chars-min!'
);

export type SessionUser = {
  id: string;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  avatarUrl?: string | null;
  role: Role;
  active: boolean;
  iat?: number;
  exp?: number;
};

export function signPayload(value: string) {
  return createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');
}

export function createSessionToken(payload: SessionUser) {
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload: SessionUser = {
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7 days expiration
  };
  const encoded = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');
  return `${encoded}.${signPayload(encoded)}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;
  if (!payload || !signature) return null;
  
  const expected = signPayload(payload);
  if (signature !== expected) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as SessionUser;
    // Enforce token expiration
    if (decoded.exp && Math.floor(Date.now() / 1000) > decoded.exp) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function setSessionCookie(user: SessionUser) {
  const token = createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set('km247_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getCurrentSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('km247_session')?.value;
  if (!cookie) return null;

  const payload = verifySessionToken(cookie);
  if (!payload) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        avatarUrl: true,
        role: true,
        active: true,
      },
    });

    if (user && user.active) return user;
  } catch (err) {
    console.error('Session verification failed - DB lookup error:', err);
    return null;
  }

  return null;
}

export async function requireAuth() {
  const user = await getCurrentSessionUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireCustomer() {
  const user = await requireAuth();
  if (user.role !== Role.CUSTOMER) {
    throw new Error('Forbidden: Customer access required');
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== Role.ADMIN) {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
}

export async function requireShopkeeper() {
  const user = await requireAuth();
  if (user.role !== Role.SHOPKEEPER) {
    throw new Error('Forbidden: Shopkeeper access required');
  }
  return user;
}

export async function requireShopkeeperOrAdmin() {
  const user = await requireAuth();
  if (user.role !== Role.SHOPKEEPER && user.role !== Role.ADMIN) {
    throw new Error('Forbidden: Seller or Admin access required');
  }
  return user;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set('km247_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}
