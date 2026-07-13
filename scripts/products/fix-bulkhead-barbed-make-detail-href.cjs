const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const targetPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-detail-href-branch-fix.md"
);

const startMarker =
  "/* BULKHEAD_BARBED_DETAIL_HREF_START */";

const endMarker =
  "/* BULKHEAD_BARBED_DETAIL_HREF_END */";

function assertTsSyntax(fileName, source) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
    },
    reportDiagnostics: true,
    fileName,
  });

  const errors = (result.diagnostics || []).filter(
    (diagnostic) =>
      diagnostic.category === ts.DiagnosticCategory.Error
  );

  if (errors.length) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
        errors
          .map((diagnostic) =>
            ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )
          )
          .join("\n")
    );
  }
}

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到 ProductSelectionClient.tsx：" +
      targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

if (!source.includes("function makeDetailHref(")) {
  throw new Error(
    "没有找到 makeDetailHref 函数。"
  );
}

if (
  source.includes(startMarker) ||
  source.includes(endMarker)
) {
  console.log(
    "穿板倒刺接头详情链接分支已存在，无需重复写入。"
  );
  process.exit(0);
}

const anchor =
  "  /* BARBED_FITTING_DETAIL_HREF_START */";

const anchorCount =
  source.split(anchor).length - 1;

if (anchorCount !== 1) {
  throw new Error(
    `无法唯一定位倒刺接头详情链接分支：${anchorCount}`
  );
}

const block = `  ${startMarker}

  /*
   * 穿板倒刺接头与六角螺母具体型号详情链接。
   *
   * 选型卡片不能回退到通用动态页面
   * /products/[category]/[slug]，
   * 必须进入本系列的具体型号详情路由。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)?.productTypeId ||
        ""
      ).trim();

    const rawSourceType =
      String(
        (product as any)?.sourceType ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)?.detailHref ||
        (product as any)?.productHref ||
        (product as any)?.detailUrl ||
        (product as any)?.href ||
        ""
      ).trim();

    const isBulkheadBarbed =
      rawProductTypeId ===
        "bulkhead-barbed-fittings" ||
      rawSourceType ===
        "bulkhead-barbed-selection" ||
      rawExistingHref.includes(
        "/products/fittings/bulkhead-barbed-fittings/"
      );

    if (isBulkheadBarbed) {
      /*
       * 数据中已经存在完整具体型号链接时，
       * 直接使用，不再经过通用路由推导。
       */
      if (
        /^\\/products\\/fittings\\/bulkhead-barbed-fittings\\/[a-z0-9-]+(?:[?#].*)?$/i.test(
          rawExistingHref
        )
      ) {
        return rawExistingHref;
      }

      const rawCardTitle =
        (product as any)?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const rawSlug =
        String(
          (product as any)?.detailSlug ||
          (product as any)?.slug ||
          (product as any)?.productSlug ||
          (product as any)?.model ||
          (product as any)?.displayModel ||
          (product as any)?.modelDisplay ||
          cardTitleText ||
          ""
        )
          .trim()
          .split("/")
          .filter(Boolean)
          .pop() ||
        "";

      const modelSlug =
        rawSlug
          .toLowerCase()
          .replace(/μ/g, "u")
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          );

      return modelSlug
        ? "/products/fittings/bulkhead-barbed-fittings/" +
            modelSlug
        : "/products/fittings/bulkhead-barbed-fittings";
    }
  }

  ${endMarker}

`;

source = source.replace(
  anchor,
  block + anchor
);

assertTsSyntax(
  "ProductSelectionClient.tsx",
  source
);

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

const backupPath =
  `${targetPath}.bak_bulkhead_detail_href_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

const report = [
  "# 穿板倒刺接头详情链接分支修复",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 修改范围",
  "",
  "- 文件：components/products/selection/ProductSelectionClient.tsx",
  "- 函数：makeDetailHref",
  "- 新增穿板倒刺接头专属详情链接分支",
  "- 未修改详情页组件",
  "- 未修改CSS",
  "- 未修改产品数据",
  "",
  "## 识别条件",
  "",
  "- productTypeId = bulkhead-barbed-fittings",
  "- sourceType = bulkhead-barbed-selection",
  "- 或已有链接包含 /products/fittings/bulkhead-barbed-fittings/",
  "",
  "## 目标路由",
  "",
  "- /products/fittings/bulkhead-barbed-fittings/[model-slug]",
  "",
  `- 备份：${backupPath}`,
  "",
];

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n"),
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "穿板倒刺接头详情链接分支修复完成"
);
console.log(
  "============================================"
);
console.log(
  "修改文件：",
  targetPath
);
console.log(
  "备份：",
  backupPath
);
console.log(
  "报告：",
  reportPath
);
console.log("");
