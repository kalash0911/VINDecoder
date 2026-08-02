import type { HistoryEntry } from '../types';

interface FavoritesListProps {
  favorites: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onRemove: (vin: string) => void;
}

export function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="entry-list" aria-label="Обрані VIN-коди">
      <h2 className="entry-list__title">Обрані VIN</h2>
      <ul className="entry-list__list">
        {favorites.map((entry) => (
          <li key={entry.vin} className="entry-list__item-wrapper">
            <button
              type="button"
              className="entry-list__link"
              onClick={() => onSelect(entry)}
              title={new Date(entry.decodedAt).toLocaleString()}
            ></button>
            <p className="entry-list__name">{entry.vin}</p>
            <button
              type="button"
              className="entry-list__icon-btn entry-list__icon-btn--remove"
              onClick={() => onRemove(entry.vin)}
              aria-label={`Видалити ${entry.vin} з обраного`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
