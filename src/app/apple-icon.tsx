import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS runder hjørnene selv, så bakgrunnen fyller hele flaten.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #34d399, #0d9488)",
        color: "white",
        fontSize: 110,
        fontWeight: 700,
      }}
    >
      L
    </div>,
    size,
  );
}
