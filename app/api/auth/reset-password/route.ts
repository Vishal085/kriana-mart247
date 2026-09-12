import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { isStrongPassword } from '@/validators';

const SESSION_SECRET = process.env.AUTH_SECRET || 'kiranamart247-secure-dev-session-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password, confirmPassword } = body;

    if (!token) {
      return NextResponse.json({ error: 'Missing or invalid password reset token.' }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: 'Password is too weak. Please avoid common passwords or simple sequences.' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords don't match." }, { status: 400 });
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return NextResponse.json({ error: 'Malformed reset token.' }, { status: 400 });
    }

    const [userId, expiryStr, receivedSignature] = parts;
    const expiry = parseInt(expiryStr, 10);

    if (isNaN(expiry) || Date.now() > expiry) {
      return NextResponse.json({ error: 'This password reset link has expired. Please request a new one.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Verify HMAC using the user's CURRENT passwordHash.
    // If the password was already reset, this signature will automatically fail!
    const payload = `${user.id}:${user.passwordHash}:${expiryStr}`;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    if (receivedSignature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid or already-used password reset link. Please request a fresh reset link.' },
        { status: 400 }
      );
    }

    // Hash the new password and update user
    const newPasswordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({
      message: 'Password has been reset successfully! You can now log in with your new password.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to reset password' },
      { status: 500 }
    );
  }
}
