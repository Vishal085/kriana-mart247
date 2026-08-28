import { NextResponse } from 'next/server';
import { BrandService } from '@/services/brands.service';

export async function GET() {
  try {
    const brands = await BrandService.getAll(true);
    return NextResponse.json({ brands });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch brands' }, { status: 500 });
  }
}
