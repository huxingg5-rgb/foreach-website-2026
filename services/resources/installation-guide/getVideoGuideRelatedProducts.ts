import { getSolenoidRelatedProducts } from "@/services/resources/getSolenoidRelatedProducts";
import { controlModuleSelectionProducts } from "@/data/products/selection/control-module-selection.generated";
import { getControlModulePath } from "@/data/products/selection/control-module-routes";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { femaleThreadAdapterSelectionProducts } from "@/data/products/selection/female-thread-adapter-selection.generated";
import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";
import { syringePumpSelectionProducts } from "@/data/products/selection/syringe-pump-selection.generated";
import { getSyringeModelPath } from "@/data/products/selection/syringe-pump-routes";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";

function selectionCard(products: ProductSelectionProduct[], id: string, href: string | null): ArticleRelatedProduct {
  const product = products.find(item => item.productId === id);
  const title = product?.cardTitle?.en;
  if (!product?.imageCard || !title || !href) throw new Error(`Missing video related product: ${id}`);
  return { id, title, href, imageSrc: product.imageCard, imageAlt: title };
}

function fittingCard(model: string): ArticleRelatedProduct {
  const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
  if (!product) throw new Error(`Missing video related fitting: ${model}`);
  return {
    id: product.productCode, title: product.foreachModel,
    href: `/en${product.detailHref.replace(/\/$/, "")}/`,
    imageSrc: product.imageCard, imageAlt: product.foreachModel,
  };
}

const FOOTER_PRODUCT_LIMIT = 10;

/** Keep the rail concise; each footer offers up to ten distinct published products. */
export function getVideoGuideRelatedProducts(videoId: string, placement: "sidebar" | "footer" = "sidebar"): ArticleRelatedProduct[] {
  const products = selectVideoGuideRelatedProducts(videoId, placement);
  return products.filter((product, index) => products.findIndex(item => item.href === product.href) === index)
    .slice(0, placement === "footer" ? FOOTER_PRODUCT_LIMIT : 2);
}

function selectVideoGuideRelatedProducts(videoId: string, placement: "sidebar" | "footer"): ArticleRelatedProduct[] {
  if (videoId === "youtube-female-thread-conversion" && placement === "footer") {
    return [
      "U-U28-20-PP-N", "U-M6-20-AC-B", "UT-U28-20-PS-B", "UT-U28-20-PP-N",
      "U-M6-20-PP-N", "US-M6-10-AC-B", "US-M6-10-PP-N", "UY-U28-20-PP-N",
      "UT-U28-15-PS-B", "PMU-M12-U28-20-PP-N",
    ].map(model => {
      const card = fittingCard(model);
      const product = femaleThreadAdapterSelectionProducts.find(item => item.productId === card.id);
      const material = product?.filters?.filter04;
      if (product?.status !== "active" || !material) throw new Error(`Missing active fitting material: ${model}`);
      return { ...card, title: `${card.title} · ${material}`, imageAlt: `${model}, ${material} female thread adapter` };
    });
  }
  if (videoId === "youtube-q60-quick-fitting" && placement === "footer") {
    // Q60 housing material is PP. Show actual connector, valve and size options.
    return [
      "Q6006-SNX-SPPE", "Q6006-SMX-LPPE", "Q6006-PNX-LPPE", "Q6006-PNV-LPPE",
      "Q6006-SMV-SPPE", "Q6008-SNX-SPPE", "Q6008-PNV-SPPE", "Q6012-SNV-SPPE",
      "Q6012-PNV-SPPE", "Q6038N-PNV-SPPE",
    ].map(fittingCard);
  }
  switch (videoId) {
    case "sv10-solenoid-valve-overview":
      return getSolenoidRelatedProducts("en");
    case "youtube-syringe-installation":
      return [
        "hld6-60mm-rotary-valve-syringe-pump", "hld3-30mm-rotary-valve-syringe-pump",
        ...(placement === "footer" ? ["hmd6-60mm-solenoid-syringe-pump", "hmd3-30mm-solenoid-syringe-pump"] : []),
      ]
        .map(id => selectionCard(syringePumpSelectionProducts, id, getSyringeModelPath("en", id)));
    case "youtube-q60-quick-fitting":
      return ["Q6006-SNX-SPPE", "Q6006-SMX-LPPE"].map(fittingCard);
    case "youtube-female-thread-conversion":
      return ["U-U28-20-PP-N", "UT-U28-20-PP-N"].map(fittingCard);
    case "youtube-bubble-detection-module":
      // Complementary fluid-monitoring products, not two versions of the ABD.
      return ["abd-air-bubble-detector", "pdm5-pressure-sensor"]
        .map(slug => selectionCard(controlModuleSelectionProducts, `control-${slug}`, getControlModulePath(slug, "en")));
    default:
      return [];
  }
}
