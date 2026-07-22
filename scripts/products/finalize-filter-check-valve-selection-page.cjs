const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-selection-page-final-report.md"
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

function multilingual(
  zh,
  en
) {
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

  const match = source.match(
    pattern
  );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到导出数组：${exportName}`
    );
  }

  const arrayStart = source.indexOf(
    "[",
    match.index + match[0].length
  );

  if (arrayStart < 0) {
    throw new Error(
      `没有找到数组起点：${exportName}`
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = arrayStart;
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
          start: arrayStart,
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
  const range = findExportArrayRange(
    source,
    exportName
  );

  return {
    range,
    value: JSON.parse(
      source.slice(
        range.start,
        range.end
      )
    ),
  };
}

function replaceExportArray(
  source,
  exportName,
  value
) {
  const range = findExportArrayRange(
    source,
    exportName
  );

  return (
    source.slice(
      0,
      range.start
    ) +
    JSON.stringify(
      value,
      null,
      2
    ) +
    source.slice(
      range.end
    )
  );
}

function text(value) {
  return String(
    value ?? ""
  ).trim();
}

function productCodesOf(
  product
) {
  if (
    Array.isArray(
      product.productCodes
    ) &&
    product.productCodes.length
  ) {
    return product.productCodes
      .map(text)
      .filter(Boolean);
  }

  return [
    text(
      product.productCode ||
      product.productId
    ),
  ].filter(Boolean);
}

/* =========================================================
   1. 读取现有生成数据
   ========================================================= */

let generatedSource = read(
  generatedPath
);

const productsResult = readExportArray(
  generatedSource,
  "filterCheckValveSelectionProducts"
);

const products =
  productsResult.value;

if (products.length !== 34) {
  throw new Error(
    `选型卡片数量异常：${products.length}/34`
  );
}

const filtersCount = products.filter(
  (product) =>
    product.productTypeId ===
    "filters"
).length;

const checkValvesCount = products.filter(
  (product) =>
    product.productTypeId ===
    "check-valves"
).length;

if (
  filtersCount !== 18 ||
  checkValvesCount !== 16
) {
  throw new Error(
    `分类数量异常：过滤器${filtersCount}/18，单向阀${checkValvesCount}/16`
  );
}

/* =========================================================
   2. 统一卡片文案与链接
   ========================================================= */

const finalProducts = products.map(
  (product) => {
    const isFilter =
      product.productTypeId ===
      "filters";

    const typeName =
      isFilter
        ? "过滤器"
        : "单向阀";

    const structure =
      text(
        product.filters?.filter02 ||
        product.seriesName
      );

    const size =
      text(
        product.filters?.filter04 ||
        product.portSize
      );

    const material =
      text(
        product.filters?.filter05
      );

    const productCodes =
      productCodesOf(
        product
      );

    const isComponent =
      product.hasStandardModel ===
        false ||
      structure.includes(
        "组件"
      );

    const sizeLabel =
      size
        ? (
            isComponent
              ? `组件尺寸 ${size}`
              : `规格尺寸 ${size}`
          )
        : "标准液路规格";

    const thirdLine = [
      material
        ? `${material}材质`
        : "",

      productCodes.length
        ? `商品编码 ${productCodes.join(" / ")}`
        : "",
    ]
      .filter(Boolean)
      .join("，");

    const detailSlug =
      text(
        product.detailSlug
      );

    const productTypeId =
      text(
        product.productTypeId
      );

    const detailHref =
      detailSlug
        ? `/products/fittings/${productTypeId}/${detailSlug}`
        : "/products/fittings/filters";

    const zhSubtitle = [
      structure ||
        typeName,

      sizeLabel,

      thirdLine,
    ]
      .filter(Boolean)
      .join("\n");

    const enSubtitle = [
      structure ||
        (
          isFilter
            ? "Fluid Filter"
            : "Check Valve"
        ),

      size
        ? (
            isComponent
              ? `Component size: ${size}`
              : `Size: ${size}`
          )
        : "Fluid-path component",

      productCodes.length
        ? `Product code: ${productCodes.join(" / ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    return {
      ...product,

      selectionHref:
        "/products/fittings/filters",

      detailHref,
      href:
        detailHref,

      cardSubtitle:
        multilingual(
          zhSubtitle,
          enSubtitle
        ),

      searchKeywords: {
        ...product.searchKeywords,

        zh: [
          "过滤器与单向阀",
          typeName,
          structure,
          size,
          material,
          text(
            product.model
          ),
          ...productCodes,
          text(
            product.searchKeywords?.zh
          ),
        ]
          .filter(Boolean)
          .join(" "),

        en: [
          "filters check valves",
          isFilter
            ? "filter"
            : "check valve",
          structure,
          size,
          material,
          text(
            product.model
          ),
          ...productCodes,
          text(
            product.searchKeywords?.en
          ),
        ]
          .filter(Boolean)
          .join(" "),
      },
    };
  }
);

/* =========================================================
   3. 筛选组
   ========================================================= */

const finalFilterLabels = [
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
        "产品系列",
        "Series"
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
        "规格尺寸",
        "Size"
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
        "主体材质",
        "Body Material"
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

/*
 * 前台只保留一个产品种类入口。
 * 单向阀仍然保留自己的productTypeId和详情路由。
 */
const finalTaxonomyItems = [
  {
    type:
      "productType",

    id:
      "filters",

    label:
      multilingual(
        "过滤器与单向阀",
        "Filters & Check Valves"
      ),

    sortOrder:
      470,
  },
];

/* =========================================================
   4. 写回生成文件
   ========================================================= */

generatedSource = replaceExportArray(
  generatedSource,
  "filterCheckValveSelectionProducts",
  finalProducts
);

generatedSource = replaceExportArray(
  generatedSource,
  "filterCheckValveFilterLabels",
  finalFilterLabels
);

generatedSource = replaceExportArray(
  generatedSource,
  "filterCheckValveTaxonomyItems",
  finalTaxonomyItems
);

/* =========================================================
   5. 检查ProductSelectionClient合并逻辑
   ========================================================= */

const clientSource = read(
  clientPath
);

const requiredClientChecks = {
  generatedImport:
    clientSource.includes(
      "filterCheckValveSelectionProducts"
    ),

  productSpread:
    clientSource.includes(
      "FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START"
    ),

  labelsSpread:
    clientSource.includes(
      "FILTER_CHECK_VALVE_FILTER_LABELS_START"
    ),

  taxonomySpread:
    clientSource.includes(
      "FILTER_CHECK_VALVE_TAXONOMY_START"
    ),

  mergeHelper:
    clientSource.includes(
      "FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START"
    ),

  mergedOptions:
    clientSource.includes(
      "FITTING_FILTER_CHECK_VALVE_OPTIONS_START"
    ),

  checkValveMatch:
    clientSource.includes(
      "FITTING_CHECK_VALVE_SOURCE_TYPE_ID"
    ),

  detailHref:
    clientSource.includes(
      "FILTER_CHECK_VALVE_DETAIL_HREF_START"
    ),
};

const failedClientChecks =
  Object.entries(
    requiredClientChecks
  )
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (
  failedClientChecks.length
) {
  throw new Error(
    "ProductSelectionClient接入不完整：" +
      failedClientChecks.join("、")
  );
}

/* =========================================================
   6. 检查路由入口
   ========================================================= */

let routeMapSource = read(
  routeMapPath
);

if (
  !routeMapSource.includes(
    '"filters"'
  )
) {
  throw new Error(
    "product-route-map.ts中没有filters入口。"
  );
}

if (
  !routeMapSource.includes(
    "过滤器与单向阀"
  )
) {
  throw new Error(
    "product-route-map.ts中没有合并显示名称。"
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
  `${generatedPath}.bak_finalize_selection_${stamp}`;

fs.copyFileSync(
  generatedPath,
  backupPath
);

fs.writeFileSync(
  generatedPath,
  generatedSource,
  "utf8"
);

/* =========================================================
   8. 输出报告
   ========================================================= */

const structures = [
  ...new Set(
    finalProducts
      .map(
        (product) =>
          text(
            product.filters?.filter02
          )
      )
      .filter(Boolean)
  ),
];

const sizes = [
  ...new Set(
    finalProducts
      .map(
        (product) =>
          text(
            product.filters?.filter04
          )
      )
      .filter(Boolean)
  ),
];

const materials = [
  ...new Set(
    finalProducts
      .map(
        (product) =>
          text(
            product.filters?.filter05
          )
      )
      .filter(Boolean)
  ),
];

const report = [];

report.push(
  "# 过滤器与单向阀筛选页最终检查"
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
  `- 总卡片：${finalProducts.length}`
);
report.push(
  `- 过滤器：${filtersCount}`
);
report.push(
  `- 单向阀：${checkValvesCount}`
);
report.push("");

report.push(
  "## 筛选组"
);
report.push("");

for (
  const item
  of finalFilterLabels
) {
  report.push(
    `- ${item.label.zh}`
  );
}

report.push("");

report.push(
  "## 产品结构选项"
);
report.push("");

for (
  const value
  of structures
) {
  report.push(
    `- ${value}`
  );
}

report.push("");

report.push(
  "## 规格尺寸选项"
);
report.push("");

for (
  const value
  of sizes
) {
  report.push(
    `- ${value}`
  );
}

report.push("");

report.push(
  "## 主体材质选项"
);
report.push("");

for (
  const value
  of materials
) {
  report.push(
    `- ${value}`
  );
}

report.push("");

report.push(
  "## 页面规则"
);
report.push("");

report.push(
  "- 左侧产品种类只显示“过滤器与单向阀”。"
);
report.push(
  "- 产品类型筛选可以在过滤器和单向阀之间切换。"
);
report.push(
  "- 过滤器和单向阀共同参与结构、尺寸、材质和颜色筛选。"
);
report.push(
  "- 卡片详情链接继续分别进入filters和check-valves详情路由。"
);
report.push("");

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
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
  "过滤器与单向阀筛选页数据收尾完成"
);
console.log(
  "============================================"
);
console.log(
  "总卡片：",
  finalProducts.length
);
console.log(
  "过滤器：",
  filtersCount
);
console.log(
  "单向阀：",
  checkValvesCount
);
console.log(
  "筛选组：",
  finalFilterLabels.length
);
console.log(
  "前台产品种类入口：1"
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
