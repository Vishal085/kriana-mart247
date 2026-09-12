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

  const { refreshUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      await refreshUser();
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900 border border-emerald-200">
          <Store className="h-3.5 w-3.5 text-emerald-700" /> B2B Merchant Portal
        </div>
        <h1 className="mt-2 text-2xl font-black text-[#073B6F]">Shopkeeper Login</h1>
        <p className="mt-1 text-xs text-slate-500">
          Sign in to manage inventory, update rates, and view FMCG demands
        </p>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700">Mobile or Email *</label>
          <div className="relative mt-1">
            <Store className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 9876543210 or shop@example.com"
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8]"
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
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In as Shopkeeper'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-center">
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
          <span className="text-slate-300">|</span>
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
    <main className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-slate-50/50">
      <Suspense fallback={<div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />}>
        <SellerLoginForm />
      </Suspense>
    </main>
  );
}
