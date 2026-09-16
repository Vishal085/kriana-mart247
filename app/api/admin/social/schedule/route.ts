import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await requireAdmin();

    const schedules = await prisma.socialScheduleConfig.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      schedules,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const { id, publishTime, frequency, platforms, targetTypes, mandiId, language, enabled } = body;

    const validPlatforms: string[] = platforms || ['INSTAGRAM', 'FACEBOOK', 'YOUTUBE'];
    const validTargets: string[] = targetTypes || ['FEED_POST', 'YOUTUBE_SHORT'];

    if (id) {
      const updated = await prisma.socialScheduleConfig.update({
        where: { id },
        data: {
          publishTime: publishTime || undefined,
          frequency: frequency || undefined,
          platforms: validPlatforms,
          targetTypes: validTargets,
          mandiId: mandiId !== undefined ? (mandiId === 'all' ? null : mandiId) : undefined,
          language: language || undefined,
          enabled: enabled !== undefined ? Boolean(enabled) : undefined,
        },
      });
      return NextResponse.json({ success: true, schedule: updated });
    }

    const created = await prisma.socialScheduleConfig.create({
      data: {
        frequency: frequency || 'DAILY',
        publishTime: publishTime || '08:30',
        platforms: validPlatforms,
        targetTypes: validTargets,
        mandiId: mandiId && mandiId !== 'all' ? mandiId : null,
        language: language || 'hinglish',
        enabled: enabled !== undefined ? Boolean(enabled) : true,
      },
    });

    return NextResponse.json({ success: true, schedule: created });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to save schedule configuration' },
      { status: 500 }
    );
  }
}
