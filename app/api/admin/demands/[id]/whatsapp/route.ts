import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { DemandService } from '@/services/demand.service';

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Non-blocking — if WhatsApp fails, demand status is NOT affected
    const result = await DemandService.sendReceiptWhatsApp(id, '');

    return NextResponse.json({
      message: 'WhatsApp receipt prepared.',
      waUrl: result.waUrl,
      phone: result.phone,
      receiptNumber: result.receiptNumber,
    });
  } catch (error: any) {
    if (error.message?.includes('Forbidden') || error.message?.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message?.includes('not found')) return NextResponse.json({ error: error.message }, { status: 404 });
    // Log failure but return 200 so client can handle gracefully
    return NextResponse.json(
      { error: error.message || 'WhatsApp send failed', waUrl: null },
      { status: 400 }
    );
  }
}
