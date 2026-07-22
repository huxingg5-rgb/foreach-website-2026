const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const navigationPath = path.join(
  root,
  "data",
  "navigation.ts"
);

const headerPath = path.join(
  root,
  "components",
  "layout",
  "SiteHeader.tsx"
);

const reportPath = path.join(
  root,
  "reports",
  "fitting-mega-menu-links-fix.md"
);

const linkMap = new Map([
  [
    "硬管接头",
    "/products/fittings/hard-tube-fittings",
  ],
  [
    "倒刺接头",
    "/products/fittings/barbed-fittings",
  ],
  [
    "螺纹转倒刺接头",
    "/products/fittings/thread-to-barbed-fittings",
  ],
  [
    "鲁尔接头",
    "/products/fittings/luer-fittings",
  ],
  [
    "快插接头",
    "/products/fittings/quick-connect-fittings",
  ],
  [
    "内螺纹互转接头",
    "/products/fittings/female-thread-adapters",
  ],
  [
    "穿板倒刺接头",
    "/products/fittings/bulkhead-barbed-fittings",
  ],
  [
    "过滤器与单向阀",
    "/products/fittings/filters",
  ],
]);

const renderStartMarker =
  "/* FITTING_MEGA_IMAGE_LINK_START */";

const renderEndMarker =
  "/* FITTING_MEGA_IMAGE_LINK_END */";

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `未找到文件：${filePath}`
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function detectNewline(source) {
  return source.includes("\r\n")
    ? "\r\n"
    : "\n";
}

function getPropertyName(nameNode) {
  if (
    ts.isStringLiteral(nameNode) ||
    ts.isNumericLiteral(nameNode) ||
    ts.isIdentifier(nameNode)
  ) {
    return nameNode.text;
  }

  return "";
}

function getStringLiteralValue(node) {
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.text;
  }

  return "";
}

function getObjectProperty(
  objectNode,
  propertyName
) {
  return objectNode.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) &&
      getPropertyName(property.name) ===
        propertyName
  );
}

function findFittingsCard(
  sourceFile
) {
  let result = null;

  function visit(node) {
    if (
      result ||
      !ts.isObjectLiteralExpression(node)
    ) {
      ts.forEachChild(node, visit);
      return;
    }

    const keyProperty =
      getObjectProperty(
        node,
        "key"
      );

    if (
      keyProperty &&
      ts.isPropertyAssignment(
        keyProperty
      ) &&
      getStringLiteralValue(
        keyProperty.initializer
      ) === "fittings-card"
    ) {
      result = node;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return result;
}

function getProductImageChineseTitle(
  callNode
) {
  const titleArgument =
    callNode.arguments[1];

  if (
    !titleArgument ||
    !ts.isCallExpression(
      titleArgument
    )
  ) {
    return "";
  }

  if (
    !ts.isIdentifier(
      titleArgument.expression
    ) ||
    titleArgument.expression.text !==
      "t"
  ) {
    return "";
  }

  return getStringLiteralValue(
    titleArgument.arguments[0]
  );
}

function updateNavigationLinks(
  originalSource
) {
  const sourceFile =
    ts.createSourceFile(
      navigationPath,
      originalSource,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

  const fittingsCard =
    findFittingsCard(
      sourceFile
    );

  if (!fittingsCard) {
    throw new Error(
      "data/navigation.ts中没有找到fittings-card。"
    );
  }

  const imagesProperty =
    getObjectProperty(
      fittingsCard,
      "images"
    );

  if (
    !imagesProperty ||
    !ts.isPropertyAssignment(
      imagesProperty
    ) ||
    !ts.isArrayLiteralExpression(
      imagesProperty.initializer
    )
  ) {
    throw new Error(
      "fittings-card中没有找到images数组。"
    );
  }

  const replacements = [];
  const foundLabels = [];

  for (
    const element
    of imagesProperty.initializer.elements
  ) {
    if (
      !ts.isCallExpression(
        element
      ) ||
      !ts.isIdentifier(
        element.expression
      ) ||
      element.expression.text !==
        "productImage"
    ) {
      continue;
    }

    const label =
      getProductImageChineseTitle(
        element
      );

    const href =
      linkMap.get(label);

    if (!href) {
      continue;
    }

    foundLabels.push(label);

    const hrefExpression =
      `localizedPath("${href}")`;

    if (
      element.arguments.length >= 4
    ) {
      const existingArgument =
        element.arguments[3];

      replacements.push({
        start:
          existingArgument.getStart(
            sourceFile
          ),

        end:
          existingArgument.getEnd(),

        text:
          hrefExpression,
      });
    } else {
      replacements.push({
        start:
          element.getEnd() - 1,

        end:
          element.getEnd() - 1,

        text:
          `, ${hrefExpression}`,
      });
    }
  }

  const uniqueFound =
    [...new Set(foundLabels)];

  if (
    uniqueFound.length !==
    linkMap.size
  ) {
    const missing =
      [...linkMap.keys()].filter(
        (label) =>
          !uniqueFound.includes(label)
      );

    throw new Error(
      "接头导航卡片没有全部定位：" +
        missing.join("、")
    );
  }

  let updatedSource =
    originalSource;

  for (
    const replacement
    of replacements.sort(
      (current, next) =>
        next.start -
        current.start
    )
  ) {
    updatedSource =
      updatedSource.slice(
        0,
        replacement.start
      ) +
      replacement.text +
      updatedSource.slice(
        replacement.end
      );
  }

  return updatedSource;
}

function findMatchingParenthesis(
  source,
  openIndex
) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = openIndex;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    const next =
      source[index + 1];

    if (lineComment) {
      if (
        char === "\n"
      ) {
        lineComment = false;
      }

      continue;
    }

    if (blockComment) {
      if (
        char === "*" &&
        next === "/"
      ) {
        blockComment = false;
        index += 1;
      }

      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (
        char === "\\"
      ) {
        escaped = true;
        continue;
      }

      if (
        char === quote
      ) {
        quote = "";
      }

      continue;
    }

    if (
      char === "/" &&
      next === "/"
    ) {
      lineComment = true;
      index += 1;
      continue;
    }

    if (
      char === "/" &&
      next === "*"
    ) {
      blockComment = true;
      index += 1;
      continue;
    }

    if (
      char === '"' ||
      char === "'" ||
      char === "`"
    ) {
      quote = char;
      continue;
    }

    if (
      char === "("
    ) {
      depth += 1;
      continue;
    }

    if (
      char === ")"
    ) {
      depth -= 1;

      if (
        depth === 0
      ) {
        return index;
      }
    }
  }

  throw new Error(
    "没有找到产品图片return表达式的结束括号。"
  );
}

function getLineIndent(
  source,
  index
) {
  const lineStart =
    source.lastIndexOf(
      "\n",
      index - 1
    ) + 1;

  const lineText =
    source.slice(
      lineStart,
      index
    );

  return (
    lineText.match(/^\s*/)?.[0] ||
    ""
  );
}

function updateHeaderRenderer(
  originalSource
) {
  if (
    originalSource.includes(
      renderStartMarker
    )
  ) {
    return originalSource;
  }

  const mapMarker =
    "displayProductImages.map((cardImage) => {";

  const mapIndex =
    originalSource.indexOf(
      mapMarker
    );

  if (
    mapIndex < 0
  ) {
    throw new Error(
      "SiteHeader.tsx中没有找到displayProductImages.map。"
    );
  }

  const productMetaIndex =
    originalSource.indexOf(
      "const productMeta =",
      mapIndex
    );

  if (
    productMetaIndex < 0
  ) {
    throw new Error(
      "没有找到productMeta定义。"
    );
  }

  const returnIndex =
    originalSource.indexOf(
      "return (",
      productMetaIndex
    );

  if (
    returnIndex < 0
  ) {
    throw new Error(
      "没有找到产品图片卡片return表达式。"
    );
  }

  const openParenthesis =
    originalSource.indexOf(
      "(",
      returnIndex
    );

  const closeParenthesis =
    findMatchingParenthesis(
      originalSource,
      openParenthesis
    );

  let statementEnd =
    closeParenthesis + 1;

  while (
    /\s/.test(
      originalSource[
        statementEnd
      ] || ""
    )
  ) {
    statementEnd += 1;
  }

  if (
    originalSource[
      statementEnd
    ] === ";"
  ) {
    statementEnd += 1;
  }

  const indent =
    getLineIndent(
      originalSource,
      returnIndex
    );

  const innerExpression =
    originalSource.slice(
      openParenthesis + 1,
      closeParenthesis
    );

  const newline =
    detectNewline(
      originalSource
    );

  const lines = [
    `${indent}${renderStartMarker}`,
    "",
    `${indent}const cardImageContent = (${innerExpression});`,
    "",
    `${indent}const cardImageHref =`,
    `${indent}  cardImage.href`,
    `${indent}    ? getLocalizedHref(`,
    `${indent}        cardImage.href,`,
    `${indent}        currentLocale`,
    `${indent}      )`,
    `${indent}    : "";`,
    "",
    `${indent}return cardImageHref ? (`,
    `${indent}  <Link`,
    `${indent}    key={\`${"${card.key}-${cardImage.src}"}\`}`,
    `${indent}    href={cardImageHref}`,
    `${indent}    onClick={closeAllPanels}`,
    `${indent}    style={{`,
    `${indent}      display: "contents",`,
    `${indent}      color: "inherit",`,
    `${indent}      textDecoration: "none",`,
    `${indent}    }}`,
    `${indent}  >`,
    `${indent}    {cardImageContent}`,
    `${indent}  </Link>`,
    `${indent}) : (`,
    `${indent}  cardImageContent`,
    `${indent});`,
    "",
    `${indent}${renderEndMarker}`,
  ];

  return (
    originalSource.slice(
      0,
      returnIndex
    ) +
    lines.join(newline) +
    originalSource.slice(
      statementEnd
    )
  );
}

function assertTsSyntax(
  fileName,
  source
) {
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

        fileName,
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

  if (
    errors.length
  ) {
    throw new Error(
      `${fileName}语法检查失败：\n` +
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
}

function verifyNavigation(
  source
) {
  const sourceFile =
    ts.createSourceFile(
      navigationPath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

  const fittingsCard =
    findFittingsCard(
      sourceFile
    );

  const imagesProperty =
    fittingsCard &&
    getObjectProperty(
      fittingsCard,
      "images"
    );

  if (
    !imagesProperty ||
    !ts.isPropertyAssignment(
      imagesProperty
    ) ||
    !ts.isArrayLiteralExpression(
      imagesProperty.initializer
    )
  ) {
    throw new Error(
      "修改后无法读取接头图片数组。"
    );
  }

  const results = [];

  for (
    const element
    of imagesProperty.initializer.elements
  ) {
    if (
      !ts.isCallExpression(
        element
      ) ||
      !ts.isIdentifier(
        element.expression
      ) ||
      element.expression.text !==
        "productImage"
    ) {
      continue;
    }

    const label =
      getProductImageChineseTitle(
        element
      );

    if (
      !linkMap.has(label)
    ) {
      continue;
    }

    const fourthArgument =
      element.arguments[3];

    const hrefText =
      fourthArgument
        ? fourthArgument.getText(
            sourceFile
          )
        : "";

    results.push({
      label,
      hrefText,
    });
  }

  if (
    results.length !==
    linkMap.size
  ) {
    throw new Error(
      `修改后接头链接数量异常：${results.length}/${linkMap.size}`
    );
  }

  for (
    const result
    of results
  ) {
    const expected =
      `localizedPath("${linkMap.get(
        result.label
      )}")`;

    if (
      result.hrefText !==
      expected
    ) {
      throw new Error(
        `链接校验失败：${result.label} → ${result.hrefText}`
      );
    }
  }

  return results;
}

const originalNavigation =
  read(
    navigationPath
  );

const originalHeader =
  read(
    headerPath
  );

const updatedNavigation =
  updateNavigationLinks(
    originalNavigation
  );

const updatedHeader =
  updateHeaderRenderer(
    originalHeader
  );

assertTsSyntax(
  "data/navigation.ts",
  updatedNavigation
);

assertTsSyntax(
  "components/layout/SiteHeader.tsx",
  updatedHeader
);

const verifiedLinks =
  verifyNavigation(
    updatedNavigation
  );

if (
  !updatedHeader.includes(
    "cardImage.href"
  ) ||
  !updatedHeader.includes(
    "onClick={closeAllPanels}"
  ) ||
  !updatedHeader.includes(
    renderStartMarker
  )
) {
  throw new Error(
    "SiteHeader点击渲染逻辑校验失败。"
  );
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const navigationBackup =
  `${navigationPath}.bak_fitting_mega_links_${stamp}`;

const headerBackup =
  `${headerPath}.bak_fitting_mega_links_${stamp}`;

fs.copyFileSync(
  navigationPath,
  navigationBackup
);

fs.copyFileSync(
  headerPath,
  headerBackup
);

fs.writeFileSync(
  navigationPath,
  updatedNavigation,
  "utf8"
);

fs.writeFileSync(
  headerPath,
  updatedHeader,
  "utf8"
);

const report = [
  "# 接头 Mega Menu 点击跳转修改结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 跳转地址",
  "",
  ...verifiedLinks.map(
    (item) =>
      `- ${item.label} → ${linkMap.get(
        item.label
      )}`
  ),
  "",
  "## 修改范围",
  "",
  "- data/navigation.ts",
  "  - 给8张接头导航图片补充各自的 localizedPath",
  "",
  "- components/layout/SiteHeader.tsx",
  "  - 读取 cardImage.href",
  "  - 有链接时使用现有 Link 组件跳转",
  "  - 点击后执行 closeAllPanels",
  "  - 使用 display: contents，不改变现有网格与卡片样式",
  "",
  "## 未修改",
  "",
  "- 未修改CSS",
  "- 未修改选型数据",
  "- 未修改详情页",
  "",
  "## 备份",
  "",
  `- ${navigationBackup}`,
  `- ${headerBackup}`,
  "",
];

fs.mkdirSync(
  path.dirname(
    reportPath
  ),
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
  "接头Mega Menu点击跳转修改完成"
);
console.log(
  "============================================"
);

for (
  const item
  of verifiedLinks
) {
  console.log(
    `${item.label} → ${linkMap.get(
      item.label
    )}`
  );
}

console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
