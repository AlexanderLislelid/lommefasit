import type { Metadata } from "next";
import OvertimeCalculator from "./OvertimeCalculator";

export const metadata: Metadata = {
  title: "Overtid",
  description:
    "Regn ut hva du får for overtidstimer med 50 % eller 100 % tillegg, fra timelønn, månedslønn eller årslønn.",
};

export default function OvertimePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Overtid
      </h1>
      <p className="mt-2 text-gray-600">
        Overtid er arbeid utover avtalt arbeidstid. Du får vanlig timelønn pluss
        et tillegg på minst 40 %, og ofte 50 % eller 100 % etter tariffavtale.
      </p>
      <OvertimeCalculator />
    </main>
  );
}
