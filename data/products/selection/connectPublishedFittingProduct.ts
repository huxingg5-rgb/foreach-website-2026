import {
  getPublishedFittingProductByCode,
  isPublishedFittingProduct,
} from "@/data/products/selection/fitting-publication.generated";
import { appendQuickConnectSupplementaryImage } from "@/data/products/detail/quick-connect-gallery";
import { getBarbedFittingGallery } from "@/data/products/detail/barbed-fitting-gallery";
import { getThreadToBarbedFittingGallery } from "@/data/products/detail/thread-to-barbed-fitting-gallery";
import { getFemaleThreadAdapterGallery } from "@/data/products/detail/female-thread-adapter-gallery";
import { getBulkheadBarbedFittingGallery } from "@/data/products/detail/bulkhead-barbed-fitting-gallery";

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
    ...getBarbedFittingGallery(product),
    ...getThreadToBarbedFittingGallery(product),
    ...getFemaleThreadAdapterGallery(product),
    ...getBulkheadBarbedFittingGallery(product),
    ...(formalProduct.productTypeId === "quick-connect-fittings" ? {
      additionalImages: appendQuickConnectSupplementaryImage(
        Array.isArray(product.additionalImages)
          ? product.additionalImages.filter((image): image is string => typeof image === "string" && Boolean(image))
          : [],
      ),
    } : {}),
    detailHref:
      formalProduct.detailHref ||
      text(product.detailHref),
  } as T;
}
