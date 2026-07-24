import type {
  FittingReplacementSeriesKey,
} from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

import type {
  FittingReplacementPageData,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";

import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";

import {
  publishedFittingReplacementProducts,
} from "@/services/resources/fitting-replacement/getPublishedFittingReplacementProducts";

/*
  型号替代首页只消费统一发布适配器：
  - 商品编码是唯一连接键；
  - FOREACH 型号必须一致；
  - 状态、正式型号、主图和详情地址来自产品中心。
*/
const fittingReplacementHomeProducts =
  publishedFittingReplacementProducts;

/* =========================================================
   首页数据
========================================================= */

export async function getFittingReplacementHomeData(
  _seriesKey: FittingReplacementSeriesKey = "q20",
  locale: string = "zh"
): Promise<FittingReplacementPageData> {
  const pageText =
    getFittingReplacementQuickConnectQ20PageIntl(
      locale
    );

  const isZh =
    locale === "zh" ||
    locale === "zh-CN";

  const isTranslatedLocale = [
    "es",
    "fr",
    "ko",
    "ru",
  ].includes(locale);

  if (isTranslatedLocale) {
    return {
      ...fittingReplacementQuickConnectQ20ZhData,

      products:
        fittingReplacementHomeProducts,

      banner: {
        ...pageText.banner,
      },

      breadcrumbs:
        pageText.breadcrumbs.map((item) => ({
          ...item,
        })),

      search: {
        ...pageText.search,
      },

      homeText: {
        tabs: {
          ...pageText.homeText.tabs,
        },

        history: {
          ...pageText.homeText.history,
        },

        guide: {
          ...pageText.homeText.guide,
        },

        productSection: {
          ...pageText.homeText.productSection,
        },

        productCard: {
          ...pageText.homeText.productCard,
        },

        emptyResult: {
          ...pageText.homeText.emptyResult,
        },

        pagination: {
          ...pageText.homeText.pagination,
        },
      },
    };
  }

  return {
    ...fittingReplacementQuickConnectQ20ZhData,

    products:
      fittingReplacementHomeProducts,

    banner: {
      eyebrow:
        isZh
          ? "资源中心"
          : "Resources",

      title:
        isZh
          ? "接头兼容型号查询"
          : "Fitting Compatible Model Search",

      description:
        isZh
          ? "输入您当前使用的产品型号，查询对应的 FOREACH 恒永达兼容产品。"
          : "Enter the model currently in use to find corresponding FOREACH compatible products.",
    },

    breadcrumbs: [
      {
        label:
          isZh
            ? "首页"
            : "Home",

        href:
          isZh
            ? "/"
            : `/${locale}`,
      },

      {
        label:
          isZh
            ? "资源中心"
            : "Resources",

        href:
          isZh
            ? "/resources"
            : `/${locale}/resources`,
      },

      {
        label:
          isZh
            ? "接头兼容型号查询"
            : "Fitting Compatible Model Search",
      },
    ],

    search: {
      placeholder:
        isZh
          ? "请输入兼容型号"
          : "Enter a compatible model",

      buttonText:
        isZh
          ? "查询"
          : "Search",
    },

    homeText: {
      ...pageText.homeText,

      tabs: {
        replace:
          isZh
            ? "兼容型号查询"
            : "Compatible Model Search",

        guide: "",
      },

      history: {
        label:
          isZh
            ? "示例型号"
            : "Examples",
      },

      productSection: {
        title:
          isZh
            ? "兼容产品"
            : "Compatible Products",

        description:
          isZh
            ? "输入兼容型号后，可查看匹配产品并加入清单。"
            : "Enter a compatible model to view matched products and add them to your list.",

        countTemplate:
          isZh
            ? "当前展示 {start}–{end} / 共 {total} 个产品"
            : "Showing {start}–{end} of {total} products",
      },

      productCard: {
        productName:
          isZh
            ? "FOREACH 接头"
            : "FOREACH Fitting",

        productCode:
          isZh
            ? "商品编码："
            : "Product code:",

        foreachModel:
          isZh
            ? "FOREACH 型号："
            : "FOREACH model:",

        compatibleModels:
          isZh
            ? "兼容型号："
            : "Compatible models:",

        viewDetail:
          isZh
            ? "查看详情"
            : "View details",

        addToCart:
          isZh
            ? "加入清单"
            : "Add to list",

        addedToCart:
          isZh
            ? "已加入清单"
            : "Added",
      },

      emptyResult: {
        title:
          isZh
            ? "暂未查询到对应的兼容产品"
            : "No compatible product was found",

        description:
          isZh
            ? "请确认型号是否完整，或提交现用型号、图纸及产品照片，由工程师协助确认。"
            : "Check the complete model, or submit the model, drawing, and product photo for engineering review.",
      },

      pagination: {
        previous:
          isZh
            ? "上一页"
            : "Previous",

        next:
          isZh
            ? "下一页"
            : "Next",
      },

      guide:
        pageText.homeText.guide,
    },
  };
}

/* =========================================================
   首页产品与型号规则
========================================================= */

export function getFittingReplacementHomeProducts(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementHomeProducts;
}

export function getFittingReplacementHomeModelRules(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementQuickConnectQ20ZhData
    .modelRules;
}