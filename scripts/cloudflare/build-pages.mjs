/**
 * Cloudflare Pages 静态构建脚本
 *
 * 文件：
 * scripts/cloudflare/build-pages.mjs
 *
 * 作用：
 * 1. 先执行 TypeScript 检查
 * 2. 临时把 app/api 移出 Next.js app 目录
 * 3. 设置 Cloudflare 静态构建环境变量
 * 4. 执行 next build，生成 out
 * 5. 无论成功还是失败，都恢复 app/api
 *
 * app/api 只用于本地和 Vercel。
 * Cloudflare 使用根目录 functions/api。
 */

import {
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
} from "node:fs";

import {
  spawnSync,
} from "node:child_process";

import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();

const appApiPath = path.join(
  projectRoot,
  "app",
  "api",
);

/*
 * 临时目录放在 node_modules 中：
 * 1. 默认不会被 Git 跟踪
 * 2. 不会被 Next.js 当作 App Router 路由
 * 3. 与项目位于同一磁盘，移动速度快
 */
const temporaryRoot = path.join(
  projectRoot,
  "node_modules",
  ".cache",
  "foreach-cloudflare-build",
);

const temporaryApiPath = path.join(
  temporaryRoot,
  "app-api",
);

const nextCliPath = path.join(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const typeScriptCliPath = path.join(
  projectRoot,
  "node_modules",
  "typescript",
  "bin",
  "tsc",
);

const outputPath = path.join(
  projectRoot,
  "out",
);

const nextCachePath = path.join(
  projectRoot,
  ".next",
);

/* =========================================================
   执行 Node CLI
========================================================= */

function runNodeCli(
  cliPath,
  args,
  environment = process.env,
) {
  const result = spawnSync(
    process.execPath,
    [
      cliPath,
      ...args,
    ],
    {
      cwd: projectRoot,
      env: environment,
      stdio: "inherit",
    },
  );

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
}

/* =========================================================
   恢复 app/api
========================================================= */

function restoreAppApi() {
  if (!existsSync(temporaryApiPath)) {
    return;
  }

  if (existsSync(appApiPath)) {
    throw new Error(
      "无法恢复 app/api：目标目录已经存在。",
    );
  }

  mkdirSync(
    path.dirname(appApiPath),
    {
      recursive: true,
    },
  );

  renameSync(
    temporaryApiPath,
    appApiPath,
  );

  console.log(
    "Cloudflare 构建结束，app/api 已恢复。",
  );
}

/* =========================================================
   处理上一次意外中断
========================================================= */

if (
  !existsSync(appApiPath) &&
  existsSync(temporaryApiPath)
) {
  console.warn(
    "检测到上次中断留下的临时 app/api，正在恢复。",
  );

  restoreAppApi();
}

if (
  existsSync(appApiPath) &&
  existsSync(temporaryApiPath)
) {
  throw new Error(
    "app/api 和临时备份同时存在。" +
      "请检查 node_modules/.cache/foreach-cloudflare-build。",
  );
}

if (!existsSync(appApiPath)) {
  throw new Error(
    "没有找到 app/api，停止 Cloudflare 构建。",
  );
}

if (!existsSync(nextCliPath)) {
  throw new Error(
    "没有找到 Next.js CLI，请确认 node_modules 是否完整。",
  );
}

if (!existsSync(typeScriptCliPath)) {
  throw new Error(
    "没有找到 TypeScript CLI，请确认 node_modules 是否完整。",
  );
}

/* =========================================================
   一、TypeScript 检查
========================================================= */

console.log("");
console.log(
  "一、执行 TypeScript 检查",
);
console.log("");

const typeScriptExitCode =
  runNodeCli(
    typeScriptCliPath,
    [
      "--noEmit",
      "--pretty",
      "false",
    ],
  );

if (typeScriptExitCode !== 0) {
  throw new Error(
    "TypeScript 检查失败，Cloudflare 构建已停止。",
  );
}

console.log("");
console.log(
  "TypeScript 检查通过。",
);

/* =========================================================
   二、临时隔离 Next.js POST Route Handler
========================================================= */

console.log("");
console.log(
  "二、临时隔离 app/api",
);
console.log("");

mkdirSync(
  temporaryRoot,
  {
    recursive: true,
  },
);

renameSync(
  appApiPath,
  temporaryApiPath,
);

console.log(
  "app/api 已临时移出 App Router。",
);

/* =========================================================
   三、执行静态导出
========================================================= */

let buildExitCode = 1;

try {
  /*
   * 删除旧构建缓存，避免 Vercel 模式缓存污染静态构建。
   */
  rmSync(
    nextCachePath,
    {
      recursive: true,
      force: true,
    },
  );

  rmSync(
    outputPath,
    {
      recursive: true,
      force: true,
    },
  );

  console.log("");
  console.log(
    "三、执行 Next.js Cloudflare 静态构建",
  );
  console.log("");

  const buildEnvironment = {
    ...process.env,

    CF_PAGES:
      process.env.CF_PAGES || "1",

    CLOUDFLARE_PAGES_BUILD:
      "1",
  };

  buildExitCode =
    runNodeCli(
      nextCliPath,
      [
        "build",
      ],
      buildEnvironment,
    );
}
finally {
  /*
   * next build 成功、报错或被程序异常终止时，
   * 都要恢复本地 Next.js API。
   */
  restoreAppApi();
}

if (buildExitCode !== 0) {
  throw new Error(
    `Next.js Cloudflare 构建失败，退出代码：${buildExitCode}`,
  );
}

/* =========================================================
   四、验证静态导出目录
========================================================= */

const requiredOutputFiles = [
  path.join(
    outputPath,
    "index.html",
  ),

  path.join(
    outputPath,
    "_routes.json",
  ),
];

for (const requiredFile of requiredOutputFiles) {
  if (!existsSync(requiredFile)) {
    throw new Error(
      `静态导出缺少文件：${requiredFile}`,
    );
  }
}

console.log("");
console.log(
  "Cloudflare 静态构建成功。",
);

console.log(
  `静态导出目录：${outputPath}`,
);

console.log(
  "app/api 已恢复，Cloudflare Functions 保持不变。",
);