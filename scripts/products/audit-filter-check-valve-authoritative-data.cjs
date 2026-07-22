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

const sheetName =
  "06_单向阀、过滤器";

const assetRoot =
  String.raw`H:\01-官网项目\02_产品中心\fit`;

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-authoritative-data-audit.md"
);

const jsonPath = path.join(
  root,
  "reports",
  "filter-check-valve-authoritative-data-audit.json"
);

const assetExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".glb",
]);

function text(value) {
  return String(
    value ?? ""
  )
    .replace(/\u00a0/g, " ")
    .trim();
}

function normalize(value) {
  return text(value)
    .toUpperCase()
    .replace(/×/g, "X")
    .replace(/[‐-‒–—−]/g, "-")
    .replace(/[^A-Z0-9]/g, "");
}

function escapeMarkdown(value) {
  return text(value)
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");
}

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const result = [];

  let entries;

  try {
    entries = fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    );
  } catch {
    return [];
  }

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      result.push(
        ...walk(fullPath)
      );
      continue;
    }

    if (
      entry.isFile() &&
      assetExtensions.has(
        path
          .extname(entry.name)
          .toLowerCase()
      )
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function extractModel(
  productName,
  category
) {
  const value =
    text(productName)
      .toUpperCase()
      .replace(/[‐-‒–—−]/g, "-");

  const patterns =
    category === "单向阀"
      ? [
          /\bCV-[A-Z0-9]+(?:-[A-Z0-9]+){2,}\b/,
        ]
      : [
          /\bF-[A-Z0-9]+(?:-[A-Z0-9]+){2,}\b/,
          /\bG-[A-Z0-9]+(?:-[A-Z0-9]+){2,}\b/,
        ];

  for (const pattern of patterns) {
    const match =
      value.match(pattern);

    if (match) {
      return match[0];
    }
  }

  return "";
}

function createHeaderName(
  rows,
  columnIndex
) {
  const first =
    text(
      rows[0]?.[
        columnIndex
      ]
    );

  const second =
    text(
      rows[1]?.[
        columnIndex
      ]
    );

  if (first && second && first !== second) {
    return `${first} / ${second}`;
  }

  return (
    second ||
    first ||
    `第${columnIndex + 1}列`
  );
}

if (!fs.existsSync(workbookPath)) {
  throw new Error(
    "未找到权威清单：" +
      workbookPath
  );
}

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      cellDates: false,
      cellFormula: false,
      raw: false,
    }
  );

const worksheet =
  workbook.Sheets[
    sheetName
  ];

if (!worksheet) {
  throw new Error(
    "未找到工作表：" +
      sheetName
  );
}

const rows =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      header: 1,
      defval: "",
      raw: false,
      blankrows: false,
    }
  );

const maxColumns =
  Math.max(
    ...rows.map(
      (row) =>
        Array.isArray(row)
          ? row.length
          : 0
    )
  );

const headers =
  Array.from(
    {
      length: maxColumns,
    },
    (_, index) =>
      createHeaderName(
        rows,
        index
      )
  );

/*
 * 报告显示正式数据从Excel第3行开始。
 */
const dataRows =
  rows
    .slice(2)
    .map(
      (row, index) => ({
        excelRow:
          index + 3,

        values:
          Array.from(
            {
              length:
                maxColumns,
            },
            (_, columnIndex) =>
              text(
                row?.[
                  columnIndex
                ]
              )
          ),
      })
    )
    .filter(
      (item) =>
        item.values.some(Boolean)
    );

const products =
  dataRows
    .filter(
      (item) =>
        item.values[0] ===
          "过滤器" ||
        item.values[0] ===
          "单向阀"
    )
    .map(
      (item) => {
        const category =
          item.values[0];

        const series =
          item.values[1];

        const internalCode =
          item.values[2];

        const productName =
          item.values[3];

        const productId =
          item.values[4];

        const legacyModel =
          item.values[5];

        const model =
          extractModel(
            productName,
            category
          );

        return {
          excelRow:
            item.excelRow,

          category,
          series,
          internalCode,
          productName,
          productId,
          legacyModel,
          model,

          raw:
            Object.fromEntries(
              headers.map(
                (
                  header,
                  index
                ) => [
                  header,
                  item.values[
                    index
                  ] || "",
                ]
              )
            ),
        };
      }
    );

const filters =
  products.filter(
    (item) =>
      item.category ===
      "过滤器"
  );

const checkValves =
  products.filter(
    (item) =>
      item.category ===
      "单向阀"
  );

function findDuplicates(
  field
) {
  const map =
    new Map();

  for (const item of products) {
    const value =
      text(
        item[field]
      );

    if (!value) {
      continue;
    }

    const key =
      normalize(value);

    if (!map.has(key)) {
      map.set(
        key,
        []
      );
    }

    map
      .get(key)
      .push(item);
  }

  return [
    ...map.values(),
  ].filter(
    (items) =>
      items.length > 1
  );
}

const duplicateModels =
  findDuplicates(
    "model"
  );

const duplicateProductIds =
  findDuplicates(
    "productId"
  );

const duplicateInternalCodes =
  findDuplicates(
    "internalCode"
  );

const missingModels =
  products.filter(
    (item) =>
      !item.model
  );

const assets =
  walk(assetRoot);

const normalizedAssets =
  assets.map(
    (filePath) => ({
      filePath,

      fileName:
        path.basename(
          filePath
        ),

      extension:
        path
          .extname(filePath)
          .toLowerCase(),

      normalized:
        normalize(
          path.parse(
            filePath
          ).name
        ),
    })
  );

for (const product of products) {
  const matchKeys = [
    product.model,
    product.productId,
    product.internalCode,
    product.legacyModel,
  ]
    .map(normalize)
    .filter(
      (value) =>
        value.length >= 5
    );

  product.assets =
    normalizedAssets
      .filter(
        (asset) =>
          matchKeys.some(
            (key) =>
              asset.normalized
                .includes(key) ||
              key.includes(
                asset.normalized
              )
          )
      )
      .map(
        (asset) => ({
          filePath:
            asset.filePath,

          fileName:
            asset.fileName,

          extension:
            asset.extension,
        })
      );
}

const productsWithImages =
  products.filter(
    (item) =>
      item.assets.some(
        (asset) =>
          [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
          ].includes(
            asset.extension
          )
      )
  );

const productsWithPdf =
  products.filter(
    (item) =>
      item.assets.some(
        (asset) =>
          asset.extension ===
          ".pdf"
      )
  );

const productsWithoutAssets =
  products.filter(
    (item) =>
      item.assets.length === 0
  );

const report = [];

report.push(
  "# 过滤器与单向阀权威数据检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查权威Excel与本地资料，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 权威数据源"
);
report.push("");

report.push(
  `- 文件：\`${workbookPath}\``
);
report.push(
  `- Sheet：\`${sheetName}\``
);
report.push(
  `- 过滤器：${filters.length}条`
);
report.push(
  `- 单向阀：${checkValves.length}条`
);
report.push(
  `- 合计：${products.length}条`
);
report.push("");

report.push(
  "## 2. Excel前5行原始内容"
);
report.push("");

report.push("```json");
report.push(
  JSON.stringify(
    rows.slice(0, 5),
    null,
    2
  )
);
report.push("```");
report.push("");

report.push(
  "## 3. 检出的表头"
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
  "## 4. 重复与缺失检查"
);
report.push("");

report.push(
  `- 重复型号组：${duplicateModels.length}`
);
report.push(
  `- 重复商品编码组：${duplicateProductIds.length}`
);
report.push(
  `- 重复内部编码组：${duplicateInternalCodes.length}`
);
report.push(
  `- 无法提取标准型号：${missingModels.length}条`
);
report.push("");

function appendDuplicateSection(
  title,
  groups,
  field
) {
  report.push(
    `### ${title}`
  );
  report.push("");

  if (!groups.length) {
    report.push("无。");
    report.push("");
    return;
  }

  for (const group of groups) {
    report.push(
      `#### ${group[0][field]}`
    );
    report.push("");

    report.push(
      "| Excel行 | 类型 | 型号 | 商品编码 | 内部编码 | 产品名称 |"
    );
    report.push(
      "|---:|---|---|---|---|---|"
    );

    for (const item of group) {
      report.push(
        `| ${item.excelRow} | ${escapeMarkdown(item.category)} | ${escapeMarkdown(item.model)} | ${escapeMarkdown(item.productId)} | ${escapeMarkdown(item.internalCode)} | ${escapeMarkdown(item.productName)} |`
      );
    }

    report.push("");
  }
}

appendDuplicateSection(
  "重复型号",
  duplicateModels,
  "model"
);

appendDuplicateSection(
  "重复商品编码",
  duplicateProductIds,
  "productId"
);

appendDuplicateSection(
  "重复内部编码",
  duplicateInternalCodes,
  "internalCode"
);

report.push(
  "### 无法提取标准型号"
);
report.push("");

if (!missingModels.length) {
  report.push("无。");
} else {
  report.push(
    "| Excel行 | 类型 | 商品编码 | 内部编码 | 产品名称 |"
  );
  report.push(
    "|---:|---|---|---|---|"
  );

  for (const item of missingModels) {
    report.push(
      `| ${item.excelRow} | ${escapeMarkdown(item.category)} | ${escapeMarkdown(item.productId)} | ${escapeMarkdown(item.internalCode)} | ${escapeMarkdown(item.productName)} |`
    );
  }
}

report.push("");

report.push(
  "## 5. 产品资料匹配"
);
report.push("");

report.push(
  `- 扫描资料文件：${assets.length}个`
);
report.push(
  `- 有产品图片：${productsWithImages.length}条`
);
report.push(
  `- 有二维PDF：${productsWithPdf.length}条`
);
report.push(
  `- 未匹配任何资料：${productsWithoutAssets.length}条`
);
report.push("");

report.push(
  "| Excel行 | 类型 | 型号 | 商品编码 | 图片数 | PDF数 | 匹配文件 |"
);
report.push(
  "|---:|---|---|---|---:|---:|---|"
);

for (const item of products) {
  const imageCount =
    item.assets.filter(
      (asset) =>
        [
          ".jpg",
          ".jpeg",
          ".png",
          ".webp",
        ].includes(
          asset.extension
        )
    ).length;

  const pdfCount =
    item.assets.filter(
      (asset) =>
        asset.extension ===
        ".pdf"
    ).length;

  report.push(
    `| ${item.excelRow} | ${escapeMarkdown(item.category)} | ${escapeMarkdown(item.model || "无标准型号")} | ${escapeMarkdown(item.productId)} | ${imageCount} | ${pdfCount} | ${escapeMarkdown(item.assets.map((asset) => asset.fileName).join("、"))} |`
  );
}

report.push("");

report.push(
  "## 6. 全部38条产品记录"
);
report.push("");

report.push(
  "| Excel行 | 类型 | 系列 | 型号 | 商品编码 | 内部编码 | 旧型号/关联型号 | 产品名称 |"
);
report.push(
  "|---:|---|---|---|---|---|---|---|"
);

for (const item of products) {
  report.push(
    `| ${item.excelRow} | ${escapeMarkdown(item.category)} | ${escapeMarkdown(item.series)} | ${escapeMarkdown(item.model || "无标准型号")} | ${escapeMarkdown(item.productId)} | ${escapeMarkdown(item.internalCode)} | ${escapeMarkdown(item.legacyModel)} | ${escapeMarkdown(item.productName)} |`
  );
}

report.push("");

report.push(
  "## 7. 下一步生成原则"
);
report.push("");

report.push(
  "1. 两类产品分别保留内部ID：`filters`、`check-valves`。"
);
report.push(
  "2. 页面入口统一显示为“过滤器与单向阀”。"
);
report.push(
  "3. slug优先使用型号；重复型号必须追加商品编码。"
);
report.push(
  "4. 无标准型号的过滤器组件使用商品编码生成稳定slug。"
);
report.push(
  "5. 不根据Excel行顺序推断图片或二维图关系。"
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

fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      generatedAt:
        new Date().toISOString(),

      workbookPath,
      sheetName,
      headers,
      counts: {
        filters:
          filters.length,

        checkValves:
          checkValves.length,

        total:
          products.length,
      },

      duplicateModels,
      duplicateProductIds,
      duplicateInternalCodes,
      missingModels,
      products,
    },
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀权威数据检查完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：",
  filters.length
);
console.log(
  "单向阀：",
  checkValves.length
);
console.log(
  "合计：",
  products.length
);
console.log(
  "重复型号组：",
  duplicateModels.length
);
console.log(
  "无标准型号：",
  missingModels.length
);
console.log(
  "有产品图片：",
  productsWithImages.length
);
console.log(
  "有二维PDF：",
  productsWithPdf.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "JSON："
);
console.log(
  jsonPath
);
console.log("");
console.log(
  "本次没有修改任何项目文件。"
);
