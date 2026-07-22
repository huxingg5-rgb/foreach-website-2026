const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportPath = path.join(
  root,
  "reports",
  "luer-female-thread-detail-integration-audit.md"
);

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "dist",
  "build",
  "coverage",
]);

const textExtensions = new Set([
  ".js",
  ".cjs",
  ".mjs",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".css",
]);

function exists(filePath) {
  return fs.existsSync(filePath);
}

function read(filePath) {
  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function walk(directory) {
  if (!exists(directory)) {
    return [];
  }

  const files = [];

  for (
    const entry
    of fs.readdirSync(
      directory,
      {
        withFileTypes: true,
      }
    )
  ) {
    if (
      entry.isDirectory() &&
      ignoredDirectories.has(
        entry.name
      )
    ) {
      continue;
    }

    const fullPath =
      path.join(
        directory,
        entry.name
      );

    if (entry.isDirectory()) {
      files.push(
        ...walk(fullPath)
      );
      continue;
    }

    if (
      textExtensions.has(
        path.extname(
          entry.name
        ).toLowerCase()
      )
    ) {
      files.push(
        fullPath
      );
    }
  }

  return files;
}

function lineNumberAt(
  source,
  index
) {
  return source
    .slice(0, index)
    .split(/\r?\n/)
    .length;
}

function getContextByIndex(
  source,
  index,
  before = 6,
  after = 16
) {
  const lines =
    source.split(/\r?\n/);

  const lineNumber =
    lineNumberAt(
      source,
      index
    );

  const start =
    Math.max(
      0,
      lineNumber -
      before -
      1
    );

  const end =
    Math.min(
      lines.length,
      lineNumber +
      after
    );

  return {
    lineNumber,

    text:
      lines
        .slice(
          start,
          end
        )
        .map(
          (line, offset) =>
            `${String(
              start +
              offset +
              1
            ).padStart(5, " ")} | ${line}`
        )
        .join("\n"),
  };
}

function findContexts(
  source,
  patterns,
  limit = 20
) {
  const results = [];

  for (
    const item
    of patterns
  ) {
    const regex =
      item.regex.global
        ? item.regex
        : new RegExp(
            item.regex.source,
            `${item.regex.flags}g`
          );

    for (
      const match
      of source.matchAll(regex)
    ) {
      if (
        match.index == null
      ) {
        continue;
      }

      results.push({
        label:
          item.label,

        ...getContextByIndex(
          source,
          match.index
        ),
      });

      if (
        results.length >=
        limit
      ) {
        return results;
      }
    }
  }

  return results;
}

function addCodeBlock(
  report,
  value,
  language = "text"
) {
  report.push(
    `\`\`\`${language}`
  );

  report.push(
    value || "（无内容）"
  );

  report.push(
    "```"
  );

  report.push("");
}

function addFileSection(
  report,
  title,
  filePath,
  patterns
) {
  report.push(
    `### ${title}`
  );
  report.push("");

  if (!exists(filePath)) {
    report.push(
      `未找到：\`${relative(filePath)}\``
    );
    report.push("");
    return;
  }

  const source =
    read(filePath);

  report.push(
    `- 文件：\`${relative(filePath)}\``
  );
  report.push(
    `- 行数：${source.split(/\r?\n/).length}`
  );
  report.push(
    `- 大小：${Buffer.byteLength(source, "utf8")} bytes`
  );
  report.push("");

  const contexts =
    findContexts(
      source,
      patterns,
      30
    );

  if (!contexts.length) {
    report.push(
      "未找到指定关键代码。"
    );
    report.push("");
    return;
  }

  contexts.forEach(
    (context, index) => {
      report.push(
        `#### ${index + 1}. ${context.label}（第 ${context.lineNumber} 行）`
      );
      report.push("");
      addCodeBlock(
        report,
        context.text,
        path.extname(filePath)
          .replace(".", "") ||
          "text"
      );
    }
  );
}

const allFiles =
  walk(root);

/* =========================================================
   1. 查找截图中的现有详情页来源
   ========================================================= */

const sampleTerms = [
  "SA-U32-32F-PP-N",
  "809269",
  "螺纹转倒刺接头",
];

const sampleMatches = [];

for (
  const filePath
  of allFiles
) {
  let source = "";

  try {
    source =
      read(filePath);
  } catch {
    continue;
  }

  for (
    const term
    of sampleTerms
  ) {
    const index =
      source.indexOf(term);

    if (index < 0) {
      continue;
    }

    sampleMatches.push({
      filePath,
      term,
      ...getContextByIndex(
        source,
        index,
        8,
        22
      ),
    });
  }
}

/* =========================================================
   2. 搜索已有详情数据、服务和适配器
   ========================================================= */

const relevantFilePatterns = [
  /fitting.*detail/i,
  /detail.*fitting/i,
  /product-detail/i,
  /productdetail/i,
  /route-map/i,
  /thread-to-barbed/i,
  /barbed-fitting/i,
  /luer-fitting/i,
  /female-thread-adapter/i,
];

const relevantFiles =
  allFiles.filter(
    (filePath) =>
      relevantFilePatterns.some(
        (pattern) =>
          pattern.test(
            relative(filePath)
          )
      )
  );

/* =========================================================
   3. 固定关键文件
   ========================================================= */

const routeCandidates = [
  path.join(
    root,
    "app",
    "products",
    "[category]",
    "[slug]",
    "[seriesSlug]",
    "page.tsx"
  ),

  path.join(
    root,
    "app",
    "[locale]",
    "products",
    "[category]",
    "[slug]",
    "[seriesSlug]",
    "page.tsx"
  ),
];

const productDetailClientCandidates = [
  path.join(
    root,
    "components",
    "products",
    "detail",
    "ProductDetailClient.tsx"
  ),

  path.join(
    root,
    "components",
    "products",
    "detail",
    "product-detail-client.tsx"
  ),
];

const productDetailTypeCandidates = [
  path.join(
    root,
    "data",
    "products",
    "product-detail.types.ts"
  ),

  path.join(
    root,
    "data",
    "products",
    "detail",
    "product-detail.types.ts"
  ),

  path.join(
    root,
    "components",
    "products",
    "detail",
    "product-detail.types.ts"
  ),
];

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const selectionClientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const luerSelectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "luer-fitting-selection.generated.ts"
);

const femaleSelectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "female-thread-adapter-selection.generated.ts"
);

/* =========================================================
   4. 检查生成产品数据中的关键字段
   ========================================================= */

function inspectSelectionFile(
  filePath,
  exportName
) {
  if (!exists(filePath)) {
    return {
      exists: false,
      filePath,
    };
  }

  const source =
    read(filePath);

  const productCount =
    (
      source.match(
        /"productId"\s*:/g
      ) || []
    ).length;

  const sampleProductMatch =
    source.match(
      /{\s*"productId"\s*:[\s\S]*?"sortOrder"\s*:\s*\d+\s*,?[\s\S]*?}/
    );

  const detailSlugs =
    [
      ...source.matchAll(
        /"detailSlug"\s*:\s*"([^"]+)"/g
      ),
    ].map(
      (match) =>
        match[1]
    );

  const imagePaths =
    [
      ...source.matchAll(
        /"imageCard"\s*:\s*"([^"]*)"/g
      ),
    ].map(
      (match) =>
        match[1]
    );

  return {
    exists: true,
    filePath,
    exportName,
    productCount,

    detailSlugCount:
      detailSlugs.length,

    uniqueDetailSlugCount:
      new Set(
        detailSlugs
      ).size,

    emptyImageCount:
      imagePaths.filter(
        (value) =>
          !value
      ).length,

    sample:
      sampleProductMatch
        ? sampleProductMatch[0]
        : "",
  };
}

const luerSelection =
  inspectSelectionFile(
    luerSelectionPath,
    "luerFittingSelectionProducts"
  );

const femaleSelection =
  inspectSelectionFile(
    femaleSelectionPath,
    "femaleThreadAdapterSelectionProducts"
  );

/* =========================================================
   5. 生成报告
   ========================================================= */

const report = [];

report.push(
  "# 鲁尔接头与内螺纹互转接头详情页接入检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "> 本次只检查现有路由、详情页组件、数据结构、选型卡片链接和资源空状态，没有修改任何项目文件。"
);
report.push("");

report.push(
  "## 1. 截图中现有接头详情页的数据来源"
);
report.push("");

if (!sampleMatches.length) {
  report.push(
    "未在项目中找到 SA-U32-32F-PP-N、809269 或“螺纹转倒刺接头”。"
  );
  report.push("");
} else {
  for (
    const item
    of sampleMatches
  ) {
    report.push(
      `### ${relative(item.filePath)}`
    );
    report.push("");
    report.push(
      `- 匹配内容：\`${item.term}\``
    );
    report.push(
      `- 起始行：${item.lineNumber}`
    );
    report.push("");
    addCodeBlock(
      report,
      item.text,
      path.extname(
        item.filePath
      ).replace(".", "") ||
      "text"
    );
  }
}

report.push(
  "## 2. 动态详情路由"
);
report.push("");

for (
  const routePath
  of routeCandidates
) {
  addFileSection(
    report,
    relative(routePath),
    routePath,
    [
      {
        label:
          "页面入口与参数",
        regex:
          /export\s+default|params|generateStaticParams/g,
      },
      {
        label:
          "产品数据读取",
        regex:
          /get[A-Za-z0-9]+Detail|getProduct|detailData|ProductDetailClient/g,
      },
      {
        label:
          "404处理",
        regex:
          /notFound|redirect/g,
      },
    ]
  );
}

report.push(
  "## 3. ProductDetailClient 数据结构和功能"
);
report.push("");

for (
  const clientPath
  of productDetailClientCandidates
) {
  addFileSection(
    report,
    relative(clientPath),
    clientPath,
    [
      {
        label:
          "组件参数与详情数据类型",
        regex:
          /type\s+.*ProductDetail|interface\s+.*ProductDetail|function\s+ProductDetailClient|const\s+ProductDetailClient/g,
      },
      {
        label:
          "主图与缩略图",
        regex:
          /images|gallery|thumbnail|mainImage|imagePath|additionalImages/g,
      },
      {
        label:
          "型号选择",
        regex:
          /型号选择|modelSelection|handle.*Model|selectedModel/g,
      },
      {
        label:
          "添加图纸",
        regex:
          /添加图纸|needDrawing|handleAddDrawing|isDetailDrawingSelected/g,
      },
      {
        label:
          "加入清单",
        regex:
          /加入清单|addItem|handleAdd|SelectionCart/g,
      },
      {
        label:
          "规格标签",
        regex:
          /规格|specs|specTable/g,
      },
      {
        label:
          "3D模型标签与资源判断",
        regex:
          /3D模型|model3d|model3D|modelUrl|model-viewer|glb/g,
      },
      {
        label:
          "零件图标签与资源判断",
        regex:
          /零件图|drawingPdf|drawingUrl|pdf|iframe/g,
      },
      {
        label:
          "暂无状态",
        regex:
          /暂无|尚未上传|暂未公开|emptyState|placeholder/g,
      },
    ]
  );
}

report.push(
  "## 4. 详情数据类型定义"
);
report.push("");

for (
  const typePath
  of productDetailTypeCandidates
) {
  addFileSection(
    report,
    relative(typePath),
    typePath,
    [
      {
        label:
          "完整类型定义",
        regex:
          /export\s+(type|interface)|type\s+ProductDetail|interface\s+ProductDetail/g,
      },
      {
        label:
          "规格字段",
        regex:
          /specs|label|value/g,
      },
      {
        label:
          "图像字段",
        regex:
          /image|images|gallery/g,
      },
      {
        label:
          "2D与3D字段",
        regex:
          /drawing|model3d|model3D|pdf|glb/g,
      },
    ]
  );
}

report.push(
  "## 5. 产品路由映射"
);
report.push("");

addFileSection(
  report,
  relative(routeMapPath),
  routeMapPath,
  [
    {
      label:
        "鲁尔接头路由",
      regex:
        /luer-fittings/g,
    },
    {
      label:
        "内螺纹互转接头路由",
      regex:
        /female-thread-adapters/g,
    },
    {
      label:
        "现有接头详情路由",
      regex:
        /barbed|thread-to-barbed|fittings/g,
    },
  ]
);

report.push(
  "## 6. 筛选卡片详情链接生成"
);
report.push("");

addFileSection(
  report,
  relative(selectionClientPath),
  selectionClientPath,
  [
    {
      label:
        "详情链接生成",
      regex:
        /detailHref|detailSlug|查看详情|router\.push|href=/g,
    },
    {
      label:
        "鲁尔接头接入",
      regex:
        /luerFittingSelectionProducts|luer-fittings/g,
    },
    {
      label:
        "内螺纹互转接头接入",
      regex:
        /femaleThreadAdapterSelectionProducts|female-thread-adapters/g,
    },
  ]
);

report.push(
  "## 7. 两个系列当前选型数据"
);
report.push("");

for (
  const item
  of [
    luerSelection,
    femaleSelection,
  ]
) {
  report.push(
    `### ${relative(item.filePath)}`
  );
  report.push("");

  if (!item.exists) {
    report.push(
      "文件不存在。"
    );
    report.push("");
    continue;
  }

  report.push(
    `- 产品数量：${item.productCount}`
  );
  report.push(
    `- detailSlug 数量：${item.detailSlugCount}`
  );
  report.push(
    `- 唯一 detailSlug：${item.uniqueDetailSlugCount}`
  );
  report.push(
    `- 空产品图数量：${item.emptyImageCount}`
  );
  report.push("");

  report.push(
    "#### 第一条产品数据"
  );
  report.push("");
  addCodeBlock(
    report,
    item.sample,
    "json"
  );
}

report.push(
  "## 8. 已有详情数据、服务、适配器和生成脚本"
);
report.push("");

if (!relevantFiles.length) {
  report.push(
    "未找到相关文件。"
  );
  report.push("");
} else {
  for (
    const filePath
    of relevantFiles
      .sort(
        (a, b) =>
          relative(a).localeCompare(
            relative(b),
            "zh-CN"
          )
      )
  ) {
    report.push(
      `- \`${relative(filePath)}\``
    );
  }

  report.push("");
}

report.push(
  "## 9. 需要确认的实现点"
);
report.push("");

report.push(
  "1. SA-U32-32F-PP-N 当前详情页究竟由哪个详情数据文件和适配器生成。"
);
report.push(
  "2. 公共动态路由是否已经支持 fittings 下的新 productTypeId。"
);
report.push(
  "3. ProductDetailClient 对空 model3dUrl 和 drawingPdfUrl 当前如何处理。"
);
report.push(
  "4. 3D模型和零件图标签是否会因资源为空而被隐藏。"
);
report.push(
  "5. 型号选择是否已经支持标准品之间切换。"
);
report.push(
  "6. 加入清单时需要哪些必填字段。"
);
report.push(
  "7. 详情页静态参数是否需要显式加入151个鲁尔型号和24个内螺纹互转型号。"
);
report.push("");

fs.mkdirSync(
  path.dirname(reportPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  reportPath,
  report.join("\n") + "\n",
  "utf8"
);

console.log("");
console.log(
  "============================================"
);
console.log(
  "接头详情页接入检查完成"
);
console.log(
  "============================================"
);
console.log(
  `截图型号匹配文件：${sampleMatches.length}`
);
console.log(
  `相关详情文件：${relevantFiles.length}`
);
console.log(
  `鲁尔接头产品：${luerSelection.productCount || 0}`
);
console.log(
  `内螺纹互转产品：${femaleSelection.productCount || 0}`
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
console.log(
  "本次未修改任何项目文件。"
);
