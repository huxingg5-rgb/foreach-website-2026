import assert from "node:assert/strict";
import { fittingArticleRelations, getFittingArticleRelations, getFittingAssemblyLinks, selectFittingArticleCards, tubingAssemblyArticleSlugs, withFittingArticleLinks } from "../../data/resources/technical-articles/fitting-article-relations";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";
import { getTubingAssemblySelectionContent } from "../../data/products/tubing-assemblies/localized";
import { allTubingAssemblyLocales } from "../../data/products/tubing-assemblies/locales";
import { getConnectorSelectionArticle } from "../../data/resources/technical-articles/connector-selection-articles.article";
import { getBarbedFittingCopy, getBarbedFittingNavigation } from "../../data/resources/technical-articles/what-is-a-barbed-fitting.zh";
import { getLuerFittingCopy, getLuerFittingNavigation } from "../../data/resources/technical-articles/what-is-a-luer-fitting.zh";
import { getFerruleFittingCopy, getFerruleFittingNavigation } from "../../data/resources/technical-articles/what-is-a-ferrule-fitting.zh";
import { getCompressionRingFittingCopy, getCompressionRingFittingNavigation } from "../../data/resources/technical-articles/what-is-a-compression-ring-fitting.zh";
import { getHardTubeFittingsCopy, getHardTubeFittingsNavigation } from "../../data/resources/technical-articles/hard-tube-fittings-selection.zh";
import { getFlangedTubingCopy, getFlangedTubingNavigation } from "../../data/resources/technical-articles/flanged-tubing-assemblies-selection.article";
import type { TechnicalArticleLocale } from "../../data/resources/technical-articles/technical-articles.types";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "../../data/resources/technical-articles/diaphragm-pump-engineering-article.types";

const copyFactories: Record<string, (locale: TechnicalArticleLocale) => DiaphragmPumpEngineeringArticleCopy> = {
  "what-is-a-barbed-fitting": getBarbedFittingCopy,
  "what-is-a-luer-fitting": getLuerFittingCopy,
  "what-is-a-ferrule-fitting": getFerruleFittingCopy,
  "what-is-a-compression-ring-fitting": getCompressionRingFittingCopy,
  "hard-tube-fittings-selection-guide": getHardTubeFittingsCopy,
  "flanged-tubing-assemblies-selection-guide": getFlangedTubingCopy,
};
const navigationFactories: Record<string, (locale: TechnicalArticleLocale) => readonly { id: string }[]> = {
  "what-is-a-barbed-fitting": getBarbedFittingNavigation,
  "what-is-a-luer-fitting": getLuerFittingNavigation,
  "what-is-a-ferrule-fitting": getFerruleFittingNavigation,
  "what-is-a-compression-ring-fitting": getCompressionRingFittingNavigation,
  "hard-tube-fittings-selection-guide": getHardTubeFittingsNavigation,
  "flanged-tubing-assemblies-selection-guide": getFlangedTubingNavigation,
};
const hrefs = (blocks: readonly EngineeringArticleBlock[]) => blocks.flatMap(block =>
  block.type === "links" ? block.items.map(item => item.href) : block.type === "figure" && block.link ? [block.link.href] : []);
const slugs = [...new Set(fittingArticleRelations.flatMap(pair => pair.map(endpoint => endpoint[0])))];
assert.equal(slugs.length, 12, "The complete recent fitting cluster must be covered");

let verified = 0;
for (const locale of allTubingAssemblyLocales) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  const { articles } = getTechnicalArticlesPageData(locale);
  const assemblyContent = getTubingAssemblySelectionContent(locale);
  for (const slug of slugs) {
    const connector = getConnectorSelectionArticle(slug, locale);
    const source = connector?.copy ?? copyFactories[slug](locale);
    const navigation = connector?.navigation ?? navigationFactories[slug](locale);
    const sourceSnapshot = JSON.stringify(source);
    const relations = getFittingArticleRelations(slug);
    assert(relations.length >= 2, `${locale}/${slug}: missing topic neighbors`);
    const cards = selectFittingArticleCards(articles, relations.map(item => item.slug));
    assert.equal(cards.length, relations.length, `${locale}/${slug}: unpublished or duplicate destination`);
    const assemblyLinks = getFittingAssemblyLinks(slug, assemblyContent);
    const copy = withFittingArticleLinks(source, slug, locale, navigation, articles, assemblyLinks);
    const links = hrefs([...copy.leadBlocks, ...copy.sections.flatMap(section => section.blocks)]);
    for (const relation of relations) {
      assert.notEqual(relation.slug, slug);
      assert(navigation.some(item => item.id === relation.sectionId), `${locale}/${slug}: invalid source section ${relation.sectionId}`);
      assert(links.some(href => href.split("#")[0] === `${prefix}/resources/technical-articles/${relation.slug}/`), `${locale}/${slug}: missing body link to ${relation.slug}`);
      assert(getFittingArticleRelations(relation.slug).some(item => item.slug === slug), `${slug}: missing reverse recommendation`);
    }
    for (const link of assemblyLinks) assert(links.includes(link.href), `${locale}/${slug}: missing product return link`);
    assert.equal(JSON.stringify(source), sourceSnapshot, "Do not mutate shared source articles");
    assert.deepEqual(withFittingArticleLinks(copy, slug, locale, navigation, articles, assemblyLinks), copy, "Do not duplicate links on repeated rendering");
    verified++;
  }
  // Every published configuration must have a corresponding guide, and that
  // guide must link back to the exact localized product URL.
  for (const card of assemblyContent.cards) {
    const family = card.productTypeId as keyof typeof tubingAssemblyArticleSlugs;
    const guides = selectFittingArticleCards(articles, tubingAssemblyArticleSlugs[family]);
    assert.equal(guides.length, 2, `${locale}/${family}: missing product articles`);
    assert(getFittingAssemblyLinks(guides[0].slug, assemblyContent).some(link => link.href === card.detailHref), `${locale}/${card.productId}: missing article-to-product link`);
  }
}
console.log(`PASS: ${verified} localized articles, contextual links, reverse recommendations and all localized tubing assembly return links.`);
