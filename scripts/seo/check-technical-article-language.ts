import assert from "node:assert/strict";

import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";

// Checks the assembled public data, including taxonomy overrides. Source-file
// scans alone miss Chinese tags added after the article copy is localized.
const locales: TechnicalArticleLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
const failures: string[] = [];
let articleCount = 0;

function checkText(locale: TechnicalArticleLocale, field: string, text: string) {
  const foreignScripts = [
    ...(locale !== "zh-CN" ? [/\p{Script=Han}/u] : []),
    ...(locale !== "ko" ? [/\p{Script=Hangul}/u] : []),
    ...(locale !== "ru" ? [/\p{Script=Cyrillic}/u] : []),
    /[\p{Script=Hiragana}\p{Script=Katakana}]/u,
  ];
  if (foreignScripts.some((pattern) => pattern.test(text))) {
    failures.push(`${locale} ${field}: ${text.slice(0, 160)}`);
  }
}

const englishArticles = new Map(
  getTechnicalArticlesPageData("en").articles.map((article) => [article.slug, article]),
);
const sharedTechnicalTags = new Set(["Luer lock", "Luer slip", "Cv/Kv"]);

for (const locale of locales) {
  const page = getTechnicalArticlesPageData(locale);
  const pageTexts = [
    page.hero.title,
    page.hero.description,
    page.search.placeholder,
    page.sectionTitle,
    page.bottomBanner.title,
    page.bottomBanner.description,
    ...page.bottomBanner.actions.map((action) => action.label),
    ...page.breadcrumbs.map((crumb) => crumb.label),
    ...page.taxonomy.flatMap((category) => [
      category.label,
      ...category.children.map((child) => child.label),
    ]),
  ];
  pageTexts.forEach((text, index) => checkText(locale, `listing[${index}]`, text));

  for (const article of page.articles) {
    articleCount += 1;
    const fields = {
      title: article.title,
      summary: article.summary,
      coverAlt: article.coverAlt,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
    };
    for (const [key, text] of Object.entries(fields)) {
      if (text) checkText(locale, `${article.slug}.${key}`, text);
    }
    article.tags.forEach((tag, index) => checkText(locale, `${article.slug}.tags[${index}]`, tag));
    article.content.forEach((block, index) => {
      checkText(locale, `${article.slug}.content[${index}].title`, block.title);
      checkText(locale, `${article.slug}.content[${index}].content`, block.content);
    });

    const english = englishArticles.get(article.slug);
    if (locale === "en" || !english) continue;
    for (const key of ["title", "summary", "seoTitle", "seoDescription"] as const) {
      const text = article[key];
      if (text && text.length > 40 && text === english[key]) {
        failures.push(`${locale} ${article.slug}.${key}: English fallback`);
      }
    }
    for (const tag of article.tags) {
      if (
        english.tags.includes(tag) &&
        !sharedTechnicalTags.has(tag) &&
        (tag.match(/[a-z]{2,}/g)?.length ?? 0) >= 2
      ) {
        failures.push(`${locale} ${article.slug}.tags: untranslated English phrase "${tag}"`);
      }
    }
  }
}

assert.deepEqual(failures, [], failures.join("\n"));
console.log(`Technical article language checks passed: ${locales.length} locales, ${articleCount} article variants.`);
