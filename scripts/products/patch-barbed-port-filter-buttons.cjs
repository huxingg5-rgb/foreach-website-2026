const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

function backup(filePath) {
  const backupPath =
    `${filePath}.bak_barbed_port_buttons_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    `已备份：${path.relative(root, backupPath)}`
  );
}

function writeText(filePath, content) {
  fs.writeFileSync(
    filePath,
    content.replace(/\r?\n/g, "\n"),
    "utf8"
  );
}

assertFile(panelPath);
assertFile(cssPath);

/* =========================================================
   1. 修改 ProductFilterPanel
   下拉框改为直接列出内径选项
========================================================= */

let panelContent =
  fs.readFileSync(panelPath, "utf8");

const panelPattern =
  /\/\* BARBED_PORT_FILTER_GROUP_START \*\/[\s\S]*?\/\* BARBED_PORT_FILTER_GROUP_END \*\//;

if (!panelPattern.test(panelContent)) {
  throw new Error(
    "没有找到倒刺接头接口筛选代码块，先不要继续修改"
  );
}

const newPanelBlock = `/* BARBED_PORT_FILTER_GROUP_START */

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

  /*
   * 尚未选择产品结构时，
   * 三个接管都保持可选。
   */
  return portCountMap[structure] || 3;
}

function sortBarbedPortOptions(
  options: ProductSelectionFilterGroup["options"]
) {
  return [...options].sort(
    (current, next) => {
      const currentNumber =
        Number.parseFloat(current.value);

      const nextNumber =
        Number.parseFloat(next.value);

      if (
        Number.isFinite(currentNumber) &&
        Number.isFinite(nextNumber)
      ) {
        return currentNumber - nextNumber;
      }

      return current.label.localeCompare(
        next.label,
        "zh-CN"
      );
    }
  );
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
   * 从三接口结构切换到两接口或单接口结构时，
   * 自动清除已经不适用的接管筛选。
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

        const activeOption =
          group.options.find(
            (option) =>
              isOptionActive(
                group,
                option.value
              )
          );

        if (activeOption) {
          onFilterChange(
            group,
            activeOption.value
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

            const portNumber =
              index + 1;

            const disabled =
              portNumber >
                enabledPortCount ||
              !group;

            const options =
              group
                ? sortBarbedPortOptions(
                    group.options
                  )
                : [];

            return (
              <div
                className={
                  disabled
                    ? "barbed-port-column is-disabled"
                    : "barbed-port-column"
                }
                key={filterKey}
              >
                <div className="barbed-port-column-title">
                  接管{portNumber}
                </div>

                {disabled ? (
                  <div className="barbed-port-disabled">
                    不适用
                  </div>
                ) : (
                  <div className="barbed-port-options">
                    {options.map(
                      (option) => {
                        const active =
                          isOptionActive(
                            group,
                            option.value
                          );

                        return (
                          <button
                            className={
                              \`filter-option is-single barbed-port-option\${active ? " active" : ""}\`
                            }
                            type="button"
                            key={option.value}
                            onClick={() =>
                              onFilterChange(
                                group,
                                option.value
                              )
                            }
                          >
                            <span className="filter-check" />

                            <span className="barbed-port-option-label">
                              {option.label}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

/* BARBED_PORT_FILTER_GROUP_END */`;

backup(panelPath);

panelContent =
  panelContent.replace(
    panelPattern,
    newPanelBlock
  );

writeText(
  panelPath,
  panelContent
);

console.log(
  "已将接管内径下拉框改为按钮列表"
);

/* =========================================================
   2. 修改 products.css
========================================================= */

let cssContent =
  fs.readFileSync(cssPath, "utf8");

const layoutPattern =
  /\/\* BARBED_FITTING_FILTER_LAYOUT_START \*\/[\s\S]*?\/\* BARBED_FITTING_FILTER_LAYOUT_END \*\//;

const oldPortPattern =
  /\/\* BARBED_FITTING_PORT_FILTER_START \*\/[\s\S]*?\/\* BARBED_FITTING_PORT_FILTER_END \*\//;

const newCssBlock = `/* BARBED_FITTING_FILTER_LAYOUT_START */

/*
 * 倒刺接头接管内径布局
 *
 * 1. 接管1、接管2、接管3横向一排
 * 2. 每个接管内部的内径选项两列排列
 * 3. 选项使用与主体材质相同的按钮形式
 */

/*
 * 倒刺接头筛选内容较多，
 * 仅在该筛选存在时适当加宽左栏。
 */
.products-selection-page
  .selection-layout:has(
    [data-barbed-port-filter="true"]
  ) {
  grid-template-columns:
    460px minmax(0, 1fr);
}

.products-selection-page
  .barbed-port-filter-title {
  cursor: default;
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
  .barbed-port-column {
  min-width: 0;
  padding: 10px;
  border: 1px solid #e5ebf2;
  background: #ffffff;
}

.products-selection-page
  .barbed-port-column-title {
  margin-bottom: 8px;
  color: #173368;
  font-size: 13px;
  font-weight: 850;
  line-height: 1.3;
}

.products-selection-page
  .barbed-port-options {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.products-selection-page
  .barbed-port-option {
  width: 100%;
  min-width: 0;
  min-height: 38px;
  padding: 0 7px;
  gap: 6px;
  justify-content: flex-start;
  font-size: 12px;
}

.products-selection-page
  .barbed-port-option
  .filter-check {
  width: 11px;
  height: 11px;
  flex: 0 0 11px;
}

.products-selection-page
  .barbed-port-option-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.products-selection-page
  .barbed-port-column.is-disabled {
  background: #f5f7fa;
  border-color: #e6eaf0;
}

.products-selection-page
  .barbed-port-column.is-disabled
  .barbed-port-column-title {
  color: #9aa5b5;
}

.products-selection-page
  .barbed-port-disabled {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e7ed;
  background: #eef1f5;
  color: #9aa5b5;
  font-size: 12px;
  font-weight: 700;
}

/*
 * 平板以下筛选栏改为整行，
 * 三个接管仍然保持同一排。
 */
@media (max-width: 1180px) {
  .products-selection-page
    .selection-layout:has(
      [data-barbed-port-filter="true"]
    ) {
    grid-template-columns: 1fr;
  }
}

/*
 * 手机端空间不足时再改为纵向，
 * 避免按钮文字被压坏。
 */
@media (max-width: 760px) {
  .products-selection-page
    .barbed-port-columns {
    grid-template-columns: 1fr;
  }

  .products-selection-page
    .barbed-port-options {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

/* BARBED_FITTING_FILTER_LAYOUT_END */`;

backup(cssPath);

if (layoutPattern.test(cssContent)) {
  cssContent =
    cssContent.replace(
      layoutPattern,
      newCssBlock
    );
} else if (
  oldPortPattern.test(cssContent)
) {
  cssContent =
    cssContent.replace(
      oldPortPattern,
      newCssBlock
    );
} else {
  throw new Error(
    "products.css 中没有找到倒刺接头筛选样式代码块"
  );
}

writeText(
  cssPath,
  cssContent
);

console.log(
  "倒刺接头接管内径样式修改完成"
);

console.log("");
console.log(
  "===== 本次修改完成 ====="
);
console.log(
  "接管1、接管2、接管3横向一排"
);
console.log(
  "每个接管的内径直接列出，每排两个"
);
console.log(
  "再次点击已选内径可取消选择"
);