import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/seo";

/** Share image for every page that doesn't define its own (LinkedIn, Slack, iMessage, AI answer cards). */
export const alt = `${PERSON.name} — ${PERSON.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #0d0b14 0%, #1d1530 60%, #3a1d2e 100%)",
          color: "#f1e9dc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#d9b45f" }}>
          {`${PERSON.jobTitle} · ${PERSON.location.city}`}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>{PERSON.name}</div>
        <div style={{ fontSize: 34, marginTop: 24, maxWidth: 900, color: "#cfc6d8" }}>
          Accessible healthcare transportation products, portals and design systems.
        </div>
      </div>
    ),
    size
  );
}
