import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SocialPlatform, SocialAccountStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const accounts = await prisma.socialAccount.findMany({
      select: {
        id: true,
        platform: true,
        accountId: true,
        pageId: true,
        channelId: true,
        accountName: true,
        status: true,
        tokenExpiresAt: true,
        lastPublishAt: true,
        statusDetails: true,
      },
    });

    const metaAppId = process.env.META_APP_ID;
    const metaAppSecret = process.env.META_APP_SECRET;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

    const platforms = [
      {
        platform: SocialPlatform.INSTAGRAM,
        label: 'Instagram',
        subLabel: 'Business / Creator Profile',
        isEnvConfigured: Boolean(metaAppId && metaAppSecret),
        missingEnv: [
          !metaAppId ? 'META_APP_ID' : null,
          !metaAppSecret ? 'META_APP_SECRET' : null,
        ].filter(Boolean),
        account: accounts.find((a: any) => a.platform === SocialPlatform.INSTAGRAM) || null,
      },
      {
        platform: SocialPlatform.FACEBOOK,
        label: 'Facebook',
        subLabel: 'Official Brand Page',
        isEnvConfigured: Boolean(metaAppId && metaAppSecret),
        missingEnv: [
          !metaAppId ? 'META_APP_ID' : null,
          !metaAppSecret ? 'META_APP_SECRET' : null,
        ].filter(Boolean),
        account: accounts.find((a: any) => a.platform === SocialPlatform.FACEBOOK) || null,
      },
      {
        platform: SocialPlatform.YOUTUBE,
        label: 'YouTube',
        subLabel: 'Official Channel (Videos & Shorts)',
        isEnvConfigured: Boolean(googleClientId && googleClientSecret),
        missingEnv: [
          !googleClientId ? 'GOOGLE_CLIENT_ID' : null,
          !googleClientSecret ? 'GOOGLE_CLIENT_SECRET' : null,
        ].filter(Boolean),
        account: accounts.find((a: any) => a.platform === SocialPlatform.YOUTUBE) || null,
      },
    ];

    const formattedPlatforms = platforms.map((p) => {
      let computedStatus: 'CONNECTED' | 'NOT_CONNECTED' | 'EXPIRED' | 'CONFIGURATION_REQUIRED' =
        'NOT_CONNECTED';

      if (!p.isEnvConfigured) {
        computedStatus = 'CONFIGURATION_REQUIRED';
      } else if (p.account?.status === SocialAccountStatus.READY) {
        // Check if token expired
        if (p.account.tokenExpiresAt && new Date(p.account.tokenExpiresAt).getTime() < Date.now()) {
          computedStatus = 'EXPIRED';
        } else {
          computedStatus = 'CONNECTED';
        }
      }

      return {
        platform: p.platform,
        label: p.label,
        subLabel: p.subLabel,
        status: computedStatus,
        isEnvConfigured: p.isEnvConfigured,
        missingEnv: p.missingEnv,
        accountName: p.account?.accountName || null,
        lastSyncedAt: p.account?.lastPublishAt || null,
        tokenExpiresAt: p.account?.tokenExpiresAt || null,
        errorMessage: p.account?.statusDetails || null,
      };
    });

    return NextResponse.json({
      success: true,
      platforms: formattedPlatforms,
    });
  } catch (error: any) {
    console.error('ACCOUNTS API ERROR:', error);
    const isAuthError = error?.message === 'Unauthorized' || error?.message?.includes('Forbidden');
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: error?.message?.includes('Forbidden') ? 403 : isAuthError ? 401 : 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform') as SocialPlatform;

    if (!platform || !Object.values(SocialPlatform).includes(platform)) {
      return NextResponse.json({ error: 'Valid platform is required' }, { status: 400 });
    }

    await prisma.socialAccount.deleteMany({
      where: { platform },
    });

    return NextResponse.json({
      success: true,
      message: `Disconnected ${platform} account successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to disconnect account' }, { status: 500 });
  }
}
