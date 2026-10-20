import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { ApplicationDocument } from "@/data/applications/analytical-documents/types";
import type { EnglishApplicationKind } from "@/data/applications/application-english";
import { relatesToQuickDisconnects } from "@/data/applications/quick-disconnect-article-relations";
import { getConnectorSelectionArticles } from "@/data/resources/technical-articles/connector-selection-articles.article";
import { quickDisconnectFittingSlug } from "@/data/resources/technical-articles/technical-article-availability";

/** Add the localized reading without replacing the application's existing resources. */
export function withQuickDisconnectArticle(
  resources: RelatedResourcesData,
  kind: EnglishApplicationKind,
  document: Pick<ApplicationDocument, "kind" | "slug" | "reviewContext">,
): RelatedResourcesData {
  if (!relatesToQuickDisconnects(kind, document)
    || resources.articles.some(article => article.slug === quickDisconnectFittingSlug)) return resources;
  const article = getConnectorSelectionArticles(resources.locale).find(item => item.slug === quickDisconnectFittingSlug);
  if (!article) return resources;
  const { id, slug, title, summary, date, coverImage } = article;
  return { ...resources, articles: [...resources.articles, { id, slug, title, summary, date, coverImage }] };
}
