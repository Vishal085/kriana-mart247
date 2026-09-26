import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const where = {
      role: Role.CUSTOMER,
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
              { mobile: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
          role: true,
          active: true,
          createdAt: true,
          customerProfile: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const fullName = (body.name || body.fullName || '').trim();
    const rawMobile = (body.contactNumber || body.mobile || '').toString().trim();
    const mobile = rawMobile.replace(/\D/g, '');
    const storeName = (body.storeName || body.shopName || '').trim();
    const email = body.email ? String(body.email).trim().toLowerCase() : null;
    const address = body.address ? String(body.address).trim() : null;
    const city = body.city ? String(body.city).trim() : 'Delhi';
    const pinCode = body.pinCode ? String(body.pinCode).replace(/\D/g, '').slice(0, 6) : '110006';

    // 1. Validation for the 3 required fields
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: 'Customer Name is required (minimum 2 characters)' },
        { status: 400 }
      );
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian contact number starting with 6, 7, 8, or 9' },
        { status: 400 }
      );
    }

    if (!storeName || storeName.length < 2) {
      return NextResponse.json(
        { error: 'Store Name is required (minimum 2 characters)' },
        { status: 400 }
      );
    }

    // 2. Check if mobile already exists
    const existingUser = await prisma.user.findFirst({
      where: { mobile },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: `A customer account with mobile number ${mobile} already exists (${existingUser.fullName})` },
        { status: 409 }
      );
    }

    // 3. Generate default password hash for customer login
    const bcrypt = await import('bcryptjs');
    const defaultPassword = `Kirana@${mobile.slice(-4)}`;
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    // 4. Create customer user with CustomerProfile
    const user = await prisma.user.create({
      data: {
        fullName,
        mobile,
        email: email || `${mobile}@customer.kiranamart.internal`,
        passwordHash,
        role: Role.CUSTOMER,
        active: true,
        whatsappOptIn: true,
        customerProfile: {
          create: {
            address: address ? `${storeName} - ${address}` : storeName,
            city,
            pinCode,
          },
        },
        cart: {
          create: {},
        },
      },
      select: {
        id: true,
        fullName: true,
        mobile: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        customerProfile: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Customer "${fullName}" (${storeName}) added successfully!`,
        user,
        defaultPasswordNote: `Default password for customer portal login is: ${defaultPassword}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding customer:', error);
    if (error?.message === 'Unauthorized' || error?.message?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 403 });
    }
    return NextResponse.json(
      { error: error?.message || 'Failed to add customer. Please check inputs and try again.' },
      { status: 500 }
    );
  }
}
