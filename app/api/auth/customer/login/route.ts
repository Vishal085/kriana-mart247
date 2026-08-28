import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { customerLoginSchema } from '@/validators';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = customerLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const user = await AuthService.loginCustomer(parsed.data);
    await setSessionCookie(user);

    return NextResponse.json(
      { message: 'Login successful', user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
