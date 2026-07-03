const fs = require("fs");
const path = require("path");

const detailFile = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series.detail.generated.ts"
);

const outputFile = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series-faq-scope-audit.md"
);

if (!fs.existsSync(detailFile)) {
  throw new Error("未找到：" + detailFile);
}

const source = fs.readFileSync(detailFile, "utf8");

const match = source.match(
  /export const pumpSeriesDetailRecords = ([\s\S]*?) as const;?/
);

if (!match) {
  throw new Error("未找到 pumpSeriesDetailRecords");
}

const records = JSON.parse(match[1]);

function text(value) {
  return String(value || "").trim();
}

function getId(record) {
  return (
    text(record.productId) ||
    text(record.slug) ||
    text(record.routeSlug) ||
    text(record.index?.productId) ||
    text(record.index?.routeSlug) ||
    ""
  );
}

function getFaqs(record, locale) {
  return record.content?.[locale]?.faqs || [];
}

const allProductIds = records.map(getId).filter(Boolean);

let md = "";

md += "# 泵系列 FAQ 作用域审查\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;
md += `产品数量：${records.length}\n\n`;

md += "| productId | 中文 FAQ 数量 | 英文 FAQ 数量 | 是否疑似混入其他型号 | 问题 |\n";
md += "|---|---:|---:|---|---|\n";

let hasProblem = false;

for (const record of records) {
  const productId = getId(record);
  const zhFaqs = getFaqs(record, "zh");
  const enFaqs = getFaqs(record, "en");

  const faqText = JSON.stringify([...zhFaqs, ...enFaqs]);

  const mixedIds = allProductIds.filter((id) => {
    if (id === productId) return false;

    const model = id.toUpperCase().replace(/-/g, "-");
    return faqText.includes(model);
  });

  const problems = [];

  if (zhFaqs.length === 0) {
    problems.push("中文 FAQ 为空");
  }

  if (enFaqs.length === 0) {
    problems.push("英文 FAQ 为空");
  }

  if (mixedIds.length > 0) {
    problems.push("疑似混入：" + mixedIds.slice(0, 5).join(", "));
  }

  const isSm = productId.startsWith("sm-");
  const hasSmStepsFaq = faqText.includes("满量程步数") || faqText.includes("full-stroke steps");

  if (!isSm && hasSmStepsFaq) {
    problems.push("EA 页面混入 SM 满量程步数 FAQ");
  }

  if (problems.length > 0) {
    hasProblem = true;
  }

  md += `| ${productId} | ${zhFaqs.length} | ${enFaqs.length} | ${mixedIds.length > 0 ? "是" : "否"} | ${problems.join("；")} |\n`;
}

md += "\n";

if (hasProblem) {
  md += "## 结论\n\n";
  md += "❌ FAQ 作用域仍有问题，暂时不要提交。\n";
} else {
  md += "## 结论\n\n";
  md += "✅ FAQ 已按产品正确分配，可以进入提交步骤。\n";
}

fs.writeFileSync(outputFile, md, "utf8");

console.log("✅ 已生成 FAQ 作用域审查：");
console.log(outputFile);
console.log(hasProblem ? "❌ FAQ 仍有问题" : "✅ FAQ 作用域正常");