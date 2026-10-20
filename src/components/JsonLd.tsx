import { siteName, siteUrl } from "@/lib/site";

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // < escapes so innholdet ikke kan lukke script-taggen.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function CalculatorJsonLd({
  name,
  description,
  path,
  lang = "nb",
}: {
  name: string;
  description: string;
  path: string;
  lang?: "nb" | "en";
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: `${siteUrl}${path}`,
        inLanguage: lang === "en" ? "en" : "nb-NO",
        applicationCategory: "FinanceApplication",
        operatingSystem: lang === "en" ? "All" : "Alle",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NOK" },
        isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
      }}
    />
  );
}
