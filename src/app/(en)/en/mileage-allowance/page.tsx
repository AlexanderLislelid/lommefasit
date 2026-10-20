import type { Metadata } from "next";
import { CalculatorJsonLd } from "@/components/JsonLd";
import MileageCalculator from "@/components/calculators/MileageCalculator";
import { pageMetadata } from "@/lib/site";

const title = "Mileage allowance calculator Norway (kilometergodtgjørelse)";
const description =
  "Calculate your allowance for driving your own car for work in Norway at the state rate of NOK 5.30 per km, and see how much is tax-free.";
const path = "/en/mileage-allowance";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  lang: "en",
});

export default function MileageEnglishPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd
        name={title}
        description={description}
        path={path}
        lang="en"
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Mileage allowance
      </h1>
      <p className="mt-2 text-gray-600">
        If you drive your own car for work, your employer can pay a mileage
        allowance (kilometergodtgjørelse). Many follow the state rate, but some
        have their own rates.
      </p>
      <MileageCalculator lang="en" />
    </main>
  );
}
