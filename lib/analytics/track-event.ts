/* =========================================================
   lib/analytics/track-event.ts

   FOREACH 官网统一 GA4 事件追踪工具。

   重要规则：
   1. 只有用户允许分析 Cookie 后才发送事件。
   2. 不向 GA4 发送姓名、邮箱、电话、地址或留言内容。
   3. 产品使用稳定 item_id，不依赖翻译后的产品名称。
   4. GA4 尚未加载时，事件会暂存在当前页面内存中。
========================================================= */

import { readCookieConsent } from "@/lib/privacy/cookie-consent";

type GtagFunction = (
  command: "event",
  eventName: string,
  parameters?: Record<string, unknown>,
) => void;

type PendingAnalyticsEvent = {
  eventName: string;
  parameters: Record<string, unknown>;
};

export type AnalyticsItem = {
  item_id: string;
  item_name?: string;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  index?: number;
};

export type ProductAnalyticsInput = {
  productId: string;
  productName?: string;
  category?: string;
  subcategory?: string;
  series?: string;
  variant?: string;
  listId?: string;
  listName?: string;
  index?: number;
  locale: string;
};

const MAX_PENDING_EVENTS = 50;

const pendingEvents: PendingAnalyticsEvent[] = [];

/**
 * 判断当前是否处于浏览器环境。
 */
function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
}

/**
 * 判断用户是否明确允许分析 Cookie。
 */
function isAnalyticsAllowed() {
  if (!isBrowser()) {
    return false;
  }

  return readCookieConsent()?.analytics === true;
}

/**
 * 获取当前页面中的 gtag 函数。
 */
function getGtag() {
  if (!isBrowser()) {
    return null;
  }

  const possibleGtag = Reflect.get(window, "gtag");

  return typeof possibleGtag === "function"
    ? (possibleGtag as GtagFunction)
    : null;
}

/**
 * 删除 undefined、null 和空字符串参数，
 * 避免向 GA4 发送没有意义的数据。
 */
function cleanParameters(
  parameters: Record<string, unknown>,
) {
  return Object.fromEntries(
    Object.entries(parameters).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "",
    ),
  );
}

/**
 * 标准化产品数据。
 */
function createAnalyticsItem(
  input: ProductAnalyticsInput,
): AnalyticsItem {
  return cleanParameters({
    item_id: input.productId,
    item_name: input.productName,
    item_brand: "FOREACH",
    item_category: input.category,
    item_category2: input.subcategory,
    item_category3: input.series,
    item_variant: input.variant,
    item_list_id: input.listId,
    item_list_name: input.listName,
    index: input.index,
  }) as AnalyticsItem;
}

/**
 * 发送事件。
 *
 * 当用户已同意，但 GA4 脚本尚未加载完成时，
 * 先把事件保存在当前页面内存中。
 */
function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {},
) {
  if (!isAnalyticsAllowed()) {
    return;
  }

  const cleanedParameters =
    cleanParameters(parameters);

  const gtag = getGtag();

  if (!gtag) {
    if (pendingEvents.length >= MAX_PENDING_EVENTS) {
      pendingEvents.shift();
    }

    pendingEvents.push({
      eventName,
      parameters: cleanedParameters,
    });

    return;
  }

  gtag(
    "event",
    eventName,
    cleanedParameters,
  );
}

/**
 * GA4 完成加载后发送暂存事件。
 */
export function flushPendingAnalyticsEvents() {
  if (!isAnalyticsAllowed()) {
    pendingEvents.length = 0;
    return;
  }

  const gtag = getGtag();

  if (!gtag) {
    return;
  }

  const eventsToSend =
    pendingEvents.splice(0, pendingEvents.length);

  for (const event of eventsToSend) {
    gtag(
      "event",
      event.eventName,
      event.parameters,
    );
  }
}

/**
 * 产品列表展示。
 */
export function trackProductListView(input: {
  listId: string;
  listName: string;
  locale: string;
  products: ProductAnalyticsInput[];
}) {
  if (input.products.length === 0) {
    return;
  }

  trackEvent("view_item_list", {
    item_list_id: input.listId,
    item_list_name: input.listName,
    locale: input.locale,
    items: input.products.map(createAnalyticsItem),
  });
}

/**
 * 用户从产品列表或推荐区域点击产品。
 */
export function trackProductSelect(
  input: ProductAnalyticsInput,
) {
  trackEvent("select_item", {
    item_list_id: input.listId,
    item_list_name: input.listName,
    locale: input.locale,
    items: [createAnalyticsItem(input)],
  });
}

/**
 * 用户浏览产品详情页。
 */
export function trackProductView(
  input: ProductAnalyticsInput,
) {
  trackEvent("view_item", {
    locale: input.locale,
    items: [createAnalyticsItem(input)],
  });
}

/**
 * 用户执行站内搜索。
 *
 * searchTerm 只允许传递站内搜索关键词，
 * 不要传递姓名、邮箱、电话或询盘内容。
 */
export function trackSiteSearch(input: {
  searchTerm: string;
  searchLocation: string;
  locale: string;
  resultCount?: number;
}) {
  const normalizedSearchTerm =
    input.searchTerm.trim().slice(0, 100);

  if (!normalizedSearchTerm) {
    return;
  }

  trackEvent("search", {
    search_term: normalizedSearchTerm,
    search_location: input.searchLocation,
    locale: input.locale,
    result_count: input.resultCount,
  });
}

/**
 * 询盘成功。
 *
 * 这里只记录表单类型和来源，
 * 不记录姓名、邮箱、电话、公司和留言正文。
 */
export function trackLeadGenerated(input: {
  formId: string;
  formType: string;
  sourceSection: string;
  locale: string;
  productId?: string;
  productCategory?: string;
}) {
  trackEvent("generate_lead", {
    form_id: input.formId,
    form_type: input.formType,
    source_section: input.sourceSection,
    locale: input.locale,
    product_id: input.productId,
    product_category: input.productCategory,
  });
}

/**
 * 规格书、图纸或其他资源下载。
 *
 * 使用自定义 resource_download，
 * 避免与 GA4 自动采集的 file_download 重复。
 */
export function trackResourceDownload(input: {
  resourceId: string;
  resourceType: string;
  fileType: string;
  sourceSection: string;
  locale: string;
  productId?: string;
}) {
  trackEvent("resource_download", {
    resource_id: input.resourceId,
    resource_type: input.resourceType,
    file_type: input.fileType,
    source_section: input.sourceSection,
    locale: input.locale,
    product_id: input.productId,
  });
}

/**
 * 用户点击联系方式。
 */
export function trackContactClick(input: {
  contactChannel:
    | "email"
    | "phone"
    | "whatsapp"
    | "wechat"
    | "contact_form"
    | "other";
  sourceSection: string;
  locale: string;
  productId?: string;
}) {
  trackEvent("contact_click", {
    contact_channel: input.contactChannel,
    source_section: input.sourceSection,
    locale: input.locale,
    product_id: input.productId,
  });
}

/**
 * 用户切换网站语言。
 */
export function trackLanguageChange(input: {
  fromLocale: string;
  toLocale: string;
  sourceSection: string;
}) {
  trackEvent("language_change", {
    from_locale: input.fromLocale,
    to_locale: input.toLocale,
    source_section: input.sourceSection,
  });
}