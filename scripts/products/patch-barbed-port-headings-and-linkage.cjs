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
    throw new Error(`找不到文件：${filePath}`);
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
    `${filePath}.bak_barbed_linkage_${stamp}`;

  fs.copyFileSync(filePath, backupPath);

  console.log(
    `已备份：${path.relative(root, backupPath)}`
  );
}

assertFile(clientPath);
assertFile(panelPath);
assertFile(cssPath);

/* =========================================================
   1. ProductSelectionClient
   增加接管内径1 → 2 → 3的可选状态判断
========================================================= */

let clientContent = readText(clientPath);

/*
 * 清理前几次失败脚本可能遗留的旧代码。
 */
clientContent = clientContent.replace(
  /\n?\s*\/\* BARBED_PORT_OPTION_DISABLED_START \*\/[\s\S]*?\/\* BARBED_PORT_OPTION_DISABLED_END \*\/\s*/g,
  "\n\n"
);

clientContent = clientContent.replace(
  /^\s*isOptionDisabled=\{[^}]+\}\s*$/gm,
  ""
);

const activeFunctionAnchor =
  "  function isFilterOptionActive(";

if (!clientContent.includes(activeFunctionAnchor)) {
  throw new Error(
    "ProductSelectionClient 中没有找到 isFilterOptionActive"
  );
}

const linkageFunction = `  /* BARBED_PORT_OPTION_DISABLED_START */

  function isBarbedPortOptionDisabled(
    group: ProductSelectionFilterGroup,
    value: string
  ) {
    if (
      activeProductTypeId !==
      "barbed-fittings"
    ) {
      return false;
    }

    if (
      group.key !== "filter02" &&
      group.key !== "filter03" &&
      group.key !== "filter04"
    ) {
      return false;
    }

    const candidateKey =
      group.key as SelectionFilterKey;

    /*
     * 接管内径按顺序联动：
     *
     * 接管内径1：
     * 只受产品结构、材质和颜色影响。
     *
     * 接管内径2：
     * 受产品结构、接管内径1、材质和颜色影响。
     *
     * 接管内径3：
     * 受产品结构、接管内径1、接管内径2、
     * 材质和颜色影响。
     *
     * 这样后面的选择不会反向限制前面的接管。
     */
    const dependencyMap: Record<
      "filter02" | "filter03" | "filter04",
      SelectionFilterKey[]
    > = {
      filter02: [
        "filter01",
        "filter05",
        "filter06",
      ],

      filter03: [
        "filter01",
        "filter02",
        "filter05",
        "filter06",
      ],

      filter04: [
        "filter01",
        "filter02",
        "filter03",
        "filter05",
        "filter06",
      ],
    };

    const dependencyKeys =
      dependencyMap[
        candidateKey as
          | "filter02"
          | "filter03"
          | "filter04"
      ];

    const hasMatchingProduct =
      currentTypeProducts.some(
        (product) => {
          const candidateValues =
            splitFilterValues(
              (product.filters || {})[
                candidateKey
              ]
            );

          if (
            !candidateValues.includes(
              value
            )
          ) {
            return false;
          }

          return dependencyKeys.every(
            (dependencyKey) => {
              const selectedValues =
                selectedFilters[
                  dependencyKey
                ];

              if (
                !selectedValues ||
                selectedValues.size === 0
              ) {
                return true;
              }

              const productValues =
                splitFilterValues(
                  (product.filters || {})[
                    dependencyKey
                  ]
                );

              return productValues.some(
                (productValue) =>
                  selectedValues.has(
                    productValue
                  )
              );
            }
          );
        }
      );

    return !hasMatchingProduct;
  }

  /* BARBED_PORT_OPTION_DISABLED_END */

`;

clientContent = clientContent.replace(
  activeFunctionAnchor,
  linkageFunction +
    activeFunctionAnchor
);

/*
 * 清理可能重复的参数后，重新添加一次。
 */
clientContent = clientContent.replace(
  /^\s*isOptionDisabled=\{[^}]+\}\s*$/gm,
  ""
);

const panelPropAnchor =
  "              isOptionActive={isFilterOptionActive}";

if (!clientContent.includes(panelPropAnchor)) {
  throw new Error(
    "ProductSelectionClient 中没有找到 ProductFilterPanel 参数位置"
  );
}

clientContent = clientContent.replace(
  panelPropAnchor,
  `${panelPropAnchor}
              isOptionDisabled={isBarbedPortOptionDisabled}`
);

backup(clientPath);
writeText(clientPath, clientContent);

console.log(
  "已增加接管内径1 → 2 → 3联动判断"
);

/* =========================================================
   2. ProductFilterPanel
   修改标题并固定显示灰色不可选项
========================================================= */

let panelContent = readText(panelPath);

/*
 * 清理旧的 isOptionDisabled 类型声明、解构和参数。
 */
panelContent = panelContent.replace(
  /\n\s*isOptionDisabled\?:\s*\([\s\S]*?\)\s*=>\s*boolean;\s*/g,
  "\n"
);

panelContent = panelContent.replace(
  /^\s*isOptionDisabled,\s*$/gm,
  ""
);

panelContent = panelContent.replace(
  /^\s*isOptionDisabled=\{[^}]+\}\s*$/gm,
  ""
);

/*
 * 给 ProductFilterPanelProps 增加正式属性。
 */
const propsAnchor = `  isOptionActive: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;`;

if (!panelContent.includes(propsAnchor)) {
  throw new Error(
    "ProductFilterPanel 中没有找到 isOptionActive 类型位置"
  );
}

panelContent = panelContent.replace(
  propsAnchor,
  `${propsAnchor}

  isOptionDisabled?: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;`
);

/*
 * 只在 export default 组件参数中增加解构，
 * 避免改到内部组件。
 */
const exportIndex = panelContent.indexOf(
  "export default function ProductFilterPanel"
);

if (exportIndex < 0) {
  throw new Error(
    "没有找到 ProductFilterPanel 主组件"
  );
}

const panelBeforeExport =
  panelContent.slice(0, exportIndex);

let panelAfterExport =
  panelContent.slice(exportIndex);

const destructureAnchor = `  isOptionActive,
  onFilterChange,`;

if (!panelAfterExport.includes(destructureAnchor)) {
  throw new Error(
    "没有找到 ProductFilterPanel 参数解构位置"
  );
}

panelAfterExport = panelAfterExport.replace(
  destructureAnchor,
  `  isOptionActive,
  isOptionDisabled,
  onFilterChange,`
);

panelContent =
  panelBeforeExport +
  panelAfterExport;

/*
 * 完整替换倒刺接头接管筛选组件。
 */
const componentPattern =
  /\/\* BARBED_PORT_FILTER_GROUP_START \*\/[\s\S]*?\/\* BARBED_PORT_FILTER_GROUP_END \*\//;

if (!componentPattern.test(panelContent)) {
  throw new Error(
    "没有找到 BARBED_PORT_FILTER_GROUP 代码块"
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

  /*
   * 未选产品结构时，
   * 三个接管先全部显示。
   */
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

  /*
   * 当前选择变得无效时自动取消：
   * 例如先选接管内径2，再修改接管内径1，
   * 导致原接管内径2不再有对应型号。
   */
  useEffect(() => {
    BARBED_PORT_FILTER_KEYS.forEach(
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

        const activeValue =
          BARBED_PORT_SIZE_OPTIONS.find(
            (value) =>
              isOptionActive(
                group,
                value
              )
          );

        if (!activeValue) {
          return;
        }

        const portDisabled =
          portNumber >
          enabledPortCount;

        const valueDisabled =
          Boolean(
            isOptionDisabled?.(
              group,
              activeValue
            )
          );

        if (
          portDisabled ||
          valueDisabled
        ) {
          onFilterChange(
            group,
            activeValue
          );
        }
      }
    );
  }, [
    enabledPortCount,
    filterGroups,
    isOptionActive,
    isOptionDisabled,
    onFilterChange,
  ]);

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

panelContent = panelContent.replace(
  componentPattern,
  newComponent
);

/*
 * 给内部 BarbedPortFilterGroup 传递判断函数。
 */
const barbedCallPattern =
  /(<BarbedPortFilterGroup[\s\S]*?isOptionActive=\{isOptionActive\})([\s\S]*?onFilterChange=\{onFilterChange\})/;

if (!barbedCallPattern.test(panelContent)) {
  throw new Error(
    "没有找到 BarbedPortFilterGroup 调用位置"
  );
}

panelContent = panelContent.replace(
  barbedCallPattern,
  `$1
                isOptionDisabled={isOptionDisabled}$2`
);

backup(panelPath);
writeText(panelPath, panelContent);

console.log(
  "已修改为接管内径1 / 2 / 3标题"
);

/* =========================================================
   3. CSS
   删除旧标题行，增加灰色禁用状态
========================================================= */

let cssContent = readText(cssPath);

const cssPattern =
  /\/\* BARBED_PORT_HEADING_LINKAGE_START \*\/[\s\S]*?\/\* BARBED_PORT_HEADING_LINKAGE_END \*\//g;

cssContent = cssContent.replace(
  cssPattern,
  ""
);

const css = `

/* BARBED_PORT_HEADING_LINKAGE_START */

/*
 * 三个标题与下面三列严格对齐。
 */
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

/*
 * 不再显示旧的：
 * 接管内径
 * 接管1 / 接管2 / 接管3
 */
.products-selection-page
  .barbed-port-filter-title,
.products-selection-page
  .barbed-port-column-title {
  display: none !important;
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
 * 当前组合不存在的内径：
 * 保留位置、变灰、不能点击。
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

/* BARBED_PORT_HEADING_LINKAGE_END */
`;

cssContent =
  cssContent.trimEnd() +
  css +
  "\n";

backup(cssPath);
writeText(cssPath, cssContent);

console.log(
  "已增加三列标题及灰色不可选样式"
);

console.log("");
console.log("===== 修改完成 =====");