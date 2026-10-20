"use client";

import { useState } from "react";
import { basicAmount, calculateHolidayPay, type Rate } from "@/lib/holidayPay";
import { formatNok } from "@/lib/format";

const rateOptions: { value: Rate; label: string; hint: string }[] = [
  { value: "standard", label: "10,2 %", hint: "4 uker + 1 dag ferie" },
  { value: "fiveWeeks", label: "12 %", hint: "5 uker ferie (tariff)" },
];

export default function HolidayPayCalculator() {
  const [income, setIncome] = useState("");
  const [rate, setRate] = useState<Rate>("standard");
  const [over60, setOver60] = useState(false);

  const amount = Number(income.replace(/\s/g, "").replace(",", ".")) || 0;
  const pay = calculateHolidayPay(amount, rate, over60);

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="income" className="text-sm font-medium text-gray-900">
            Feriepengegrunnlag
          </label>
          <p className="mt-1 text-sm text-gray-600">
            Lønn utbetalt i opptjeningsåret (året før feriepengene utbetales),
            uten feriepenger.
          </p>
          <div className="relative mt-3">
            <input
              id="income"
              inputMode="decimal"
              autoComplete="off"
              placeholder="550 000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-lg tabular-nums focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
              kr
            </span>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-gray-900">Sats</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {rateOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-xl border p-3 transition has-focus-visible:ring-2 has-focus-visible:ring-emerald-500 ${
                  rate === option.value
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-200"
                }`}
              >
                <input
                  type="radio"
                  name="rate"
                  value={option.value}
                  checked={rate === option.value}
                  onChange={() => setRate(option.value)}
                  className="sr-only"
                />
                <span className="font-display block text-lg font-semibold text-gray-900">
                  {option.label}
                </span>
                <span className="block text-xs text-gray-600">
                  {option.hint}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={over60}
            onChange={(e) => setOver60(e.target.checked)}
            className="mt-0.5 size-4 accent-emerald-600"
          />
          <span className="text-sm text-gray-700">
            Jeg er 60 år eller eldre innen utgangen av året feriepengene
            utbetales
            <span className="block text-xs text-gray-500">
              Gir 2,3 % ekstra av grunnlaget opp til 6G (
              {formatNok(6 * basicAmount)}).
            </span>
          </span>
        </label>
      </form>

      <dl className="flex flex-col rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-100 via-emerald-50 to-white p-6 shadow-sm">
        <dt className="text-sm font-medium text-emerald-900">
          Feriepenger før skatt
        </dt>
        <dd className="font-display mt-3 text-4xl font-semibold tracking-tight text-gray-900 tabular-nums">
          {formatNok(pay.total)}
        </dd>
        {over60 && (
          <dd className="mt-6 grid gap-2 border-t border-emerald-200 pt-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Ordinære feriepenger</span>
              <span className="tabular-nums">{formatNok(pay.base)}</span>
            </div>
            <div className="flex justify-between">
              <span>Ekstra over 60 år</span>
              <span className="tabular-nums">{formatNok(pay.extra)}</span>
            </div>
          </dd>
        )}
        <dd className="mt-auto pt-6 text-xs text-gray-600">
          Feriepenger er skattepliktig inntekt. Med vanlig tabelltrekk trekkes
          det ikke skatt av de ordinære feriepengene, men tillegget for over 60
          år blir skattetrukket. Arbeidsgiver trekker vanlig lønn for
          feriedagene når du tar dem ut (ferietrekk).
        </dd>
      </dl>
    </div>
  );
}
