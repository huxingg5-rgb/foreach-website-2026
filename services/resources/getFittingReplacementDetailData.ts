/* =========================================================
   getFittingReplacementDetailData.ts
   恒永达官网｜接头替代查询详情页数据服务层

   文件路径：
   services/resources/getFittingReplacementDetailData.ts

   作用：
   1. 根据商品编码读取单个接头替代详情
   2. 当前阶段默认读取 Q20 本地静态产品数据
   3. 详情页文案从 fitting-replacement.detail.zh.ts 读取
   4. 后期接后台 / 数据库时，优先改这个文件
   5. 详情页 page.tsx 和组件层尽量不用大改
   6. 为后续 Q40 / Q60 / 其他接头系列预留 seriesKey 参数

   为什么详情页路径用商品编码：
   1. 商品编码是唯一 ID
   2. 型号可能重复，对应多个商品编码
   3. 用商品编码做详情页路径更稳定

   当前阶段：
   1. 详情页 URL 仍然是：
      /resources/selection-support/fitting-replacement/q20/[productCode]
   2. 所以 generateStaticParams 仍然只返回 productCode
   3. 后续如果路由升级为：
      /resources/selection-support/fitting-replacement/[seriesKey]/[productCode]
      再让 generateStaticParams 同时返回 seriesKey + productCode
========================================================= */

import { fittingReplacementZhData } from "../../data/resources/fitting-replacement/fitting-replacement.zh";
import { fittingReplacementDetailZh } from "../../data/resources/fitting-replacement/fitting-replacement.detail.zh";

import type {
  FittingModelRule,
  FittingReplacementProduct,
} from "../../data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementSeriesKey } from "../../data/resources/fitting-replacement/fitting-replacement-series.config";

import { getFittingReplacementSeriesConfig } from "../../data/resources/fitting-replacement/fitting-replacement-series.config";

/* =========================================================
   详情页数据类型

   说明：
   1. 组件层最终拿到的是普通数组
   2. 所以 breadcrumbs 这里保持为普通数组即可
   3. service 内部会把 data 里的 readonly 面包屑转换成普通数组
========================================================= */
export interface FittingReplacementDetailPageData {
  /* 当前商品数据 */
  product: FittingReplacementProduct;

  /* 型号解析规则 */
  modelRules: FittingModelRule[];

  /* 面包屑 */
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
}

/* =========================================================
   静态数据源类型

   说明：
   1. 这里直接使用 typeof，避免 as const 生成的 readonly 类型冲突
   2. fittingReplacementDetailZh 里面的 breadcrumbs 是 readonly
   3. 所以不能强行写成普通可变数组类型
   4. 真正返回给组件前，再通过 map / spread 转成普通数组
========================================================= */
interface FittingReplacementStaticDataSource {
  pageData: typeof fittingReplacementZhData;
  detailText: typeof fittingReplacementDetailZh;
}

/* =========================================================
   当前支持的系列数据源映射

   说明：
   1. 当前只有 q20
   2. 后续新增 q40 / q60 时，建议新增对应数据文件：
      - fitting-replacement.q40.zh.ts
      - fitting-replacement.q60.zh.ts
      - fitting-replacement.q40.detail.zh.ts
      - fitting-replacement.q60.detail.zh.ts
   3. 然后在这里继续补映射
========================================================= */
const FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP: Record<
  FittingReplacementSeriesKey,
  FittingReplacementStaticDataSource
> = {
  q20: {
    pageData: fittingReplacementZhData,
    detailText: fittingReplacementDetailZh,
  },
};

/* =========================================================
   统一处理编码

   说明：
   1. 去掉前后空格
   2. 统一大写
   3. 避免商品编码或搜索值大小写不一致
========================================================= */
function normalizeValue(value: string) {
  return value.trim().toUpperCase();
}

/* =========================================================
   获取当前系列的数据源

   说明：
   1. 当前默认 q20
   2. 如果传入的 seriesKey 已经在配置中存在，就读取对应数据
   3. 这样后续 Q40 / Q60 不需要重写详情页 service
========================================================= */
function getFittingReplacementStaticDataSource(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  return FITTING_REPLACEMENT_STATIC_DATA_SOURCE_MAP[seriesKey];
}

/* =========================================================
   根据商品编码查找产品

   说明：
   1. 只在当前 seriesKey 对应的数据源里查找
   2. 不跨系列查找，避免后续不同系列商品编码或型号逻辑混乱
========================================================= */
function findFittingReplacementProductByCode(
  productCode: string,
  products: FittingReplacementProduct[]
) {
  const decodedProductCode = decodeURIComponent(productCode);
  const targetCode = normalizeValue(decodedProductCode);

  return (
    products.find((item) => {
      return normalizeValue(item.productCode) === targetCode;
    }) || null
  );
}

/* =========================================================
   生成详情页面包屑

   说明：
   1. 基础层级来自详情页文案文件
   2. 最后一项当前产品型号由 service 自动补上
   3. 这样不会污染自动生成的产品数据文件
   4. 这里读取 seriesConfig，保证“接头替代查询”首页路径统一
   5. String(item.label) 用来把字面量类型转成普通 string
      避免 TypeScript 判断旧文案永远不可能出现而报错
========================================================= */
function createDetailBreadcrumbs(
  product: FittingReplacementProduct,
  seriesKey: FittingReplacementSeriesKey
): FittingReplacementDetailPageData["breadcrumbs"] {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);
  const seriesConfig = getFittingReplacementSeriesConfig(seriesKey);

  const baseBreadcrumbs = dataSource.detailText.breadcrumbs.map((item) => {
    const label = String(item.label);

    if (label === "接头型号替代查询" || label === "型号替代查询") {
      return {
        label: seriesConfig.sourceLabel,
        href: seriesConfig.homeHref,
      };
    }

    return {
      label,
      href: item.href,
    };
  });

  return [
    ...baseBreadcrumbs,
    {
      label: product.foreachModel,
    },
  ];
} 

/* =========================================================
   根据商品编码获取详情页数据

   参数说明：
   1. productCode：商品编码，例如 839085
   2. seriesKey：接头系列，当前默认 q20

   后续扩展：
   如果 Q40 / Q60 使用同一套详情页组件，只需要传入对应 seriesKey。
========================================================= */
export async function getFittingReplacementDetailData(
  productCode: string,
  seriesKey: FittingReplacementSeriesKey = "q20"
): Promise<FittingReplacementDetailPageData | null> {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  const product = findFittingReplacementProductByCode(
    productCode,
    dataSource.pageData.products
  );

  if (!product) {
    return null;
  }

  return {
    product,
    modelRules: [...dataSource.pageData.modelRules],
    breadcrumbs: createDetailBreadcrumbs(product, seriesKey),
  };
}

/* =========================================================
   静态导出路径

   说明：
   1. 如果 next.config.js 使用 output: "export"
   2. 动态详情页必须提前生成所有商品编码路径
   3. 当前路由结构是：
      /resources/selection-support/fitting-replacement/q20/[productCode]
   4. 所以这里仍然只返回 productCode
   5. 后续如果路由升级为 /[seriesKey]/[productCode]
      再改成返回：
      {
        seriesKey: "q20",
        productCode: "839085"
      }
========================================================= */
export function getFittingReplacementDetailStaticParams(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.products.map((product) => {
    return {
      productCode: product.productCode,
    };
  });
}

/* =========================================================
   获取当前系列全部产品

   说明：
   1. 当前详情页静态导出用得到
   2. 后续如果列表页、索引页、站点地图需要，也可以复用
========================================================= */
export function getFittingReplacementProductsBySeries(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.products;
}

/* =========================================================
   获取当前系列型号解析规则

   说明：
   后续如果某个页面只需要型号规则，可以直接调用这个方法。
========================================================= */
export function getFittingReplacementModelRulesBySeries(
  seriesKey: FittingReplacementSeriesKey = "q20"
) {
  const dataSource = getFittingReplacementStaticDataSource(seriesKey);

  return dataSource.pageData.modelRules;
}  