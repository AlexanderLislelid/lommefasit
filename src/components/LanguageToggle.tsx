"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { translations } from "@/lib/calculators";
import { homePath, type Lang } from "@/lib/i18n";

const target: Record<Lang, { lang: Lang; label: string; short: string }> = {
  nb: { lang: "en", label: "Switch to English", short: "EN" },
  en: { lang: "nb", label: "Bytt til norsk", short: "NO" },
};

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const other = target[lang];
  // Sider uten oversettelse sender deg til forsiden på det andre språket.
  const href = translations(pathname)?.[other.lang] ?? homePath(other.lang);

  // Vanlig <a>: språkene har hver sin root layout, så det blir uansett en full sidelasting.
  return (
    <a
      href={href}
      hrefLang={other.lang}
      lang={other.lang}
      aria-label={other.label}
      title={other.label}
      className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition ring-inset hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none lg:h-8 lg:rounded-full"
    >
      <Languages aria-hidden className="size-4" />
      {other.short}
    </a>
  );
}
