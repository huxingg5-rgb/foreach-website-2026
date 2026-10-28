import { getSolenoidRelatedProducts } from "@/services/resources/getSolenoidRelatedProducts";
import { controlModuleSelectionProducts } from "@/data/products/selection/control-module-selection.generated";
import { getControlModulePath } from "@/data/products/selection/control-module-routes";
import { FITTING_PUBLISHED_PRODUCTS } from "@/data/products/selection/fitting-publication.generated";
import { femaleThreadAdapterSelectionProducts } from "@/data/products/selection/female-thread-adapter-selection.generated";
import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";
import { syringePumpSelectionProducts } from "@/data/products/selection/syringe-pump-selection.generated";
import { getSyringeModelPath } from "@/data/products/selection/syringe-pump-routes";
import type { ArticleRelatedProduct } from "@/services/resources/technical-articles/getArticleRelatedProducts";
import { getVideoGuideDetail } from "@/data/resources/installation-guide/video-guide-details.en";
import { getVideoGuideProduct } from "@/data/resources/installation-guide/video-guide-products";
import { getFemaleThreadAdapterImageAlt } from "@/data/products/detail/female-thread-adapter-gallery";
import { getTubingAssemblySelectionContent } from "@/data/products/tubing-assemblies/localized";
import { getTubingAssemblyDetailPath } from "@/data/products/tubing-assemblies.en";
import { pistonPumpRelatedProducts } from "@/data/products/selection/piston-pump-related-products";
import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
import { getTubingDetailPath } from "@/data/products/selection/tubing-selection-routes";
import { getTubingGalleryData } from "@/data/products/tubing/gallery";
import { getLanguageHref } from "@/lib/i18n/language-switch";
import type { VideoGuideDetail } from "@/data/resources/installation-guide/video-guide-detail.types";

function selectionCard(products: ProductSelectionProduct[], id: string, href: string | null): ArticleRelatedProduct {
  const product = products.find(item => item.productId === id);
  const title = product?.cardTitle?.en;
  if (!product?.imageCard || !title || !href) throw new Error(`Missing video related product: ${id}`);
  return { id, title, href, imageSrc: id === "control-pdm5-pressure-sensor" ? "/images/products/control/foreach-pdm5-pressure-sensor-front.webp" : product.imageCard, imageAlt: title };
}

function fittingCard(model: string): ArticleRelatedProduct {
  const product = FITTING_PUBLISHED_PRODUCTS.find(item => item.foreachModel === model);
  if (!product) throw new Error(`Missing video related fitting: ${model}`);
  const photo = model.startsWith("UT-U28-")
    ? `/images/products/fittings/female-thread-adapters/photos/ut-u28-tee-female-thread-adapter-${model.endsWith("-PS-B") ? "black-front-detail" : "natural-single"}.webp`
    : model === "PMU-M12-U28-20-PP-N"
      ? "/images/products/fittings/female-thread-adapters/photos/pp-bulkhead-female-thread-union-with-separate-metal-nut.webp"
      : undefined;
  return {
    id: product.productCode, title: product.foreachModel,
    href: `/en${product.detailHref.replace(/\/$/, "")}/`,
    imageSrc: photo ?? product.imageCard,
    imageAlt: (photo && getFemaleThreadAdapterImageAlt(photo, "en")) || product.foreachModel,
  };
}

const FOOTER_PRODUCT_LIMIT = 10;

/** Keep the rail concise; each footer offers up to ten distinct published products. */
export function getVideoGuideRelatedProducts(videoId: string, placement: "sidebar" | "footer" = "sidebar", locale: VideoGuideDetail["locale"] = "en"): ArticleRelatedProduct[] {
  const products = selectVideoGuideRelatedProducts(videoId, placement);
  return products.filter((product, index) => products.findIndex(item => item.href === product.href) === index)
    .slice(0, placement === "footer" ? FOOTER_PRODUCT_LIMIT : 2)
    .map(product => {
      if (locale === "en") return product;
      const selection = [...pistonPumpRelatedProducts, ...tubingSelectionProducts].find(item => item.productId === product.id);
      const title = selection?.cardTitle?.[locale === "zh-CN" ? "zh" : locale] ?? product.title;
      const gallery = getTubingGalleryData(product.id, locale);
      return { ...product, title, href: getLanguageHref(product.href, locale),
        imageAlt: gallery?.additionalImageAlts[0] ?? title };
    })
    .map(product => ["sv10-solenoid-valve-overview", "youtube-syringe-installation"].includes(videoId)
      ? product : { ...product, imageFill: true });
}

function selectVideoGuideRelatedProducts(videoId: string, placement: "sidebar" | "footer"): ArticleRelatedProduct[] {
  const detail = getVideoGuideDetail("en", videoId);
  if (detail?.productKeys) return detail.productKeys.map(getVideoGuideProduct);
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
      return { ...card, title: `${card.title} · ${material}` };
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
    case "youtube-piston-pump-liquid-dispensing":
      return ["pump-ea-500ul-pmma", "pump-ea-500ul-peek",
        ...(placement === "footer" ? ["pump-ea-100ul-pmma", "pump-ea-250ul-pmma"] : []),
      ].map(id => {
        const product = pistonPumpRelatedProducts.find(item => item.productId === id);
        return selectionCard(pistonPumpRelatedProducts, id, product?.detailHref ? `/en${product.detailHref}/` : null);
      });
    case "youtube-flexible-tubing-laboratory-fluid-lines":
      // Recommend materials with real gallery photos; PFA currently has only a rendered main image.
      return ["pvc-tubing", "tpu-tubing",
        ...(placement === "footer" ? ["fep-tubing", "ptfe-tubing", "peek-tubing"] : []),
      ].map(id => {
        const gallery = getTubingGalleryData(id, "en");
        const imageSrc = gallery?.additionalImages[0];
        const imageAlt = gallery?.additionalImageAlts[0];
        if (!imageSrc || !imageAlt) throw new Error(`Missing tubing gallery photo: ${id}`);
        return {
          ...selectionCard(tubingSelectionProducts, id, getTubingDetailPath("en", id)),
          imageSrc, imageAlt, imageAspectRatio: 1,
        };
      });
    case "youtube-quick-connect-sealing-compatibility":
      return ["Q2002-SNX-SPPE", "Q6006-SNX-SPPE",
        ...(placement === "footer" ? ["Q4004-SNX-SPPE", "Q6006-PNV-LPPE"] : []),
      ].map(fittingCard);
    case "youtube-quick-connect-coupling-types":
      return ["Q2002-SNX-SPPE", "Q6006-SNX-SPPE",
        ...(placement === "footer" ? ["Q4004-SNX-SPPE"] : []),
      ].map(fittingCard);
    case "youtube-thread-to-barb-fittings":
      return ["SA-U28-32D-PP-N", "SB-M5-32D-PP-N",
        ...(placement === "footer" ? ["SBS-M6-32D-PP-N", "SBR-U28-32-PP-N"] : []),
      ].map(fittingCard);
    case "youtube-rigid-tubing-fittings": {
      const assemblies = getTubingAssemblySelectionContent("en");
      return ([
        { id: "tubing-assembly-fep-flanged", family: "flanged-tubing" },
        { id: "tubing-assembly-fep-ferrule", family: "ferrule-kits" },
      ] as const).map(({ id, family }) => {
        const product = assemblies.cards.find(item => item.productId === id);
        if (!product?.detailHref || !product.imageCard) throw new Error(`Missing video related tubing assembly: ${id}`);
        return {
          id, title: assemblies.typeNames[family],
          href: getTubingAssemblyDetailPath(family),
          imageSrc: product.imageCard, imageAlt: product.imageAlt || product.cardTitle,
        };
      });
    }
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
      return ["UT-U28-20-PP-N", "PMU-M12-U28-20-PP-N"].map(fittingCard);
    case "youtube-bubble-detection-module":
      // Complementary fluid-monitoring products, not two versions of the ABD.
      return ["abd-air-bubble-detector", "pdm5-pressure-sensor"]
        .map(slug => selectionCard(controlModuleSelectionProducts, `control-${slug}`, getControlModulePath(slug, "en")));
    default:
      return [];
  }
}
