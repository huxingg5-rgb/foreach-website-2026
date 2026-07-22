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

backup(jsonPath, "fix_mrv3_copy_specs");

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const item = details.find((detail) => detail.slug === "rotary-valves");

if (!item) {
  console.error("没有找到 slug = rotary-valves 的 MRV3 数据。");
  process.exit(1);
}

/*
  MRV3 页面修正原则：
  1. H1 按用户要求固定为：MRV3 陶瓷多通道旋转阀
  2. 正文不能泛，要体现多通道流路任务和规格参数
  3. specs 只写规格书参数，不写自编字段
*/

item.title = "MRV3 陶瓷多通道旋转阀";
item.name = "MRV3 陶瓷多通道旋转阀";
item.productName = "MRV3 陶瓷多通道旋转阀";
item.modelName = "MRV3 陶瓷多通道旋转阀";
item.h1Title = "MRV3 陶瓷多通道旋转阀";
item.pageTitle = "MRV3 陶瓷多通道旋转阀";

item.seoTitle = "MRV3陶瓷多通道旋转阀｜10/16/24通道流路切换阀｜恒永达 FOREACH";
item.seoDescription =
  "MRV3陶瓷多通道旋转阀用于自动化分析仪器中的多试剂选择、样本分配、清洗液切换和废液路径管理，支持10/16/24通道，耐压0.7MPa，内容积低至2.9μL。";

item.description =
  "MRV3 陶瓷多通道旋转阀是一款用于自动化分析仪器多路径流路切换的机械式旋转阀，可在 10 通道、16 通道和 24 通道配置中实现试剂、样本、清洗液和废液路径的集中切换。产品通过电机旋转与光耦定位完成端口切换，适用于需要多通道选择、阀位定位、低内容积和稳定进样的 IVD、生命科学和实验室自动化液路模块。规格书参数覆盖 1.2mm、1.0mm、0.5mm 通道直径，内容积 15.8μL、10μL、2.9μL，耐压 0.7MPa，接口支持 1/4-28UNF 与 6-40UNF，可根据通道数量、接口、驱动器和安装空间进行项目配置确认。";

item.commonApplications = [
  "多试剂选择",
  "样本分配",
  "清洗液切换",
  "废液路径管理",
  "多通道液路集成",
  "自动化分析仪器"
];

item.advantages = [
  "10 / 16 / 24 通道可选，适合多试剂和多路径液路集中切换",
  "内容积低至 2.9μL，可降低混液和残留风险",
  "耐压 0.7MPa，适合自动化分析仪器常见液路压力范围",
  "PCTFE、氧化锆陶瓷和蓝宝石触液材质，兼顾耐腐蚀与耐磨需求",
  "电机驱动与光耦定位，便于整机控制系统识别阀位",
  "阀头可更换，便于后期维护和不同通道配置切换"
];

/*
  规格表：严格使用 MRV3 规格书参数。
  不加入“产品类型”“配置方式”等页面自编字段。
*/
item.specs = [
  { label: "名称", value: "陶瓷转阀" },
  { label: "通道数量", value: "10 / 16 / 24" },
  { label: "通道直径", value: "1.2mm / 1.0mm / 0.5mm" },
  { label: "内容积", value: "15.8μL / 10μL / 2.9μL" },
  { label: "螺纹接口", value: "1/4-28UNF / 6-40UNF" },
  { label: "耐压", value: "0.7MPa" },
  { label: "触液材质", value: "PCTFE / 氧化锆陶瓷 / 蓝宝石" },
  { label: "初始位置", value: "通电自动复位" },
  { label: "切换时间", value: "≤2s/圈，相邻端口＜100ms" },
  { label: "寿命", value: "100万圈" },
  { label: "电机/驱动器", value: "可选" },
  { label: "电机减速比", value: "1：10" },
  { label: "通信接口", value: "RS232 / RS485" },
  { label: "波特率", value: "9600 / 57600 / 115200" },
  { label: "适用电源", value: "DC24V/2A±10%" },
  { label: "最大功率", value: "48W" },
  { label: "工作环境温度", value: "0-50℃" },
  { label: "工作相对湿度", value: "20-80%RH" },
  { label: "外形尺寸", value: "42*61*132.3mm，详见3.1" },
  { label: "安装尺寸", value: "2-φ3通孔，间距43.5、49.6mm" },
  { label: "重量", value: "约600g" }
];

item.faq = [
  {
    question: "MRV3 多通道旋转阀适合解决什么液路问题？",
    answer:
      "MRV3 适合把多瓶试剂、多路清洗液、多条废液路径或多个样本路径集中到一个旋转切换单元中，减少外部阀组数量和管路交叉。"
  },
  {
    question: "10 通道、16 通道和 24 通道如何选择？",
    answer:
      "主要根据实际需要切换的试剂数量、清洗路径数量、废液路径数量和预留端口数量确认。端口数量越多，越适合多试剂或多路径平台化仪器。"
  },
  {
    question: "MRV3 为什么按定制配置展示？",
    answer:
      "MRV3 涉及通道数量、通道直径、螺纹接口、触液材质、电机、驱动器、通信接口和安装尺寸等配置，实际项目需要结合液路图和整机空间确认。"
  }
];

item.bottomCtaTitle = "需要确认 MRV3 多通道旋转阀配置？";
item.bottomCtaDescription =
  "请提供试剂数量、清洗路径、废液路径、目标通道数、接口规格、介质类型和安装空间，FOREACH 可协助确认 MRV3 陶瓷多通道旋转阀的通道配置、触液材料、驱动方式和安装方式。";
item.bottomCtaButtonText = "联系工程师确认旋转阀配置";
item.bottomCtaHref = "/contact";

item.customInquiryTitle = item.bottomCtaTitle;
item.customInquiryDescription = item.bottomCtaDescription;
item.customInquiryButtonText = item.bottomCtaButtonText;
item.customInquiryHref = item.bottomCtaHref;

item.searchKeywords = [
  "MRV3陶瓷多通道旋转阀",
  "MRV3旋转阀",
  "多通道旋转阀",
  "10通道旋转阀",
  "16通道旋转阀",
  "24通道旋转阀",
  "试剂选择阀",
  "清洗液切换阀",
  "IVD流路切换阀"
];

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("MRV3 详情页已修正：");
console.log("- H1：MRV3 陶瓷多通道旋转阀");
console.log("- 正文已加入多通道、10/16/24通道、0.7MPa、内容积、接口等信息");
console.log("- 规格表已按规格书参数重写");
console.log("- 常见应用已缩短");

/*
  再补一次 page.tsx 字段透传，确保 ProductDetailClient 能读到 h1Title / bottom CTA。
*/
const pagePath = abs("app/products/valves/[slug]/page.tsx");

if (fs.existsSync(pagePath)) {
  backup(pagePath, "mrv3_field_passthrough");

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
console.log("请测试：/products/valves/rotary-valves");