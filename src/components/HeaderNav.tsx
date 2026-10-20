"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Calculator } from "@/lib/calculators";

export default function HeaderNav({ links }: { links: Calculator[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Kalkulatorer"
      className="-mx-4 flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      {links.map((calc) => {
        const active = pathname === `/${calc.slug}`;
        return (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition ${
              active
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {calc.title}
          </Link>
        );
      })}
    </nav>
  );
}
