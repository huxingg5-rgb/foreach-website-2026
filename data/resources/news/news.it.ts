import { getItalianDraftLink, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { getAdlm2026OnsiteArticle } from "./adlm-2026-onsite";
import italianCopy from "./news.it.json";
import type { NewsArticle, NewsPageData } from "./news.types";

type NewsArticleCopy = Pick<NewsArticle, "title" | "summary" | "seoTitle" | "seoDescription" | "coverAlt" | "content">;
const articleCopy: Partial<Record<string, NewsArticleCopy>> = italianCopy.articles;
export const italianNewsArticleSlugs = ["adlm-2026-onsite", ...Object.keys(articleCopy)];

export function localizeNewsToItalian(englishPage: NewsPageData): NewsPageData {
  const copy = italianCopy.hub;
  return {
    ...englishPage,
    locale: "it",
    hero: { ...englishPage.hero, ...copy.hero },
    breadcrumbs: [
      { label: copy.breadcrumbs[0].label, href: "/it/" },
      { label: copy.breadcrumbs[1].label },
      { label: copy.breadcrumbs[2].label },
    ],
    search: copy.search,
    categories: englishPage.categories.map((category, index) => ({ ...category, label: copy.categories[index].label })),
    sectionTitle: copy.sectionTitle,
    articles: englishPage.articles.flatMap((article) => {
      if (article.slug === "adlm-2026-onsite") return [getAdlm2026OnsiteArticle("it")];
      const translation = articleCopy[article.slug];
      return translation ? [{ ...article, ...translation }] : [];
    }),
    bottomBanner: {
      ...copy.bottomBanner,
      actions: englishPage.bottomBanner.actions.map((action, index) => {
        const link = getItalianDraftLink(action.href);
        return {
          href: link.href,
          label: copy.bottomBanner.actions[index].label + (link.hrefLang === "en" ? italianEnglishFallbackSuffix : ""),
        };
      }),
    },
  };
}
