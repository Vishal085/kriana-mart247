'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import { Store, Lock, ArrowRight, AlertCircle, Eye, EyeOff, User, Shield } from 'lucide-react';

function SellerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard/seller';

  const { loginUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
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
      const res = await fetch('/api/auth/seller/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.user) {
        loginUser(data.user);
      }
      router.replace(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-900 border border-emerald-200">
          <Store className="h-3.5 w-3.5 text-emerald-700" /> B2B Merchant Portal
        </div>
        <h1 className="mt-2 text-xl sm:text-2xl font-black text-[#073B6F]">Shopkeeper Login</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Sign in to manage inventory, update rates, and view FMCG demands
        </p>
      </div>

      {error && (
        <div className="mt-3.5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3.5 space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700">Mobile or Email *</label>
          <div className="relative mt-1">
            <Store className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your details"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8] transition"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-slate-400 hover:text-slate-700 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In as Shopkeeper'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-4 border-t border-slate-100 pt-3.5 space-y-1.5 text-center">
        <p className="text-xs text-slate-500">
          Want to list products as a shopkeeper?{' '}
          <Link href="/register/seller" className="font-bold text-[#0B5FA5] hover:underline">
            Register Shop
          </Link>
        </p>
        <div className="flex items-center justify-center gap-3 text-[11px]">
          <Link href="/login/customer" className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-[#073B6F]">
            <User className="h-3 w-3" /> Customer Login
          </Link>
          <span className="text-slate-200">|</span>
          <Link href="/login/admin" className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-[#073B6F]">
            <Shield className="h-3 w-3" /> Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SellerLoginPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-6 sm:py-10">
      <Suspense fallback={<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />}>
        <SellerLoginForm />
      </Suspense>
    </main>
  );
}
