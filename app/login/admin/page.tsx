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

  const { refreshUser } = useAuth();
  const [email, setEmail] = useState('');
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
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      await refreshUser();
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl text-white">
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-300 border border-slate-700">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="mt-3 text-2xl font-black text-white">Admin Portal</h1>
        <p className="mt-1 text-xs text-slate-400">
          Restricted administrative access for KiranaMart operations
        </p>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-950/50 p-3 text-xs font-semibold text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300">Admin Email *</label>
          <div className="relative mt-1">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="email"
              required
              placeholder="admin@kiranamart247.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:bg-slate-800"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-300">Password *</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-sky-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:bg-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-500 disabled:opacity-50"
        >
          {loading ? 'Verifying Access...' : 'Sign In as Administrator'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800 space-y-2 text-center">
        <p className="text-xs text-slate-400">
          Looking for customer or shopkeeper login?
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login/customer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
          >
            <User className="h-3.5 w-3.5" /> Customer Login
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/login/seller"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
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
    <main className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-slate-950">
      <Suspense fallback={<div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
