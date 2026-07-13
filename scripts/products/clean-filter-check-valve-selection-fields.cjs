const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-selection-clean-report.md"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function text(value) {
  return String(value ?? "").trim();
}

function multilingual(zh, en) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
}

function findExportArrayRange(
  source,
  exportName
) {
  const pattern = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=`
  );

  const match = source.match(pattern);

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到导出数组：${exportName}`
    );
  }

  const start = source.indexOf(
    "[",
    match.index + match[0].length
  );

  if (start < 0) {
    throw new Error(
      `没有找到数组起点：${exportName}`
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
        return {
          start,
          end: index + 1,
        };
      }
    }
  }

  throw new Error(
    `数组没有正常结束：${exportName}`
  );
}

function readExportArray(
  source,
  exportName
) {
  const range =
    findExportArrayRange(
      source,
      exportName
    );

  return JSON.parse(
    source.slice(
      range.start,
      range.end
    )
  );
}

function replaceExportArray(
  source,
  exportName,
  value
) {
  const range =
    findExportArrayRange(
      source,
      exportName
    );

  return (
    source.slice(0, range.start) +
    JSON.stringify(value, null, 2) +
    source.slice(range.end)
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

function normalizeColor(value) {
  const raw = text(value);

  if (raw === "V色代码") {
    return "V色";
  }

  if (raw === "B色代码") {
    return "B色";
  }

  return raw;
}

function getInterfaceForm(
  product,
  structure
) {
  const model =
    text(product.model);

  const rawSize =
    text(
      product.filters?.filter04
    );

  const isComponent =
    product.hasStandardModel === false ||
    structure.includes("组件") ||
    /×|x/i.test(rawSize);

  if (isComponent) {
    return "组件";
  }

  if (
    /\d+D(?:-|$)/i.test(model) ||
    rawSize.includes("D型")
  ) {
    return "D型";
  }

  return "标准型";
}

function getTubeOuterDiameter(
  product,
  structure
) {
  const rawSize =
    text(
      product.filters?.filter04
    );

  const isComponent =
    product.hasStandardModel === false ||
    structure.includes("组件") ||
    /×|x/i.test(rawSize);

  if (isComponent) {
    return "";
  }

  return rawSize
    .replace(
      /\s*（D型）\s*/g,
      ""
    )
    .trim();
}

const structureEnglishMap = {
  "G系列过滤器":
    "G Series Filter",

  "PE系列过滤器":
    "PE Series Filter",

  "PA系列过滤器":
    "PA Series Filter",

  "水循环过滤器":
    "Water Circulation Filter",

  "水循环过滤器组件":
    "Water Circulation Filter Assembly",

  "鸭嘴式单向阀":
    "Duckbill Check Valve",

  "膜片式单向阀":
    "Diaphragm Check Valve",
};

const interfaceEnglishMap = {
  "标准型":
    "Standard",

  "D型":
    "D Type",

  "组件":
    "Assembly",
};

const colorEnglishMap = {
  "本色":
    "Natural",

  "V色":
    "V Color",

  "B色":
    "B Color",
};

/* =========================================================
   1. 读取现有数据
   ========================================================= */

let source = read(
  generatedPath
);

const products =
  readExportArray(
    source,
    "filterCheckValveSelectionProducts"
  );

if (products.length !== 34) {
  throw new Error(
    `卡片数量异常：${products.length}/34`
  );
}

/* =========================================================
   2. 清洗34张卡片
   ========================================================= */

const cleanedProducts =
  products.map(
    (product) => {
      const structure =
        text(
          product.filters?.filter02
        );

      const originalSize =
        text(
          product.filters?.filter04
        );

      const material =
        text(
          product.filters?.filter05
        );

      const color =
        normalizeColor(
          product.filters?.filter06
        );

      const interfaceForm =
        getInterfaceForm(
          product,
          structure
        );

      const tubeOuterDiameter =
        getTubeOuterDiameter(
          product,
          structure
        );

      const isComponent =
        interfaceForm === "组件";

      const zhSecondLine =
        isComponent && originalSize
          ? `组件尺寸 ${originalSize}`
          : tubeOuterDiameter
            ? `接管外径 ${tubeOuterDiameter}`
            : "液路组件";

      const zhThirdLine = [
        material
          ? `${material}材质`
          : "",

        interfaceForm !== "组件"
          ? interfaceForm
          : "",

        color,
      ]
        .filter(Boolean)
        .join(" · ");

      const enStructure =
        structureEnglishMap[structure] ||
        structure;

      const enInterface =
        interfaceEnglishMap[
          interfaceForm
        ] || interfaceForm;

      const enColor =
        colorEnglishMap[color] ||
        color;

      const enSecondLine =
        isComponent && originalSize
          ? `Component size ${originalSize}`
          : tubeOuterDiameter
            ? `Tube OD ${tubeOuterDiameter}`
            : "Fluid-path component";

      const enThirdLine = [
        material
          ? `${material} material`
          : "",

        interfaceForm !== "组件"
          ? enInterface
          : "",

        enColor,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        ...product,

        filters: {
          ...(product.filters || {}),

          filter03:
            interfaceForm,

          filter04:
            tubeOuterDiameter,

          filter05:
            material,

          filter06:
            color,
        },

        cardSubtitle:
          multilingual(
            [
              structure,
              zhSecondLine,
              zhThirdLine,
            ]
              .filter(Boolean)
              .join("\n"),

            [
              enStructure,
              enSecondLine,
              enThirdLine,
            ]
              .filter(Boolean)
              .join("\n")
          ),

        searchKeywords: {
          ...(product.searchKeywords || {}),

          zh: [
            text(
              product.searchKeywords?.zh
            ),
            structure,
            interfaceForm,
            tubeOuterDiameter,
            originalSize,
            material,
            color,
          ]
            .filter(Boolean)
            .join(" "),

          en: [
            text(
              product.searchKeywords?.en
            ),
            enStructure,
            enInterface,
            tubeOuterDiameter,
            originalSize,
            material,
            enColor,
          ]
            .filter(Boolean)
            .join(" "),
        },
      };
    }
  );

/* =========================================================
   3. 更新筛选字段名称
   ========================================================= */

const cleanedFilterLabels = [
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter01",

    label:
      multilingual(
        "产品类型",
        "Product Type"
      ),

    inputType:
      "single",

    sortOrder:
      10,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter02",

    label:
      multilingual(
        "产品结构",
        "Structure"
      ),

    inputType:
      "multiple",

    sortOrder:
      20,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter03",

    label:
      multilingual(
        "接口形式",
        "Connection Form"
      ),

    inputType:
      "multiple",

    sortOrder:
      30,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter04",

    label:
      multilingual(
        "接管外径",
        "Tube OD"
      ),

    inputType:
      "multiple",

    sortOrder:
      40,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter05",

    label:
      multilingual(
        "材质",
        "Material"
      ),

    inputType:
      "multiple",

    sortOrder:
      50,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter06",

    label:
      multilingual(
        "颜色",
        "Color"
      ),

    inputType:
      "multiple",

    sortOrder:
      60,

    visible:
      true,
  },
];

/* =========================================================
   4. 写回生成文件
   ========================================================= */

source = replaceExportArray(
  source,
  "filterCheckValveSelectionProducts",
  cleanedProducts
);

source = replaceExportArray(
  source,
  "filterCheckValveFilterLabels",
  cleanedFilterLabels
);

/* =========================================================
   5. 数据结果检查
   ========================================================= */

const interfaceValues =
  unique(
    cleanedProducts.map(
      (product) =>
        product.filters?.filter03
    )
  );

const tubeOuterDiameterValues =
  unique(
    cleanedProducts.map(
      (product) =>
        product.filters?.filter04
    )
  );

const materialValues =
  unique(
    cleanedProducts.map(
      (product) =>
        product.filters?.filter05
    )
  );

const colorValues =
  unique(
    cleanedProducts.map(
      (product) =>
        product.filters?.filter06
    )
  );

const invalidTubeValues =
  tubeOuterDiameterValues.filter(
    (value) =>
      /D型|×|x/i.test(value)
  );

if (invalidTubeValues.length) {
  throw new Error(
    "接管外径仍混有错误值：" +
      invalidTubeValues.join("、")
  );
}

const componentProducts =
  cleanedProducts.filter(
    (product) =>
      product.filters?.filter03 ===
      "组件"
  );

if (componentProducts.length !== 2) {
  throw new Error(
    `组件数量异常：${componentProducts.length}/2`
  );
}

const dTypeProducts =
  cleanedProducts.filter(
    (product) =>
      product.filters?.filter03 ===
      "D型"
  );

if (dTypeProducts.length !== 5) {
  throw new Error(
    `D型数量异常：${dTypeProducts.length}/5`
  );
}

const cardHasProductCodeLabel =
  cleanedProducts.some(
    (product) =>
      text(
        product.cardSubtitle?.zh
      ).includes(
        "商品编码"
      )
  );

if (cardHasProductCodeLabel) {
  throw new Error(
    "卡片副标题仍包含商品编码。"
  );
}

/* =========================================================
   6. TypeScript语法检查
   ========================================================= */

const transpileResult =
  ts.transpileModule(
    source,
    {
      compilerOptions: {
        target:
          ts.ScriptTarget.ES2022,

        module:
          ts.ModuleKind.ESNext,
      },

      reportDiagnostics:
        true,

      fileName:
        path.basename(
          generatedPath
        ),
    }
  );

const syntaxErrors =
  (
    transpileResult.diagnostics ||
    []
  ).filter(
    (diagnostic) =>
      diagnostic.category ===
      ts.DiagnosticCategory.Error
  );

if (syntaxErrors.length) {
  throw new Error(
    "修改后语法异常：\n" +
      syntaxErrors
        .map(
          (diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
        )
        .join("\n")
  );
}

/* =========================================================
   7. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${generatedPath}.bak_clean_fields_${stamp}`;

fs.copyFileSync(
  generatedPath,
  backupPath
);

fs.writeFileSync(
  generatedPath,
  source,
  "utf8"
);

/* =========================================================
   8. 输出报告
   ========================================================= */

const report = [];

report.push(
  "# 过滤器与单向阀筛选字段清洗结果"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 数量"
);
report.push("");

report.push(
  `- 总卡片：${cleanedProducts.length}`
);
report.push(
  `- 标准型：${
    cleanedProducts.filter(
      (product) =>
        product.filters?.filter03 ===
        "标准型"
    ).length
  }`
);
report.push(
  `- D型：${dTypeProducts.length}`
);
report.push(
  `- 组件：${componentProducts.length}`
);
report.push("");

report.push(
  "## 最终筛选字段"
);
report.push("");

report.push(
  "- 产品类型"
);
report.push(
  "- 产品结构"
);
report.push(
  "- 接口形式"
);
report.push(
  "- 接管外径"
);
report.push(
  "- 材质"
);
report.push(
  "- 颜色"
);
report.push("");

report.push(
  "## 接口形式"
);
report.push("");

interfaceValues.forEach(
  (value) =>
    report.push(
      `- ${value}`
    )
);

report.push("");

report.push(
  "## 接管外径"
);
report.push("");

tubeOuterDiameterValues.forEach(
  (value) =>
    report.push(
      `- ${value}`
    )
);

report.push("");

report.push(
  "## 材质"
);
report.push("");

materialValues.forEach(
  (value) =>
    report.push(
      `- ${value}`
    )
);

report.push("");

report.push(
  "## 颜色"
);
report.push("");

colorValues.forEach(
  (value) =>
    report.push(
      `- ${value}`
    )
);

report.push("");

report.push(
  "## 暂不推断的代码"
);
report.push("");

report.push(
  "- AC：继续按源表材料代码显示，未擅自展开。"
);
report.push(
  "- V色、B色：继续按型号颜色代码显示，未擅自解释具体色名。"
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
  "过滤器与单向阀筛选字段清洗完成"
);
console.log(
  "============================================"
);
console.log(
  "总卡片：",
  cleanedProducts.length
);
console.log(
  "标准型：",
  cleanedProducts.filter(
    (product) =>
      product.filters?.filter03 ===
      "标准型"
  ).length
);
console.log(
  "D型：",
  dTypeProducts.length
);
console.log(
  "组件：",
  componentProducts.length
);
console.log(
  "接管外径选项：",
  tubeOuterDiameterValues.length
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
