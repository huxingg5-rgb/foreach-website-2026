/* =========================================================
   getFittingReplacementHomeData.ts
   恒永达官网｜接头替代查询首页数据服务

   修复说明：
   1. 页面文案统一从 q20.page.intl.ts 读取
   2. 不再把西班牙语、法语、韩语、俄语强制覆盖成英文
   3. 产品卡片标题、字段名称、按钮、分页和空状态均跟随 locale
   4. 产品型号、商品编码、兼容型号等技术数据仍复用统一产品数据
========================================================= */

import { fittingReplacementQuickConnectQ20ZhData } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.zh";

import { getFittingReplacementQuickConnectQ20PageIntl } from "@/data/resources/fitting-replacement/fittings/quick-connect/q20/q20.page.intl";

import { fittingReplacementAllCompatibleProducts } from "@/data/resources/fitting-replacement/all-compatible-products.generated";

import type { FittingReplacementPageData } from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "@/data/resources/fitting-replacement/fitting-replacement-series.config";

/* =========================================================
   获取接头替代查询首页完整数据

   说明：
   1. 中文路径通常传入 zh
   2. 外语路径传入 en / es / fr / ko / ru
   3. zh-CN 会先统一转换为 zh
   4. q20.page.intl.ts 已经包含完整六语言页面文案
========================================================= */
export async function getFittingReplacementHomeData(
  _seriesKey: FittingReplacementSeriesKey = "q20",
  locale: string = "zh"
): Promise<FittingReplacementPageData> {
  const normalizedLocale = locale === "zh-CN" ? "zh" : locale;

  const pageText =
    getFittingReplacementQuickConnectQ20PageIntl(normalizedLocale);

  return {
    /* 保留 Q20 产品数据和型号解析规则 */
    ...fittingReplacementQuickConnectQ20ZhData,

    /* 首页展示全部接头兼容产品 */
    products: fittingReplacementAllCompatibleProducts,

    /* Banner 文案直接使用当前语言 */
    banner: {
      ...pageText.banner,
    },

    /* 面包屑复制为普通数组，避免 as const 只读类型冲突 */
    breadcrumbs: pageText.breadcrumbs.map((item) => ({
      ...item,
    })),

    /* 搜索框文案直接使用当前语言 */
    search: {
      ...pageText.search,
    },

    /*
       首页全部界面文案直接使用当前语言：
       - 产品区域标题与数量
       - 产品卡片字段
       - 查看详情 / 加入清单按钮
       - 空结果提示
       - 分页按钮
    */
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

/* =========================================================
   获取首页产品数据
========================================================= */
export function getFittingReplacementHomeProducts(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementAllCompatibleProducts;
}

/* =========================================================
   获取型号解析规则
========================================================= */
export function getFittingReplacementHomeModelRules(
  _seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return fittingReplacementQuickConnectQ20ZhData.modelRules;
}
