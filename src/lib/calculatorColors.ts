import type { Calculator } from "@/lib/calculators";

// Fulle klassenavn, slik at Tailwind finner dem når den skanner kildekoden.
export const calculatorColors: Record<
  Calculator["color"],
  { icon: string; accent: string; border: string; bg: string; soft: string }
> = {
  green: {
    icon: "bg-white text-emerald-700 ring-emerald-100",
    accent: "text-emerald-700",
    border: "hover:border-emerald-200",
    bg: "from-emerald-50 via-white to-white",
    soft: "bg-emerald-50",
  },
  blue: {
    icon: "bg-white text-blue-700 ring-blue-100",
    accent: "text-blue-700",
    border: "hover:border-blue-200",
    bg: "from-blue-50 via-white to-white",
    soft: "bg-blue-50",
  },
  orange: {
    icon: "bg-white text-orange-700 ring-orange-100",
    accent: "text-orange-700",
    border: "hover:border-orange-200",
    bg: "from-orange-50 via-white to-white",
    soft: "bg-orange-50",
  },
  purple: {
    icon: "bg-white text-purple-700 ring-purple-100",
    accent: "text-purple-700",
    border: "hover:border-purple-200",
    bg: "from-purple-50 via-white to-white",
    soft: "bg-purple-50",
  },
  teal: {
    icon: "bg-white text-teal-700 ring-teal-100",
    accent: "text-teal-700",
    border: "hover:border-teal-200",
    bg: "from-teal-50 via-white to-white",
    soft: "bg-teal-50",
  },
  rose: {
    icon: "bg-white text-rose-700 ring-rose-100",
    accent: "text-rose-700",
    border: "hover:border-rose-200",
    bg: "from-rose-50 via-white to-white",
    soft: "bg-rose-50",
  },
};
