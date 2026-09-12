import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { setSessionCookie } from '@/lib/auth';
import { sellerRegisterSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = sellerRegisterSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid registration details';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, mobile, email, password, shopName, shopAddress, city, state, pinCode, gstNumber } = parsed.data;

    const user = await AuthService.registerShopkeeper({
      fullName,
      mobile,
      email: email || undefined,
      password,
      shopName,
      shopAddress,
      city,
      state: state || 'Delhi',
      pinCode: pinCode || undefined,
      gstNumber: gstNumber || undefined,
    });

    await setSessionCookie({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      active: user.active,
    });

    return NextResponse.json(
      { message: 'Shopkeeper registration successful', user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}
