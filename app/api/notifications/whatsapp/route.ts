import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await requireAdmin();
    const logs = await prisma.whatsAppNotificationLog.findMany({
      take: 50,
      orderBy: { sentAt: 'desc' },
      include: {
        order: {
          select: {
            orderNumber: true,
            deliveryName: true,
            deliveryPhone: true,
            total: true,
          },
        },
      },
    });

    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
