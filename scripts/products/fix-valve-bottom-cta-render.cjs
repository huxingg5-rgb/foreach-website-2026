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

const clientPath = abs("components/products/detail/ProductDetailClient.tsx");

if (!fs.existsSync(clientPath)) {
  console.error("找不到 ProductDetailClient.tsx");
  process.exit(1);
}

backup(clientPath, "valve_bottom_cta");

let text = fs.readFileSync(clientPath, "utf8");

/*
  1. 插入阀系列底部 CTA 识别函数
*/
if (!text.includes("VALVE_DETAIL_BOTTOM_CTA_20260708")) {
  const helper = `
/*
  VALVE_DETAIL_BOTTOM_CTA_20260708

  阀系列详情页复用公共 ProductDetailClient。
  这里单独识别阀系列数据，避免底部 CTA 回退到柱塞泵，或直接不显示。
*/
function isValveDetailData(data: any): boolean {
  return (
    data?.sourceType === "valve-detail" ||
    data?.categoryId === "valves" ||
    data?.category === "valves" ||
    data?.categoryLabel === "阀系列" ||
    data?.productTypeName === "旋转阀" ||
    data?.productTypeName === "高压阀" ||
    data?.productTypeName === "电磁阀"
  );
}

function getValveDetailBottomCta(data: any) {
  if (!isValveDetailData(data)) {
    return null;
  }

  const title =
    data?.bottomCtaTitle ||
    data?.customInquiryTitle ||
    data?.bottomCta?.title ||
    data?.customInquiryCta?.title ||
    "需要确认阀系列定制配置？";

  const desc =
    data?.bottomCtaDescription ||
    data?.customInquiryDescription ||
    data?.bottomCta?.desc ||
    data?.bottomCta?.description ||
    data?.customInquiryCta?.desc ||
    data?.customInquiryCta?.description ||
    "请提供介质类型、压力范围、接口方式、通道数量、安装空间和控制方式，FOREACH 可协助确认适合您设备的阀系列配置。";

  const button =
    data?.bottomCtaButtonText ||
    data?.customInquiryButtonText ||
    data?.bottomCta?.button ||
    data?.bottomCta?.buttonText ||
    data?.customInquiryCta?.button ||
    data?.customInquiryCta?.buttonText ||
    "联系工程师确认配置";

  const href =
    data?.bottomCtaHref ||
    data?.customInquiryHref ||
    data?.bottomCta?.href ||
    data?.customInquiryCta?.href ||
    "/contact";

  return {
    title,
    desc,
    description: desc,
    button,
    buttonText: button,
    href,
  };
}
`;

  const anchor = "function getPlungerPumpBottomCta";

  if (!text.includes(anchor)) {
    console.error("没有找到 getPlungerPumpBottomCta 函数，无法自动插入阀系列 CTA 逻辑。");
    console.error("请把 ProductDetailClient.tsx 中 bottom CTA 附近代码发我。");
    process.exit(1);
  }

  text = text.replace(anchor, `${helper}\n${anchor}`);
}

/*
  2. 在 getPlungerPumpBottomCta 函数开头加入阀系列优先判断
*/
if (!text.includes("const valveBottomCta = getValveDetailBottomCta(data);")) {
  const pattern = /function\s+getPlungerPumpBottomCta\s*\(\s*data\s*:\s*any\s*\)\s*(?::\s*[^{]+)?\s*\{/;

  if (!pattern.test(text)) {
    console.error("找到了 getPlungerPumpBottomCta 名称，但函数签名不匹配。");
    console.error("请把 getPlungerPumpBottomCta 函数附近代码发我。");
    process.exit(1);
  }

  text = text.replace(pattern, (match) => {
    return `${match}
  const valveBottomCta = getValveDetailBottomCta(data);

  if (valveBottomCta) {
    return valveBottomCta;
  }
`;
  });
}

fs.writeFileSync(clientPath, text, "utf8");

console.log("已修复 ProductDetailClient 阀系列底部 CTA 识别。");

/*
  3. 再确认阀详情 JSON 中有底部联系字段
*/
const jsonPath = abs("data/products/generated/valves/detail/index.json");

if (fs.existsSync(jsonPath)) {
  backup(jsonPath, "ensure_valve_bottom_cta");

  const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  const fallbackMap = {
    "rotary-valves": {
      title: "需要确认 MRV3 多通道旋转阀配置？",
      desc: "请提供试剂数量、清洗路径、废液路径、目标通道数、接口规格、介质类型、驱动方式和安装空间，FOREACH 可协助确认 MRV3 陶瓷多通道旋转阀配置。",
      button: "联系工程师确认旋转阀配置"
    },
    "high-pressure-valves": {
      title: "需要确认 HP 高压阀压力、接口和阀位方案？",
      desc: "请提供最大工作压力、流动相或样品介质、10-32UNF 接口需求、进样/抽样/排气切换逻辑、内体积要求和安装空间，FOREACH 可协助确认 HP 三位七通高压阀配置。",
      button: "联系工程师确认高压阀方案"
    },
    "solenoid-valves": {
      title: "需要确认 6010 电磁阀通口数、阀形式和膜片材料？",
      desc: "请提供介质类型、压力范围、接口方式、通口数、NO/NC/万向阀形式、膜片材质、电压和是否需要节能回路，FOREACH 可协助确认 6010 系列电磁阀配置。",
      button: "联系工程师确认电磁阀配置"
    }
  };

  for (const item of details) {
    const fallback = fallbackMap[item.slug];
    if (!fallback) continue;

    item.bottomCtaTitle = item.bottomCtaTitle || fallback.title;
    item.bottomCtaDescription = item.bottomCtaDescription || fallback.desc;
    item.bottomCtaButtonText = item.bottomCtaButtonText || fallback.button;
    item.bottomCtaHref = item.bottomCtaHref || "/contact";

    item.customInquiryTitle = item.customInquiryTitle || item.bottomCtaTitle;
    item.customInquiryDescription =
      item.customInquiryDescription || item.bottomCtaDescription;
    item.customInquiryButtonText =
      item.customInquiryButtonText || item.bottomCtaButtonText;
    item.customInquiryHref = item.customInquiryHref || "/contact";
  }

  fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");
  console.log("已确认阀详情 JSON 底部 CTA 字段。");
}

console.log("");
console.log("请测试：");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");