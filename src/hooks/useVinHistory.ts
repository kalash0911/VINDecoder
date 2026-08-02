import { useCallback, useState } from 'react';
import type { HistoryEntry } from '../types';

const STORAGE_KEY = 'vin-decoder-history';
const MAX_ENTRIES = 3;

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function useVinHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(readHistory);

  const addEntry = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const withoutDuplicate = prev.filter((item) => item.vin !== entry.vin);
      const next = [entry, ...withoutDuplicate].slice(0, MAX_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeEntry = useCallback((vin: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.vin !== vin);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { history, addEntry, removeEntry };
}
