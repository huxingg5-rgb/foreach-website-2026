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

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "all-compatible-products.generated.ts"
);

const PLACEHOLDER_IMAGE =
  "/images/resources/selection-support/fitting-replacement/compatible-model-placeholder.svg";

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
      (entry.name.endsWith(".ts") || entry.name.endsWith(".json")) &&
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

async function loadCandidates(): Promise<Candidate[]> {
  const files = SEARCH_DIRS.flatMap(getFiles);
  const candidates: Candidate[] = [];

  for (const file of files) {
    const relative = path.relative(ROOT, file).replace(/\\/g, "/");

    try {
      if (file.endsWith(".json")) {
        const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
        collectCandidates(parsed, relative, candidates, new WeakSet());
        continue;
      }

      const module = await import(
        `${pathToFileURL(file).href}?build=${Date.now()}-${Math.random()}`
      );

      collectCandidates(module, relative, candidates, new WeakSet());
    } catch {
      // 单个辅助数据文件无法导入时跳过，不中断正式数据生成。
    }
  }

  return candidates;
}

function findCandidates(
  product: FittingCompatibleModelProduct,
  candidates: Candidate[]
): Candidate[] {
  const productCode = normalize(product.productCode);
  const foreachModel = normalize(product.foreachModel);

  const codeMatches = candidates.filter((candidate) => {
    return (
      candidate.productCode &&
      normalize(candidate.productCode) === productCode
    );
  });

  if (codeMatches.length > 0) return codeMatches;

  return candidates.filter((candidate) => {
    return candidate.model && normalize(candidate.model) === foreachModel;
  });
}

function detailHrefScore(href: string): number {
  if (!href) return -1;
  if (!href.startsWith("/products/")) return 0;
  if (href.includes("#")) return 20;

  const segments = href.split("/").filter(Boolean);

  /*
    正式详情页通常为：
    /products/fittings/quick-connect-fittings/q2001-pmv-sacn
    分类页通常少一层。
  */
  if (segments.length >= 4) return 100;

  return 10;
}

function chooseDetailHref(candidates: Candidate[]): string {
  return [...new Set(candidates.map((item) => item.detailHref).filter(Boolean))]
    .sort((a, b) => detailHrefScore(b) - detailHrefScore(a))[0] ?? "";
}

function isUsableProductImage(imagePath: string): boolean {
  if (!imagePath.startsWith("/")) return false;

  return (
    !imagePath.includes("/images/logo/") &&
    !imagePath.endsWith("foreach-logo-color.svg")
  );
}

function chooseImagePath(candidates: Candidate[]): string {
  return (
    candidates
      .map((item) => item.imagePath)
      .find(isUsableProductImage) ??
    PLACEHOLDER_IMAGE
  );
}

function buildProducts(
  candidates: Candidate[]
) {
  return fittingCompatibleModelProducts.map((product) => {
    const matches = findCandidates(product, candidates);
    const detailHref = chooseDetailHref(matches);
    const imagePath = chooseImagePath(matches);

    return {
      productCode: product.productCode,
      foreachModel: product.foreachModel,

      /*
        为兼容当前选型清单结构，内部字段名暂时保留 competitorModels。
        前台文案和页面中一律显示为“兼容型号”。
      */
      competitorModels: product.compatibleModels,

      packageText: "",
      showOnHome: true,
      note: "",
      imagePath,
      drawingPdfPath: "",
      detailHref,
      productType: product.productType,
      productSeries: product.productSeries,
    };
  });
}

function buildOutput(products: ReturnType<typeof buildProducts>): string {
  return `/* =========================================================
   all-compatible-products.generated.ts
   恒永达官网｜接头兼容型号查询页面产品数据

   自动生成，请勿手动修改。
   页面只显示“兼容型号”，品牌信息不会输出到前台。
========================================================= */

import type { FittingReplacementProduct } from "./fitting-replacement.types";

export const fittingReplacementAllCompatibleProducts:
  FittingReplacementProduct[] =
${JSON.stringify(products, null, 2)};
`;
}

async function main() {
  const candidates = await loadCandidates();
  const products = buildProducts(candidates);

  fs.writeFileSync(OUTPUT_PATH, buildOutput(products), "utf8");

  const missingDetail = products.filter((item) => !item.detailHref);
  const placeholderImages = products.filter(
    (item) => item.imagePath === PLACEHOLDER_IMAGE
  );

  console.log("============================================");
  console.log("兼容型号页面数据生成完成");
  console.log(`产品数：${products.length}`);
  console.log(`缺少正式详情页：${missingDetail.length}`);
  console.log(`使用占位图：${placeholderImages.length}`);
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();

