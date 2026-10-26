import assert from "node:assert/strict";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";
import { getTechnicalArticlePagerData } from "../../services/resources/technical-articles/getTechnicalArticleData";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";

const locales: TechnicalArticleLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
let verified = 0;

for (const locale of locales) {
  const { articles } = getTechnicalArticlesPageData(locale);
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const hrefFor = (slug: string) => `${prefix}/resources/technical-articles/${slug}/`;
  assert(articles.length > 2, `${locale}: need first, middle and last articles`);

  for (const [index, article] of articles.entries()) {
    const pager = getTechnicalArticlePagerData(locale, article.slug);
    for (const [key, neighborIndex] of [
      ["previousArticle", index - 1],
      ["nextArticle", index + 1],
    ] as const) {
      const expected = articles[neighborIndex];
      const actual = pager[key];
      assert.deepEqual(actual, expected ? {
        title: expected.title,
        href: hrefFor(expected.slug),
        date: expected.date,
      } : null, `${locale}/${article.slug}: ${key}`);
      if (actual && expected) {
        assert.notEqual(actual.href, hrefFor(article.slug), "No self-links");
        const reverse = getTechnicalArticlePagerData(locale, expected.slug);
        const reverseKey = key === "previousArticle" ? "nextArticle" : "previousArticle";
        assert.equal(reverse[reverseKey]?.href, hrefFor(article.slug), "Adjacent links must be reciprocal");
      }
    }
    verified++;
  }

  assert.deepEqual(getTechnicalArticlePagerData(locale, "missing-article"), {
    previousArticle: null,
    nextArticle: null,
  });
  assert(articles.some(article => article.slug === "rpl-valveless-metering-pump-selection-guide"),
    `${locale}: preserve the published RPL selection guide`);
  // All neighbors and boundaries follow the public article order checked above.
  console.log(`PASS: ${locale}: ${articles.length} article pagers, boundaries and missing-slug handling`);
}

console.log(`PASS: ${verified} localized article pagers; correct titles, dates, locale URLs and reciprocal links.`);
