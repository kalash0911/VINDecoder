import { useCallback, useState } from 'react';
import type { VinEntry } from '../types';

interface UseStoredVinEntriesOptions {
  maxEntries?: number;
  onDuplicate?: 'replace' | 'skip';
}

function readEntries(storageKey: string): VinEntry[] {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as VinEntry[]) : [];
  } catch {
    return [];
  }
}

export function useStoredVinEntries(
  storageKey: string,
  { maxEntries, onDuplicate = 'replace' }: UseStoredVinEntriesOptions = {},
) {
  const [entries, setEntries] = useState<VinEntry[]>(() => readEntries(storageKey));

  const addEntry = useCallback(
    (entry: VinEntry) => {
      setEntries((prev) => {
        if (onDuplicate === 'skip' && prev.some((item) => item.vin === entry.vin)) {
          return prev;
        }
        const withoutDuplicate = prev.filter((item) => item.vin !== entry.vin);
        const next = [entry, ...withoutDuplicate].slice(0, maxEntries);
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey, maxEntries, onDuplicate],
  );

  const removeEntry = useCallback(
    (vin: string) => {
      setEntries((prev) => {
        const next = prev.filter((item) => item.vin !== vin);
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey],
  );

  return { entries, addEntry, removeEntry };
}
