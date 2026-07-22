const fs = require("fs");
const path = require("path");

const root = process.cwd();
const pagePath = path.join(root, "app/products/[category]/[slug]/page.tsx");

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

if (!fs.existsSync(pagePath)) {
  console.error("找不到通用路由文件：app/products/[category]/[slug]/page.tsx");
  process.exit(1);
}

const backupPath = `${pagePath}.bak_add_tubing_static_params_${stamp()}`;
fs.copyFileSync(pagePath, backupPath);

let text = fs.readFileSync(pagePath, "utf8");

const tubingParamsText = `
const tubingStaticParams = [
  { category: "tubing", slug: "pvc-tubing" },
  { category: "tubing", slug: "tpu-tubing" },
  { category: "tubing", slug: "fep-tubing" },
  { category: "tubing", slug: "ptfe-tubing" },
  { category: "tubing", slug: "peek-tubing" },
  { category: "tubing", slug: "pfa-tubing" },
];
`;

if (!text.includes("tubingStaticParams")) {
  const insertBefore = text.indexOf("export function generateStaticParams");
  const insertBeforeAsync = text.indexOf("export async function generateStaticParams");
  const pos = insertBefore >= 0 ? insertBefore : insertBeforeAsync;

  if (pos < 0) {
    console.error("没有找到 generateStaticParams，请把 app/products/[category]/[slug]/page.tsx 发我。");
    process.exit(1);
  }

  text = text.slice(0, pos) + tubingParamsText + "\n" + text.slice(pos);
}

if (text.includes("...tubingStaticParams")) {
  console.log("通用路由里已经包含 tubingStaticParams，不重复添加。");
} else {
  const returnArrayRegex = /return\s*\[([\s\S]*?)\]\s*;/m;

  if (!returnArrayRegex.test(text)) {
    console.error("generateStaticParams 不是简单 return [] 结构，需要看实际文件。");
    console.error("请把 app/products/[category]/[slug]/page.tsx 内容发我。");
    process.exit(1);
  }

  text = text.replace(returnArrayRegex, (match, inner) => {
    return `return [${inner.trimEnd()}${inner.trim() ? "," : ""}
    ...tubingStaticParams,
  ];`;
  });
}

fs.writeFileSync(pagePath, text, "utf8");

console.log("已修复通用动态路由 generateStaticParams。");
console.log("备份文件：" + path.relative(root, backupPath));
console.log("");
console.log("已加入：");
console.log("/products/tubing/pvc-tubing");
console.log("/products/tubing/tpu-tubing");
console.log("/products/tubing/fep-tubing");
console.log("/products/tubing/ptfe-tubing");
console.log("/products/tubing/peek-tubing");
console.log("/products/tubing/pfa-tubing");