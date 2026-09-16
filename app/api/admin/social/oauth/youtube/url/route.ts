import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SocialYouTubePublishingService } from '@/services/social/youtube-publishing.service';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    if (!SocialYouTubePublishingService.isConfigured()) {
      return NextResponse.json(
        {
          error: 'Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) are missing from environment.',
          code: 'CONFIGURATION_REQUIRED',
        },
        { status: 400 }
      );
    }

    const { origin } = new URL(request.url);
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/admin/social/oauth/youtube/callback`;
    const state = Math.random().toString(36).substring(2);

    const oauthUrl = SocialYouTubePublishingService.getOAuthUrl(redirectUri, state);

    return NextResponse.json({ success: true, url: oauthUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to generate YouTube OAuth URL' }, { status: 500 });
  }
}
