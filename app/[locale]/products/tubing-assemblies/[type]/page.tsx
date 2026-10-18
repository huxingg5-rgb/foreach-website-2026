import { notFound } from "next/navigation";
import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ locale: string; type: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return tubingAssemblyLocales.flatMap(locale => tubingAssemblyTypes.map(item => ({ locale, type: item.id }))); }
export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!isTubingAssemblyLocale(locale) || !item) notFound();
  return getLocalizedAssemblyMetadata(locale, item.id);
}
export default async function Page({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (!isTubingAssemblyLocale(locale) || !item) notFound();
  return <TubingAssembliesPage item={item} locale={locale} />;
}
