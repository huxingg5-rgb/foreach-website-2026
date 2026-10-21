import { notFound } from "next/navigation";
import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
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
  return getLocalizedAssemblyMetadata("zh-CN", item.id);
}

export default async function Page({ params }: Props) {
  const { type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!item) notFound();
  return <TubingAssembliesPage item={item} locale="zh-CN" />;
}
