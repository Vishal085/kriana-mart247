import { cookies } from 'next/headers';
import { createHmac } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

const SESSION_SECRET = process.env.AUTH_SECRET || 'kiranamart247-secure-dev-session-key';

export type SessionUser = {
  id: string;
  fullName: string;
  email?: string | null;
  mobile?: string | null;
  role: Role;
  active: boolean;
};

export function signPayload(value: string) {
  return createHmac('sha256', SESSION_SECRET).update(value).digest('base64url');
}

export function createSessionToken(payload: SessionUser) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${signPayload(encoded)}`;
}

export function verifySessionToken(token: string) {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = signPayload(payload);
  if (signature !== expected) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as SessionUser;
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

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      mobile: true,
      role: true,
      active: true,
    },
  });

  if (!user || !user.active) return null;
  return user;
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
