/* =========================================================
   getPumpSeriesDetailData.ts
   恒永达官网｜泵系列详情页数据服务层

   说明：
   1. 当前阶段读取 xlsx 解析生成的 generated.ts
   2. 页面组件不直接读取 generated 文件
   3. 后期如果接数据库 / CMS，优先改这个 service
   4. 本 service 只服务于泵系列，不强制扩展到接头、阀、传感器等产品线
   5. generated.ts 使用 as const，字段会被推断成字面量类型
      所以 service 层统一转成运行时数据类型，避免 TypeScript 误判
========================================================= */

import { pumpSeriesDetailRecords } from "@/data/products/generated/pumps/pump-series.detail.generated";
import { pumpSeriesRoutes } from "@/data/products/generated/pumps/pump-series.routes.generated";
import { pumpSeriesSelectionCards } from "@/data/products/generated/pumps/pump-series.selection.generated";

export type PumpSeriesLocale = "zh" | "en";

/* =========================================================
   运行时数据类型

   说明：
   1. generated 文件来自 xlsx 解析
   2. 这里先用 any 承接，避免 generated as const 导致类型过窄
   3. 后续数据结构稳定后，可以再补正式 TypeScript 类型
========================================================= */
type PumpRuntimeRecord = any;

const pumpDetailRecords = pumpSeriesDetailRecords as readonly PumpRuntimeRecord[];
const pumpRoutes = pumpSeriesRoutes as readonly PumpRuntimeRecord[];
const pumpSelectionCards = pumpSeriesSelectionCards as readonly PumpRuntimeRecord[];

/* =========================================================
   多语言处理
========================================================= */
export function normalizePumpSeriesLocale(locale?: string): PumpSeriesLocale {
  if (!locale || locale === "zh" || locale === "zh-CN") {
    return "zh";
  }

  return "en";
}

/* =========================================================
   获取所有泵系列路由
========================================================= */
export function getPumpSeriesStaticParams() {
  return pumpRoutes.map((item) => ({
    slug: item.routeSlug,
  }));
}

/* =========================================================
   根据 slug 获取泵产品详情原始记录
========================================================= */
export function getPumpSeriesDetailRecord(slug: string): PumpRuntimeRecord | null {
  const record = pumpDetailRecords.find((item) => {
    return (
      item.slug === slug ||
      item.routeSlug === slug ||
      item.route?.routeSlug === slug
    );
  });

  return record || null;
}

/* =========================================================
   获取当前语言详情数据

   说明：
   1. content.zh / content.en 来自 xlsx 解析结果
   2. 页面只拿当前语言的 content
========================================================= */
export function getPumpSeriesDetailData(
  slug: string,
  locale?: string
): PumpRuntimeRecord | null {
  const record = getPumpSeriesDetailRecord(slug);

  if (!record) {
    return null;
  }

  const normalizedLocale = normalizePumpSeriesLocale(locale);
  const content =
    record.content?.[normalizedLocale] ||
    record.content?.en ||
    record.content?.zh;

  if (!content) {
    return null;
  }

  return {
    ...record,
    locale: normalizedLocale,
    content,
  };
}

/* =========================================================
   生成 metadata

   说明：
   1. titleTag / metaDescription 来自 xlsx
   2. canonicalPath 来自 xlsx
   3. H1 不在 metadata 中渲染，H1 由页面组件渲染
========================================================= */
export function getPumpSeriesMetadata(slug: string, locale?: string) {
  const data = getPumpSeriesDetailData(slug, locale) as PumpRuntimeRecord | null;

  if (!data) {
    return null;
  }

  const seo = data.content?.seo || {};
  const titleTag = seo.titleTag || data.content?.h1 || data.content?.title || "";
  const metaDescription = seo.metaDescription || "";
  const canonicalPath = seo.canonicalPath || data.route?.canonicalPath || "";

  return {
    title: titleTag,
    description: metaDescription,
    alternates: {
      canonical: canonicalPath,
    },
    robots: seo.robots || "index,follow",
    openGraph: {
      title: seo.ogTitle || titleTag,
      description: seo.ogDescription || metaDescription,
    },
  };
}

/* =========================================================
   获取泵系列选型卡片

   说明：
   1. 选型卡片文案来自 xlsx
   2. 这里只做语言选择，不创作文案
========================================================= */
export function getPumpSeriesSelectionCards(locale?: string) {
  const normalizedLocale = normalizePumpSeriesLocale(locale);

  return pumpSelectionCards.map((card) => ({
    ...card,
    content:
      card.content?.[normalizedLocale] ||
      card.content?.en ||
      card.content?.zh ||
      {},
  }));
}

/* =========================================================
   按泵类型获取选型卡片
========================================================= */
export function getPumpSeriesSelectionCardsByType(
  pumpTypeSlug: string,
  locale?: string
) {
  return getPumpSeriesSelectionCards(locale).filter((card) => {
    return card.pumpTypeSlug === pumpTypeSlug;
  });
}

/* =========================================================
   按泵类型获取静态路由参数

   示例：
   pumpTypeSlug = plunger-pumps
========================================================= */
export function getPumpSeriesStaticParamsByType(pumpTypeSlug: string) {
  return pumpRoutes
    .filter((item) => item.pumpTypeSlug === pumpTypeSlug)
    .map((item) => ({
      slug: item.routeSlug,
    }));
}

/* =========================================================
   按泵类型获取带系列层级的静态路由参数

   数据库预览路由结构：
   /products/pumps-db/[pumpTypeSlug]/[seriesSlug]/[slug]
========================================================= */
export function getPumpSeriesStaticParamsByTypeWithSeries(pumpTypeSlug: string) {
  return pumpRoutes
    .filter((item) => item.pumpTypeSlug === pumpTypeSlug)
    .map((item) => ({
      seriesSlug: item.seriesSlug,
      slug: item.routeSlug,
    }));
}
