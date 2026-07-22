const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();

const filePath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

function stop(message) {
  console.error("");
  console.error("操作停止:");
  console.error(message);
  console.error("");
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  stop(`未找到文件: ${filePath}`);
}

const original = fs.readFileSync(
  filePath,
  "utf8"
);

const eol = original.includes("\r\n")
  ? "\r\n"
  : "\n";

let content = original.replace(
  /\r\n/g,
  "\n"
);

const marker =
  "VALVE_SINGLE_CATEGORY_FINAL_START";

if (content.includes(marker)) {
  stop(
    "本次阀系列单一分类修改已经执行过。"
  );
}

function replaceExact(
  searchText,
  replacementText,
  label
) {
  const count =
    content.split(searchText).length - 1;

  if (count !== 1) {
    stop(
      [
        `定位失败: ${label}`,
        "预期命中: 1",
        `实际命中: ${count}`,
        "没有修改源文件。",
      ].join("\n")
    );
  }

  content = content.replace(
    searchText,
    replacementText
  );
}

/* =========================================================
 * 1. 阀系列默认选中唯一分类
 * ========================================================= */

replaceExact(
`function getCategoryDefaultProductTypeId(
  categoryId: string
) {
  return categoryId === "valves"
    ? ""
    : getFirstProductTypeId(categoryId);
}`,
`function getCategoryDefaultProductTypeId(
  categoryId: string
) {
  return categoryId === "valves"
    ? "valve-series"
    : getFirstProductTypeId(categoryId);
}`,
  "设置阀系列默认分类"
);

/* =========================================================
 * 2. 左侧只保留一个阀系列选项
 * ========================================================= */

replaceExact(
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

    /* VALVE_SINGLE_CATEGORY_FINAL_START */

    /*
     * 阀系列左侧不再显示旋转阀、高压阀、电磁阀三个选项。
     * 产品类别下只保留一个阀系列。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      return [
        {
          value: "valve-series",
          label:
            locale === "zh"
              ? "阀系列"
              : "Valve Series",
        },
      ];
    }

    /* VALVE_SINGLE_CATEGORY_FINAL_END */

    if (
      activeCategoryId ===
      "fittings"
    ) {`,
  "生成唯一阀系列选项"
);

/* =========================================================
 * 3. 左侧标题改为产品类别
 * ========================================================= */

replaceExact(
`          activeCategoryId === "valves" && locale === "zh"
            ? "阀系列"
            : activeCategoryId === "fittings" && locale === "zh"`,
`          activeCategoryId === "valves" && locale === "zh"
            ? "产品类别"
            : activeCategoryId === "fittings" && locale === "zh"`,
  "修改阀系列筛选标题"
);

/* =========================================================
 * 4. valve-series 匹配全部三种阀产品
 * ========================================================= */

replaceExact(
`  if (!activeProductTypeId) {
    return true;
  }

  if (
    categoryId ===
      "fittings" &&`,
`  if (!activeProductTypeId) {
    return true;
  }

  /*
   * 阀系列是统一产品类别，
   * 同时匹配旋转阀、高压阀和电磁阀。
   */
  if (
    categoryId === "valves" &&
    activeProductTypeId ===
      "valve-series"
  ) {
    return true;
  }

  if (
    categoryId ===
      "fittings" &&`,
  "让阀系列匹配全部阀卡片"
);

/* =========================================================
 * 5. 点击阀系列后保持三张卡片全部显示
 * ========================================================= */

replaceExact(
`    /*
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
    }`,
`    /*
     * 阀系列是统一产品类别。
     * 点击后保持阀系列选中，并显示全部三张阀卡片。
     */
    if (
      activeCategoryId ===
      "valves"
    ) {
      setActiveProductTypeId(
        "valve-series"
      );

      setSelectedFilters(
        {}
      );

      setSearchKeyword(
        ""
      );

      setMobileOpenFilterGroups(
        getDefaultMobileOpenFilterGroups(
          "valve-series"
        )
      );

      return;
    }`,
  "固定阀系列点击逻辑"
);

/* =========================================================
 * 6. 项目外备份
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
  `valve-single-category-${stamp}`
);

fs.mkdirSync(
  backupDir,
  {
    recursive: true,
  }
);

fs.writeFileSync(
  path.join(
    backupDir,
    "ProductSelectionClient.tsx.txt"
  ),
  original,
  "utf8"
);

/* =========================================================
 * 7. 写入文件
 * ========================================================= */

const output =
  eol === "\r\n"
    ? content.replace(/\n/g, "\r\n")
    : content;

fs.writeFileSync(
  filePath,
  output,
  "utf8"
);

/* =========================================================
 * 8. 构建
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
    filePath,
    original,
    "utf8"
  );

  console.error("");
  console.error(
    "构建失败，源文件已自动恢复。"
  );
  console.error(
    `备份目录: ${backupDir}`
  );

  process.exit(1);
}

console.log("");
console.log(
  "============================================"
);
console.log(
  "阀系列产品类别修改完成"
);
console.log(
  "左侧只保留一个阀系列选项"
);
console.log(
  "右侧三张阀卡片全部保留"
);
console.log(
  `备份目录: ${backupDir}`
);
console.log(
  "============================================"
);
console.log("");
