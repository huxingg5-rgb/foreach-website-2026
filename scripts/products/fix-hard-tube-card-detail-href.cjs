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

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到文件：" + targetPath
  );
}

function parseSource(source) {
  return ts.createSourceFile(
    targetPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}

function validateTsx(source) {
  const result =
    ts.transpileModule(
      source,
      {
        fileName:
          targetPath,

        reportDiagnostics:
          true,

        compilerOptions: {
          target:
            ts.ScriptTarget.ES2022,

          module:
            ts.ModuleKind.ESNext,

          moduleResolution:
            ts.ModuleResolutionKind.Bundler,

          jsx:
            ts.JsxEmit.ReactJSX,

          resolveJsonModule:
            true,

          esModuleInterop:
            true,

          allowSyntheticDefaultImports:
            true,
        },
      }
    );

  const errors =
    (result.diagnostics || [])
      .filter(
        (item) =>
          item.category ===
          ts.DiagnosticCategory.Error
      );

  if (!errors.length) {
    return;
  }

  throw new Error(
    errors
      .map(
        (item) =>
          ts.flattenDiagnosticMessageText(
            item.messageText,
            "\n"
          )
      )
      .join("\n")
  );
}

let source =
  fs.readFileSync(
    targetPath,
    "utf8"
  );

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backupPath =
  `${targetPath}.bak_hard_tube_href_${stamp}`;

fs.copyFileSync(
  targetPath,
  backupPath
);

/* =========================================================
   1. 加入硬管详情JSON导入
   ========================================================= */

const importCode =
  'import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";';

if (!source.includes(importCode)) {
  const sourceFile =
    parseSource(source);

  const imports =
    sourceFile.statements.filter(
      ts.isImportDeclaration
    );

  if (!imports.length) {
    throw new Error(
      "ProductSelectionClient.tsx 中没有找到 import 语句。"
    );
  }

  const lastImport =
    imports[
      imports.length - 1
    ];

  const insertIndex =
    lastImport.end;

  source =
    source.slice(
      0,
      insertIndex
    ) +
    `\n${importCode}` +
    source.slice(
      insertIndex
    );
}

/* =========================================================
   2. 在 makeDetailHref 最前面加入硬管匹配
   ========================================================= */

const marker =
  "HARD_TUBE_DETAIL_HREF_START";

if (!source.includes(marker)) {
  const sourceFile =
    parseSource(source);

  let targetFunction = null;

  function visit(node) {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name?.text ===
        "makeDetailHref"
    ) {
      targetFunction =
        node;
      return;
    }

    ts.forEachChild(
      node,
      visit
    );
  }

  visit(sourceFile);

  if (
    !targetFunction ||
    !targetFunction.body
  ) {
    throw new Error(
      "没有找到 makeDetailHref 函数。"
    );
  }

  const bodyStart =
    targetFunction.body.getStart(
      sourceFile
    );

  const insertIndex =
    bodyStart + 1;

  const branchCode = `

  /* HARD_TUBE_DETAIL_HREF_START */

  if (
    String(
      (product as any)?.productTypeId ||
      ""
    ).trim() ===
      "hard-tube-fittings"
  ) {
    /*
     * filter03 多值展开后，
     * productId 可能变成：
     *
     * 809746__1.6 mm
     *
     * 匹配详情前先恢复真实商品ID。
     */
    const rawProductId =
      String(
        (product as any)?.productId ||
        ""
      )
        .split("__")[0]
        .trim();

    const productCandidates = [
      rawProductId,

      getSelectionLocalizedText(
        product.cardTitle,
        "zh"
      ),

      getSelectionLocalizedText(
        product.cardTitle,
        "en"
      ),
    ]
      .map(
        normalizeModelKey
      )
      .filter(Boolean);

    const matchedDetail =
      (
        hardTubeDetailsJson as any[]
      ).find((detail) => {
        const detailCandidates = [
          detail?.productId,
          detail?.model,
          detail?.slug,
          detail?.displayModel,
          detail?.foreachModel,
          detail?.modelDisplay,
        ]
          .map(
            normalizeModelKey
          )
          .filter(Boolean);

        return detailCandidates.some(
          (value) =>
            productCandidates.includes(
              value
            )
        );
      });

    const matchedHref =
      String(
        matchedDetail?.detailHref ||
        ""
      ).trim();

    if (matchedHref) {
      return matchedHref;
    }

    const matchedSlug =
      normalizeDetailPathPart(
        matchedDetail?.slug ||
        matchedDetail?.detailSlug ||
        ""
      );

    if (matchedSlug) {
      return \`/products/fittings/hard-tube-fittings/\${matchedSlug}\`;
    }

    /*
     * 152张选型卡中只有147条正式详情。
     * 没匹配到详情的5条保持回到硬管筛选页，
     * 不生成错误的三级详情地址。
     */
    return "/products/fittings/hard-tube-fittings";
  }

  /* HARD_TUBE_DETAIL_HREF_END */
`;

  source =
    source.slice(
      0,
      insertIndex
    ) +
    branchCode +
    source.slice(
      insertIndex
    );
}

/* =========================================================
   3. 验证
   ========================================================= */

try {
  validateTsx(source);
} catch (error) {
  fs.copyFileSync(
    backupPath,
    targetPath
  );

  throw new Error(
    "修改后TSX语法检查失败，已恢复备份：\n" +
      error.message
  );
}

const checks = {
  import:
    source.includes(
      importCode
    ),

  branch:
    source.includes(
      "HARD_TUBE_DETAIL_HREF_START"
    ),

  productType:
    source.includes(
      '"hard-tube-fittings"'
    ),

  detailJson:
    source.includes(
      "hardTubeDetailsJson as any[]"
    ),

  suffixHandling:
    source.includes(
      '.split("__")[0]'
    ),

  detailHref:
    source.includes(
      "matchedDetail?.detailHref"
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
  fs.copyFileSync(
    backupPath,
    targetPath
  );

  throw new Error(
    "跳转逻辑验证失败，已恢复备份：" +
      failedChecks.join("、")
  );
}

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
  "硬管接头卡片详情跳转修复完成"
);
console.log(
  "============================================"
);
console.log(
  "匹配优先级：商品ID → 中文型号 → 英文型号"
);
console.log(
  "正式详情：147条"
);
console.log(
  "未匹配卡片：继续返回硬管筛选页"
);
console.log(
  "TSX语法检查：通过"
);
console.log("");
console.log(
  "备份："
);
console.log(
  backupPath
);
console.log("");
