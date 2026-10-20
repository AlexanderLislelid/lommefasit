import type { Metadata } from "next";
import HolidayPayCalculator from "./HolidayPayCalculator";

export const metadata: Metadata = {
  title: "Feriepenger",
  description:
    "Regn ut hvor mye du får i feriepenger i juni, med 10,2 % eller 12 % og ekstra for deg over 60.",
};

export default function HolidayPayPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Feriepenger
      </h1>
      <p className="mt-2 text-gray-600">
        Feriepenger regnes av lønnen du fikk utbetalt året før og utbetales
        vanligvis i juni. Standard sats er 10,2 %, eller 12 % hvis du har fem
        ukers ferie gjennom tariffavtale.
      </p>
      <HolidayPayCalculator />
    </main>
  );
}
