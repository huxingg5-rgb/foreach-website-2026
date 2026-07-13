import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";

import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";

import { fittingReplacementAllCompatibleProducts } from "@/data/resources/fitting-replacement/all-compatible-products.generated";

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

export async function getFittingReplacementHomeData(
  _seriesKey: FittingReplacementSeriesKey = "q20",
  locale: string = "zh"
): Promise<FittingReplacementPageData> {
  const pageText = getFittingReplacementQuickConnectQ20PageIntl(locale);
  const isZh = locale === "zh" || locale === "zh-CN";

  return {
    ...fittingReplacementQuickConnectQ20ZhData,

    products: fittingReplacementAllCompatibleProducts,

    banner: {
      eyebrow: isZh ? "资源中心" : "Resources",
      title: isZh
        ? "接头兼容型号查询"
        : "Fitting Compatible Model Search",
      description: isZh
        ? "输入您当前使用的产品型号，查询对应的 FOREACH 恒永达兼容产品。"
        : "Enter the model currently in use to find corresponding FOREACH compatible products.",
    },

    breadcrumbs: [
      {
        label: isZh ? "首页" : "Home",
        href: isZh ? "/" : `/${locale}`,
      },
      {
        label: isZh ? "资源中心" : "Resources",
        href: isZh ? "/resources" : `/${locale}/resources`,
      },
      {
        label: isZh
          ? "接头兼容型号查询"
          : "Fitting Compatible Model Search",
      },
    ],

    search: {
      placeholder: isZh
        ? "请输入兼容型号"
        : "Enter a compatible model",
      buttonText: isZh ? "查询" : "Search",
    },

    homeText: {
      ...pageText.homeText,

      tabs: {
        replace: isZh ? "兼容型号查询" : "Compatible Model Search",
        guide: "",
      },

      history: {
        label: isZh ? "示例型号" : "Examples",
      },

      productSection: {
        title: isZh ? "兼容产品" : "Compatible Products",
        description: isZh
          ? "输入兼容型号后，可查看匹配产品并加入清单。"
          : "Enter a compatible model to view matched products and add them to your list.",
        countTemplate: isZh
          ? "当前展示 {start}–{end} / 共 {total} 个产品"
          : "Showing {start}–{end} of {total} products",
      },

      productCard: {
        productName: isZh ? "FOREACH 接头产品" : "FOREACH Fitting",
        productCode: isZh ? "商品编码：" : "Product code:",
        foreachModel: isZh ? "FOREACH 型号：" : "FOREACH model:",
        compatibleModels: isZh ? "兼容型号：" : "Compatible models:",
        viewDetail: isZh ? "查看详情" : "View details",
        addToCart: isZh ? "加入清单" : "Add to list",
        addedToCart: isZh ? "已加入清单" : "Added",
      },

      emptyResult: {
        title: isZh
          ? "暂未查询到对应的兼容产品"
          : "No compatible product was found",
        description: isZh
          ? "请确认型号是否完整，或提交现用型号、图纸及产品照片，由工程师协助确认。"
          : "Check the complete model, or submit the model, drawing, and product photo for engineering review.",
      },

      pagination: {
        previous: isZh ? "上一页" : "Previous",
        next: isZh ? "下一页" : "Next",
      },

      guide: pageText.homeText.guide,
    },
  };
}

export function getFittingReplacementHomeProducts(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementAllCompatibleProducts;
}

export function getFittingReplacementHomeModelRules(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementQuickConnectQ20ZhData.modelRules;
}
