import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { active } = body;

    if (typeof active !== 'boolean') {
      return NextResponse.json({ error: 'active boolean is required' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { active },
      select: {
        id: true,
        fullName: true,
        email: true,
        active: true,
      },
    });

    return NextResponse.json({ message: 'User status updated', user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 400 });
  }
}
