import type { VinEntry } from '../types';
import { VinEntryList } from './VinEntryList';

interface FavoritesListProps {
  favorites: VinEntry[];
  onSelect: (entry: VinEntry) => void;
  onRemove: (vin: string) => void;
}

export function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  return (
    <VinEntryList
      ariaLabel="Обрані VIN-коди"
      title="Обрані VIN"
      entries={favorites}
      onSelect={onSelect}
      onRemove={onRemove}
      removeLabel={(vin) => `Видалити ${vin} з обраного`}
    />
  );
}
