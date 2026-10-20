import { langs, locales, type Lang } from "@/lib/i18n";

function perLang(options: Intl.NumberFormatOptions) {
  return Object.fromEntries(
    langs.map((lang) => [lang, new Intl.NumberFormat(locales[lang], options)]),
  ) as Record<Lang, Intl.NumberFormat>;
}

const nok = perLang({
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

export function formatNok(amount: number, lang: Lang = "nb"): string {
  return nok[lang].format(amount);
}

const ore = perLang({
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatDecimal(amount: number, lang: Lang = "nb"): string {
  return ore[lang].format(amount);
}

const number = perLang({
  maximumFractionDigits: 2,
});

export function formatNumber(amount: number, lang: Lang = "nb"): string {
  return number[lang].format(amount);
}

export function formatOre(amount: number, lang: Lang = "nb"): string {
  return `${formatDecimal(amount, lang)} øre`;
}

// Prosent med mellomrom på norsk (12,5 %) og uten på engelsk (12.5%).
export function formatPercent(amount: number, lang: Lang = "nb"): string {
  return lang === "en"
    ? `${formatNumber(amount, lang)}%`
    : `${formatNumber(amount, lang)} %`;
}

// Tolker tall slik brukeren skriver dem: «1 234,5» på norsk og «1,234.5» på engelsk.
export function parseNumber(value: string, lang: Lang = "nb"): number {
  const compact = value.replace(/\s/g, "");
  const normalized =
    lang === "en" ? compact.replace(/,/g, "") : compact.replace(",", ".");
  return Number(normalized) || 0;
}
