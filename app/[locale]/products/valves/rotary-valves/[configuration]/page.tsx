import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import Mrv3ConfigurationPage, { getMrv3Metadata } from "@/components/products/detail/Mrv3ConfigurationPage";
import { mrv3BasePath, mrv3Configurations } from "@/data/products/detail/mrv3-content";
import { isMrv3Locale, mrv3Locales } from "@/data/products/detail/mrv3-locales";

export const dynamicParams = false;
export function generateStaticParams() {
  const locales = [...mrv3Locales.filter(locale => locale !== "zh"), ...(languageDraftsEnabled ? ["de"] : [])];
  return [
    ...locales.flatMap(locale => mrv3Configurations.map(item => ({ locale, configuration: item.slug }))),
    ...mrv3Configurations.filter(item => isLocalizedHindiDraftPath("/hi" + mrv3BasePath + item.slug + "/"))
      .map(item => ({ locale: "hi", configuration: item.slug })),
    ...mrv3Configurations.filter(item => isLocalizedItalianDraftPath("/it" + mrv3BasePath + item.slug + "/"))
      .map(item => ({ locale: "it", configuration: item.slug })),
  ];
}
type Props = { params: Promise<{ locale: string; configuration: string }> };
function isMrv3PageLocale(locale: string, configuration: string) {
  if (locale === "hi") return isLocalizedHindiDraftPath("/hi" + mrv3BasePath + configuration + "/");
  if (locale === "it") return isLocalizedItalianDraftPath("/it" + mrv3BasePath + configuration + "/");
  return isMrv3Locale(locale) && locale !== "zh" && (locale !== "de" || languageDraftsEnabled);
}
async function getPageMetadata({ params }: Props) {
  const { locale, configuration } = await params;
  if (!isMrv3PageLocale(locale, configuration)) notFound();
  return getMrv3Metadata(configuration, locale);
}
export default async function Page({ params }: Props) {
  const { locale, configuration } = await params;
  if (!isMrv3PageLocale(locale, configuration)) notFound();
  return <Mrv3ConfigurationPage slug={configuration} locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/valves/rotary-valves/[configuration]/", getPageMetadata);
