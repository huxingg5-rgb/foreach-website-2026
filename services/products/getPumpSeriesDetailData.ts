/* =========================================================
   getPumpSeriesDetailData.ts
   鎭掓案杈惧畼缃戯綔娉电郴鍒楄鎯呴〉鏁版嵁鏈嶅姟灞?
   璇存槑锛?   1. 褰撳墠闃舵璇诲彇 xlsx 瑙ｆ瀽鐢熸垚鐨?generated.ts
   2. 椤甸潰缁勪欢涓嶇洿鎺ヨ鍙?generated 鏂囦欢
   3. 鍚庢湡濡傛灉鎺ユ暟鎹簱 / CMS锛屼紭鍏堟敼杩欎釜 service
   4. 鏈?service 鍙湇鍔′簬娉电郴鍒楋紝涓嶅己鍒舵墿灞曞埌鎺ュご銆侀榾銆佷紶鎰熷櫒绛変骇鍝佺嚎
   5. generated.ts 浣跨敤 as const锛屽瓧娈典細琚帹鏂垚瀛楅潰閲忕被鍨?      鎵€浠?service 灞傜粺涓€杞垚杩愯鏃舵暟鎹被鍨嬶紝閬垮厤 TypeScript 璇垽

   鏈淇锛?   1. 璇︽儏椤垫寜 slug + locale 浼樺厛鍙栨暟鎹?   2. 閬垮厤涓枃椤甸潰鎷垮埌鑻辨枃璁板綍
   3. 涓枃椤甸潰涓嶈兘 fallback 鍒拌嫳鏂?content
   4. 鑻辨枃椤甸潰鍙互 fallback 鍒颁腑鏂?content锛岄伩鍏嶆湭鏉ヨ嫳鏂囬〉缂烘暟鎹椂 404
========================================================= */

import { pumpSeriesDetailRecords } from "@/data/products/generated/pumps/pump-series.detail.generated";
import { pumpSeriesRoutes } from "@/data/products/generated/pumps/pump-series.routes.generated";
import { pumpSeriesSelectionCards } from "@/data/products/generated/pumps/pump-series.selection.generated";

export type PumpSeriesLocale = "zh" | "en";

/* =========================================================
   杩愯鏃舵暟鎹被鍨?
   璇存槑锛?   1. generated 鏂囦欢鏉ヨ嚜 xlsx 瑙ｆ瀽
   2. 杩欓噷鍏堢敤 any 鎵挎帴锛岄伩鍏?generated as const 瀵艰嚧绫诲瀷杩囩獎
   3. 鍚庣画鏁版嵁缁撴瀯绋冲畾鍚庯紝鍙互鍐嶈ˉ姝ｅ紡 TypeScript 绫诲瀷
========================================================= */
type PumpRuntimeRecord = any;

const pumpDetailRecords = pumpSeriesDetailRecords as readonly PumpRuntimeRecord[];
const pumpRoutes = pumpSeriesRoutes as readonly PumpRuntimeRecord[];
const pumpSelectionCards = pumpSeriesSelectionCards as readonly PumpRuntimeRecord[];

/* =========================================================
   澶氳瑷€澶勭悊
========================================================= */
export function normalizePumpSeriesLocale(locale?: string): PumpSeriesLocale {
  if (!locale || locale === "zh" || locale === "zh-CN") {
    return "zh";
  }

  return "en";
}

function sameSlug(item: PumpRuntimeRecord, slug: string) {
  return (
    item.slug === slug ||
    item.routeSlug === slug ||
    item.route?.routeSlug === slug ||
    item.productId === slug ||
    item.internalModelRef === slug ||
    String(item.productId || "").toLowerCase() === slug.toLowerCase() ||
    String(item.internalModelRef || "").toLowerCase() === slug.toLowerCase()
  );
}

function recordHasLocaleContent(record: PumpRuntimeRecord, locale: PumpSeriesLocale) {
  if (!record) {
    return false;
  }

  if (record.locale === locale) {
    return true;
  }

  if (record.content?.[locale]) {
    return true;
  }

  /*
    鍏煎鈥渃ontent 宸茬粡鏄綋鍓嶈瑷€鎵佸钩瀵硅薄鈥濈殑 generated 缁撴瀯銆?    涓枃璁板綍閫氬父浼氭湁涓枃 h1 / body / faq锛涜嫳鏂囪褰曢€氬父 locale = en銆?  */
  if (locale === "zh") {
    const h1 = String(record.content?.h1 || record.h1 || "");
    const title = String(record.content?.title || record.title || "");
    const desc = String(record.content?.body?.description || "");

    return /[\u4e00-\u9fa5]/.test(`${h1}${title}${desc}`);
  }

  if (locale === "en") {
    const h1 = String(record.content?.h1 || record.h1 || "");
    const title = String(record.content?.title || record.title || "");

    return /^[A-Za-z0-9\s碌渭.-]+/.test(`${h1}${title}`) && !/[\u4e00-\u9fa5]/.test(`${h1}${title}`);
  }

  return false;
}

/* =========================================================
   鑾峰彇鎵€鏈夋车绯诲垪璺敱
========================================================= */
export function getPumpSeriesStaticParams() {
  return pumpRoutes.map((item) => ({
    slug: item.routeSlug,
  }));
}

/* =========================================================
   鏍规嵁 slug 鑾峰彇娉典骇鍝佽鎯呭師濮嬭褰?
   璇存槑锛?   1. 濡傛灉浼犲叆 locale锛屼紭鍏堝尮閰?slug + locale
   2. 涓嶄紶 locale 鏃讹紝淇濈暀鏃ч€昏緫锛屾寜 slug 鎵剧涓€鏉?========================================================= */
export function getPumpSeriesDetailRecord(
  slug: string,
  locale?: string
): PumpRuntimeRecord | null {
  const matchedRecords = pumpDetailRecords.filter((item) => sameSlug(item, slug));

  if (matchedRecords.length === 0) {
    return null;
  }

  if (!locale) {
    return matchedRecords[0] || null;
  }

  const normalizedLocale = normalizePumpSeriesLocale(locale);

  const localeMatchedRecord = matchedRecords.find((item) =>
    recordHasLocaleContent(item, normalizedLocale)
  );

  if (localeMatchedRecord) {
    return localeMatchedRecord;
  }

  /*
    涓枃椤甸潰涓嶈兘闅忎究 fallback 鍒拌嫳鏂囷紝鍚﹀垯浼氬嚭鐜颁腑鏂囬〉鑻辨枃鏂囨銆?    濡傛灉鎵句笉鍒颁腑鏂囪褰曪紝杩斿洖绗竴鏉★紝璁?adapter 鍚庣画杩囨护锛涗絾涓嶄富鍔ㄩ€夎嫳鏂囥€?  */
  if (normalizedLocale === "zh") {
    const zhLikeRecord = matchedRecords.find((item) => {
      const text = JSON.stringify(item.content || item);
      return /[\u4e00-\u9fa5]/.test(text);
    });

    return zhLikeRecord || matchedRecords[0] || null;
  }

  /*
    鑻辨枃椤甸潰鏈潵鍙?fallback 鍒颁换鎰忚褰曪紝閬垮厤鑻辨枃璇︽儏椤垫殏鏈畬鍠勬椂 404銆?  */
  return matchedRecords[0] || null;
}

/* =========================================================
   鑾峰彇褰撳墠璇█璇︽儏鏁版嵁

   璇存槑锛?   1. content.zh / content.en 鏉ヨ嚜 xlsx 瑙ｆ瀽缁撴灉
   2. 椤甸潰鍙嬁褰撳墠璇█鐨?content
   3. 涓枃椤甸潰浼樺厛骞朵弗鏍艰鍙栦腑鏂?content
========================================================= */
export function getPumpSeriesDetailData(
  slug: string,
  locale?: string
): PumpRuntimeRecord | null {
  const normalizedLocale = normalizePumpSeriesLocale(locale);
  const record = getPumpSeriesDetailRecord(slug, normalizedLocale);

  if (!record) {
    return null;
  }

  let content: PumpRuntimeRecord | null = null;

  if (record.content?.[normalizedLocale]) {
    content = record.content[normalizedLocale];
  } else if (record.locale === normalizedLocale && record.content) {
    content = record.content;
  } else if (normalizedLocale === "zh") {
    /*
      涓枃椤甸潰涓嶈兘 fallback 鍒拌嫳鏂囥€?      濡傛灉娌℃湁鏍囧噯 content.zh锛屽氨灏濊瘯浣跨敤褰撳墠 content锛?      鍚庣画 adapter 浼氱户缁繃婊よ嫳鏂囧弬鏁?/ 鑻辨枃鏂囨銆?    */
    content = record.content?.zh || record.content || null;
  } else {
    content = record.content?.en || record.content?.zh || record.content || null;
  }

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
   鐢熸垚 metadata

   璇存槑锛?   1. titleTag / metaDescription 鏉ヨ嚜 xlsx
   2. canonicalPath 鏉ヨ嚜 xlsx
   3. H1 涓嶅湪 metadata 涓覆鏌擄紝H1 鐢遍〉闈㈢粍浠舵覆鏌?========================================================= */
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
   鑾峰彇娉电郴鍒楅€夊瀷鍗＄墖

   璇存槑锛?   1. 閫夊瀷鍗＄墖鏂囨鏉ヨ嚜 xlsx
   2. 杩欓噷鍙仛璇█閫夋嫨锛屼笉鍒涗綔鏂囨
========================================================= */
export function getPumpSeriesSelectionCards(locale?: string) {
  const normalizedLocale = normalizePumpSeriesLocale(locale);

  return pumpSelectionCards.map((card) => ({
    ...card,
    content:
      card.content?.[normalizedLocale] ||
      (normalizedLocale === "zh" ? card.content?.zh : card.content?.en) ||
      card.content?.zh ||
      {},
  }));
}

/* =========================================================
   鎸夋车绫诲瀷鑾峰彇閫夊瀷鍗＄墖
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
   鎸夋车绫诲瀷鑾峰彇闈欐€佽矾鐢卞弬鏁?
   绀轰緥锛?   pumpTypeSlug = plunger-pumps
========================================================= */
export function getPumpSeriesStaticParamsByType(pumpTypeSlug: string) {
  return pumpRoutes
    .filter((item) => item.pumpTypeSlug === pumpTypeSlug)
    .map((item) => ({
      slug: item.routeSlug,
    }));
}

/* =========================================================
   鎸夋车绫诲瀷鑾峰彇甯︾郴鍒楀眰绾х殑闈欐€佽矾鐢卞弬鏁?
   鏁版嵁搴撻瑙堣矾鐢辩粨鏋勶細
   /products/pumps/piston-pump/[slug]
========================================================= */
export function getPumpSeriesStaticParamsByTypeWithSeries(pumpTypeSlug: string) {
  return pumpRoutes
    .filter((item) => item.pumpTypeSlug === pumpTypeSlug)
    .map((item) => ({
      seriesSlug: item.seriesSlug,
      slug: item.routeSlug,
    }));
}
