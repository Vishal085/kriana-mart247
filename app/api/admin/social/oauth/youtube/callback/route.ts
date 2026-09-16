import { NextResponse } from 'next/server';
import { SocialYouTubePublishingService } from '@/services/social/youtube-publishing.service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  const adminSocialUrl = new URL('/dashboard/admin/social', url.origin);

  if (error) {
    adminSocialUrl.searchParams.set('error', `Google YouTube OAuth error: ${error}`);
    return NextResponse.redirect(adminSocialUrl);
  }

  if (!code) {
    adminSocialUrl.searchParams.set('error', 'No authorization code received from Google.');
    return NextResponse.redirect(adminSocialUrl);
  }

  try {
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${url.origin}/api/admin/social/oauth/youtube/callback`;
    const result = await SocialYouTubePublishingService.handleOAuthCallback(code, redirectUri);

    adminSocialUrl.searchParams.set(
      'success',
      `Connected YouTube Channel "${result.channelTitle}" successfully!`
    );
    return NextResponse.redirect(adminSocialUrl);
  } catch (err: any) {
    adminSocialUrl.searchParams.set('error', err?.message || 'Failed to authenticate YouTube channel');
    return NextResponse.redirect(adminSocialUrl);
  }
}
