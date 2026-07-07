const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const SOURCE_FILE = "data-source/product-center/pumps/FOREACH_隔膜泵系列_产品数据源.xlsx";
const OUT_DIR = "data/products/generated/pumps/diaphragm-pumps";

function n(v) {
  return String(v ?? "").trim();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function readSheet(wb, sheetName) {
  const ws = wb.Sheets[sheetName];
  if (!ws) throw new Error(`缺少 Sheet: ${sheetName}`);
  return xlsx.utils.sheet_to_json(ws, { defval: "" }).map(row => {
    const out = {};
    for (const [k, v] of Object.entries(row)) out[n(k)] = n(v);
    return out;
  }).filter(row => Object.values(row).some(Boolean));
}

function by(rows, key) {
  const map = {};
  for (const row of rows) {
    const v = n(row[key]);
    if (!v) continue;
    if (!map[v]) map[v] = [];
    map[v].push(row);
  }
  return map;
}

function oneBy(rows, key) {
  const map = {};
  for (const row of rows) {
    const v = n(row[key]);
    if (v) map[v] = row;
  }
  return map;
}

function publicFullPath(dir, file) {
  let d = n(dir).replaceAll("\\", "/").replace(/\/+$/, "");
  const f = n(file);

  if (!d || !f) return "";

  // Excel 里如果写的是 /public/images/...，转换成 public/images/...
  // Excel 里如果写的是 /images/...，转换成 public/images/...
  // Excel 里如果写的是 public/images/...，保持不变
  if (d.startsWith("/public/")) {
    d = d.slice(1);
  } else if (d.startsWith("/")) {
    d = `public${d}`;
  } else if (!d.startsWith("public/")) {
    d = `public/${d}`;
  }

  return path.join(d, f).replaceAll("\\", "/");
}

function checkRequired(rows, sheetName, fields) {
  let ok = true;
  for (let i = 0; i < rows.length; i++) {
    for (const field of fields) {
      if (!n(rows[i][field])) {
        console.log(`ERROR: ${sheetName} 第 ${i + 2} 行缺少字段：${field}`);
        ok = false;
      }
    }
  }
  if (ok) console.log(`OK: ${sheetName} 已检查 ${rows.length} 行`);
  return ok;
}

function dupCheck(rows, field, label) {
  const map = new Map();
  for (const row of rows) {
    const v = n(row[field]);
    if (!v) continue;
    map.set(v, (map.get(v) || 0) + 1);
  }
  const dup = [...map.entries()].filter(([, count]) => count > 1);
  if (dup.length) {
    console.log(`ERROR: ${label} 重复：`);
    console.log(dup);
    return false;
  }
  console.log(`OK: ${label} 无重复`);
  return true;
}

function main() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error(`未找到数据源：${SOURCE_FILE}`);
  }

  const wb = xlsx.readFile(SOURCE_FILE);

  const sheetNames = [
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

  console.log("=== Sheet 检查 ===");
  let ok = true;
  for (const name of sheetNames) {
    const exists = wb.SheetNames.includes(name);
    console.log(`${exists ? "OK " : "MISS"} ${name}`);
    if (!exists) ok = false;
  }
  if (!ok) process.exit(1);

  const seriesRows = readSheet(wb, "01_系列详情");
  const cardRows = readSheet(wb, "02_选型卡片");
  const specRows = readSheet(wb, "03_规格参数");
  const modelRows = readSheet(wb, "04_型号配置");
  const faqRows = readSheet(wb, "05_FAQ");
  const mediaRows = readSheet(wb, "06_媒体资源索引");
  const routeRows = readSheet(wb, "07_路由SEO");
  const namingRows = readSheet(wb, "08_资源命名规则");

  console.log("\n=== 行数 ===");
  console.log("系列详情:", seriesRows.length);
  console.log("选型卡片:", cardRows.length);
  console.log("规格参数:", specRows.length);
  console.log("型号配置:", modelRows.length);
  console.log("FAQ:", faqRows.length);
  console.log("媒体资源:", mediaRows.length);
  console.log("路由SEO:", routeRows.length);
  console.log("资源命名规则:", namingRows.length);

  console.log("\n=== 关键字段检查 ===");
  ok = true;
  ok = checkRequired(seriesRows, "01_系列详情", ["series_id", "页面标题", "slug", "路径建议"]) && ok;
  ok = checkRequired(cardRows, "02_选型卡片", ["card_id", "卡片标题/型号", "卡片描述", "目标系列slug"]) && ok;
  ok = checkRequired(specRows, "03_规格参数", ["series_id", "规格表名称", "参数", "规格值"]) && ok;
  ok = checkRequired(modelRows, "04_型号配置", ["series_id", "产品型号", "电压"]) && ok;
  ok = checkRequired(faqRows, "05_FAQ", ["series_id", "问题", "答案"]) && ok;
  ok = checkRequired(mediaRows, "06_媒体资源索引", ["series_id", "资源类型", "标准文件名", "推荐存放路径", "ALT文本_EN"]) && ok;
  ok = checkRequired(routeRows, "07_路由SEO", ["series_id", "中文页面标题", "slug_EN", "路径建议"]) && ok;

  console.log("\n=== 重复检查 ===");
  ok = dupCheck(seriesRows, "slug", "系列 slug") && ok;
  ok = dupCheck(routeRows, "slug_EN", "路由 slug_EN") && ok;
  ok = dupCheck(routeRows, "路径建议", "路径建议") && ok;

  console.log("\n=== 媒体资源路径提示，不阻塞 ===");
  for (const row of mediaRows) {
    const full = publicFullPath(row["推荐存放路径"], row["标准文件名"]);
    const exists = full ? fs.existsSync(full) : false;
    console.log(`${exists ? "OK  " : "MISS"} ${row["资源类型"]} | ${full}`);
  }

  if (!ok) {
    console.log("\nExcel 检查未通过，停止生成。");
    process.exit(1);
  }

  const specsBySeries = by(specRows, "series_id");
  const modelsBySeries = by(modelRows, "series_id");
  const faqsBySeries = by(faqRows, "series_id");
  const mediaBySeries = by(mediaRows, "series_id");
  const routeBySeries = oneBy(routeRows, "series_id");

  const details = seriesRows.map(row => {
    const sid = row["series_id"];
    const route = routeBySeries[sid] || {};

    return {
      seriesId: sid,
      slug: row["slug"],
      category: row["产品分类"],
      title: row["页面标题"],
      displayName: row["前台显示名称"],
      path: row["路径建议"],
      description: row["详情页主题文案"],
      commonApplications: row["常见应用"],
      modelDisplay: row["首屏型号显示"],
      modelButtonText: row["按钮文案"] || "型号配置",
      status: row["状态"],
      seo: {
        type: route["页面类型"],
        slug: route["slug_EN"] || row["slug"],
        path: route["路径建议"] || row["路径建议"],
        title: route["SEO标题_CN"] || row["页面标题"],
        description: route["Meta描述_CN"] || "",
        pageTitle: route["中文页面标题"] || row["页面标题"],
        status: route["上线状态"] || row["状态"],
        note: route["备注"] || "",
      },
      specifications: (specsBySeries[sid] || []).map(item => ({
        tableName: item["规格表名称"],
        parameter: item["参数"],
        value: item["规格值"],
        note: item["备注"],
      })),
      modelConfigurations: (modelsBySeries[sid] || []).map(item => ({
        itemCode: item["商品编码"],
        model: item["产品型号"],
        category: item["产品分类"],
        motorType: item["电机类型"],
        voltage: item["电压"],
        connectionType: item["连接方式"],
        portDirection: item["连接口方向"],
        diaphragm: item["膜片"],
        valvePlate: item["阀片"],
        pumpHead: item["泵头"],
        detailSlug: item["详情页slug"],
        reservedModelSlug: item["单独型号页预留slug"],
        note: item["备注"],
      })),
      faqs: (faqsBySeries[sid] || []).map(item => ({
        question: item["问题"],
        answer: item["答案"],
        seoDirection: item["SEO/长尾词方向"],
      })),
      media: (mediaBySeries[sid] || []).map(item => ({
        resourceId: item["resource_id"],
        version: item["配置/版本"],
        displayName: item["前台显示名称"],
        resourceType: item["资源类型"],
        pagePosition: item["页面位置"],
        fileName: item["标准文件名"],
        path: item["推荐存放路径"],
        fullPath: publicFullPath(item["推荐存放路径"], item["标准文件名"]),
        alt: item["ALT文本_EN"],
        caption: item["可见图注_CN"],
        sourcePdfPage: item["来源PDF页码"],
        status: item["状态/备注"],
      })),
    };
  });

  const cards = cardRows.map(row => ({
    cardId: row["card_id"],
    category: row["产品分类"],
    series: row["系列"],
    title: row["卡片标题/型号"],
    description: row["卡片描述"],
    flowRate: row["流量"],
    pressure: row["压力字段"],
    motorType: row["电机类型"],
    targetSeriesSlug: row["目标系列slug"],
    reservedConfigSlug: row["配置预留slug"],
    imageKey: row["图片key"],
    alt: row["ALT文本_EN"],
  }));

  const routes = routeRows.map(row => ({
    pageType: row["页面类型"],
    seriesId: row["series_id"],
    pageTitle: row["中文页面标题"],
    slug: row["slug_EN"],
    path: row["路径建议"],
    seoTitle: row["SEO标题_CN"],
    metaDescription: row["Meta描述_CN"],
    status: row["上线状态"],
    note: row["备注"],
  }));

  const media = mediaRows.map(row => ({
    resourceId: row["resource_id"],
    seriesId: row["series_id"],
    version: row["配置/版本"],
    displayName: row["前台显示名称"],
    resourceType: row["资源类型"],
    pagePosition: row["页面位置"],
    fileName: row["标准文件名"],
    path: row["推荐存放路径"],
    fullPath: publicFullPath(row["推荐存放路径"], row["标准文件名"]),
    alt: row["ALT文本_EN"],
    caption: row["可见图注_CN"],
    sourcePdfPage: row["来源PDF页码"],
    status: row["状态/备注"],
  }));

  fs.rmSync(OUT_DIR, { recursive: true, force: true });

  for (const detail of details) {
    writeJson(path.join(OUT_DIR, "detail", `${detail.slug}.json`), detail);
  }

  writeJson(path.join(OUT_DIR, "detail", "index.json"), details);
  writeJson(path.join(OUT_DIR, "selection", "cards.json"), cards);
  writeJson(path.join(OUT_DIR, "routes", "routes.json"), routes);
  writeJson(path.join(OUT_DIR, "media", "media.json"), media);
  writeJson(path.join(OUT_DIR, "summary", "summary.json"), {
    sourceFile: SOURCE_FILE,
    generatedAt: new Date().toISOString(),
    seriesCount: details.length,
    selectionCardCount: cards.length,
    specRowCount: specRows.length,
    modelConfigCount: modelRows.length,
    faqCount: faqRows.length,
    mediaCount: media.length,
    routeCount: routes.length,
    namingRules: namingRows,
    series: details.map(item => ({
      seriesId: item.seriesId,
      slug: item.slug,
      title: item.title,
      path: item.path,
    })),
  });

  console.log("\n=== 生成完成 ===");
  console.log(`输出目录：${OUT_DIR}`);
  console.log(`系列详情：${details.length}`);
  console.log(`选型卡片：${cards.length}`);
  console.log(`规格参数：${specRows.length}`);
  console.log(`型号配置：${modelRows.length}`);
  console.log(`FAQ：${faqRows.length}`);
  console.log(`媒体资源：${media.length}`);
  console.log(`路由：${routes.length}`);
}

main();


