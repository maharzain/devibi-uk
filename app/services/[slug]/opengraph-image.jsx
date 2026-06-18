import { ImageResponse } from "next/og";
import { SERVICES, getService } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const alt = "Devibi digital agency service page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service ? service.name : "Devibi";

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
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-140px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #ffb36b 0%, #ff5e1f 45%, #2a0e02 100%)",
            opacity: 0.9,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: "#fff3e9" }}>
          devibi<span style={{ color: "#ff5e1f", fontSize: 20, marginTop: 2 }}>®</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "780px" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#ff8a3d", marginBottom: 18 }}>
            ( Services )
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#fff3e9",
              lineHeight: 1.08,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "rgba(255,243,233,0.55)" }}>
          devibi.com/services — honest scopes, fixed prices, weekly demos.
        </div>
      </div>
    ),
    { ...size }
  );
}
