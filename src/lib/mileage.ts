// Statens sats for kjøregodtgjørelse med privatbil (særavtalen for reiser
// innenlands) og Skatteetatens trekkfrie satser for 2026. Oppdateres hvert år.
export const stateRate = 5.3;
export const taxFreeRate = 3.5;
export const passengerRate = 1;

export type MileageAllowance = {
  base: number;
  passengers: number;
  taxFree: number;
  taxable: number;
  total: number;
};

export function calculateMileageAllowance(
  km: number,
  passengers: number,
  rate: number = stateRate,
): MileageAllowance {
  const distance = Math.max(km, 0);
  const perKm = Math.max(rate, 0);
  const base = distance * perKm;
  // Passasjertillegget er skattefritt i sin helhet.
  const passengerPay = distance * Math.max(passengers, 0) * passengerRate;
  const total = base + passengerPay;
  const taxFree = distance * Math.min(perKm, taxFreeRate) + passengerPay;
  return {
    base,
    passengers: passengerPay,
    taxFree,
    taxable: total - taxFree,
    total,
  };
}
