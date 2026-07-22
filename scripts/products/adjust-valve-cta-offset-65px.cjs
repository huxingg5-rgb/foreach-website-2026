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

const backup = `${pagePath}.bak_adjust_valve_cta_offset_65_${stamp()}`;
fs.copyFileSync(pagePath, backup);

let text = fs.readFileSync(pagePath, "utf8");

/*
  阀系列 CTA 间距微调：
  -200px 太多，会压住蓝色区域文字
  -90px 仍然偏高
  -40px 又略空
  当前根据截图调整为 -65px
*/
text = text
  .replace(/VALVE_DETAIL_CTA_OFFSET_200PX/g, "VALVE_DETAIL_CTA_OFFSET_65PX")
  .replace(/VALVE_DETAIL_CTA_OFFSET_90PX/g, "VALVE_DETAIL_CTA_OFFSET_65PX")
  .replace(/VALVE_DETAIL_CTA_OFFSET_SAFE_40PX/g, "VALVE_DETAIL_CTA_OFFSET_65PX")
  .replace(/margin-top:\s*-\d+px\s*!important;/g, "margin-top: -65px !important;")
  .replace(/上移\s*\d+px/g, "上移 65px")
  .replace(/\d+px 上移修正/g, "65px 上移修正")
  .replace(/底部 CTA 上移\s*\d+px/g, "底部 CTA 上移 65px");

fs.writeFileSync(pagePath, text, "utf8");

console.log("已将阀系列底部 CTA 上移距离调整为 -65px。");
console.log("备份文件：" + path.relative(root, backup));
console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");