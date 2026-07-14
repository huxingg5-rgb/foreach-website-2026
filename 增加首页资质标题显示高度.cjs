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

const backupPath = `${cssPath}.bak_honor_title_more_lines_${stamp}`;
fs.copyFileSync(cssPath, backupPath);

let css = fs.readFileSync(cssPath, "utf8");

const start = "/* HOME_HONOR_TITLE_MORE_LINES_V5_START */";
const end = "/* HOME_HONOR_TITLE_MORE_LINES_V5_END */";

const block = `${start}
/*
  首页资质证书标题区域加高
  英文标题最多显示 4 行，避免被原固定高度裁掉。
*/
@media (min-width: 1025px) {
  html body .home-honor-card {
    height: 242px !important;
  }

  html body .home-honor-card strong {
    display: -webkit-box !important;
    width: 100% !important;
    height: 80px !important;
    min-height: 80px !important;
    max-height: 80px !important;
    padding: 0 4px !important;
    overflow: hidden !important;

    font-size: 14px !important;
    line-height: 1.4 !important;
    font-weight: 500 !important;
    text-align: center !important;

    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 4 !important;
    line-clamp: 4 !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  html body .home-honor-card {
    height: 224px !important;
  }

  html body .home-honor-card strong {
    display: -webkit-box !important;
    width: 100% !important;
    height: 74px !important;
    min-height: 74px !important;
    max-height: 74px !important;
    padding: 0 3px !important;
    overflow: hidden !important;

    font-size: 13px !important;
    line-height: 1.4 !important;
    text-align: center !important;

    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 4 !important;
    line-clamp: 4 !important;
  }
}

@media (max-width: 767px) {
  html body .home-honor-card {
    height: 188px !important;
  }

  html body .home-honor-card strong {
    display: -webkit-box !important;
    width: 100% !important;
    height: 58px !important;
    min-height: 58px !important;
    max-height: 58px !important;
    padding: 0 2px !important;
    overflow: hidden !important;

    font-size: 12px !important;
    line-height: 1.35 !important;
    text-align: center !important;

    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 4 !important;
    line-clamp: 4 !important;
  }
}
${end}`;

const pattern =
  /\/\* HOME_HONOR_TITLE_MORE_LINES_V5_START \*\/[\s\S]*?\/\* HOME_HONOR_TITLE_MORE_LINES_V5_END \*\//;

if (pattern.test(css)) {
  css = css.replace(pattern, block);
} else {
  css = `${css.trimEnd()}\n\n${block}\n`;
}

fs.writeFileSync(cssPath, css, "utf8");

console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
console.log("已增加首页资质标题显示区域：");
console.log("- PC：标题区 80px，最多 4 行");
console.log("- 平板：标题区 74px，最多 4 行");
console.log("- 手机：标题区 58px，最多 4 行");
console.log("- 同一端内卡片仍保持同高");
console.log("");
console.log("请运行：npm run build");
