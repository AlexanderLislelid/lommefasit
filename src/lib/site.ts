import type { Metadata } from "next";
import { translations } from "@/lib/calculators";
import type { Lang } from "@/lib/i18n";

export const siteUrl = "https://www.lommefasit.no";
export const siteName = "Lommefasit";

export const siteDescription: Record<Lang, string> = {
  nb: "Enkle og gratis kalkulatorer for hverdagsøkonomi i Norge: feriepenger, prosent, overtid, kilometergodtgjørelse og dagens strømpris.",
  en: "Simple, free calculators for everyday finances in Norway: holiday pay, percentages, overtime, mileage allowance and today's electricity price.",
};

const defaultTitle: Record<Lang, string> = {
  nb: "Lommefasit – gratis kalkulatorer for hverdagsøkonomi",
  en: "Lommefasit – free calculators for everyday finances in Norway",
};

// Bildet fra opengraph-image.tsx arves ikke når en side setter openGraph selv.
function ogImage(lang: Lang) {
  return {
    url: lang === "en" ? "/en/opengraph-image" : "/opengraph-image",
    width: 1200,
    height: 630,
    alt: defaultTitle[lang],
  };
}

// Next slår ikke sammen openGraph og twitter mellom segmenter, så hver side må sette alt selv.
export function pageMetadata({
  title,
  description,
  path,
  lang = "nb",
}: {
  title: string;
  description: string;
  path?: string;
  lang?: Lang;
}): Metadata {
  const languages = path ? translations(path) : undefined;
  return {
    title,
    description,
    alternates: path
      ? {
          canonical: path,
          languages: languages && {
            ...languages,
            "x-default": languages.nb,
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_GB" : "nb_NO",
      siteName,
      title,
      description,
      url: path,
      images: [ogImage(lang)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage(lang)],
    },
  };
}

// Felles metadata for root layout på hvert språk.
export function siteMetadata(lang: Lang): Metadata {
  return {
    ...pageMetadata({
      title: defaultTitle[lang],
      description: siteDescription[lang],
      lang,
    }),
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle[lang],
      template: `%s | ${siteName}`,
    },
    applicationName: siteName,
  };
}
