"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";

interface PromptItem {
  icon: string;
  label: string;
  prompt: string;
  response: string;
}

interface PromptGridProps {
  personalPrompts: PromptItem[];
  businessPrompts: PromptItem[];
  personalLabel: string;
  businessLabel: string;
  className?: string;
}

const iconMap: Record<string, string> = {
  recipe: "\u{1F373}",
  travel: "\u{2708}\u{FE0F}",
  email: "\u{1F4E7}",
  finance: "\u{1F4B0}",
  health: "\u{1F3CB}\u{FE0F}",
  learn: "\u{1F4DA}",
  translate: "\u{1F310}",
  gift: "\u{1F381}",
  strategy: "\u{1F4CA}",
  marketing: "\u{1F4E3}",
  proposal: "\u{1F4DD}",
  support: "\u{1F3A7}",
  hr: "\u{1F465}",
  code: "\u{1F4BB}",
  legal: "\u{2696}\u{FE0F}",
  analytics: "\u{1F4C8}",
};

function getIcon(icon: string): string {
  return iconMap[icon] || "\u{2728}";
}

export default function PromptGrid({
  personalPrompts,
  businessPrompts,
  personalLabel,
  businessLabel,
  className = "",
}: PromptGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleClick(id: string) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  function renderSection(
    prompts: PromptItem[],
    label: string,
    variant: "personal" | "business",
  ) {
    const accentColor = variant === "personal" ? "teal" : "violet";

    return (
      <div>
        <h3 className={`text-sm font-heading font-semibold uppercase tracking-widest text-${accentColor} mb-4`}>
          {label}
        </h3>

        <div className="flex flex-wrap gap-3">
          {prompts.map((item, i) => {
            const id = `${variant}-${i}`;
            const isExpanded = expandedId === id;

            return (
              <BlurFade key={id} delay={0.05 * i}>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleClick(id)}
                    className={`prompt-chip ${
                      variant === "personal" ? "prompt-chip-personal" : "prompt-chip-business"
                    } ${isExpanded ? "ring-2 ring-offset-1" : ""} ${
                      isExpanded
                        ? variant === "personal"
                          ? "ring-teal/40"
                          : "ring-violet/40"
                        : ""
                    }`}
                  >
                    <span className="text-base leading-none">{getIcon(item.icon)}</span>
                    <span>{item.label}</span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 max-w-sm space-y-3">
                          {/* User prompt bubble */}
                          <div className="flex justify-end">
                            <div
                              className={`rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white ${
                                variant === "personal" ? "bg-teal" : "bg-violet"
                              }`}
                            >
                              {item.prompt}
                            </div>
                          </div>

                          {/* AI response bubble */}
                          <div className="flex justify-start">
                            <div className="rounded-2xl rounded-bl-md px-4 py-2.5 text-sm bg-navy/5 text-navy">
                              {item.response}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-10 ${className}`}>
      {renderSection(personalPrompts, personalLabel, "personal")}
      {renderSection(businessPrompts, businessLabel, "business")}
    </div>
  );
}
