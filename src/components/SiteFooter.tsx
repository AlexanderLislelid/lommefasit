import Link from "next/link";
import { Logo } from "@/components/SiteHeader";
import { calculators } from "@/lib/calculators";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:grid-cols-[2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-gray-600">
            Enkle og gratis kalkulatorer for hverdagsøkonomi i Norge.
          </p>
          <p className="mt-4 max-w-sm text-xs text-gray-500">
            Svarene er veiledende. Ved tvil, sjekk med arbeidsgiver, NAV eller
            strømselskapet ditt.
          </p>
        </div>
        <nav aria-label="Kalkulatorer i bunnteksten">
          <h2 className="text-sm font-semibold text-gray-900">Kalkulatorer</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {calculators
              .filter((c) => c.status !== "soon")
              .map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/${calc.slug}`}
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
