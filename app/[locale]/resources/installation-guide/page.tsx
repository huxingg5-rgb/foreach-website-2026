import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import InstallationGuideListingPage from "@/components/resources/installation-guide/InstallationGuideListingPage";
import { INSTALLATION_GUIDE_LOCALES } from "@/data/resources/installation-guide/installation-guide-pagination";
import { getInstallationGuideMetadata } from "@/lib/seo/installation-guide-metadata";
import { languageDraftsEnabled } from "@/lib/i18n/draft-languages";

type Props = { params: Promise<{ locale: (typeof INSTALLATION_GUIDE_LOCALES)[number] }> };

export function generateStaticParams() {
  return INSTALLATION_GUIDE_LOCALES.filter(locale => (locale !== "de" && locale !== "it" && locale !== "hi") || languageDraftsEnabled).map((locale) => ({ locale }));
}

async function getPageMetadata({ params }: Props) {
  const { locale } = await params;
  if (!INSTALLATION_GUIDE_LOCALES.includes(locale) || ((locale === "de" || locale === "it" || locale === "hi") && !languageDraftsEnabled)) notFound();
  return getInstallationGuideMetadata(locale);
}

export default async function InstallationGuideIntlPage({ params }: Props) {
  const { locale } = await params;
  if (!INSTALLATION_GUIDE_LOCALES.includes(locale) || ((locale === "de" || locale === "it" || locale === "hi") && !languageDraftsEnabled)) notFound();
  return <InstallationGuideListingPage locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/installation-guide/", getPageMetadata);
