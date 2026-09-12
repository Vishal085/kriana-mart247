'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import { Shield, Lock, ArrowRight, AlertCircle, Eye, EyeOff, User, Store } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard/admin';

  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-warm destination route in background so navigation is instant
  React.useEffect(() => {
    router.prefetch(redirectUrl);
  }, [router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      loginUser(data.user);
      router.replace(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <h1 className="mt-2.5 text-xl sm:text-2xl font-black text-[#073B6F] flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-[#39A9E8]" />
          <span>Admin Portal</span>
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Restricted administrative access for KiranaMart operations
        </p>
      </div>

      {error && (
        <div className="mt-3.5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3.5 space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700">Admin Email *</label>
          <div className="relative mt-1">
            <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Enter your details"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-2 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#073B6F] focus:bg-white transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">Password *</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-[#0B5FA5] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-2 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#073B6F] focus:bg-white transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
        >
          {loading ? 'Verifying Access...' : 'Sign In as Administrator'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
        <p className="text-[11px] text-slate-400 mb-1">
          Looking for customer or shopkeeper login?
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login/customer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#073B6F] hover:underline"
          >
            <User className="h-3.5 w-3.5" /> Customer Login
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/login/seller"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
          >
            <Store className="h-3.5 w-3.5" /> Shopkeeper Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-6 sm:py-10">
      <Suspense fallback={<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
