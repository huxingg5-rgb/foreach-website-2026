const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_get_visible_filter_labels_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const oldPattern = /function getVisibleFilterLabels\(productTypeId: string\) \{\r?\n[\s\S]*?\r?\n\}/;

const newFunction = `function getVisibleFilterLabels(productTypeId: string): ProductSelectionFilterLabel[] {
  return selectionFilterLabels
    .filter((item): item is ProductSelectionFilterLabel => {
      const label = item as any;

      return Boolean(
        label &&
          typeof label === "object" &&
          label.productTypeId === productTypeId &&
          label.visible
      );
    })
    .sort((current, next) => {
      const currentSortOrder = Number((current as any).sortOrder ?? 0);
      const nextSortOrder = Number((next as any).sortOrder ?? 0);

      return currentSortOrder - nextSortOrder;
    });
}`;

if (!oldPattern.test(text)) {
  console.error("没有找到 function getVisibleFilterLabels(productTypeId: string)，请把该函数附近代码发我。");
  process.exit(1);
}

text = text.replace(oldPattern, newFunction);

fs.writeFileSync(file, text, "utf8");

console.log("已修复 getVisibleFilterLabels：");
console.log("- 排除字符串筛选项");
console.log("- visible 使用安全读取");
console.log("- sortOrder 使用安全读取");
console.log("- 返回类型限定为 ProductSelectionFilterLabel[]");