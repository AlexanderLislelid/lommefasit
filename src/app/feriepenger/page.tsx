import type { Metadata } from "next";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";
import HolidayPayCalculator from "./HolidayPayCalculator";

const title = "Feriepengekalkulator – regn ut feriepenger";
const description =
  "Regn ut hvor mye du får i feriepenger i juni, med 10,2 % eller 12 % og ekstra for deg over 60.";
const path = "/feriepenger";

export const metadata: Metadata = pageMetadata({ title, description, path });

const faq: FaqItem[] = [
  {
    question: "Hvor mye får jeg i feriepenger?",
    answer:
      "Du får 10,2 % av feriepengegrunnlaget, som er lønnen du fikk utbetalt året før. Tjente du 500 000 kr i fjor, får du 51 000 kr i feriepenger. Med 12 % blir det 60 000 kr.",
  },
  {
    question: "Hva regnes med i feriepengegrunnlaget?",
    answer:
      "Grunnlaget er lønn for arbeid som ble utbetalt i opptjeningsåret, altså året før feriepengene utbetales. Overtidsbetaling regnes med. Feriepenger fra året før, utgiftsgodtgjørelser for bil, kost og losji og naturalytelser regnes ikke med.",
  },
  {
    question: "Når får jeg utbetalt feriepengene?",
    answer:
      "Etter loven skal feriepengene utbetales siste vanlige lønningsdag før ferien. De fleste arbeidsgivere betaler dem ut i juni. Tariffavtaler kan ha andre regler.",
  },
  {
    question: "Hvorfor får jeg mindre utbetalt i juni enn feriepengene?",
    answer:
      "Når du får feriepenger, trekker arbeidsgiveren som regel vanlig lønn for feriedagene. Det kalles ferietrekk. Feriepengene erstatter altså lønnen mens du har fri, og utbetalingen i juni blir mindre enn summen av lønn og feriepenger.",
  },
  {
    question: "Blir det trukket skatt av feriepenger?",
    answer:
      "Feriepenger er skattepliktig inntekt, men med vanlig tabelltrekk blir det ikke trukket skatt av de ordinære feriepengene. Det er fordi skattetrekket for året er fordelt på de andre månedene. Tillegget for deg over 60 blir likevel skattetrukket.",
  },
  {
    question: "Hvem får 12 % feriepenger?",
    answer:
      "Du får 12 % hvis du har fem ukers ferie gjennom tariffavtale eller arbeidsavtale. Loven gir 25 virkedager ferie, som tilsvarer fire uker og én dag, og 10,2 % i feriepenger.",
  },
  {
    question: "Hva får jeg ekstra hvis jeg er over 60?",
    answer:
      "Fyller du 60 i løpet av ferieåret, har du rett til seks ekstra feriedager og 2,3 prosentpoeng høyere sats. Tillegget beregnes bare av den delen av grunnlaget som ikke overstiger 6G, altså seks ganger folketrygdens grunnbeløp.",
  },
  {
    question: "Hva skjer med feriepengene når jeg bytter jobb?",
    answer:
      "Når du slutter, skal alle opptjente feriepenger utbetales senest siste vanlige lønningsdag før du fratrer. Det første året hos ny arbeidsgiver har du rett til ferie, men du får ikke feriepenger derfra, siden de allerede er utbetalt. Mange må derfor ta ferien uten lønn det første året.",
  },
  {
    question:
      "Får jeg feriepenger når jeg er sykmeldt eller i foreldrepermisjon?",
    answer:
      "Ja, delvis. Sykepenger fra arbeidsgiveren i arbeidsgiverperioden regnes med i grunnlaget. NAV betaler feriepenger av sykepenger for inntil 48 dager i året, og av foreldrepenger for inntil 12 uker med full sats eller 15 uker med 80 %. Feriepenger fra NAV utbetales i mai året etter.",
  },
];

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

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Slik regner du ut feriepenger
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            Finn feriepengegrunnlaget: lønnen du fikk utbetalt i fjor. Mange
            arbeidsgivere viser grunnlaget på lønnsslippen.
          </li>
          <li>
            Gang med 0,102 for vanlig sats, eller 0,12 hvis du har fem ukers
            ferie.
          </li>
          <li>Er du over 60, legger du til 2,3 % av grunnlaget opp til 6G.</li>
        </ol>
        <p className="mt-4 leading-relaxed text-gray-600">
          <span className="font-medium text-gray-900">Eksempel:</span> Tjente du
          500 000 kr i fjor, får du 500 000 × 0,102 = 51 000 kr i feriepenger.
          Med 12 % blir det 60 000 kr. Er du over 60 med vanlig sats, får du 11
          500 kr ekstra, til sammen 62 500 kr.
        </p>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Hva sier ferieloven?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          Reglene står i{" "}
          <a
            href="https://lovdata.no/lov/1988-04-29-21/§10"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            ferieloven § 10
          </a>{" "}
          og § 11. De viktigste punktene:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>Du har rett til 25 virkedager ferie og 10,2 % i feriepenger.</li>
          <li>
            Fyller du 60 i ferieåret, får du seks ekstra dager og 2,3
            prosentpoeng høyere sats.
          </li>
          <li>
            Feriepengene skal utbetales siste vanlige lønningsdag før ferien.
          </li>
          <li>
            Slutter du, skal alle opptjente feriepenger utbetales før du går.
          </li>
        </ul>
      </section>

      <Faq items={faq} />
    </main>
  );
}
