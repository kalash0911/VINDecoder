import type {
  DecodeVinResponse,
  VehicleVariable,
  VehicleVariableListResponse,
} from '../types';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

async function fetchJson<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Не вдалося з'єднатися з сервісом NHTSA. Перевірте інтернет-з'єднання.",
    );
  }
  if (!response.ok) {
    throw new Error(`Сервіс NHTSA повернув помилку: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function decodeVin(vin: string): Promise<DecodeVinResponse> {
  return fetchJson<DecodeVinResponse>(
    `${BASE_URL}/vehicles/decodevin/${encodeURIComponent(vin)}?format=json`,
  );
}

let variablesCache: VehicleVariable[] | null = null;

export async function getVehicleVariables(): Promise<VehicleVariable[]> {
  if (variablesCache) {
    return variablesCache;
  }
  const data = await fetchJson<VehicleVariableListResponse>(
    `${BASE_URL}/vehicles/getvehiclevariablelist?format=json`,
  );
  variablesCache = data.Results;
  return variablesCache;
}
