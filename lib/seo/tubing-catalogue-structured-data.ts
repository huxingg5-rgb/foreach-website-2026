import type { getTubingCatalogue } from "@/data/products/tubing/catalogue";
import type { ProductSpecItem } from "@/data/products/detail/product-detail.types";
import { buildProductSpecProperties } from "@/lib/seo/product-spec-properties";
import { SITE_NAME, SITE_ORGANIZATION_ID } from "@/lib/seo/site-identity";

type Props = {
  url: string;
  name: string;
  locale: string;
  images: string[];
  materialSpec?: ProductSpecItem;
  variants: readonly ReturnType<typeof getTubingCatalogue>[number][];
};

/** Describe only the configurations already rendered in the material page's table. */
export function buildTubingCatalogueStructuredData({ url, name, locale, images, materialSpec, variants }: Props) {
  if (variants.length === 0) return [];

  const en = locale === "en";
  const innerDiameterLabel = en ? "Inner Diameter" : "内径";
  const outerDiameterLabel = en ? "Outer Diameter" : "外径";
  const material = materialSpec?.value.trim();
  const materialProperties = buildProductSpecProperties(materialSpec ? [materialSpec] : []);
  const models = variants.map((variant, index) => {
    const properties = buildProductSpecProperties([
      { label: innerDiameterLabel, value: variant.innerDiameter },
      { label: outerDiameterLabel, value: variant.outerDiameter },
      { label: en ? "Hardness" : "硬度", value: variant.hardness === "—" ? "" : variant.hardness },
      { label: en ? "Packaging" : "包装", value: variant.packaging },
    ]).map(property => property.name === innerDiameterLabel || property.name === outerDiameterLabel
      ? { ...property, unitText: "mm" }
      : property);

    return {
      "@type": "ProductModel",
      // Keep each displayed row distinct, including rows that share a product code.
      "@id": `${url}#tubing-model-${index + 1}`,
      name: variant.model,
      model: variant.model,
      ...(variant.productCode ? { sku: variant.productCode } : {}),
      url,
      ...(images.length > 0 ? { image: images } : {}),
      ...(material ? { material } : {}),
      brand: { "@type": "Brand", name: SITE_NAME },
      manufacturer: { "@id": SITE_ORGANIZATION_ID },
      additionalProperty: [...materialProperties, ...properties],
      mainEntityOfPage: { "@id": `${url}#webpage` },
    };
  });

  return [
    {
      "@type": "ItemList",
      "@id": `${url}#tubing-list`,
      name,
      numberOfItems: models.length,
      itemListElement: models.map((model, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": model["@id"] },
      })),
    },
    ...models,
  ];
}
