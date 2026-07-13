const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const outputPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.generated.ts"
);

const summaryPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.summary.json"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function text(value) {
  return String(value ?? "").trim();
}

function walk(directory, results = []) {
  if (!fs.existsSync(directory)) {
    return results;
  }

  for (
    const entry of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git"
    ) {
      continue;
    }

    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      walk(
        fullPath,
        results
      );
    } else {
      results.push(
        fullPath
      );
    }
  }

  return results;
}

function findWorkbook() {
  const candidates =
    walk(
      path.join(
        root,
        "data-source"
      )
    )
      .filter(
        (filePath) => {
          const fileName =
            path.basename(
              filePath
            );

          return (
            /\.xlsx$/i.test(
              fileName
            ) &&
            /连接件标品在售清单/.test(
              fileName
            ) &&
            !/^~\$/.test(
              fileName
            )
          );
        }
      )
      .sort(
        (current, next) =>
          fs.statSync(next).mtimeMs -
          fs.statSync(current).mtimeMs
      );

  if (
    candidates.length === 0
  ) {
    throw new Error(
      "未找到连接件标品在售清单Excel。"
    );
  }

  return candidates[0];
}

function localeText(
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

function hasResource(
  value
) {
  const normalized =
    text(value)
      .toLowerCase();

  if (!normalized) {
    return false;
  }

  return ![
    "×",
    "x",
    "无",
    "否",
    "no",
    "-",
    "—",
  ].includes(
    normalized
  );
}

function splitCompetitorModels(
  value
) {
  return text(value)
    .split(
      /[\n,，;；/]+/
    )
    .map(text)
    .filter(Boolean);
}

/*
 * 快插接头型号结构：
 *
 * Q2001-PMV-SACN
 *
 * Q20 | 01 | P | M | V | S | AC | N
 */
const TUBE_CODE_MAP = {
  /*
   * 软管规格统一只显示公制尺寸。
   * 不再同时显示英制分数。
   */
  "01": "1.6 mm",
  "02": "3.2 mm",
  "03": "4.8 mm",
  "04": "6.4 mm",
  "05": "7.9 mm",
  "06": "9.5 mm",
  "08": "12.7 mm",
  "10": "16.0 mm",
  "12": "19.0 mm",

  /*
   * 螺纹规格使用完整名称。
   */
  "18N": "1/8\"-27 NPT",
  "14N": "1/4\"-18 NPT",
  "38N": "3/8\"-18 NPT",
  "12N": "1/2\"-14 NPT",
  "18T": "R1/8（BSPT）",
  "28U": "1/4\"-28 UNF",
};

const GENDER_MAP = {
  P: "公端",
  S: "母端",
};

const PANEL_MAP = {
  M: "穿板",
  N: "非穿板",
};

const VALVED_MAP = {
  V: "带阀",
  X: "不带阀",
};

const SHAPE_MAP = {
  S: "直通",
  L: "L型",
};

const HOUSING_MAP = {
  AC: "POM",
  PP: "PP",
};

const SEAL_MAP = {
  N: "NBR",
  E: "EPDM",
  F: "FKM",
};

function decode(
  valueMap,
  code
) {
  const normalized =
    text(code);

  return (
    valueMap[normalized] ||
    normalized ||
    "未识别"
  );
}

function parseModel(
  model
) {
  const normalized =
    text(model)
      .toUpperCase();

  const [
    firstPart = "",
    secondPart = "",
    thirdPart = "",
  ] =
    normalized.split("-");

  const series =
    firstPart.slice(
      0,
      3
    );

  const tubeCode =
    firstPart.slice(3);

  const genderCode =
    secondPart.slice(
      0,
      1
    );

  const panelCode =
    secondPart.slice(
      1,
      2
    );

  const valvedCode =
    secondPart.slice(
      2,
      3
    );

  const shapeCode =
    thirdPart.slice(
      0,
      1
    );

  const housingCode =
    thirdPart.length >= 3
      ? thirdPart.slice(
          1,
          -1
        )
      : "";

  const sealingCode =
    thirdPart.length >= 2
      ? thirdPart.slice(-1)
      : "";

  return {
    series,

    tubeCode,
    tubeOrThread:
      decode(
        TUBE_CODE_MAP,
        tubeCode
      ),

    genderCode,
    gender:
      decode(
        GENDER_MAP,
        genderCode
      ),

    panelCode,
    panelMount:
      decode(
        PANEL_MAP,
        panelCode
      ),

    valvedCode,
    valved:
      decode(
        VALVED_MAP,
        valvedCode
      ),

    shapeCode,
    shape:
      decode(
        SHAPE_MAP,
        shapeCode
      ),

    housingCode,
    housingMaterial:
      decode(
        HOUSING_MAP,
        housingCode
      ),

    sealingCode,
    sealingRingMaterial:
      decode(
        SEAL_MAP,
        sealingCode
      ),
  };
}

function makeCardTitle(
  model
) {
  return {
    zh: model,
    en: model,
  };
}

function isMetricTubeSize(value) {
  return /^\\d+(?:\\.\\d+)?\\s*mm$/i.test(
    String(value || "").trim()
  );
}

function compactMetricTubeSize(value) {
  return String(value || "")
    .trim()
    .replace(/\\s+mm$/i, "mm");
}

function makeCardSubtitle(
  parsed
) {
  /*
   * 快插接头卡片固定三行：
   *
   * 第一行：
   * Q20公端直通带阀快插接头
   *
   * 第二行：
   * 适配1.6mm接管内径
   * 或
   * 适配1/8"-27 NPT螺纹接口
   *
   * 第三行：
   * POM材质，可穿板
   */
  const line1 =
    [
      parsed.series,
      parsed.gender,
      parsed.shape,
      parsed.valved,
      "快插接头",
    ]
      .filter(Boolean)
      .join("");

  const line2 =
    isMetricTubeSize(
      parsed.tubeOrThread
    )
      ? "适配" +
        compactMetricTubeSize(
          parsed.tubeOrThread
        ) +
        "接管内径"
      : "适配" +
        parsed.tubeOrThread +
        "螺纹接口";

  const mountingText =
    parsed.panelMount === "穿板"
      ? "可穿板"
      : "非穿板";

  const line3 =
    parsed.housingMaterial +
    "材质，" +
    mountingText;

  return {
    zh: [
      line1,
      line2,
      line3,
    ].join("\\n"),

    en: [
      line1,
      line2,
      line3,
    ].join("\\n"),
  };
}

function backupFile(
  filePath,
  label
) {
  if (
    !fs.existsSync(
      filePath
    )
  ) {
    return "";
  }

  const backupPath =
    `${filePath}.bak_${label}_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

function insertImport(
  source
) {
  if (
    source.includes(
      "quick-connect-fitting-selection.generated"
    )
  ) {
    return source;
  }

  const importBlock = `
import {
  quickConnectFittingFilterLabels,
  quickConnectFittingSelectionProducts,
  quickConnectFittingTaxonomyItems,
} from "@/data/products/selection/quick-connect-fitting-selection.generated";
`;

  const barbedImportPattern =
    /import\s*\{[^;]+\}\s*from\s*["']@\/data\/products\/selection\/barbed-fitting-selection\.generated["'];/s;

  if (
    barbedImportPattern.test(
      source
    )
  ) {
    return source.replace(
      barbedImportPattern,
      (matched) =>
        matched +
        importBlock
    );
  }

  const hardTubeImportPattern =
    /import\s*\{[^;]+\}\s*from\s*["']@\/data\/products\/selection\/hard-tube-fitting-selection\.generated["'];/s;

  if (
    hardTubeImportPattern.test(
      source
    )
  ) {
    return source.replace(
      hardTubeImportPattern,
      (matched) =>
        matched +
        importBlock
    );
  }

  throw new Error(
    "没有找到硬管接头或倒刺接头的数据导入位置。"
  );
}

function insertArraySpread(
  source,
  arrayName,
  spreadName
) {
  if (
    source.includes(
      `...${spreadName}`
    )
  ) {
    return source;
  }

  const pattern =
    new RegExp(
      `(const\\s+${arrayName}(?:\\s*:[^=]+)?\\s*=\\s*\\[\\s*)`
    );

  if (
    !pattern.test(
      source
    )
  ) {
    throw new Error(
      `没有找到数组：${arrayName}`
    );
  }

  return source.replace(
    pattern,
    `$1  ...${spreadName},\n`
  );
}

const workbookPath =
  findWorkbook();

const workbook =
  XLSX.readFile(
    workbookPath,
    {
      raw: false,
      cellDates: false,
    }
  );

const sheetName =
  workbook.SheetNames.find(
    (name) =>
      name ===
      "04_快插接头"
  ) ||
  workbook.SheetNames.find(
    (name) =>
      name.includes(
        "快插接头"
      )
  );

if (!sheetName) {
  throw new Error(
    "未找到04_快插接头工作表。"
  );
}

const worksheet =
  workbook.Sheets[
    sheetName
  ];

const rows =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: "",
      raw: false,
    }
  );

const genericImage =
  fs.existsSync(
    path.join(
      root,
      "public",
      "images",
      "products",
      "FIT",
      "Quick connector_200x200_01_v001.jpg"
    )
  )
    ? "/images/products/FIT/Quick connector_200x200_01_v001.jpg"
    : "/images/logo/foreach-logo-color.svg";

const products =
  rows
    .filter(
      (row) => {
        const productType =
          text(
            row["产品类型"]
          );

        const series =
          text(
            row["产品系列"]
          ).toUpperCase();

        const model =
          text(
            row["恒永达型号"]
          );

        const productCode =
          text(
            row["商品编码"]
          );

        return (
          productType ===
            "快插接头" &&
          [
            "Q20",
            "Q40",
            "Q60",
          ].includes(
            series
          ) &&
          Boolean(model) &&
          Boolean(productCode)
        );
      }
    )
    .map(
      (
        row,
        index
      ) => {
        const model =
          text(
            row["恒永达型号"]
          ).toUpperCase();

        const productCode =
          text(
            row["商品编码"]
          );

        const parsed =
          parseModel(
            model
          );

        const competitorModels =
          splitCompetitorModels(
            row["竞品型号"]
          );

        const cardSubtitle =
          makeCardSubtitle(
            parsed
          );

        const searchKeywordsZh =
          [
            "快插接头",
            parsed.series,
            model,
            productCode,
            ...competitorModels,
            parsed.tubeOrThread,
            parsed.gender,
            parsed.panelMount,
            parsed.valved,
            parsed.shape,
            parsed.housingMaterial,
            parsed.sealingRingMaterial,
          ]
            .filter(Boolean)
            .join(" ");

        const searchKeywordsEn =
          [
            "quick-connect fitting",
            parsed.series,
            model,
            productCode,
            ...competitorModels,
            parsed.tubeOrThread,
            parsed.gender,
            parsed.panelMount,
            parsed.valved,
            parsed.shape,
            parsed.housingMaterial,
            parsed.sealingRingMaterial,
          ]
            .filter(Boolean)
            .join(" ");

        return {
          productId:
            productCode,

          categoryId:
            "fittings",

          productTypeId:
            "quick-connect-fittings",

          seriesId:
            parsed.series
              .toLowerCase(),

          cardTitle:
            makeCardTitle(
              model
            ),

          cardSubtitle,

          filters: {
            filter01:
              parsed.series,

            filter02:
              parsed.tubeOrThread,

            filter03:
              parsed.gender,

            filter04:
              parsed.panelMount,

            filter05:
              parsed.valved,

            filter06:
              parsed.shape,

            filter07:
              parsed.housingMaterial,
},

          imageCard:
            genericImage,

          detailSlug:
            "quick-connect-fittings",

          status:
            "active",

          sortOrder:
            440000 +
            index,

          searchKeywords: {
            zh:
              searchKeywordsZh,

            en:
              searchKeywordsEn,
          },

          sourceType:
            "quick-connect-selection",

          productCode,

          model,

          foreachModel:
            model,

          competitorModels,

          series:
            parsed.series,

          tubeCode:
            parsed.tubeCode,

          tubeOrThread:
            parsed.tubeOrThread,

          genderCode:
            parsed.genderCode,

          gender:
            parsed.gender,

          panelCode:
            parsed.panelCode,

          panelMount:
            parsed.panelMount,

          valvedCode:
            parsed.valvedCode,

          valved:
            parsed.valved,

          shapeCode:
            parsed.shapeCode,

          shape:
            parsed.shape,

          housingCode:
            parsed.housingCode,

          housingMaterial:
            parsed.housingMaterial,

          sealingCode:
            parsed.sealingCode,

          sealingRingMaterial:
            parsed.sealingRingMaterial,

          needDrawing:
            hasResource(
              row["2D图编码"]
            ),

          needModel3d:
            hasResource(
              row["3D图编码"]
            ),

          detailHref:
            "/products/fittings/quick-connect-fittings",

          href:
            "/products/fittings/quick-connect-fittings",
        };
      }
    )
    .sort(
      (
        current,
        next
      ) => {
        const orderMap = {
          Q20: 1,
          Q40: 2,
          Q60: 3,
        };

        const seriesDifference =
          (
            orderMap[
              current.series
            ] || 99
          ) -
          (
            orderMap[
              next.series
            ] || 99
          );

        if (
          seriesDifference !== 0
        ) {
          return seriesDifference;
        }

        return current.model.localeCompare(
          next.model,
          "en",
          {
            numeric: true,
          }
        );
      }
    );

const filterLabels = [
  {
    categoryId:
      "fittings",

    productTypeId:
      "quick-connect-fittings",

    filterKey:
      "filter01",

    label:
      localeText(
        "产品系列",
        "Product Series"
      ),

    inputType:
      "multiple",

    sortOrder:
      10,

    visible:
      true,
  },

  {
    categoryId:
      "fittings",

    productTypeId:
      "quick-connect-fittings",

    filterKey:
      "filter02",

    label:
      localeText(
        "接管内径或螺纹",
        "Tube I.D. or Thread"
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
      "quick-connect-fittings",

    filterKey:
      "filter03",

    label:
      localeText(
        "公母端",
        "Male / Female"
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
      "quick-connect-fittings",

    filterKey:
      "filter04",

    label:
      localeText(
        "安装方式",
        "Mounting"
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
      "quick-connect-fittings",

    filterKey:
      "filter05",

    label:
      localeText(
        "阀门配置",
        "Valve Configuration"
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
      "quick-connect-fittings",

    filterKey:
      "filter06",

    label:
      localeText(
        "形状",
        "Shape"
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
      "quick-connect-fittings",

    filterKey:
      "filter07",

    label:
      localeText(
        "外壳材质",
        "Housing Material"
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
      "quick-connect-fittings",

    filterKey:
      "filter08",

    label:
      localeText(
        "密封圈材质",
        "Seal Material"
      ),

    inputType:
      "multiple",

    sortOrder:
      80,

    visible:
      true,
  },
];


/* QUICK_CONNECT_REMOVE_SEAL_FILTER
 *
 * 密封圈材质继续保留在型号解析数据中，
 * 但不在产品中心筛选栏显示。
 */
for (
  let index =
    filterLabels.length - 1;
  index >= 0;
  index -= 1
) {
  if (
    filterLabels[index].filterKey ===
    "filter08"
  ) {
    filterLabels.splice(
      index,
      1
    );
  }
}

const taxonomyItems = [
  {
    type:
      "productType",

    id:
      "quick-connect-fittings",

    label:
      localeText(
        "快插接头",
        "Quick-connect Fittings"
      ),

    sortOrder:
      440,
  },

  {
    type:
      "series",

    id:
      "q20",

    label:
      localeText(
        "Q20",
        "Q20"
      ),

    sortOrder:
      441,
  },

  {
    type:
      "series",

    id:
      "q40",

    label:
      localeText(
        "Q40",
        "Q40"
      ),

    sortOrder:
      442,
  },

  {
    type:
      "series",

    id:
      "q60",

    label:
      localeText(
        "Q60",
        "Q60"
      ),

    sortOrder:
      443,
  },
];

const output =
`/* =========================================================
   quick-connect-fitting-selection.generated.ts
   快插接头产品中心选型数据

   数据来源：
   FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx
   工作表：04_快插接头

   注意：
   1. 不要手动修改本文件
   2. 页面样式完全继承现有产品选型页
   3. 不创建快插接头专属CSS
========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const quickConnectFittingSelectionProducts =
${JSON.stringify(
  products,
  null,
  2
)} as unknown as ProductSelectionProduct[];

export const quickConnectFittingFilterLabels =
${JSON.stringify(
  filterLabels,
  null,
  2
)} as ProductSelectionFilterLabel[];

export const quickConnectFittingTaxonomyItems =
${JSON.stringify(
  taxonomyItems,
  null,
  2
)} as ProductSelectionTaxonomyItem[];
`;

fs.mkdirSync(
  path.dirname(
    outputPath
  ),
  {
    recursive: true,
  }
);

backupFile(
  outputPath,
  "quick_connect_data"
);

fs.writeFileSync(
  outputPath,
  output,
  "utf8"
);

const unknownCodes = {
  tubeOrThread:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.tubeOrThread ===
              item.tubeCode
          )
          .map(
            (item) =>
              item.tubeCode
          )
          .filter(Boolean)
      )
    ),

  gender:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.gender ===
              item.genderCode
          )
          .map(
            (item) =>
              item.genderCode
          )
          .filter(Boolean)
      )
    ),

  panelMount:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.panelMount ===
              item.panelCode
          )
          .map(
            (item) =>
              item.panelCode
          )
          .filter(Boolean)
      )
    ),

  valved:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.valved ===
              item.valvedCode
          )
          .map(
            (item) =>
              item.valvedCode
          )
          .filter(Boolean)
      )
    ),

  shape:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.shape ===
              item.shapeCode
          )
          .map(
            (item) =>
              item.shapeCode
          )
          .filter(Boolean)
      )
    ),

  housingMaterial:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.housingMaterial ===
              item.housingCode
          )
          .map(
            (item) =>
              item.housingCode
          )
          .filter(Boolean)
      )
    ),

  sealingRingMaterial:
    Array.from(
      new Set(
        products
          .filter(
            (item) =>
              item.sealingRingMaterial ===
              item.sealingCode
          )
          .map(
            (item) =>
              item.sealingCode
          )
          .filter(Boolean)
      )
    ),
};

const summary = {
  generatedAt:
    new Date()
      .toISOString(),

  workbook:
    path.relative(
      root,
      workbookPath
    ),

  sheetName,

  total:
    products.length,

  counts: {
    Q20:
      products.filter(
        (item) =>
          item.series ===
          "Q20"
      ).length,

    Q40:
      products.filter(
        (item) =>
          item.series ===
          "Q40"
      ).length,

    Q60:
      products.filter(
        (item) =>
          item.series ===
          "Q60"
      ).length,
  },

  unknownCodes,
};

fs.writeFileSync(
  summaryPath,
  JSON.stringify(
    summary,
    null,
    2
  ) + "\n",
  "utf8"
);

if (
  !fs.existsSync(
    clientPath
  )
) {
  throw new Error(
    "找不到ProductSelectionClient.tsx。"
  );
}

backupFile(
  clientPath,
  "quick_connect_client"
);

let clientSource =
  fs.readFileSync(
    clientPath,
    "utf8"
  )
  .replace(
    /\r\n/g,
    "\n"
  );

clientSource =
  insertImport(
    clientSource
  );

clientSource =
  insertArraySpread(
    clientSource,
    "selectionProducts",
    "quickConnectFittingSelectionProducts"
  );

clientSource =
  insertArraySpread(
    clientSource,
    "selectionTaxonomyItems",
    "quickConnectFittingTaxonomyItems"
  );

clientSource =
  insertArraySpread(
    clientSource,
    "selectionFilterLabels",
    "quickConnectFittingFilterLabels"
  );

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

console.log("");
console.log(
  "快插接头选型数据接入完成。"
);

console.log(
  `总型号：${products.length}`
);

console.log(
  `Q20：${summary.counts.Q20}`
);

console.log(
  `Q40：${summary.counts.Q40}`
);

console.log(
  `Q60：${summary.counts.Q60}`
);

console.log(
  `数据文件：${path.relative(
    root,
    outputPath
  )}`
);

console.log(
  `检查文件：${path.relative(
    root,
    summaryPath
  )}`
);

console.log(
  "未新增任何CSS或独立页面组件。"
);