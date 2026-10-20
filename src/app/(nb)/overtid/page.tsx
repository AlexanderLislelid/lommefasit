import type { Metadata } from "next";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";

const title = "Overtidskalkulator – regn ut overtidsbetaling";
const description =
  "Regn ut hva du får for overtidstimer med 50 % eller 100 % tillegg, fra timelønn, månedslønn eller årslønn.";
const path = "/overtid";

export const metadata: Metadata = pageMetadata({ title, description, path });

const faq: FaqItem[] = [
  {
    question: "Hvor mye får jeg for en overtidstime?",
    answer:
      "Du får vanlig timelønn pluss overtidstillegget. Med 300 kr i timen og 50 % tillegg blir det 450 kr for timen. Med 100 % tillegg blir det 600 kr.",
  },
  {
    question: "Hva er forskjellen på 50 % og 100 % overtid?",
    answer:
      "Loven krever bare minst 40 % tillegg. 50 % og 100 % kommer fra tariffavtaler, som ofte gir 50 % på dagtid i hverdager og 100 % på kveld, natt, helg og helligdager. Hva som gjelder for deg, står i arbeidsavtalen eller tariffavtalen.",
  },
  {
    question: "Er overtid og merarbeid det samme?",
    answer:
      "Nei. Overtid er arbeid utover lovens grense på 9 timer per døgn eller 40 timer per uke. Jobber du utover det som er avtalt, men under lovens grense, er det merarbeid. Da har du krav på vanlig timelønn, men ikke tillegg, med mindre avtalen din sier noe annet. Har du 37,5 timers uke, kan de første 2,5 ekstra timene derfor være uten tillegg, men mange tariffavtaler gir tillegg fra første time.",
  },
  {
    question: "Får jeg ekstra betalt for å jobbe lørdag eller søndag?",
    answer:
      "Ikke etter loven alene. Helgearbeid innenfor vanlig arbeidstid gir ikke krav på tillegg. Mange tariffavtaler gir likevel helgetillegg eller 100 % overtid på lørdag og søndag.",
  },
  {
    question: "Hvorfor blir det trukket så mye skatt av overtiden?",
    answer:
      "Overtid er vanlig lønn og skattlegges likt. Trekket kan likevel virke høyt, fordi trekktabellen regner som om du tjener like mye hver måned hele året. Blir det trukket for mye, får du pengene tilbake i skatteoppgjøret.",
  },
  {
    question: "Kan jeg avspasere overtid i stedet for å få den utbetalt?",
    answer:
      "Ja, hvis du og arbeidsgiveren avtaler det skriftlig. Du kan da ta ut timene som fritid, time for time, men overtidstillegget skal fortsatt utbetales.",
  },
  {
    question: "Hvor mye overtid er lov?",
    answer:
      "Hovedregelen er maks 10 timer per uke, 25 timer per fire uker og 200 timer per år. I virksomheter med tariffavtale kan arbeidsgiver og tillitsvalgte avtale å øke grensen til 20 timer per uke, 50 timer per fire uker og 300 timer per år. Overtid skal bare brukes ved et særlig og tidsavgrenset behov.",
  },
  {
    question: "Har alle krav på overtidsbetaling?",
    answer:
      "Nei. Ansatte i ledende eller særlig uavhengige stillinger er unntatt fra reglene om arbeidstid og har ikke krav på overtidstillegg etter loven. Det er arbeidsoppgavene som avgjør dette, ikke stillingstittelen.",
  },
];

export default function OvertimePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd name={title} description={description} path={path} />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Overtid
      </h1>
      <p className="mt-2 text-gray-600">
        Overtid er arbeid utover lovens grense på 9 timer per døgn eller 40
        timer per uke. Du får vanlig timelønn pluss et tillegg på minst 40 %, og
        ofte 50 % eller 100 % etter tariffavtale.
      </p>
      <OvertimeCalculator />

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Slik regner du ut overtidsbetaling
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            Finn timelønnen. Har du fast lønn, deler du årslønnen på 1950 timer,
            som tilsvarer 37,5 timer i uken.
          </li>
          <li>
            Gang timelønnen med 1,5 for 50 % tillegg, eller med 2 for 100 %
            tillegg.
          </li>
          <li>Gang med antall overtidstimer.</li>
        </ol>
        <p className="mt-4 leading-relaxed text-gray-600">
          <span className="font-medium text-gray-900">Eksempel:</span> Med en
          årslønn på 585 000 kr blir timelønnen 300 kr. Jobber du 6 timer med 50
          % og 4 timer med 100 %, får du 6 × 450 kr + 4 × 600 kr = 5 100 kr før
          skatt. Av dette er 2 100 kr selve overtidstillegget.
        </p>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Hva sier arbeidsmiljøloven?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          Reglene står i{" "}
          <a
            href="https://lovdata.no/lov/2005-06-17-62/§10-6"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            arbeidsmiljøloven § 10-6
          </a>
          . De viktigste punktene:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>Overtidstillegget skal være minst 40 % av timelønnen.</li>
          <li>
            Overtid er bare lov når det er et særlig og tidsavgrenset behov.
          </li>
          <li>
            Du kan be om fritak fra overtid av helsemessige eller vesentlige
            sosiale grunner.
          </li>
          <li>
            Ledende og særlig uavhengige stillinger er unntatt fra reglene.
          </li>
        </ul>
      </section>

      <Faq items={faq} />
    </main>
  );
}
