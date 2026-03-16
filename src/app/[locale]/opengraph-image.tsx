import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "AIvoorU - AI consultancy & implementation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tagline =
    locale === "nl"
      ? "AI-implementatie & consultancy voor MKB en ZZP"
      : "AI implementation & consultancy for freelancers & SMBs";

  const cta =
    locale === "nl" ? "Ontdek wat AI voor jou kan doen" : "Discover what AI can do for you";

  const logoData = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal gradient blob top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(14, 165, 233, 0.07)",
            filter: "blur(60px)",
          }}
        />
        {/* Violet gradient blob bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.07)",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#0EA5E9",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {tagline}
          </div>

          {/* Logo image */}
          <img
            alt="AIvoorU.nu"
            src={logoBase64}
            width={560}
            height={140}
            style={{
              marginTop: 32,
              objectFit: "contain",
            }}
          />

          {/* CTA line */}
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 400,
              color: "#64748B",
              marginTop: 28,
            }}
          >
            {cta}
          </div>

          {/* Divider line with gradient */}
          <div
            style={{
              display: "flex",
              width: "160px",
              height: "4px",
              background: "linear-gradient(90deg, #0EA5E9, #8B5CF6)",
              borderRadius: "2px",
              marginTop: 36,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
