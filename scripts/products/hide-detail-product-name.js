const fs = require("fs");
const path = require("path");

const file = path.join(
  process.cwd(),
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

let content = fs.readFileSync(file, "utf8");

/*
  只隐藏详情页顶部的通用产品名称：
  <div className={styles.productName}>{data.name}</div>

  不改 data.name 数据源；
  不改详情页长文；
  不改产品中心卡片；
  不改图片 alt。
*/
const before = content;

content = content.replace(
  /\s*<div className=\{styles\.productName\}>\{data\.name\}<\/div>\r?\n/,
  "\n"
);

if (content === before) {
  console.warn("没有找到 productName 渲染行，可能已经删除过。");
} else {
  fs.writeFileSync(file, content, "utf8");
  console.log("已隐藏详情页顶部 productName，只保留型号标题。");
}
