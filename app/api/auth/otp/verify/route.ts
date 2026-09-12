import { NextResponse } from 'next/server';
import { OtpService } from '@/services/otp.service';
import { otpVerifySchema } from '@/validators';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = otpVerifySchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Validation failed';
      return NextResponse.json(
        { error: firstIssue, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const user = await OtpService.verifyAndRegister(
      parsed.data.verificationId,
      parsed.data.otp
    );

    // Set secure authentication session cookie
    await setSessionCookie(user);

    return NextResponse.json(
      {
        message: 'Registration and verification successful! Welcome to KiranaMart247.',
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'OTP verification failed' },
      { status: 400 }
    );
  }
}
