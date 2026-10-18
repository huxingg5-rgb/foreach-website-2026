import { notFound } from "next/navigation";
import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";

export const dynamicParams = false;
export function generateStaticParams() { return tubingAssemblyLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isTubingAssemblyLocale(locale)) notFound();
  return getLocalizedAssemblyMetadata(locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isTubingAssemblyLocale(locale)) notFound();
  return <TubingAssembliesPage locale={locale} />;
}
