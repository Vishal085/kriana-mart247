import { NextResponse } from 'next/server';
import { RateService } from '@/services/rates.service';

export async function GET() {
  try {
    const categories = await RateService.getMandiCategories();
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch mandi categories' },
      { status: 500 }
    );
  }
}
