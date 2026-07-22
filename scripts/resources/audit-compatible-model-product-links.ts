import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  fittingCompatibleModelProducts,
  type FittingCompatibleModelProduct,
} from "@/data/resources/fitting-replacement/compatible-models.generated";

type Candidate = {
  sourceFile: string;
  productCode: string;
  model: string;
  detailHref: string;
  imagePath: string;
};

const ROOT = process.cwd();

const SEARCH_DIRS = [
  path.join(ROOT, "data", "products", "selection"),
  path.join(ROOT, "data", "products", "detail"),
  path.join(ROOT, "data", "products", "generated", "fittings"),
];

const REPORT_PATH = path.join(
  ROOT,
  "docs",
  "resources",
  "compatible-model-product-link-audit.md"
);

function text(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[‐‑‒–—―﹘﹣－]/g, "-")
    .replace(/\s+/g, "");
}

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return getFiles(fullPath);

    if (
      entry.isFile() &&
      (
        entry.name.endsWith(".ts") ||
        entry.name.endsWith(".json")
      ) &&
      !entry.name.includes(".bak")
    ) {
      return [fullPath];
    }

    return [];
  });
}

function firstText(
  object: Record<string, unknown>,
  keys: string[]
): string {
  for (const key of keys) {
    const value = text(object[key]);
    if (value) return value;
  }

  return "";
}

function collectCandidates(
  value: unknown,
  sourceFile: string,
  candidates: Candidate[],
  seen: WeakSet<object>
) {
  if (!value || typeof value !== "object") return;

  const objectValue = value as object;
  if (seen.has(objectValue)) return;
  seen.add(objectValue);

  if (Array.isArray(value)) {
    for (const item of value) {
      collectCandidates(item, sourceFile, candidates, seen);
    }
    return;
  }

  const object = value as Record<string, unknown>;

  const productCode = firstText(object, [
    "productCode",
    "goodsCode",
    "sku",
    "code",
  ]);

  const model = firstText(object, [
    "foreachModel",
    "model",
    "modelNumber",
    "title",
  ]);

  const detailHref = firstText(object, [
    "detailHref",
    "href",
    "detailUrl",
    "url",
  ]);

  const imagePath = firstText(object, [
    "imagePath",
    "imageSrc",
    "image",
    "coverImage",
    "mainImage",
  ]);

  if ((productCode || model) && (detailHref || imagePath)) {
    candidates.push({
      sourceFile,
      productCode,
      model,
      detailHref,
      imagePath,
    });
  }

  for (const child of Object.values(object)) {
    collectCandidates(child, sourceFile, candidates, seen);
  }
}

async function loadCandidates(): Promise<{
  candidates: Candidate[];
  importErrors: string[];
}> {
  const files = SEARCH_DIRS.flatMap(getFiles);
  const candidates: Candidate[] = [];
  const importErrors: string[] = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");

    try {
      if (file.endsWith(".json")) {
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        collectCandidates(parsed, relative, candidates, new WeakSet());
        continue;
      }

      const module = await import(
        `${pathToFileURL(file).href}?audit=${Date.now()}-${Math.random()}`
      );

      collectCandidates(module, relative, candidates, new WeakSet());
    } catch (error) {
      importErrors.push(
        `${relative}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return { candidates, importErrors };
}

function findBestCandidates(
  product: FittingCompatibleModelProduct,
  candidates: Candidate[]
) {
  const code = normalize(product.productCode);
  const model = normalize(product.foreachModel);

  const codeMatches = candidates.filter((candidate) => {
    return candidate.productCode && normalize(candidate.productCode) === code;
  });

  if (codeMatches.length > 0) return codeMatches;

  return candidates.filter((candidate) => {
    return candidate.model && normalize(candidate.model) === model;
  });
}

function uniqueCandidates(candidates: Candidate[]): Candidate[] {
  const map = new Map<string, Candidate>();

  for (const candidate of candidates) {
    const key = [
      candidate.productCode,
      candidate.model,
      candidate.detailHref,
      candidate.imagePath,
    ].join("::");

    if (!map.has(key)) map.set(key, candidate);
  }

  return [...map.values()];
}

async function main() {
  const { candidates, importErrors } = await loadCandidates();

  const rows = fittingCompatibleModelProducts.map((product) => {
    const matches = uniqueCandidates(findBestCandidates(product, candidates));

    const detailMatches = matches.filter((item) => item.detailHref);
    const imageMatches = matches.filter((item) => item.imagePath);

    return {
      product,
      matches,
      detailHref: detailMatches[0]?.detailHref ?? "",
      imagePath: imageMatches[0]?.imagePath ?? "",
    };
  });

  const fullyMatched = rows.filter(
    (row) => row.detailHref && row.imagePath
  );

  const missingDetail = rows.filter((row) => !row.detailHref);
  const missingImage = rows.filter((row) => !row.imagePath);

  const ambiguous = rows.filter((row) => {
    const hrefs = new Set(
      row.matches.map((item) => item.detailHref).filter(Boolean)
    );

    return hrefs.size > 1;
  });

  const lines: string[] = [
    "# 兼容型号与正式产品关联审计",
    "",
    `- 兼容型号产品数：${rows.length}`,
    `- 同时找到详情页和图片：${fullyMatched.length}`,
    `- 缺少详情页路径：${missingDetail.length}`,
    `- 缺少产品图片：${missingImage.length}`,
    `- 匹配到多个详情路径：${ambiguous.length}`,
    `- 数据模块读取失败：${importErrors.length}`,
    "",
    "## 缺少详情页路径",
    "",
  ];

  if (missingDetail.length === 0) {
    lines.push("未发现。", "");
  } else {
    lines.push("| 商品编码 | FOREACH 型号 | 分类 | 系列 |", "|---|---|---|---|");
    for (const row of missingDetail) {
      lines.push(
        `| ${row.product.productCode} | ${row.product.foreachModel} | ${row.product.productType} | ${row.product.productSeries} |`
      );
    }
    lines.push("");
  }

  lines.push("## 缺少产品图片", "");

  if (missingImage.length === 0) {
    lines.push("未发现。", "");
  } else {
    lines.push("| 商品编码 | FOREACH 型号 | 分类 | 系列 |", "|---|---|---|---|");
    for (const row of missingImage) {
      lines.push(
        `| ${row.product.productCode} | ${row.product.foreachModel} | ${row.product.productType} | ${row.product.productSeries} |`
      );
    }
    lines.push("");
  }

  lines.push("## 多详情路径冲突", "");

  if (ambiguous.length === 0) {
    lines.push("未发现。", "");
  } else {
    for (const row of ambiguous) {
      lines.push(`### ${row.product.foreachModel} / ${row.product.productCode}`, "");
      for (const match of row.matches) {
        if (match.detailHref) {
          lines.push(`- ${match.detailHref}（${match.sourceFile}）`);
        }
      }
      lines.push("");
    }
  }

  lines.push("## 数据模块读取失败", "");

  if (importErrors.length === 0) {
    lines.push("未发现。", "");
  } else {
    for (const error of importErrors) lines.push(`- ${error}`);
    lines.push("");
  }

  fs.writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");

  console.log("============================================");
  console.log("正式产品关联检查完成");
  console.log(`兼容型号产品：${rows.length}`);
  console.log(`详情页和图片齐全：${fullyMatched.length}`);
  console.log(`缺少详情页：${missingDetail.length}`);
  console.log(`缺少图片：${missingImage.length}`);
  console.log(`多详情路径：${ambiguous.length}`);
  console.log(`模块读取失败：${importErrors.length}`);
  console.log(`报告：${REPORT_PATH}`);
  console.log("============================================");
}

main();
