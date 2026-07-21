const fs = require("fs");
const path = require("path");

const summaryPath = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series.summary.json"
);

const outputPath = path.join(
  process.cwd(),
  "data/products/generated/pumps/pump-series-content-audit.md"
);

if (!fs.existsSync(summaryPath)) {
  throw new Error("未找到 pump-series.summary.json，请先运行 npm run build:pump-series-data");
}

const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));

let md = "";

md += "# 泵系列数据库内容审查\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;

md += "## 一、当前数据源状态\n\n";
md += `- 产品数量：${summary.productCount}\n`;
md += `- 路由数量：${summary.routeCount}\n`;
md += `- 选型卡片数量：${summary.cardCount}\n`;
md += `- 泵系列数据源：${summary.pumpSource}\n`;
md += `- 全站脚注库：${summary.footnoteSource}\n\n`;

md += "## 二、产品页面基础信息\n\n";
md += "| productId | 路由 | 中文 H1 | 英文 H1 | detailMode | showModel |\n";
md += "|---|---|---|---|---|---|\n";

for (const item of summary.products || []) {
  md += `| ${item.productId || ""} | ${item.canonicalPath || ""} | ${item.h1Zh || ""} | ${item.h1En || ""} | ${item.detailMode || ""} | ${item.showModel} |\n`;
}

md += "\n## 三、需要人工确认的问题\n\n";

if (summary.warnings && summary.warnings.length > 0) {
  for (const warning of summary.warnings) {
    md += `- ${warning.productId || ""} ${warning.locale || ""}：${warning.message || ""}\n`;
  }
} else {
  md += "- 暂无脚本级 warning。\n";
}

md += "\n## 四、下一步人工检查重点\n\n";
md += "1. 中文 H1 是否保持型号式标题，例如：EA-100-PMMA 柱塞泵。\n";
md += "2. 英文 H1 是否为描述式标题，不直接堆型号。\n";
md += "3. 柱塞泵 detailMode 是否为 custom_inquiry。\n";
md += "4. 柱塞泵 showModel 是否为 false。\n";
md += "5. 详情页 H2 / tab 标题是否来自 06_页面模块与标题。\n";
md += "6. 选型卡片文案是否来自 07_选型卡片。\n";
md += "7. 图片说明是否来自 10_图片资源。\n";
md += "8. 脚注正文是否来自全站脚注库，产品表只写 footnoteIds。\n";

fs.writeFileSync(outputPath, md, "utf8");

console.log("✅ 已生成审查文件：");
console.log(outputPath);