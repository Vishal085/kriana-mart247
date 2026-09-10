import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, mobile, email, password, shopName, shopAddress, city, state, pinCode, gstNumber } = body;

    if (!fullName || !mobile || !password || !shopName || !shopAddress || !city) {
      return NextResponse.json(
        { error: 'Please provide all required fields: Full Name, Mobile, Password, Shop Name, Address, and City' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

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
