import {
  getPublishedFittingProductByCode,
  isPublishedFittingProduct,
} from "@/data/products/selection/fitting-publication.generated";

function text(value: unknown): string {
  return String(value ?? "").trim();
}

function normalize(value: unknown): string {
  return text(value).toUpperCase();
}

export function connectPublishedFittingProduct<
  T extends Record<string, unknown>,
>(product: T): T | null {
  if (!isPublishedFittingProduct(product)) {
    return null;
  }

  const productCode = text(
    product.productCode ?? product.productId
  );
  const formalProduct =
    getPublishedFittingProductByCode(productCode);

  if (!formalProduct) {
    return null;
  }

  const currentModel = text(
    product.foreachModel ?? product.model
  );

  if (
    !currentModel ||
    normalize(currentModel) !==
      normalize(formalProduct.foreachModel)
  ) {
    return null;
  }

  return {
    ...product,
    productCode: formalProduct.productCode,
    productId: formalProduct.productCode,
    foreachModel: formalProduct.foreachModel,
    model: formalProduct.foreachModel,
    imageCard: formalProduct.imageCard,
    mainImage: formalProduct.imageCard,
    image: formalProduct.imageCard,
    imagePath: formalProduct.imageCard,
    imageUrl: formalProduct.imageCard,
    heroImage: formalProduct.imageCard,
    detailHref:
      formalProduct.detailHref ||
      text(product.detailHref),
  } as T;
}
