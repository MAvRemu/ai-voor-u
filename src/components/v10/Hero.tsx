"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Hero() {
  const t = useTranslations("v10.hero");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 bg-white relative overflow-hidden">
      {/* Subtle background gradient blobs */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-violet/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <BlurFade delay={0.1}>
          <p className="text-teal text-sm font-medium tracking-wide uppercase">
            {t("eyebrow")}
          </p>
        </BlurFade>

        {/* Headline — H1 for SEO */}
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-navy mt-4">
          <WordFadeIn
            text={t("headline")}
            className="text-4xl md:text-6xl font-heading font-bold text-navy"
          />
          <BlurFade delay={0.4}>
            <span className="gradient-text-static mt-2 block pb-2 -mb-2">
              {t("headlineAccent")}
            </span>
          </BlurFade>
        </h1>

        {/* Personal message bubble */}
        <BlurFade delay={0.6}>
          <div className="mt-10 max-w-xl mx-auto rounded-3xl bg-ice/80 border border-navy/[0.06] pl-3 pr-6 py-4 flex items-center gap-4">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-teal to-violet">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/about-photo.jpeg"
                    alt="Marius"
                    fill
                    className="object-cover"
                    sizes="80px"
                    quality={90}
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-navy/70 bg-white/80 border border-navy/[0.06] rounded-full px-2.5 py-0.5 whitespace-nowrap">
                {t("founderBadge")}
              </span>
            </div>
            <p className="text-base text-slate leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.8}>
          <div className="mt-10">
            <ShimmerButton href="#contact">{t("cta")}</ShimmerButton>
          </div>
        </BlurFade>

        {/* Scroll label */}
        <BlurFade delay={1.0}>
          <div className="mt-24 flex flex-col items-center gap-1">
            <span className="text-xs text-slate">{t("scrollLabel")}</span>
            <motion.svg
              className="w-5 h-5 text-slate"
              viewBox="0 0 20 20"
              fill="none"
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <path
                d="M10 4v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
