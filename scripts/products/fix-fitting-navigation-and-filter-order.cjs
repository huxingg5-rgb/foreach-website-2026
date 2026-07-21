const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = process.cwd();

const navigationPath = path.join(
  root,
  "data",
  "navigation.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "product-route-map.ts"
);

const reportPath = path.join(
  root,
  "reports",
  "fitting-navigation-and-filter-order-fix.md"
);

const desiredOrder = [
  "hard-tube-fittings",
  "barbed-fittings",
  "thread-to-barbed-fittings",
  "luer-fittings",
  "quick-connect-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
];

const desiredLabels = [
  "硬管接头",
  "倒刺接头",
  "螺纹转倒刺接头",
  "鲁尔接头",
  "快插接头",
  "内螺纹互转接头",
  "穿板倒刺接头",
  "过滤器与单向阀",
];

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`未找到文件：${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function detectNewline(source) {
  return source.includes("\r\n") ? "\r\n" : "\n";
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

function findPropertyAssignment(
  sourceFile,
  propertyName
) {
  let result = null;

  function visit(node) {
    if (
      !result &&
      ts.isPropertyAssignment(node) &&
      getPropertyName(node.name) === propertyName
    ) {
      result = node;
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return result;
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

  if (errors.length) {
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

function findMatchingSquareBracket(
  source,
  start
) {
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (
    let index = start;
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
      char === "["
    ) {
      depth += 1;
      continue;
    }

    if (
      char === "]"
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
    "没有找到images数组结束位置。"
  );
}

function updateNavigation(
  originalSource
) {
  const newline =
    detectNewline(
      originalSource
    );

  const cardMarker =
    'key: "fittings-card"';

  const cardIndex =
    originalSource.indexOf(
      cardMarker
    );

  if (
    cardIndex < 0
  ) {
    throw new Error(
      "data/navigation.ts中没有找到fittings-card。"
    );
  }

  const imagesMarkerIndex =
    originalSource.indexOf(
      "images:",
      cardIndex
    );

  if (
    imagesMarkerIndex < 0
  ) {
    throw new Error(
      "fittings-card中没有找到images数组。"
    );
  }

  const arrayStart =
    originalSource.indexOf(
      "[",
      imagesMarkerIndex
    );

  const arrayEnd =
    findMatchingSquareBracket(
      originalSource,
      arrayStart
    );

  const items = [
    `        productImage("/images/products/FIT/For rigid tubing_200x200_01_v001.jpg", t("硬管接头", "Hard Tube Fittings", "Racores para tubos rígidos", "Raccords pour tubes rigides", "경질 튜브 피팅", "Фитинги для жестких трубок"), t("用于硬管连接与精密液路固定", "For rigid tubing connection and precise fluidic assembly", "Para conexión de tubos rígidos y montaje preciso", "Pour connexion de tubes rigides et assemblage fluidique précis", "경질 튜브 연결 및 정밀 유체 조립용", "Для соединения жестких трубок и точной сборки")),`,

    `        productImage("/images/products/FIT/Barbed connector_200x200_01_v001.jpg", t("倒刺接头", "Barbed Fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцерные фитинги"), t("用于软管连接与低压液路装配", "For flexible tubing connection and low-pressure fluid paths", "Para conexión de tubos flexibles y líneas de baja presión", "Pour connexion de tubes souples et circuits basse pression", "연질 튜브 연결 및 저압 유로용", "Для соединения гибких трубок и низкого давления")),`,

    `        productImage("/images/products/FIT/Thread with barb_200x200_01_v001.jpg", t("螺纹转倒刺接头", "Thread-to-Barbed Fittings", "Adaptadores roscados a espiga", "Raccords filetés vers cannelés", "나사-바브 피팅", "Резьбовые штуцерные переходники"), t("用于螺纹接口与软管之间的液路转接", "For transition between threaded ports and flexible tubing", "Para transición entre puertos roscados y tubos flexibles", "Pour la transition entre ports filetés et tubes souples", "나사 포트와 연질 튜브 사이의 전환 연결", "Для перехода между резьбовыми портами и гибкими трубками")),`,

    `        productImage("/images/products/FIT/Luer fitting_200x200_01_v001.jpg", t("鲁尔接头", "Luer Fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"), t("适合标准鲁尔接口连接", "For standard Luer interface connection", "Para conexión de interfaz Luer estándar", "Pour connexion d’interface Luer standard", "표준 루어 인터페이스 연결용", "Для стандартного соединения Luer")),`,

    `        productImage("/images/products/FIT/Quick connector_200x200_01_v001.jpg", t("快插接头", "Quick-Connect Fittings", "Racores de conexión rápida", "Raccords rapides", "퀵 커넥트 피팅", "Быстроразъемные фитинги"), t("快速连接与拆卸，提高装配效率", "Quick connection and disconnection for efficient assembly", "Conexión y desconexión rápidas para un montaje eficiente", "Connexion et déconnexion rapides pour un assemblage efficace", "빠른 연결과 분리로 조립 효율 향상", "Быстрое соединение и разъединение для эффективной сборки")),`,

    `        productImage("/images/products/FIT/Union_200x200_01_v001.jpg", t("内螺纹互转接头", "Female Thread Adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"), t("用于不同内螺纹接口之间的液路转接", "For fluidic transition between female threaded ports", "Para transición de fluidos entre puertos de rosca hembra", "Pour la transition fluidique entre ports à filetage femelle", "암나사 포트 사이의 유로 전환용", "Для перехода между портами с внутренней резьбой")),`,

    `        productImage("/images/products/FIT/Panel mountunion_200x200_01_v001.jpg", t("穿板倒刺接头", "Bulkhead Barbed Fittings", "Racores de espiga para panel", "Raccords cannelés traversée de cloison", "패널 마운트 바브 피팅", "Панельные штуцерные фитинги"), t("用于面板穿板安装与软管连接", "For panel mounting and flexible tubing connection", "Para montaje en panel y conexión de tubos flexibles", "Pour montage sur panneau et connexion de tubes souples", "패널 관통 설치 및 연질 튜브 연결용", "Для панельного монтажа и соединения гибких трубок")),`,

    `        productImage("/images/products/FIT/Filter - Check valve_200x200_01_v001.jpg", t("过滤器与单向阀", "Filters & Check Valves", "Filtros y válvulas de retención", "Filtres et clapets anti-retour", "필터 및 체크 밸브", "Фильтры и обратные клапаны"), t("用于颗粒过滤与单向止回控制", "For particle filtration and one-way flow control", "Para filtración de partículas y control de flujo unidireccional", "Pour filtration des particules et contrôle du débit unidirectionnel", "입자 여과 및 단방향 유동 제어용", "Для фильтрации частиц и управления односторонним потоком")),`,
  ];

  const newArray =
    `[${newline}` +
    items.join(newline) +
    `${newline}      ]`;

  const updated =
    originalSource.slice(
      0,
      arrayStart
    ) +
    newArray +
    originalSource.slice(
      arrayEnd + 1
    );

  const fittingCardSlice =
    updated.slice(
      cardIndex,
      updated.indexOf(
        'key: "tubing-card"',
        cardIndex
      )
    );

  let previousIndex = -1;

  for (
    const label
    of desiredLabels
  ) {
    const index =
      fittingCardSlice.indexOf(
        `"${label}"`
      );

    if (
      index < 0
    ) {
      throw new Error(
        `导航中缺少名称：${label}`
      );
    }

    if (
      index <= previousIndex
    ) {
      throw new Error(
        `导航顺序异常：${label}`
      );
    }

    previousIndex =
      index;
  }

  return updated;
}

function updateSelectionClient(
  originalSource
) {
  let source =
    originalSource;

  const orderMarker =
    "FITTING_PRODUCT_TYPE_ORDER_START";

  if (
    !source.includes(
      orderMarker
    )
  ) {
    const filterKeysRegex =
      /const FILTER_KEYS:\s*SelectionFilterKey\[\]\s*=\s*\[[\s\S]*?\n\];/;

    const match =
      source.match(
        filterKeysRegex
      );

    if (
      !match
    ) {
      throw new Error(
        "没有找到FILTER_KEYS数组。"
      );
    }

    const block =
      `${match[0]}

const ${orderMarker} = true;

const FITTING_PRODUCT_TYPE_ORDER = [
  "hard-tube-fittings",
  "barbed-fittings",
  "thread-to-barbed-fittings",
  "luer-fittings",
  "quick-connect-fittings",
  "female-thread-adapters",
  "bulkhead-barbed-fittings",
  "filters",
] as const;

const FITTING_PRODUCT_TYPE_ORDER_MAP =
  new Map<string, number>(
    FITTING_PRODUCT_TYPE_ORDER.map(
      (productTypeId, index) => [
        productTypeId,
        index,
      ]
    )
  );

/* FITTING_PRODUCT_TYPE_ORDER_END */`;

    source =
      source.replace(
        match[0],
        block
      );
  }

  const sortMarker =
    "FITTING_PRODUCT_TYPE_OPTIONS_SORT_START";

  if (
    !source.includes(
      sortMarker
    )
  ) {
    const anchor =
      "    return Array.from(optionMap.values());";

    const count =
      source.split(anchor).length -
      1;

    if (
      count !== 1
    ) {
      throw new Error(
        `无法唯一定位产品类型选项返回位置：${count}`
      );
    }

    const replacement = `    /* ${sortMarker} */

    const options =
      Array.from(
        optionMap.values()
      );

    if (
      activeCategoryId ===
      "fittings"
    ) {
      options.sort(
        (current, next) => {
          const currentOrder =
            FITTING_PRODUCT_TYPE_ORDER_MAP.get(
              String(
                current.value ||
                ""
              )
            ) ??
            999;

          const nextOrder =
            FITTING_PRODUCT_TYPE_ORDER_MAP.get(
              String(
                next.value ||
                ""
              )
            ) ??
            999;

          return (
            currentOrder -
            nextOrder
          );
        }
      );
    }

    return options;

    /* FITTING_PRODUCT_TYPE_OPTIONS_SORT_END */`;

    source =
      source.replace(
        anchor,
        replacement
      );
  }

  const defaultMarker =
    "FITTING_DEFAULT_PRODUCT_TYPE_START";

  if (
    !source.includes(
      defaultMarker
    )
  ) {
    const anchor =
      "function getFirstProductTypeId(categoryId: string) {";

    const count =
      source.split(anchor).length -
      1;

    if (
      count !== 1
    ) {
      throw new Error(
        `无法唯一定位getFirstProductTypeId：${count}`
      );
    }

    const replacement = `${anchor}

  /* ${defaultMarker} */

  if (
    categoryId ===
    "fittings"
  ) {
    return "hard-tube-fittings";
  }

  /* FITTING_DEFAULT_PRODUCT_TYPE_END */`;

    source =
      source.replace(
        anchor,
        replacement
      );
  }

  return source;
}

function updateRouteMap(
  originalSource
) {
  const sourceFile =
    ts.createSourceFile(
      routeMapPath,
      originalSource,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

  const productTypesProperty =
    findPropertyAssignment(
      sourceFile,
      "productTypes"
    );

  if (
    !productTypesProperty ||
    !ts.isObjectLiteralExpression(
      productTypesProperty.initializer
    )
  ) {
    throw new Error(
      "product-route-map.ts中没有找到productTypes对象。"
    );
  }

  const objectLiteral =
    productTypesProperty.initializer;

  const properties =
    Array.from(
      objectLiteral.properties
    );

  const matchingProperties =
    properties
      .map(
        (property, index) => ({
          property,
          index,
          key:
            ts.isPropertyAssignment(
              property
            )
              ? getPropertyName(
                  property.name
                )
              : "",
        })
      )
      .filter(
        (item) =>
          desiredOrder.includes(
            item.key
          )
      );

  if (
    matchingProperties.length < 7
  ) {
    throw new Error(
      `接头路由配置数量不足：${matchingProperties.length}/7`
    );
  }

  const indices =
    matchingProperties.map(
      (item) =>
        item.index
    );

  const firstIndex =
    Math.min(...indices);

  const lastIndex =
    Math.max(...indices);

  const nonTargetInside =
    properties
      .slice(
        firstIndex,
        lastIndex + 1
      )
      .filter(
        (property) => {
          if (
            !ts.isPropertyAssignment(
              property
            )
          ) {
            return true;
          }

          const key =
            getPropertyName(
              property.name
            );

          return (
            !desiredOrder.includes(
              key
            )
          );
        }
      );

  if (
    nonTargetInside.length
  ) {
    throw new Error(
      "接头路由配置区域中夹有其他产品类型，停止自动重排。"
    );
  }

  const firstProperty =
    properties[firstIndex];

  const lastProperty =
    properties[lastIndex];

  const replacementStart =
    firstProperty.getStart(
      sourceFile
    );

  let replacementEnd =
    lastProperty.getEnd();

  const commaIndex =
    originalSource.indexOf(
      ",",
      replacementEnd
    );

  if (
    commaIndex >= 0 &&
    commaIndex <
      replacementEnd + 8
  ) {
    replacementEnd =
      commaIndex + 1;
  }

  const routeEntries = `    "hard-tube-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "hard-tube-fittings",
      label: "硬管接头",
      title: "硬管接头 | FOREACH",
      description:
        "硬管接头适用于PTFE、FEP、PFA和PEEK等硬管连接，可根据密封结构、接口螺纹、接管外径、材质和颜色进行选型。",
    },

    "barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "barbed-fittings",
      label: "倒刺接头",
      title: "倒刺接头 | FOREACH",
      description:
        "倒刺接头用于软管之间的直通、转向、分流和汇流连接，可根据产品结构、接管内径、材质和颜色进行选型。",
    },

    "thread-to-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "thread-to-barbed-fittings",
      label: "螺纹转倒刺接头",
      title: "螺纹转倒刺接头 | FOREACH",
      description:
        "螺纹转倒刺接头用于设备螺纹接口与软管液路之间的转接，可根据连接结构、密封方式、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "luer-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "luer-fittings",
      label: "鲁尔接头",
      title: "鲁尔接头 | FOREACH",
      description:
        "鲁尔接头覆盖公鲁尔、母鲁尔、固定锁圈、旋转锁圈及穿板结构。",
    },

    "quick-connect-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "quick-connect-fittings",
      label: "快插接头",
      title: "快插接头 | FOREACH",
      description:
        "快插接头覆盖Q20、Q40和Q60系列，可根据管径、端口形式、阀门配置和安装结构进行选型。",
    },

    "female-thread-adapters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "female-thread-adapters",
      label: "内螺纹互转接头",
      title: "内螺纹互转接头 | FOREACH",
      description:
        "内螺纹互转接头覆盖二通、三通、标准型、方型、穿板型、T型和Y型结构。",
    },

    "bulkhead-barbed-fittings": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "bulkhead-barbed-fittings",
      label: "穿板倒刺接头",
      title: "穿板倒刺接头 | FOREACH",
      description:
        "穿板倒刺接头系列包含PMB穿板倒刺接头和PMBSN六角螺母，可根据产品结构、螺纹规格、接管内径、材质和颜色进行选型。",
    },

    "filters": {
      category: "fittings",
      categoryId: "fittings",
      productTypeId: "filters",
      label: "过滤器与单向阀",
      title: "过滤器与单向阀 | FOREACH",
      description:
        "过滤器用于液路中的颗粒拦截与流体净化，单向阀用于控制流体单向流动并降低回流风险。",
    },`;

  return (
    originalSource.slice(
      0,
      replacementStart
    ) +
    routeEntries +
    originalSource.slice(
      replacementEnd
    )
  );
}

function getRouteOrder(
  source
) {
  const sourceFile =
    ts.createSourceFile(
      routeMapPath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

  const property =
    findPropertyAssignment(
      sourceFile,
      "productTypes"
    );

  if (
    !property ||
    !ts.isObjectLiteralExpression(
      property.initializer
    )
  ) {
    return [];
  }

  return Array.from(
    property.initializer.properties
  )
    .filter(
      (item) =>
        ts.isPropertyAssignment(
          item
        )
    )
    .map(
      (item) =>
        getPropertyName(
          item.name
        )
    )
    .filter(
      (key) =>
        desiredOrder.includes(
          key
        )
    );
}

const navigationSource =
  updateNavigation(
    read(
      navigationPath
    )
  );

const clientSource =
  updateSelectionClient(
    read(
      clientPath
    )
  );

const routeMapSource =
  updateRouteMap(
    read(
      routeMapPath
    )
  );

assertTsSyntax(
  "data/navigation.ts",
  navigationSource
);

assertTsSyntax(
  "ProductSelectionClient.tsx",
  clientSource
);

assertTsSyntax(
  "product-route-map.ts",
  routeMapSource
);

const routeOrder =
  getRouteOrder(
    routeMapSource
  );

if (
  JSON.stringify(
    routeOrder
  ) !==
  JSON.stringify(
    desiredOrder
  )
) {
  throw new Error(
    "product-route-map接头顺序校验失败：" +
      routeOrder.join(" → ")
  );
}

const stamp =
  new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

const backups = [];

for (
  const filePath
  of [
    navigationPath,
    clientPath,
    routeMapPath,
  ]
) {
  const backupPath =
    `${filePath}.bak_fitting_order_${stamp}`;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  backups.push(
    backupPath
  );
}

fs.writeFileSync(
  navigationPath,
  navigationSource,
  "utf8"
);

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

fs.writeFileSync(
  routeMapPath,
  routeMapSource,
  "utf8"
);

const report = [
  "# 接头导航与产品种类顺序修改结果",
  "",
  `生成时间：${new Date().toLocaleString("zh-CN")}`,
  "",
  "## 最终顺序",
  "",
  ...desiredLabels.map(
    (label, index) =>
      `${index + 1}. ${label}（${desiredOrder[index]}）`
  ),
  "",
  "## 修改文件",
  "",
  "- data/navigation.ts",
  "  - 修改Mega Menu接头系列8张导航卡片的顺序",
  "  - 将旧名称统一为正式产品类型名称",
  "  - 保留现有8张图片，仅重新对应产品类型",
  "",
  "- components/products/selection/ProductSelectionClient.tsx",
  "  - 左侧“产品种类”按固定顺序显示",
  "  - 接头系列总入口默认从“硬管接头”开始",
  "  - 不改变各产品类型内部筛选逻辑",
  "",
  "- data/products/selection/product-route-map.ts",
  "  - 接头类型按统一顺序排列",
  "  - 补充螺纹转倒刺接头路由配置",
  "  - 统一中文名称",
  "",
  "## 备份",
  "",
  ...backups.map(
    (backupPath) =>
      `- ${backupPath}`
  ),
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
  "接头导航与产品种类顺序修改完成"
);
console.log(
  "============================================"
);

desiredLabels.forEach(
  (label, index) => {
    console.log(
      `${index + 1}. ${label}`
    );
  }
);

console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
