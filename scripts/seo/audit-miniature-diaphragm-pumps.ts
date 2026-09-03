import fs from "node:fs";
import path from "node:path";

import {
  DIAPHRAGM_PUMP_PUBLIC_LOCALES,
  DIAPHRAGM_PUMP_REFERENCE_ROUTES,
  DIAPHRAGM_PUMP_SERIES_SLUGS,
  DIAPHRAGM_PUMP_SUBCATEGORY_SLUGS,
  getDiaphragmPumpPath,
  getDiaphragmPumpRedirectPairs,
  type DiaphragmPumpPublicLocale,
} from "../../data/products/detail/diaphragm-pump-routes";
import {
  DIAPHRAGM_PUMP_CATEGORY_COPY,
  diaphragmPumpReferenceModels,
} from "../../data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpCopy } from "../../data/products/detail/diaphragm-pump-copy";
import { getDiaphragmPumpSeriesCopy } from "../../data/products/detail/diaphragm-pump-series-copy";
import { diaphragmPumpSelectionProducts } from "../../data/products/selection/diaphragm-pump-selection.generated";
import {
  getDiaphragmPumpCategoryIntro,
  getProductTypeIntroByIds,
} from "../../data/products/selection/product-type-intro";
import { siteSearchIndex } from "../../data/search/site-search-index.generated";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const siteOrigin = "https://www.foreachtek.com";
const errors: string[] = [];
const deletedDpgl800EpPublicPattern =
  /DPGL80024BS6EPPS|459039|DPGL800-24BS6-EP\/PS|dpgl800-24bs6-ep-ps|diaphragm-dpgl800-ep/i;

const privatePageTokens = [
  "modelConfigurations",
  "modelButtonText",
  "selectionHref",
  "modelSelectionHref",
  "configuratorHref",
  "data-diaphragm-ordering-information",
  'id="ordering-information"',
  "型号选择",
  "选择型号",
  "Select a Model",
  "Ordering Information",
  "Seleccionar modelo",
  "Sélectionner un modèle",
  "모델 선택",
  "Выбрать модель",
];

const commercialSchemaKeys = new Set([
  "offers",
  "price",
  "priceCurrency",
  "lowPrice",
  "highPrice",
  "availability",
]);

const fullOrderingCodePattern =
  /(?:DPL30H?|DPL60)-(?:12|24)(?:DB|BB|DS|BS)-(?:EP|FF)\/PS|DPGL800-24(?:BS6|BSC)-(?:EP|FF)\/PS/i;

const customProductCopy: Record<
  DiaphragmPumpPublicLocale,
  { notice: string; contact: string }
> = {
  zh: { notice: "该产品为定制品", contact: "联系我们" },
  en: { notice: "This product is custom-made", contact: "Contact Us" },
  es: { notice: "Este producto se fabrica a medida", contact: "Contáctenos" },
  fr: { notice: "Ce produit est fabriqué sur mesure", contact: "Nous contacter" },
  ko: { notice: "이 제품은 맞춤 제작 제품입니다", contact: "문의하기" },
  ru: { notice: "Этот продукт изготавливается на заказ", contact: "Связаться с нами" },
};

function fail(message: string) {
  errors.push(message);
}

function countMatches(value: string, pattern: RegExp) {
  return Array.from(value.matchAll(pattern)).length;
}

function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_match, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function visibleText(fragment: string) {
  return decodeHtml(
    fragment
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function outputFileForRoute(route: string) {
  return path.join(outputRoot, ...route.split("/").filter(Boolean), "index.html");
}

function readRoute(route: string) {
  const filePath = outputFileForRoute(route);

  if (!fs.existsSync(filePath)) {
    fail(`缺少静态 HTML：${route}`);
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

function getAttribute(tag: string, name: string) {
  return decodeHtml(
    tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "",
  );
}

function getH1(html: string) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? visibleText(match[1]) : "";
}

function parseJsonLd(html: string, route: string) {
  const documents: unknown[] = [];

  for (const match of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      documents.push(JSON.parse(decodeHtml(match[1])));
    } catch (error) {
      fail(`JSON-LD 无法解析：${route} (${String(error)})`);
    }
  }

  return documents;
}

function collectObjects(value: unknown, output: Record<string, unknown>[] = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectObjects(item, output);
    return output;
  }

  if (!value || typeof value !== "object") return output;

  const objectValue = value as Record<string, unknown>;
  output.push(objectValue);
  for (const child of Object.values(objectValue)) collectObjects(child, output);
  return output;
}

function assertOrderedText(text: string, expected: readonly string[], route: string) {
  let cursor = 0;

  for (const item of expected) {
    const next = text.indexOf(item, cursor);
    if (next < 0) {
      fail(`可见 Breadcrumb 缺少或顺序错误：${route} -> ${item}`);
      return;
    }
    cursor = next + item.length;
  }
}

function assertLiveDetailCopy(
  html: string,
  route: string,
  expectedCopy: Pick<
    ReturnType<typeof getDiaphragmPumpCopy>,
    "intro" | "applications" | "faqs"
  > | null,
  expectedFaqCount = 5,
) {
  if (!expectedCopy) {
    fail(`找不到详情文案：${route}`);
    return;
  }

  const text = visibleText(html);
  if (!text.includes(expectedCopy.intro)) {
    fail(`产品介绍未恢复：${route}`);
  }
  if (!text.includes(expectedCopy.applications)) {
    fail(`常见应用未恢复：${route}`);
  }
  if (expectedCopy.faqs.length !== expectedFaqCount) {
    fail(
      `FAQ 数据数量错误：${route} -> ${expectedCopy.faqs.length}，预期 ${expectedFaqCount}`,
    );
  }

  const jsonLdObjects = parseJsonLd(html, route).flatMap((document) =>
    collectObjects(document),
  );
  const faqPage = jsonLdObjects.find((object) => object["@type"] === "FAQPage");
  const mainEntity = Array.isArray(faqPage?.mainEntity)
    ? (faqPage.mainEntity as Record<string, unknown>[])
    : [];

  if (mainEntity.length !== expectedCopy.faqs.length) {
    fail(`FAQPage 数量错误：${route} -> ${mainEntity.length}`);
    return;
  }

  expectedCopy.faqs.forEach((faq, index) => {
    const question = mainEntity[index];
    const acceptedAnswer =
      question?.acceptedAnswer && typeof question.acceptedAnswer === "object"
        ? (question.acceptedAnswer as Record<string, unknown>)
        : {};
    if (
      question?.["@type"] !== "Question" ||
      question?.name !== faq.question ||
      acceptedAnswer["@type"] !== "Answer" ||
      acceptedAnswer.text !== faq.answer ||
      !text.includes(faq.question) ||
      !text.includes(faq.answer)
    ) {
      fail(`FAQ 内容或结构错误：${route} -> #${index + 1}`);
    }
  });
}

function assertCustomProductRow(
  html: string,
  route: string,
  locale: DiaphragmPumpPublicLocale,
  referenceModel?: string,
) {
  const modelRowCount = countMatches(html, /data-product-model-row="true"/g);
  if (modelRowCount !== 1) {
    fail(`定制品型号行数量错误：${route} -> ${modelRowCount}`);
    return;
  }

  const modelRowIndex = html.indexOf('data-product-model-row="true"');
  const actionGridIndex = html.indexOf('data-product-action-grid="true"', modelRowIndex);
  const modelRowWindow = html.slice(
    modelRowIndex,
    actionGridIndex >= 0 ? actionGridIndex : modelRowIndex + 4000,
  );
  const modelRowText = visibleText(modelRowWindow);
  const expected = customProductCopy[locale];
  if (
    !modelRowText.includes(expected.notice) ||
    !modelRowText.includes(expected.contact) ||
    !/<button\b/i.test(modelRowWindow) ||
    (referenceModel ? modelRowText.includes(referenceModel) : false)
  ) {
    fail(`定制品型号行内容错误：${route}`);
  }
}

const allChildSlugs = [
  ...DIAPHRAGM_PUMP_SUBCATEGORY_SLUGS,
  ...DIAPHRAGM_PUMP_SERIES_SLUGS,
  ...DIAPHRAGM_PUMP_REFERENCE_ROUTES.map((item) => item.slug),
];
const expectedRoutes = DIAPHRAGM_PUMP_PUBLIC_LOCALES.flatMap((locale) => [
  getDiaphragmPumpPath(locale),
  ...allChildSlugs.map((slug) => getDiaphragmPumpPath(locale, slug)),
]);

for (const route of expectedRoutes) readRoute(route);

for (const locale of DIAPHRAGM_PUMP_PUBLIC_LOCALES) {
  const copy = DIAPHRAGM_PUMP_CATEGORY_COPY[locale];
  const parentIntroHeading =
    getProductTypeIntroByIds("pumps", "diaphragm-pump", locale)?.title ||
    copy.parent;
  const categoryChecks = [
    { slug: "", h1: parentIntroHeading, cards: 7 },
    {
      slug: "liquid-diaphragm-pumps",
      h1:
        getDiaphragmPumpCategoryIntro("液体隔膜泵", locale)?.title ||
        copy.liquid,
      cards: 6,
    },
    {
      slug: "gas-liquid-diaphragm-pumps",
      h1:
        getDiaphragmPumpCategoryIntro("气液混合隔膜泵", locale)?.title ||
        copy.gasLiquid,
      cards: 1,
    },
  ];

  for (const check of categoryChecks) {
    const route = getDiaphragmPumpPath(locale, check.slug);
    const html = readRoute(route);
    if (!html) continue;

    if (getH1(html) !== check.h1) {
      fail(`分类 H1 不一致：${route} -> ${getH1(html)}`);
    }

    const cardCount = countMatches(html, /<article\b[^>]*class="product-card"/gi);
    if (cardCount !== check.cards) {
      fail(`分类卡片数量错误：${route} -> ${cardCount}，预期 ${check.cards}`);
    }
    for (const token of [
      "diaphragm-dpgl800-ep",
      "DPGL800-24BS6-EP/PS",
      "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump",
      "459039",
    ]) {
      if (html.includes(token)) {
        fail(`分类 HTML 仍暴露已删除的 DPGL800 EP 卡数据：${route} -> ${token}`);
      }
    }
    const scriptSources = Array.from(
      html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"/gi),
      (match) => match[1],
    );
    for (const scriptSource of scriptSources) {
      const scriptFile = path.join(
        outputRoot,
        scriptSource.replace(/^\/+/, "").split("/").join(path.sep),
      );
      if (
        fs.existsSync(scriptFile) &&
        fs.readFileSync(scriptFile, "utf8").includes("diaphragm-dpgl800-ep")
      ) {
        fail(`分类客户端 chunk 仍含已删除的 DPGL800 EP 卡对象：${route} -> ${scriptSource}`);
      }
    }
  }

  for (const reference of diaphragmPumpReferenceModels) {
    const route = getDiaphragmPumpPath(locale, reference.slug);
    const canonicalUrl = `${siteOrigin}${route}`;
    const html = readRoute(route);
    if (!html) continue;

    const h1 = getH1(html);
    if (h1 !== reference.localized[locale].h1) {
      fail(`Reference H1 不一致：${route} -> ${h1}`);
    }
    if (/\breference model\b/i.test(h1)) {
      fail(`H1 不应包含 Reference Model 标签：${route}`);
    }

    assertCustomProductRow(html, route, locale, reference.model);
    assertLiveDetailCopy(
      html,
      route,
      getDiaphragmPumpCopy({ slug: reference.slug }, locale),
    );

    for (const token of privatePageTokens) {
      if (html.includes(token)) fail(`公开 HTML 含私有型号字段：${route} -> ${token}`);
    }
    if (fullOrderingCodePattern.test(html)) {
      fail(`公开 HTML 含完整 Ordering Code：${route}`);
    }

    const primaryProductText = visibleText(
      html.replace(
        /<section\b[^>]*class="[^"]*RelatedResources-module[^"]*"[^>]*>[\s\S]*?<\/section>/gi,
        " ",
      ),
    );
    if (
      reference.model.startsWith("DPL30H") &&
      /hose barb|barbed connection|倒刺接口|倒刺端口|卡箍|锁紧结构|espiga fijada|raccord cannelé|바브 연결|클램프|штуцер с хомутом|фиксирующей конструкцией/i.test(
        primaryProductText,
      )
    ) {
      fail(`DPL30H 公开 HTML 含错误接口映射：${route}`);
    }

    const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0] || "";
    const ogTag = html.match(/<meta\b[^>]*property="og:url"[^>]*>/i)?.[0] || "";
    if (getAttribute(canonicalTag, "href") !== canonicalUrl) {
      fail(`canonical 错误：${route}`);
    }
    if (getAttribute(ogTag, "content") !== canonicalUrl) {
      fail(`og:url 错误：${route}`);
    }

    const expectedAlternates: Record<string, string> = {
      "zh-CN": `${siteOrigin}${getDiaphragmPumpPath("zh", reference.slug)}`,
      en: `${siteOrigin}${getDiaphragmPumpPath("en", reference.slug)}`,
      es: `${siteOrigin}${getDiaphragmPumpPath("es", reference.slug)}`,
      fr: `${siteOrigin}${getDiaphragmPumpPath("fr", reference.slug)}`,
      ko: `${siteOrigin}${getDiaphragmPumpPath("ko", reference.slug)}`,
      ru: `${siteOrigin}${getDiaphragmPumpPath("ru", reference.slug)}`,
      "x-default": `${siteOrigin}${getDiaphragmPumpPath("zh", reference.slug)}`,
    };
    const alternateTags = Array.from(
      html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi),
      (match) => match[0],
    );
    const alternateMap = Object.fromEntries(
      alternateTags.map((tag) => [
        getAttribute(tag, "hreflang"),
        getAttribute(tag, "href"),
      ]),
    );
    for (const [language, href] of Object.entries(expectedAlternates)) {
      if (alternateMap[language] !== href) {
        fail(`hreflang 错误：${route} -> ${language}`);
      }
    }

    const jsonLdObjects = parseJsonLd(html, route).flatMap((document) =>
      collectObjects(document),
    );
    for (const object of jsonLdObjects) {
      for (const key of Object.keys(object)) {
        if (commercialSchemaKeys.has(key)) {
          fail(`JSON-LD 含商业报价字段：${route} -> ${key}`);
        }
      }
      if (["Offer", "AggregateOffer", "OfferCatalog"].includes(String(object["@type"]))) {
        fail(`JSON-LD 含 Offer 类型：${route} -> ${String(object["@type"])}`);
      }
    }

    const productModel = jsonLdObjects.find(
      (object) => object["@type"] === "ProductModel",
    );
    if (!productModel || productModel.model !== reference.model) {
      fail(`ProductModel.model 错误：${route}`);
    }
    if (!productModel || productModel.url !== canonicalUrl) {
      fail(`ProductModel.url 错误：${route}`);
    }

    const breadcrumb = jsonLdObjects.find(
      (object) => object["@type"] === "BreadcrumbList",
    );
    const breadcrumbItems = Array.isArray(breadcrumb?.itemListElement)
      ? (breadcrumb.itemListElement as Record<string, unknown>[])
      : [];
    const expectedBreadcrumbLabels = [
      copy.home,
      copy.products,
      copy.parent,
      reference.model,
    ];
    if (
      breadcrumbItems.length !== 4 ||
      breadcrumbItems.some(
        (item, index) => item.name !== expectedBreadcrumbLabels[index],
      )
    ) {
      fail(`BreadcrumbList 层级或标签错误：${route}`);
    }
    if (breadcrumbItems.at(-1)?.item !== canonicalUrl) {
      fail(`BreadcrumbList 最后一层 URL 错误：${route}`);
    }

    const breadcrumbNav = Array.from(html.matchAll(/<nav\b[\s\S]*?<\/nav>/gi))
      .map((match) => match[0])
      .find(
        (nav) =>
          nav.includes(`>${reference.model}</strong>`) &&
          nav.includes(getDiaphragmPumpPath(locale)),
      );
    if (!breadcrumbNav) {
      fail(`找不到可见 Breadcrumb：${route}`);
    } else {
      assertOrderedText(
        visibleText(breadcrumbNav),
        expectedBreadcrumbLabels,
        route,
      );
    }
  }

  for (const seriesSlug of DIAPHRAGM_PUMP_SERIES_SLUGS) {
    const route = getDiaphragmPumpPath(locale, seriesSlug);
    const html = readRoute(route);
    const seriesReference = diaphragmPumpReferenceModels.find(
      (reference) => reference.sourceSeriesSlug === seriesSlug,
    );
    const neutralSeriesCopy = getDiaphragmPumpSeriesCopy(seriesSlug, locale);
    assertCustomProductRow(html, route, locale);
    assertLiveDetailCopy(
      html,
      route,
      neutralSeriesCopy ||
        getDiaphragmPumpCopy({ slug: seriesReference?.slug }, locale),
      neutralSeriesCopy ? 2 : 5,
    );
    for (const token of privatePageTokens) {
      if (html.includes(token)) fail(`Series HTML 含私有型号字段：${route} -> ${token}`);
    }
    if (fullOrderingCodePattern.test(html)) {
      fail(`Series HTML 含完整 Ordering Code：${route}`);
    }
  }
}

const legacyOutputRoots = DIAPHRAGM_PUMP_PUBLIC_LOCALES.map((locale) =>
  path.dirname(
    outputFileForRoute(
      getDiaphragmPumpPath(locale, "placeholder", { legacyParent: true }),
    ),
  ),
);
for (const legacyRoot of legacyOutputRoots) {
  const parentRoot = path.dirname(legacyRoot);
  if (fs.existsSync(parentRoot)) {
    fail(`旧父路径仍生成静态目录：${path.relative(outputRoot, parentRoot)}`);
  }
}

const sitemap = fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
const sitemapUrls = Array.from(
  sitemap.matchAll(/<loc>([^<]+)<\/loc>/g),
  (match) => decodeHtml(match[1]),
);
const finalSitemapUrls = sitemapUrls.filter((url) =>
  url.includes("/products/pumps/miniature-diaphragm-pumps/"),
);
const legacySitemapUrls = sitemapUrls.filter((url) =>
  /\/products\/pumps\/diaphragm-pumps(?:\/|$)/.test(url),
);
if (finalSitemapUrls.length !== 84) {
  fail(`Sitemap 最终隔膜泵 URL 数量错误：${finalSitemapUrls.length}`);
}
if (legacySitemapUrls.length !== 0) {
  fail(`Sitemap 仍含旧父路径：${legacySitemapUrls.length}`);
}
for (const route of expectedRoutes) {
  if (!sitemapUrls.includes(`${siteOrigin}${route}`)) {
    fail(`Sitemap 缺少最终 URL：${route}`);
  }
}

const redirectLines = fs
  .readFileSync(path.join(projectRoot, "public", "_redirects"), "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
const redirectMap = new Map(
  redirectLines.map((line) => {
    const [source, destination, status] = line.split(/\s+/);
    return [source, { destination, status }];
  }),
);
const expectedRedirects = getDiaphragmPumpRedirectPairs({
  includeDefensiveReferencePaths: true,
});
if (expectedRedirects.length !== 144) {
  fail(`中央 redirect pair 数量错误：${expectedRedirects.length}`);
}
for (const pair of expectedRedirects) {
  const actual = redirectMap.get(pair.source);
  if (!actual || actual.destination !== pair.destination || actual.status !== "301") {
    fail(`缺少或错误的 301：${pair.source} -> ${pair.destination}`);
  }
  if (redirectMap.has(pair.destination)) {
    fail(`发现 redirect chain：${pair.source} -> ${pair.destination}`);
  }
}

const searchLocaleFiles: Record<DiaphragmPumpPublicLocale, string> = {
  zh: "zh-CN",
  en: "en",
  es: "es",
  fr: "fr",
  ko: "ko",
  ru: "ru",
};
for (const locale of DIAPHRAGM_PUMP_PUBLIC_LOCALES) {
  const fileLocale = searchLocaleFiles[locale];
  const entries = JSON.parse(
    fs.readFileSync(
      path.join(
        projectRoot,
        "public",
        "search-data",
        `global-search-index.${fileLocale}.v3.json`,
      ),
      "utf8",
    ),
  ) as Array<{ h?: string; t?: string; x?: string; k?: string }>;
  const referenceEntries = entries.filter((entry) =>
    String(entry.h || "").includes("/products/pumps/miniature-diaphragm-pumps/"),
  );
  const expectedModels = diaphragmPumpReferenceModels.map((item) => item.model).sort();
  const actualModels = referenceEntries.map((entry) => entry.t || "").sort();
  if (
    referenceEntries.length !== 7 ||
    JSON.stringify(actualModels) !== JSON.stringify(expectedModels)
  ) {
    fail(`全站搜索隔膜泵身份错误：${locale} -> ${actualModels.join(", ")}`);
  }
  if (
    entries.some((entry) =>
      /\/products\/pumps\/diaphragm-pumps(?:\/|$)/.test(String(entry.h || "")),
    )
  ) {
    fail(`全站搜索仍含旧父路径：${locale}`);
  }
  if (
    entries.some((entry) =>
      deletedDpgl800EpPublicPattern.test(
        `${entry.x || ""}|${entry.k || ""}`,
      ),
    )
  ) {
    fail(`全站搜索仍暴露已删除的 DPGL800 EP 卡数据：${locale}`);
  }
}

const siteSearchDiaphragmItems = siteSearchIndex.filter((entry) =>
  /\/products\/pumps\/(?:miniature-)?diaphragm-pumps(?:\/|$)/i.test(
    String(entry.href || ""),
  ),
);
const expectedSearchModels = diaphragmPumpReferenceModels
  .map((item) => item.model)
  .sort();
const actualSiteSearchModels = siteSearchDiaphragmItems
  .map((entry) => entry.title)
  .sort();
if (
  siteSearchDiaphragmItems.length !== 7 ||
  JSON.stringify(actualSiteSearchModels) !== JSON.stringify(expectedSearchModels)
) {
  fail(`客户端搜索源的隔膜泵身份错误：${actualSiteSearchModels.join(", ")}`);
}
if (
  siteSearchDiaphragmItems.some((entry) =>
    deletedDpgl800EpPublicPattern.test(JSON.stringify(entry)),
  )
) {
  fail("客户端搜索源仍暴露已删除的 DPGL800 EP 卡数据");
}

const legacySearchEntries = JSON.parse(
  fs.readFileSync(
    path.join(
      projectRoot,
      "public",
      "search-data",
      "global-search-index.v2.json",
    ),
    "utf8",
  ),
) as Array<{ x?: string; k?: string }>;
if (
  legacySearchEntries.some((entry) =>
    deletedDpgl800EpPublicPattern.test(`${entry.x || ""}|${entry.k || ""}`),
  )
) {
  fail("中文 legacy 搜索索引仍暴露已删除的 DPGL800 EP 卡数据");
}

const liquidCards = diaphragmPumpSelectionProducts.filter(
  (item) => item.filter01 === "液体隔膜泵",
).length;
const gasLiquidCards = diaphragmPumpSelectionProducts.filter(
  (item) => item.filter01 === "气液混合隔膜泵",
).length;
const gasCards = diaphragmPumpSelectionProducts.filter(
  (item) => item.filter01 === "气体隔膜泵",
).length;
if (liquidCards !== 6 || gasLiquidCards !== 1 || gasCards !== 0) {
  fail(
    `Selection data 数量错误：Liquid=${liquidCards}, Gas-Liquid=${gasLiquidCards}, Gas=${gasCards}`,
  );
}
if (
  diaphragmPumpSelectionProducts.some(
    (item) => item.productId === "diaphragm-dpgl800-ep",
  )
) {
  fail("Selection data 仍含已删除的 diaphragm-dpgl800-ep 公开记录");
}
if (
  diaphragmPumpSelectionProducts.filter(
    (item) => item.productId === "diaphragm-dpgl800-ff",
  ).length !== 1
) {
  fail("Selection data 的 diaphragm-dpgl800-ff 记录数量不是 1");
}

const generatedDetails = JSON.parse(
  fs.readFileSync(
    path.join(
      projectRoot,
      "data",
      "products",
      "generated",
      "pumps",
      "diaphragm-pumps",
      "detail",
      "index.json",
    ),
    "utf8",
  ),
) as Array<Record<string, unknown>>;
if (
  generatedDetails.some(
    (detail) =>
      String(detail.path || "").startsWith("/products/pumps/diaphragm-pumps") ||
      String((detail.seo as Record<string, unknown> | undefined)?.path || "").startsWith(
        "/products/pumps/diaphragm-pumps",
      ),
  )
) {
  fail("generated detail JSON 仍含旧网页父路径");
}
const generatedDpl30hText = JSON.stringify(
  generatedDetails.filter((detail) => String(detail.seriesId).toUpperCase() === "DPL30H"),
);
if (/倒刺接口|倒刺端口|卡箍|锁紧结构/.test(generatedDpl30hText)) {
  fail("generated DPL30H JSON 仍含错误接口映射");
}
if (!generatedDpl30hText.includes("卡套接头，连接 6×4 mm（外径×内径）的硬管")) {
  fail("generated DPL30H JSON 缺少正式卡套接头与 6×4 mm 硬管说明");
}

const llmsText = fs.readFileSync(path.join(projectRoot, "public", "llms.txt"), "utf8");
const llmsLegacyRoutes = countMatches(
  llmsText,
  /\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/diaphragm-pumps(?:\/|\b)/g,
);
const llmsReferenceRoutes = countMatches(
  llmsText,
  /\/(?:en\/|es\/|fr\/|ko\/|ru\/)?products\/pumps\/miniature-diaphragm-pumps\/(?:dpl30-(?:db|bb)|dpl60-(?:db|bb)|dpl30h-(?:ds|bs)|dpgl800-bs)\//g,
);
if (llmsLegacyRoutes !== 0 || llmsReferenceRoutes !== 42) {
  fail(`llms.txt 路由数量错误：legacy=${llmsLegacyRoutes}, reference=${llmsReferenceRoutes}`);
}

const result = {
  locales: DIAPHRAGM_PUMP_PUBLIC_LOCALES.length,
  finalRoutes: expectedRoutes.length,
  categoryRoutes: DIAPHRAGM_PUMP_PUBLIC_LOCALES.length * 4,
  seriesHtml: DIAPHRAGM_PUMP_PUBLIC_LOCALES.length * DIAPHRAGM_PUMP_SERIES_SLUGS.length,
  referenceHtml:
    DIAPHRAGM_PUMP_PUBLIC_LOCALES.length * diaphragmPumpReferenceModels.length,
  redirects: expectedRedirects.length,
  sitemapFinalRoutes: finalSitemapUrls.length,
  searchReferenceEntriesPerLocale: 7,
  cards: { liquid: liquidCards, gasLiquid: gasLiquidCards, gas: gasCards },
  errors,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) process.exit(1);
