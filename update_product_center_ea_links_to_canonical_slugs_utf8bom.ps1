param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = (Get-Location).Path

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot "package.json"))) {
  throw "package.json was not found. Run this script from the project root."
}

$selectionPath = Join-Path $projectRoot "data\products\selection\product-selection.generated.ts"
$servicePath = Join-Path $projectRoot "services\products\detail\getProductDetailPageData.ts"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$workerPath = Join-Path $env:TEMP "canonicalize-ea-detail-slugs-$timestamp.cjs"
$reportPath = Join-Path $projectRoot "data\products\detail\ea-slug-link-update-report.txt"

foreach ($filePath in @($selectionPath, $servicePath)) {
  if (-not (Test-Path -LiteralPath $filePath)) {
    throw "Required file not found: $filePath"
  }
}

$selectionBackup = "$selectionPath.$timestamp.bak"
$serviceBackup = "$servicePath.$timestamp.bak"

Copy-Item -LiteralPath $selectionPath -Destination $selectionBackup -Force
Copy-Item -LiteralPath $servicePath -Destination $serviceBackup -Force

Write-Host "Backup created: $selectionBackup" -ForegroundColor Yellow
Write-Host "Backup created: $serviceBackup" -ForegroundColor Yellow

$workerContent = @'
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const selectionPath = process.argv[3];
const servicePath = process.argv[4];
const reportPath = process.argv[5];

const allowedCapacities = [
  "100",
  "250",
  "500",
  "1000",
  "2500",
  "5000",
  "10000",
];

const expectedSlugs = new Set(
  allowedCapacities.flatMap((capacity) => [
    `ea-${capacity}-pmma`,
    `ea-${capacity}-peek`,
  ]),
);

function canonicalizeSlug(slug) {
  return slug.replace(
    /^ea-(100|250|500|1000|2500|5000|10000)ul-(pmma|peek)$/i,
    (_, capacity, material) =>
      `ea-${capacity}-${material.toLowerCase()}`,
  );
}

let selectionContent = fs.readFileSync(selectionPath, "utf8");
const originalSelectionContent = selectionContent;

const oldDetailSlugs = [];
const updatedDetailSlugs = [];

/*
 * Only update the detailSlug field.
 * Image filenames such as pump-ea-100ul-pmma.webp remain unchanged.
 */
selectionContent = selectionContent.replace(
  /(\bdetailSlug\s*:\s*["'`])(ea-(?:100|250|500|1000|2500|5000|10000)ul-(?:pmma|peek))(["'`])/gi,
  (full, prefix, slug, suffix) => {
    const canonical = canonicalizeSlug(slug);
    oldDetailSlugs.push(slug.toLowerCase());
    updatedDetailSlugs.push(canonical);
    return `${prefix}${canonical}${suffix}`;
  },
);

/*
 * Support quoted JSON-style object keys as well:
 * "detailSlug": "ea-100ul-pmma"
 */
selectionContent = selectionContent.replace(
  /(["']detailSlug["']\s*:\s*["'`])(ea-(?:100|250|500|1000|2500|5000|10000)ul-(?:pmma|peek))(["'`])/gi,
  (full, prefix, slug, suffix) => {
    const canonical = canonicalizeSlug(slug);
    oldDetailSlugs.push(slug.toLowerCase());
    updatedDetailSlugs.push(canonical);
    return `${prefix}${canonical}${suffix}`;
  },
);

const currentDetailSlugs = [];

for (
  const match of selectionContent.matchAll(
    /(?:\bdetailSlug|["']detailSlug["'])\s*:\s*["'`](ea-(?:100|250|500|1000|2500|5000|10000)-(?:pmma|peek))["'`]/gi,
  )
) {
  currentDetailSlugs.push(match[1].toLowerCase());
}

const uniqueCurrentSlugs = [...new Set(currentDetailSlugs)].sort();
const missingSlugs = [...expectedSlugs].filter(
  (slug) => !uniqueCurrentSlugs.includes(slug),
);
const unexpectedSlugs = uniqueCurrentSlugs.filter(
  (slug) => !expectedSlugs.has(slug),
);

if (oldDetailSlugs.length === 0 && missingSlugs.length > 0) {
  const nearbyLines = selectionContent
    .split(/\r?\n/)
    .map((line, index) => ({
      number: index + 1,
      line,
    }))
    .filter(({ line }) => /detailSlug|ea-\d+ul-(?:pmma|peek)/i.test(line))
    .slice(0, 40)
    .map(({ number, line }) => `L${number}: ${line}`)
    .join("\n");

  throw new Error(
    "No old EA detailSlug values were replaced, and the 14 canonical slugs are not present.\n" +
    nearbyLines,
  );
}

if (missingSlugs.length > 0) {
  throw new Error(
    `Selection data is missing canonical EA detail slugs:\n${missingSlugs.join("\n")}`,
  );
}

if (unexpectedSlugs.length > 0) {
  throw new Error(
    `Unexpected canonical EA detail slugs were found:\n${unexpectedSlugs.join("\n")}`,
  );
}

if (uniqueCurrentSlugs.length !== 14) {
  throw new Error(
    `Expected 14 unique EA detail slugs, found ${uniqueCurrentSlugs.length}.`,
  );
}

fs.writeFileSync(selectionPath, selectionContent, "utf8");

let serviceContent = fs.readFileSync(servicePath, "utf8");
const originalServiceContent = serviceContent;

/*
 * The selection lookup must now use the same canonical slug
 * as the product-center detailSlug.
 */
serviceContent = serviceContent.replace(
  /ea-\$\{capacity\}ul-\$\{material\.toLowerCase\(\)\}/g,
  "ea-${capacity}-${material.toLowerCase()}",
);

serviceContent = serviceContent.replace(
  /ea-100ul-pmma/g,
  "ea-100-pmma",
);

/*
 * Fail clearly when the service still constructs an old EA selection slug.
 */
if (
  /ea-\$\{capacity\}ul-\$\{material\.toLowerCase\(\)\}/.test(serviceContent)
) {
  throw new Error(
    "The detail service still contains the old dynamic EA selection slug.",
  );
}

fs.writeFileSync(servicePath, serviceContent, "utf8");

const imagePathMatches = [
  ...selectionContent.matchAll(
    /pump-ea-(?:100|250|500|1000|2500|5000|10000)ul-(?:pmma|peek)\.webp/gi,
  ),
].map((match) => match[0].toLowerCase());

const report = [
  "============================================================",
  "EA product-center detail link update",
  "============================================================",
  "",
  `Selection file: ${path.relative(projectRoot, selectionPath)}`,
  `Service file: ${path.relative(projectRoot, servicePath)}`,
  "",
  `Old detailSlug values replaced: ${oldDetailSlugs.length}`,
  `Canonical unique detailSlug values: ${uniqueCurrentSlugs.length}`,
  `Image filenames containing ul preserved: ${new Set(imagePathMatches).size}`,
  "",
  "Canonical routes:",
  ...uniqueCurrentSlugs.map(
    (slug) => `/products/pumps/${slug}`,
  ),
  "",
  "Notes:",
  "- Only detailSlug values were canonicalized.",
  "- Product image filenames still contain ul and were not renamed.",
  "- Old URLs such as ea-100ul-pmma are no longer valid routes.",
];

fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log(`Replaced ${oldDetailSlugs.length} old detailSlug values.`);
console.log(`Verified ${uniqueCurrentSlugs.length} canonical EA detail slugs.`);
console.log(
  `Preserved ${new Set(imagePathMatches).size} EA image filenames containing ul.`,
);
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
  Write-Host "Updating product-center EA detail links..." -ForegroundColor Cyan

  & node $workerPath `
    $projectRoot `
    $selectionPath `
    $servicePath `
    $reportPath

  if ($LASTEXITCODE -ne 0) {
    throw "EA detailSlug update worker failed."
  }

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
      Write-Host "Build failed. Restoring both files..." -ForegroundColor Yellow

      Copy-Item `
        -LiteralPath $selectionBackup `
        -Destination $selectionPath `
        -Force

      Copy-Item `
        -LiteralPath $serviceBackup `
        -Destination $servicePath `
        -Force

      throw "EA product-center link update failed during build. Files were restored."
    }

    Write-Host ""
    Write-Host "Build passed." -ForegroundColor Green
  }
  else {
    Write-Host ""
    Write-Host "Build was skipped. Run npm run build manually." -ForegroundColor Yellow
  }

  Write-Host ""
  Write-Host "Completed:" -ForegroundColor Green
  Write-Host " - Product-center EA links now use ea-100-pmma format"
  Write-Host " - 14 canonical EA detail slugs verified"
  Write-Host " - Product image filenames with 100ul were preserved"
  Write-Host " - Detail page styles were not modified"
  Write-Host ""
  Write-Host "After running, restart npm run dev and refresh /products/." -ForegroundColor Cyan
}
finally {
  if (Test-Path -LiteralPath $workerPath) {
    Remove-Item -LiteralPath $workerPath -Force
  }
}
