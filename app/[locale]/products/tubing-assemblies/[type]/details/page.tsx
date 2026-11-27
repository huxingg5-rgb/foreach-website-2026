import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import TubingAssemblyDetailContent from "@/components/products/tubing-assemblies/TubingAssemblyDetailContent";
import TubingAssemblyDeliveryContent from "@/components/products/tubing-assemblies/TubingAssemblyDeliveryContent";
import { getGermanAssemblyDetailCopy, getGermanAssemblyDetailMetadata, getLocalizedAssemblyDetail, getLocalizedAssemblyDetailCopy, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { isLocalizedGermanDraftPath, isLocalizedHindiDraftPath, isLocalizedItalianDraftPath } from "@/lib/i18n/draft-languages";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ locale: string; type: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyTypes.flatMap(({ id: type }) => [
    ...tubingAssemblyLocales.map(locale => ({ locale, type })),
    ...(isGermanAssemblyDetail(type) ? [{ locale: "de", type }] : []),
    ...(isItalianAssemblyDetail(type) ? [{ locale: "it", type }] : []),
    ...(isHindiAssemblyDetail(type) ? [{ locale: "hi", type }] : []),
  ]);
}
function isHindiAssemblyDetail(type: string) {
  return isLocalizedHindiDraftPath(`/hi/products/tubing-assemblies/${type}/details/`);
}
function isItalianAssemblyDetail(type: string) {
  return isLocalizedItalianDraftPath(`/it/products/tubing-assemblies/${type}/details/`);
}
function isGermanAssemblyDetail(type: string) {
  return isLocalizedGermanDraftPath(`/de/products/tubing-assemblies/${type}/details/`);
}
async function getPageMetadata({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (item && locale === "de" && isGermanAssemblyDetail(item.id)) return getGermanAssemblyDetailMetadata(item.id);
  if (!(isTubingAssemblyLocale(locale) || locale === "it" && isItalianAssemblyDetail(type) || locale === "hi" && isHindiAssemblyDetail(type)) || !item) notFound();
  return getLocalizedAssemblyMetadata(locale, item.id, undefined, true);
}
export default async function Page({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!item || !(isTubingAssemblyLocale(locale) || (locale === "de" && isGermanAssemblyDetail(item.id)) || (locale === "it" && isItalianAssemblyDetail(item.id)) || (locale === "hi" && isHindiAssemblyDetail(item.id)))) notFound();
  const data = getLocalizedAssemblyDetail(locale, item.id);
  return <ProductDetailClient data={data}
    germanDetail={locale === "de" ? getGermanAssemblyDetailCopy(data) : undefined}
    localizedDetail={locale === "it" || locale === "hi" ? { locale, copy: getLocalizedAssemblyDetailCopy(data) } : undefined}
    customerCategoryMode="tubing-assembly"
    customerCategoryContent={{
      product: <TubingAssemblyDetailContent family={item.id} section="product" locale={locale} />,
      selection: <TubingAssemblyDetailContent family={item.id} section="selection" locale={locale} />,
      delivery: <TubingAssemblyDeliveryContent family={item.id} locale={locale} />,
    }}
    afterContent={<TubingAssemblyRelatedArticles type={item.id} locale={locale} />} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/tubing-assemblies/[type]/details/", getPageMetadata);
