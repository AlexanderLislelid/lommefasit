import { ImageResponse } from "next/og";
import type { Lang } from "@/lib/i18n";
import { siteName } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

const copy: Record<Lang, { heading: string; calculators: string }> = {
  nb: {
    heading: "Gratis kalkulatorer for hverdagsøkonomi",
    calculators:
      "Feriepenger · Prosent · Overtid · Kilometergodtgjørelse · Strømpris",
  },
  en: {
    heading: "Free calculators for everyday finances in Norway",
    calculators:
      "Holiday pay · Percentage · Overtime · Mileage allowance · Electricity",
  },
};

export function ogImage(lang: Lang) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "linear-gradient(135deg, #ecfdf5 0%, #f6f6f4 60%)",
        color: "#111928",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            width: 88,
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            background: "linear-gradient(135deg, #34d399, #0d9488)",
            color: "white",
            fontSize: 52,
            fontWeight: 700,
          }}
        >
          L
        </div>
        <div style={{ fontSize: 52, fontWeight: 700 }}>{siteName}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {copy[lang].heading}
        </div>
        <div style={{ fontSize: 34, color: "#4b5563" }}>
          {copy[lang].calculators}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
