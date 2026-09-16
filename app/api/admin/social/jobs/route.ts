import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const status = searchParams.get('status');

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const jobs = await prisma.socialPublishJob.findMany({
      where,
      include: {
        publishedItems: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            platform: true,
            targetType: true,
            status: true,
            externalId: true,
            externalUrl: true,
            errorMessage: true,
            publishedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const formattedJobs = jobs.map((j: any) => ({
      ...j,
      title: j.mandiName ? `Wholesale Update — ${j.mandiName}` : "Today's Wholesale Mandi Rates",
      items: j.publishedItems.map((item: any) => ({
        ...item,
        externalPostId: item.externalId,
      })),
    }));

    return NextResponse.json({
      success: true,
      jobs: formattedJobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch publishing history' },
      { status: 500 }
    );
  }
}
