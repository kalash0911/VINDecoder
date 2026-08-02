import type { VinEntry } from '../types';
import { VinEntryList } from './VinEntryList';

interface HistoryListProps {
  history: VinEntry[];
  onSelect: (entry: VinEntry) => void;
  onRemove: (vin: string) => void;
  onAddFavorite: (entry: VinEntry) => void;
}

export function HistoryList({ history, onSelect, onRemove, onAddFavorite }: HistoryListProps) {
  return (
    <VinEntryList
      ariaLabel="Історія останніх розшифровок"
      title="Останні розшифровані VIN"
      entries={history}
      onSelect={onSelect}
      onRemove={onRemove}
      removeLabel={(vin) => `Видалити ${vin} з історії`}
      onFavorite={onAddFavorite}
      favoriteLabel={(vin) => `Додати ${vin} в обране`}
    />
  );
}
