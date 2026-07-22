const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    name: "过滤器",
    expectedCount: 18,
    filePath: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "filters",
      "detail",
      "index.json"
    ),
  },
  {
    name: "单向阀",
    expectedCount: 16,
    filePath: path.join(
      root,
      "data",
      "products",
      "generated",
      "fittings",
      "check-valves",
      "detail",
      "index.json"
    ),
  },
];

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-detail-specs-by-model.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function spec(label, value) {
  const normalizedValue = text(value);

  if (!normalizedValue) {
    return null;
  }

  return {
    label,
    value: normalizedValue,
  };
}

function getExistingSpecValue(
  detail,
  label
) {
  const items = Array.isArray(detail.specs)
    ? detail.specs
    : [];

  return text(
    items.find(
      (item) =>
        text(item?.label) === label
    )?.value
  );
}

function normalizeModel(detail) {
  return text(
    detail.model ||
    detail.displayModel ||
    detail.modelDisplay
  ).toUpperCase();
}

function normalizeProductCode(detail) {
  return text(
    detail.productCode ||
    detail.productId ||
    getExistingSpecValue(
      detail,
      "商品编码"
    )
  );
}

function parseTubeSize(code) {
  const normalizedCode = text(code)
    .toUpperCase()
    .replace(/D$/, "");

  const sizeMap = {
    "16": "1.6 mm",
    "24": "2.4 mm",
    "32": "3.2 mm",
    "40": "4.0 mm",
    "48": "4.8 mm",
    "64": "6.4 mm",
    "79": "7.9 mm",
    "95": "9.5 mm",
    "127": "12.7 mm",
    "191": "19.1 mm",
  };

  return sizeMap[normalizedCode] || "";
}

function parseColor(code) {
  const colorMap = {
    N: "本色",
    B: "黑色",
    W: "白色",
    U: "蓝色",
    R: "红色",
    Y: "黄色",
    O: "橙色",
    G: "绿色",
  };

  /*
   * V目前没有从用户提供的型号规则图中
   * 得到明确颜色定义，因此不擅自显示。
   */
  return colorMap[text(code).toUpperCase()] || "";
}

function parseHousingMaterial(code) {
  const materialMap = {
    PP: "PP",
    PA: "PA",
    PV: "PVDF",
    PVDF: "PVDF",
    POM: "POM",
    AC: "AC",
  };

  return (
    materialMap[
      text(code).toUpperCase()
    ] || text(code).toUpperCase()
  );
}

function parseFilterPrecision(code) {
  const precisionMap = {
    "10": "10 μm",
    "60": "40–60 μm",
    "100": "80–100 μm",
    "150": "150 μm",
    "250": "250 μm",
  };

  return precisionMap[text(code)] || "";
}

function parseFilterMedia(code) {
  const mediaMap = {
    PE: "HDPE",
    PA: "PA",
    SS: "SUS",
  };

  return mediaMap[text(code).toUpperCase()] || "";
}

function buildFilterSpecs(detail) {
  const model =
    normalizeModel(detail);

  const productCode =
    normalizeProductCode(detail);

  const existingModel =
    getExistingSpecValue(
      detail,
      "型号"
    ) ||
    text(detail.model) ||
    "未单独命名";

  /*
   * 商品编码139009：
   * 水循环过滤器组件。
   * 没有标准型号编码，不能套用F型号解析。
   */
  if (productCode === "139009") {
    return [
      spec("型号", existingModel),
      spec("商品编码", productCode),
      spec(
        "产品类型",
        "水循环过滤器组件"
      ),
      spec(
        "外形尺寸",
        "86 × 48.8 mm"
      ),
      spec(
        "壳体材质",
        "POM"
      ),
    ].filter(Boolean);
  }

  /*
   * 商品编码139010：
   * 当前源表名称为水循环过滤器，
   * 使用源表已确认的技术参数。
   */
  if (productCode === "139010") {
    return [
      spec("型号", existingModel),
      spec("商品编码", productCode),
      spec(
        "产品类型",
        "水循环过滤器"
      ),
      spec(
        "滤网材质",
        "SUS"
      ),
      spec(
        "过滤精度",
        "150 μm"
      ),
      spec(
        "螺纹接口",
        "3/8-18 NPT"
      ),
      spec(
        "壳体材质",
        "PP"
      ),
      spec(
        "颜色",
        "本色"
      ),
    ].filter(Boolean);
  }

  /*
   * F-PE-10-24-PP-N
   * F-PA-250-32D-PA-N
   * F-SS-150-127D-PP-N
   */
  const fMatch = model.match(
    /^F-(PE|PA|SS)-(\d+)-(\d+D?)-([A-Z]+)-([A-Z])$/
  );

  if (fMatch) {
    const [
      ,
      mediaCode,
      precisionCode,
      connectionCode,
      housingCode,
      colorCode,
    ] = fMatch;

    return [
      spec("型号", existingModel),
      spec("商品编码", productCode),
      spec(
        "产品类型",
        "过滤器"
      ),
      spec(
        "滤网材质",
        parseFilterMedia(
          mediaCode
        )
      ),
      spec(
        "过滤精度",
        parseFilterPrecision(
          precisionCode
        )
      ),
      spec(
        "接管内径",
        parseTubeSize(
          connectionCode
        )
      ),
      spec(
        "壳体材质",
        parseHousingMaterial(
          housingCode
        )
      ),
      spec(
        "颜色",
        parseColor(
          colorCode
        )
      ),
    ].filter(Boolean);
  }

  /*
   * G-178-64-PA-V
   *
   * 178当前只能确认是型号中的规格代码，
   * 不能直接解释为178 μm。
   *
   * V也没有从当前型号规则图中确认具体颜色，
   * 因此详情规格不展示错误解释。
   */
  const gMatch = model.match(
    /^G-([A-Z0-9]+)-(\d+)-([A-Z]+)-([A-Z])$/
  );

  if (gMatch) {
    const [
      ,
      ,
      connectionCode,
      housingCode,
      colorCode,
    ] = gMatch;

    return [
      spec("型号", existingModel),
      spec("商品编码", productCode),
      spec(
        "产品类型",
        "G系列过滤器"
      ),
      spec(
        "接管内径",
        parseTubeSize(
          connectionCode
        )
      ),
      spec(
        "壳体材质",
        parseHousingMaterial(
          housingCode
        )
      ),
      spec(
        "颜色",
        parseColor(
          colorCode
        )
      ),
    ].filter(Boolean);
  }

  throw new Error(
    `无法解析过滤器型号：${model}，商品编码：${productCode}`
  );
}

function buildCheckValveSpecs(detail) {
  const model =
    normalizeModel(detail);

  const productCode =
    normalizeProductCode(detail);

  const existingModel =
    getExistingSpecValue(
      detail,
      "型号"
    ) ||
    text(detail.model);

  /*
   * CV-BE-16-PP-N
   * CV-DV-16-PV-N
   *
   * 第一位：
   * B = 膜片式
   * D = 鸭嘴式
   *
   * 第二位：
   * E = EPDM
   * V = FKM
   * F = FFKM
   */
  const match = model.match(
    /^CV-([BD])([EVF])-([0-9]+)-([A-Z]+)-([A-Z])$/
  );

  if (!match) {
    throw new Error(
      `无法解析单向阀型号：${model}，商品编码：${productCode}`
    );
  }

  const [
    ,
    sealCode,
    sealMaterialCode,
    connectionCode,
    housingCode,
    colorCode,
  ] = match;

  const sealTypeMap = {
    B: "膜片式",
    D: "鸭嘴式",
  };

  const sealMaterialMap = {
    E: "EPDM",
    V: "FKM",
    F: "FFKM",
  };

  const sealType =
    sealTypeMap[sealCode];

  const sealMaterial =
    sealMaterialMap[
      sealMaterialCode
    ];

  const materialLabel =
    sealType === "鸭嘴式"
      ? "密封件材质"
      : "膜片材质";

  return [
    spec("型号", existingModel),
    spec("商品编码", productCode),
    spec(
      "产品类型",
      "单向阀"
    ),
    spec(
      "密封类型",
      sealType
    ),
    spec(
      materialLabel,
      sealMaterial
    ),
    spec(
      "接管内径",
      parseTubeSize(
        connectionCode
      )
    ),
    spec(
      "壳体材质",
      parseHousingMaterial(
        housingCode
      )
    ),
    spec(
      "颜色",
      parseColor(
        colorCode
      )
    ),
  ].filter(Boolean);
}

function updateDetailSpecs(
  detail,
  targetName
) {
  const items =
    targetName === "过滤器"
      ? buildFilterSpecs(detail)
      : buildCheckValveSpecs(detail);

  return {
    ...detail,

    specs: items,

    specifications: items,

    specGroups: [
      {
        title: "技术参数",
        items,
      },
    ],
  };
}

function validateDetails(
  details,
  targetName
) {
  const forbiddenLabels = new Set([
    "料号",
    "关联型号",
    "产品系列",
    "过滤规格代码",
    "主体材质",
  ]);

  for (const detail of details) {
    const items =
      Array.isArray(detail.specs)
        ? detail.specs
        : [];

    const labels =
      items.map(
        (item) =>
          text(item.label)
      );

    if (
      labels[0] !== "型号" ||
      labels[1] !== "商品编码"
    ) {
      throw new Error(
        `${targetName}规格顺序异常：${detail.model}`
      );
    }

    for (const label of labels) {
      if (
        forbiddenLabels.has(label)
      ) {
        throw new Error(
          `${targetName}仍存在旧字段“${label}”：${detail.model}`
        );
      }
    }

    const colorItem =
      items.find(
        (item) =>
          item.label === "颜色"
      );

    if (
      colorItem &&
      /色代码/.test(
        text(colorItem.value)
      )
    ) {
      throw new Error(
        `${targetName}仍存在颜色代码：${detail.model}`
      );
    }
  }
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const reportLines = [
  "# 过滤器与单向阀详情规格型号解析结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
];

for (const target of targets) {
  if (
    !fs.existsSync(
      target.filePath
    )
  ) {
    throw new Error(
      `未找到${target.name}详情文件：${target.filePath}`
    );
  }

  const original =
    JSON.parse(
      fs.readFileSync(
        target.filePath,
        "utf8"
      )
    );

  if (
    !Array.isArray(original) ||
    original.length !==
      target.expectedCount
  ) {
    throw new Error(
      `${target.name}数量异常：` +
      `${Array.isArray(original) ? original.length : "非数组"}` +
      `/${target.expectedCount}`
    );
  }

  /*
   * 先全部解析。
   * 任意型号不能识别时直接停止，不写入半成品。
   */
  const updated =
    original.map(
      (detail) =>
        updateDetailSpecs(
          detail,
          target.name
        )
    );

  validateDetails(
    updated,
    target.name
  );

  const backupPath =
    `${target.filePath}.bak_specs_by_model_${stamp}`;

  fs.copyFileSync(
    target.filePath,
    backupPath
  );

  fs.writeFileSync(
    target.filePath,
    JSON.stringify(
      updated,
      null,
      2
    ) + "\n",
    "utf8"
  );

  reportLines.push(
    `## ${target.name}`
  );
  reportLines.push("");
  reportLines.push(
    `- 数量：${updated.length}`
  );
  reportLines.push(
    `- 备份：${backupPath}`
  );
  reportLines.push("");

  for (
    const detail
    of updated.slice(0, 4)
  ) {
    reportLines.push(
      `### ${detail.model}`
    );
    reportLines.push("");
    reportLines.push("```text");

    for (
      const item
      of detail.specs
    ) {
      reportLines.push(
        `${item.label}：${item.value}`
      );
    }

    reportLines.push("```");
    reportLines.push("");
  }
}

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  reportLines.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "详情规格型号解析完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：18条"
);
console.log(
  "单向阀：16条"
);
console.log("");
console.log(
  "已保留："
);
console.log(
  "- 型号"
);
console.log(
  "- 商品编码"
);
console.log("");
console.log(
  "已删除旧字段："
);
console.log(
  "- 料号"
);
console.log(
  "- 关联型号"
);
console.log(
  "- 产品系列"
);
console.log(
  "- 过滤规格代码"
);
console.log(
  "- 主体材质"
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
