const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

const workbookPath = path.join(
  root,
  "data-source",
  "product-center",
  "fittings",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const outputPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "barbed-fitting-selection.generated.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "barbed-fitting-selection-report.json"
);

const selectionClientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const filterPanelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const cssPath = path.join(
  root,
  "app",
  "products",
  "products.css"
);

function assertFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`找不到${label}：${filePath}`);
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), {
    recursive: true,
  });

  fs.writeFileSync(
    filePath,
    content.replace(/\r?\n/g, "\n"),
    "utf8"
  );
}

function backup(filePath, tag) {
  const backupPath =
    `${filePath}.bak_${tag}_${stamp}`;

  fs.copyFileSync(filePath, backupPath);

  console.log(
    `已备份：${path.relative(root, backupPath)}`
  );
}

function replaceOnce(
  content,
  searchText,
  replacement,
  label
) {
  if (!content.includes(searchText)) {
    throw new Error(`没有找到修改位置：${label}`);
  }

  return content.replace(
    searchText,
    replacement
  );
}

function i18n(zh, en) {
  return {
    zh,
    en,
    es: en,
    fr: en,
    ko: en,
    ru: en,
  };
}

function text(value) {
  return String(value ?? "").trim();
}

const SERIES_MAP = {
  BA: {
    structure: "直通型",
    cardName: "直通型倒刺接头",
    en: "Straight Barbed Fitting",
    portCount: 2,
    order: 10,
  },

  BL: {
    structure: "L型",
    cardName: "L型倒刺接头",
    en: "Elbow Barbed Fitting",
    portCount: 2,
    order: 20,
  },

  BT: {
    structure: "T型",
    cardName: "T型倒刺接头",
    en: "Tee Barbed Fitting",
    portCount: 3,
    order: 30,
  },

  BY: {
    structure: "Y型",
    cardName: "Y型倒刺接头",
    en: "Y Barbed Fitting",
    portCount: 3,
    order: 40,
  },

  BF4: {
    structure: "π型",
    cardName: "π型倒刺接头",
    en: "Pi-shaped Barbed Fitting",
    portCount: 1,
    order: 50,
  },

  BX4: {
    structure: "十字型",
    cardName: "十字型倒刺接头",
    en: "Cross Barbed Fitting",
    portCount: 1,
    order: 60,
  },

  BBL: {
    structure: "倒刺堵头",
    cardName: "倒刺堵头",
    en: "Barbed Plug",
    portCount: 1,
    order: 70,
  },
};

const MATERIAL_MAP = {
  PP: "PP",
  PA: "PA",
  PV: "PVDF",
  AC: "AC",
};

const COLOR_MAP = {
  N: "本色",
  W: "白色",
};

function parseDiameterToken(token) {
  const match = text(token)
    .toUpperCase()
    .match(/^(\d+)[A-Z]*$/);

  if (!match) {
    throw new Error(
      `无法解析接管内径代码：${token}`
    );
  }

  const number = Number(match[1]);

  return `${(number / 10).toFixed(1)} mm`;
}

function parseModel(model, seriesCode) {
  const parts = model
    .toUpperCase()
    .split("-")
    .map((item) => item.trim())
    .filter(Boolean);

  const materialCode = parts.at(-2);
  const colorCode = parts.at(-1);
  const diameterTokens = parts.slice(1, -2);

  const series = SERIES_MAP[seriesCode];

  if (!series) {
    throw new Error(
      `未配置倒刺接头系列：${seriesCode}`
    );
  }

  if (diameterTokens.length === 0) {
    throw new Error(
      `型号中没有接管内径：${model}`
    );
  }

  const diameters =
    diameterTokens.map(parseDiameterToken);

  let ports;

  if (series.portCount === 1) {
    ports = [diameters[0]];
  } else if (diameters.length === 1) {
    ports = Array(series.portCount)
      .fill(diameters[0]);
  } else {
    ports = diameters;
  }

  if (
    series.portCount > 1 &&
    ports.length !== series.portCount
  ) {
    throw new Error(
      `${model}接口数量异常：期望${series.portCount}个，实际${ports.length}个`
    );
  }

  return {
    materialCode,
    colorCode,
    diameterTokens,
    ports,
  };
}

function readSourceRows() {
  const workbook = XLSX.readFile(
    workbookPath,
    {
      raw: false,
      cellDates: false,
    }
  );

  const sheet =
    workbook.Sheets["02_倒刺接头"];

  if (!sheet) {
    throw new Error(
      "表格中没有工作表：02_倒刺接头"
    );
  }

  const rows = XLSX.utils
    .sheet_to_json(sheet, {
      header: 1,
      defval: "",
      raw: false,
    })
    .slice(2)
    .filter((row) => {
      return (
        text(row[0]) === "倒刺接头" &&
        text(row[2])
      );
    });

  if (rows.length !== 166) {
    throw new Error(
      `最新版表格应有166个倒刺接头型号，当前读取到${rows.length}个。请先替换项目中的Excel。`
    );
  }

  return rows;
}

function buildData(rows) {
  const models = new Set();
  const productCodes = new Set();

  const seriesCounts = {};
  const materialCounts = {};
  const colorCounts = {};
  const diameterValues = new Set();

  const products = rows.map(
    (row, sourceIndex) => {
      const seriesCode =
        text(row[1]).toUpperCase();

      const model =
        text(row[2]).toUpperCase();

      const productCode =
        text(row[3]).replace(/\.0+$/, "");

      const series =
        SERIES_MAP[seriesCode];

      if (!series) {
        throw new Error(
          `第${sourceIndex + 3}行系列无法识别：${seriesCode}`
        );
      }

      if (models.has(model)) {
        throw new Error(
          `型号重复：${model}`
        );
      }

      if (
        productCode &&
        productCodes.has(productCode)
      ) {
        throw new Error(
          `商品编码重复：${productCode}`
        );
      }

      models.add(model);

      if (productCode) {
        productCodes.add(productCode);
      }

      const parsed =
        parseModel(model, seriesCode);

      const material =
        MATERIAL_MAP[parsed.materialCode] ||
        parsed.materialCode;

      const color =
        COLOR_MAP[parsed.colorCode] ||
        parsed.colorCode;

      const port1 =
        parsed.ports[0] || "";

      const port2 =
        parsed.ports[1] || "";

      const port3 =
        parsed.ports[2] || "";

      parsed.ports.forEach((value) => {
        diameterValues.add(value);
      });

      seriesCounts[seriesCode] =
        (seriesCounts[seriesCode] || 0) + 1;

      materialCounts[material] =
        (materialCounts[material] || 0) + 1;

      colorCounts[color] =
        (colorCounts[color] || 0) + 1;

      const allSame =
        parsed.ports.every(
          (value) =>
            value === parsed.ports[0]
        );

      const diameterSummary = allSame
        ? parsed.ports[0]
        : parsed.ports.join(" / ");

      return {
        productId:
          productCode || model,

        productCode,

        sourceType:
          "barbed-fitting-selection",

        categoryId:
          "fittings",

        categoryLabel:
          "接头系列",

        productTypeId:
          "barbed-fittings",

        productTypeName:
          "倒刺接头",

        seriesId:
          seriesCode.toLowerCase(),

        seriesCode,

        seriesName:
          series.cardName,

        model,

        cardTitle:
          i18n(model, model),

        cardSubtitle:
          i18n(
            [
              series.cardName,
              `接管内径：${diameterSummary}`,
              `${material}主体｜${color}`,
            ].join("\n"),
            [
              series.en,
              `Tube ID: ${diameterSummary}`,
              `${material} body | ${color}`,
            ].join("\n")
          ),

        filters: {
          filter01:
            series.structure,

          filter02:
            port1,

          filter03:
            port2,

          filter04:
            port3,

          filter05:
            material,

          filter06:
            color,
        },

        portCount:
          series.portCount,

        portValues:
          parsed.ports,

        materialCode:
          parsed.materialCode,

        colorCode:
          parsed.colorCode,

        imageCard:
          "/images/logo/foreach-logo-color.svg",

        detailSlug:
          "barbed-fittings",

        detailHref:
          "/products/fittings/barbed-fittings",

        status:
          "active",

        sourceIndex,

        sortOrder:
          series.order * 1000 +
          sourceIndex,

        searchKeywords:
          i18n(
            [
              "倒刺接头",
              series.cardName,
              seriesCode,
              model,
              productCode,
              ...parsed.ports,
              material,
              color,
            ]
              .filter(Boolean)
              .join(" "),
            [
              "barbed fitting",
              series.en,
              seriesCode,
              model,
              productCode,
              ...parsed.ports,
              material,
              color,
            ]
              .filter(Boolean)
              .join(" ")
          ),
      };
    }
  );

  products.sort((current, next) => {
    return (
      current.sortOrder -
      next.sortOrder
    );
  });

  const taxonomy = [
    {
      type: "productType",
      id: "barbed-fittings",
      label: i18n(
        "倒刺接头",
        "Barbed Fittings"
      ),
      sortOrder: 402,
    },
  ];

  const filterLabels = [
    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter01",
      label: i18n(
        "产品结构",
        "Structure"
      ),
      inputType: "single",
      sortOrder: 10,
      visible: true,
    },

    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter02",
      label: i18n(
        "接口1内径",
        "Port 1 ID"
      ),
      inputType: "single",
      sortOrder: 20,
      visible: true,
    },

    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter03",
      label: i18n(
        "接口2内径",
        "Port 2 ID"
      ),
      inputType: "single",
      sortOrder: 30,
      visible: true,
    },

    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter04",
      label: i18n(
        "接口3内径",
        "Port 3 ID"
      ),
      inputType: "single",
      sortOrder: 40,
      visible: true,
    },

    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter05",
      label: i18n(
        "主体材质",
        "Body Material"
      ),
      inputType: "multiple",
      sortOrder: 50,
      visible: true,
    },

    {
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      filterKey: "filter06",
      label: i18n(
        "颜色",
        "Color"
      ),
      inputType: "multiple",
      sortOrder: 60,
      visible: true,
    },
  ];

  return {
    products,
    taxonomy,
    filterLabels,

    report: {
      generatedAt:
        new Date().toISOString(),

      sourceWorkbook:
        path.relative(root, workbookPath),

      worksheet:
        "02_倒刺接头",

      total:
        products.length,

      seriesCounts,
      materialCounts,
      colorCounts,

      diameterValues:
        Array.from(diameterValues)
          .sort((current, next) => {
            return (
              Number.parseFloat(current) -
              Number.parseFloat(next)
            );
          }),
    },
  };
}

function writeGeneratedData(data) {
  const content = `/* =========================================================
   barbed-fitting-selection.generated.ts
   来源：02_倒刺接头
   数量：${data.products.length}
   ========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
  ProductSelectionTaxonomyItem,
} from "./product-selection.types";

export const barbedFittingSelectionProducts =
${JSON.stringify(data.products, null, 2)} as ProductSelectionProduct[];

export const barbedFittingTaxonomyItems =
${JSON.stringify(data.taxonomy, null, 2)} as ProductSelectionTaxonomyItem[];

export const barbedFittingFilterLabels =
${JSON.stringify(data.filterLabels, null, 2)} as ProductSelectionFilterLabel[];
`;

  writeText(outputPath, content);

  writeText(
    reportPath,
    JSON.stringify(
      data.report,
      null,
      2
    ) + "\n"
  );

  console.log(
    `已生成：${path.relative(root, outputPath)}`
  );
}

function patchSelectionClient() {
  let content =
    readText(selectionClientPath);

  let changed = false;

  if (
    !content.includes(
      "barbed-fitting-selection.generated"
    )
  ) {
    const anchor =
      '} from "@/data/products/selection/hard-tube-fitting-selection.generated";';

    content = replaceOnce(
      content,
      anchor,
      `${anchor}
import {
  barbedFittingFilterLabels,
  barbedFittingSelectionProducts,
  barbedFittingTaxonomyItems,
} from "@/data/products/selection/barbed-fitting-selection.generated";`,
      "倒刺接头数据导入"
    );

    changed = true;
  }

  if (
    !content.includes(
      "...barbedFittingSelectionProducts,"
    )
  ) {
    const anchor =
      "  ...hardTubeFittingSelectionProducts,";

    content = replaceOnce(
      content,
      anchor,
      `${anchor}
  ...barbedFittingSelectionProducts,`,
      "倒刺接头产品数据合并"
    );

    changed = true;
  }

  if (
    !content.includes(
      "...barbedFittingTaxonomyItems,"
    )
  ) {
    const anchor =
      "  ...hardTubeFittingTaxonomyItems,";

    content = replaceOnce(
      content,
      anchor,
      `${anchor}
  ...barbedFittingTaxonomyItems,`,
      "倒刺接头分类数据合并"
    );

    changed = true;
  }

  if (
    !content.includes(
      "...barbedFittingFilterLabels,"
    )
  ) {
    const anchor =
      "  ...hardTubeFittingFilterLabels,";

    content = replaceOnce(
      content,
      anchor,
      `${anchor}
  ...barbedFittingFilterLabels,`,
      "倒刺接头筛选标签合并"
    );

    changed = true;
  }

  if (
    !content.includes(
      "activeProductTypeId={activeProductTypeId}"
    )
  ) {
    const anchor =
      "              filterGroups={filterGroups}";

    content = replaceOnce(
      content,
      anchor,
      `              activeProductTypeId={activeProductTypeId}
${anchor}`,
      "筛选面板当前产品类型"
    );

    changed = true;
  }

  if (changed) {
    backup(
      selectionClientPath,
      "barbed_selection"
    );

    writeText(
      selectionClientPath,
      content
    );
  }

  console.log(
    "ProductSelectionClient 接入完成"
  );
}

function patchFilterPanel() {
  let content =
    readText(filterPanelPath);

  let changed = false;

  if (
    !content.includes(
      "activeProductTypeId?: string;"
    )
  ) {
    content = replaceOnce(
      content,
      "  activeCategory: ProductSelectionCategoryItem;\n  filterGroups:",
      "  activeCategory: ProductSelectionCategoryItem;\n  activeProductTypeId?: string;\n  filterGroups:",
      "ProductFilterPanel类型"
    );

    changed = true;
  }

  if (
    !content.includes(
      "  activeCategory,\n  activeProductTypeId,\n  filterGroups,"
    )
  ) {
    content = replaceOnce(
      content,
      "  activeCategory,\n  filterGroups,",
      "  activeCategory,\n  activeProductTypeId,\n  filterGroups,",
      "ProductFilterPanel参数"
    );

    changed = true;
  }

  if (
    !content.includes(
      "BARBED_PORT_FILTER_GROUP_START"
    )
  ) {
    const helper = `
/* BARBED_PORT_FILTER_GROUP_START */

const BARBED_PORT_FILTER_KEYS = [
  "filter02",
  "filter03",
  "filter04",
] as const;

function getBarbedPortCount(
  structure: string
) {
  const portCountMap: Record<string, number> = {
    "直通型": 2,
    "L型": 2,
    "T型": 3,
    "Y型": 3,
    "π型": 1,
    "十字型": 1,
    "倒刺堵头": 1,
  };

  return portCountMap[structure] || 3;
}

function BarbedPortFilterGroup({
  filterGroups,
  isOptionActive,
  onFilterChange,
}: {
  filterGroups: ProductSelectionFilterGroup[];
  isOptionActive: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;
  onFilterChange: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => void;
}) {
  const structureGroup =
    filterGroups.find(
      (group) =>
        group.key === "filter01"
    );

  const activeStructure =
    structureGroup?.options.find(
      (option) =>
        isOptionActive(
          structureGroup,
          option.value
        )
    )?.value || "";

  const enabledPortCount =
    getBarbedPortCount(
      activeStructure
    );

  return (
    <section
      className="filter-group barbed-port-filter-group is-mobile-open"
      data-barbed-port-filter="true"
    >
      <div className="filter-group-trigger barbed-port-filter-title">
        <span>接管内径</span>
      </div>

      <div className="barbed-port-grid">
        {BARBED_PORT_FILTER_KEYS.map(
          (filterKey, index) => {
            const group =
              filterGroups.find(
                (item) =>
                  item.key === filterKey
              );

            const activeValue =
              group?.options.find(
                (option) =>
                  isOptionActive(
                    group,
                    option.value
                  )
              )?.value || "";

            const disabled =
              index + 1 >
                enabledPortCount ||
              !group;

            const options = [
              ...(group?.options || []),
            ].sort(
              (current, next) => {
                return (
                  Number.parseFloat(
                    current.value
                  ) -
                  Number.parseFloat(
                    next.value
                  )
                );
              }
            );

            return (
              <label
                className={
                  disabled
                    ? "barbed-port-field is-disabled"
                    : "barbed-port-field"
                }
                key={filterKey}
              >
                <span>
                  接口{index + 1}
                </span>

                <select
                  value={
                    disabled
                      ? ""
                      : activeValue
                  }
                  disabled={disabled}
                  aria-label={
                    \`接口\${index + 1}内径\`
                  }
                  onChange={(event) => {
                    if (
                      disabled ||
                      !group
                    ) {
                      return;
                    }

                    const nextValue =
                      event.target.value;

                    if (!nextValue) {
                      if (activeValue) {
                        onFilterChange(
                          group,
                          activeValue
                        );
                      }

                      return;
                    }

                    if (
                      nextValue ===
                      activeValue
                    ) {
                      return;
                    }

                    onFilterChange(
                      group,
                      nextValue
                    );
                  }}
                >
                  <option value="">
                    {disabled
                      ? "不适用"
                      : "不限"}
                  </option>

                  {options.map(
                    (option) => (
                      <option
                        value={
                          option.value
                        }
                        key={
                          option.value
                        }
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </label>
            );
          }
        )}
      </div>
    </section>
  );
}

/* BARBED_PORT_FILTER_GROUP_END */


`;

    content = replaceOnce(
      content,
      "export default function ProductFilterPanel",
      `${helper}export default function ProductFilterPanel`,
      "倒刺接头三接口组件"
    );

    changed = true;
  }

  if (
    !content.includes(
      'data-barbed-filter-group="ports"'
    )
  ) {
    const anchor =
      `        filterGroups.map((group) => {
          const isProductTypeGroup =`;

    const replacement =
      `        filterGroups.map((group) => {
          if (
            activeProductTypeId === "barbed-fittings" &&
            group.key === "filter02"
          ) {
            return (
              <div
                data-barbed-filter-group="ports"
                key="barbed-port-filter-group"
              >
                <BarbedPortFilterGroup
                  filterGroups={filterGroups}
                  isOptionActive={isOptionActive}
                  onFilterChange={onFilterChange}
                />
              </div>
            );
          }

          if (
            activeProductTypeId === "barbed-fittings" &&
            (
              group.key === "filter03" ||
              group.key === "filter04"
            )
          ) {
            return null;
          }

          const isProductTypeGroup =`;

    content = replaceOnce(
      content,
      anchor,
      replacement,
      "倒刺接头接口筛选渲染"
    );

    changed = true;
  }

  if (
    !content.includes(
      'activeProductTypeId === "barbed-fittings" &&\n              (\n                group.key === "filter01"'
    )
  ) {
    const anchor =
      `          const shouldUseTwoColumns =
            group.key === "productType" ||`;

    const replacement =
      `          const shouldUseTwoColumns =
            (
              activeProductTypeId === "barbed-fittings" &&
              (
                group.key === "filter01" ||
                group.key === "filter05" ||
                group.key === "filter06"
              )
            ) ||
            group.key === "productType" ||`;

    content = replaceOnce(
      content,
      anchor,
      replacement,
      "倒刺接头其他筛选两列布局"
    );

    changed = true;
  }

  if (changed) {
    backup(
      filterPanelPath,
      "barbed_selection"
    );

    writeText(
      filterPanelPath,
      content
    );
  }

  console.log(
    "ProductFilterPanel 修改完成"
  );
}

function patchRouteMap() {
  let content =
    readText(routeMapPath);

  if (
    content.includes(
      '"barbed-fittings": {'
    )
  ) {
    console.log(
      "倒刺接头正式路由已存在"
    );

    return;
  }

  const newEntry = `    "barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头可根据产品结构、三个接口的接管内径、主体材质和颜色进行选型。",
    },

`;

  const oldStart =
    content.indexOf(
      '    "soft-tube-fittings": {'
    );

  const nextStart =
    content.indexOf(
      '    "luer-fittings": {',
      oldStart
    );

  if (
    oldStart >= 0 &&
    nextStart > oldStart
  ) {
    content =
      content.slice(0, oldStart) +
      newEntry +
      content.slice(nextStart);
  } else {
    const anchor =
      '    "luer-fittings": {';

    content = replaceOnce(
      content,
      anchor,
      `${newEntry}${anchor}`,
      "倒刺接头正式路由"
    );
  }

  backup(
    routeMapPath,
    "barbed_selection"
  );

  writeText(
    routeMapPath,
    content
  );

  console.log(
    "倒刺接头正式路由修改完成"
  );
}

function patchCss() {
  let content =
    readText(cssPath);

  if (
    content.includes(
      "BARBED_FITTING_FILTER_LAYOUT_START"
    )
  ) {
    console.log(
      "倒刺接头筛选样式已存在"
    );

    return;
  }

  const css = `

/* BARBED_FITTING_FILTER_LAYOUT_START */

/*
 * 倒刺接头：
 * 接口1、接口2、接口3固定一排。
 * 产品结构、主体材质、颜色继续每排两个。
 */
.products-selection-page .barbed-port-filter-title {
  cursor: default;
}

.products-selection-page .barbed-port-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 6px;
  padding: 0 10px 16px;
}

.products-selection-page .barbed-port-field {
  min-width: 0;
  display: grid;
  gap: 5px;
}

.products-selection-page .barbed-port-field > span {
  color: rgba(23, 51, 104, 0.72);
  font-size: 11px;
  font-weight: 760;
  line-height: 1.2;
  white-space: nowrap;
}

.products-selection-page .barbed-port-field select {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 6px;
  border: 1px solid
    rgba(23, 51, 104, 0.18);
  border-radius: 6px;
  outline: none;
  background: #f6f9fc;
  color: #173368;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 760;
}

.products-selection-page
  .barbed-port-field select:hover,
.products-selection-page
  .barbed-port-field select:focus {
  border-color: #09e9b4;
  background: #ffffff;
}

.products-selection-page
  .barbed-port-field.is-disabled > span {
  color: #9aa5b5;
}

.products-selection-page
  .barbed-port-field select:disabled {
  color: #9aa5b5;
  cursor: not-allowed;
  background: #f1f3f6;
  border-color: #e2e7ed;
}

.products-selection-page
  .product-card-summary {
  white-space: pre-line;
}

/* BARBED_FITTING_FILTER_LAYOUT_END */
`;

  backup(
    cssPath,
    "barbed_selection"
  );

  writeText(
    cssPath,
    content + css
  );

  console.log(
    "倒刺接头筛选样式修改完成"
  );
}

assertFile(
  workbookPath,
  "连接件权威表格"
);

assertFile(
  selectionClientPath,
  "ProductSelectionClient"
);

assertFile(
  filterPanelPath,
  "ProductFilterPanel"
);

assertFile(
  routeMapPath,
  "产品路由映射"
);

assertFile(
  cssPath,
  "产品中心CSS"
);

const sourceRows =
  readSourceRows();

const generatedData =
  buildData(sourceRows);

writeGeneratedData(
  generatedData
);

patchSelectionClient();
patchFilterPanel();
patchRouteMap();
patchCss();

console.log("");
console.log(
  "===== 倒刺接头筛选页面完成 ====="
);

console.log(
  `产品总数：${generatedData.report.total}`
);

console.log(
  "系列统计：",
  generatedData.report.seriesCounts
);

console.log(
  "主体材质：",
  generatedData.report.materialCounts
);

console.log(
  "颜色：",
  generatedData.report.colorCounts
);

console.log(
  "接管内径：",
  generatedData.report.diameterValues.join(" / ")
);

console.log("");
console.log(
  "页面地址：/products/fittings/barbed-fittings"
);

console.log(
  "本次未处理图片和详情页。"
);