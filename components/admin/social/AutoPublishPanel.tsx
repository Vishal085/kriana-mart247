'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Eye,
  Send,
  ShieldCheck,
  Globe,
  MapPin,
  Check,
  AlertTriangle,
  Layers,
  Film,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';

export interface PublishTargetSelection {
  instagramPost: boolean;
  instagramReel: boolean;
  facebookPost: boolean;
  youtubeShort: boolean;
  youtubeVideo: boolean;
}

interface AutoPublishPanelProps {
  onPreview: (options: {
    mandiId: string;
    language: 'hinglish' | 'hindi' | 'english';
    targets: PublishTargetSelection;
  }) => void;
  onPublishNow: (options: {
    mandiId: string;
    language: 'hinglish' | 'hindi' | 'english';
    targets: PublishTargetSelection;
    force: boolean;
  }) => void;
  isPublishing: boolean;
  isPreviewLoading: boolean;
}

export function AutoPublishPanel({
  onPreview,
  onPublishNow,
  isPublishing,
  isPreviewLoading,
}: AutoPublishPanelProps) {
  const [mandis, setMandis] = useState<Array<{ id: string; name: string; city: string }>>([]);
  const [selectedMandiId, setSelectedMandiId] = useState<string>('all');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [force, setForce] = useState<boolean>(false);

  const [targets, setTargets] = useState<PublishTargetSelection>({
    instagramPost: true,
    instagramReel: false,
    facebookPost: true,
    youtubeShort: true,
    youtubeVideo: false,
  });

  useEffect(() => {
    // Fetch available mandis
    fetch('/api/mandis')
      .then((res) => res.json())
      .then((data) => {
        if (data.mandis && Array.isArray(data.mandis)) {
          setMandis(data.mandis);
        }
      })
      .catch((err) => console.warn('Failed to load mandis:', err));
  }, []);

  const toggleTarget = (key: keyof PublishTargetSelection) => {
    setTargets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(targets).filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-br from-[#073B6F] via-[#0B5FA5] to-[#073B6F] p-6 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>AI Social Auto-Publisher</span>
            <span className="text-[#39A9E8]">•</span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span className="text-emerald-200">100% Zero-Hallucination Guarantee</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Publish Live Mandi Rates Across Social Channels
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            One-click automated publishing of verified wholesale mandi rates, gainers/losers, and key staples directly to <strong>Instagram</strong>, <strong>Facebook</strong>, and <strong>YouTube</strong>. Powered by direct PostgreSQL database rates and official platform APIs.
          </p>

          {/* Verification Badge Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-blue-200">
            <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1">
              <Check className="h-3 w-3 text-emerald-400" /> Real DB Snapshot
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1">
              <Check className="h-3 w-3 text-emerald-400" /> Auto-Generated 1080x1080 Graphics
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1">
              <Check className="h-3 w-3 text-emerald-400" /> Duplicate Spam Protection
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0 w-full lg:w-64">
          <button
            onClick={() =>
              onPublishNow({
                mandiId: selectedMandiId,
                language,
                targets,
                force,
              })
            }
            disabled={isPublishing || selectedCount === 0}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-sm font-black text-white shadow-lg transition hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPublishing ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Publishing Now...</span>
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 text-white" />
                <span>✨ AI AUTO PUBLISH</span>
              </>
            )}
          </button>

          <button
            onClick={() =>
              onPreview({
                mandiId: selectedMandiId,
                language,
                targets,
              })
            }
            disabled={isPreviewLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 border border-white/20 px-5 py-3 text-xs font-black text-white backdrop-blur-md transition hover:bg-white/25 active:scale-95 disabled:opacity-50"
          >
            {isPreviewLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Generating Preview...</span>
              </div>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 text-[#39A9E8]" />
                <span>Preview Before Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Publishing Controls Form */}
      <div className="mt-6 rounded-2xl bg-slate-900/40 p-4 sm:p-5 border border-white/10 backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Target Mandi Scope */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              <span>Target Mandi Scope</span>
            </label>
            <select
              value={selectedMandiId}
              onChange={(e) => setSelectedMandiId(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs font-semibold text-white focus:border-[#39A9E8] focus:outline-none"
            >
              <option value="all">📍 All Major Mandis (Delhi-NCR & Hubs)</option>
              {mandis.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.city})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Content Language */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1.5 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-blue-300" />
              <span>Language & Tone</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setLanguage('hinglish')}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  language === 'hinglish'
                    ? 'bg-[#0B5FA5] text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hindi')}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  language === 'hindi'
                    ? 'bg-[#0B5FA5] text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('english')}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  language === 'english'
                    ? 'bg-[#0B5FA5] text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* 3. Force Repost Option */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-900/60 p-2.5 rounded-xl border border-slate-700 hover:border-slate-500 transition">
              <input
                type="checkbox"
                checked={force}
                onChange={(e) => setForce(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs text-slate-200 font-medium select-none">
                Force Repost (Bypass 12h Duplicate Protection)
              </span>
            </label>
          </div>
        </div>

        {/* Platform Targets Checkboxes */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Share2 className="h-3.5 w-3.5 text-teal-300" />
              Publishing Targets ({selectedCount} Selected)
            </span>
            <span className="text-[10px] text-blue-300 font-normal">
              Toggle specific format & channel destinations
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {/* Instagram Post */}
            <button
              type="button"
              onClick={() => toggleTarget('instagramPost')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                targets.instagramPost
                  ? 'border-pink-400/80 bg-pink-500/20 text-white shadow-sm'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <ImageIcon className="h-4 w-4 text-pink-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold leading-tight">IG Post</div>
                <div className="text-[10px] opacity-75">1080x1080 Feed</div>
              </div>
            </button>

            {/* Instagram Reel */}
            <button
              type="button"
              onClick={() => toggleTarget('instagramReel')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                targets.instagramReel
                  ? 'border-pink-400/80 bg-pink-500/20 text-white shadow-sm'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <Film className="h-4 w-4 text-pink-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold leading-tight">IG Reel</div>
                <div className="text-[10px] opacity-75">9:16 Vertical</div>
              </div>
            </button>

            {/* Facebook Post */}
            <button
              type="button"
              onClick={() => toggleTarget('facebookPost')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                targets.facebookPost
                  ? 'border-blue-400/80 bg-blue-500/20 text-white shadow-sm'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <ImageIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold leading-tight">FB Page Post</div>
                <div className="text-[10px] opacity-75">Card + Link</div>
              </div>
            </button>

            {/* YouTube Short */}
            <button
              type="button"
              onClick={() => toggleTarget('youtubeShort')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                targets.youtubeShort
                  ? 'border-red-400/80 bg-red-500/20 text-white shadow-sm'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <Film className="h-4 w-4 text-red-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold leading-tight">YT Short</div>
                <div className="text-[10px] opacity-75">#Shorts Vertical</div>
              </div>
            </button>

            {/* YouTube Video */}
            <button
              type="button"
              onClick={() => toggleTarget('youtubeVideo')}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                targets.youtubeVideo
                  ? 'border-red-400/80 bg-red-500/20 text-white shadow-sm'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              <Layers className="h-4 w-4 text-red-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold leading-tight">YT Video</div>
                <div className="text-[10px] opacity-75">Full Bulletin</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
