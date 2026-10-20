import type { Metadata } from "next";
import PercentCalculator from "./PercentCalculator";

export const metadata: Metadata = {
  title: "Prosent",
  description:
    "Regn ut hvor mange prosent X er av Y, prosent av et tall, prosentvis økning og nedgang, og pris etter rabatt.",
};

export default function PercentPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
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
