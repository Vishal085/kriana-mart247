'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface MandiItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  district?: string;
  state: string;
  address?: string | null;
  pincode?: string | null;
  description?: string | null;
  active: boolean;
}

export const GHAZIABAD_MANDI_DEFAULT: MandiItem = {
  id: 'cmtzlm4sd000012n2ivvcrf8e',
  name: 'Ghaziabad Mandi',
  slug: 'ghaziabad-mandi',
  city: 'Ghaziabad',
  district: 'Ghaziabad',
  state: 'Uttar Pradesh',
  address: 'Site 4, Sahibabad Industrial Area, Ghaziabad 201005',
  pincode: '201005',
  description: 'Ghaziabad district primary wholesale foodgrain, pulse, and edible oil terminal market.',
  active: true,
};

/**
 * Derives the canonical administrative District for any NCR wholesale Mandi.
 */
export function getMandiDistrict(mandi: { city?: string; state?: string; slug?: string; name?: string }): string {
  const name = (mandi.name || '').toLowerCase();
  const slug = (mandi.slug || '').toLowerCase();
  const city = (mandi.city || '').toLowerCase();

  // Ghaziabad District
  if (slug.includes('ghaziabad') || name.includes('ghaziabad') || city.includes('ghaziabad')) {
    return 'Ghaziabad';
  }
  // Gautam Buddha Nagar (Noida / Greater Noida / Dadri)
  if (slug.includes('noida') || slug.includes('dadri') || city.includes('noida')) {
    return 'Gautam Buddha Nagar';
  }
  // Gurugram District
  if (slug.includes('gurugram') || city.includes('gurugram') || city.includes('gurgaon') || name.includes('gurugram')) {
    return 'Gurugram';
  }
  // Faridabad District
  if (slug.includes('faridabad') || slug.includes('ballabhgarh') || city.includes('faridabad') || city.includes('ballabhgarh')) {
    return 'Faridabad';
  }
  // Sonipat District
  if (slug.includes('sonipat') || city.includes('sonipat') || name.includes('sonipat')) {
    return 'Sonipat';
  }
  // Delhi Districts
  if (slug.includes('azadpur') || slug.includes('narela')) {
    return 'North Delhi';
  }
  if (slug.includes('naya-bazar') || slug.includes('khari-baoli')) {
    return 'Central Delhi';
  }
  if (slug.includes('ghazipur')) {
    return 'East Delhi';
  }
  if (slug.includes('shahdara')) {
    return 'North East Delhi';
  }
  if (slug.includes('okhla')) {
    return 'South Delhi';
  }
  if (slug.includes('keshopur')) {
    return 'West Delhi';
  }
  if (slug.includes('najafgarh')) {
    return 'South West Delhi';
  }

  return mandi.city || 'Delhi';
}

/**
 * Maps a user's entered city, district, or address to the nearest authentic registered APMC Mandi.
 * Supports exact matching on District, State, and City.
 */
export function matchMandiForLocation(
  location: string,
  state?: string,
  availableMandis: MandiItem[] = []
): MandiItem | null {
  if (!location) return null;
  const loc = location.toLowerCase().trim();
  const st = (state || '').toLowerCase().trim();

  // 1. Ghaziabad District & Western UP localities
  if (
    loc.includes('ghaziabad') ||
    loc.includes('sahibabad') ||
    loc.includes('indirapuram') ||
    loc.includes('vaishali') ||
    loc.includes('raj nagar') ||
    loc.includes('crossings') ||
    loc.includes('vasundhara') ||
    loc.includes('loni') ||
    loc.includes('modinagar') ||
    loc.includes('muradnagar') ||
    (st.includes('uttar') && (loc.includes('gzb') || loc.includes('ghz') || loc === 'ghaziabad'))
  ) {
    return (
      availableMandis.find((m) => m.slug === 'ghaziabad-mandi' || m.city.toLowerCase() === 'ghaziabad') ||
      GHAZIABAD_MANDI_DEFAULT
    );
  }

  // 2. Gautam Buddha Nagar (Noida)
  if (loc.includes('noida') && !loc.includes('greater noida')) {
    return availableMandis.find((m) => m.slug === 'noida-sector-88-mandi' || m.city.toLowerCase() === 'noida') || null;
  }

  // 3. Greater Noida / Dadri
  if (loc.includes('greater noida') || loc.includes('dadri') || loc.includes('kasna') || loc.includes('yeida')) {
    return availableMandis.find((m) => m.slug === 'dadri-anaj-mandi' || m.city.toLowerCase().includes('greater noida')) || null;
  }

  // 4. Gurugram / Gurgaon
  if (loc.includes('gurugram') || loc.includes('gurgaon') || loc.includes('manesar') || loc.includes('sohna')) {
    return availableMandis.find((m) => m.slug === 'gurugram-khandsa-mandi' || m.city.toLowerCase() === 'gurugram') || null;
  }

  // 5. Faridabad
  if (loc.includes('faridabad') || loc.includes('nit faridabad')) {
    return availableMandis.find((m) => m.slug === 'faridabad-nit-mandi' || m.city.toLowerCase() === 'faridabad') || null;
  }

  // 6. Ballabhgarh
  if (loc.includes('ballabhgarh') || loc.includes('ballabgarh')) {
    return availableMandis.find((m) => m.slug === 'ballabhgarh-anaj-mandi') || null;
  }

  // 7. Sonipat
  if (loc.includes('sonipat') || loc.includes('sonepat') || loc.includes('kundli')) {
    return availableMandis.find((m) => m.slug === 'sonipat-grain-mandi' || m.city.toLowerCase() === 'sonipat') || null;
  }

  // 8. Delhi specific districts
  if (loc.includes('azadpur') || loc.includes('model town') || loc.includes('north delhi')) {
    return availableMandis.find((m) => m.slug === 'azadpur-apmc-mandi') || null;
  }
  if (loc.includes('naya bazar') || loc.includes('khari baoli') || loc.includes('chandni chowk') || loc.includes('central delhi')) {
    return availableMandis.find((m) => m.slug === 'naya-bazar-mandi' || m.slug === 'khari-baoli-spice-mandi') || null;
  }
  if (loc.includes('ghazipur') || loc.includes('anand vihar') || loc.includes('east delhi')) {
    return availableMandis.find((m) => m.slug === 'ghazipur-apmc-mandi') || null;
  }
  if (loc.includes('okhla') || loc.includes('kalkaji') || loc.includes('south delhi')) {
    return availableMandis.find((m) => m.slug === 'okhla-mandi') || null;
  }
  if (loc.includes('keshopur') || loc.includes('tilak nagar') || loc.includes('west delhi')) {
    return availableMandis.find((m) => m.slug === 'keshopur-apmc-mandi') || null;
  }
  if (loc.includes('shahdara') || loc.includes('seelampur') || loc.includes('north east delhi')) {
    return availableMandis.find((m) => m.slug === 'shahdara-grain-mandi') || null;
  }
  if (loc.includes('najafgarh') || loc.includes('dwarka') || loc.includes('south west delhi')) {
    return availableMandis.find((m) => m.slug === 'najafgarh-grain-mandi') || null;
  }
  if (loc.includes('narela') || loc.includes('bawana')) {
    return availableMandis.find((m) => m.slug === 'narela-anaj-mandi') || null;
  }

  // 9. General City or District matching across all mandis
  const exactCity = availableMandis.find((m) => m.city.toLowerCase() === loc);
  if (exactCity) return exactCity;

  const partialCity = availableMandis.find(
    (m) => loc.includes(m.city.toLowerCase()) || m.city.toLowerCase().includes(loc)
  );
  if (partialCity) return partialCity;

  return null;
}

interface MandiContextType {
  mandis: MandiItem[];
  selectedMandi: MandiItem | null;
  loading: boolean;
  selectMandi: (mandi: MandiItem | null) => void;
  selectMandiById: (id: string) => void;
  selectMandiByLocation: (location: string, state?: string) => MandiItem | null;
  refreshMandis: () => Promise<void>;
}

const MandiContext = createContext<MandiContextType>({
  mandis: [GHAZIABAD_MANDI_DEFAULT],
  selectedMandi: GHAZIABAD_MANDI_DEFAULT,
  loading: true,
  selectMandi: () => {},
  selectMandiById: () => {},
  selectMandiByLocation: () => null,
  refreshMandis: async () => {},
});

export function MandiProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [mandis, setMandis] = useState<MandiItem[]>([GHAZIABAD_MANDI_DEFAULT]);
  const [selectedMandi, setSelectedMandi] = useState<MandiItem | null>(GHAZIABAD_MANDI_DEFAULT);
  const [loading, setLoading] = useState(true);

  const fetchMandis = async () => {
    try {
      const res = await fetch('/api/mandis');
      if (res.ok) {
        const data = await res.json();
        let activeMandis: MandiItem[] = (data.mandis || []).map((m: any) => ({
          ...m,
          district: m.district || getMandiDistrict(m),
        }));

        if (!activeMandis.some((m) => m.slug === 'ghaziabad-mandi' || m.name.toLowerCase().includes('ghaziabad'))) {
          activeMandis = [GHAZIABAD_MANDI_DEFAULT, ...activeMandis];
        }
        setMandis(activeMandis);

        const savedId = typeof window !== 'undefined' ? localStorage.getItem('km247_selected_mandi_id') : null;
        if (savedId) {
          const matched = activeMandis.find((m) => m.id === savedId && m.active);
          if (matched) {
            setSelectedMandi(matched);
            return;
          }
        }

        // If user is logged in, auto-match with their registered profile city/district
        const userCity = user?.customerProfile?.city || user?.shopkeeperProfile?.city;
        const userState = user?.shopkeeperProfile?.state || undefined;
        if (userCity) {
          const userMandi = matchMandiForLocation(userCity, userState, activeMandis);
          if (userMandi) {
            setSelectedMandi(userMandi);
            localStorage.setItem('km247_selected_mandi_id', userMandi.id);
            return;
          }
        }

        // Default to Ghaziabad Mandi (#1 priority)
        const gzb = activeMandis.find((m) => m.slug === 'ghaziabad-mandi');
        if (gzb) {
          setSelectedMandi(gzb);
          localStorage.setItem('km247_selected_mandi_id', gzb.id);
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

  // When user profile loads or changes, auto-assign their registered city/district mandi
  useEffect(() => {
    if (!loading && mandis.length > 0) {
      const userCity = user?.customerProfile?.city || user?.shopkeeperProfile?.city;
      const userState = user?.shopkeeperProfile?.state || undefined;
      if (userCity) {
        const userMandi = matchMandiForLocation(userCity, userState, mandis);
        if (userMandi) {
          // If no explicitly saved mandi or if it matches user's location
          const savedId = typeof window !== 'undefined' ? localStorage.getItem('km247_selected_mandi_id') : null;
          if (!savedId) {
            setSelectedMandi(userMandi);
            localStorage.setItem('km247_selected_mandi_id', userMandi.id);
          }
        }
      }
    }
  }, [user, loading, mandis]);

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

  const selectMandiByLocation = (location: string, state?: string): MandiItem | null => {
    const matched = matchMandiForLocation(location, state, mandis);
    if (matched) {
      selectMandi(matched);
      return matched;
    }
    return null;
  };

  return (
    <MandiContext.Provider
      value={{
        mandis,
        selectedMandi,
        loading,
        selectMandi,
        selectMandiById,
        selectMandiByLocation,
        refreshMandis: fetchMandis,
      }}
    >
      {children}
    </MandiContext.Provider>
  );
}

export const useMandi = () => useContext(MandiContext);
