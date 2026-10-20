import type { Metadata } from "next";
import ElectricityPrices from "@/components/ElectricityPrices";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";

const title = "Electricity price today in Norway – hourly price by zone";
const description =
  "See today's electricity price hour by hour in NO1–NO5, including VAT, with the cheapest and most expensive hour and the price after electricity support.";
const path = "/en/electricity-price";

// Kanonisk URL uten ?sone= og ?visning=, så variantene ikke konkurrerer i søk.
export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  lang: "en",
});

const faq: FaqItem[] = [
  {
    question: "What is the spot price?",
    answer:
      "The spot price is the market price of electricity from the Nord Pool power exchange. It is set for each price zone the day before, and prices for the next day are usually published around 1 pm. If you have a spot price contract, you pay this price plus a markup to your electricity supplier.",
  },
  {
    question: "What do I pay on top of the spot price?",
    answer:
      "You pay grid rent (nettleie) to the grid company, which also includes the electricity tax and other fees. On top of that comes a markup per kWh and a fixed monthly fee from your electricity supplier. The spot price is therefore only part of what electricity costs you.",
  },
  {
    question: "How does electricity support work?",
    answer:
      "The state covers 90% of the spot price above 77 øre per kWh excl. VAT, which is 96.25 øre incl. VAT. The support (strømstøtte) is calculated hour by hour for up to 5,000 kWh a month and is deducted automatically from your grid rent invoice. You do not need to apply.",
  },
  {
    question: "What is Norgespris?",
    answer:
      "Norgespris is an optional fixed price of 40 øre per kWh excl. VAT, which is 50 øre incl. VAT. In Northern Norway, where there is no VAT on electricity, the price is 40 øre. You choose Norgespris with your grid company. If you have Norgespris, you do not get electricity support as well.",
  },
  {
    question: "When is electricity cheapest?",
    answer:
      "Electricity is often cheapest at night and in the middle of the day, and most expensive in the morning and early evening when many people use electricity at the same time. It varies from day to day, so check the hourly prices before you charge your car or run the washing machine.",
  },
  {
    question: "Which price zone do I live in?",
    answer:
      "Norway is divided into five price zones: NO1 East (Oslo), NO2 South (Kristiansand and Stavanger), NO3 Central (Trondheim), NO4 North (Tromsø) and NO5 West (Bergen). Your grid company or electricity bill shows which zone you belong to.",
  },
  {
    question:
      "Why does the electricity price differ between Northern and Southern Norway?",
    answer:
      "There is a limit to how much electricity can be transferred between regions. Southern Norway is more connected to the European power market and more often gets higher prices, while Northern Norway often has surplus power and lower prices.",
  },
];

export default function ElectricityPriceEnglishPage({
  searchParams,
}: PageProps<"/en/electricity-price">) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd
        name={title}
        description={description}
        path={path}
        lang="en"
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Electricity price today
      </h1>
      <p className="mt-2 text-gray-600">
        Spot price per hour from the day-ahead market, including VAT (NO4 is
        exempt). Grid rent, taxes and your supplier&apos;s markup come on top.
      </p>
      <ElectricityPrices lang="en" searchParams={searchParams} />
      <p className="mt-8 text-sm text-gray-500">
        Electricity prices from{" "}
        <a
          href="https://www.hvakosterstrommen.no"
          hrefLang="nb"
          className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
        >
          hvakosterstrommen.no
        </a>
        .
      </p>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          What are you actually paying for?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          Your electricity bill has three parts:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            <span className="font-medium text-gray-900">The spot price</span>,
            shown on this page, which changes every hour.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              A markup and fixed fee
            </span>{" "}
            from your electricity supplier, depending on your contract.
          </li>
          <li>
            <span className="font-medium text-gray-900">Grid rent</span> to the
            grid company, with the electricity tax and other fees. This is also
            where electricity support is deducted.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-600">
          Read more about electricity support and Norgespris at{" "}
          <a
            href="https://www.regjeringen.no/no/tema/energi/strom/regjeringens-stromtiltak/id2900232/"
            hrefLang="nb"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            regjeringen.no
          </a>{" "}
          (in Norwegian).
        </p>
      </section>

      <Faq items={faq} title="Frequently asked questions" />
    </main>
  );
}
