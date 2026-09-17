import type { ControlModuleDetail } from "@/data/products/control-modules/control-module-detail.generated";

const CONTROL_CATEGORY_ID = "control";

/* =========================================================
   智控模块详情数据适配器

   说明：
   1. control-module-detail.generated.ts 是智控模块自己的数据结构；
   2. ProductDetailClient 使用的是统一详情页展示结构；
   3. 这里把智控数据转成 ProductDetailClient 可以直接渲染的字段；
   4. 不新建独立页面，不新建独立样式，继续复用公共详情页。
========================================================= */

const CONTROL_MODULE_DETAIL_IMAGE_MAP: Record<string, string> = {
  "abd-air-bubble-detector": "/images/products/control/foreach-abd-air-bubble-detector.webp",
  "pdm5-pressure-sensor": "/images/products/control/foreach-pdm5-pressure-sensor.webp",
};

export function getControlModuleProductDetailData(detail: ControlModuleDetail) {
  const controlModuleMainImage =
    CONTROL_MODULE_DETAIL_IMAGE_MAP[detail.slug] ||
    (detail as any).mainImage ||
    ((detail as any).images && (detail as any).images[0]) ||
    (detail as any).image ||
    "/images/logo/foreach-logo-color.svg";

  const images = Array.isArray(detail.media?.images) ? detail.media.images : [];

  const mainImage = controlModuleMainImage;

  const drawing2dUrl = detail.media?.drawing2d || "";

  const model3dUrl = detail.media?.model3d || "";

  return {
    slug: detail.slug,

    model: detail.title,
    displayModel: detail.title,
    foreachModel: detail.title,
    name: detail.title,
    title: detail.title,

    category: CONTROL_CATEGORY_ID,
    categoryId: CONTROL_CATEGORY_ID,
    productTypeId: "control-module",
    productTypeName: "智控模块",
    seriesName: detail.categoryLabel || "智控系列",
    series: detail.categoryLabel || "智控系列",

    description: Array.isArray(detail.intro) ? detail.intro.join("\n\n") : "",
    advantages: detail.highlights || [],
    commonApplications: detail.applications || [],

    specs: detail.specs || [],
    faqs: detail.faqs || [],

    mainImage,
    imageCard: controlModuleMainImage,
    image: controlModuleMainImage,
    imagePath: controlModuleMainImage,
    imageUrl: controlModuleMainImage,
    heroImage: mainImage,
    additionalImages: [],

    detailHref: `/products/control/${detail.slug}`,
    href: `/products/control/${detail.slug}`,
    selectionHref: "/products",
    modelSelectionHref: "/products",
    contactHref: "/contact",

    primaryButtonText: "提交定制需求",
    primaryButtonHref: "/contact",
    requestHref: "/contact",

    showConfigurator: false,
    showDatasheetRequest: true,
    showDrawingRequest: Boolean(drawing2dUrl),
    show3DRequest: Boolean(model3dUrl),

    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    model3dUrl,

    resources: {
      drawing2dUrl,
      model3dUrl,
    },
  } as any;
}
