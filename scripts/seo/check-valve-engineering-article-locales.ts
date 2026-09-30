import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getValveEngineeringArticle } from "../../data/resources/technical-articles/valve-engineering-articles.article";
import { getRotaryValveArticles } from "../../data/resources/technical-articles/rotary-valve-articles.intl";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";
import { getTechnicalArticleData, getTechnicalArticleSlugs } from "../../services/resources/technical-articles/getTechnicalArticleData";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";

const locales: TechnicalArticleLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
const slugs = ["what-is-a-solenoid-valve", "how-does-an-hplc-injection-valve-work"];
const han = /[\u3400-\u9fff]/u;
const paths = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.flatMap(paths);
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) =>
    (key === "href" || key === "productsHref") && typeof item === "string" ? [item] : paths(item),
  );
};
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const visibleText = (html: string) => normalize(decode(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]*>/g, " ")));

async function main() {
  const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3000";
  for (const locale of locales) {
    const prefix = locale === "zh-CN" ? "" : `/${locale}`;
    const { articles } = getTechnicalArticlesPageData(locale);
    if (locale !== "zh-CN") {
      const { strings } = JSON.parse(readFileSync(`data/resources/technical-articles/valve-engineering-locales/${locale}.json`, "utf8"));
      const parameters: Record<string, number[]> = {
        t074: [-75, 0.25], t077: [12, 24, 10], t080: [15], t083: [2.5, 2.5, 1],
        t085: [25], t193: [20], t194: [0.8], t197: [0.4], t200: [25], t204: [10, 32],
      };
      for (const [id, expected] of Object.entries(parameters)) {
        const numbers = strings[id].replace(/,/g, ".").match(/−?\d+(?:\.\d+)?/g)?.map((number: string) => Number(number.replace("−", "-")));
        assert.deepEqual(numbers, expected, `${locale}/${id}: preserve product values and example volumes`);
      }
      for (const [id, ports] of Object.entries({ t144: ["1—6", "2—3", "4—5"], t166: ["1—2", "3—4", "5—6"], t177: ["3—7"] })) {
        for (const pair of ports) assert(strings[id].includes(pair), `${locale}/${id}: preserve HP port pair ${pair}`);
      }
      assert(strings.t034.includes("COM") && strings.t034.includes("NO"), `${locale}: de-energized COM–NO`);
      assert(strings.t035.includes("COM") && strings.t035.includes("NC"), `${locale}: energized COM–NC`);
    }
    for (const slug of slugs) {
      const path = `${prefix}/resources/technical-articles/${slug}/`;
      const source = getValveEngineeringArticle(slug, "zh-CN")!;
      const localized = getValveEngineeringArticle(slug, locale);
      assert(localized, `${locale}/${slug}: dedicated article missing`);
      assert.equal(articles.filter(article => article.slug === slug).length, 1, `${path}: list entry`);
      assert(getTechnicalArticleSlugs(locale).includes(slug), `${path}: static route`);
      assert.equal(getTechnicalArticleData(locale, slug)?.title, localized.copy.metadata.title);
      assert.deepEqual(localized.navigation.map(item => item.id), source.navigation.map(item => item.id));
      assert.deepEqual(localized.copy.sections.map(section => section.blocks.map(block => block.type)),
        source.copy.sections.map(section => section.blocks.map(block => block.type)), `${path}: complete body`);
      if (locale !== "zh-CN") {
        assert(!han.test(JSON.stringify(localized)), `${path}: untranslated article field`);
        for (const href of paths(localized)) assert(href.startsWith(`${prefix}/`), `${path}: ${href}`);
      }
      const search = JSON.parse(readFileSync(`public/search-data/global-search-index.${locale}.v3.json`, "utf8"));
      // Compact per-language indexes store unprefixed paths; the search UI adds the locale.
      assert(search.some((item: { h: string; t: string }) =>
        item.h === `/resources/technical-articles/${slug}` && item.t === localized.copy.metadata.title,
      ), `${path}: missing localized search entry`);

      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      const text = visibleText(html);
      if (locale !== "zh-CN") {
        assert(!han.test(text.replace(/简体中文/g, "")), `${path}: Chinese text in rendered page`);
        const imageAlts = [...html.matchAll(/<img\b[^>]*\balt="([^"]*)"/g)].map(match => decode(match[1]));
        assert(imageAlts.every(alt => !han.test(alt)), `${path}: Chinese image alternative text`);
      }
      assert(text.includes(normalize(localized.copy.metadata.title)), `${path}: rendered title`);
      for (const section of localized.copy.sections) {
        assert(text.includes(normalize(section.title)), `${path}: rendered section`);
        for (const block of section.blocks) {
          if (block.type === "paragraph") assert(text.includes(normalize(block.text)), `${path}: rendered paragraph`);
          if (block.type === "table") {
            for (const cell of [...block.headers, ...block.rows.flat()]) {
              assert(text.includes(normalize(cell)), `${path}: table cell ${cell}`);
            }
          }
          if (block.type === "figure") {
            for (const node of block.flowNodes ?? []) {
              assert(text.includes(normalize(node.label)) && text.includes(normalize(node.detail)), `${path}: flow diagram`);
            }
          }
        }
      }
      for (const item of localized.navigation) assert(html.includes(`id="${item.id}"`), `${path}: section anchor`);
      assert(html.includes(`rel="canonical" href="https://www.foreachtek.com${path}"`), `${path}: canonical`);
      for (const language of [...locales, "x-default"]) {
        assert(html.includes(`hrefLang="${language}"`), `${path}: hreflang ${language}`);
      }
      const graphs = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .flatMap(match => { const data = JSON.parse(match[1]); return data["@graph"] ?? [data]; });
      const faq = graphs.find(item => item["@type"] === "FAQPage");
      assert.deepEqual(faq?.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({
        question: item.name, answer: item.acceptedAnswer.text,
      })), localized.copy.faqItems, `${path}: FAQ schema must match the full localized FAQ`);
      console.log(`PASS ${path}: route, body, tables, diagrams, FAQ, SEO, list and search`);
    }
    if (locale !== "zh-CN") {
      const links = paths(getRotaryValveArticles(locale)).filter(href => href.includes(slugs[1]));
      assert(links.length > 0 && links.every(href => href.startsWith(`/${locale}/`)), `${locale}: rotary-to-HPLC links`);
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
