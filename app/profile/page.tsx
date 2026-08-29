'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Camera,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle2,
  AlertCircle,
  Save,
  Shield,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, refreshUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login/customer');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setFullName(data.user.fullName || '');
            setMobile(data.user.mobile || '');
            setEmail(data.user.email || '');
            setAvatarUrl(data.user.avatarUrl || null);
            if (data.user.customerProfile) {
              setAddress(data.user.customerProfile.address || '');
              setCity(data.user.customerProfile.city || '');
              setPinCode(data.user.customerProfile.pinCode || '');
            }
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  // Handle local image file upload & convert to base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setAvatarUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Full name cannot be empty');
      return;
    }

    if (showPasswordChange && newPassword) {
      if (!currentPassword) {
        setErrorMessage('Current password is required to change password');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New passwords do not match');
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);

    try {
      const payload: any = {
        fullName: fullName.trim(),
        mobile: mobile.trim() || null,
        avatarUrl: avatarUrl || null,
      };

      if (user?.role === 'CUSTOMER') {
        payload.address = address.trim() || null;
        payload.city = city.trim() || null;
        payload.pinCode = pinCode.trim() || null;
      }

      if (showPasswordChange && newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      await refreshUser();
      setSuccessMessage('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordChange(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  if (authLoading || fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm font-bold text-[#073B6F]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#073B6F] border-t-transparent" />
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/customer'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-[#073B6F] hover:text-[#073B6F]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#073B6F]">Account Profile</h1>
            <p className="text-xs text-slate-500">Manage your personal details, profile picture, and security</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3 py-1 text-xs font-bold text-[#073B6F]">
          {user?.role === 'ADMIN' ? (
            <>
              <Shield className="h-3.5 w-3.5 text-[#073B6F]" />
              <span>Administrator</span>
            </>
          ) : (
            <>
              <User className="h-3.5 w-3.5 text-[#0B5FA5]" />
              <span>Customer Account</span>
            </>
          )}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-700 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-600 animate-in fade-in">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Profile Photo Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#073B6F] mb-4">
            Profile Photo
          </h2>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            {/* Avatar Preview */}
            <div className="relative flex-shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#073B6F] to-[#0B5FA5] text-2xl font-black text-white shadow-lg ring-2 ring-slate-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#073B6F] text-white shadow-md transition hover:bg-[#0B5FA5] hover:scale-110"
                title="Change Photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Photo Action Controls */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div>
                <p className="text-sm font-bold text-slate-800">Upload new avatar</p>
                <p className="text-xs text-slate-500">Supports JPG, PNG, WebP or SVG up to 2MB</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-[#073B6F] transition hover:bg-[#EAF5FC] hover:border-[#39A9E8]"
                >
                  Choose Image File
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#073B6F]">
            Personal Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700">Full Name *</label>
              <div className="relative mt-1">
                <User className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vishal Gupta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Mobile Number</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700">Email Address (Login ID)</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-3 text-xs font-medium text-slate-500 cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Account login email address cannot be changed directly.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Delivery & Address Info (For Customers) */}
        {user?.role === 'CUSTOMER' && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#073B6F]">
              Delivery Address & Location
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700">Street Address</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Shop/House number, Street, Wholesale Market area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">City / Mandi Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-medium text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">PIN Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 110006"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-medium text-slate-800 outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Security & Password */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-[#073B6F]">
                Security & Password
              </h2>
              <p className="text-xs text-slate-500">Update your account password</p>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-[#073B6F] hover:bg-[#EAF5FC] hover:border-[#39A9E8]"
            >
              {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
            </button>
          </div>

          {showPasswordChange && (
            <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Current Password *</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">New Password *</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Confirm New Password *</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href={user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/customer'}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5FA5] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </main>
  );
}
