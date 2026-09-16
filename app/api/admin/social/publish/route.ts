import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  PublishContentType,
  PublishJobStatus,
  PublishTargetType,
  SocialPlatform,
  SocialAccountStatus,
} from '@prisma/client';
import { SocialDataExtractionService } from '@/services/social/data-extraction.service';
import { SocialAiContentGeneratorService, ContentLanguage } from '@/services/social/ai-content-generator.service';
import { SocialAssetGeneratorService } from '@/services/social/asset-generator.service';
import { SocialDuplicateProtectionService } from '@/services/social/duplicate-protection.service';
import { SocialMetaPublishingService } from '@/services/social/meta-publishing.service';
import { SocialYouTubePublishingService } from '@/services/social/youtube-publishing.service';

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();

    const body = await request.json().catch(() => ({}));
    const mandiId = body.mandiId || 'all';
    const language: ContentLanguage = body.language || 'hinglish';
    const force = Boolean(body.force);
    const origin = new URL(request.url).origin;

    const targets = body.targets || {
      instagramPost: true,
      facebookPost: true,
      youtubeShort: true,
    };

    // 1. Extract genuine DB rates snapshot
    const snapshot = await SocialDataExtractionService.getMarketSnapshot(mandiId);
    if (snapshot.totalCommodities === 0) {
      return NextResponse.json(
        { error: 'No active mandi rates available to publish.' },
        { status: 400 }
      );
    }

    // Determine platforms targeted
    const selectedPlatforms: SocialPlatform[] = [];
    if (targets.instagramPost || targets.instagramReel) selectedPlatforms.push(SocialPlatform.INSTAGRAM);
    if (targets.facebookPost) selectedPlatforms.push(SocialPlatform.FACEBOOK);
    if (targets.youtubeVideo || targets.youtubeShort) selectedPlatforms.push(SocialPlatform.YOUTUBE);

    if (selectedPlatforms.length === 0) {
      return NextResponse.json(
        { error: 'At least one publishing target must be selected.' },
        { status: 400 }
      );
    }

    // 2. Duplicate Protection Check
    const todayStr = new Date().toISOString().slice(0, 10);
    const duplicateCheck = await SocialDuplicateProtectionService.checkDuplicate({
      dateStr: todayStr,
      mandiId,
      contentType: PublishContentType.DAILY_MANDI_UPDATE,
      platforms: selectedPlatforms,
      force,
    });

    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(
        {
          error: duplicateCheck.message,
          isDuplicate: true,
          previousJobId: duplicateCheck.previousJobId,
        },
        { status: 409 }
      );
    }

    // 3. Generate Social Package & Assets
    const generatedPkg = await SocialAiContentGeneratorService.generatePackage(snapshot, language);
    SocialAssetGeneratorService.generateAssets(snapshot);

    // 4. Create SocialPublishJob in DB
    const job = await prisma.socialPublishJob.create({
      data: {
        contentType: PublishContentType.DAILY_MANDI_UPDATE,
        status: PublishJobStatus.PUBLISHING,
        fingerprint: duplicateCheck.fingerprint,
        mandiId: mandiId !== 'all' ? mandiId : null,
        mandiName: snapshot.mandiName,
        language,
        selectedData: {
          snapshot,
          socialPackage: generatedPkg,
        },
        validationPassed: true,
        createdBy: admin.id,
      },
    });

    // Public Image render endpoint for Meta Graph API
    const publicImageUrl = `${origin}/api/admin/social/render/image?jobId=${job.id}`;

    const publishedItems: Array<{
      platform: SocialPlatform;
      targetType: PublishTargetType;
      success: boolean;
      externalPostId?: string;
      externalUrl?: string;
      error?: string;
    }> = [];

    // -------------------------------------------------------------
    // 5. Publish to Meta: FACEBOOK POST
    // -------------------------------------------------------------
    if (targets.facebookPost) {
      const fbCaption = body.customCopy?.facebookPostText || generatedPkg.facebookPost.text;
      const fbResult = await SocialMetaPublishingService.publishToFacebook({
        caption: fbCaption,
        mediaUrl: publicImageUrl,
      });

      const fbAccount = await prisma.socialAccount.findFirst({
        where: { platform: SocialPlatform.FACEBOOK, status: SocialAccountStatus.READY },
      });

      await prisma.socialPublishedItem.create({
        data: {
          jobId: job.id,
          accountId: fbAccount?.id || null,
          platform: SocialPlatform.FACEBOOK,
          targetType: PublishTargetType.FACEBOOK_POST,
          status: fbResult.success ? 'PUBLISHED' : 'FAILED',
          externalId: fbResult.postId || null,
          externalUrl: fbResult.postUrl || null,
          caption: fbCaption,
          errorMessage: fbResult.error || null,
          publishedAt: fbResult.success ? new Date() : null,
        },
      });

      publishedItems.push({
        platform: SocialPlatform.FACEBOOK,
        targetType: PublishTargetType.FACEBOOK_POST,
        success: fbResult.success,
        externalPostId: fbResult.postId,
        externalUrl: fbResult.postUrl,
        error: fbResult.error,
      });
    }

    // -------------------------------------------------------------
    // 6. Publish to Meta: INSTAGRAM POST
    // -------------------------------------------------------------
    if (targets.instagramPost) {
      const igCaption = body.customCopy?.instagramPostCaption || generatedPkg.instagramPost.caption;
      const igResult = await SocialMetaPublishingService.publishToInstagram({
        caption: igCaption,
        mediaUrl: publicImageUrl,
        isReel: false,
      });

      const igAccount = await prisma.socialAccount.findFirst({
        where: { platform: SocialPlatform.INSTAGRAM, status: SocialAccountStatus.READY },
      });

      await prisma.socialPublishedItem.create({
        data: {
          jobId: job.id,
          accountId: igAccount?.id || null,
          platform: SocialPlatform.INSTAGRAM,
          targetType: PublishTargetType.INSTAGRAM_POST,
          status: igResult.success ? 'PUBLISHED' : 'FAILED',
          externalId: igResult.postId || null,
          externalUrl: igResult.postUrl || null,
          caption: igCaption,
          errorMessage: igResult.error || null,
          publishedAt: igResult.success ? new Date() : null,
        },
      });

      publishedItems.push({
        platform: SocialPlatform.INSTAGRAM,
        targetType: PublishTargetType.INSTAGRAM_POST,
        success: igResult.success,
        externalPostId: igResult.postId,
        externalUrl: igResult.postUrl,
        error: igResult.error,
      });
    }

    // -------------------------------------------------------------
    // 7. Publish to Google: YOUTUBE SHORT / VIDEO
    // -------------------------------------------------------------
    if (targets.youtubeShort || targets.youtubeVideo) {
      const isShort = Boolean(targets.youtubeShort);
      const ytTitle = body.customCopy?.youtubeTitle || (isShort ? generatedPkg.youtubeShort.title : generatedPkg.youtubeVideo.title);
      const ytDesc = body.customCopy?.youtubeDescription || (isShort ? generatedPkg.youtubeShort.description : generatedPkg.youtubeVideo.description);

      const ytResult = await SocialYouTubePublishingService.uploadVideo({
        title: ytTitle,
        description: ytDesc,
        tags: isShort ? generatedPkg.youtubeShort.tags : generatedPkg.youtubeVideo.tags,
        videoBuffer: Buffer.from([]),
        isShort,
      });

      const ytAccount = await prisma.socialAccount.findFirst({
        where: { platform: SocialPlatform.YOUTUBE, status: SocialAccountStatus.READY },
      });

      await prisma.socialPublishedItem.create({
        data: {
          jobId: job.id,
          accountId: ytAccount?.id || null,
          platform: SocialPlatform.YOUTUBE,
          targetType: isShort ? PublishTargetType.YOUTUBE_SHORT : PublishTargetType.YOUTUBE_VIDEO,
          status: ytResult.success ? 'PUBLISHED' : 'FAILED',
          title: ytTitle,
          description: ytDesc,
          externalId: ytResult.videoId || null,
          externalUrl: ytResult.videoUrl || null,
          errorMessage: ytResult.error || null,
          publishedAt: ytResult.success ? new Date() : null,
        },
      });

      publishedItems.push({
        platform: SocialPlatform.YOUTUBE,
        targetType: isShort ? PublishTargetType.YOUTUBE_SHORT : PublishTargetType.YOUTUBE_VIDEO,
        success: ytResult.success,
        externalPostId: ytResult.videoId,
        externalUrl: ytResult.videoUrl,
        error: ytResult.error,
      });
    }

    // 8. Update SocialPublishJob overall status
    const totalSuccessful = publishedItems.filter((i) => i.success).length;
    let finalJobStatus: PublishJobStatus = PublishJobStatus.FAILED;

    if (totalSuccessful === publishedItems.length) {
      finalJobStatus = PublishJobStatus.PUBLISHED;
    } else if (totalSuccessful > 0) {
      finalJobStatus = PublishJobStatus.PARTIALLY_PUBLISHED;
    }

    await prisma.socialPublishJob.update({
      where: { id: job.id },
      data: {
        status: finalJobStatus,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: totalSuccessful > 0,
      jobId: job.id,
      status: finalJobStatus,
      publishedItems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Publishing job execution failed' },
      { status: 500 }
    );
  }
}
