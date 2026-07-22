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

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-model-filter-report.md"
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
  return String(
    value ?? ""
  ).trim();
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

function findArrayRange(
  source,
  exportName
) {
  const expression = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=`
  );

  const match = source.match(
    expression
  );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      "没有找到导出数组：" +
        exportName
    );
  }

  const start = source.indexOf(
    "[",
    match.index +
      match[0].length
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
      char === "'" ||
      char === "`"
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
    "数组没有正常结束：" +
      exportName
  );
}

function readArray(
  source,
  exportName
) {
  const range =
    findArrayRange(
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

function replaceArray(
  source,
  exportName,
  value
) {
  const range =
    findArrayRange(
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

function normalizeMaterial(value) {
  const raw =
    text(value).toUpperCase();

  const map = {
    PV:
      "PVDF",

    PP:
      "PP",

    PA:
      "PA",

    AC:
      "AC",

    POM:
      "POM",
  };

  return map[raw] || raw;
}

function normalizeColor(value) {
  const raw =
    text(value).toUpperCase();

  const map = {
    N:
      "本色",

    B:
      "黑色",

    V:
      "V色",
  };

  return map[raw] || raw;
}

function sizeFromCode(value) {
  const raw = text(value)
    .toUpperCase()
    .replace(/D$/, "");

  const map = {
    "16":
      "1.6 mm",

    "24":
      "2.4 mm",

    "32":
      "3.2 mm",

    "40":
      "4.0 mm",

    "48":
      "4.8 mm",

    "64":
      "6.4 mm",

    "79":
      "7.9 mm",

    "95":
      "9.5 mm",

    "127":
      "12.7 mm",

    "191":
      "19.1 mm",
  };

  return map[raw] || "";
}

function getFilterType(
  product,
  model
) {
  if (
    model.startsWith("G-")
  ) {
    return "G系列过滤器";
  }

  if (
    model.startsWith("F-PE-")
  ) {
    return "PE过滤器";
  }

  if (
    model.startsWith("F-PA-")
  ) {
    return "PA过滤器";
  }

  if (
    model.startsWith("F-SS-")
  ) {
    return "水循环过滤器";
  }

  if (
    model === "139009" ||
    model === "139010" ||
    text(
      product.detailSlug
    ).startsWith(
      "filter-component-"
    )
  ) {
    /*
     * 不再单独生成“水循环过滤器组件”选项。
     */
    return "水循环过滤器";
  }

  return "";
}

function getFilterMedia(
  product,
  model
) {
  if (
    model.startsWith("F-PE-")
  ) {
    return "HDPE";
  }

  if (
    model.startsWith("F-PA-")
  ) {
    return "PA";
  }

  if (
    model.startsWith("F-SS-")
  ) {
    return "SUS";
  }

  /*
   * 139010在用户提供的型号说明中属于
   * SUS滤网水循环过滤器。
   */
  if (
    model === "139010"
  ) {
    return "SUS";
  }

  /*
   * G系列及139009的滤网材质没有从当前资料中
   * 得到足够明确的信息，不擅自填写。
   */
  return "";
}

function getFilterPrecision(
  model
) {
  const gMatch =
    model.match(
      /^G-(\d+)-/
    );

  if (gMatch) {
    return `${gMatch[1]} μm`;
  }

  const fMatch =
    model.match(
      /^F-(?:PE|PA|SS)-(\d+)-/
    );

  if (fMatch) {
    const code =
      fMatch[1];

    const map = {
      "10":
        "10 μm",

      "60":
        "40–60 μm",

      "100":
        "80–100 μm",

      "150":
        "150 μm",

      "250":
        "250 μm",
    };

    return (
      map[code] ||
      `${code} μm`
    );
  }

  if (model === "139010") {
    return "150 μm";
  }

  return "";
}

function getSealType(model) {
  const match =
    model.match(
      /^CV-([A-Z]{2})-/
    );

  if (!match) {
    return "";
  }

  const sealCode =
    match[1][0];

  if (sealCode === "B") {
    return "膜片式";
  }

  if (sealCode === "D") {
    return "鸭嘴式";
  }

  return "";
}

function getDiaphragmMaterial(
  model
) {
  const match =
    model.match(
      /^CV-([A-Z]{2})-/
    );

  if (!match) {
    return "";
  }

  const materialCode =
    match[1][1];

  const map = {
    E:
      "EPDM",

    V:
      "FKM",

    F:
      "FFKM",
  };

  return (
    map[materialCode] ||
    ""
  );
}

function getConnectionValue(
  product,
  model
) {
  const gMatch =
    model.match(
      /^G-\d+-([0-9]+D?)-/
    );

  if (gMatch) {
    return sizeFromCode(
      gMatch[1]
    );
  }

  const fMatch =
    model.match(
      /^F-(?:PE|PA|SS)-\d+-([0-9]+D?)-/
    );

  if (fMatch) {
    return sizeFromCode(
      fMatch[1]
    );
  }

  const cvMatch =
    model.match(
      /^CV-[A-Z]{2}-([0-9]+)-/
    );

  if (cvMatch) {
    return sizeFromCode(
      cvMatch[1]
    );
  }

  /*
   * 用户提供的水循环过滤器表中：
   * 商品编码139010对应3/8-18 NPT。
   */
  if (model === "139010") {
    return "3/8-18 NPT";
  }

  return "";
}

function getBodyMaterial(
  product,
  model
) {
  if (model === "139009") {
    return "POM";
  }

  if (model === "139010") {
    return "PP";
  }

  const parts =
    model.split("-");

  if (
    model.startsWith("G-") &&
    parts.length >= 5
  ) {
    return normalizeMaterial(
      parts[3]
    );
  }

  if (
    model.startsWith("F-") &&
    parts.length >= 6
  ) {
    return normalizeMaterial(
      parts[4]
    );
  }

  if (
    model.startsWith("CV-") &&
    parts.length >= 5
  ) {
    return normalizeMaterial(
      parts[3]
    );
  }

  return normalizeMaterial(
    product.materialCode ||
    product.filters?.filter05 ||
    ""
  );
}

function getProductColor(
  product,
  model
) {
  const parts =
    model.split("-");

  if (
    parts.length >= 2 &&
    /^[A-Z]$/i.test(
      parts[
        parts.length - 1
      ]
    )
  ) {
    return normalizeColor(
      parts[
        parts.length - 1
      ]
    );
  }

  return normalizeColor(
    product.colorCode ||
    product.filters?.filter06 ||
    ""
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

/* =========================================================
   1. 读取34张卡片
   ========================================================= */

let generatedSource =
  read(generatedPath);

const products =
  readArray(
    generatedSource,
    "filterCheckValveSelectionProducts"
  );

if (products.length !== 34) {
  throw new Error(
    `卡片数量异常：${products.length}/34`
  );
}

/* =========================================================
   2. 按用户提供的型号规则重建字段
   ========================================================= */

const rebuiltProducts =
  products.map(
    (product) => {
      const model =
        text(
          product.model ||
          product.productCode ||
          product.productId
        ).toUpperCase();

      const isCheckValve =
        product.productTypeId ===
          "check-valves" ||
        model.startsWith(
          "CV-"
        );

      const productKind =
        isCheckValve
          ? "单向阀"
          : "过滤器";

      const filterType =
        isCheckValve
          ? ""
          : getFilterType(
              product,
              model
            );

      const filterMedia =
        isCheckValve
          ? ""
          : getFilterMedia(
              product,
              model
            );

      const precision =
        isCheckValve
          ? ""
          : getFilterPrecision(
              model
            );

      const sealType =
        isCheckValve
          ? getSealType(
              model
            )
          : "";

      const diaphragmMaterial =
        isCheckValve
          ? getDiaphragmMaterial(
              model
            )
          : "";

      const connection =
        getConnectionValue(
          product,
          model
        );

      const bodyMaterial =
        getBodyMaterial(
          product,
          model
        );

      const color =
        getProductColor(
          product,
          model
        );

      let zhLines = [];
      let enLines = [];

      if (isCheckValve) {
        zhLines = [
          sealType
            ? `${sealType}单向阀`
            : "单向阀",

          [
            diaphragmMaterial
              ? `${diaphragmMaterial}膜片`
              : "",

            connection
              ? `接管内径 ${connection}`
              : "",
          ]
            .filter(Boolean)
            .join(" · "),

          [
            bodyMaterial
              ? `${bodyMaterial}材质`
              : "",

            color,
          ]
            .filter(Boolean)
            .join(" · "),
        ];

        enLines = [
          sealType === "鸭嘴式"
            ? "Duckbill Check Valve"
            : "Diaphragm Check Valve",

          [
            diaphragmMaterial
              ? `${diaphragmMaterial} diaphragm`
              : "",

            connection
              ? `Tube ID ${connection}`
              : "",
          ]
            .filter(Boolean)
            .join(" · "),

          [
            bodyMaterial
              ? `${bodyMaterial} body`
              : "",

            color,
          ]
            .filter(Boolean)
            .join(" · "),
        ];
      } else {
        const connectionLabel =
          connection.includes(
            "NPT"
          )
            ? `螺纹接口 ${connection}`
            : connection
              ? `接管内径 ${connection}`
              : "";

        zhLines = [
          /*
           * 卡片可以保留组件产品的真实名称，
           * 但筛选项统一归入水循环过滤器。
           */
          text(
            product.detailSlug
          ).startsWith(
            "filter-component-"
          )
            ? "水循环过滤器组件"
            : filterType ||
              "过滤器",

          [
            filterMedia
              ? `${filterMedia}滤网`
              : "",

            precision,
          ]
            .filter(Boolean)
            .join(" · "),

          [
            connectionLabel,

            bodyMaterial
              ? `${bodyMaterial}材质`
              : "",

            color,
          ]
            .filter(Boolean)
            .join(" · "),
        ];

        enLines = [
          text(
            product.detailSlug
          ).startsWith(
            "filter-component-"
          )
            ? "Water Circulation Filter Assembly"
            : filterType ||
              "Filter",

          [
            filterMedia
              ? `${filterMedia} filter media`
              : "",

            precision,
          ]
            .filter(Boolean)
            .join(" · "),

          [
            connection.includes(
              "NPT"
            )
              ? `Thread ${connection}`
              : connection
                ? `Tube ID ${connection}`
                : "",

            bodyMaterial
              ? `${bodyMaterial} body`
              : "",

            color,
          ]
            .filter(Boolean)
            .join(" · "),
        ];
      }

      return {
        ...product,

        filters: {
          filter01:
            productKind,

          /*
           * 过滤器专属字段
           */
          filter02:
            filterType,

          filter03:
            filterMedia,

          filter04:
            precision,

          /*
           * 单向阀专属字段
           */
          filter05:
            sealType,

          filter06:
            diaphragmMaterial,

          /*
           * 公共字段
           */
          filter07:
            connection,

          filter08:
            bodyMaterial,

          filter09:
            color,
        },

        cardSubtitle:
          multilingual(
            zhLines
              .filter(Boolean)
              .join("\n"),

            enLines
              .filter(Boolean)
              .join("\n")
          ),

        searchKeywords: {
          ...(product.searchKeywords || {}),

          zh: [
            text(
              product.searchKeywords?.zh
            ),
            productKind,
            filterType,
            filterMedia,
            precision,
            sealType,
            diaphragmMaterial,
            connection,
            bodyMaterial,
            color,
          ]
            .filter(Boolean)
            .join(" "),

          en: [
            text(
              product.searchKeywords?.en
            ),
            productKind,
            filterType,
            filterMedia,
            precision,
            sealType,
            diaphragmMaterial,
            connection,
            bodyMaterial,
            color,
          ]
            .filter(Boolean)
            .join(" "),
        },
      };
    }
  );

/* =========================================================
   3. 重建筛选标签
   ========================================================= */

const filterLabels = [
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
        "过滤器类型",
        "Filter Type"
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
        "滤网材质",
        "Filter Media"
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
        "过滤精度",
        "Filtration Rating"
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
        "密封类型",
        "Seal Type"
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
        "膜片材质",
        "Diaphragm Material"
      ),

    inputType:
      "multiple",

    sortOrder:
      60,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter07",

    label:
      multilingual(
        "接管内径 / 螺纹类型",
        "Tube ID / Thread"
      ),

    inputType:
      "multiple",

    sortOrder:
      70,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter08",

    label:
      multilingual(
        "材质",
        "Material"
      ),

    inputType:
      "multiple",

    sortOrder:
      80,

    visible:
      true,
  },
  {
    categoryId:
      "fittings",

    productTypeId:
      "filters",

    filterKey:
      "filter09",

    label:
      multilingual(
        "颜色",
        "Color"
      ),

    inputType:
      "multiple",

    sortOrder:
      90,

    visible:
      true,
  },
];

/* =========================================================
   4. 写回生成数据
   ========================================================= */

generatedSource =
  replaceArray(
    generatedSource,
    "filterCheckValveSelectionProducts",
    rebuiltProducts
  );

generatedSource =
  replaceArray(
    generatedSource,
    "filterCheckValveFilterLabels",
    filterLabels
  );

/* =========================================================
   5. ProductSelectionClient动态显示分组
   ========================================================= */

let clientSource =
  read(clientPath);

const filterKeysStart =
  clientSource.indexOf(
    "const FILTER_KEYS"
  );

const filterKeysEnd =
  clientSource.indexOf(
    "];",
    filterKeysStart
  );

if (
  filterKeysStart < 0 ||
  filterKeysEnd < 0
) {
  throw new Error(
    "无法定位FILTER_KEYS。"
  );
}

const filterKeysBlock =
  clientSource.slice(
    filterKeysStart,
    filterKeysEnd
  );

if (
  !filterKeysBlock.includes(
    '"filter09"'
  )
) {
  const filter08Text =
    '  "filter08",';

  if (
    !filterKeysBlock.includes(
      filter08Text
    )
  ) {
    throw new Error(
      "FILTER_KEYS中没有找到filter08。"
    );
  }

  const absoluteFilter08 =
    clientSource.indexOf(
      filter08Text,
      filterKeysStart
    );

  const insertAt =
    absoluteFilter08 +
    filter08Text.length;

  clientSource =
    clientSource.slice(
      0,
      insertAt
    ) +
    '\n  "filter09",' +
    clientSource.slice(
      insertAt
    );
}

const dynamicMarker =
  "FILTER_CHECK_VALVE_DYNAMIC_GROUPS_START";

if (
  !clientSource.includes(
    dynamicMarker
  )
) {
  const loopPattern =
    /activeFilterLabels\.forEach\(\(label:\s*ProductSelectionFilterLabel\)\s*=>\s*\{/;

  const matches =
    clientSource.match(
      new RegExp(
        loopPattern.source,
        "g"
      )
    ) || [];

  if (matches.length !== 1) {
    throw new Error(
      "无法唯一定位activeFilterLabels循环：" +
        matches.length
    );
  }

  const dynamicCode = `activeFilterLabels.forEach((label: ProductSelectionFilterLabel) => {
      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_START */

      /*
       * 过滤器与单向阀共用一个顶层入口，
       * 但筛选字段按实际型号结构动态显示。
       *
       * 未选择产品类型：
       * - 产品类型
       * - 接管内径 / 螺纹类型
       * - 材质
       * - 颜色
       *
       * 选择过滤器：
       * - 增加过滤器类型、滤网材质、过滤精度
       *
       * 选择单向阀：
       * - 增加密封类型、膜片材质
       */
      if (
        activeCategoryId ===
          "fittings" &&
        activeProductTypeId ===
          "filters"
      ) {
        const currentFilterKey =
          String(
            (label as any)
              .filterKey ||
            ""
          );

        const selectedTypeValues =
          selectedFilters.filter01;

        const selectedMergedType =
          selectedTypeValues &&
          selectedTypeValues.size === 1
            ? Array.from(
                selectedTypeValues
              )[0]
            : "";

        const commonKeys =
          new Set([
            "filter01",
            "filter07",
            "filter08",
            "filter09",
          ]);

        const filterKeys =
          new Set([
            ...commonKeys,
            "filter02",
            "filter03",
            "filter04",
          ]);

        const checkValveKeys =
          new Set([
            ...commonKeys,
            "filter05",
            "filter06",
          ]);

        const allowedKeys =
          selectedMergedType ===
            "过滤器"
            ? filterKeys
            : selectedMergedType ===
                "单向阀"
              ? checkValveKeys
              : commonKeys;

        if (
          !allowedKeys.has(
            currentFilterKey
          )
        ) {
          return;
        }
      }

      /* FILTER_CHECK_VALVE_DYNAMIC_GROUPS_END */`;

  clientSource =
    clientSource.replace(
      loopPattern,
      dynamicCode
    );
}

/* =========================================================
   6. 检查结果
   ========================================================= */

const structureTextExists =
  filterLabels.some(
    (item) =>
      item.label.zh ===
      "产品结构"
  );

const interfaceTextExists =
  filterLabels.some(
    (item) =>
      item.label.zh ===
      "接口形式"
  );

if (
  structureTextExists ||
  interfaceTextExists
) {
  throw new Error(
    "旧筛选组仍然存在。"
  );
}

const componentFilterOption =
  rebuiltProducts.some(
    (product) =>
      product.filters
        ?.filter02 ===
        "水循环过滤器组件" ||
      product.filters
        ?.filter05 ===
        "组件"
  );

if (componentFilterOption) {
  throw new Error(
    "仍然存在组件筛选选项。"
  );
}

const filterCount =
  rebuiltProducts.filter(
    (product) =>
      product.filters
        ?.filter01 ===
      "过滤器"
  ).length;

const checkValveCount =
  rebuiltProducts.filter(
    (product) =>
      product.filters
        ?.filter01 ===
      "单向阀"
  ).length;

if (
  filterCount !== 18 ||
  checkValveCount !== 16
) {
  throw new Error(
    `数量异常：过滤器${filterCount}，单向阀${checkValveCount}`
  );
}

/* =========================================================
   7. 语法检查
   ========================================================= */

for (
  const [
    fileName,
    source,
  ] of [
    [
      "filter-check-valve-selection.generated.ts",
      generatedSource,
    ],
    [
      "ProductSelectionClient.tsx",
      clientSource,
    ],
  ]
) {
  const result =
    ts.transpileModule(
      source,
      {
        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          jsx:
            ts.JsxEmit.Preserve,
        },

        reportDiagnostics:
          true,

        fileName,
      }
    );

  const errors =
    (
      result.diagnostics ||
      []
    ).filter(
      (diagnostic) =>
        diagnostic.category ===
        ts.DiagnosticCategory.Error
    );

  if (errors.length) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
        errors
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
}

/* =========================================================
   8. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const generatedBackup =
  `${generatedPath}.bak_model_filters_${stamp}`;

const clientBackup =
  `${clientPath}.bak_model_filters_${stamp}`;

fs.copyFileSync(
  generatedPath,
  generatedBackup
);

fs.copyFileSync(
  clientPath,
  clientBackup
);

fs.writeFileSync(
  generatedPath,
  generatedSource,
  "utf8"
);

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

/* =========================================================
   9. 报告
   ========================================================= */

const report = [];

report.push(
  "# 过滤器与单向阀型号筛选重建结果"
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
  `- 过滤器：${filterCount}`
);
report.push(
  `- 单向阀：${checkValveCount}`
);
report.push(
  `- 总卡片：${rebuiltProducts.length}`
);
report.push("");

report.push(
  "## 已删除"
);
report.push("");
report.push(
  "- 产品结构筛选组"
);
report.push(
  "- 接口形式筛选组"
);
report.push(
  "- 水循环过滤器组件筛选选项"
);
report.push(
  "- 组件筛选选项"
);
report.push("");

report.push(
  "## 过滤器专属字段"
);
report.push("");
report.push(
  `- 过滤器类型：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter02
    )
  ).join("、")}`
);
report.push(
  `- 滤网材质：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter03
    )
  ).join("、")}`
);
report.push(
  `- 过滤精度：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter04
    )
  ).join("、")}`
);
report.push("");

report.push(
  "## 单向阀专属字段"
);
report.push("");
report.push(
  `- 密封类型：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter05
    )
  ).join("、")}`
);
report.push(
  `- 膜片材质：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter06
    )
  ).join("、")}`
);
report.push("");

report.push(
  "## 公共字段"
);
report.push("");
report.push(
  `- 接管内径/螺纹：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter07
    )
  ).join("、")}`
);
report.push(
  `- 材质：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter08
    )
  ).join("、")}`
);
report.push(
  `- 颜色：${unique(
    rebuiltProducts.map(
      (item) =>
        item.filters?.filter09
    )
  ).join("、")}`
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
  "过滤器与单向阀型号筛选重建完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：",
  filterCount
);
console.log(
  "单向阀：",
  checkValveCount
);
console.log(
  "总卡片：",
  rebuiltProducts.length
);
console.log("");
console.log(
  "已去掉："
);
console.log(
  "- 产品结构"
);
console.log(
  "- 接口形式"
);
console.log(
  "- 水循环过滤器组件选项"
);
console.log(
  "- 组件选项"
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
