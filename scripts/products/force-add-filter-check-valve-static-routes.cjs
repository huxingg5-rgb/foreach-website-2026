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

let source = fs.readFileSync(
  routePath,
  "utf8"
);

const filterDetails = JSON.parse(
  fs.readFileSync(
    filterJsonPath,
    "utf8"
  )
);

const checkValveDetails = JSON.parse(
  fs.readFileSync(
    checkValveJsonPath,
    "utf8"
  )
);

if (filterDetails.length !== 18) {
  throw new Error(
    `过滤器详情数量异常：${filterDetails.length}`
  );
}

if (checkValveDetails.length !== 16) {
  throw new Error(
    `单向阀详情数量异常：${checkValveDetails.length}`
  );
}

if (
  !source.includes(
    "const filterDetails"
  ) ||
  !source.includes(
    "const checkValveDetails"
  )
) {
  throw new Error(
    "路由文件尚未导入过滤器或单向阀详情JSON。"
  );
}

const startMarker =
  "/* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_START */";

const endMarker =
  "/* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_END */";

/*
 * 删除旧的同名补丁，保证可以重复运行。
 */
const oldBlockPattern =
  /\/\* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_START \*\/[\s\S]*?\/\* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_END \*\/\s*/g;

source = source.replace(
  oldBlockPattern,
  ""
);

const block = `  /* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_START */

  filterDetails.forEach(
    (detail) => {
      const seriesSlug =
        normalizeSegment(
          detail.slug
        );

      if (!seriesSlug) {
        return;
      }

      routeMap.set(
        \`fittings/filters/\${seriesSlug}\`,
        {
          category:
            "fittings",

          slug:
            "filters",

          seriesSlug,
        }
      );
    }
  );

  checkValveDetails.forEach(
    (detail) => {
      const seriesSlug =
        normalizeSegment(
          detail.slug
        );

      if (!seriesSlug) {
        return;
      }

      routeMap.set(
        \`fittings/check-valves/\${seriesSlug}\`,
        {
          category:
            "fittings",

          slug:
            "check-valves",

          seriesSlug,
        }
      );
    }
  );

  /* FORCE_FILTER_CHECK_VALVE_STATIC_ROUTES_END */

`;

const returnPattern =
  /(\s*)return\s+Array\.from\(\s*routeMap\.values\(\)\s*\);/;

const returnMatch =
  source.match(
    returnPattern
  );

if (!returnMatch) {
  throw new Error(
    "没有找到 generateStaticParams() 最终 return。"
  );
}

source = source.replace(
  returnPattern,
  `${block}  return Array.from(
    routeMap.values()
  );`
);

const requiredChecks = [
  "filterDetails.forEach",
  "checkValveDetails.forEach",
  'slug:\n            "filters"',
  'slug:\n            "check-valves"',
  "fittings/filters/${seriesSlug}",
  "fittings/check-valves/${seriesSlug}",
];

for (const value of requiredChecks) {
  if (!source.includes(value)) {
    throw new Error(
      "写入结果缺少：" +
        value
    );
  }
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${routePath}.bak_force_static_routes_${stamp}`;

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
  "34条静态路由已强制加入 routeMap"
);
console.log(
  "============================================"
);
console.log(
  "过滤器：",
  filterDetails.length
);
console.log(
  "单向阀：",
  checkValveDetails.length
);
console.log(
  "总计：",
  filterDetails.length +
    checkValveDetails.length
);
console.log("");
console.log(
  "目标路由："
);
console.log(
  "fittings / filters / g-178-64-pa-v"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
