const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

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

const cssPath = path.join(
  root,
  "app",
  "products",
  "products.css"
);

const reportPath = path.join(
  root,
  "阀系列产品类别修正报告.md"
);

const targetFiles = [
  clientPath,
  panelPath,
  cssPath,
];

function stop(message) {
  console.error("");
  console.error("操作停止:");
  console.error(message);
  console.error("");
  process.exit(1);
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    stop(`未找到文件: ${relative(filePath)}`);
  }
}

function readSource(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");

  return {
    raw,
    eol: raw.includes("\r\n")
      ? "\r\n"
      : "\n",
    content: raw.replace(/\r\n/g, "\n"),
  };
}

function writeSource(
  filePath,
  content,
  eol
) {
  const output =
    eol === "\r\n"
      ? content.replace(/\n/g, "\r\n")
      : content;

  fs.writeFileSync(
    filePath,
    output,
    "utf8"
  );
}

function countText(
  content,
  searchText
) {
  return content
    .split(searchText)
    .length - 1;
}

function replaceExact(
  content,
  searchText,
  replacementText,
  expectedCount,
  label
) {
  const actualCount =
    countText(
      content,
      searchText
    );

  if (
    actualCount !==
    expectedCount
  ) {
    stop(
      [
        `定位失败: ${label}`,
        `预期命中: ${expectedCount}`,
        `实际命中: ${actualCount}`,
        "没有写入任何源文件。",
      ].join("\n")
    );
  }

  return content
    .split(searchText)
    .join(replacementText);
}

function replaceRegexOnce(
  content,
  pattern,
  replacement,
  label
) {
  const matches =
    content.match(pattern);

  if (
    !matches ||
    matches.length !== 1
  ) {
    stop(
      [
        `定位失败: ${label}`,
        `实际命中: ${
          matches
            ? matches.length
            : 0
        }`,
        "没有写入任何源文件。",
      ].join("\n")
    );
  }

  return content.replace(
    pattern,
    replacement
  );
}

const clientSource =
  readSource(clientPath);

const panelSource =
  readSource(panelPath);

const cssSource =
  readSource(cssPath);

let client =
  clientSource.content;

let panel =
  panelSource.content;

let css =
  cssSource.content;

/* =========================================================
 * 1. 阀系列左侧只生成一个产品类别选项
 * ========================================================= */

const valveOptionMarker =
  "VALVE_SINGLE_CATEGORY_OPTION_START";

if (
  client.includes(
    valveOptionMarker
  )
) {
  stop(
    "检测到本次修正已经执行过，没有重复修改。"
  );
}

client = replaceExact(
  client,
  `    const options =
      Array.from(
        optionMap.values()
      );

    if (
      activeCategoryId ===
      "fittings"
    ) {`,
  `    const options =
      Array.from(
        optionMap.values()
      );

    /* VALVE_SINGLE_CATEGORY_OPTION_START */

    /*
     * 阀产品不再按旋转阀、高压阀、电磁阀分成三个产品类型。
     * 左侧产品类别只保留一个阀系列入口。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      return [
        {
          value: "valve-series",
          label: String(
            activeCategory.label ||
            "阀系列"
          ),
        },
      ];
    }

    /* VALVE_SINGLE_CATEGORY_OPTION_END */

    if (
      activeCategoryId ===
      "fittings"
    ) {`,
  1,
  "增加单一阀系列产品类别"
);

/*
 * productTypeOptions 中使用了 activeCategory，
 * 将它加入 useMemo 依赖。
 */
client = replaceExact(
  client,
  `  }, [activeCategoryId, categoryProducts, locale]);`,
  `  }, [
    activeCategory,
    activeCategoryId,
    categoryProducts,
    locale,
  ]);`,
  1,
  "更新产品类别选项依赖"
);

/* =========================================================
 * 2. 左侧小标题由阀系列改为产品类别
 * ========================================================= */

client = replaceExact(
  client,
  `          activeCategoryId === "valves" && locale === "zh"
            ? "阀系列"
            : activeCategoryId === "fittings" && locale === "zh"`,
  `          activeCategoryId === "valves" && locale === "zh"
            ? "产品类别"
            : activeCategoryId === "fittings" && locale === "zh"`,
  1,
  "将左侧筛选标题改为产品类别"
);

/* =========================================================
 * 3. 阀系列点击后保持显示全部三张卡片
 * ========================================================= */

client = replaceRegexOnce(
  client,
  /    \/\*\n     \* 阀系列在当前产品中心页面内完成筛选。\n     \* 再次点击当前阀系列时取消筛选，并恢复三张卡片。\n     \*\/\n    if \(activeCategoryId === "valves"\) \{\n[\s\S]*?\n      return;\n    \}\n/,
  `    /*
     * 阀系列是产品类别，不再作为三个阀类型的筛选入口。
     * 点击后仍然保持未细分状态，右侧显示全部三张阀卡片。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      setActiveProductTypeId(
        ""
      );

      setSelectedFilters(
        {}
      );

      setSearchKeyword(
        ""
      );

      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups(
          ""
        )
      );

      return;
    }
`,
  "修改阀系列点击逻辑"
);

/* =========================================================
 * 4. 唯一的阀系列选项始终显示为选中状态
 * ========================================================= */

panel = replaceExact(
  panel,
  `                const active = isOptionActive(
                  group,
                  option.value
                );`,
  `                const active =
                  activeCategory.id ===
                    "valves" &&
                  group.key ===
                    "productType"
                    ? true
                    : isOptionActive(
                        group,
                        option.value
                      );`,
  1,
  "让唯一阀系列选项保持选中状态"
);

/* =========================================================
 * 5. 阀系列单一选项占满整行
 * ========================================================= */

panel = replaceExact(
  panel,
  `          const shouldUseTwoColumns =
            group.layout === "two"
              ? true
              : group.layout === "one"
                ? false
                : inferredShouldUseTwoColumns;`,
  `          const shouldUseTwoColumns =
            activeCategory.id ===
              "valves" &&
            isProductTypeGroup
              ? false
              : group.layout ===
                  "two"
                ? true
                : group.layout ===
                    "one"
                  ? false
                  : inferredShouldUseTwoColumns;`,
  1,
  "让阀系列唯一选项使用单列"
);

/* =========================================================
 * 6. 删除上一次增加的三个按钮同排CSS
 * ========================================================= */

const oldCssPattern =
  /\/\* VALVE_SERIES_FILTER_THREE_COLUMNS_START \*\/[\s\S]*?\/\* VALVE_SERIES_FILTER_THREE_COLUMNS_END \*\/\s*/g;

const oldCssMatches =
  css.match(oldCssPattern);

if (
  !oldCssMatches ||
  oldCssMatches.length !== 1
) {
  stop(
    [
      "没有找到上一次添加的阀系列三列CSS。",
      "为避免误删其他样式，本次没有写入文件。",
    ].join("\n")
  );
}

css = css.replace(
  oldCssPattern,
  ""
);

css = `${css.trimEnd()}

/* VALVE_SERIES_SINGLE_CATEGORY_START */

/*
 * 阀产品类别只有一个阀系列选项。
 * 禁止它被误操作成旋转阀、高压阀、电磁阀的细分筛选。
 */
.products-selection-page
  .filter-panel[data-category-id="valves"]
  .product-type-filter-group
  .filter-option {
  cursor: default;
}

/* VALVE_SERIES_SINGLE_CATEGORY_END */
`;

/* =========================================================
 * 7. 全部定位成功后再备份和写入
 * ========================================================= */

const now =
  new Date();

const stamp = [
  now.getFullYear(),
  String(
    now.getMonth() + 1
  ).padStart(2, "0"),
  String(
    now.getDate()
  ).padStart(2, "0"),
  "_",
  String(
    now.getHours()
  ).padStart(2, "0"),
  String(
    now.getMinutes()
  ).padStart(2, "0"),
  String(
    now.getSeconds()
  ).padStart(2, "0"),
].join("");

const backupDir =
  path.join(
    root,
    "reports",
    `valve-category-backup-${stamp}`
  );

fs.mkdirSync(
  backupDir,
  {
    recursive: true,
  }
);

for (
  const filePath
  of targetFiles
) {
  const backupPath =
    path.join(
      backupDir,
      relative(filePath)
    );

  fs.mkdirSync(
    path.dirname(
      backupPath
    ),
    {
      recursive: true,
    }
  );

  fs.copyFileSync(
    filePath,
    backupPath
  );
}

writeSource(
  clientPath,
  client,
  clientSource.eol
);

writeSource(
  panelPath,
  panel,
  panelSource.eol
);

writeSource(
  cssPath,
  css,
  cssSource.eol
);

/* =========================================================
 * 8. 构建检查
 * ========================================================= */

console.log("");
console.log(
  "修改完成，开始运行 npm run build..."
);
console.log("");

const buildResult =
  spawnSync(
    "cmd.exe",
    [
      "/d",
      "/s",
      "/c",
      "npm run build",
    ],
    {
      cwd: root,
      stdio: "inherit",
    }
  );

const buildPassed =
  !buildResult.error &&
  buildResult.status === 0;

if (
  !buildPassed
) {
  fs.writeFileSync(
    clientPath,
    clientSource.raw
  );

  fs.writeFileSync(
    panelPath,
    panelSource.raw
  );

  fs.writeFileSync(
    cssPath,
    cssSource.raw
  );
}

const reportLines = [
  "# 阀系列产品类别修正报告",
  "",
  `生成时间: ${new Date().toLocaleString("zh-CN")}`,
  `备份目录: ${relative(backupDir)}`,
  "",
  "## 本次目标",
  "",
  "1. 左侧筛选小标题显示为产品类别。",
  "2. 产品类别下面只显示一个阀系列。",
  "3. 阀系列默认保持选中状态。",
  "4. 右侧同时显示三张阀产品卡片。",
  "5. 不再将旋转阀、高压阀、电磁阀作为三个筛选项。",
  "6. 不修改三张卡片的名称、参数、图片和详情链接。",
  "",
  "## 修改文件",
  "",
  "- components/products/selection/ProductSelectionClient.tsx",
  "- components/products/selection/ProductFilterPanel.tsx",
  "- app/products/products.css",
  "",
  "## 构建结果",
  "",
  buildPassed
    ? "npm run build 已通过。"
    : "npm run build 未通过，源文件已自动恢复。",
  "",
];

fs.writeFileSync(
  reportPath,
  reportLines.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);

if (
  buildPassed
) {
  console.log(
    "阀系列产品类别修正完成"
  );

  console.log(
    "构建结果: 通过"
  );
}
else {
  console.log(
    "构建未通过，源文件已恢复"
  );

  console.log(
    "构建结果: 失败"
  );
}

console.log(
  `备份目录: ${backupDir}`
);

console.log(
  `修改报告: ${reportPath}`
);

console.log(
  "============================================"
);

console.log("");

if (
  !buildPassed
) {
  process.exit(1);
}
