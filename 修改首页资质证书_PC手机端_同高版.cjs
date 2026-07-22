const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();

const componentPath = path.join(
  projectRoot,
  "components",
  "home",
  "HomeCompanyStrengthSection.tsx",
);
const dataPath = path.join(projectRoot, "data", "home-company-strength.ts");
const cssPath = path.join(projectRoot, "app", "globals.css");

const requiredFiles = [componentPath, dataPath, cssPath];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }
}

const honorAssets = [
  "public/images/about/foreach/honors/honor-main-certificate.webp",
  "public/images/about/foreach/honors/honor-row2-engineering-center.webp",
  "public/images/about/foreach/honors/honor-row2-little-giant.webp",
  "public/images/about/foreach/honors/honor-row2-gazelle.webp",
  "public/images/about/foreach/honors/honor-row2-iso13485.webp",
  "public/images/about/foreach/honors/honor-row2-iso9001.webp",
];

const missingAssets = honorAssets.filter(
  (relativePath) => !fs.existsSync(path.join(projectRoot, relativePath)),
);

if (missingAssets.length > 0) {
  throw new Error(
    `以下资质图片不存在，请先确认 public 素材：\n${missingAssets.join("\n")}`,
  );
}

const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const stamp = [
  now.getFullYear(),
  pad(now.getMonth() + 1),
  pad(now.getDate()),
  "_",
  pad(now.getHours()),
  pad(now.getMinutes()),
  pad(now.getSeconds()),
].join("");

function backup(filePath) {
  const backupPath = `${filePath}.bak_home_honor_certificates_${stamp}`;
  fs.copyFileSync(filePath, backupPath);
  console.log(`已备份：${path.relative(projectRoot, backupPath)}`);
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`已修改：${path.relative(projectRoot, filePath)}`);
}

requiredFiles.forEach(backup);

/* =========================================================
 * 1. 修改首页资质数据：保留 6 张代表性证书
 * ======================================================= */

let dataSource = read(dataPath);

const honorsBlockPattern =
  /  honors:\s*\[[\s\S]*?\]\s+satisfies\s+HomeCompanyHonor\[\],/;

if (!honorsBlockPattern.test(dataSource)) {
  throw new Error(
    "没有在 data/home-company-strength.ts 中找到 honors 数据块，已停止修改。",
  );
}

const newHonorsBlock = `  honors: [
    {
      key: "national-high-tech",
      title: {
        "zh-CN": "国家高新技术企业",
        en: "National High-Tech Enterprise",
        es: "Empresa nacional de alta tecnología",
        fr: "Entreprise nationale de haute technologie",
        ko: "국가 첨단기술기업",
        ru: "Национальное высокотехнологичное предприятие",
      },
    },
    {
      key: "engineering-center",
      title: {
        "zh-CN": "广东省工程技术研究中心",
        en: "Guangdong Engineering Technology Research Center",
        es: "Centro de investigación de tecnología de ingeniería de Guangdong",
        fr: "Centre de recherche en technologie d’ingénierie du Guangdong",
        ko: "광둥성 공정기술 연구센터",
        ru: "Инженерно-технологический исследовательский центр провинции Гуандун",
      },
    },
    {
      key: "little-giant",
      title: {
        "zh-CN": "国家级专精特新“小巨人”企业",
        en: "National Specialized and Innovative “Little Giant” Enterprise",
        es: "Empresa nacional especializada e innovadora «Little Giant»",
        fr: "Entreprise nationale spécialisée et innovante « Little Giant »",
        ko: "국가급 전정특신 ‘작은 거인’ 기업",
        ru: "Национальное специализированное инновационное предприятие «Малый гигант»",
      },
    },
    {
      key: "gazelle-enterprise",
      title: {
        "zh-CN": "深圳市瞪羚企业",
        en: "Shenzhen Gazelle Enterprise",
        es: "Empresa gacela de Shenzhen",
        fr: "Entreprise gazelle de Shenzhen",
        ko: "선전시 가젤 기업",
        ru: "Газель-предприятие города Шэньчжэнь",
      },
    },
    {
      key: "iso-13485",
      title: {
        "zh-CN": "ISO 13485 医疗器械质量管理体系",
        en: "ISO 13485 Medical Device Quality Management System",
        es: "Sistema de gestión de calidad de dispositivos médicos ISO 13485",
        fr: "Système de management de la qualité des dispositifs médicaux ISO 13485",
        ko: "ISO 13485 의료기기 품질경영시스템",
        ru: "Система менеджмента качества медицинских изделий ISO 13485",
      },
    },
    {
      key: "iso-9001",
      title: {
        "zh-CN": "ISO 9001 质量管理体系",
        en: "ISO 9001 Quality Management System",
        es: "Sistema de gestión de calidad ISO 9001",
        fr: "Système de management de la qualité ISO 9001",
        ko: "ISO 9001 품질경영시스템",
        ru: "Система менеджмента качества ISO 9001",
      },
    },
  ] satisfies HomeCompanyHonor[],`;

dataSource = dataSource.replace(honorsBlockPattern, newHonorsBlock);
write(dataPath, dataSource);

/* =========================================================
 * 2. 修改组件：把空白占位改成真实证书图片
 * ======================================================= */

let componentSource = read(componentPath);

const mapStart = "/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_START */";
const mapEnd = "/* HOME_HONOR_CERTIFICATE_IMAGE_MAP_END */";

const imageMapCode = `${mapStart}
const HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY: Record<string, string> = {
  "national-high-tech":
    "/images/about/foreach/honors/honor-main-certificate.webp",
  "engineering-center":
    "/images/about/foreach/honors/honor-row2-engineering-center.webp",
  "little-giant":
    "/images/about/foreach/honors/honor-row2-little-giant.webp",
  "gazelle-enterprise":
    "/images/about/foreach/honors/honor-row2-gazelle.webp",
  "iso-13485":
    "/images/about/foreach/honors/honor-row2-iso13485.webp",
  "iso-9001":
    "/images/about/foreach/honors/honor-row2-iso9001.webp",
};
${mapEnd}`;

const existingMapPattern =
  /\/\* HOME_HONOR_CERTIFICATE_IMAGE_MAP_START \*\/[\s\S]*?\/\* HOME_HONOR_CERTIFICATE_IMAGE_MAP_END \*\//;

if (existingMapPattern.test(componentSource)) {
  componentSource = componentSource.replace(existingMapPattern, imageMapCode);
} else {
  const functionCandidates = [
    "export default function HomeCompanyStrengthSection",
    "export function HomeCompanyStrengthSection",
    "function HomeCompanyStrengthSection",
  ];

  const positions = functionCandidates
    .map((text) => componentSource.indexOf(text))
    .filter((index) => index >= 0);

  if (positions.length === 0) {
    throw new Error(
      "没有定位到 HomeCompanyStrengthSection 函数，已停止修改组件。",
    );
  }

  const insertPosition = Math.min(...positions);
  componentSource =
    componentSource.slice(0, insertPosition) +
    `${imageMapCode}\n\n` +
    componentSource.slice(insertPosition);
}

const placeholderPattern =
  /<div\s+className="home-honor-image"\s+aria-hidden="true"\s*\/>/;

if (!placeholderPattern.test(componentSource)) {
  const alreadyUpdated =
    componentSource.includes("HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY[honor.key]");

  if (!alreadyUpdated) {
    throw new Error(
      "没有找到 home-honor-image 空白占位标签，且组件也不是已修改状态。",
    );
  }
} else {
  const realImageMarkup = `<div className="home-honor-image">
                      <img
                        src={
                          HOME_HONOR_CERTIFICATE_IMAGE_BY_KEY[honor.key] ??
                          "/images/about/foreach/honors/honor-main-certificate.webp"
                        }
                        alt={getHomeCompanyText(honor.title, locale)}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>`;

  componentSource = componentSource.replace(
    placeholderPattern,
    realImageMarkup,
  );
}

write(componentPath, componentSource);

/* =========================================================
 * 3. 追加 PC + 手机端覆盖样式
 * ======================================================= */

let cssSource = read(cssPath);

const cssStart = "/* HOME_HONOR_CERTIFICATES_V1_START */";
const cssEnd = "/* HOME_HONOR_CERTIFICATES_V1_END */";

const cssBlock = `${cssStart}
/*
  首页公司资质证书
  PC：自动横向循环
  手机：双卡可滑动，不自动播放
*/
.home-honor-carousel-section {
  width: 100%;
  margin-top: 32px;
}

.home-honor-carousel-mask {
  width: 100%;
  overflow: hidden;
  padding: 6px 0 4px;
}

.home-honor-track {
  display: flex !important;
  align-items: stretch;
  gap: 24px !important;
  width: max-content;
  min-width: max-content;
  animation: homeHonorCertificatesMarquee 38s linear infinite !important;
  will-change: transform;
}

.home-honor-carousel-mask:hover .home-honor-track {
  animation-play-state: paused !important;
}

.home-honor-card {
  flex: 0 0 clamp(176px, 12.8vw, 208px) !important;
  width: clamp(176px, 12.8vw, 208px) !important;
  min-width: 0 !important;
  height: 198px !important;
  display: flex !important;
  flex-direction: column;
  gap: 12px;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}

.home-honor-image {
  width: 100%;
  height: 142px !important;
  flex: 0 0 142px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff !important;
  border: 1px solid rgba(23, 51, 104, 0.14);
  border-radius: 0 !important;
}

.home-honor-image img {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px;
  object-fit: contain;
  object-position: center;
}

.home-honor-card strong {
  height: 44px;
  min-height: 44px;
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  color: #173368;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.45;
  text-align: center;
}

@keyframes homeHonorCertificatesMarquee {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(calc(-50% - 12px), 0, 0);
  }
}

@media (max-width: 1024px) {
  .home-honor-track {
    gap: 18px !important;
  }

  .home-honor-card {
    flex-basis: 178px !important;
    width: 178px !important;
    height: 188px !important;
  }

  .home-honor-image {
    height: 132px !important;
    flex-basis: 132px;
  }
}

@media (max-width: 767px) {
  .home-honor-carousel-section {
    margin-top: 22px;
  }

  .home-honor-carousel-mask {
    overflow-x: auto !important;
    overflow-y: hidden;
    padding: 4px 16px 8px;
    margin-inline: -16px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .home-honor-carousel-mask::-webkit-scrollbar {
    display: none;
  }

  .home-honor-track {
    gap: 12px !important;
    padding-right: 16px;
    animation: none !important;
    transform: none !important;
    will-change: auto;
  }

  .home-honor-card {
    flex: 0 0 calc((100vw - 56px) / 2) !important;
    width: calc((100vw - 56px) / 2) !important;
    max-width: 176px;
    height: 164px !important;
    gap: 9px;
    scroll-snap-align: start;
  }

  /* 手机端只保留第一组，隐藏为 PC 无缝轮播复制出的第二组 */
  .home-honor-card:nth-child(n + 7) {
    display: none !important;
  }

  .home-honor-image {
    height: 118px !important;
    flex-basis: 118px;
  }

  .home-honor-image img {
    padding: 7px;
  }

  .home-honor-card strong {
    height: 37px;
    min-height: 37px;
    font-size: 12px;
    line-height: 1.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-honor-track {
    animation: none !important;
    transform: none !important;
  }
}
${cssEnd}`;

const cssPattern =
  /\/\* HOME_HONOR_CERTIFICATES_V1_START \*\/[\s\S]*?\/\* HOME_HONOR_CERTIFICATES_V1_END \*\//;

if (cssPattern.test(cssSource)) {
  cssSource = cssSource.replace(cssPattern, cssBlock);
} else {
  cssSource = `${cssSource.trimEnd()}\n\n${cssBlock}\n`;
}

write(cssPath, cssSource);

console.log("");
console.log("首页资质证书区域修改完成：");
console.log("1. PC 端显示真实证书并自动横向循环");
console.log("2. 手机端改为双卡横向滑动");
console.log("3. 已复用 public 中现有 6 张资质图片");
console.log("4. 原文件均已自动备份");
console.log("");
console.log("下一步请运行：npm run build");
