export const rates = {
  standard: 0.102,
  fiveWeeks: 0.12,
} as const;

export type Rate = keyof typeof rates;

// Arbeidstakere som fyller 60 i løpet av ferieåret får 2,3 prosentpoeng ekstra,
// men bare av den delen av grunnlaget som ikke overstiger 6G.
export const over60ExtraRate = 0.023;

// Grunnbeløpet per 31. desember i opptjeningsåret (G fra 1. mai 2026),
// altså for feriepenger som utbetales i 2027. Oppdateres hvert år.
export const basicAmount = 136_549;

export type HolidayPay = {
  base: number;
  extra: number;
  total: number;
};

export function calculateHolidayPay(
  income: number,
  rate: Rate,
  over60: boolean,
): HolidayPay {
  const grunnlag = Math.max(income, 0);
  const base = grunnlag * rates[rate];
  const extra = over60
    ? Math.min(grunnlag, 6 * basicAmount) * over60ExtraRate
    : 0;
  return { base, extra, total: base + extra };
}
