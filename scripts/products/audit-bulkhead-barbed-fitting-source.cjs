const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const sourceDirectory = path.join(
  root,
  "data-source",
  "product-center",
  "fittings"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-fitting-source-audit.md"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const routeMapCandidates = [
  path.join(
    root,
    "data",
    "products",
    "product-route-map.ts"
  ),
  path.join(
    root,
    "data",
    "products",
    "selection",
    "product-route-map.ts"
  ),
];

function text(value) {
  return String(value ?? "").trim();
}

function normalize(value) {
  return text(value)
    .replace(/\s+/g, " ")
    .trim();
}

function findWorkbook() {
  if (!fs.existsSync(sourceDirectory)) {
    throw new Error(
      "未找到接头数据目录：" +
        sourceDirectory
    );
  }

  const files = fs
    .readdirSync(sourceDirectory)
    .filter(
      (name) =>
        /FRGD-140D-2606-0002_001_cn_连接件标品在售清单.*\.xlsx$/i.test(
          name
        ) &&
        !name.startsWith("~$")
    )
    .map(
      (name) =>
        path.join(
          sourceDirectory,
          name
        )
    )
    .sort(
      (a, b) =>
        fs.statSync(b).mtimeMs -
        fs.statSync(a).mtimeMs
    );

  if (!files.length) {
    throw new Error(
      "没有找到连接件标品在售清单。"
    );
  }

  return files[0];
}

function findSheetName(workbook) {
  const exact = workbook.SheetNames.find(
    (name) =>
      normalize(name) ===
      "08_穿板倒刺接头"
  );

  if (exact) {
    return exact;
  }

  const fuzzy = workbook.SheetNames.find(
    (name) =>
      normalize(name).includes(
        "穿板倒刺"
      )
  );

  if (!fuzzy) {
    throw new Error(
      "Excel中没有找到穿板倒刺接头Sheet。"
    );
  }

  return fuzzy;
}

function walk(directory, depth = 0) {
  if (
    depth > 6 ||
    !fs.existsSync(directory)
  ) {
    return [];
  }

  const files = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    if (
      [
        "node_modules",
        ".next",
        "out",
        ".git",
      ].includes(entry.name)
    ) {
      continue;
    }

    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...walk(
          fullPath,
          depth + 1
        )
      );
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function extractProductCode(row) {
  for (const value of row) {
    const raw = text(value);

    if (/^\d{6}$/.test(raw)) {
      return raw;
    }
  }

  return "";
}

function extractModel(row) {
  const joined = row
    .map(text)
    .join(" ");

  const matches =
    joined.match(
      /\b(?:PMBSN|PMB)-[A-Z0-9-]+\b/gi
    ) || [];

  return matches.length
    ? matches[0].toUpperCase()
    : "";
}

function classifyRow(row) {
  const joined = row
    .map(text)
    .join(" ");

  if (/PMBSN|六角螺母/i.test(joined)) {
    return "六角螺母";
  }

  if (/PMB|穿板倒刺/i.test(joined)) {
    return "穿板倒刺接头";
  }

  return "";
}

const workbookPath =
  findWorkbook();

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      cellDates: false,
      raw: false,
    }
  );

const sheetName =
  findSheetName(workbook);

const sheet =
  workbook.Sheets[
    sheetName
  ];

const rows =
  XLSX.utils.sheet_to_json(
    sheet,
    {
      header: 1,
      defval: "",
      raw: false,
    }
  );

const nonEmptyRows =
  rows
    .map(
      (row, index) => ({
        excelRow:
          index + 1,

        values:
          Array.isArray(row)
            ? row.map(text)
            : [],
      })
    )
    .filter(
      (item) =>
        item.values.some(Boolean)
    );

const businessRows =
  nonEmptyRows
    .map((item) => {
      const productCode =
        extractProductCode(
          item.values
        );

      const model =
        extractModel(
          item.values
        );

      const structure =
        classifyRow(
          item.values
        );

      return {
        ...item,
        productCode,
        model,
        structure,
      };
    })
    .filter(
      (item) =>
        item.model ||
        item.productCode ||
        item.structure
    );

const uniqueModels = [
  ...new Set(
    businessRows
      .map(
        (item) =>
          item.model
      )
      .filter(Boolean)
  ),
];

const uniqueProductCodes = [
  ...new Set(
    businessRows
      .map(
        (item) =>
          item.productCode
      )
      .filter(Boolean)
  ),
];

const pmbModels =
  uniqueModels.filter(
    (model) =>
      /^PMB-/i.test(model)
  );

const nutModels =
  uniqueModels.filter(
    (model) =>
      /^PMBSN-/i.test(model)
  );

const clientSource =
  fs.existsSync(clientPath)
    ? fs.readFileSync(
        clientPath,
        "utf8"
      )
    : "";

const luerContext = clientSource
  .split(/\r?\n/)
  .map(
    (line, index) => ({
      lineNumber:
        index + 1,
      line,
    })
  )
  .filter(
    (item) =>
      /luer-fittings|鲁尔接头/i.test(
        item.line
      )
  );

const allProjectFiles =
  walk(root);

const imageFiles =
  allProjectFiles.filter(
    (filePath) => {
      if (
        !/\.(png|jpg|jpeg|webp)$/i.test(
          filePath
        )
      ) {
        return false;
      }

      const name =
        path.basename(
          filePath
        );

      return (
        /PMB|PMBSN|穿板倒刺/i.test(
          name
        ) ||
        uniqueProductCodes.some(
          (code) =>
            code &&
            name.includes(code)
        )
      );
    }
  );

const existingBulkheadFiles =
  allProjectFiles.filter(
    (filePath) =>
      /bulkhead-barbed|穿板倒刺/i.test(
        relative(filePath)
      )
  );

const routeMapFiles =
  routeMapCandidates.filter(
    (filePath) =>
      fs.existsSync(filePath)
  );

const report = [];

report.push(
  "# 穿板倒刺接头数据源与页面接入检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、权威数据源"
);
report.push("");

report.push(
  `- Excel：${relative(workbookPath)}`
);
report.push(
  `- Sheet：${sheetName}`
);
report.push(
  `- 非空行：${nonEmptyRows.length}`
);
report.push(
  `- 识别业务行：${businessRows.length}`
);
report.push(
  `- 唯一型号：${uniqueModels.length}`
);
report.push(
  `- 唯一商品编码：${uniqueProductCodes.length}`
);
report.push("");

report.push(
  "## 二、型号分类"
);
report.push("");

report.push(
  `- PMB穿板倒刺接头：${pmbModels.length}`
);
report.push(
  `- PMBSN六角螺母：${nutModels.length}`
);
report.push("");

report.push(
  "### PMB型号"
);
report.push("");

if (pmbModels.length) {
  for (const model of pmbModels) {
    report.push(
      `- ${model}`
    );
  }
} else {
  report.push(
    "- 未识别到PMB型号"
  );
}

report.push("");

report.push(
  "### PMBSN型号"
);
report.push("");

if (nutModels.length) {
  for (const model of nutModels) {
    report.push(
      `- ${model}`
    );
  }
} else {
  report.push(
    "- 未识别到PMBSN型号"
  );
}

report.push("");

report.push(
  "## 三、Excel业务行"
);
report.push("");

report.push(
  "| Excel行 | 分类 | 型号 | 商品编码 | 原始内容 |"
);
report.push(
  "|---:|---|---|---|---|"
);

for (const item of businessRows) {
  report.push(
    `| ${item.excelRow} | ${item.structure} | ${item.model} | ${item.productCode} | ${item.values.join("｜").replace(/\|/g, "\\|")} |`
  );
}

report.push("");

report.push(
  "## 四、鲁尔接头同级接入位置"
);
report.push("");

report.push(
  `- ProductSelectionClient存在：${fs.existsSync(clientPath) ? "是" : "否"}`
);
report.push(
  `- 鲁尔接头相关代码行：${luerContext.length}`
);
report.push("");

for (
  const item
  of luerContext.slice(0, 80)
) {
  report.push(
    `- 第${item.lineNumber}行：\`${item.line.trim().replace(/`/g, "\\`")}\``
  );
}

report.push("");

report.push(
  "## 五、现有路由映射文件"
);
report.push("");

if (routeMapFiles.length) {
  for (const filePath of routeMapFiles) {
    report.push(
      `- ${relative(filePath)}`
    );
  }
} else {
  report.push(
    "- 未找到候选路由映射文件"
  );
}

report.push("");

report.push(
  "## 六、图片资源"
);
report.push("");

report.push(
  `- 命中图片：${imageFiles.length}`
);
report.push("");

if (imageFiles.length) {
  for (const filePath of imageFiles) {
    report.push(
      `- ${relative(filePath)}`
    );
  }
} else {
  report.push(
    "- 暂未找到PMB、PMBSN或商品编码命名的图片"
  );
}

report.push("");

report.push(
  "## 七、项目内已有穿板倒刺文件"
);
report.push("");

if (existingBulkheadFiles.length) {
  for (
    const filePath
    of existingBulkheadFiles.slice(0, 100)
  ) {
    report.push(
      `- ${relative(filePath)}`
    );
  }
} else {
  report.push(
    "- 暂无现成穿板倒刺页面或生成文件"
  );
}

report.push("");

report.push(
  "## 八、建议页面架构"
);
report.push("");

report.push(
  "- 产品类型ID：`bulkhead-barbed-fittings`"
);
report.push(
  "- 选型页：`/products/fittings/bulkhead-barbed-fittings`"
);
report.push(
  "- 详情页：`/products/fittings/bulkhead-barbed-fittings/[slug]`"
);
report.push(
  "- 选型数据：`data/products/selection/bulkhead-barbed-fitting-selection.generated.ts`"
);
report.push(
  "- 详情数据：`data/products/generated/fittings/bulkhead-barbed-fittings/detail/index.json`"
);
report.push(
  "- 继续复用 `ProductSelectionClient`、`ProductFilterPanel` 和 `ProductDetailClient`"
);
report.push(
  "- 不新增穿板倒刺专属CSS"
);
report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

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
  "穿板倒刺接头数据源检查完成"
);
console.log(
  "============================================"
);
console.log(
  "Sheet：",
  sheetName
);
console.log(
  "业务行：",
  businessRows.length
);
console.log(
  "唯一型号：",
  uniqueModels.length
);
console.log(
  "PMB：",
  pmbModels.length
);
console.log(
  "PMBSN：",
  nutModels.length
);
console.log(
  "图片：",
  imageFiles.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
