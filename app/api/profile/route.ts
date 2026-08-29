import { NextResponse } from 'next/server';
import { requireAuth, setSessionCookie } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const sessionUser = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        avatarUrl: true,
        role: true,
        active: true,
        createdAt: true,
        customerProfile: true,
        adminProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const sessionUser = await requireAuth();
    const body = await request.json();
    const {
      fullName,
      mobile,
      avatarUrl,
      address,
      city,
      pinCode,
      currentPassword,
      newPassword,
    } = body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    // Handle password update if requested
    let passwordHashUpdate: string | undefined = undefined;
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required to set a new password' },
          { status: 400 }
        );
      }
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }

      const existing = await prisma.user.findUnique({
        where: { id: sessionUser.id },
      });

      if (!existing) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const isMatch = await bcrypt.compare(currentPassword, existing.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
      }

      passwordHashUpdate = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      const u = await tx.user.update({
        where: { id: sessionUser.id },
        data: {
          fullName: fullName.trim(),
          mobile: mobile ? mobile.trim() : null,
          avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
          ...(passwordHashUpdate ? { passwordHash: passwordHashUpdate } : {}),
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          mobile: true,
          avatarUrl: true,
          role: true,
          active: true,
          customerProfile: true,
          adminProfile: true,
        },
      });

      if (sessionUser.role === 'CUSTOMER' && (address !== undefined || city !== undefined || pinCode !== undefined)) {
        await tx.customerProfile.upsert({
          where: { userId: sessionUser.id },
          update: {
            address: address ? address.trim() : null,
            city: city ? city.trim() : null,
            pinCode: pinCode ? pinCode.trim() : null,
          },
          create: {
            userId: sessionUser.id,
            address: address ? address.trim() : null,
            city: city ? city.trim() : null,
            pinCode: pinCode ? pinCode.trim() : null,
          },
        });
      }

      return u;
    });

    // Refresh session cookie with updated name/mobile/avatar
    await setSessionCookie({
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      avatarUrl: updatedUser.avatarUrl,
      role: updatedUser.role,
      active: updatedUser.active,
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 400 }
    );
  }
}
