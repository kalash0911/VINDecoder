import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVehicleVariables } from '../api/nhtsa';
import type { VehicleVariable } from '../types';

export function VariablesPage() {
  const [variables, setVariables] = useState<VehicleVariable[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getVehicleVariables()
      .then((data) => {
        if (!cancelled) setVariables(data);
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
  }, []);

  return (
    <section className="variables-section">
      <div className="container">
        <h1 className='title'>Список змінних VIN</h1>
        {isLoading && <p className='text'>Завантаження…</p>}
        {error && (
          <p className="variables-section__error" role="alert">
            {error}
          </p>
        )}
        {!isLoading && !error && (
          <ul className="variables-section__list">
            {variables.map((variable) => (
              <li className='variables-section__item' key={variable.ID}>
                <Link className='variables-section__link' to={`/variables/${variable.ID}`}>{variable.Name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
