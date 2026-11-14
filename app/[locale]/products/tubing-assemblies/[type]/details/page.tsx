import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import TubingAssemblyDetailContent from "@/components/products/tubing-assemblies/TubingAssemblyDetailContent";
import TubingAssemblyDeliveryContent from "@/components/products/tubing-assemblies/TubingAssemblyDeliveryContent";
import { getLocalizedAssemblyDetail, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ locale: string; type: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyLocales.flatMap(locale => tubingAssemblyTypes.map(item => ({ locale, type: item.id })));
}
export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!isTubingAssemblyLocale(locale) || !item) notFound();
  return getLocalizedAssemblyMetadata(locale, item.id, undefined, true);
}
export default async function Page({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!isTubingAssemblyLocale(locale) || !item) notFound();
  return <ProductDetailClient data={getLocalizedAssemblyDetail(locale, item.id)}
    customerCategoryMode="tubing-assembly"
    customerCategoryContent={{
      product: <TubingAssemblyDetailContent family={item.id} section="product" locale={locale} />,
      selection: <TubingAssemblyDetailContent family={item.id} section="selection" locale={locale} />,
      delivery: <TubingAssemblyDeliveryContent family={item.id} locale={locale} />,
    }}
    afterContent={<TubingAssemblyRelatedArticles type={item.id} locale={locale} />} />;
}
