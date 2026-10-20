"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav aria-label="Kalkulatorer" className="hidden gap-1 sm:flex">
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
        className="inline-flex size-10 items-center justify-center rounded-xl text-gray-700 ring-1 ring-gray-200 transition ring-inset hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none sm:hidden"
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
            className="absolute inset-x-0 top-full h-screen bg-gray-900/20 sm:hidden"
          />
          <nav
            id="mobile-menu"
            aria-label="Kalkulatorer"
            className="absolute inset-x-0 top-full border-b border-gray-200 bg-white px-4 pt-2 pb-4 shadow-lg sm:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((calc) => {
                const active = pathname === `/${calc.slug}`;
                return (
                  <li key={calc.slug}>
                    <Link
                      href={`/${calc.slug}`}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl p-3 transition ${
                        active ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-display inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-gray-200 ring-inset">
                        {calc.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium text-gray-900">
                          {calc.title}
                        </span>
                        <span className="block truncate text-sm text-gray-600">
                          {calc.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
