import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { calculatorColors } from "@/lib/calculatorColors";
import type { Calculator } from "@/lib/calculators";

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  const color = calculatorColors[calc.color];

  return (
    <Link
      href={`/${calc.slug}`}
      className={`group flex flex-col rounded-2xl border border-gray-200 bg-linear-to-br p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${color.border} ${color.bg}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <span
          className={`font-display inline-flex size-12 items-center justify-center rounded-xl text-lg font-bold shadow-sm ring-1 ring-inset ${color.icon}`}
        >
          {calc.icon}
        </span>
        {calc.status === "daily" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <RefreshCw aria-hidden className="size-3" />
            Daglig
          </span>
        )}
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-gray-900">
        {calc.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {calc.description}
      </p>
      <span
        className={`mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold ${color.accent}`}
      >
        {calc.cta ?? "Regn ut"}
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
