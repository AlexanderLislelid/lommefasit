"use client";

import { useState } from "react";
import {
  amountOf,
  applyDiscount,
  percentChange,
  percentOf,
} from "@/lib/percent";
import {
  formatNok,
  formatNumber,
  formatPercent,
  parseNumber,
} from "@/lib/format";
import type { Lang } from "@/lib/i18n";

type Mode = "share" | "of" | "change" | "discount";

type Field = { label: string; suffix?: string; placeholder: string };

type Result = { label: string; value: string; detail?: string };

type ModeOption = {
  value: Mode;
  label: string;
  fields: [Field, Field];
  calculate: (a: number, b: number) => Result;
};

function getModes(lang: Lang): ModeOption[] {
  const n = (value: number) => formatNumber(value, lang);
  const pct = (value: number) => formatPercent(value, lang);
  const kr = (value: number) => formatNok(value, lang);

  if (lang === "en") {
    return [
      {
        value: "share",
        label: "X of Y",
        fields: [
          { label: "What percent is", placeholder: "25" },
          { label: "of", placeholder: "200" },
        ],
        calculate: (a, b) => {
          const result = percentOf(a, b);
          return {
            label: `${n(a)} of ${n(b)} is`,
            value: result === null ? "–" : pct(result),
          };
        },
      },
      {
        value: "of",
        label: "X% of Y",
        fields: [
          { label: "What is", suffix: "%", placeholder: "15" },
          { label: "of", placeholder: "400" },
        ],
        calculate: (a, b) => ({
          label: `${pct(a)} of ${n(b)} is`,
          value: n(amountOf(a, b)),
        }),
      },
      {
        value: "change",
        label: "Increase/decrease",
        fields: [
          { label: "From", placeholder: "80" },
          { label: "To", placeholder: "100" },
        ],
        calculate: (a, b) => {
          const result = percentChange(a, b);
          if (result === null) return { label: "Change", value: "–" };
          return {
            label: result < 0 ? "Decrease" : "Increase",
            value: pct(Math.abs(result)),
            detail: `Difference: ${n(b - a)}`,
          };
        },
      },
      {
        value: "discount",
        label: "Discount",
        fields: [
          { label: "Price", suffix: "kr", placeholder: "499" },
          { label: "Discount", suffix: "%", placeholder: "20" },
        ],
        calculate: (a, b) => {
          const discount = applyDiscount(a, b);
          return {
            label: "Price after discount",
            value: kr(discount.price),
            detail: `You save ${kr(discount.saved)}`,
          };
        },
      },
    ];
  }

  return [
    {
      value: "share",
      label: "X av Y",
      fields: [
        { label: "Hvor mange prosent er", placeholder: "25" },
        { label: "av", placeholder: "200" },
      ],
      calculate: (a, b) => {
        const result = percentOf(a, b);
        return {
          label: `${n(a)} av ${n(b)} er`,
          value: result === null ? "–" : pct(result),
        };
      },
    },
    {
      value: "of",
      label: "X % av Y",
      fields: [
        { label: "Hva er", suffix: "%", placeholder: "15" },
        { label: "av", placeholder: "400" },
      ],
      calculate: (a, b) => ({
        label: `${pct(a)} av ${n(b)} er`,
        value: n(amountOf(a, b)),
      }),
    },
    {
      value: "change",
      label: "Økning/nedgang",
      fields: [
        { label: "Fra", placeholder: "80" },
        { label: "Til", placeholder: "100" },
      ],
      calculate: (a, b) => {
        const result = percentChange(a, b);
        if (result === null) return { label: "Endring", value: "–" };
        return {
          label: result < 0 ? "Nedgang" : "Økning",
          value: pct(Math.abs(result)),
          detail: `Differanse: ${n(b - a)}`,
        };
      },
    },
    {
      value: "discount",
      label: "Rabatt",
      fields: [
        { label: "Pris", suffix: "kr", placeholder: "499" },
        { label: "Rabatt", suffix: "%", placeholder: "20" },
      ],
      calculate: (a, b) => {
        const discount = applyDiscount(a, b);
        return {
          label: "Pris etter rabatt",
          value: `${n(discount.price)} kr`,
          detail: `Du sparer ${n(discount.saved)} kr`,
        };
      },
    },
  ];
}

export default function PercentCalculator({ lang = "nb" }: { lang?: Lang }) {
  const modes = getModes(lang);
  const [mode, setMode] = useState<Mode>("share");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const selected = modes.find((option) => option.value === mode)!;
  const result = selected.calculate(parseNumber(a, lang), parseNumber(b, lang));
  const values = [a, b];
  const setters = [setA, setB];

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <fieldset>
          <legend className="text-sm font-medium text-gray-900">
            {lang === "en"
              ? "What do you want to calculate?"
              : "Hva vil du regne ut?"}
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {modes.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-medium text-gray-900 transition has-focus-visible:ring-2 has-focus-visible:ring-blue-500 ${
                  mode === option.value
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          {selected.fields.map((field, i) => (
            <div key={i}>
              <label
                htmlFor={`value-${i}`}
                className="text-sm font-medium text-gray-900"
              >
                {field.label}
              </label>
              <div className="relative mt-3">
                <input
                  id={`value-${i}`}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={field.placeholder}
                  value={values[i]}
                  onChange={(e) => setters[i](e.target.value)}
                  className={`w-full rounded-xl border border-gray-300 px-4 py-3 text-lg tabular-nums focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                    field.suffix ? "pr-10" : ""
                  }`}
                />
                {field.suffix && (
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>

      <dl className="flex flex-col rounded-2xl border border-blue-200 bg-linear-to-br from-blue-100 via-blue-50 to-white p-6 shadow-sm">
        <dt className="text-sm font-medium text-blue-900">{result.label}</dt>
        <dd className="font-display mt-3 text-4xl font-semibold tracking-tight text-gray-900 tabular-nums">
          {result.value}
        </dd>
        {result.detail && (
          <dd className="mt-6 border-t border-blue-200 pt-4 text-sm text-gray-700 tabular-nums">
            {result.detail}
          </dd>
        )}
      </dl>
    </div>
  );
}
