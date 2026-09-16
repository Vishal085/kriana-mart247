'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Please enter a message of at least 10 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSuccess(data.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', contact: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Contact Us</span>
      </div>

      <h1 className="mt-4 text-3xl font-black text-[#073B6F]">Contact & Support</h1>
      <p className="mt-1 text-xs text-slate-500">
        Have questions regarding mandi rate benchmarks, bulk orders, or account assistance?
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-[#073B6F]">Get in Touch</h2>

          <div className="flex items-start gap-3 text-xs text-slate-700">
            <Mail className="h-5 w-5 text-[#39A9E8] flex-shrink-0" />
            <div>
              <div className="font-bold">Email Support</div>
              <a href="mailto:support@kiranamart247.com" className="text-slate-500 hover:text-[#0B5FA5]">
                support@kiranamart247.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs text-slate-700">
            <Phone className="h-5 w-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold">WhatsApp &amp; Phone Support</div>
              <a
                href="https://wa.me/918510083082?text=Hello%20KiranaMart%20Support"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#073B6F] hover:underline"
              >
                +91 85100 83082
              </a>
              <div className="text-[11px] text-slate-500">Available Mon-Sat: 7:00 AM - 9:00 PM IST</div>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs text-slate-700">
            <MapPin className="h-5 w-5 text-[#39A9E8] flex-shrink-0" />
            <div>
              <div className="font-bold">Operational Hub</div>
              <div className="text-slate-500">Naya Bazar Wholesale Market, Delhi - 110006, India</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-black text-[#073B6F]">Send a Message</h2>
          
          {success && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>{success}</div>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label htmlFor="name" className="block font-bold text-slate-700 mb-1">Your Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none transition focus:border-[#0B5FA5] focus:bg-white disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block font-bold text-slate-700 mb-1">Mobile / Email</label>
              <input
                id="contact"
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="e.g. 9876543210 or name@example.com"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none transition focus:border-[#0B5FA5] focus:bg-white disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-bold text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist you with bulk ordering, mandi rates, or account support?"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none transition focus:border-[#0B5FA5] focus:bg-white disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B6F] py-3 text-xs font-bold text-white shadow transition hover:bg-[#0B5FA5] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
