"use client";

import { useState } from "react";
import {
  calculateMileageAllowance,
  passengerRate,
  stateRate,
  taxFreeRate,
} from "@/lib/mileage";
import { formatNok, formatNumber, parseNumber } from "@/lib/format";
import type { Lang } from "@/lib/i18n";

const copy: Record<
  Lang,
  {
    km: string;
    passengers: string;
    rate: string;
    rates: (state: string, passenger: string) => string;
    result: string;
    taxFree: string;
    taxable: string;
    passengerPay: string;
    note: (taxFree: string) => string;
  }
> = {
  nb: {
    km: "Kjørte kilometer",
    passengers: "Passasjerer",
    rate: "Sats per km",
    rates: (state, passenger) =>
      `Statens sats er ${state} kr per km. Passasjertillegg er ${passenger} kr per km per kollega du har med.`,
    result: "Kjøregodtgjørelse",
    taxFree: "Skattefritt",
    taxable: "Skattepliktig",
    passengerPay: "Herav passasjertillegg",
    note: (taxFree) =>
      `${taxFree} kr per km er trekkfritt. Det du får utover det, blir skattetrukket som vanlig lønn. Passasjertillegget er skattefritt. Satsene gjelder for 2026.`,
  },
  en: {
    km: "Kilometres driven",
    passengers: "Passengers",
    rate: "Rate per km",
    rates: (state, passenger) =>
      `The state rate is NOK ${state} per km. The passenger supplement is NOK ${passenger} per km for each colleague you bring.`,
    result: "Mileage allowance",
    taxFree: "Tax-free",
    taxable: "Taxable",
    passengerPay: "Of which passenger supplement",
    note: (taxFree) =>
      `NOK ${taxFree} per km is tax-free. Anything above that is taxed as regular salary. The passenger supplement is tax-free. The rates apply to 2026.`,
  },
};

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-lg tabular-nums focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none";

const suffixClass =
  "pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500";

export default function MileageCalculator({ lang = "nb" }: { lang?: Lang }) {
  const t = copy[lang];
  const [km, setKm] = useState("");
  const [passengers, setPassengers] = useState("");
  const [rate, setRate] = useState("");

  const pay = calculateMileageAllowance(
    parseNumber(km, lang),
    parseNumber(passengers, lang),
    rate.trim() ? parseNumber(rate, lang) : stateRate,
  );

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="km" className="text-sm font-medium text-gray-900">
            {t.km}
          </label>
          <div className="relative mt-3">
            <input
              id="km"
              inputMode="decimal"
              autoComplete="off"
              placeholder="120"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              className={`${inputClass} pr-12`}
            />
            <span className={suffixClass}>km</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="passengers"
              className="text-sm font-medium text-gray-900"
            >
              {t.passengers}
            </label>
            <input
              id="passengers"
              inputMode="numeric"
              autoComplete="off"
              placeholder="0"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className={`${inputClass} mt-3`}
            />
          </div>
          <div>
            <label htmlFor="rate" className="text-sm font-medium text-gray-900">
              {t.rate}
            </label>
            <div className="relative mt-3">
              <input
                id="rate"
                inputMode="decimal"
                autoComplete="off"
                placeholder={formatNumber(stateRate, lang)}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <span className={suffixClass}>kr</span>
            </div>
          </div>
        </div>
        <p className="-mt-3 text-sm text-gray-600">
          {t.rates(
            formatNumber(stateRate, lang),
            formatNumber(passengerRate, lang),
          )}
        </p>
      </form>

      <dl className="flex flex-col rounded-2xl border border-rose-200 bg-linear-to-br from-rose-100 via-rose-50 to-white p-6 shadow-sm">
        <dt className="text-sm font-medium text-rose-900">{t.result}</dt>
        <dd className="font-display mt-3 text-4xl font-semibold tracking-tight text-gray-900 tabular-nums">
          {formatNok(pay.total, lang)}
        </dd>
        <dd className="mt-6 grid gap-2 border-t border-rose-200 pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>{t.taxFree}</span>
            <span className="tabular-nums">{formatNok(pay.taxFree, lang)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.taxable}</span>
            <span className="tabular-nums">{formatNok(pay.taxable, lang)}</span>
          </div>
          {pay.passengers > 0 && (
            <div className="flex justify-between border-t border-rose-200 pt-2">
              <span>{t.passengerPay}</span>
              <span className="tabular-nums">
                {formatNok(pay.passengers, lang)}
              </span>
            </div>
          )}
        </dd>
        <dd className="mt-auto pt-6 text-xs text-gray-600">
          {t.note(formatNumber(taxFreeRate, lang))}
        </dd>
      </dl>
    </div>
  );
}
