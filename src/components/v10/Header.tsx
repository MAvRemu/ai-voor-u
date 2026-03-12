"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { routing } from "@/i18n/routing";

export default function V10Header() {
  const t = useTranslations("v10.header");
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

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
    { label: t("faq"), href: "#faq" },
  ];

  // Mobile menu stagger variants
  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.4, 0.25, 1] as const,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.1 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Floating pill container */}
      <div
        className={[
          "mx-auto mt-3 w-fit rounded-2xl transition-all duration-500 ease-out",
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-navy/[0.04] border border-navy/[0.06]"
            : "bg-transparent border border-transparent",
        ].join(" ")}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { height: scrolled ? 56 : 64 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="px-6 flex items-center gap-20"
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center font-heading font-bold text-lg"
            whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="gradient-text-static">AI</span>
            <span className="text-navy">voorU</span>
            <span className="text-navy/40">.nu</span>
          </motion.a>

          {/* Center nav — desktop */}
          <nav
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-slate hover:text-navy transition-colors"
                onMouseEnter={() => setHoveredLink(link.href)}
              >
                {link.label}
                {hoveredLink === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-teal to-violet"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
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
              animate={
                mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-navy origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-px bg-navy"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-navy origin-center"
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden mx-auto max-w-6xl mt-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-navy/[0.06] shadow-lg shadow-navy/[0.04] px-3"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  variants={mobileItemVariants}
                  className="text-sm text-slate hover:text-navy transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={mobileItemVariants}
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center justify-center rounded-xl px-5 py-2.5 bg-gradient-to-r from-teal to-teal-dark font-heading font-semibold text-white text-sm shadow-lg shadow-teal/20"
              >
                {t("cta")}
              </motion.a>
              <motion.button
                variants={mobileItemVariants}
                onClick={switchLocale}
                className="text-xs text-slate/50 hover:text-navy transition-colors uppercase tracking-wide"
              >
                {otherLocale.toUpperCase()}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
