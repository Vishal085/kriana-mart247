'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface MandiItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  address?: string | null;
  pincode?: string | null;
  description?: string | null;
  active: boolean;
}

interface MandiContextType {
  mandis: MandiItem[];
  selectedMandi: MandiItem | null;
  loading: boolean;
  selectMandi: (mandi: MandiItem | null) => void;
  selectMandiById: (id: string) => void;
  refreshMandis: () => Promise<void>;
}

const MandiContext = createContext<MandiContextType>({
  mandis: [],
  selectedMandi: null,
  loading: true,
  selectMandi: () => {},
  selectMandiById: () => {},
  refreshMandis: async () => {},
});

export function MandiProvider({ children }: { children: React.ReactNode }) {
  const [mandis, setMandis] = useState<MandiItem[]>([]);
  const [selectedMandi, setSelectedMandi] = useState<MandiItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMandis = async () => {
    try {
      const res = await fetch('/api/mandis');
      if (res.ok) {
        const data = await res.json();
        const activeMandis: MandiItem[] = data.mandis || [];
        setMandis(activeMandis);

        const savedId = typeof window !== 'undefined' ? localStorage.getItem('km247_selected_mandi_id') : null;
        if (savedId) {
          const matched = activeMandis.find((m) => m.id === savedId && m.active);
          if (matched) {
            setSelectedMandi(matched);
          } else if (activeMandis.length > 0) {
            setSelectedMandi(activeMandis[0]);
            localStorage.setItem('km247_selected_mandi_id', activeMandis[0].id);
          }
        } else if (activeMandis.length > 0) {
          setSelectedMandi(activeMandis[0]);
          localStorage.setItem('km247_selected_mandi_id', activeMandis[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch mandis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMandis();
  }, []);

  const selectMandi = (mandi: MandiItem | null) => {
    setSelectedMandi(mandi);
    if (mandi && typeof window !== 'undefined') {
      localStorage.setItem('km247_selected_mandi_id', mandi.id);
    }
  };

  const selectMandiById = (id: string) => {
    const matched = mandis.find((m) => m.id === id);
    if (matched) {
      selectMandi(matched);
    }
  };

  return (
    <MandiContext.Provider
      value={{
        mandis,
        selectedMandi,
        loading,
        selectMandi,
        selectMandiById,
        refreshMandis: fetchMandis,
      }}
    >
      {children}
    </MandiContext.Provider>
  );
}

export const useMandi = () => useContext(MandiContext);
