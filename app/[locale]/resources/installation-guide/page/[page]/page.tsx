import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import InstallationGuideListingPage from "@/components/resources/installation-guide/InstallationGuideListingPage";
import { INSTALLATION_GUIDE_LOCALES, INSTALLATION_GUIDE_PAGE_SIZE } from "@/data/resources/installation-guide/installation-guide-pagination";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getInstallationGuideMetadata } from "@/lib/seo/installation-guide-metadata";
import { isDraftLocale, languageDraftsEnabled } from "@/lib/i18n/draft-languages";

export const dynamicParams = false;
type Locale = (typeof INSTALLATION_GUIDE_LOCALES)[number];
type Props = { params: Promise<{ locale: Locale; page: string }> };

export function generateStaticParams() {
  const locales = INSTALLATION_GUIDE_LOCALES.filter((locale) => !isDraftLocale(locale) || languageDraftsEnabled);
  return locales.flatMap((locale) => {
    const count = Math.ceil(getInstallationGuidePageData(locale).guides.length / INSTALLATION_GUIDE_PAGE_SIZE);
    return Array.from({ length: Math.max(0, count - 1) }, (_, i) => ({ locale, page: String(i + 2) }));
  });
}

function resolvePage(locale: Locale, page: string) {
  if (!generateStaticParams().some((item) => item.locale === locale && item.page === page)) notFound();
  return Number(page);
}

async function getPageMetadata({ params }: Props) {
  const { locale, page } = await params;
  return getInstallationGuideMetadata(locale, resolvePage(locale, page));
}

export default async function Page({ params }: Props) {
  const { locale, page } = await params;
  return <InstallationGuideListingPage locale={locale} page={resolvePage(locale, page)} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/resources/installation-guide/page/[page]/", getPageMetadata);
