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

const backupPath = `${cssPath}.bak_honor_equal_spacing_${stamp}`;
fs.copyFileSync(cssPath, backupPath);

let css = fs.readFileSync(cssPath, "utf8");

const start = "/* HOME_HONOR_EQUAL_SPACING_V3_START */";
const end = "/* HOME_HONOR_EQUAL_SPACING_V3_END */";

const block = `${start}
/*
  首页资质证书等距布局
  - 每张证书占用相同宽度
  - 图片在固定区域内居中
  - PC / 平板 / 手机分别使用统一间距
*/
@media (min-width: 1025px) {
  html body .home-honor-track {
    gap: 40px !important;
  }

  html body .home-honor-card {
    flex: 0 0 220px !important;
    width: 220px !important;
    min-width: 220px !important;
    max-width: 220px !important;
  }

  html body .home-honor-image {
    width: 220px !important;
    height: 150px !important;
    flex: 0 0 150px !important;
  }

  html body .home-honor-image img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    object-fit: contain !important;
    object-position: center !important;
  }

  html body .home-honor-card strong {
    width: 100% !important;
    padding-inline: 4px;
    text-align: center;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  html body .home-honor-track {
    gap: 28px !important;
  }

  html body .home-honor-card {
    flex: 0 0 190px !important;
    width: 190px !important;
    min-width: 190px !important;
    max-width: 190px !important;
  }

  html body .home-honor-image {
    width: 190px !important;
    height: 132px !important;
    flex: 0 0 132px !important;
  }

  html body .home-honor-image img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    object-fit: contain !important;
    object-position: center !important;
  }
}

@media (max-width: 767px) {
  html body .home-honor-track {
    gap: 14px !important;
  }

  html body .home-honor-card {
    flex: 0 0 calc((100vw - 46px) / 2) !important;
    width: calc((100vw - 46px) / 2) !important;
    min-width: calc((100vw - 46px) / 2) !important;
    max-width: none !important;
  }

  html body .home-honor-image {
    width: 100% !important;
    height: 118px !important;
    flex: 0 0 118px !important;
  }

  html body .home-honor-image img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    object-fit: contain !important;
    object-position: center !important;
  }

  html body .home-honor-card strong {
    width: 100% !important;
    padding-inline: 2px;
    text-align: center;
  }
}
${end}`;

const pattern =
  /\/\* HOME_HONOR_EQUAL_SPACING_V3_START \*\/[\s\S]*?\/\* HOME_HONOR_EQUAL_SPACING_V3_END \*\//;

if (pattern.test(css)) {
  css = css.replace(pattern, block);
} else {
  css = `${css.trimEnd()}\n\n${block}\n`;
}

fs.writeFileSync(cssPath, css, "utf8");

console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
console.log("已完成首页资质证书等距调整：");
console.log("- PC：每张 220px，间距 40px");
console.log("- 平板：每张 190px，间距 28px");
console.log("- 手机：一屏两张，间距 14px");
console.log("- 图片继续保持原比例，不裁切");
console.log("");
console.log("请运行：npm run build");
