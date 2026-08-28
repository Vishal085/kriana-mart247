import { NextResponse } from 'next/server';
import { CategoryService } from '@/services/categories.service';

export async function GET() {
  try {
    const categories = await CategoryService.getAll(true);
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch categories' }, { status: 500 });
  }
}
