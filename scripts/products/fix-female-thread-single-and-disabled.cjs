const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const ts = require("typescript");

const root = process.cwd();

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

const generatorPath = path.join(
  root,
  "scripts",
  "products",
  "generate-female-thread-adapter-selection-and-assets.cjs"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
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

function backup(
  filePath,
  label
) {
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
        (item) =>
          item.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
    errors
      .map((item) =>
        ts.flattenDiagnosticMessageText(
          item.messageText,
          "\n"
        )
      )
      .join("\n")
  );
}

/* =========================================================
   1. 修改当前生成数据：
      连接结构 filter01 改为单选
   ========================================================= */

let generatedSource =
  read(generatedPath);

backup(
  generatedPath,
  "single_structure"
);

const generatedSinglePattern =
  /("productTypeId":\s*"female-thread-adapters",[\s\S]*?"filterKey":\s*"filter01",[\s\S]*?"inputType":\s*)"multiple"/;

if (
  generatedSinglePattern.test(
    generatedSource
  )
) {
  generatedSource =
    generatedSource.replace(
      generatedSinglePattern,
      '$1"single"'
    );
}

if (
  !/("productTypeId":\s*"female-thread-adapters",[\s\S]*?"filterKey":\s*"filter01",[\s\S]*?"inputType":\s*)"single"/.test(
    generatedSource
  )
) {
  throw new Error(
    "生成数据中的 filter01 单选修改失败。"
  );
}

fs.writeFileSync(
  generatedPath,
  generatedSource,
  "utf8"
);

/* =========================================================
   2. 同步修改生成脚本

   生成脚本语法正常时才修改；
   避免再次修改损坏文件。
   ========================================================= */

if (
  fs.existsSync(
    generatorPath
  )
) {
  const syntaxResult =
    childProcess.spawnSync(
      process.execPath,
      [
        "--check",
        generatorPath,
      ],
      {
        cwd: root,
        encoding: "utf8",
      }
    );

  if (
    syntaxResult.status === 0
  ) {
    let generatorSource =
      read(generatorPath);

    backup(
      generatorPath,
      "single_structure"
    );

    const generatorSinglePattern =
      /(filterKey:\s*"filter01",[\s\S]*?inputType:\s*)"multiple"/;

    if (
      generatorSinglePattern.test(
        generatorSource
      )
    ) {
      generatorSource =
        generatorSource.replace(
          generatorSinglePattern,
          '$1"single"'
        );
    }

    if (
      !/(filterKey:\s*"filter01",[\s\S]*?inputType:\s*)"single"/.test(
        generatorSource
      )
    ) {
      throw new Error(
        "生成脚本中的 filter01 单选修改失败。"
      );
    }

    fs.writeFileSync(
      generatorPath,
      generatorSource,
      "utf8"
    );

    console.log(
      "生成脚本单选规则：已同步"
    );
  } else {
    console.log(
      "警告：当前生成脚本语法仍有错误，本次没有修改生成脚本。"
    );

    console.log(
      "当前页面数据和筛选行为仍会正常修改。"
    );
  }
}

/* =========================================================
   3. 增加内螺纹互转接头组合置灰
   ========================================================= */

let clientSource =
  read(clientPath);

backup(
  clientPath,
  "female_thread_disabled"
);

const marker =
  "FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START";

if (
  !clientSource.includes(
    marker
  )
) {
  const functionPattern =
    /function\s+isProductFilterOptionDisabled\s*\([\s\S]*?\)\s*\{/;

  const functionMatch =
    clientSource.match(
      functionPattern
    );

  if (
    !functionMatch ||
    functionMatch.index == null
  ) {
    throw new Error(
      "没有找到 isProductFilterOptionDisabled 函数。"
    );
  }

  const insertIndex =
    functionMatch.index +
    functionMatch[0].length;

  const linkageCode = `

  /*
   * FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START
   *
   * 内螺纹互转接头筛选规则：
   *
   * 1. filter01 连接结构为单选；
   * 2. 二通、三通始终允许切换，不互相置灰；
   * 3. filter02 至 filter05 根据当前组合判断；
   * 4. 没有对应在售型号的选项保留显示并变灰；
   * 5. 已选中的选项保持可点击，允许取消。
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
     * 二通和三通必须始终允许互相切换。
     */
    if (
      candidateKey === "filter01"
    ) {
      return false;
    }

    /*
     * 已选中的项目保持可点击，
     * 允许再次点击取消。
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
           * 候选值必须同时满足其他已选条件。
           *
           * 同一个筛选组不参与自身判断，
           * 其他组之间采用组合交集判断。
           */
          return FILTER_KEYS.every(
            (dependencyKey) => {
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

  /* FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_END */
`;

  clientSource =
    clientSource.slice(
      0,
      insertIndex
    ) +
    linkageCode +
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
   4. 最终检查
   ========================================================= */

const checks = {
  generatedSingle:
    /("productTypeId":\s*"female-thread-adapters",[\s\S]*?"filterKey":\s*"filter01",[\s\S]*?"inputType":\s*)"single"/.test(
      generatedSource
    ),

  disabledLinkage:
    clientSource.includes(
      "FEMALE_THREAD_ADAPTER_DISABLED_LINKAGE_START"
    ),

  structureAlwaysEnabled:
    clientSource.includes(
      'candidateKey === "filter01"'
    ),

  productType:
    generatedSource.includes(
      '"productTypeId": "female-thread-adapters"'
    ),
};

const failed =
  Object.entries(checks)
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
    "修改检查失败：" +
      failed.join("、")
  );
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "内螺纹互转筛选规则修改完成"
);
console.log(
  "============================================"
);
console.log(
  "连接结构：单选"
);
console.log(
  "二通 / 三通：可互相切换"
);
console.log(
  "螺纹规格：组合联动置灰"
);
console.log(
  "流道内径：组合联动置灰"
);
console.log(
  "材质：组合联动置灰"
);
console.log(
  "颜色：组合联动置灰"
);
console.log("");
