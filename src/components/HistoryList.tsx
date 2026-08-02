import type { HistoryEntry } from '../types';

interface HistoryListProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onRemove: (vin: string) => void;
}

export function HistoryList({ history, onSelect, onRemove }: HistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="history" aria-label="Історія останніх розшифровок">
      <h2 className="history__title">Останні розшифровані VIN</h2>
      <ul className="history__list">
        {history.map((entry) => (
          <li key={entry.vin} className="history__item-wrapper">
            <button
              type="button"
              className="history__item"
              onClick={() => onSelect(entry)}
              title={new Date(entry.decodedAt).toLocaleString()}
            >
              {entry.vin}
            </button>
            <button
              type="button"
              className="history__remove"
              onClick={() => onRemove(entry.vin)}
              aria-label={`Видалити ${entry.vin} з історії`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
