import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { adminLoginSchema } from '@/validators';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const user = await AuthService.loginAdmin(parsed.data);
    await setSessionCookie(user);

    return NextResponse.json(
      { message: 'Admin login successful', user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Admin login failed' },
      { status: 401 }
    );
  }
}
