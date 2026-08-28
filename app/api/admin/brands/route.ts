import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { BrandService } from '@/services/brands.service';
import { brandSchema } from '@/validators';

export async function GET() {
  try {
    await requireAdmin();
    const brands = await BrandService.getAll(false);
    return NextResponse.json({ brands });
  } catch (error: any) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = brandSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid brand data', details: parsed.error.format() }, { status: 400 });
    }

    const brand = await BrandService.create(parsed.data);
    return NextResponse.json({ message: 'Brand created', brand }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create brand' }, { status: 400 });
  }
}
