import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Samme merke som logoen i headeren.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        background: "linear-gradient(135deg, #34d399, #0d9488)",
        color: "white",
        fontSize: 20,
        fontWeight: 700,
      }}
    >
      L
    </div>,
    size,
  );
}
