import { useState } from 'react';
import { decodeVin } from '../api/nhtsa';
import { HistoryList } from '../components/HistoryList';
import { ResultsList } from '../components/ResultsList';
import { VinForm } from '../components/VinForm';
import { useVinHistory } from '../hooks/useVinHistory';
import type { DecodeVinResultItem, HistoryEntry } from '../types';

export function HomePage() {
  const { history, addEntry, removeEntry } = useVinHistory();
  const [currentVin, setCurrentVin] = useState('');
  const [results, setResults] = useState<DecodeVinResultItem[]>([]);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDecode(vin: string) {
    setIsLoading(true);
    setApiError(null);
    setApiMessage(null);
    try {
      const data = await decodeVin(vin);
      setCurrentVin(vin);
      setResults(data.Results);
      setApiMessage(data.Message);
      const entry: HistoryEntry = {
        vin,
        message: data.Message,
        results: data.Results,
        decodedAt: new Date().toISOString(),
      };
      addEntry(entry);
    } catch (err) {
      setResults([]);
      setApiError(err instanceof Error ? err.message : 'Невідома помилка.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleHistorySelect(entry: HistoryEntry) {
    setCurrentVin(entry.vin);
    setResults(entry.results);
    setApiMessage(entry.message);
    setApiError(null);
  }

  return (
    <section className="main-section">
      <div className="container">
        <h1 className='title main-section__title'>Розшифровка VIN-коду</h1>
        <VinForm
          key={currentVin}
          initialVin={currentVin}
          isLoading={isLoading}
          onSubmit={handleDecode}
        />

        {apiError && (
          <p className="main-section__error" role="alert">
            {apiError}
          </p>
        )}
        {!apiError && apiMessage && (
          <p className="main-section__message">{apiMessage}</p>
        )}

        <HistoryList
          history={history}
          onSelect={handleHistorySelect}
          onRemove={removeEntry}
        />

        {results.length > 0 && (
          <div className="results" aria-label="Результати розшифровки">
            <h2 className='title'>Результати розшифровки: {currentVin}</h2>
            <ResultsList results={results} />
          </div>
        )}
      </div>
    </section>
  );
}
