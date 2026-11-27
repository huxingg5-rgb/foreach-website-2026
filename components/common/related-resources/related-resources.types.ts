import type { InstallationGuideCard } from "@/data/resources/installation-guide/installation-guide.types";
import type { RelatedResourcesLocale, RelatedResourcesUiLocale } from "@/data/resources/related-resources/related-resources.intl";
import type { TechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";

export type RelatedResourceSourceType = "application" | "article" | "product" | "video";
export type RelatedResourcesProps = {
  sourceType: RelatedResourceSourceType;
  includeRelatedArticles?: boolean;
  sourceId?: string;
  sourceSlug?: string;
  relationKeys?: readonly string[];
  /** An explicit, ordered card selection; omit to use automatic relations. */
  featuredProductIds?: readonly string[];
  locale: RelatedResourcesLocale;
  uiLocale?: RelatedResourcesUiLocale;
};
export type RelatedArticleCard = Pick<TechnicalArticleItem, "id" | "slug" | "title" | "summary" | "date" | "coverImage"> & {
  href?: string;
  contentLanguage?: "de" | "it" | "hi" | "en";
  destinationLanguage?: "de" | "it" | "hi" | "en";
};
export type RelatedResourcesData = {
  locale: RelatedResourcesLocale;
  /** Review text may use a different language while all destination URLs keep locale. */
  uiLocale?: RelatedResourcesUiLocale;
  primaryRelationKey?: string;
  /** Landing pages and labels can use German while resources use existing English relations. */
  videoLocale?: "de" | "it" | "hi";
  videoLibraryHref?: string;
  videos: InstallationGuideCard[];
  products: {
    id: string; title: string; href: string; imageSrc: string; imageAlt: string;
    destinationLanguage?: "de" | "it" | "hi" | "en";
    /** Shared frame ratio for a product group; source images remain fully contained. */
    imageAspectRatio?: number;
  }[];
  articles: RelatedArticleCard[];
};
