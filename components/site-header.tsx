'use client';

import React, { useState } from 'react';
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
  Bell,
} from 'lucide-react';
import { BrandMark } from './brand-mark';
import { MandiSelector } from './mandis/MandiSelector';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export function SiteHeader() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
        {/* Official Brand Logo */}
        <Link href="/" className="flex-shrink-0">
          <BrandMark size="md" />
        </Link>

        {/* Global Live Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-md items-center md:flex"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, brands or mandis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-800 outline-none transition focus:border-[#0B5FA5] focus:bg-white"
            />
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 text-xs font-bold text-slate-700 lg:flex">
          <Link
            href="/mandi-rates"
            className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
          >
            <TrendingUp className="h-4 w-4 text-[#39A9E8]" />
            Mandi Rates
          </Link>
          <Link
            href="/mandis"
            className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
          >
            <Store className="h-4 w-4 text-[#39A9E8]" />
            Mandis
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-1.5 transition hover:text-[#0B5FA5]"
          >
            <ShoppingBag className="h-4 w-4 text-[#39A9E8]" />
            Shop
          </Link>
        </nav>

        {/* Right Section: Mandi Selector, Cart, User Auth */}
        <div className="flex items-center gap-3">
          {/* Mandi Selector */}
          <MandiSelector />

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

          {/* User Account / Auth Dropdown */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/customer'}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#EAF5FC] px-3 py-1.5 text-xs font-bold text-[#073B6F] hover:bg-white"
              >
                {user.role === 'ADMIN' ? (
                  <Shield className="h-3.5 w-3.5 text-[#073B6F]" />
                ) : (
                  <User className="h-3.5 w-3.5 text-[#0B5FA5]" />
                )}
                <span className="max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                title="Logout"
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login/customer"
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#073B6F] transition hover:border-[#0B5FA5]"
              >
                Login
              </Link>
              <Link
                href="/register/customer"
                className="rounded-full bg-[#073B6F] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#0B5FA5]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, mandis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs"
              />
            </div>
          </form>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <Link
              href="/mandi-rates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F]"
            >
              <TrendingUp className="h-4 w-4 text-[#39A9E8]" /> Today&apos;s Mandi Rates
            </Link>
            <Link
              href="/mandis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F]"
            >
              <Store className="h-4 w-4 text-[#39A9E8]" /> Mandi Directory
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F]"
            >
              <ShoppingBag className="h-4 w-4 text-[#39A9E8]" /> Kirana Shop
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl p-2.5 hover:bg-[#EAF5FC] hover:text-[#073B6F]"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-[#39A9E8]" /> My Cart
              </div>
              {itemCount > 0 && (
                <span className="rounded-full bg-[#073B6F] px-2 py-0.5 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/customer'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white"
                >
                  <User className="h-4 w-4" /> Go to {user.role === 'ADMIN' ? 'Admin' : 'Customer'} Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-600"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login/customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2 text-xs font-bold text-[#073B6F]"
                >
                  Customer Login
                </Link>
                <Link
                  href="/login/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-slate-800 py-2 text-xs font-bold text-white"
                >
                  Admin Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
