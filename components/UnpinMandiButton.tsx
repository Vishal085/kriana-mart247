'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookmarkCheck, Loader2, Trash2 } from 'lucide-react';

export default function UnpinMandiButton({ mandiId, mandiName }: { mandiId: string; mandiName?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUnpin = async () => {
    if (loading) return;
    if (!confirm(`Are you sure you want to remove ${mandiName || 'this mandi'} from your watchlist?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/watchlist?mandiId=${encodeURIComponent(mandiId)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to remove from watchlist');
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Error removing from watchlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUnpin}
      disabled={loading}
      aria-label="Remove from watchlist"
      title="Remove from watchlist"
      className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-red-600 transition cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
      <span>Unpin</span>
    </button>
  );
}
