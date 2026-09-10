'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductImageUploader, UploadedImage } from '@/components/seller/ProductImageUploader';
import {
  PackagePlus,
  ArrowLeft,
  Save,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Store,
  Tag,
  DollarSign,
  FileText,
  Boxes,
} from 'lucide-react';

export default function NewProductListingPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [mandis, setMandis] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    subCategoryName: '',
    brand: '',
    brandId: '',
    unit: '',
    weight: '',
    mrp: '',
    retailPrice: '',
    wholesalePrice: '',
    minimumQuantity: '1',
    stockQuantity: '100',
    sku: '',
    mandi: '',
    location: 'Delhi NCR',
    shopName: '',
    shopAddress: '',
    deliveryAvailability: 'Same Day Dispatch',
    productTags: '',
    gstPercent: '5',
    expiryDate: '',
    description: '',
  });

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [catRes, brandRes, mandiRes, sellerRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands'),
          fetch('/api/mandis'),
          fetch('/api/auth/me'),
        ]);

        if (catRes.ok) {
          const c = await catRes.json();
          setCategories(c.categories || c);
          if (c.categories?.[0]?.id) {
            setFormData((prev) => ({ ...prev, categoryId: c.categories[0].id }));
          }
        }
        if (brandRes.ok) {
          const b = await brandRes.json();
          setBrands(b.brands || b);
        }
        if (mandiRes.ok) {
          const m = await mandiRes.json();
          setMandis(m.mandis || m);
        }
        if (sellerRes.ok) {
          const s = await sellerRes.json();
          if (s.user?.shopkeeperProfile) {
            setFormData((prev) => ({
              ...prev,
              shopName: s.user.shopkeeperProfile.shopName || '',
              shopAddress: s.user.shopkeeperProfile.shopAddress || '',
              location: s.user.shopkeeperProfile.city || 'Delhi',
            }));
          }
        }
      } catch (err) {
        console.error('Failed loading metadata:', err);
      }
    }
    loadMeta();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (actionType: 'DRAFT' | 'SUBMIT') => {
    setError(null);
    setSuccessMsg(null);

    if (actionType === 'SUBMIT') {
      if (!formData.name.trim()) {
        setError('Please enter the Product Name.');
        return;
      }
      if (!formData.categoryId) {
        setError('Please select a Category.');
        return;
      }
      if (!formData.unit.trim()) {
        setError('Please specify Pack Size / Unit (e.g. 150g Bar, 1kg Pouch).');
        return;
      }
      if (!formData.retailPrice || isNaN(Number(formData.retailPrice))) {
        setError('Please enter a valid Selling Price.');
        return;
      }
      if (images.length === 0) {
        setError('Please upload at least one product packaging image.');
        return;
      }
      setSubmitting(true);
    } else {
      setDrafting(true);
    }

    try {
      const payload = {
        ...formData,
        actionType,
        images,
        retailPrice: formData.retailPrice ? parseFloat(formData.retailPrice) : 0,
        mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
        wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : undefined,
        minimumQuantity: parseInt(formData.minimumQuantity || '1', 10),
        stockQuantity: parseInt(formData.stockQuantity || '50', 10),
        gstPercent: formData.gstPercent ? parseFloat(formData.gstPercent) : undefined,
        productTags: formData.productTags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to process product listing.');
      }

      setSuccessMsg(json.message);
      setTimeout(() => {
        router.push('/dashboard/seller/products');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSubmitting(false);
      setDrafting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/seller/products"
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 transition shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-900">List Your Product</h1>
            <p className="text-xs text-slate-500">Create a new FMCG product listing for kirana buyers</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={drafting || submitting}
            onClick={() => handleSave('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            {drafting ? 'Saving Draft...' : 'Save Draft'}
          </button>
          <button
            type="button"
            disabled={submitting || drafting}
            onClick={() => handleSave('SUBMIT')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#0B5FA5] disabled:opacity-50 transition"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? 'Submitting...' : 'Submit for Approval'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Form + Live Card Preview */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Form Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Section 1: Basic Information */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> 1. Basic Product Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Product Title / Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Parle-G Glucose Biscuits (₹10 Daily Pack - 110g)"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Subcategory (Optional)</label>
                  <input
                    type="text"
                    name="subCategoryName"
                    value={formData.subCategoryName}
                    onChange={handleChange}
                    placeholder="e.g. Glucose Biscuits, Washing Powder"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Brand Name</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Parle, Amul, Tata, MDH"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">SKU / Product Code</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Leave empty for auto-generated code"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 uppercase focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Packaging Images */}
          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <Boxes className="h-4 w-4" /> 2. Packaging Images
            </h2>
            <ProductImageUploader images={images} onChange={setImages} maxImages={4} />
          </div>

          {/* Section 3: Pack Size & Pricing */}
          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" /> 3. Pack Size & Wholesale Pricing
            </h2>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Pack Size / Unit <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="e.g. 150g Bar, 1kg Bag, 500ml Bottle"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Weight Specification</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. Net Wt 150g, Gross 160g"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Maximum Retail Price (MRP)</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleChange}
                      placeholder="12.00"
                      className="w-full rounded-xl border border-slate-200 pl-7 pr-3 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Selling Price (Retail) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      name="retailPrice"
                      value={formData.retailPrice}
                      onChange={handleChange}
                      placeholder="10.00"
                      className="w-full rounded-xl border border-slate-200 pl-7 pr-3 py-2.5 text-xs text-slate-800 font-bold focus:border-[#39A9E8] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Wholesale Price (5+ Units)</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      name="wholesalePrice"
                      value={formData.wholesalePrice}
                      onChange={handleChange}
                      placeholder="9.00"
                      className="w-full rounded-xl border border-slate-200 pl-7 pr-3 py-2.5 text-xs text-emerald-700 font-bold focus:border-[#39A9E8] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Min Order Qty (MOQ)</label>
                  <input
                    type="number"
                    min="1"
                    name="minimumQuantity"
                    value={formData.minimumQuantity}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Available Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">GST % Rate</label>
                  <select
                    name="gstPercent"
                    value={formData.gstPercent}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  >
                    <option value="0">0% (Exempt)</option>
                    <option value="5">5% (Essential Food)</option>
                    <option value="12">12% (Packaged FMCG)</option>
                    <option value="18">18% (Standard Detergent/Cleaning)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Shop Location & Merchant Info */}
          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <Store className="h-4 w-4" /> 4. Merchant & Dispatch Info
            </h2>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Shop / Firm Name</label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    placeholder="e.g. Gupta Kirana Store"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Mandi / Hub</label>
                  <select
                    name="mandi"
                    value={formData.mandi}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  >
                    <option value="">Select Nearest Wholesale Mandi</option>
                    {mandis.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Shop Address / Pickup Location</label>
                <input
                  type="text"
                  name="shopAddress"
                  value={formData.shopAddress}
                  onChange={handleChange}
                  placeholder="e.g. Shop 14, Main Mandi Gate, Azadpur"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Delivery Availability</label>
                  <select
                    name="deliveryAvailability"
                    value={formData.deliveryAvailability}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  >
                    <option value="Same Day Dispatch">Same Day Dispatch</option>
                    <option value="24 Hours Dispatch">24 Hours Dispatch</option>
                    <option value="2-3 Days Dispatch">2-3 Days Dispatch</option>
                    <option value="Self Pickup at Mandi">Self Pickup at Mandi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Best Before / Expiry (Optional)</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="e.g. 6 Months from Mfd, Dec 2026"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Description & Tags */}
          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <Tag className="h-4 w-4" /> 5. Merchant Description & Tags
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Product Description (Your Notes)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this product, quality, flavor, or pack details. Our AI will tune this into a standardized catalog description."
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Search Tags (Comma separated)</label>
                <input
                  type="text"
                  name="productTags"
                  value={formData.productTags}
                  onChange={handleChange}
                  placeholder="e.g. biscuit, daily tea snack, parle, pocket pack"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Customer Preview Card Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-black text-slate-900">Live Customer Preview</span>
              <span className="rounded-md bg-sky-50 text-[10px] font-bold text-sky-700 px-2 py-0.5 border border-sky-200">
                Card Preview
              </span>
            </div>

            {/* Rendered Mock ProductCard Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase tracking-tight">
                  Pocket Pack
                </span>
              </div>

              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <img
                  src={images[0]?.url || '/products/placeholder.svg'}
                  alt="Product preview"
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="uppercase tracking-wider text-[#0B5FA5] truncate max-w-[120px]">
                  {formData.brand || 'Kirana Brand'}
                </span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600 shrink-0">
                  {formData.unit || '1 Pack'}
                </span>
              </div>

              <h3 className="mt-1 text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                {formData.name || 'Product Title Appears Here'}
              </h3>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-slate-900">
                      ₹{parseFloat(formData.retailPrice || '0').toFixed(2)}
                    </span>
                    {formData.mrp && parseFloat(formData.mrp) > parseFloat(formData.retailPrice || '0') && (
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{parseFloat(formData.mrp).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {formData.wholesalePrice && (
                    <div className="text-[10px] text-emerald-700 font-bold tracking-tight">
                      ₹{parseFloat(formData.wholesalePrice).toFixed(2)} in 5+ bulk lot
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-[#073B6F] px-3 py-1.5 text-xs font-black text-[#073B6F]">
                  ADD +
                </div>
              </div>
            </div>

            {/* AI Assistance Promo */}
            <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50/70 p-3 text-[11px] text-purple-900 space-y-1">
              <div className="flex items-center gap-1 font-bold text-purple-800">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" /> AI Description Ready
              </div>
              <p className="text-purple-700 leading-snug">
                When you click Submit, Xyon AI automatically creates highlights, short descriptions, and searchable tags for administrative approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
