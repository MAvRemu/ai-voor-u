import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/v10/Hero";
import PainPoints from "@/components/v10/PainPoints";
import UseCaseShowcase from "@/components/v10/UseCaseShowcase";
import HowIWork from "@/components/v10/HowIWork";
import About from "@/components/v10/About";
import FAQ from "@/components/v10/FAQ";
import CTABanner from "@/components/v10/CTABanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-white text-navy">
      <Hero />
      <PainPoints />
      <UseCaseShowcase />
      <HowIWork />
      <About />
      <FAQ />
      <CTABanner />
    </div>
  );
}
