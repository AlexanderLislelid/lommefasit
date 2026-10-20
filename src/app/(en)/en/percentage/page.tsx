import type { Metadata } from "next";
import { CalculatorJsonLd } from "@/components/JsonLd";
import PercentCalculator from "@/components/calculators/PercentCalculator";
import { pageMetadata } from "@/lib/site";

const title = "Percentage calculator – work out percentages";
const description =
  "Work out what percent X is of Y, a percentage of a number, percentage increase and decrease, and the price after a discount.";
const path = "/en/percentage";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  lang: "en",
});

export default function PercentEnglishPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd
        name={title}
        description={description}
        path={path}
        lang="en"
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Percentage
      </h1>
      <p className="mt-2 text-gray-600">
        Find the share as a percentage, a percentage of a number, how much
        something has gone up or down, or what an item costs after a discount.
      </p>
      <PercentCalculator lang="en" />
    </main>
  );
}
