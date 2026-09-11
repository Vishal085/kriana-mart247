import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  Clock,
  Scale,
  ExternalLink,
  Award,
  CheckCircle2,
  FileText,
  BadgeAlert,
} from 'lucide-react';

interface MandiSourcesDisclaimerProps {
  currentMandiName?: string;
  className?: string;
}

export function MandiSourcesDisclaimer({
  currentMandiName,
  className = '',
}: MandiSourcesDisclaimerProps) {
  return (
    <section
      id="mandi-sources-methodology"
      className={`mt-14 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm ${className}`}
      aria-label="Wholesale Mandi Data Sources and Verification Methodology"
    >
      {/* Header with Verified Badge */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% Transparent & Verified Ground Data</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black font-heading text-[#073B6F]">
            Delhi-NCR Mandi Rates — Data Sources & Verification Methodology
          </h2>
          <p className="text-xs md:text-sm text-slate-500 max-w-3xl">
            {currentMandiName ? (
              <>
                All wholesale commodity rates displayed for <strong className="text-slate-800">{currentMandiName}</strong> are sourced directly from statutory APMC auction registers, wholesale trade chambers, and government market intelligence portals.
              </>
            ) : (
              <>
                KiranaMart tracks live wholesale commodity prices across all 16 registered APMC and terminal mandis in Delhi, Ghaziabad, Noida, Greater Noida, Gurugram, Faridabad, and Sonipat through authoritative government feeds and ground market surveys.
              </>
            )}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#EAF5FC] to-sky-50 border border-sky-100 p-3.5 text-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#073B6F] text-white shadow-sm font-black">
            APMC
          </div>
          <div>
            <div className="font-bold text-[#073B6F]">Daily Live Sync</div>
            <div className="text-[11px] text-slate-500">6:30 AM & 1:30 PM IST Daily</div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Data Verification Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Statutory Government & APMC Boards */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-200">
          <div className="flex items-center gap-2 text-[#073B6F]">
            <Building2 className="h-4 w-4 text-[#39A9E8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider">1. Government & APMC Boards</h3>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
            Daily commodity arrivals and floor price bulletins verified from:
          </p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Agmarknet (Govt. of India):</strong> DMI, Ministry of Agriculture & Farmers Welfare.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>DAMB Delhi:</strong> Azadpur, Okhla, Ghazipur, Keshopur, Narela & Najafgarh APMCs.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>UP Mandi Parishad:</strong> Ghaziabad Mandi, Noida Sec-88 & Dadri Mandi Samitis.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>HSAMB Haryana:</strong> Gurugram Khandsa, Faridabad NIT, Ballabhgarh & Sonipat.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Wholesale Trade Chambers & Associations */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-200">
          <div className="flex items-center gap-2 text-[#073B6F]">
            <Award className="h-4 w-4 text-[#39A9E8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider">2. Wholesale Trade Chambers</h3>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
            Cross-referenced with benchmark commercial trading bodies:
          </p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>DGMA (Delhi Grain Merchants Assn):</strong> Naya Bazar benchmark foodgrain & rice daily rate bulletin.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>The Kirana Committee:</strong> Khari Baoli benchmark wholesale spice, dry fruit & oil seed exchange.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>UP & Haryana Vyapar Mandals:</strong> Spot settlement logs from Ghaziabad & Gurugram traders.</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Daily Auction & Survey Schedule */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-200">
          <div className="flex items-center gap-2 text-[#073B6F]">
            <Clock className="h-4 w-4 text-[#39A9E8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider">3. Daily Auction Schedule</h3>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
            Rates are captured in two active daily market sessions:
          </p>
          <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
            <li className="rounded-lg bg-white border border-slate-200/70 p-2">
              <div className="font-bold text-[#073B6F]">Morning Opening Auction (सुबह की डाक)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                06:00 AM – 08:30 AM IST: Primary truck arrivals, fresh lot bidding, and initial modal price determination.
              </div>
            </li>
            <li className="rounded-lg bg-white border border-slate-200/70 p-2">
              <div className="font-bold text-[#073B6F]">Mid-Day Clearance (दोपहर समीक्षा)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                01:00 PM – 02:30 PM IST: Secondary wholesale clearance, bulk wagon releases, and closing settlement rate.
              </div>
            </li>
          </ul>
        </div>

        {/* Card 4: Modal Rate & Pricing Methodology */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-200">
          <div className="flex items-center gap-2 text-[#073B6F]">
            <Scale className="h-4 w-4 text-[#39A9E8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider">4. Pricing Methodology</h3>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
            Scientific, standard computation principles applied:
          </p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Modal Rate (मॉडल भाव):</strong> The volume-weighted price at which maximum bulk quantity changed hands.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>FAQ Grading:</strong> Rates represent Fair Average Quality (FAQ) clean wholesale stock.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Ex-Mandi Net Basis:</strong> Base rates ex-warehouse; statutory APMC user cess (1%) and GST itemized clearly.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Official Government Links & Verified Badges Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700">Official Reference Portals:</span>
          <a
            href="https://agmarknet.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#0B5FA5] transition font-medium"
          >
            <span>Agmarknet GOI</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://damb.delhi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#0B5FA5] transition font-medium"
          >
            <span>DAMB Delhi</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://upmandiparishad.upsdc.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#0B5FA5] transition font-medium"
          >
            <span>UP Mandi Parishad</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://hsamb.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-sky-50 hover:text-[#0B5FA5] transition font-medium"
          >
            <span>HSAMB Haryana</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-400">
          Disclaimer: Mandi rates are indicative wholesale auction prices intended for commercial kirana procurement. Prices are locked upon online checkout with direct shop delivery.
        </div>
      </div>
    </section>
  );
}
