import { notFound } from "next/navigation";
import InstallationGuideListingPage from "@/components/resources/installation-guide/InstallationGuideListingPage";
import { INSTALLATION_GUIDE_LOCALES } from "@/data/resources/installation-guide/installation-guide-pagination";
import { getInstallationGuideMetadata } from "@/lib/seo/installation-guide-metadata";

type Props = { params: Promise<{ locale: (typeof INSTALLATION_GUIDE_LOCALES)[number] }> };

export function generateStaticParams() {
  return INSTALLATION_GUIDE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!INSTALLATION_GUIDE_LOCALES.includes(locale)) notFound();
  return getInstallationGuideMetadata(locale);
}

export default async function InstallationGuideIntlPage({ params }: Props) {
  const { locale } = await params;
  if (!INSTALLATION_GUIDE_LOCALES.includes(locale)) notFound();
  return <InstallationGuideListingPage locale={locale} />;
}
