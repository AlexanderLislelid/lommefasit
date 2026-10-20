const nok = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

export function formatNok(amount: number): string {
  return nok.format(amount);
}

const ore = new Intl.NumberFormat("nb-NO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatDecimal(amount: number): string {
  return ore.format(amount);
}

export function formatOre(amount: number): string {
  return `${formatDecimal(amount)} øre`;
}
