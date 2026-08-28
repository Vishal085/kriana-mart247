import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { customerRegisterSchema } from '@/validators';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = customerRegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const user = await AuthService.registerCustomer(parsed.data);
    await setSessionCookie(user);

    return NextResponse.json(
      { message: 'Registration successful', user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}
