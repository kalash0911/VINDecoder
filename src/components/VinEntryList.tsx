import type { VinEntry } from '../types';
import '../styles/entry-list.css';

interface VinEntryListProps {
  ariaLabel: string;
  title: string;
  entries: VinEntry[];
  onSelect: (entry: VinEntry) => void;
  onRemove: (vin: string) => void;
  removeLabel: (vin: string) => string;
  onFavorite?: (entry: VinEntry) => void;
  favoriteLabel?: (vin: string) => string;
}

export function VinEntryList({
  ariaLabel,
  title,
  entries,
  onSelect,
  onRemove,
  removeLabel,
  onFavorite,
  favoriteLabel,
}: VinEntryListProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="entry-list" aria-label={ariaLabel}>
      <h2 className="entry-list__title">{title}</h2>
      <ul className="entry-list__list">
        {entries.map((entry) => (
          <li key={entry.vin} className="entry-list__item-wrapper">
            <button
              type="button"
              className="entry-list__link"
              onClick={() => onSelect(entry)}
              title={new Date(entry.decodedAt).toLocaleString()}
              aria-label={`Переглянути ${entry.vin}`}
            />
            {onFavorite && favoriteLabel && (
              <button
                type="button"
                className="entry-list__icon-btn entry-list__icon-btn--favorite"
                onClick={() => onFavorite(entry)}
                aria-label={favoriteLabel(entry.vin)}
              >
                ★
              </button>
            )}
            <p className="entry-list__name">{entry.vin}</p>
            <button
              type="button"
              className="entry-list__icon-btn entry-list__icon-btn--remove"
              onClick={() => onRemove(entry.vin)}
              aria-label={removeLabel(entry.vin)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
