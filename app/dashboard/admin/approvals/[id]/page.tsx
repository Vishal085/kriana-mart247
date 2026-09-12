'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Save,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Store,
  Tag,
  DollarSign,
  Package,
  History,
  AlertCircle,
  FileText,
  Boxes,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Clock,
} from 'lucide-react';

export default function AdminProductReviewPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  // Editable fields by admin
  const [edits, setEdits] = useState({
    name: '',
    categoryId: '',
    subCategoryName: '',
    brand: '',
    unit: '',
    weight: '',
    retailPrice: '',
    wholesalePrice: '',
    mrp: '',
    minimumQuantity: '1',
    stockQuantity: '50',
    finalDescription: '',
    highlights: [] as string[],
    productTags: [] as string[],
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Duplicate detector state
  const [duplicateData, setDuplicateData] = useState<{
    duplicates: any[];
    totalMatches: number;
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  }>({ duplicates: [], totalMatches: 0, riskLevel: 'LOW' });
  const [checkingDuplicates, setCheckingDuplicates] = useState(false);

  // AI regeneration state
  const [regeneratingAi, setRegeneratingAi] = useState(false);
  const [aiTone, setAiTone] = useState<'commercial' | 'technical' | 'concise' | 'bulleted'>('commercial');
  const [aiLength, setAiLength] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [aiLanguage, setAiLanguage] = useState<'english' | 'hinglish'>('english');
  const [aiInstructions, setAiInstructions] = useState('');

  // Decision state
  const [decisionModal, setDecisionModal] = useState<'REQUEST_CHANGES' | 'REJECT' | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Active image preview
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadDetails() {
      if (!productId) return;
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/admin/approvals/${productId}`),
          fetch('/api/categories'),
        ]);

        if (catRes.ok) {
          const c = await catRes.json();
          setCategories(c.categories || c);
        }

        if (prodRes.ok) {
          const { product: p } = await prodRes.json();
          setProduct(p);
          setEdits({
            name: p.name || '',
            categoryId: p.categoryId || '',
            subCategoryName: p.subCategoryName || '',
            brand: p.brand?.name || p.brand || '',
            unit: p.unit || '',
            weight: p.weight || '',
            retailPrice: p.retailPrice ? String(p.retailPrice) : '',
            wholesalePrice: p.wholesalePrice ? String(p.wholesalePrice) : '',
            mrp: p.mrp ? String(p.mrp) : '',
            minimumQuantity: String(p.minimumQuantity || '1'),
            stockQuantity: String(p.stockQuantity || '50'),
            finalDescription: p.finalDescription || p.aiDescription || p.description || '',
            highlights: Array.isArray(p.highlights) ? p.highlights : [],
            productTags: Array.isArray(p.productTags) ? p.productTags : [],
          });
          setTagsInput(Array.isArray(p.productTags) ? p.productTags.join(', ') : '');

          // Automatically check duplicates
          checkDuplicates(productId);
        } else {
          setFeedback({ type: 'error', message: 'Failed to load product details' });
        }
      } catch (err: any) {
        setFeedback({ type: 'error', message: err.message || 'Error loading product' });
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [productId]);

  const checkDuplicates = async (id: string) => {
    setCheckingDuplicates(true);
    try {
      const res = await fetch(`/api/admin/approvals/${id}/check-duplicates`);
      if (res.ok) {
        const data = await res.json();
        setDuplicateData(data);
      }
    } catch (err) {
      console.error('Error checking duplicates:', err);
    } finally {
      setCheckingDuplicates(false);
    }
  };

  const handleRegenerateAi = async () => {
    setRegeneratingAi(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/approvals/${productId}/ai-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tone: aiTone,
          length: aiLength,
          language: aiLanguage,
          customInstructions: aiInstructions,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to regenerate description');

      setEdits((prev) => ({
        ...prev,
        finalDescription: data.aiResult.detailedDescription,
        highlights: data.aiResult.highlights || [],
        productTags: data.aiResult.productTags || [],
      }));
      setTagsInput((data.aiResult.productTags || []).join(', '));
      setFeedback({ type: 'success', message: 'AI description regenerated successfully!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setRegeneratingAi(false);
    }
  };

  const handleDecision = async (
    action: 'APPROVE' | 'REQUEST_CHANGES' | 'REJECT' | 'SAVE_EDITS'
  ) => {
    setSubmittingDecision(true);
    setFeedback(null);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      action,
      reason: reasonInput,
      notes: adminNotes,
      edits: {
        ...edits,
        productTags: parsedTags,
        retailPrice: edits.retailPrice ? parseFloat(edits.retailPrice) : undefined,
        wholesalePrice: edits.wholesalePrice ? parseFloat(edits.wholesalePrice) : undefined,
        mrp: edits.mrp ? parseFloat(edits.mrp) : undefined,
        minimumQuantity: parseInt(edits.minimumQuantity || '1', 10),
        stockQuantity: parseInt(edits.stockQuantity || '50', 10),
      },
    };

    try {
      const res = await fetch(`/api/admin/approvals/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to process decision');

      setFeedback({ type: 'success', message: json.message || 'Decision processed successfully' });
      setDecisionModal(null);
      setReasonInput('');

      // Refresh product data
      setTimeout(() => {
        router.push('/dashboard/admin/approvals');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmittingDecision(false);
    }
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setEdits((prev) => ({
      ...prev,
      highlights: [...prev.highlights, highlightInput.trim()],
    }));
    setHighlightInput('');
  };

  const removeHighlight = (index: number) => {
    setEdits((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#073B6F] border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading review workbench...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-rose-500" />
        <h2 className="mt-4 text-lg font-bold text-slate-900">Product Not Found</h2>
        <p className="mt-1 text-xs text-slate-500">This submission may have been deleted or moved.</p>
        <Link
          href="/dashboard/admin/approvals"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#073B6F] px-4 py-2 text-xs font-bold text-white"
        >
          Return to Approvals
        </Link>
      </div>
    );
  }

  const imagesList = Array.isArray(product.images)
    ? product.images.map((img: any) => (typeof img === 'string' ? img : img.url))
    : [];

  const currentCategory = categories.find((c) => c.id === edits.categoryId)?.name || 'Category';

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 space-y-6 pb-28">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/approvals"
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 transition shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[#0B5FA5]">
                Review Workbench
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                  product.status === 'PUBLISHED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : product.status === 'PENDING_REVIEW'
                    ? 'bg-amber-100 text-amber-800'
                    : product.status === 'NEEDS_CHANGES'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {product.status?.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 line-clamp-1">
              {product.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={submittingDecision}
            onClick={() => handleDecision('SAVE_EDITS')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            Save Edits Only
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-2xl border p-4 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-600'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Duplicate Detection Alert Banner */}
      <div
        className={`rounded-3xl border p-5 transition shadow-2xs ${
          duplicateData.riskLevel === 'HIGH'
            ? 'border-rose-300 bg-rose-50/90'
            : duplicateData.riskLevel === 'MEDIUM'
            ? 'border-amber-300 bg-amber-50/90'
            : 'border-emerald-200 bg-emerald-50/60'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            {duplicateData.riskLevel === 'HIGH' ? (
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            ) : duplicateData.riskLevel === 'MEDIUM' ? (
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Duplicate Product Scanner
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    duplicateData.riskLevel === 'HIGH'
                      ? 'bg-rose-200 text-rose-900'
                      : duplicateData.riskLevel === 'MEDIUM'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-emerald-200 text-emerald-900'
                  }`}
                >
                  {duplicateData.riskLevel} RISK ({duplicateData.totalMatches} Potential Match{duplicateData.totalMatches === 1 ? '' : 'es'})
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600">
                {duplicateData.riskLevel === 'LOW'
                  ? 'No identical listings or matching SKUs found in the catalog. Unique submission.'
                  : `Potential overlap detected with existing catalog items. Review closely before approving to prevent duplicate buyer listings.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => checkDuplicates(productId)}
            disabled={checkingDuplicates}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw className={`h-3 w-3 ${checkingDuplicates ? 'animate-spin' : ''}`} />
            Re-scan
          </button>
        </div>

        {/* Duplicate Matches Accordion/List */}
        {duplicateData.duplicates.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-slate-200/60 pt-3">
            <span className="text-[11px] font-bold text-slate-700">Matching Products in System:</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {duplicateData.duplicates.slice(0, 4).map((dup, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {dup.product.image && (
                      <img
                        src={dup.product.image}
                        alt=""
                        className="h-10 w-10 rounded-lg object-contain bg-slate-50 border p-0.5 shrink-0"
                      />
                    )}
                    <div className="truncate">
                      <div className="font-bold text-slate-800 truncate">{dup.product.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">
                        SKU: {dup.product.sku || 'N/A'} • {dup.product.unit} • ₹{dup.product.retailPrice}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                      {dup.similarityScore}% Match
                    </span>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      {dup.reasons[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left Review Inputs + Right Preview & AI */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Editable Product Attributes & Shopkeeper Details */}
        <div className="space-y-6">
          {/* Shopkeeper Profile Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <Store className="h-4 w-4" /> Shopkeeper Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Shopkeeper / Contact</span>
                <span className="font-bold text-slate-800">
                  {product.seller?.fullName || product.shopName || 'Registered Partner'}
                </span>
                {product.seller?.mobile && (
                  <span className="text-slate-500 block">📞 {product.seller.mobile}</span>
                )}
                {product.seller?.email && (
                  <span className="text-slate-500 block">✉️ {product.seller.email}</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Firm & Location</span>
                <span className="font-bold text-slate-800">
                  {product.shopName || product.seller?.shopkeeperProfile?.shopName || 'Kirana Trader'}
                </span>
                <span className="text-slate-500 block">
                  {product.location || product.seller?.shopkeeperProfile?.city || 'Delhi NCR'}
                </span>
                {product.mandi && (
                  <span className="text-[#0B5FA5] font-semibold block">
                    Connected Mandi: {product.mandi}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Core Catalog Attributes Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> Product Details & Catalog Edits
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Product Name / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={edits.name}
                  onChange={(e) => setEdits({ ...edits, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#39A9E8] focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Category</label>
                  <select
                    value={edits.categoryId}
                    onChange={(e) => setEdits({ ...edits, categoryId: e.target.value })}
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
                  <label className="block text-xs font-bold text-slate-800">Subcategory</label>
                  <input
                    type="text"
                    value={edits.subCategoryName}
                    onChange={(e) => setEdits({ ...edits, subCategoryName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Brand</label>
                  <input
                    type="text"
                    value={edits.brand}
                    onChange={(e) => setEdits({ ...edits, brand: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Pack Size / Unit</label>
                  <input
                    type="text"
                    value={edits.unit}
                    onChange={(e) => setEdits({ ...edits, unit: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800">MRP (₹)</label>
                  <input
                    type="number"
                    value={edits.mrp}
                    onChange={(e) => setEdits({ ...edits, mrp: e.target.value })}
                    step="0.01"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={edits.retailPrice}
                    onChange={(e) => setEdits({ ...edits, retailPrice: e.target.value })}
                    step="0.01"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-[#073B6F] focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Wholesale Price (₹)</label>
                  <input
                    type="number"
                    value={edits.wholesalePrice}
                    onChange={(e) => setEdits({ ...edits, wholesalePrice: e.target.value })}
                    step="0.01"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800">Available Stock Quantity</label>
                  <input
                    type="number"
                    value={edits.stockQuantity}
                    onChange={(e) => setEdits({ ...edits, stockQuantity: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="number"
                    value={edits.minimumQuantity}
                    onChange={(e) => setEdits({ ...edits, minimumQuantity: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#39A9E8] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Packaging Image Gallery Inspection */}
            <div className="border-t border-slate-100 pt-5">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Submitted Packaging Images ({imagesList.length})
              </label>

              {imagesList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                  No images uploaded for this listing.
                </div>
              ) : (
                <div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {imagesList.map((url: string, idx: number) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border p-1 bg-slate-50 transition ${
                          activeImageIndex === idx
                            ? 'border-[#073B6F] ring-2 ring-[#073B6F]/20'
                            : 'border-slate-200'
                        }`}
                      >
                        <img src={url} alt="" className="h-full w-full object-contain" />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 rounded bg-[#073B6F] px-1 text-[8px] font-bold text-white">
                            Main
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {imagesList[activeImageIndex] && (
                    <div className="mt-3 flex justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4 max-h-72">
                      <img
                        src={imagesList[activeImageIndex]}
                        alt="High-res inspection"
                        className="max-h-64 object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Audit Trail Timeline */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#073B6F] mb-4 flex items-center gap-1.5">
              <History className="h-4 w-4" /> Activity & Decision History
            </h2>

            {(!product.auditLogs || product.auditLogs.length === 0) ? (
              <p className="text-xs text-slate-400">No previous audit logs found.</p>
            ) : (
              <div className="space-y-3">
                {product.auditLogs.map((log: any, idx: number) => (
                  <div
                    key={log.id || idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
                  >
                    <div className="rounded-full bg-slate-200 p-1 mt-0.5">
                      <Clock className="h-3 w-3 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          {log.action?.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        By: <strong className="text-slate-700">{log.actorName || log.actorRole}</strong>
                      </div>
                      {log.notes && (
                        <p className="mt-1 text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                          {log.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Description Workbench & Live Storefront Preview */}
        <div className="space-y-6">
          {/* AI Description Studio */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50/70 to-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#073B6F] text-white">
                  <Sparkles className="h-4 w-4 text-[#39A9E8]" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-[#073B6F]">AI Description Studio</h3>
                  <span className="text-[10px] text-slate-500">
                    B2B Wholesale Synthesis & Guardrails
                  </span>
                </div>
              </div>

              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-black text-[#073B6F]">
                {product.aiDescriptionStatus || 'GENERATED'}
              </span>
            </div>

            {/* Original Seller Input for Reference */}
            {product.description && (
              <div className="rounded-xl border border-slate-200/80 bg-white p-3 text-xs">
                <span className="font-bold text-slate-400 text-[10px] uppercase block mb-1">
                  Original Seller Description
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed italic">
                  &ldquo;{product.description}&rdquo;
                </p>
              </div>
            )}

            {/* AI Regeneration Controls */}
            <div className="rounded-2xl border border-blue-100 bg-white p-4 space-y-3 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-800 block">
                Regenerate AI Content
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block">Tone</label>
                  <select
                    value={aiTone}
                    onChange={(e: any) => setAiTone(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-700"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="technical">Technical</option>
                    <option value="concise">Concise</option>
                    <option value="bulleted">Bulleted</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block">Length</label>
                  <select
                    value={aiLength}
                    onChange={(e: any) => setAiLength(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-700"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block">Language</label>
                  <select
                    value={aiLanguage}
                    onChange={(e: any) => setAiLanguage(e.target.value)}
                    className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-700"
                  >
                    <option value="english">English</option>
                    <option value="hinglish">Hinglish</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-500 block">
                  Custom Prompt Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Highlight purity, mention 48-hour dispatch..."
                  value={aiInstructions}
                  onChange={(e) => setAiInstructions(e.target.value)}
                  className="mt-0.5 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] text-slate-700"
                />
              </div>

              <button
                type="button"
                disabled={regeneratingAi}
                onClick={handleRegenerateAi}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#073B6F] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0B5FA5] disabled:opacity-50 transition"
              >
                <Sparkles className={`h-3.5 w-3.5 ${regeneratingAi ? 'animate-spin' : ''}`} />
                {regeneratingAi ? 'Synthesizing with AI...' : 'Regenerate Description'}
              </button>
            </div>

            {/* Editable Final Description Output */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Final Published Description (Editable)
              </label>
              <textarea
                rows={5}
                value={edits.finalDescription}
                onChange={(e) => setEdits({ ...edits, finalDescription: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 leading-relaxed focus:border-[#39A9E8] focus:outline-hidden"
              />
            </div>

            {/* Key Highlights */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Product Key Highlights
              </label>
              <div className="space-y-1.5 mb-2">
                {edits.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1 text-[11px] border border-slate-200"
                  >
                    <span className="truncate text-slate-700">• {h}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(i)}
                      className="text-slate-400 hover:text-rose-500 font-bold ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add bullet highlight..."
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Search Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Commercial Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Live Storefront Preview Mockup */}
          <div className="sticky top-20 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Customer View Preview
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Live Storefront View
              </span>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <div className="relative aspect-square w-full rounded-xl bg-white p-3 flex items-center justify-center overflow-hidden border border-slate-100">
                {imagesList[0] ? (
                  <img
                    src={imagesList[0]}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Boxes className="h-10 w-10 text-slate-300" />
                )}
                {edits.wholesalePrice && edits.retailPrice && (
                  <span className="absolute top-2 left-2 rounded-md bg-[#073B6F] px-1.5 py-0.5 text-[9px] font-black text-white">
                    SAVE ₹{(Number(edits.retailPrice) - Number(edits.wholesalePrice)).toFixed(1)}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400">
                  <span>{edits.brand || 'Brand'}</span>
                  <span>{currentCategory}</span>
                </div>

                <h3 className="mt-1 text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                  {edits.name || 'Product Title'}
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-500 font-medium">{edits.unit}</p>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-sm font-black text-[#073B6F]">
                    ₹{edits.retailPrice || '0'}
                  </span>
                  {edits.mrp && (
                    <span className="text-[11px] text-slate-400 line-through">
                      MRP ₹{edits.mrp}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                  <span>MOQ: {edits.minimumQuantity} Unit</span>
                  <span className="text-emerald-700 font-bold">
                    Stock: {edits.stockQuantity}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-2 text-[10px] font-semibold text-slate-600 border border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <Store className="h-3 w-3 text-[#39A9E8] shrink-0" />
                    <span className="truncate">{product.shopName || 'Shop Name'}</span>
                  </div>
                  <span className="shrink-0 text-[9px] text-slate-400">
                    {product.location || 'Delhi'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Decision Command Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md p-4 shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600">
              Admin Decision Bar:
            </span>
            <span className="text-xs text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
              Evaluating &ldquo;{product.name}&rdquo;
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={submittingDecision}
              onClick={() => setDecisionModal('REJECT')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-black text-rose-700 hover:bg-rose-100 transition"
            >
              <XCircle className="h-3.5 w-3.5 text-rose-600" />
              Reject
            </button>

            <button
              type="button"
              disabled={submittingDecision}
              onClick={() => setDecisionModal('REQUEST_CHANGES')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-black text-amber-800 hover:bg-amber-100 transition"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              Request Changes
            </button>

            <button
              type="button"
              disabled={submittingDecision}
              onClick={() => handleDecision('APPROVE')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-black text-white shadow-md hover:bg-emerald-700 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
              {submittingDecision ? 'Publishing...' : 'Approve & Publish Live'}
            </button>
          </div>
        </div>
      </div>

      {/* Decision Reason Modal (For Reject & Request Changes) */}
      {decisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                  decisionModal === 'REJECT' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {decisionModal === 'REJECT' ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {decisionModal === 'REJECT' ? 'Reject Product Listing' : 'Request Changes from Seller'}
                </h3>
                <p className="text-xs text-slate-500">
                  This explanation will be delivered directly to the shopkeeper.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Reason / Seller Guidance <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder={
                  decisionModal === 'REJECT'
                    ? 'State clearly why this product cannot be listed (e.g. duplicate listing, prohibited item, unverified brand)...'
                    : 'Provide instructions for what the shopkeeper should adjust (e.g. upload clearer packaging photos showing barcode, adjust wholesale price)...'
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-[#073B6F] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Internal Admin Notes (Optional)
              </label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Private note for audit trail..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDecisionModal(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submittingDecision || !reasonInput.trim()}
                onClick={() => handleDecision(decisionModal)}
                className={`rounded-xl px-5 py-2 text-xs font-black text-white transition disabled:opacity-50 ${
                  decisionModal === 'REJECT'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {submittingDecision ? 'Processing...' : 'Confirm Decision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
