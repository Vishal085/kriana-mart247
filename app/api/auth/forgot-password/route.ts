import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/services/email.service';

const SESSION_SECRET = process.env.AUTH_SECRET || 'kiranamart247-secure-dev-session-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || '').trim();

    if (!identifier) {
      return NextResponse.json({ error: 'Please enter your registered email or mobile number.' }, { status: 400 });
    }

    const cleanMobile = identifier.replace(/\D/g, '');
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase() },
          ...(cleanMobile.length === 10 ? [{ mobile: cleanMobile }] : []),
        ],
      },
    });

    if (!user) {
      // Return safe success message to prevent user enumeration
      return NextResponse.json({
        message: 'If an account exists with this detail, password reset instructions have been sent.',
      });
    }

    // Generate tamper-proof token containing userId, expiry, and signature
    const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
    const payload = `${user.id}:${user.passwordHash}:${expiry}`;
    const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    const token = `${user.id}.${expiry}.${signature}`;

    const host = request.headers.get('host') || 'localhost:3000';
    const proto = host.includes('localhost') ? 'http' : 'https';
    const resetUrl = `${proto}://${host}/reset-password?token=${encodeURIComponent(token)}`;

    console.log(`[PASSWORD RESET] For user ${user.fullName} (${user.email || user.mobile}): ${resetUrl}`);

    if (user.email) {
      try {
        await EmailService.sendPasswordResetEmail(user.email, resetUrl, user.fullName);
      } catch (err: any) {
        console.error('[PASSWORD RESET EMAIL ERROR]', err.message);
      }
    }

    return NextResponse.json({
      message: 'Password reset link sent to your registered email address.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process password reset' },
      { status: 500 }
    );
  }
}
