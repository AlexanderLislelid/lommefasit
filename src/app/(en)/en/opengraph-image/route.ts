import { ogImage } from "@/components/OgImage";

// Egen route i stedet for opengraph-image.tsx, som får en hash i URL-en inne i en route group.
export function GET() {
  return ogImage("en");
}
