import { NextResponse } from 'next/server';
import { MandiService } from '@/services/mandis.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const mandi = await MandiService.getBySlug(slug);

    if (!mandi) {
      return NextResponse.json({ error: 'Mandi not found' }, { status: 404 });
    }

    return NextResponse.json({ mandi });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch mandi' }, { status: 500 });
  }
}
