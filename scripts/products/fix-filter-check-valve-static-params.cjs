const fs = require("fs");
const path = require("path");

const root = process.cwd();

const routePath = path.join(
  root,
  "app",
  "products",
  "[category]",
  "[slug]",
  "[seriesSlug]",
  "page.tsx"
);

if (!fs.existsSync(routePath)) {
  throw new Error(
    "未找到三级动态路由文件：" +
      routePath
  );
}

let source = fs.readFileSync(
  routePath,
  "utf8"
);

/*
 * 详情集合必须已经接入。
 * 若不存在，停止修改，避免写入无效变量。
 */
if (
  !source.includes(
    "const filterDetails"
  )
) {
  throw new Error(
    "当前路由文件中没有找到 const filterDetails，请先检查详情JSON是否已接入。"
  );
}

if (
  !source.includes(
    "const checkValveDetails"
  )
) {
  throw new Error(
    "当前路由文件中没有找到 const checkValveDetails，请先检查详情JSON是否已接入。"
  );
}

const declarationMarker =
  "FILTER_CHECK_VALVE_STATIC_PARAMS_START";

const spreadMarker =
  "FILTER_CHECK_VALVE_STATIC_SPREAD_START";

/* =========================================================
   1. 添加静态参数定义
   ========================================================= */

if (
  !source.includes(
    declarationMarker
  )
) {
  const anchor =
    `  const routeMap =
    new Map<`;

  const anchorCount =
    source.split(anchor).length - 1;

  if (anchorCount !== 1) {
    throw new Error(
      "无法唯一定位 generateStaticParams() 中的 routeMap：" +
        anchorCount
    );
  }

  const code = `  /* FILTER_CHECK_VALVE_STATIC_PARAMS_START */

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

  source = source.replace(
    anchor,
    code + anchor
  );
}

/* =========================================================
   2. 加入最终静态参数数组
   ========================================================= */

if (
  !source.includes(
    spreadMarker
  )
) {
  const oldBlock =
    `    ...luerParams,
    ...femaleThreadParams,
  ]`;

  const newBlock =
    `    ...luerParams,
    ...femaleThreadParams,

    /* FILTER_CHECK_VALVE_STATIC_SPREAD_START */
    ...filterParams,
    ...checkValveParams,
    /* FILTER_CHECK_VALVE_STATIC_SPREAD_END */
  ]`;

  const blockCount =
    source.split(oldBlock).length - 1;

  if (blockCount !== 1) {
    throw new Error(
      "无法唯一定位静态参数合并数组：" +
        blockCount
    );
  }

  source = source.replace(
    oldBlock,
    newBlock
  );
}

/* =========================================================
   3. 修改结果检查
   ========================================================= */

const checks = {
  filterDefinition:
    source.includes(
      "const filterParams ="
    ),

  checkValveDefinition:
    source.includes(
      "const checkValveParams ="
    ),

  filterSpread:
    source.includes(
      "...filterParams"
    ),

  checkValveSpread:
    source.includes(
      "...checkValveParams"
    ),

  filterSlug:
    source.includes(
      '"filters"'
    ),

  checkValveSlug:
    source.includes(
      '"check-valves"'
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
    "静态路由修改检查失败：" +
      failed.join("、")
  );
}

/*
 * 保证34条数据本身完整。
 */
const filterJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "filters",
  "detail",
  "index.json"
);

const checkValveJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "check-valves",
  "detail",
  "index.json"
);

const filterDetailsJson =
  JSON.parse(
    fs.readFileSync(
      filterJsonPath,
      "utf8"
    )
  );

const checkValveDetailsJson =
  JSON.parse(
    fs.readFileSync(
      checkValveJsonPath,
      "utf8"
    )
  );

if (
  filterDetailsJson.length !== 18
) {
  throw new Error(
    "过滤器详情数量异常：" +
      filterDetailsJson.length
  );
}

if (
  checkValveDetailsJson.length !== 16
) {
  throw new Error(
    "单向阀详情数量异常：" +
      checkValveDetailsJson.length
  );
}

const invalidDetails = [
  ...filterDetailsJson.map(
    (item) => ({
      type:
        "filters",
      slug:
        item.slug,
    })
  ),

  ...checkValveDetailsJson.map(
    (item) => ({
      type:
        "check-valves",
      slug:
        item.slug,
    })
  ),
].filter(
  (item) =>
    !item.slug ||
    !String(
      item.slug
    ).trim()
);

if (invalidDetails.length) {
  throw new Error(
    "存在缺少slug的详情数据。"
  );
}

/* =========================================================
   4. 备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${routePath}.bak_fix_filter_check_valve_static_${stamp}`;

fs.copyFileSync(
  routePath,
  backupPath
);

fs.writeFileSync(
  routePath,
  source,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "过滤器与单向阀静态路由修复完成"
);
console.log(
  "============================================"
);
console.log(
  "过滤器静态详情：",
  filterDetailsJson.length
);
console.log(
  "单向阀静态详情：",
  checkValveDetailsJson.length
);
console.log(
  "新增静态详情路由：",
  filterDetailsJson.length +
    checkValveDetailsJson.length
);
console.log("");
console.log(
  "已加入："
);
console.log(
  "...filterParams"
);
console.log(
  "...checkValveParams"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
