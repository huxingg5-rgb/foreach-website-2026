import { notFound } from "next/navigation";
import Mrv3ConfigurationPage, { getMrv3Metadata } from "@/components/products/detail/Mrv3ConfigurationPage";
import { mrv3Configurations } from "@/data/products/detail/mrv3-content";
import { isMrv3Locale, mrv3Locales } from "@/data/products/detail/mrv3-locales";

export const dynamicParams = false;
export function generateStaticParams() {
  return mrv3Locales.filter(locale => locale !== "zh").flatMap(locale =>
    mrv3Configurations.map(item => ({ locale, configuration: item.slug }))
  );
}
type Props = { params: Promise<{ locale: string; configuration: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale, configuration } = await params;
  if (!isMrv3Locale(locale) || locale === "zh") notFound();
  return getMrv3Metadata(configuration, locale);
}
export default async function Page({ params }: Props) {
  const { locale, configuration } = await params;
  if (!isMrv3Locale(locale) || locale === "zh") notFound();
  return <Mrv3ConfigurationPage slug={configuration} locale={locale} />;
}
