'use client';

import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  X,
  Share2,
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

interface PublishProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
  onRetry: (jobId: string) => void;
  isRetrying: boolean;
}

export function PublishProgressModal({
  isOpen,
  onClose,
  result,
  onRetry,
  isRetrying,
}: PublishProgressModalProps) {
  if (!isOpen || !result) return null;

  const { success, jobId, status, publishedItems = [] } = result;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM':
        return <InstagramIcon className="h-4 w-4 text-pink-500" />;
      case 'FACEBOOK':
        return <FacebookIcon className="h-4 w-4 text-blue-600" />;
      case 'YOUTUBE':
        return <YoutubeIcon className="h-4 w-4 text-red-600" />;
      default:
        return <Share2 className="h-4 w-4 text-slate-400" />;
    }
  };

  const hasFailures = publishedItems.some((i: any) => !i.success);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Status Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              status === 'COMPLETED'
                ? 'bg-emerald-100 text-emerald-600'
                : status === 'PARTIALLY_FAILED'
                ? 'bg-amber-100 text-amber-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {status === 'COMPLETED' ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : status === 'PARTIALLY_FAILED' ? (
              <AlertCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {status === 'COMPLETED'
                ? 'Published Successfully!'
                : status === 'PARTIALLY_FAILED'
                ? 'Partially Published'
                : 'Publishing Incomplete'}
            </h3>
            <p className="text-xs text-slate-500">
              Job ID: <span className="font-mono font-bold text-slate-700">{jobId?.substring(0, 12)}...</span>
            </p>
          </div>
        </div>

        {/* Published Target Results List */}
        <div className="space-y-3 my-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Platform Results
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
            {publishedItems.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-2xl border p-3.5 transition ${
                  item.success
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-red-200 bg-red-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                      {getPlatformIcon(item.platform)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {item.platform} • <span className="font-mono text-[11px] text-slate-500">{item.targetType}</span>
                      </div>
                      <div className="text-[11px]">
                        {item.success ? (
                          <span className="font-bold text-emerald-700">Published live</span>
                        ) : (
                          <span className="font-bold text-red-700">Failed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.success && item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                    >
                      <span>View Live</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {!item.success && item.error && (
                  <div className="mt-2 text-[11px] font-medium text-red-700 bg-red-100/60 p-2 rounded-lg border border-red-200">
                    {item.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>

          {hasFailures && jobId && (
            <button
              onClick={() => onRetry(jobId)}
              disabled={isRetrying}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#0B5FA5] transition disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>Retry Failed Targets</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
