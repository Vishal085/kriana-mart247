import Link from 'next/link';
import { MandiService } from '@/services/mandis.service';
import { ChevronRight } from 'lucide-react';
import { MandiDirectoryView } from '@/components/mandis/MandiDirectoryView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Wholesale Mandi Directory • Ghaziabad, Delhi, Noida & NCR APMC Mandis | KiranaMart',
  description:
    'Explore registered wholesale mandis in Ghaziabad, Noida, Delhi, and Haryana. Filter by State, District, and Mandi name to track live wholesale grain, pulse, and edible oil auction rates.',
};

export default async function MandisPage() {
  const mandis = await MandiService.getAll(true);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-[#0B5FA5]">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#073B6F]">Mandi Directory</span>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#073B6F]">Wholesale Mandi Directory</h1>
          <p className="mt-1 text-xs text-slate-500">
            Explore registered wholesale mandis structured by State, District, and Name across Delhi-NCR. Link your account to your nearest mandi.
          </p>
        </div>
      </div>

      {/* Interactive Directory with State, District, and Search Filters */}
      <MandiDirectoryView initialMandis={mandis} />
    </main>
  );
}
