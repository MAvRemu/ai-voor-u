"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { routing } from "@/i18n/routing";

export default function V10Header() {
  const t = useTranslations("v10.header");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLocale =
    routing.locales.find((locale) => pathname.startsWith(`/${locale}`)) ??
    routing.defaultLocale;

  const otherLocale = currentLocale === "nl" ? "en" : "nl";

  function switchLocale() {
    const segments = pathname.split("/");
    if (
      routing.locales.includes(
        segments[1] as (typeof routing.locales)[number]
      )
    ) {
      segments[1] = otherLocale;
    } else {
      segments.splice(1, 0, otherLocale);
    }
    router.push(segments.join("/") || "/");
  }

  const navLinks = [
    { label: t("useCases"), href: "#use-cases" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("about"), href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-navy/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center font-heading font-bold text-lg">
          <span className="gradient-text-static">AI</span>
          <span className="text-navy">voorU</span>
          <span className="text-navy/40">.nu</span>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: locale switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={switchLocale}
            className="text-xs text-slate/50 hover:text-navy transition-colors uppercase tracking-wide"
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale.toUpperCase()}
          </button>
          <ShimmerButton href="#contact" className="text-sm px-5 py-2.5">
            {t("cta")}
          </ShimmerButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px bg-navy origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-px bg-navy"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px bg-navy origin-center"
          />
        </button>
      </div>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white border-t border-navy/5 px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-slate hover:text-navy transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={switchLocale}
                  className="text-xs text-slate/50 hover:text-navy transition-colors uppercase tracking-wide"
                >
                  {otherLocale.toUpperCase()}
                </button>
                <ShimmerButton
                  href="#contact"
                  className="text-sm px-5 py-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("cta")}
                </ShimmerButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
