import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { RateImportService } from '@/services/rate-import.service';
import { bulkRateImportSchema } from '@/validators';

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const body = await request.json();
    const parsed = bulkRateImportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid bulk import payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const results = await RateImportService.importBulkRates(parsed.data, admin.fullName);
    return NextResponse.json({ message: 'Bulk rates imported', results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Bulk import failed' }, { status: 400 });
  }
}
