import { NextResponse } from 'next/server';
import { RateService } from '@/services/rates.service';
import { Direction } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mandiId = searchParams.get('mandiId') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;
    const brandId = searchParams.get('brandId') || undefined;
    const direction = (searchParams.get('direction') as Direction) || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = (searchParams.get('sortBy') as any) || 'updatedAt';
    const sortOrder = (searchParams.get('sortOrder') as any) || 'desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const data = await RateService.getTodayRates({
      mandiId,
      categoryId,
      brandId,
      direction,
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch rates' }, { status: 500 });
  }
}
