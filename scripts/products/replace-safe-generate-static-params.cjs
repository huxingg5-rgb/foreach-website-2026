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
    "未找到路由文件：" +
    routePath
  );
}

let source = fs.readFileSync(
  routePath,
  "utf8"
);

const requiredVariables = [
  "hardTubeDetails",
  "threadToBarbedDetails",
  "luerDetails",
  "femaleThreadDetails",
  "filterDetails",
  "checkValveDetails",
];

const missingVariables =
  requiredVariables.filter(
    (name) =>
      !source.includes(name)
  );

if (missingVariables.length) {
  throw new Error(
    "路由文件缺少详情集合：" +
    missingVariables.join("、")
  );
}

const startMarker =
  "export function generateStaticParams()";

const endMarker =
  "export async function generateMetadata";

const startIndex =
  source.indexOf(startMarker);

const endIndex =
  source.indexOf(
    endMarker,
    startIndex
  );

if (startIndex < 0) {
  throw new Error(
    "没有找到 generateStaticParams()"
  );
}

if (endIndex < 0) {
  throw new Error(
    "没有找到 generateMetadata()"
  );
}

const newFunction = `export function generateStaticParams() {
  /*
   * output: export 要求所有三级动态路由都必须提前生成。
   *
   * getSeriesRouteParams() 中可能存在动态占位符，
   * 例如：
   * [category] / [slug] / [seriesSlug]
   *
   * 这些值不能进入最终静态参数。
   */

  function toSafeSegment(
    value: unknown
  ) {
    const raw =
      String(
        value ?? ""
      ).trim();

    if (!raw) {
      return "";
    }

    if (
      raw.includes("[") ||
      raw.includes("]")
    ) {
      return "";
    }

    const normalized =
      normalizeSegment(raw);

    if (
      !normalized ||
      normalized.includes("[") ||
      normalized.includes("]")
    ) {
      return "";
    }

    return normalized;
  }

  const sourceParams = [
    ...getSeriesRouteParams(),

    ...hardTubeDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "hard-tube-fittings",

        seriesSlug:
          detail.slug,
      })
    ),

    ...threadToBarbedDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "thread-to-barbed-fittings",

        seriesSlug:
          detail.slug,
      })
    ),

    ...luerDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "luer-fittings",

        seriesSlug:
          detail.slug,
      })
    ),

    ...femaleThreadDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "female-thread-adapters",

        seriesSlug:
          detail.slug,
      })
    ),

    ...filterDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "filters",

        seriesSlug:
          detail.slug,
      })
    ),

    ...checkValveDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "check-valves",

        seriesSlug:
          detail.slug,
      })
    ),
  ] as Array<{
    category?: unknown;
    slug?: unknown;
    seriesSlug?: unknown;
  }>;

  const routeMap =
    new Map<
      string,
      {
        category: string;
        slug: string;
        seriesSlug: string;
      }
    >();

  sourceParams.forEach(
    (item) => {
      const category =
        toSafeSegment(
          item?.category
        );

      const slug =
        toSafeSegment(
          item?.slug
        );

      const seriesSlug =
        toSafeSegment(
          item?.seriesSlug
        );

      if (
        !category ||
        !slug ||
        !seriesSlug
      ) {
        return;
      }

      const route = {
        category,
        slug,
        seriesSlug,
      };

      const key = [
        category,
        slug,
        seriesSlug,
      ].join("/");

      routeMap.set(
        key,
        route
      );
    }
  );

  return Array.from(
    routeMap.values()
  );
}

`;

const nextSource =
  source.slice(
    0,
    startIndex
  ) +
  newFunction +
  source.slice(
    endIndex
  );

const checks = {
  filterRoute:
    nextSource.includes(
      'slug:\n          "filters"'
    ),

  checkValveRoute:
    nextSource.includes(
      'slug:\n          "check-valves"'
    ),

  placeholderGuard:
    nextSource.includes(
      'raw.includes("[")'
    ),

  filterDetails:
    nextSource.includes(
      "...filterDetails.map("
    ),

  checkValveDetails:
    nextSource.includes(
      "...checkValveDetails.map("
    ),
};

const failedChecks =
  Object.entries(checks)
    .filter(
      ([, passed]) =>
        !passed
    )
    .map(
      ([name]) =>
        name
    );

if (failedChecks.length) {
  throw new Error(
    "替换结果检查失败：" +
    failedChecks.join("、")
  );
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${routePath}.bak_safe_static_params_${stamp}`;

fs.copyFileSync(
  routePath,
  backupPath
);

fs.writeFileSync(
  routePath,
  nextSource,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "generateStaticParams 已整体替换"
);
console.log(
  "============================================"
);
console.log(
  "已加入过滤器详情：18"
);
console.log(
  "已加入单向阀详情：16"
);
console.log(
  "已排除动态占位符：[category] 等"
);
console.log(
  "已排除空参数"
);
console.log(
  "已对静态路由去重"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
