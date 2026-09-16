import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { MANDI_COMMODITY_CATEGORIES, RETAIL_ONLY_CATEGORIES } from '@/services/rates.service';
import { Search, Filter, ChevronRight, Layers, Store, MapPin, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { MandiSourcesDisclaimer } from '@/components/mandis/MandiSourcesDisclaimer';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    categoryId?: string;
    category?: string;
    brandId?: string;
    mandiId?: string;
    section?: string;
    pack?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const { categoryId, category, brandId, mandiId, section, search, minPrice, maxPrice, page } = await searchParams;
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

  // Resolve category by ID or slug
  const rawCat = category || categoryId;
  let resolvedCategoryId: string | undefined;
  if (rawCat) {
    const matchedCategory = await prisma.category.findFirst({
      where: {
        OR: [{ id: rawCat }, { slug: rawCat }],
      },
      select: { id: true },
    });
    if (matchedCategory) {
      resolvedCategoryId = matchedCategory.id;
    }
  }

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

  const isMandiSection = section === 'mandi';
  const isRetailSection = section === 'retail';

  const categoryFilter = resolvedCategoryId
    ? { categoryId: resolvedCategoryId }
    : isMandiSection
      ? {
          category: {
            slug: {
              in: MANDI_COMMODITY_CATEGORIES,
              notIn: RETAIL_ONLY_CATEGORIES,
            },
          },
        }
      : isRetailSection
        ? {
            category: {
              slug: {
                notIn: MANDI_COMMODITY_CATEGORIES,
              },
            },
          }
        : {};

  const where: any = {
    active: true,
    ...categoryFilter,
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
    prisma.category.findMany({
      where: {
        active: true,
        ...(isMandiSection
          ? { slug: { in: MANDI_COMMODITY_CATEGORIES, notIn: RETAIL_ONLY_CATEGORIES } }
          : isRetailSection
            ? { slug: { notIn: MANDI_COMMODITY_CATEGORIES } }
            : {}),
      },
      orderBy: { displayOrder: 'asc' },
    }),
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
  const hasActiveFilters = Boolean(categoryId || brandId || mandiId || search || minPrice || maxPrice || section);

  const pricePresets = [
    { label: 'All Prices', min: undefined, max: undefined },
    { label: 'Under ₹20', min: undefined, max: '20' },
    { label: '₹20 – ₹100', min: '20', max: '100' },
    { label: '₹100 – ₹300', min: '100', max: '300' },
    { label: 'Above ₹300', min: '300', max: undefined },
  ];

  const buildUrl = (updates: { [key: string]: string | undefined }) => {
    const params = new URLSearchParams();
    if (section) params.set('section', section);
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
          <h1 className="text-2xl sm:text-3xl font-black text-[#073B6F] tracking-tight">
            {isMandiSection
              ? 'Wholesale Mandi Catalog'
              : activeMandiName
                ? `${activeMandiName} Commodities`
                : 'Daily Kirana Grocery'}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {isMandiSection
              ? 'Wholesale APMC auction commodities & bulk grain bags with live rates.'
              : 'Packaged grocery staples, pulses, cooking oil, and household essentials.'}
          </p>
        </div>

        {/* Search Input Bar */}
        <form method="GET" action="/shop" className="relative flex items-center w-full lg:w-80 rounded-full border border-slate-200 bg-white p-1 shadow-xs focus-within:border-[#39A9E8] transition">
          {section && <input type="hidden" name="section" value={section} />}
          {categoryId && <input type="hidden" name="categoryId" value={categoryId} />}
          {brandId && <input type="hidden" name="brandId" value={brandId} />}
          {mandiId && <input type="hidden" name="mandiId" value={mandiId} />}
          {minPrice && <input type="hidden" name="minPrice" value={minPrice} />}
          {maxPrice && <input type="hidden" name="maxPrice" value={maxPrice} />}
          <Search className="h-4 w-4 text-slate-400 ml-2.5 shrink-0" />
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            placeholder="Search products..."
            className="w-full bg-transparent px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-[#073B6F] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#0B5FA5] transition shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Sleek Segmented Switcher & Search Bar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/80 pb-3">
        {/* Modern Segmented Control */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold shrink-0 self-start sm:self-auto">
          <Link
            href="/shop?section=retail"
            className={`rounded-lg px-3.5 py-1.5 transition ${
              isRetailSection || (!section && !isMandiSection)
                ? 'bg-white text-[#073B6F] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Grocery
          </Link>
          <Link
            href="/shop?section=mandi"
            className={`rounded-lg px-3.5 py-1.5 transition flex items-center gap-1.5 ${
              isMandiSection
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Wholesale Mandi</span>
            <span className="rounded-md bg-emerald-100 text-emerald-800 px-1 py-0.2 text-[9px] font-bold uppercase">
              Live
            </span>
          </Link>
        </div>

        {/* Live Mandi Rates Quick Link */}
        <Link
          href="/mandi-rates"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5FA5] hover:text-[#073B6F] transition shrink-0"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Live Rates Board →</span>
        </Link>
      </div>

      {/* Horizontal Category Carousel */}
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none" style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
        <Link
          href={buildUrl({ categoryId: undefined, page: undefined })}
          className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            !categoryId
              ? 'bg-[#073B6F] text-white shadow-xs'
              : 'border border-slate-200/80 bg-white text-slate-700 hover:border-[#39A9E8]'
          }`}
        >
          All Categories
        </Link>
        {categories.map((c: any) => (
          <Link
            key={c.id}
            href={buildUrl({ categoryId: c.id, page: undefined })}
            className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              categoryId === c.id
                ? 'bg-[#073B6F] text-white shadow-xs'
                : 'border border-slate-200/80 bg-white text-slate-700 hover:border-[#39A9E8]'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Compact Secondary Filters: Mandi Hub + Price Ranges */}
      <div className="mt-2.5 flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs scrollbar-none" style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Hub:</span>
          <Link
            href={buildUrl({ mandiId: undefined, page: undefined })}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
              !mandiId ? 'bg-[#EAF5FC] text-[#073B6F]' : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Mandis
          </Link>
          {mandis.map((m: any) => (
            <Link
              key={m.id}
              href={buildUrl({ mandiId: m.id, page: undefined })}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                mandiId === m.id ? 'bg-[#0B5FA5] text-white shadow-2xs' : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.city}
            </Link>
          ))}
        </div>

        {/* Price Ranges & Reset */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">Price:</span>
          {pricePresets.slice(1).map((preset) => {
            const isSelected = preset.min === minPrice && preset.max === maxPrice;
            return (
              <Link
                key={preset.label}
                href={buildUrl({ minPrice: isSelected ? undefined : preset.min, maxPrice: isSelected ? undefined : preset.max, page: undefined })}
                className={`shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-semibold transition ${
                  isSelected
                    ? 'bg-[#073B6F] text-white font-bold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[#39A9E8]'
                }`}
              >
                {preset.label}
              </Link>
            );
          })}
          {hasActiveFilters && (
            <Link
              href="/shop"
              className="shrink-0 rounded-lg bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 transition ml-1"
            >
              Reset ✕
            </Link>
          )}
        </div>
      </div>

      {/* Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
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
          {currentPage > 1 && (
            <Link
              href={buildUrl({ page: String(currentPage - 1) })}
              className="flex h-9 px-3 items-center justify-center rounded-xl text-xs font-bold transition border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]"
            >
              ← Prev
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
            .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis');
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === 'ellipsis' ? (
                <span key={`ell-${idx}`} className="px-1 text-slate-400">…</span>
              ) : (
                <Link
                  key={p}
                  href={buildUrl({ page: String(p) })}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                    currentPage === p
                      ? 'bg-[#073B6F] text-white shadow'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]'
                  }`}
                >
                  {p}
                </Link>
              )
            )}
          {currentPage < totalPages && (
            <Link
              href={buildUrl({ page: String(currentPage + 1) })}
              className="flex h-9 px-3 items-center justify-center rounded-xl text-xs font-bold transition border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]"
            >
              Next →
            </Link>
          )}
        </div>
      )}

      {/* Authoritative Sources & Methodology Disclaimer */}
      <MandiSourcesDisclaimer currentMandiName={activeMandiName || undefined} />
    </main>
  );
}
