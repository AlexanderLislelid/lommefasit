"use client";

import { useState } from "react";
import {
  calculateOvertimePay,
  hoursPerYear,
  toHourlyWage,
  type WageBasis,
} from "@/lib/overtime";
import { formatNok } from "@/lib/format";

const basisOptions: { value: WageBasis; label: string; placeholder: string }[] =
  [
    { value: "hourly", label: "Timelønn", placeholder: "300" },
    { value: "monthly", label: "Månedslønn", placeholder: "48 750" },
    { value: "yearly", label: "Årslønn", placeholder: "585 000" },
  ];

function parseNumber(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", ".")) || 0;
}

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-lg tabular-nums focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none";

export default function OvertimeCalculator() {
  const [wage, setWage] = useState("");
  const [basis, setBasis] = useState<WageBasis>("hourly");
  const [fiftyHours, setFiftyHours] = useState("");
  const [hundredHours, setHundredHours] = useState("");

  const hourlyWage = toHourlyWage(parseNumber(wage), basis);
  const pay = calculateOvertimePay(
    hourlyWage,
    parseNumber(fiftyHours),
    parseNumber(hundredHours),
  );
  const selected = basisOptions.find((option) => option.value === basis)!;

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <fieldset>
          <legend className="text-sm font-medium text-gray-900">Lønn</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {basisOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-medium text-gray-900 transition has-focus-visible:ring-2 has-focus-visible:ring-orange-500 ${
                  basis === option.value
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200 hover:border-orange-200"
                }`}
              >
                <input
                  type="radio"
                  name="basis"
                  value={option.value}
                  checked={basis === option.value}
                  onChange={() => setBasis(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
          <div className="relative mt-3">
            <input
              id="wage"
              aria-label={selected.label}
              inputMode="decimal"
              autoComplete="off"
              placeholder={selected.placeholder}
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              className={`${inputClass} pr-12`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
              kr
            </span>
          </div>
          {basis !== "hourly" && (
            <p className="mt-2 text-sm text-gray-600">
              Tilsvarer {formatNok(hourlyWage)} i timen ({hoursPerYear} timer i
              året).
            </p>
          )}
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fiftyHours"
              className="text-sm font-medium text-gray-900"
            >
              Timer med 50 %
            </label>
            <div className="relative mt-3">
              <input
                id="fiftyHours"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0"
                value={fiftyHours}
                onChange={(e) => setFiftyHours(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                t
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="hundredHours"
              className="text-sm font-medium text-gray-900"
            >
              Timer med 100 %
            </label>
            <div className="relative mt-3">
              <input
                id="hundredHours"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0"
                value={hundredHours}
                onChange={(e) => setHundredHours(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                t
              </span>
            </div>
          </div>
        </div>
      </form>

      <dl className="flex flex-col rounded-2xl border border-orange-200 bg-linear-to-br from-orange-100 via-orange-50 to-white p-6 shadow-sm">
        <dt className="text-sm font-medium text-orange-900">
          Overtidsbetaling før skatt
        </dt>
        <dd className="font-display mt-3 text-4xl font-semibold tracking-tight text-gray-900 tabular-nums">
          {formatNok(pay.total)}
        </dd>
        <dd className="mt-6 grid gap-2 border-t border-orange-200 pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Med 50 % tillegg ({formatNok(hourlyWage * 1.5)}/t)</span>
            <span className="tabular-nums">{formatNok(pay.fifty)}</span>
          </div>
          <div className="flex justify-between">
            <span>Med 100 % tillegg ({formatNok(hourlyWage * 2)}/t)</span>
            <span className="tabular-nums">{formatNok(pay.hundred)}</span>
          </div>
          <div className="flex justify-between border-t border-orange-200 pt-2">
            <span>Herav overtidstillegg</span>
            <span className="tabular-nums">{formatNok(pay.supplement)}</span>
          </div>
        </dd>
        <dd className="mt-auto pt-6 text-xs text-gray-600">
          Overtidsbetaling er vanlig lønn og blir skattetrukket etter
          skattekortet ditt. Loven krever minst 40 % tillegg, men mange
          tariffavtaler gir 50 % på hverdager og 100 % på kveld, natt og helg.
          Sjekk avtalen din for hva som gjelder.
        </dd>
      </dl>
    </div>
  );
}
