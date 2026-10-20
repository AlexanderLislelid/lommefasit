import type { Metadata } from "next";
import CalculatorCard from "@/components/CalculatorCard";
import JsonLd from "@/components/JsonLd";
import { calculators } from "@/lib/calculators";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const available = calculators.filter((calc) => calc.status !== "soon");

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          description: siteDescription,
          inLanguage: "nb-NO",
        }}
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Gratis kalkulatorer for hverdagsøkonomi
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Regn ut feriepenger, prosent, overtid og kilometergodtgjørelse, eller se
        hva strømmen koster i dag. Raskt, gratis og uten innlogging.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {available.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
    </main>
  );
}
