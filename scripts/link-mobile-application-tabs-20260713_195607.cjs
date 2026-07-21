const fs = require("fs");

const path =
  "components/home/HomeApplicationFlowSection.tsx";

let source = fs.readFileSync(path, "utf8");

const newline = source.includes("\r\n")
  ? "\r\n"
  : "\n";

/* =========================================================
   1. 应用按钮与目标页面映射
========================================================= */

const applicationRoutes = {
  "analytical-instruments":
    "/applications/analytical-instruments",

  "life-science":
    "/applications/life-science",

  "synthetic-biology":
    "/applications/synthetic-biology",

  "lab-automation":
    "/applications/lab-automation",

  ivd:
    "/applications/ivd",
};

/* =========================================================
   2. 修改前检查应用页面是否存在
========================================================= */

function getPageCandidates(route) {
  const routePath = route.replace(/^\/+/, "");

  const extensions = [
    "tsx",
    "ts",
    "jsx",
    "js",
  ];

  const candidates = [];

  for (const extension of extensions) {
    candidates.push(
      `app/${routePath}/page.${extension}`,
    );

    candidates.push(
      `app/[locale]/${routePath}/page.${extension}`,
    );

    candidates.push(
      `app/en/${routePath}/page.${extension}`,
    );
  }

  return candidates;
}

console.log("");
console.log("===== 应用页面路由检查 =====");

for (const [key, route] of Object.entries(
  applicationRoutes,
)) {
  const candidates = getPageCandidates(route);

  const existingFiles = candidates.filter(
    (candidate) => fs.existsSync(candidate),
  );

  console.log("");
  console.log(`应用：${key}`);
  console.log(`目标：${route}`);

  if (existingFiles.length === 0) {
    console.log("没有找到以下候选页面：");

    candidates.forEach((candidate) => {
      console.log(`  ${candidate}`);
    });

    throw new Error(
      `${key} 对应的应用页面不存在，已停止修改。`,
    );
  }

  existingFiles.forEach((file) => {
    console.log(`页面：${file}`);
  });
}

/* =========================================================
   3. 在组件中加入应用路由映射和多语言路径函数
========================================================= */

const markerStart =
  "/* HOME_MOBILE_APPLICATION_ROUTES_START */";

const markerEnd =
  "/* HOME_MOBILE_APPLICATION_ROUTES_END */";

const routeBlock = [
  markerStart,
  "const HOME_MOBILE_APPLICATION_ROUTES: Record<string, string> = {",
  '  "analytical-instruments": "/applications/analytical-instruments",',
  '  "life-science": "/applications/life-science",',
  '  "synthetic-biology": "/applications/synthetic-biology",',
  '  "lab-automation": "/applications/lab-automation",',
  '  ivd: "/applications/ivd",',
  "};",
  "",
  "function getLocalizedApplicationHref(",
  "  locale: LocaleCode,",
  "  applicationPath: string,",
  ") {",
  '  return locale === "zh-CN"',
  "    ? applicationPath",
  "    : `/${locale}${applicationPath}`;",
  "}",
  markerEnd,
].join(newline);

const existingRouteBlockPattern =
  /\/\* HOME_MOBILE_APPLICATION_ROUTES_START \*\/[\s\S]*?\/\* HOME_MOBILE_APPLICATION_ROUTES_END \*\//;

if (existingRouteBlockPattern.test(source)) {
  source = source.replace(
    existingRouteBlockPattern,
    routeBlock,
  );

  console.log("");
  console.log("已更新原有应用路由映射。");
} else {
  const componentEntry =
    "export default function HomeApplicationFlowSection(";

  const entryCount =
    source.split(componentEntry).length - 1;

  console.log("");
  console.log(
    `组件入口数量：${entryCount}`,
  );

  if (entryCount !== 1) {
    throw new Error(
      "没有唯一找到组件入口，已停止修改。",
    );
  }

  source = source.replace(
    componentEntry,
    routeBlock +
      newline +
      newline +
      componentEntry,
  );

  console.log("已加入应用路由映射。");
}

/* =========================================================
   4. 把手机端五个 button 改成 Link
========================================================= */

const oldTabsPattern =
  /\{mobileApplicationCards\.map\(\(item,\s*index\)\s*=>\s*\(\s*<button[\s\S]*?<\/button>\s*\)\)\}/;

const oldTabsMatches = source.match(
  new RegExp(oldTabsPattern.source, "g"),
);

console.log("");
console.log(
  `原手机应用按钮结构数量：${
    oldTabsMatches?.length || 0
  }`,
);

const newTabs = [
  "{mobileApplicationCards.map((item, index) => {",
  "                  const applicationPath =",
  "                    HOME_MOBILE_APPLICATION_ROUTES[item.key];",
  "",
  "                  if (!applicationPath) {",
  "                    return null;",
  "                  }",
  "",
  "                  return (",
  "                    <Link",
  "                      key={item.key}",
  "                      href={getLocalizedApplicationHref(",
  "                        locale,",
  "                        applicationPath,",
  "                      )}",
  "                      className={",
  "                        index === activeMobileIndex",
  '                          ? "home-flow-mobile-app-tab is-active"',
  '                          : "home-flow-mobile-app-tab"',
  "                      }",
  "                      onClick={() =>",
  "                        handleMobileApplicationChange(index)",
  "                      }",
  "                    >",
  "                      {getHomeFlowText(item.title, locale)}",
  "                    </Link>",
  "                  );",
  "                })}",
].join(newline);

if (oldTabsPattern.test(source)) {
  source = source.replace(
    oldTabsPattern,
    newTabs,
  );

  console.log(
    "已将五个应用 button 改为 Link。",
  );
} else if (
  source.includes(
    "HOME_MOBILE_APPLICATION_ROUTES[item.key]",
  )
) {
  console.log(
    "五个应用链接结构已经存在，跳过重复修改。",
  );
} else {
  throw new Error(
    "没有找到手机端应用按钮原结构，已停止修改。",
  );
}

fs.writeFileSync(path, source, "utf8");

console.log("");
console.log("修改完成：");
console.log("- 高端分析仪器已连接对应应用页");
console.log("- 生命科学已连接对应应用页");
console.log("- 合成生物已连接对应应用页");
console.log("- 实验室自动化已连接对应应用页");
console.log("- IVD 体外诊断已连接对应应用页");
console.log("- 多语言路径自动适配");
console.log("- 原按钮视觉 class 保持不变");

