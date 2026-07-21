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
  return fs.readFileSync(
    filePath,
    "utf8"
  );
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
    `${filePath}.bak_barbed_disabled_${stamp}`;

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
   计算当前组合下哪些接管内径不可选
========================================================= */

let clientContent =
  readText(clientPath);

if (
  !clientContent.includes(
    "BARBED_PORT_OPTION_DISABLED_START"
  )
) {
  const anchor =
    "  function isFilterOptionActive(";

  if (!clientContent.includes(anchor)) {
    throw new Error(
      "ProductSelectionClient 中没有找到 isFilterOptionActive"
    );
  }

  const disabledFunction = `  /* BARBED_PORT_OPTION_DISABLED_START */

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

    /*
     * 当前已经选中的值始终保持可点击，
     * 用户可以再次点击取消。
     */
    if (
      selectedFilters[
        group.key as SelectionFilterKey
      ]?.has(value)
    ) {
      return false;
    }

    const candidateKey =
      group.key as SelectionFilterKey;

    const hasMatchingProduct =
      currentTypeProducts.some(
        (product) => {
          return FILTER_KEYS.every(
            (filterKey) => {
              const productValues =
                splitFilterValues(
                  (product.filters || {})[
                    filterKey
                  ]
                );

              /*
               * 当前正在判断的接管，
               * 使用候选内径进行匹配。
               */
              if (
                filterKey ===
                candidateKey
              ) {
                return productValues.includes(
                  value
                );
              }

              /*
               * 其它筛选继续使用用户
               * 当前已经选择的条件。
               */
              const selectedValues =
                selectedFilters[
                  filterKey
                ];

              if (
                !selectedValues ||
                selectedValues.size === 0
              ) {
                return true;
              }

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

  clientContent =
    clientContent.replace(
      anchor,
      disabledFunction + anchor
    );
}

if (
  !clientContent.includes(
    "isOptionDisabled={isBarbedPortOptionDisabled}"
  )
) {
  const anchor =
    "              isOptionActive={isFilterOptionActive}";

  if (!clientContent.includes(anchor)) {
    throw new Error(
      "ProductSelectionClient 中没有找到筛选面板参数"
    );
  }

  clientContent =
    clientContent.replace(
      anchor,
      `${anchor}
              isOptionDisabled={isBarbedPortOptionDisabled}`
    );
}

backup(clientPath);

writeText(
  clientPath,
  clientContent
);

console.log(
  "已增加倒刺接头内径可用性判断"
);

/* =========================================================
   2. ProductFilterPanel
   所有内径固定显示，不可选项变灰
========================================================= */

let panelContent =
  readText(panelPath);

if (
  !panelContent.includes(
    "isOptionDisabled?:"
  )
) {
  const anchor = `  isOptionActive: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;`;

  if (!panelContent.includes(anchor)) {
    throw new Error(
      "ProductFilterPanel 中没有找到 isOptionActive 类型"
    );
  }

  panelContent =
    panelContent.replace(
      anchor,
      `${anchor}

  isOptionDisabled?: (
    group: ProductSelectionFilterGroup,
    value: string
  ) => boolean;`
    );
}

if (
  !panelContent.includes(
    "  isOptionDisabled,\n  onFilterChange,"
  )
) {
  const anchor = `  isOptionActive,
  onFilterChange,`;

  if (!panelContent.includes(anchor)) {
    throw new Error(
      "ProductFilterPanel 中没有找到参数解构位置"
    );
  }

  panelContent =
    panelContent.replace(
      anchor,
      `  isOptionActive,
  isOptionDisabled,
  onFilterChange,`
    );
}

const panelPattern =
  /\/\* BARBED_PORT_FILTER_GROUP_START \*\/[\s\S]*?\/\* BARBED_PORT_FILTER_GROUP_END \*\//;

if (!panelPattern.test(panelContent)) {
  throw new Error(
    "没有找到倒刺接头接管内径组件代码块"
  );
}

const newPanelBlock = `/* BARBED_PORT_FILTER_GROUP_START */

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
   * 尚未选择结构时，
   * 三个接管都先保持可选。
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
   * 当结构由三接管切换为
   * 两接管或单接管时，
   * 自动取消已经不适用的筛选值。
   */
  useEffect(() => {
    BARBED_PORT_FILTER_KEYS.forEach(
      (filterKey, index) => {
        if (
          index + 1 <=
          enabledPortCount
        ) {
          return;
        }

        const group =
          filterGroups.find(
            (item) =>
              item.key === filterKey
          );

        if (!group) {
          return;
        }

        const activeOption =
          BARBED_PORT_SIZE_OPTIONS.find(
            (value) =>
              isOptionActive(
                group,
                value
              )
          );

        if (activeOption) {
          onFilterChange(
            group,
            activeOption
          );
        }
      }
    );
  }, [
    enabledPortCount,
    filterGroups,
    isOptionActive,
    onFilterChange,
  ]);

  return (
    <section
      className="filter-group barbed-port-filter-group is-mobile-open"
      data-barbed-port-filter="true"
    >
      <div className="filter-group-trigger barbed-port-filter-title">
        <span>接管内径</span>
      </div>

      <div className="barbed-port-columns">
        {BARBED_PORT_FILTER_KEYS.map(
          (filterKey, index) => {
            const group =
              filterGroups.find(
                (item) =>
                  item.key === filterKey
              );

            if (!group) {
              return null;
            }

            const portNumber =
              index + 1;

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
                <div className="barbed-port-column-title">
                  接管{portNumber}
                </div>

                <div className="barbed-port-options">
                  {BARBED_PORT_SIZE_OPTIONS.map(
                    (value) => {
                      const active =
                        isOptionActive(
                          group,
                          value
                        );

                      /*
                       * 结构不支持该接管，
                       * 或当前筛选组合下没有此规格，
                       * 都显示为灰色不可选。
                       */
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
                          aria-disabled={
                            disabled
                          }
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
    panelPattern,
    newPanelBlock
  );

/*
 * 给 BarbedPortFilterGroup 传入
 * 是否可选的判断函数。
 */
if (
  !panelContent.includes(
    "isOptionDisabled={isOptionDisabled}"
  )
) {
  const anchor = `                isOptionActive={isOptionActive}
                onFilterChange={onFilterChange}`;

  if (!panelContent.includes(anchor)) {
    throw new Error(
      "没有找到 BarbedPortFilterGroup 参数位置"
    );
  }

  panelContent =
    panelContent.replace(
      anchor,
      `                isOptionActive={isOptionActive}
                isOptionDisabled={isOptionDisabled}
                onFilterChange={onFilterChange}`
    );
}

backup(panelPath);

writeText(
  panelPath,
  panelContent
);

console.log(
  "已固定显示所有接管内径选项"
);

/* =========================================================
   3. CSS
   去掉三个接管列的外框
   不可选项显示灰色
========================================================= */

let cssContent =
  readText(cssPath);

const cssPattern =
  /\/\* BARBED_PORT_DISABLED_STATE_START \*\/[\s\S]*?\/\* BARBED_PORT_DISABLED_STATE_END \*\//;

cssContent =
  cssContent.replace(
    cssPattern,
    ""
  );

const css = `

/* BARBED_PORT_DISABLED_STATE_START */

/*
 * 接管1、接管2、接管3本身不显示外框。
 */
.products-selection-page
  .barbed-port-column {
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

.products-selection-page
  .barbed-port-column.is-disabled {
  padding: 0;
  border: 0;
  background: transparent;
}

/*
 * 三列之间仅保留正常间距，
 * 不使用竖向边框分隔。
 */
.products-selection-page
  .barbed-port-columns {
  gap: 10px;
}

/*
 * 不可选内径仍然保留位置，
 * 但显示为灰色并禁止点击。
 */
.products-selection-page
  .barbed-port-option.is-disabled,
.products-selection-page
  .barbed-port-option:disabled {
  border-color: #e5e9ef;
  background: #f1f3f6;
  color: #a3acb9;
  cursor: not-allowed;
  opacity: 1;
}

.products-selection-page
  .barbed-port-option.is-disabled
  .filter-check,
.products-selection-page
  .barbed-port-option:disabled
  .filter-check {
  border-color: #cbd2dc;
  background: #e8ebef;
  box-shadow: none;
}

.products-selection-page
  .barbed-port-option.is-disabled:hover,
.products-selection-page
  .barbed-port-option:disabled:hover {
  border-color: #e5e9ef;
  background: #f1f3f6;
  color: #a3acb9;
}

/*
 * 不适用的整列标题也变灰，
 * 但所有内径仍然可见。
 */
.products-selection-page
  .barbed-port-column.is-disabled
  .barbed-port-column-title {
  color: #a3acb9;
}

/* BARBED_PORT_DISABLED_STATE_END */
`;

cssContent =
  cssContent.trimEnd() +
  "\n" +
  css +
  "\n";

backup(cssPath);

writeText(
  cssPath,
  cssContent
);

console.log(
  "已去掉接管列外框并增加灰色不可选状态"
);

console.log("");
console.log(
  "===== 修改完成 ====="
);