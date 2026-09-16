'use client';

import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Calendar,
  Layers,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

export interface PublishJobItem {
  id: string;
  platform: 'INSTAGRAM' | 'FACEBOOK' | 'YOUTUBE';
  targetType: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  externalPostId: string | null;
  externalUrl: string | null;
  errorMessage: string | null;
  publishedAt: string | null;
}

export interface PublishJobRecord {
  id: string;
  contentType: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIALLY_FAILED';
  title: string;
  language: string;
  createdAt: string;
  completedAt: string | null;
  items: PublishJobItem[];
}

interface PublishingHistoryTableProps {
  jobs: PublishJobRecord[];
  isLoading: boolean;
  onRefresh: () => void;
  onRetryJob: (jobId: string) => void;
  isRetryingJobId: string | null;
}

export function PublishingHistoryTable({
  jobs,
  isLoading,
  onRefresh,
  onRetryJob,
  isRetryingJobId,
}: PublishingHistoryTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredJobs = jobs.filter((j) => {
    if (filterStatus === 'ALL') return true;
    return j.status === filterStatus;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM':
        return <InstagramIcon className="h-3.5 w-3.5 text-pink-500" />;
      case 'FACEBOOK':
        return <FacebookIcon className="h-3.5 w-3.5 text-blue-600" />;
      case 'YOUTUBE':
        return <YoutubeIcon className="h-3.5 w-3.5 text-red-600" />;
      default:
        return <Layers className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#073B6F]">
            <History className="h-3.5 w-3.5" />
            <span>Audit & Verification Trail</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Publishing History & Logs
          </h2>
          <p className="text-xs text-slate-500">
            Immutable log of all automated and manual social media broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="PARTIALLY_FAILED">Partially Failed</option>
            <option value="FAILED">Failed</option>
          </select>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <Calendar className="mx-auto h-8 w-8 text-slate-300 mb-2" />
          <p className="text-xs font-bold text-slate-600">No publishing jobs recorded yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "AI Auto Publish" above to create your first multi-platform broadcast.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Broadcast Title / Scope</th>
                <th className="py-3 px-4">Target Platforms</th>
                <th className="py-3 px-4">Overall Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => {
                const isPartiallyFailed = job.status === 'PARTIALLY_FAILED';
                const isCompleted = job.status === 'COMPLETED';
                const isFailed = job.status === 'FAILED';
                const hasFailedTargets = job.items.some((i) => i.status === 'FAILED');

                return (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 max-w-xs truncate">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Lang: <span className="uppercase">{job.language}</span> • Job ID: {job.id.substring(0, 8)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {job.items.map((item) => (
                          <div
                            key={item.id}
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                              item.status === 'COMPLETED'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                : 'border-red-200 bg-red-50 text-red-800'
                            }`}
                          >
                            {getPlatformIcon(item.platform)}
                            <span>{item.platform}</span>
                            {item.status === 'COMPLETED' && item.externalUrl && (
                              <a
                                href={item.externalUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-600 hover:text-emerald-900"
                                title="Open Live Post"
                              >
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Completed</span>
                        </span>
                      ) : isPartiallyFailed ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                          <AlertCircle className="h-3 w-3" />
                          <span>Partially Failed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-800">
                          <XCircle className="h-3 w-3" />
                          <span>Failed</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {hasFailedTargets && (
                        <button
                          onClick={() => onRetryJob(job.id)}
                          disabled={isRetryingJobId === job.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#073B6F] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-[#0B5FA5] transition disabled:opacity-50"
                        >
                          <RefreshCw
                            className={`h-3 w-3 ${isRetryingJobId === job.id ? 'animate-spin' : ''}`}
                          />
                          <span>Retry</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
