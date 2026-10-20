import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription.nb,
    lang: "nb",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f4",
    theme_color: "#0d9488",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
