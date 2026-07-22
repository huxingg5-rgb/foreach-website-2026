const fs = require("fs");

const file = "data/products/generated/pumps/valveless-pumps/detail/index.json";

if (!fs.existsSync(file)) {
  console.error("未找到文件:", file);
  process.exit(1);
}

const details = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));

function normalize(v) {
  return String(v ?? "")
    .replace(/\s+/g, "")
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

console.log("\n===== 1. 产品是否存在 =====");
if (missingProducts.length) {
  console.table(missingProducts.map((slug) => ({ slug, status: "缺失" })));
} else {
  console.log("5 个无阀泵详情页数据都存在。");
}

console.log("\n===== 2. H1 / title 检查 =====");
console.table(titleRows);

console.log("\n===== 3. 规格字段检查：只显示不一致或缺失 =====");
const badRows = rows.filter((r) => r.status !== "OK");
if (badRows.length) {
  console.table(badRows);
} else {
  console.log("规格字段全部匹配。");
}

console.log("\n===== 4. 当前无阀泵详情页列表 =====");
for (const item of details.filter((x) => expected[x.slug])) {
  console.log(`${item.slug} | ${item.title} | ${item.detailHref}`);
}

console.log("\n===== 检查完成：本脚本没有修改任何文件 =====");
