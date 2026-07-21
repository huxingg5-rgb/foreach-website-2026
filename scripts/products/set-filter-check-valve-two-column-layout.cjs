const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到文件：" + targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const functionPattern =
  /function getProductFilterGroupLayout\([\s\S]*?\n\}/;

const matches =
  source.match(
    new RegExp(
      functionPattern.source,
      "g"
    )
  ) || [];

if (matches.length !== 1) {
  throw new Error(
    "无法唯一定位 getProductFilterGroupLayout：" +
      matches.length
  );
}

const newFunction = `function getProductFilterGroupLayout(
  productTypeId: string,
  filterKey: SelectionFilterKey
): ProductSelectionFilterGroup["layout"] | undefined {
  /*
   * 过滤器与单向阀筛选页：
   * 从“产品类型”开始，所有筛选选项统一两个一排。
   *
   * 包括：
   * filter01 产品类型
   * filter02 过滤器类型
   * filter03 滤网材质
   * filter04 过滤精度
   * filter05 密封类型
   * filter06 膜片材质
   * filter07 接管内径 / 螺纹类型
   * filter08 材质
   * filter09 颜色
   */
  if (
    productTypeId ===
    "filters"
  ) {
    return "two";
  }

  /*
   * 保留螺纹转倒刺接头原有布局。
   */
  if (
    productTypeId !==
    "thread-to-barbed-fittings"
  ) {
    return undefined;
  }

  if (
    filterKey ===
    "filter02"
  ) {
    return "one";
  }

  if (
    filterKey ===
    "filter01"
  ) {
    return "two";
  }

  return undefined;
}`;

source = source.replace(
  functionPattern,
  newFunction
);

const checks = {
  filtersTwo:
    source.includes(
      'productTypeId ===\n    "filters"'
    ),

  returnTwo:
    source.includes(
      'return "two";'
    ),

  threadToBarbedPreserved:
    source.includes(
      '"thread-to-barbed-fittings"'
    ),
};

const failed =
  Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

if (failed.length) {
  throw new Error(
    "修改检查失败：" +
      failed.join("、")
  );
}

const result =
  ts.transpileModule(
    source,
    {
      compilerOptions: {
        target:
          ts.ScriptTarget.ES2022,

        module:
          ts.ModuleKind.ESNext,

        jsx:
          ts.JsxEmit.Preserve,
      },

      reportDiagnostics:
        true,

      fileName:
        "ProductSelectionClient.tsx",
    }
  );

const errors =
  (
    result.diagnostics ||
    []
  ).filter(
    (diagnostic) =>
      diagnostic.category ===
      ts.DiagnosticCategory.Error
  );

if (errors.length) {
  throw new Error(
    "修改后语法检查失败：\n" +
      errors
        .map(
          (diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
        )
        .join("\n")
  );
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${targetPath}.bak_filter_two_columns_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀筛选布局修改完成"
);
console.log(
  "============================================"
);
console.log(
  "产品类型及以下筛选：两个一排"
);
console.log(
  "螺纹转倒刺原有布局：保留"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
