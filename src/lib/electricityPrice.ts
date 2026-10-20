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
  return typeof value === "string" && value in zones;
}

type ApiPrice = { NOK_per_kWh: number; time_start: string; time_end: string };

export type HourlyPrice = { hour: number; orePerKwh: number };

// NO4 er fritatt for mva.
function vatMultiplier(zone: Zone): number {
  return zone === "NO4" ? 1 : 1.25;
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

  return [...byHour].map(([hour, prices]) => ({
    hour,
    orePerKwh:
      (prices.reduce((a, b) => a + b, 0) / prices.length) *
      100 *
      vatMultiplier(zone),
  }));
}
