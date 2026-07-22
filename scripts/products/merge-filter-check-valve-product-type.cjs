const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
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

function validateTypeScript(
  filePath,
  source,
  jsx = false
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
            jsx
              ? ts.JsxEmit.ReactJSX
              : ts.JsxEmit.Preserve,

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

function findPropertyRange(
  source,
  propertyName
) {
  const escapedName =
    propertyName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const pattern =
    new RegExp(
      `^\\s{4}"${escapedName}"\\s*:\\s*\\{`,
      "m"
    );

  const match =
    source.match(pattern);

  if (
    !match ||
    match.index == null
  ) {
    throw new Error(
      `没有找到 productTypes.${propertyName}`
    );
  }

  const propertyStart =
    match.index;

  const braceStart =
    source.indexOf(
      "{",
      propertyStart
    );

  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = braceStart;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    const next =
      source[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }

      continue;
    }

    if (blockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        blockComment = false;
        index += 1;
      }

      continue;
    }

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
      char === "/" &&
      next === "/"
    ) {
      lineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      blockComment = true;
      index += 1;
      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        let end =
          index + 1;

        while (
          end < source.length &&
          /[ \t]/.test(
            source[end]
          )
        ) {
          end += 1;
        }

        if (
          source[end] === ","
        ) {
          end += 1;
        }

        while (
          end < source.length &&
          /[ \t]/.test(
            source[end]
          )
        ) {
          end += 1;
        }

        if (
          source.slice(
            end,
            end + 2
          ) === "\r\n"
        ) {
          end += 2;
        } else if (
          source[end] === "\n"
        ) {
          end += 1;
        }

        return {
          start:
            propertyStart,
          end,
        };
      }
    }
  }

  throw new Error(
    `${propertyName} 对象没有正常结束。`
  );
}

function removeProperty(
  source,
  propertyName
) {
  const range =
    findPropertyRange(
      source,
      propertyName
    );

  return (
    source.slice(
      0,
      range.start
    ) +
    source.slice(
      range.end
    )
  );
}

function replaceProperty(
  source,
  propertyName,
  replacement
) {
  const range =
    findPropertyRange(
      source,
      propertyName
    );

  return (
    source.slice(
      0,
      range.start
    ) +
    replacement +
    source.slice(
      range.end
    )
  );
}

function replaceOnceAfter(
  source,
  startMarker,
  pattern,
  replacement,
  description
) {
  const start =
    source.indexOf(
      startMarker
    );

  if (start < 0) {
    throw new Error(
      `没有找到起始位置：${startMarker}`
    );
  }

  const before =
    source.slice(
      0,
      start
    );

  const after =
    source.slice(
      start
    );

  const matches =
    after.match(pattern);

  if (
    !matches ||
    matches.index == null
  ) {
    throw new Error(
      `没有找到：${description}`
    );
  }

  const matchedStart =
    start +
    matches.index;

  return (
    source.slice(
      0,
      matchedStart
    ) +
    after
      .slice(
        matches.index
      )
      .replace(
        pattern,
        replacement
      )
  );
}

/* =========================================================
   1. 修改 product-route-map.ts
   ========================================================= */

let routeSource =
  read(routeMapPath);

/*
 * 删除顶层堵头入口。
 * 不会影响 barbed-fittings 中的倒刺堵头产品。
 */
routeSource =
  removeProperty(
    routeSource,
    "plugs"
  );

/*
 * 删除单向阀独立入口。
 * 实际产品数据仍然保留 check-valves ID。
 */
routeSource =
  removeProperty(
    routeSource,
    "check-valves"
  );

/*
 * 保留 filters 作为合并入口的内部ID，
 * 避免新建未知路由。
 */
const mergedRouteBlock = `    "filters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "filters",
      label: "过滤器与单向阀",
      title: "过滤器与单向阀 | FOREACH",
      description:
        "过滤器用于液路中的颗粒拦截与流体净化，单向阀用于控制流体单向流动并降低回流风险。",
    },
`;

routeSource =
  replaceProperty(
    routeSource,
    "filters",
    mergedRouteBlock
  );

const oldCategoryDescription =
  "恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头、堵头、过滤器和单向阀。";

const newCategoryDescription =
  "恒永达接头产品覆盖硬管接头、软管接头、鲁尔接头、快插接头、内螺纹互转接头，以及过滤器与单向阀。";

if (
  routeSource.includes(
    oldCategoryDescription
  )
) {
  routeSource =
    routeSource.replace(
      oldCategoryDescription,
      newCategoryDescription
    );
}

/* =========================================================
   2. 修改 ProductSelectionClient.tsx
   ========================================================= */

let clientSource =
  read(clientPath);

const helperMarker =
  "FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START";

if (
  !clientSource.includes(
    helperMarker
  )
) {
  const componentMarker =
    "export default function ProductSelectionClient";

  const componentIndex =
    clientSource.indexOf(
      componentMarker
    );

  if (componentIndex < 0) {
    throw new Error(
      "没有找到 ProductSelectionClient 组件入口。"
    );
  }

  const helperCode = `
/* =========================================================
   FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_START

   左侧只显示 filters 一个入口，
   但该入口同时匹配：
   - filters
   - check-valves
   ========================================================= */

const FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID =
  "filters";

const FITTING_CHECK_VALVE_SOURCE_TYPE_ID =
  "check-valves";

function matchesActiveProductType(
  categoryId: string,
  activeProductTypeId: string,
  productTypeId: string
) {
  if (!activeProductTypeId) {
    return true;
  }

  if (
    categoryId ===
      "fittings" &&
    activeProductTypeId ===
      FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID
  ) {
    return (
      productTypeId ===
        FITTING_FILTER_AND_CHECK_VALVE_TYPE_ID ||
      productTypeId ===
        FITTING_CHECK_VALVE_SOURCE_TYPE_ID
    );
  }

  return (
    productTypeId ===
    activeProductTypeId
  );
}

/* FITTING_FILTER_CHECK_VALVE_MERGE_HELPER_END */


`;

  clientSource =
    clientSource.slice(
      0,
      componentIndex
    ) +
    helperCode +
    clientSource.slice(
      componentIndex
    );
}

/*
 * 在产品种类选项生成结束前：
 * 1. 删除堵头；
 * 2. 删除单向阀独立入口；
 * 3. 把过滤器改名为过滤器与单向阀。
 */
const optionsMarker =
  "FITTING_FILTER_CHECK_VALVE_OPTIONS_START";

if (
  !clientSource.includes(
    optionsMarker
  )
) {
  const productTypeStart =
    clientSource.indexOf(
      "const productTypeOptions = useMemo"
    );

  if (productTypeStart < 0) {
    throw new Error(
      "没有找到 productTypeOptions。"
    );
  }

  const returnMarker =
    "    return Array.from(optionMap.values());";

  const returnIndex =
    clientSource.indexOf(
      returnMarker,
      productTypeStart
    );

  if (returnIndex < 0) {
    throw new Error(
      "没有找到 productTypeOptions 的返回位置。"
    );
  }

  const optionsCode = `    /* FITTING_FILTER_CHECK_VALVE_OPTIONS_START */

    if (
      activeCategoryId ===
      "fittings"
    ) {
      /*
       * 顶层不再显示堵头。
       */
      optionMap.delete(
        "plugs"
      );

      /*
       * 单向阀不再独立显示，
       * 后续由 filters 合并入口承接。
       */
      optionMap.delete(
        "check-valves"
      );

      const filterOption =
        optionMap.get(
          "filters"
        );

      if (filterOption) {
        optionMap.set(
          "filters",
          {
            ...filterOption,

            label:
              locale === "zh"
                ? "过滤器与单向阀"
                : "Filters & Check Valves",
          }
        );
      }
    }

    /* FITTING_FILTER_CHECK_VALVE_OPTIONS_END */

`;

  clientSource =
    clientSource.slice(
      0,
      returnIndex
    ) +
    optionsCode +
    clientSource.slice(
      returnIndex
    );
}

/*
 * 当前产品类型对应的数据：
 * filters 入口同时包含 filters 和 check-valves。
 */
clientSource =
  replaceOnceAfter(
    clientSource,
    "const currentTypeProducts = useMemo",
    /return categoryProducts\.filter\(\(product\) => \{\s*return product\.productTypeId === activeProductTypeId;\s*\}\);/,
    `return categoryProducts.filter(
      (product) =>
        matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
          )
        )
    );`,
    "currentTypeProducts 的产品类型判断"
  );

/*
 * 最终卡片匹配也使用同一套合并规则。
 */
clientSource =
  replaceOnceAfter(
    clientSource,
    "const matchedProducts = useMemo",
    /if \(activeProductTypeId && product\.productTypeId !== activeProductTypeId\) \{\s*return false;\s*\}/,
    `if (
        !matchesActiveProductType(
          activeCategoryId,
          activeProductTypeId,
          String(
            product.productTypeId ||
            ""
          )
        )
      ) {
        return false;
      }`,
    "matchedProducts 的产品类型判断"
  );

/* =========================================================
   3. 修改结果验证
   ========================================================= */

const checks = {
  routePlugRemoved:
    !routeSource.includes(
      '    "plugs": {'
    ),

  routeCheckValveRemoved:
    !routeSource.includes(
      '    "check-valves": {'
    ),

  mergedRouteLabel:
    routeSource.includes(
      'label: "过滤器与单向阀"'
    ),

  filterIdPreserved:
    routeSource.includes(
      'productTypeId: "filters"'
    ),

  clientHelper:
    clientSource.includes(
      helperMarker
    ),

  clientOptions:
    clientSource.includes(
      optionsMarker
    ),

  clientDeletesPlug:
    clientSource.includes(
      'optionMap.delete(\n        "plugs"'
    ),

  clientDeletesCheckValve:
    clientSource.includes(
      'optionMap.delete(\n        "check-valves"'
    ),

  combinedMatch:
    clientSource.includes(
      "FITTING_CHECK_VALVE_SOURCE_TYPE_ID"
    ),

  finalLabel:
    clientSource.includes(
      '"过滤器与单向阀"'
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
    "修改结果检查失败：" +
      failed.join("、")
  );
}

validateTypeScript(
  routeMapPath,
  routeSource,
  false
);

validateTypeScript(
  clientPath,
  clientSource,
  true
);

/* =========================================================
   4. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const routeBackup =
  `${routeMapPath}.bak_merge_filter_check_valve_${stamp}`;

const clientBackup =
  `${clientPath}.bak_merge_filter_check_valve_${stamp}`;

fs.copyFileSync(
  routeMapPath,
  routeBackup
);

fs.copyFileSync(
  clientPath,
  clientBackup
);

fs.writeFileSync(
  routeMapPath,
  routeSource,
  "utf8"
);

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "接头产品种类合并完成"
);
console.log(
  "============================================"
);
console.log(
  "已删除顶层入口：堵头"
);
console.log(
  "已删除独立入口：单向阀"
);
console.log(
  "合并入口：过滤器与单向阀"
);
console.log(
  "合并入口内部ID：filters"
);
console.log(
  "该入口同时匹配：filters、check-valves"
);
console.log(
  "倒刺堵头产品数据：未删除"
);
console.log(
  "TypeScript语法检查：通过"
);
console.log("");
console.log(
  "路由配置备份："
);
console.log(
  routeBackup
);
console.log("");
console.log(
  "筛选组件备份："
);
console.log(
  clientBackup
);
console.log("");
