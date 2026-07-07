const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const file = "data-source/product-center/pumps/FOREACH_隔膜泵系列_产品数据源.xlsx";

if (!fs.existsSync(file)) {
  console.error("ERROR: 未找到 Excel 文件：", file);
  process.exit(1);
}

const wb = xlsx.readFile(file);

const requiredSheets = [
  "00_说明",
  "01_系列详情",
  "02_选型卡片",
  "03_规格参数",
  "04_型号配置",
  "05_FAQ",
  "06_媒体资源索引",
  "07_路由SEO",
  "08_资源命名规则",
];

function normalize(value) {
  return String(value ?? "").trim();
}

function findHeaderRow(sheetName, expectedFields) {
  const ws = wb.Sheets[sheetName];
  if (!ws) return null;

  const rows = xlsx.utils.sheet_to_json(ws, { header: 1, defval: "" });

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].map(normalize);
    const hitCount = expectedFields.filter(field => row.includes(field)).length;
    if (hitCount >= Math.min(2, expectedFields.length)) {
      return { index: i, header: row, rows };
    }
  }

  return { index: 0, header: rows[0] || [], rows };
}

function readSheet(sheetName, expectedFields) {
  const info = findHeaderRow(sheetName, expectedFields);
  if (!info) return [];

  const { index, header, rows } = info;
  const data = [];

  for (const row of rows.slice(index + 1)) {
    const obj = {};
    header.forEach((key, colIndex) => {
      if (key) obj[key] = normalize(row[colIndex]);
    });

    const hasValue = Object.values(obj).some(value => normalize(value) !== "");
    if (hasValue) data.push(obj);
  }

  return data;
}

function findDup(values) {
  const map = new Map();

  for (const value of values) {
    const key = normalize(value);
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }

  return [...map.entries()].filter(([, count]) => count > 1);
}

console.log("=== 1. Sheet 完整性检查 ===");
let hasError = false;

for (const name of requiredSheets) {
  const ok = wb.SheetNames.includes(name);
  console.log(`${ok ? "OK " : "MISS"} ${name}`);
  if (!ok) hasError = true;
}

console.log("\n=== 2. Sheet 表头与行数检查 ===");

const sheetExpectedFields = {
  "01_系列详情": ["slug", "页面标题"],
  "02_选型卡片": ["slug", "卡片标题", "卡片描述"],
  "03_规格参数": ["系列slug", "参数名称", "参数值"],
  "04_型号配置": ["系列slug", "产品型号", "电压"],
  "05_FAQ": ["系列slug", "问题", "答案"],
  "06_媒体资源索引": ["系列slug", "资源类型", "推荐文件名", "推荐路径", "ALT文本"],
  "07_路由SEO": ["slug", "页面标题", "路径建议"],
  "08_资源命名规则": ["资源类型", "命名规则"],
};

for (const sheetName of wb.SheetNames) {
  const expected = sheetExpectedFields[sheetName] || [];
  const info = findHeaderRow(sheetName, expected.length ? expected : ["slug", "页面标题"]);
  if (!info) {
    console.log(`\n[${sheetName}] 无法读取`);
    continue;
  }

  const data = readSheet(sheetName, expected);
  console.log(`\n[${sheetName}]`);
  console.log(`表头行：第 ${info.index + 1} 行`);
  console.log(`数据行数：${data.length}`);
  console.log(`表头：${info.header.filter(Boolean).join(" | ")}`);
}

console.log("\n=== 3. 关键字段空值检查 ===");

const checks = [
  ["01_系列详情", ["slug", "页面标题"]],
  ["02_选型卡片", ["slug", "卡片标题", "卡片描述"]],
  ["03_规格参数", ["系列slug", "参数名称", "参数值"]],
  ["04_型号配置", ["系列slug", "产品型号", "电压"]],
  ["05_FAQ", ["系列slug", "问题", "答案"]],
  ["06_媒体资源索引", ["系列slug", "资源类型", "推荐文件名", "推荐路径", "ALT文本"]],
  ["07_路由SEO", ["slug", "页面标题", "路径建议"]],
];

for (const [sheetName, fields] of checks) {
  const rows = readSheet(sheetName, fields);
  console.log(`\n[${sheetName}]`);

  if (!rows.length) {
    console.log("ERROR: 没有数据");
    hasError = true;
    continue;
  }

  let sheetHasError = false;

  rows.forEach((row, index) => {
    fields.forEach(field => {
      if (!normalize(row[field])) {
        console.log(`ERROR: 第 ${index + 1} 条数据缺少字段：${field}`);
        hasError = true;
        sheetHasError = true;
      }
    });
  });

  if (!sheetHasError) {
    console.log(`OK: 已检查 ${rows.length} 条数据`);
  }
}

console.log("\n=== 4. slug / 路径重复检查 ===");

const routeRows = readSheet("07_路由SEO", ["slug", "页面标题", "路径建议"]);
const slugDup = findDup(routeRows.map(r => r.slug));
const pathDup = findDup(routeRows.map(r => r["路径建议"]));

if (slugDup.length) {
  console.log("ERROR: slug 重复：");
  console.log(slugDup);
  hasError = true;
} else {
  console.log("OK: slug 无重复");
}

if (pathDup.length) {
  console.log("ERROR: 路径重复：");
  console.log(pathDup);
  hasError = true;
} else {
  console.log("OK: 路径无重复");
}

console.log("\n=== 5. 媒体资源路径检查：只提示，不阻塞 ===");

const mediaRows = readSheet("06_媒体资源索引", ["系列slug", "资源类型", "推荐文件名", "推荐路径", "ALT文本"]);

function resolvePublicPath(resourcePath, fileName) {
  let p = normalize(resourcePath).replaceAll("\\", "/");
  const f = normalize(fileName);

  if (!p || !f) return "";

  if (p.startsWith("/")) {
    p = "public" + p;
  }

  return path.join(p, f).replaceAll("\\", "/");
}

for (const row of mediaRows) {
  const type = normalize(row["资源类型"]);
  const fullPath = resolvePublicPath(row["推荐路径"], row["推荐文件名"]);

  if (!fullPath) continue;

  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? "OK  " : "MISS"} ${type} | ${fullPath}`);
}

console.log("\n=== 检查结果 ===");

if (hasError) {
  console.log("存在需要修正的问题，请先修改 Excel。");
  process.exit(1);
}

console.log("Excel 基础检查通过，可以进入解析。");
