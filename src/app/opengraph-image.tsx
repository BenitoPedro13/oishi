import { ImageResponse } from "next/og";
import { AJI_PATH, HINOMARU_GRADIENT_STOPS } from "@/lib/marca-paths";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// THE one OG composer — spec-architecture.md §9.1.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#14100F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: `linear-gradient(180deg, ${HINOMARU_GRADIENT_STOPS.map(
                ([o, c]) => `${c} ${o * 100}%`,
              ).join(", ")})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="79 -76 878 908" width="46" height="46">
              <g transform="matrix(1 0 0 -1 0 756)">
                <path d={AJI_PATH} fill="#F4F1EC" />
              </g>
            </svg>
          </div>
          <span style={{ color: "#A8A09B", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
            Oishi Cozinha Japonesa
          </span>
        </div>
        <div style={{ color: "#F4F1EC", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          Coma tudo o que pedir.
        </div>
        <div style={{ color: "#E71B23", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          Pague menos por isso.
        </div>
      </div>
    ),
    size,
  );
}
