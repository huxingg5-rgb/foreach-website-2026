/* =========================================================
   build-pump-series-data.js
   恒永达官网｜泵系列 xlsx 数据源解析脚本

   说明：
   1. 当前只服务于泵系列产品，不强制扩展到接头、阀、传感器等其他产品线
   2. xlsx 负责维护正式文案，脚本只负责解析，不自动创作文案
   3. H1 来自 05_SEO与HTML标记
   4. H2 / H3 来自 06_页面模块与标题
   5. 选型卡片文案来自 07_选型卡片
   6. 图片 caption 来自 10_图片资源
   7. 脚注正文来自全站脚注库，泵系列表格只写 footnoteIds 引用
   8. 生成文件放在 data/products/generated/pumps，不要手动修改 generated 文件

   运行：
   npm run build:pump-series-data
========================================================= */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const ROOT_DIR = process.cwd();

/* =========================================================
   1. 数据源路径

   注意：
   1. 正式泵系列表推荐放在：
      data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx

   2. 如果你现在暂时只有之前的柱塞泵模板，脚本也会尝试读取旧路径。
========================================================= */
const PUMP_SOURCE_CANDIDATES = [
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx",
  "data-source/product-center/pumps/plunger-pump/FOREACH_柱塞泵_自动解析数据源模板_v4_脚注独立引用.xlsx",
];

const FOOTNOTE_SOURCE_CANDIDATES = [
  "data-source/global/FOREACH_全站脚注库.xlsx",
  "data-source/global/FOREACH_全站脚注库_v1.xlsx",
];

const GENERATED_DIR = path.join(ROOT_DIR, "data/products/generated/pumps");

/* =========================================================
   2. 通用工具函数
========================================================= */

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function findExistingPath(candidates) {
  for (const item of candidates) {
    const fullPath = path.join(ROOT_DIR, item);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return "";
}

function toBoolean(value) {
  return ["yes", "true", "1", "是", "启用", "显示"].includes(
    String(value || "").trim().toLowerCase()
  );
}

function toNumber(value, fallback = 0) {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function splitPipe(value) {
  return cleanText(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitChineseSemicolon(value) {
  return cleanText(value)
    .split("；")
    .map((item) => item.trim())
    .filter(Boolean);
}


/**
 * 通用列表拆分。
 * 支持 |、中文分号、英文分号、顿号、逗号。
 */
function splitList(value) {
  return cleanText(value)
    .split(/[|；;、，,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * 同一个 productId 可能同时存在 zh / en 两行。
 * 不能只用 productId 建 Map，否则后面的英文行会覆盖中文行。
 */
function pickLocaleRow(rows, productId, locale) {
  const id = cleanText(productId);

  const exact = rows.find((row) => {
    return cleanText(row.productId) === id && cleanText(row.locale) === locale;
  });

  if (exact) return exact;

  const noLocale = rows.find((row) => {
    return cleanText(row.productId) === id && !cleanText(row.locale);
  });

  if (noLocale) return noLocale;

  return rows.find((row) => cleanText(row.productId) === id) || {};
}

/**
 * 从 08_详情页正文 中提取 commonApplications。
 * 优先读取明确字段；如果没有 commonApplications，就从“应用 / 场景 / 用途 / 任务 / 液路”等字段提取。
 */
function getBodyApplications(body, locale) {
  const explicitKeys = [
    "commonApplications",
    "applications",
    "application",
    "applicationScenarios",
    "applicationTasks",
    "fluidicApplications",
    "fluidicTasks",
    "typicalApplications",
    "useCases",
    "liquidHandlingTasks"
  ];

  for (const key of explicitKeys) {
    const value = getLocalized(body, key, locale);
    const list = splitList(value);
    if (list.length > 0) return list;
  }

  const applicationKeyPatterns = [
    /commonapplications/i,
    /applications?/i,
    /usecases?/i,
    /fluidic/i,
    /liquid/i,
    /应用/,
    /场景/,
    /用途/,
    /任务/,
    /液路/,
    /适用/
  ];

  const blockedKeyPatterns = [
    /productid/i,
    /model/i,
    /locale/i,
    /description/i,
    /advantages/i,
    /notice/i,
    /note/i,
    /enabled/i,
    /visible/i,
    /sort/i,
    /备注/,
    /说明/,
    /正文/,
    /优势/,
    /提示/
  ];

  for (const [key, value] of Object.entries(body || {})) {
    const keyText = cleanText(key);
    if (!keyText) continue;

    const blocked = blockedKeyPatterns.some((pattern) => pattern.test(keyText));
    if (blocked) continue;

    const matched = applicationKeyPatterns.some((pattern) => pattern.test(keyText));
    if (!matched) continue;

    const list = splitList(value);
    if (list.length > 0) return list;
  }

  return [];
}

function readWorkbook(filePath) {
  return XLSX.readFile(filePath);
}

function readSheet(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    return [];
  }

  return XLSX.utils
    .sheet_to_json(sheet, {
      defval: "",
      raw: false,
    })
    .filter((row) => {
      return Object.values(row).some((value) => cleanText(value));
    });
}

/**
 * 读取多个候选 sheet。
 * 作用：
 * 1. 支持新表名：01_泵系列页面规则
 * 2. 兼容旧表名：01_产品大类规则
 */
function readFirstExistingSheet(workbook, sheetNames) {
  for (const sheetName of sheetNames) {
    const rows = readSheet(workbook, sheetName);
    if (rows.length > 0) {
      return {
        sheetName,
        rows,
      };
    }
  }

  return {
    sheetName: "",
    rows: [],
  };
}

function groupBy(rows, key) {
  const map = new Map();

  for (const row of rows) {
    const value = cleanText(row[key]);
    if (!value) continue;

    if (!map.has(value)) {
      map.set(value, []);
    }

    map.get(value).push(row);
  }

  return map;
}

function indexBy(rows, key) {
  const map = new Map();

  for (const row of rows) {
    const value = cleanText(row[key]);
    if (!value) continue;
    map.set(value, row);
  }

  return map;
}

/**
 * 多语言字段读取。
 * 支持两种表格写法：
 *
 * 写法 A：
 * titleZh / titleEn
 *
 * 写法 B：
 * locale = zh / en
 * title = ...
 */
function getLocalized(row, baseKey, locale) {
  if (!row) return "";

  const suffix = locale === "zh" ? "Zh" : "En";

  return (
    cleanText(row[`${baseKey}${suffix}`]) ||
    cleanText(row[baseKey]) ||
    ""
  );
}

function getLocaleRows(rows, productId, locale) {
  return rows.filter((row) => {
    const sameProduct = cleanText(row.productId) === productId;
    const rowLocale = cleanText(row.locale);

    return sameProduct && (!rowLocale || rowLocale === locale);
  });
}

/**
 * 解析脚注 ID。
 * 泵系列表格只写 footnoteIds，正文从全站脚注库读取。
 */
function resolveFootnotes(footnoteIds, footnoteMap) {
  return splitPipe(footnoteIds)
    .map((id) => footnoteMap.get(id))
    .filter(Boolean)
    .map((item) => ({
      footnoteId: cleanText(item.footnoteId),
      scope: cleanText(item.scope),
      module: cleanText(item.module),
      noteType: cleanText(item.noteType),
      noteZh: cleanText(item.noteZh),
      noteEn: cleanText(item.noteEn),
      renderPosition: cleanText(item.renderPosition),
      displayStyle: cleanText(item.displayStyle),
      sort: toNumber(item.sort),
    }))
    .sort((a, b) => a.sort - b.sort);
}

function writeGeneratedTs(fileName, exportName, data) {
  const filePath = path.join(GENERATED_DIR, fileName);

  const content = `/* =========================================================
   ${fileName}
   恒永达官网｜泵系列自动生成数据

   注意：
   1. 本文件由 scripts/products/build-pump-series-data.js 自动生成
   2. 不要手动修改本文件
   3. 如需修改内容，请修改 xlsx 数据源后重新运行：
      npm run build:pump-series-data
========================================================= */

export const ${exportName} = ${JSON.stringify(data, null, 2)} as const;
`;

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ 已生成：${filePath}`);
}

function writeJson(fileName, data) {
  const filePath = path.join(GENERATED_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✅ 已生成：${filePath}`);
}

/* =========================================================
   3. 主解析流程
========================================================= */

function main() {
  ensureDir(GENERATED_DIR);

  const pumpXlsxPath = findExistingPath(PUMP_SOURCE_CANDIDATES);
  const footnoteXlsxPath = findExistingPath(FOOTNOTE_SOURCE_CANDIDATES);

  if (!pumpXlsxPath) {
    throw new Error(
      [
        "未找到泵系列产品数据源。",
        "请把 xlsx 放到以下任一路径：",
        ...PUMP_SOURCE_CANDIDATES.map((item) => `- ${item}`),
      ].join("\n")
    );
  }

  if (!footnoteXlsxPath) {
    throw new Error(
      [
        "未找到全站脚注库。",
        "请把 xlsx 放到以下任一路径：",
        ...FOOTNOTE_SOURCE_CANDIDATES.map((item) => `- ${item}`),
      ].join("\n")
    );
  }

  console.log(`📘 泵系列数据源：${pumpXlsxPath}`);
  console.log(`📗 全站脚注库：${footnoteXlsxPath}`);

  const pumpWorkbook = readWorkbook(pumpXlsxPath);
  const footnoteWorkbook = readWorkbook(footnoteXlsxPath);

  const footnoteSheet = readFirstExistingSheet(footnoteWorkbook, [
    "01_脚注库",
    "脚注库",
  ]);

  const footnoteRows = footnoteSheet.rows.filter((row) => {
    return !cleanText(row.enabled) || toBoolean(row.enabled);
  });

  const footnoteMap = indexBy(footnoteRows, "footnoteId");

  const ruleSheet = readFirstExistingSheet(pumpWorkbook, [
    "01_泵系列页面规则",
    "01_产品大类规则",
  ]);

  const productSheet = readFirstExistingSheet(pumpWorkbook, [
    "02_泵产品索引",
    "02_产品索引",
  ]);

  const routeSheet = readFirstExistingSheet(pumpWorkbook, [
    "03_路由与页面映射",
  ]);

  const heroSheet = readFirstExistingSheet(pumpWorkbook, [
    "04_详情页首屏",
  ]);

  const seoSheet = readFirstExistingSheet(pumpWorkbook, [
    "05_SEO与HTML标记",
  ]);

  const sectionSheet = readFirstExistingSheet(pumpWorkbook, [
    "06_页面模块与标题",
  ]);

  const cardSheet = readFirstExistingSheet(pumpWorkbook, [
    "07_选型卡片",
    "06_选型卡片",
  ]);

  const bodySheet = readFirstExistingSheet(pumpWorkbook, [
    "08_详情页正文",
    "07_详情页正文",
    "06_详情页正文",
  ]);

  const parameterSheet = readFirstExistingSheet(pumpWorkbook, [
    "09_详情页参数",
    "08_详情页参数",
    "07_详情页参数",
  ]);

  const imageSheet = readFirstExistingSheet(pumpWorkbook, [
    "10_图片资源",
    "09_图片资源",
    "08_图片资源",
  ]);

  const resourceSheet = readFirstExistingSheet(pumpWorkbook, [
    "11_资料资源",
    "10_资料资源",
    "09_资料资源",
  ]);

  const faqSheet = readFirstExistingSheet(pumpWorkbook, [
    "12_FAQ",
    "11_FAQ",
    "10_FAQ",
  ]);

  const selectorSheet = readFirstExistingSheet(pumpWorkbook, [
    "13_选型入口划分",
    "12_选型入口划分",
    "11_选型入口划分",
  ]);

  const footnoteRefSheet = readFirstExistingSheet(pumpWorkbook, [
    "14_脚注引用映射",
    "13_脚注引用映射",
    "12_脚注引用映射",
  ]);

  const ruleRows = ruleSheet.rows;
  const productRows = productSheet.rows.filter((row) => {
    return (!cleanText(row.enabled) || toBoolean(row.enabled)) &&
      (!cleanText(row.showInFrontend) || toBoolean(row.showInFrontend));
  });

  const routeRows = routeSheet.rows.filter((row) => {
    return !cleanText(row.routeEnabled) || toBoolean(row.routeEnabled);
  });

  const heroRows = heroSheet.rows;
  const seoRows = seoSheet.rows;
  const sectionRows = sectionSheet.rows.filter((row) => {
    return !cleanText(row.enabled) || toBoolean(row.enabled);
  });
  const cardRows = cardSheet.rows.filter((row) => {
    return !cleanText(row.showInSelection) || toBoolean(row.showInSelection);
  });
  const bodyRows = bodySheet.rows;
  const parameterRows = parameterSheet.rows.filter((row) => {
    return !cleanText(row.visible) || toBoolean(row.visible);
  });
  const imageRows = imageSheet.rows;
  const resourceRows = resourceSheet.rows;
  const faqRows = faqSheet.rows.filter((row) => {
    return !cleanText(row.enabled) || toBoolean(row.enabled);
  });
  const selectorRows = selectorSheet.rows.filter((row) => {
    return !cleanText(row.enabled) || toBoolean(row.enabled);
  });
  const footnoteRefRows = footnoteRefSheet.rows.filter((row) => {
    return !cleanText(row.enabled) || toBoolean(row.enabled);
  });

  const ruleMap = new Map();
  for (const row of ruleRows) {
    const key = cleanText(row.pumpTypeSlug || row.productTypeSlug);
    if (key) ruleMap.set(key, row);
  }

  const routeMap = indexBy(routeRows, "productId");
  const heroMap = indexBy(heroRows, "productId");
  const seoByProduct = groupBy(seoRows, "productId");
  const bodyMap = indexBy(bodyRows, "productId");
  const resourceMap = indexBy(resourceRows, "productId");

  const selectorMap = new Map();
  for (const row of selectorRows) {
    const key = cleanText(row.pumpTypeSlug || row.productTypeSlug);
    if (key) selectorMap.set(key, row);
  }

  const warnings = [];

  function buildLocaleContent(product, locale) {
    const productId = cleanText(product.productId);
    const pumpTypeSlug = cleanText(product.pumpTypeSlug || product.productTypeSlug);
    const rule = ruleMap.get(pumpTypeSlug) || {};
    const route = routeMap.get(productId) || {};
    const hero = pickLocaleRow(heroRows, productId, locale);
    const seoCandidateRows = getLocaleRows(seoRows, productId, locale);
    const seo = seoCandidateRows[0] || (seoByProduct.get(productId) || [])[0] || {};
    const body = pickLocaleRow(bodyRows, productId, locale);
    const resource = resourceMap.get(productId) || {};
    const selector = selectorMap.get(pumpTypeSlug) || {};

    const h1 = getLocalized(seo, "h1", locale) || getLocalized(hero, "h1", locale);

    if (!h1) {
      warnings.push({
        level: "warning",
        productId,
        locale,
        message: "缺少 H1，请在 05_SEO与HTML标记 中维护，不要由脚本自动生成。",
      });
    }

    const sections = getLocaleRows(sectionRows, productId, locale)
      .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
      .map((row) => {
        const headingText = cleanText(row.headingText) || getLocalized(row, "headingText", locale);

        if (!headingText) {
          warnings.push({
            level: "warning",
            productId,
            locale,
            sectionKey: cleanText(row.sectionKey),
            message: "页面模块缺少 headingText，请在 06_页面模块与标题 中维护。",
          });
        }

        return {
          sectionKey: cleanText(row.sectionKey),
          headingLevel: cleanText(row.headingLevel || "h2"),
          headingText,
          leadText: cleanText(row.leadText) || getLocalized(row, "leadText", locale),
          renderComponent: cleanText(row.renderComponent),
          sort: toNumber(row.sort),
        };
      });

    const parameters = parameterRows
      .filter((row) => cleanText(row.productId) === productId)
      .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
      .map((row) => ({
        groupName: getLocalized(row, "groupName", locale),
        paramName: getLocalized(row, "paramName", locale),
        paramValue: getLocalized(row, "paramValue", locale),
        unit: cleanText(row.unit),
        sort: toNumber(row.sort),
        footnotes: resolveFootnotes(row.parameterFootnoteIds, footnoteMap),
      }));

    const images = imageRows
      .filter((row) => cleanText(row.productId) === productId)
      .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
      .map((row) => {
        const paths = splitChineseSemicolon(row.imagePaths);
        const altZh = splitChineseSemicolon(row.imageAltZh);
        const altEn = splitChineseSemicolon(row.imageAltEn);
        const captionZh = splitChineseSemicolon(row.imageCaptionZh);
        const captionEn = splitChineseSemicolon(row.imageCaptionEn);

        const fallbackImage =
          cleanText(row.fallbackImage) ||
          "/images/products/common/product-placeholder.webp";

        const finalPaths = paths.length > 0 ? paths : [fallbackImage];

        return {
          imageUsage: cleanText(row.imageUsage),
          showCaption: toBoolean(row.showCaption),
          fallbackImage,
          images: finalPaths.map((src, index) => ({
            src,
            alt: locale === "zh"
              ? altZh[index] || altZh[0] || "产品图片"
              : altEn[index] || altEn[0] || "Product image",
            caption: locale === "zh"
              ? captionZh[index] || captionZh[0] || ""
              : captionEn[index] || captionEn[0] || "",
            isFallback: paths.length === 0,
          })),
          footnotes: resolveFootnotes(row.imageFootnoteIds, footnoteMap),
        };
      });

    const faqs = faqRows
      .filter((row) => {
        // A product-scoped FAQ must not fall through to its broader pump type.
        if (cleanText(row.scope).toLowerCase() === "product") {
          return cleanText(row.productId) === productId &&
            (!cleanText(row.locale) || cleanText(row.locale) === locale);
        }
        return cleanText(row.productId) === productId ||
          cleanText(row.scope) === "global" ||
          cleanText(row.pumpTypeSlug) === pumpTypeSlug;
      })
      .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
      .map((row) => ({
        faqId: cleanText(row.faqId),
        question: getLocalized(row, "question", locale),
        answer: getLocalized(row, "answer", locale),
        sort: toNumber(row.sort),
      }));

    const footnoteRefs = footnoteRefRows
      .filter((row) => cleanText(row.productId) === productId)
      .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
      .map((row) => ({
        targetBlock: cleanText(row.targetBlock),
        renderPosition: cleanText(row.renderPosition),
        footnotes: resolveFootnotes(row.footnoteIds, footnoteMap),
      }));

    return {
      locale,
      title: getLocalized(hero, "title", locale),
      h1,
      seo: {
        titleTag: getLocalized(seo, "titleTag", locale),
        metaDescription: getLocalized(seo, "metaDescription", locale),
        canonicalPath: cleanText(seo.canonicalPath || route.canonicalPath),
        robots: cleanText(seo.robots || "index,follow"),
        ogTitle: getLocalized(seo, "ogTitle", locale),
        ogDescription: getLocalized(seo, "ogDescription", locale),
      },
      hero: {
        detailMode: cleanText(hero.detailMode || rule.detailMode),
        showModel: toBoolean(hero.showModel || rule.showModelDefault),
        displayModel: cleanText(hero.displayModel || product.internalModelRef),
        customNotice: getLocalized(hero, "customNotice", locale) || getLocalized(rule, "defaultNotice", locale),
        primaryButtonText: getLocalized(hero, "primaryButton", locale) || getLocalized(rule, "primaryButton", locale),
        primaryButtonHref: cleanText(hero.primaryButtonHref || rule.primaryButtonHref),
        secondaryButtonText: getLocalized(hero, "secondaryButton", locale) || getLocalized(rule, "secondaryButton", locale),
        secondaryButtonHref: cleanText(hero.secondaryButtonHref || rule.secondaryButtonHref),
        showAddToList: toBoolean(hero.showAddToList),
        showModelFilter: toBoolean(hero.showModelFilter),
      },
      body: {
        description: getLocalized(body, "description", locale),
        advantages: splitList(getLocalized(body, "advantages", locale)),
        commonApplications: getBodyApplications(body, locale),
      },
      sections,
      parameters,
      images,
      resources: {
        drawing2dUrl: cleanText(resource.drawing2dUrl),
        model3dUrl: cleanText(resource.model3dUrl),
        datasheetUrl: cleanText(resource.datasheetUrl),
        manualUrl: cleanText(resource.manualUrl),
        showDrawing: toBoolean(resource.showDrawing),
        show3D: toBoolean(resource.show3D),
        showDatasheet: toBoolean(resource.showDatasheet),
        showManual: toBoolean(resource.showManual),
        footnotes: resolveFootnotes(resource.resourceFootnoteIds, footnoteMap),
      },
      faqs,
      footnoteRefs,
      selector: {
        mode: cleanText(selector.selectorMode || rule.selectorMode),
        enabled: toBoolean(selector.enabled || rule.showSelectorEntry),
        title: getLocalized(selector, "selectorTitle", locale),
        description: getLocalized(selector, "selectorDescription", locale),
        entryButton: getLocalized(selector, "entryButton", locale),
        entryHref: cleanText(selector.entryHref),
      },
    };
  }

  const routes = productRows.map((product) => {
    const productId = cleanText(product.productId);
    const route = routeMap.get(productId) || {};
    const slug = cleanText(product.slug);
    const routeSlug = cleanText(product.routeSlug || route.routeSlug || slug);

    return {
      productId,
      slug,
      routeSlug,
      pumpTypeSlug: cleanText(product.pumpTypeSlug || product.productTypeSlug),
      seriesSlug: cleanText(product.seriesSlug),
      canonicalPath:
        cleanText(route.canonicalPath) ||
        `/products/pumps/${cleanText(product.pumpTypeSlug || product.productTypeSlug) === "plunger-pumps" ? "piston-pump" : cleanText(product.pumpTypeSlug || product.productTypeSlug)}/${routeSlug}`,
      detailHref:
        cleanText(route.detailHref) ||
        `/products/pumps/${cleanText(product.pumpTypeSlug || product.productTypeSlug) === "plunger-pumps" ? "piston-pump" : cleanText(product.pumpTypeSlug || product.productTypeSlug)}/${routeSlug}`,
      legacyRedirectFrom: cleanText(route.legacyRedirectFrom),
      trailingSlashPolicy: cleanText(route.trailingSlashPolicy || "no_trailing_slash"),
    };
  });

  const details = productRows.map((product) => {
    const productId = cleanText(product.productId);

    return {
      productId,
      slug: cleanText(product.slug),
      routeSlug: cleanText(product.routeSlug || product.slug),
      categorySlug: cleanText(product.categorySlug || "pumps"),
      pumpTypeSlug: cleanText(product.pumpTypeSlug || product.productTypeSlug),
      seriesSlug: cleanText(product.seriesSlug),
      seriesCode: cleanText(product.seriesCode),
      internalModelRef: cleanText(product.internalModelRef),
      capacity: cleanText(product.capacity),
      material: cleanText(product.material),
      route: routes.find((item) => item.productId === productId),
      content: {
        zh: buildLocaleContent(product, "zh"),
        en: buildLocaleContent(product, "en"),
      },
    };
  });

  const selectionCards = cardRows
    .sort((a, b) => toNumber(a.sort) - toNumber(b.sort))
    .map((row) => ({
      productId: cleanText(row.productId),
      pumpTypeSlug: cleanText(row.pumpTypeSlug || row.productTypeSlug),
      seriesSlug: cleanText(row.seriesSlug),
      detailHref: cleanText(row.detailHref),
      cardImage: cleanText(row.cardImage),
      badges: splitPipe(row.cardBadges),
      sort: toNumber(row.sort),
      content: {
        zh: {
          title: getLocalized(row, "cardTitle", "zh"),
          subtitle: getLocalized(row, "cardSubtitle", "zh"),
          description: getLocalized(row, "cardDescription", "zh"),
          specs: splitPipe(getLocalized(row, "cardSpecs", "zh")),
        },
        en: {
          title: getLocalized(row, "cardTitle", "en"),
          subtitle: getLocalized(row, "cardSubtitle", "en"),
          description: getLocalized(row, "cardDescription", "en"),
          specs: splitPipe(getLocalized(row, "cardSpecs", "en")),
        },
      },
    }));

  writeGeneratedTs("pump-series.routes.generated.ts", "pumpSeriesRoutes", routes);
  writeGeneratedTs("pump-series.detail.generated.ts", "pumpSeriesDetailRecords", details);
  writeGeneratedTs("pump-series.selection.generated.ts", "pumpSeriesSelectionCards", selectionCards);
  writeGeneratedTs("pump-series.footnotes.generated.ts", "pumpSeriesFootnotes", footnoteRows);

  writeJson("pump-series.summary.json", {
    generatedAt: new Date().toISOString(),
    pumpSource: pumpXlsxPath,
    footnoteSource: footnoteXlsxPath,
    sheets: {
      rules: ruleSheet.sheetName,
      products: productSheet.sheetName,
      routes: routeSheet.sheetName,
      hero: heroSheet.sheetName,
      seo: seoSheet.sheetName,
      sections: sectionSheet.sheetName,
      cards: cardSheet.sheetName,
      body: bodySheet.sheetName,
      parameters: parameterSheet.sheetName,
      images: imageSheet.sheetName,
      resources: resourceSheet.sheetName,
      faq: faqSheet.sheetName,
      selector: selectorSheet.sheetName,
      footnoteRefs: footnoteRefSheet.sheetName,
      footnotes: footnoteSheet.sheetName,
    },
    productCount: details.length,
    cardCount: selectionCards.length,
    routeCount: routes.length,
    warnings,
    products: details.map((item) => ({
      productId: item.productId,
      slug: item.slug,
      routeSlug: item.routeSlug,
      canonicalPath: item.route?.canonicalPath,
      pumpTypeSlug: item.pumpTypeSlug,
      h1Zh: item.content.zh.h1,
      h1En: item.content.en.h1,
      detailMode: item.content.zh.hero.detailMode,
      showModel: item.content.zh.hero.showModel,
    })),
  });

  if (warnings.length > 0) {
    console.warn("⚠️ 发现需要人工处理的问题：");
    for (const warning of warnings) {
      console.warn(`- ${warning.productId || ""} ${warning.locale || ""} ${warning.message}`);
    }
  }

  console.log("✅ 泵系列 xlsx 数据源解析完成");
}

main();
