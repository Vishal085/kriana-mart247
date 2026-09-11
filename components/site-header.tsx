'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Scale,
  Sparkles,
  Package,
  Settings,
  Globe,
  Check,
  ChevronRight,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { BrandMark } from './brand-mark';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { GlobalSearchModal } from './search/GlobalSearchModal';
import { MandiSelector } from './mandis/MandiSelector';

const LANGUAGES = [
  { id: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'hinglish', label: 'Hinglish', native: 'Hinglish', flag: '🇮🇳' },
];

export function SiteHeader() {
  const { user, logout } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
        setActiveMenu('main');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initials for avatar
  const getInitials = () => {
    if (!user || !user.fullName) return 'U';
    const parts = user.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const navLinks = [
    { label: "Today's Rates", href: '/mandi-rates', icon: TrendingUp },
    { label: 'Wholesale', href: '/shop', icon: ShoppingBag },
    { label: 'Deals', href: '/shop?deals=true', icon: Sparkles },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
          {/* Left: Brand Logo + Mandi Selector + Desktop Nav */}
          <div className="flex items-center gap-3 2xl:gap-5 shrink-0">
            <Link href="/" className="shrink-0 flex items-center">
              <BrandMark size="md" />
            </Link>

            {/* Desktop Mandi Selector */}
            <div className="hidden md:flex items-center shrink-0">
              <MandiSelector variant="header" />
            </div>

            {/* Desktop Navigation Links (Clean 3 options) */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-700">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap transition py-1.5 px-2.5 rounded-lg ${
                      isActive
                        ? 'text-[#073B6F] bg-[#EAF5FC] font-black'
                        : 'hover:text-[#0B5FA5] hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Role CTA, Smart Search, Cart Drawer Button, Profile, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Mobile Mandi Selector */}
            <div className="md:hidden flex items-center">
              <MandiSelector variant="compact" />
            </div>

            {/* Admin shortcut if logged in */}
            {user?.role === 'ADMIN' && (
              <Link
                href="/dashboard/admin/approvals"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-1.5 text-xs font-black text-white shadow-xs hover:bg-amber-600 transition"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Approvals</span>
              </Link>
            )}

            {/* Search Trigger Button with Cmd+K */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Open Search (Cmd+K)"
              className="flex h-9 w-9 sm:w-auto items-center justify-center sm:justify-start gap-2 rounded-full border border-slate-200 bg-slate-50/90 px-2.5 sm:px-3 text-xs text-slate-500 hover:border-[#39A9E8] hover:bg-white transition shrink-0"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline 2xl:hidden font-medium">Search...</span>
              <span className="hidden 2xl:inline font-medium">Search mandis, commodities...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={openDrawer}
              aria-label="Open Cart Drawer"
              className="relative flex h-9 items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 sm:px-3 text-slate-700 transition hover:border-[#39A9E8] hover:bg-white hover:text-[#073B6F]"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-bold font-heading">Cart</span>
              {itemCount > 0 && (
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#073B6F] px-1 text-[10px] font-black text-white shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setActiveMenu('main');
                }}
                aria-label="User Account"
                className="flex h-9 items-center gap-1.5 overflow-hidden rounded-full border border-slate-200 bg-[#EAF5FC] px-2 text-[#073B6F] transition hover:border-[#0B5FA5] focus:outline-hidden"
              >
                {user ? (
                  <>
                    <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#073B6F] text-[10px] font-black text-white">
                      {getInitials()}
                    </div>
                    <span className="hidden md:inline text-xs font-bold max-w-[80px] truncate">
                      {user.fullName.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 text-slate-600" />
                    <span className="hidden md:inline text-xs font-bold text-slate-700">Account</span>
                  </>
                )}
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                  {activeMenu === 'main' && (
                    <div>
                      {user ? (
                        <div className="border-b border-slate-100 px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#073B6F] text-xs font-bold text-white">
                              {getInitials()}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="truncate text-xs font-bold text-slate-800">{user.fullName}</p>
                              <p className="truncate text-[10px] text-slate-400">{user.email || user.mobile}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="border-b border-slate-100 p-2.5 text-center">
                          <p className="text-xs font-bold text-slate-800">Welcome to KiranaMart</p>
                          <p className="text-[10px] text-slate-500 mb-2">Access wholesale pricing & order tracking</p>
                          <Link
                            href="/login/customer"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="block w-full rounded-xl bg-[#073B6F] py-2 text-xs font-bold text-white hover:bg-[#0B5FA5] transition"
                          >
                            Customer Login
                          </Link>
                          <Link
                            href="/login/seller"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="mt-1.5 block w-full rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                          >
                            Shopkeeper / Seller Login
                          </Link>
                        </div>
                      )}

                      <div className="py-1 text-xs">
                        {user && user.role === 'SHOPKEEPER' && (
                          <>
                            <Link
                              href="/dashboard/seller"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                              <Store className="h-4 w-4 text-[#39A9E8]" />
                              <span>Seller Dashboard</span>
                            </Link>
                            <Link
                              href="/dashboard/seller/products/new"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-bold text-[#073B6F] hover:bg-blue-50 transition"
                            >
                              <Sparkles className="h-4 w-4 text-[#39A9E8]" />
                              <span>List Your Product</span>
                            </Link>
                            <Link
                              href="/dashboard/seller/products"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                              <Package className="h-4 w-4 text-slate-500" />
                              <span>My Listed Products</span>
                            </Link>
                          </>
                        )}

                        {user && user.role === 'ADMIN' && (
                          <>
                            <Link
                              href="/dashboard/admin"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                            >
                              <Shield className="h-4 w-4 text-[#39A9E8]" />
                              <span>Admin Console</span>
                            </Link>
                            <Link
                              href="/dashboard/admin/approvals"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-bold text-amber-700 hover:bg-amber-50 transition"
                            >
                              <Check className="h-4 w-4 text-amber-600" />
                              <span>Product Approvals</span>
                            </Link>
                          </>
                        )}

                        {user && user.role === 'CUSTOMER' && (
                          <Link
                            href="/dashboard/customer"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                          >
                            <User className="h-4 w-4 text-slate-500" />
                            <span>My Dashboard</span>
                          </Link>
                        )}

                        <Link
                          href="/dashboard/customer/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                          <Package className="h-4 w-4 text-slate-500" />
                          <span>My Orders</span>
                        </Link>

                        <button
                          onClick={() => setActiveMenu('language')}
                          className="w-full flex items-center justify-between rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <Globe className="h-4 w-4 text-slate-500" />
                            <span>Language</span>
                          </div>
                          <span className="text-[11px] font-bold text-[#0B5FA5]">
                            {LANGUAGES.find((l) => l.id === selectedLanguage)?.native}
                          </span>
                        </button>
                      </div>

                      {user && (
                        <div className="border-t border-slate-100 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeMenu === 'language' && (
                    <div>
                      <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-xs font-bold text-slate-800">
                        <button onClick={() => setActiveMenu('main')} className="p-1 hover:bg-slate-100 rounded">
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                        <span>Select Language</span>
                      </div>
                      <div className="p-1">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => {
                              handleLanguageChange(lang.id);
                              setActiveMenu('main');
                            }}
                            className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium hover:bg-slate-50 transition"
                          >
                            <span>
                              {lang.flag} {lang.native}
                            </span>
                            {selectedLanguage === lang.id && <Check className="h-4 w-4 text-emerald-600" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="xl:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Spotlight Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start xl:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative z-10 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <BrandMark size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Mobile Mandi Selector inside drawer */}
              <div className="rounded-2xl bg-slate-50 p-2.5 border border-slate-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
                  Active Mandi Hub
                </div>
                <MandiSelector variant="hero" />
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-500 mb-4"
              >
                <Search className="h-4 w-4" />
                <span>Search mandis, commodities...</span>
              </button>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl p-3 text-xs font-bold transition ${
                        isActive
                          ? 'bg-[#EAF5FC] text-[#073B6F]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4 text-[#39A9E8]" />}
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Role CTA */}
              <div className="pt-2">
                {user?.role === 'SHOPKEEPER' ? (
                  <Link
                    href="/dashboard/seller/products/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-xs font-black text-white shadow-xs"
                  >
                    <Store className="h-4 w-4 text-[#39A9E8]" />
                    <span>List Your Product</span>
                  </Link>
                ) : user?.role === 'ADMIN' ? (
                  <Link
                    href="/dashboard/admin/approvals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-black text-white shadow-xs"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Product Approvals</span>
                  </Link>
                ) : (
                  <Link
                    href="/login/seller"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#073B6F]/30 bg-[#EAF5FC] py-2.5 text-xs font-bold text-[#073B6F]"
                  >
                    <Store className="h-4 w-4" />
                    <span>List Your Product (Seller Portal)</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 p-4 bg-[#F8FAFC]">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    <div className="font-bold text-slate-800">{user.fullName}</div>
                    <div className="text-[10px] text-slate-400">{user.email || user.mobile}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login/customer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-xl bg-[#073B6F] py-2 text-xs font-bold text-white shadow"
                  >
                    Customer Login
                  </Link>
                  <Link
                    href="/login/seller"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Shopkeeper / Seller Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
