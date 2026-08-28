import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { MandiService } from '@/services/mandis.service';
import { mandiSchema } from '@/validators';

export async function GET() {
  try {
    await requireAdmin();
    const mandis = await MandiService.getAll(false);
    return NextResponse.json({ mandis });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = mandiSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid mandi data', details: parsed.error.format() }, { status: 400 });
    }

    const mandi = await MandiService.create(parsed.data);
    return NextResponse.json({ message: 'Mandi created', mandi }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create mandi' }, { status: 400 });
  }
}
