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
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: `${siteUrl}${path}`,
        inLanguage: "nb-NO",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Alle",
        offers: { "@type": "Offer", price: "0", priceCurrency: "NOK" },
        isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
      }}
    />
  );
}
