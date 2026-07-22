const fs = require("fs");
const path = require("path");

const root = process.cwd();

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "bulkhead-barbed-fitting-selection.generated.ts"
);

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "bulkhead-barbed-fittings",
  "detail",
  "index.json"
);

const productCardCandidates = [
  path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductCardGrid.tsx"
  ),
  path.join(
    root,
    "components",
    "products",
    "selection",
    "ProductCard.tsx"
  ),
];

const referenceSelectionCandidates = [
  path.join(
    root,
    "data",
    "products",
    "selection",
    "barbed-fitting-selection.generated.ts"
  ),
  path.join(
    root,
    "data",
    "products",
    "selection",
    "quick-connect-fitting-selection.generated.ts"
  ),
  path.join(
    root,
    "data",
    "products",
    "selection",
    "luer-fitting-selection.generated.ts"
  ),
];

const imageDirectory = path.join(
  root,
  "public",
  "images",
  "products",
  "fittings",
  "bulkhead-barbed-fittings",
  "products"
);

const reportPath = path.join(
  root,
  "reports",
  "bulkhead-barbed-image-display-audit.md"
);

function text(value) {
  return String(value ?? "").trim();
}

function relative(filePath) {
  return path
    .relative(root, filePath)
    .replace(/\\/g, "/");
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function urlToPublicFile(url) {
  const normalized = text(url);

  if (!normalized.startsWith("/")) {
    return "";
  }

  return path.join(
    root,
    "public",
    normalized.replace(/^\/+/, "")
  );
}

function getContext(
  source,
  pattern,
  before = 8,
  after = 14
) {
  const lines = source.split(/\r?\n/);
  const results = [];

  lines.forEach((line, index) => {
    if (!pattern.test(line)) {
      return;
    }

    results.push({
      line: index + 1,
      content: lines
        .slice(
          Math.max(0, index - before),
          Math.min(
            lines.length,
            index + after + 1
          )
        )
        .join("\n"),
    });
  });

  return results;
}

function extractGeneratedObjects(source) {
  const objectMatches = [
    ...source.matchAll(
      /\{\s*"productId"\s*:\s*"[^"]+"[\s\S]*?\n\s*\}/g
    ),
  ];

  return objectMatches
    .slice(0, 3)
    .map((match) => match[0]);
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(
    "未找到穿板倒刺接头选型数据：" +
      selectionPath
  );
}

if (!fs.existsSync(detailPath)) {
  throw new Error(
    "未找到穿板倒刺接头详情数据：" +
      detailPath
  );
}

const selectionSource = read(selectionPath);
const details = JSON.parse(read(detailPath));

const imageFiles = fs.existsSync(imageDirectory)
  ? fs
      .readdirSync(imageDirectory)
      .filter((name) =>
        /\.(jpg|jpeg|png|webp)$/i.test(name)
      )
      .map((name) =>
        path.join(imageDirectory, name)
      )
  : [];

const detailImageAudit = details.map((detail) => {
  const urls = {
    mainImage: text(detail.mainImage),
    image: text(detail.image),
    imagePath: text(detail.imagePath),
    imageUrl: text(detail.imageUrl),
    heroImage: text(detail.heroImage),
    imageCard: text(detail.imageCard),
  };

  const existence = {};

  for (const [key, value] of Object.entries(urls)) {
    const filePath = urlToPublicFile(value);

    existence[key] = {
      url: value,
      publicFile: filePath
        ? relative(filePath)
        : "",
      exists:
        Boolean(filePath) &&
        fs.existsSync(filePath),
      size:
        Boolean(filePath) &&
        fs.existsSync(filePath)
          ? fs.statSync(filePath).size
          : 0,
    };
  }

  return {
    model: detail.model,
    slug: detail.slug,
    urls,
    existence,
  };
});

const cardContexts = [];

for (const filePath of productCardCandidates) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const source = read(filePath);

  const contexts = getContext(
    source,
    /imagePath|imageUrl|mainImage|imageCard|product\.image|<Image|<img/i
  );

  cardContexts.push({
    filePath,
    contexts,
  });
}

const referenceFiles = [];

for (const filePath of referenceSelectionCandidates) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const source = read(filePath);

  referenceFiles.push({
    filePath,
    imageContexts: getContext(
      source,
      /"image"|"imagePath"|"imageUrl"|"mainImage"|"imageCard"/i,
      5,
      10
    ).slice(0, 8),
    sampleObjects:
      extractGeneratedObjects(source),
  });
}

const report = [];

report.push(
  "# 穿板倒刺接头图片显示链路检查"
);
report.push("");

report.push(
  `生成时间：${new Date().toLocaleString("zh-CN")}`
);
report.push("");

report.push(
  "## 一、public图片目录"
);
report.push("");

report.push(
  `- 目录存在：${fs.existsSync(imageDirectory) ? "是" : "否"}`
);
report.push(
  `- 目录：${relative(imageDirectory)}`
);
report.push(
  `- 图片数量：${imageFiles.length}`
);
report.push("");

for (const filePath of imageFiles) {
  report.push(
    `- ${relative(filePath)}｜${fs.statSync(filePath).size} bytes`
  );
}

report.push("");

report.push(
  "## 二、详情数据图片字段"
);
report.push("");

for (const item of detailImageAudit) {
  report.push(
    `### ${item.model}`
  );
  report.push("");

  for (
    const [key, result]
    of Object.entries(item.existence)
  ) {
    report.push(
      `- ${key}：\`${result.url || "空"}\`｜文件存在：${result.exists ? "是" : "否"}｜大小：${result.size}`
    );
  }

  report.push("");
}

report.push(
  "## 三、选型生成文件中的图片字段"
);
report.push("");

const selectionImageContexts =
  getContext(
    selectionSource,
    /"image"|"imagePath"|"imageUrl"|"mainImage"|"imageCard"/i,
    5,
    10
  );

for (
  const context
  of selectionImageContexts.slice(0, 30)
) {
  report.push(
    `### 第${context.line}行附近`
  );
  report.push("");
  report.push("```ts");
  report.push(context.content);
  report.push("```");
  report.push("");
}

report.push(
  "## 四、产品卡片实际读取字段"
);
report.push("");

if (!cardContexts.length) {
  report.push(
    "- 没有找到候选产品卡片组件"
  );
  report.push("");
}

for (const item of cardContexts) {
  report.push(
    `### ${relative(item.filePath)}`
  );
  report.push("");

  if (!item.contexts.length) {
    report.push(
      "- 没有找到图片字段读取代码"
    );
    report.push("");
    continue;
  }

  for (
    const context
    of item.contexts.slice(0, 30)
  ) {
    report.push(
      `#### 第${context.line}行附近`
    );
    report.push("");
    report.push("```tsx");
    report.push(context.content);
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 五、正常接头选型数据对比"
);
report.push("");

for (const item of referenceFiles) {
  report.push(
    `### ${relative(item.filePath)}`
  );
  report.push("");

  if (!item.imageContexts.length) {
    report.push(
      "- 没有找到图片字段"
    );
    report.push("");
    continue;
  }

  for (
    const context
    of item.imageContexts.slice(0, 12)
  ) {
    report.push(
      `#### 第${context.line}行附近`
    );
    report.push("");
    report.push("```ts");
    report.push(context.content);
    report.push("```");
    report.push("");
  }
}

report.push(
  "## 六、初步统计"
);
report.push("");

report.push(
  `- 详情数据数量：${details.length}`
);
report.push(
  `- public实际图片：${imageFiles.length}`
);
report.push(
  `- mainImage可命中文件：${
    detailImageAudit.filter(
      (item) =>
        item.existence.mainImage.exists
    ).length
  }`
);
report.push(
  `- imagePath可命中文件：${
    detailImageAudit.filter(
      (item) =>
        item.existence.imagePath.exists
    ).length
  }`
);
report.push(
  `- imageUrl可命中文件：${
    detailImageAudit.filter(
      (item) =>
        item.existence.imageUrl.exists
    ).length
  }`
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
  "穿板倒刺接头图片显示检查完成"
);
console.log(
  "============================================"
);
console.log(
  "public图片：",
  imageFiles.length
);
console.log(
  "详情数据：",
  details.length
);
console.log("");
console.log(
  "报告："
);
console.log(
  reportPath
);
console.log("");
