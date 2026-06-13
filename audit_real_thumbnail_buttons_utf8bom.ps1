param()

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$reportPath = Join-Path $projectRoot "thumbnail-button-audit.txt"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "audit-thumbnail-buttons-$timestamp.cjs"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

foreach ($filePath in @($tsxPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }
}

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const tsxPath = process.argv[3];
const cssPath = process.argv[4];
const reportPath = process.argv[5];

const ts = require(path.join(projectRoot, "node_modules", "typescript"));

const tsx = fs.readFileSync(tsxPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

const sourceFile = ts.createSourceFile(
  tsxPath,
  tsx,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

function lineOf(position) {
  return sourceFile.getLineAndCharacterOfPosition(position).line + 1;
}

function getJsxTagName(node) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }

  return "";
}

function getAttributes(node) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.attributes.properties;
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.attributes.properties;
  }

  return [];
}

function getAttribute(node, attributeName) {
  for (const attribute of getAttributes(node)) {
    if (!ts.isJsxAttribute(attribute)) continue;

    if (attribute.name.getText(sourceFile) !== attributeName) {
      continue;
    }

    return attribute.initializer
      ? attribute.initializer.getText(sourceFile)
      : "true";
  }

  return "";
}

function classifyButton(node) {
  const tagName = getJsxTagName(node);

  if (tagName !== "button") {
    return null;
  }

  const className = getAttribute(node, "className");
  const onClick = getAttribute(node, "onClick");
  const ariaLabel = getAttribute(node, "aria-label");
  const text = node.getText(sourceFile);

  const combined = [
    className,
    onClick,
    ariaLabel,
    text,
  ].join(" ");

  let direction = "";

  if (
    /handlePreviousImage|上一张|prev|previous|‹|<</i.test(combined)
  ) {
    direction = "LEFT / PREVIOUS";
  }

  if (
    /handleNextImage|下一张|next|›|>>/i.test(combined)
  ) {
    direction = direction
      ? direction + " + RIGHT / NEXT"
      : "RIGHT / NEXT";
  }

  if (!direction && /thumbnailArrow/i.test(combined)) {
    direction = "THUMBNAIL ARROW (direction inferred by order)";
  }

  if (!direction) {
    return null;
  }

  return {
    direction,
    line: lineOf(node.getStart(sourceFile)),
    className,
    onClick,
    ariaLabel,
    jsx: text,
  };
}

const buttons = [];

function visit(node) {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    const result = classifyButton(node);

    if (result) {
      buttons.push(result);
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

const classNames = new Set();

for (const button of buttons) {
  const matches = button.className.match(/styles\.([A-Za-z0-9_]+)/g) || [];

  for (const match of matches) {
    classNames.add(match.replace("styles.", ""));
  }
}

const cssSections = [];

for (const className of classNames) {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ruleRegex = new RegExp(
    `(^|\\n)([^\\n{]*\\.${escaped}[^\\n{]*)\\{([\\s\\S]*?)\\}`,
    "g",
  );

  let match;
  let found = false;

  while ((match = ruleRegex.exec(css)) !== null) {
    found = true;

    const before = css.slice(0, match.index);
    const line = before.split(/\r?\n/).length;

    cssSections.push({
      className,
      line,
      selector: match[2].trim(),
      body: match[3].trim(),
    });
  }

  if (!found) {
    cssSections.push({
      className,
      line: 0,
      selector: "(No CSS rule found)",
      body: "",
    });
  }
}

const output = [];

output.push("============================================================");
output.push("Thumbnail Button Audit");
output.push("============================================================");
output.push(`TSX: ${path.relative(projectRoot, tsxPath)}`);
output.push(`CSS: ${path.relative(projectRoot, cssPath)}`);
output.push("");

if (buttons.length === 0) {
  output.push("No thumbnail navigation buttons were found.");
} else {
  output.push(`Found ${buttons.length} candidate button(s).`);
  output.push("");

  buttons.forEach((button, index) => {
    output.push(`BUTTON ${index + 1}`);
    output.push(`Direction : ${button.direction}`);
    output.push(`TSX line  : ${button.line}`);
    output.push(`className : ${button.className || "(none)"}`);
    output.push(`onClick   : ${button.onClick || "(none)"}`);
    output.push(`aria-label: ${button.ariaLabel || "(none)"}`);
    output.push("JSX:");
    output.push(button.jsx);
    output.push("");
  });
}

output.push("============================================================");
output.push("Related CSS Rules");
output.push("============================================================");
output.push("");

if (cssSections.length === 0) {
  output.push("No CSS module class names were extracted from the buttons.");
} else {
  for (const section of cssSections) {
    output.push(`Class    : .${section.className}`);
    output.push(
      `CSS line : ${section.line || "(not found)"}`
    );
    output.push(`Selector : ${section.selector}`);
    output.push("Body:");
    output.push(section.body || "(empty)");
    output.push("");
  }
}

const relevantLines = tsx
  .split(/\r?\n/)
  .map((line, index) => ({
    number: index + 1,
    line,
  }))
  .filter(({ line }) =>
    /thumbnailRow|thumbnailArrow|thumbnailList|handlePreviousImage|handleNextImage|上一张|下一张/.test(line)
  );

output.push("============================================================");
output.push("Relevant TSX Lines");
output.push("============================================================");
output.push("");

for (const item of relevantLines) {
  output.push(
    `L${String(item.number).padStart(4, " ")}: ${item.line}`
  );
}

fs.writeFileSync(reportPath, output.join("\n"), "utf8");

console.log(output.join("\n"));
console.log("");
console.log(`Report written to: ${reportPath}`);
'@

$encoding = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($workerPath, $workerContent, $encoding)

try {
  Write-Host ""
  Write-Host "Auditing thumbnail buttons..." -ForegroundColor Cyan
  Write-Host ""

  & node $workerPath $projectRoot $tsxPath $cssPath $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "Thumbnail button audit failed."
  }

  Write-Host ""
  Write-Host "Read-only audit completed." -ForegroundColor Green
  Write-Host "No source files were modified." -ForegroundColor Green
  Write-Host ""
  Write-Host "Report:" -ForegroundColor Cyan
  Write-Host $reportPath
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
