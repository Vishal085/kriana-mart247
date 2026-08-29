import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { AiRateUpdaterService } from '@/services/ai-rate-updater.service';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await requireAdmin();

    const [adminUser, latestRate, totalRates] = await Promise.all([
      prisma.user.findFirst({
        where: { role: 'ADMIN', active: true },
        select: { mobile: true, email: true, fullName: true },
      }),
      prisma.mandiRate.findFirst({
        where: { active: true },
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true, updatedBy: true },
      }),
      prisma.mandiRate.count({ where: { active: true } }),
    ]);

    return NextResponse.json({
      scheduledTime: '10:30 AM IST (Daily)',
      adminPhone: adminUser?.mobile || '9999999999',
      adminEmail: adminUser?.email || 'admin@kiranamart247.com',
      lastUpdated: latestRate?.updatedAt || null,
      lastUpdatedBy: latestRate?.updatedBy || 'System',
      totalActiveRates: totalRates,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    const result = await AiRateUpdaterService.runAiRateUpdate(`AI Auto-Updater (Admin ${admin.fullName})`);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to execute AI rate update' },
      { status: 400 }
    );
  }
}
