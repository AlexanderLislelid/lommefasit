import type { Metadata } from "next";
import Faq, { type FaqItem } from "@/components/Faq";
import { CalculatorJsonLd } from "@/components/JsonLd";
import OvertimeCalculator from "@/components/calculators/OvertimeCalculator";
import { pageMetadata } from "@/lib/site";

const title = "Overtime calculator Norway – work out your overtime pay";
const description =
  "Calculate what you get for overtime hours at 50% or 100% extra in Norway, from an hourly, monthly or yearly salary.";
const path = "/en/overtime";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path,
  lang: "en",
});

const faq: FaqItem[] = [
  {
    question: "How much do I get for an hour of overtime?",
    answer:
      "You get your regular hourly wage plus the overtime supplement. At NOK 300 an hour and 50% extra, that is NOK 450 for the hour. At 100% extra it is NOK 600.",
  },
  {
    question: "What is the difference between 50% and 100% overtime?",
    answer:
      "The law only requires at least 40% extra. 50% and 100% come from collective agreements, which often give 50% during the day on weekdays and 100% in the evening, at night, at weekends and on public holidays. What applies to you is stated in your employment contract or collective agreement.",
  },
  {
    question: "Are overtime and additional hours the same?",
    answer:
      "No. Overtime (overtid) is work beyond the legal limit of 9 hours a day or 40 hours a week. If you work more than agreed but below the legal limit, it is additional hours (merarbeid). You are then entitled to your regular hourly wage, but no supplement, unless your agreement says otherwise. With a 37.5-hour week, the first 2.5 extra hours may therefore come without a supplement, but many collective agreements give a supplement from the first hour.",
  },
  {
    question: "Do I get paid extra for working on Saturday or Sunday?",
    answer:
      "Not by law alone. Weekend work within your normal working hours does not entitle you to a supplement. Many collective agreements still give a weekend supplement or 100% overtime on Saturdays and Sundays.",
  },
  {
    question: "Why is so much tax deducted from my overtime?",
    answer:
      "Overtime is regular salary and is taxed the same way. The deduction can still seem high, because the tax table assumes you earn the same every month all year. If too much is deducted, you get the money back in your tax settlement.",
  },
  {
    question: "Can I take time off instead of getting overtime paid?",
    answer:
      "Yes, if you and your employer agree in writing. You can then take the hours as time off, hour for hour, but the overtime supplement must still be paid.",
  },
  {
    question: "How much overtime is allowed?",
    answer:
      "The main rule is a maximum of 10 hours a week, 25 hours per four weeks and 200 hours a year. In businesses with a collective agreement, the employer and union representatives can agree to raise the limit to 20 hours a week, 50 hours per four weeks and 300 hours a year. Overtime may only be used when there is a special, time-limited need.",
  },
  {
    question: "Is everyone entitled to overtime pay?",
    answer:
      "No. Employees in senior or particularly independent positions are exempt from the working hours rules and are not entitled to an overtime supplement by law. This depends on the tasks, not the job title.",
  },
];

export default function OvertimeEnglishPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <CalculatorJsonLd
        name={title}
        description={description}
        path={path}
        lang="en"
      />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Overtime
      </h1>
      <p className="mt-2 text-gray-600">
        Overtime is work beyond the legal limit of 9 hours a day or 40 hours a
        week. You get your regular hourly wage plus a supplement of at least
        40%, and often 50% or 100% under a collective agreement.
      </p>
      <OvertimeCalculator lang="en" />

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          How to calculate overtime pay
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            Find your hourly wage. If you have a fixed salary, divide your
            yearly salary by 1,950 hours, which equals 37.5 hours a week.
          </li>
          <li>
            Multiply the hourly wage by 1.5 for 50% extra, or by 2 for 100%
            extra.
          </li>
          <li>Multiply by the number of overtime hours.</li>
        </ol>
        <p className="mt-4 leading-relaxed text-gray-600">
          <span className="font-medium text-gray-900">Example:</span> With a
          yearly salary of NOK 585,000, your hourly wage is NOK 300. If you work
          6 hours at 50% and 4 hours at 100%, you get 6 × NOK 450 + 4 × NOK 600
          = NOK 5,100 before tax. Of this, NOK 2,100 is the overtime supplement
          itself.
        </p>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          What does the Working Environment Act say?
        </h2>
        <p className="mt-4 leading-relaxed text-gray-600">
          The rules are in{" "}
          <a
            href="https://lovdata.no/lov/2005-06-17-62/§10-6"
            hrefLang="nb"
            className="font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
          >
            section 10-6 of the Working Environment Act
          </a>{" "}
          (arbeidsmiljøloven). The key points:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-600">
          <li>
            The overtime supplement must be at least 40% of the hourly wage.
          </li>
          <li>
            Overtime is only allowed when there is a special, time-limited need.
          </li>
          <li>
            You can ask to be exempted from overtime for health reasons or
            important social reasons.
          </li>
          <li>Senior and particularly independent positions are exempt.</li>
        </ul>
      </section>

      <Faq items={faq} title="Frequently asked questions" />
    </main>
  );
}
