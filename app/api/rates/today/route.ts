import { NextResponse } from 'next/server';
import { RateService } from '@/services/rates.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mandiId = searchParams.get('mandiId') || undefined;

    const summary = await RateService.getMarketSummary(mandiId);
    return NextResponse.json(summary);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch summary' }, { status: 500 });
  }
}
