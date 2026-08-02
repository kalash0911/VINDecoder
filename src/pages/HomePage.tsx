import { useState } from 'react';
import { decodeVin } from '../api/nhtsa';
import { Alert } from '../components/Alert';
import { FavoritesList } from '../components/FavoritesList';
import { HistoryList } from '../components/HistoryList';
import { Loader } from '../components/Loader';
import { ResultsList } from '../components/ResultsList';
import { VinForm } from '../components/VinForm';
import { useVinFavorites } from '../hooks/useVinFavorites';
import { useVinHistory } from '../hooks/useVinHistory';
import '../styles/home-page.css';
import type { DecodeVinResultItem, VinEntry } from '../types';

export function HomePage() {
  const { history, addEntry, removeEntry } = useVinHistory();
  const { favorites, addFavorite, removeFavorite } = useVinFavorites();
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
      const entry: VinEntry = {
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

  function handleHistorySelect(entry: VinEntry) {
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

        {isLoading && <Loader />}

        {apiError && <Alert variant="error">{apiError}</Alert>}
        {!apiError && apiMessage && <Alert variant="info">{apiMessage}</Alert>}

        <HistoryList
          history={history}
          onSelect={handleHistorySelect}
          onRemove={removeEntry}
          onAddFavorite={addFavorite}
        />

        <FavoritesList
          favorites={favorites}
          onSelect={handleHistorySelect}
          onRemove={removeFavorite}
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
