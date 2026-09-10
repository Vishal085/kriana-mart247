'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import { Store, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function SellerLoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      router.push('/dashboard/seller');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIdentifier('shopkeeper@kiranamart247.com');
    setPassword('shopkeeper123');
  };

  return (
    <main className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <BrandMark size="md" />
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200">
            <Store className="h-3.5 w-3.5 text-amber-700" /> Shopkeeper & Trader Portal
          </div>
          <h1 className="mt-2 text-2xl font-black text-[#073B6F]">Shopkeeper Login</h1>
          <p className="mt-1 text-xs text-slate-500">
            Access your B2B products, listings, inventory and wholesale requests
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
                placeholder="e.g. 9876543210 or shop@kiranamart.com"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">Password *</label>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden focus:ring-1 focus:ring-[#39A9E8]"
              />
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

        {/* Demo Fast Fill Button */}
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-center">
          <p className="text-[11px] text-slate-600">Quick Testing / Demo Shopkeeper Account:</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-white border border-blue-200 px-3 py-1 text-xs font-bold text-[#0B5FA5] hover:bg-blue-50 shadow-2xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Fill Demo Shopkeeper Credentials
          </button>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-xs text-slate-500">
            Want to list products as a shopkeeper?{' '}
            <Link href="/register/seller" className="font-bold text-[#0B5FA5] hover:underline">
              Register Shop
            </Link>
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            Looking for regular shopping?{' '}
            <Link href="/login/customer" className="font-semibold text-slate-600 hover:underline">
              Customer Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
