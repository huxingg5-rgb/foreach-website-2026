const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const selectionGeneratedPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "filter-check-valve-selection.generated.ts"
);

const filterDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "filters",
  "detail",
  "index.json"
);

const checkValveDetailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "check-valves",
  "detail",
  "index.json"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const routePath = path.join(
  root,
  "app",
  "products",
  "[category]",
  "[slug]",
  "[seriesSlug]",
  "page.tsx"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "filter-check-valve-integration-report.json"
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

function countOccurrences(
  source,
  value
) {
  if (!value) {
    return 0;
  }

  return source
    .split(value)
    .length - 1;
}

function insertBefore(
  source,
  anchor,
  insertion,
  description
) {
  const count =
    countOccurrences(
      source,
      anchor
    );

  if (count !== 1) {
    throw new Error(
      `${description}定位异常：${count}`
    );
  }

  return source.replace(
    anchor,
    insertion + anchor
  );
}

function insertAfterRegex(
  source,
  pattern,
  insertion,
  description
) {
  const matches = [
    ...source.matchAll(pattern),
  ];

  if (matches.length !== 1) {
    throw new Error(
      `${description}定位异常：${matches.length}`
    );
  }

  const match =
    matches[0];

  const start =
    match.index;

  const end =
    start +
    match[0].length;

  return (
    source.slice(0, end) +
    insertion +
    source.slice(end)
  );
}

function replaceOnce(
  source,
  target,
  replacement,
  description
) {
  const count =
    countOccurrences(
      source,
      target
    );

  if (count !== 1) {
    throw new Error(
      `${description}定位异常：${count}`
    );
  }

  return source.replace(
    target,
    replacement
  );
}

function validateTsx(
  filePath,
  source
) {
  const result =
    ts.transpileModule(
      source,
      {
        fileName:
          filePath,

        reportDiagnostics:
          true,

        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          moduleResolution:
            ts.ModuleResolutionKind.Bundler,

          jsx:
            ts.JsxEmit.ReactJSX,

          resolveJsonModule:
            true,

          esModuleInterop:
            true,

          allowSyntheticDefaultImports:
            true,
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
      .map(
        (item) =>
          ts.flattenDiagnosticMessageText(
            item.messageText,
            "\n"
          )
      )
      .join("\n")
  );
}

function extractJsonArray(
  source,
  exportName
) {
  const declarationPattern =
    new RegExp(
      `export\\s+const\\s+${exportName}\\s*=`
    );

  const match =
    source.match(
      declarationPattern
    );

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `未找到导出数组：${exportName}`
    );
  }

  const start =
    source.indexOf(
      "[",
      match.index +
      match[0].length
    );

  if (start < 0) {
    throw new Error(
      `未找到数组开始位置：${exportName}`
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = start;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'"
    ) {
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return JSON.parse(
          source.slice(
            start,
            index + 1
          )
        );
      }
    }
  }

  throw new Error(
    `数组没有正常结束：${exportName}`
  );
}

function backup(
  filePath,
  stamp
) {
  const backupPath =
    `${filePath}.bak_filter_check_valve_integration_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

/* =========================================================
   1. 检查生成数据
   ========================================================= */

const generatedSource =
  read(
    selectionGeneratedPath
  );

const selectionProducts =
  extractJsonArray(
    generatedSource,
    "filterCheckValveSelectionProducts"
  );

const selectionFilterLabels =
  extractJsonArray(
    generatedSource,
    "filterCheckValveFilterLabels"
  );

const selectionTaxonomyItems =
  extractJsonArray(
    generatedSource,
    "filterCheckValveTaxonomyItems"
  );

const filterDetails =
  JSON.parse(
    read(
      filterDetailPath
    )
  );

const checkValveDetails =
  JSON.parse(
    read(
      checkValveDetailPath
    )
  );

if (
  selectionProducts.length !== 34
) {
  throw new Error(
    `选型数量异常：${selectionProducts.length}/34`
  );
}

if (
  filterDetails.length !== 18
) {
  throw new Error(
    `过滤器详情数量异常：${filterDetails.length}/18`
  );
}

if (
  checkValveDetails.length !== 16
) {
  throw new Error(
    `单向阀详情数量异常：${checkValveDetails.length}/16`
  );
}

const detailRouteKeys = [
  ...filterDetails.map(
    (item) =>
      `filters/${item.slug}`
  ),

  ...checkValveDetails.map(
    (item) =>
      `check-valves/${item.slug}`
  ),
];

if (
  new Set(
    detailRouteKeys
  ).size !==
  detailRouteKeys.length
) {
  throw new Error(
    "过滤器与单向阀详情路由存在重复。"
  );
}

/* =========================================================
   2. 检查合并入口仍然存在
   ========================================================= */

const routeMapSource =
  read(routeMapPath);

if (
  !routeMapSource.includes(
    "过滤器与单向阀"
  ) ||
  !routeMapSource.includes(
    '"filters"'
  )
) {
  throw new Error(
    "product-route-map.ts 中未找到过滤器与单向阀合并入口。"
  );
}

/* =========================================================
   3. 接入 ProductSelectionClient
   ========================================================= */

let clientSource =
  read(clientPath);

const selectionImportMarker =
  "FILTER_CHECK_VALVE_SELECTION_IMPORT_START";

if (
  !clientSource.includes(
    selectionImportMarker
  )
) {
  const importBlock = `/* FILTER_CHECK_VALVE_SELECTION_IMPORT_START */
import {
  filterCheckValveFilterLabels,
  filterCheckValveSelectionProducts,
  filterCheckValveTaxonomyItems,
} from "@/data/products/selection/filter-check-valve-selection.generated";
/* FILTER_CHECK_VALVE_SELECTION_IMPORT_END */

`;

  clientSource =
    insertBefore(
      clientSource,
      'import ProductCardGrid from "./ProductCardGrid";',
      importBlock,
      "选型数据import"
    );
}

const productSpreadMarker =
  "FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START";

if (
  !clientSource.includes(
    productSpreadMarker
  )
) {
  const insertion = `
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_START */
  ...(
    filterCheckValveSelectionProducts
      as unknown as typeof baseSelectionProducts
  ),
  /* FILTER_CHECK_VALVE_SELECTION_PRODUCTS_END */
`;

  clientSource =
    insertAfterRegex(
      clientSource,
      /const\s+selectionProducts\s*=\s*\[/g,
      insertion,
      "selectionProducts数组"
    );
}

const taxonomySpreadMarker =
  "FILTER_CHECK_VALVE_TAXONOMY_START";

if (
  !clientSource.includes(
    taxonomySpreadMarker
  )
) {
  const insertion = `
  /* FILTER_CHECK_VALVE_TAXONOMY_START */
  ...(
    filterCheckValveTaxonomyItems
      as unknown as typeof baseSelectionTaxonomyItems
  ),
  /* FILTER_CHECK_VALVE_TAXONOMY_END */
`;

  clientSource =
    insertAfterRegex(
      clientSource,
      /const\s+selectionTaxonomyItems\s*=\s*\[/g,
      insertion,
      "selectionTaxonomyItems数组"
    );
}

const labelsSpreadMarker =
  "FILTER_CHECK_VALVE_FILTER_LABELS_START";

if (
  !clientSource.includes(
    labelsSpreadMarker
  )
) {
  const insertion = `
  /* FILTER_CHECK_VALVE_FILTER_LABELS_START */
  ...(
    filterCheckValveFilterLabels
      as unknown as typeof baseSelectionFilterLabels
  ),
  /* FILTER_CHECK_VALVE_FILTER_LABELS_END */
`;

  clientSource =
    insertAfterRegex(
      clientSource,
      /const\s+selectionFilterLabels\s*=\s*\[/g,
      insertion,
      "selectionFilterLabels数组"
    );
}

/*
 * 过滤器、单向阀卡片优先使用生成数据中的具体详情地址，
 * 防止通用逻辑将地址改回筛选页。
 */
const hrefMarker =
  "FILTER_CHECK_VALVE_DETAIL_HREF_START";

if (
  !clientSource.includes(
    hrefMarker
  )
) {
  const insertion = `

  /* FILTER_CHECK_VALVE_DETAIL_HREF_START */

  {
    const rawProductTypeId =
      String(
        (product as any)
          ?.productTypeId ||
        ""
      ).trim();

    const isFilterOrCheckValve =
      rawProductTypeId ===
        "filters" ||
      rawProductTypeId ===
        "check-valves";

    if (isFilterOrCheckValve) {
      const rawExistingHref =
        String(
          (product as any)
            ?.detailHref ||
          (product as any)
            ?.href ||
          ""
        ).trim();

      if (
        rawExistingHref.startsWith(
          "/products/fittings/filters/"
        ) ||
        rawExistingHref.startsWith(
          "/products/fittings/check-valves/"
        )
      ) {
        return rawExistingHref;
      }

      const rawDetailSlug =
        String(
          (product as any)
            ?.detailSlug ||
          (product as any)
            ?.slug ||
          ""
        )
          .trim()
          .toLowerCase();

      if (rawDetailSlug) {
        return (
          \`/products/fittings/\${rawProductTypeId}/\${rawDetailSlug}\`
        );
      }

      return (
        "/products/fittings/filters"
      );
    }
  }

  /* FILTER_CHECK_VALVE_DETAIL_HREF_END */
`;

  clientSource =
    insertAfterRegex(
      clientSource,
      /function\s+makeDetailHref\s*\(\s*product:\s*ProductSelectionProduct\s*\)\s*\{/g,
      insertion,
      "makeDetailHref函数"
    );
}

/*
 * 确认此前的合并逻辑仍然存在。
 */
const requiredClientMarkers = [
  "FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START",
  "FITTING_FILTER_CHECK_VALVE_OPTIONS_START",
  selectionImportMarker,
  productSpreadMarker,
  taxonomySpreadMarker,
  labelsSpreadMarker,
  hrefMarker,
];

for (
  const marker
  of requiredClientMarkers
) {
  if (
    !clientSource.includes(
      marker
    )
  ) {
    throw new Error(
      `ProductSelectionClient缺少标记：${marker}`
    );
  }
}

/* =========================================================
   4. 接入三级动态详情路由
   ========================================================= */

let routeSource =
  read(routePath);

const routeImportMarker =
  "FILTER_CHECK_VALVE_DETAIL_IMPORT_START";

if (
  !routeSource.includes(
    routeImportMarker
  )
) {
  const importBlock = `/* FILTER_CHECK_VALVE_DETAIL_IMPORT_START */
import filterDetailsJson from "@/data/products/generated/fittings/filters/detail/index.json";
import checkValveDetailsJson from "@/data/products/generated/fittings/check-valves/detail/index.json";
/* FILTER_CHECK_VALVE_DETAIL_IMPORT_END */

`;

  routeSource =
    insertBefore(
      routeSource,
      'import "../../../products.css";',
      importBlock,
      "详情JSON import"
    );
}

const collectionMarker =
  "FILTER_CHECK_VALVE_DETAIL_COLLECTION_START";

if (
  !routeSource.includes(
    collectionMarker
  )
) {
  const collectionCode = `/* FILTER_CHECK_VALVE_DETAIL_COLLECTION_START */

const filterDetails =
  filterDetailsJson as FittingDetailRecord[];

const checkValveDetails =
  checkValveDetailsJson as FittingDetailRecord[];

/* FILTER_CHECK_VALVE_DETAIL_COLLECTION_END */


`;

  routeSource =
    insertBefore(
      routeSource,
      "const ProductDetailView =",
      collectionCode,
      "详情集合定义"
    );
}

const resolveMarker =
  "FILTER_CHECK_VALVE_DETAIL_RESOLVE_START";

if (
  !routeSource.includes(
    resolveMarker
  )
) {
  const resolveCode = `  /* FILTER_CHECK_VALVE_DETAIL_RESOLVE_START */

  if (
    slug ===
    "filters"
  ) {
    const detail =
      findDetailInCollection(
        filterDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "filters",
          fallbackName:
            "过滤器",
        }
      : null;
  }

  if (
    slug ===
    "check-valves"
  ) {
    const detail =
      findDetailInCollection(
        checkValveDetails,
        seriesSlug
      );

    return detail
      ? {
          detail,
          productTypeId:
            "check-valves",
          fallbackName:
            "单向阀",
        }
      : null;
  }

  /* FILTER_CHECK_VALVE_DETAIL_RESOLVE_END */

`;

  routeSource =
    insertBefore(
      routeSource,
      "  /* LUER_FEMALE_DETAIL_RESOLVE_END */",
      resolveCode,
      "findFittingDetail分支"
    );
}

const staticDeclarationMarker =
  "FILTER_CHECK_VALVE_STATIC_PARAMS_START";

if (
  !routeSource.includes(
    staticDeclarationMarker
  )
) {
  const staticCode = `  /* FILTER_CHECK_VALVE_STATIC_PARAMS_START */

  const filterParams =
    filterDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "filters",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const checkValveParams =
    checkValveDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "check-valves",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  /* FILTER_CHECK_VALVE_STATIC_PARAMS_END */

`;

  const generateStart =
    routeSource.indexOf(
      "export function generateStaticParams()"
    );

  if (generateStart < 0) {
    throw new Error(
      "未找到generateStaticParams函数。"
    );
  }

  const routeMapAnchor =
    routeSource.indexOf(
      "  const routeMap =",
      generateStart
    );

  if (routeMapAnchor < 0) {
    throw new Error(
      "未找到generateStaticParams中的routeMap。"
    );
  }

  routeSource =
    routeSource.slice(
      0,
      routeMapAnchor
    ) +
    staticCode +
    routeSource.slice(
      routeMapAnchor
    );
}

const staticSpreadMarker =
  "FILTER_CHECK_VALVE_STATIC_SPREAD_START";

if (
  !routeSource.includes(
    staticSpreadMarker
  )
) {
  const oldSpread =
    `    ...femaleThreadParams,
`;

  const newSpread =
    `    ...femaleThreadParams,

    /* FILTER_CHECK_VALVE_STATIC_SPREAD_START */
    ...filterParams,
    ...checkValveParams,
    /* FILTER_CHECK_VALVE_STATIC_SPREAD_END */
`;

  routeSource =
    replaceOnce(
      routeSource,
      oldSpread,
      newSpread,
      "静态参数合并数组"
    );
}

/* =========================================================
   5. 最终检查
   ========================================================= */

const requiredRouteMarkers = [
  routeImportMarker,
  collectionMarker,
  resolveMarker,
  staticDeclarationMarker,
  staticSpreadMarker,
];

for (
  const marker
  of requiredRouteMarkers
) {
  if (
    !routeSource.includes(
      marker
    )
  ) {
    throw new Error(
      `三级详情路由缺少标记：${marker}`
    );
  }
}

const routeChecks = {
  filterImport:
    routeSource.includes(
      "filterDetailsJson"
    ),

  checkValveImport:
    routeSource.includes(
      "checkValveDetailsJson"
    ),

  filterResolve:
    routeSource.includes(
      'slug ===\n    "filters"'
    ),

  checkValveResolve:
    routeSource.includes(
      'slug ===\n    "check-valves"'
    ),

  filterStatic:
    routeSource.includes(
      "const filterParams ="
    ),

  checkValveStatic:
    routeSource.includes(
      "const checkValveParams ="
    ),

  filterSpread:
    routeSource.includes(
      "...filterParams"
    ),

  checkValveSpread:
    routeSource.includes(
      "...checkValveParams"
    ),
};

const failedRouteChecks =
  Object.entries(
    routeChecks
  )
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (
  failedRouteChecks.length
) {
  throw new Error(
    "路由检查失败：" +
      failedRouteChecks.join("、")
  );
}

validateTsx(
  clientPath,
  clientSource
);

validateTsx(
  routePath,
  routeSource
);

/* =========================================================
   6. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const clientBackup =
  backup(
    clientPath,
    stamp
  );

const routeBackup =
  backup(
    routePath,
    stamp
  );

write(
  clientPath,
  clientSource
);

write(
  routePath,
  routeSource
);

/* =========================================================
   7. 输出报告
   ========================================================= */

const report = {
  generatedAt:
    new Date().toISOString(),

  counts: {
    selectionProducts:
      selectionProducts.length,

    selectionFilterLabels:
      selectionFilterLabels.length,

    selectionTaxonomyItems:
      selectionTaxonomyItems.length,

    filterDetails:
      filterDetails.length,

    checkValveDetails:
      checkValveDetails.length,

    staticDetailRoutes:
      filterDetails.length +
      checkValveDetails.length,
  },

  modifiedFiles: [
    clientPath,
    routePath,
  ],

  backups: {
    clientBackup,
    routeBackup,
  },

  routeChecks,

  examples: {
    selection:
      "/products/fittings/filters",

    filter:
      `/products/fittings/filters/${filterDetails[0].slug}`,

    checkValve:
      `/products/fittings/check-valves/${checkValveDetails[0].slug}`,

    filterComponent:
      "/products/fittings/filters/filter-component-139009",
  },
};

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  JSON.stringify(
    report,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀页面接入完成"
);
console.log(
  "============================================"
);
console.log(
  "选型卡片：",
  selectionProducts.length
);
console.log(
  "过滤器详情：",
  filterDetails.length
);
console.log(
  "单向阀详情：",
  checkValveDetails.length
);
console.log(
  "静态详情路由：",
  filterDetails.length +
    checkValveDetails.length
);
console.log(
  "TSX语法检查：通过"
);
console.log("");
console.log(
  "选型页："
);
console.log(
  "/products/fittings/filters"
);
console.log("");
console.log(
  "过滤器示例："
);
console.log(
  `/products/fittings/filters/${filterDetails[0].slug}`
);
console.log("");
console.log(
  "单向阀示例："
);
console.log(
  `/products/fittings/check-valves/${checkValveDetails[0].slug}`
);
console.log("");
console.log(
  "接入报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "ProductSelectionClient备份："
);
console.log(
  clientBackup
);
console.log("");
console.log(
  "三级详情路由备份："
);
console.log(
  routeBackup
);
console.log("");
