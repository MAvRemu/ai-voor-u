import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Poppins, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import V10Header from "@/components/v10/Header";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://aivoorjou.nu";

  return {
    title: {
      default: t("title"),
      template: "%s | AIvoorU",
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        nl: `${baseUrl}/nl`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/nl`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "AIvoorU",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${poppins.variable} ${inter.variable} font-sans bg-white text-navy antialiased`}>
        <OrganizationJsonLd locale={locale} />
        <NextIntlClientProvider>
          <V10Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
