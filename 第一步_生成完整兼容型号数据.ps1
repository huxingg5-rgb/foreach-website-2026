$ErrorActionPreference = "Stop"

$root = (Get-Location).Path
if (-not (Test-Path (Join-Path $root "package.json"))) {
    throw "请先进入项目根目录：F:\WebsiteProjects\foreach-website-2026"
}

$pattern = "FRGD-140D-2606-0002_001_cn_连接件标品在售清单*.xlsx"
$searchRoots = @(
    $root,
    (Join-Path $env:USERPROFILE "Desktop"),
    (Join-Path $env:USERPROFILE "Downloads")
) | Where-Object { Test-Path $_ }

$excel = $searchRoots |
    ForEach-Object {
        Get-ChildItem -Path $_ -Recurse -File -Filter $pattern -ErrorAction SilentlyContinue
    } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

if (-not $excel) {
    throw "未找到在售清单 Excel。请把文件放到项目目录、桌面或下载目录后重新运行。"
}

$sourceDir = Join-Path $root "data-source\resources\fitting-replacement"
$scriptDir = Join-Path $root "scripts\resources"
$dataDir = Join-Path $root "data\resources\fitting-replacement"
$docsDir = Join-Path $root "docs\resources"

New-Item -ItemType Directory -Force -Path $sourceDir, $scriptDir, $dataDir, $docsDir | Out-Null

$sourceExcel = Join-Path $sourceDir "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
Copy-Item $excel.FullName $sourceExcel -Force

$converterPath = Join-Path $scriptDir "convert-fitting-compatible-models.ts"

$converter = @'
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

type Cell = string | number | boolean | null | undefined;
type SourceItem = {
  brand: string;
  model: string;
  normalizedModel: string;
  sheet: string;
  row: number;
};

type ProductRecord = {
  productType: string;
  productSeries: string;
  productName: string;
  foreachModel: string;
  productCode: string;
  compatibleModels: string[];
  compatibleSources: SourceItem[];
  hasDrawing2d: boolean;
  hasModel3d: boolean;
  sourceSheet: string;
  sourceRow: number;
};

const ROOT = process.cwd();

const SOURCE = path.join(
  ROOT,
  "data-source",
  "resources",
  "fitting-replacement",
  "FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx"
);

const OUTPUT_TS = path.join(
  ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "compatible-models.generated.ts"
);

const OUTPUT_JSON = path.join(
  ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "compatible-models.audit.json"
);

const OUTPUT_REPORT = path.join(
  ROOT,
  "docs",
  "resources",
  "fitting-compatible-models-audit.md"
);

function text(value: Cell): string {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\u00a0/g, " ").trim();
}

function normalizeModel(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function isEmptyCompatibleValue(value: string): boolean {
  const normalized = value.trim().toUpperCase();
  return (
    !normalized ||
    normalized === "/" ||
    normalized === "-" ||
    normalized === "—" ||
    normalized === "×" ||
    normalized === "√" ||
    normalized === "无" ||
    normalized === "N/A" ||
    normalized === "NA" ||
    normalized === "NONE"
  );
}

function splitCompatibleModels(rawValue: string): string[] {
  if (isEmptyCompatibleValue(rawValue)) return [];

  const firstPass = rawValue
    .replace(/\r/g, "\n")
    .split(/[\n,，;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const expanded: string[] = [];

  for (const item of firstPass) {
    const shouldSplitSlash =
      item.includes("/") &&
      !/^\d+\/\d+(?:[-A-Z0-9]*)?$/i.test(item);

    if (shouldSplitSlash) {
      expanded.push(
        ...item
          .split("/")
          .map((part) => part.trim())
          .filter(Boolean)
      );
    } else {
      expanded.push(item);
    }
  }

  const unique = new Map<string, string>();

  for (const item of expanded) {
    if (isEmptyCompatibleValue(item)) continue;
    const normalized = normalizeModel(item);
    if (!normalized) continue;
    if (!unique.has(normalized)) unique.set(normalized, item);
  }

  return [...unique.values()];
}

function findHeaderIndex(headers: Cell[], name: string): number {
  return headers.findIndex((cell) => text(cell).includes(name));
}

function extractForeachModel(rawName: string, productCode: string): string {
  let value = text(rawName);

  if (productCode) {
    value = value.replace(
      new RegExp(`\\s*${productCode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`),
      ""
    );
  }

  const tokens = value.split(/\s+/).filter(Boolean);
  const modelToken = [...tokens]
    .reverse()
    .find((token) => /[A-Z]/i.test(token) && /[-_]/.test(token));

  return modelToken ?? value;
}

function yesMark(value: Cell): boolean {
  const normalized = text(value).toUpperCase();
  return normalized === "√" || normalized === "是" || normalized === "YES";
}

function readProducts(): ProductRecord[] {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`找不到数据源：${SOURCE}`);
  }

  const workbook = XLSX.readFile(SOURCE, { cellDates: false });
  const productMap = new Map<string, ProductRecord>();

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Cell[]>(sheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    if (rows.length < 3) continue;

    const header1 = rows[0] ?? [];
    const header2 = rows[1] ?? [];

    const typeIndex = findHeaderIndex(header1, "产品类型");
    const seriesIndex = findHeaderIndex(header1, "产品系列");
    const modelIndex = findHeaderIndex(header1, "恒永达型号");
    const codeIndex = findHeaderIndex(header1, "商品编码");
    const compatibleStart = findHeaderIndex(header1, "竞品型号");
    const drawing2dIndex = findHeaderIndex(header1, "2D图编码");
    const model3dIndex = findHeaderIndex(header1, "3D图编码");

    if (
      modelIndex < 0 ||
      codeIndex < 0 ||
      compatibleStart < 0 ||
      drawing2dIndex < 0
    ) {
      continue;
    }

    const compatibleEnd = drawing2dIndex;

    for (let rowIndex = 2; rowIndex < rows.length; rowIndex += 1) {
      const row = rows[rowIndex] ?? [];
      const productCode = text(row[codeIndex]);
      const productName = text(row[modelIndex]);

      if (!productCode || !productName) continue;

      const sources: SourceItem[] = [];

      for (let column = compatibleStart; column < compatibleEnd; column += 1) {
        const rawValue = text(row[column]);
        const models = splitCompatibleModels(rawValue);
        const brand = text(header2[column]) || `来源${column - compatibleStart + 1}`;

        for (const model of models) {
          sources.push({
            brand,
            model,
            normalizedModel: normalizeModel(model),
            sheet: sheetName,
            row: rowIndex + 1,
          });
        }
      }

      if (sources.length === 0) continue;

      const foreachModel = extractForeachModel(productName, productCode);
      const key = `${productCode}::${foreachModel}`;

      const existing = productMap.get(key);

      if (existing) {
        const sourceKeySet = new Set(
          existing.compatibleSources.map(
            (item) => `${item.brand}::${item.normalizedModel}`
          )
        );

        for (const source of sources) {
          const sourceKey = `${source.brand}::${source.normalizedModel}`;
          if (!sourceKeySet.has(sourceKey)) {
            existing.compatibleSources.push(source);
            sourceKeySet.add(sourceKey);
          }
        }

        existing.compatibleModels = [
          ...new Map(
            existing.compatibleSources.map((item) => [
              item.normalizedModel,
              item.model,
            ])
          ).values(),
        ];

        continue;
      }

      productMap.set(key, {
        productType: typeIndex >= 0 ? text(row[typeIndex]) : "",
        productSeries: seriesIndex >= 0 ? text(row[seriesIndex]) : "",
        productName,
        foreachModel,
        productCode,
        compatibleModels: [
          ...new Map(
            sources.map((item) => [item.normalizedModel, item.model])
          ).values(),
        ],
        compatibleSources: sources,
        hasDrawing2d: drawing2dIndex >= 0 ? yesMark(row[drawing2dIndex]) : false,
        hasModel3d: model3dIndex >= 0 ? yesMark(row[model3dIndex]) : false,
        sourceSheet: sheetName,
        sourceRow: rowIndex + 1,
      });
    }
  }

  return [...productMap.values()].sort((a, b) => {
    return (
      a.productType.localeCompare(b.productType, "zh-CN") ||
      a.productSeries.localeCompare(b.productSeries, "zh-CN") ||
      a.foreachModel.localeCompare(b.foreachModel, "en")
    );
  });
}

function buildAudit(products: ProductRecord[]) {
  const modelMap = new Map<
    string,
    {
      displayModels: Set<string>;
      mappings: Map<string, {
        productCode: string;
        foreachModel: string;
        productType: string;
        productSeries: string;
      }>;
      brands: Set<string>;
    }
  >();

  for (const product of products) {
    for (const source of product.compatibleSources) {
      const item =
        modelMap.get(source.normalizedModel) ??
        {
          displayModels: new Set<string>(),
          mappings: new Map(),
          brands: new Set<string>(),
        };

      item.displayModels.add(source.model);
      item.brands.add(source.brand);
      item.mappings.set(`${product.productCode}::${product.foreachModel}`, {
        productCode: product.productCode,
        foreachModel: product.foreachModel,
        productType: product.productType,
        productSeries: product.productSeries,
      });

      modelMap.set(source.normalizedModel, item);
    }
  }

  const duplicateMappings = [...modelMap.entries()]
    .filter(([, item]) => item.mappings.size > 1)
    .map(([normalizedModel, item]) => ({
      normalizedModel,
      displayModels: [...item.displayModels],
      brands: [...item.brands],
      products: [...item.mappings.values()],
    }))
    .sort((a, b) => a.normalizedModel.localeCompare(b.normalizedModel, "en"));

  const bySheet = Object.entries(
    products.reduce<Record<string, number>>((result, product) => {
      result[product.sourceSheet] = (result[product.sourceSheet] ?? 0) + 1;
      return result;
    }, {})
  ).sort(([a], [b]) => a.localeCompare(b, "zh-CN"));

  const bySeries = Object.entries(
    products.reduce<Record<string, number>>((result, product) => {
      const key = `${product.productType} / ${product.productSeries}`;
      result[key] = (result[key] ?? 0) + 1;
      return result;
    }, {})
  ).sort(([a], [b]) => a.localeCompare(b, "zh-CN"));

  const totalRelations = products.reduce(
    (sum, product) => sum + product.compatibleSources.length,
    0
  );

  return {
    generatedAt: new Date().toISOString(),
    productCount: products.length,
    uniqueCompatibleModelCount: modelMap.size,
    relationCount: totalRelations,
    duplicateMappingCount: duplicateMappings.length,
    bySheet,
    bySeries,
    duplicateMappings,
  };
}

function buildTs(products: ProductRecord[]): string {
  return `/* =========================================================
   compatible-models.generated.ts
   恒永达官网｜接头兼容型号完整数据

   自动生成，请勿手动修改。
   数据源：
   data-source/resources/fitting-replacement/
   FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx
========================================================= */

export interface FittingCompatibleModelSource {
  brand: string;
  model: string;
  normalizedModel: string;
  sheet: string;
  row: number;
}

export interface FittingCompatibleModelProduct {
  productType: string;
  productSeries: string;
  productName: string;
  foreachModel: string;
  productCode: string;
  compatibleModels: string[];
  compatibleSources: FittingCompatibleModelSource[];
  hasDrawing2d: boolean;
  hasModel3d: boolean;
  sourceSheet: string;
  sourceRow: number;
}

export const fittingCompatibleModelProducts: FittingCompatibleModelProduct[] =
${JSON.stringify(products, null, 2)};
`;
}

function buildReport(
  products: ProductRecord[],
  audit: ReturnType<typeof buildAudit>
): string {
  const lines: string[] = [
    "# 接头兼容型号数据审计",
    "",
    `- 生成时间：${audit.generatedAt}`,
    `- 有兼容型号的 FOREACH 产品：${audit.productCount}`,
    `- 不重复兼容型号：${audit.uniqueCompatibleModelCount}`,
    `- 型号对应关系：${audit.relationCount}`,
    `- 一对多兼容型号：${audit.duplicateMappingCount}`,
    "",
    "## 按工作表统计",
    "",
    "| 工作表 | 产品数 |",
    "|---|---:|",
    ...audit.bySheet.map(([name, count]) => `| ${name} | ${count} |`),
    "",
    "## 按分类和系列统计",
    "",
    "| 分类 / 系列 | 产品数 |",
    "|---|---:|",
    ...audit.bySeries.map(([name, count]) => `| ${name} | ${count} |`),
    "",
    "## 一对多兼容型号",
    "",
  ];

  if (audit.duplicateMappings.length === 0) {
    lines.push("未发现。");
  } else {
    for (const item of audit.duplicateMappings) {
      lines.push(`### ${item.displayModels.join(" / ")}`);
      lines.push("");
      for (const product of item.products) {
        lines.push(
          `- ${product.foreachModel}（${product.productCode}，${product.productType} / ${product.productSeries}）`
        );
      }
      lines.push("");
    }
  }

  lines.push(
    "## 说明",
    "",
    "- 品牌名称仅保留在内部数据中，用于核对来源，前台不显示。",
    "- 前台统一使用“兼容型号”，不使用“竞品”相关表述。",
    "- 本步骤只生成数据，没有修改现有页面、样式、详情页或加入清单逻辑。",
    ""
  );

  return lines.join("\n");
}

function main() {
  const products = readProducts();
  const audit = buildAudit(products);

  fs.mkdirSync(path.dirname(OUTPUT_TS), { recursive: true });
  fs.mkdirSync(path.dirname(OUTPUT_REPORT), { recursive: true });

  fs.writeFileSync(OUTPUT_TS, buildTs(products), "utf8");
  fs.writeFileSync(
    OUTPUT_JSON,
    JSON.stringify({ audit, products }, null, 2),
    "utf8"
  );
  fs.writeFileSync(OUTPUT_REPORT, buildReport(products, audit), "utf8");

  console.log("============================================");
  console.log("兼容型号数据生成完成");
  console.log(`FOREACH 产品：${audit.productCount}`);
  console.log(`不重复兼容型号：${audit.uniqueCompatibleModelCount}`);
  console.log(`型号对应关系：${audit.relationCount}`);
  console.log(`一对多兼容型号：${audit.duplicateMappingCount}`);
  console.log(`数据文件：${OUTPUT_TS}`);
  console.log(`审计报告：${OUTPUT_REPORT}`);
  console.log("============================================");
}

main();
'@

Set-Content -Path $converterPath -Value $converter -Encoding utf8

Write-Host ""
Write-Host "使用 Excel：" -ForegroundColor Cyan
Write-Host $excel.FullName
Write-Host ""
Write-Host "正在生成完整兼容型号数据……" -ForegroundColor Cyan

npx tsx scripts/resources/convert-fitting-compatible-models.ts

Write-Host ""
Write-Host "本步骤没有修改现有页面。" -ForegroundColor Green
Write-Host "请把上面的统计结果发给我。" -ForegroundColor Yellow
Write-Host ""
git status --short
