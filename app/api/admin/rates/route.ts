import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { RateService } from '@/services/rates.service';
import { mandiRateSchema } from '@/validators';

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const mandiId = searchParams.get('mandiId') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;
    const brandId = searchParams.get('brandId') || undefined;
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const data = await RateService.getTodayRates({
      mandiId,
      categoryId,
      brandId,
      search,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const parsed = mandiRateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid rate data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const rate = await RateService.upsertRate(parsed.data, admin.fullName);
    return NextResponse.json({ message: 'Rate updated successfully', rate }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update rate' }, { status: 400 });
  }
}
