"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface StepItem {
  title: string;
  description: string;
}

interface Step {
  step: string;
  label: string;
  title: string;
  description: string;
  items?: StepItem[];
}

export default function HowIWork() {
  const t = useTranslations("v10.howIWork");
  const steps = t.raw("steps") as Step[];

  const stepColors = [
    { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" },
    { bg: "bg-violet/10", text: "text-violet", border: "border-violet/20" },
    { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-ice">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <BlurFade delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center">
            {t("title")}
          </h2>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="text-slate text-lg mt-3 max-w-2xl mx-auto text-center">
            {t("subtitle")}
          </p>
        </BlurFade>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {steps.map((step, index) => {
            const colors = stepColors[index];
            return (
              <BlurFade key={index} delay={0.3 + index * 0.15}>
                <div className={`relative rounded-2xl border ${colors.border} bg-white p-6 h-full`}>
                  {/* Step number */}
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${colors.bg} ${colors.text} font-heading font-bold text-sm`}
                  >
                    {step.step}
                  </div>

                  {/* Label */}
                  <p className={`text-sm font-semibold ${colors.text} uppercase tracking-wide mt-4`}>
                    {step.label}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-navy mt-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  {step.items ? (
                    <div className="mt-3 space-y-3">
                      {step.items.map((item, i) => (
                        <div key={i}>
                          <p className="text-navy font-semibold text-sm">{item.title}</p>
                          <p className="text-slate text-sm leading-relaxed mt-0.5 hidden md:block">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate text-sm mt-3 leading-relaxed">
                      {step.description}
                    </p>
                  )}

                  {/* Connector arrow (not on last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2">
                      <svg
                        className="w-4 h-4 text-navy/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>

        {/* CTA */}
        <BlurFade delay={0.8}>
          <div className="text-center mt-12">
            <ShimmerButton href="#contact">{t("cta")}</ShimmerButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
