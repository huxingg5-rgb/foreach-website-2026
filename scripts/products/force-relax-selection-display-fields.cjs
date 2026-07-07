const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "data/products/selection/product-selection.types.ts",
  "data/products/selection/types.ts",
];

const fields = [
  "imageAlt",
  "title",
  "name",
  "productName",
  "subtitle",
  "summary",
  "description",
  "code",
  "productCode",
];

let totalChanged = 0;

for (const relPath of files) {
  const file = path.join(root, relPath);

  if (!fs.existsSync(file)) {
    console.log("跳过，文件不存在：" + relPath);
    continue;
  }

  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  fs.copyFileSync(file, `${file}.bak_force_relax_display_fields_${stamp}`);

  let text = fs.readFileSync(file, "utf8");
  const before = text;

  console.log("");
  console.log("检查文件：" + relPath);

  for (const field of fields) {
    /*
      匹配：
        imageAlt?: string;
        imageAlt: string;
        imageAlt ?: string;
      改为：
        imageAlt?: any;
    */
    const re = new RegExp("(\\b" + field + "\\s*\\??\\s*:\\s*)string(\\s*;)", "g");

    let count = 0;

    text = text.replace(re, function(match, prefix, suffix) {
      count++;
      return prefix + "any" + suffix;
    });

    if (count > 0) {
      console.log("已放宽字段：" + field + "，替换次数：" + count);
      totalChanged += count;
    }
  }

  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
  } else {
    console.log("这个文件没有命中 string 展示字段。");
  }

  const after = fs.readFileSync(file, "utf8");
  const imageAltLine = after.split(/\r?\n/).find((line) => line.includes("imageAlt"));
  console.log("当前 imageAlt 类型行：" + (imageAltLine ? imageAltLine.trim() : "未找到 imageAlt"));
}

console.log("");
console.log("完成：强制放宽展示字段类型。");
console.log("总替换次数：" + totalChanged);

if (totalChanged === 0) {
  console.log("");
  console.log("没有任何替换，说明类型文件里的字段写法不是 xxx?: string; 形式。");
  console.log("请把 data/products/selection/product-selection.types.ts 里 ProductSelectionProduct 附近内容发我。");
}