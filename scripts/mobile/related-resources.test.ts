import assert from "node:assert/strict";
import test from "node:test";
import { getRelatedResourcesData } from "../../services/resources/getRelatedResourcesData";
import { getTechnicalArticlesPageData } from "../../services/resources/technical-articles/getTechnicalArticlesPageData";
import { getInstallationGuidePageData } from "../../services/resources/installation-guide/getInstallationGuidePageData";
import { getRelatedArticles, getRelatedVideos } from "../../lib/related-resources";
import type { RelatedResourcesLocale } from "../../data/resources/related-resources/related-resources.intl";

const locales: RelatedResourcesLocale[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];
for (const locale of locales) {
  test(`${locale}: moving relation selection to the server preserves article and video matches`, () => {
    const articles = getTechnicalArticlesPageData(locale).articles;
    const guides = getInstallationGuidePageData(locale).guides;
    const keys = [...new Set(articles.flatMap(article => article.relationKeys || []))];
    assert.ok(keys.length > 0);
    for (const key of keys) {
      const query = { relationKeys: [key] };
      const data = getRelatedResourcesData({ locale, sourceType: "product", ...query });
      const expected = getRelatedArticles(articles, query);
      assert.deepEqual(data.articles.map(article => article.id), expected.map(article => article.id));
      assert.deepEqual(data.videos.map(video => video.id), getRelatedVideos(guides, query).map(video => video.id));
      assert.deepEqual(data.products, []);
      data.articles.forEach((article, i) => {
        assert.deepEqual(Object.keys(article).sort(), ["coverImage", "date", "id", "slug", "summary", "title"]);
        assert.equal(article.title, expected[i].title);
        assert.equal(article.summary, expected[i].summary);
      });
    }
  });
  test(`${locale}: self exclusion and article opt-in remain intact`, () => {
    const article = getTechnicalArticlesPageData(locale).articles.find(item => item.relationKeys?.length);
    assert.ok(article);
    const props = { locale, sourceType: "article" as const, sourceId: article.id, sourceSlug: article.slug, relationKeys: article.relationKeys };
    assert.deepEqual(getRelatedResourcesData(props).articles, []);
    const related = getRelatedResourcesData({ ...props, includeRelatedArticles: true });
    assert.ok(related.articles.every(item => item.id !== article.id && item.slug !== article.slug));
    assert.ok(related.products.length <= 4);
    assert.ok(related.products.every(product => product.title && product.href));
  });
}
test("empty relations do not create unrelated cards", () => {
  const data = getRelatedResourcesData({ locale: "en", sourceType: "product" });
  assert.deepEqual([data.articles, data.products, data.videos], [[], [], []]);
});
