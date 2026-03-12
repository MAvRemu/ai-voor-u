"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const t = useTranslations("v10.faq");
  const items = t.raw("items") as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="py-20 md:py-28 bg-ice">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <BlurFade delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy text-center">
            {t("title")}
          </h2>
        </BlurFade>

        {/* Accordion */}
        <div className="mt-12 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <BlurFade key={index} delay={0.2 + index * 0.05}>
                <div
                  className={[
                    "rounded-2xl border overflow-hidden transition-colors bg-white",
                    isOpen ? "border-navy/10" : "border-navy/5",
                  ].join(" ")}
                >
                  {/* Question button */}
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-medium text-navy pr-4">
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={[
                        "w-5 h-5 text-slate-light shrink-0 transition-transform duration-300",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Answer area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="px-5 pb-5 text-sm text-slate leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
