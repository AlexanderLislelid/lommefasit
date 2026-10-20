import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";
import { siteMetadata } from "@/lib/site";

export const metadata: Metadata = siteMetadata("nb");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootDocument lang="nb">{children}</RootDocument>;
}
