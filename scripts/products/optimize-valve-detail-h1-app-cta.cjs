const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

const jsonPath = abs("data/products/generated/valves/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到阀系列详情数据：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

backup(jsonPath, "h1_app_cta");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const copyMap = {
  "rotary-valves": {
    title: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    modelName: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    h1Title: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    pageTitle: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    seoTitle: "MRV3陶瓷多通道旋转阀｜10/16/24通道试剂切换阀｜恒永达 FOREACH",
    seoDescription:
      "MRV3陶瓷多通道旋转阀用于自动化分析仪器中的试剂选择、样本分配、清洗液切换和废液路径管理，支持10/16/24通道，耐压0.7MPa，内容积低至2.9μL。",
    description:
      "MRV3 10/16/24通道陶瓷多通道旋转阀用于自动化分析仪器中的多端口流路切换，可承担试剂选择、样本分配、清洗液切换和废液路径集中管理等液路任务。该系列通过电机旋转与光耦定位实现端口切换，适合需要多通道、低内容积、耐腐蚀触液材料和稳定阀位控制的 IVD、生命科学与实验室自动化设备。",
    commonApplications: [
      "IVD 分析仪中的多瓶试剂选择与公共液路切换",
      "样本针清洗模块中的清洗液、废液和排空路径切换",
      "化学发光、凝血、生化等仪器中的多试剂端口管理",
      "生命科学设备中的缓冲液、洗脱液和反应液路径选择",
      "实验室自动化平台中的样本分配、试剂分配和清洗路径管理",
      "需要降低死体积、混液风险和外部管路复杂度的多通道液路模块"
    ],
    bottomCtaTitle: "需要确认旋转阀通道数量、接口和材料？",
    bottomCtaDescription:
      "请提供试剂数量、清洗路径、废液路径、目标通道数、接口规格、介质类型和安装空间，FOREACH 可协助确认 MRV3 多通道旋转阀的通道配置、触液材料和驱动方式。",
    bottomCtaButtonText: "联系工程师确认旋转阀配置",
    bottomCtaHref: "/contact"
  },

  "high-pressure-valves": {
    title: "HP 25MPa三位七通高压阀",
    modelName: "HP 25MPa三位七通高压阀",
    h1Title: "HP 25MPa三位七通高压阀",
    pageTitle: "HP 25MPa三位七通高压阀",
    seoTitle: "HP三位七通高压阀｜25MPa高压进样与排气阀｜恒永达 FOREACH",
    seoDescription:
      "HP三位七通高压阀用于HPLC自动进样、高压流路切换、进样位/抽样位/排气位控制和分析仪器高压液路模块，支持25MPa压力、10-32UNF接口和0.8μL内体积。",
    description:
      "HP 25MPa三位七通高压阀用于高压分析液路中的进样位、抽样位、排气位和旁路状态切换，适合 HPLC 自动进样模块、分析仪器高压液路模块和对内体积敏感的高压流路系统。该页面按定制配置展示，选型时需要结合系统压力、流动相介质、接口规格、切换状态、控制方式和安装空间确认。",
    commonApplications: [
      "HPLC 自动进样模块中的进样位、抽样位和排气位切换",
      "高压泵后端到检测模块前端的高压流路路径管理",
      "分析仪器中需要 10-32UNF 接口的高压微流路切换",
      "高压样品注入、样品旁路、系统排气和冲洗状态控制",
      "对内体积、滞留体积和切换稳定性有要求的高压分析系统",
      "液相分析、样品前处理和高压流体控制相关设备集成"
    ],
    bottomCtaTitle: "需要确认高压阀压力、接口和切换状态？",
    bottomCtaDescription:
      "请提供最大工作压力、流动相或样品介质、接口规格、阀位切换逻辑、内体积要求和安装空间，FOREACH 可协助确认 HP 高压阀是否适合您的高压液路模块。",
    bottomCtaButtonText: "联系工程师确认高压阀方案",
    bottomCtaHref: "/contact"
  },

  "solenoid-valves": {
    title: "6010 2/3通摆臂隔膜电磁阀",
    modelName: "6010 2/3通摆臂隔膜电磁阀",
    h1Title: "6010 2/3通摆臂隔膜电磁阀",
    pageTitle: "6010 2/3通摆臂隔膜电磁阀",
    seoTitle: "6010系列电磁阀｜2通/3通摆臂隔膜阀｜恒永达 FOREACH",
    seoDescription:
      "6010系列电磁阀用于IVD和自动化分析仪器中的试剂通断、清洗液控制、废液路径控制和阀组集成，支持2通/3通、NO/NC/万向、基板型、螺纹型和倒刺型配置。",
    description:
      "6010 2/3通摆臂隔膜电磁阀用于自动化分析仪器中的液路通断控制，可覆盖试剂路径开关、清洗液路径开关、废液路径控制和小型化阀组集成。该系列包含基板型、螺纹型和倒刺型结构，可根据通口数、NO/NC/万向阀形式、膜片材质、阀座材质、电压和节能回路进行定制配置确认。",
    commonApplications: [
      "IVD 分析仪中的试剂路径通断控制",
      "样本针清洗模块中的清洗液进液和废液排放控制",
      "生化、免疫、凝血等仪器中的阀组集成与液路开关",
      "稀释液、缓冲液、清洗液和废液路径的独立控制",
      "螺纹接头连接的独立液路开关模块",
      "软管连接场景中的倒刺型低压液路控制"
    ],
    bottomCtaTitle: "需要确认电磁阀通口数、阀形式和膜片材料？",
    bottomCtaDescription:
      "请提供介质类型、压力范围、通口数、NO/NC/万向阀形式、接口方式、膜片材料、电压和是否需要节能回路，FOREACH 可协助确认 6010 电磁阀配置。",
    bottomCtaButtonText: "联系工程师确认电磁阀配置",
    bottomCtaHref: "/contact"
  }
};

for (const item of details) {
  const copy = copyMap[item.slug];
  if (!copy) continue;

  item.title = copy.title;
  item.modelName = copy.modelName;
  item.h1Title = copy.h1Title;
  item.pageTitle = copy.pageTitle;
  item.seoTitle = copy.seoTitle;
  item.seoDescription = copy.seoDescription;
  item.description = copy.description;
  item.commonApplications = copy.commonApplications;

  item.bottomCtaTitle = copy.bottomCtaTitle;
  item.bottomCtaDescription = copy.bottomCtaDescription;
  item.bottomCtaButtonText = copy.bottomCtaButtonText;
  item.bottomCtaHref = copy.bottomCtaHref;

  item.customInquiryTitle = copy.bottomCtaTitle;
  item.customInquiryDescription = copy.bottomCtaDescription;
  item.customInquiryButtonText = copy.bottomCtaButtonText;
  item.customInquiryHref = copy.bottomCtaHref;
}

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已优化阀系列 H1、正文、常见应用和底部联系文案。");
console.log("规格表 specs 未修改。");

/*
  修复 page.tsx：
  1. H1 优先读取 h1Title / pageTitle
  2. metadata 优先读取 seoTitle / seoDescription
  3. 给 ProductDetailClient 传 bottom CTA 字段
*/

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "h1_app_cta_page");

  let pageText = fs.readFileSync(pagePath, "utf8");

  if (!pageText.includes("h1Title?: string")) {
    pageText = pageText.replace(
      /title:\s*string;/,
      `title: string;
  h1Title?: string;
  pageTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  bottomCtaTitle?: string;
  bottomCtaDescription?: string;
  bottomCtaButtonText?: string;
  bottomCtaHref?: string;
  customInquiryTitle?: string;
  customInquiryDescription?: string;
  customInquiryButtonText?: string;
  customInquiryHref?: string;`
    );
  }

  pageText = pageText.replace(
    /title:\s*detail\.title\s*\+\s*"｜"\s*\+\s*detail\.productTypeName\s*\+\s*"｜恒永达 FOREACH",\s*description:\s*detail\.description,/,
    `title: detail.seoTitle || detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.seoDescription || detail.description,`
  );

  pageText = pageText.replace(
    /title:\s*detail\.title,\s*\n\s*name:\s*detail\.title,\s*\n\s*productName:\s*detail\.title,\s*\n\s*model:\s*detail\.title,\s*\n\s*modelName:\s*detail\.title,\s*\n\s*h1Title:\s*detail\.title,\s*\n\s*pageTitle:\s*detail\.title,/,
    `title: detail.h1Title || detail.pageTitle || detail.title,
    name: detail.h1Title || detail.pageTitle || detail.title,
    productName: detail.h1Title || detail.pageTitle || detail.title,
    model: detail.h1Title || detail.pageTitle || detail.title,
    modelName: detail.modelName || detail.h1Title || detail.pageTitle || detail.title,
    h1Title: detail.h1Title || detail.pageTitle || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,`
  );

  if (!pageText.includes("bottomCtaTitle: detail.bottomCtaTitle")) {
    pageText = pageText.replace(
      /sourceType:\s*"valve-detail",/,
      `bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDescription: detail.bottomCtaDescription,
    bottomCtaButtonText: detail.bottomCtaButtonText,
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    customInquiryTitle: detail.customInquiryTitle || detail.bottomCtaTitle,
    customInquiryDescription:
      detail.customInquiryDescription || detail.bottomCtaDescription,
    customInquiryButtonText:
      detail.customInquiryButtonText || detail.bottomCtaButtonText,
    customInquiryHref:
      detail.customInquiryHref || detail.bottomCtaHref || "/contact",

    sourceType: "valve-detail",`
    );
  }

  fs.writeFileSync(pagePath, pageText, "utf8");
  console.log("已同步修复阀详情 page.tsx 的 H1 / SEO / CTA 字段。");
} else {
  console.log("未找到 app/products/valves/[slug]/page.tsx，跳过 page 修复。");
}

console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");