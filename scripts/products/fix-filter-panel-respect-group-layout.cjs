const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductFilterPanel.tsx"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到文件：" + targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const marker =
  "FILTER_PANEL_RESPECT_GROUP_LAYOUT_START";

if (!source.includes(marker)) {
  /*
   * 保留原有自动判断逻辑，
   * 只是把它改名为 inferredShouldUseTwoColumns。
   */
  const oldDeclaration =
    "const shouldUseTwoColumns =";

  const declarationCount =
    source.split(
      oldDeclaration
    ).length - 1;

  if (declarationCount !== 1) {
    throw new Error(
      "无法唯一定位 shouldUseTwoColumns：" +
        declarationCount
    );
  }

  source = source.replace(
    oldDeclaration,
    "const inferredShouldUseTwoColumns ="
  );

  /*
   * 在生成CSS类名前，优先读取group.layout。
   *
   * group.layout = two：强制两列
   * group.layout = one：强制一列
   * 没有指定：沿用原来的自动判断
   */
  const classAnchor =
    "const filterOptionsClass =";

  const classAnchorCount =
    source.split(
      classAnchor
    ).length - 1;

  if (classAnchorCount !== 1) {
    throw new Error(
      "无法唯一定位 filterOptionsClass：" +
        classAnchorCount
    );
  }

  const layoutCode = `/* FILTER_PANEL_RESPECT_GROUP_LAYOUT_START */

          const shouldUseTwoColumns =
            group.layout === "two"
              ? true
              : group.layout === "one"
                ? false
                : inferredShouldUseTwoColumns;

          /* FILTER_PANEL_RESPECT_GROUP_LAYOUT_END */

          `;

  source = source.replace(
    classAnchor,
    layoutCode + classAnchor
  );
}

/* =========================================================
   检查修改结果
   ========================================================= */

const checks = {
  marker:
    source.includes(
      marker
    ),

  inferredLayout:
    source.includes(
      "const inferredShouldUseTwoColumns ="
    ),

  twoLayout:
    source.includes(
      'group.layout === "two"'
    ),

  oneLayout:
    source.includes(
      'group.layout === "one"'
    ),

  fallback:
    source.includes(
      ": inferredShouldUseTwoColumns;"
    ),

  classStillPresent:
    source.includes(
      "const filterOptionsClass ="
    ),
};

const failed =
  Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

if (failed.length) {
  throw new Error(
    "布局修复检查失败：" +
      failed.join("、")
  );
}

/* =========================================================
   TypeScript语法检查
   ========================================================= */

const result =
  ts.transpileModule(
    source,
    {
      compilerOptions: {
        target:
          ts.ScriptTarget.ES2022,

        module:
          ts.ModuleKind.ESNext,

        jsx:
          ts.JsxEmit.Preserve,
      },

      reportDiagnostics:
        true,

      fileName:
        "ProductFilterPanel.tsx",
    }
  );

const errors =
  (
    result.diagnostics ||
    []
  ).filter(
    (diagnostic) =>
      diagnostic.category ===
      ts.DiagnosticCategory.Error
  );

if (errors.length) {
  throw new Error(
    "修改后语法检查失败：\n" +
      errors
        .map(
          (diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
        )
        .join("\n")
  );
}

/* =========================================================
   备份并写入
   ========================================================= */

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${targetPath}.bak_respect_group_layout_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "筛选面板布局读取修复完成"
);
console.log(
  "============================================"
);
console.log(
  'group.layout = "two"：强制两个一排'
);
console.log(
  'group.layout = "one"：强制一个一排'
);
console.log(
  "其他产品：保留原有自动布局"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
