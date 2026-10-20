import { RefreshCw } from "lucide-react";
import Link from "next/link";
import type { Calculator } from "@/lib/calculators";

const colors: Record<
  Calculator["color"],
  { icon: string; accent: string; border: string; bg: string }
> = {
  green: {
    icon: "bg-white text-emerald-700 ring-emerald-100",
    accent: "text-emerald-700",
    border: "hover:border-emerald-200",
    bg: "from-emerald-50 via-white to-white",
  },
  blue: {
    icon: "bg-white text-blue-700 ring-blue-100",
    accent: "text-blue-700",
    border: "hover:border-blue-200",
    bg: "from-blue-50 via-white to-white",
  },
  orange: {
    icon: "bg-white text-orange-700 ring-orange-100",
    accent: "text-orange-700",
    border: "hover:border-orange-200",
    bg: "from-orange-50 via-white to-white",
  },
  purple: {
    icon: "bg-white text-purple-700 ring-purple-100",
    accent: "text-purple-700",
    border: "hover:border-purple-200",
    bg: "from-purple-50 via-white to-white",
  },
  teal: {
    icon: "bg-white text-teal-700 ring-teal-100",
    accent: "text-teal-700",
    border: "hover:border-teal-200",
    bg: "from-teal-50 via-white to-white",
  },
};

export default function CalculatorCard({ calc }: { calc: Calculator }) {
  const color = colors[calc.color];

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
