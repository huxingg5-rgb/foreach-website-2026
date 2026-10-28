import { notFound } from "next/navigation";
import TubingDetailStaticPage, { getTubingMetadata } from "@/app/products/tubing/_components/TubingDetailStaticPage";
import FittingRelatedResources from "@/components/products/detail/FittingRelatedResources";
import { tubingMaterials, isTubingMaterial } from "@/data/products/selection/tubing-selection-routes";
type Props = { params: Promise<{ locale: string; material: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return tubingMaterials.map(material => ({ locale: "en", material })); }
export async function generateMetadata({ params }: Props) {
  const { locale, material } = await params;
  if (locale !== "en" || !isTubingMaterial(material)) notFound();
  return getTubingMetadata(material, locale);
}
export default async function Page({ params }: Props) {
  const { locale, material } = await params;
  if (locale !== "en" || !isTubingMaterial(material)) notFound();
  return <TubingDetailStaticPage
    slug={material}
    locale={locale}
    afterContent={<FittingRelatedResources productTypeId={material} locale={locale} />}
  />;
}
