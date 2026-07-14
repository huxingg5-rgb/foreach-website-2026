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

const backupPath = `${cssPath}.bak_mobile_honor_swipe_${stamp}`;
fs.copyFileSync(cssPath, backupPath);

let css = fs.readFileSync(cssPath, "utf8");

const start = "/* HOME_HONOR_MOBILE_SWIPE_V4_START */";
const end = "/* HOME_HONOR_MOBILE_SWIPE_V4_END */";

const block = `${start}
/*
  首页资质证书：手机端手指左右滑动
  PC / 平板原样保留，仅覆盖 767px 以下。
*/
@media (max-width: 767px) {
  html body .home-honor-carousel-section {
    width: 100% !important;
    overflow: visible !important;
  }

  html body .home-honor-carousel-mask {
    display: block !important;
    width: calc(100% + 32px) !important;
    max-width: none !important;
    margin-inline: -16px !important;
    padding: 4px 16px 10px !important;

    overflow-x: auto !important;
    overflow-y: hidden !important;

    touch-action: pan-x !important;
    -webkit-overflow-scrolling: touch !important;
    overscroll-behavior-x: contain !important;

    scroll-snap-type: x proximity !important;
    scroll-behavior: smooth;

    scrollbar-width: none !important;
    cursor: grab;
  }

  html body .home-honor-carousel-mask:active {
    cursor: grabbing;
  }

  html body .home-honor-carousel-mask::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  html body .home-honor-track {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: stretch !important;

    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;

    margin: 0 !important;
    padding: 0 16px 0 0 !important;

    animation: none !important;
    transform: none !important;
    will-change: auto !important;

    pointer-events: auto !important;
  }

  html body .home-honor-card {
    flex-shrink: 0 !important;
    scroll-snap-align: start !important;
    scroll-snap-stop: normal !important;
  }

  html body .home-honor-image,
  html body .home-honor-image img,
  html body .home-honor-card strong {
    pointer-events: none !important;
    user-select: none !important;
    -webkit-user-select: none !important;
  }

  html body .home-honor-image img {
    -webkit-user-drag: none !important;
  }

  /* 手机端只显示第一组 6 张，避免重复内容继续出现在滑动列表中 */
  html body .home-honor-card:nth-child(n + 7) {
    display: none !important;
  }
}
${end}`;

const pattern =
  /\/\* HOME_HONOR_MOBILE_SWIPE_V4_START \*\/[\s\S]*?\/\* HOME_HONOR_MOBILE_SWIPE_V4_END \*\//;

if (pattern.test(css)) {
  css = css.replace(pattern, block);
} else {
  css = `${css.trimEnd()}\n\n${block}\n`;
}

fs.writeFileSync(cssPath, css, "utf8");

console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
console.log("已启用手机端资质证书手指左右滑动：");
console.log("- overflow-x: auto");
console.log("- touch-action: pan-x");
console.log("- iOS 惯性滚动");
console.log("- 隐藏滚动条");
console.log("- 保留第一组 6 张证书");
console.log("");
console.log("请运行：npm run build");
