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
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("未找到文件：" + filePath);
  }

  return fs.readFileSync(filePath, "utf8");
}

function backup(filePath) {
  const backupPath =
    filePath +
    ".bak_thread_barbed_disabled_" +
    stamp;

  fs.copyFileSync(filePath, backupPath);

  console.log("已备份：" + backupPath);
}

function write(filePath, content) {
  fs.writeFileSync(
    filePath,
    content,
    "utf8"
  );

  console.log("已修改：" + filePath);
}

/* =========================================================
   1. ProductSelectionClient
   增加螺纹转倒刺接头选项联动判断
   ========================================================= */

let clientSource = read(clientPath);

const clientStartMarker =
  "THREAD_TO_BARBED_OPTION_DISABLED_START";

if (!clientSource.includes(clientStartMarker)) {
  const insertAnchor =
    "/* BARBED_PORT_OPTION_DISABLED_END */";

  if (!clientSource.includes(insertAnchor)) {
    throw new Error(
      "ProductSelectionClient.tsx 中未找到 BARBED_PORT_OPTION_DISABLED_END。"
    );
  }

  const disabledFunction = `

/* THREAD_TO_BARBED_OPTION_DISABLED_START */

/*
 * 螺纹转倒刺接头筛选联动：
 *
 * 1. 选择接管内径后，不兼容的螺纹变灰；
 * 2. 选择螺纹后，不兼容的接管内径变灰；
 * 3. 结构、密封方式、材质和颜色同样参与组合判断；
 * 4. 已选中的选项保留取消能力，不设置为禁用；
 * 5. 只影响 thread-to-barbed-fittings。
 */
function isProductFilterOptionDisabled(
  group: ProductSelectionFilterGroup,
  value: string
) {
  /*
   * 保留原倒刺接头三端口禁用逻辑。
   */
  if (
    isBarbedPortOptionDisabled(
      group,
      value
    )
  ) {
    return true;
  }

  if (
    activeProductTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return false;
  }

  if (
    !FILTER_KEYS.includes(
      group.key as SelectionFilterKey
    )
  ) {
    return false;
  }

  const candidateKey =
    group.key as SelectionFilterKey;

  /*
   * 当前已选项不能禁用，
   * 用户需要能够再次点击取消。
   */
  if (
    selectedFilters[
      candidateKey
    ]?.has(value)
  ) {
    return false;
  }

  /*
   * 查找是否至少存在一个真实型号：
   *
   * - 当前候选字段等于 value；
   * - 同时满足其他已选筛选条件。
   */
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
          !candidateValues.includes(value)
        ) {
          return false;
        }

        return FILTER_KEYS.every(
          (filterKey) => {
            /*
             * 判断候选字段时，
             * 不使用该字段当前已有选择限制自己。
             */
            if (
              filterKey === candidateKey
            ) {
              return true;
            }

            const selectedValues =
              selectedFilters[filterKey];

            if (
              !selectedValues ||
              selectedValues.size === 0
            ) {
              return true;
            }

            const productValues =
              splitFilterValues(
                (product.filters || {})[
                  filterKey
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

/* THREAD_TO_BARBED_OPTION_DISABLED_END */
`;

  backup(clientPath);

  clientSource = clientSource.replace(
    insertAnchor,
    insertAnchor + disabledFunction
  );
}

/*
 * ProductFilterPanel 使用新的综合禁用函数。
 */
if (
  clientSource.includes(
    "isOptionDisabled={isBarbedPortOptionDisabled}"
  )
) {
  clientSource = clientSource.replace(
    "isOptionDisabled={isBarbedPortOptionDisabled}",
    "isOptionDisabled={isProductFilterOptionDisabled}"
  );
} else if (
  !clientSource.includes(
    "isOptionDisabled={isProductFilterOptionDisabled}"
  )
) {
  throw new Error(
    "没有找到 ProductFilterPanel 的 isOptionDisabled 传参。"
  );
}

write(clientPath, clientSource);

/* =========================================================
   2. ProductFilterPanel
   让普通筛选按钮真正支持禁用状态
   ========================================================= */

let panelSource = read(panelPath);

const panelMarker =
  "THREAD_TO_BARBED_GENERIC_DISABLED_RENDER";

if (!panelSource.includes(panelMarker)) {
  const renderPattern =
    /const renderOptions = \(\) => \([\s\S]*?\n\s{10}\);\s*\n\s*\n\s{10}return \(/;

  if (!renderPattern.test(panelSource)) {
    throw new Error(
      "ProductFilterPanel.tsx 中没有定位到 renderOptions。"
    );
  }

  const newRenderBlock = `/*
           * THREAD_TO_BARBED_GENERIC_DISABLED_RENDER
           *
           * 普通筛选按钮支持：
           * - 灰色禁用状态
           * - disabled 属性
           * - aria-disabled
           * - 禁止触发筛选事件
           */
          const renderOptions = () => (
            <div className={filterOptionsClass}>
              {group.options.map((option) => {
                const active = isOptionActive(
                  group,
                  option.value
                );

                const disabled =
                  !active &&
                  Boolean(
                    isOptionDisabled?.(
                      group,
                      option.value
                    )
                  );

                return (
                  <button
                    className={[
                      "filter-option",
                      optionTypeClass,
                      active ? "active" : "",
                      disabled
                        ? "is-disabled"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    key={option.value}
                    disabled={disabled}
                    aria-disabled={disabled}
                    onClick={() => {
                      if (disabled) {
                        return;
                      }

                      onFilterChange(
                        group,
                        option.value
                      );

                      /*
                       * 选择接头产品种类后自动收起。
                       */
                      if (
                        isCollapsibleProductType
                      ) {
                        setIsFittingProductTypeOpen(
                          false
                        );
                      }
                    }}
                  >
                    <span className="filter-check" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          );

          return (`;

  backup(panelPath);

  panelSource = panelSource.replace(
    renderPattern,
    newRenderBlock
  );

  write(panelPath, panelSource);
} else {
  console.log(
    "普通筛选按钮禁用渲染已存在，跳过。"
  );
}

/* =========================================================
   3. products.css
   增加普通筛选项灰色禁用样式
   ========================================================= */

let cssSource = read(cssPath);

const cssStartMarker =
  "THREAD_TO_BARBED_GENERIC_DISABLED_STYLE_START";

if (!cssSource.includes(cssStartMarker)) {
  const cssPatch = `

/* =========================================================
   THREAD_TO_BARBED_GENERIC_DISABLED_STYLE_START

   螺纹转倒刺接头：
   当前筛选组合中不存在的选项保留显示，
   但变灰并禁止点击。
   ========================================================= */

.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option.is-disabled,
.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option:disabled {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a5adba !important;
  cursor: not-allowed !important;
  opacity: 1 !important;
}

.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option.is-disabled
  .filter-check,
.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option:disabled
  .filter-check {
  border-color: #c7ced8 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option.is-disabled:hover,
.products-selection-page
  .filter-panel[data-product-type-id="thread-to-barbed-fittings"]
  .filter-option:disabled:hover {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a5adba !important;
  transform: none !important;
}

/* THREAD_TO_BARBED_GENERIC_DISABLED_STYLE_END */
`;

  backup(cssPath);

  cssSource =
    cssSource.trimEnd() +
    cssPatch +
    "\n";

  write(cssPath, cssSource);
} else {
  console.log(
    "普通筛选项禁用 CSS 已存在，跳过。"
  );
}

console.log("");
console.log("============================================");
console.log("螺纹转倒刺筛选联动已完成");
console.log("============================================");
console.log("");
console.log("示例：");
console.log("选择 1.6 mm 后");
console.log("不存在对应型号的 M5×0.8 将变灰并不可点击");
console.log("");
console.log("联动范围：");
console.log("- 密封方式");
console.log("- 连接结构");
console.log("- 螺纹规格");
console.log("- 接管内径");
console.log("- 材质");
console.log("- 颜色");
console.log("");
