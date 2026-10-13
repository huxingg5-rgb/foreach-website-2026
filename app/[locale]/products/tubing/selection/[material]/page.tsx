import { notFound } from "next/navigation";
import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
import { tubingMaterials } from "@/data/products/selection/tubing-selection-routes";

type Props = { params: Promise<{ locale: string; material: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return tubingMaterials.map(material => ({ locale: "en", material }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, material } = await params;
  if (locale !== "en") notFound();
  return getTubingSelectionMetadata(material, locale);
}
export default async function Page({ params }: Props) {
  const { locale, material } = await params;
  if (locale !== "en") notFound();
  return <TubingSelectionPage material={material} locale={locale} />;
}
