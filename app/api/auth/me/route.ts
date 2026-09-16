import { NextResponse } from 'next/server';
import { getCurrentSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getCurrentSessionUser();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: session.id },
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

      if (user && user.active) {
        return NextResponse.json({ user });
      }
    } catch (dbError) {
      console.warn('Session user profile enrichment warning:', dbError);
    }

    return NextResponse.json({ user: session });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
