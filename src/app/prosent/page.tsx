import type { Metadata } from "next";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";
import PercentCalculator from "./PercentCalculator";

const title = "Prosentkalkulator – regn ut prosent";
const description =
  "Regn ut hvor mange prosent X er av Y, prosent av et tall, prosentvis økning og nedgang, og pris etter rabatt.";
const path = "/prosent";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function PercentPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd name={title} description={description} path={path} />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Prosent
      </h1>
      <p className="mt-2 text-gray-600">
        Finn andelen i prosent, prosent av et tall, hvor mye noe har økt eller
        gått ned, eller hva varen koster etter rabatt.
      </p>
      <PercentCalculator />
    </main>
  );
}
