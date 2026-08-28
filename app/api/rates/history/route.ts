import { NextResponse } from 'next/server';
import { RateService } from '@/services/rates.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const mandiId = searchParams.get('mandiId') || undefined;
    const range = searchParams.get('range') || '30D';

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    const history = await RateService.getRateHistory(productId, mandiId, range);
    return NextResponse.json({ history });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch rate history' }, { status: 500 });
  }
}
