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

  // Categories mega menu dropdown
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setCategoriesMenuOpen(false);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

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
    { label: 'Home', href: '/' },
    { label: "Today's Rates", href: '/mandi-rates', icon: TrendingUp, badge: 'LIVE' },
    { label: 'Mandis', href: '/mandis', icon: Store },
    { label: 'Wholesale Shop', href: '/shop', icon: ShoppingBag },
    { label: 'Rate Compare', href: '/compare', icon: Scale },
    { label: 'Deals', href: '/shop?deals=true', icon: Sparkles, highlight: true },
    { label: 'Orders', href: '/dashboard/customer/orders', icon: Package },
  ];

  const featuredMandis = [
    { name: 'Azadpur Mandi', city: 'Delhi', href: '/mandis' },
    { name: 'Narela Mandi', city: 'Delhi', href: '/mandis' },
    { name: 'Ghazipur Mandi', city: 'Delhi', href: '/mandis' },
    { name: 'Okhla Mandi', city: 'Delhi', href: '/mandis' },
    { name: 'Jaipur APMC', city: 'Rajasthan', href: '/mandis' },
  ];

  const featuredCategories = [
    { name: 'Atta, Flours & Grains', icon: '🌾', href: '/shop' },
    { name: 'Edible Oils & Desi Ghee', icon: '🛢️', href: '/shop' },
    { name: 'Dals, Pulses & Besan', icon: '🥣', href: '/shop' },
    { name: 'Spices, Masala & Salt', icon: '🧂', href: '/shop' },
    { name: 'Dairy, Tea & Beverages', icon: '🥛', href: '/shop' },
    { name: 'Packaged Snacks & FMCG', icon: '🍪', href: '/shop' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs">
        {/* TOP MAIN HEADER TIER */}
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
            {/* Left: Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="shrink-0 flex items-center">
                <BrandMark size="md" />
              </Link>
            </div>

            {/* Center: Prominent Professional Search Bar (Cmd+K) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search mandis, commodities, products (Cmd+K)"
                className="group flex w-full h-10 items-center justify-between rounded-full border border-slate-200/90 bg-slate-50/90 px-4 text-xs text-slate-500 shadow-inner hover:border-[#39A9E8] hover:bg-white hover:shadow-xs transition"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-slate-400 group-hover:text-[#073B6F] transition" />
                  <span className="font-normal text-slate-500">Search 1,000+ FMCG groceries, live mandi rates, brands...</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="hidden lg:inline text-[11px] text-slate-400 font-medium">Quick Find</span>
                  <kbd className="inline-flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                    ⌘K
                  </kbd>
                </div>
              </button>
            </div>

            {/* Right Section: Role CTA, Cart, Account, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Open Search"
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              >
                <Search className="h-4 w-4 text-slate-600" />
              </button>

              {/* List Your Product / Seller CTA */}
              {user?.role === 'SHOPKEEPER' ? (
                <Link
                  href="/dashboard/seller/products/new"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#073B6F] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] transition"
                >
                  <Store className="h-3.5 w-3.5 text-[#39A9E8]" />
                  <span>List Product</span>
                </Link>
              ) : user?.role === 'ADMIN' ? (
                <Link
                  href="/dashboard/admin/approvals"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Approvals</span>
                </Link>
              ) : (
                <Link
                  href="/login/seller"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#073B6F]/20 bg-[#EAF5FC] px-3.5 py-2 text-xs font-bold text-[#073B6F] hover:bg-[#d5ecfb] transition"
                >
                  <Store className="h-3.5 w-3.5 text-[#073B6F]" />
                  <span>List Your Product</span>
                </Link>
              )}

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={openDrawer}
                aria-label="Open Cart Drawer"
                className="relative flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-slate-700 transition hover:border-[#39A9E8] hover:bg-white hover:text-[#073B6F]"
              >
                <ShoppingCart className="h-4 w-4 text-[#073B6F]" />
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                {itemCount > 0 && (
                  <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#073B6F] px-1 text-[10px] font-black text-white shadow-xs animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setActiveMenu('main');
                  }}
                  aria-label="User Account"
                  className="flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 overflow-hidden rounded-full border border-slate-200 bg-[#EAF5FC] px-2.5 text-[#073B6F] transition hover:border-[#0B5FA5] focus:outline-hidden"
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
                      <User className="h-4 w-4 text-[#073B6F]" />
                      <span className="hidden md:inline text-xs font-bold text-slate-700">Account</span>
                    </>
                  )}
                  <ChevronDown className="h-3 w-3 text-slate-500" />
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
                          <p className="text-xs font-bold text-slate-800">Welcome to KiranaMart.com</p>
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
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

        {/* SECOND TIER: DEDICATED PROFESSIONAL MENU BAR */}
        <div className="hidden md:block bg-[#073B6F] text-white border-t border-[#0B5FA5]/40 shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
            {/* Left: Mega Categories & Mandis Dropdown + Nav Links */}
            <div className="flex items-center gap-1">
              {/* All Categories & Mandis Mega Menu Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold transition ${
                    categoriesMenuOpen
                      ? 'bg-[#0B5FA5] text-white'
                      : 'hover:bg-[#0B5FA5]/70 text-slate-100'
                  }`}
                  aria-expanded={categoriesMenuOpen}
                >
                  <Menu className="h-4 w-4 text-[#39A9E8]" />
                  <span>All Categories & Mandis</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoriesMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Dropdown Panel */}
                {categoriesMenuOpen && (
                  <div className="absolute left-0 top-full z-50 mt-0 w-[520px] max-w-[90vw] rounded-b-2xl border border-slate-200 bg-white p-4 shadow-2xl text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Column 1: Featured Wholesale Mandis */}
                      <div className="border-r border-slate-100 pr-3">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#073B6F]">
                            Wholesale Mandis
                          </span>
                          <Link
                            href="/mandis"
                            onClick={() => setCategoriesMenuOpen(false)}
                            className="text-[10px] font-bold text-[#0B5FA5] hover:underline"
                          >
                            All 15+ Mandis →
                          </Link>
                        </div>
                        <div className="space-y-1">
                          {featuredMandis.map((m) => (
                            <Link
                              key={m.name}
                              href={m.href}
                              onClick={() => setCategoriesMenuOpen(false)}
                              className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
                            >
                              <span className="font-semibold">{m.name}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{m.city}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100">
                          <Link
                            href="/mandi-rates"
                            onClick={() => setCategoriesMenuOpen(false)}
                            className="flex items-center gap-1.5 text-xs font-bold text-[#72B82A] hover:text-[#5fa020]"
                          >
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>Check Today&apos;s Live Rates</span>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Grocery & FMCG Categories */}
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#073B6F]">
                            Grocery Categories
                          </span>
                          <Link
                            href="/shop"
                            onClick={() => setCategoriesMenuOpen(false)}
                            className="text-[10px] font-bold text-[#0B5FA5] hover:underline"
                          >
                            Full Shop →
                          </Link>
                        </div>
                        <div className="space-y-1">
                          {featuredCategories.map((c) => (
                            <Link
                              key={c.name}
                              href={c.href}
                              onClick={() => setCategoriesMenuOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-[#EAF5FC] hover:text-[#073B6F] transition"
                            >
                              <span>{c.icon}</span>
                              <span className="font-semibold">{c.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100">
                          <Link
                            href="/shop?deals=true"
                            onClick={() => setCategoriesMenuOpen(false)}
                            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>View Today&apos;s Hot Deals</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Menu Bar Links */}
              <nav className="flex items-center gap-0.5 text-xs font-semibold">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2.5 transition border-b-2 ${
                        isActive
                          ? 'border-[#39A9E8] bg-[#0B5FA5]/50 text-white font-bold'
                          : 'border-transparent text-slate-200 hover:text-white hover:bg-[#0B5FA5]/30'
                      }`}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 text-[#39A9E8]" />}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="flex items-center gap-1 rounded bg-[#72B82A] px-1 py-0.5 text-[9px] font-black uppercase text-white tracking-wide">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          {item.badge}
                        </span>
                      )}
                      {item.highlight && (
                        <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[9px] font-black uppercase text-slate-900 tracking-wide">
                          HOT
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Trust & Support Info Badges */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] font-medium text-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="text-[#39A9E8]">⚡</span>
                <span>Express Delivery in Delhi-NCR</span>
              </div>
              <span className="text-white/30">•</span>
              <a
                href="https://wa.me/918510083082"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#39A9E8] hover:text-white hover:underline transition font-bold"
              >
                <span>WhatsApp: +91 8510083082</span>
              </a>
            </div>
          </div>
        </div>

        {/* MOBILE HORIZONTAL QUICK STRIP */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto bg-[#073B6F] px-3 py-2 text-xs scrollbar-none border-t border-[#0B5FA5]/30">
          <Link
            href="/mandi-rates"
            className="flex shrink-0 items-center gap-1 rounded-full bg-[#0B5FA5] px-2.5 py-1 font-bold text-white shadow-xs"
          >
            <TrendingUp className="h-3 w-3 text-[#72B82A]" />
            <span>Mandi Rates</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#72B82A] animate-pulse" />
          </Link>
          <Link
            href="/mandis"
            className="shrink-0 rounded-full px-2.5 py-1 font-medium text-slate-200 hover:bg-[#0B5FA5]/50 hover:text-white"
          >
            Mandis
          </Link>
          <Link
            href="/shop"
            className="shrink-0 rounded-full px-2.5 py-1 font-medium text-slate-200 hover:bg-[#0B5FA5]/50 hover:text-white"
          >
            Wholesale Shop
          </Link>
          <Link
            href="/compare"
            className="shrink-0 rounded-full px-2.5 py-1 font-medium text-slate-200 hover:bg-[#0B5FA5]/50 hover:text-white"
          >
            Compare
          </Link>
          <Link
            href="/shop?deals=true"
            className="shrink-0 rounded-full px-2.5 py-1 font-semibold text-amber-300 hover:bg-[#0B5FA5]/50"
          >
            🔥 Deals
          </Link>
          <Link
            href="/dashboard/customer/orders"
            className="shrink-0 rounded-full px-2.5 py-1 font-medium text-slate-200 hover:bg-[#0B5FA5]/50 hover:text-white"
          >
            Orders
          </Link>
        </div>
      </header>

      {/* Global Spotlight Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start md:hidden">
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

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
