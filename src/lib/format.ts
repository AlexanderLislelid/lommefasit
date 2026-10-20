const nok = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

export function formatKroner(amount: number): string {
  return nok.format(amount);
}
