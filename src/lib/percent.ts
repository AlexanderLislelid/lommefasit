// Alle funksjoner gir null når svaret ikke er definert (deling på null).

// Hvor mange prosent er part av whole?
export function percentOf(part: number, whole: number): number | null {
  if (whole === 0) return null;
  return (part / whole) * 100;
}

// Hva er percent % av amount?
export function amountOf(percent: number, amount: number): number {
  return (percent / 100) * amount;
}

// Prosentvis endring fra from til to. Positiv er økning, negativ er nedgang.
export function percentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return ((to - from) / Math.abs(from)) * 100;
}

export type Discount = {
  saved: number;
  price: number;
};

export function applyDiscount(price: number, percent: number): Discount {
  const saved = amountOf(percent, price);
  return { saved, price: price - saved };
}
