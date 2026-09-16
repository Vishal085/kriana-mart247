import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SocialDataExtractionService } from '@/services/social/data-extraction.service';
import { SocialAssetGeneratorService } from '@/services/social/asset-generator.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    const mandiId = searchParams.get('mandiId') || undefined;

    let snapshot = null;

    if (jobId) {
      const job = await prisma.socialPublishJob.findUnique({
        where: { id: jobId },
        select: { selectedData: true },
      });
      if (job?.selectedData && (job.selectedData as any).snapshot) {
        snapshot = (job.selectedData as any).snapshot;
      }
    }

    if (!snapshot) {
      snapshot = await SocialDataExtractionService.getMarketSnapshot(mandiId);
    }

    const svgString = SocialAssetGeneratorService.renderSquareGraphicSvg(snapshot);

    return new Response(svgString, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to render image' }, { status: 500 });
  }
}
