import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, ChevronRight, Layers, Store, MapPin } from 'lucide-react';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    categoryId?: string;
    brandId?: string;
    mandiId?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const { categoryId, brandId, mandiId, search, minPrice, maxPrice, page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const minP = minPrice ? parseFloat(minPrice) : undefined;
  const maxP = maxPrice ? parseFloat(maxPrice) : undefined;

  const priceFilter =
    minP !== undefined || maxP !== undefined
      ? {
          ...(minP !== undefined ? { gte: minP } : {}),
          ...(maxP !== undefined ? { lte: maxP } : {}),
        }
      : undefined;

  let mandiProductIds: string[] | undefined;
  let activeMandiName: string | null = null;
  if (mandiId) {
    const [mandiRates, mObj] = await Promise.all([
      prisma.mandiRate.findMany({ where: { mandiId, active: true }, take: 100 }),
      prisma.mandi.findUnique({ where: { id: mandiId } }),
    ]);
    if (mObj) activeMandiName = mObj.name;
    mandiProductIds = mandiRates.map((r: any) => r.productId);
  }

  const where: any = {
    active: true,
    ...(categoryId ? { categoryId } : {}),
    ...(brandId ? { brandId } : {}),
    ...(mandiProductIds ? { id: { in: mandiProductIds } } : {}),
    ...(priceFilter ? { retailPrice: priceFilter } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { sku: { contains: search, mode: 'insensitive' as const } },
            { searchKeywords: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const [categories, brands, mandis, products, total] = await Promise.all([
    prisma.category.findMany({ where: { active: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.brand.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
    prisma.mandi.findMany({ where: { active: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        images: { where: { active: true }, orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasActiveFilters = Boolean(categoryId || brandId || mandiId || search || minPrice || maxPrice);

  const pricePresets = [
    { label: 'All Prices', min: undefined, max: undefined },
    { label: 'Under ₹20', min: undefined, max: '20' },
    { label: '₹20 – ₹100', min: '20', max: '100' },
    { label: '₹100 – ₹300', min: '100', max: '300' },
    { label: 'Above ₹300', min: '300', max: undefined },
  ];

  const buildUrl = (updates: { [key: string]: string | undefined }) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('categoryId', categoryId);
    if (brandId) params.set('brandId', brandId);
    if (mandiId) params.set('mandiId', mandiId);
    if (search) params.set('search', search);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    for (const [key, val] of Object.entries(updates)) {
      if (val === undefined) params.delete(key);
      else params.set(key, val);
    }
    const qs = params.toString();
    return qs ? `/shop?${qs}` : '/shop';
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Kirana Shop</span>
        {activeMandiName && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-700 font-bold">{activeMandiName}</span>
          </>
        )}
      </div>

      {/* Header & In-Page Search */}
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">
            {activeMandiName ? `${activeMandiName} Commodities & Groceries` : 'Kirana Store Catalog'}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {activeMandiName
              ? `Live wholesale auction commodities and grocery inventory direct from ${activeMandiName}.`
              : 'Wholesale staples, dairy, beverages, and packaged grocery essentials delivered to your doorstep.'}
          </p>
        </div>

        {/* Search Input Bar */}
        <form method="GET" action="/shop" className="flex items-center gap-2 w-full lg:w-auto">
          {categoryId && <input type="hidden" name="categoryId" value={categoryId} />}
          {brandId && <input type="hidden" name="brandId" value={brandId} />}
          {mandiId && <input type="hidden" name="mandiId" value={mandiId} />}
          {minPrice && <input type="hidden" name="minPrice" value={minPrice} />}
          {maxPrice && <input type="hidden" name="maxPrice" value={maxPrice} />}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Search products in catalog..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 shadow-xs outline-none focus:border-[#39A9E8]"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#073B6F] px-4 py-2 text-xs font-bold text-white hover:bg-[#0B5FA5] transition shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Mandi Quick Selector Bar */}
      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="shrink-0 text-xs font-bold text-slate-500 flex items-center gap-1">
          <Store className="h-3.5 w-3.5 text-[#39A9E8]" /> Wholesale Mandi:
        </span>
        <Link
          href={buildUrl({ mandiId: undefined, page: undefined })}
          className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-bold transition shadow-2xs ${
            !mandiId
              ? 'bg-[#073B6F] text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Mandis
        </Link>
        {mandis.map((m) => {
          const isActive = mandiId === m.id;
          return (
            <Link
              key={m.id}
              href={buildUrl({ mandiId: m.id, page: undefined })}
              className={`shrink-0 rounded-full px-3.5 py-1 text-xs font-bold transition shadow-2xs ${
                isActive
                  ? 'bg-[#0B5FA5] text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8] hover:bg-[#EAF5FC]'
              }`}
            >
              📍 {m.name} ({m.city})
            </Link>
          );
        })}
      </div>

      {activeMandiName && (
        <div className="mt-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Showing live commodities and wholesale products available at <strong>{activeMandiName}</strong>.
            </span>
          </div>
          <Link
            href={buildUrl({ mandiId: undefined })}
            className="text-xs font-bold text-emerald-700 underline shrink-0 hover:text-emerald-900"
          >
            Show All Mandis
          </Link>
        </div>
      )}

      {/* Filter Status & Active Clear Button */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">
            Showing {products.length} of {total} products
          </span>
          {hasActiveFilters && (
            <Link
              href="/shop"
              className="rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-100 transition"
            >
              Clear All Filters ✕
            </Link>
          )}
        </div>

        {/* Price Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Price:</span>
          {pricePresets.map((preset) => {
            const isSelected =
              (preset.min === undefined && preset.max === undefined && !minPrice && !maxPrice) ||
              (preset.min === minPrice && preset.max === maxPrice);
            return (
              <Link
                key={preset.label}
                href={buildUrl({ minPrice: preset.min, maxPrice: preset.max, page: undefined })}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                  isSelected
                    ? 'bg-[#073B6F] text-white font-bold'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-[#39A9E8]'
                }`}
              >
                {preset.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Horizontal Category Carousel */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href={buildUrl({ categoryId: undefined, page: undefined })}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition shadow-xs ${
            !categoryId
              ? 'bg-[#073B6F] text-white'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]'
          }`}
        >
          All Categories
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={buildUrl({ categoryId: c.id, page: undefined })}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition shadow-xs ${
              categoryId === c.id
                ? 'bg-[#073B6F] text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Brand Filters Bar */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Brands:</span>
        <Link
          href={buildUrl({ brandId: undefined, page: undefined })}
          className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
            !brandId ? 'bg-[#EAF5FC] text-[#073B6F] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All Brands
        </Link>
        {brands.map((b) => (
          <Link
            key={b.id}
            href={buildUrl({ brandId: b.id, page: undefined })}
            className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              brandId === b.id ? 'bg-[#EAF5FC] text-[#073B6F] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {b.name}
          </Link>
        ))}
      </div>

      {/* Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            brand={product.brand}
            category={product.category}
            unit={product.unit}
            retailPrice={Number(product.retailPrice)}
            mrp={product.mrp ? Number(product.mrp) : null}
            stockQuantity={product.stockQuantity ?? 100}
            weight={product.weight}
            minimumQuantity={product.minimumQuantity}
            maximumQuantity={product.maximumQuantity}
            images={product.images}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center my-8">
          <p className="text-base font-bold text-slate-700">No products match your current selection.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
          >
            Reset Filters
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/shop?${categoryId ? `categoryId=${categoryId}&` : ''}${brandId ? `brandId=${brandId}&` : ''}page=${p}`}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                currentPage === p
                  ? 'bg-[#073B6F] text-white shadow'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}

      {/* Authoritative Sources & Methodology Disclaimer */}
      <MandiSourcesDisclaimer currentMandiName={activeMandiName || undefined} />
    </main>
  );
}
