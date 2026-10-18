import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import { assemblyConfigurations } from "@/data/products/detail/tubing-assemblies.review.zh";
import { getLocalizedAssemblyDetail, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";
import { getPublishedAssemblyConfigurations, isPublishedAssemblyConfiguration } from "@/data/products/tubing-assemblies/publication";

type Props = { params: Promise<{ locale: string; type: string; configuration: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyLocales.flatMap(locale => tubingAssemblyTypes.flatMap(item => getPublishedAssemblyConfigurations(item.id).map(configuration => ({ locale, type: item.id, configuration }))));
}
async function resolveData(params: Props["params"]) {
  const { locale, type, configuration } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  const option = assemblyConfigurations.find(option => option === configuration);
  if (!isTubingAssemblyLocale(locale) || !item || !option || !isPublishedAssemblyConfiguration(item.id, option)) notFound();
  return { locale, type: item.id, configuration: option };
}
export async function generateMetadata({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  return getLocalizedAssemblyMetadata(locale, type, configuration, true);
}
export default async function Page({ params }: Props) {
  const { locale, type, configuration } = await resolveData(params);
  return <ProductDetailClient data={getLocalizedAssemblyDetail(locale, type, configuration)} />;
}
