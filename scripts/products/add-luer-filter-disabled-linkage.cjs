const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const cssPath = path.join(
  root,
  "app",
  "products",
  "products.css"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function backup(filePath) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const backupPath =
    filePath +
    ".bak_luer_disabled_linkage_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    "已备份：" + backupPath
  );
}

function checkTsx(
  filePath,
  source
) {
  const result =
    ts.transpileModule(
      source,
      {
        fileName: filePath,
        reportDiagnostics: true,
        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,
          module:
            ts.ModuleKind.ESNext,
          jsx:
            ts.JsxEmit.ReactJSX,
        },
      }
    );

  const errors =
    (result.diagnostics || [])
      .filter(
        (diagnostic) =>
          diagnostic.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
    errors
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        )
      )
      .join("\n")
  );
}

/* =========================================================
   1. 修改 ProductSelectionClient
   ========================================================= */

let clientSource =
  read(clientPath);

backup(clientPath);

const marker =
  "LUER_FILTER_OPTION_DISABLED_START";

if (
  !clientSource.includes(marker)
) {
  const functionStart =
    clientSource.indexOf(
      "function isProductFilterOptionDisabled("
    );

  if (functionStart < 0) {
    throw new Error(
      "没有找到 isProductFilterOptionDisabled 函数。"
    );
  }

  const remainingSource =
    clientSource.slice(
      functionStart
    );

  const threadGuardPattern =
    /\n\s*if\s*\(\s*activeProductTypeId\s*!==\s*"thread-to-barbed-fittings"\s*\)\s*\{/;

  const guardMatch =
    remainingSource.match(
      threadGuardPattern
    );

  if (
    !guardMatch ||
    guardMatch.index == null
  ) {
    throw new Error(
      "没有找到螺纹转倒刺禁用逻辑锚点。"
    );
  }

  const insertIndex =
    functionStart +
    guardMatch.index;

  const luerBlock = `

  /*
   * LUER_FILTER_OPTION_DISABLED_START
   *
   * 鲁尔接头双向组合联动：
   * 1. 产品系列、接管内径、螺纹、材质、颜色共同参与判断；
   * 2. 当前组合没有对应在售型号时，选项变灰；
   * 3. 已选中的项目保留取消能力；
   * 4. filter01 产品类型已隐藏，不参与联动。
   */
  if (
    activeProductTypeId ===
    "luer-fittings"
  ) {
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
     * 产品类型 filter01 已隐藏。
     */
    if (
      candidateKey === "filter01"
    ) {
      return false;
    }

    /*
     * 已选项目必须能够再次点击取消。
     */
    if (
      selectedFilters[
        candidateKey
      ]?.has(value)
    ) {
      return false;
    }

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

          /*
           * 检查其他所有已选筛选项。
           *
           * 当前分组使用多选逻辑，
           * 因此判断候选项时忽略当前分组
           * 已选的其他值。
           */
          return FILTER_KEYS.every(
            (dependencyKey) => {
              if (
                dependencyKey ===
                  candidateKey ||
                dependencyKey ===
                  "filter01"
              ) {
                return true;
              }

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

  /* LUER_FILTER_OPTION_DISABLED_END */
`;

  clientSource =
    clientSource.slice(
      0,
      insertIndex
    ) +
    luerBlock +
    clientSource.slice(
      insertIndex
    );
}

checkTsx(
  clientPath,
  clientSource
);

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

/* =========================================================
   2. 添加鲁尔接头灰色禁用样式
   ========================================================= */

let cssSource =
  read(cssPath);

backup(cssPath);

if (
  !cssSource.includes(
    "LUER_FILTER_DISABLED_STYLE_START"
  )
) {
  cssSource += `

/* =========================================================
   LUER_FILTER_DISABLED_STYLE_START

   鲁尔接头无对应型号的筛选项：
   保留显示、灰色、不可点击。
   ========================================================= */

.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option.is-disabled,
.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option:disabled {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a8b0bc !important;
  cursor: not-allowed !important;
  opacity: 1 !important;
}

.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option.is-disabled
  .filter-check,
.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option:disabled
  .filter-check {
  border-color: #cbd2dc !important;
  background: #e6e9ed !important;
  box-shadow: none !important;
}

.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option.is-disabled:hover,
.filter-panel[data-product-type-id="luer-fittings"]
  .filter-option:disabled:hover {
  border-color: #e4e8ed !important;
  background: #f1f3f6 !important;
  color: #a8b0bc !important;
  transform: none !important;
}

/* LUER_FILTER_DISABLED_STYLE_END */
`;
}

fs.writeFileSync(
  cssPath,
  cssSource,
  "utf8"
);

console.log("");
console.log("============================================");
console.log("鲁尔接头筛选双向联动已接入");
console.log("============================================");
console.log("产品系列：参与联动");
console.log("接管内径：参与联动");
console.log("螺纹规格：参与联动");
console.log("材质：参与联动");
console.log("颜色：参与联动");
console.log("");
console.log("不存在对应型号的选项将变灰且不可点击。");
console.log("已选中的选项仍可再次点击取消。");
