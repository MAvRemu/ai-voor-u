"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Hero() {
  const t = useTranslations("v10.hero");

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-white relative overflow-hidden">
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

        {/* Headline */}
        <WordFadeIn
          text={t("headline")}
          className="text-4xl md:text-6xl font-heading font-bold text-navy mt-4"
        />

        {/* Headline accent */}
        <BlurFade delay={0.4}>
          <p className="text-4xl md:text-6xl font-heading font-bold gradient-text-static mt-2">
            {t("headlineAccent")}
          </p>
        </BlurFade>

        {/* Subtitle */}
        <BlurFade delay={0.6}>
          <p className="text-lg text-slate mt-6 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.8}>
          <div className="mt-10">
            <ShimmerButton href="#contact">{t("cta")}</ShimmerButton>
          </div>
        </BlurFade>

        {/* Scroll label */}
        <BlurFade delay={1.0}>
          <div className="mt-10 flex flex-col items-center gap-1">
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
