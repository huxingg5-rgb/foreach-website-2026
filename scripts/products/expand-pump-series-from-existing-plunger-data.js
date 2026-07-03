/* =========================================================
   expand-pump-series-from-existing-plunger-data.js
   恒永达官网｜从现有柱塞泵数据扩展泵系列 xlsx

   作用：
   1. 读取现有柱塞泵详情页 generated 数据
   2. 自动提取 EA / SM 柱塞泵
   3. 补充到 FOREACH_泵系列_产品数据源.xlsx
   4. 不改页面结构
   5. 不替换正式详情页
========================================================= */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const pumpXlsxPath = path.join(
  root,
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

const oldDetailPath = path.join(
  root,
  "data/products/detail/plunger-pump-detail.generated.ts"
);

if (!fs.existsSync(pumpXlsxPath)) {
  throw new Error("未找到泵系列数据源：" + pumpXlsxPath);
}

if (!fs.existsSync(oldDetailPath)) {
  throw new Error("未找到现有柱塞泵详情数据：" + oldDetailPath);
}

function text(value) {
  return String(value || "").trim();
}

function toSlug(value) {
  return text(value)
    .toLowerCase()
    .replace(/μ/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCapacityFromSlug(slug) {
  const match = text(slug).toLowerCase().match(/^(ea|sm|tm)-(\d+)/);
  if (!match) return "";
  return `${Number(match[2])} µL`;
}

function parseMaterialFromSlug(slug) {
  const lower = text(slug).toLowerCase();

  if (lower.includes("pmma")) return "PMMA";
  if (lower.includes("peek")) return "PEEK";
  if (lower.includes("pps")) return "PPS";
  if (lower.includes("pom")) return "POM";

  return "";
}

function parseSeriesCode(slug) {
  const lower = text(slug).toLowerCase();

  if (lower.startsWith("ea-")) return "EA";
  if (lower.startsWith("sm-")) return "SM";
  if (lower.startsWith("tm-")) return "TM";

  return "";
}

function getSeriesSlug(seriesCode) {
  if (seriesCode === "EA") return "ea-standard-piston-pumps";
  if (seriesCode === "SM") return "sm-miniature-piston-pumps";
  if (seriesCode === "TM") return "tm-ultra-compact-piston-pumps";
  return "";
}

function getPumpTypeSlug() {
  return "plunger-pumps";
}

function getInternalModelRef(slug) {
  return text(slug).toUpperCase();
}

function isEaOrSmPlunger(slug) {
  const lower = text(slug).toLowerCase();
  return lower.startsWith("ea-") || lower.startsWith("sm-");
}

/**
 * 从 TS generated 文件中尽量提取对象记录。
 * 这里不假设导出变量名，直接用正则找形如：
 * slug: "ea-100-pmma"
 * 或 "slug": "ea-100-pmma"
 */
function extractSlugsFromGeneratedFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const slugSet = new Set();

  const patterns = [
    /slug\s*:\s*["'`]([^"'`]+)["'`]/g,
    /detailSlug\s*:\s*["'`]([^"'`]+)["'`]/g,
    /model\s*:\s*["'`]([^"'`]+)["'`]/g,
    /productId\s*:\s*["'`]([^"'`]+)["'`]/g,
    /"slug"\s*:\s*"([^"]+)"/g,
    /"detailSlug"\s*:\s*"([^"]+)"/g,
    /"model"\s*:\s*"([^"]+)"/g,
    /"productId"\s*:\s*"([^"]+)"/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content))) {
      const raw = text(match[1]);
      const slug = toSlug(raw);

      if (isEaOrSmPlunger(slug)) {
        slugSet.add(slug);
      }
    }
  }

  return Array.from(slugSet).sort((a, b) => {
    const [aSeries, aNumRaw] = a.split("-");
    const [bSeries, bNumRaw] = b.split("-");
    const order = { ea: 1, sm: 2, tm: 3 };
    const aSeriesOrder = order[aSeries] || 99;
    const bSeriesOrder = order[bSeries] || 99;

    if (aSeriesOrder !== bSeriesOrder) {
      return aSeriesOrder - bSeriesOrder;
    }

    return Number(aNumRaw || 0) - Number(bNumRaw || 0) || a.localeCompare(b);
  });
}

function readSheet(wb, sheetName) {
  const sheet = wb.Sheets[sheetName];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeSheet(wb, sheetName, rows) {
  wb.Sheets[sheetName] = XLSX.utils.json_to_sheet(rows);
}

function upsert(rows, keyFields, nextRows) {
  const result = [...rows];

  for (const next of nextRows) {
    const index = result.findIndex((row) =>
      keyFields.every((key) => text(row[key]) === text(next[key]))
    );

    if (index >= 0) {
      result[index] = {
        ...result[index],
        ...next,
      };
    } else {
      result.push(next);
    }
  }

  return result;
}

const slugs = extractSlugsFromGeneratedFile(oldDetailPath);

if (slugs.length === 0) {
  throw new Error("没有从现有柱塞泵数据中识别到 EA / SM 产品。");
}

console.log("识别到 EA / SM 柱塞泵数量：" + slugs.length);
console.log(slugs.join(", "));

const wb = XLSX.readFile(pumpXlsxPath);

let productRows = readSheet(wb, "02_泵产品索引");
let routeRows = readSheet(wb, "03_路由与页面映射");
let heroRows = readSheet(wb, "04_详情页首屏");
let seoRows = readSheet(wb, "05_SEO与HTML标记");
let sectionRows = readSheet(wb, "06_页面模块与标题");
let cardRows = readSheet(wb, "07_选型卡片");
let bodyRows = readSheet(wb, "08_详情页正文");
let paramRows = readSheet(wb, "09_详情页参数");
let imageRows = readSheet(wb, "10_图片资源");
let resourceRows = readSheet(wb, "11_资料资源");
let faqRows = readSheet(wb, "12_FAQ");
let footnoteRefRows = readSheet(wb, "14_脚注引用映射");

const productsToUpsert = [];
const routesToUpsert = [];
const heroToUpsert = [];
const seoToUpsert = [];
const sectionsToUpsert = [];
const cardsToUpsert = [];
const bodyToUpsert = [];
const paramsToUpsert = [];
const imagesToUpsert = [];
const resourcesToUpsert = [];
const faqsToUpsert = []; // 禁止自动生成 FAQ，FAQ 只从正式表格导入
const footnoteRefsToUpsert = [];

slugs.forEach((slug, index) => {
  const seriesCode = parseSeriesCode(slug);
  const seriesSlug = getSeriesSlug(seriesCode);
  const pumpTypeSlug = getPumpTypeSlug();
  const capacity = parseCapacityFromSlug(slug);
  const material = parseMaterialFromSlug(slug);
  const internalModelRef = getInternalModelRef(slug);
  const isSm = seriesCode === "SM";
  const productNameZh = isSm ? `${internalModelRef} 微型柱塞泵` : `${internalModelRef} 柱塞泵`;
  const productNameEn = isSm
    ? `${capacity} Miniature ${material} Plunger Pump for Compact Fluidic Systems`
    : `${capacity} ${material} Plunger Pump for Precision Dispensing`;

  const sort = seriesCode === "EA" ? 100 + index : 300 + index;

  const officialHref = `/products/pumps/${pumpTypeSlug}/${slug}`;
  const previewHref = `/products/pumps-db/${pumpTypeSlug}/${seriesSlug}/${slug}`;
  const seriesFolder = seriesCode.toLowerCase();

  productsToUpsert.push({
    productId: slug,
    slug,
    routeSlug: slug,
    categorySlug: "pumps",
    pumpTypeSlug,
    seriesSlug,
    seriesCode,
    internalModelRef,
    capacity,
    material,
    showInFrontend: "yes",
    enabled: "yes",
    sort,
  });

  routesToUpsert.push({
    productId: slug,
    routeSlug: slug,
    canonicalPath: officialHref,
    detailHref: officialHref,
    databasePreviewHref: previewHref,
    legacyRedirectFrom: "",
    trailingSlashPolicy: "no_trailing_slash",
    routeEnabled: "yes",
  });

  heroToUpsert.push({
    productId: slug,
    titleZh: productNameZh,
    titleEn: productNameEn,
    detailMode: "custom_inquiry",
    showModel: "no",
    displayModel: internalModelRef,
    customNoticeZh: isSm
      ? "SM 微型柱塞泵适用于空间紧凑型液路系统，具体容量、材料、接口和控制方案需根据整机结构确认。"
      : "柱塞泵为定制化产品，泵头材料、容量范围、接口方式、阀体搭配和控制方式需根据实际应用确认。如需方案评估，请联系我们或提交需求表单。",
    customNoticeEn: isSm
      ? "SM miniature plunger pumps are designed for compact fluidic systems. Volume, material, interface, and control configuration should be confirmed according to the instrument layout."
      : "Plunger pumps are custom-engineered products. Pump head material, volume range, interface, valve configuration, and control method should be confirmed according to the application.",
    primaryButtonZh: "联系我们",
    primaryButtonEn: "Contact Us",
    primaryButtonHref: "/contact",
    secondaryButtonZh: "提交需求表单",
    secondaryButtonEn: "Submit Requirements",
    secondaryButtonHref: "/contact",
    showAddToList: "no",
    showModelFilter: "no",
  });

  seoToUpsert.push(
    {
      productId: slug,
      locale: "zh",
      titleTag: `${productNameZh}｜精密液体分配泵｜恒永达 FOREACH`,
      metaDescription: `${productNameZh}适用于自动化分析仪器、IVD 分析仪和实验室自动化设备中的液体吸排、分配和转移。柱塞泵为定制产品，最终方案需结合应用确认。`,
      h1: productNameZh,
      canonicalPath: officialHref,
      robots: "index,follow",
      ogTitle: productNameZh,
      ogDescription: "面向自动化分析仪器液路系统的定制化精密柱塞泵方案。",
    },
    {
      productId: slug,
      locale: "en",
      titleTag: `${productNameEn} | FOREACH`,
      metaDescription: `${productNameEn} for precision aspiration, dispensing, and liquid transfer in automated analyzers, IVD instruments, and custom fluidic systems.`,
      h1: productNameEn,
      canonicalPath: officialHref,
      robots: "index,follow",
      ogTitle: productNameEn,
      ogDescription: "Custom-engineered plunger pump solution for precision liquid handling and automated fluidic integration.",
    }
  );

  sectionsToUpsert.push(
    {
      productId: slug,
      locale: "zh",
      sectionKey: "features",
      headingLevel: "h2",
      headingText: "产品特点",
      leadText: isSm
        ? "面向空间紧凑型自动化仪器，提供小体积结构下的微量液体分配方案。"
        : "面向自动化分析仪器中的精密液体分配需求，提供稳定、可定制的柱塞泵方案。",
      renderComponent: "feature_cards",
      sort: 100,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "zh",
      sectionKey: "applications",
      headingLevel: "label",
      headingText: "常见应用：",
      leadText: "",
      renderComponent: "application_summary",
      sort: 150,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "zh",
      sectionKey: "spec_tab",
      headingLevel: "tab",
      headingText: "规格",
      leadText: "",
      renderComponent: "spec_tab",
      sort: 210,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "zh",
      sectionKey: "model3d_tab",
      headingLevel: "tab",
      headingText: "3D模型",
      leadText: "",
      renderComponent: "model3d_tab",
      sort: 220,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "zh",
      sectionKey: "drawing_tab",
      headingLevel: "tab",
      headingText: "零件图",
      leadText: "",
      renderComponent: "drawing_tab",
      sort: 230,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "zh",
      sectionKey: "faq",
      headingLevel: "h2",
      headingText: "常见问题",
      leadText: "以下内容用于说明柱塞泵定制、材料选择和工程确认流程。",
      renderComponent: "faq_list",
      sort: 400,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "en",
      sectionKey: "features",
      headingLevel: "h2",
      headingText: "Product Features",
      leadText: isSm
        ? "A miniature plunger pump solution for micro-volume liquid handling in compact automated instruments."
        : "A customizable plunger pump solution for precision liquid handling in automated analytical instruments.",
      renderComponent: "feature_cards",
      sort: 100,
      enabled: "yes",
    },
    {
      productId: slug,
      locale: "en",
      sectionKey: "faq",
      headingLevel: "h2",
      headingText: "FAQ",
      leadText: "Common questions about plunger pump customization, material selection, and engineering confirmation.",
      renderComponent: "faq_list",
      sort: 400,
      enabled: "yes",
    }
  );

  bodyToUpsert.push({
    productId: slug,
    descriptionZh: isSm
      ? `${productNameZh}适用于空间受限的自动化设备和紧凑型液路系统，可用于微量液体吸排、分配和转移。具体配置需结合整机空间、液路路径和控制方式确认。`
      : `${productNameZh}用于自动化仪器中的精密液体吸排、分配和转移。该产品为定制化柱塞泵方案，泵体结构、材料、接口、阀路搭配和控制方式需根据实际应用确认。`,
    descriptionEn: isSm
      ? `The ${productNameEn} is designed for space-limited automated equipment and compact fluidic systems requiring micro-volume aspiration, dispensing, and transfer.`
      : `The ${productNameEn} is designed for precision aspiration, dispensing, and liquid transfer in automated instruments. It is a custom-engineered pump solution.`,
    advantagesZh: isSm
      ? "适用于紧凑型仪器空间|支持微量液体吸排与分配|可根据液路结构进行定制集成|适用于小型自动化检测模块"
      : "适用于液体精密分配|支持泵头材料、接口和阀路搭配定制|可配合控制器、光耦和电磁阀集成|适用于自动化分析仪器液路系统",
    advantagesEn: isSm
      ? "Designed for compact instrument layouts|Supports micro-volume aspiration and dispensing|Can be customized according to fluidic structure|Suitable for small automated testing modules"
      : "Suitable for precision liquid dispensing|Supports pump head material, interface, and valve configuration customization|Can be integrated with controllers, optical sensors, and solenoid valves|Designed for automated analytical fluidic systems",
    commonApplicationsZh: isSm
      ? "紧凑型 IVD 设备|小型液路模块|实验室自动化设备|生命科学仪器"
      : "IVD 分析仪|实验室自动化设备|生命科学仪器|分析仪器液路模块",
    commonApplicationsEn: isSm
      ? "Compact IVD instruments|Small fluidic modules|Laboratory automation systems|Life science instruments"
      : "IVD analyzers|Laboratory automation systems|Life science instruments|Analytical instrument fluidic modules",
  });

  cardsToUpsert.push({
    productId: slug,
    pumpTypeSlug,
    seriesSlug,
    cardTitleZh: productNameZh,
    cardTitleEn: isSm
      ? `${capacity} Miniature ${material} Plunger Pump`
      : `${capacity} ${material} Plunger Pump`,
    cardSubtitleZh: isSm
      ? "紧凑型仪器用微量液体分配方案"
      : "精密分配与自动化液路集成",
    cardSubtitleEn: isSm
      ? "Micro-volume dispensing for compact instruments"
      : "Precision dispensing and automated fluidic integration",
    cardDescriptionZh: isSm
      ? "适用于空间受限的自动化设备和紧凑型液路系统中的微量吸排、分配和转移。"
      : "适用于自动化分析仪器中的液体吸排、分配、转移和液路模块集成。",
    cardDescriptionEn: isSm
      ? "Suitable for micro-volume aspiration, dispensing, and transfer in space-limited automated instruments and compact fluidic systems."
      : "Suitable for aspiration, dispensing, transfer, and fluidic module integration in automated analytical instruments.",
    cardSpecsZh: `容量：${capacity}|泵头材料：${material}|类型：${isSm ? "微型定制柱塞泵" : "定制柱塞泵"}`,
    cardSpecsEn: `Volume: ${capacity}|Pump head: ${material}|Type: ${isSm ? "Miniature custom plunger pump" : "Custom plunger pump"}`,
    cardBadges: `Custom|${capacity}|${material}`,
    cardImage: `/images/products/pumps/plunger-pump/${seriesFolder}/${slug}-card.webp`,
    detailHref: officialHref,
    databasePreviewHref: previewHref,
    showInSelection: "yes",
    sort,
  });

  paramsToUpsert.push(
    {
      productId: slug,
      groupNameZh: "基础参数",
      groupNameEn: "Basic Specifications",
      paramNameZh: "容量范围",
      paramNameEn: "Volume Range",
      paramValueZh: capacity,
      paramValueEn: capacity,
      unit: "",
      sort: 100,
      visible: "yes",
      parameterFootnoteIds: "FN-PARAMETER-CONDITION",
    },
    {
      productId: slug,
      groupNameZh: "材料",
      groupNameEn: "Materials",
      paramNameZh: "泵头材料",
      paramNameEn: "Pump Head Material",
      paramValueZh: material,
      paramValueEn: material,
      unit: "",
      sort: 200,
      visible: "yes",
      parameterFootnoteIds: "FN-MATERIAL-COMPATIBILITY",
    },
    {
      productId: slug,
      groupNameZh: "接口",
      groupNameEn: "Interface",
      paramNameZh: "接口螺纹",
      paramNameEn: "Thread Interface",
      paramValueZh: "1/4-28 UNF / M6 可选",
      paramValueEn: "1/4-28 UNF / M6 optional",
      unit: "",
      sort: 300,
      visible: "yes",
      parameterFootnoteIds: "",
    }
  );

  imagesToUpsert.push({
    productId: slug,
    imageUsage: "detailImages",
    imagePaths: `/images/products/pumps/plunger-pump/${seriesFolder}/${slug}-main.webp；/images/products/pumps/plunger-pump/${seriesFolder}/${slug}-detail.webp`,
    imageAltZh: `${productNameZh}产品图；${productNameZh}泵头细节图`,
    imageAltEn: `${productNameEn} product image；${productNameEn} pump head detail image`,
    imageCaptionZh: "产品图片仅用于结构展示；泵头细节图仅用于结构说明",
    imageCaptionEn: "Product image for structural reference only；Pump head detail image for structural reference only",
    showCaption: "yes",
    fallbackImage: "/images/products/common/product-placeholder.webp",
    imageFootnoteIds: "FN-IMAGE-FOR-REFERENCE",
    sort: 100,
  });

  resourcesToUpsert.push({
    productId: slug,
    drawing2dUrl: `/assets/products/${seriesFolder}/2d-drawings/${seriesCode}-${String(Number(slug.split("-")[1])).padStart(4, "0")}UL.pdf`,
    model3dUrl: `/assets/products/${seriesFolder}/3d-models/${seriesCode}-${String(Number(slug.split("-")[1])).padStart(4, "0")}UL.glb`,
    datasheetUrl: "",
    manualUrl: "",
    showDrawing: "yes",
    show3D: "yes",
    showDatasheet: "no",
    showManual: "no",
    resourceFootnoteIds: "FN-DRAWING-PREVIEW|FN-ENGINEERING-FILES-NOT-PUBLIC",
  });
  // FAQ 不在扩展脚本中自动生成，统一从正式 FAQ 表导入。
footnoteRefsToUpsert.push(
    {
      productId: slug,
      targetBlock: "hero_notice",
      renderPosition: "detail_notice",
      footnoteIds: "FN-CUSTOM-PUMP",
      sort: 100,
      enabled: "yes",
    },
    {
      productId: slug,
      targetBlock: "page_bottom",
      renderPosition: "page_bottom",
      footnoteIds: "FN-FINAL-CONFIG",
      sort: 200,
      enabled: "yes",
    }
  );
});

productRows = upsert(productRows, ["productId"], productsToUpsert);
routeRows = upsert(routeRows, ["productId"], routesToUpsert);
heroRows = upsert(heroRows, ["productId"], heroToUpsert);
seoRows = upsert(seoRows, ["productId", "locale"], seoToUpsert);
sectionRows = upsert(sectionRows, ["productId", "locale", "sectionKey"], sectionsToUpsert);
cardRows = upsert(cardRows, ["productId"], cardsToUpsert);
bodyRows = upsert(bodyRows, ["productId"], bodyToUpsert);
paramRows = upsert(paramRows, ["productId", "paramNameZh"], paramsToUpsert);
imageRows = upsert(imageRows, ["productId", "imageUsage"], imagesToUpsert);
resourceRows = upsert(resourceRows, ["productId"], resourcesToUpsert);
// faqRows = upsert(faqRows, ["faqId"], faqsToUpsert); // 禁止自动写 FAQ
footnoteRefRows = upsert(footnoteRefRows, ["productId", "targetBlock"], footnoteRefsToUpsert);

writeSheet(wb, "02_泵产品索引", productRows);
writeSheet(wb, "03_路由与页面映射", routeRows);
writeSheet(wb, "04_详情页首屏", heroRows);
writeSheet(wb, "05_SEO与HTML标记", seoRows);
writeSheet(wb, "06_页面模块与标题", sectionRows);
writeSheet(wb, "07_选型卡片", cardRows);
writeSheet(wb, "08_详情页正文", bodyRows);
writeSheet(wb, "09_详情页参数", paramRows);
writeSheet(wb, "10_图片资源", imageRows);
writeSheet(wb, "11_资料资源", resourceRows);
writeSheet(wb, "12_FAQ", faqRows);
writeSheet(wb, "14_脚注引用映射", footnoteRefRows);

XLSX.writeFile(wb, pumpXlsxPath);

console.log("✅ 已扩展泵系列 xlsx 数据源");
console.log(`- 产品数量：${productRows.length}`);
console.log(`- 选型卡片数量：${cardRows.length}`);
console.log(`- 参数行数量：${paramRows.length}`);
console.log(`- FAQ 行数量：${faqRows.length}`);