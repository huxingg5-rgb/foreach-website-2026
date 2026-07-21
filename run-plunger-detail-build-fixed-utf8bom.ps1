# FOREACH 官网｜柱塞泵详情页数据生成一键脚本
# 用法：在 PowerShell 中执行：
# powershell -ExecutionPolicy Bypass -File .\run-plunger-detail-build.ps1

$ProjectRoot = "F:\WebsiteProjects\foreach-website-2026"

if (!(Test-Path $ProjectRoot)) {
  Write-Host "找不到项目目录：$ProjectRoot" -ForegroundColor Red
  exit 1
}

Set-Location $ProjectRoot
Write-Host "当前项目目录：$ProjectRoot" -ForegroundColor Cyan

# =========================================================
# 1. 清理 private-assets 里会影响匹配的文件名
# =========================================================
Write-Host "`n[1/5] 清理 private-assets 文件名..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path "private-assets\_archive\old-test-files" | Out-Null

function Move-If-Exists {
  param (
    [string]$Source,
    [string]$Destination
  )

  if (Test-Path -LiteralPath $Source) {
    Move-Item -LiteralPath $Source -Destination $Destination -Force
    Write-Host "已移走：$Source -> $Destination"
  }
}

Move-If-Exists `
  -Source "private-assets\products\pumps\plunger-pumps\2d\ea\ea-100.pdf" `
  -Destination "private-assets\_archive\old-test-files\ea-100.pdf"

Move-If-Exists `
  -Source "private-assets\products\pumps\plunger-pumps\3d\ea\ea-100.glb" `
  -Destination "private-assets\_archive\old-test-files\ea-100.glb"

if (Test-Path -LiteralPath "private-assets\products\pumps\plunger-pumps\3d\sm\SM-0500UL .glb") {
  Rename-Item `
    -LiteralPath "private-assets\products\pumps\plunger-pumps\3d\sm\SM-0500UL .glb" `
    -NewName "SM-0500UL.glb" `
    -Force
  Write-Host "已修复文件名：SM-0500UL.glb"
}

if (Test-Path -LiteralPath "private-assets\products\pumps\plunger-pumps\2d\ea\EA-0010ML.pdf") {
  if (Test-Path -LiteralPath "private-assets\products\pumps\plunger-pumps\2d\ea\EA-10000UL.pdf") {
    Move-Item `
      -LiteralPath "private-assets\products\pumps\plunger-pumps\2d\ea\EA-0010ML.pdf" `
      -Destination "private-assets\_archive\old-test-files\EA-0010ML.pdf" `
      -Force
    Write-Host "EA-10000UL.pdf 已存在，已归档旧命名 EA-0010ML.pdf"
  } else {
    Rename-Item `
      -LiteralPath "private-assets\products\pumps\plunger-pumps\2d\ea\EA-0010ML.pdf" `
      -NewName "EA-10000UL.pdf" `
      -Force
    Write-Host "已统一 EA 10mL 2D 文件名：EA-10000UL.pdf"
  }
}

# =========================================================
# 2. 写入正式详情页数据生成脚本
# =========================================================
Write-Host "`n[2/5] 写入 scripts/products/build-plunger-pump-detail-data.js..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path "scripts\products" | Out-Null

$BuildScript = @'
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const root = process.cwd();
const outputDir = path.join(root, "data", "products", "detail");
const typesPath = path.join(outputDir, "plunger-pump-detail.types.ts");
const generatedPath = path.join(outputDir, "plunger-pump-detail.generated.ts");
const summaryPath = path.join(outputDir, "plunger-pump-detail.summary.json");

const REQUIRED_SHEETS = [
  "03_型号索引",
  "05_详情参数_型号表",
  "06_详情正文",
  "07_FAQ",
  "09_资料路径映射",
];

function cleanCell(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\r\n/g, "\n").trim();
}

function hasAnyValue(row) {
  return Object.values(row).some((value) => cleanCell(value));
}

function toVisible(value) {
  const text = cleanCell(value).toLowerCase();
  return ["yes", "true", "1", "y", "显示", "是", "上线", "active"].includes(text);
}

function isBlankOrDash(value) {
  const text = cleanCell(value);
  return !text || ["—", "-", "–", "n/a", "N/A", "NA", "无"].includes(text);
}

function normalizePath(value) {
  return cleanCell(value).replace(/\\/g, "/").replace(/^\/+/, "");
}

function escapeTsText(value) {
  return cleanCell(value);
}

function findExcelFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (
        entry.isFile() &&
        entry.name.endsWith(".xlsx") &&
        !entry.name.startsWith("~$")
      ) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

function findWorkbookPath() {
  const argPath = process.argv[2];
  if (argPath) {
    const fullPath = path.isAbsolute(argPath) ? argPath : path.join(root, argPath);
    if (!fs.existsSync(fullPath)) {
      console.error("指定的 Excel 文件不存在：", fullPath);
      process.exit(1);
    }
    return fullPath;
  }

  const sourceRoot = path.join(root, "data-source", "product-center");
  const files = findExcelFiles(sourceRoot);
  const candidates = [];

  for (const file of files) {
    try {
      const wb = xlsx.readFile(file, { bookSheets: true });
      const hasAllSheets = REQUIRED_SHEETS.every((sheet) =>
        wb.SheetNames.includes(sheet)
      );
      if (hasAllSheets) {
        candidates.push(file);
      }
    } catch (error) {
      console.warn("跳过无法读取的 Excel：", file, error.message);
    }
  }

  if (candidates.length === 0) {
    console.error("没有找到包含 03/05/06/07/09 的柱塞泵详情页 Excel。");
    console.error("请把表格放入 data-source/product-center 下，例如：");
    console.error("data-source/product-center/pumps/plunger-pumps/FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx");
    process.exit(1);
  }

  candidates.sort((a, b) => {
    const score = (file) => {
      const name = path.basename(file);
      let value = 0;
      if (name.includes("私有资料映射")) value += 20;
      if (name.includes("v4")) value += 10;
      if (name.includes("柱塞泵官网表格维护版")) value += 5;
      value += fs.statSync(file).mtimeMs / 100000000000;
      return value;
    };
    return score(b) - score(a);
  });

  return candidates[0];
}

function sheetRows(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`找不到 Sheet：${sheetName}`);
  }
  return xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: false,
  });
}

function findHeaderIndex(rows, requiredHeaders) {
  const normalizedRequired = requiredHeaders.map(cleanCell);
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i].map(cleanCell);
    const ok = normalizedRequired.every((header) => row.includes(header));
    if (ok) return i;
  }
  throw new Error(`找不到表头：${requiredHeaders.join(" / ")}`);
}

function readTable(workbook, sheetName, requiredHeaders) {
  const rows = sheetRows(workbook, sheetName);
  const headerIndex = findHeaderIndex(rows, requiredHeaders);
  const headers = rows[headerIndex].map(cleanCell);

  return rows
    .slice(headerIndex + 1)
    .map((row) => {
      const next = {};
      headers.forEach((header, index) => {
        if (!header) return;
        next[header] = cleanCell(row[index]);
      });
      return next;
    })
    .filter(hasAnyValue);
}

function toMap(rows, keyName) {
  const map = new Map();
  rows.forEach((row) => {
    const key = cleanCell(row[keyName]);
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, row);
    }
  });
  return map;
}

function buildSpecifications(row) {
  if (!row) return [];

  const hiddenColumns = new Set([
    "排序",
    "页面型号",
    "前台备注",
    "维护备注",
    "正文维护备注",
  ]);

  return Object.entries(row)
    .filter(([label, value]) => !hiddenColumns.has(label) && !isBlankOrDash(value))
    .map(([label, value]) => ({
      label: escapeTsText(label),
      value: escapeTsText(value),
    }));
}

function buildFaqs(faqRows, seriesCode) {
  const commonScopes = new Set(["通用", "common", "COMMON", "all", "ALL"]);

  return faqRows
    .filter((row) => toVisible(row["前台显示"]))
    .filter((row) => {
      const scope = cleanCell(row["适用范围"]);
      return commonScopes.has(scope) || scope === seriesCode;
    })
    .sort((a, b) => Number(a["排序"] || 9999) - Number(b["排序"] || 9999))
    .map((row) => ({
      question: escapeTsText(row["问题"]),
      answer: escapeTsText(row["回答"]),
    }))
    .filter((item) => item.question && item.answer);
}

function checkPrivateAsset(relativePath) {
  const clean = normalizePath(relativePath);
  if (!clean) {
    return { relativePath: "", exists: false };
  }

  const fullPath = path.join(root, clean);
  return {
    relativePath: clean,
    exists: fs.existsSync(fullPath),
  };
}

function writeTypes() {
  const content = `/* =========================================================
   plunger-pump-detail.types.ts
   柱塞泵详情页数据类型

   本文件由 scripts/products/build-plunger-pump-detail-data.js 生成。
   如需修改字段结构，请先修改生成脚本。
========================================================= */

export type PlungerPumpSeriesCode = "EA" | "SM" | "TM";

export type PlungerPumpSpecification = {
  label: string;
  value: string;
};

export type PlungerPumpFaq = {
  question: string;
  answer: string;
};

export type PlungerPumpResourceButtons = {
  drawing2d: {
    zh: string;
    en: string;
  };
  model3d: {
    zh: string;
    en: string;
  };
};

export type PlungerPumpResources = {
  drawing2dRequestOnly: boolean;
  model3dRequestOnly: boolean;
  buttons: PlungerPumpResourceButtons;
};

export type PlungerPumpDetail = {
  model: string;
  slug: string;
  title: string;
  categoryCode: string;
  categoryName: string;
  productTypeCode: string;
  productTypeName: string;
  seriesCode: PlungerPumpSeriesCode;
  seriesName: string;
  capacity: string;
  pumpHeadMaterialCode: string;
  pumpHeadMaterial: string;
  description: string;
  specifications: PlungerPumpSpecification[];
  faqs: PlungerPumpFaq[];
  resources: PlungerPumpResources;
};
`;

  fs.writeFileSync(typesPath, content, "utf8");
}

function main() {
  const workbookPath = findWorkbookPath();
  const workbook = xlsx.readFile(workbookPath);

  const missingSheets = REQUIRED_SHEETS.filter((sheet) => !workbook.SheetNames.includes(sheet));
  if (missingSheets.length > 0) {
    console.error("Excel 缺少必要 Sheet：", missingSheets.join("、"));
    process.exit(1);
  }

  const indexRows = readTable(workbook, "03_型号索引", ["页面型号", "URL Slug", "系列代码"]);
  const specRows = readTable(workbook, "05_详情参数_型号表", ["页面型号", "标称容量"]);
  const descriptionRows = readTable(workbook, "06_详情正文", ["页面型号", "详情页正文"]);
  const faqRows = readTable(workbook, "07_FAQ", ["适用范围", "问题", "回答"]);
  const assetRows = readTable(workbook, "09_资料路径映射", ["页面型号", "URL Slug", "2D内部相对路径", "3D内部相对路径"]);

  const specMap = toMap(specRows, "页面型号");
  const descriptionMap = toMap(descriptionRows, "页面型号");
  const assetMap = toMap(assetRows, "页面型号");

  const details = [];
  const warnings = [];
  const assetChecks = [];

  const visibleIndexRows = indexRows
    .filter((row) => toVisible(row["前台显示"]))
    .sort((a, b) => Number(a["排序"] || 9999) - Number(b["排序"] || 9999));

  for (const indexRow of visibleIndexRows) {
    const model = cleanCell(indexRow["页面型号"]);
    if (!model) continue;

    const specRow = specMap.get(model);
    const descriptionRow = descriptionMap.get(model);
    const assetRow = assetMap.get(model) || {};

    if (!specRow) warnings.push(`${model} 缺少 05_详情参数_型号表 数据`);
    if (!descriptionRow) warnings.push(`${model} 缺少 06_详情正文 数据`);
    if (!assetMap.has(model)) warnings.push(`${model} 缺少 09_资料路径映射 数据`);

    const asset2d = checkPrivateAsset(assetRow["2D内部相对路径"]);
    const asset3d = checkPrivateAsset(assetRow["3D内部相对路径"]);

    assetChecks.push({
      model,
      drawing2d: asset2d,
      model3d: asset3d,
    });

    if (assetRow["2D内部相对路径"] && !asset2d.exists) {
      warnings.push(`${model} 2D 私有文件不存在：${asset2d.relativePath}`);
    }

    if (assetRow["3D内部相对路径"] && !asset3d.exists) {
      warnings.push(`${model} 3D 私有文件不存在：${asset3d.relativePath}`);
    }

    const seriesCode = cleanCell(indexRow["系列代码"] || assetRow["系列代码"]);
    const seriesName = cleanCell(indexRow["系列名称"] || assetRow["系列名称"]);

    details.push({
      model,
      slug: cleanCell(indexRow["URL Slug"] || assetRow["URL Slug"]),
      title: cleanCell(indexRow["页面标题"] || model),
      categoryCode: cleanCell(assetRow["产品大类代码"] || "pumps"),
      categoryName: cleanCell(assetRow["产品大类名称"] || "泵类 / Pumps"),
      productTypeCode: cleanCell(assetRow["产品类型代码"] || "plunger-pumps"),
      productTypeName: cleanCell(assetRow["产品类型名称"] || "柱塞泵 / Plunger Pumps"),
      seriesCode,
      seriesName,
      capacity: cleanCell(specRow?.["标称容量"] || `${indexRow["标称容量_μL"]} μL`),
      pumpHeadMaterialCode: cleanCell(indexRow["当前展示泵头材质代码"] || assetRow["当前展示泵头材质代码"]),
      pumpHeadMaterial: cleanCell(specRow?.["当前展示泵头材质"] || indexRow["当前展示泵头材质"]),
      description: cleanCell(descriptionRow?.["详情页正文"]),
      specifications: buildSpecifications(specRow),
      faqs: buildFaqs(faqRows, seriesCode),
      resources: {
        drawing2dRequestOnly: true,
        model3dRequestOnly: true,
        buttons: {
          drawing2d: {
            zh: "申请 2D 图纸",
            en: "Request 2D Drawing",
          },
          model3d: {
            zh: "申请 3D 模型",
            en: "Request 3D Model",
          },
        },
      },
    });
  }

  const slugSet = new Set();
  const duplicateSlugs = [];
  details.forEach((detail) => {
    if (!detail.slug) warnings.push(`${detail.model} 缺少 slug`);
    if (slugSet.has(detail.slug)) duplicateSlugs.push(detail.slug);
    slugSet.add(detail.slug);
  });

  duplicateSlugs.forEach((slug) => warnings.push(`重复 slug：${slug}`));

  fs.mkdirSync(outputDir, { recursive: true });
  writeTypes();

  const generatedContent = `/* =========================================================
   plunger-pump-detail.generated.ts
   柱塞泵详情页自动生成数据

   来源：${path.relative(root, workbookPath).replace(/\\/g, "/")}

   说明：
   1. 不要手动修改本文件
   2. 详情页正文来自 06_详情正文
   3. 技术参数表来自 05_详情参数_型号表
   4. FAQ 来自 07_FAQ，规则为“通用 + 当前系列”
   5. 2D / 3D 私有路径只用于脚本校验，不写入前端数据
========================================================= */

import type { PlungerPumpDetail } from "./plunger-pump-detail.types";

export const plungerPumpDetails: PlungerPumpDetail[] = ${JSON.stringify(details, null, 2)};

export const plungerPumpDetailBySlug: Record<string, PlungerPumpDetail> = Object.fromEntries(
  plungerPumpDetails.map((detail) => [detail.slug, detail]),
);

export function getPlungerPumpDetailBySlug(
  slug: string,
): PlungerPumpDetail | undefined {
  return plungerPumpDetailBySlug[slug];
}

export function getPlungerPumpDetailByModel(
  model: string,
): PlungerPumpDetail | undefined {
  return plungerPumpDetails.find((detail) => detail.model === model);
}
`;

  fs.writeFileSync(generatedPath, generatedContent, "utf8");

  const summary = {
    sourceWorkbook: path.relative(root, workbookPath).replace(/\\/g, "/"),
    generatedAt: new Date().toISOString(),
    details: details.length,
    series: Array.from(new Set(details.map((detail) => detail.seriesCode))).sort(),
    warnings,
    assetChecks,
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");

  console.log("");
  console.log("柱塞泵详情页数据生成完成：");
  console.log("- Excel：", path.relative(root, workbookPath).replace(/\\/g, "/"));
  console.log("- 型号数量：", details.length);
  console.log("- 已生成：data/products/detail/plunger-pump-detail.types.ts");
  console.log("- 已生成：data/products/detail/plunger-pump-detail.generated.ts");
  console.log("- 已生成：data/products/detail/plunger-pump-detail.summary.json");

  if (warnings.length > 0) {
    console.log("");
    console.log("提示 / 待确认：");
    warnings.forEach((warning) => console.log("- " + warning));
  }
}

main();
'@

Set-Content -LiteralPath "scripts\products\build-plunger-pump-detail-data.js" -Value $BuildScript -Encoding UTF8
Write-Host "已写入：scripts\products\build-plunger-pump-detail-data.js"

# =========================================================
# 3. 更新 package.json 命令
# =========================================================
Write-Host "`n[3/5] 更新 package.json 命令..." -ForegroundColor Cyan

$PackageJsonPath = "package.json"
$PackageJson = Get-Content -LiteralPath $PackageJsonPath -Raw | ConvertFrom-Json

if (-not $PackageJson.scripts) {
  $PackageJson | Add-Member -MemberType NoteProperty -Name scripts -Value ([PSCustomObject]@{})
}

$commandName = "products:build-plunger-detail"
$commandValue = "node ./scripts/products/build-plunger-pump-detail-data.js"

if ($PackageJson.scripts.PSObject.Properties.Name -contains $commandName) {
  $PackageJson.scripts.$commandName = $commandValue
  Write-Host "已更新 package.json 脚本：$commandName"
} else {
  $PackageJson.scripts | Add-Member -MemberType NoteProperty -Name $commandName -Value $commandValue
  Write-Host "已新增 package.json 脚本：$commandName"
}

$PackageJson | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $PackageJsonPath -Encoding UTF8

# =========================================================
# 4. 检查 Excel 是否已放入 data-source/product-center
# =========================================================
Write-Host "`n[4/5] 检查数据源 Excel..." -ForegroundColor Cyan

$xlsxFiles = Get-ChildItem -Path "data-source\product-center" -Recurse -File -Filter "*.xlsx" -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -notlike "~$*" }

if (-not $xlsxFiles -or $xlsxFiles.Count -eq 0) {
  Write-Host "没有在 data-source\product-center 下找到 Excel。" -ForegroundColor Red
  Write-Host "请先把表格放到类似路径：" -ForegroundColor Yellow
  Write-Host "data-source\product-center\pumps\plunger-pumps\FOREACH_柱塞泵官网表格维护版_v4_私有资料映射校正版.xlsx" -ForegroundColor Yellow
  exit 1
}

Write-Host "已找到 Excel 文件："
$xlsxFiles | ForEach-Object { Write-Host "- $($_.FullName)" }

# =========================================================
# 5. 执行生成脚本与 build
# =========================================================
Write-Host "`n[5/5] 执行详情页数据生成脚本..." -ForegroundColor Cyan

npm run products:build-plunger-detail

if ($LASTEXITCODE -ne 0) {
  Write-Host "详情页数据生成失败，请根据上面的错误信息处理。" -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "`n开始执行 npm run build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
  Write-Host "npm run build 未通过，请根据上面的错误信息处理。" -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "`n全部完成：柱塞泵详情页数据已生成，build 已通过。" -ForegroundColor Green
