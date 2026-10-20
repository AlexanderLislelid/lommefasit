import type { Metadata } from "next";
import ElectricityPrices from "@/components/ElectricityPrices";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";

const title = "Strømpris i dag – timepris per prisområde";
const description =
  "Se dagens strømpris time for time i NO1–NO5, inkludert mva., med billigste og dyreste time og pris etter strømstøtte.";
const path = "/strompris";

// Kanonisk URL uten ?sone= og ?visning=, så variantene ikke konkurrerer i søk.
export const metadata: Metadata = pageMetadata({ title, description, path });

const faq: FaqItem[] = [
  {
    question: "Hva er spotpris?",
    answer:
      "Spotprisen er markedsprisen på strøm fra kraftbørsen Nord Pool. Den settes for hvert prisområde dagen før, og prisene for neste døgn blir vanligvis publisert rundt klokken 13. Har du spotprisavtale, betaler du denne prisen pluss et påslag til strømselskapet.",
  },
  {
    question: "Hva betaler jeg i tillegg til spotprisen?",
    answer:
      "Du betaler nettleie til nettselskapet, som også inneholder forbruksavgift og andre avgifter. I tillegg kommer påslag per kWh og et fast månedsbeløp fra strømselskapet. Spotprisen er derfor bare en del av det strømmen koster deg.",
  },
  {
    question: "Hvordan fungerer strømstøtten?",
    answer:
      "Staten dekker 90 % av spotprisen over 77 øre per kWh eks. mva., som er 96,25 øre med mva. Støtten regnes ut time for time for inntil 5 000 kWh i måneden, og trekkes automatisk fra nettleiefakturaen. Du trenger ikke søke.",
  },
  {
    question: "Hva er Norgespris?",
    answer:
      "Norgespris er en frivillig fastpris på 40 øre per kWh eks. mva., altså 50 øre med mva. I Nord-Norge, der det ikke er mva. på strøm, er prisen 40 øre. Du velger Norgespris hos nettselskapet ditt. Har du Norgespris, får du ikke strømstøtte i tillegg.",
  },
  {
    question: "Når er strømmen billigst?",
    answer:
      "Strømmen er ofte billigst om natten og midt på dagen, og dyrest om morgenen og tidlig på kvelden når mange bruker strøm samtidig. Det varierer fra dag til dag, så sjekk timeprisene før du lader bilen eller kjører vaskemaskinen.",
  },
  {
    question: "Hvilket prisområde bor jeg i?",
    answer:
      "Norge er delt i fem prisområder: NO1 Øst (Oslo), NO2 Sør (Kristiansand og Stavanger), NO3 Midt (Trondheim), NO4 Nord (Tromsø) og NO5 Vest (Bergen). Nettselskapet ditt eller strømregningen viser hvilket område du hører til.",
  },
  {
    question: "Hvorfor er strømprisen forskjellig i Nord- og Sør-Norge?",
    answer:
      "Det er begrenset hvor mye strøm som kan overføres mellom landsdelene. Sør-Norge har mer kontakt med kraftmarkedet i Europa og får oftere høyere priser, mens Nord-Norge ofte har overskudd av kraft og lavere priser.",
  },
];

export default function ElectricityPricePage({
  searchParams,
}: PageProps<"/strompris">) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd name={title} description={description} path={path} />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Strømpris i dag
      </h1>
      <p className="mt-2 text-gray-600">
        Spotpris per time fra døgnmarkedet, inkludert mva. (NO4 er fritatt).
        Nettleie, avgifter og påslag fra strømselskapet kommer i tillegg.
      </p>
      <ElectricityPrices lang="nb" searchParams={searchParams} />
      <p className="mt-8 text-sm text-gray-500">
        Strømpriser fra{" "}
        <a
          href="https://www.hvakosterstrommen.no"
          className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
        >
          hvakosterstrommen.no
        </a>
        .
      </p>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Hva betaler du egentlig for strømmen?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          Strømregningen består av tre deler:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            <span className="font-medium text-gray-900">Spotprisen</span>, som
            vises på denne siden og endrer seg hver time.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              Påslag og fastbeløp
            </span>{" "}
            fra strømselskapet, som avhenger av avtalen din.
          </li>
          <li>
            <span className="font-medium text-gray-900">Nettleie</span> til
            nettselskapet, med forbruksavgift og andre avgifter. Her trekkes
            også strømstøtten fra.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-600">
          Les mer om strømstøtte og Norgespris hos{" "}
          <a
            href="https://www.regjeringen.no/no/tema/energi/strom/regjeringens-stromtiltak/id2900232/"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            regjeringen.no
          </a>
          .
        </p>
      </section>

      <Faq items={faq} />
    </main>
  );
}
