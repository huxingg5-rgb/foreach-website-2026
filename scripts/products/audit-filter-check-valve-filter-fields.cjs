const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const excelPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const sheetName = "06_单向阀、过滤器";

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-filter-field-audit.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("未找到文件：" + filePath);
  }

  return fs.readFileSync(filePath, "utf8");
}

function text(value) {
  return String(value ?? "").trim();
}

function findExportArray(source, exportName) {
  const declaration =
    new RegExp(
      `export\\s+const\\s+${exportName}\\s*=`
    );

  const match = source.match(declaration);

  if (!match || match.index == null) {
    throw new Error(
      "没有找到导出数组：" +
        exportName
    );
  }

  const start = source.indexOf(
    "[",
    match.index + match[0].length
  );

  if (start < 0) {
    throw new Error(
      "没有找到数组起点：" +
        exportName
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = start;
    index < source.length;
    index += 1
  ) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'"
    ) {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return JSON.parse(
          source.slice(
            start,
            index + 1
          )
        );
      }
    }
  }

  throw new Error(
    "数组没有正常结束：" +
      exportName
  );
}

function unique(values) {
  return [
    ...new Set(
      values
        .map(text)
        .filter(Boolean)
    ),
  ];
}

function markdownCell(value) {
  return text(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " / ");
}

/* =========================================================
   1. 读取生成数据
   ========================================================= */

const generatedSource =
  read(generatedPath);

const products =
  findExportArray(
    generatedSource,
    "filterCheckValveSelectionProducts"
  );

if (products.length !== 34) {
  throw new Error(
    `生成卡片数量异常：${products.length}/34`
  );
}

/* =========================================================
   2. 读取权威Excel
   ========================================================= */

if (!fs.existsSync(excelPath)) {
  throw new Error(
    "未找到权威Excel：" +
      excelPath
  );
}

const workbook =
  XLSX.readFile(excelPath);

const worksheet =
  workbook.Sheets[sheetName];

if (!worksheet) {
  throw new Error(
    `没有找到工作表：${sheetName}`
  );
}

const rows =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      header: 1,
      defval: "",
      raw: false,
    }
  );

const firstRows =
  rows.slice(0, 12);

let headerRowIndex = 0;
let maxFilled = -1;

firstRows.forEach(
  (row, index) => {
    const filled =
      row.filter(
        (value) =>
          text(value)
      ).length;

    if (filled > maxFilled) {
      maxFilled = filled;
      headerRowIndex = index;
    }
  }
);

const headers =
  rows[headerRowIndex].map(
    (value, index) =>
      text(value) ||
      `第${index + 1}列`
  );

const sourceRows =
  rows
    .slice(headerRowIndex + 1)
    .filter(
      (row) =>
        row.some(
          (value) =>
            text(value)
        )
    );

/* =========================================================
   3. 汇总生成字段
   ========================================================= */

const filter03Values =
  unique(
    products.map(
      (product) =>
        product.filters?.filter03
    )
  );

const filter04Values =
  unique(
    products.map(
      (product) =>
        product.filters?.filter04
    )
  );

const materialValues =
  unique(
    products.map(
      (product) =>
        product.filters?.filter05
    )
  );

const colorValues =
  unique(
    products.map(
      (product) =>
        product.filters?.filter06
    )
  );

const dTypeProducts =
  products.filter(
    (product) =>
      /D型/i.test(
        text(
          product.filters?.filter04
        )
      ) ||
      /-D-/i.test(
        text(
          product.model
        )
      ) ||
      /D型/i.test(
        JSON.stringify(product)
      )
  );

const acProducts =
  products.filter(
    (product) =>
      text(
        product.filters?.filter05
      ).toUpperCase() ===
        "AC" ||
      /(^|[^A-Z])AC([^A-Z]|$)/i.test(
        text(
          product.model
        )
      )
  );

const componentSizeProducts =
  products.filter(
    (product) =>
      /×|x/i.test(
        text(
          product.filters?.filter04
        )
      )
  );

/* =========================================================
   4. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 过滤器与单向阀筛选字段核对"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push("## 当前生成数据");
report.push("");

report.push(
  `- 卡片总数：${products.length}`
);
report.push(
  `- filter03唯一值：${filter03Values.join("、") || "空"}`
);
report.push(
  `- filter04唯一值：${filter04Values.join("、") || "空"}`
);
report.push(
  `- 主体材质：${materialValues.join("、") || "空"}`
);
report.push(
  `- 颜色：${colorValues.join("、") || "空"}`
);
report.push("");

report.push(
  "## 34张卡片字段明细"
);
report.push("");

report.push(
  "| 序号 | 型号 | 类型 | 产品结构 | filter03 | filter04 | 材质 | 颜色 | detailSlug |"
);
report.push(
  "|---:|---|---|---|---|---|---|---|---|"
);

products.forEach(
  (product, index) => {
    report.push(
      `| ${index + 1} | ` +
      `${markdownCell(product.model)} | ` +
      `${markdownCell(product.productTypeId)} | ` +
      `${markdownCell(product.filters?.filter02)} | ` +
      `${markdownCell(product.filters?.filter03)} | ` +
      `${markdownCell(product.filters?.filter04)} | ` +
      `${markdownCell(product.filters?.filter05)} | ` +
      `${markdownCell(product.filters?.filter06)} | ` +
      `${markdownCell(product.detailSlug)} |`
    );
  }
);

report.push("");

report.push(
  "## D型相关产品"
);
report.push("");

if (!dTypeProducts.length) {
  report.push("- 未发现");
} else {
  dTypeProducts.forEach(
    (product) => {
      report.push(
        `- ${text(product.model)}｜` +
        `${text(product.filters?.filter02)}｜` +
        `${text(product.filters?.filter03)}｜` +
        `${text(product.filters?.filter04)}`
      );
    }
  );
}

report.push("");

report.push(
  "## AC相关产品"
);
report.push("");

if (!acProducts.length) {
  report.push("- 未发现");
} else {
  acProducts.forEach(
    (product) => {
      report.push(
        `- ${text(product.model)}｜` +
        `材质=${text(product.filters?.filter05)}｜` +
        `结构=${text(product.filters?.filter02)}`
      );
    }
  );
}

report.push("");

report.push(
  "## 外形尺寸混入筛选的产品"
);
report.push("");

if (!componentSizeProducts.length) {
  report.push("- 未发现");
} else {
  componentSizeProducts.forEach(
    (product) => {
      report.push(
        `- ${text(product.model)}｜` +
        `${text(product.filters?.filter04)}｜` +
        `${text(product.filters?.filter02)}`
      );
    }
  );
}

report.push("");

report.push(
  "## 权威Excel表头"
);
report.push("");

headers.forEach(
  (header, index) => {
    report.push(
      `- 第${index + 1}列：${header}`
    );
  }
);

report.push("");

report.push(
  "## 权威Excel全部有效行"
);
report.push("");

sourceRows.forEach(
  (row, rowIndex) => {
    const values = [];

    headers.forEach(
      (header, columnIndex) => {
        const value =
          text(row[columnIndex]);

        if (value) {
          values.push(
            `${header}=${value}`
          );
        }
      }
    );

    report.push(
      `### 源表第${headerRowIndex + rowIndex + 2}行`
    );
    report.push("");

    report.push(
      values.length
        ? `- ${values.join("；")}`
        : "- 空"
    );

    report.push("");
  }
);

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
  "过滤器与单向阀字段核对完成"
);
console.log(
  "============================================"
);
console.log(
  "卡片：",
  products.length
);
console.log(
  "D型相关：",
  dTypeProducts.length
);
console.log(
  "AC相关：",
  acProducts.length
);
console.log(
  "外形尺寸混入：",
  componentSizeProducts.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
