const fs = require("fs");
const path = require("path");

const detailFile = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series.detail.generated.ts"
);

const cardFile = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series.selection.generated.ts"
);

const outputPath = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series-content-detail-audit.md"
);

function extractConstArray(filePath, exportName) {
  const content = fs.readFileSync(filePath, "utf8");
  const start = content.indexOf(`export const ${exportName} = `);

  if (start < 0) {
    throw new Error(`未找到导出：${exportName}`);
  }

  const jsonStart = content.indexOf("=", start) + 1;
  const asConstIndex = content.lastIndexOf(" as const");

  const jsonText = content
    .slice(jsonStart, asConstIndex)
    .trim()
    .replace(/;$/, "");

  return JSON.parse(jsonText);
}

function text(value) {
  return String(value || "").trim();
}

function list(items) {
  return Array.isArray(items)
    ? items.map((item) => text(item)).filter(Boolean).join("；")
    : "";
}

const details = extractConstArray(detailFile, "pumpSeriesDetailRecords");
const cards = extractConstArray(cardFile, "pumpSeriesSelectionCards");

let md = "";

md += "# 泵系列数据库详细内容审查\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;

md += "## 一、产品详情页内容\n\n";

for (const item of details) {
  const zh = item.content?.zh || {};
  const en = item.content?.en || {};
  const hero = zh.hero || {};
  const body = zh.body || {};
  const seoZh = zh.seo || {};
  const seoEn = en.seo || {};

  md += `## ${item.productId}\n\n`;

  md += "### 1. 基础信息\n\n";
  md += `- slug：${item.slug}\n`;
  md += `- seriesSlug：${item.seriesSlug}\n`;
  md += `- internalModelRef：${item.internalModelRef}\n`;
  md += `- capacity：${item.capacity}\n`;
  md += `- material：${item.material}\n`;
  md += `- canonicalPath：${item.route?.canonicalPath || ""}\n`;
  md += `- detailHref：${item.route?.detailHref || ""}\n\n`;

  md += "### 2. H1 / SEO\n\n";
  md += `- 中文 H1：${zh.h1 || ""}\n`;
  md += `- 英文 H1：${en.h1 || ""}\n`;
  md += `- 中文 titleTag：${seoZh.titleTag || ""}\n`;
  md += `- 英文 titleTag：${seoEn.titleTag || ""}\n`;
  md += `- 中文 metaDescription：${seoZh.metaDescription || ""}\n`;
  md += `- 英文 metaDescription：${seoEn.metaDescription || ""}\n\n`;

  md += "### 3. 首屏规则\n\n";
  md += `- detailMode：${hero.detailMode || ""}\n`;
  md += `- showModel：${hero.showModel}\n`;
  md += `- displayModel：${hero.displayModel || ""}\n`;
  md += `- customNotice：${hero.customNotice || ""}\n\n`;

  md += "### 4. 页面模块标题\n\n";
  const sections = zh.sections || [];
  if (sections.length) {
    md += "| sectionKey | headingLevel | headingText | leadText |\n";
    md += "|---|---|---|---|\n";
    for (const section of sections) {
      md += `| ${section.sectionKey || ""} | ${section.headingLevel || ""} | ${section.headingText || ""} | ${section.leadText || ""} |\n`;
    }
    md += "\n";
  } else {
    md += "- 暂无页面模块标题。\n\n";
  }

  md += "### 5. 正文内容\n\n";
  md += `- description：${body.description || ""}\n`;
  md += `- advantages：${list(body.advantages)}\n`;
  md += `- commonApplications：${list(body.commonApplications)}\n\n`;

  md += "### 6. 参数\n\n";
  const parameters = zh.parameters || [];
  if (parameters.length) {
    md += "| 参数名 | 参数值 | 单位 | 脚注数量 |\n";
    md += "|---|---|---|---|\n";
    for (const param of parameters) {
      md += `| ${param.paramName || ""} | ${param.paramValue || ""} | ${param.unit || ""} | ${(param.footnotes || []).length} |\n`;
    }
    md += "\n";
  } else {
    md += "- 暂无参数。\n\n";
  }

  md += "### 7. 图片资源\n\n";
  const imageBlocks = zh.images || [];
  if (imageBlocks.length) {
    for (const block of imageBlocks) {
      md += `- imageUsage：${block.imageUsage || ""}\n`;
      md += `- showCaption：${block.showCaption}\n`;
      md += `- footnotes：${(block.footnotes || []).map((note) => note.footnoteId).join("、")}\n`;
      for (const image of block.images || []) {
        md += `  - ${image.src}｜caption：${image.caption || ""}\n`;
      }
    }
    md += "\n";
  } else {
    md += "- 暂无图片资源。\n\n";
  }

  md += "### 8. 资料资源\n\n";
  const resources = zh.resources || {};
  md += `- drawing2dUrl：${resources.drawing2dUrl || ""}\n`;
  md += `- model3dUrl：${resources.model3dUrl || ""}\n`;
  md += `- datasheetUrl：${resources.datasheetUrl || ""}\n`;
  md += `- manualUrl：${resources.manualUrl || ""}\n`;
  md += `- resource footnotes：${(resources.footnotes || []).map((note) => note.footnoteId).join("、")}\n\n`;

  md += "### 9. FAQ\n\n";
  const faqs = zh.faqs || [];
  if (faqs.length) {
    for (const faq of faqs) {
      md += `- Q：${faq.question || ""}\n`;
      md += `  A：${faq.answer || ""}\n`;
    }
    md += "\n";
  } else {
    md += "- 暂无 FAQ。\n\n";
  }

  md += "### 10. 页面脚注引用\n\n";
  const footnoteRefs = zh.footnoteRefs || [];
  if (footnoteRefs.length) {
    for (const ref of footnoteRefs) {
      md += `- ${ref.targetBlock || ""} / ${ref.renderPosition || ""}：${(ref.footnotes || []).map((note) => note.footnoteId).join("、")}\n`;
    }
    md += "\n";
  } else {
    md += "- 暂无页面脚注引用。\n\n";
  }

  md += "---\n\n";
}

md += "# 二、选型卡片内容\n\n";

for (const card of cards) {
  md += `## ${card.productId}\n\n`;
  md += `- detailHref：${card.detailHref || ""}\n`;
  md += `- cardImage：${card.cardImage || ""}\n`;
  md += `- badges：${list(card.badges)}\n`;
  md += `- 中文标题：${card.content?.zh?.title || ""}\n`;
  md += `- 中文副标题：${card.content?.zh?.subtitle || ""}\n`;
  md += `- 中文描述：${card.content?.zh?.description || ""}\n`;
  md += `- 中文规格：${list(card.content?.zh?.specs)}\n`;
  md += `- 英文标题：${card.content?.en?.title || ""}\n`;
  md += `- 英文副标题：${card.content?.en?.subtitle || ""}\n`;
  md += `- 英文描述：${card.content?.en?.description || ""}\n`;
  md += `- 英文规格：${list(card.content?.en?.specs)}\n\n`;
}

fs.writeFileSync(outputPath, md, "utf8");

console.log("✅ 已生成详细内容审查文件：");
console.log(outputPath);