import { ImageResponse } from "next/og";

export const alt = "Devibi — Web Design, App Development, AI, SEO & CRO Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080502",
          padding: "70px 80px",
          position: "relative",
        }}
      >
        {/* molten orb */}
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-140px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #ffb36b 0%, #ff5e1f 45%, #2a0e02 100%)",
            opacity: 0.9,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "-200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 40% 30%, #ff8a3d 0%, #ff5e1f 50%, transparent 75%)",
            opacity: 0.35,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#fff3e9" }}>
          devibi<span style={{ color: "#ff5e1f", fontSize: 22, marginTop: 2 }}>®</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "760px" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#fff3e9",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            Liquid digital experiences
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#ffb36b" }}>
            Web · Apps · AI · SEO · CRO
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,243,233,0.55)" }}>
          devibi.com — design, engineering and growth, fused.
        </div>
      </div>
    ),
    { ...size }
  );
}
