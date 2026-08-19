import { ImageResponse } from "next/og";
import { AJI_PATH, HINOMARU_GRADIENT_STOPS } from "@/lib/marca-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#14100F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 152,
            height: 152,
            borderRadius: "50%",
            background: `linear-gradient(180deg, ${HINOMARU_GRADIENT_STOPS.map(
              ([o, c]) => `${c} ${o * 100}%`,
            ).join(", ")})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="79 -76 878 908" width="108" height="108">
            <g transform="matrix(1 0 0 -1 0 756)">
              <path d={AJI_PATH} fill="#F4F1EC" />
            </g>
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
