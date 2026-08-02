import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getVehicleVariables } from '../api/nhtsa';
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
    <section className="variable-detail-page">
      <p>
        <Link to="/variables">&larr; Усі змінні</Link>
      </p>
      {isLoading && <p>Завантаження…</p>}
      {error && (
        <p className="variable-detail-page__error" role="alert">
          {error}
        </p>
      )}
      {variable && (
        <>
          <h1>{variable.Name}</h1>
          <dl className="variable-detail-page__meta">
            <dt>Ідентифікатор</dt>
            <dd>{variable.ID}</dd>
          </dl>
          <p>{stripHtml(variable.Description) || 'Опис відсутній.'}</p>
        </>
      )}
    </section>
  );
}
