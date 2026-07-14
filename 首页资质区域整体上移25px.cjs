const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const cssPath = path.join(projectRoot, "app", "globals.css");

if (!fs.existsSync(cssPath)) {
  throw new Error(`未找到文件：${cssPath}`);
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp =
  `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
  `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

const backupPath = `${cssPath}.bak_honor_section_up_25px_${stamp}`;
fs.copyFileSync(cssPath, backupPath);

let css = fs.readFileSync(cssPath, "utf8");

const start = "/* HOME_HONOR_SECTION_UP_25PX_START */";
const end = "/* HOME_HONOR_SECTION_UP_25PX_END */";

const block = `${start}
/*
  首页公司资质区域整体上移 25px
  仅桌面与平板生效，避免影响手机端手指滑动区域。
*/
@media (min-width: 768px) {
  html body .home-honor-carousel-section {
    position: relative !important;
    top: -25px !important;
  }
}

@media (max-width: 767px) {
  html body .home-honor-carousel-section {
    top: auto !important;
  }
}
${end}`;

const pattern =
  /\/\* HOME_HONOR_SECTION_UP_25PX_START \*\/[\s\S]*?\/\* HOME_HONOR_SECTION_UP_25PX_END \*\//;

if (pattern.test(css)) {
  css = css.replace(pattern, block);
} else {
  css = `${css.trimEnd()}\n\n${block}\n`;
}

fs.writeFileSync(cssPath, css, "utf8");

console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
console.log("已将首页资质证书区域整体上移 25px。");
console.log("桌面和平板生效，手机端保持原位置与左右滑动。");
console.log("");
console.log("请运行：npm run build");
