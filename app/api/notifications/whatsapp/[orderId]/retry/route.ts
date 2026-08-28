import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { WhatsAppService } from '@/services/whatsapp.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await requireAdmin();
    const { orderId } = await params;

    const result = await WhatsAppService.retryNotification(orderId);
    return NextResponse.json({ message: 'WhatsApp retry attempted', result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Retry failed' }, { status: 400 });
  }
}
