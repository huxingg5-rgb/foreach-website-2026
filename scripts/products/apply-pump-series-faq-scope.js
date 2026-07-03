const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const xlsxFile = path.join(
  root,
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

const detailFile = path.join(
  root,
  "data/products/generated/pumps/pump-series.detail.generated.ts"
);

if (!fs.existsSync(xlsxFile)) {
  throw new Error("未找到 xlsx 数据源：" + xlsxFile);
}

if (!fs.existsSync(detailFile)) {
  throw new Error("未找到 generated detail 文件：" + detailFile);
}

function text(value) {
  return String(value || "").trim();
}

function yes(value) {
  const v = text(value).toLowerCase();
  return !v || v === "yes" || v === "true" || v === "1";
}

function normalizeScope(value) {
  const scope = text(value).toLowerCase();

  if (!scope) return "product";
  if (scope === "product") return "product";
  if (scope === "series") return "series";
  if (scope === "global") return "global";
  if (scope === "pumptype") return "pumpType";
  if (scope === "producttype") return "pumpType";

  return scope;
}

function getRecordValue(record, keys) {
  for (const key of keys) {
    const parts = key.split(".");
    let current = record;

    for (const part of parts) {
      if (!current || typeof current !== "object") {
        current = null;
        break;
      }

      current = current[part];
    }

    if (text(current)) {
      return text(current);
    }
  }

  return "";
}

function getRecordIdentity(record) {
  const productId = getRecordValue(record, [
    "productId",
    "slug",
    "routeSlug",
    "index.productId",
    "index.slug",
    "index.routeSlug",
    "route.productId",
    "route.slug",
    "route.routeSlug",
  ]);

  const pumpTypeSlug = getRecordValue(record, [
    "pumpTypeSlug",
    "index.pumpTypeSlug",
    "route.pumpTypeSlug",
  ]);

  const seriesSlug = getRecordValue(record, [
    "seriesSlug",
    "index.seriesSlug",
    "route.seriesSlug",
  ]);

  return {
    productId,
    pumpTypeSlug,
    seriesSlug,
  };
}

function faqAppliesToProduct(faq, identity) {
  const scope = normalizeScope(faq.scope);

  if (!yes(faq.enabled)) {
    return false;
  }

  if (scope === "global") {
    return true;
  }

  if (scope === "pumpType") {
    return text(faq.pumpTypeSlug) === text(identity.pumpTypeSlug);
  }

  if (scope === "series") {
    return text(faq.seriesSlug) === text(identity.seriesSlug);
  }

  if (scope === "product") {
    return text(faq.productId) === text(identity.productId);
  }

  return false;
}

function toFaqItems(faqRows, locale) {
  const items = [];

  for (const row of faqRows) {
    const question =
      locale === "en" ? text(row.questionEn) : text(row.questionZh);
    const answer =
      locale === "en" ? text(row.answerEn) : text(row.answerZh);

    if (!question || !answer) {
      continue;
    }

    items.push({
      question,
      answer,
    });
  }

  const map = new Map();

  for (const item of items) {
    const key = `${item.question}||${item.answer}`;

    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}

const wb = XLSX.readFile(xlsxFile);
const faqSheet = wb.Sheets["12_FAQ"];

if (!faqSheet) {
  throw new Error("未找到 12_FAQ sheet");
}

const faqRows = XLSX.utils.sheet_to_json(faqSheet, { defval: "" });

const source = fs.readFileSync(detailFile, "utf8");

const match = source.match(
  /export const pumpSeriesDetailRecords = ([\s\S]*?) as const;?/
);

if (!match) {
  throw new Error("未找到 pumpSeriesDetailRecords 导出");
}

const records = JSON.parse(match[1]);

let fixedProductCount = 0;

for (const record of records) {
  const identity = getRecordIdentity(record);

  if (!identity.productId) {
    continue;
  }

  const matchedFaqRows = faqRows
    .filter((faq) => faqAppliesToProduct(faq, identity))
    .sort((a, b) => Number(a.sort || 9999) - Number(b.sort || 9999));

  if (!record.content || typeof record.content !== "object") {
    continue;
  }

  if (record.content.zh) {
    record.content.zh.faqs = toFaqItems(matchedFaqRows, "zh");
  }

  if (record.content.en) {
    record.content.en.faqs = toFaqItems(matchedFaqRows, "en");
  }

  fixedProductCount += 1;
}

const nextSource =
  "/* =========================================================\n" +
  "   pump-series.detail.generated.ts\n" +
  "   由 scripts/products/build-pump-series-data.js 自动生成\n" +
  "   FAQ 已通过 apply-pump-series-faq-scope.js 按 scope/productId 过滤\n" +
  "========================================================= */\n\n" +
  "export const pumpSeriesDetailRecords = " +
  JSON.stringify(records, null, 2) +
  " as const;\n";

fs.writeFileSync(detailFile, nextSource, "utf8");

console.log("✅ 已按 FAQ scope / productId 重新过滤 generated FAQ");
console.log("FAQ 源行数：" + faqRows.length);
console.log("处理产品数：" + fixedProductCount);