import type { Metadata } from "next";
import MileageCalculator from "./MileageCalculator";

export const metadata: Metadata = {
  title: "Kilometergodtgjørelse",
  description:
    "Regn ut kjøregodtgjørelse for bruk av egen bil i jobben med statens sats på 5,30 kr per km, og se hvor mye som er skattefritt.",
};

export default function MileagePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Kilometergodtgjørelse
      </h1>
      <p className="mt-2 text-gray-600">
        Kjører du egen bil i jobben, kan arbeidsgiver betale
        kilometergodtgjørelse. Mange følger statens sats, men noen har egne
        satser.
      </p>
      <MileageCalculator />
    </main>
  );
}
