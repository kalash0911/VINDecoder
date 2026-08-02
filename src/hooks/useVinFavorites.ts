import { useCallback, useState } from 'react';
import type { HistoryEntry } from '../types';

const STORAGE_KEY = 'vin-decoder-favorites';

function readFavorites(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function useVinFavorites() {
  const [favorites, setFavorites] = useState<HistoryEntry[]>(readFavorites);

  const addFavorite = useCallback((entry: HistoryEntry) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.vin === entry.vin)) {
        return prev;
      }
      const next = [entry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFavorite = useCallback((vin: string) => {
    setFavorites((prev) => {
      const next = prev.filter((item) => item.vin !== vin);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { favorites, addFavorite, removeFavorite };
}
