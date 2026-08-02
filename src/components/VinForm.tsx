import { FormEvent, useState } from 'react';
import { validateVin } from '../utils/validateVin';

interface VinFormProps {
  initialVin?: string;
  isLoading: boolean;
  onSubmit: (vin: string) => void;
}

export function VinForm({ initialVin = '', isLoading, onSubmit }: VinFormProps) {
  const [vin, setVin] = useState(initialVin);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = vin.trim();
    const validationError = validateVin(trimmed);
    setError(validationError);
    if (!validationError) {
      onSubmit(trimmed.toUpperCase());
    }
  }

  return (
    <form className="vin-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="vin-input" className="vin-form__label">
        VIN-код автомобіля
      </label>
      <div className="vin-form__row">
        <input
          id="vin-input"
          name="vin"
          type="text"
          className="vin-form__input"
          placeholder="Наприклад, 1FTFW1CT5DFC10312"
          maxLength={17}
          value={vin}
          onChange={(event) => setVin(event.target.value)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'vin-input-error' : undefined}
        />
        <button type="submit" className="primary btn" disabled={isLoading}>
          {isLoading ? 'Розшифровка…' : 'Розшифрувати'}
        </button>
      </div>
      {error && (
        <p id="vin-input-error" className="vin-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
