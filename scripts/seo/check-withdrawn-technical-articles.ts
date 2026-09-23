import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";
import { getRelatedResourcesData } from "../../services/resources/getRelatedResourcesData";
import {
  getTechnicalArticleData,
  getTechnicalArticlePagerData,
  getTechnicalArticleSlugs,
} from "../../services/resources/technical-articles/getTechnicalArticleData";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";

const locales: TechnicalArticleLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
const withdrawnSlugs = new Set([
  "pressure-flow-material-compatibility",
  "common-fitting-sealing-failure-causes",
  "fitting-replacement-by-drawings-or-samples",
  "ivd-fluidic-system-selection-parameters",
  "low-pressure-vs-high-pressure-fittings",
  "material-compatibility-table-reference",
  "peek-ptfe-pfa-material-differences",
  "rigid-tubing-vs-flexible-tubing",
  "selecting-microfluidic-fittings",
  "solenoid-valves-in-microfluidic-systems",
  "why-application-context-matters",
]);

function slugFromHref(href: string) {
  return new URL(href, "https://www.foreachtek.com").pathname
    .split("/").filter(Boolean).at(-1) ?? "";
}

for (const locale of locales) {
  const { articles } = getTechnicalArticlesPageData(locale);
  const staticSlugs = getTechnicalArticleSlugs(locale);
  assert(articles.length > 0, `${locale}: preserve published articles`);
  assert.deepEqual(staticSlugs, articles.map((article) => article.slug));

  for (const slug of withdrawnSlugs) {
    assert(!staticSlugs.includes(slug), `${locale}/${slug}: must not be exported`);
    assert.equal(getTechnicalArticleData(locale, slug), null, `${locale}/${slug}: no detail data`);
    assert.deepEqual(getTechnicalArticlePagerData(locale, slug), {
      previousArticle: null,
      nextArticle: null,
    });
  }

  for (const article of articles) {
    const pager = getTechnicalArticlePagerData(locale, article.slug);
    for (const neighbor of [pager.previousArticle, pager.nextArticle]) {
      if (neighbor) assert(!withdrawnSlugs.has(slugFromHref(neighbor.href)));
    }
    const related = getRelatedResourcesData({
      sourceType: "article",
      sourceId: article.id,
      sourceSlug: article.slug,
      relationKeys: article.relationKeys,
      includeRelatedArticles: true,
      locale,
    });
    assert(related.articles.every((item) => !withdrawnSlugs.has(item.slug)));
  }

  const indexFiles = [`global-search-index.${locale}.v3.json`];
  if (locale === "zh-CN") indexFiles.push("global-search-index.v2.json");
  for (const file of indexFiles) {
    const items = JSON.parse(readFileSync(path.join(process.cwd(), "public/search-data", file), "utf8")) as {
      m: string;
      h: string;
    }[];
    assert(items.every((item) => !withdrawnSlugs.has(slugFromHref(item.h))), `${file}: no withdrawn URLs`);
    assert.deepEqual(
      items.filter((item) => item.m === "technical-articles").map((item) => slugFromHref(item.h)).sort(),
      [...staticSlugs].sort(),
      `${file}: search and public article routes must agree`,
    );
  }
  console.log(`PASS ${locale}: ${articles.length} published articles; withdrawn drafts absent from lists, details, static params, pagers, recommendations and search.`);
}
