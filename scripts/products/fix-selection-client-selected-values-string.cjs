const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/products/selection/ProductSelectionClient.tsx");

if (!fs.existsSync(file)) {
  console.error("找不到文件：components/products/selection/ProductSelectionClient.tsx");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(file, `${file}.bak_fix_selected_values_has_string_${stamp}`);

let text = fs.readFileSync(file, "utf8");

const oldText = "return Boolean(value && selectedValues.has(value));";
const newText = "return Boolean(value && selectedValues.has(String(value)));";

if (text.includes(oldText)) {
  text = text.replaceAll(oldText, newText);
  console.log("已替换：");
  console.log(oldText);
  console.log("改为：");
  console.log(newText);
} else if (text.includes(newText)) {
  console.log("这一处已经修过了，不重复修改。");
} else {
  console.error("没有找到目标代码：return Boolean(value && selectedValues.has(value));");
  console.error("请把 ProductSelectionClient.tsx 附近 1290-1300 行发我。");
  process.exit(1);
}

fs.writeFileSync(file, text, "utf8");

console.log("");
console.log("完成：selectedValues.has 参数类型修复。");