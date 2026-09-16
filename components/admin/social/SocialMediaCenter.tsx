'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { ConnectedAccountsBar, SocialPlatformStatus } from './ConnectedAccountsBar';
import { AutoPublishPanel, PublishTargetSelection } from './AutoPublishPanel';
import { ContentPreviewModal } from './ContentPreviewModal';
import { PublishProgressModal } from './PublishProgressModal';
import { PublishingHistoryTable, PublishJobRecord } from './PublishingHistoryTable';
import { Sparkles, ShieldCheck, Share2, Layers } from 'lucide-react';

export function SocialMediaCenter() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [platforms, setPlatforms] = useState<SocialPlatformStatus[]>([]);
  const [jobs, setJobs] = useState<PublishJobRecord[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState<boolean>(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  // Preview state
  const [previewData, setPreviewData] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);

  // Publishing state
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishResult, setPublishResult] = useState<any>(null);
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);
  const [retryingJobId, setRetryingJobId] = useState<string | null>(null);

  // Fetch Accounts & Status
  const fetchAccounts = async () => {
    setIsLoadingAccounts(true);
    try {
      const res = await fetch('/api/admin/social/accounts');
      const data = await res.json();
      if (res.ok && data.platforms) {
        setPlatforms(data.platforms);
      }
    } catch (err) {
      console.error('Failed to load social accounts:', err);
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  // Fetch Jobs History
  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch('/api/admin/social/jobs');
      const data = await res.json();
      if (res.ok && data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to load publishing jobs:', err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchJobs();

    // Check OAuth return query params
    const successMsg = searchParams.get('success');
    const errorMsg = searchParams.get('error');

    if (successMsg) {
      toast.success(successMsg);
    }
    if (errorMsg) {
      toast.error(errorMsg);
    }
  }, [searchParams]);

  // Handler: Preview Before Publish
  const handlePreview = async (options: {
    mandiId: string;
    language: 'hinglish' | 'hindi' | 'english';
    targets: PublishTargetSelection;
  }) => {
    setIsPreviewLoading(true);
    try {
      const res = await fetch('/api/admin/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mandiId: options.mandiId,
          language: options.language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate preview');
      }

      setPreviewData(data.data);
      setIsPreviewOpen(true);
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate content preview');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Handler: Execute Auto-Publish
  const handlePublishNow = async (options: {
    mandiId?: string;
    language?: 'hinglish' | 'hindi' | 'english';
    targets?: PublishTargetSelection;
    force?: boolean;
  }) => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/admin/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mandiId: options.mandiId || 'all',
          language: options.language || 'hinglish',
          targets: options.targets,
          force: options.force || false,
        }),
      });

      const data = await res.json();

      if (res.status === 409 && data.isDuplicate) {
        if (confirm(`${data.error}\n\nDo you want to FORCE PUBLISH anyway?`)) {
          // Retry with force = true
          handlePublishNow({ ...options, force: true });
          return;
        } else {
          setIsPublishing(false);
          return;
        }
      }

      if (!res.ok) {
        throw new Error(data.error || 'Publishing failed');
      }

      setPublishResult(data);
      setIsProgressOpen(true);
      setIsPreviewOpen(false);

      if (data.status === 'COMPLETED') {
        toast.success('All social posts published successfully!');
      } else if (data.status === 'PARTIALLY_FAILED') {
        toast.warning('Some channels succeeded while others require attention.');
      } else {
        toast.error('Publishing failed. Please inspect logs and credentials.');
      }

      // Refresh audit logs
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || 'Publishing execution failed');
    } finally {
      setIsPublishing(false);
    }
  };

  // Handler: Retry Failed Job Targets
  const handleRetryJob = async (jobId: string) => {
    setRetryingJobId(jobId);
    try {
      const res = await fetch(`/api/admin/social/jobs/${jobId}/retry`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Retry failed');

      toast.success('Retry attempt completed.');
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || 'Retry failed');
    } finally {
      setRetryingJobId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Connected Accounts Bar */}
      <ConnectedAccountsBar
        platforms={platforms}
        isLoading={isLoadingAccounts}
        onRefresh={fetchAccounts}
      />

      {/* 2. Auto Publish & Preview Panel */}
      <AutoPublishPanel
        onPreview={handlePreview}
        onPublishNow={handlePublishNow}
        isPublishing={isPublishing}
        isPreviewLoading={isPreviewLoading}
      />

      {/* 3. Publishing History Table */}
      <PublishingHistoryTable
        jobs={jobs}
        isLoading={isLoadingJobs}
        onRefresh={fetchJobs}
        onRetryJob={handleRetryJob}
        isRetryingJobId={retryingJobId}
      />

      {/* Preview Modal */}
      <ContentPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={previewData}
        onPublishNow={() => handlePublishNow({})}
        isPublishing={isPublishing}
      />

      {/* Progress / Result Modal */}
      <PublishProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        result={publishResult}
        onRetry={(jobId) => handleRetryJob(jobId)}
        isRetrying={Boolean(retryingJobId)}
      />
    </div>
  );
}
