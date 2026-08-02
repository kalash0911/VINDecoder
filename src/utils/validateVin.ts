const VIN_MAX_LENGTH = 17;
// VIN uses digits and Latin letters, excluding I, O, Q (easily confused with 1, 0).
const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]+$/i;

export function validateVin(vin: string): string | null {
  if (vin.trim().length === 0) {
    return 'Введіть VIN-код.';
  }
  if (vin.length > VIN_MAX_LENGTH) {
    return `VIN-код не може перевищувати ${VIN_MAX_LENGTH} символів.`;
  }
  if (!VIN_PATTERN.test(vin)) {
    return 'VIN-код може містити лише латинські літери (крім I, O, Q) та цифри.';
  }
  return null;
}
