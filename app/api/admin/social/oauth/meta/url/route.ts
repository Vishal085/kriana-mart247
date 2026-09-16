import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SocialMetaPublishingService } from '@/services/social/meta-publishing.service';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    if (!SocialMetaPublishingService.isConfigured()) {
      return NextResponse.json(
        {
          error: 'Meta App credentials (META_APP_ID, META_APP_SECRET) are missing from environment.',
          code: 'CONFIGURATION_REQUIRED',
        },
        { status: 400 }
      );
    }

    const { origin, searchParams } = new URL(request.url);
    const platform = searchParams.get('platform') as 'FACEBOOK' | 'INSTAGRAM' | null;
    const redirectUri = process.env.META_REDIRECT_URI || `${origin}/api/admin/social/oauth/meta/callback`;
    const state = Math.random().toString(36).substring(2);

    const oauthUrl = SocialMetaPublishingService.getOAuthUrl(redirectUri, state, platform);

    return NextResponse.json({ success: true, url: oauthUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to generate Meta OAuth URL' }, { status: 500 });
  }
}
