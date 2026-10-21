import RelatedResourcesLoader from "@/components/common/related-resources/RelatedResourcesLoader";
import type { TubingAssemblyType } from "@/data/products/tubing-assemblies.en";
import type { TubingAssemblyLocale } from "@/data/products/tubing-assemblies/locales";
import { selectFittingArticleCards, tubingAssemblyArticleSlugs } from "@/data/resources/technical-articles/fitting-article-relations";
import { getTechnicalArticlesPageData } from "@/services/resources/technical-articles/getTechnicalArticlesPageData";

export default function TubingAssemblyRelatedArticles({ type, locale }: {
  type?: TubingAssemblyType["id"];
  locale: TubingAssemblyLocale;
}) {
  const slugs = type ? tubingAssemblyArticleSlugs[type] : Object.values(tubingAssemblyArticleSlugs).flat();
  const articles = selectFittingArticleCards(getTechnicalArticlesPageData(locale).articles, slugs);
  return articles.length ? <RelatedResourcesLoader locale={locale} articles={articles} products={[]} videos={[]} /> : null;
}
