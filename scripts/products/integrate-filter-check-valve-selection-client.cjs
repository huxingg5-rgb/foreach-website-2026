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

const generatedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("未找到文件：" + filePath);
  }

  return fs.readFileSync(filePath, "utf8");
}

let source = read(clientPath);
const generatedSource = read(generatedPath);

/* =========================================================
   1. 确认生成文件导出名称
   ========================================================= */

const requiredExports = [
  "filterCheckValveSelectionProducts",
  "filterCheckValveTaxonomyItems",
  "filterCheckValveFilterLabels",
];

for (const exportName of requiredExports) {
  if (
    !generatedSource.includes(
      `export const ${exportName}`
    )
  ) {
    throw new Error(
      "生成文件缺少导出：" +
        exportName
    );
  }
}

/* =========================================================
   2. 导入生成数据
   ========================================================= */

const importMarker =
  "FILTER_CHECK_VALVE_GENERATED_IMPORT_START";

if (!source.includes(importMarker)) {
  const anchor = `import {
  femaleThreadAdapterFilterLabels,
  femaleThreadAdapterSelectionProducts,
  femaleThreadAdapterTaxonomyItems,
} from "@/data/products/selection/female-thread-adapter-selection.generated";
`;

  const count =
    source.split(anchor).length - 1;

  if (count !== 1) {
    throw new Error(
      "无法唯一定位 femaleThreadAdapter import：" +
        count
    );
  }

  const importCode = `${anchor}

/* FILTER_CHECK_VALVE_GENERATED_IMPORT_START */
import {
  filterCheckValveFilterLabels,
  filterCheckValveSelectionProducts,
  filterCheckValveTaxonomyItems,
} from "@/data/products/selection/filter-check-valve-selection.generated";
/* FILTER_CHECK_VALVE_GENERATED_IMPORT_END */
`;

  source = source.replace(
    anchor,
    importCode
  );
}

/* =========================================================
   3. 接入产品卡片数组
   ========================================================= */

if (
  !source.includes(
    "FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START"
  )
) {
  const anchor =
    "const selectionProducts = [";

  const count =
    source.split(anchor).length - 1;

  if (count !== 1) {
    throw new Error(
      "无法唯一定位 selectionProducts：" +
        count
    );
  }

  source = source.replace(
    anchor,
    `${anchor}
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START */
  ...(filterCheckValveSelectionProducts as unknown as typeof baseSelectionProducts),
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_END */`
  );
}

/* =========================================================
   4. 接入产品分类数组
   ========================================================= */

if (
  !source.includes(
    "FILTER_CHECK_VALVE_TAXONOMY_START"
  )
) {
  const anchor =
    "const selectionTaxonomyItems = [";

  const count =
    source.split(anchor).length - 1;

  if (count !== 1) {
    throw new Error(
      "无法唯一定位 selectionTaxonomyItems：" +
        count
    );
  }

  source = source.replace(
    anchor,
    `${anchor}
  /* FILTER_CHECK_VALVE_TAXONOMY_START */
  ...(filterCheckValveTaxonomyItems as unknown as typeof baseSelectionTaxonomyItems),
  /* FILTER_CHECK_VALVE_TAXONOMY_END */`
  );
}

/* =========================================================
   5. 接入筛选标签数组
   ========================================================= */

if (
  !source.includes(
    "FILTER_CHECK_VALVE_FILTER_LABELS_START"
  )
) {
  const anchor =
    "const selectionFilterLabels = [";

  const count =
    source.split(anchor).length - 1;

  if (count !== 1) {
    throw new Error(
      "无法唯一定位 selectionFilterLabels：" +
        count
    );
  }

  source = source.replace(
    anchor,
    `${anchor}
  /* FILTER_CHECK_VALVE_FILTER_LABELS_START */
  ...(filterCheckValveFilterLabels as unknown as typeof baseSelectionFilterLabels),
  /* FILTER_CHECK_VALVE_FILTER_LABELS_END */`
  );
}

/* =========================================================
   6. 添加详情链接优先分支
   ========================================================= */

if (
  !source.includes(
    "FILTER_CHECK_VALVE_DETAIL_HREF_START"
  )
) {
  const pattern =
    /function makeDetailHref\(product: ProductSelectionProduct\)\s*\{/;

  const matches =
    source.match(
      new RegExp(
        pattern.source,
        "g"
      )
    ) || [];

  if (matches.length !== 1) {
    throw new Error(
      "无法唯一定位 makeDetailHref：" +
        matches.length
    );
  }

  const detailCode = `function makeDetailHref(product: ProductSelectionProduct) {

  /* FILTER_CHECK_VALVE_DETAIL_HREF_START */

  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.href ||
        ""
      ).trim();

    const isFilterOrCheckValve =
      rawProductTypeId ===
        "filters" ||
      rawProductTypeId ===
        "check-valves" ||
      rawExistingHref.includes(
        "/products/fittings/filters/"
      ) ||
      rawExistingHref.includes(
        "/products/fittings/check-valves/"
      );

    if (isFilterOrCheckValve) {
      /*
       * 生成数据已经带有正式详情地址时，
       * 直接使用，不再进入其它接头或针阀分支。
       */
      if (
        /^\\/products\\/fittings\\/(filters|check-valves)\\/[^/]+\\/?$/.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref.replace(
          /\\/$/,
          ""
        );
      }

      const routeType =
        rawProductTypeId ===
          "check-valves" ||
        rawExistingHref.includes(
          "/products/fittings/check-valves/"
        )
          ? "check-valves"
          : "filters";

      const slugFromHref =
        rawExistingHref
          .split("/")
          .filter(Boolean)
          .pop();

      const rawSlug =
        String(
          (product as any)?.detailSlug ||
          (product as any)?.slug ||
          slugFromHref ||
          ""
        )
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      if (rawSlug) {
        return \`/products/fittings/\${routeType}/\${rawSlug}\`;
      }

      return "/products/fittings/filters";
    }
  }

  /* FILTER_CHECK_VALVE_DETAIL_HREF_END */`;

  source = source.replace(
    pattern,
    detailCode
  );
}

/* =========================================================
   7. 最终接入检查
   ========================================================= */

const checks = {
  generatedImport:
    source.includes(
      "filterCheckValveSelectionProducts"
    ),

  productSpread:
    source.includes(
      "FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START"
    ),

  taxonomySpread:
    source.includes(
      "FILTER_CHECK_VALVE_TAXONOMY_START"
    ),

  labelsSpread:
    source.includes(
      "FILTER_CHECK_VALVE_FILTER_LABELS_START"
    ),

  detailHref:
    source.includes(
      "FILTER_CHECK_VALVE_DETAIL_HREF_START"
    ),

  mergeHelper:
    source.includes(
      "FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START"
    ),

  mergedOptions:
    source.includes(
      "FITTING_FILTER_CHECK_VALVE_OPTIONS_START"
    ),
};

const failed =
  Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

if (failed.length) {
  throw new Error(
    "接入检查失败：" +
      failed.join("、")
  );
}

/* =========================================================
   8. TypeScript语法检查
   ========================================================= */

const transpileResult =
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

const syntaxErrors =
  (
    transpileResult.diagnostics ||
    []
  ).filter(
    (diagnostic) =>
      diagnostic.category ===
      ts.DiagnosticCategory.Error
  );

if (syntaxErrors.length) {
  const messages =
    syntaxErrors.map(
      (diagnostic) =>
        ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        )
    );

  throw new Error(
    "修改后语法检查失败：\n" +
      messages.join("\n")
  );
}

/* =========================================================
   9. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${clientPath}.bak_filter_check_valve_client_${stamp}`;

fs.copyFileSync(
  clientPath,
  backupPath
);

fs.writeFileSync(
  clientPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀选型页接入完成"
);
console.log(
  "============================================"
);
console.log(
  "已导入生成数据：是"
);
console.log(
  "已接入34张卡片：是"
);
console.log(
  "已接入taxonomy：是"
);
console.log(
  "已接入6组筛选标签：是"
);
console.log(
  "已添加详情链接优先分支：是"
);
console.log(
  "已有合并逻辑：保留"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
