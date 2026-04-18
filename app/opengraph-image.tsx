import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

// Runs on the Edge runtime: smaller cold start and sub-100ms renders
// when link-preview crawlers hit the OG URL.
export const runtime = "edge";
// Next.js auto-wires these exports into <meta og:*> tags for this route.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(60% 50% at 30% 20%, rgba(125,211,252,0.18), transparent 60%), radial-gradient(40% 40% at 80% 30%, rgba(14,165,233,0.14), transparent 60%), #0a0a0b",
          color: "#f5f5f6",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#7dd3fc",
            fontSize: "20px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>·</span>
          <span>{profile.handle}.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "92px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {profile.name}.
          </div>
          <div style={{ fontSize: "44px", color: "#a1a1a6", lineHeight: 1.2 }}>
            {profile.role} · React + TypeScript
          </div>
          <div style={{ fontSize: "26px", color: "#6b6b73", marginTop: "12px" }}>
            3+ years shipping fintech and enterprise platforms
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["React", "TypeScript", "Next.js", "Redux Toolkit", "AG Grid", "Jest"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: "9999px",
                border: "1px solid #26262b",
                color: "#a1a1a6",
                fontSize: "22px",
                fontFamily: "monospace",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
