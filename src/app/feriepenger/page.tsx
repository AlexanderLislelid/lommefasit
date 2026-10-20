import type { Metadata } from "next";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";
import HolidayPayCalculator from "./HolidayPayCalculator";

const title = "Feriepengekalkulator – regn ut feriepenger";
const description =
  "Regn ut hvor mye du får i feriepenger i juni, med 10,2 % eller 12 % og ekstra for deg over 60.";
const path = "/feriepenger";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function HolidayPayPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd name={title} description={description} path={path} />
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
