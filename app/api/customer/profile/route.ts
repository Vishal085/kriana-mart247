import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { profileUpdateSchema } from '@/validators';

export async function GET() {
  try {
    const user = await requireCustomer();
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        mobile: true,
        customerProfile: true,
      },
    });

    return NextResponse.json({ profile });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: {
          fullName: parsed.data.fullName,
          mobile: parsed.data.mobile,
        },
      });

      const customerProfile = await tx.customerProfile.upsert({
        where: { userId: user.id },
        update: {
          address: parsed.data.address,
          city: parsed.data.city,
          pinCode: parsed.data.pinCode,
        },
        create: {
          userId: user.id,
          address: parsed.data.address,
          city: parsed.data.city,
          pinCode: parsed.data.pinCode,
        },
      });

      return customerProfile;
    });

    return NextResponse.json({ message: 'Profile updated successfully', profile: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 400 });
  }
}
