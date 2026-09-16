import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { PublishContentType, PublishJobStatus, SocialPlatform } from '@prisma/client';

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  fingerprint: string;
  previousJobId?: string;
  publishedAt?: Date;
  message?: string;
}

export class SocialDuplicateProtectionService {
  /**
   * Computes SHA-256 content fingerprint
   */
  static computeFingerprint({
    dateStr,
    mandiId = 'all',
    contentType,
    platforms,
  }: {
    dateStr: string;
    mandiId?: string;
    contentType: PublishContentType;
    platforms: SocialPlatform[];
  }): string {
    const sortedPlatforms = [...platforms].sort().join(',');
    const raw = `${dateStr}:${mandiId}:${contentType}:${sortedPlatforms}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  /**
   * Checks whether identical content was already published in the last 12 hours
   */
  static async checkDuplicate({
    dateStr,
    mandiId = 'all',
    contentType,
    platforms,
    force = false,
  }: {
    dateStr: string;
    mandiId?: string;
    contentType: PublishContentType;
    platforms: SocialPlatform[];
    force?: boolean;
  }): Promise<DuplicateCheckResult> {
    const fingerprint = this.computeFingerprint({
      dateStr,
      mandiId,
      contentType,
      platforms,
    });

    if (force) {
      return { isDuplicate: false, fingerprint };
    }

    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

    const existingJob = await prisma.socialPublishJob.findFirst({
      where: {
        fingerprint,
        status: { in: [PublishJobStatus.PUBLISHED, PublishJobStatus.PUBLISHING] },
        createdAt: { gte: twelveHoursAgo },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        completedAt: true,
      },
    });

    if (existingJob) {
      return {
        isDuplicate: true,
        fingerprint,
        previousJobId: existingJob.id,
        publishedAt: existingJob.completedAt || existingJob.createdAt,
        message: `Identical update was already published at ${existingJob.createdAt.toLocaleTimeString('en-IN')}. Enable 'Force Publish' if you wish to repost.`,
      };
    }

    return {
      isDuplicate: false,
      fingerprint,
    };
  }
}
