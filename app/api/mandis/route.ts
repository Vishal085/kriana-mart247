import { NextResponse } from 'next/server';
import { MandiService } from '@/services/mandis.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || undefined;
    const state = searchParams.get('state') || undefined;
    const search = searchParams.get('search') || undefined;

    const mandis = await MandiService.getAll(true, city, state, search);
    return NextResponse.json({ mandis });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch mandis' }, { status: 500 });
  }
}
