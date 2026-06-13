param()

$ErrorActionPreference = "Stop"

$projectRoot = (Get-Location).Path
$tsxPath = Join-Path $projectRoot "components\products\detail\ProductDetailClient.tsx"
$cssPath = Join-Path $projectRoot "components\products\detail\product-detail.module.css"
$reportPath = Join-Path $projectRoot "thumbnail-structure-audit.txt"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "audit-thumbnail-structure-$timestamp.cjs"

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
  if (ts.isJsxElement(node)) {
    return node.openingElement.attributes.properties;
  }

  if (ts.isJsxSelfClosingElement(node)) {
    return node.attributes.properties;
  }

  return [];
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

function summarizeNode(node) {
  if (!node) return "(none)";

  const tagName = getTagName(node);
  const className = getAttribute(node, "className");
  const ariaLabel = getAttribute(node, "aria-label");

  return [
    `<${tagName || node.kind}>`,
    className ? `className=${className}` : "",
    ariaLabel ? `aria-label=${ariaLabel}` : "",
    `line=${lineOf(node.getStart(sourceFile))}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

const buttons = [];

function visit(node) {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    if (getTagName(node) === "button") {
      const className = getAttribute(node, "className");
      const ariaLabel = getAttribute(node, "aria-label");
      const onClick = getAttribute(node, "onClick");

      if (/styles\.thumbArrow/.test(className)) {
        buttons.push({
          node,
          className,
          ariaLabel,
          onClick,
        });
      }
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);

const output = [];

output.push("============================================================");
output.push("Thumbnail Structure Audit");
output.push("============================================================");
output.push(`TSX: ${path.relative(projectRoot, tsxPath)}`);
output.push(`CSS: ${path.relative(projectRoot, cssPath)}`);
output.push("");

for (const [index, button] of buttons.entries()) {
  output.push(`BUTTON ${index + 1}`);
  output.push(`className : ${button.className}`);
  output.push(`aria-label: ${button.ariaLabel}`);
  output.push(`onClick   : ${button.onClick}`);
  output.push(`line      : ${lineOf(button.node.getStart(sourceFile))}`);
  output.push("");
  output.push("Ancestor chain:");

  let current = button.node.parent;
  let depth = 1;

  while (current && depth <= 12) {
    if (ts.isJsxElement(current) || ts.isJsxSelfClosingElement(current)) {
      output.push(`${"  ".repeat(depth)}${summarizeNode(current)}`);
      depth += 1;
    }

    current = current.parent;
  }

  output.push("");
}

output.push("============================================================");
output.push("Relevant TSX excerpt: lines 240-430");
output.push("============================================================");
output.push("");

const tsxLines = tsx.split(/\r?\n/);

for (let lineNumber = 240; lineNumber <= Math.min(430, tsxLines.length); lineNumber += 1) {
  output.push(
    `L${String(lineNumber).padStart(4, " ")}: ${tsxLines[lineNumber - 1]}`,
  );
}

output.push("");
output.push("============================================================");
output.push("Relevant CSS rules");
output.push("============================================================");
output.push("");

const selectorsToFind = [
  "thumbArrow",
  "thumb",
  "thumbnail",
  "gallery",
  "imagePanel",
  "productGallery",
  "thumbTrack",
  "thumbViewport",
  "thumbList",
];

const cssLines = css.split(/\r?\n/);

for (let index = 0; index < cssLines.length; index += 1) {
  const line = cssLines[index];

  if (selectorsToFind.some((term) => line.includes(term))) {
    const start = Math.max(0, index - 2);
    const end = Math.min(cssLines.length - 1, index + 10);

    for (let i = start; i <= end; i += 1) {
      output.push(
        `L${String(i + 1).padStart(4, " ")}: ${cssLines[i]}`,
      );
    }

    output.push("------------------------------------------------------------");
  }
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
  Write-Host "Auditing the real thumbnail DOM structure..." -ForegroundColor Cyan
  Write-Host ""

  & node $workerPath $projectRoot $tsxPath $cssPath $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "Thumbnail structure audit failed."
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
