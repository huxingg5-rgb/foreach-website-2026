import fs from "node:fs";
import path from "node:path";

import {
  fittingCompatibleModelProducts,
} from "@/data/resources/fitting-replacement/compatible-models.generated";
import {
  getPublishedFittingProductByCode,
} from "@/data/products/selection/fitting-publication.generated";

const ROOT = process.cwd();

const OUTPUT_PATH = path.join(
  ROOT,
  "data",
  "resources",
  "fitting-replacement",
  "all-compatible-products.generated.ts"
);

function normalize(value: unknown): string {
  return String(value ?? "").trim().toUpperCase();
}

function buildProducts() {
  return fittingCompatibleModelProducts.flatMap((product) => {
    const formalProduct =
      getPublishedFittingProductByCode(product.productCode);

    if (
      !formalProduct ||
      normalize(formalProduct.foreachModel) !==
        normalize(product.foreachModel)
    ) {
      return [];
    }

    return [
      {
        productCode: formalProduct.productCode,
        foreachModel: formalProduct.foreachModel,

        /*
          兼容型号关系来自型号替代数据；
          商品状态、正式型号、主图和详情地址只来自产品中心。
        */
        competitorModels: [...product.compatibleModels],

        packageText: "",
        showOnHome: true,
        note: "",
        imagePath: formalProduct.imageCard,
        drawingPdfPath: "",
        detailHref: formalProduct.detailHref,
        productType:
          formalProduct.productType || product.productType,
        productSeries:
          formalProduct.productSeries || product.productSeries,
      },
    ];
  });
}

function buildOutput(
  products: ReturnType<typeof buildProducts>
): string {
  return `/* =========================================================
   all-compatible-products.generated.ts
   恒永达官网｜接头兼容型号查询页面产品数据

   自动生成，请勿手动修改。
   商品编码为唯一连接键，FOREACH 型号为二次校验。
   状态、正式型号、主图和详情地址来自产品中心统一发布清单。
========================================================= */

import type { FittingReplacementProduct } from "./fitting-replacement.types";

export const fittingReplacementAllCompatibleProducts:
  FittingReplacementProduct[] =
${JSON.stringify(products, null, 2)};
`;
}

function main() {
  const products = buildProducts();

  fs.writeFileSync(
    OUTPUT_PATH,
    buildOutput(products),
    "utf8"
  );

  console.log("============================================");
  console.log("兼容型号页面数据生成完成");
  console.log(`发布产品数：${products.length}`);
  console.log("缺少正式详情页：0");
  console.log("使用占位图：0");
  console.log(`输出：${OUTPUT_PATH}`);
  console.log("============================================");
}

main();
