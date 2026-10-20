import type { MetadataRoute } from "next";
import { getCalculators, translations } from "@/lib/calculators";
import { homePath, langs } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

function alternates(path: string) {
  const paths = translations(path);
  return paths
    ? {
        languages: Object.fromEntries(
          Object.entries(paths).map(([lang, p]) => [lang, `${siteUrl}${p}`]),
        ),
      }
    : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return langs.flatMap((lang) => [
    {
      url: `${siteUrl}${lang === "nb" ? "" : homePath(lang)}`,
      changeFrequency: "monthly" as const,
      priority: lang === "nb" ? 1 : 0.9,
      alternates: alternates(homePath(lang)),
    },
    ...getCalculators(lang)
      .filter((calc) => calc.status !== "soon")
      .map((calc) => ({
        url: `${siteUrl}${calc.href}`,
        changeFrequency:
          calc.status === "daily" ? ("daily" as const) : ("monthly" as const),
        priority: 0.8,
        alternates: alternates(calc.href),
      })),
  ]);
}
