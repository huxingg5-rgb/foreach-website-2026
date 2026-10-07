import { notFound } from "next/navigation";
import ProbeSelectionPageZh, { getProbeSelectionMetadataZh } from "@/components/products/selection/ProbeSelectionPageZh";
import { probeTypesZh } from "@/data/products/selection/probe-selection.zh";

type PageProps = { params: Promise<{ type: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return probeTypesZh.map(({ id }) => ({ type: id }));
}
export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;
  if (!probeTypesZh.some(({ id }) => id === type)) return {};
  return getProbeSelectionMetadataZh(type);
}
export default async function ProbeTypePage({ params }: PageProps) {
  const { type } = await params;
  if (!probeTypesZh.some(({ id }) => id === type)) notFound();
  return <ProbeSelectionPageZh productTypeId={type} />;
}
