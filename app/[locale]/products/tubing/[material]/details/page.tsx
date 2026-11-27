import { withPublishedTranslationMetadata } from "@/lib/seo/published-translation-metadata";
import { notFound } from "next/navigation";
import TubingDetailStaticPage, { getTubingMetadata } from "@/app/products/tubing/_components/TubingDetailStaticPage";
import RelatedProducts from "@/components/common/related-resources/RelatedProducts";
import FittingRelatedResources from "@/components/products/detail/FittingRelatedResources";
import { germanTubingDetailDraftPaths, getHindiDraftLink, isLocalizedHindiDraftPath, getItalianDraftLink, isLocalizedItalianDraftPath, languageDraftsEnabled } from "@/lib/i18n/draft-languages";
import { tubingText } from "@/data/products/tubing/detail-locales";
import { getPfaTubingAssemblyRelatedProducts } from "@/data/products/tubing-assemblies/related-products";
import { tubingMaterials, isTubingMaterial } from "@/data/products/selection/tubing-selection-routes";
type Props = { params: Promise<{ locale: string; material: string }> };
export const dynamicParams = false;
function hasGermanDetail(locale: string, material: string) {
  return locale === "de" && languageDraftsEnabled && germanTubingDetailDraftPaths.some(path => path === "/products/tubing/" + material + "/details/");
}
function hasItalianDetail(locale: string, material: string) {
  return locale === "it" && isLocalizedItalianDraftPath(`/it/products/tubing/${material}/details/`);
}
function hasHindiDetail(locale: string, material: string) {
  return locale === "hi" && isLocalizedHindiDraftPath("/hi/products/tubing/" + material + "/details/");
}
export function generateStaticParams() {
  return tubingMaterials.flatMap(material => [{locale:"en",material}, ...(hasGermanDetail("de",material) ? [{locale:"de",material}] : []),
    ...(hasItalianDetail("it", material) ? [{locale:"it",material}] : []),
    ...(hasHindiDetail("hi", material) ? [{locale:"hi",material}] : [])]);
}
async function getPageMetadata({ params }: Props) {
  const { locale, material } = await params;
  if ((locale !== "en" && !hasGermanDetail(locale, material) && !hasItalianDetail(locale, material) && !hasHindiDetail(locale, material)) || !isTubingMaterial(material)) notFound();
  return getTubingMetadata(material, locale);
}
export default async function Page({ params }: Props) {
  const { locale, material } = await params;
  const germanDraft = hasGermanDetail(locale, material);
  const italianDraft = hasItalianDetail(locale, material);
  const hindiDraft = hasHindiDetail(locale, material);
  if ((locale !== "en" && !germanDraft && !italianDraft && !hindiDraft) || !isTubingMaterial(material)) notFound();
  const assemblyProducts = material === "pfa-tubing" ? getPfaTubingAssemblyRelatedProducts(germanDraft ? "de" : "en") : [];
  const localizedDraft = hindiDraft ? "hi" : italianDraft ? "it" : undefined;
  const relatedProducts = localizedDraft ? assemblyProducts.map(product => {
    const destination = hindiDraft ? getHindiDraftLink(product.href) : getItalianDraftLink(product.href);
    return { ...product, title: tubingText(product.title, locale), imageAlt: tubingText(product.imageAlt, locale),
      href: destination.href, destinationLanguage: destination.hrefLang };
  }) : assemblyProducts;
  return <TubingDetailStaticPage
    slug={material}
    locale={locale}
    afterContent={<>
      <FittingRelatedResources productTypeId={material} locale="en" germanDraft={germanDraft} contentLocale={localizedDraft} />
      {material === "pfa-tubing" ? <RelatedProducts locale="en" uiLocale={germanDraft ? "de" : localizedDraft} products={relatedProducts} /> : null}
    </>}
  />;
}

export const generateMetadata = withPublishedTranslationMetadata("/products/tubing/[material]/details/", getPageMetadata);
