import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVehicleVariables } from '../api/nhtsa';
import { Alert } from '../components/Alert';
import { Loader } from '../components/Loader';
import '../styles/variable-detail-page.css';
import type { VehicleVariable } from '../types';
import { stripHtml } from '../utils/stripHtml';

export function VariableDetailPage() {
  const { variableId } = useParams<{ variableId: string }>();
  const [variable, setVariable] = useState<VehicleVariable | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getVehicleVariables()
      .then((data) => {
        if (cancelled) return;
        const found = data.find((item) => String(item.ID) === variableId) ?? null;
        setVariable(found);
        if (!found) {
          setError(`Змінну з ідентифікатором "${variableId}" не знайдено.`);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Невідома помилка.');
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [variableId]);

  return (
    <section className="variable-detail-section">
      <div className='container'>
        <p className='text'>
          <Link className='link' to="/variables">&larr; Назад</Link>
        </p>
        {isLoading && <Loader label="Завантаження…" />}
        {error && <Alert variant="error">{error}</Alert>}
        {variable && (
          <>
            <h1 className='title'>{variable.Name}</h1>
            <dl className="variable-detail-section__meta">
              <dt className='variable-detail-section__name'>Ідентифікатор</dt>
              <dd className='variable-detail-section__id'>{variable.ID}</dd>
            </dl>
            <p className='variable-detail-section__descriptions'>{stripHtml(variable.Description) || 'Опис відсутній.'}</p>
          </>
        )}
      </div>
    </section>
  );
}
