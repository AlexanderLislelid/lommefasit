import Link from "next/link";
import { Suspense } from "react";
import {
  fetchElectricityPrices,
  isZone,
  zones,
  type HourlyPrice,
  type Zone,
} from "@/lib/electricityPrice";
import { formatOre } from "@/lib/format";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ElectricityPricePage({ searchParams }: Props) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
        Strømpris i dag
      </h1>
      <p className="mt-2 text-gray-600">
        Spotpris per time fra Nord Pool, inkludert mva. Nettleie og påslag fra
        strømselskapet kommer i tillegg.
      </p>
      <Suspense fallback={<Loading />}>
        <Prices searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Prices({ searchParams }: Props) {
  const { sone: param } = await searchParams;
  const zone: Zone = isZone(param) ? param : "NO1";

  const now = new Date();
  const date = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Oslo" });
  const currentHour = Number(
    now.toLocaleString("nb-NO", {
      timeZone: "Europe/Oslo",
      hour: "2-digit",
      hourCycle: "h23",
    }),
  );

  const prices = await fetchElectricityPrices(date, zone);

  return (
    <>
      <ZonePicker selected={zone} />
      {prices.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
          Fant ingen priser for i dag. Prøv igjen litt senere.
        </p>
      ) : (
        <>
          <KeyFigures prices={prices} currentHour={currentHour} />
          <PriceChart prices={prices} currentHour={currentHour} />
          <PriceTable prices={prices} />
        </>
      )}
    </>
  );
}

function ZonePicker({ selected }: { selected: Zone }) {
  return (
    <nav aria-label="Prisområde" className="mt-8 flex flex-wrap gap-2">
      {(Object.keys(zones) as Zone[]).map((zone) => (
        <Link
          key={zone}
          href={`?sone=${zone}`}
          aria-current={zone === selected ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            zone === selected
              ? "border-purple-700 bg-purple-700 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-purple-200"
          }`}
        >
          {zone} {zones[zone]}
        </Link>
      ))}
    </nav>
  );
}

function KeyFigures({
  prices,
  currentHour,
}: {
  prices: HourlyPrice[];
  currentHour: number;
}) {
  const values = prices.map((p) => p.orePerKwh);
  const lowest = prices.reduce((a, b) => (b.orePerKwh < a.orePerKwh ? b : a));
  const highest = prices.reduce((a, b) => (b.orePerKwh > a.orePerKwh ? b : a));
  const currentPrice = prices.find((p) => p.hour === currentHour);

  const stats = [
    {
      label: "Nå",
      value: currentPrice?.orePerKwh,
      hint: `kl. ${formatHour(currentHour)}`,
    },
    {
      label: "Snitt i dag",
      value: values.reduce((a, b) => a + b, 0) / values.length,
    },
    {
      label: "Lavest",
      value: lowest.orePerKwh,
      hint: `kl. ${formatHour(lowest.hour)}`,
    },
    {
      label: "Høyest",
      value: highest.orePerKwh,
      hint: `kl. ${formatHour(highest.hour)}`,
    },
  ];

  return (
    <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <dt className="text-sm text-gray-600">{s.label}</dt>
          <dd className="font-display mt-1 text-2xl font-semibold text-gray-900">
            {s.value === undefined ? "–" : formatOre(s.value)}
          </dd>
          {s.hint && <dd className="text-xs text-gray-500">{s.hint}</dd>}
        </div>
      ))}
    </dl>
  );
}

function PriceChart({
  prices,
  currentHour,
}: {
  prices: HourlyPrice[];
  currentHour: number;
}) {
  const max = Math.max(...prices.map((p) => p.orePerKwh), 1);

  return (
    <figure className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <figcaption className="text-sm font-medium text-gray-900">
        Pris per time (øre/kWh)
      </figcaption>
      <div className="mt-6 flex h-56 items-end gap-0.5">
        {prices.map((p) => (
          <div
            key={p.hour}
            className="group relative flex h-full flex-1 items-end"
          >
            <div
              className={`w-full rounded-t ${
                p.hour === currentHour
                  ? "bg-purple-700"
                  : "bg-purple-300 group-hover:bg-purple-400"
              }`}
              style={{
                height: `${Math.max((p.orePerKwh / max) * 100, 1)}%`,
              }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg group-hover:block">
              <span className="text-gray-300">
                {formatHour(p.hour)}–{formatHour((p.hour + 1) % 24)}
              </span>{" "}
              <span className="font-semibold">{formatOre(p.orePerKwh)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-0.5 text-xs text-gray-500">
        {prices.map((p) => (
          <span key={p.hour} className="flex-1 text-center">
            {p.hour % 3 === 0 ? formatHour(p.hour) : ""}
          </span>
        ))}
      </div>
    </figure>
  );
}

function PriceTable({ prices }: { prices: HourlyPrice[] }) {
  return (
    <details className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <summary className="cursor-pointer text-sm font-medium text-gray-900">
        Vis som tabell
      </summary>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-600">
            <th className="py-2 font-medium">Time</th>
            <th className="py-2 text-right font-medium">Pris per kWh</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p) => (
            <tr key={p.hour} className="border-b border-gray-100 last:border-0">
              <td className="py-1.5 text-gray-700">
                {formatHour(p.hour)}–{formatHour((p.hour + 1) % 24)}
              </td>
              <td className="py-1.5 text-right text-gray-900 tabular-nums">
                {formatOre(p.orePerKwh)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function Loading() {
  return (
    <div className="mt-8 h-96 animate-pulse rounded-2xl border border-gray-200 bg-white" />
  );
}

function formatHour(hour: number): string {
  return String(hour).padStart(2, "0");
}
