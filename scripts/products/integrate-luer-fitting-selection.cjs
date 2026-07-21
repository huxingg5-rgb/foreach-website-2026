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

const panelPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

const luerDataPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
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
    ".bak_luer_selection_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    "已备份：" + backupPath
  );
}

function checkSyntax(
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
    (
      result.diagnostics || []
    ).filter(
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

/* =========================================================
   1. 检查鲁尔接头生成数据
   ========================================================= */

const luerDataSource =
  read(luerDataPath);

const productCount =
  (
    luerDataSource.match(
      /"productId":/g
    ) || []
  ).length;

if (productCount !== 151) {
  throw new Error(
    "鲁尔接头产品数量异常：" +
      productCount
  );
}

const requiredExports = [
  "luerFittingSelectionProducts",
  "luerFittingSelectionFilterLabels",
  "luerFittingSelectionTaxonomyItems",
];

for (
  const exportName
  of requiredExports
) {
  if (
    !luerDataSource.includes(
      exportName
    )
  ) {
    throw new Error(
      "鲁尔接头数据缺少导出：" +
        exportName
    );
  }
}

/* =========================================================
   2. 接入 ProductSelectionClient
   ========================================================= */

let clientSource =
  read(clientPath);

backup(clientPath);

const luerImport = `import {
  luerFittingSelectionFilterLabels,
  luerFittingSelectionProducts,
  luerFittingSelectionTaxonomyItems,
} from "@/data/products/selection/luer-fitting-selection.generated";`;

if (
  !clientSource.includes(
    "luerFittingSelectionProducts"
  )
) {
  const importAnchor = `import {
  threadToBarbedFittingFilterLabels,
  threadToBarbedFittingSelectionProducts,
  threadToBarbedFittingTaxonomyItems,
} from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";`;

  if (
    !clientSource.includes(
      importAnchor
    )
  ) {
    throw new Error(
      "没有找到螺纹转倒刺 import 锚点。"
    );
  }

  clientSource =
    clientSource.replace(
      importAnchor,
      importAnchor +
        "\n\n" +
        luerImport
    );
}

function insertArraySpread(
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

  const anchor =
    `const ${arrayName} = [`;

  if (
    !source.includes(anchor)
  ) {
    throw new Error(
      `没有找到数组：${arrayName}`
    );
  }

  return source.replace(
    anchor,
    `${anchor}
  ${spreadCode}`
  );
}

clientSource =
  insertArraySpread(
    clientSource,
    "selectionProducts",
    "luerFittingSelectionProducts"
  );

clientSource =
  insertArraySpread(
    clientSource,
    "selectionTaxonomyItems",
    "luerFittingSelectionTaxonomyItems"
  );

clientSource =
  insertArraySpread(
    clientSource,
    "selectionFilterLabels",
    "luerFittingSelectionFilterLabels"
  );

checkSyntax(
  clientPath,
  clientSource
);

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

/* =========================================================
   3. 鲁尔接头筛选布局
   ========================================================= */

let panelSource =
  read(panelPath);

backup(panelPath);

if (
  !panelSource.includes(
    "LUER_FITTING_FILTER_LAYOUT_START"
  )
) {
  const layoutAnchor =
    "          const shouldUseTwoColumns =";

  if (
    !panelSource.includes(
      layoutAnchor
    )
  ) {
    throw new Error(
      "没有找到筛选列数判断锚点。"
    );
  }

  const luerLayoutCode = `          /*
           * LUER_FITTING_FILTER_LAYOUT_START
           *
           * 鲁尔接头：
           * filter01 产品类型文字较长，每项独占一行；
           * filter02 产品系列使用两列。
           */
          const isLuerFitting =
            activeProductTypeId ===
            "luer-fittings";

          const shouldUseTwoColumns =
            isLuerFitting &&
            group.key === "filter01"
              ? false
              : isLuerFitting &&
                  group.key === "filter02"
                ? true
                :`;

  panelSource =
    panelSource.replace(
      layoutAnchor,
      luerLayoutCode
    );
}

checkSyntax(
  panelPath,
  panelSource
);

fs.writeFileSync(
  panelPath,
  panelSource,
  "utf8"
);

/* =========================================================
   4. 接入结果检查
   ========================================================= */

const checks = {
  import:
    clientSource.includes(
      "luer-fitting-selection.generated"
    ),

  products:
    clientSource.includes(
      "...luerFittingSelectionProducts,"
    ),

  taxonomy:
    clientSource.includes(
      "...luerFittingSelectionTaxonomyItems,"
    ),

  filters:
    clientSource.includes(
      "...luerFittingSelectionFilterLabels,"
    ),

  layout:
    panelSource.includes(
      "LUER_FITTING_FILTER_LAYOUT_START"
    ),
};

const failedChecks =
  Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

if (failedChecks.length) {
  throw new Error(
    "接入检查失败：" +
      failedChecks.join("、")
  );
}

console.log("");
console.log("============================================");
console.log("鲁尔接头筛选页面接入完成");
console.log("============================================");
console.log(
  "鲁尔接头产品：" +
    productCount
);
console.log(
  "产品数据合并：完成"
);
console.log(
  "筛选标签合并：完成"
);
console.log(
  "产品分类合并：完成"
);
console.log(
  "产品类型单列布局：完成"
);
console.log("");
console.log(
  "本步骤未创建详情页。"
);
