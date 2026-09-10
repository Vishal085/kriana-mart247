'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
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
  Clock,
  AlertTriangle,
  History,
  Lock,
} from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [mandis, setMandis] = useState<any[]>([]);
  const [originalProduct, setOriginalProduct] = useState<any>(null);

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
    async function loadData() {
      if (!productId) return;
      setLoading(true);
      try {
        const [catRes, brandRes, mandiRes, prodRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands'),
          fetch('/api/mandis'),
          fetch(`/api/seller/products/${productId}`),
        ]);

        if (catRes.ok) {
          const c = await catRes.json();
          setCategories(c.categories || c);
        }
        if (brandRes.ok) {
          const b = await brandRes.json();
          setBrands(b.brands || b);
        }
        if (mandiRes.ok) {
          const m = await mandiRes.json();
          setMandis(m.mandis || m);
        }

        if (prodRes.ok) {
          const { product } = await prodRes.json();
          setOriginalProduct(product);

          // Populate form
          setFormData({
            name: product.name || '',
            categoryId: product.categoryId || '',
            subCategoryName: product.subCategoryName || '',
            brand: product.brand?.name || product.brand || '',
            brandId: product.brandId || '',
            unit: product.unit || '',
            weight: product.weight || '',
            mrp: product.mrp ? String(product.mrp) : '',
            retailPrice: product.retailPrice ? String(product.retailPrice) : '',
            wholesalePrice: product.wholesalePrice ? String(product.wholesalePrice) : '',
            minimumQuantity: String(product.minimumQuantity || '1'),
            stockQuantity: String(product.stockQuantity || '100'),
            sku: product.sku || '',
            mandi: product.mandi || '',
            location: product.location || 'Delhi NCR',
            shopName: product.shopName || '',
            shopAddress: product.shopAddress || '',
            deliveryAvailability: product.deliveryAvailability || 'Same Day Dispatch',
            productTags: Array.isArray(product.productTags)
              ? product.productTags.join(', ')
              : product.productTags || '',
            gstPercent: product.gstPercent ? String(product.gstPercent) : '5',
            expiryDate: product.expiryDate || '',
            description: product.description || '',
          });

          // Populate images
          if (product.images && Array.isArray(product.images)) {
            const mappedImages: UploadedImage[] = product.images.map((img: any, idx: number) => {
              if (typeof img === 'string') {
                return {
                  id: `img-${idx}`,
                  url: img,
                  name: `Image ${idx + 1}`,
                  size: 0,
                  isPrimary: idx === 0,
                };
              }
              return {
                id: img.id || `img-${idx}`,
                url: img.url || img.imageUrl,
                name: img.name || `Image ${idx + 1}`,
                size: img.size || 0,
                isPrimary: img.isPrimary ?? idx === 0,
              };
            });
            setImages(mappedImages);
          }
        } else {
          const errJson = await prodRes.json();
          setError(errJson.error || 'Failed to load product details');
        }
      } catch (err: any) {
        console.error('Failed loading product:', err);
        setError(err.message || 'Network error loading product');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPendingReview = originalProduct?.status === 'PENDING_REVIEW';

  const handleSave = async (actionType: 'DRAFT' | 'SUBMIT') => {
    if (isPendingReview) {
      setError('This product is under review by the Admin. You cannot edit it until review completes.');
      return;
    }

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
        actionType: actionType === 'SUBMIT' ? 'SUBMIT' : 'SAVE_DRAFT',
        images,
        retailPrice: formData.retailPrice ? parseFloat(formData.retailPrice) : 0,
        mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
        wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : undefined,
        minimumQuantity: parseInt(formData.minimumQuantity || '1', 10),
        stockQuantity: parseInt(formData.stockQuantity || '50', 10),
        gstPercent: formData.gstPercent ? parseFloat(formData.gstPercent) : undefined,
        productTags: formData.productTags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch(`/api/seller/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to update product listing.');
      }

      setSuccessMsg(json.message || 'Product updated successfully.');
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

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading product listing...</p>
        </div>
      </div>
    );
  }

  const primaryImage = images.find((i) => i.isPrimary)?.url || images[0]?.url;
  const currentCategory = categories.find((c) => c.id === formData.categoryId)?.name || 'Category';

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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">Edit Product Listing</h1>
              {originalProduct?.status && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    originalProduct.status === 'PUBLISHED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : originalProduct.status === 'PENDING_REVIEW'
                      ? 'bg-amber-100 text-amber-800'
                      : originalProduct.status === 'NEEDS_CHANGES'
                      ? 'bg-orange-100 text-orange-800'
                      : originalProduct.status === 'REJECTED'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {originalProduct.status.replace('_', ' ')}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">SKU: {originalProduct?.sku || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={drafting || submitting || isPendingReview}
            onClick={() => handleSave('DRAFT')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            {drafting ? 'Saving Draft...' : 'Save Draft'}
          </button>
          <button
            type="button"
            disabled={submitting || drafting || isPendingReview}
            onClick={() => handleSave('SUBMIT')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#073B6F] px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#0B5FA5] disabled:opacity-50 transition"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? 'Submitting...' : 'Resubmit for Review'}
          </button>
        </div>
      </div>

      {/* Review Lock Banner */}
      {isPendingReview && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs font-medium text-amber-900 shadow-2xs">
          <Lock className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-bold">Under Administrative Review:</span> This listing is currently being evaluated by KiranaMart247 moderators. Direct edits are disabled until the review is finished.
          </div>
        </div>
      )}

      {/* Needs Changes Banner */}
      {originalProduct?.status === 'NEEDS_CHANGES' && (
        <div className="flex items-start gap-3 rounded-2xl border border-orange-300 bg-orange-50 p-4 text-xs font-medium text-orange-900 shadow-2xs">
          <AlertTriangle className="h-5 w-5 shrink-0 text-orange-600 mt-0.5" />
          <div>
            <span className="font-black text-orange-950">Changes Requested by Admin:</span>
            <p className="mt-1 text-orange-800">{originalProduct.rejectionReason || 'Please review product attributes and resubmit.'}</p>
          </div>
        </div>
      )}

      {/* Rejected Banner */}
      {originalProduct?.status === 'REJECTED' && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs font-medium text-rose-900 shadow-2xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <span className="font-black text-rose-950">Listing Rejected:</span>
            <p className="mt-1 text-rose-800">{originalProduct.rejectionReason || 'This product does not meet marketplace guidelines.'}</p>
          </div>
        </div>
      )}

      {/* Published Notice Banner */}
      {originalProduct?.status === 'PUBLISHED' && (
        <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-xs font-medium text-blue-900 shadow-2xs">
          <History className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
          <div>
            <span className="font-bold">Active Live Product:</span> Making modifications and submitting will send an updated revision to the admin queue. The existing version will remain live until the revision is approved.
          </div>
        </div>
      )}

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
                  disabled={isPendingReview}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Parle-G Glucose Biscuits (₹10 Daily Pack - 110g)"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="categoryId"
                    disabled={isPendingReview}
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
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
                    disabled={isPendingReview}
                    value={formData.subCategoryName}
                    onChange={handleChange}
                    placeholder="e.g. Glucose Biscuits, Washing Powder"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Brand Name</label>
                  <input
                    type="text"
                    name="brand"
                    disabled={isPendingReview}
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Parle, Amul, Tata, MDH"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">SKU / Product Code</label>
                  <input
                    type="text"
                    name="sku"
                    disabled={isPendingReview}
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. PARLE-G-110G-48"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Unit / Pack Size <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="unit"
                    disabled={isPendingReview}
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="e.g. 110g, 1kg, 5L, 48 Pcs Carton"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Net Weight (Optional)</label>
                  <input
                    type="text"
                    name="weight"
                    disabled={isPendingReview}
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 5.28 kg"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 2: Pricing & Bulk Tiers */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" /> 2. Pricing & B2B Inventory
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-800">Maximum Retail Price (MRP ₹)</label>
                <input
                  type="number"
                  name="mrp"
                  disabled={isPendingReview}
                  value={formData.mrp}
                  onChange={handleChange}
                  placeholder="e.g. 10.00"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Kirana Selling Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="retailPrice"
                  disabled={isPendingReview}
                  value={formData.retailPrice}
                  onChange={handleChange}
                  placeholder="e.g. 9.20"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-[#073B6F] focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Bulk / Wholesale Price (₹)</label>
                <input
                  type="number"
                  name="wholesalePrice"
                  disabled={isPendingReview}
                  value={formData.wholesalePrice}
                  onChange={handleChange}
                  placeholder="e.g. 8.60"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-800">Available Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  disabled={isPendingReview}
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  placeholder="e.g. 250"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Minimum Order Quantity (MOQ)</label>
                <input
                  type="number"
                  name="minimumQuantity"
                  disabled={isPendingReview}
                  value={formData.minimumQuantity}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Applicable GST %</label>
                <select
                  name="gstPercent"
                  disabled={isPendingReview}
                  value={formData.gstPercent}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                >
                  <option value="0">0% (Nil / Exempted)</option>
                  <option value="5">5% (Essential FMCG / Staples)</option>
                  <option value="12">12% (Packaged Food)</option>
                  <option value="18">18% (Personal & Home Care)</option>
                  <option value="28">28% (Aerated Drinks)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 3: High-Res Packaging Images */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-2 flex items-center gap-1.5">
              <Boxes className="h-4 w-4" /> 3. Product Packaging Images <span className="text-rose-500">*</span>
            </h2>
            <p className="text-[11px] text-slate-500 mb-4">
              Add clear packaging photos showing barcode, brand, and net weight. The first image is the primary catalog thumbnail.
            </p>

            <ProductImageUploader
              images={images}
              onChange={setImages}
              maxImages={6}
              disabled={isPendingReview}
            />
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 4: Shop Location & Mandi Details */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <Store className="h-4 w-4" /> 4. Shopkeeper & Mandi Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-800">Shop / Firm Name</label>
                <input
                  type="text"
                  name="shopName"
                  disabled={isPendingReview}
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="e.g. Bansal Kirana & Wholesale Traders"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Connected Mandi (Optional)</label>
                <input
                  type="text"
                  name="mandi"
                  disabled={isPendingReview}
                  value={formData.mandi}
                  onChange={handleChange}
                  placeholder="e.g. Azadpur Mandi, Delhi"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-800">Location / City</label>
                <input
                  type="text"
                  name="location"
                  disabled={isPendingReview}
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chandni Chowk, Delhi"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">Delivery Availability</label>
                <select
                  name="deliveryAvailability"
                  disabled={isPendingReview}
                  value={formData.deliveryAvailability}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                >
                  <option value="Same Day Dispatch">Same Day Dispatch (Within 4 Hours)</option>
                  <option value="Next Day Delivery">Next Day Morning Delivery</option>
                  <option value="2-3 Business Days">2 - 3 Days Standard Freight</option>
                  <option value="Direct Mandi Pickup">Self Pickup from Mandi / Godown</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section 5: Description & Keywords */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] flex items-center gap-1.5">
                <Tag className="h-4 w-4" /> 5. Product Description & Search Keywords
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#073B6F]">
                <Sparkles className="h-3 w-3 text-[#39A9E8]" /> AI Auto-Polishing on Submit
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Seller Notes / Custom Product Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  disabled={isPendingReview}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe pack details, manufacturing quality, freshness, and mandi origin details..."
                  className="mt-1 w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Our B2B AI Engine will automatically synthesize highlights, commercial tags, and SEO descriptions for buyers when submitted.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Search Tags (Comma separated)
                </label>
                <input
                  type="text"
                  name="productTags"
                  disabled={isPendingReview}
                  value={formData.productTags}
                  onChange={handleChange}
                  placeholder="e.g. parle biscuits, daily snack, tea accompaniment, wholesale crate"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden disabled:bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Customer Preview Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Customer View Preview
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                B2B Storefront
              </span>
            </div>

            {/* Product Card Mockup */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 overflow-hidden">
              <div className="relative aspect-square w-full rounded-xl bg-white p-3 flex items-center justify-center overflow-hidden border border-slate-100">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300">
                    <Boxes className="h-10 w-10 mb-1" />
                    <span className="text-[10px]">No Photo Uploaded</span>
                  </div>
                )}
                {formData.wholesalePrice && formData.retailPrice && (
                  <span className="absolute top-2 left-2 rounded-md bg-[#073B6F] px-1.5 py-0.5 text-[9px] font-black text-white">
                    SAVE ₹{(Number(formData.retailPrice) - Number(formData.wholesalePrice)).toFixed(1)}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                  <span>{formData.brand || 'Brand'}</span>
                  <span>{currentCategory}</span>
                </div>

                <h3 className="mt-1 text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                  {formData.name || 'Product Title Appears Here'}
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-500 font-medium">
                  {formData.unit || 'Pack Size / Unit'}
                </p>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-sm font-black text-[#073B6F]">
                    ₹{formData.retailPrice || '0'}
                  </span>
                  {formData.mrp && (
                    <span className="text-[11px] text-slate-400 line-through">
                      MRP ₹{formData.mrp}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                  <span>MOQ: {formData.minimumQuantity || '1'} Unit</span>
                  <span className="text-emerald-700 font-bold">
                    Stock: {formData.stockQuantity || '0'}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-2 text-[10px] font-semibold text-slate-600 border border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <Store className="h-3 w-3 text-[#39A9E8] shrink-0" />
                    <span className="truncate">{formData.shopName || 'Your Shop Name'}</span>
                  </div>
                  <span className="shrink-0 text-[9px] text-slate-400">
                    {formData.location || 'Delhi'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live AI Status */}
            {originalProduct?.aiDescriptionStatus && (
              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-[11px]">
                <div className="flex items-center justify-between text-slate-600 font-bold mb-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[#39A9E8]" /> AI Status
                  </span>
                  <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[9px] font-bold text-slate-700">
                    {originalProduct.aiDescriptionStatus}
                  </span>
                </div>
                {originalProduct.finalDescription && (
                  <p className="mt-1 text-[10px] text-slate-500 line-clamp-3">
                    {originalProduct.finalDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
