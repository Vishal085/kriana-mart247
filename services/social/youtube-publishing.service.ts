import { prisma } from '@/lib/prisma';
import { SocialPlatform, SocialAccountStatus } from '@prisma/client';

export interface YouTubePublishResponse {
  success: boolean;
  videoId?: string;
  videoUrl?: string;
  error?: string;
}

export class SocialYouTubePublishingService {
  private static readonly TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
  private static readonly UPLOAD_ENDPOINT = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status';

  /**
   * Check if Google / YouTube configuration exists
   */
  static isConfigured(): boolean {
    return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  }

  /**
   * Generate official Google OAuth 2.0 URL
   */
  static getOAuthUrl(redirectUri: string, state: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new Error('GOOGLE_CLIENT_ID is not configured in .env');
    }

    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      scopes
    )}&access_type=offline&prompt=consent&state=${encodeURIComponent(state)}`;
  }

  /**
   * Handle Google OAuth callback: exchange code for access + refresh tokens
   */
  static async handleOAuthCallback(code: string, redirectUri: string) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing');
    }

    const tokenRes = await fetch(this.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange Google OAuth code');
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresInSec = tokenData.expires_in || 3600;
    const tokenExpiresAt = new Date(Date.now() + expiresInSec * 1000);

    // Fetch Channel details
    const channelRes = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const channelData = await channelRes.json();

    const channelItem = channelData.items?.[0];
    const channelId = channelItem?.id || 'primary-channel';
    const channelTitle = channelItem?.snippet?.title || 'KiranaMart247 YouTube';

    await prisma.socialAccount.upsert({
      where: {
        platform: SocialPlatform.YOUTUBE,
      },
      update: {
        accountName: channelTitle,
        channelId,
        accountId: channelId,
        accessToken,
        refreshToken: refreshToken || undefined,
        tokenExpiresAt,
        status: SocialAccountStatus.READY,
        lastPublishAt: new Date(),
        statusDetails: null,
      },
      create: {
        platform: SocialPlatform.YOUTUBE,
        channelId,
        accountId: channelId,
        accountName: channelTitle,
        accessToken,
        refreshToken: refreshToken || null,
        tokenExpiresAt,
        status: SocialAccountStatus.READY,
        lastPublishAt: new Date(),
      },
    });

    return { channelTitle, channelId };
  }

  /**
   * Refreshes access token if expired
   */
  static async getValidAccessToken(accountId: string): Promise<string> {
    const account = await prisma.socialAccount.findUnique({ where: { id: accountId } });
    if (!account) throw new Error('YouTube account not found');

    const isExpired = account.tokenExpiresAt ? account.tokenExpiresAt.getTime() <= Date.now() + 60000 : false;
    if (!isExpired) return account.accessToken;

    if (!account.refreshToken) {
      throw new Error('YouTube access token expired and no refresh token is stored. Reconnection required.');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    const res = await fetch(this.TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        refresh_token: account.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error_description || 'Failed to refresh YouTube access token');
    }

    const newAccessToken = data.access_token;
    const expiresInSec = data.expires_in || 3600;
    const tokenExpiresAt = new Date(Date.now() + expiresInSec * 1000);

    await prisma.socialAccount.update({
      where: { id: account.id },
      data: {
        accessToken: newAccessToken,
        tokenExpiresAt,
      },
    });

    return newAccessToken;
  }

  /**
   * Uploads Video or Short to YouTube using resumable upload protocol
   */
  static async uploadVideo({
    title,
    description,
    tags,
    videoBuffer,
    mimeType = 'video/mp4',
    isShort = true,
  }: {
    title: string;
    description: string;
    tags: string[];
    videoBuffer: Buffer;
    mimeType?: string;
    isShort?: boolean;
  }): Promise<YouTubePublishResponse> {
    const account = await prisma.socialAccount.findFirst({
      where: {
        platform: SocialPlatform.YOUTUBE,
        status: SocialAccountStatus.READY,
      },
    });

    if (!account) {
      return {
        success: false,
        error: 'YouTube channel is not connected in Social Settings.',
      };
    }

    try {
      if (!videoBuffer || videoBuffer.length < 100) {
        try {
          const fs = await import('fs/promises');
          const path = await import('path');
          const defaultVideoPath = path.join(process.cwd(), 'public', 'assets', 'video', 'mandi-rates-template.mp4');
          videoBuffer = await fs.readFile(defaultVideoPath);
        } catch (readErr: any) {
          console.warn('Failed to load default template video:', readErr);
        }
      }

      if (!videoBuffer || videoBuffer.length === 0) {
        return {
          success: false,
          error: 'No video content available for YouTube upload. Template video missing.',
        };
      }

      const accessToken = await this.getValidAccessToken(account.id);

      const finalTitle = isShort && !title.toLowerCase().includes('#shorts')
        ? `${title} #Shorts`
        : title;

      // 1. Initiate resumable upload session
      const metadata = {
        snippet: {
          title: finalTitle,
          description,
          tags,
          categoryId: '22', // People & Blogs
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false,
        },
      };

      const initRes = await fetch(this.UPLOAD_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': mimeType,
          'X-Upload-Content-Length': videoBuffer.length.toString(),
        },
        body: JSON.stringify(metadata),
      });

      if (!initRes.ok) {
        const errJson = await initRes.json();
        return {
          success: false,
          error: errJson.error?.message || 'Failed to initiate YouTube upload session',
        };
      }

      const uploadUrl = initRes.headers.get('Location');
      if (!uploadUrl) {
        return {
          success: false,
          error: 'No upload location URL received from YouTube API',
        };
      }

      // 2. Upload video bytes
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': mimeType,
          'Content-Length': videoBuffer.length.toString(),
        },
        body: new Uint8Array(videoBuffer) as unknown as BodyInit,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || uploadData.error) {
        return {
          success: false,
          error: uploadData.error?.message || 'Failed to upload video content to YouTube',
        };
      }

      const videoId = uploadData.id;
      const videoUrl = isShort
        ? `https://youtube.com/shorts/${videoId}`
        : `https://youtube.com/watch?v=${videoId}`;

      return {
        success: true,
        videoId,
        videoUrl,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Network error communicating with YouTube Data API',
      };
    }
  }
}
