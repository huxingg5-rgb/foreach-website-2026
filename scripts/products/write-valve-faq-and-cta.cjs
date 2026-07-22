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

const detailPath = abs("data/products/generated/valves/detail/index.json");

if (!fs.existsSync(detailPath)) {
  console.error("找不到阀系列详情数据：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

backup(detailPath, "valve_faq_cta");

const details = JSON.parse(fs.readFileSync(detailPath, "utf8"));

const updates = {
  "rotary-valves": {
    faq: [
      {
        question: "MRV3 适合做哪些多通道流路切换？",
        answer:
          "MRV3 适合多试剂选择、样本分配、清洗液切换和废液路径管理。对于需要 10 / 16 / 24 通道集中切换的自动化分析仪器，可减少外部阀组和管路交叉。"
      },
      {
        question: "10 通道、16 通道和 24 通道如何选择？",
        answer:
          "主要根据试剂瓶数量、清洗液数量、废液路径数量和预留端口数量确认。端口越多，越适合多试剂平台；端口较少时，结构更简单。"
      },
      {
        question: "MRV3 的内容积对液路有什么影响？",
        answer:
          "MRV3 规格包含 15.8μL、10μL、2.9μL 内容积。内容积越小，越有利于降低残留、混液和死体积风险，适合对进样稳定性敏感的液路。"
      },
      {
        question: "选型时需要提供哪些信息？",
        answer:
          "建议提供通道数量、通道直径、接口规格、介质类型、是否需要驱动器、通信方式、安装空间和阀位控制逻辑。"
      }
    ],
    bottomCtaTitle: "需要确认 MRV3 多通道旋转阀配置？",
    bottomCtaDescription:
      "请提供试剂数量、清洗路径、废液路径、目标通道数、接口规格、介质类型、驱动方式和安装空间，FOREACH 可协助确认 MRV3 陶瓷多通道旋转阀配置。",
    bottomCtaButtonText: "联系工程师确认旋转阀配置",
    bottomCtaHref: "/contact"
  },

  "high-pressure-valves": {
    faq: [
      {
        question: "HP 三位七通高压阀适合哪些高压液路？",
        answer:
          "HP 高压阀适合 HPLC 自动进样、高压样品切换、系统排气、样品旁路和分析仪器高压流路模块。"
      },
      {
        question: "25MPa 高压阀选型时最重要的参数是什么？",
        answer:
          "需要确认最大工作压力、流动相或样品介质、接口规格、阀位切换逻辑、内体积要求、安装尺寸和控制方式。"
      },
      {
        question: "0.8μL 内体积适合什么场景？",
        answer:
          "0.8μL 内体积适合对残留、滞留体积和样品扩散敏感的高压分析液路，常见于自动进样和检测前端流路切换。"
      },
      {
        question: "为什么高压阀按定制配置展示？",
        answer:
          "高压阀与系统压力、接口、介质兼容性、阀位切换状态和整机安装空间强相关，需要结合客户高压液路方案确认。"
      }
    ],
    bottomCtaTitle: "需要确认 HP 高压阀压力、接口和阀位方案？",
    bottomCtaDescription:
      "请提供最大工作压力、流动相或样品介质、10-32UNF 接口需求、进样/抽样/排气切换逻辑、内体积要求和安装空间，FOREACH 可协助确认 HP 三位七通高压阀配置。",
    bottomCtaButtonText: "联系工程师确认高压阀方案",
    bottomCtaHref: "/contact"
  },

  "solenoid-valves": {
    faq: [
      {
        question: "6010 系列电磁阀适合哪些液路控制？",
        answer:
          "6010 系列适合试剂通断、清洗液控制、废液控制、样本针清洗和小型阀组集成，常用于 IVD 与自动化分析仪器。"
      },
      {
        question: "基板型、螺纹型和倒刺型怎么选？",
        answer:
          "基板型适合阀组集成，螺纹型适合 M6 或 1/4-28UNF 接头连接，倒刺型适合软管连接和低压液路开关。"
      },
      {
        question: "EPDM、FKM、FFKM 膜片如何选择？",
        answer:
          "需要根据试剂、清洗液、温度、寿命和化学兼容性确认。常规水性介质可先评估 EPDM，耐化学性要求更高时再确认 FKM 或 FFKM。"
      },
      {
        question: "是否需要节能回路？",
        answer:
          "如果阀需要长时间保持通电状态，可评估节能回路；如果只是短时间切换，通常可根据控制节拍和功耗要求确认。"
      }
    ],
    bottomCtaTitle: "需要确认 6010 电磁阀通口数、阀形式和膜片材料？",
    bottomCtaDescription:
      "请提供介质类型、压力范围、接口方式、通口数、NO/NC/万向阀形式、膜片材质、电压和是否需要节能回路，FOREACH 可协助确认 6010 系列电磁阀配置。",
    bottomCtaButtonText: "联系工程师确认电磁阀配置",
    bottomCtaHref: "/contact"
  }
};

for (const item of details) {
  const update = updates[item.slug];
  if (!update) continue;

  item.faq = update.faq;
  item.faqs = update.faq;
  item.faqItems = update.faq;

  item.bottomCtaTitle = update.bottomCtaTitle;
  item.bottomCtaDescription = update.bottomCtaDescription;
  item.bottomCtaButtonText = update.bottomCtaButtonText;
  item.bottomCtaHref = update.bottomCtaHref;

  item.customInquiryTitle = update.bottomCtaTitle;
  item.customInquiryDescription = update.bottomCtaDescription;
  item.customInquiryButtonText = update.bottomCtaButtonText;
  item.customInquiryHref = update.bottomCtaHref;
}

fs.writeFileSync(detailPath, JSON.stringify(details, null, 2) + "\n", "utf8");
console.log("已写入 3 个阀详情页不同 FAQ 和底部 CTA 文案。");

/* =========================================================
   修复阀详情 page.tsx 字段透传
========================================================= */

const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到 app/products/valves/[slug]/page.tsx");
  process.exit(1);
}

backup(pagePath, "valve_faq_cta_passthrough");

let pageText = fs.readFileSync(pagePath, "utf8");

/*
  给 ValveDetailRecord 补可选字段，避免 TypeScript 报错。
*/
if (!pageText.includes("bottomCtaTitle?: string")) {
  pageText = pageText.replace(
    /faq:\s*\{\s*\n\s*question:\s*string;\s*\n\s*answer:\s*string;\s*\n\s*\}\[\];/,
    `faq: {
    question: string;
    answer: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  faqItems?: {
    question: string;
    answer: string;
  }[];
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

/*
  在 toClientData return 对象中补充 FAQ 与 CTA 多字段透传。
*/
if (!pageText.includes("VALVE_FAQ_CTA_PASSTHROUGH_20260708")) {
  pageText = pageText.replace(
    /sourceType:\s*"valve-detail",/,
    `/*
      VALVE_FAQ_CTA_PASSTHROUGH_20260708

      阀系列详情页使用公共 ProductDetailClient。
      为避免公共组件回退到柱塞泵 FAQ / CTA，
      这里同时传入 faq / faqs / faqItems / bottomCta / customInquiryCta 等字段。
    */
    faqs: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],
    faqItems: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],
    detailFaqs: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDescription: detail.bottomCtaDescription,
    bottomCtaButtonText: detail.bottomCtaButtonText,
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    bottomCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText,
      buttonText: detail.bottomCtaButtonText,
      href: detail.bottomCtaHref || "/contact",
    },

    customInquiryTitle: detail.customInquiryTitle || detail.bottomCtaTitle,
    customInquiryDescription:
      detail.customInquiryDescription || detail.bottomCtaDescription,
    customInquiryButtonText:
      detail.customInquiryButtonText || detail.bottomCtaButtonText,
    customInquiryHref:
      detail.customInquiryHref || detail.bottomCtaHref || "/contact",

    customInquiryCta: {
      title: detail.customInquiryTitle || detail.bottomCtaTitle,
      desc: detail.customInquiryDescription || detail.bottomCtaDescription,
      description:
        detail.customInquiryDescription || detail.bottomCtaDescription,
      button:
        detail.customInquiryButtonText || detail.bottomCtaButtonText,
      buttonText:
        detail.customInquiryButtonText || detail.bottomCtaButtonText,
      href:
        detail.customInquiryHref || detail.bottomCtaHref || "/contact",
    },

    sourceType: "valve-detail",`
  );
}

fs.writeFileSync(pagePath, pageText, "utf8");
console.log("已修复阀详情页 FAQ / CTA 字段透传。");

console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");