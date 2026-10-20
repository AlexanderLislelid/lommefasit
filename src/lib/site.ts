import type { Metadata } from "next";

export const siteUrl = "https://www.lommefasit.no";
export const siteName = "Lommefasit";
export const siteDescription =
  "Enkle og gratis kalkulatorer for hverdagsøkonomi i Norge: feriepenger, prosent, overtid, kilometergodtgjørelse og dagens strømpris.";

// Bildet fra app/opengraph-image.tsx arves ikke når en side setter openGraph selv.
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Lommefasit – gratis kalkulatorer for hverdagsøkonomi",
};

// Next slår ikke sammen openGraph og twitter mellom segmenter, så hver side må sette alt selv.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      locale: "nb_NO",
      siteName,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
