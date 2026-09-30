import SolenoidConfigurationPage, {getSolenoidMetadata} from "@/components/products/detail/SolenoidConfigurationPage";
import {solenoidPageConfigurations} from "@/data/products/detail/solenoid-content";
export const dynamicParams = false;
export function generateStaticParams() { return solenoidPageConfigurations.map(item => ({configuration: item.slug})); }
type Props = {params: Promise<{configuration: string}>};
export async function generateMetadata({params}: Props) { return getSolenoidMetadata((await params).configuration, "zh"); }
export default async function Page({params}: Props) { return <SolenoidConfigurationPage slug={(await params).configuration} locale="zh" />; }
