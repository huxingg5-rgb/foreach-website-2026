/* =========================================================
   apply-pump-series-faq-scope.js

   作用：
   1. 读取 data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx 的 12_FAQ
   2. 按 scope 规则把 FAQ 应用到详情页 generated 数据
   3. 支持 pumpType / series / product 三种层级
   4. 不重新创作 FAQ，只使用 Excel 里已有 question / answer
========================================================= */

const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const sourceWorkbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "pumps",
  "FOREACH_泵系列_产品数据源.xlsx"
);

const detailGeneratedPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "pumps",
  "pump-series.detail.generated.ts"
);

function toText(value) {
  return String(value || "").trim();
}

function normalizeKey(value) {
  return toText(value).toLowerCase();
}

function readSheetRows(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    return [];
  }

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  });

  return rows;
}

function isVisible(value) {
  const text = toText(value);

  return text === "是" || text.toLowerCase() === "true" || text === "1";
}

function parseFaqRows() {
  const workbook = XLSX.readFile(sourceWorkbookPath);
  const rows = readSheetRows(workbook, "12_FAQ");

  return rows
    .map((row) => ({
      faqId: toText(row.faqId),
      locale: normalizeKey(row.locale || "zh"),
      scope: normalizeKey(row.scope),
      pumpTypeSlug: normalizeKey(row.pumpTypeSlug),
      seriesSlug: normalizeKey(row.seriesSlug),
      productId: normalizeKey(row.productId),
      question: toText(row.question),
      answer: toText(row.answer),
      frontVisible: row.frontVisible,
      sort: Number(row.sort || 0),
    }))
    .filter((item) => {
      return (
        item.locale &&
        item.scope &&
        item.question &&
        item.answer &&
        isVisible(item.frontVisible)
      );
    })
    .sort((a, b) => a.sort - b.sort);
}

function extractArraySource(text) {
  const marker = "pumpSeriesDetailRecords";
  const markerIndex = text.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error("未找到 pumpSeriesDetailRecords");
  }

  const arrayStart = text.indexOf("[", markerIndex);

  if (arrayStart < 0) {
    throw new Error("未找到 records 数组开始位置");
  }

  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = arrayStart; i < text.length; i += 1) {
    const char = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString && char === "[") {
      depth += 1;
    }

    if (!inString && char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          before: text.slice(0, arrayStart),
          arraySource: text.slice(arrayStart, i + 1),
          after: text.slice(i + 1),
        };
      }
    }
  }

  throw new Error("records 数组提取失败");
}

function getRecordLocaleEntries(record) {
  const content = record.content || {};

  if (content.zh || content.en) {
    return [
      content.zh ? ["zh", content.zh] : null,
      content.en ? ["en", content.en] : null,
    ].filter(Boolean);
  }

  const locale = normalizeKey(record.locale || "zh");

  return [[locale, content]];
}

function getRecordProductId(record, content) {
  return normalizeKey(
    record.productId ||
      record.internalModelRef ||
      content?.hero?.displayModel ||
      record.slug ||
      record.routeSlug
  );
}

function getRecordSeriesSlug(record) {
  return normalizeKey(record.seriesSlug || record.route?.seriesSlug);
}

function getRecordPumpTypeSlug(record) {
  return normalizeKey(record.pumpTypeSlug || record.route?.pumpTypeSlug);
}

function matchFaqToRecord(faq, record, content, locale) {
  if (faq.locale !== locale) {
    return false;
  }

  const recordPumpTypeSlug = getRecordPumpTypeSlug(record);
  const recordSeriesSlug = getRecordSeriesSlug(record);
  const recordProductId = getRecordProductId(record, content);

  if (faq.scope === "pumpType".toLowerCase() || faq.scope === "pumptype") {
    return faq.pumpTypeSlug && faq.pumpTypeSlug === recordPumpTypeSlug;
  }

  if (faq.scope === "series") {
    return (
      faq.pumpTypeSlug &&
      faq.seriesSlug &&
      faq.pumpTypeSlug === recordPumpTypeSlug &&
      faq.seriesSlug === recordSeriesSlug
    );
  }

  if (faq.scope === "product") {
    return faq.productId && faq.productId === recordProductId;
  }

  return false;
}

function buildFaqsForRecord(faqRows, record, content, locale) {
  const matches = faqRows.filter((faq) =>
    matchFaqToRecord(faq, record, content, locale)
  );
  // Curated EA detail FAQs replace generic entries only for this product.
  const eaOverrides = getRecordProductId(record, content).startsWith("ea-")
    ? matches.filter((faq) => faq.scope === "product" && faq.faqId.startsWith("ea-detail-"))
    : [];
  const compactOverrides = /^(sm|tm)-/.test(getRecordProductId(record, content))
    ? matches.filter((faq) => faq.scope === "product" && faq.faqId.startsWith("compact-detail-"))
    : [];
  const matched = (eaOverrides.length > 0 ? eaOverrides : compactOverrides.length > 0 ? compactOverrides : matches)
    .map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));

  const seen = new Set();

  return matched.filter((item) => {
    const key = `${item.question}::${item.answer}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

const faqRows = parseFaqRows();

const detailText = fs.readFileSync(detailGeneratedPath, "utf8");
const { before, arraySource, after } = extractArraySource(detailText);
const records = JSON.parse(arraySource);

let zhApplied = 0;
let enApplied = 0;

const nextRecords = records.map((record) => {
  const nextRecord = { ...record };

  const localeEntries = getRecordLocaleEntries(nextRecord);

  if (nextRecord.content?.zh || nextRecord.content?.en) {
    nextRecord.content = { ...nextRecord.content };

    localeEntries.forEach(([locale, content]) => {
      const faqs = buildFaqsForRecord(faqRows, nextRecord, content, locale);

      if (faqs.length > 0) {
        nextRecord.content[locale] = {
          ...content,
          faqs,
        };

        if (locale === "zh") {
          zhApplied += 1;
        } else {
          enApplied += 1;
        }
      }
    });

    return nextRecord;
  }

  const locale = normalizeKey(nextRecord.locale || "zh");
  const faqs = buildFaqsForRecord(faqRows, nextRecord, nextRecord.content, locale);

  if (faqs.length > 0) {
    nextRecord.content = {
      ...(nextRecord.content || {}),
      faqs,
    };

    if (locale === "zh") {
      zhApplied += 1;
    } else {
      enApplied += 1;
    }
  }

  return nextRecord;
});

const output =
  before +
  JSON.stringify(nextRecords, null, 2) +
  after;

fs.writeFileSync(detailGeneratedPath, output, "utf8");

console.log("FAQ scope 应用完成");
console.log("FAQ 行数：", faqRows.length);
console.log("写入中文详情记录数：", zhApplied);
console.log("写入英文详情记录数：", enApplied);
