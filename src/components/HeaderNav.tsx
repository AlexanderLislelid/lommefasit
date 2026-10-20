"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { calculatorColors } from "@/lib/calculatorColors";
import type { Calculator } from "@/lib/calculators";

export default function HeaderNav({ links }: { links: Calculator[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    // Hindrer at siden bak scroller mens menyen er åpen.
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Kalkulatorer" className="hidden gap-1 lg:flex">
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

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="inline-flex size-10 items-center justify-center rounded-xl text-gray-700 ring-1 ring-gray-200 transition ring-inset hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none lg:hidden"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
        <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
      </button>

      {open && (
        <>
          {/* Header har backdrop-blur, så fixed-elementer plasseres relativt til den; derfor absolute + h-screen. */}
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="absolute inset-x-0 top-full h-screen bg-gray-900/30 backdrop-blur-sm transition-opacity duration-200 lg:hidden starting:opacity-0"
          />
          <div className="absolute inset-x-0 top-full px-4 pt-3 lg:hidden">
            <nav
              id="mobile-menu"
              aria-label="Kalkulatorer"
              className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-2 shadow-xl transition duration-200 starting:-translate-y-2 starting:opacity-0"
            >
              <p className="px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Kalkulatorer
              </p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {links.map((calc) => {
                  const active = pathname === `/${calc.slug}`;
                  const color = calculatorColors[calc.color];
                  return (
                    <li key={calc.slug}>
                      <Link
                        href={`/${calc.slug}`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-3 rounded-xl p-3 transition focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:outline-none ${
                          active ? color.soft : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`font-display inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-sm font-bold shadow-sm ring-1 ring-inset ${color.icon} ${color.bg}`}
                        >
                          {calc.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-gray-900">
                            {calc.title}
                          </span>
                          <span className="line-clamp-1 text-sm text-gray-600">
                            {calc.description}
                          </span>
                        </span>
                        <ChevronRight
                          aria-hidden
                          className={`size-4 shrink-0 transition group-hover:translate-x-0.5 ${
                            active
                              ? color.accent
                              : "text-gray-300 group-hover:text-gray-500"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
