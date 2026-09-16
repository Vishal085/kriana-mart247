import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { PublishJobStatus, SocialPlatform } from '@prisma/client';
import { SocialMetaPublishingService } from '@/services/social/meta-publishing.service';
import { SocialYouTubePublishingService } from '@/services/social/youtube-publishing.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const job = await prisma.socialPublishJob.findUnique({
      where: { id },
      include: {
        publishedItems: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const failedItems = job.publishedItems.filter((i: any) => i.status === 'FAILED');
    if (failedItems.length === 0) {
      return NextResponse.json({ message: 'No failed targets to retry for this job.' });
    }

    const origin = new URL(request.url).origin;
    const publicImageUrl = `${origin}/api/admin/social/render/image?jobId=${job.id}`;
    const payload = (job.selectedData as any)?.socialPackage;

    const retryResults = [];

    for (const item of failedItems) {
      let success = false;
      let externalPostId: string | undefined;
      let externalUrl: string | undefined;
      let errorMsg: string | undefined;

      if (item.platform === SocialPlatform.FACEBOOK) {
        const res = await SocialMetaPublishingService.publishToFacebook({
          caption: payload?.facebookPost?.text || (job.mandiName ? `Mandi Update: ${job.mandiName}` : 'Mandi Rates Update'),
          mediaUrl: publicImageUrl,
        });
        success = res.success;
        externalPostId = res.postId;
        externalUrl = res.postUrl;
        errorMsg = res.error;
      } else if (item.platform === SocialPlatform.INSTAGRAM) {
        const res = await SocialMetaPublishingService.publishToInstagram({
          caption: payload?.instagramPost?.caption || (job.mandiName ? `Mandi Update: ${job.mandiName}` : 'Mandi Rates Update'),
          mediaUrl: publicImageUrl,
          isReel: item.targetType === 'REEL',
        });
        success = res.success;
        externalPostId = res.postId;
        externalUrl = res.postUrl;
        errorMsg = res.error;
      } else if (item.platform === SocialPlatform.YOUTUBE) {
        const res = await SocialYouTubePublishingService.uploadVideo({
          title: payload?.youtubeShort?.title || (job.mandiName ? `Mandi Update: ${job.mandiName}` : 'Mandi Rates Update'),
          description: payload?.youtubeShort?.description || '',
          tags: payload?.youtubeShort?.tags || [],
          videoBuffer: Buffer.from([]),
          isShort: item.targetType === 'YOUTUBE_SHORT',
        });
        success = res.success;
        externalPostId = res.videoId;
        externalUrl = res.videoUrl;
        errorMsg = res.error;
      }

      await prisma.socialPublishedItem.update({
        where: { id: item.id },
        data: {
          status: success ? 'PUBLISHED' : 'FAILED',
          externalId: externalPostId || null,
          externalUrl: externalUrl || null,
          errorMessage: errorMsg || null,
          publishedAt: success ? new Date() : null,
        },
      });

      retryResults.push({
        itemId: item.id,
        platform: item.platform,
        success,
        error: errorMsg,
      });
    }

    // Recompute overall job status
    const allItems = await prisma.socialPublishedItem.findMany({ where: { jobId: job.id } });
    const successCount = allItems.filter((i: any) => i.status === 'PUBLISHED').length;
    const newStatus =
      successCount === allItems.length
        ? PublishJobStatus.PUBLISHED
        : successCount > 0
        ? PublishJobStatus.PARTIALLY_PUBLISHED
        : PublishJobStatus.FAILED;

    await prisma.socialPublishJob.update({
      where: { id: job.id },
      data: { status: newStatus },
    });

    return NextResponse.json({
      success: true,
      newStatus,
      retriedItems: retryResults,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to retry publishing' },
      { status: 500 }
    );
  }
}
