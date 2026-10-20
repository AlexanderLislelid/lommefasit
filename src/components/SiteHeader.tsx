import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import LanguageToggle from "@/components/LanguageToggle";
import { getCalculators } from "@/lib/calculators";
import { homePath, type Lang } from "@/lib/i18n";

export default function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Logo lang={lang} />
        <div className="flex items-center gap-2">
          <HeaderNav
            lang={lang}
            links={getCalculators(lang).filter((c) => c.status !== "soon")}
          />
          <LanguageToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}

export function Logo({ lang }: { lang: Lang }) {
  return (
    <Link
      href={homePath(lang)}
      className="font-display inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 sm:self-auto"
    >
      <span
        aria-hidden
        className="inline-flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white shadow-sm"
      >
        L
      </span>
      Lommefasit
    </Link>
  );
}
