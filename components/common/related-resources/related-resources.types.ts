import type { InstallationGuideCard } from "@/data/resources/installation-guide/installation-guide.types";
import type { RelatedResourcesLocale } from "@/data/resources/related-resources/related-resources.intl";
import type { TechnicalArticleItem } from "@/data/resources/technical-articles/technical-articles.types";

export type RelatedResourceSourceType = "application" | "article" | "product" | "video";
export type RelatedResourcesProps = {
  sourceType: RelatedResourceSourceType;
  includeRelatedArticles?: boolean;
  sourceId?: string;
  sourceSlug?: string;
  relationKeys?: readonly string[];
  locale: RelatedResourcesLocale;
};
export type RelatedArticleCard = Pick<TechnicalArticleItem, "id" | "slug" | "title" | "summary" | "date" | "coverImage">;
export type RelatedResourcesData = {
  locale: RelatedResourcesLocale;
  primaryRelationKey?: string;
  videos: InstallationGuideCard[];
  products: { id: string; title: string; href: string; imageSrc: string; imageAlt: string }[];
  articles: RelatedArticleCard[];
};
