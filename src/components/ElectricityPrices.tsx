import {
  ArrowDown,
  ArrowUp,
  Equal,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  fetchElectricityPrices,
  isZone,
  zones,
  type HourlyPrice,
  type Zone,
} from "@/lib/electricityPrice";
import { formatDecimal, formatOre } from "@/lib/format";
import type { Lang } from "@/lib/i18n";

const copy = {
  nb: {
    zones,
    view: "Visning",
    spot: "Spotpris",
    afterSupport: "Etter strømstøtte",
    zone: "Prisområde",
    supportNote:
      "Staten dekker 90 % av spotprisen over 77 øre/kWh eks. mva. (96,25 øre med mva.). Støtten trekkes fra på nettleiefakturaen. Har du Norgespris, betaler du i stedet fast 50 øre/kWh med mva. (40 øre i Nord-Norge).",
    noPrices: "Fant ingen priser for i dag. Prøv igjen litt senere.",
    now: "Nå, kl.",
    average: "Snitt i dag",
    allHours: "Alle timer",
    lowest: "Lavest",
    highest: "Høyest",
    at: "kl.",
    diff: (percent: number, below: boolean) =>
      `${percent} % ${below ? "under" : "over"} snittet`,
    chart: "Pris per time (øre/kWh)",
    table: "Vis som tabell",
    hour: "Time",
    pricePerKwh: "Pris per kWh",
    loading: "Henter strømpriser …",
  },
  en: {
    zones: {
      NO1: "East",
      NO2: "South",
      NO3: "Central",
      NO4: "North",
      NO5: "West",
    },
    view: "View",
    spot: "Spot price",
    afterSupport: "After electricity support",
    zone: "Price zone",
    supportNote:
      "The state covers 90% of the spot price above 77 øre/kWh excl. VAT (96.25 øre incl. VAT). The support is deducted on your grid rent invoice. If you have Norgespris, you instead pay a fixed 50 øre/kWh incl. VAT (40 øre in Northern Norway).",
    noPrices: "No prices found for today. Please try again a little later.",
    now: "Now,",
    average: "Today's average",
    allHours: "All hours",
    lowest: "Lowest",
    highest: "Highest",
    at: "",
    diff: (percent: number, below: boolean) =>
      `${percent}% ${below ? "below" : "above"} average`,
    chart: "Price per hour (øre/kWh)",
    table: "Show as table",
    hour: "Hour",
    pricePerKwh: "Price per kWh",
    loading: "Loading electricity prices …",
  },
} satisfies Record<
  Lang,
  { zones: Record<Zone, string>; [key: string]: unknown }
>;

type Copy = (typeof copy)[Lang];

type Props = {
  lang: Lang;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ElectricityPrices({ lang, searchParams }: Props) {
  return (
    <Suspense fallback={<Loading t={copy[lang]} />}>
      <Prices lang={lang} searchParams={searchParams} />
    </Suspense>
  );
}

async function Prices({ lang, searchParams }: Props) {
  const t = copy[lang];
  const { sone: param, visning } = await searchParams;
  const zone: Zone = isZone(param) ? param : "NO1";
  const withSupport = visning === "stotte";

  // Klokkeslettet skal gjelde for hver forespørsel, ikke fryses i en forhåndsrendring.
  await connection();
  const now = new Date();
  const date = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Oslo" });
  const currentHour = Number(
    now.toLocaleString("nb-NO", {
      timeZone: "Europe/Oslo",
      hour: "2-digit",
      hourCycle: "h23",
    }),
  );

  const fetched = await fetchElectricityPrices(date, zone);
  // Resten av siden bruker orePerKwh, så vi bytter inn prisen etter støtte når den er valgt.
  const prices = withSupport
    ? fetched.map((p) => ({ ...p, orePerKwh: p.orePerKwhAfterSupport }))
    : fetched;

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ZonePicker t={t} selected={zone} withSupport={withSupport} />
        <ViewToggle t={t} zone={zone} withSupport={withSupport} />
      </div>
      {withSupport && (
        <p className="mt-4 text-sm text-gray-600">{t.supportNote}</p>
      )}
      {prices.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-gray-600">
          {t.noPrices}
        </p>
      ) : (
        <>
          <KeyFigures
            t={t}
            lang={lang}
            prices={prices}
            currentHour={currentHour}
          />
          <PriceChart
            t={t}
            lang={lang}
            prices={prices}
            currentHour={currentHour}
          />
          <PriceTable t={t} lang={lang} prices={prices} />
        </>
      )}
    </>
  );
}

function ViewToggle({
  t,
  zone,
  withSupport,
}: {
  t: Copy;
  zone: Zone;
  withSupport: boolean;
}) {
  const button =
    "rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition";
  const active = "bg-white text-gray-900 shadow-sm";
  const inactive = "text-gray-700 hover:text-gray-900";

  return (
    <nav
      aria-label={t.view}
      className="inline-flex shrink-0 self-start rounded-full bg-gray-200 p-1 ring-1 ring-gray-300 ring-inset"
    >
      <Link
        href={`?sone=${zone}`}
        aria-current={!withSupport ? "page" : undefined}
        className={`${button} ${!withSupport ? active : inactive}`}
      >
        {t.spot}
      </Link>
      <Link
        href={`?sone=${zone}&visning=stotte`}
        aria-current={withSupport ? "page" : undefined}
        className={`${button} ${withSupport ? active : inactive}`}
      >
        {t.afterSupport}
      </Link>
    </nav>
  );
}

function ZonePicker({
  t,
  selected,
  withSupport,
}: {
  t: Copy;
  selected: Zone;
  withSupport: boolean;
}) {
  return (
    <nav aria-label={t.zone} className="flex flex-wrap gap-2">
      {(Object.keys(zones) as Zone[]).map((zone) => (
        <Link
          key={zone}
          href={`?sone=${zone}${withSupport ? "&visning=stotte" : ""}`}
          aria-current={zone === selected ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            zone === selected
              ? "border-purple-700 bg-purple-700 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-purple-200"
          }`}
        >
          {zone} {t.zones[zone]}
        </Link>
      ))}
    </nav>
  );
}

function KeyFigures({
  t,
  lang,
  prices,
  currentHour,
}: {
  t: Copy;
  lang: Lang;
  prices: HourlyPrice[];
  currentHour: number;
}) {
  const values = prices.map((p) => p.orePerKwh);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const lowest = prices.reduce((a, b) => (b.orePerKwh < a.orePerKwh ? b : a));
  const highest = prices.reduce((a, b) => (b.orePerKwh > a.orePerKwh ? b : a));
  const current = prices.find((p) => p.hour === currentHour);
  const diff = current ? (current.orePerKwh - average) / average : 0;
  const at = (hour: number) =>
    t.at ? `${t.at} ${hourRange(hour)}` : hourRange(hour);

  const stats = [
    { label: t.average, value: average, hint: t.allHours, icon: Equal },
    {
      label: t.lowest,
      value: lowest.orePerKwh,
      hint: at(lowest.hour),
      icon: ArrowDown,
    },
    {
      label: t.highest,
      value: highest.orePerKwh,
      hint: at(highest.hour),
      icon: ArrowUp,
    },
  ];

  return (
    <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="col-span-2 flex flex-col rounded-2xl border border-purple-200 bg-linear-to-br from-purple-100 via-purple-50 to-white p-5 text-gray-900 shadow-sm lg:col-span-1">
        <dt className="flex items-center justify-between text-sm font-medium text-purple-900">
          {t.now} {hourRange(currentHour)}
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-purple-700 ring-1 ring-purple-200 ring-inset">
            <Zap aria-hidden className="size-4" />
          </span>
        </dt>
        <dd className="mt-3">
          <Amount lang={lang} value={current?.orePerKwh} />
        </dd>
        {current && Math.abs(diff) >= 0.005 && (
          <dd className="mt-auto pt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-purple-800 ring-1 ring-purple-200 ring-inset">
              {diff < 0 ? (
                <TrendingDown aria-hidden className="size-3.5" />
              ) : (
                <TrendingUp aria-hidden className="size-3.5" />
              )}
              {t.diff(Math.round(Math.abs(diff) * 100), diff < 0)}
            </span>
          </dd>
        )}
      </div>
      {stats.map(({ label, value, hint, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <dt className="flex items-center justify-between text-sm text-gray-600">
            {label}
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700 ring-1 ring-purple-100 ring-inset">
              <Icon aria-hidden className="size-4" />
            </span>
          </dt>
          <dd className="mt-3 text-gray-900">
            <Amount lang={lang} value={value} />
          </dd>
          <dd className="mt-auto pt-3 text-xs text-gray-500">{hint}</dd>
        </div>
      ))}
    </dl>
  );
}

function Amount({ lang, value }: { lang: Lang; value?: number }) {
  if (value === undefined) {
    return <span className="font-display text-3xl font-semibold">–</span>;
  }
  return (
    <>
      <span className="font-display text-3xl font-semibold tracking-tight tabular-nums">
        {formatDecimal(value, lang)}
      </span>{" "}
      <span className="text-sm text-gray-500">øre/kWh</span>
    </>
  );
}

function PriceChart({
  t,
  lang,
  prices,
  currentHour,
}: {
  t: Copy;
  lang: Lang;
  prices: HourlyPrice[];
  currentHour: number;
}) {
  const max = Math.max(...prices.map((p) => p.orePerKwh), 1);

  return (
    <figure className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <figcaption className="text-sm font-medium text-gray-900">
        {t.chart}
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
              <span className="text-gray-300">{hourRange(p.hour)}</span>{" "}
              <span className="font-semibold">
                {formatOre(p.orePerKwh, lang)}
              </span>
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

function PriceTable({
  t,
  lang,
  prices,
}: {
  t: Copy;
  lang: Lang;
  prices: HourlyPrice[];
}) {
  return (
    <details className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <summary className="cursor-pointer text-sm font-medium text-gray-900">
        {t.table}
      </summary>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-600">
            <th className="py-2 font-medium">{t.hour}</th>
            <th className="py-2 text-right font-medium">{t.pricePerKwh}</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p) => (
            <tr key={p.hour} className="border-b border-gray-100 last:border-0">
              <td className="py-1.5 text-gray-700">{hourRange(p.hour)}</td>
              <td className="py-1.5 text-right text-gray-900 tabular-nums">
                {formatOre(p.orePerKwh, lang)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

// Samme stil som PageSkeleton, formet som prisområder, nøkkeltall og graf.
function Loading({ t }: { t: Copy }) {
  return (
    <div role="status" className="animate-pulse">
      <span className="sr-only">{t.loading}</span>
      <div className="mt-8 flex flex-wrap gap-2">
        {Object.keys(zones).map((zone) => (
          <div key={zone} className="h-9 w-24 rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="col-span-2 h-36 rounded-2xl bg-gray-200 lg:col-span-1" />
        <div className="h-36 rounded-2xl bg-gray-200" />
        <div className="h-36 rounded-2xl bg-gray-200" />
        <div className="h-36 rounded-2xl bg-gray-200" />
      </div>
      <div className="mt-8 h-80 rounded-2xl bg-gray-200" />
    </div>
  );
}

function formatHour(hour: number): string {
  return String(hour).padStart(2, "0");
}

function hourRange(hour: number): string {
  return `${formatHour(hour)}–${formatHour((hour + 1) % 24)}`;
}
