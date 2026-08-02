import { useStoredVinEntries } from './useStoredVinEntries';

const STORAGE_KEY = 'vin-decoder-history';
const MAX_ENTRIES = 3;

export function useVinHistory() {
  const { entries, addEntry, removeEntry } = useStoredVinEntries(STORAGE_KEY, {
    maxEntries: MAX_ENTRIES,
  });
  return { history: entries, addEntry, removeEntry };
}
