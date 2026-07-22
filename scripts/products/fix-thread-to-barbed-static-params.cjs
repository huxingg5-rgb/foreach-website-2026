const fs = require("fs");
const path = require("path");

const root = process.cwd();

const pagePath = path.join(
  root,
  "app",
  "products",
  "[category]",
  "[slug]",
  "[seriesSlug]",
  "page.tsx"
);

const detailJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "thread-to-barbed-fittings",
  "detail",
  "index.json"
);

if (!fs.existsSync(pagePath)) {
  throw new Error(
    "未找到通用三级路由：" + pagePath
  );
}

if (!fs.existsSync(detailJsonPath)) {
  throw new Error(
    "未找到螺纹转倒刺详情数据：" +
      detailJsonPath
  );
}

const details = require(detailJsonPath);

if (!Array.isArray(details) || details.length !== 101) {
  throw new Error(
    "螺纹转倒刺详情数量异常：" +
      (Array.isArray(details)
        ? details.length
        : "不是数组")
  );
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  pagePath +
  ".bak_thread_to_barbed_static_params_" +
  stamp;

fs.copyFileSync(
  pagePath,
  backupPath
);

let source = fs.readFileSync(
  pagePath,
  "utf8"
);

/* =========================================================
   1. 增加详情 JSON import
   ========================================================= */

const importLine =
  'import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";';

if (!source.includes(importLine)) {
  const hardTubeImportPattern =
    /import hardTubeDetailsJson from "@\/data\/products\/generated\/fittings\/hard-tube-fittings\/detail\/index\.json";/;

  if (!hardTubeImportPattern.test(source)) {
    throw new Error(
      "没有找到 hardTubeDetailsJson import 锚点。"
    );
  }

  source = source.replace(
    hardTubeImportPattern,
    (match) =>
      match +
      "\n" +
      importLine
  );
}

/* =========================================================
   2. 增加 threadToBarbedDetails 常量
   ========================================================= */

const detailsConstMarker =
  "const threadToBarbedDetails =";

if (!source.includes(detailsConstMarker)) {
  const hardTubeConstPattern =
    /const hardTubeDetails\s*=\s*hardTubeDetailsJson as HardTubeDetailRecord\[\];/;

  if (!hardTubeConstPattern.test(source)) {
    throw new Error(
      "没有找到 hardTubeDetails 常量锚点。"
    );
  }

  source = source.replace(
    hardTubeConstPattern,
    (match) =>
      `${match}

const threadToBarbedDetails =
  threadToBarbedDetailsJson as HardTubeDetailRecord[];`
  );
}

/* =========================================================
   3. 精准替换 generateStaticParams
   ========================================================= */

function findFunctionRange(
  content,
  functionName
) {
  const startToken =
    `export function ${functionName}()`;

  const start =
    content.indexOf(startToken);

  if (start < 0) {
    throw new Error(
      `没有找到函数：${functionName}`
    );
  }

  const braceStart =
    content.indexOf("{", start);

  if (braceStart < 0) {
    throw new Error(
      `${functionName} 缺少左花括号。`
    );
  }

  let depth = 0;

  for (
    let index = braceStart;
    index < content.length;
    index += 1
  ) {
    const char = content[index];

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          end: index + 1,
        };
      }
    }
  }

  throw new Error(
    `${functionName} 缺少右花括号。`
  );
}

const functionRange =
  findFunctionRange(
    source,
    "generateStaticParams"
  );

const newFunction = `export function generateStaticParams() {
  /*
   * output: export 要求所有三级动态路由提前生成。
   */
  const normalSeriesParams =
    getSeriesRouteParams();

  const hardTubeParams =
    hardTubeDetails.map(
      (detail) => ({
        category: "fittings",
        slug: "hard-tube-fittings",
        seriesSlug: detail.slug,
      })
    );

  const threadToBarbedParams =
    threadToBarbedDetails.map(
      (detail) => ({
        category: "fittings",
        slug: "thread-to-barbed-fittings",
        seriesSlug: detail.slug,
      })
    );

  /*
   * 去重，避免路由映射与详情数据产生重复参数。
   */
  const allParams = [
    ...normalSeriesParams,
    ...hardTubeParams,
    ...threadToBarbedParams,
  ];

  const uniqueParams = new Map(
    allParams.map((item) => [
      [
        item.category,
        item.slug,
        item.seriesSlug,
      ].join("/"),
      item,
    ])
  );

  return Array.from(
    uniqueParams.values()
  );
}`;

source =
  source.slice(
    0,
    functionRange.start
  ) +
  newFunction +
  source.slice(
    functionRange.end
  );

fs.writeFileSync(
  pagePath,
  source,
  "utf8"
);

console.log("");
console.log("============================================");
console.log("三级动态路由静态参数修复完成");
console.log("============================================");
console.log("原有系列参数：继续保留");
console.log("硬管详情参数：继续保留");
console.log(
  "螺纹转倒刺参数：" +
    details.length
);
console.log("备份：" + backupPath);
console.log("");
