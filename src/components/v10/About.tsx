"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function About() {
  const t = useTranslations("v10.about");

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left: photo placeholder */}
          <BlurFade delay={0.1}>
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full relative shrink-0">
              <div className="absolute inset-0 rounded-full border border-navy/10 bg-gradient-to-br from-teal/20 to-violet/20" />
              <div className="absolute inset-[3px] rounded-full overflow-hidden">
                <Image
                  src="/about-photo.jpeg"
                  alt={t("aboutPhotoAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              </div>
            </div>
          </BlurFade>

          {/* Right: text content */}
          <BlurFade delay={0.3}>
            <div>
              <p className="text-xs uppercase tracking-widest text-teal-dark font-semibold">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-heading font-bold">
                <span className="text-navy">{t("title")}</span>
                <br />
                <span className="gradient-text-static">{t("titleAccent")}</span>
              </h2>
              <p className="mt-4 text-slate leading-relaxed">
                {t("description")}
              </p>
              <div className="mt-6">
                <ShimmerButton href="#contact">
                  {t("cta")}
                </ShimmerButton>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
