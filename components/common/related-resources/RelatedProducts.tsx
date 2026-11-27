import RelatedResourcesLoader from "./RelatedResourcesLoader";
import type { RelatedResourcesData } from "./related-resources.types";

/** Default for newly added related-product sections; legacy sections retain their layout. */
export default function RelatedProducts({ locale, uiLocale, products }: Pick<RelatedResourcesData, "locale" | "uiLocale" | "products">) {
  if (!products.length) return null;
  return <RelatedResourcesLoader
    locale={locale}
    uiLocale={uiLocale}
    products={products.map(product => ({...product, imageAspectRatio: 1}))}
    articles={[]}
    videos={[]}
  />;
}
