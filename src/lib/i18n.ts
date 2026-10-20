export const langs = ["nb", "en"] as const;

export type Lang = (typeof langs)[number];

export const locales: Record<Lang, string> = {
  nb: "nb-NO",
  en: "en-GB",
};

export function homePath(lang: Lang): string {
  return lang === "en" ? "/en" : "/";
}
