import '../styles/results-list.css';
import type { DecodeVinResultItem } from '../types';

interface ResultsListProps {
  results: DecodeVinResultItem[];
}

export function ResultsList({ results }: ResultsListProps) {
  const filled = results.filter(
    (item) => item.Value !== null && item.Value.trim() !== '',
  );

  if (filled.length === 0) {
    return <p className="results-list__empty">Немає заповнених характеристик.</p>;
  }

  return (
    <dl className="results-list">
      {filled.map((item) => (
        <div className="results-list__row" key={item.VariableId}>
          <dt className="results-list__term">{item.Variable}</dt>
          <dd className="results-list__value">{item.Value}</dd>
        </div>
      ))}
    </dl>
  );
}
