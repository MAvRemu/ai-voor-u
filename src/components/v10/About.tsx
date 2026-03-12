"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface ShowcaseItem {
  title: string;
  description: string;
  url: string;
  tag: string;
  image?: string;
}

export default function About() {
  const t = useTranslations("v10.about");
  const showcase = t.raw("showcase") as ShowcaseItem[];

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Top: photo + text */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left: photo */}
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
                <span className="gradient-text-static">
                  {t("titleAccent")}
                </span>
              </h2>
              <p className="mt-4 text-slate leading-relaxed">
                {t("description")}
              </p>
              <div className="mt-6">
                <ShimmerButton href="#contact">{t("cta")}</ShimmerButton>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Showcase cards */}
        <div className="mt-20">
          <BlurFade delay={0.4}>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-navy text-center">
              {t("showcaseTitle")}
            </h3>
          </BlurFade>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {showcase.map((item, i) => (
              <BlurFade key={item.url} delay={0.5 + i * 0.1}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-navy/[0.06] bg-ice/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-navy/[0.06] hover:border-navy/[0.12] hover:-translate-y-1"
                >
                  {/* Website preview */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <iframe
                        src={item.url}
                        title={item.title}
                        className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                        loading="lazy"
                        sandbox="allow-same-origin"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/5 transition-colors duration-300" />
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-teal-dark bg-teal/10 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <h4 className="mt-3 font-heading font-semibold text-navy text-base leading-snug">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-slate leading-relaxed hidden md:block">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-teal-dark group-hover:gap-2.5 transition-all duration-200">
                      {new URL(item.url).hostname.replace("www.", "")}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
