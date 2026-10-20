import Link from "next/link";
import type { Calculator } from "@/lib/calculators";

const colors: Record<Calculator["color"], string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  orange: "bg-orange-50 text-orange-700",
  purple: "bg-purple-50 text-purple-700",
};

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  return (
    <Link
      href={`/${calc.slug}`}
      className="group rounded-2xl border bg-white p-6 transition hover:shadow-md"
    >
      <span
        className={`mb-4 inline-flex size-11 items-center justify-center rounded-lg font-bold ${colors[calc.color]}`}
      >
        {calc.icon}
      </span>
      <h3 className="flex items-center gap-2 text-xl font-semibold">
        {calc.title}
        {calc.status === "live" && (
          <span className="rounded-full bg-emerald-50 px-2 text-xs text-emerald-700">
            Live
          </span>
        )}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{calc.description}</p>
      <span className="mt-4 inline-block font-semibold text-emerald-700 group-hover:underline">
        {calc.cta ?? "Rekn ut"} →
      </span>
    </Link>
  );
}
