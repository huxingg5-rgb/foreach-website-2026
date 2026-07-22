const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const ts = require("typescript");

const root = process.cwd();

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-female-thread-adapter-selection-and-assets.cjs"
);

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

const summaryPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.summary.json"
);

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

function write(filePath, source) {
  fs.writeFileSync(
    filePath,
    source,
    "utf8"
  );
}

function backup(filePath, label) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const backupPath =
    `${filePath}.bak_${label}_${stamp}`;

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

  const message =
    errors
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        )
      )
      .join("\n");

  throw new Error(
    `语法检查失败：${filePath}\n${message}`
  );
}

function addArraySpread(
  source,
  arrayName,
  spreadName
) {
  const spreadCode =
    `...${spreadName},`;

  if (
    source.includes(
      spreadCode
    )
  ) {
    return source;
  }

  const pattern =
    new RegExp(
      `(const\\s+${arrayName}\\s*=\\s*\\[\\s*)`
    );

  if (!pattern.test(source)) {
    throw new Error(
      `没有找到数组：${arrayName}`
    );
  }

  return source.replace(
    pattern,
    `$1  ${spreadCode}\n`
  );
}

/* =========================================================
   1. 修正 PMU 的 M12 解析
   ========================================================= */

let generatorSource =
  read(generatorPath);

backup(
  generatorPath,
  "before_female_thread_integration"
);

if (
  !generatorSource.includes(
    "FEMALE_THREAD_PMU_M12_FILTER_FIX"
  )
) {
  const threadsPattern =
    /const\s+threads\s*=\s*threadCodes\.map\(/;

  if (
    !threadsPattern.test(
      generatorSource
    )
  ) {
    throw new Error(
      "生成脚本中没有找到 threads 解析代码。"
    );
  }

  generatorSource =
    generatorSource.replace(
      threadsPattern,
`/*
   * FEMALE_THREAD_PMU_M12_FILTER_FIX
   *
   * PMU 型号中的 M12 是穿板安装螺纹，
   * 不作为液路接口螺纹参加筛选，
   * 也不显示成 M12 转 1/4-28 UNF。
   *
   * PMBSN 六角螺母的 M12 保留。
   */
  const fluidThreadCodes =
    prefix === "PMU"
      ? threadCodes.filter(
          (code) =>
            code !== "M12"
        )
      : threadCodes;

  const threads =
    fluidThreadCodes.map(`
    );
}

write(
  generatorPath,
  generatorSource
);

console.log("");
console.log(
  "正在重新生成内螺纹互转接头数据……"
);

childProcess.execFileSync(
  process.execPath,
  [generatorPath],
  {
    cwd: root,
    stdio: "inherit",
  }
);

const regeneratedSource =
  read(generatedPath);

const generatedProductCount =
  (
    regeneratedSource.match(
      /"productId":/g
    ) || []
  ).length;

if (
  generatedProductCount !== 24
) {
  throw new Error(
    `重新生成后的产品数量异常：${generatedProductCount}`
  );
}

if (
  regeneratedSource.includes(
    '"filter02": "M12|1/4-28 UNF"'
  )
) {
  throw new Error(
    "PMU 的 M12 仍被识别为液路螺纹。"
  );
}

const multiThreadCount =
  (
    regeneratedSource.match(
      /"filter02":\s*"[^"]*\|[^"]*"/g
    ) || []
  ).length;

if (
  multiThreadCount !== 1
) {
  throw new Error(
    `双液路螺纹型号数量异常：${multiThreadCount}`
  );
}

/* =========================================================
   2. 接入 ProductSelectionClient
   ========================================================= */

let clientSource =
  read(clientPath);

backup(
  clientPath,
  "female_thread_selection"
);

const femaleImport = `import {
  femaleThreadAdapterFilterLabels,
  femaleThreadAdapterSelectionProducts,
  femaleThreadAdapterTaxonomyItems,
} from "@/data/products/selection/female-thread-adapter-selection.generated";`;

if (
  !clientSource.includes(
    "femaleThreadAdapterSelectionProducts"
  )
) {
  const luerImportPattern =
    /import\s*\{[\s\S]*?luerFittingSelectionFilterLabels[\s\S]*?luerFittingSelectionProducts[\s\S]*?luerFittingSelectionTaxonomyItems[\s\S]*?\}\s*from\s*"@\/data\/products\/selection\/luer-fitting-selection\.generated";/;

  const luerImportMatch =
    clientSource.match(
      luerImportPattern
    );

  if (!luerImportMatch) {
    throw new Error(
      "没有找到鲁尔接头 import 锚点。"
    );
  }

  clientSource =
    clientSource.replace(
      luerImportMatch[0],
      `${luerImportMatch[0]}

${femaleImport}`
    );
}

clientSource =
  addArraySpread(
    clientSource,
    "selectionProducts",
    "femaleThreadAdapterSelectionProducts"
  );

clientSource =
  addArraySpread(
    clientSource,
    "selectionTaxonomyItems",
    "femaleThreadAdapterTaxonomyItems"
  );

clientSource =
  addArraySpread(
    clientSource,
    "selectionFilterLabels",
    "femaleThreadAdapterFilterLabels"
  );

/* =========================================================
   3. 多螺纹字段拆成独立筛选项
   ========================================================= */

if (
  !clientSource.includes(
    "FEMALE_THREAD_MULTI_VALUE_OPTIONS_START"
  )
) {
  const functionStart =
    clientSource.indexOf(
      "function getFilterOptions("
    );

  const functionEnd =
    clientSource.indexOf(
      "function getDefaultSelectedFilters",
      functionStart
    );

  if (
    functionStart < 0 ||
    functionEnd < 0
  ) {
    throw new Error(
      "没有找到 getFilterOptions 函数。"
    );
  }

  const functionSource =
    clientSource.slice(
      functionStart,
      functionEnd
    );

  const hardTubeIfPattern =
    /if\s*\(\s*productTypeId\s*===\s*"hard-tube-fittings"\s*&&\s*filterKey\s*===\s*"filter03"\s*\)\s*\{/;

  const hardTubeIfMatch =
    functionSource.match(
      hardTubeIfPattern
    );

  if (
    !hardTubeIfMatch ||
    hardTubeIfMatch.index == null
  ) {
    throw new Error(
      "没有找到硬管接头多值拆分锚点。"
    );
  }

  const insertIndex =
    functionStart +
    hardTubeIfMatch.index;

  const femaleMultiValueCode = `/*
   * FEMALE_THREAD_MULTI_VALUE_OPTIONS_START
   *
   * 内螺纹互转接头中：
   * PU-U32-U28 同时包含两个液路螺纹。
   *
   * 在生成任意筛选组之前，
   * 先将 filter02 拆成独立产品副本，
   * 确保螺纹选项和其他筛选条件可以正常联动。
   */
  if (
    productTypeId ===
    "female-thread-adapters"
  ) {
    const expandedProducts =
      products.flatMap(
        (product) => {
          const threadValues =
            splitFilterValues(
              (product.filters || {})
                .filter02
            );

          if (
            threadValues.length <= 1
          ) {
            return [product];
          }

          return threadValues.map(
            (threadValue) => ({
              ...product,

              productId:
                \`\${product.productId}__thread__\${threadValue}\`,

              filters: {
                ...(product.filters || {}),

                filter02:
                  threadValue,
              },
            })
          );
        }
      );

    return getProductFilterOptions({
      productTypeId,
      products:
        expandedProducts,
      filterKey,
      selectedFilters,
    });
  }

  /* FEMALE_THREAD_MULTI_VALUE_OPTIONS_END */

  `;

  clientSource =
    clientSource.slice(
      0,
      insertIndex
    ) +
    femaleMultiValueCode +
    clientSource.slice(
      insertIndex
    );
}

/* =========================================================
   4. 双向筛选联动置灰
   ========================================================= */

if (
  !clientSource.includes(
    "FEMALE_THREAD_FILTER_OPTION_DISABLED_START"
  )
) {
  /*
   * 查找鲁尔接头联动逻辑所在位置。
   *
   * 当前项目中的标记可能是多行注释，
   * 因此不能只查找完整的单行注释。
   */
  const luerMarkerIndex =
    clientSource.indexOf(
      "LUER_FILTER_OPTION_DISABLED_START"
    );

  let anchorIndex = -1;

  if (luerMarkerIndex >= 0) {
    const commentStart =
      clientSource.lastIndexOf(
        "/*",
        luerMarkerIndex
      );

    anchorIndex =
      commentStart >= 0
        ? commentStart
        : luerMarkerIndex;
  }

  /*
   * 兼容旧代码中没有标记、
   * 但已经存在鲁尔接头判断的情况。
   */
  if (anchorIndex < 0) {
    const functionStart =
      clientSource.indexOf(
        "function isProductFilterOptionDisabled("
      );

    if (functionStart >= 0) {
      const functionSource =
        clientSource.slice(
          functionStart
        );

      const luerConditionPattern =
        /if\s*\(\s*activeProductTypeId\s*===\s*"luer-fittings"\s*\)\s*\{/;

      const luerConditionMatch =
        functionSource.match(
          luerConditionPattern
        );

      if (
        luerConditionMatch &&
        luerConditionMatch.index != null
      ) {
        anchorIndex =
          functionStart +
          luerConditionMatch.index;
      }
    }
  }

  if (anchorIndex < 0) {
    throw new Error(
      "没有找到筛选联动逻辑插入位置。"
    );
  }
  const femaleDisabledCode = `/*
   * FEMALE_THREAD_FILTER_OPTION_DISABLED_START
   *
   * 内螺纹互转接头双向筛选联动：
   * - 连接结构
   * - 螺纹规格
   * - 流道内径
   * - 材质
   * - 颜色
   *
   * 当前组合不存在对应在售型号时，
   * 选项保留显示，但变灰且不可点击。
   */
  if (
    activeProductTypeId ===
    "female-thread-adapters"
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
     * 已经选中的项目不能禁用，
     * 保留再次点击取消的能力。
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

          return FILTER_KEYS.every(
            (dependencyKey) => {
              /*
               * 当前候选组内仍然保持多选 OR 逻辑。
               */
              if (
                dependencyKey ===
                candidateKey
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

  /* FEMALE_THREAD_FILTER_OPTION_DISABLED_END */

  `;

  clientSource =
    clientSource.slice(
      0,
      anchorIndex
    ) +
    femaleDisabledCode +
    clientSource.slice(
      anchorIndex
    );
}

checkTsx(
  clientPath,
  clientSource
);

write(
  clientPath,
  clientSource
);

/* =========================================================
   5. 筛选项列数
   ========================================================= */

let panelSource =
  read(panelPath);

backup(
  panelPath,
  "female_thread_layout"
);

if (
  !panelSource.includes(
    "FEMALE_THREAD_FILTER_LAYOUT_START"
  )
) {
  const luerDeclarationPattern =
    /const\s+isLuerFitting\s*=\s*activeProductTypeId\s*===\s*"luer-fittings";/;

  const luerDeclarationMatch =
    panelSource.match(
      luerDeclarationPattern
    );

  if (!luerDeclarationMatch) {
    throw new Error(
      "没有找到 isLuerFitting 布局锚点。"
    );
  }

  panelSource =
    panelSource.replace(
      luerDeclarationMatch[0],
`${luerDeclarationMatch[0]}

/*
 * FEMALE_THREAD_FILTER_LAYOUT_START
 *
 * 连接结构文字较长，使用一列；
 * 其余工程筛选项使用两列。
 */
          const isFemaleThreadAdapter =
            activeProductTypeId ===
            "female-thread-adapters";`
    );

  const columnAnchor =
    "const shouldUseTwoColumns =";

  const columnIndex =
    panelSource.indexOf(
      columnAnchor
    );

  if (columnIndex < 0) {
    throw new Error(
      "没有找到 shouldUseTwoColumns。"
    );
  }

  const columnInsertIndex =
    columnIndex +
    columnAnchor.length;

  const femaleColumnLogic = `
            isFemaleThreadAdapter &&
            group.key === "filter01"
              ? false
              : isFemaleThreadAdapter &&
                  (
                    group.key === "filter02" ||
                    group.key === "filter03" ||
                    group.key === "filter04" ||
                    group.key === "filter05"
                  )
                ? true
                :`;

  panelSource =
    panelSource.slice(
      0,
      columnInsertIndex
    ) +
    femaleColumnLogic +
    panelSource.slice(
      columnInsertIndex
    );
}

checkTsx(
  panelPath,
  panelSource
);

write(
  panelPath,
  panelSource
);

/* =========================================================
   6. 最终检查
   ========================================================= */

const finalChecks = {
  import:
    clientSource.includes(
      "female-thread-adapter-selection.generated"
    ),

  products:
    clientSource.includes(
      "...femaleThreadAdapterSelectionProducts,"
    ),

  taxonomy:
    clientSource.includes(
      "...femaleThreadAdapterTaxonomyItems,"
    ),

  filterLabels:
    clientSource.includes(
      "...femaleThreadAdapterFilterLabels,"
    ),

  multiValue:
    clientSource.includes(
      "FEMALE_THREAD_MULTI_VALUE_OPTIONS_START"
    ),

  disabled:
    clientSource.includes(
      "FEMALE_THREAD_FILTER_OPTION_DISABLED_START"
    ),

  layout:
    panelSource.includes(
      "FEMALE_THREAD_FILTER_LAYOUT_START"
    ),
};

const failed =
  Object.entries(
    finalChecks
  )
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (failed.length) {
  throw new Error(
    "接入检查失败：" +
      failed.join("、")
  );
}

const summary =
  JSON.parse(
    read(summaryPath)
  );

console.log("");
console.log(
  "============================================"
);
console.log(
  "内螺纹互转接头筛选页面接入完成"
);
console.log(
  "============================================"
);
console.log(
  `产品数量：${summary.productCount}`
);
console.log(
  `产品图：${summary.matchedProductImageCount}/${summary.productCount}`
);
console.log(
  `二维图：${summary.mappedProductDrawingCount}/${summary.productCount}`
);
console.log(
  `双液路螺纹型号：${multiThreadCount}`
);
console.log("");
console.log(
  "连接结构：一列"
);
console.log(
  "螺纹规格：两列"
);
console.log(
  "流道内径：两列"
);
console.log(
  "材质：两列"
);
console.log(
  "颜色：两列"
);
console.log(
  "双向联动置灰：已接入"
);
console.log("");
console.log(
  "本步骤未创建详情页。"
);
