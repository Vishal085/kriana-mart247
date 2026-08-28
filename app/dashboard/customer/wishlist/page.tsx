import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireCustomer } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default async function CustomerWishlistPage() {
  let user;
  try {
    user = await requireCustomer();
  } catch {
    redirect('/login/customer');
  }

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: {
          brand: true,
          category: true,
          images: { where: { active: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/dashboard/customer" className="hover:text-[#0B5FA5]">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">My Wishlist</span>
      </div>

      <h1 className="mt-3 text-3xl font-black text-[#073B6F]">Saved Favorite Products</h1>
      <p className="mt-1 text-xs text-slate-500">
        Quickly access and reorder your preferred kirana essentials.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            id={item.product.id}
            name={item.product.name}
            slug={item.product.slug}
            brand={item.product.brand}
            category={item.product.category}
            unit={item.product.unit}
            retailPrice={Number(item.product.retailPrice)}
            minimumQuantity={item.product.minimumQuantity}
            maximumQuantity={item.product.maximumQuantity}
            images={item.product.images}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center mt-6">
          <Heart className="mx-auto h-12 w-12 text-slate-300" />
          <h2 className="mt-3 text-base font-bold text-slate-700">Your Wishlist is Empty</h2>
          <p className="mt-1 text-xs text-slate-500">Click the heart icon on any product to save it here.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-[#073B6F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#0B5FA5]"
          >
            Explore Shop
          </Link>
        </div>
      )}
    </main>
  );
}
