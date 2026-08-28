import { NextResponse } from 'next/server';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await requireCustomer();
    const items = await prisma.mandiWatchlistItem.findMany({
      where: { userId: user.id },
      include: {
        mandi: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireCustomer();
    const body = await request.json();
    const { mandiId } = body;

    if (!mandiId) {
      return NextResponse.json({ error: 'mandiId is required' }, { status: 400 });
    }

    const item = await prisma.mandiWatchlistItem.upsert({
      where: {
        userId_mandiId: {
          userId: user.id,
          mandiId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        mandiId,
      },
      include: { mandi: true },
    });

    return NextResponse.json({ message: 'Added to mandi watchlist', item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add to watchlist' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireCustomer();
    const { searchParams } = new URL(request.url);
    const mandiId = searchParams.get('mandiId');

    if (!mandiId) {
      return NextResponse.json({ error: 'mandiId is required' }, { status: 400 });
    }

    await prisma.mandiWatchlistItem.deleteMany({
      where: { userId: user.id, mandiId },
    });

    return NextResponse.json({ message: 'Removed from mandi watchlist' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to remove from watchlist' }, { status: 400 });
  }
}
