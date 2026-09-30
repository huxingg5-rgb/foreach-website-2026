import Mrv3ConfigurationPage, { getMrv3Metadata } from "@/components/products/detail/Mrv3ConfigurationPage";
import { mrv3Configurations } from "@/data/products/detail/mrv3-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return mrv3Configurations.map(item => ({ configuration: item.slug }));
}
type Props = { params: Promise<{ configuration: string }> };
export async function generateMetadata({ params }: Props) {
  return getMrv3Metadata((await params).configuration, "zh");
}
export default async function Page({ params }: Props) {
  return <Mrv3ConfigurationPage slug={(await params).configuration} locale="zh" />;
}
