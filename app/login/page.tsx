'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import { 
  User, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Store, 
  ShoppingBag,
  Loader2,
  CheckCircle2
} from 'lucide-react';

function UnifiedLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect') || '';

  const { loginUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRole, setSuccessRole] = useState<string | null>(null);

  const executeLogin = async (idToUse: string, passToUse: string) => {
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: idToUse.trim(), 
          password: passToUse,
          redirect: redirectParam || undefined
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check your credentials.');
      }

      if (data.user) {
        loginUser(data.user);
        setSuccessRole(data.user.role);
      }

      // Pre-warm destination route and navigate smoothly
      const destination = data.redirectTo || '/shop';
      router.prefetch(destination);
      setTimeout(() => {
        router.replace(destination);
      }, 350);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeLogin(identifier, password);
  };

  const handleDemoLogin = (demoId: string, demoPass: string) => {
    setIdentifier(demoId);
    setPassword(demoPass);
    executeLogin(demoId, demoPass);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
      {/* Brand Header */}
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-black text-[#073B6F] tracking-tight">
          Sign In
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Enter your registered Mobile Number or Email to access your account
        </p>
      </div>

      {/* Role Pill Badges Indicator */}
      <div className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#073B6F] border border-blue-100">
          <ShoppingBag className="h-3 w-3 text-[#39A9E8]" />
          Customer
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-100">
          <Store className="h-3 w-3 text-amber-600" />
          Shopkeeper
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200">
          <ShieldCheck className="h-3 w-3 text-slate-600" />
          Admin
        </span>
      </div>

      {/* 1-Click Instant Demo Login Selector */}
      <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#073B6F]">
              Quick Demo Access
            </span>
          </div>
          <span className="text-[10px] font-medium text-slate-500 bg-white/80 border border-slate-200/60 px-2 py-0.5 rounded-full">
            1-Click Test
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Customer Demo */}
          <button
            type="button"
            onClick={() => handleDemoLogin('customer@kiranamart247.com', 'Test@123')}
            disabled={loading || Boolean(successRole)}
            className="group flex flex-col items-center justify-center rounded-xl border border-blue-200/80 bg-white p-2.5 text-center shadow-xs transition hover:border-[#073B6F] hover:bg-blue-50/60 hover:shadow-md cursor-pointer disabled:opacity-50"
            title="Login as Demo Customer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#073B6F] group-hover:scale-110 group-hover:bg-[#073B6F] group-hover:text-white transition">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="mt-1.5 text-xs font-bold text-slate-800 group-hover:text-[#073B6F]">
              Customer
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Shop Store
            </span>
          </button>

          {/* Shopkeeper Demo */}
          <button
            type="button"
            onClick={() => handleDemoLogin('shopkeeper@kiranamart247.com', 'shopkeeper123')}
            disabled={loading || Boolean(successRole)}
            className="group flex flex-col items-center justify-center rounded-xl border border-amber-200/80 bg-white p-2.5 text-center shadow-xs transition hover:border-amber-600 hover:bg-amber-50/60 hover:shadow-md cursor-pointer disabled:opacity-50"
            title="Login as Demo Shopkeeper"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-700 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition">
              <Store className="h-4 w-4" />
            </div>
            <span className="mt-1.5 text-xs font-bold text-slate-800 group-hover:text-amber-800">
              Shopkeeper
            </span>
            <span className="text-[10px] text-amber-600 font-semibold mt-0.5">
              Seller Hub
            </span>
          </button>

          {/* Admin Demo */}
          <button
            type="button"
            onClick={() => handleDemoLogin('admin@kiranamart247.com', 'Admin@123')}
            disabled={loading || Boolean(successRole)}
            className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-xs transition hover:border-slate-800 hover:bg-slate-100/70 hover:shadow-md cursor-pointer disabled:opacity-50"
            title="Login as Super Admin"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 group-hover:scale-110 group-hover:bg-slate-800 group-hover:text-white transition">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="mt-1.5 text-xs font-bold text-slate-800 group-hover:text-slate-900">
              Admin
            </span>
            <span className="text-[10px] text-indigo-600 font-semibold mt-0.5">
              Full Portal
            </span>
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-1 text-[10px] text-slate-500">
          <span>Tapping any button logs in instantly without typing</span>
        </div>
      </div>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[11px] font-semibold text-slate-400">
            Or enter custom credentials
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Animation */}
      {successRole && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            Verified! Redirecting to {successRole === 'ADMIN' ? 'Admin Portal' : successRole === 'SHOPKEEPER' ? 'Shopkeeper Portal' : 'Store'}...
          </span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Mobile Number or Email
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="identifier"
              autoComplete="username"
              placeholder="e.g. 9876543210 or your@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              disabled={loading || Boolean(successRole)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0B5FA5] focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/10 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-[#0B5FA5] hover:text-[#073B6F] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || Boolean(successRole)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0B5FA5] focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/10 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || Boolean(successRole)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-sm font-bold text-white shadow-md shadow-[#073B6F]/15 transition duration-150 hover:bg-[#0B5FA5] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Info helper */}
      <p className="mt-4 text-center text-[11px] text-slate-500">
        🔒 Encrypted & secure. Your assigned portal opens automatically.
      </p>

      {/* Register Links Section */}
      <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-600 space-y-1.5">
        <div>
          <span>New customer? </span>
          <Link
            href="/register/customer"
            className="font-bold text-[#073B6F] hover:text-[#0B5FA5] hover:underline"
          >
            Create Customer Account
          </Link>
        </div>
        <div>
          <span>Want to sell on KiranaMart? </span>
          <Link
            href="/register/seller"
            className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Register as Shopkeeper
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[78vh] items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-b from-slate-50/50 via-white to-blue-50/20">
      <Suspense
        fallback={
          <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-slate-200 bg-white p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#073B6F]" />
          </div>
        }
      >
        <UnifiedLoginForm />
      </Suspense>
    </main>
  );
}
