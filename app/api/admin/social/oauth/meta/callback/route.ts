import { NextResponse } from 'next/server';
import { SocialMetaPublishingService } from '@/services/social/meta-publishing.service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error_description') || url.searchParams.get('error');

  const adminSocialUrl = new URL('/dashboard/admin/social', url.origin);

  if (error) {
    adminSocialUrl.searchParams.set('error', `Meta OAuth error: ${error}`);
    return NextResponse.redirect(adminSocialUrl);
  }

  if (!code) {
    adminSocialUrl.searchParams.set('error', 'No authorization code received from Meta.');
    return NextResponse.redirect(adminSocialUrl);
  }

  try {
    const redirectUri = process.env.META_REDIRECT_URI || `${url.origin}/api/admin/social/oauth/meta/callback`;
    const result = await SocialMetaPublishingService.handleOAuthCallback(code, redirectUri);

    adminSocialUrl.searchParams.set(
      'success',
      `Connected Facebook Page "${result.facebookPage}"${result.instagramLinked ? ' and linked Instagram' : ''} successfully!`
    );
    return NextResponse.redirect(adminSocialUrl);
  } catch (err: any) {
    adminSocialUrl.searchParams.set('error', err?.message || 'Failed to authenticate Meta accounts');
    return NextResponse.redirect(adminSocialUrl);
  }
}
