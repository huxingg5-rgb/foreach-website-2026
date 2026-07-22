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
    `${filePath}.bak_barbed_disabled_v2_${stamp}`;

  fs.copyFileSync(filePath, backupPath);

  console.log(
    `已备份：${path.relative(root, backupPath)}`
  );
}

assertFile(clientPath);
assertFile(panelPath);
assertFile(cssPath);

/* =========================================================
   1. 清理上一次失败脚本可能留下的代码
========================================================= */

let clientContent = readText(clientPath);

clientContent = clientContent.replace(
  /\n?\s*\/\* BARBED_PORT_OPTION_DISABLED_START \*\/[\s\S]*?\/\* BARBED_PORT_OPTION_DISABLED_END \*\/\s*/g,
  "\n\n"
);

clientContent = clientContent.replace(
  /^\s*isOptionDisabled=\{isBarbedPortOptionDisabled\}\s*$/gm,
  ""
);

backup(clientPath);
writeText(clientPath, clientContent);

console.log(
  "已清理 ProductSelectionClient 中的失败残留"
);

/* =========================================================
   2. 重写倒刺接头接管内径组件
========================================================= */

let panelContent = readText(panelPath);

/*
 * 清理上一次失败脚本可能增加的属性。
 */
panelContent = panelContent.replace(
  /\n\s*isOptionDisabled\?:\s*\(\s*group:\s*ProductSelectionFilterGroup,\s*value:\s*string\s*\)\s*=>\s*boolean;\s*/g,
  "\n"
);

panelContent = panelContent.replace(
  /^\s*isOptionDisabled,\s*$/gm,
  ""
);

panelContent = panelContent.replace(
  /^\s*isOptionDisabled=\{isOptionDisabled\}\s*$/gm,
  ""
);

const componentPattern =
  /\/\* BARBED_PORT_FILTER_GROUP_START \*\/[\s\S]*?\/\* BARBED_PORT_FILTER_GROUP_END \*\//;

if (!componentPattern.test(panelContent)) {
  throw new Error(
    "ProductFilterPanel.tsx 中没有找到 BARBED_PORT_FILTER_GROUP 代码块"
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
  const portCountMap: Record<string, number> = {
    "直通型": 2,
    "L型": 2,
    "T型": 3,
    "Y型": 3,
    "π型": 1,
    "十字型": 1,
    "倒刺堵头": 1,
  };

  /*
   * 尚未选择产品结构时，
   * 三个接管都保持可选。
   */
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

  /*
   * 从三接管结构切换到两接管或单接管结构时，
   * 自动清除不再适用的接管筛选。
   */
  useEffect(() => {
    BARBED_PORT_FILTER_KEYS.forEach(
      (filterKey, index) => {
        if (
          index + 1 <= enabledPortCount
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

        const activeValue =
          BARBED_PORT_SIZE_OPTIONS.find(
            (value) =>
              isOptionActive(
                group,
                value
              )
          );

        if (activeValue) {
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

            /*
             * group.options 是当前其它条件下
             * 仍然存在的有效内径。
             *
             * 固定尺寸表中不存在于 group.options
             * 的尺寸保留显示，但禁用变灰。
             */
            const availableValues =
              new Set(
                group.options.map(
                  (option) =>
                    option.value
                )
              );

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

                      const disabled =
                        !active &&
                        (
                          portDisabled ||
                          !availableValues.has(
                            value
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

backup(panelPath);
writeText(panelPath, panelContent);

console.log(
  "已固定显示全部内径，并将无效内径设为禁用"
);

/* =========================================================
   3. 最终样式覆盖
========================================================= */

let cssContent = readText(cssPath);

const overridePattern =
  /\/\* BARBED_PORT_FINAL_DISABLED_STYLE_START \*\/[\s\S]*?\/\* BARBED_PORT_FINAL_DISABLED_STYLE_END \*\//g;

cssContent = cssContent.replace(
  overridePattern,
  ""
);

const cssOverride = `

/* BARBED_PORT_FINAL_DISABLED_STYLE_START */

/*
 * 接管1、接管2、接管3横向三列。
 */
.products-selection-page .barbed-port-columns {
  display: grid;
  grid-template-columns:
    repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 0 12px 16px;
}

/*
 * 去掉每个接管列自己的外框。
 */
.products-selection-page .barbed-port-column,
.products-selection-page .barbed-port-column.is-disabled {
  min-width: 0;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

/*
 * 每个接管的尺寸竖向排列。
 */
.products-selection-page .barbed-port-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.products-selection-page .barbed-port-option {
  width: 100%;
  min-width: 0;
  min-height: 40px;
  padding: 0 8px;
  justify-content: flex-start;
  gap: 7px;
}

.products-selection-page .barbed-port-option-label {
  overflow: visible;
  text-overflow: clip;
  white-space: nowrap;
}

/*
 * 当前组合中不存在的内径：
 * 保留显示、变灰、不可点击。
 */
.products-selection-page .barbed-port-option.is-disabled,
.products-selection-page .barbed-port-option:disabled {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a5adba !important;
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
  background: #e7eaee !important;
  box-shadow: none !important;
}

.products-selection-page
  .barbed-port-option.is-disabled:hover,
.products-selection-page
  .barbed-port-option:disabled:hover {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a5adba !important;
}

.products-selection-page
  .barbed-port-column.is-disabled
  .barbed-port-column-title {
  color: #a5adba;
}

/* BARBED_PORT_FINAL_DISABLED_STYLE_END */
`;

cssContent =
  cssContent.trimEnd() +
  cssOverride +
  "\n";

backup(cssPath);
writeText(cssPath, cssContent);

console.log(
  "已去掉三个接管列外框，并增加灰色禁用状态"
);

console.log("");
console.log("===== 修改完成 =====");