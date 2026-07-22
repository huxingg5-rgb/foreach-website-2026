const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();

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
  "手机端产品筛选折叠修改报告.md"
);

function stop(message) {
  console.error("");
  console.error("操作停止:");
  console.error(message);
  console.error("");
  process.exit(1);
}

function readSource(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");

  return {
    raw,
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
  return content.split(searchText).length - 1;
}

function replaceExact(
  content,
  searchText,
  replacementText,
  expectedCount,
  label
) {
  const actualCount = countText(
    content,
    searchText
  );

  if (actualCount !== expectedCount) {
    stop(
      [
        `定位失败: ${label}`,
        `预期命中: ${expectedCount}`,
        `实际命中: ${actualCount}`,
        "未修改项目源文件。",
      ].join("\n")
    );
  }

  return content
    .split(searchText)
    .join(replacementText);
}

function replaceOneRegex(
  content,
  pattern,
  replacement,
  label
) {
  const flags = pattern.flags.includes("g")
    ? pattern.flags
    : pattern.flags + "g";

  const globalPattern = new RegExp(
    pattern.source,
    flags
  );

  const matches = Array.from(
    content.matchAll(globalPattern)
  );

  if (matches.length !== 1) {
    stop(
      [
        `定位失败: ${label}`,
        "预期命中: 1",
        `实际命中: ${matches.length}`,
        "未修改项目源文件。",
      ].join("\n")
    );
  }

  return content.replace(
    pattern,
    replacement
  );
}

if (!fs.existsSync(panelPath)) {
  stop(`未找到文件: ${panelPath}`);
}

if (!fs.existsSync(cssPath)) {
  stop(`未找到文件: ${cssPath}`);
}

const panelSource = readSource(panelPath);
const cssSource = readSource(cssPath);

let panel = panelSource.content;
let css = cssSource.content;

const codeMarker =
  "MOBILE_FILTER_COLLAPSE_V2_START";

const cssMarker =
  "MOBILE_FILTER_COLLAPSE_V2_CSS_START";

if (
  panel.includes(codeMarker) ||
  css.includes(cssMarker)
) {
  stop(
    "检测到本次修改已经执行过，没有重复修改。"
  );
}

/* =========================================================
 * 1. 接收手机端筛选组状态
 * ========================================================= */

panel = replaceExact(
  panel,
  `  filterGroups,
  emptyText,
  isOptionActive,
  isOptionDisabled,
  onFilterChange,
}: ProductFilterPanelProps) {`,
  `  filterGroups,
  mobileOpenFilterGroups,
  emptyText,
  onToggleMobileGroup,
  isOptionActive,
  isOptionDisabled,
  onFilterChange,
}: ProductFilterPanelProps) {`,
  1,
  "接收手机端折叠状态"
);

/* =========================================================
 * 2. 倒刺接头组合筛选增加外层折叠
 * 不修改 BarbedPortFilterGroup 函数内部
 * ========================================================= */

const barbedBlockPattern =
  /          if \(\n            activeProductTypeId === "barbed-fittings" &&\n            group\.key === "filter02"\n          \) \{\n            return \(\n              <div\n                data-barbed-filter-group="ports"\n                key="barbed-port-filter-group"\n              >\n                <BarbedPortFilterGroup[\s\S]*?                \/>\n              <\/div>\n            \);\n          \}/;

panel = replaceOneRegex(
  panel,
  barbedBlockPattern,
  `          if (
            activeProductTypeId === "barbed-fittings" &&
            group.key === "filter02"
          ) {
            const isBarbedPortGroupOpen =
              Boolean(
                mobileOpenFilterGroups?.[
                  group.key
                ]
              );

            return (
              <div
                className={[
                  "barbed-port-filter-wrapper",
                  isBarbedPortGroupOpen
                    ? "is-mobile-open"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-barbed-filter-group="ports"
                key="barbed-port-filter-group"
              >
                <button
                  className="filter-group-trigger barbed-port-mobile-trigger"
                  type="button"
                  onClick={() =>
                    onToggleMobileGroup?.(
                      group.key
                    )
                  }
                  aria-expanded={
                    isBarbedPortGroupOpen
                  }
                >
                  <span>接管内径</span>

                  <span
                    className="filter-group-symbol"
                    aria-hidden="true"
                  >
                    {isBarbedPortGroupOpen
                      ? "−"
                      : "+"}
                  </span>
                </button>

                <div className="barbed-port-filter-body">
                  <BarbedPortFilterGroup
                    filterGroups={filterGroups}
                    isOptionActive={isOptionActive}
                    isOptionDisabled={isOptionDisabled}
                    onFilterChange={(
                      targetGroup,
                      value
                    ) => {
                      onFilterChange(
                        targetGroup,
                        value
                      );

                      if (
                        isBarbedPortGroupOpen
                      ) {
                        onToggleMobileGroup?.(
                          group.key
                        );
                      }
                    }}
                  />
                </div>
              </div>
            );
          }`,
  "改造倒刺接头组合筛选"
);

/* =========================================================
 * 3. 普通筛选组使用手机端状态
 * ========================================================= */

panel = replaceExact(
  panel,
  `          /*
           * 只有接头的产品种类使用状态控制。
           * 其他所有组始终展开。
           */
          const isGroupOpen = isCollapsibleProductType
            ? isFittingProductTypeOpen
            : true;`,
  `          /* MOBILE_FILTER_COLLAPSE_V2_START */

          /*
           * 接头产品种类继续使用原有独立状态。
           * 其他筛选组使用手机端展开状态。
           * PC端由CSS保持正常显示。
           */
          const isGroupOpen =
            isCollapsibleProductType
              ? isFittingProductTypeOpen
              : Boolean(
                  mobileOpenFilterGroups?.[
                    group.key
                  ]
                );

          /* MOBILE_FILTER_COLLAPSE_V2_END */`,
  1,
  "普通筛选组接入状态"
);

/* =========================================================
 * 4. 所有筛选标题支持点击
 * ========================================================= */

panel = replaceExact(
  panel,
  `          const handleToggleGroup = () => {
            if (!isCollapsibleProductType) {
              return;
            }

            setIsFittingProductTypeOpen(
              (current) => !current
            );
          };`,
  `          const handleToggleGroup = () => {
            if (isCollapsibleProductType) {
              setIsFittingProductTypeOpen(
                (current) => !current
              );

              return;
            }

            onToggleMobileGroup?.(
              group.key
            );
          };`,
  1,
  "筛选标题点击逻辑"
);

/* =========================================================
 * 5. 选择选项后自动收起
 * ========================================================= */

panel = replaceExact(
  panel,
  `                      /*
                       * 选择接头产品种类后自动收起。
                       */
                      if (
                        isCollapsibleProductType
                      ) {
                        setIsFittingProductTypeOpen(
                          false
                        );
                      }`,
  `                      /*
                       * 手机端选择任意筛选项后，
                       * 自动收起当前筛选组。
                       */
                      if (
                        isCollapsibleProductType
                      ) {
                        setIsFittingProductTypeOpen(
                          false
                        );
                      }
                      else if (
                        mobileOpenFilterGroups?.[
                          group.key
                        ]
                      ) {
                        onToggleMobileGroup?.(
                          group.key
                        );
                      }`,
  1,
  "选择后自动收起"
);

/* =========================================================
 * 6. 所有筛选标题增加加减符号
 * ========================================================= */

panel = replaceExact(
  panel,
  `                {isCollapsibleProductType ? (
                  <span
                    className="filter-group-symbol"
                    aria-hidden="true"
                  >
                    {isGroupOpen ? "−" : "+"}
                  </span>
                ) : null}`,
  `                {isCollapsibleProductType ||
                onToggleMobileGroup ? (
                  <span
                    className={
                      isCollapsibleProductType
                        ? "filter-group-symbol"
                        : "filter-group-symbol mobile-only-filter-symbol"
                    }
                    aria-hidden="true"
                  >
                    {isGroupOpen ? "−" : "+"}
                  </span>
                ) : null}`,
  1,
  "筛选标题加减符号"
);

/* =========================================================
 * 7. 普通筛选内容保留在DOM
 * PC显示，手机端由CSS控制
 * ========================================================= */

panel = replaceExact(
  panel,
  `              {isGroupOpen ? renderOptions() : null}`,
  `              {isCollapsibleProductType
                ? isGroupOpen
                  ? renderOptions()
                  : null
                : renderOptions()}`,
  1,
  "保留PC端筛选内容"
);

/* =========================================================
 * 8. 手机端CSS
 * ========================================================= */

css = `${css.trimEnd()}

/* MOBILE_FILTER_COLLAPSE_V2_CSS_START */

/*
 * 手机端普通筛选组默认收起。
 */
@media (max-width: 760px) {
  .products-selection-page
    .filter-panel
    .filter-group:not(.is-mobile-open)
    .filter-options {
    display: none !important;
  }

  .products-selection-page
    .filter-panel
    .filter-group.is-mobile-open
    .filter-options {
    display: grid !important;
  }

  .products-selection-page
    .barbed-port-filter-wrapper {
    border-bottom: 1px solid var(--line);
  }

  .products-selection-page
    .barbed-port-mobile-trigger {
    display: flex !important;
  }

  .products-selection-page
    .barbed-port-filter-body {
    display: none !important;
  }

  .products-selection-page
    .barbed-port-filter-wrapper.is-mobile-open
    .barbed-port-filter-body {
    display: block !important;
  }

  .products-selection-page
    .barbed-port-filter-wrapper
    .barbed-port-filter-group {
    border-bottom: 0;
  }
}

/*
 * PC端保持当前全部展开布局。
 */
@media (min-width: 761px) {
  .products-selection-page
    .mobile-only-filter-symbol {
    display: none !important;
  }

  .products-selection-page
    .barbed-port-mobile-trigger {
    display: none !important;
  }

  .products-selection-page
    .barbed-port-filter-body {
    display: block !important;
  }
}

/* MOBILE_FILTER_COLLAPSE_V2_CSS_END */
`;

/* =========================================================
 * 9. 项目外备份
 * ========================================================= */

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
  path.dirname(root),
  `${path.basename(root)}-backups`,
  `mobile-filter-collapse-v2-${stamp}`
);

fs.mkdirSync(
  backupDir,
  {
    recursive: true,
  }
);

fs.copyFileSync(
  panelPath,
  path.join(
    backupDir,
    "ProductFilterPanel.tsx.txt"
  )
);

fs.copyFileSync(
  cssPath,
  path.join(
    backupDir,
    "products.css.txt"
  )
);

/* =========================================================
 * 10. 写入
 * ========================================================= */

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
 * 11. 构建
 * ========================================================= */

console.log("");
console.log(
  "修改完成，开始运行 npm run build..."
);
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

if (!buildPassed) {
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
  "# 手机端产品筛选折叠修改报告",
  "",
  `生成时间: ${new Date().toLocaleString("zh-CN")}`,
  `项目外备份目录: ${backupDir}`,
  "",
  "## 修改结果",
  "",
  "1. 手机端筛选组默认收起。",
  "2. 点击筛选标题可以展开或收起。",
  "3. 选择任意选项后当前组自动收起。",
  "4. 已选状态继续保留。",
  "5. PC端保持当前展开布局。",
  "6. 倒刺接头组合内径筛选支持折叠。",
  "7. 未修改产品数据和筛选规则。",
  "",
  "## 修改文件",
  "",
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

console.log(
  buildPassed
    ? "手机端筛选折叠修改完成"
    : "构建失败，源文件已恢复"
);

console.log(
  `项目外备份: ${backupDir}`
);

console.log(
  `修改报告: ${reportPath}`
);

console.log(
  "============================================"
);

console.log("");

if (!buildPassed) {
  process.exit(1);
}
