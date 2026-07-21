const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function read(rel) {
  return fs.readFileSync(p(rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("已修改:", rel);
}

function backup(rel, suffix) {
  const full = p(rel);
  if (!fs.existsSync(full)) return;
  const bak = full + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + suffix);
  }
}

function findFunctionEnd(text, startIndex) {
  const openIndex = text.indexOf("{", startIndex);
  if (openIndex === -1) return -1;

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") depth--;

    if (depth === 0) return i + 1;
  }

  return -1;
}

/**
 * 1. 修复详情 JSON：FAQ 字段别名 + 底部 CTA 字段别名
 */
const jsonRel = "data/products/generated/pumps/syringe-pumps/detail/index.json";

if (!fs.existsSync(p(jsonRel))) {
  console.error("未找到:", jsonRel);
  process.exit(1);
}

backup(jsonRel, ".bak.faq-cta");

const details = JSON.parse(read(jsonRel));

const bottomCta = {
  title: "注射泵可根据您的液路与结构需求进行定制",
  desc: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
  description: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
  button: "提交定制需求",
  buttonText: "提交定制需求",
  href: "/contact"
};

for (const item of details) {
  const faq = Array.isArray(item.faq) ? item.faq : [];

  const normalizedFaq = faq.map((x) => ({
    question: x.question || x.title || "",
    answer: x.answer || x.content || "",
    title: x.question || x.title || "",
    content: x.answer || x.content || "",
  }));

  item.faq = normalizedFaq;
  item.faqs = normalizedFaq;
  item.faqItems = normalizedFaq;
  item.faqList = normalizedFaq;

  item.showFaq = true;
  item.showFaqs = true;
  item.faqTitle = "常见问题";
  item.faqSectionTitle = "常见问题";

  item.bottomCta = bottomCta;
  item.customCta = bottomCta;
  item.customInquiryCta = bottomCta;
  item.bottomCustomCta = bottomCta;

  item.showBottomCta = true;
  item.showCustomInquiryCta = true;

  item.isCustomOnly = true;
  item.isCustomInquiry = true;
  item.detailMode = "custom_inquiry";
  item.customInquiryHref = "/contact";
  item.contactHref = "/contact";
}

write(jsonRel, JSON.stringify(details, null, 2));

/**
 * 2. 修复详情路由：把 FAQ / CTA 字段传给 ProductDetailClient
 */
const pageRel = "app/products/pumps/syringe-pumps/[slug]/page.tsx";

if (fs.existsSync(p(pageRel))) {
  let page = read(pageRel);

  if (!page.includes("faqItems: Array.isArray((detail as any).faqItems)")) {
    backup(pageRel, ".bak.faq-cta");

    page = page.replace(
      `additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],`,
      `faq: Array.isArray((detail as any).faq) ? (detail as any).faq : [],
    faqs: Array.isArray((detail as any).faqs)
      ? (detail as any).faqs
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],
    faqItems: Array.isArray((detail as any).faqItems)
      ? (detail as any).faqItems
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],
    faqList: Array.isArray((detail as any).faqList)
      ? (detail as any).faqList
      : Array.isArray((detail as any).faq)
        ? (detail as any).faq
        : [],

    bottomCta: (detail as any).bottomCta,
    customCta: (detail as any).customCta,
    customInquiryCta: (detail as any).customInquiryCta,
    bottomCustomCta: (detail as any).bottomCustomCta,
    showBottomCta: true,

    additionalImages: Array.isArray(detail.additionalImages) ? detail.additionalImages : [],
    images: Array.isArray(detail.images) ? detail.images : [],
    thumbnails: Array.isArray(detail.thumbnails) ? detail.thumbnails : [],`
    );

    write(pageRel, page);
  } else {
    console.log("详情路由已包含 FAQ / CTA 兼容字段，跳过:", pageRel);
  }
}

/**
 * 3. 修复 ProductDetailClient：增加注射泵识别 + 底部 CTA
 */
const clientRel = "components/products/detail/ProductDetailClient.tsx";

if (fs.existsSync(p(clientRel))) {
  let client = read(clientRel);
  let changed = false;

  if (!client.includes("function isSyringePumpDetailData")) {
    backup(clientRel, ".bak.syringe-cta");

    const syringeDetector = `
function isSyringePumpDetailData(data: any): boolean {
  const text = JSON.stringify(data || {}).toLowerCase();

  return (
    text.includes("注射泵") ||
    text.includes("syringe pump") ||
    text.includes("syringe-pump") ||
    text.includes("syringe-pumps") ||
    text.includes("hmd3") ||
    text.includes("hmd6") ||
    text.includes("hld3") ||
    text.includes("hld6")
  );
}
`;

    const valvelessIndex = client.indexOf("function isValvelessPumpDetailData");

    if (valvelessIndex !== -1) {
      const valvelessEnd = findFunctionEnd(client, valvelessIndex);
      if (valvelessEnd !== -1) {
        client = client.slice(0, valvelessEnd) + "\n" + syringeDetector + client.slice(valvelessEnd);
        changed = true;
      }
    } else {
      const ctaIndex = client.indexOf("function getPlungerPumpBottomCta");
      if (ctaIndex !== -1) {
        client = client.slice(0, ctaIndex) + syringeDetector + "\n" + client.slice(ctaIndex);
        changed = true;
      } else {
        console.log("未自动找到插入位置：isSyringePumpDetailData 可能需要手动加入");
      }
    }
  }

  if (
    client.includes("function getPlungerPumpBottomCta") &&
    !client.includes("注射泵可根据您的液路与结构需求进行定制")
  ) {
    const fnIndex = client.indexOf("function getPlungerPumpBottomCta");
    const openIndex = client.indexOf("{", fnIndex);

    if (openIndex !== -1) {
      const insert = `
  if (isSyringePumpDetailData(data)) {
    return {
      title: "注射泵可根据您的液路与结构需求进行定制",
      desc: "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。",
      button: "提交定制需求",
      href: "/contact",
    };
  }
`;
      client = client.slice(0, openIndex + 1) + insert + client.slice(openIndex + 1);
      changed = true;
    }
  }

  if (changed) {
    write(clientRel, client);
  } else {
    console.log("ProductDetailClient 无需修改或未找到可自动修改位置");
  }
}

console.log("");
console.log("FAQ 与注射泵底部 CTA 修复完成。");
console.log("下一步：");
console.log("1. 停止 dev");
console.log("2. npm run dev");
console.log("3. 刷新注射泵详情页");