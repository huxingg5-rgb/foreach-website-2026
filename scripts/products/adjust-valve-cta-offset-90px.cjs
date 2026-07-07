const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

const pagePath = path.join(root, "app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到文件：app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

const backup = `${pagePath}.bak_adjust_valve_cta_offset_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

/*
  阀系列底部 CTA 间距调整：
  之前 -200px 上移过多。
  现在调整为 -90px，减少空白但不贴得太近。
*/
text = text
  .replace(/VALVE_DETAIL_CTA_OFFSET_200PX/g, "VALVE_DETAIL_CTA_OFFSET_90PX")
  .replace(/margin-top:\s*-200px\s*!important;/g, "margin-top: -90px !important;")
  .replace(/上移 200px/g, "上移 90px")
  .replace(/200px 上移修正/g, "90px 上移修正")
  .replace(/底部 CTA 上移 200px/g, "底部 CTA 上移 90px");

fs.writeFileSync(pagePath, text, "utf8");

console.log("已将阀系列底部 CTA 上移距离从 200px 调整为 90px。");
console.log("备份文件：" + path.relative(root, backup));
console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");