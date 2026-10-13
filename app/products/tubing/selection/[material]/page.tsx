import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
import { tubingMaterials } from "@/data/products/selection/tubing-selection-routes";

type Props = { params: Promise<{ material: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingMaterials.map(material => ({ material }));
}
export async function generateMetadata({ params }: Props) {
  return getTubingSelectionMetadata((await params).material, "zh");
}
export default async function Page({ params }: Props) {
  return <TubingSelectionPage material={(await params).material} locale="zh" />;
}
