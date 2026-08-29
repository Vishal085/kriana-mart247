'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Shield,
  LogOut,
  TrendingUp,
  Store,
  ShoppingBag,
  Settings,
  Globe,
  Check,
  Package,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { BrandMark } from './brand-mark';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'hinglish', label: 'Hinglish', native: 'Hinglish', flag: '🇮🇳' },
];

export function SiteHeader() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Profile dropdown & Settings subview
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'main' | 'settings' | 'language'>('main');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('km_language');
    if (savedLang) {
      setSelectedLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId);
    localStorage.setItem('km_language', langId);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
        setActiveMenu('main');
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Initials for avatar
  const getInitials = () => {
    if (!user || !user.fullName) return 'U';
    const parts = user.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-[#073B6F] px-4 py-1.5 text-center text-[11px] font-semibold text-white">
        <span className="opacity-90">Daily Kirana Mandi Rates & Wholesale Intelligence</span>
        <span className="mx-2 text-[#39A9E8]">•</span>
        <span className="text-[#72B82A]">Live APMC & Mandi Market Tracking</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        {/* Left Section: Brand Logo + Nav Links (Mandi Rates, Mandis, Shop) + Compact Search Icon */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Official Brand Logo */}
          <Link href="/" className="flex-shrink-0">
            <BrandMark size="md" />
          </Link>

          {/* Desktop Navigation Links placed on Left */}
          <nav className="hidden items-center gap-6 text-xs font-bold text-slate-700 lg:flex">
            <Link
              href="/mandi-rates"
              className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
            >
              <TrendingUp className="h-4 w-4 text-[#39A9E8]" />
              <span>Mandi Rates</span>
            </Link>

            <Link
              href="/mandis"
              className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
            >
              <Store className="h-4 w-4 text-[#39A9E8]" />
              <span>Mandis</span>
            </Link>

            <Link
              href="/shop"
              className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
            >
              <ShoppingBag className="h-4 w-4 text-[#39A9E8]" />
              <span>Shop</span>
            </Link>

            {/* Compact Search Icon button placed directly after Shop */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Open Search"
                title="Search products, brands or mandis"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  searchOpen
                    ? 'border-[#0B5FA5] bg-[#EAF5FC] text-[#073B6F]'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#39A9E8] hover:text-[#073B6F]'
                }`}
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              {/* Compact Search Popup when icon is clicked */}
              {searchOpen && (
                <div className="absolute left-0 top-10 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                  <form onSubmit={handleSearch} className="flex items-center gap-1.5">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products, mandis..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-[#073B6F] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0B5FA5]"
                    >
                      Go
                    </button>
                  </form>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Section: Cart, Circular Profile with Settings & Language */}
        <div className="flex items-center gap-3">
          {/* Cart Icon with Live Count */}
          <Link
            href="/cart"
            aria-label="View Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-[#39A9E8] hover:text-[#073B6F]"
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#073B6F] px-1 text-[10px] font-black text-white shadow">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Circular Profile Trigger & Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setActiveMenu('main');
              }}
              aria-label="User Profile and Settings"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#EAF5FC] text-[#073B6F] transition hover:scale-105 hover:border-[#0B5FA5] focus:outline-none shadow-xs"
            >
              {user ? (
                user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName} className="h-full w-full object-cover" />
                ) : user.role === 'ADMIN' ? (
                  <Shield className="h-4 w-4 text-[#073B6F]" />
                ) : (
                  <span className="text-xs font-black text-[#073B6F]">{getInitials()}</span>
                )
              ) : (
                <User className="h-4 w-4 text-slate-600" />
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                {/* View 1: Main Profile Menu */}
                {activeMenu === 'main' && (
                  <div>
                    {user ? (
                      <div className="border-b border-slate-100 px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#073B6F] text-xs font-bold text-white flex-shrink-0">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt={user.fullName} className="h-full w-full object-cover" />
                            ) : (
                              getInitials()
                            )}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="truncate text-xs font-bold text-slate-800">
                              {user.fullName}
                            </p>
                            <p className="truncate text-[10px] text-slate-400">
                              {user.email || user.mobile}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#EAF5FC] px-2 py-0.5 text-[10px] font-bold text-[#073B6F]">
                          {user.role === 'ADMIN' ? '🛡️ Admin Account' : '👤 Customer Account'}
                        </div>
                      </div>
                    ) : (
                      <div className="border-b border-slate-100 p-2 text-center">
                        <p className="text-xs font-bold text-slate-800">Welcome to KiranaMart247</p>
                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          <Link
                            href="/login/customer"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="rounded-xl border border-slate-200 py-1.5 text-center text-xs font-bold text-[#073B6F] hover:bg-slate-50"
                          >
                            Login
                          </Link>
                          <Link
                            href="/register/customer"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="rounded-xl bg-[#073B6F] py-1.5 text-center text-xs font-bold text-white hover:bg-[#0B5FA5]"
                          >
                            Register
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="py-1 text-xs">
                      {user && (
                        <>
                          {user.role === 'ADMIN' && (
                            <Link
                              href="/dashboard/admin"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-50 hover:text-[#073B6F]"
                            >
                              <Shield className="h-4 w-4 text-[#39A9E8]" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}

                          <Link
                            href="/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-50 hover:text-[#073B6F]"
                          >
                            <User className="h-4 w-4 text-[#72B82A]" />
                            <span>Profile</span>
                          </Link>

                          {user.role !== 'ADMIN' && (
                            <Link
                              href="/dashboard/customer/orders"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-50 hover:text-[#073B6F]"
                            >
                              <Package className="h-4 w-4 text-[#39A9E8]" />
                              <span>My Orders</span>
                            </Link>
                          )}
                        </>
                      )}

                      {/* Settings Option with Submenu Trigger */}
                      <button
                        onClick={() => setActiveMenu('settings')}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-50 hover:text-[#073B6F]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Settings className="h-4 w-4 text-[#39A9E8]" />
                          <span>Settings</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                    </div>

                    {user && (
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* View 2: Settings Menu */}
                {activeMenu === 'settings' && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 px-2 py-2">
                      <button
                        onClick={() => setActiveMenu('main')}
                        className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-bold text-slate-800">Settings</span>
                    </div>

                    <div className="py-1 text-xs">
                      {/* Language Option */}
                      <button
                        onClick={() => setActiveMenu('language')}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-slate-50 hover:text-[#073B6F]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Globe className="h-4 w-4 text-[#39A9E8]" />
                          <div className="text-left">
                            <p className="font-semibold">Language</p>
                            <p className="text-[10px] text-slate-400">
                              {LANGUAGES.find((l) => l.id === selectedLanguage)?.label || 'English'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* View 3: Language Change Submenu */}
                {activeMenu === 'language' && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-slate-100 px-2 py-2">
                      <button
                        onClick={() => setActiveMenu('settings')}
                        className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-bold text-slate-800">Select Language</span>
                    </div>

                    <div className="space-y-1 py-2 text-xs">
                      {LANGUAGES.map((lang) => {
                        const isSelected = selectedLanguage === lang.id;
                        return (
                          <button
                            key={lang.id}
                            onClick={() => handleLanguageChange(lang.id)}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 transition ${
                              isSelected
                                ? 'bg-[#EAF5FC] font-bold text-[#073B6F]'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.native}</span>
                              <span className="text-[10px] text-slate-400">({lang.label})</span>
                            </div>
                            {isSelected && <Check className="h-4 w-4 text-[#0B5FA5]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle (Visible only on small mobile screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Slide-Over Drawer Menu (Opened by 3-Line Menu Button) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Sliding Side Drawer Container */}
          <div className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <BrandMark size="sm" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close Menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Box */}
            <div className="p-4 pb-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products, mandis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Links List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 text-xs font-bold text-slate-700">
              <span className="block px-2 pt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Market Intelligence
              </span>
              <Link
                href="/mandi-rates"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="h-4 w-4 text-[#39A9E8]" />
                  <span>Today&apos;s Mandi Rates</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link
                href="/mandis"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <div className="flex items-center gap-2.5">
                  <Store className="h-4 w-4 text-[#39A9E8]" />
                  <span>Mandi Directory</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-4 w-4 text-[#39A9E8]" />
                  <span>Kirana Shop</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="h-4 w-4 text-[#39A9E8]" />
                  <span>My Cart</span>
                </div>
                {itemCount > 0 ? (
                  <span className="rounded-full bg-[#073B6F] px-2 py-0.5 text-[10px] font-black text-white">
                    {itemCount}
                  </span>
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                )}
              </Link>

              <span className="block px-2 pt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Support & Contact
              </span>
              <a
                href="https://wa.me/918510083082?text=Hello%20KiranaMart"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-emerald-50 text-emerald-700 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#25D366] animate-ping" />
                  <span>WhatsApp Live Support</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Online</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <span>Contact Us</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
              >
                <span>About KiranaMart247</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>

            {/* Drawer Footer Account Section */}
            <div className="border-t border-slate-100 p-4 bg-slate-50/70">
              {user ? (
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Logged in as <span className="font-bold text-slate-800">{user.fullName}</span>
                  </div>
                  {user.role === 'ADMIN' ? (
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white shadow-sm"
                    >
                      <Shield className="h-4 w-4" /> Admin Console
                    </Link>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/dashboard/customer/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-[#073B6F] py-2 text-xs font-bold text-white"
                      >
                        <Package className="h-3.5 w-3.5" /> Orders
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-[#073B6F]"
                      >
                        <User className="h-3.5 w-3.5" /> Profile
                      </Link>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login/customer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-[#073B6F]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-slate-800 py-2 text-xs font-bold text-white"
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
