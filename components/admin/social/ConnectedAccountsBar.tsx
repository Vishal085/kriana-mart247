'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Link2,
  Unlink,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  KeyRound,
  X,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

export interface SocialPlatformStatus {
  platform: 'INSTAGRAM' | 'FACEBOOK' | 'YOUTUBE';
  label: string;
  subLabel: string;
  status: 'CONNECTED' | 'NOT_CONNECTED' | 'EXPIRED' | 'CONFIGURATION_REQUIRED';
  isEnvConfigured: boolean;
  missingEnv: string[];
  accountName: string | null;
  lastSyncedAt: string | null;
  tokenExpiresAt: string | null;
  errorMessage: string | null;
}

interface ConnectedAccountsBarProps {
  platforms: SocialPlatformStatus[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function ConnectedAccountsBar({
  platforms,
  isLoading,
  onRefresh,
}: ConnectedAccountsBarProps) {
  const { toast } = useToast();
  const [activeSetupModal, setActiveSetupModal] = useState<SocialPlatformStatus | null>(null);
  const [disconnectingPlatform, setDisconnectingPlatform] = useState<string | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM':
        return <InstagramIcon className="h-5 w-5 text-pink-500" />;
      case 'FACEBOOK':
        return <FacebookIcon className="h-5 w-5 text-blue-600" />;
      case 'YOUTUBE':
        return <YoutubeIcon className="h-5 w-5 text-red-600" />;
      default:
        return <Link2 className="h-5 w-5 text-slate-500" />;
    }
  };

  const handleConnect = async (platform: string) => {
    try {
      let endpoint = '';
      if (platform === 'INSTAGRAM' || platform === 'FACEBOOK') {
        endpoint = `/api/admin/social/oauth/meta/url?platform=${platform}`;
      } else if (platform === 'YOUTUBE') {
        endpoint = '/api/admin/social/oauth/youtube/url';
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      if (!res.ok || !data.url) {
        if (data.code === 'CONFIGURATION_REQUIRED') {
          const platObj = platforms.find((p) => p.platform === platform);
          if (platObj) setActiveSetupModal(platObj);
          return;
        }
        throw new Error(data.error || 'Failed to initiate OAuth flow');
      }

      // Redirect admin to official Meta/Google OAuth login dialog
      window.location.href = data.url;
    } catch (err: any) {
      toast.error(err.message || 'Connection failed');
    }
  };

  const handleDisconnect = async (platform: string) => {
    if (!confirm(`Are you sure you want to disconnect ${platform}?`)) return;
    setDisconnectingPlatform(platform);
    try {
      const res = await fetch(`/api/admin/social/accounts?platform=${platform}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to disconnect');
      toast.success(`${platform} disconnected successfully.`);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Disconnection failed');
    } finally {
      setDisconnectingPlatform(null);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Official APIs & OAuth 2.0</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Connected Social Media Accounts
          </h2>
          <p className="text-xs text-slate-500">
            KiranaMart247 publishes through verified Meta Graph API v20.0 and Google YouTube API v3. No scraping or fake bots.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((p) => {
          const isConnected = p.status === 'CONNECTED';
          const isConfigReq = p.status === 'CONFIGURATION_REQUIRED';
          const isExpired = p.status === 'EXPIRED';

          return (
            <div
              key={p.platform}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                isConnected
                  ? 'border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white shadow-sm'
                  : isConfigReq
                  ? 'border-amber-200 bg-gradient-to-b from-amber-50/30 to-white'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100">
                    {getPlatformIcon(p.platform)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{p.label}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{p.subLabel}</p>
                  </div>
                </div>

                {/* Status Badge */}
                {isConnected ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Active</span>
                  </span>
                ) : isConfigReq ? (
                  <button
                    onClick={() => setActiveSetupModal(p)}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 hover:bg-amber-200 transition"
                  >
                    <KeyRound className="h-3 w-3" />
                    <span>Setup Required</span>
                  </button>
                ) : isExpired ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-800">
                    <AlertCircle className="h-3 w-3" />
                    <span>Token Expired</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                    <span>Not Connected</span>
                  </span>
                )}
              </div>

              {/* Account Handle / Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                {isConnected ? (
                  <div className="space-y-1">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span className="truncate">{p.accountName || 'Linked Profile'}</span>
                      <button
                        onClick={() => handleDisconnect(p.platform)}
                        disabled={disconnectingPlatform === p.platform}
                        className="text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-0.5"
                      >
                        <Unlink className="h-2.5 w-2.5" />
                        Disconnect
                      </button>
                    </div>
                    {p.tokenExpiresAt && (
                      <p className="text-[10px] text-slate-400">
                        Token valid until: {new Date(p.tokenExpiresAt).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                ) : isConfigReq ? (
                  <div className="space-y-2">
                    <p className="text-[11px] text-amber-700 font-medium leading-tight">
                      OAuth credentials not configured in <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[10px]">.env</code>
                    </p>
                    <button
                      onClick={() => setActiveSetupModal(p)}
                      className="w-full rounded-xl bg-amber-500 py-2 text-center text-xs font-bold text-white shadow-sm hover:bg-amber-600 transition flex items-center justify-center gap-1.5"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      View API Setup Guide
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleConnect(p.platform)}
                    className="w-full rounded-xl bg-[#073B6F] py-2 text-center text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5] transition flex items-center justify-center gap-1.5"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    Connect {p.label}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Setup Guide Modal */}
      {activeSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setActiveSetupModal(null)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {activeSetupModal.label} API Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  Required official developer keys to enable publishing
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-xs text-slate-600">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5">
                <div className="font-bold text-amber-900 mb-1">Missing Environment Variables:</div>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-amber-800">
                  {activeSetupModal.missingEnv.map((v) => (
                    <li key={v} className="font-bold">{v}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800">How to configure:</div>
                {activeSetupModal.platform === 'INSTAGRAM' || activeSetupModal.platform === 'FACEBOOK' ? (
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                    <li>Go to <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold inline-flex items-center gap-0.5">developers.facebook.com <ExternalLink className="h-3 w-3" /></a> and create a Business App.</li>
                    <li>Add <strong>Instagram Graph API</strong> and <strong>Facebook Login for Business</strong> products.</li>
                    <li>Add OAuth redirect URI: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">https://kiranamart247.com/api/admin/social/oauth/meta/callback</code></li>
                    <li>Copy App ID and App Secret into server <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">.env</code>:
                      <pre className="mt-1 bg-slate-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[10px] overflow-x-auto">
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_REDIRECT_URI=https://kiranamart247.com/api/admin/social/oauth/meta/callback
                      </pre>
                    </li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                    <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold inline-flex items-center gap-0.5">console.cloud.google.com <ExternalLink className="h-3 w-3" /></a>.</li>
                    <li>Enable <strong>YouTube Data API v3</strong>.</li>
                    <li>Create OAuth 2.0 Web Client credentials and add redirect URI: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">https://kiranamart247.com/api/admin/social/oauth/youtube/callback</code></li>
                    <li>Add keys to server <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">.env</code>:
                      <pre className="mt-1 bg-slate-900 text-red-400 p-2.5 rounded-xl font-mono text-[10px] overflow-x-auto">
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://kiranamart247.com/api/admin/social/oauth/youtube/callback
                      </pre>
                    </li>
                  </ol>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveSetupModal(null)}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
