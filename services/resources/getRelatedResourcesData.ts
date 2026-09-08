import { getDiaphragmPumpCopy } from "@/data/products/detail/diaphragm-pump-copy";
import { getDiaphragmPumpReferenceByProductId } from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";
import { diaphragmPumpSelectionProducts } from "@/data/products/selection/diaphragm-pump-selection.generated";
import { pistonPumpRelatedProducts } from "@/data/products/selection/piston-pump-related-products";
import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";
import {
  type RelatedResourcesLocale,
} from "@/data/resources/related-resources/related-resources.intl";
import {
  getRelatedArticles,
  getRelatedProducts,
  getRelatedVideos,
  normalizeRelationKey,
} from "@/lib/related-resources";
import { getInstallationGuidePageData } from "@/services/resources/installation-guide/getInstallationGuidePageData";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";


import type { RelatedResourcesProps, RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";

const relatedResourceProducts: ProductSelectionProduct[] = [
  ...diaphragmPumpSelectionProducts,
  ...pistonPumpRelatedProducts,
];

function getLocalePrefix(locale: RelatedResourcesLocale) {
  return locale === "zh-CN" ? "" : `/${locale}`;
}

function getProductLocale(locale: RelatedResourcesLocale) {
  return locale === "zh-CN" ? "zh" : locale;
}

function getLocalizedProductText(
  value: unknown,
  locale: RelatedResourcesLocale,
) {
  if (typeof value === "string") {
    return locale === "zh-CN" || locale === "en" ? value : "";
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "";
  }

  const localizedValue = (value as Record<string, unknown>)[
    getProductLocale(locale)
  ];

  return typeof localizedValue === "string" ? localizedValue : "";
}

function getProductDetailTitle(
  product: ProductSelectionProduct,
  locale: RelatedResourcesLocale,
) {
  const reference = getDiaphragmPumpReferenceByProductId(product.productId);

  if (reference) {
    return reference.model;
  }

  return (
    getDiaphragmPumpCopy(product, getProductLocale(locale))?.title ||
    getLocalizedProductText(product.cardTitle, locale)
  );
}

function getProductDetailHref(
  locale: RelatedResourcesLocale,
  product: ProductSelectionProduct,
) {
  const reference = getDiaphragmPumpReferenceByProductId(product.productId);
  const directHref =
    product.detailHref ?? product.productDetailHref ?? product.href;

  const rawHref = reference
    ? getDiaphragmPumpPath(getProductLocale(locale), reference.slug, {
        trailingSlash: false,
      })
    : typeof directHref === "string" && directHref.trim()
      ? directHref.trim()
      : `/${[
            "products",
            product.categorySlug,
            product.productTypeSlug,
            product.detailSlug,
          ]
            .filter((value): value is string => Boolean(value))
            .join("/")}`;

  /* 外部链接保持原样；站内产品链接则补齐当前语言前缀。 */
  if (/^(?:https?:)?\/\//.test(rawHref)) {
    return rawHref;
  }

  const normalizedHref = rawHref.startsWith("/") ? rawHref : `/${rawHref}`;
  const localePrefix = getLocalePrefix(locale);

  if (!localePrefix || normalizedHref.startsWith(`${localePrefix}/`)) {
    return normalizedHref;
  }

  return `${localePrefix}${normalizedHref}`;
}

function getProductCardImage(product: ProductSelectionProduct) {
  return (
    product.imageCard ??
    product.cardImage ??
    product.image ??
    product.imagePath ??
    product.imageUrl ??
    ""
  );
}


/** Resolve relations at build/render time. Never pass full article bodies to a Client Component. */
export function getRelatedResourcesData({
  sourceType, sourceId, sourceSlug, relationKeys = [], includeRelatedArticles = false, locale,
}: RelatedResourcesProps): RelatedResourcesData {
  const query = { id: sourceId, slug: sourceSlug, relationKeys };
  const videos = sourceType === "video" ? [] : getRelatedVideos(getInstallationGuidePageData(locale).guides, query);
  const articles = sourceType === "article" && !includeRelatedArticles ? [] :
    getRelatedArticles(getTechnicalArticlesPageData(locale).articles, query).map(
      ({ id, slug, title, summary, date, coverImage }) => ({ id, slug, title, summary, date, coverImage }),
    );
  const products = sourceType === "product" ? [] : getRelatedProducts(
    relatedResourceProducts.filter(product => Boolean(getProductDetailTitle(product, locale))), query,
  ).slice(0, 4).map(product => {
    const title = getProductDetailTitle(product, locale);
    return {
      id: product.productId, title,
      href: getProductDetailHref(locale, product),
      imageSrc: getProductCardImage(product),
      imageAlt: getLocalizedProductText(product.imageAlt, locale) || title,
    };
  });
  return { locale, videos, products, articles, primaryRelationKey: relationKeys.map(normalizeRelationKey).find(Boolean) };
}
