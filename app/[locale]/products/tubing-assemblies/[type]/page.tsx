import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import TubingAssembliesPage from "@/components/products/tubing-assemblies/TubingAssembliesPage";
import { getGermanTubingAssemblyMetadata } from "@/data/products/tubing-assemblies/selection.de";
import { isLocalizedHindiDraftPath, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { getLocalizedAssemblyMetadata } from "@/data/products/tubing-assemblies/localized";
import { tubingAssemblyLocales, isTubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { tubingAssemblyTypes } from "@/data/products/tubing-assemblies.en";

type Props = { params: Promise<{ locale: string; type: string }> };
export const dynamicParams = false;
function isItalianAssemblySelection(type: string) {
  return isLocalizedItalianDraftPath(`/it/products/tubing-assemblies/${type}/`);
}
function isHindiAssemblySelection(type: string) {
  return isLocalizedHindiDraftPath("/hi/products/tubing-assemblies/" + type + "/");
}
export function generateStaticParams() {
  return tubingAssemblyTypes.flatMap(({ id: type }) => [
    ...[...tubingAssemblyLocales, ...(languageDraftsEnabled ? ["de"] : [])].map(locale => ({ locale, type })),
    ...(isItalianAssemblySelection(type) ? [{ locale: "it", type }] : []),
    ...(isHindiAssemblySelection(type) ? [{ locale: "hi", type }] : []),
  ]);
}
async function getPageMetadata({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (item && languageDraftsEnabled && locale === "de") return getGermanTubingAssemblyMetadata(item.id);
  if (!(isTubingAssemblyLocale(locale) || locale === "it" && isItalianAssemblySelection(type) || locale === "hi" && isHindiAssemblySelection(type)) || !item) notFound();
  return getLocalizedAssemblyMetadata(locale, item.id);
}
export default async function Page({ params }: Props) {
  const { locale, type } = await params;
  const item = tubingAssemblyTypes.find(item => item.id === type);
  if (item && languageDraftsEnabled && locale === "de") return <TubingAssembliesPage item={item} locale="en" germanDraft />;
  if (!(isTubingAssemblyLocale(locale) || locale === "it" && isItalianAssemblySelection(type) || locale === "hi" && isHindiAssemblySelection(type)) || !item) notFound();
  return <TubingAssembliesPage item={item} locale={locale} />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/tubing-assemblies/[type]/", getPageMetadata);
