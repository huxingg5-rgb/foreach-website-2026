const fs = require("fs");
const path = require("path");

const root = process.cwd();

const drawingSourceDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\For rigid tubing\\图纸_pdf";

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "hard-tube-fittings",
  "detail",
  "index.json"
);

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "hard-tube-fitting-drawing-match-audit.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return text(value)
    .normalize("NFKC")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[（）()【】[\]]/g, "")
    .replace(/_/g, "-")
    .replace(/–|—/g, "-");
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

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const results = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
      continue;
    }

    if (/\.pdf$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }

  return results.sort((a, b) =>
    a.localeCompare(b, "zh-CN", { numeric: true })
  );
}

function collectStringValues(value, results = []) {
  if (typeof value === "string") {
    const normalized = text(value);

    if (normalized) {
      results.push(normalized);
    }

    return results;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectStringValues(item, results);
    }

    return results;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectStringValues(item, results);
    }
  }

  return results;
}

function buildMatchTokens(detail) {
  const tokens = new Set();

  const add = (value, type, priority) => {
    const raw = text(value);

    if (!raw) {
      return;
    }

    const normalized = normalize(raw);

    if (!normalized || normalized.length < 4) {
      return;
    }

    tokens.add(
      JSON.stringify({
        raw,
        normalized,
        type,
        priority,
      })
    );
  };

  add(detail.model, "型号", 100);
  add(detail.displayModel, "展示型号", 98);
  add(detail.modelDisplay, "展示型号", 98);
  add(detail.foreachModel, "FOREACH型号", 96);
  add(detail.productCode, "商品编码", 92);
  add(detail.productId, "产品ID", 90);

  for (const value of detail.productCodes || []) {
    add(value, "商品编码", 92);
  }

  for (const value of detail.productIds || []) {
    add(value, "产品ID", 90);
  }

  for (const value of detail.internalCodes || []) {
    add(value, "料号", 95);
  }

  /*
   * 规格表中有时会保存型号、商品编码或料号。
   * 只提取这些明确字段，不用名称、材质等通用文本做匹配。
   */
  for (const spec of detail.specs || detail.specifications || []) {
    const label = text(spec?.label);
    const value = text(spec?.value);

    if (/型号/.test(label)) {
      add(value, "规格型号", 97);
    } else if (/商品编码/.test(label)) {
      add(value, "规格商品编码", 92);
    } else if (/料号|内部编码/.test(label)) {
      add(value, "规格料号", 95);
    }
  }

  return [...tokens]
    .map((value) => JSON.parse(value))
    .sort((a, b) => b.priority - a.priority);
}

function scoreMatch(filenameNormalized, token) {
  if (!token.normalized) {
    return 0;
  }

  if (filenameNormalized === token.normalized) {
    return token.priority + 100;
  }

  const withoutCommonSuffix = filenameNormalized
    .replace(/-(?:2D|DRAWING|图纸|外形图|安装图|C|V\d+)$/i, "")
    .replace(/\.PDF$/i, "");

  if (withoutCommonSuffix === token.normalized) {
    return token.priority + 80;
  }

  if (filenameNormalized.includes(token.normalized)) {
    return token.priority + 40;
  }

  const compactFilename = filenameNormalized.replace(/-/g, "");
  const compactToken = token.normalized.replace(/-/g, "");

  if (
    compactToken.length >= 6 &&
    compactFilename.includes(compactToken)
  ) {
    return token.priority + 20;
  }

  return 0;
}

function findMatches(detail, pdfFiles) {
  const tokens = buildMatchTokens(detail);
  const matches = [];

  for (const filePath of pdfFiles) {
    const filename = path.basename(
      filePath,
      path.extname(filePath)
    );

    const filenameNormalized = normalize(filename);

    let best = null;

    for (const token of tokens) {
      const score = scoreMatch(filenameNormalized, token);

      if (!score) {
        continue;
      }

      if (!best || score > best.score) {
        best = {
          score,
          token,
        };
      }
    }

    if (best) {
      matches.push({
        filePath,
        score: best.score,
        tokenType: best.token.type,
        token: best.token.raw,
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}

function markdownCell(value) {
  return text(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

if (!fs.existsSync(detailPath)) {
  throw new Error(
    "未找到硬管接头详情数据：" +
      detailPath
  );
}

const details = JSON.parse(
  fs.readFileSync(detailPath, "utf8")
);

if (!Array.isArray(details)) {
  throw new Error(
    "硬管接头详情数据不是数组。"
  );
}

const pdfFiles = walk(drawingSourceDirectory);

const audited = details.map((detail) => {
  const matches = findMatches(detail, pdfFiles);

  return {
    model: text(detail.model),
    productCode: text(detail.productCode),
    internalCodes: Array.isArray(detail.internalCodes)
      ? detail.internalCodes.map(text).filter(Boolean)
      : [],
    slug: text(detail.slug),
    currentDrawing:
      text(detail.drawing2dUrl) ||
      text(detail.drawingPdfUrl) ||
      "",
    matches,
  };
});

const matchedPdfSet = new Set(
  audited.flatMap((item) =>
    item.matches.map((match) => match.filePath)
  )
);

const unmatchedPdfs = pdfFiles.filter(
  (filePath) => !matchedPdfSet.has(filePath)
);

const noMatchDetails = audited.filter(
  (item) => item.matches.length === 0
);

const singleMatchDetails = audited.filter(
  (item) => item.matches.length === 1
);

const multipleMatchDetails = audited.filter(
  (item) => item.matches.length > 1
);

const exactHighConfidence = audited.filter(
  (item) =>
    item.matches.length >= 1 &&
    item.matches[0].score >= 170
);

const report = [];

report.push("# 硬管接头2D图纸匹配检查");
report.push("");
report.push(`生成时间：${new Date().toLocaleString("zh-CN")}`);
report.push("");

report.push("## 一、数据与资源");
report.push("");
report.push(`- 详情数据：${relativeToRoot(detailPath)}`);
report.push(`- 选型数据存在：${fs.existsSync(selectionPath) ? "是" : "否"}`);
report.push(`- 图纸目录存在：${fs.existsSync(drawingSourceDirectory) ? "是" : "否"}`);
report.push(`- 图纸目录：${drawingSourceDirectory}`);
report.push(`- PDF数量：${pdfFiles.length}`);
report.push(`- 硬管接头详情数量：${details.length}`);
report.push("");

report.push("## 二、匹配统计");
report.push("");
report.push(`- 有且仅有一个候选图纸：${singleMatchDetails.length}`);
report.push(`- 有多个候选图纸：${multipleMatchDetails.length}`);
report.push(`- 没有候选图纸：${noMatchDetails.length}`);
report.push(`- 高置信度首选匹配：${exactHighConfidence.length}`);
report.push(`- 未归属PDF：${unmatchedPdfs.length}`);
report.push("");

report.push("## 三、每个型号匹配结果");
report.push("");
report.push(
  "| 型号 | 商品编码 | 料号 | 当前2D | 候选数 | 首选PDF | 匹配依据 | 分数 |"
);
report.push(
  "|---|---|---|---|---:|---|---|---:|"
);

for (const item of audited) {
  const first = item.matches[0];

  report.push(
    `| ${markdownCell(item.model)} | ` +
      `${markdownCell(item.productCode)} | ` +
      `${markdownCell(item.internalCodes.join(" / "))} | ` +
      `${markdownCell(item.currentDrawing || "空")} | ` +
      `${item.matches.length} | ` +
      `${markdownCell(first ? first.filePath : "未匹配")} | ` +
      `${markdownCell(first ? `${first.tokenType}：${first.token}` : "")} | ` +
      `${first ? first.score : 0} |`
  );
}

report.push("");

if (multipleMatchDetails.length) {
  report.push("## 四、多候选型号");
  report.push("");

  for (const item of multipleMatchDetails) {
    report.push(`### ${item.model}`);
    report.push("");

    for (const match of item.matches) {
      report.push(
        `- ${match.filePath}｜${match.tokenType}：${match.token}｜分数 ${match.score}`
      );
    }

    report.push("");
  }
}

if (noMatchDetails.length) {
  report.push("## 五、未匹配型号");
  report.push("");

  for (const item of noMatchDetails) {
    report.push(
      `- ${item.model}｜商品编码 ${item.productCode || "空"}｜料号 ${
        item.internalCodes.join(" / ") || "空"
      }`
    );
  }

  report.push("");
}

report.push("## 六、未归属PDF");
report.push("");

if (unmatchedPdfs.length) {
  for (const filePath of unmatchedPdfs) {
    report.push(`- ${filePath}`);
  }
} else {
  report.push("- 无");
}

report.push("");

report.push("## 七、下一步导入原则");
report.push("");
report.push("- 优先使用型号、料号、商品编码精确匹配");
report.push("- 单一高置信度匹配可自动复制并挂载到详情页");
report.push("- 多候选型号先人工确认，不自动覆盖");
report.push("- 未归属PDF不猜测绑定");
report.push("- 继续复用现有 ProductDetailClient 的2D图纸预览");
report.push("- 不新增硬管接头专属CSS");
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
console.log("硬管接头2D图纸匹配检查完成");
console.log("============================================");
console.log("PDF数量：", pdfFiles.length);
console.log("详情数量：", details.length);
console.log("单一匹配：", singleMatchDetails.length);
console.log("多候选：", multipleMatchDetails.length);
console.log("未匹配：", noMatchDetails.length);
console.log("未归属PDF：", unmatchedPdfs.length);
console.log("");
console.log("报告：");
console.log(reportPath);
console.log("");
