import { NextResponse } from 'next/server';
import { getCurrentSessionUser } from '@/lib/auth';
import { WhatsAppService } from '@/services/whatsapp.service';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Must be order owner or admin
    if (order.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const result = await WhatsAppService.sendOrderReceipt(orderId);
    return NextResponse.json({
      message: 'WhatsApp receipt dispatched successfully',
      directUrl: result.directUrl,
      simulated: result.simulated,
      receiptText: result.receiptText,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch WhatsApp receipt' },
      { status: 500 }
    );
  }
}
