import { NextResponse } from 'next/server';
import { OtpService } from '@/services/otp.service';
import { otpSendSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = otpSendSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Validation failed';
      return NextResponse.json(
        { error: firstIssue, details: parsed.error.format() },
        { status: 400 }
      );
    }

    const result = await OtpService.initiateRegistration(parsed.data);

    return NextResponse.json(
      {
        message: 'Verification OTP sent to your Gmail and mobile number',
        ...result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send verification OTP' },
      { status: 400 }
    );
  }
}
