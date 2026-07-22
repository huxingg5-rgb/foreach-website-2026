const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const workbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const imageDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\Panel mount union\\穿版倒刺接头产品图_JPG\\新建文件夹";

const drawingDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\Panel mount union\\穿版倒刺接头2D_PDF";

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-and-nut-resource-audit.md"
);

/*
 * 用户从当前产品资料页补充确认的六角螺母。
 * 如果Excel中已经存在同型号，会自动按型号合并，不会重复。
 */
const supplementalRecords = [
  {
    source: "用户补充资料页",
    productType: "六角螺母",
    model: "PMBSN-U28-PA-W",
    productCode: "809498",
    internalCode: "",
  },
  {
    source: "用户补充资料页",
    productType: "六角螺母",
    model: "PMBSN-U28-PP-N",
    productCode: "809464",
    internalCode: "",
  },
];

function text(value) {
  return String(value ?? "").trim();
}

function normalizeName(value) {
  return text(value)
    .normalize("NFKC")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[（）()【】[\]]/g, "")
    .replace(/_/g, "-");
}

function relativeToRoot(filePath) {
  if (!filePath) {
    return "";
  }

  const relative = path.relative(root, filePath);

  if (!relative.startsWith("..") && !path.isAbsolute(relative)) {
    return relative.replace(/\\/g, "/");
  }

  return filePath;
}

function findSheetName(workbook) {
  const exact = workbook.SheetNames.find(
    (name) => text(name) === "08_穿板倒刺接头"
  );

  if (exact) {
    return exact;
  }

  const fuzzy = workbook.SheetNames.find((name) =>
    text(name).includes("穿板倒刺")
  );

  if (!fuzzy) {
    throw new Error("Excel中没有找到“08_穿板倒刺接头”Sheet。");
  }

  return fuzzy;
}

function extractModel(values) {
  const joined = values.map(text).join(" ");

  const match = joined.match(
    /\b(?:PMBSN|PMB)-(?:U28|M6|M10|M12)-[A-Z0-9-]+\b/i
  );

  return match ? match[0].toUpperCase() : "";
}

function extractProductCode(values) {
  for (const value of values) {
    const normalized = text(value);

    if (/^\d{6}$/.test(normalized)) {
      return normalized;
    }
  }

  return "";
}

function extractInternalCode(values) {
  for (const value of values) {
    const normalized = text(value);

    if (/^\d{3}-\d{2}-\d{5}$/.test(normalized)) {
      return normalized;
    }
  }

  return "";
}

function classifyModel(model) {
  if (/^PMBSN-/i.test(model)) {
    return "六角螺母";
  }

  if (/^PMB-/i.test(model)) {
    return "穿板倒刺接头";
  }

  return "";
}

function walk(directory, allowedExtensions) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const results = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(fullPath, allowedExtensions));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (allowedExtensions.has(extension)) {
      results.push(fullPath);
    }
  }

  return results.sort((a, b) =>
    a.localeCompare(b, "zh-CN", { numeric: true })
  );
}

function extractModelsFromFilename(filePath) {
  const filename = path.basename(filePath, path.extname(filePath));
  const normalized = normalizeName(filename);

  return [
    ...normalized.matchAll(
      /(?:PMBSN|PMB)-(?:U28|M6|M10|M12)-[A-Z0-9-]+/g
    ),
  ].map((match) =>
    match[0]
      .replace(/-C$/i, "")
      .replace(/-2D$/i, "")
      .replace(/-DRAWING$/i, "")
  );
}

function matchFiles(record, files) {
  const modelKey = normalizeName(record.model);
  const productCodeKey = normalizeName(record.productCode);
  const internalCodeKey = normalizeName(record.internalCode);

  return files.filter((filePath) => {
    const filename = normalizeName(path.basename(filePath));

    if (modelKey && filename.includes(modelKey)) {
      return true;
    }

    if (productCodeKey && filename.includes(productCodeKey)) {
      return true;
    }

    if (internalCodeKey && filename.includes(internalCodeKey)) {
      return true;
    }

    return false;
  });
}

function mergeRecords(excelRecords, supplements) {
  const map = new Map();

  for (const record of [...excelRecords, ...supplements]) {
    const key = normalizeName(record.model);

    if (!key) {
      continue;
    }

    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        ...record,
        sources: [record.source],
      });
      continue;
    }

    map.set(key, {
      ...existing,
      productType: existing.productType || record.productType,
      productCode: existing.productCode || record.productCode,
      internalCode: existing.internalCode || record.internalCode,
      excelRow: existing.excelRow || record.excelRow,
      sources: [...new Set([...(existing.sources || []), record.source])],
    });
  }

  return [...map.values()].sort((a, b) =>
    a.model.localeCompare(b.model, "en", { numeric: true })
  );
}

function markdownCell(value) {
  return text(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

if (!fs.existsSync(workbookPath)) {
  throw new Error(`未找到权威Excel：${workbookPath}`);
}

const workbook = XLSX.readFile(workbookPath, {
  raw: false,
  cellDates: false,
});

const sheetName = findSheetName(workbook);
const sheet = workbook.Sheets[sheetName];

const rows = XLSX.utils.sheet_to_json(sheet, {
  header: 1,
  raw: false,
  defval: "",
});

const excelRecords = rows
  .map((row, index) => {
    const values = Array.isArray(row) ? row.map(text) : [];
    const model = extractModel(values);

    if (!model) {
      return null;
    }

    return {
      source: "权威Excel",
      excelRow: index + 1,
      productType: classifyModel(model),
      model,
      productCode: extractProductCode(values),
      internalCode: extractInternalCode(values),
      raw: values.filter(Boolean).join("｜"),
    };
  })
  .filter(Boolean);

const mergedRecords = mergeRecords(
  excelRecords,
  supplementalRecords
);

const imageFiles = walk(
  imageDirectory,
  new Set([".jpg", ".jpeg", ".png", ".webp"])
);

const drawingFiles = walk(
  drawingDirectory,
  new Set([".pdf"])
);

const auditedRecords = mergedRecords.map((record) => {
  const imageMatches = matchFiles(record, imageFiles);
  const drawingMatches = matchFiles(record, drawingFiles);

  return {
    ...record,
    imageMatches,
    drawingMatches,
  };
});

const matchedImageSet = new Set(
  auditedRecords.flatMap((record) => record.imageMatches)
);

const matchedDrawingSet = new Set(
  auditedRecords.flatMap((record) => record.drawingMatches)
);

const unmatchedImages = imageFiles.filter(
  (filePath) => !matchedImageSet.has(filePath)
);

const unmatchedDrawings = drawingFiles.filter(
  (filePath) => !matchedDrawingSet.has(filePath)
);

const filenameModels = [
  ...new Set(
    [...imageFiles, ...drawingFiles]
      .flatMap(extractModelsFromFilename)
      .filter(Boolean)
  ),
].sort((a, b) =>
  a.localeCompare(b, "en", { numeric: true })
);

const knownModelSet = new Set(
  mergedRecords.map((record) => normalizeName(record.model))
);

const resourceOnlyModels = filenameModels.filter(
  (model) => !knownModelSet.has(normalizeName(model))
);

const pmbRecords = auditedRecords.filter(
  (record) => record.productType === "穿板倒刺接头"
);

const nutRecords = auditedRecords.filter(
  (record) => record.productType === "六角螺母"
);

const missingImages = auditedRecords.filter(
  (record) => record.imageMatches.length === 0
);

const missingDrawings = auditedRecords.filter(
  (record) => record.drawingMatches.length === 0
);

const duplicateImageMatches = auditedRecords.filter(
  (record) => record.imageMatches.length > 1
);

const duplicateDrawingMatches = auditedRecords.filter(
  (record) => record.drawingMatches.length > 1
);

const report = [];

report.push("# 穿板倒刺接头与六角螺母资源检查");
report.push("");
report.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
report.push("");

report.push("## 一、数据源");
report.push("");
report.push(`- Excel：${relativeToRoot(workbookPath)}`);
report.push(`- Sheet：${sheetName}`);
report.push(`- Excel识别型号：${excelRecords.length}`);
report.push(`- 用户补充六角螺母：${supplementalRecords.length}`);
report.push(`- 合并后唯一型号：${auditedRecords.length}`);
report.push(`- PMB穿板倒刺接头：${pmbRecords.length}`);
report.push(`- PMBSN六角螺母：${nutRecords.length}`);
report.push("");

report.push("## 二、资源目录");
report.push("");
report.push(`- 产品图目录存在：${fs.existsSync(imageDirectory) ? "是" : "否"}`);
report.push(`- 产品图目录：${imageDirectory}`);
report.push(`- 产品图文件数：${imageFiles.length}`);
report.push(`- 2D目录存在：${fs.existsSync(drawingDirectory) ? "是" : "否"}`);
report.push(`- 2D目录：${drawingDirectory}`);
report.push(`- PDF文件数：${drawingFiles.length}`);
report.push("");

report.push("## 三、型号资源匹配");
report.push("");
report.push(
  "| 产品结构 | 型号 | 商品编码 | 数据来源 | 产品图 | 2D PDF |"
);
report.push("|---|---|---|---|---:|---:|");

for (const record of auditedRecords) {
  report.push(
    `| ${markdownCell(record.productType)} | ` +
      `${markdownCell(record.model)} | ` +
      `${markdownCell(record.productCode)} | ` +
      `${markdownCell((record.sources || []).join("、"))} | ` +
      `${record.imageMatches.length} | ` +
      `${record.drawingMatches.length} |`
  );
}

report.push("");

report.push("## 四、产品图匹配明细");
report.push("");

for (const record of auditedRecords) {
  report.push(`### ${record.model}`);
  report.push("");

  if (record.imageMatches.length) {
    for (const filePath of record.imageMatches) {
      report.push(`- ${filePath}`);
    }
  } else {
    report.push("- 未匹配");
  }

  report.push("");
}

report.push("## 五、2D PDF匹配明细");
report.push("");

for (const record of auditedRecords) {
  report.push(`### ${record.model}`);
  report.push("");

  if (record.drawingMatches.length) {
    for (const filePath of record.drawingMatches) {
      report.push(`- ${filePath}`);
    }
  } else {
    report.push("- 未匹配");
  }

  report.push("");
}

report.push("## 六、缺失与重复");
report.push("");
report.push(`- 缺产品图型号：${missingImages.length}`);
report.push(`- 缺2D PDF型号：${missingDrawings.length}`);
report.push(`- 匹配多张产品图的型号：${duplicateImageMatches.length}`);
report.push(`- 匹配多个PDF的型号：${duplicateDrawingMatches.length}`);
report.push("");

if (missingImages.length) {
  report.push("### 缺产品图");
  report.push("");

  for (const record of missingImages) {
    report.push(`- ${record.model}｜${record.productCode}`);
  }

  report.push("");
}

if (missingDrawings.length) {
  report.push("### 缺2D PDF");
  report.push("");

  for (const record of missingDrawings) {
    report.push(`- ${record.model}｜${record.productCode}`);
  }

  report.push("");
}

if (duplicateImageMatches.length) {
  report.push("### 多图匹配");
  report.push("");

  for (const record of duplicateImageMatches) {
    report.push(`- ${record.model}：${record.imageMatches.length}张`);
  }

  report.push("");
}

if (duplicateDrawingMatches.length) {
  report.push("### 多PDF匹配");
  report.push("");

  for (const record of duplicateDrawingMatches) {
    report.push(`- ${record.model}：${record.drawingMatches.length}个`);
  }

  report.push("");
}

report.push("## 七、资源目录中未归属文件");
report.push("");
report.push(`- 未归属产品图：${unmatchedImages.length}`);
report.push(`- 未归属PDF：${unmatchedDrawings.length}`);
report.push("");

if (unmatchedImages.length) {
  report.push("### 未归属产品图");
  report.push("");

  for (const filePath of unmatchedImages) {
    report.push(`- ${filePath}`);
  }

  report.push("");
}

if (unmatchedDrawings.length) {
  report.push("### 未归属PDF");
  report.push("");

  for (const filePath of unmatchedDrawings) {
    report.push(`- ${filePath}`);
  }

  report.push("");
}

report.push("## 八、从资源文件名识别出的新增型号");
report.push("");

if (resourceOnlyModels.length) {
  for (const model of resourceOnlyModels) {
    report.push(`- ${model}`);
  }
} else {
  report.push("- 没有发现数据源之外的明确型号");
}

report.push("");

report.push("## 九、下一步生成规则");
report.push("");
report.push("- PMB与PMBSN继续归入同一个产品类型：`bulkhead-barbed-fittings`");
report.push("- 筛选增加“产品结构”：穿板倒刺接头、六角螺母");
report.push("- PMB保留接管内径筛选；PMBSN不设置接管内径");
report.push("- 图片只复制已精确匹配的文件");
report.push("- 2D只挂载已精确匹配的PDF");
report.push("- 未匹配或多重匹配资源不自动写入页面");
report.push("");

fs.mkdirSync(path.dirname(reportPath), {
  recursive: true,
});

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log("============================================");
console.log("穿板倒刺接头与六角螺母资源检查完成");
console.log("============================================");
console.log("Excel型号：", excelRecords.length);
console.log("合并型号：", auditedRecords.length);
console.log("PMB：", pmbRecords.length);
console.log("PMBSN：", nutRecords.length);
console.log("产品图：", imageFiles.length);
console.log("PDF：", drawingFiles.length);
console.log("缺产品图：", missingImages.length);
console.log("缺PDF：", missingDrawings.length);
console.log("");
console.log("报告：");
console.log(reportPath);
console.log("");
