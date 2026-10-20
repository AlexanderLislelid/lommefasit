import { ogImage, ogSize } from "@/components/OgImage";

export const alt = "Lommefasit – gratis kalkulatorer for hverdagsøkonomi";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage("nb");
}
