const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const sourceRoot =
  "C:\\Users\\Administrator\\Desktop\\新建文件夹\\新建文件夹";

const componentPath = path.join(
  projectRoot,
  "components",
  "home",
  "HomeCompanyStrengthSection.tsx",
);
const cssPath = path.join(projectRoot, "app", "globals.css");
const outputDir = path.join(
  projectRoot,
  "public",
  "images",
  "home",
  "company-honors-original",
);

const assets = [
  {
    key: "national-high-tech",
    source: "企业微信截图_1782786622146.png",
    output: "national-high-tech.png",
  },
  {
    key: "engineering-center",
    source: "企业微信截图_17827868047731.png",
    output: "engineering-center.png",
  },
  {
    key: "little-giant",
    source: "企业微信截图_17827873913852.png",
    output: "little-giant.png",
  },
  {
    key: "gazelle-enterprise",
    source: "企业微信截图_17827870785459.png",
    output: "gazelle-enterprise.png",
  },
  {
    key: "iso-13485",
    source: "企业微信截图_17827876551057.png",
    output: "iso-13485.png",
  },
  {
    key: "iso-9001",
    source: "企业微信截图_17827877084373.png",
    output: "iso-9001.png",
  },
];

for (const filePath of [componentPath, cssPath]) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }
}

if (!fs.existsSync(sourceRoot)) {
  throw new Error(`未找到证书源图目录：${sourceRoot}`);
}

for (const asset of assets) {
  const sourcePath = path.join(sourceRoot, asset.source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`未找到证书源图：${sourcePath}`);
  }
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp =
  `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
  `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

function backup(filePath) {
  const backupPath = `${filePath}.bak_home_honor_original_${stamp}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
}

backup(componentPath);
backup(cssPath);

fs.mkdirSync(outputDir, { recursive: true });

for (const asset of assets) {
  const sourcePath = path.join(sourceRoot, asset.source);
  const outputPath = path.join(outputDir, asset.output);
  fs.copyFileSync(sourcePath, outputPath);
  console.log(`已复制原色证书：${path.relative(projectRoot, outputPath)}`);
}

/* =========================================================
 * 1. 强制把组件图片映射改为桌面原始彩色 PNG
 * ======================================================= */

let componentSource = fs.readFileSync(componentPath, "utf8");

const mapStart = "/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_START */";
const mapEnd = "/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_END */";

const mapCode = `${mapStart}
const HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY: Record<string, string> = {
  "national-high-tech":
    "/images/home/company-honors-original/national-high-tech.png",
  "engineering-center":
    "/images/home/company-honors-original/engineering-center.png",
  "little-giant":
    "/images/home/company-honors-original/little-giant.png",
  "gazelle-enterprise":
    "/images/home/company-honors-original/gazelle-enterprise.png",
  "iso-13485":
    "/images/home/company-honors-original/iso-13485.png",
  "iso-9001":
    "/images/home/company-honors-original/iso-9001.png",
};
${mapEnd}`;

const mapPattern =
  /\/\* HOME_HONOR_CERTIFICATE_IMAGE_MAP_START \*\/[\s\S]*?\/\* HOME_HONOR_CERTIFICATE_IMAGE_MAP_END \*\//;

if (mapPattern.test(componentSource)) {
  componentSource = componentSource.replace(mapPattern, mapCode);
} else {
  const functionNames = [
    "export default function HomeCompanyStrengthSection",
    "export function HomeCompanyStrengthSection",
    "function HomeCompanyStrengthSection",
  ];

  const positions = functionNames
    .map((name) => componentSource.indexOf(name))
    .filter((index) => index >= 0);

  if (positions.length === 0) {
    throw new Error("没有找到 HomeCompanyStrengthSection 函数。");
  }

  const insertAt = Math.min(...positions);
  componentSource =
    componentSource.slice(0, insertAt) +
    `${mapCode}\n\n` +
    componentSource.slice(insertAt);
}

/* 如果组件仍然是空白占位，则直接替换成真实图片 */
const placeholderPattern =
  /<div\s+className="home-honor-image"\s+aria-hidden="true"\s*\/>/;

if (placeholderPattern.test(componentSource)) {
  componentSource = componentSource.replace(
    placeholderPattern,
    `<div className="home-honor-image">
                      <img
                        src={
                          HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY[honor.key] ??
                          "/images/home/company-honors-original/national-high-tech.png"
                        }
                        alt={getHomeCompanyText(honor.title, locale)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>`,
  );
}

fs.writeFileSync(componentPath, componentSource, "utf8");
console.log(
  `已修改图片映射：${path.relative(projectRoot, componentPath)}`,
);

/* =========================================================
 * 2. 追加最终覆盖样式
 *    重点：
 *    - 不显示任何白色卡片底
 *    - 不显示边框、阴影、伪元素
 *    - 不使用灰度或透明度
 *    - 图片不再带 padding
 * ======================================================= */

let cssSource = fs.readFileSync(cssPath, "utf8");

const cssStart = "/* HOME_HONOR_ORIGINAL_COLOR_NO_PANEL_V2_START */";
const cssEnd = "/* HOME_HONOR_ORIGINAL_COLOR_NO_PANEL_V2_END */";

const cssBlock = `${cssStart}
/*
  首页资质最终覆盖：
  使用原始彩色 PNG，不显示白色卡片底。
*/
html body .home-honor-carousel-section,
html body .home-honor-carousel-mask,
html body .home-honor-track,
html body .home-honor-card,
html body .home-honor-image {
  opacity: 1 !important;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html body .home-honor-carousel-section,
html body .home-honor-carousel-mask,
html body .home-honor-track,
html body .home-honor-card,
html body .home-honor-image,
html body .home-honor-card::before,
html body .home-honor-card::after,
html body .home-honor-image::before,
html body .home-honor-image::after {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: 0 !important;
  box-shadow: none !important;
}

html body .home-honor-card::before,
html body .home-honor-card::after,
html body .home-honor-image::before,
html body .home-honor-image::after {
  content: none !important;
  display: none !important;
}

html body .home-honor-image {
  height: 142px !important;
  flex: 0 0 142px !important;
  padding: 0 !important;
  overflow: visible !important;
}

html body .home-honor-image img {
  display: block !important;
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: auto !important;
  padding: 0 !important;
  object-fit: contain !important;
  object-position: center !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  opacity: 1 !important;
  filter: none !important;
  -webkit-filter: none !important;
  mix-blend-mode: normal !important;
}

@media (max-width: 1024px) {
  html body .home-honor-image {
    height: 132px !important;
    flex-basis: 132px !important;
  }
}

@media (max-width: 767px) {
  html body .home-honor-image {
    height: 118px !important;
    flex-basis: 118px !important;
  }
}
${cssEnd}`;

const cssPattern =
  /\/\* HOME_HONOR_ORIGINAL_COLOR_NO_PANEL_V2_START \*\/[\s\S]*?\/\* HOME_HONOR_ORIGINAL_COLOR_NO_PANEL_V2_END \*\//;

if (cssPattern.test(cssSource)) {
  cssSource = cssSource.replace(cssPattern, cssBlock);
} else {
  cssSource = `${cssSource.trimEnd()}\n\n${cssBlock}\n`;
}

fs.writeFileSync(cssPath, cssSource, "utf8");
console.log(`已追加最终样式：${path.relative(projectRoot, cssPath)}`);

console.log("");
console.log("修改完成：");
console.log("1. 已停用原来带白底、灰色效果的旧 WebP 证书");
console.log("2. 已改用桌面目录中的原始彩色 PNG");
console.log("3. 已去除卡片、图片容器、伪元素的白底和边框");
console.log("4. 已去除图片 padding、灰度、透明度和滤镜");
console.log("");
console.log("请运行：npm run build");
