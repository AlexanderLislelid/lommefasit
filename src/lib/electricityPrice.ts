import { cacheLife } from "next/cache";

export const zones = {
  NO1: "Øst",
  NO2: "Sør",
  NO3: "Midt",
  NO4: "Nord",
  NO5: "Vest",
} as const;

export type Zone = keyof typeof zones;

export function isZone(value: unknown): value is Zone {
  // hasOwn, ikke `in`, så arvede nøkler som "constructor" ikke godtas.
  return typeof value === "string" && Object.hasOwn(zones, value);
}

type ApiPrice = { NOK_per_kWh: number; time_start: string; time_end: string };

export type HourlyPrice = {
  hour: number;
  orePerKwh: number;
  orePerKwhAfterSupport: number;
};

// Strømstøtte for husholdninger i 2026: staten dekker 90 % av spotprisen over 77 øre/kWh
// eks. mva., time for time. Forskrift om strømstønad (FOR-2025-09-08-1791).
const SUPPORT_THRESHOLD_ORE = 77;
const SUPPORT_RATE = 0.9;

// NO4 er fritatt for mva.
function vatMultiplier(zone: Zone): number {
  return zone === "NO4" ? 1 : 1.25;
}

function afterSupport(orePerKwhExVat: number): number {
  const support =
    Math.max(orePerKwhExVat - SUPPORT_THRESHOLD_ORE, 0) * SUPPORT_RATE;
  return orePerKwhExVat - support;
}

// Prisene kan komme i 15-minuttersintervaller, så vi slår dem sammen til snitt per time.
// Timen leses rett fra tidsstempelet, som allerede er i norsk tid.
export async function fetchElectricityPrices(
  date: string,
  zone: Zone,
): Promise<HourlyPrice[]> {
  "use cache";
  cacheLife("hours");

  const [year, month, day] = date.split("-");
  const res = await fetch(
    `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_${zone}.json`,
  );
  if (!res.ok) return [];

  const data: ApiPrice[] = await res.json();
  const byHour = new Map<number, number[]>();
  for (const p of data) {
    const hour = Number(p.time_start.slice(11, 13));
    byHour.set(hour, [...(byHour.get(hour) ?? []), p.NOK_per_kWh]);
  }

  return [...byHour].map(([hour, prices]) => {
    const exVat = (prices.reduce((a, b) => a + b, 0) / prices.length) * 100;
    return {
      hour,
      orePerKwh: exVat * vatMultiplier(zone),
      orePerKwhAfterSupport: afterSupport(exVat) * vatMultiplier(zone),
    };
  });
}
