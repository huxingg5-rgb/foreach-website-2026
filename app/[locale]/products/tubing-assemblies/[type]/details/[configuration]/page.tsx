import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import FepFlangedTubingDetailContent from "@/components/products/tubing-assemblies/FepFlangedTubingDetailContent";
import FepFlangedTubingDeliveryContent from "@/components/products/tubing-assemblies/FepFlangedTubingDeliveryContent";
import TubingAssemblyDetailContent from "@/components/products/tubing-assemblies/TubingAssemblyDetailContent";
import TubingAssemblyDeliveryContent from "@/components/products/tubing-assemblies/TubingAssemblyDeliveryContent";
import { getPublishedAssemblyConfigurations, isPublishedAssemblyConfiguration } from "@/data/products/tubing-assemblies/publication";
import { getLocalizedAssemblyDetail, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ locale: string; type: string; configuration: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyLocales.flatMap(locale => tubingAssemblyTypes.flatMap(item => getPublishedAssemblyConfigurations(item.id).map(configuration => ({ locale, type: item.id, configuration }))));
}
async function resolveData(params: Props["params"]) {
  const { locale, type, configuration } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  const option = item && isPublishedAssemblyConfiguration(item.id, configuration) ? configuration : undefined;
  if (!isTubingAssemblyLocale(locale) || !item || !option) notFound();
  return { locale, type: item.id, configuration: option };
}
export async function generateMetadata({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  return getLocalizedAssemblyMetadata(locale, type, configuration, true);
}
export default async function Page({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  const useFittingTemplate = type === "flanged-tubing" && configuration === "fep";
  return <ProductDetailClient data={getLocalizedAssemblyDetail(locale, type, configuration)}
    customerCategoryMode="tubing-assembly"
    customerCategoryContent={{
      product: useFittingTemplate ? <FepFlangedTubingDetailContent section="product" locale={locale} /> : <TubingAssemblyDetailContent family={type} configuration={configuration} section="product" locale={locale} />,
      selection: useFittingTemplate ? <FepFlangedTubingDetailContent section="selection" locale={locale} /> : <TubingAssemblyDetailContent family={type} configuration={configuration} section="selection" locale={locale} />,
      delivery: useFittingTemplate ? <FepFlangedTubingDeliveryContent locale={locale} /> : <TubingAssemblyDeliveryContent family={type} configuration={configuration} locale={locale} />,
    }}
    afterContent={<TubingAssemblyRelatedArticles type={type} locale={locale} />} />;
}
