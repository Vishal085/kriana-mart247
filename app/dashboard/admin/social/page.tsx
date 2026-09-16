import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { SocialMediaCenter } from '@/components/admin/social/SocialMediaCenter';
import { Share2, ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'AI Social Auto-Publish — KiranaMart247 Admin',
  description: 'Automated multi-platform social media publishing for KiranaMart247 Mandi Rates',
};

export default async function AdminSocialPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    redirect('/login?redirect=/dashboard/admin/social');
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Admin Console</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>Admin Operator: <strong className="text-slate-800">{admin.fullName}</strong></span>
          </div>
        </div>

        {/* Page Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#073B6F] to-[#0B5FA5] text-white shadow-md">
                <Share2 className="h-7 w-7 text-[#39A9E8]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B5FA5]">
                  <span>KiranaMart247 Official Dispatch</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">Multi-Platform OAuth 2.0</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#073B6F]">
                  AI Social Auto-Publish Center
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish verified wholesale mandi rates directly to Instagram (Post & Reel), Facebook, and YouTube (Shorts & Video).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Center Component */}
        <Suspense
          fallback={
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-xs font-bold text-slate-400">
              Loading AI Social Media Center...
            </div>
          }
        >
          <SocialMediaCenter />
        </Suspense>
      </div>
    </div>
  );
}
