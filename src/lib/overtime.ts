export type WageBasis = "hourly" | "monthly" | "yearly";

// Vanlig omregning til timelønn ved 37,5 timers arbeidsuke: 37,5 × 52 = 1950.
export const hoursPerYear = 1950;

// Arbeidsmiljøloven § 10-6 krever minst 40 % tillegg. 50 % og 100 % er vanlig i
// tariffavtaler.
export const overtimeRates = {
  fifty: 0.5,
  hundred: 1,
} as const;

export function toHourlyWage(amount: number, basis: WageBasis): number {
  const wage = Math.max(amount, 0);
  if (basis === "monthly") return (wage * 12) / hoursPerYear;
  if (basis === "yearly") return wage / hoursPerYear;
  return wage;
}

export type OvertimePay = {
  hourlyWage: number;
  fifty: number;
  hundred: number;
  base: number;
  supplement: number;
  total: number;
};

export function calculateOvertimePay(
  hourlyWage: number,
  fiftyHours: number,
  hundredHours: number,
): OvertimePay {
  const wage = Math.max(hourlyWage, 0);
  const h50 = Math.max(fiftyHours, 0);
  const h100 = Math.max(hundredHours, 0);
  const fifty = h50 * wage * (1 + overtimeRates.fifty);
  const hundred = h100 * wage * (1 + overtimeRates.hundred);
  const base = (h50 + h100) * wage;
  const total = fifty + hundred;
  return {
    hourlyWage: wage,
    fifty,
    hundred,
    base,
    supplement: total - base,
    total,
  };
}
