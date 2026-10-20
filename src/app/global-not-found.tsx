import type { Metadata } from "next";
import Link from "next/link";
import RootDocument from "@/components/RootDocument";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fant ikke siden | Lommefasit",
  robots: { index: false },
};

const linkClass =
  "font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900";

export default function GlobalNotFound() {
  return (
    <RootDocument lang="nb">
      <main className="mx-auto w-full max-w-5xl px-4 py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-gray-900">
          Fant ikke siden
        </h1>
        <p className="mt-2 text-gray-600">
          Siden finnes ikke, eller den er flyttet.{" "}
          <Link href="/" className={linkClass}>
            Gå til forsiden
          </Link>
          .
        </p>
        <p lang="en" className="mt-6 text-gray-600">
          Page not found.{" "}
          <Link href="/en" hrefLang="en" className={linkClass}>
            Go to the English home page
          </Link>
          .
        </p>
      </main>
    </RootDocument>
  );
}
