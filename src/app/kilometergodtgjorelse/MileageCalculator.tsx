"use client";

import { useState } from "react";
import {
  calculateMileageAllowance,
  passengerRate,
  stateRate,
  taxFreeRate,
} from "@/lib/mileage";
import { formatNok, formatNumber } from "@/lib/format";

function parseNumber(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", ".")) || 0;
}

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-lg tabular-nums focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none";

const suffixClass =
  "pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500";

export default function MileageCalculator() {
  const [km, setKm] = useState("");
  const [passengers, setPassengers] = useState("");
  const [rate, setRate] = useState("");

  const pay = calculateMileageAllowance(
    parseNumber(km),
    parseNumber(passengers),
    rate.trim() ? parseNumber(rate) : stateRate,
  );

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="km" className="text-sm font-medium text-gray-900">
            Kjørte kilometer
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
              Passasjerer
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
              Sats per km
            </label>
            <div className="relative mt-3">
              <input
                id="rate"
                inputMode="decimal"
                autoComplete="off"
                placeholder={formatNumber(stateRate)}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <span className={suffixClass}>kr</span>
            </div>
          </div>
        </div>
        <p className="-mt-3 text-sm text-gray-600">
          Statens sats er {formatNumber(stateRate)} kr per km. Passasjertillegg
          er {formatNumber(passengerRate)} kr per km per kollega du har med.
        </p>
      </form>

      <dl className="flex flex-col rounded-2xl border border-rose-200 bg-linear-to-br from-rose-100 via-rose-50 to-white p-6 shadow-sm">
        <dt className="text-sm font-medium text-rose-900">Kjøregodtgjørelse</dt>
        <dd className="font-display mt-3 text-4xl font-semibold tracking-tight text-gray-900 tabular-nums">
          {formatNok(pay.total)}
        </dd>
        <dd className="mt-6 grid gap-2 border-t border-rose-200 pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Skattefritt</span>
            <span className="tabular-nums">{formatNok(pay.taxFree)}</span>
          </div>
          <div className="flex justify-between">
            <span>Skattepliktig</span>
            <span className="tabular-nums">{formatNok(pay.taxable)}</span>
          </div>
          {pay.passengers > 0 && (
            <div className="flex justify-between border-t border-rose-200 pt-2">
              <span>Herav passasjertillegg</span>
              <span className="tabular-nums">{formatNok(pay.passengers)}</span>
            </div>
          )}
        </dd>
        <dd className="mt-auto pt-6 text-xs text-gray-600">
          {formatNumber(taxFreeRate)} kr per km er trekkfritt. Det du får utover
          det, blir skattetrukket som vanlig lønn. Passasjertillegget er
          skattefritt. Satsene gjelder for 2026.
        </dd>
      </dl>
    </div>
  );
}
