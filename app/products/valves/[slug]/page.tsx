import ValveSelectionPage, { getValveSelectionMetadata } from '@/components/products/selection/ValveSelectionPage';
import { valveSeriesRoutes } from '@/data/products/selection/valve-routes';
export const dynamicParams = false;
export function generateStaticParams() { return valveSeriesRoutes.map(({slug}) => ({slug})); }
type Props = {params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props) {
  return getValveSelectionMetadata((await params).slug,'zh');
}
export default async function Page({params}:Props) {
  return <ValveSelectionPage slug={(await params).slug} locale="zh" />;
}
