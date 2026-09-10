import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = body.identifier || body.email || body.mobile;
    const { password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Mobile/Email and password are required' },
        { status: 400 }
      );
    }

    const user = await AuthService.loginShopkeeper({ identifier, password });
    await setSessionCookie({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
    });

    return NextResponse.json(
      { message: 'Shopkeeper login successful', user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
