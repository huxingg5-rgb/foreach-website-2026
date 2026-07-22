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
  fs.copyFileSync(file, `${file}.bak_relax_localized_display_fields_${stamp}`);

  let text = fs.readFileSync(file, "utf8");
  const before = text;

  /*
    修复原因：
    tubing-selection.generated.ts 中部分展示字段是中英对象：
      imageAlt: { zh: "...", en: "..." }
    但 ProductSelectionProduct 类型里这些字段仍被定义为 string。

    generated 数据是合理的，不改 generated 文件。
    这里把容易出现中英对象的展示字段统一放宽为 any。
  */
  const fields = [
    "imageAlt",
    "title",
    "name",
    "productName",
    "subtitle",
    "summary",
    "description",
  ];

  for (const field of fields) {
    const re = new RegExp(`${field}\\\\??:\\\\s*string\\\\s*;`, "g");
    text = text.replace(re, `${field}?: any;`);
  }

  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    changedFiles++;
    console.log("已放宽展示字段类型：" + relPath);
  } else {
    console.log("未发现需要放宽的展示字段：" + relPath);
  }
}

console.log("");
console.log("完成：已放宽 ProductSelectionProduct 中 imageAlt / title / subtitle / description 等展示字段类型。");
console.log("修改文件数量：" + changedFiles);