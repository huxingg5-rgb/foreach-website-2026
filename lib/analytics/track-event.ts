/* =========================================================
   FOREACH 官网统一 GA4 事件工具

   - Consent Mode 为 denied 时仍允许发送无 Cookie 测量。
   - Google Tag 完成 config 前，事件只保存在当前页面内存队列。
   - 所有对外函数只接受业务所需的低维度参数，不接受表单正文或客户身份字段。
========================================================= */

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

export type InquiryErrorType =
  | "validation_error"
  | "captcha_error"
  | "attachment_error"
  | "network_error"
  | "api_error"
  | "rate_limit"
  | "unknown";

const MAX_PENDING_EVENTS = 50;
const PENDING_EVENTS_KEY = "__foreachPendingAnalyticsEvents";

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/*
 * Client components can load this module through different App Router chunks.
 * Keep one queue on the current page so the Google Analytics component always
 * flushes the same events that product components queued before GA was ready.
 */
function getPendingAnalyticsEvents(): PendingAnalyticsEvent[] {
  if (!isBrowser()) return [];

  const existingQueue = Reflect.get(window, PENDING_EVENTS_KEY);
  if (Array.isArray(existingQueue)) {
    return existingQueue as PendingAnalyticsEvent[];
  }

  const pendingEvents: PendingAnalyticsEvent[] = [];
  Reflect.set(window, PENDING_EVENTS_KEY, pendingEvents);
  return pendingEvents;
}

/**
 * 只有 GoogleAnalytics 完成 consent update + config 后才返回 gtag。
 * 单纯存在 window.gtag 只代表命令队列已创建，不能提前发送业务事件。
 */
function getReadyGtag() {
  if (!isBrowser() || Reflect.get(window, "__foreachGaReady") !== true) {
    return null;
  }

  const possibleGtag = Reflect.get(window, "gtag");

  return typeof possibleGtag === "function"
    ? (possibleGtag as GtagFunction)
    : null;
}

function cleanValue(value: unknown): unknown {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  }

  if (Array.isArray(value)) {
    const cleanedItems = value
      .map(cleanValue)
      .filter((item) => item !== undefined);

    return cleanedItems.length > 0 ? cleanedItems : undefined;
  }

  if (typeof value === "object") {
    const cleanedObject = cleanParameters(value as Record<string, unknown>);
    return Object.keys(cleanedObject).length > 0 ? cleanedObject : undefined;
  }

  return value;
}

function cleanParameters(parameters: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, cleanValue(value)] as const)
      .filter(([, value]) => value !== undefined),
  );
}

function createAnalyticsItem(input: ProductAnalyticsInput): AnalyticsItem {
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

function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {},
) {
  if (!isBrowser()) {
    return;
  }

  const cleanedParameters = cleanParameters(parameters);
  const gtag = getReadyGtag();

  if (!gtag) {
    const pendingEvents = getPendingAnalyticsEvents();

    if (pendingEvents.length >= MAX_PENDING_EVENTS) {
      pendingEvents.shift();
    }

    pendingEvents.push({
      eventName,
      parameters: cleanedParameters,
    });
    return;
  }

  gtag("event", eventName, cleanedParameters);
}

/** Google Tag 完成 config 后发送当前页面内存中的全部待发送事件。 */
export function flushPendingAnalyticsEvents() {
  const gtag = getReadyGtag();

  if (!gtag) {
    return;
  }

  const pendingEvents = getPendingAnalyticsEvents();
  const eventsToSend = pendingEvents.splice(0, pendingEvents.length);

  for (const event of eventsToSend) {
    gtag("event", event.eventName, event.parameters);
  }
}

const POSSIBLE_EMAIL_PATTERN =
  /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+/i;

/*
 * 电话候选至少包含 7 位数字，数字之间只允许常见电话分隔符。
 * 因此 DPL30、300ml、Q2001-PMV-SACN 等少量数字产品型号不会命中，
 * 而连续数字、空格、短横线、括号和国家区号格式都会被拦截。
 */
const POSSIBLE_PHONE_PATTERN = /\+?(?:[\s().-]*\d){7,}[\s().-]*/;

function sanitizeSearchTerm(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ");

  if (!normalized || POSSIBLE_EMAIL_PATTERN.test(normalized)) {
    return "";
  }

  if (POSSIBLE_PHONE_PATTERN.test(normalized)) {
    return "";
  }

  return normalized.slice(0, 100);
}

function normalizeFilterValue(value: string | string[]) {
  const values = Array.isArray(value) ? value : [value];
  return values.map((item) => item.trim()).filter(Boolean).sort().join("|");
}

export function trackProductListView(input: {
  listId: string;
  listName: string;
  locale: string;
  products: ProductAnalyticsInput[];
}) {
  if (input.products.length === 0) return;

  trackEvent("view_item_list", {
    item_list_id: input.listId,
    item_list_name: input.listName,
    locale: input.locale,
    items: input.products.map(createAnalyticsItem),
  });
}

export function trackProductSelect(input: ProductAnalyticsInput) {
  trackEvent("select_item", {
    item_list_id: input.listId,
    item_list_name: input.listName,
    locale: input.locale,
    items: [createAnalyticsItem(input)],
  });
}

export function trackProductView(input: ProductAnalyticsInput) {
  trackEvent("view_item", {
    locale: input.locale,
    items: [createAnalyticsItem(input)],
  });
}

export function trackFilterApply(input: {
  filterCategory: string;
  filterName: string;
  filterValue: string | string[];
  resultCount: number;
  sourceSection: string;
  locale: string;
}) {
  const normalizedValue = normalizeFilterValue(input.filterValue);
  if (!normalizedValue) return;

  trackEvent("filter_apply", {
    filter_category: input.filterCategory,
    filter_name: input.filterName,
    filter_value: normalizedValue,
    result_count: input.resultCount,
    source_section: input.sourceSection,
    locale: input.locale,
  });
}

export function trackProductTabSelect(input: {
  tabName:
    | "specifications"
    | "3d"
    | "2d"
    | "datasheet"
    | "faq"
    | "other";
  productId: string;
  productCategory?: string;
  productSeries?: string;
  locale: string;
}) {
  trackEvent("product_tab_select", {
    tab_name: input.tabName,
    product_id: input.productId,
    product_category: input.productCategory,
    product_series: input.productSeries,
    locale: input.locale,
  });
}

export function trackSiteSearch(input: {
  searchTerm: string;
  searchLocation: string;
  locale: string;
  resultCount?: number;
}) {
  const searchTerm = sanitizeSearchTerm(input.searchTerm);
  if (!searchTerm) return;

  trackEvent("search", {
    search_term: searchTerm,
    search_location: input.searchLocation,
    locale: input.locale,
    result_count: input.resultCount,
  });
}

export function trackSearchNoResults(input: {
  searchTerm: string;
  searchLocation: string;
  locale: string;
}) {
  const searchTerm = sanitizeSearchTerm(input.searchTerm);
  if (!searchTerm) return;

  trackEvent("search_no_results", {
    search_term: searchTerm,
    search_location: input.searchLocation,
    locale: input.locale,
  });
}

type InquiryListProductInput = {
  productId: string;
  productName?: string;
  productCategory?: string;
  productSeries?: string;
};

function createInquiryItem(input: InquiryListProductInput) {
  return createAnalyticsItem({
    productId: input.productId,
    productName: input.productName,
    category: input.productCategory,
    series: input.productSeries,
    locale: "",
  });
}

export function trackAddToInquiryList(input: InquiryListProductInput & {
  locale: string;
  sourceSection: string;
  listSize: number;
}) {
  trackEvent("add_to_inquiry_list", {
    locale: input.locale,
    source_section: input.sourceSection,
    list_size: input.listSize,
    product_id: input.productId,
    product_category: input.productCategory,
    product_series: input.productSeries,
    items: [createInquiryItem(input)],
  });
}

export function trackRemoveFromInquiryList(input: InquiryListProductInput & {
  locale: string;
  sourceSection: string;
  listSize: number;
}) {
  trackEvent("remove_from_inquiry_list", {
    locale: input.locale,
    source_section: input.sourceSection,
    list_size: input.listSize,
    product_id: input.productId,
    product_category: input.productCategory,
    product_series: input.productSeries,
    items: [createInquiryItem(input)],
  });
}

export function trackInquiryListView(input: {
  locale: string;
  sourceSection: string;
  products: InquiryListProductInput[];
}) {
  trackEvent("view_inquiry_list", {
    locale: input.locale,
    source_section: input.sourceSection,
    list_size: input.products.length,
    items: input.products.map(createInquiryItem),
  });
}

export function trackBeginInquiry(input: {
  formId: string;
  formType: string;
  sourceSection: string;
  locale: string;
  itemCount?: number;
  productId?: string;
  productCategory?: string;
}) {
  trackEvent("begin_inquiry", {
    form_id: input.formId,
    form_type: input.formType,
    source_section: input.sourceSection,
    locale: input.locale,
    item_count: input.itemCount,
    product_id: input.productId,
    product_category: input.productCategory,
  });
}

export function trackFormStart(input: {
  formId: string;
  formType: string;
  sourceSection: string;
  locale: string;
  itemCount?: number;
}) {
  trackEvent("form_start", {
    form_id: input.formId,
    form_type: input.formType,
    source_section: input.sourceSection,
    locale: input.locale,
    item_count: input.itemCount,
  });
}

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

export function trackInquirySubmitError(input: {
  formId: string;
  formType: string;
  sourceSection: string;
  locale: string;
  errorType: InquiryErrorType;
  submissionStage: string;
}) {
  trackEvent("inquiry_submit_error", {
    form_id: input.formId,
    form_type: input.formType,
    source_section: input.sourceSection,
    locale: input.locale,
    error_type: input.errorType,
    submission_stage: input.submissionStage,
  });
}

export function trackResourceView(input: {
  resourceId: string;
  resourceType: string;
  fileType: string;
  sourceSection: string;
  locale: string;
  productId?: string;
}) {
  trackEvent("resource_view", {
    resource_id: input.resourceId,
    resource_type: input.resourceType,
    file_type: input.fileType,
    source_section: input.sourceSection,
    locale: input.locale,
    product_id: input.productId,
  });
}

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

export function trackContentSelect(input: {
  contentType: string;
  contentId: string;
  contentName?: string;
  sourceSection: string;
  locale: string;
}) {
  trackEvent("select_content", {
    content_type: input.contentType,
    content_id: input.contentId,
    content_name: input.contentName,
    source_section: input.sourceSection,
    locale: input.locale,
  });
}

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

export function trackLanguageChange(input: {
  fromLocale: string;
  toLocale: string;
  sourceSection: string;
}) {
  if (input.fromLocale === input.toLocale) return;

  trackEvent("language_change", {
    from_locale: input.fromLocale,
    to_locale: input.toLocale,
    source_section: input.sourceSection,
  });
}
