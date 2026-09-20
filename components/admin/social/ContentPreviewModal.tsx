'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  ChevronRight,
  Film,
  Layers,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';

interface ContentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onPublishNow: () => void;
  isPublishing: boolean;
}

export function ContentPreviewModal({
  isOpen,
  onClose,
  data,
  onPublishNow,
  isPublishing,
}: ContentPreviewModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'instagram' | 'reel' | 'facebook' | 'youtube'>('instagram');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !data) return null;

  const { snapshot, assets, instagramPost, instagramReel, facebookPost, youtubeVideo, youtubeShort } = data;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-md overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-white overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#059669] to-[#10b981] text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Zero-Hallucination DB Snapshot</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                Social Media Auto-Publish Preview
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700">
              📅 {snapshot?.formattedDate} • {snapshot?.totalCommodities} Commodities
            </span>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 transition ${
              activeTab === 'instagram'
                ? 'border-pink-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <InstagramIcon className="h-4 w-4 text-pink-400" />
            <span>Instagram Post (1080x1080)</span>
          </button>

          <button
            onClick={() => setActiveTab('reel')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 transition ${
              activeTab === 'reel'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="h-4 w-4 text-purple-400" />
            <span>IG Reel & Short Storyboard (9:16)</span>
          </button>

          <button
            onClick={() => setActiveTab('facebook')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 transition ${
              activeTab === 'facebook'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FacebookIcon className="h-4 w-4 text-blue-400" />
            <span>Facebook Feed Post</span>
          </button>

          <button
            onClick={() => setActiveTab('youtube')}
            className={`flex items-center gap-2 border-b-2 py-3.5 px-4 transition ${
              activeTab === 'youtube'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <YoutubeIcon className="h-4 w-4 text-red-400" />
            <span>YouTube Bulletin & Shorts</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: INSTAGRAM POST */}
          {activeTab === 'instagram' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visual Graphic Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between w-full">
                  <span>Generated 1080x1080 Branded Graphic</span>
                  <span className="text-emerald-400 font-mono">SVG High-Res</span>
                </div>
                {assets?.squareImageDataUrl && (
                  <div className="w-full max-w-[400px] aspect-square rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-black">
                    <img
                      src={assets.squareImageDataUrl}
                      alt="KiranaMart Instagram Mandi Post"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Caption & Hashtags */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Generated Post Caption</span>
                    <button
                      onClick={() => handleCopy(instagramPost?.caption, 'ig-caption')}
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline font-semibold"
                    >
                      {copiedKey === 'ig-caption' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedKey === 'ig-caption' ? 'Copied' : 'Copy Caption'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-sans text-xs text-slate-200 whitespace-pre-line max-h-[320px] overflow-y-auto leading-relaxed">
                    {instagramPost?.caption}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400">Targeted Hashtags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {instagramPost?.hashtags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-pink-300 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REEL / STORYBOARD (9:16) */}
          {activeTab === 'reel' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Vertical 9:16 Storyboard Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 mb-2 flex items-center justify-between w-full">
                  <span>Vertical 9:16 Story / Reel Preview</span>
                  <span className="text-purple-400 font-mono">1080x1920</span>
                </div>
                {assets?.verticalStoryDataUrl && (
                  <div className="w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-black">
                    <img
                      src={assets.verticalStoryDataUrl}
                      alt="Vertical Storyboard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Storyboard Script & Cues */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-xl bg-purple-950/30 border border-purple-800/40 p-3.5">
                  <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">Hook Line (First 3 Seconds)</div>
                  <p className="text-xs font-semibold text-white mt-1">{instagramReel?.hook}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300">Reel Storyboard Timeline & Voiceover Script</div>
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {instagramReel?.storyboard?.map((scene: any, idx: number) => (
                      <div key={idx} className="rounded-xl bg-slate-950/70 border border-slate-800 p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-purple-400">
                          <span>Scene {idx + 1} ({scene.timeSec}s)</span>
                          <span className="text-slate-500">{scene.visual}</span>
                        </div>
                        <p className="text-slate-200 italic leading-relaxed">&quot;{scene.voiceover}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACEBOOK POST */}
          {activeTab === 'facebook' && (
            <div className="max-w-2xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  KM
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    KiranaMart247
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <div className="text-[11px] text-slate-400">Just now • 🌐 Public</div>
                </div>
              </div>

              <div className="font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                {facebookPost?.text}
              </div>

              {/* Graphic in FB Card */}
              {assets?.squareImageDataUrl && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-black">
                  <img
                    src={assets.squareImageDataUrl}
                    alt="Facebook Post Graphic"
                    className="w-full h-auto max-h-[360px] object-contain"
                  />
                </div>
              )}

              {/* Link preview card */}
              <a
                href={facebookPost?.link}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-800 bg-slate-900/80 p-3 hover:bg-slate-900 transition"
              >
                <div className="text-[10px] uppercase font-mono text-slate-400">kiranamart247.com</div>
                <div className="text-xs font-bold text-white">Live Wholesale APMC Mandi Rates & FMCG Supply</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Real-time daily rates across 400+ mandis in India.</div>
              </a>
            </div>
          )}

          {/* TAB 4: YOUTUBE VIDEO & SHORTS */}
          {activeTab === 'youtube' && (
            <div className="space-y-5">
              {/* YouTube Video Section */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <YoutubeIcon className="h-4 w-4" />
                    <span>YouTube Video Bulletin</span>
                  </div>
                  <button
                    onClick={() => handleCopy(youtubeVideo?.description, 'yt-desc')}
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline font-semibold"
                  >
                    {copiedKey === 'yt-desc' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedKey === 'yt-desc' ? 'Copied' : 'Copy Description'}</span>
                  </button>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 font-bold mb-1">Title:</div>
                  <div className="font-bold text-xs text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    {youtubeVideo?.title}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 font-bold mb-1">Description & Chapters:</div>
                  <div className="font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 whitespace-pre-line max-h-[160px] overflow-y-auto leading-relaxed">
                    {youtubeVideo?.description}
                  </div>
                </div>
              </div>

              {/* YouTube Short Section */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400">
                  <Film className="h-4 w-4" />
                  <span>YouTube Short Script (#Shorts 9:16)</span>
                </div>
                <div className="font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 whitespace-pre-line leading-relaxed">
                  {youtubeShort?.script}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified against live database rates. Zero AI hallucinations.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
            >
              Close
            </button>

            <button
              onClick={onPublishNow}
              disabled={isPublishing}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-xs font-black text-white shadow-lg hover:from-emerald-400 hover:to-teal-400 transition active:scale-95 disabled:opacity-50"
            >
              {isPublishing ? (
                <div className="flex items-center gap-1.5">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Publishing...</span>
                </div>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
