"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function CTABanner() {
  const t = useTranslations("v10.ctaBanner");

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" aria-hidden="true">
        <div
          className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-teal/10 blur-3xl animate-pulse-glow"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-20%] right-[20%] w-[400px] h-[400px] rounded-full bg-violet/10 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <BlurFade delay={0.1}>
          <span className="inline-flex px-4 py-1.5 rounded-full border border-navy/10 bg-navy/5 text-sm text-navy/70">
            {t("eyebrow")}
          </span>
        </BlurFade>

        <BlurFade delay={0.3}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mt-6">
            {t("title")}
          </h2>
        </BlurFade>

        <BlurFade delay={0.5}>
          <p className="text-slate mt-4 text-lg">
            {t("subtitle")}
          </p>
        </BlurFade>

        <BlurFade delay={0.7}>
          <div className="flex flex-col items-center mt-8 max-w-md mx-auto">
            {/* TODO: Replace with real Calendly URL */}
            <ShimmerButton href="https://calendly.com/JOUW-LINK" className="w-full text-center">
              {t("cta")}
            </ShimmerButton>
            <p className="text-xs text-slate-light mt-2">{t("ctaSubLabel")}</p>
            <a
              href="mailto:info@aivooru.nu"
              className="text-sm text-slate hover:text-navy underline transition-colors mt-4"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
