"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

interface PainPoint {
  title: string;
  description: string;
}

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
  },
};

function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-teal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut", delay: 0.3 + delay },
          },
        }}
      />
    </motion.svg>
  );
}

export default function PainPoints() {
  const t = useTranslations("v10.painPoints");
  const items = t.raw("items") as PainPoint[];

  // Reorder: "AI voelt overweldigend" (index 2) moves to first
  const reordered = [items[2], items[0], items[1], items[3]];

  return (
    <section className="py-20 md:py-28 bg-ice relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div
        className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-teal/[0.04] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full bg-violet/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Title with a more personal feel */}
        <BlurFade delay={0.1}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy">
              {t("title")}
            </h2>
            <div className="mt-3 w-12 h-1 bg-gradient-to-r from-teal to-violet rounded-full mx-auto" />
          </div>
        </BlurFade>

        {/* Featured first item — full width, bigger presence */}
        <BlurFade delay={0.2}>
          <div className="group relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-teal/10 to-violet/10 rounded-2xl blur-sm scale-[1.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white rounded-2xl border-2 border-navy/[0.06] p-6 md:p-8 hover:border-teal/20 transition-colors duration-300">
              <div className="flex items-start gap-4 md:gap-6">
                {/* Animated checkbox */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-teal/30 bg-teal/5 flex items-center justify-center">
                    <AnimatedCheck delay={0} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-navy leading-tight">
                    {reordered[0].title}
                  </h3>
                  <p className="text-slate mt-2 md:mt-3 leading-relaxed text-base">
                    {reordered[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Remaining items — stacked list with checkmarks */}
        <div className="space-y-3">
          {reordered.slice(1).map((item, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.1}>
              <div className="group relative">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-navy/[0.06] p-5 md:p-6 hover:bg-white hover:border-navy/10 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Animated checkbox */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-7 h-7 rounded-full border-2 border-navy/10 group-hover:border-teal/30 bg-navy/[0.02] group-hover:bg-teal/5 flex items-center justify-center transition-colors duration-300">
                        <AnimatedCheck delay={0.1 * (index + 1)} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-heading font-bold text-navy">
                        {item.title}
                      </h3>
                      <p className="text-slate text-sm mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Bottom nudge */}
        <BlurFade delay={0.7}>
          <p className="text-center mt-10 text-sm text-slate/70 italic">
            {t("nudge")}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
