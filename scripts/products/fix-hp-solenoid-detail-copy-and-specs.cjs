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
  console.error("找不到文件：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

backup(jsonPath, "fix_hp_sv_copy_specs_like_mrv3");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const hp = details.find((detail) => detail.slug === "high-pressure-valves");
const sv = details.find((detail) => detail.slug === "solenoid-valves");

if (!hp) {
  console.error("没有找到 slug = high-pressure-valves 的高压阀数据。");
  process.exit(1);
}

if (!sv) {
  console.error("没有找到 slug = solenoid-valves 的电磁阀数据。");
  process.exit(1);
}

/* =========================================================
   1. HP 高压阀详情页
   思路对齐 MRV3：
   - H1 不写过长参数堆叠
   - 正文写高压、三位七通、25MPa、10-32UNF、0.8μL、0.4mm 等核心信息
   - 常见应用短词组
   - specs 只写规格书参数
========================================================= */

hp.title = "HP 三位七通高压阀";
hp.name = "HP 三位七通高压阀";
hp.productName = "HP 三位七通高压阀";
hp.modelName = "HP 三位七通高压阀";
hp.h1Title = "HP 三位七通高压阀";
hp.pageTitle = "HP 三位七通高压阀";

hp.seoTitle = "HP三位七通高压阀｜25MPa高压流路切换阀｜恒永达 FOREACH";
hp.seoDescription =
  "HP三位七通高压阀用于HPLC自动进样、高压流路切换、系统排气和高压分析液路模块，最大工作压力25MPa，接口10-32UNF，通道直径0.4mm，内体积0.8μL。";

hp.description =
  "HP 三位七通高压阀是一款用于高压分析液路路径切换的高压阀，可在进样、抽样、排气和旁路等液路状态之间进行切换。产品适用于 HPLC 自动进样模块、分析仪器高压流路模块和需要低内体积切换的高压微流路系统。规格书参数包含最大工作压力 25MPa、接口规格 10-32UNF、通道直径 0.4mm、内体积 0.8μL、相邻流道切换时间 100ms，适合对压力、密封、阀位切换和滞留体积有明确要求的仪器集成项目。";

hp.commonApplications = [
  "HPLC自动进样",
  "高压流路切换",
  "系统排气",
  "样品旁路",
  "高压分析模块",
  "低内体积液路"
];

hp.advantages = [
  "最大工作压力 25MPa，适合高压分析液路和 HPLC 自动进样场景",
  "三位七通结构，可覆盖进样、抽样、排气等多种液路状态切换",
  "通道直径 0.4mm，内体积 0.8μL，适合低滞留体积高压流路",
  "接口规格 10-32UNF，适配常见高压分析仪器液路连接方式",
  "SUS316L 定子与高分子转子组合，兼顾高压密封和流路切换",
  "相邻流道切换时间 100ms，便于自动化仪器控制节拍设计"
];

/*
  HP 规格表：按规格书参数写。
  不加“产品类型 / 配置方式”等自编字段。
*/
hp.specs = [
  { label: "产品型号", value: "HP-37SSU3204" },
  { label: "额定电压", value: "24V" },
  { label: "额定电流", value: "2A" },
  { label: "额定功率", value: "48W" },
  { label: "电机减速比", value: "5:1" },
  { label: "规格参数", value: "三位七通" },
  { label: "外形尺寸", value: "长×宽×高：42mm×42mm×123.5mm" },
  { label: "安装尺寸及螺纹参数", value: "定位（长×宽)：19mm×20mm 、定形（螺纹规格×螺纹深度）：M3×10mm" },
  { label: "接口规格", value: "10-32UNF" },
  { label: "最大工作压力", value: "25MPa" },
  { label: "通道直径", value: "0.4mm" },
  { label: "相邻流道切换时间", value: "100ms" },
  { label: "使用寿命", value: "15万cycles（纯水）" },
  { label: "工作噪音", value: "＜60dB" },
  { label: "内体积", value: "0.8µL" },
  { label: "触液材料-定子", value: "SUS316L" },
  { label: "触液材料-转子", value: "高分子材料" },
  { label: "环境温度", value: "0∽40℃（无冷凝）" },
  { label: "环境湿度", value: "0-93%±3RH at 40℃（无冷凝）" },
  { label: "储运温度", value: "-40∽55℃（无结冰、无冷凝）" }
];

hp.faq = [
  {
    question: "HP 三位七通高压阀适合解决什么液路问题？",
    answer:
      "HP 高压阀适合在高压分析液路中完成进样、抽样、排气和旁路等状态切换，常用于 HPLC 自动进样和分析仪器高压液路模块。"
  },
  {
    question: "高压阀选型时需要重点确认哪些参数？",
    answer:
      "需要确认最大工作压力、接口规格、流动相或样品介质、阀位切换逻辑、内体积要求、安装尺寸和控制方式。"
  },
  {
    question: "为什么 HP 高压阀按定制配置展示？",
    answer:
      "高压阀与系统压力、接口、介质、阀位切换逻辑和整机安装空间强相关，实际项目需要结合高压液路方案确认最终配置。"
  }
];

hp.bottomCtaTitle = "需要确认 HP 高压阀压力、接口和阀位切换方案？";
hp.bottomCtaDescription =
  "请提供最大工作压力、流动相或样品介质、接口规格、进样/抽样/排气切换逻辑、内体积要求和安装空间，FOREACH 可协助确认 HP 三位七通高压阀配置。";
hp.bottomCtaButtonText = "联系工程师确认高压阀方案";
hp.bottomCtaHref = "/contact";

hp.customInquiryTitle = hp.bottomCtaTitle;
hp.customInquiryDescription = hp.bottomCtaDescription;
hp.customInquiryButtonText = hp.bottomCtaButtonText;
hp.customInquiryHref = hp.bottomCtaHref;

hp.searchKeywords = [
  "HP三位七通高压阀",
  "HP高压阀",
  "25MPa高压阀",
  "HPLC自动进样阀",
  "高压流路切换阀",
  "10-32UNF高压阀",
  "三位七通阀"
];

/* =========================================================
   2. 6010 电磁阀详情页
   思路对齐 MRV3：
   - H1 固定为：6010 系列电磁阀
   - 正文写 2/3通、摆臂隔膜阀、NO/NC/万向、-75kPa~0.25MPa、1.4mm、CV0.03
   - 常见应用短词组
   - specs 只写规格书参数
========================================================= */

sv.title = "6010 系列电磁阀";
sv.name = "6010 系列电磁阀";
sv.productName = "6010 系列电磁阀";
sv.modelName = "6010 系列电磁阀";
sv.h1Title = "6010 系列电磁阀";
sv.pageTitle = "6010 系列电磁阀";

sv.seoTitle = "6010系列电磁阀｜2通/3通摆臂隔膜阀｜恒永达 FOREACH";
sv.seoDescription =
  "6010系列电磁阀用于自动化分析仪器中的试剂通断、清洗液控制、废液控制和阀组集成，支持基板型、螺纹型、倒刺型，压力范围-75kPa~0.25MPa，孔口直径1.4mm，CV0.03。";

sv.description =
  "6010 系列电磁阀是一款用于自动化分析仪器液路通断控制的摆臂隔膜阀，覆盖基板型、螺纹型和倒刺型结构，可用于试剂路径、清洗液路径、废液路径和小型阀组模块。规格书参数包含 2通/3通结构、万向/NO/NC 阀形式、使用压力范围 -75kPa~0.25MPa、孔口直径 1.4mm、阀室内容积 20uL、流量系数 CV0.03，并支持 EPDM、FKM、FFKM 膜片材质，可根据介质兼容性、接口方式、电压和是否需要节能回路进行配置确认。";

sv.commonApplications = [
  "试剂通断控制",
  "清洗液控制",
  "废液控制",
  "阀组集成",
  "样本针清洗",
  "低压液路开关"
];

sv.advantages = [
  "基板型、螺纹型和倒刺型结构可选，适合不同仪器液路集成方式",
  "2通 / 3通结构覆盖常开、常闭和万向液路控制需求",
  "-75kPa~0.25MPa 使用压力范围，适合试剂、清洗液和废液控制场景",
  "孔口直径 1.4mm，阀室内容积 20uL，适合小型自动化液路模块",
  "EPDM、FKM、FFKM 膜片材质可选，便于按试剂兼容性确认配置",
  "可选节能回路，适合需要长时间保持状态的仪器控制场景"
];

/*
  6010 规格表：按规格书参数写。
  不加“产品类型 / 配置方式”等自编字段。
*/
sv.specs = [
  { label: "型号", value: "SV10-P / SV10-M6&U28 / SV10-B16" },
  { label: "通口数", value: "3 / 2 / 3 / 2 / 3 / 2" },
  { label: "阀形式", value: "万向 / NO / NC / 万向 / NO / NC / 万向 / NO / NC" },
  { label: "使用流体", value: "空气、水、脱离子水（纯水）、稀释液、清洗液等" },
  { label: "阀结构", value: "摆臂隔膜阀" },
  { label: "使用压力范围", value: "-75kPa~0.25MPa" },
  { label: "孔口直径", value: "1.4mm" },
  { label: "响应时间-标准型", value: "15ms以内（未接负载状态）" },
  { label: "响应时间-带节能回路", value: "25ms以内（未接负载状态）" },
  { label: "极限耐压", value: "0.38MPa" },
  { label: "使用环境温度", value: "0～50℃" },
  { label: "使用流体温度", value: "0～50℃（未冻结状态）" },
  { label: "阀室内容积", value: "20uL" },
  { label: "隔膜材质", value: "EPDM、FKM、FFKM" },
  { label: "重量", value: "30g / 39g / 29g" },
  { label: "额定电压", value: "DC 12/24V（±10%）" },
  { label: "线圈绝缘等级", value: "F级" },
  { label: "功耗-标准型", value: "2.5W（0.11A）" },
  { label: "功耗-带节电回路启动", value: "2.5W（0.11A）" },
  { label: "功耗-带节电回路保持", value: "不大于1W" },
  { label: "流量系数CV", value: "0.03" }
];

sv.faq = [
  {
    question: "6010 系列电磁阀适合解决什么液路问题？",
    answer:
      "6010 适合做自动化仪器中的液路通断控制，例如试剂路径开关、清洗液路径控制、废液路径控制和多阀阀组集成。"
  },
  {
    question: "基板型、螺纹型和倒刺型应该怎么选？",
    answer:
      "基板型适合阀组集成和紧凑安装，螺纹型适合 M6 或 1/4-28UNF 接头连接，倒刺型适合软管连接和低压液路控制。"
  },
  {
    question: "6010 电磁阀为什么按定制配置展示？",
    answer:
      "6010 涉及结构形式、通口数、阀形式、膜片材质、底板材质、阀座材质、额定电压和节能回路等组合，实际项目需要结合介质、压力、接口和控制方式确认。"
  }
];

sv.bottomCtaTitle = "需要确认 6010 电磁阀通口数、阀形式和材料？";
sv.bottomCtaDescription =
  "请提供介质类型、压力范围、通口数、NO/NC/万向阀形式、接口方式、膜片材质、电压和是否需要节能回路，FOREACH 可协助确认 6010 系列电磁阀配置。";
sv.bottomCtaButtonText = "联系工程师确认电磁阀配置";
sv.bottomCtaHref = "/contact";

sv.customInquiryTitle = sv.bottomCtaTitle;
sv.customInquiryDescription = sv.bottomCtaDescription;
sv.customInquiryButtonText = sv.bottomCtaButtonText;
sv.customInquiryHref = sv.bottomCtaHref;

sv.searchKeywords = [
  "6010电磁阀",
  "SV10电磁阀",
  "2通电磁阀",
  "3通电磁阀",
  "摆臂隔膜阀",
  "基板型电磁阀",
  "螺纹型电磁阀",
  "倒刺型电磁阀",
  "IVD电磁阀"
];

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("高压阀和电磁阀详情页已按 MRV3 思路修正：");
console.log("- HP H1：HP 三位七通高压阀");
console.log("- 6010 H1：6010 系列电磁阀");
console.log("- 正文已加入对应规格参数和液路任务");
console.log("- 规格表只保留规格书参数");
console.log("- 常见应用已缩短");

/*
  再确认 page.tsx 字段透传，不改页面结构。
*/
const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "hp_sv_field_passthrough");

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
  console.log("已确认 page.tsx 字段透传。");
}

console.log("");
console.log("请测试：");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");