const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "data/products/selection/product-selection.types.ts",
  "data/products/selection/types.ts",
];

let changedFiles = 0;

for (const relPath of files) {
  const file = path.join(root, relPath);

  if (!fs.existsSync(file)) {
    console.log("跳过，文件不存在：" + relPath);
    continue;
  }

  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  fs.copyFileSync(file, `${file}.bak_relax_description_type_${stamp}`);

  let text = fs.readFileSync(file, "utf8");
  const before = text;

  /*
    修复原因：
    tubing-selection.generated.ts 里的 description 是：
      { zh: string; en: string; }
    但 ProductSelectionProduct 里 description 之前被定义成 string。

    生成数据是合理的，不改 generated 数据。
    这里把 description 类型放宽为 any，兼容 string 和多语言对象。
  */
  text = text.replace(/description\??:\s*string\s*;/g, "description?: any;");

  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    changedFiles++;
    console.log("已放宽 description 类型：" + relPath);
  } else {
    console.log("未发现 description?: string; ：" + relPath);
  }
}

console.log("");
console.log("完成：已放宽 ProductSelectionProduct.description 类型。");
console.log("修改文件数量：" + changedFiles);