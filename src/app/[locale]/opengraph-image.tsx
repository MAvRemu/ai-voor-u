import { ImageResponse } from "next/og";

export const runtime = "edge";
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
      ? "AI-consultancy & implementatie voor ZZP en MKB"
      : "AI consultancy & implementation for freelancers & SMBs";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0EA5E9, #8B5CF6)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)" }}>AI</span>
          <span style={{ color: "white" }}>voorU</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            marginTop: 16,
            letterSpacing: "0.01em",
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            marginTop: 40,
          }}
        >
          aivoorjou.nu
        </div>
      </div>
    ),
    { ...size }
  );
}
