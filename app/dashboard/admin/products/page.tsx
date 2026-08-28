'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Trash2, Edit3, Search, Check, X, Tag, Package } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Product Modal State
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    slug: '',
    description: '',
    brandId: '',
    categoryId: '',
    subCategoryId: '',
    unit: 'KG',
    retailPrice: '',
    minimumQuantity: 1,
    maximumQuantity: '',
    active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [prodsRes, catsRes, brandsRes] = await Promise.all([
        fetch(`/api/admin/products?limit=100${search ? `&search=${encodeURIComponent(search)}` : ''}`),
        fetch('/api/admin/categories'),
        fetch('/api/admin/brands'),
      ]);

      if (prodsRes.ok) {
        const data = await prodsRes.json();
        setProducts(data.items || []);
      }
      if (catsRes.ok) {
        const cData = await catsRes.json();
        setCategories(cData.categories || []);
      }
      if (brandsRes.ok) {
        const bData = await brandsRes.json();
        setBrands(bData.brands || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData({
      sku: `KM-${Date.now().toString().slice(-6)}`,
      name: '',
      slug: '',
      description: '',
      brandId: brands[0]?.id || '',
      categoryId: categories[0]?.id || '',
      subCategoryId: '',
      unit: 'KG',
      retailPrice: '',
      minimumQuantity: 1,
      maximumQuantity: '',
      active: true,
    });
    setModalError(null);
    setShowModal(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditId(p.id);
    setFormData({
      sku: p.sku,
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      brandId: p.brandId || '',
      categoryId: p.categoryId,
      subCategoryId: p.subCategoryId || '',
      unit: p.unit,
      retailPrice: p.retailPrice.toString(),
      minimumQuantity: p.minimumQuantity || 1,
      maximumQuantity: p.maximumQuantity ? p.maximumQuantity.toString() : '',
      active: p.active,
    });
    setModalError(null);
    setShowModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setSubmitting(true);

    try {
      const payload = {
        sku: formData.sku,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.description || null,
        brandId: formData.brandId || null,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId || null,
        unit: formData.unit,
        retailPrice: parseFloat(formData.retailPrice),
        minimumQuantity: Number(formData.minimumQuantity) || 1,
        maximumQuantity: formData.maximumQuantity ? Number(formData.maximumQuantity) : null,
        active: formData.active,
      };

      const url = editId ? `/api/admin/products/${editId}` : '/api/admin/products';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      setModalError(err.message || 'Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/admin" className="hover:text-[#0B5FA5]">Admin Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Catalog Products</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Product Catalog Management</h1>
          <p className="mt-1 text-xs text-slate-500">
            Create, edit, and organize products, pricing, pack units, and minimum order rules.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-full bg-[#073B6F] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#0B5FA5]"
        >
          <Plus className="h-4 w-4" /> Add New Product
        </button>
      </div>

      {/* Search Input */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchProducts();
          }}
          className="relative max-w-md"
        >
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none"
          />
        </form>
      </div>

      {/* Products Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#EAF5FC] text-[#073B6F] font-black uppercase">
              <tr>
                <th className="px-4 py-3.5">SKU</th>
                <th className="px-4 py-3.5">Product Name</th>
                <th className="px-4 py-3.5">Brand</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Unit</th>
                <th className="px-4 py-3.5">Retail Price (₹)</th>
                <th className="px-4 py-3.5">Min Qty</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-600">{p.sku}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-900">{p.name}</td>
                  <td className="px-4 py-3.5 text-slate-600">{p.brand?.name || 'Generic'}</td>
                  <td className="px-4 py-3.5 text-slate-600">{p.category?.name}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-500">{p.unit}</td>
                  <td className="px-4 py-3.5 font-black text-slate-900 text-sm">
                    ₹{Number(p.retailPrice).toFixed(2)}
                  </td>
                  <td className="px-4 py-3.5">{p.minimumQuantity}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        p.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="text-slate-500 hover:text-[#0B5FA5]"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-slate-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-[#073B6F]">
              {editId ? 'Edit Product' : 'Add New Product'}
            </h2>

            {modalError && (
              <div className="mt-3 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 border border-red-200">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Brand</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  >
                    <option value="">None / Generic</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700">Unit (e.g. KG, Litre, Pack) *</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Retail Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Min Quantity</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.minimumQuantity}
                    onChange={(e) => setFormData({ ...formData, minimumQuantity: parseInt(e.target.value, 10) || 1 })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="prodActive"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="prodActive" className="font-bold text-slate-700">Active in Store & Rates</label>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#073B6F] px-5 py-2 font-bold text-white hover:bg-[#0B5FA5]"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
