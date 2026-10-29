import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getTubingMaterialArticle, getTubingMaterialArticles } from "../../data/resources/technical-articles/ptfe-tubing.article";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";

const locales: TechnicalArticleLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
const materials = ["ptfe", "fep", "pfa", "pvc"];
const failures: string[] = [];
const numbers = (text: string) => (text.replace(/fourfold/g, "4").replace(/四次方|fourth power|quatrième puissance|cuarta potencia|четвёртой степени/g, "4").match(/\d+(?:\.\d+)?/g) ?? []).sort().join("|");

function compare(source: unknown, target: unknown, at: string) {
  if (typeof source === "string" && typeof target === "string") {
    if (!/[\u3400-\u9fff]/.test(source) && !source.startsWith("/")) {
      if (source !== target) failures.push(`${at}: changed technical literal ${source}`);
    } else if (!source.startsWith("/") && numbers(source) !== numbers(target)) {
      failures.push(`${at}: changed numerical content ${numbers(source)} -> ${numbers(target)}`);
    }
    return;
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(target) || source.length !== target.length) { failures.push(`${at}: array coverage`); return; }
    source.forEach((value, index) => compare(value, target[index], `${at}[${index}]`));
    return;
  }
  if (source && typeof source === "object") {
    if (!target || typeof target !== "object") { failures.push(`${at}: missing object`); return; }
    const other = target as Record<string, unknown>;
    if (Object.keys(source).sort().join() !== Object.keys(other).sort().join()) failures.push(`${at}: field coverage`);
    Object.entries(source).forEach(([key, value]) => compare(value, other[key], `${at}.${key}`));
    return;
  }
  if (source !== target) failures.push(`${at}: changed structural value`);
}

function inspect(value: unknown, locale: TechnicalArticleLocale, at: string) {
  if (typeof value === "string") {
    if (locale !== "zh-CN" && /\p{Script=Han}/u.test(value)) failures.push(`${at}: Chinese text`);
    if (locale !== "ko" && /\p{Script=Hangul}/u.test(value)) failures.push(`${at}: Korean text`);
    if (locale !== "ru" && /\p{Script=Cyrillic}/u.test(value)) failures.push(`${at}: Russian text`);
    if (/Parker|IDEX|Swagelok|Entegris|Chemours|Saint.Gobain|Teflon|宣传册/i.test(value)) failures.push(`${at}: unrelated manufacturer or source wording`);
    if (value.startsWith("/images/") && !fs.existsSync(path.join(process.cwd(), "public", value))) failures.push(`${at}: missing image ${value}`);
    if (locale !== "zh-CN" && /^\/(products|resources)\//.test(value)) failures.push(`${at}: untranslated route ${value}`);
    if (locale !== "zh-CN" && locale !== "en" && /(?:Tubing|Perfluoroalkoxy Polymer)/.test(value) && /products.*title/.test(at)) failures.push(`${at}: English product name`);
    return;
  }
  if (Array.isArray(value)) value.forEach((entry, index) => inspect(entry, locale, `${at}[${index}]`));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, entry]) => inspect(entry, locale, `${at}.${key}`));
}

for (const locale of locales) {
  const listing = getTechnicalArticlesPageData(locale);
  assert.equal(getTubingMaterialArticles(locale).length, 4);
  for (const material of materials) {
    const slug = `what-is-${material}-tubing`;
    const source = getTubingMaterialArticle(slug, "zh-CN")!;
    const article = getTubingMaterialArticle(slug, locale)!;
    const entries = listing.articles.filter(item => item.slug === slug);
    assert.equal(entries.length, 1, `${locale}/${slug}: listing availability`);
    assert.equal(article.copy.faqItems.length, material === "ptfe" ? 2 : 1, `${locale}/${slug}: approved FAQ count`);
    compare(source.copy, article.copy, `${locale}/${slug}`);
    inspect(article, locale, `${locale}/${slug}`);
    // Listing records intentionally use locale-neutral slugs, unlike rendered body links.
    inspect({ title: entries[0].title, description: entries[0].seoDescription, tags: entries[0].tags }, locale, `${locale}/${slug}: listing`);
    assert.equal(article.navigation.length, article.copy.sections.length);
    article.copy.sections.forEach(section => assert.doesNotMatch(section.title, /^\d+[、.\s]/, "The template supplies section numbering"));
    article.copy.faqItems.forEach((faq, index) => assert.match(faq.question, new RegExp(`^${index + 1}\\. (?!\\d+[.、])`)));
  }
}
assert.deepEqual(failures, [], `Tubing localization audit failed:\n${failures.join("\n")}`);
console.log("PASS: 24 tubing articles; complete structure, numerical content, model literals, images, localized text/links, listing and approved FAQ coverage.");
