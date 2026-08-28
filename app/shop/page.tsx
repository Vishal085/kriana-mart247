import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, ChevronRight, Layers } from 'lucide-react';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string; brandId?: string; search?: string; page?: string }>;
}) {
  const { categoryId, brandId, search, page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const where = {
    active: true,
    ...(categoryId ? { categoryId } : {}),
    ...(brandId ? { brandId } : {}),
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

  const [categories, brands, products, total] = await Promise.all([
    prisma.category.findMany({ where: { active: true }, orderBy: { displayOrder: 'asc' } }),
    prisma.brand.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Kirana Shop</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Kirana Store Catalog</h1>
          <p className="mt-1 text-xs text-slate-500">
            Wholesale staples, dairy, beverages, and packaged grocery essentials delivered to your doorstep.
          </p>
        </div>
        <div className="text-xs font-bold text-slate-500">
          Showing {products.length} of {total} products
        </div>
      </div>

      {/* Horizontal Category Carousel */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition shadow-sm ${
            !categoryId
              ? 'bg-[#073B6F] text-white'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-[#39A9E8]'
          }`}
        >
          All Items
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?categoryId=${c.id}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition shadow-sm ${
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
      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Brands:</span>
        <Link
          href={`/shop${categoryId ? `?categoryId=${categoryId}` : ''}`}
          className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
            !brandId ? 'bg-[#EAF5FC] text-[#073B6F] font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All Brands
        </Link>
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/shop?${categoryId ? `categoryId=${categoryId}&` : ''}brandId=${b.id}`}
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
    </main>
  );
}
