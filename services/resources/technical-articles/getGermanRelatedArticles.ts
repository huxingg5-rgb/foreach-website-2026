import type { RelatedArticleCard } from "@/components/common/related-resources/related-resources.types";
import { germanTechnicalArticleSlugs } from "@/data/resources/technical-articles/technical-article-slugs.de";
import { getGermanTechnicalArticleCardText } from "./getGermanTechnicalArticlesPageData";

export function getGermanRelatedArticles(articles: readonly RelatedArticleCard[]): RelatedArticleCard[] {
  return articles.map(article => {
    const translation = getGermanTechnicalArticleCardText(article.slug);
    const destinationLanguage = germanTechnicalArticleSlugs.includes(article.slug) ? "de" : "en";
    return {
      ...article,
      ...translation,
      href: "/" + destinationLanguage + "/resources/technical-articles/" + article.slug + "/",
      contentLanguage: translation ? "de" : "en",
      destinationLanguage,
    };
  });
}
