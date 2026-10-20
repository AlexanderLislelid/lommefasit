import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...calculators
      .filter((calc) => calc.status !== "soon")
      .map((calc) => ({
        url: `${siteUrl}/${calc.slug}`,
        changeFrequency:
          calc.status === "daily" ? ("daily" as const) : ("monthly" as const),
        priority: 0.8,
      })),
  ];
}
