'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Building,
  Hash,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

function CustomerRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard/customer';

  const { loginUser } = useAuth();
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    pinCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP State
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    router.prefetch(redirectUrl);
  }, [router, redirectUrl]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (step === 'OTP' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;
    setError(null);

    const cleanMobile = formData.mobile.replace(/\D/g, '').trim();
    const cleanPin = formData.pinCode.replace(/\D/g, '').trim();
    const cleanEmail = formData.email.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid Gmail / Email address');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!/^\d{6}$/.test(cleanPin)) {
      setError('PIN Code must be exactly 6 digits (e.g. 110006)');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'CUSTOMER',
          fullName: formData.fullName.trim(),
          mobile: cleanMobile,
          email: cleanEmail,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          address: formData.address.trim(),
          city: formData.city.trim(),
          pinCode: cleanPin,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setVerificationId(data.verificationId);
      if (data.devOtp) {
        setDevOtp(data.devOtp);
      }
      setStep('OTP');
      setCountdown(60);
      setOtp('');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = (codeToVerify || otp).trim();
    if (loading || code.length !== 6) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationId,
          otp: code,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      if (data.user) {
        loginUser(data.user);
      }
      router.replace(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xl">
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <h1 className="mt-3 text-2xl font-black text-[#073B6F]">
          {step === 'DETAILS' ? 'Customer Registration' : 'Verify Your Identity'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          {step === 'DETAILS'
            ? 'Create an account to compare wholesale mandi rates & place orders'
            : 'Enter the 6-digit OTP code sent to your Gmail and Mobile number'}
        </p>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 'DETAILS' ? (
        <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Full Name *</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Mobile Number (10 digits) *</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">Gmail / Email Address *</label>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                OTP Sent Here
              </span>
            </div>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="e.g. yourname@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Password (Min. 8 chars) *</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Confirm Password *</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Delivery Address *</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="House / Shop No., Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">City *</label>
              <div className="relative mt-1">
                <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">PIN Code (6 digits) *</label>
              <div className="relative mt-1">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. 110006"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
          >
            {loading ? 'Sending OTP to Gmail & Mobile...' : 'Send Verification OTP'}
            <ShieldCheck className="h-4 w-4" />
          </button>
        </form>
      ) : (
        /* ================= STEP 2: FAST OTP VERIFICATION ================= */
        <div className="mt-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-[#073B6F]">
              <ShieldCheck className="h-6 w-6 text-[#0B5FA5]" />
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium">OTP has been sent simultaneously to:</p>
            <div className="mt-2 flex flex-col items-center gap-1 text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" /> {formData.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-emerald-600" /> +91 {formData.mobile}
              </span>
            </div>
          </div>

          {devOtp && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs text-amber-900">
              <span>⚡ Dev OTP Code: <strong>{devOtp}</strong></span>
              <button
                type="button"
                onClick={() => {
                  setOtp(devOtp);
                  handleVerifyOtp(devOtp);
                }}
                className="font-bold underline text-[#073B6F] hover:text-[#0B5FA5]"
              >
                Auto-Fill &amp; Verify
              </button>
            </div>
          )}

          <div className="mt-5">
            <label className="block text-center text-xs font-bold text-slate-700 mb-2">
              Enter 6-Digit OTP Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(val);
                if (val.length === 6) {
                  handleVerifyOtp(val);
                }
              }}
              placeholder="000000"
              className="w-full text-center tracking-[0.6em] text-2xl font-black rounded-xl border-2 border-slate-300 bg-white py-3.5 text-[#073B6F] outline-none focus:border-[#073B6F] shadow-sm transition"
            />
            <p className="mt-1.5 text-center text-[11px] text-slate-400">
              ID will be generated immediately once OTP is verified.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setStep('DETAILS');
                setError(null);
              }}
              className="font-medium text-slate-500 hover:text-slate-800 underline"
            >
              ← Edit details
            </button>

            {countdown > 0 ? (
              <span className="text-slate-400">
                Resend in <strong className="text-slate-700">{countdown}s</strong>
              </span>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSendOtp()}
                className="flex items-center gap-1 font-bold text-[#0B5FA5] hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> Resend OTP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleVerifyOtp()}
            disabled={loading || otp.length !== 6}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
          >
            {loading ? 'Verifying & Creating Account...' : 'Verify & Complete Registration'}
            <CheckCircle2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-6 pt-6 text-center text-xs text-slate-500 border-t border-slate-100 flex flex-col gap-2">
        <p>
          Already have an account?{' '}
          <Link
            href={
              redirectUrl !== '/dashboard/customer'
                ? `/login/customer?redirect=${encodeURIComponent(redirectUrl)}`
                : '/login/customer'
            }
            className="font-bold text-[#0B5FA5] hover:underline"
          >
            Login Here
          </Link>
        </p>
        <p>
          Are you a shopkeeper/retailer?{' '}
          <Link href="/register/seller" className="font-bold text-emerald-700 hover:underline">
            Register as Seller
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function CustomerRegisterPage() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
        }
      >
        <CustomerRegisterForm />
      </Suspense>
    </main>
  );
}
