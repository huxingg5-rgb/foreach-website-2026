import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getGermanTubingAssemblyMetadata } from "@/data/products/tubing-assemblies/selection.de";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";

export const dynamicParams = false;
export function generateStaticParams() { return [...tubingAssemblyLocales, ...(languageDraftsEnabled ? ["de"] : []), ...(isLocalizedItalianDraftPath("/it/products/tubing-assemblies/") ? ["it"] : []), ...(isLocalizedHindiDraftPath("/hi/products/tubing-assemblies/") ? ["hi"] : [])].map(locale => ({ locale })); }
async function getPageMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === "de") return getGermanTubingAssemblyMetadata();
  if (!(isTubingAssemblyLocale(locale) || locale === "it" && isLocalizedItalianDraftPath("/it/products/tubing-assemblies/") || locale === "hi" && isLocalizedHindiDraftPath("/hi/products/tubing-assemblies/"))) notFound();
  return getLocalizedAssemblyMetadata(locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (languageDraftsEnabled && locale === "de") return <TubingAssembliesPage locale="en" germanDraft />;
  if (!(isTubingAssemblyLocale(locale) || locale === "it" && isLocalizedItalianDraftPath("/it/products/tubing-assemblies/") || locale === "hi" && isLocalizedHindiDraftPath("/hi/products/tubing-assemblies/"))) notFound();
  return <TubingAssembliesPage locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/tubing-assemblies/", getPageMetadata);
