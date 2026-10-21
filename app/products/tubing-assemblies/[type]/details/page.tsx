import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import TubingAssemblyRelatedArticles from "@/components/products/tubing-assemblies/TubingAssemblyRelatedArticles";
import { getLocalizedAssemblyDetail, getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ type: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingAssemblyTypes.map(item => ({ type: item.id }));
}

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!item) notFound();
  return getLocalizedAssemblyMetadata("zh-CN", item.id, undefined, true);
}

export default async function Page({ params }: Props) {
  const { type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!item) notFound();
  return <ProductDetailClient data={getLocalizedAssemblyDetail("zh-CN", item.id)}
    afterContent={<TubingAssemblyRelatedArticles type={item.id} locale="zh-CN" />} />;
}
