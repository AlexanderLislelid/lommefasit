import { homePath, langs, type Lang } from "@/lib/i18n";

type CalculatorText = {
  slug: string;
  title: string;
  description: string;
  cta?: string;
};

type CalculatorEntry = {
  icon: string;
  color: "green" | "blue" | "orange" | "purple" | "teal" | "rose";
  status: "daily" | "ready" | "soon";
} & Record<Lang, CalculatorText>;

export type Calculator = Omit<CalculatorEntry, Lang> &
  Required<CalculatorText> & { href: string };

const entries: CalculatorEntry[] = [
  {
    icon: "kr",
    color: "green",
    status: "ready",
    nb: {
      slug: "feriepenger",
      title: "Feriepenger",
      description: "Se hvor mye du får utbetalt i juni, med 10,2 % eller 12 %.",
    },
    en: {
      slug: "holiday-pay",
      title: "Holiday pay",
      description: "See how much you get paid in June, at 10.2% or 12%.",
    },
  },
  {
    icon: "%",
    color: "blue",
    status: "ready",
    nb: {
      slug: "prosent",
      title: "Prosent",
      description: "Hvor mange prosent er X av Y? Rabatt, økning og nedgang.",
    },
    en: {
      slug: "percentage",
      title: "Percentage",
      description:
        "What percent is X of Y? Discounts, increases and decreases.",
    },
  },
  {
    icon: "kWh",
    color: "purple",
    status: "daily",
    nb: {
      slug: "strompris",
      title: "Strømpris nå",
      description: "Timepris i ditt prisområde i dag.",
      cta: "Se prisene",
    },
    en: {
      slug: "electricity-price",
      title: "Electricity price now",
      description: "Hourly price in your price zone today.",
      cta: "See the prices",
    },
  },
  {
    icon: "Ot",
    color: "orange",
    status: "ready",
    nb: {
      slug: "overtid",
      title: "Overtid",
      description: "Hva får du for overtidstimer med 50% eller 100% tillegg?",
    },
    en: {
      slug: "overtime",
      title: "Overtime",
      description: "What do you get for overtime hours at 50% or 100% extra?",
    },
  },
  {
    icon: "km",
    color: "rose",
    status: "ready",
    nb: {
      slug: "kilometergodtgjorelse",
      // Myk bindestrek, så ordet kan deles når kortet er smalt.
      title: "Kilometer­godtgjørelse",
      description:
        "Hva får du for å kjøre egen bil i jobben, og hva er skattefritt?",
    },
    en: {
      slug: "mileage-allowance",
      title: "Mileage allowance",
      description:
        "What do you get for driving your own car for work, and what is tax-free?",
    },
  },
];

const defaultCta: Record<Lang, string> = { nb: "Regn ut", en: "Calculate" };

function calculatorPath(entry: CalculatorEntry, lang: Lang): string {
  return lang === "en" ? `/en/${entry.en.slug}` : `/${entry.nb.slug}`;
}

export function getCalculators(lang: Lang): Calculator[] {
  return entries.map(({ nb, en, ...rest }) => {
    const text = lang === "en" ? en : nb;
    return {
      ...rest,
      ...text,
      cta: text.cta ?? defaultCta[lang],
      href: calculatorPath({ nb, en, ...rest }, lang),
    };
  });
}

// Samme side på hvert språk, for språkvelgeren og hreflang-lenkene.
export function translations(path: string): Record<Lang, string> | undefined {
  const home = langs.map(homePath);
  if (home.includes(path)) {
    return Object.fromEntries(langs.map((l) => [l, homePath(l)])) as Record<
      Lang,
      string
    >;
  }
  const entry = entries.find((e) =>
    langs.some((l) => calculatorPath(e, l) === path),
  );
  if (!entry) return undefined;
  return Object.fromEntries(
    langs.map((l) => [l, calculatorPath(entry, l)]),
  ) as Record<Lang, string>;
}
