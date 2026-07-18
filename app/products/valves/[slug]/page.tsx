import type { ComponentType } from "react";

import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import valveDetailData from "@/data/products/generated/valves/detail/index.json";

type ValveDetailRecord = {
  slug: string;
  productTypeId: string;
  productTypeName: string;
  title: string;
  h1Title?: string;
  pageTitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  bottomCtaTitle?: string;
  bottomCtaDescription?: string;
  bottomCtaButtonText?: string;
  bottomCtaHref?: string;
  customInquiryTitle?: string;
  customInquiryDescription?: string;
  customInquiryButtonText?: string;
  customInquiryHref?: string;
  modelName: string;
  image: string;
  description: string;
  commonApplications: string[];
  advantages: string[];
  specs: {
    label: string;
    value: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

const details = valveDetailData as ValveDetailRecord[];

/*
  ProductDetailClient 是官网已有公共详情页组件。
  阀系列详情页不重新设计页面，只把数据适配成该组件需要的结构。
*/
const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "rotary-valves" },
    { slug: "high-pressure-valves" },
    { slug: "solenoid-valves" },
  ];
}

type ValveDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getDetailBySlug(slug: string) {
  return details.find((item) => item.slug === slug);
}

/*
  将阀系列数据转换为 ProductDetailClient 可以识别的数据。
  这里参考 RPL 无阀泵定制品写法：
  - 型号显示为“定制配置请联系我们”
  - 不显示标准型号选择
  - 保留添加图纸 / 加入清单逻辑
  - 传 additionalImages / images / thumbnails 空数组，避免轮播读取报错
*/
function toClientData(detail: ValveDetailRecord) {
  // VALVE_DETAIL_MULTIPLE_IMAGES_PATCH
  // 阀系列详情页：兼容 JSON 中的 thumbnails / additionalImages / images / galleryImages。
  // 目的：让电磁阀 02/03/04 可以进入详情页缩略图。
  const valveMainImage =
    (detail as any).mainImage ||
    (detail as any).image ||
    (detail as any).imagePath ||
    "";

  const valveExtraImages = Array.from(
    new Set(
      [
        ...(((detail as any).thumbnails || []) as string[]),
        ...(((detail as any).additionalImages || []) as string[]),
        ...(((detail as any).galleryImages || []) as string[]),
        ...(((detail as any).images || []) as string[]),
      ]
        .map((item: any) => {
          if (typeof item === "string") return item;
          if (item && typeof item.src === "string") return item.src;
          return "";
        })
        .filter(Boolean)
        .filter((src) => src !== valveMainImage),
    ),
  );

  const image = detail.image || "/images/products/common/product-placeholder.svg";

  return {
    ...detail,

    category: "valves",
    categoryId: "valves",
    categoryLabel: "阀系列",

    productTypeSlug: detail.slug,
    productTypeId: detail.productTypeId,
    productTypeName: detail.productTypeName,
    productTypeLabel: detail.productTypeName,

    slug: detail.slug,

    title: detail.h1Title || detail.pageTitle || detail.title,
    name: detail.h1Title || detail.pageTitle || detail.title,
    productName: detail.h1Title || detail.pageTitle || detail.title,
    model: detail.h1Title || detail.pageTitle || detail.title,
    modelName: detail.modelName || detail.h1Title || detail.pageTitle || detail.title,
    h1Title: detail.h1Title || detail.pageTitle || detail.title,
    pageTitle: detail.pageTitle || detail.h1Title || detail.title,

    description: detail.description,
    summary: detail.description,
    overview: detail.description,

    commonApplications: Array.isArray(detail.commonApplications)
      ? detail.commonApplications
      : [],

    advantages: Array.isArray(detail.advantages) ? detail.advantages : [],
    highlights: Array.isArray(detail.advantages) ? detail.advantages : [],
    features: Array.isArray(detail.advantages) ? detail.advantages : [],

    specs: Array.isArray(detail.specs) ? detail.specs : [],

    faq: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],

    /*
      定制品模式。
      这里沿用 RPL 无阀泵详情页的定制配置逻辑。
    */
    isCustomOnly: true,
    isCustomInquiry: true,
    detailMode: "custom_inquiry",
    showStandardModelSelector: false,
    showCustomInquiryCta: true,

    modelDisplay: "定制配置请联系我们",
    displayModel: "定制配置请联系我们",

    contactHref: "/contact",

    /*
      阀系列暂时不直接开放下载 3D / 规格书。
      图纸按“添加图纸”需求进入清单。
    */
    showDrawingRequest: true,
    show3DRequest: false,
    showModel3dRequest: false,
    showDatasheetRequest: false,

    drawing2dUrl: "",
    model3dUrl: "",
    datasheetUrl: "",

    /*
      公共详情页图片字段。
      additionalImages / images / thumbnails 必须给空数组，
      避免 ProductDetailClient 读取 forEach / map 时报错。
    */
    image,
    imagePath: image,
    imageUrl: image,
    mainImage: valveMainImage,
    primaryImage: image,
    productImage: image,
    heroImage: image,
    imageAlt: detail.title,

    additionalImages: valveExtraImages,
    images: [],
    thumbnails: valveExtraImages,

    selectionHref: "/products",
    detailHref: "/products/valves/" + detail.slug,

    faqs: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],
    faqItems: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],
    detailFaqs: Array.isArray(detail.faq)
      ? detail.faq.map((item) => ({
          ...item,
          q: item.question,
          a: item.answer,
        }))
      : [],

    bottomCtaTitle: detail.bottomCtaTitle,
    bottomCtaDescription: detail.bottomCtaDescription,
    bottomCtaButtonText: detail.bottomCtaButtonText,
    bottomCtaHref: detail.bottomCtaHref || "/contact",

    bottomCta: {
      title: detail.bottomCtaTitle,
      desc: detail.bottomCtaDescription,
      description: detail.bottomCtaDescription,
      button: detail.bottomCtaButtonText,
      buttonText: detail.bottomCtaButtonText,
      href: detail.bottomCtaHref || "/contact",
    },

    customInquiryTitle: detail.customInquiryTitle || detail.bottomCtaTitle,
    customInquiryDescription:
      detail.customInquiryDescription || detail.bottomCtaDescription,
    customInquiryButtonText:
      detail.customInquiryButtonText || detail.bottomCtaButtonText,
    customInquiryHref:
      detail.customInquiryHref || detail.bottomCtaHref || "/contact",

    customInquiryCta: {
      title: detail.customInquiryTitle || detail.bottomCtaTitle,
      desc: detail.customInquiryDescription || detail.bottomCtaDescription,
      description:
        detail.customInquiryDescription || detail.bottomCtaDescription,
      button:
        detail.customInquiryButtonText || detail.bottomCtaButtonText,
      buttonText:
        detail.customInquiryButtonText || detail.bottomCtaButtonText,
      href:
        detail.customInquiryHref || detail.bottomCtaHref || "/contact",
    },

    sourceType: "valve-detail",
  };
}

export async function generateMetadata({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    return {
      title: "阀系列产品｜恒永达 FOREACH",
    };
  }

  return {
    title: detail.seoTitle || detail.title + "｜" + detail.productTypeName + "｜恒永达 FOREACH",
    description: detail.seoDescription || detail.description,
  };
}

export default async function ValveDetailPage({ params }: ValveDetailPageProps) {
  const { slug } = await params;
  const detail = getDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  return (
    <div data-valve-detail-page="true">
      {/*
        VALVE_DETAIL_FAQ_CTA_FIXED_FINAL_20260718

        阀系列详情页最终布局：
        - FAQ 展开不推动 Footer
        - CTA 背景全屏铺满
        - CTA 内容与正文居中对齐
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* 允许全屏 CTA 穿出详情页内容容器 */
            [data-valve-detail-page="true"],
            [data-valve-detail-page="true"] main,
            [data-valve-detail-page="true"] main > div,
            [data-valve-detail-page="true"] [class*="page"]:has([class*="plungerBottomCta"]),
            [data-valve-detail-page="true"] [class*="container"]:has([class*="plungerBottomCta"]),
            [data-valve-detail-page="true"] [class*="detailSection"]:has([class*="plungerBottomCta"]) {
              overflow: visible !important;
            }

            /*
             * FAQ 固定区域：
             * 折叠或展开时总高度不变，
             * 所以下方 CTA 和 Footer 不会上下跳动。
             */
            [data-valve-detail-page="true"] [class*="faqSection"] {
              position: relative !important;
              height: 560px !important;
              min-height: 560px !important;
              max-height: 560px !important;
              margin-top: 36px !important;
              margin-bottom: 0 !important;
              padding-top: 0 !important;
              padding-bottom: 0 !important;
              overflow: hidden !important;
              transform: none !important;
            }

            [data-valve-detail-page="true"] [class*="faqList"] {
              margin-bottom: 0 !important;
            }

            /* 限制单条答案展开高度，保持在预留区域中 */
            [data-valve-detail-page="true"] [class*="faqItemOpen"] [class*="faqAnswerWrap"] {
              max-height: 190px !important;
            }

            /*
             * CTA 外层：
             * 背景使用整个浏览器宽度，
             * 不受正文容器宽度限制。
             */
            [data-valve-detail-page="true"] [class*="plungerBottomCta"]:not([class*="Inner"]):not([class*="Text"]):not([class*="Button"]) {
              position: relative !important;
              left: 50% !important;
              width: 100vw !important;
              max-width: none !important;
              margin-top: 0 !important;
              margin-right: -50vw !important;
              margin-bottom: 0 !important;
              margin-left: -50vw !important;
              transform: none !important;
              box-sizing: border-box !important;
              overflow: hidden !important;
            }

            /* CTA 内容恢复到官网正文宽度并居中 */
            [data-valve-detail-page="true"] [class*="plungerBottomCtaInner"] {
              display: grid !important;
              width: min(calc(100% - 48px), 1180px) !important;
              max-width: 1180px !important;
              min-height: 250px !important;
              margin: 0 auto !important;
              padding: 58px 0 !important;
              grid-template-columns: minmax(0, 1fr) auto !important;
              gap: 48px !important;
              align-items: center !important;
              box-sizing: border-box !important;
              transform: none !important;
            }

            [data-valve-detail-page="true"] [class*="plungerBottomCtaText"] {
              min-width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              transform: none !important;
            }

            [data-valve-detail-page="true"] [class*="plungerBottomCtaButton"] {
              position: static !important;
              margin: 0 !important;
              transform: none !important;
            }

            /* CTA 后直接进入 Footer，不保留额外白色间距 */
            [data-valve-detail-page="true"] [class*="page"]:has([class*="plungerBottomCta"]),
            [data-valve-detail-page="true"] [class*="container"]:has([class*="plungerBottomCta"]),
            [data-valve-detail-page="true"] [class*="detailSection"]:has([class*="plungerBottomCta"]) {
              padding-bottom: 0 !important;
              margin-bottom: 0 !important;
            }

            @media (max-width: 768px) {
              [data-valve-detail-page="true"] [class*="faqSection"] {
                height: 680px !important;
                min-height: 680px !important;
                max-height: 680px !important;
                margin-top: 28px !important;
              }

              [data-valve-detail-page="true"] [class*="faqItemOpen"] [class*="faqAnswerWrap"] {
                max-height: 260px !important;
              }

              [data-valve-detail-page="true"] [class*="plungerBottomCtaInner"] {
                width: calc(100% - 48px) !important;
                min-height: 250px !important;
                padding: 40px 0 !important;
                grid-template-columns: minmax(0, 1fr) !important;
                gap: 22px !important;
              }
            }
          `,
        }}
      />

{
        /*
          VALVE_DETAIL_CTA_OFFSET_REMOVED

          只针对阀系列详情页轻微减少 FAQ 到底部 CTA 的空白。
          不再使用多组叠加选择器，避免蓝色 CTA 内部文字被顶上去。
        */
      }
<ProductDetailView data={toClientData(detail)} />
    </div>
  );
}
