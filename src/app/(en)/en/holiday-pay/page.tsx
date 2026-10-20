import type { Metadata } from "next";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/site";
import HolidayPayCalculator from "@/components/calculators/HolidayPayCalculator";

const title = "Holiday pay calculator Norway – feriepenger in English";
const description =
  "Calculate your Norwegian holiday pay (feriepenger) paid in June, at 10.2% or 12%, with the extra for workers aged 60 and over.";
const path = "/en/holiday-pay";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  lang: "en",
});

const faq: FaqItem[] = [
  {
    question: "How much holiday pay will I get in Norway?",
    answer:
      "You get 10.2% of your holiday pay basis, which is the salary paid out to you the year before. If you earned NOK 500,000 last year, your holiday pay is NOK 51,000. At 12% it is NOK 60,000.",
  },
  {
    question: "What counts towards the holiday pay basis?",
    answer:
      "The basis is salary for work paid out during the earning year, which is the year before the holiday pay is paid. Overtime pay counts. Last year's holiday pay, expense allowances for car, meals and lodging, and benefits in kind do not.",
  },
  {
    question: "When is holiday pay paid out?",
    answer:
      "By law, holiday pay is paid on the last regular payday before your holiday. Most employers pay it in June. Collective agreements may have other rules.",
  },
  {
    question: "Why is my June payslip lower than my holiday pay?",
    answer:
      "When you receive holiday pay, your employer usually deducts regular salary for the days you take off. This is called ferietrekk (holiday deduction). Holiday pay replaces your salary while you are off, so the June payout is less than salary and holiday pay combined.",
  },
  {
    question: "Is tax deducted from holiday pay?",
    answer:
      "Holiday pay is taxable income, but with the standard tax table (tabelltrekk) no tax is withheld from ordinary holiday pay. That is because the year's tax deductions are spread over the other months. The extra for those aged 60 and over is still taxed.",
  },
  {
    question: "Who gets 12% holiday pay?",
    answer:
      "You get 12% if you have five weeks of holiday through a collective agreement or your employment contract. The law gives 25 working days of holiday, which is four weeks and one day, and 10.2% holiday pay.",
  },
  {
    question: "What extra do I get if I am 60 or older?",
    answer:
      "If you turn 60 during the holiday year, you are entitled to six extra days off and a rate 2.3 percentage points higher. The extra is only calculated on the part of the basis up to 6G, six times the National Insurance basic amount.",
  },
  {
    question: "What happens to my holiday pay when I change jobs?",
    answer:
      "When you leave, all earned holiday pay must be paid no later than the last regular payday before you leave. In your first year with a new employer you have the right to take holiday, but you get no holiday pay from them, since it has already been paid. Many therefore take unpaid holiday the first year.",
  },
];

export default function HolidayPayEnglishPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd
        name={title}
        description={description}
        path={path}
        lang="en"
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Holiday pay in Norway
      </h1>
      <p className="mt-2 text-gray-600">
        Holiday pay (feriepenger) is calculated from the salary paid to you the
        year before and is usually paid in June. The standard rate is 10.2%, or
        12% if you have five weeks of holiday through a collective agreement.
      </p>
      <HolidayPayCalculator lang="en" />

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          How to calculate holiday pay
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            Find your holiday pay basis (feriepengegrunnlag): the salary paid to
            you last year. Many employers show it on the payslip.
          </li>
          <li>
            Multiply by 0.102 for the standard rate, or 0.12 if you have five
            weeks of holiday.
          </li>
          <li>If you are 60 or older, add 2.3% of the basis up to 6G.</li>
        </ol>
        <p className="mt-4 leading-relaxed text-gray-600">
          <span className="font-medium text-gray-900">Example:</span> If you
          earned NOK 500,000 last year, you get 500,000 × 0.102 = NOK 51,000 in
          holiday pay. At 12% it is NOK 60,000. If you are 60 or older at the
          standard rate, you get NOK 11,500 extra, NOK 62,500 in total.
        </p>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          What does the Holidays Act say?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          The rules are in{" "}
          <a
            href="https://lovdata.no/lov/1988-04-29-21/§10"
            hrefLang="nb"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            section 10 of the Holidays Act
          </a>{" "}
          (ferieloven) and section 11. The key points:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            You are entitled to 25 working days of holiday and 10.2% holiday
            pay.
          </li>
          <li>
            If you turn 60 during the holiday year, you get six extra days and a
            rate 2.3 percentage points higher.
          </li>
          <li>
            Holiday pay is paid on the last regular payday before your holiday.
          </li>
          <li>
            If you leave, all earned holiday pay must be paid before you go.
          </li>
        </ul>
      </section>

      <Faq items={faq} title="Frequently asked questions" />
    </main>
  );
}
