import Link from 'next/link';
import { ChevronRight, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
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
              <div className="text-slate-500">support@kiranamart247.com</div>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs text-slate-700">
            <Phone className="h-5 w-5 text-[#25D366] flex-shrink-0" />
            <div>
              <div className="font-bold">WhatsApp & Phone Support</div>
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
          <form className="mt-4 space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700">Your Name</label>
              <input type="text" placeholder="Full name" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-[#0B5FA5]" />
            </div>
            <div>
              <label className="font-bold text-slate-700">Mobile / Email</label>
              <input type="text" placeholder="Contact details" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-[#0B5FA5]" />
            </div>
            <div>
              <label className="font-bold text-slate-700">Message</label>
              <textarea rows={3} placeholder="How can we assist you?" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 outline-none focus:border-[#0B5FA5]" />
            </div>
            <button type="button" className="w-full rounded-xl bg-[#073B6F] py-2.5 text-xs font-bold text-white shadow hover:bg-[#0B5FA5]">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
