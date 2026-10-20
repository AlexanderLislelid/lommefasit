import type { Metadata } from "next";
import CalculatorCard from "@/components/CalculatorCard";
import JsonLd from "@/components/JsonLd";
import { getCalculators } from "@/lib/calculators";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/en",
    languages: { nb: "/", en: "/en", "x-default": "/" },
  },
};

export default function Home() {
  const available = getCalculators("en").filter(
    (calc) => calc.status !== "soon",
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: `${siteUrl}/en`,
          description: siteDescription.en,
          inLanguage: "en",
        }}
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Free calculators for everyday finances in Norway
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Work out your holiday pay, percentages, overtime and mileage allowance,
        or see what electricity costs today. Quick, free and no sign-up.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {available.map((calc) => (
          <CalculatorCard key={calc.href} calc={calc} lang="en" />
        ))}
      </div>
    </main>
  );
}
