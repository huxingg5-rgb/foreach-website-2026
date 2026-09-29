import {notFound} from "next/navigation";
import SolenoidConfigurationPage, {getSolenoidMetadata} from "@/components/products/detail/SolenoidConfigurationPage";
import {solenoidPageConfigurations, solenoidLocales, isSolenoidLocale} from "@/data/products/detail/solenoid-content";
export const dynamicParams = false;
export function generateStaticParams() { return solenoidLocales.filter(locale => locale !== "zh").flatMap(locale => solenoidPageConfigurations.map(item => ({locale, configuration: item.slug}))); }
type Props = {params: Promise<{locale: string; configuration: string}>};
export async function generateMetadata({params}: Props) {
  const {locale, configuration} = await params;
  if (!isSolenoidLocale(locale) || locale === "zh") notFound();
  return getSolenoidMetadata(configuration, locale);
}
export default async function Page({params}: Props) {
  const {locale, configuration} = await params;
  if (!isSolenoidLocale(locale) || locale === "zh") notFound();
  return <SolenoidConfigurationPage slug={configuration} locale={locale} />;
}
