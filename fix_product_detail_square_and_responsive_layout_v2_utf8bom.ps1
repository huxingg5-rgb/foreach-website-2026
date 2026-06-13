param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path
$clientPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$pagePath = Join-Path $projectRoot "app\products\[category]\[slug]\page.tsx"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "responsive-product-detail-v2-$timestamp.cjs"
$reportPath = Join-Path $projectRoot "components\products\detail\product-detail-responsive-report-v2.txt"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($clientPath, $cssPath, $pagePath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

$clientBackup = "$clientPath.$timestamp.bak"
$cssBackup = "$cssPath.$timestamp.bak"
$pageBackup = "$pagePath.$timestamp.bak"

Copy-Item -LiteralPath $clientPath -Destination $clientBackup -Force
Copy-Item -LiteralPath $cssPath -Destination $cssBackup -Force
Copy-Item -LiteralPath $pagePath -Destination $pageBackup -Force

Write-Host "Backup created: $clientBackup" -ForegroundColor Yellow
Write-Host "Backup created: $cssBackup" -ForegroundColor Yellow
Write-Host "Backup created: $pageBackup" -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const clientPath = process.argv[3];
const pagePath = process.argv[4];
const reportPath = process.argv[5];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

function parse(filePath, sourceText) {
  return ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

function createHelpers(filePath, sourceText) {
  const sourceFile = parse(filePath, sourceText);

  function isJsxNode(node) {
    return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node);
  }

  function getOpening(node) {
    return ts.isJsxElement(node) ? node.openingElement : node;
  }

  function getTagName(node) {
    if (ts.isJsxElement(node)) {
      return node.openingElement.tagName.getText(sourceFile);
    }

    if (ts.isJsxSelfClosingElement(node)) {
      return node.tagName.getText(sourceFile);
    }

    return "";
  }

  function getAttributes(node) {
    return getOpening(node).attributes.properties;
  }

  function getAttribute(node, name) {
    for (const attribute of getAttributes(node)) {
      if (!ts.isJsxAttribute(attribute)) continue;
      if (attribute.name.getText(sourceFile) !== name) continue;

      return attribute.initializer
        ? attribute.initializer.getText(sourceFile)
        : "true";
    }

    return "";
  }

  function getClassName(node) {
    return getAttribute(node, "className");
  }

  function hasClass(node, className) {
    return new RegExp(`styles\\.${className}\\b`).test(
      getClassName(node),
    );
  }

  function lineOf(node) {
    return (
      sourceFile.getLineAndCharacterOfPosition(
        node.getStart(sourceFile),
      ).line + 1
    );
  }

  function getJsxAncestors(node) {
    const result = [];
    let current = node.parent;

    while (current) {
      if (isJsxNode(current)) {
        result.push(current);
      }

      current = current.parent;
    }

    return result;
  }

  function isDescendantOf(node, ancestor) {
    let current = node.parent;

    while (current) {
      if (current === ancestor) return true;
      current = current.parent;
    }

    return false;
  }

  const allJsxNodes = [];

  function collect(node) {
    if (isJsxNode(node)) {
      allJsxNodes.push(node);
    }

    ts.forEachChild(node, collect);
  }

  collect(sourceFile);

  return {
    sourceFile,
    isJsxNode,
    getOpening,
    getTagName,
    getAttribute,
    getClassName,
    hasClass,
    lineOf,
    getJsxAncestors,
    isDescendantOf,
    allJsxNodes,
  };
}

function applyAttributeEdits(
  sourceText,
  helpers,
  targets,
  marked,
) {
  const edits = [];

  for (const target of targets) {
    const { node, name, value = "true" } = target;

    if (!node || !helpers.isJsxNode(node)) {
      throw new Error(`Invalid JSX target for ${name}.`);
    }

    if (helpers.getAttribute(node, name)) {
      marked.push(
        `${name}: already present in ${path.basename(
          helpers.sourceFile.fileName,
        )} line ${helpers.lineOf(node)}`,
      );
      continue;
    }

    const opening = helpers.getOpening(node);

    edits.push({
      start: opening.tagName.end,
      text: ` ${name}="${value}"`,
    });

    marked.push(
      `${name}: <${helpers.getTagName(node)}> in ${path.basename(
        helpers.sourceFile.fileName,
      )} line ${helpers.lineOf(node)}`,
    );
  }

  edits
    .sort((left, right) => right.start - left.start)
    .forEach(({ start, text }) => {
      sourceText =
        sourceText.slice(0, start) +
        text +
        sourceText.slice(start);
    });

  return sourceText;
}

function chooseSmallest(nodes, sourceFile) {
  if (!nodes.length) return null;

  return [...nodes].sort(
    (left, right) =>
      left.getText(sourceFile).length -
      right.getText(sourceFile).length,
  )[0];
}

/* =========================================================
   ProductDetailClient.tsx targets
========================================================= */

let clientText = fs.readFileSync(clientPath, "utf8");
const client = createHelpers(clientPath, clientText);
const marked = [];

const thumbRow = client.allJsxNodes.find((node) =>
  client.hasClass(node, "thumbRow"),
);

if (!thumbRow) {
  throw new Error("Could not locate styles.thumbRow.");
}

const imageNodes = client.allJsxNodes.filter((node) => {
  const tag = client.getTagName(node);

  return tag === "Image" || tag === "img";
});

let galleryNode = null;
let mainImageNode = null;

for (const ancestor of client.getJsxAncestors(thumbRow)) {
  const candidates = imageNodes.filter(
    (imageNode) =>
      client.isDescendantOf(imageNode, ancestor) &&
      !client.isDescendantOf(imageNode, thumbRow) &&
      imageNode.getStart(client.sourceFile) <
        thumbRow.getStart(client.sourceFile),
  );

  if (candidates.length > 0) {
    galleryNode = ancestor;
    mainImageNode = candidates.sort(
      (left, right) =>
        right.getStart(client.sourceFile) -
        left.getStart(client.sourceFile),
    )[0];
    break;
  }
}

if (!galleryNode || !mainImageNode) {
  throw new Error(
    "Could not locate the main gallery and main image.",
  );
}

let mainStageNode = null;

for (const ancestor of client.getJsxAncestors(mainImageNode)) {
  if (ancestor === galleryNode) break;

  const tag = client.getTagName(ancestor);
  const className = client.getClassName(ancestor);

  if (
    /^[a-z]/.test(tag) &&
    (
      /main|stage|preview|image|visual|zoom/i.test(className) ||
      !mainStageNode
    )
  ) {
    mainStageNode = ancestor;

    if (/main|stage|preview|image|visual|zoom/i.test(className)) {
      break;
    }
  }
}

if (!mainStageNode) {
  mainStageNode = mainImageNode;
}

const modelRowCandidates = client.allJsxNodes.filter((node) => {
  const text = node.getText(client.sourceFile);

  return (
    text.includes("型号") &&
    text.includes("配置选择") &&
    text.length < 2600
  );
});

const modelRow = chooseSmallest(
  modelRowCandidates,
  client.sourceFile,
);

if (!modelRow) {
  throw new Error(
    "Could not locate the model/configuration row.",
  );
}

const actionLabels = [
  "添加规格书",
  "添加图纸",
  "申请3D文件",
  "加入清单",
];

const actionGridCandidates = client.allJsxNodes.filter((node) => {
  const text = node.getText(client.sourceFile);

  return (
    actionLabels.every((label) => text.includes(label)) &&
    text.length < 5200
  );
});

const actionGrid = chooseSmallest(
  actionGridCandidates,
  client.sourceFile,
);

if (!actionGrid) {
  throw new Error(
    "Could not locate the four-button action container.",
  );
}

let specRow =
  client.allJsxNodes.find((node) =>
    /styles\.(specRow|specItem|specTableRow)\b/.test(
      client.getClassName(node),
    ),
  ) || null;

if (!specRow) {
  const specCandidates = client.allJsxNodes.filter((node) => {
    const text = node.getText(client.sourceFile);

    const labelValuePair =
      (
        /\bspec\.label\b/.test(text) &&
        /\bspec\.value\b/.test(text)
      ) ||
      (
        /\bitem\.label\b/.test(text) &&
        /\bitem\.value\b/.test(text)
      ) ||
      (
        /\bspec\.name\b/.test(text) &&
        /\bspec\.value\b/.test(text)
      );

    return labelValuePair && text.length < 2200;
  });

  specRow = chooseSmallest(
    specCandidates,
    client.sourceFile,
  );
}

if (!specRow) {
  throw new Error(
    "Could not locate the specification row template.",
  );
}

clientText = applyAttributeEdits(
  clientText,
  client,
  [
    {
      node: galleryNode,
      name: "data-product-gallery",
    },
    {
      node: mainStageNode,
      name: "data-product-main-stage",
    },
    {
      node: mainImageNode,
      name: "data-product-main-image",
    },
    {
      node: thumbRow,
      name: "data-product-thumb-row",
    },
    {
      node: modelRow,
      name: "data-product-model-row",
    },
    {
      node: actionGrid,
      name: "data-product-action-grid",
    },
    {
      node: specRow,
      name: "data-product-spec-row",
    },
  ],
  marked,
);

/* =========================================================
   app/products/[category]/[slug]/page.tsx breadcrumb
========================================================= */

let pageText = fs.readFileSync(pagePath, "utf8");
const page = createHelpers(pagePath, pageText);

const breadcrumbNode = page.allJsxNodes.find((node) => {
  const tagName = page.getTagName(node);

  return (
    /Breadcrumb$/i.test(tagName) ||
    /SiteBreadcrumb/i.test(tagName)
  );
});

if (!breadcrumbNode) {
  const relevantLines = pageText
    .split(/\r?\n/)
    .map((line, index) => ({
      number: index + 1,
      line,
    }))
    .filter(({ line }) =>
      /breadcrumb|SitePageShell|ProductDetailClient/i.test(line),
    )
    .slice(0, 50)
    .map(({ number, line }) => `L${number}: ${line}`)
    .join("\n");

  throw new Error(
    "Could not locate the breadcrumb in the detail route file.\n" +
    relevantLines,
  );
}

let breadcrumbShell =
  page.getJsxAncestors(breadcrumbNode).find((node) => {
    const tag = page.getTagName(node);

    return (
      /^[a-z]/.test(tag) &&
      node.getText(page.sourceFile).length < 4000
    );
  }) || null;

if (breadcrumbShell) {
  pageText = applyAttributeEdits(
    pageText,
    page,
    [
      {
        node: breadcrumbShell,
        name: "data-product-breadcrumb-shell",
      },
    ],
    marked,
  );
} else {
  /*
   * When the breadcrumb has no ordinary HTML parent,
   * wrap the breadcrumb JSX with a marked div.
   */
  const start = breadcrumbNode.getStart(page.sourceFile);
  const end = breadcrumbNode.getEnd();
  const original = pageText.slice(start, end);
  const wrapped =
    `<div data-product-breadcrumb-shell="true">\n` +
    original +
    `\n</div>`;

  pageText =
    pageText.slice(0, start) +
    wrapped +
    pageText.slice(end);

  marked.push(
    `data-product-breadcrumb-shell: wrapper added in ${path.basename(
      pagePath,
    )} line ${page.lineOf(breadcrumbNode)}`,
  );
}

/* =========================================================
   Write only after every target has been found
========================================================= */

fs.writeFileSync(clientPath, clientText, "utf8");
fs.writeFileSync(pagePath, pageText, "utf8");

const report = [
  "Product detail responsive markers V2",
  "====================================",
  "",
  ...marked,
];

fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log(marked.join("\n"));
console.log(`Report written to: ${reportPath}`);
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText(
  $workerPath,
  $workerContent,
  $encoding
)

try {
  Write-Host ""
  Write-Host "Locating the real product-detail and route structure..." -ForegroundColor Cyan

  & node `
    $workerPath `
    $projectRoot `
    $clientPath `
    $pagePath `
    $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "Could not add the V2 responsive structure markers."
  }

  $cssContent = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

  $startMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_START */"
  $endMarker = "/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_END */"

  $cssBlock = @'

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_START */
/* =========================================================
   产品详情页最终响应式覆盖 V2

   1. 主图预览 1:1
   2. 缩略图之间无间隔
   3. 面包屑下方 18px
   4. 1080px 以下上下排版
   5. 手机端修复型号、按钮、规格和面包屑
========================================================= */

/* ---------- 面包屑 ---------- */

[data-product-breadcrumb-shell="true"] {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 18px !important;
}

/* ---------- 主图 1:1 ---------- */

[data-product-gallery="true"] {
  width: 100%;
  min-width: 0;
}

[data-product-main-stage="true"] {
  position: relative !important;
  display: flex !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  aspect-ratio: 1 / 1 !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  margin-right: auto !important;
  margin-left: auto !important;
  box-sizing: border-box;
}

[data-product-main-image="true"] {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  margin: auto !important;
  object-fit: contain !important;
  object-position: center center !important;
}

/* ---------- 缩略图紧密排列 ---------- */

[data-product-thumb-row="true"],
.thumbRow {
  gap: 0 !important;
  column-gap: 0 !important;
  row-gap: 0 !important;
}

[data-product-thumb-row="true"] > .thumb,
.thumbRow > .thumb {
  margin: 0 !important;
}

/* ---------- 1080px 以下 ---------- */

@media (max-width: 1080px) {
  .productTop {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) !important;
    align-items: start !important;
    gap: 34px !important;
  }

  [data-product-gallery="true"] {
    width: min(100%, 720px) !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  .productInfo {
    width: 100% !important;
    min-width: 0 !important;
  }

  [data-product-model-row="true"] {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  [data-product-model-row="true"] > * {
    min-width: 0;
  }

  [data-product-model-row="true"] button {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }

  [data-product-action-grid="true"] {
    display: grid !important;
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 12px !important;
    width: 100% !important;
  }

  [data-product-action-grid="true"] > * {
    width: 100% !important;
    min-width: 0 !important;
  }

  [data-product-spec-row="true"] {
    display: grid !important;
    grid-template-columns:
      minmax(112px, 34%)
      minmax(0, 1fr) !important;
    align-items: center !important;
  }

  [data-product-spec-row="true"] > * {
    min-width: 0 !important;
    margin: 0 !important;
  }
}

/* ---------- 手机端 ---------- */

@media (max-width: 680px) {
  /*
   * Top 栏与面包屑直接衔接；
   * 只保留面包屑下方 18px。
   */
  [data-product-breadcrumb-shell="true"] {
    margin-top: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 18px !important;
  }

  [data-product-gallery="true"],
  [data-product-main-stage="true"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: auto !important;
    margin-left: auto !important;
  }

  [data-product-main-image="true"] {
    margin-right: auto !important;
    margin-left: auto !important;
    object-position: center center !important;
  }

  [data-product-model-row="true"] {
    gap: 8px !important;
    font-size: clamp(16px, 4.2vw, 22px) !important;
  }

  [data-product-model-row="true"] button {
    min-height: 42px;
    padding-right: 14px !important;
    padding-left: 14px !important;
  }

  [data-product-action-grid="true"] {
    grid-template-columns:
      repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  [data-product-spec-row="true"] {
    grid-template-columns:
      minmax(102px, 36%)
      minmax(0, 1fr) !important;
  }

  [data-product-spec-row="true"] > * {
    white-space: normal !important;
    word-break: break-word;
  }
}

/* PRODUCT_DETAIL_RESPONSIVE_FINAL_V2_END */
'@

  $pattern =
    [Regex]::Escape($startMarker) +
    '(?s).*?' +
    [Regex]::Escape($endMarker)

  if (
    [System.Text.RegularExpressions.Regex]::IsMatch(
      $cssContent,
      $pattern
    )
  ) {
    $cssContent =
      [System.Text.RegularExpressions.Regex]::Replace(
        $cssContent,
        $pattern,
        $cssBlock.Trim(),
        1
      )
  }
  else {
    $cssContent =
      $cssContent.TrimEnd() +
      "`r`n`r`n" +
      $cssBlock +
      "`r`n"
  }

  [System.IO.File]::WriteAllText(
    $cssPath,
    $cssContent,
    $encoding
  )

  Write-Host "Updated: $clientPath" -ForegroundColor Green
  Write-Host "Updated: $pagePath" -ForegroundColor Green
  Write-Host "Updated: $cssPath" -ForegroundColor Green

  $nextPath = Join-Path $projectRoot ".next"

  if (Test-Path -LiteralPath $nextPath) {
    Remove-Item -LiteralPath $nextPath -Recurse -Force
    Write-Host "Removed stale .next cache." -ForegroundColor Yellow
  }

  if (-not $SkipBuild) {
    Write-Host ""
    Write-Host "Running npm run build..." -ForegroundColor Cyan

    & npm run build

    if ($LASTEXITCODE -ne 0) {
      Write-Host ""
      Write-Host "Build failed. Restoring all changed files..." -ForegroundColor Yellow

      Copy-Item `
        -LiteralPath $clientBackup `
        -Destination $clientPath `
        -Force

      Copy-Item `
        -LiteralPath $pageBackup `
        -Destination $pagePath `
        -Force

      Copy-Item `
        -LiteralPath $cssBackup `
        -Destination $cssPath `
        -Force

      throw "Responsive product-detail V2 update failed. Files were restored."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Applied:" -ForegroundColor Green
  Write-Host " - Main preview is square"
  Write-Host " - Thumbnail gaps removed"
  Write-Host " - Breadcrumb bottom spacing is 18px"
  Write-Host " - Under 1080px content stacks"
  Write-Host " - Model and configuration remain one row"
  Write-Host " - Four actions use two columns"
  Write-Host " - Mobile main image is centered"
  Write-Host " - Specification label/value remain one row"
  Write-Host " - Mobile header/breadcrumb extra gap removed"
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
