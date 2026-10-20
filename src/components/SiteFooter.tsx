import Link from "next/link";
import { Logo } from "@/components/SiteHeader";
import { getCalculators } from "@/lib/calculators";
import type { Lang } from "@/lib/i18n";

const copy = {
  nb: {
    tagline: "Enkle og gratis kalkulatorer for hverdagsøkonomi i Norge.",
    disclaimer:
      "Svarene er veiledende. Ved tvil, sjekk med arbeidsgiver, NAV eller strømselskapet ditt.",
    calculators: "Kalkulatorer",
    navLabel: "Kalkulatorer i bunnteksten",
  },
  en: {
    tagline: "Simple, free calculators for everyday finances in Norway.",
    disclaimer:
      "The results are a guide. If in doubt, check with your employer, NAV or your electricity supplier.",
    calculators: "Calculators",
    navLabel: "Calculators in the footer",
  },
};

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:grid-cols-[2fr_1fr]">
        <div>
          <Logo lang={lang} />
          <p className="mt-3 max-w-sm text-sm text-gray-600">{t.tagline}</p>
          <p className="mt-4 max-w-sm text-xs text-gray-500">{t.disclaimer}</p>
        </div>
        <nav aria-label={t.navLabel}>
          <h2 className="text-sm font-semibold text-gray-900">
            {t.calculators}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {getCalculators(lang)
              .filter((c) => c.status !== "soon")
              .map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={calc.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
