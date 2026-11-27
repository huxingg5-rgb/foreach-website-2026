import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import {notFound} from "next/navigation";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import SolenoidConfigurationPage, {getSolenoidMetadata} from "@/components/products/detail/SolenoidConfigurationPage";
import {solenoidBasePath, solenoidPageConfigurations, solenoidLocales, isSolenoidLocale} from "@/data/products/detail/solenoid-content";
export const dynamicParams = false;
export function generateStaticParams() {
  const locales = [...solenoidLocales.filter(locale => locale !== "zh"), ...(languageDraftsEnabled ? ["de"] : [])];
  return [
    ...solenoidPageConfigurations.filter(item => isLocalizedHindiDraftPath(`/hi${solenoidBasePath}${item.slug}/`))
      .map(item => ({ locale: "hi", configuration: item.slug })),
    ...locales.flatMap(locale => solenoidPageConfigurations.map(item => ({locale, configuration: item.slug}))),
    ...solenoidPageConfigurations.filter(item => isLocalizedItalianDraftPath(`/it${solenoidBasePath}${item.slug}/`))
      .map(item => ({ locale: "it", configuration: item.slug })),
  ];
}
function isSolenoidPageLocale(locale: string, configuration: string) {
  if (locale === "hi") return isLocalizedHindiDraftPath(`/hi${solenoidBasePath}${configuration}/`);
  if (locale === "it") return isLocalizedItalianDraftPath(`/it${solenoidBasePath}${configuration}/`);
  return isSolenoidLocale(locale) && locale !== "zh" && (locale !== "de" || languageDraftsEnabled);
}
type Props = {params: Promise<{locale: string; configuration: string}>};
async function getPageMetadata({params}: Props) {
  const {locale, configuration} = await params;
  if (!isSolenoidPageLocale(locale, configuration)) notFound();
  return getSolenoidMetadata(configuration, locale);
}
export default async function Page({params}: Props) {
  const {locale, configuration} = await params;
  if (!isSolenoidPageLocale(locale, configuration)) notFound();
  return <SolenoidConfigurationPage slug={configuration} locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/valves/solenoid-valves/[configuration]/", getPageMetadata);
