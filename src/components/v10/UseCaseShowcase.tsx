"use client";

import { useTranslations } from "next-intl";
import { BlurFade } from "@/components/ui/blur-fade";
import type { ReactNode } from "react";

interface UseCaseItem {
  title: string;
  description: string;
}

interface Category {
  title: string;
  subtitle: string;
  items: UseCaseItem[];
}

const categoryIcons: ReactNode[] = [
  // Bot - Personal AI Assistant
  <svg key="bot" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>,
  // Headset - Customer Service
  <svg key="headset" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>,
  // Megaphone - Marketing
  <svg key="megaphone" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
  </svg>,
  // Trending - Sales
  <svg key="trending" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
  // Calculator - Admin & Finance
  <svg key="calculator" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
  </svg>,
  // Calendar - Scheduling
  <svg key="calendar" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>,
  // Search - Research
  <svg key="search" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>,
  // Users - HR & People
  <svg key="users" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
];

const categoryColors = [
  { accent: "text-teal", bg: "bg-teal/10", border: "border-teal/15", dot: "bg-teal" },
  { accent: "text-violet", bg: "bg-violet/10", border: "border-violet/15", dot: "bg-violet" },
  { accent: "text-teal", bg: "bg-teal/10", border: "border-teal/15", dot: "bg-teal" },
  { accent: "text-violet", bg: "bg-violet/10", border: "border-violet/15", dot: "bg-violet" },
  { accent: "text-teal", bg: "bg-teal/10", border: "border-teal/15", dot: "bg-teal" },
  { accent: "text-violet", bg: "bg-violet/10", border: "border-violet/15", dot: "bg-violet" },
  { accent: "text-teal", bg: "bg-teal/10", border: "border-teal/15", dot: "bg-teal" },
  { accent: "text-violet", bg: "bg-violet/10", border: "border-violet/15", dot: "bg-violet" },
];

export default function UseCaseShowcase() {
  const t = useTranslations("v10.useCases");
  const categories = t.raw("categories") as Category[];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
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

        {/* Dense grid — all categories visible */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((category, catIndex) => {
            const colors = categoryColors[catIndex];

            return (
              <BlurFade key={catIndex} delay={0.2 + catIndex * 0.06}>
                <div className={`rounded-2xl border ${colors.border} bg-ice/50 p-5 h-full flex flex-col hover:shadow-md transition-shadow duration-300`}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`flex-shrink-0 w-9 h-9 rounded-lg ${colors.bg} ${colors.accent} flex items-center justify-center`}>
                      {categoryIcons[catIndex]}
                    </span>
                    <h3 className="text-base font-heading font-bold text-navy leading-tight">
                      {category.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-slate mb-4 leading-relaxed">
                    {category.subtitle}
                  </p>

                  {/* Items as compact list */}
                  <ul className="space-y-2 flex-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5`} />
                        <span className="text-sm text-navy/80 leading-snug">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
