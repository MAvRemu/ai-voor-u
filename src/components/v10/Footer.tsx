"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("v10.footer");
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t("useCases"), href: "#use-cases" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("about"), href: "#about" },
    { label: t("faq"), href: "#faq" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-navy text-white/70 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center font-heading font-bold text-lg text-white">
              <span className="gradient-text-static">AI</span>
              <span>voorU</span>
              <span className="text-white/40">.nu</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t("nav")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t("contactTitle")}
            </h3>
            <a
              href={`mailto:${t("email")}`}
              className="text-sm hover:text-white transition-colors"
            >
              {t("email")}
            </a>
            <a
              href={`tel:${t("phone").replace(/\s/g, "")}`}
              className="text-sm hover:text-white transition-colors mt-2 block"
            >
              {t("phone")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40">
          {t("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
