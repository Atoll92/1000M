import { ImageResponse } from "next/og";

export const alt = "1000 marges — Image & Son, Marseille";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a0a";
const PAPER = "#f2f0eb";
const DIM = "#9a988f";
const HAIR = "#2a2a28";
const ACCENT = "#3b6dff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: PAPER,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            color: DIM,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700, color: PAPER }}>
            1000&nbsp;&nbsp;/&nbsp;&nbsp;MARGES
          </div>
          <div style={{ display: "flex" }}>REC · 25 FPS</div>
        </div>

        {/* headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            1000 marges
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 46,
              fontStyle: "italic",
              color: ACCENT,
            }}
          >
            L’image et le son, sans marges.
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 26,
            borderTop: `1px solid ${HAIR}`,
            fontSize: 24,
            letterSpacing: 3,
            color: DIM,
          }}
        >
          <div style={{ display: "flex" }}>
            Société de production · Image · Son
          </div>
          <div style={{ display: "flex" }}>Marseille, FR</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
