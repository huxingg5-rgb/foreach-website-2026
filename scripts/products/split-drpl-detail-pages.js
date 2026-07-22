const fs = require("fs");

const detailJson = "data/products/generated/pumps/valveless-pumps/detail/index.json";
const selectionFile = "data/products/selection/valveless-pump-selection.generated.ts";
const auditFile = "scripts/products/audit-valveless-pump-detail-specs.js";

function readText(file) {
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function writeText(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function spec(label, value) {
  return {
    label,
    name: label,
    title: label,
    value,
    content: value,
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

const commonApplications = [
  "浓缩液稀释",
  "双液路配液",
  "比例加液",
  "稀释液与试剂同步输送",
  "自动化配比模块",
  "喷涂和稀释系统",
];

function buildDrplDetail(base, config) {
  const item = clone(base);

  const imageBase = "/images/products/pumps/valveless-pumps/foreach-drpl-dual-head-valveless-pump.webp";
  const modelBase = "/models/products/pumps/valveless-pumps/foreach-drpl-dual-head-valveless-pump.glb";
  const drawingBase = "/documents/products/pumps/valveless-pumps/2d-drawings/foreach-drpl-dual-head-valveless-pump-2d-drawing.pdf";

  item.slug = config.slug;
  item.productId = config.slug;
  item.productCode = config.fullCode;
  item.foreachModel = config.shortCode;
  item.model = config.shortCode;

  item.name = `${config.shortCode} ${config.ratio} 双头比例输送无阀泵`;
  item.title = `${config.shortCode} ${config.ratio} 双头比例输送无阀泵`;

  item.description =
    `${config.shortCode} ${config.ratio} 双头比例输送无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。\n\n` +
    `该配置对应浓缩液 ${config.concentrateVolume} μL、稀释液 ${config.diluentVolume} μL、配液量 ${config.totalVolume} mL，可用于需要稳定比例输送、减少外置阀件并降低液路复杂度的设备集成场景。`;

  item.commonApplications = commonApplications;

  item.specs = [
    spec("稀释比", config.ratio),
    spec("浓缩液份数", "1"),
    spec("稀释液份数", config.diluentParts),
    spec("浓缩液定量（μL）", config.concentrateVolume),
    spec("稀释液定量（μL）", config.diluentVolume),
    spec("配液量（mL）", config.totalVolume),
    spec("转速", "60~300 RPM"),
    spec("流量 QMin，mL/Min", config.qmin),
    spec("流量 QMax，mL/Min", config.qmax),
    spec("试剂A 工作液路接口", "1/4-28UNF-2B"),
    spec("试剂B 工作液路接口", "G1/8（默认带金属快插接头）"),
    spec("试剂A 清洗液路接口", "1/4-28UNF-2B"),
    spec("试剂B 清洗液路接口", "1/4-28UNF-2B"),
    spec("试剂A 端耐压", "Max：150kPa"),
    spec("试剂B 端耐压", "Max：150kPa"),
    spec("尺寸/mm", "L180xW83.7xH75"),
    spec("重量", "1536g"),
    spec("准确性", "<2%"),
    spec("重复性", "<0.5%"),
    spec("寿命", "20,000,000 Cycles"),
  ];

  item.specifications = item.specs;
  item.specificationGroups = [
    {
      title: "规格参数",
      items: item.specs,
    },
  ];

  item.category = "pumps";
  item.productTypeId = "valveless-pump";
  item.productTypeSlug = "valveless-pumps";
  item.productTypeName = "无阀泵";

  item.isCustomOnly = true;
  item.isCustomInquiry = true;
  item.detailMode = "custom_inquiry";
  item.modelDisplay = "定制配置请联系我们";
  item.displayModel = "定制配置请联系我们";

  item.showStandardModelSelector = false;
  item.showCustomInquiryCta = true;
  item.showDrawingRequest = true;
  item.show3DRequest = false;
  item.showDatasheetRequest = false;
  item.customInquiryHref = "/contact";
  item.contactHref = "/contact";

  item.mainImage = item.mainImage || imageBase;
  item.image = item.image || imageBase;
  item.heroImage = item.heroImage || imageBase;
  item.imageCard = item.imageCard || imageBase;
  item.additionalImages = Array.isArray(item.additionalImages) ? item.additionalImages : [];
  item.images = Array.isArray(item.images) ? item.images : [];
  item.thumbnails = Array.isArray(item.thumbnails) ? item.thumbnails : [];

  item.model3dUrl = item.model3dUrl || modelBase;
  item.drawing2dUrl = item.drawing2dUrl || drawingBase;
  item.drawingPdfUrl = item.drawingPdfUrl || drawingBase;

  item.selectionHref = "/products/pumps/valveless-pumps";
  item.detailHref = `/products/pumps/valveless-pumps/${config.slug}`;
  item.href = item.detailHref;

  item.imageAlt = `FOREACH ${config.shortCode} ${config.ratio} dual-head valveless pump`;
  item.imageAltEn = item.imageAlt;
  item.mainImageAlt = item.imageAlt;

  item.seo = {
    ...(item.seo || {}),
    title: `${config.shortCode} ${config.ratio} 双头比例输送无阀泵 - 恒永达`,
    description: item.description.replace(/\n+/g, " "),
    keywords: [
      config.shortCode,
      config.fullCode,
      `DRPL ${config.ratio}`,
      "双头无阀泵",
      "比例输送无阀泵",
      "稀释配液泵",
      "dual-head valveless pump",
      "proportional dispensing pump",
    ],
  };

  return item;
}

function patchDetailJson() {
  const details = JSON.parse(readText(detailJson));

  const oldDrpl =
    details.find((item) => item.slug === "drpl") ||
    details.find((item) => String(item.title || "").includes("DRPL")) ||
    {};

  const drpl0109 = buildDrplDetail(oldDrpl, {
    slug: "drpl-0109",
    shortCode: "DRPL-0109",
    fullCode: "DRPL-0109-0100",
    ratio: "1:9",
    diluentParts: "9",
    concentrateVolume: "100",
    diluentVolume: "900",
    totalVolume: "1",
    qmin: "60",
    qmax: "300",
  });

  const drpl0119 = buildDrplDetail(oldDrpl, {
    slug: "drpl-0119",
    shortCode: "DRPL-0119",
    fullCode: "DRPL-0119-0060",
    ratio: "1:19",
    diluentParts: "19",
    concentrateVolume: "60",
    diluentVolume: "1140",
    totalVolume: "1.2",
    qmin: "72",
    qmax: "360",
  });

  const nextDetails = details.filter(
    (item) =>
      item.slug !== "drpl" &&
      item.slug !== "drpl-0109" &&
      item.slug !== "drpl-0119" &&
      item.slug !== "drpl-0109-0100" &&
      item.slug !== "drpl-0119-0060"
  );

  nextDetails.push(drpl0109, drpl0119);

  nextDetails.sort((a, b) => {
    const order = {
      "rpl-p4": 1,
      "rpl-p635": 2,
      "rpl-p15": 3,
      "drpl-0109": 4,
      "drpl-0119": 5,
    };

    return (order[a.slug] || 999) - (order[b.slug] || 999);
  });

  writeText(detailJson, JSON.stringify(nextDetails, null, 2));
}

function patchSelectionFile() {
  let text = readText(selectionFile);

  text = text.replaceAll('productId: "pump-drpl-0109-0100-valveless"', 'productId: "pump-drpl-0109-valveless"');
  text = text.replaceAll('productId: "pump-drpl-0119-0060-valveless"', 'productId: "pump-drpl-0119-valveless"');

  text = text.replaceAll('seriesId: "drpl-0109-0100"', 'seriesId: "drpl-0109"');
  text = text.replaceAll('seriesId: "drpl-0119-0060"', 'seriesId: "drpl-0119"');

  const firstDrplTitleIndex = text.indexOf('zh: "DRPL-0109 双头无阀泵"');
  const secondDrplTitleIndex = text.indexOf('zh: "DRPL-0119 双头无阀泵"');

  if (firstDrplTitleIndex >= 0) {
    const before = text.slice(0, firstDrplTitleIndex);
    let blockAndAfter = text.slice(firstDrplTitleIndex);
    blockAndAfter = blockAndAfter.replace('detailSlug: "drpl"', 'detailSlug: "drpl-0109"');
    text = before + blockAndAfter;
  }

  if (secondDrplTitleIndex >= 0) {
    const before = text.slice(0, secondDrplTitleIndex);
    let blockAndAfter = text.slice(secondDrplTitleIndex);
    blockAndAfter = blockAndAfter.replace('detailSlug: "drpl"', 'detailSlug: "drpl-0119"');
    text = before + blockAndAfter;
  }

  text = text.replaceAll("DRPL-0109-0100 双头无阀泵", "DRPL-0109 双头无阀泵");
  text = text.replaceAll("DRPL-0119-0060 双头无阀泵", "DRPL-0119 双头无阀泵");
  text = text.replaceAll("DRPL-0109-0100 Dual-Head Valveless Pump", "DRPL-0109 Dual-Head Valveless Pump");
  text = text.replaceAll("DRPL-0119-0060 Dual-Head Valveless Pump", "DRPL-0119 Dual-Head Valveless Pump");

  writeText(selectionFile, text);
}

function patchAuditFile() {
  const audit = `const fs = require("fs");

const file = "data/products/generated/pumps/valveless-pumps/detail/index.json";

if (!fs.existsSync(file)) {
  console.error("未找到文件:", file);
  process.exit(1);
}

const details = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\\uFEFF/, ""));

function normalize(v) {
  return String(v ?? "")
    .replace(/\\s+/g, "")
    .replace(/μ/g, "u")
    .replace(/×/g, "x")
    .replace(/：/g, ":")
    .replace(/＜/g, "<")
    .replace(/～/g, "~")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .toLowerCase();
}

function specMap(item) {
  const map = {};
  for (const s of item.specs || []) {
    map[String(s.label || s.name || s.title || "").trim()] = String(s.value || s.content || "").trim();
  }
  return map;
}

function checkValue(slug, map, label, expected) {
  const actual = map[label];

  if (actual === undefined) {
    return { slug, label, status: "缺失", expected, actual: "" };
  }

  return {
    slug,
    label,
    status: normalize(actual) === normalize(expected) ? "OK" : "不一致",
    expected,
    actual,
  };
}

const expected = {
  "rpl-p4": {
    title: "RPL-P4 12–80 μL/rev 小量程无阀泵",
    specs: {
      "产品类型": "RPL 无阀泵",
      "排量范围": "12–80 μL/rev",
      "转速": "5–300 rpm",
      "准确度": "<2%",
      "重复性": "<0.5%",
      "耐压": "Max 150 kPa",
      "寿命": "20,000,000 cycles",
      "泵头材质": "PVDF",
      "陶瓷套件": "AL2O3",
      "工作液路接口": "1/4-28 UNF-2B",
      "整体尺寸": "57 × 57 × 115 mm",
      "重量": "500 g",
      "配置方式": "定制配置",
    },
  },
  "rpl-p635": {
    title: "RPL-P6.35 50–300 μL/rev 中小量程无阀泵",
    specs: {
      "产品类型": "RPL 无阀泵",
      "排量范围": "50–300 μL/rev",
      "转速": "5–300 rpm",
      "准确度": "<2%",
      "重复性": "<0.5%",
      "耐压": "Max 150 kPa",
      "寿命": "20,000,000 cycles",
      "泵头材质": "PVDF",
      "堵头材质": "PVDF",
      "陶瓷套件": "ZrO2",
      "工作液路接口": "1/4-28 UNF-2B",
      "清洗液路接口": "1/4-28 UNF-2B",
      "整体尺寸": "78 × 78 × 145 mm",
      "重量": "750 g",
      "配置方式": "定制配置",
    },
  },
  "rpl-p15": {
    title: "RPL-P15 300–1200 μL/rev 中大量程无阀泵",
    specs: {
      "产品类型": "RPL 无阀泵",
      "排量范围": "300–1200 μL/rev",
      "转速": "5–500 rpm",
      "准确度": "<2%",
      "重复性": "<0.5%",
      "耐压": "Max 150 kPa",
      "寿命": "20,000,000 cycles",
      "泵头材质": "PVDF",
      "堵头材质": "PVDF",
      "陶瓷套件": "AL2O3",
      "工作液路接口": "G1/8",
      "清洗液路接口": "1/4-28 UNF-2B",
      "整体尺寸": "78 × 78 × 160 mm",
      "重量": "900 g",
      "配置方式": "定制配置",
    },
  },
  "drpl-0109": {
    title: "DRPL-0109 1:9 双头比例输送无阀泵",
    specs: {
      "稀释比": "1:9",
      "浓缩液份数": "1",
      "稀释液份数": "9",
      "浓缩液定量（μL）": "100",
      "稀释液定量（μL）": "900",
      "配液量（mL）": "1",
      "转速": "60~300 RPM",
      "流量 QMin，mL/Min": "60",
      "流量 QMax，mL/Min": "300",
      "试剂A 工作液路接口": "1/4-28UNF-2B",
      "试剂B 工作液路接口": "G1/8（默认带金属快插接头）",
      "试剂A 清洗液路接口": "1/4-28UNF-2B",
      "试剂B 清洗液路接口": "1/4-28UNF-2B",
      "试剂A 端耐压": "Max：150kPa",
      "试剂B 端耐压": "Max：150kPa",
      "尺寸/mm": "L180xW83.7xH75",
      "重量": "1536g",
      "准确性": "<2%",
      "重复性": "<0.5%",
      "寿命": "20,000,000 Cycles",
    },
  },
  "drpl-0119": {
    title: "DRPL-0119 1:19 双头比例输送无阀泵",
    specs: {
      "稀释比": "1:19",
      "浓缩液份数": "1",
      "稀释液份数": "19",
      "浓缩液定量（μL）": "60",
      "稀释液定量（μL）": "1140",
      "配液量（mL）": "1.2",
      "转速": "60~300 RPM",
      "流量 QMin，mL/Min": "72",
      "流量 QMax，mL/Min": "360",
      "试剂A 工作液路接口": "1/4-28UNF-2B",
      "试剂B 工作液路接口": "G1/8（默认带金属快插接头）",
      "试剂A 清洗液路接口": "1/4-28UNF-2B",
      "试剂B 清洗液路接口": "1/4-28UNF-2B",
      "试剂A 端耐压": "Max：150kPa",
      "试剂B 端耐压": "Max：150kPa",
      "尺寸/mm": "L180xW83.7xH75",
      "重量": "1536g",
      "准确性": "<2%",
      "重复性": "<0.5%",
      "寿命": "20,000,000 Cycles",
    },
  },
};

const rows = [];
const titleRows = [];
const missingProducts = [];

for (const [slug, exp] of Object.entries(expected)) {
  const item = details.find((x) => x.slug === slug);

  if (!item) {
    missingProducts.push(slug);
    continue;
  }

  titleRows.push({
    slug,
    status: normalize(item.title) === normalize(exp.title) ? "OK" : "不一致",
    expected: exp.title,
    actual: item.title,
  });

  const map = specMap(item);

  for (const [label, value] of Object.entries(exp.specs)) {
    rows.push(checkValue(slug, map, label, value));
  }
}

console.log("\\n===== 1. 产品是否存在 =====");
if (missingProducts.length) {
  console.table(missingProducts.map((slug) => ({ slug, status: "缺失" })));
} else {
  console.log("5 个无阀泵详情页数据都存在。");
}

console.log("\\n===== 2. H1 / title 检查 =====");
console.table(titleRows);

console.log("\\n===== 3. 规格字段检查：只显示不一致或缺失 =====");
const badRows = rows.filter((r) => r.status !== "OK");
if (badRows.length) {
  console.table(badRows);
} else {
  console.log("规格字段全部匹配。");
}

console.log("\\n===== 4. 当前无阀泵详情页列表 =====");
for (const item of details.filter((x) => expected[x.slug])) {
  console.log(\`\${item.slug} | \${item.title} | \${item.detailHref}\`);
}

console.log("\\n===== 检查完成：本脚本没有修改任何文件 =====");
`;

  writeText(auditFile, audit);
}

patchDetailJson();
patchSelectionFile();
patchAuditFile();

console.log("DRPL 详情页已拆分为 drpl-0109 与 drpl-0119，并已更新筛选页链接。");