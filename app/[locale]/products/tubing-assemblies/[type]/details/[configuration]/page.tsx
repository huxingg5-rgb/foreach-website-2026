import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import FepFlangedTubingDetailContent from "@/components/products/tubing-assemblies/FepFlangedTubingDetailContent";
import FepFlangedTubingDeliveryContent from "@/components/products/tubing-assemblies/FepFlangedTubingDeliveryContent";
import TubingAssemblyDetailContent from "@/components/products/tubing-assemblies/TubingAssemblyDetailContent";
import TubingAssemblyDeliveryContent from "@/components/products/tubing-assemblies/TubingAssemblyDeliveryContent";
import { getPublishedAssemblyConfigurations, isPublishedAssemblyConfiguration } from "@/data/products/tubing-assemblies/publication";
import { getGermanAssemblyDetailCopy, getGermanAssemblyDetailMetadata, getLocalizedAssemblyDetail, getLocalizedAssemblyDetailCopy, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";
import { isLocalizedGermanDraftPath, isLocalizedHindiDraftPath, isLocalizedItalianDraftPath } from "@/lib/i18n/draft-languages";

type Props = { params: Promise<{ locale: string; type: string; configuration: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyTypes.flatMap(({ id: type }) => getPublishedAssemblyConfigurations(type).flatMap(configuration => [
    ...tubingAssemblyLocales.map(locale => ({ locale, type, configuration })),
    ...(isGermanAssemblyDetail(type, configuration) ? [{ locale: "de", type, configuration }] : []),
    ...(isItalianAssemblyDetail(type, configuration) ? [{ locale: "it", type, configuration }] : []),
    ...(isHindiAssemblyDetail(type, configuration) ? [{ locale: "hi", type, configuration }] : []),
  ]));
}
function isHindiAssemblyDetail(type: string, configuration: string) {
  return isLocalizedHindiDraftPath(`/hi/products/tubing-assemblies/${type}/details/${configuration}/`);
}
function isItalianAssemblyDetail(type: string, configuration: string) {
  return isLocalizedItalianDraftPath(`/it/products/tubing-assemblies/${type}/details/${configuration}/`);
}
function isGermanAssemblyDetail(type: string, configuration: string) {
  return isLocalizedGermanDraftPath(`/de/products/tubing-assemblies/${type}/details/${configuration}/`);
}
async function resolveData(params: Props["params"]) {
  const { locale, type, configuration } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  const option = item && isPublishedAssemblyConfiguration(item.id, configuration) ? configuration : undefined;
  if (!item || !option) notFound();
  const detailLocale = isTubingAssemblyLocale(locale) ? locale
    : locale === "de" && isGermanAssemblyDetail(item.id, option) ? "de"
    : locale === "it" && isItalianAssemblyDetail(item.id, option) ? "it"
    : locale === "hi" && isHindiAssemblyDetail(item.id, option) ? "hi" : undefined;
  if (!detailLocale) notFound();
  return { locale: detailLocale, type: item.id, configuration: option } as const;
}
async function getPageMetadata({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  return locale === "de"
    ? getGermanAssemblyDetailMetadata(type, configuration)
    : getLocalizedAssemblyMetadata(locale, type, configuration, true);
}
export default async function Page({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  const useFittingTemplate = type === "flanged-tubing" && configuration === "fep";
  const data = getLocalizedAssemblyDetail(locale, type, configuration);
  return <ProductDetailClient data={data}
    germanDetail={locale === "de" ? getGermanAssemblyDetailCopy(data) : undefined}
    localizedDetail={locale === "it" || locale === "hi" ? { locale, copy: getLocalizedAssemblyDetailCopy(data) } : undefined}
    customerCategoryMode="tubing-assembly"
    customerCategoryContent={{
      product: useFittingTemplate ? <FepFlangedTubingDetailContent section="product" locale={locale} /> : <TubingAssemblyDetailContent family={type} configuration={configuration} section="product" locale={locale} />,
      selection: useFittingTemplate ? <FepFlangedTubingDetailContent section="selection" locale={locale} /> : <TubingAssemblyDetailContent family={type} configuration={configuration} section="selection" locale={locale} />,
      delivery: useFittingTemplate ? <FepFlangedTubingDeliveryContent locale={locale} /> : <TubingAssemblyDeliveryContent family={type} configuration={configuration} locale={locale} />,
    }}
    afterContent={<TubingAssemblyRelatedArticles type={type} locale={locale} />} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/tubing-assemblies/[type]/details/[configuration]/", getPageMetadata);
