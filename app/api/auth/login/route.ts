import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { unifiedLoginSchema } from '@/validators';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = unifiedLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { user, redirectTo } = await AuthService.loginUnified(parsed.data);
    await setSessionCookie({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        user,
        redirectTo,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
