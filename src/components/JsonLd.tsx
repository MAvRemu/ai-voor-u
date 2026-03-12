import { getTranslations } from "next-intl/server";

interface JsonLdProps {
  locale: string;
}

export async function OrganizationJsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: "v10.faq" });
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  const baseUrl = "https://aivoorjou.nu";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AIvoorU",
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description:
      locale === "nl"
        ? "AI-consultancy en technische implementatie voor MKB en ZZP'ers in Nederland."
        : "AI consultancy and technical implementation for freelancers and SMBs in the Netherlands.",
    email: "info@aivooru.nu",
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    serviceType:
      locale === "nl"
        ? "AI-consultancy en implementatie"
        : "AI consultancy and implementation",
    knowsLanguage: ["nl", "en"],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "nl"
        ? "AI-consultancy & implementatie"
        : "AI consultancy & implementation",
    description:
      locale === "nl"
        ? "AI-consultancy en technische implementatie voor MKB en ZZP'ers. Van strategie tot werkende AI-oplossingen."
        : "AI consultancy and technical implementation for freelancers and SMBs. From strategy to working AI solutions.",
    provider: {
      "@type": "ProfessionalService",
      name: "AIvoorU",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    serviceType:
      locale === "nl"
        ? "AI-consultancy en implementatie"
        : "AI consultancy and implementation",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
