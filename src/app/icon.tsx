import { ImageResponse } from "next/og";
import { AJI_PATH, HINOMARU_GRADIENT_STOPS } from "@/lib/marca-paths";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `linear-gradient(180deg, ${HINOMARU_GRADIENT_STOPS.map(
            ([o, c]) => `${c} ${o * 100}%`,
          ).join(", ")})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="79 -76 878 908" width="22" height="22">
          <g transform="matrix(1 0 0 -1 0 756)">
            <path d={AJI_PATH} fill="#F4F1EC" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
