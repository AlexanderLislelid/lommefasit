"use client";

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
      className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition ring-inset hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none lg:h-8 lg:rounded-full"
    >
      <Flag lang={other.lang} />
      {other.short}
    </a>
  );
}

// SVG i stedet for flagg-emoji, som vises som bokstaver på Windows.
function Flag({ lang }: { lang: Lang }) {
  const className =
    "h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10";

  if (lang === "nb") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 22 16"
        preserveAspectRatio="xMidYMid slice"
        className={className}
      >
        <rect width="22" height="16" fill="#BA0C2F" />
        <path d="M6 0h4v16H6zM0 6h22v4H0z" fill="#fff" />
        <path d="M7 0h2v16H7zM0 7h22v2H0z" fill="#00205B" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <clipPath id="uk-flag-diagonals">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0 0l60 30m0-30L0 30"
        clipPath="url(#uk-flag-diagonals)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
