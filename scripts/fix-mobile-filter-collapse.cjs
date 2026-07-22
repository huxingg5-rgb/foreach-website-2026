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

const targetFiles = [
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
    stop(`未找到目标文件: ${relative(filePath)}`);
  }
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

  fs.writeFileSync(
    filePath,
    output,
    "utf8"
  );
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
        "未写入项目文件。",
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
  const matches = content.match(pattern);

  if (!matches) {
    stop(
      [
        `定位失败: ${label}`,
        `实际命中: ${matches ? matches.length : 0}`,
        "未写入项目文件。",
      ].join("\n")
    );
  }

  return content.replace(
    pattern,
    replacement
  );
}

function containsSourceFile(directoryPath) {
  const entries = fs.readdirSync(
    directoryPath,
    {
      withFileTypes: true,
    }
  );

  for (const entry of entries) {
    const fullPath = path.join(
      directoryPath,
      entry.name
    );

    if (entry.isDirectory()) {
      if (containsSourceFile(fullPath)) {
        return true;
      }

      continue;
    }

    if (
      /\.(ts|tsx|js|jsx)$/i.test(
        entry.name
      )
    ) {
      return true;
    }
  }

  return false;
}

function moveDirectory(
  sourcePath,
  destinationPath
) {
  fs.mkdirSync(
    path.dirname(destinationPath),
    {
      recursive: true,
    }
  );

  try {
    fs.renameSync(
      sourcePath,
      destinationPath
    );
  }
  catch {
    fs.cpSync(
      sourcePath,
      destinationPath,
      {
        recursive: true,
      }
    );

    fs.rmSync(
      sourcePath,
      {
        recursive: true,
        force: true,
      }
    );
  }
}

const now = new Date();

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

/*
 * 备份统一放到项目外，
 * 避免 Next.js 把备份中的 TSX 当作正式源码检查。
 */
const externalBackupRoot = path.join(
  path.dirname(root),
  `${path.basename(root)}-backups`
);

fs.mkdirSync(
  externalBackupRoot,
  {
    recursive: true,
  }
);

/*
 * 移走之前错误放在 reports 目录里的源码备份。
 * 只移动名称中包含 backup 且内部含源码文件的目录。
 */
const movedOldBackups = [];
const reportsDir = path.join(
  root,
  "reports"
);

if (fs.existsSync(reportsDir)) {
  const reportEntries = fs.readdirSync(
    reportsDir,
    {
      withFileTypes: true,
    }
  );

  for (const entry of reportEntries) {
    if (
      !entry.isDirectory() ||
      !/backup/i.test(entry.name)
    ) {
      continue;
    }

    const sourceDirectory = path.join(
      reportsDir,
      entry.name
    );

    if (!containsSourceFile(sourceDirectory)) {
      continue;
    }

    const destinationDirectory = path.join(
      externalBackupRoot,
      "moved-from-project-reports",
      `${entry.name}-${stamp}`
    );

    moveDirectory(
      sourceDirectory,
      destinationDirectory
    );

    movedOldBackups.push(
      destinationDirectory
    );
  }
}

const panelSource = readSource(
  panelPath
);

const cssSource = readSource(
  cssPath
);

let panel = panelSource.content;
let css = cssSource.content;

const codeMarker =
  "MOBILE_FILTER_ALL_GROUPS_COLLAPSE_START";

const cssMarker =
  "MOBILE_FILTER_ALL_GROUPS_COLLAPSE_CSS_START";

if (
  panel.includes(codeMarker) ||
  css.includes(cssMarker)
) {
  stop(
    "检测到本次手机端折叠修改已经执行过，没有重复修改。"
  );
}

/* =========================================================
 * 一、接入已经存在的手机端展开状态
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
  "接收手机端筛选组状态"
);

/* =========================================================
 * 二、改造倒刺接头组合内径筛选
 * ========================================================= */

const barbedStart = panel.indexOf(
  "function BarbedPortFilterGroup({"
);

const barbedEnd = panel.indexOf(
  "/* BARBED_PORT_FILTER_GROUP_END */"
);

if (
  barbedStart < 0 ||
  barbedEnd < 0 ||
  barbedEnd <= barbedStart
) {
  stop(
    "未找到倒刺接头组合筛选函数。"
  );
}

let barbedFunction = panel.slice(
  barbedStart,
  barbedEnd
);

barbedFunction = replaceRegexOnce(
  barbedFunction,
  /function BarbedPortFilterGroup\(\{\s*filterGroups,\s*isOptionActive,\s*isOptionDisabled,\s*onFilterChange,\s*\}: \{/,
  `function BarbedPortFilterGroup({
  filterGroups,
  isOptionActive,
  isOptionDisabled,
  onFilterChange,
  isOpen,
  onToggle,
  onClose,
}: {`,
  "增加倒刺组合筛选折叠参数"
);

barbedFunction = replaceRegexOnce(
  barbedFunction,
  /(\s+onFilterChange:\s*\([\s\S]*?\)\s*=>\s*void;)\s*\}\)\s*\{/,
  `$1

  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {`,
  "增加倒刺组合筛选参数类型"
);

barbedFunction = replaceExact(
  barbedFunction,
  `    <section
      className="filter-group barbed-port-filter-group is-mobile-open"
      data-barbed-port-filter="true"
    >
      <div className="barbed-port-heading-grid">`,
  `    <section
      className={\`filter-group barbed-port-filter-group\${isOpen ? " is-mobile-open" : ""}\`}
      data-barbed-port-filter="true"
    >
      <button
        className="filter-group-trigger barbed-port-mobile-trigger"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>接管内径</span>

        <span
          className="filter-group-symbol"
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div className="barbed-port-filter-content">
      <div className="barbed-port-heading-grid">`,
  1,
  "增加倒刺组合筛选标题"
);

barbedFunction = replaceExact(
  barbedFunction,
  `                            onFilterChange(
                              group,
                              value
                            );`,
  `                            onFilterChange(
                              group,
                              value
                            );

                            onClose();`,
  1,
  "倒刺组合筛选选择后自动收起"
);

const barbedFunctionTail =
  `      </div>
    </section>
  );
}
`;

if (
  !barbedFunction.endsWith(
    barbedFunctionTail
  )
) {
  stop(
    "未能确认倒刺组合筛选函数结尾。"
  );
}

barbedFunction =
  barbedFunction.slice(
    0,
    -barbedFunctionTail.length
  ) +
  `      </div>
      </div>
    </section>
  );
}
`;

panel =
  panel.slice(0, barbedStart) +
  barbedFunction +
  panel.slice(barbedEnd);

/*
 * 父组件把 filter02 的手机端状态传给倒刺组合筛选。
 */
panel = replaceRegexOnce(
  panel,
  /<BarbedPortFilterGroup\s+filterGroups=\{filterGroups\}\s+isOptionActive=\{isOptionActive\}\s+isOptionDisabled=\{isOptionDisabled\}\s+onFilterChange=\{onFilterChange\}\s+\/>/,
  `<BarbedPortFilterGroup
                  filterGroups={filterGroups}
                  isOptionActive={isOptionActive}
                  isOptionDisabled={isOptionDisabled}
                  onFilterChange={onFilterChange}
                  isOpen={Boolean(
                    mobileOpenFilterGroups?.[
                      group.key
                    ]
                  )}
                  onToggle={() =>
                    onToggleMobileGroup?.(
                      group.key
                    )
                  }
                  onClose={() => {
                    if (
                      mobileOpenFilterGroups?.[
                        group.key
                      ]
                    ) {
                      onToggleMobileGroup?.(
                        group.key
                      );
                    }
                  }}
                />`,
  "传递倒刺组合筛选折叠状态"
);

/* =========================================================
 * 三、普通筛选组全部接入折叠状态
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
  `          /* MOBILE_FILTER_ALL_GROUPS_COLLAPSE_START */

          /*
           * 接头产品种类继续使用原来的独立状态。
           * 其他筛选组使用 ProductSelectionClient 传入的手机端状态。
           *
           * PC端仍由CSS保持全部展开。
           */
          const isGroupOpen =
            isCollapsibleProductType
              ? isFittingProductTypeOpen
              : Boolean(
                  mobileOpenFilterGroups?.[
                    group.key
                  ]
                );

          /* MOBILE_FILTER_ALL_GROUPS_COLLAPSE_END */`,
  1,
  "普通筛选组接入手机端状态"
);

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
  "所有筛选标题支持点击展开"
);

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
  "选择筛选项后自动收起"
);

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
                    className="filter-group-symbol"
                    aria-hidden="true"
                  >
                    {isGroupOpen ? "−" : "+"}
                  </span>
                ) : null}`,
  1,
  "所有筛选标题显示加减符号"
);

/*
 * 普通筛选组始终保留在DOM中：
 * PC端正常显示；
 * 手机端由 is-mobile-open CSS控制。
 *
 * 接头产品种类保留原来的真实渲染折叠逻辑。
 */
panel = replaceExact(
  panel,
  `              {isGroupOpen ? renderOptions() : null}`,
  `              {isCollapsibleProductType
                ? isGroupOpen
                  ? renderOptions()
                  : null
                : renderOptions()}`,
  1,
  "保持PC端筛选内容显示"
);

/* =========================================================
 * 四、增加移动端CSS兜底
 * ========================================================= */

css = `${css.trimEnd()}

/* MOBILE_FILTER_ALL_GROUPS_COLLAPSE_CSS_START */

/*
 * 手机端所有筛选组统一折叠。
 * 放在文件末尾，覆盖前面个别产品筛选的 display: grid !important。
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
    .barbed-port-filter-content {
    display: none !important;
  }

  .products-selection-page
    .barbed-port-filter-group.is-mobile-open
    .barbed-port-filter-content {
    display: block !important;
  }

  .products-selection-page
    .barbed-port-mobile-trigger {
    display: flex !important;
  }
}

/*
 * PC端倒刺接头组合筛选保持正常展开。
 */
@media (min-width: 761px) {
  .products-selection-page
    .barbed-port-filter-content {
    display: block !important;
  }

  .products-selection-page
    .barbed-port-mobile-trigger {
    display: none !important;
  }
}

/* MOBILE_FILTER_ALL_GROUPS_COLLAPSE_CSS_END */
`;

/* =========================================================
 * 五、全部定位成功后再备份
 * ========================================================= */

const backupDir = path.join(
  externalBackupRoot,
  `mobile-filter-collapse-${stamp}`
);

fs.mkdirSync(
  backupDir,
  {
    recursive: true,
  }
);

for (const filePath of targetFiles) {
  const backupName =
    relative(filePath)
      .replace(/\//g, "__") +
    ".txt";

  fs.copyFileSync(
    filePath,
    path.join(
      backupDir,
      backupName
    )
  );
}

/* =========================================================
 * 六、写入文件
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
 * 七、构建
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
  "1. 手机端所有普通筛选组默认收起。",
  "2. 点击筛选标题可展开或收起。",
  "3. 选择任意筛选项后自动收起当前组。",
  "4. 已选状态继续保留。",
  "5. PC端筛选内容保持展开。",
  "6. 倒刺接头组合内径筛选也支持折叠。",
  "7. 未修改产品数据和筛选匹配规则。",
  "",
  "## 修改文件",
  "",
  "- components/products/selection/ProductFilterPanel.tsx",
  "- app/products/products.css",
  "",
  "## 移出的旧项目内备份",
  "",
  movedOldBackups.length > 0
    ? movedOldBackups
        .map((item) => `- ${item}`)
        .join("\n")
    : "- 未发现会参与构建的旧备份目录。",
  "",
  "## 构建结果",
  "",
  buildPassed
    ? "npm run build 已通过。"
    : "npm run build 未通过，两个源文件已自动恢复。",
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

if (buildPassed) {
  console.log(
    "手机端筛选折叠修改完成"
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
