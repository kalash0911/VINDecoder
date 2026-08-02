import { useStoredVinEntries } from './useStoredVinEntries';

const STORAGE_KEY = 'vin-decoder-favorites';

export function useVinFavorites() {
  const { entries, addEntry, removeEntry } = useStoredVinEntries(STORAGE_KEY, {
    onDuplicate: 'skip',
  });
  return { favorites: entries, addFavorite: addEntry, removeFavorite: removeEntry };
}
