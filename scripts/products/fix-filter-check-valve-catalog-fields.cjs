const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-catalog-field-fix.md"
);

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

function findArrayRange(
  source,
  exportName
) {
  const declaration =
    new RegExp(
      `export\\s+const\\s+${exportName}\\s*=`
    );

  const match =
    source.match(declaration);

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到导出数组：${exportName}`
    );
  }

  const start =
    source.indexOf(
      "[",
      match.index +
        match[0].length
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
          end:
            index + 1,
        };
      }
    }
  }

  throw new Error(
    `数组没有正常结束：${exportName}`
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

function unique(values) {
  return [
    ...new Set(
      values
        .map(text)
        .filter(Boolean)
    ),
  ];
}

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到生成文件：" +
      targetPath
  );
}

let source =
  fs.readFileSync(
    targetPath,
    "utf8"
  );

const products =
  readArray(
    source,
    "filterCheckValveSelectionProducts"
  );

if (products.length !== 34) {
  throw new Error(
    `卡片数量异常：${products.length}/34`
  );
}

let mergedTypeCount = 0;
let removedGPrecisionCount = 0;

const fixedProducts =
  products.map(
    (product) => {
      const filters = {
        ...(product.filters || {}),
      };

      const model =
        text(
          product.model ||
          product.productCode ||
          product.productId
        ).toUpperCase();

      const isFilter =
        filters.filter01 ===
          "过滤器" ||
        product.productTypeId ===
          "filters";

      if (!isFilter) {
        return product;
      }

      if (
        filters.filter02 ===
          "PE过滤器" ||
        filters.filter02 ===
          "PA过滤器"
      ) {
        filters.filter02 =
          "PE&PA过滤器";

        mergedTypeCount += 1;
      }

      /*
       * G-178中的178没有在用户提供的型号规则中
       * 被确认为过滤精度，因此不能显示为178 μm。
       */
      if (
        model.startsWith("G-") &&
        text(
          filters.filter04
        ) === "178 μm"
      ) {
        filters.filter04 = "";
        removedGPrecisionCount += 1;
      }

      const filterType =
        text(filters.filter02);

      const filterMedia =
        text(filters.filter03);

      const precision =
        text(filters.filter04);

      const connection =
        text(filters.filter07);

      const material =
        text(filters.filter08);

      const color =
        text(filters.filter09);

      const isComponent =
        text(
          product.detailSlug
        ).startsWith(
          "filter-component-"
        );

      const zhTitle =
        isComponent
          ? "水循环过滤器组件"
          : filterType ||
            "过滤器";

      const enTitle =
        isComponent
          ? "Water Circulation Filter Assembly"
          : filterType ===
              "PE&PA过滤器"
            ? "PE & PA Filter"
            : filterType ===
                "G系列过滤器"
              ? "G Series Filter"
              : filterType ===
                  "水循环过滤器"
                ? "Water Circulation Filter"
                : "Filter";

      const zhLine2 = [
        filterMedia
          ? `${filterMedia}滤网`
          : "",

        precision,
      ]
        .filter(Boolean)
        .join(" · ");

      const enLine2 = [
        filterMedia
          ? `${filterMedia} filter media`
          : "",

        precision,
      ]
        .filter(Boolean)
        .join(" · ");

      const isThread =
        connection.includes(
          "NPT"
        );

      const zhLine3 = [
        connection
          ? (
              isThread
                ? `螺纹接口 ${connection}`
                : `接管内径 ${connection}`
            )
          : "",

        material
          ? `${material}材质`
          : "",

        color,
      ]
        .filter(Boolean)
        .join(" · ");

      const enLine3 = [
        connection
          ? (
              isThread
                ? `Thread ${connection}`
                : `Tube ID ${connection}`
            )
          : "",

        material
          ? `${material} body`
          : "",

        color,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        ...product,

        filters,

        cardSubtitle:
          multilingual(
            [
              zhTitle,
              zhLine2,
              zhLine3,
            ]
              .filter(Boolean)
              .join("\n"),

            [
              enTitle,
              enLine2,
              enLine3,
            ]
              .filter(Boolean)
              .join("\n")
          ),
      };
    }
  );

const filterTypeValues =
  unique(
    fixedProducts.map(
      (product) =>
        product.filters?.filter02
    )
  );

const precisionValues =
  unique(
    fixedProducts.map(
      (product) =>
        product.filters?.filter04
    )
  );

if (
  filterTypeValues.includes(
    "PE过滤器"
  ) ||
  filterTypeValues.includes(
    "PA过滤器"
  )
) {
  throw new Error(
    "PE过滤器或PA过滤器仍未合并。"
  );
}

if (
  precisionValues.includes(
    "178 μm"
  )
) {
  throw new Error(
    "178 μm仍然存在。"
  );
}

const expectedTypes = [
  "G系列过滤器",
  "PE&PA过滤器",
  "水循环过滤器",
];

for (
  const value
  of expectedTypes
) {
  if (
    !filterTypeValues.includes(
      value
    )
  ) {
    throw new Error(
      "缺少过滤器类型：" +
        value
    );
  }
}

source =
  replaceArray(
    source,
    "filterCheckValveSelectionProducts",
    fixedProducts
  );

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${targetPath}.bak_catalog_fields_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

const report = [
  "# 过滤器与单向阀目录字段最终修正",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修正内容",
  "",
  `- 合并PE/PA卡片数量：${mergedTypeCount}`,
  `- 删除G系列错误精度数量：${removedGPrecisionCount}`,
  "",
  "## 过滤器类型",
  "",
  ...filterTypeValues.map(
    (value) =>
      `- ${value}`
  ),
  "",
  "## 过滤精度",
  "",
  ...precisionValues.map(
    (value) =>
      `- ${value}`
  ),
  "",
];

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
  report.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "目录字段最终修正完成"
);
console.log(
  "============================================"
);
console.log(
  "合并PE/PA卡片：",
  mergedTypeCount
);
console.log(
  "删除G系列错误精度：",
  removedGPrecisionCount
);
console.log(
  "过滤器类型：",
  filterTypeValues.join("、")
);
console.log(
  "过滤精度：",
  precisionValues.join("、")
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
