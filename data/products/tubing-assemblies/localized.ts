import type { Metadata } from "next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ko from "./locales/ko.json";
import ru from "./locales/ru.json";
import media from "./media.json";
import mediaDimensions from "./media-dimensions.json";
import { isPublishedAssemblyConfiguration, isPublishedAssemblyPath } from "./publication";
import { allTubingAssemblyLocales, getTubingAssemblyLocalePrefix, type TubingAssemblyLocale } from "./locales";
import { tubingAssemblyReviewCards, tubingAssemblyReviewTypeNames } from "../tubing-assembly-cards.review.zh";
import { tubingAssemblyOverviewReview, tubingAssemblyTypeIntrosReview, tubingAssemblyIntroImages } from "../tubing-assembly-intros.review.zh";
import { getAssemblyReviewDetail, getAssemblySharedDetailData, type AssemblyFamily, type AssemblyConfiguration } from "../detail/tubing-assemblies.review.zh";
import { getCanonicalUrl } from "@/lib/seo/site-url";

const dictionaries: Record<Exclude<TubingAssemblyLocale, "zh-CN">, Record<string, string>> = { en, es, fr, ko, ru };

/** Approved review content supplies shared facts; dictionaries supply presentation only. */
export function translateTubingAssembly(locale: TubingAssemblyLocale, text: string): string {
  if (/[\u3400-\u9fff]/.test(text)) {
    if (locale === "zh-CN") return text;
    const translated = dictionaries[locale][text];
    if (!translated) throw new Error(`Missing tubing assembly translation (${locale}): ${text}`);
    return translated;
  }
  if (text in media) return media[text as keyof typeof media];
  return text.replace(/^\/en\//, `${getTubingAssemblyLocalePrefix(locale)}/`);
}

function localize<T>(value: T, locale: TubingAssemblyLocale): T {
  if (typeof value === "string") return translateTubingAssembly(locale, value) as T;
  if (Array.isArray(value)) return value.map(item => localize(item, locale)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)])) as T;
  return value;
}

const uiSource = {
  home: "首页", products: "产品中心", category: "管组件", pumps: "泵", valves: "阀", probes: "采样针", fittings: "接头", tubing: "管材", control: "控制模块",
  productType: "产品类型", product: "产品", searchPlaceholder: "按产品名称、系列、材质、螺纹或关键词搜索", search: "搜索", currentCategory: "当前分类：", showLess: "收起", showMore: "查看更多", noFilters: "暂无筛选项。", clearFilters: "清除筛选", emptyTitle: "暂无匹配产品", emptyDescription: "请更换关键词或清除筛选，查看全部管组件。", details: "查看详情", added: "已加入", addToList: "加入清单", parameters: "组件参数", materialOd: "管材 / 外径（mm）", od: "管外径（mm）", id: "对应管内径（mm）",
};
const customizationSource = {
  title: "定制申请", description: "请留下联系信息及简单的定制需求，我们会与您联系确认。", summary: "确认申请产品并填写联系信息，验证码将发送至您的邮箱。", emailPlaceholder: "请输入联系邮箱", notes: "定制需求", notesPlaceholder: "可简单说明管径、长度、连接方式或其他需求。", back: "返回", submit: "提交定制申请", successTitle: "定制申请已提交", successDescription: "我们会根据您填写的信息与您联系，确认具体定制需求。", emptyTitle: "未选择申请产品", emptyDescription: "请返回产品详情页选择需要定制的管组件。", productType: "管组件", quantity: "数量", projectStage: "定制需求确认", requestType: "管组件定制申请",
};
const unavailableModels: Record<TubingAssemblyLocale, string> = {
  "zh-CN": "该定制管组件暂无公开 3D 模型，请联系我们确认所需配置。",
  en: "No public 3D model is available for this custom tubing assembly. Contact us to confirm the required configuration.",
  es: "No hay un modelo 3D público para este conjunto de tubos a medida. Contáctenos para confirmar la configuración necesaria.",
  fr: "Aucun modèle 3D public n’est disponible pour cet assemblage de tubes sur mesure. Contactez-nous pour confirmer la configuration souhaitée.",
  ko: "이 맞춤 튜빙 어셈블리의 공개 3D 모델은 제공되지 않습니다. 필요한 구성을 확인하려면 문의해 주세요.",
  ru: "Общедоступная 3D-модель этой трубной сборки на заказ отсутствует. Свяжитесь с нами для согласования конфигурации.",
};
export type TubingAssemblyUi = typeof uiSource;
export type TubingCustomizationCopy = typeof customizationSource;

export function getTubingAssemblySelectionContent(locale: TubingAssemblyLocale) {
  return {
    locale,
    ui: localize(uiSource, locale),
    cards: localize(tubingAssemblyReviewCards, locale).filter(card => card.detailHref && isPublishedAssemblyPath(card.detailHref)).map(card => {
      const dimensions = mediaDimensions[card.imageCard as keyof typeof mediaDimensions];
      return { ...card, imageWidth: dimensions?.width, imageHeight: dimensions?.height };
    }),
    typeNames: localize(tubingAssemblyReviewTypeNames, locale),
    overview: localize(tubingAssemblyOverviewReview, locale),
    intros: localize(tubingAssemblyTypeIntrosReview, locale),
    introImages: localize(tubingAssemblyIntroImages, locale),
  };
}
export type TubingAssemblySelectionContent = ReturnType<typeof getTubingAssemblySelectionContent>;

export function getLocalizedAssemblyDetail(locale: TubingAssemblyLocale, family: AssemblyFamily, configuration?: AssemblyConfiguration) {
  if (configuration && !isPublishedAssemblyConfiguration(family, configuration)) {
    throw new Error(`Unpublished tubing assembly: ${family}/${configuration}`);
  }
  const result = localize(getAssemblySharedDetailData(getAssemblyReviewDetail(family, configuration)), locale);
  result.__locale = locale;
  delete result.__reviewLocale;
  if (!configuration) result.description = `${result.h1Title}${locale === "zh-CN" ? "。" : ". "}${result.description}`;
  result.tubingAssemblyUi = { ...localize(uiSource, locale), modelUnavailable: unavailableModels[locale] };
  result.tubingCustomizationCopy = localize(customizationSource, locale);
  result.bottomCtaTitle = translateTubingAssembly(locale, "提交定制需求");
  result.bottomCtaDescription = translateTubingAssembly(locale, "请准备装配图、端口图纸或 BOM，以及样品数量、批量需求和验收要求。");
  result.bottomCtaDesc = result.bottomCtaDescription;
  result.bottomCtaButtonText = translateTubingAssembly(locale, "定制申请");
  result.bottomCtaButton = result.bottomCtaButtonText;
  result.bottomCtaHref = `${getTubingAssemblyLocalePrefix(locale)}/contact/`;
  return result;
}

export function getTubingAssemblyAlternates(path: string) {
  const neutral = path.replace(/^\/(?:en|es|fr|ko|ru)\//, "/");
  return Object.fromEntries([
    ...allTubingAssemblyLocales.map(locale => [locale, getCanonicalUrl(`${getTubingAssemblyLocalePrefix(locale)}${neutral}`)]),
    ["x-default", getCanonicalUrl(`/en${neutral}`)],
  ]);
}

export function getLocalizedAssemblyMetadata(locale: TubingAssemblyLocale, family?: AssemblyFamily, configuration?: AssemblyConfiguration, detail = false): Metadata {
  const content = getTubingAssemblySelectionContent(locale);
  const data = detail && family ? getLocalizedAssemblyDetail(locale, family, configuration) : undefined;
  const intro = family ? content.intros[family] : content.overview;
  const title = `${data?.h1Title ?? intro.title} | FOREACH`;
  const description = String(data?.description ?? intro.paragraphs[0]);
  const path = String(data?.detailHref ?? `${getTubingAssemblyLocalePrefix(locale)}/products/tubing-assemblies/${family ? `${family}/` : ""}`);
  const url = getCanonicalUrl(path);
  const image = data?.mainImage ?? (family ? content.introImages[family]?.src : content.introImages["flanged-tubing"]?.src);
  const ogLocale = { "zh-CN": "zh_CN", en: "en_US", es: "es_ES", fr: "fr_FR", ko: "ko_KR", ru: "ru_RU" }[locale];
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: getTubingAssemblyAlternates(path) },
    openGraph: { title, description, url, type: "website", locale: ogLocale, images: image ? [image] : [] },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
  };
}
