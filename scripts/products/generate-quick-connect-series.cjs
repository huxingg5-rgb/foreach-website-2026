const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const outputPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "index.json"
);

const summaryPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "summary.json"
);

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

function splitList(value) {
  return text(value)
    .split(
      /[\n,，;；/]+/
    )
    .map(text)
    .filter(Boolean);
}

function hasResource(value) {
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

const TUBE_CODE_MAP = {
  "01": '1/16"（1.6 mm）',
  "02": '1/8"（3.2 mm）',
  "03": '3/16"（4.8 mm）',
  "04": '1/4"（6.4 mm）',
  "06": '3/8"（9.5 mm）',
  "08": '1/2"（12.7 mm）',
  "12": '3/4"（19.0 mm）',

  "18N": '1/8"-27 NPT',
  "14N": '1/4"-18 NPT',
  "38N": '3/8"-18 NPT',
  "12N": '1/2"-14 NPT',
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
  map,
  code
) {
  const normalized =
    text(code);

  return (
    map[normalized] ||
    normalized ||
    "未识别"
  );
}

function parseModel(model) {
  const normalized =
    text(model)
      .toUpperCase();

  const [
    firstPart = "",
    secondPart = "",
    thirdPart = "",
  ] =
    normalized.split("-");

  const modelSeries =
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

  const sealCode =
    thirdPart.length >= 2
      ? thirdPart.slice(-1)
      : "";

  return {
    modelSeries,

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

    sealCode,
    sealingRingMaterial:
      decode(
        SEAL_MAP,
        sealCode
      ),
  };
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
    "没有找到04_快插接头工作表。"
  );
}

const worksheet =
  workbook.Sheets[
    sheetName
  ];

const rawRecords =
  XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: "",
      raw: false,
    }
  );

const products =
  rawRecords
    .filter(
      (record) => {
        const productType =
          text(
            record["产品类型"]
          );

        const series =
          text(
            record["产品系列"]
          ).toUpperCase();

        const model =
          text(
            record["恒永达型号"]
          );

        const productCode =
          text(
            record["商品编码"]
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
        record,
        index
      ) => {
        const series =
          text(
            record["产品系列"]
          ).toUpperCase();

        const foreachModel =
          text(
            record["恒永达型号"]
          ).toUpperCase();

        const productCode =
          text(
            record["商品编码"]
          );

        const parsed =
          parseModel(
            foreachModel
          );

        const competitorModels =
          splitList(
            record["竞品型号"]
          );

        const hasDrawing2d =
          hasResource(
            record["2D图编码"]
          );

        const hasModel3d =
          hasResource(
            record["3D图编码"]
          );

        return {
          sourceType:
            "quick-connect-selection",

          productId:
            productCode,

          productType:
            "快插接头",

          series,

          foreachModel,
          productCode,

          competitorModels,

          ...parsed,

          hasDrawing2d,
          hasModel3d,

          drawing2dCode:
            text(
              record["2D图编码"]
            ),

          model3dCode:
            text(
              record["3D图编码"]
            ),

          detailHref:
            `/products/fittings/quick-connect-fittings/${series.toLowerCase()}#${productCode}`,

          selectionHref:
            `/products/fittings/quick-connect-fittings/${series.toLowerCase()}`,

          sourceRow:
            index + 2,
        };
      }
    )
    .sort(
      (
        current,
        next
      ) => {
        const seriesOrder = {
          Q20: 1,
          Q40: 2,
          Q60: 3,
        };

        const seriesDifference =
          (
            seriesOrder[
              current.series
            ] || 99
          ) -
          (
            seriesOrder[
              next.series
            ] || 99
          );

        if (
          seriesDifference !== 0
        ) {
          return seriesDifference;
        }

        return current.foreachModel.localeCompare(
          next.foreachModel,
          "en",
          {
            numeric: true,
          }
        );
      }
    );

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

  unknownCodes: {
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
                item.sealCode
            )
            .map(
              (item) =>
                item.sealCode
            )
            .filter(Boolean)
        )
      ),
  },
};

fs.mkdirSync(
  path.dirname(
    outputPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    products,
    null,
    2
  ) + "\n",
  "utf8"
);

fs.writeFileSync(
  summaryPath,
  JSON.stringify(
    summary,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  `快插接头产品：${products.length}`
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
  `检查报告：${path.relative(
    root,
    summaryPath
  )}`
);