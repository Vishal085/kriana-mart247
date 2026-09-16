import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SocialDataExtractionService } from '@/services/social/data-extraction.service';
import { SocialAiContentGeneratorService, ContentLanguage } from '@/services/social/ai-content-generator.service';
import { SocialAssetGeneratorService } from '@/services/social/asset-generator.service';

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json().catch(() => ({}));
    const mandiId = body.mandiId || 'all';
    const language: ContentLanguage = body.language || 'hinglish';

    // 1. Extract genuine DB rates snapshot
    const snapshot = await SocialDataExtractionService.getMarketSnapshot(mandiId);

    if (snapshot.totalCommodities === 0) {
      return NextResponse.json(
        {
          error: 'No active mandi rates found in database. Please ensure mandi rates are recorded before generating content.',
        },
        { status: 400 }
      );
    }

    // 2. Generate multi-platform copy & fact-check
    const socialPackage = await SocialAiContentGeneratorService.generatePackage(snapshot, language);

    // 3. Generate high-res visual assets & vertical storyboard
    const assets = SocialAssetGeneratorService.generateAssets(snapshot);

    return NextResponse.json({
      success: true,
      data: {
        ...socialPackage,
        assets,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to generate social media content' },
      { status: 500 }
    );
  }
}
