const fs = require("fs");
const path = require("path");

const root = process.cwd();

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const panelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const cssPath = path.join(
  root,
  "app",
  "products",
  "products.css"
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `找不到文件：${filePath}`
    );
  }
}

function readText(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .replace(/\r\n/g, "\n");
}

function writeText(filePath, content) {
  fs.writeFileSync(
    filePath,
    content.replace(/\r?\n/g, "\n"),
    "utf8"
  );
}

function backup(filePath) {
  const backupPath =
    `${filePath}.bak_barbed_final_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    `已备份：${path.relative(root, backupPath)}`
  );
}

assertFile(clientPath);
assertFile(panelPath);
assertFile(cssPath);

/* =========================================================
   1. ProductSelectionClient
   建立接管内径1 → 2 → 3联动判断
========================================================= */

let clientContent =
  readText(clientPath);

/*
 * 清理之前失败脚本留下的旧判断块和旧参数。
 */
clientContent = clientContent.replace(
  /\n?\s*\/\* BARBED_PORT_OPTION_DISABLED_START \*\/[\s\S]*?\/\* BARBED_PORT_OPTION_DISABLED_END \*\/\s*/g,
  "\n\n"
);

clientContent = clientContent.replace(
  /^\s*isOptionDisabled=\{[^}]+\}\s*$/gm,
  ""
);

/*
 * 不依赖固定缩进，直接定位函数名。
 */
const activeFunctionPattern =
  /^(\s*)function\s+isFilterOptionActive\s*\(/m;

const activeFunctionMatch =
  clientContent.match(
    activeFunctionPattern
  );

if (!activeFunctionMatch) {
  throw new Error(
    "仍未找到 isFilterOptionActive，请检查 ProductSelectionClient.tsx 是否存在该函数"
  );
}

const functionIndent =
  activeFunctionMatch[1];

const linkageFunction = `${functionIndent}/* BARBED_PORT_OPTION_DISABLED_START */

${functionIndent}function isBarbedPortOptionDisabled(
${functionIndent}  group: ProductSelectionFilterGroup,
${functionIndent}  value: string
${functionIndent}) {
${functionIndent}  if (
${functionIndent}    activeProductTypeId !==
${functionIndent}    "barbed-fittings"
${functionIndent}  ) {
${functionIndent}    return false;
${functionIndent}  }

${functionIndent}  if (
${functionIndent}    group.key !== "filter02" &&
${functionIndent}    group.key !== "filter03" &&
${functionIndent}    group.key !== "filter04"
${functionIndent}  ) {
${functionIndent}    return false;
${functionIndent}  }

${functionIndent}  const candidateKey =
${functionIndent}    group.key as SelectionFilterKey;

${functionIndent}  /*
${functionIndent}   * 当前已经选中的值不能禁用，
${functionIndent}   * 保留再次点击取消的能力。
${functionIndent}   */
${functionIndent}  if (
${functionIndent}    selectedFilters[
${functionIndent}      candidateKey
${functionIndent}    ]?.has(value)
${functionIndent}  ) {
${functionIndent}    return false;
${functionIndent}  }

${functionIndent}  /*
${functionIndent}   * 顺序联动：
${functionIndent}   *
${functionIndent}   * 内径1不受内径2、3反向影响；
${functionIndent}   * 内径2受内径1影响；
${functionIndent}   * 内径3受内径1、2影响。
${functionIndent}   */
${functionIndent}  const dependencyMap: Record<
${functionIndent}    "filter02" |
${functionIndent}    "filter03" |
${functionIndent}    "filter04",
${functionIndent}    SelectionFilterKey[]
${functionIndent}  > = {
${functionIndent}    filter02: [
${functionIndent}      "filter01",
${functionIndent}      "filter05",
${functionIndent}      "filter06",
${functionIndent}    ],

${functionIndent}    filter03: [
${functionIndent}      "filter01",
${functionIndent}      "filter02",
${functionIndent}      "filter05",
${functionIndent}      "filter06",
${functionIndent}    ],

${functionIndent}    filter04: [
${functionIndent}      "filter01",
${functionIndent}      "filter02",
${functionIndent}      "filter03",
${functionIndent}      "filter05",
${functionIndent}      "filter06",
${functionIndent}    ],
${functionIndent}  };

${functionIndent}  const dependencies =
${functionIndent}    dependencyMap[
${functionIndent}      candidateKey as
${functionIndent}        | "filter02"
${functionIndent}        | "filter03"
${functionIndent}        | "filter04"
${functionIndent}    ];

${functionIndent}  const hasMatchingProduct =
${functionIndent}    currentTypeProducts.some(
${functionIndent}      (product) => {
${functionIndent}        const candidateValues =
${functionIndent}          splitFilterValues(
${functionIndent}            (product.filters || {})[
${functionIndent}              candidateKey
${functionIndent}            ]
${functionIndent}          );

${functionIndent}        if (
${functionIndent}          !candidateValues.includes(
${functionIndent}            value
${functionIndent}          )
${functionIndent}        ) {
${functionIndent}          return false;
${functionIndent}        }

${functionIndent}        return dependencies.every(
${functionIndent}          (dependencyKey) => {
${functionIndent}            const selectedValues =
${functionIndent}              selectedFilters[
${functionIndent}                dependencyKey
${functionIndent}              ];

${functionIndent}            if (
${functionIndent}              !selectedValues ||
${functionIndent}              selectedValues.size === 0
${functionIndent}            ) {
${functionIndent}              return true;
${functionIndent}            }

${functionIndent}            const productValues =
${functionIndent}              splitFilterValues(
${functionIndent}                (product.filters || {})[
${functionIndent}                  dependencyKey
${functionIndent}                ]
${functionIndent}              );

${functionIndent}            return productValues.some(
${functionIndent}              (productValue) =>
${functionIndent}                selectedValues.has(
${functionIndent}                  productValue
${functionIndent}                )
${functionIndent}            );
${functionIndent}          }
${functionIndent}        );
${functionIndent}      }
${functionIndent}    );

${functionIndent}  return !hasMatchingProduct;
${functionIndent}}

${functionIndent}/* BARBED_PORT_OPTION_DISABLED_END */

`;

clientContent =
  clientContent.replace(
    activeFunctionPattern,
    `${linkageFunction}${functionIndent}function isFilterOptionActive(`
  );

/*
 * 向 ProductFilterPanel 传递判断函数。
 */
const panelPropPattern =
  /^(\s*)isOptionActive=\{isFilterOptionActive\}\s*$/m;

const panelPropMatch =
  clientContent.match(
    panelPropPattern
  );

if (!panelPropMatch) {
  throw new Error(
    "没有找到 ProductFilterPanel 的 isOptionActive 参数"
  );
}

const propIndent =
  panelPropMatch[1];

clientContent =
  clientContent.replace(
    panelPropPattern,
    `${propIndent}isOptionActive={isFilterOptionActive}
${propIndent}isOptionDisabled={isBarbedPortOptionDisabled}`
  );

backup(clientPath);
writeText(
  clientPath,
  clientContent
);

console.log(
  "已建立接管内径顺序联动"
);

/* =========================================================
   2. ProductFilterPanel
   重写接管内径显示结构
========================================================= */

let panelContent =
  readText(panelPath);

/*
 * 清理旧调用参数，避免重复。
 */
panelContent = panelContent.replace(
  /^\s*isOptionDisabled=\{[^}]+\}\s*$/gm,
  ""
);

/*
 * Props 中不存在时，插入 isOptionDisabled。
 */
if (
  !panelContent.includes(
    "isOptionDisabled?:"
  )
) {
  const onFilterChangeTypePattern =
    /^(\s*)onFilterChange:\s*\(/m;

  const typeMatch =
    panelContent.match(
      onFilterChangeTypePattern
    );

  if (!typeMatch) {
    throw new Error(
      "没有找到 ProductFilterPanelProps 的 onFilterChange"
    );
  }

  const indent =
    typeMatch[1];

  const disabledType = `${indent}isOptionDisabled?: (
${indent}  group: ProductSelectionFilterGroup,
${indent}  value: string
${indent}) => boolean;

`;

  panelContent =
    panelContent.replace(
      onFilterChangeTypePattern,
      `${disabledType}${indent}onFilterChange: (`
    );
}

/*
 * 只修改主组件的参数解构。
 */
const exportIndex =
  panelContent.indexOf(
    "export default function ProductFilterPanel"
  );

if (exportIndex < 0) {
  throw new Error(
    "没有找到 ProductFilterPanel 主组件"
  );
}

const beforeExport =
  panelContent.slice(
    0,
    exportIndex
  );

let afterExport =
  panelContent.slice(
    exportIndex
  );

if (
  !afterExport.match(
    /^\s*isOptionDisabled,\s*$/m
  )
) {
  const destructurePattern =
    /^(\s*)isOptionActive,\s*$/m;

  const destructureMatch =
    afterExport.match(
      destructurePattern
    );

  if (!destructureMatch) {
    throw new Error(
      "没有找到主组件的 isOptionActive 参数"
    );
  }

  const indent =
    destructureMatch[1];

  afterExport =
    afterExport.replace(
      destructurePattern,
      `${indent}isOptionActive,
${indent}isOptionDisabled,`
    );
}

panelContent =
  beforeExport +
  afterExport;

const componentPattern =
  /\/\* BARBED_PORT_FILTER_GROUP_START \*\/[\s\S]*?\/\* BARBED_PORT_FILTER_GROUP_END \*\//;

if (
  !componentPattern.test(
    panelContent
  )
) {
  throw new Error(
    "没有找到 BARBED_PORT_FILTER_GROUP 组件块"
  );
}

const newComponent = `/* BARBED_PORT_FILTER_GROUP_START */

const BARBED_PORT_FILTER_KEYS = [
  "filter02",
  "filter03",
  "filter04",
] as const;

const BARBED_PORT_SIZE_OPTIONS = [
  "1.6 mm",
  "2.4 mm",
  "3.2 mm",
  "4.0 mm",
  "4.8 mm",
  "6.4 mm",
  "7.9 mm",
  "9.5 mm",
  "12.7 mm",
  "16.0 mm",
];

function getBarbedPortCount(
  structure: string
) {
  const portCountMap: Record<
    string,
    number
  > = {
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
  isOptionDisabled,
  onFilterChange,
}: {
  filterGroups:
    ProductSelectionFilterGroup[];

  isOptionActive: (
    group:
      ProductSelectionFilterGroup,
    value: string
  ) => boolean;

  isOptionDisabled?: (
    group:
      ProductSelectionFilterGroup,
    value: string
  ) => boolean;

  onFilterChange: (
    group:
      ProductSelectionFilterGroup,
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
      <div className="barbed-port-heading-grid">
        <div>接管内径1</div>
        <div>接管内径2</div>
        <div>接管内径3</div>
      </div>

      <div className="barbed-port-columns">
        {BARBED_PORT_FILTER_KEYS.map(
          (filterKey, index) => {
            const portNumber =
              index + 1;

            const group =
              filterGroups.find(
                (item) =>
                  item.key === filterKey
              ) ??
              ({
                key: filterKey,
                title:
                  \`接管内径\${portNumber}\`,
                inputType: "single",
                options: [],
              } as ProductSelectionFilterGroup);

            const portDisabled =
              portNumber >
              enabledPortCount;

            return (
              <div
                className={
                  portDisabled
                    ? "barbed-port-column is-disabled"
                    : "barbed-port-column"
                }
                key={filterKey}
              >
                <div className="barbed-port-options">
                  {BARBED_PORT_SIZE_OPTIONS.map(
                    (value) => {
                      const active =
                        isOptionActive(
                          group,
                          value
                        );

                      const disabled =
                        !active &&
                        (
                          portDisabled ||
                          Boolean(
                            isOptionDisabled?.(
                              group,
                              value
                            )
                          )
                        );

                      return (
                        <button
                          className={
                            [
                              "filter-option",
                              "is-single",
                              "barbed-port-option",
                              active
                                ? "active"
                                : "",
                              disabled
                                ? "is-disabled"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")
                          }
                          type="button"
                          key={value}
                          disabled={disabled}
                          aria-disabled={disabled}
                          onClick={() => {
                            if (disabled) {
                              return;
                            }

                            onFilterChange(
                              group,
                              value
                            );
                          }}
                        >
                          <span className="filter-check" />

                          <span className="barbed-port-option-label">
                            {value}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

/* BARBED_PORT_FILTER_GROUP_END */`;

panelContent =
  panelContent.replace(
    componentPattern,
    newComponent
  );

/*
 * 向内部组件传递 isOptionDisabled。
 */
const callPattern =
  /(<BarbedPortFilterGroup[\s\S]*?isOptionActive=\{isOptionActive\})([\s\S]*?onFilterChange=\{onFilterChange\})/;

if (!callPattern.test(panelContent)) {
  throw new Error(
    "没有找到 BarbedPortFilterGroup 调用位置"
  );
}

panelContent =
  panelContent.replace(
    callPattern,
    `$1
                isOptionDisabled={isOptionDisabled}$2`
  );

backup(panelPath);
writeText(
  panelPath,
  panelContent
);

console.log(
  "已改为接管内径1、2、3标题"
);

/* =========================================================
   3. CSS最终覆盖
========================================================= */

let cssContent =
  readText(cssPath);

cssContent = cssContent.replace(
  /\/\* BARBED_PORT_FINAL_LAYOUT_START \*\/[\s\S]*?\/\* BARBED_PORT_FINAL_LAYOUT_END \*\//g,
  ""
);

const css = `

/* BARBED_PORT_FINAL_LAYOUT_START */

/*
 * 只保留：
 * 接管内径1 / 接管内径2 / 接管内径3
 */
.products-selection-page
  .barbed-port-filter-title,
.products-selection-page
  .barbed-port-column-title {
  display: none !important;
}

.products-selection-page
  .barbed-port-heading-grid {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 14px 12px 8px;
  color: #173368;
  font-size: 13px;
  font-weight: 850;
  line-height: 1.3;
}

.products-selection-page
  .barbed-port-columns {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 0 12px 16px;
}

.products-selection-page
  .barbed-port-column,
.products-selection-page
  .barbed-port-column.is-disabled {
  min-width: 0;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

.products-selection-page
  .barbed-port-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.products-selection-page
  .barbed-port-option {
  width: 100%;
  min-width: 0;
  min-height: 40px;
  padding: 0 8px;
  justify-content: flex-start;
  gap: 7px;
}

.products-selection-page
  .barbed-port-option-label {
  overflow: visible;
  text-overflow: clip;
  white-space: nowrap;
}

/*
 * 无对应型号的内径：
 * 保留位置、灰色显示、不能点击。
 */
.products-selection-page
  .barbed-port-option.is-disabled,
.products-selection-page
  .barbed-port-option:disabled {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a8b0bc !important;
  cursor: not-allowed !important;
  opacity: 1 !important;
}

.products-selection-page
  .barbed-port-option.is-disabled
  .filter-check,
.products-selection-page
  .barbed-port-option:disabled
  .filter-check {
  border-color: #cbd2dc !important;
  background: #e6e9ed !important;
  box-shadow: none !important;
}

.products-selection-page
  .barbed-port-option.is-disabled:hover,
.products-selection-page
  .barbed-port-option:disabled:hover {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a8b0bc !important;
}

/* BARBED_PORT_FINAL_LAYOUT_END */
`;

cssContent =
  cssContent.trimEnd() +
  css +
  "\n";

backup(cssPath);
writeText(
  cssPath,
  cssContent
);

console.log(
  "已完成灰色不可选样式"
);

console.log("");
console.log(
  "===== 倒刺接头筛选修改完成 ====="
);