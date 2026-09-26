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
  Store,
  UserPlus,
  Users,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Copy,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, refreshUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab state for Admin
  const [activeTab, setActiveTab] = useState<'profile' | 'add-customer' | 'customers'>('profile');

  // Admin Profile state
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

  // Add Customer State (for Admin)
  const [custName, setCustName] = useState('');
  const [custContactNumber, setCustContactNumber] = useState('');
  const [custStoreName, setCustStoreName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custCity, setCustCity] = useState('Delhi');
  const [custAddress, setCustAddress] = useState('');
  const [custPinCode, setCustPinCode] = useState('');
  const [custSubmitting, setCustSubmitting] = useState(false);
  const [custSuccess, setCustSuccess] = useState<string | null>(null);
  const [custError, setCustError] = useState<string | null>(null);
  const [lastCreatedCustomer, setLastCreatedCustomer] = useState<any | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Recent Customers state (for Admin)
  const [recentCustomers, setRecentCustomers] = useState<any[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Read URL query params on mount without causing Next.js SSR Suspense bailouts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'add-customer' || tabParam === 'customers') {
        setActiveTab(tabParam as any);
      }
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile');
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
      if (user.role === 'ADMIN') {
        fetchRecentCustomers();
      }
    }
  }, [user, authLoading, router]);

  const fetchRecentCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const res = await fetch('/api/admin/users?limit=10');
      if (res.ok) {
        const data = await res.json();
        setRecentCustomers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch recent customers:', err);
    } finally {
      setLoadingCustomers(false);
    }
  };

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

    if (mobile.trim() && !/^[6-9]\d{9}$/.test(mobile.trim())) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9');
      return;
    }

    if (user?.role === 'CUSTOMER' && pinCode.trim() && !/^\d{6}$/.test(pinCode.trim())) {
      setErrorMessage('PIN Code must be exactly 6 digits (e.g. 110006)');
      return;
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

  // Handle Admin Add Customer
  const handleAddCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustError(null);
    setCustSuccess(null);
    setLastCreatedCustomer(null);
    setCopiedPassword(false);

    // 1. Validate required fields: Name, Contact Number, Store Name
    if (!custName.trim() || custName.trim().length < 2) {
      setCustError('Customer Name is required (minimum 2 characters)');
      return;
    }

    const cleanMobile = custContactNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setCustError('Please enter a valid 10-digit Indian contact number starting with 6, 7, 8, or 9');
      return;
    }

    if (!custStoreName.trim() || custStoreName.trim().length < 2) {
      setCustError('Store Name is required (minimum 2 characters)');
      return;
    }

    setCustSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: custName.trim(),
          contactNumber: cleanMobile,
          storeName: custStoreName.trim(),
          email: custEmail.trim() || undefined,
          address: custAddress.trim() || undefined,
          city: custCity.trim() || 'Delhi',
          pinCode: custPinCode.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add customer');
      }

      setCustSuccess(data.message || `Customer "${custName}" (${custStoreName}) added successfully!`);
      setLastCreatedCustomer({
        name: custName.trim(),
        mobile: cleanMobile,
        storeName: custStoreName.trim(),
        defaultPassword: `Kirana@${cleanMobile.slice(-4)}`,
        id: data.user?.id,
      });

      // Clear input fields
      setCustName('');
      setCustContactNumber('');
      setCustStoreName('');
      setCustEmail('');
      setCustAddress('');
      setCustPinCode('');

      // Refresh customers list
      fetchRecentCustomers();
    } catch (err: any) {
      setCustError(err.message || 'Failed to add customer. Please try again.');
    } finally {
      setCustSubmitting(false);
    }
  };

  const copyPasswordToClipboard = (password: string) => {
    navigator.clipboard.writeText(password);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2500);
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

  const isAdmin = user?.role === 'ADMIN';

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={isAdmin ? '/dashboard/admin' : '/dashboard/customer'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-[#073B6F] hover:text-[#073B6F] transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#073B6F]">
              {isAdmin ? 'Admin Console & Profile' : 'Account Profile'}
            </h1>
            <p className="text-xs text-slate-500">
              {isAdmin
                ? 'Manage your admin credentials, security, and onboard customer store accounts'
                : 'Manage your personal details, profile picture, and security'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3.5 py-1.5 text-xs font-bold text-[#073B6F]">
              <Shield className="h-3.5 w-3.5 text-[#073B6F]" />
              <span>Super Administrator</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5FC] px-3.5 py-1.5 text-xs font-bold text-[#073B6F]">
              <User className="h-3.5 w-3.5 text-[#0B5FA5]" />
              <span>Customer Account</span>
            </div>
          )}
        </div>
      </div>

      {/* Admin Action Tabs */}
      {isAdmin && (
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'profile'
                ? 'bg-[#073B6F] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#073B6F] hover:text-[#073B6F]'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin Profile & Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('add-customer')}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'add-customer'
                ? 'bg-[#073B6F] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#073B6F] hover:text-[#073B6F]'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5 text-emerald-500" />
            <span>Add Customer</span>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black text-emerald-800">
              New Store
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customers')}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'customers'
                ? 'bg-[#073B6F] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#073B6F] hover:text-[#073B6F]'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Customer Directory ({recentCustomers.length})</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: ADD CUSTOMER (THE REQUESTED FEATURE FOR ADMIN)   */}
      {/* ======================================================== */}
      {isAdmin && activeTab === 'add-customer' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Card: Add Customer Form (Compact) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#073B6F] text-white">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#073B6F]">Add Customer</h2>
                  <p className="text-[11px] text-slate-500">Name, Contact number & Store Name required</p>
                </div>
              </div>

              <Link
                href="/dashboard/admin/users"
                className="text-xs font-bold text-[#0B5FA5] hover:underline"
              >
                View All →
              </Link>
            </div>

            {/* Notifications */}
            {custSuccess && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{custSuccess}</span>
                  </div>

                  {lastCreatedCustomer && (
                    <a
                      href={`https://wa.me/91${lastCreatedCustomer.mobile}?text=${encodeURIComponent(
                        `Hello ${lastCreatedCustomer.name}! Your KiranaMart customer account for "${lastCreatedCustomer.storeName}" is activated. Login: https://kiranamart247.com/login`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-3 w-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {custError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-600 animate-in fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{custError}</span>
              </div>
            )}

            {/* Compact Form: 3 Fields only */}
            <form onSubmit={handleAddCustomerSubmit} className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {/* 1. Customer Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                    />
                  </div>
                </div>

                {/* 2. Contact Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      maxLength={10}
                      value={custContactNumber}
                      onChange={(e) => setCustContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. Store Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Store Name *
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gupta Kirana Store"
                      value={custStoreName}
                      onChange={(e) => setCustStoreName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs outline-none focus:border-[#073B6F] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end pt-1">
                <button
                  type="submit"
                  disabled={custSubmitting}
                  className="flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition disabled:opacity-50"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>{custSubmitting ? 'Adding...' : 'Add Customer'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick List: Recently Added Customers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-[#073B6F]" />
                <h3 className="text-sm font-black uppercase tracking-wider text-[#073B6F]">
                  Recent Customer Stores
                </h3>
              </div>

              <Link
                href="/dashboard/admin/users"
                className="text-xs font-bold text-[#0B5FA5] hover:underline"
              >
                Manage All Customers ({recentCustomers.length}) →
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {recentCustomers.slice(0, 5).map((c) => {
                const store = c.customerProfile?.storeName || c.customerProfile?.address || 'Kirana Store';
                return (
                  <div key={c.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5FC] text-[#073B6F] font-bold text-xs">
                        <Store className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{store}</span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.2 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                            {c.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {c.fullName} • {c.mobile} • {c.customerProfile?.city || 'Delhi'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <a
                        href={`https://wa.me/91${c.mobile}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-50"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}

              {recentCustomers.length === 0 && !loadingCustomers && (
                <div className="py-6 text-center text-xs text-slate-400">
                  No customers registered yet. Use the form above to add your first customer.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CUSTOMER DIRECTORY (QUICK ACCESS FOR ADMIN)       */}
      {/* ======================================================== */}
      {isAdmin && activeTab === 'customers' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-[#073B6F]">Customer Directory</h2>
                <p className="text-xs text-slate-500">Overview of registered Kirana store owners</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('add-customer')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0B5FA5] transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Customer</span>
                </button>
                <Link
                  href="/dashboard/admin/users"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>Full Table</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
                  <tr>
                    <th className="px-4 py-3">Store Name</th>
                    <th className="px-4 py-3">Customer Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-[#073B6F]">
                        <div className="flex items-center gap-1.5">
                          <Store className="h-3.5 w-3.5 text-[#39A9E8]" />
                          <span>{c.customerProfile?.storeName || c.customerProfile?.address || 'Kirana Store'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">{c.fullName}</td>
                      <td className="px-4 py-3 text-slate-700">{c.mobile}</td>
                      <td className="px-4 py-3 text-slate-600">{c.customerProfile?.city || 'Delhi'}</td>
                      <td className="px-4 py-3 font-bold text-[#073B6F]">{c._count?.orders || 0}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            c.active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {c.active ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentCustomers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400">
                        No customer accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ADMIN / CUSTOMER PROFILE FORM                     */}
      {/* ======================================================== */}
      {(!isAdmin || activeTab === 'profile') && (
        <>
          {/* Admin Banner with Quick Add Customer Action */}
          {isAdmin && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-[#39A9E8]/30 bg-gradient-to-r from-[#EAF5FC] to-sky-50 p-5 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#073B6F] text-white shadow-sm flex-shrink-0">
                  <UserPlus className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#073B6F]">Customer Store Onboarding</h3>
                  <p className="text-xs text-slate-600">
                    Add new Kirana customer stores directly with Name, Contact number, and Store Name.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('add-customer')}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Add Customer</span>
              </button>
            </div>
          )}

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
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
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
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-[#073B6F] hover:bg-[#EAF5FC] hover:border-[#39A9E8] transition"
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
                href={isAdmin ? '/dashboard/admin' : '/dashboard/customer'}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
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
        </>
      )}
    </main>
  );
}
