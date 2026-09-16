import { prisma } from '@/lib/prisma';
import { SocialPlatform, SocialAccountStatus } from '@prisma/client';

export interface MetaPublishResponse {
  success: boolean;
  platform: 'INSTAGRAM' | 'FACEBOOK';
  postId?: string;
  postUrl?: string;
  error?: string;
}

export class SocialMetaPublishingService {
  private static readonly GRAPH_API_VERSION = 'v20.0';
  private static readonly GRAPH_API_BASE = `https://graph.facebook.com/${this.GRAPH_API_VERSION}`;

  /**
   * Check if Meta configuration exists in environment
   */
  static isConfigured(): boolean {
    return Boolean(process.env.META_APP_ID && process.env.META_APP_SECRET);
  }

  /**
   * Generate official Meta OAuth dialog URL
   */
  static getOAuthUrl(redirectUri: string, state: string, platform?: 'FACEBOOK' | 'INSTAGRAM' | null): string {
    const appId = process.env.META_APP_ID;
    if (!appId) {
      throw new Error('META_APP_ID is not configured in .env');
    }

    let scopes: string[] = [];

    if (platform === 'FACEBOOK') {
      scopes = [
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_posts',
      ];
    } else if (platform === 'INSTAGRAM') {
      scopes = [
        'pages_show_list',
        'pages_read_engagement',
        'instagram_business_basic',
        'instagram_business_content_publish',
      ];
    } else {
      scopes = [
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_posts',
        'instagram_business_basic',
        'instagram_business_content_publish',
      ];
    }

    return `https://www.facebook.com/${this.GRAPH_API_VERSION}/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(','))}&response_type=code&state=${encodeURIComponent(state)}`;
  }

  /**
   * Exchange code for long-lived tokens and store connected accounts
   */
  static async handleOAuthCallback(code: string, redirectUri: string) {
    const appId = process.env.META_APP_ID;
    const appSecret = process.env.META_APP_SECRET;

    if (!appId || !appSecret) {
      throw new Error('META_APP_ID or META_APP_SECRET is missing');
    }

    // 1. Exchange authorization code for short-lived token
    const tokenUrl = `${this.GRAPH_API_BASE}/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&code=${code}`;

    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || tokenData.error) {
      throw new Error(tokenData.error?.message || 'Failed to exchange Meta authorization code');
    }

    const shortLivedToken = tokenData.access_token;

    // 2. Exchange short-lived token for 60-day long-lived token
    const longLivedUrl = `${this.GRAPH_API_BASE}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`;
    const longRes = await fetch(longLivedUrl);
    const longData = await longRes.json();
    const longLivedToken = longData.access_token || shortLivedToken;
    const expiresInSec = longData.expires_in || 60 * 24 * 3600;
    const tokenExpiresAt = new Date(Date.now() + expiresInSec * 1000);

    // 3. Fetch Facebook Pages linked to this user
    const pagesUrl = `${this.GRAPH_API_BASE}/me/accounts?access_token=${longLivedToken}`;
    const pagesRes = await fetch(pagesUrl);
    const pagesData = await pagesRes.json();

    if (!pagesRes.ok || !pagesData.data || pagesData.data.length === 0) {
      throw new Error('No Facebook Pages found under this Meta account. Please create or link a Facebook Page.');
    }

    const firstPage = pagesData.data[0];
    const pageId = firstPage.id;
    const pageName = firstPage.name;
    const pageAccessToken = firstPage.access_token || longLivedToken;

    // Store / update Facebook Account
    await prisma.socialAccount.upsert({
      where: {
        platform: SocialPlatform.FACEBOOK,
      },
      update: {
        accountName: pageName,
        accountId: pageId,
        pageId: pageId,
        accessToken: pageAccessToken,
        tokenExpiresAt,
        status: SocialAccountStatus.READY,
        lastPublishAt: new Date(),
        statusDetails: null,
      },
      create: {
        platform: SocialPlatform.FACEBOOK,
        accountId: pageId,
        pageId: pageId,
        accountName: pageName,
        accessToken: pageAccessToken,
        tokenExpiresAt,
        status: SocialAccountStatus.READY,
        lastPublishAt: new Date(),
      },
    });

    // 4. Check for linked Instagram Business Account on that Page
    const igUrl = `${this.GRAPH_API_BASE}/${pageId}?fields=instagram_business_account&access_token=${pageAccessToken}`;
    const igRes = await fetch(igUrl);
    const igData = await igRes.json();

    if (igData.instagram_business_account?.id) {
      const igId = igData.instagram_business_account.id;

      // Get IG username
      const igInfoUrl = `${this.GRAPH_API_BASE}/${igId}?fields=username,name&access_token=${pageAccessToken}`;
      const igInfoRes = await fetch(igInfoUrl);
      const igInfo = await igInfoRes.json();
      const igUsername = igInfo.username ? `@${igInfo.username}` : `Instagram (${igId})`;

      await prisma.socialAccount.upsert({
        where: {
          platform: SocialPlatform.INSTAGRAM,
        },
        update: {
          accountName: igUsername,
          accountId: igId,
          accessToken: pageAccessToken,
          tokenExpiresAt,
          status: SocialAccountStatus.READY,
          lastPublishAt: new Date(),
          statusDetails: null,
        },
        create: {
          platform: SocialPlatform.INSTAGRAM,
          accountId: igId,
          accountName: igUsername,
          accessToken: pageAccessToken,
          tokenExpiresAt,
          status: SocialAccountStatus.READY,
          lastPublishAt: new Date(),
        },
      });
    }

    return {
      facebookPage: pageName,
      instagramLinked: Boolean(igData.instagram_business_account?.id),
    };
  }

  /**
   * Publish post or photo to Facebook Page
   */
  static async publishToFacebook({
    caption,
    mediaUrl,
  }: {
    caption: string;
    mediaUrl?: string;
  }): Promise<MetaPublishResponse> {
    const account = await prisma.socialAccount.findFirst({
      where: {
        platform: SocialPlatform.FACEBOOK,
        status: SocialAccountStatus.READY,
      },
    });

    if (!account) {
      return {
        success: false,
        platform: 'FACEBOOK',
        error: 'Facebook Page account is not connected in Social Settings.',
      };
    }

    try {
      const fbId = account.pageId || account.accountId;
      let endpoint = `${this.GRAPH_API_BASE}/${fbId}/feed`;
      const bodyParams: Record<string, string> = {
        access_token: account.accessToken || '',
        message: caption,
      };

      if (mediaUrl) {
        endpoint = `${this.GRAPH_API_BASE}/${fbId}/photos`;
        bodyParams.url = mediaUrl;
        bodyParams.caption = caption;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        const errMsg = data.error?.message || 'Meta Facebook API error';
        await prisma.socialAccount.update({
          where: { id: account.id },
          data: { statusDetails: errMsg },
        });
        return { success: false, platform: 'FACEBOOK', error: errMsg };
      }

      const postId = data.id || data.post_id;
      return {
        success: true,
        platform: 'FACEBOOK',
        postId,
        postUrl: `https://facebook.com/${postId}`,
      };
    } catch (err: any) {
      return {
        success: false,
        platform: 'FACEBOOK',
        error: err?.message || 'Network error communicating with Facebook Graph API',
      };
    }
  }

  /**
   * Publish Post or Reel to Instagram Business Account via 2-step Container API
   */
  static async publishToInstagram({
    caption,
    mediaUrl,
    isReel = false,
  }: {
    caption: string;
    mediaUrl: string;
    isReel?: boolean;
  }): Promise<MetaPublishResponse> {
    const account = await prisma.socialAccount.findFirst({
      where: {
        platform: SocialPlatform.INSTAGRAM,
        status: SocialAccountStatus.READY,
      },
    });

    if (!account) {
      return {
        success: false,
        platform: 'INSTAGRAM',
        error: 'Instagram Business account is not connected.',
      };
    }

    try {
      const igId = account.accountId || account.pageId;
      // Step 1: Create Media Container
      const containerUrl = `${this.GRAPH_API_BASE}/${igId}/media`;
      const payload: Record<string, any> = {
        access_token: account.accessToken,
        caption,
      };

      if (isReel) {
        payload.media_type = 'REELS';
        payload.video_url = mediaUrl;
      } else {
        payload.image_url = mediaUrl;
      }

      const containerRes = await fetch(containerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const containerData = await containerRes.json();
      if (!containerRes.ok || containerData.error) {
        const errMsg = containerData.error?.message || 'Failed to create Instagram media container';
        return { success: false, platform: 'INSTAGRAM', error: errMsg };
      }

      const containerId = containerData.id;

      // For Reels/Videos, poll status until container is ready
      if (isReel) {
        let isFinished = false;
        let attempts = 0;
        while (!isFinished && attempts < 15) {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const statusRes = await fetch(
            `${this.GRAPH_API_BASE}/${containerId}?fields=status_code&access_token=${account.accessToken}`
          );
          const statusData = await statusRes.json();
          if (statusData.status_code === 'FINISHED') {
            isFinished = true;
          } else if (statusData.status_code === 'ERROR') {
            return {
              success: false,
              platform: 'INSTAGRAM',
              error: 'Instagram video processing encountered an error in Meta container.',
            };
          }
        }
      }

      // Step 2: Publish the media container
      const publishUrl = `${this.GRAPH_API_BASE}/${igId}/media_publish`;
      const publishRes = await fetch(publishUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: account.accessToken,
          creation_id: containerId,
        }),
      });

      const publishData = await publishRes.json();
      if (!publishRes.ok || publishData.error) {
        return {
          success: false,
          platform: 'INSTAGRAM',
          error: publishData.error?.message || 'Failed to publish Instagram media container',
        };
      }

      const igMediaId = publishData.id;
      return {
        success: true,
        platform: 'INSTAGRAM',
        postId: igMediaId,
        postUrl: `https://instagram.com/p/${igMediaId}`,
      };
    } catch (err: any) {
      return {
        success: false,
        platform: 'INSTAGRAM',
        error: err?.message || 'Network failure communicating with Instagram Graph API',
      };
    }
  }
}
