const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const drawingSourceDirectory =
  "H:\\01-官网项目\\02_产品中心\\fit\\For rigid tubing\\图纸_pdf";

const workbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

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

const publicDirectory = path.join(
  root,
  "public",
  "assets",
  "products",
  "fittings",
  "hard-tube-fittings",
  "2d-drawings"
);

const reportPath = path.join(
  root,
  "reports",
  "hard-tube-fitting-drawing-import-report.md"
);

const manifestPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "hard-tube-fittings",
  "drawing-manifest.json"
);

function text(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return text(value)
    .normalize("NFKC")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/_/g, "-")
    .replace(/–|—/g, "-");
}

function slug(value) {
  return text(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function walkPdf(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const results = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkPdf(fullPath));
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

function getAllDetailText(detail) {
  const values = [];

  function collect(value) {
    if (typeof value === "string") {
      const normalized = text(value);

      if (normalized) {
        values.push(normalized);
      }

      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        collect(item);
      }

      return;
    }

    if (value && typeof value === "object") {
      for (const item of Object.values(value)) {
        collect(item);
      }
    }
  }

  collect(detail);

  return values.join(" ");
}

function getThreadCode(model) {
  const normalized = normalize(model);

  if (/-U28(?:-|$)/.test(normalized)) {
    return "U28";
  }

  if (/-U40(?:-|$)/.test(normalized)) {
    return "U40";
  }

  if (/-U32(?:-|$)/.test(normalized)) {
    return "U32";
  }

  if (/-M6(?:-|$)/.test(normalized)) {
    return "M6";
  }

  return "";
}

function getModelPrefix(model) {
  return normalize(model).split("-")[0] || "";
}

function getStructureKeyword(detail) {
  const allText = getAllDetailText(detail);

  if (/卡箍|卡环|FERRULE/i.test(allText)) {
    return "卡箍";
  }

  if (/平底|法兰|FLAT\s*BOTTOM/i.test(allText)) {
    return "平底";
  }

  return "";
}

function getPdfPublicName(sourcePath) {
  const base = path.basename(sourcePath);

  const fixedNames = {
    "HF系列标滚卡箍接头.pdf": "hf-standard-ferrule.pdf",
    "HF系列标滚平底接头.pdf": "hf-standard-flat-bottom.pdf",
    "HF6系列紧凑卡箍接头.pdf": "hf6-compact-ferrule.pdf",
    "HF6系列紧凑平底接头.pdf": "hf6-compact-flat-bottom.pdf",
  };

  if (fixedNames[base]) {
    return fixedNames[base];
  }

  return `${slug(path.basename(base, ".pdf"))}.pdf`;
}

function buildExcelRows() {
  if (!fs.existsSync(workbookPath)) {
    return [];
  }

  const workbook = XLSX.readFile(workbookPath, {
    raw: false,
    cellDates: false,
  });

  const rows = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const sheetRows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: false,
      defval: "",
    });

    sheetRows.forEach((row, index) => {
      const values = Array.isArray(row)
        ? row.map(text).filter(Boolean)
        : [];

      if (!values.length) {
        return;
      }

      rows.push({
        sheetName,
        excelRow: index + 1,
        values,
        normalized:
          normalize(values.join("|")),
      });
    });
  }

  return rows;
}

function getRelatedExcelRows(detail, excelRows) {
  const model = normalize(detail.model);
  const productCode = normalize(
    detail.productCode ||
      detail.productId
  );

  return excelRows.filter((row) => {
    if (
      model &&
      row.normalized.includes(model)
    ) {
      return true;
    }

    if (
      productCode &&
      row.normalized.includes(productCode)
    ) {
      return true;
    }

    return false;
  });
}

function numericCodeFromPdf(sourcePath) {
  const stem = path.basename(
    sourcePath,
    path.extname(sourcePath)
  );

  const match = stem.match(
    /^(\d{3}-\d{2}-\d{5})(?:-C)?$/i
  );

  return match
    ? match[1].toUpperCase()
    : "";
}

function familyRuleForPdf(sourcePath) {
  const base = path.basename(sourcePath);

  const rules = [
    {
      pattern: /^HFL-M6\.pdf$/i,
      prefix: "HFL",
      thread: "M6",
    },
    {
      pattern: /^HFL-U28\.pdf$/i,
      prefix: "HFL",
      thread: "U28",
    },
    {
      pattern: /^HFL6-M6\.pdf$/i,
      prefix: "HFL6",
      thread: "M6",
    },
    {
      pattern: /^HFL6-U28\.pdf$/i,
      prefix: "HFL6",
      thread: "U28",
    },
    {
      pattern: /^HNF-M6\.pdf$/i,
      prefix: "HNF",
      thread: "M6",
    },
    {
      pattern: /^HNF-U28\.pdf$/i,
      prefix: "HNF",
      thread: "U28",
    },
    {
      pattern: /^HNF6-M6\.pdf$/i,
      prefix: "HNF6",
      thread: "M6",
    },
    {
      pattern: /^HBL-M6\.pdf$/i,
      prefix: "HBL",
      thread: "M6",
    },
    {
      pattern: /^HBL-U28\.pdf$/i,
      prefix: "HBL",
      thread: "U28",
    },
    {
      pattern: /^HBL6-M6\.pdf$/i,
      prefix: "HBL6",
      thread: "M6",
    },
    {
      pattern: /^HBL6-U28\.pdf$/i,
      prefix: "HBL6",
      thread: "U28",
    },
  ];

  return rules.find((rule) =>
    rule.pattern.test(base)
  ) || null;
}

function hfRuleForPdf(sourcePath) {
  const base = path.basename(sourcePath);

  const rules = [
    {
      filename: "HF系列标滚卡箍接头.pdf",
      prefix: "HF",
      structure: "卡箍",
    },
    {
      filename: "HF系列标滚平底接头.pdf",
      prefix: "HF",
      structure: "平底",
    },
    {
      filename: "HF6系列紧凑卡箍接头.pdf",
      prefix: "HF6",
      structure: "卡箍",
    },
    {
      filename: "HF6系列紧凑平底接头.pdf",
      prefix: "HF6",
      structure: "平底",
    },
  ];

  return rules.find((rule) =>
    rule.filename === base
  ) || null;
}

function selectMatches(pdfPath, details, excelRows) {
  const numericCode =
    numericCodeFromPdf(pdfPath);

  if (numericCode) {
    const matches = details.filter((detail) =>
      getRelatedExcelRows(
        detail,
        excelRows
      ).some((row) =>
        row.normalized.includes(
          normalize(numericCode)
        )
      )
    );

    return {
      rule: `Excel同一行料号 ${numericCode}`,
      matches,
      confidence: 1000,
    };
  }

  const familyRule =
    familyRuleForPdf(pdfPath);

  if (familyRule) {
    const matches = details.filter((detail) => {
      return (
        getModelPrefix(detail.model) ===
          familyRule.prefix &&
        getThreadCode(detail.model) ===
          familyRule.thread
      );
    });

    return {
      rule:
        `${familyRule.prefix}系列 + ${familyRule.thread}螺纹`,
      matches,
      confidence: 900,
    };
  }

  const hfRule =
    hfRuleForPdf(pdfPath);

  if (hfRule) {
    const matches = details.filter((detail) => {
      return (
        getModelPrefix(detail.model) ===
          hfRule.prefix &&
        getStructureKeyword(detail) ===
          hfRule.structure
      );
    });

    return {
      rule:
        `${hfRule.prefix}系列 + ${hfRule.structure}结构`,
      matches,
      confidence: 850,
    };
  }

  return {
    rule: "未识别规则",
    matches: [],
    confidence: 0,
  };
}

if (!fs.existsSync(detailPath)) {
  throw new Error(
    "未找到硬管接头详情数据：" +
      detailPath
  );
}

if (!fs.existsSync(drawingSourceDirectory)) {
  throw new Error(
    "未找到硬管接头图纸目录：" +
      drawingSourceDirectory
  );
}

const originalDetails = JSON.parse(
  fs.readFileSync(detailPath, "utf8")
);

if (!Array.isArray(originalDetails)) {
  throw new Error(
    "硬管接头详情数据不是数组。"
  );
}

const pdfFiles =
  walkPdf(drawingSourceDirectory);

if (pdfFiles.length !== 20) {
  throw new Error(
    `PDF数量发生变化：${pdfFiles.length}/20`
  );
}

const excelRows =
  buildExcelRows();

const pdfMappings = pdfFiles.map((pdfPath) => {
  const selected = selectMatches(
    pdfPath,
    originalDetails,
    excelRows
  );

  return {
    sourcePath: pdfPath,
    sourceName: path.basename(pdfPath),
    publicName:
      getPdfPublicName(pdfPath),
    publicUrl:
      `/assets/products/fittings/hard-tube-fittings/2d-drawings/${getPdfPublicName(
        pdfPath
      )}`,
    ...selected,
  };
});

/*
 * 同一个型号只允许获得一份首选图纸。
 * 若同一型号命中多份，按规则置信度排序；
 * 分数相同则停止写入，避免静默覆盖。
 */
const candidatesBySlug =
  new Map();

for (const mapping of pdfMappings) {
  for (const detail of mapping.matches) {
    const key =
      text(detail.slug) ||
      text(detail.model);

    if (!candidatesBySlug.has(key)) {
      candidatesBySlug.set(key, []);
    }

    candidatesBySlug.get(key).push({
      mapping,
      detail,
    });
  }
}

const ambiguous = [];
const selectedBySlug =
  new Map();

for (const [key, candidates] of candidatesBySlug) {
  const sorted = candidates.sort(
    (a, b) =>
      b.mapping.confidence -
      a.mapping.confidence
  );

  if (
    sorted.length > 1 &&
    sorted[0].mapping.confidence ===
      sorted[1].mapping.confidence
  ) {
    ambiguous.push({
      key,
      candidates: sorted,
    });
    continue;
  }

  selectedBySlug.set(
    key,
    sorted[0].mapping
  );
}

if (ambiguous.length) {
  const message = ambiguous
    .map((item) =>
      `${item.key}: ${item.candidates
        .map((candidate) =>
          candidate.mapping.sourceName
        )
        .join(" / ")}`
    )
    .join("\n");

  throw new Error(
    "发现同分歧义匹配，未写入：\n" +
      message
  );
}

const updatedDetails =
  originalDetails.map((detail) => {
    const key =
      text(detail.slug) ||
      text(detail.model);

    const mapping =
      selectedBySlug.get(key);

    if (!mapping) {
      return detail;
    }

    return {
      ...detail,
      showDrawingRequest: true,
      drawing2dUrl:
        mapping.publicUrl,
      drawingPdfUrl:
        mapping.publicUrl,
      resources: {
        ...(detail.resources &&
        typeof detail.resources ===
          "object"
          ? detail.resources
          : {}),
        drawing2d:
          mapping.publicUrl,
      },
      drawingSource: {
        sourceFile:
          mapping.sourceName,
        matchRule:
          mapping.rule,
      },
    };
  });

const matchedDetails =
  updatedDetails.filter(
    (detail) =>
      text(detail.drawing2dUrl)
  );

const newlyMatchedDetails =
  originalDetails.filter((detail, index) => {
    return (
      !text(detail.drawing2dUrl) &&
      text(
        updatedDetails[index]
          .drawing2dUrl
      )
    );
  });

const unmatchedDetails =
  updatedDetails.filter(
    (detail) =>
      !text(detail.drawing2dUrl)
  );

const unusedPdfs =
  pdfMappings.filter(
    (mapping) =>
      mapping.matches.length === 0
  );

fs.mkdirSync(publicDirectory, {
  recursive: true,
});

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.mkdirSync(
  path.dirname(manifestPath),
  {
    recursive: true,
  }
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const detailBackup =
  `${detailPath}.bak_hard_tube_drawings_${stamp}`;

fs.copyFileSync(
  detailPath,
  detailBackup
);

const copiedFiles = [];

for (const mapping of pdfMappings) {
  const targetPath = path.join(
    publicDirectory,
    mapping.publicName
  );

  fs.copyFileSync(
    mapping.sourcePath,
    targetPath
  );

  copiedFiles.push({
    source:
      mapping.sourcePath,
    target:
      targetPath,
    url:
      mapping.publicUrl,
  });
}

fs.writeFileSync(
  detailPath,
  JSON.stringify(
    updatedDetails,
    null,
    2
  ) + "\n",
  "utf8"
);

const manifest = pdfMappings.map((mapping) => ({
  sourceFile:
    mapping.sourceName,
  publicUrl:
    mapping.publicUrl,
  matchRule:
    mapping.rule,
  confidence:
    mapping.confidence,
  matchedModels:
    mapping.matches.map(
      (detail) =>
        detail.model
    ),
  matchedProductCodes:
    mapping.matches.map(
      (detail) =>
        detail.productCode
    ),
}));

fs.writeFileSync(
  manifestPath,
  JSON.stringify(
    manifest,
    null,
    2
  ) + "\n",
  "utf8"
);

const report = [];

report.push(
  "# 硬管接头2D图纸导入与匹配结果"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push("## 一、结果");
report.push("");
report.push(
  `- 来源PDF：${pdfFiles.length}`
);
report.push(
  `- 已复制PDF：${copiedFiles.length}`
);
report.push(
  `- 详情总数：${updatedDetails.length}`
);
report.push(
  `- 已挂载2D图纸详情：${matchedDetails.length}`
);
report.push(
  `- 本次新增挂载：${newlyMatchedDetails.length}`
);
report.push(
  `- 仍未挂载详情：${unmatchedDetails.length}`
);
report.push(
  `- 未命中现有型号的PDF：${unusedPdfs.length}`
);
report.push("");

report.push(
  "## 二、每份PDF的匹配规则"
);
report.push("");

for (const mapping of pdfMappings) {
  report.push(
    `### ${mapping.sourceName}`
  );
  report.push("");
  report.push(
    `- 页面路径：${mapping.publicUrl}`
  );
  report.push(
    `- 匹配规则：${mapping.rule}`
  );
  report.push(
    `- 命中型号：${mapping.matches.length}`
  );

  for (const detail of mapping.matches) {
    report.push(
      `  - ${detail.model}｜${detail.productCode || ""}`
    );
  }

  report.push("");
}

if (unusedPdfs.length) {
  report.push(
    "## 三、已复制但未命中现有详情的PDF"
  );
  report.push("");

  for (const mapping of unusedPdfs) {
    report.push(
      `- ${mapping.sourceName}`
    );
  }

  report.push("");
  report.push(
    "这些文件已进入public资源目录，但当前147条硬管接头详情中没有可确认的对应型号，因此没有强行挂载。"
  );
  report.push("");
}

if (unmatchedDetails.length) {
  report.push(
    "## 四、仍没有2D图纸的现有型号"
  );
  report.push("");

  for (const detail of unmatchedDetails) {
    report.push(
      `- ${detail.model}｜${detail.productCode || ""}`
    );
  }

  report.push("");
}

report.push("## 五、文件");
report.push("");
report.push(
  `- 详情备份：${detailBackup}`
);
report.push(
  `- 图纸清单：${manifestPath}`
);
report.push(
  `- public目录：${publicDirectory}`
);
report.push("");

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "硬管接头2D图纸导入完成"
);
console.log(
  "============================================"
);
console.log(
  "来源PDF：",
  pdfFiles.length
);
console.log(
  "已复制PDF：",
  copiedFiles.length
);
console.log(
  "已挂载详情：",
  matchedDetails.length
);
console.log(
  "本次新增挂载：",
  newlyMatchedDetails.length
);
console.log(
  "仍未挂载详情：",
  unmatchedDetails.length
);
console.log(
  "未命中现有型号PDF：",
  unusedPdfs.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
