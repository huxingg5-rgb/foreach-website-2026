import {
  fittingReplacementAllCompatibleProducts,
} from "@/data/resources/fitting-replacement/all-compatible-products.generated";
import {
  getPublishedFittingProductByCode,
} from "@/data/products/selection/fitting-publication.generated";
import type {
  FittingReplacementProduct,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

function normalize(value: unknown): string {
  return String(value ?? "").trim().toUpperCase();
}

export const publishedFittingReplacementProducts:
  FittingReplacementProduct[] =
  fittingReplacementAllCompatibleProducts.flatMap((product) => {
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
        ...product,
        productCode: formalProduct.productCode,
        foreachModel: formalProduct.foreachModel,
        imagePath: formalProduct.imageCard,
        detailHref:
          formalProduct.detailHref || product.detailHref,
        productType:
          formalProduct.productType || product.productType,
        productSeries:
          formalProduct.productSeries || product.productSeries,
        competitorModels: [...product.competitorModels],
      },
    ];
  });

export function getPublishedFittingReplacementProducts() {
  return publishedFittingReplacementProducts;
}
