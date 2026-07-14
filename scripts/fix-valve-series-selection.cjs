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
  "阀系列筛选修改报告.md"
);

const targetFiles = [
  clientPath,
  panelPath,
  cssPath,
];

function stop(message) {
  console.error("");
  console.error("修改停止:");
  console.error(message);
  console.error("");
  process.exit(1);
}

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    stop(`未找到目标文件: ${relative(filePath)}`);
  }
}

/*
 * 只检查本次要修改的三个文件。
 * 其他页面现有的未提交修改不会阻止本次操作。
 */
const gitCheck = spawnSync(
  "git",
  [
    "status",
    "--short",
    "--",
    ...targetFiles.map(relative),
  ],
  {
    cwd: root,
    encoding: "utf8",
  }
);

if (gitCheck.error) {
  stop(`无法读取 Git 状态: ${gitCheck.error.message}`);
}

const dirtyTargets = String(gitCheck.stdout || "").trim();

if (dirtyTargets) {
  stop(
    [
      "以下目标文件已经存在未提交修改。",
      "为避免覆盖你的现有代码，本次没有继续:",
      dirtyTargets,
    ].join("\n")
  );
}

const now = new Date();

const stamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
  "_",
  String(now.getHours()).padStart(2, "0"),
  String(now.getMinutes()).padStart(2, "0"),
  String(now.getSeconds()).padStart(2, "0"),
].join("");

const backupDir = path.join(
  root,
  "reports",
  `valve-series-selection-backup-${stamp}`
);

fs.mkdirSync(backupDir, {
  recursive: true,
});

for (const filePath of targetFiles) {
  const backupPath = path.join(
    backupDir,
    relative(filePath)
  );

  fs.mkdirSync(path.dirname(backupPath), {
    recursive: true,
  });

  fs.copyFileSync(filePath, backupPath);
}

function readSource(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");

  return {
    eol: raw.includes("\r\n") ? "\r\n" : "\n",
    content: raw.replace(/\r\n/g, "\n"),
  };
}

function writeSource(filePath, content, eol) {
  const output =
    eol === "\r\n"
      ? content.replace(/\n/g, "\r\n")
      : content;

  fs.writeFileSync(filePath, output, "utf8");
}

function countText(content, searchText) {
  if (!searchText) {
    return 0;
  }

  return content.split(searchText).length - 1;
}

function replaceExact(
  content,
  searchText,
  replacementText,
  expectedCount,
  label
) {
  const actualCount = countText(content, searchText);

  if (actualCount !== expectedCount) {
    stop(
      [
        `定位失败: ${label}`,
        `预期命中: ${expectedCount}`,
        `实际命中: ${actualCount}`,
        "没有继续写入文件。",
      ].join("\n")
    );
  }

  return content.split(searchText).join(replacementText);
}

/* =========================================================
 * 修改 ProductSelectionClient.tsx
 * ========================================================= */

const clientSource = readSource(clientPath);
let client = clientSource.content;

client = replaceExact(
  client,
  `export default function ProductSelectionClient({`,
  `function getCategoryDefaultProductTypeId(
  categoryId: string
) {
  return categoryId === "valves"
    ? ""
    : getFirstProductTypeId(categoryId);
}

export default function ProductSelectionClient({`,
  1,
  "增加阀系列无默认选中辅助函数"
);

client = replaceExact(
  client,
  `initialProductTypeId || getFirstProductTypeId(initialActiveCategoryId);`,
  `initialProductTypeId ||
        getCategoryDefaultProductTypeId(initialActiveCategoryId);`,
  3,
  "替换初始化阶段的默认产品类型"
);

client = replaceExact(
  client,
  `: getFirstProductTypeId(nextCategoryId);`,
  `: getCategoryDefaultProductTypeId(nextCategoryId);`,
  1,
  "替换URL同步阶段的默认产品类型"
);

client = replaceExact(
  client,
  `const firstProductTypeId = getFirstProductTypeId(categoryId);`,
  `const firstProductTypeId =
      getCategoryDefaultProductTypeId(categoryId);`,
  1,
  "替换大类切换阶段的默认产品类型"
);

client = replaceExact(
  client,
  `const firstProductTypeId = getFirstProductTypeId(activeCategoryId);`,
  `const firstProductTypeId =
      getCategoryDefaultProductTypeId(activeCategoryId);`,
  1,
  "替换清除筛选阶段的默认产品类型"
);

client = replaceExact(
  client,
  `        title:
          activeCategoryId === "fittings" && locale === "zh"
            ? "产品种类"
            : pageText.productTypeLabel,`,
  `        title:
          activeCategoryId === "valves" && locale === "zh"
            ? "阀系列"
            : activeCategoryId === "fittings" && locale === "zh"
              ? "产品种类"
              : pageText.productTypeLabel,`,
  1,
  "将阀页面筛选标题改为阀系列"
);

client = replaceExact(
  client,
  `  function handleProductTypeChange(productTypeId: string) {
    /*
`,
  `  function handleProductTypeChange(productTypeId: string) {
    /*
     * 阀系列在当前产品中心页面内完成筛选。
     * 再次点击当前阀系列时取消筛选，并恢复三张卡片。
     */
    if (activeCategoryId === "valves") {
      const nextProductTypeId =
        activeProductTypeId === productTypeId
          ? ""
          : productTypeId;

      setActiveProductTypeId(nextProductTypeId);
      setSelectedFilters({});
      setSearchKeyword("");
      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups(
          nextProductTypeId
        )
      );

      return;
    }

    /*
`,
  1,
  "增加阀系列再次点击取消逻辑"
);

client = replaceExact(
  client,
  `                resultSuffix={pageText.resultSuffix}`,
  `                resultSuffix={
                  activeCategoryId === "valves" &&
                  locale === "zh"
                    ? " 个阀系列"
                    : pageText.resultSuffix
                }`,
  1,
  "修改阀系列结果数量后缀"
);

writeSource(
  clientPath,
  client,
  clientSource.eol
);

/* =========================================================
 * 修改 ProductFilterPanel.tsx
 * ========================================================= */

const panelSource = readSource(panelPath);
let panel = panelSource.content;

panel = replaceExact(
  panel,
  `    <aside
      className="filter-panel"
      data-product-type-id={activeProductTypeId || ""}>`,
  `    <aside
      className="filter-panel"
      data-category-id={activeCategory.id}
      data-product-type-id={activeProductTypeId || ""}>`,
  1,
  "给筛选面板增加产品大类标识"
);

writeSource(
  panelPath,
  panel,
  panelSource.eol
);

/* =========================================================
 * 修改 products.css
 * ========================================================= */

const cssSource = readSource(cssPath);
let css = cssSource.content;

const cssMarker =
  "/* VALVE_SERIES_FILTER_THREE_COLUMNS_START */";

if (css.includes(cssMarker)) {
  stop(
    "检测到阀系列三列样式已经存在，未重复追加。"
  );
}

css = `${css.trimEnd()}

/* VALVE_SERIES_FILTER_THREE_COLUMNS_START */

/*
 * 阀系列的三个筛选项在PC端同一行显示。
 * 该规则只作用于阀系列，不影响泵、针、接头和其他筛选页面。
 */
@media (min-width: 761px) {
  .products-selection-page
    .filter-panel[data-category-id="valves"]
    .product-type-filter-group
    .filter-options {
    grid-template-columns: repeat(
      3,
      minmax(0, 1fr)
    );
    gap: 6px;
  }

  .products-selection-page
    .filter-panel[data-category-id="valves"]
    .product-type-filter-group
    .filter-option {
    min-width: 0;
    padding-left: 8px;
    padding-right: 8px;
  }
}

/* VALVE_SERIES_FILTER_THREE_COLUMNS_END */
`;

writeSource(
  cssPath,
  css,
  cssSource.eol
);

/* =========================================================
 * 执行构建
 * ========================================================= */

console.log("");
console.log("代码修改完成，开始执行 npm run build...");
console.log("");

const buildResult = spawnSync(
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

const reportLines = [
  "# 阀系列筛选修改报告",
  "",
  `生成时间: ${new Date().toLocaleString("zh-CN")}`,
  `备份目录: ${relative(backupDir)}`,
  "",
  "## 修改文件",
  "",
  "- components/products/selection/ProductSelectionClient.tsx",
  "- components/products/selection/ProductFilterPanel.tsx",
  "- app/products/products.css",
  "",
  "## 已完成内容",
  "",
  "1. 阀系列页面初次进入时不再默认选中旋转阀。",
  "2. 未筛选状态同时显示旋转阀、高压阀和电磁阀。",
  "3. 左侧产品类型标题改为阀系列。",
  "4. 三个阀筛选按钮在PC端同一行显示。",
  "5. 点击一个阀系列后只显示对应产品。",
  "6. 再次点击已选中的阀系列时取消筛选。",
  "7. 取消筛选后恢复三张阀产品卡片。",
  "8. 阀页面结果文字改为已找到N个阀系列。",
  "9. 未修改阀产品名称、参数、图片和详情链接。",
  "",
  "## 构建结果",
  "",
  buildPassed
    ? "npm run build 已通过。"
    : "npm run build 未通过，请查看终端中的具体错误。",
  "",
];

fs.writeFileSync(
  reportPath,
  reportLines.join("\n"),
  "utf8"
);

console.log("");
console.log("============================================");
console.log("阀系列筛选修改完成");
console.log(`备份目录: ${backupDir}`);
console.log(`修改报告: ${reportPath}`);
console.log(
  buildPassed
    ? "构建结果: 通过"
    : "构建结果: 未通过"
);
console.log("============================================");
console.log("");

if (!buildPassed) {
  process.exit(1);
}
