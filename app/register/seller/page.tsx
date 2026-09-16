'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandMark } from '@/components/brand-mark';
import {
  Store,
  User,
  Lock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Building2,
} from 'lucide-react';
import { useMandi, matchMandiForLocation } from '@/context/MandiContext';

function SellerRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard/seller';

  const { loginUser } = useAuth();
  const { selectMandi, selectMandiByLocation, mandis } = useMandi();

  // 3-step progressive wizard: 1 = Personal Account, 2 = Shop Details, 3 = OTP
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopAddress: '',
    city: 'Delhi',
    state: 'Delhi',
    pinCode: '',
    gstNumber: '',
  });

  const matchedMandi = matchMandiForLocation(formData.city, formData.state, mandis);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP State
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    router.prefetch(redirectUrl);
  }, [router, redirectUrl]);

  useEffect(() => {
    let timer: any;
    if (currentStep === 3 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  // Validate Step 1 before proceeding to Step 2
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = formData.fullName.trim();
    const cleanMobile = formData.mobile.replace(/\D/g, '').trim();
    const cleanEmail = formData.email.trim();

    if (cleanName.length < 2) {
      setError('Please enter your full name (minimum 2 characters)');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid Email address');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match. Please check and retype.");
      return;
    }

    setCurrentStep(2);
  };

  // Submit Step 2 and send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (formData.shopName.trim().length < 2) {
      setError('Please enter your shop or business name');
      return;
    }
    if (formData.shopAddress.trim().length < 3) {
      setError('Please enter your shop address');
      return;
    }
    if (formData.pinCode) {
      const cleanPin = formData.pinCode.replace(/\D/g, '').trim();
      if (!/^\d{6}$/.test(cleanPin)) {
        setError('PIN Code must be exactly 6 digits');
        return;
      }
    }

    setLoading(true);

    try {
      const cleanMobile = formData.mobile.replace(/\D/g, '').trim();
      const cleanEmail = formData.email.trim();

      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'SHOPKEEPER',
          fullName: formData.fullName.trim(),
          mobile: cleanMobile,
          email: cleanEmail,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          shopName: formData.shopName.trim(),
          shopAddress: formData.shopAddress.trim(),
          city: formData.city.trim() || 'Delhi',
          state: formData.state.trim() || 'Delhi',
          pinCode: formData.pinCode ? formData.pinCode.trim() : undefined,
          gstNumber: formData.gstNumber ? formData.gstNumber.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setVerificationId(data.verificationId);
      setOtp('');
      setCurrentStep(3);
      setCountdown(60);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP & finalize registration
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
      if (matchedMandi) {
        selectMandi(matchedMandi);
      } else {
        selectMandiByLocation(formData.city, formData.state);
      }
      router.replace(redirectUrl);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
      {/* Brand Header */}
      <div className="text-center">
        <div className="flex justify-center">
          <BrandMark size="md" />
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-100">
          <Store className="h-3 w-3 text-amber-600" />
          <span>Shopkeeper Registration</span>
        </div>
        <h1 className="mt-2 text-xl sm:text-2xl font-black text-[#073B6F]">
          {currentStep === 1 && 'Create Seller Account'}
          {currentStep === 2 && 'Shop & Location'}
          {currentStep === 3 && 'Verify Mobile / Email'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          {currentStep === 1 && 'Step 1 of 2 • Enter your personal account details'}
          {currentStep === 2 && 'Step 2 of 2 • Enter your shop name and address'}
          {currentStep === 3 && `Enter the 6-digit code sent to ${formData.mobile}`}
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
              currentStep >= 1
                ? 'bg-[#073B6F] text-white'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            1
          </span>
          <span className={`text-xs font-bold ${currentStep === 1 ? 'text-[#073B6F]' : 'text-slate-400'}`}>
            Account
          </span>
        </div>

        <div className={`h-0.5 w-8 rounded-full ${currentStep >= 2 ? 'bg-[#073B6F]' : 'bg-slate-200'}`} />

        <div className="flex items-center gap-1.5">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
              currentStep >= 2
                ? 'bg-[#073B6F] text-white'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            2
          </span>
          <span className={`text-xs font-bold ${currentStep === 2 ? 'text-[#073B6F]' : 'text-slate-400'}`}>
            Shop
          </span>
        </div>

        <div className={`h-0.5 w-8 rounded-full ${currentStep === 3 ? 'bg-[#073B6F]' : 'bg-slate-200'}`} />

        <div className="flex items-center gap-1.5">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
              currentStep === 3
                ? 'bg-[#073B6F] text-white'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            3
          </span>
          <span className={`text-xs font-bold ${currentStep === 3 ? 'text-[#073B6F]' : 'text-slate-400'}`}>
            OTP
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-600 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ================= STEP 1: ACCOUNT DETAILS ================= */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Next} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Owner / Shopkeeper Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Gupta"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  name="mobile"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 chars"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0B5FA5] cursor-pointer"
          >
            <span>Continue to Shop Details</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {/* ================= STEP 2: SHOP DETAILS ================= */}
      {currentStep === 2 && (
        <form onSubmit={handleSendOtp} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Shop or Store Name *
            </label>
            <div className="relative">
              <Store className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="shopName"
                required
                value={formData.shopName}
                onChange={handleChange}
                placeholder="e.g. Gupta Kirana Store"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Shop Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="shopAddress"
                required
                value={formData.shopAddress}
                onChange={handleChange}
                placeholder="e.g. Shop 14, Main Market"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#073B6F] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / District *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Delhi / Noida"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 px-3 text-sm text-slate-800 outline-none transition focus:border-[#073B6F] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                maxLength={6}
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="e.g. 110006"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 px-3 text-sm text-slate-800 outline-none transition focus:border-[#073B6F] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setCurrentStep(1);
              }}
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification OTP</span>
                  <ShieldCheck className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 3: OTP VERIFICATION ================= */}
      {currentStep === 3 && (
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-center">
            <ShieldCheck className="mx-auto h-7 w-7 text-emerald-600" />
            <p className="mt-1.5 text-xs text-slate-600">
              OTP sent to <strong>+91 {formData.mobile}</strong> &amp; <strong>{formData.email}</strong>
            </p>
          </div>



          <div>
            <label className="block text-center text-xs font-bold text-slate-700 mb-1.5">
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
              className="w-full text-center tracking-[0.5em] text-2xl font-black rounded-xl border-2 border-slate-200 bg-white py-2.5 text-[#073B6F] outline-none focus:border-[#073B6F]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(2);
                setError(null);
              }}
              className="underline hover:text-slate-800"
            >
              ← Edit details
            </button>

            {countdown > 0 ? (
              <span>Resend in {countdown}s</span>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleSendOtp(e as any)}
                className="flex items-center gap-1 font-bold text-[#073B6F] hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> Resend OTP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleVerifyOtp()}
            disabled={loading || otp.length !== 6}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Verifying &amp; Creating Account...</span>
              </>
            ) : (
              <>
                <span>Verify &amp; Create Account</span>
                <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Footer link to login */}
      <div className="mt-5 border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
        <span>Already have an account? </span>
        <Link href="/login" className="font-bold text-[#073B6F] hover:underline">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}

export default function SellerRegisterPage() {
  return (
    <main className="flex min-h-[82vh] items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-b from-slate-50/50 via-white to-amber-50/20">
      <Suspense
        fallback={
          <div className="flex h-64 w-full max-w-md items-center justify-center rounded-3xl border border-slate-200 bg-white p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#073B6F]" />
          </div>
        }
      >
        <SellerRegisterForm />
      </Suspense>
    </main>
  );
}
