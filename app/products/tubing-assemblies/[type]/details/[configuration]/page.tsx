import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import { getPublishedAssemblyConfigurations, isPublishedAssemblyConfiguration } from "@/data/products/tubing-assemblies/publication";
import { getLocalizedAssemblyDetail, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ type: string; configuration: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyTypes.flatMap(item => getPublishedAssemblyConfigurations(item.id).map(configuration => ({ type: item.id, configuration })));
}

async function resolveData(params: Props["params"]) {
  const { type, configuration } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  const option = item && isPublishedAssemblyConfiguration(item.id, configuration) ? configuration : undefined;
  if (!item || !option) notFound();
  return { type: item.id, configuration: option };
}

export async function generateMetadata({ params }: Props) {
  const { type, configuration } = await resolveData(params);
  return getLocalizedAssemblyMetadata("zh-CN", type, configuration, true);
}

export default async function Page({ params }: Props) {
  const { type, configuration } = await resolveData(params);
  return <ProductDetailClient data={getLocalizedAssemblyDetail("zh-CN", type, configuration)}
    afterContent={<TubingAssemblyRelatedArticles type={type} locale="zh-CN" />} />;
}
