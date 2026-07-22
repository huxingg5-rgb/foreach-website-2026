/**
 * 将螺纹转倒刺接头筛选数据接入 ProductSelectionClient.tsx
 *
 * 仅修改：
 * components/products/selection/ProductSelectionClient.tsx
 *
 * 不修改：
 * - product-route-map.ts
 * - 详情页
 * - 公共样式
 *
 * 使用：
 * node scripts/products/connect-thread-to-barbed-selection-client.cjs
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    `未找到文件：${targetPath}`
  );
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  targetPath +
  `.bak_thread_to_barbed_selection_${timestamp}`;

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

fs.copyFileSync(
  targetPath,
  backupPath
);

const importMarker =
  "@/data/products/selection/thread-to-barbed-fitting-selection.generated";

if (!source.includes(importMarker)) {
  const quickConnectImportPattern =
    /import\s*\{\s*quickConnectFittingFilterLabels,\s*quickConnectFittingSelectionProducts,\s*quickConnectFittingTaxonomyItems,\s*\}\s*from\s*"@\/data\/products\/selection\/quick-connect-fitting-selection\.generated";/m;

  const quickConnectImportMatch =
    source.match(quickConnectImportPattern);

  if (!quickConnectImportMatch) {
    throw new Error(
      "未找到快插接头 import 代码块，已停止修改。"
    );
  }

  const newImport = `${quickConnectImportMatch[0]}
import {
  threadToBarbedFittingFilterLabels,
  threadToBarbedFittingSelectionProducts,
  threadToBarbedFittingTaxonomyItems,
} from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";`;

  source = source.replace(
    quickConnectImportMatch[0],
    newImport
  );
}

function insertSpreadAfter(
  text,
  existingSpread,
  newSpread
) {
  if (text.includes(newSpread)) {
    return text;
  }

  if (!text.includes(existingSpread)) {
    throw new Error(
      `未找到接入锚点：${existingSpread}`
    );
  }

  return text.replace(
    existingSpread,
    `${existingSpread}\n  ${newSpread}`
  );
}

source = insertSpreadAfter(
  source,
  "...quickConnectFittingSelectionProducts,",
  "...threadToBarbedFittingSelectionProducts,"
);

source = insertSpreadAfter(
  source,
  "...quickConnectFittingTaxonomyItems,",
  "...threadToBarbedFittingTaxonomyItems,"
);

source = insertSpreadAfter(
  source,
  "...quickConnectFittingFilterLabels,",
  "...threadToBarbedFittingFilterLabels,"
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺接头筛选数据已接入公共筛选组件");
console.log("============================================");
console.log(`修改文件：${targetPath}`);
console.log(`备份文件：${backupPath}`);
console.log("");
console.log("已接入：");
console.log("- threadToBarbedFittingSelectionProducts");
console.log("- threadToBarbedFittingTaxonomyItems");
console.log("- threadToBarbedFittingFilterLabels");
console.log("");
console.log("本步骤未修改 product-route-map.ts。");
console.log("本步骤未新增详情页。");
