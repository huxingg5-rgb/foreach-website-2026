import type { RelatedResourcesData } from "@/components/common/related-resources/related-resources.types";
import type { ApplicationDocument } from "@/data/applications/analytical-documents/types";
import type { EnglishApplicationKind } from "@/data/applications/application-english";
import { relatesToQuickDisconnects } from "@/data/applications/quick-disconnect-article-relations";
import { getConnectorSelectionArticles } from "@/data/resources/technical-articles/connector-selection-articles.article";
import { quickDisconnectFittingSlug, femaleThreadAdaptersSlug, bulkheadBarbedFittingSlug } from "@/data/resources/technical-articles/technical-article-availability";
import { relatesToPanelFittings } from "@/data/applications/panel-fitting-article-relations";

/** Add the localized reading without replacing the application's existing resources. */
export function withQuickDisconnectArticle(
  resources: RelatedResourcesData,
  kind: EnglishApplicationKind,
  document: Pick<ApplicationDocument, "kind" | "slug" | "reviewContext">,
): RelatedResourcesData {
  const slugs = new Set<string>();
  if (relatesToQuickDisconnects(kind, document)) slugs.add(quickDisconnectFittingSlug);
  // The user excludes Chinese application pages, but not Chinese product pages.
  if (resources.locale !== "zh-CN" && relatesToPanelFittings(kind, document)) {
    slugs.add(femaleThreadAdaptersSlug);
    slugs.add(bulkheadBarbedFittingSlug);
  }
  const additions = getConnectorSelectionArticles(resources.locale)
    .filter(article => slugs.has(article.slug) && !resources.articles.some(existing => existing.slug === article.slug))
    .map(({ id, slug, title, summary, date, coverImage }) => ({ id, slug, title, summary, date, coverImage }));
  return additions.length ? { ...resources, articles: [...resources.articles, ...additions] } : resources;
}
