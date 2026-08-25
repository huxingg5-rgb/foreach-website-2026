/* =========================================================
   TechnicalArticleDetail.tsx
   恒永达官网｜技术文章详情页适配组件

   说明：
   1. 技术文章仍然保留自己的栏目和 URL
   2. 打开后的详情页直接复用新闻中心 NewsArticleClient
   3. 不再维护独立的技术文章详情页样式
   4. 面包屑只显示栏目层级，不显示完整文章标题
========================================================= */

import type { ComponentType } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import RelatedResources from "@/components/common/related-resources/RelatedResources";
import NewsArticleClient from "@/components/resources/news/NewsArticleClient";
import BrushlessDiaphragmPumpWiringArticle from "@/components/resources/technical-articles/articles/BrushlessDiaphragmPumpWiringArticle";
import CvKvMicrofluidicsArticle from "@/components/resources/technical-articles/articles/CvKvMicrofluidicsArticle";
import DiaphragmPumpEngineeringArticle from "@/components/resources/technical-articles/articles/DiaphragmPumpEngineeringArticle";
import Dpl30LiquidDiaphragmPumpArticle from "@/components/resources/technical-articles/articles/Dpl30LiquidDiaphragmPumpArticle";
import {
  brushlessWiringArticleSlug,
  getBrushlessWiringArticleCopy,
  getBrushlessWiringArticleFaq,
} from "@/data/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire.article";
import {
  getDpl30ArticleFaq,
} from "@/data/resources/technical-articles/dpl30-liquid-diaphragm-pump.article";
import {
  brushedVsBrushlessDiaphragmPumpMotorLifeSlug,
  diaphragmPumpFlowPressureCurveSlug,
  getDiaphragmPumpEngineeringArticleCopy,
  getDiaphragmPumpEngineeringArticleFaq,
  isDiaphragmPumpEngineeringArticleSlug,
  lifeScienceInstrumentDpl60SelectionSlug,
  microDiaphragmPumpContinuousDutyLifeSlug,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-articles.article";
import {
  dpl60StandardModels,
  getDpl60ArticleFaq,
} from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.article";
import {
  dpgl800StandardModels,
} from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.article";
import {
  dpl30hStandardModels,
} from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.article";
import { getProductDetailTitleOverride } from "@/data/products/detail/product-detail-title-overrides";

import type {
  TechnicalArticleItem,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

type SupportedLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

export type TechnicalArticlePagerItem = {
  title: string;
  href: string;
  date?: string;
};

interface TechnicalArticleDetailProps {
  pageData: TechnicalArticlesPageData;
  article: TechnicalArticleItem;
  previousArticle?: TechnicalArticlePagerItem | null;
  nextArticle?: TechnicalArticlePagerItem | null;
}

type SharedComponentProps = Record<string, unknown>;

type TechnicalArticleFaqItem = {
  question: string;
  answer: string;
};

type TechnicalArticleSubject = {
  about: readonly string[];
  mentions: readonly string[];
};

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

const TECHNICAL_ARTICLE_SITE_ORIGIN = "https://www.foreachtek.com";

function toAbsoluteTechnicalArticleUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${TECHNICAL_ARTICLE_SITE_ORIGIN}${value.startsWith("/") ? value : `/${value}`}`;
}

function getTechnicalArticleCanonicalUrl(
  locale: SupportedLocale,
  slug: string,
) {
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;

  return `${TECHNICAL_ARTICLE_SITE_ORIGIN}${localePrefix}/resources/technical-articles/${slug}/`;
}

function buildTechnicalArticleStructuredData(
  pageData: TechnicalArticlesPageData,
  article: TechnicalArticleItem,
  locale: SupportedLocale,
  faqItems: readonly TechnicalArticleFaqItem[] = [],
  subject?: TechnicalArticleSubject,
  articleType: "Article" | "TechArticle" = "Article",
) {
  const canonicalUrl = getTechnicalArticleCanonicalUrl(locale, article.slug);
  const organizationId = `${TECHNICAL_ARTICLE_SITE_ORIGIN}/#organization`;
  const websiteId = `${TECHNICAL_ARTICLE_SITE_ORIGIN}/#website`;
  const webpageId = canonicalUrl;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const articleId = `${canonicalUrl}#article`;
  const description = String(
    article.seoDescription ?? article.summary ?? "",
  ).trim();
  const categoryLabel =
    pageData.categories.find((item) => item.key === article.category)?.label ??
    pageData.sectionTitle;
  const breadcrumbItems = pageData.breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href
      ? { item: toAbsoluteTechnicalArticleUrl(item.href) }
      : index === pageData.breadcrumbs.length - 1
        ? { item: toAbsoluteTechnicalArticleUrl(getArticleListHref(locale)) }
        : {}),
  }));

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: article.title,
    item: canonicalUrl,
  });

  const articleData: Record<string, unknown> = {
    "@type": articleType,
    "@id": articleId,
    url: canonicalUrl,
    headline: article.title,
    ...(description ? { description } : {}),
    ...(article.coverImage
      ? { image: toAbsoluteTechnicalArticleUrl(article.coverImage) }
      : {}),
    ...(article.date ? { datePublished: article.date } : {}),
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": webpageId,
    },
    inLanguage: locale,
    articleSection: categoryLabel,
    isAccessibleForFree: true,
    ...(subject?.about.length
      ? {
          about: subject.about.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
    ...(subject?.mentions.length
      ? {
          mentions: subject.mentions.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
  };

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Shenzhen FOREACH Technology Co., Ltd.",
      url: `${TECHNICAL_ARTICLE_SITE_ORIGIN}/`,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${TECHNICAL_ARTICLE_SITE_ORIGIN}/`,
      name: "FOREACH",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbItems,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: canonicalUrl,
      name: article.title,
      ...(description ? { description } : {}),
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      publisher: { "@id": organizationId },
      breadcrumb: { "@id": breadcrumbId },
      mainEntity: { "@id": articleId },
    },
    articleData,
  ];

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      isPartOf: { "@id": webpageId },
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function normalizeLocale(locale: string): SupportedLocale {
  if (
    locale === "en" ||
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
  ) {
    return locale;
  }

  return "zh-CN";
}

function getArticleListHref(locale: SupportedLocale) {
  if (locale === "zh-CN") {
    return "/resources/technical-articles";
  }

  return `/${locale}/resources/technical-articles`;
}

function getBackText(locale: SupportedLocale) {
  if (locale === "en") return "Back";
  if (locale === "es") return "Volver";
  if (locale === "fr") return "Retour";
  if (locale === "ko") return "뒤로";
  if (locale === "ru") return "Назад";
  return "返回";
}

const DPL30_MENTIONED_MODELS = [
  "DPL30-24DB-EP/PS",
  "DPL30-24BB-EP/PS",
] as const;

const DIAPHRAGM_SERIES_SLUGS = {
  dpl30: "dpl30-liquid-diaphragm-pump",
  dpl30h: "dpl30h-liquid-diaphragm-pump",
  dpl60: "dpl60-liquid-diaphragm-pump",
  dpgl800: "dpgl800-gas-liquid-diaphragm-pump",
} as const;

const DIAPHRAGM_SERIES_ZH_NAMES = {
  dpl30: "DPL30 液体隔膜泵",
  dpl30h: "DPL30H 高压液体隔膜泵",
  dpl60: "DPL60 液体隔膜泵",
  dpgl800: "DPGL800 气液混合隔膜泵",
} as const;

const ENGINEERING_ARTICLE_TOPIC_LABELS: Record<
  SupportedLocale,
  {
    flowPressure: readonly string[];
    continuousDuty: readonly string[];
    motorLife: readonly string[];
    lifeScience: readonly string[];
  }
> = {
  "zh-CN": {
    flowPressure: ["流量—压力曲线", "泵曲线", "系统曲线", "工作点"],
    continuousDuty: ["有刷直流电机", "无刷直流电机", "连续运行", "B10寿命"],
    motorLife: ["有刷电机", "无刷电机", "机械换向", "电子换向", "3000小时", "10000小时", "电刷磨损"],
    lifeScience: ["生命科学仪器", "清洗液路", "废液液路", "自吸", "气液混合"],
  },
  en: {
    flowPressure: ["flow-pressure curve", "pump curve", "system curve", "operating point"],
    continuousDuty: ["brushed DC motor", "brushless DC motor", "continuous duty", "B10 life"],
    motorLife: ["brushed motor", "brushless motor", "mechanical commutation", "electronic commutation", "3,000 operating hours", "10,000 operating hours", "brush wear"],
    lifeScience: ["life-science instrument", "washing fluid path", "waste-fluid path", "self-priming", "gas-liquid mixture"],
  },
  es: {
    flowPressure: ["curva caudal-presión", "curva de bomba", "curva del sistema", "punto de trabajo"],
    continuousDuty: ["motor CC con escobillas", "motor CC sin escobillas", "servicio continuo", "vida B10"],
    motorLife: ["motor con escobillas", "motor sin escobillas", "conmutación mecánica", "conmutación electrónica", "3000 horas de funcionamiento", "10 000 horas de funcionamiento", "desgaste de escobillas"],
    lifeScience: ["instrumento de ciencias de la vida", "circuito de lavado", "circuito de residuos", "autocebado", "mezcla gas-líquido"],
  },
  fr: {
    flowPressure: ["courbe débit-pression", "courbe de pompe", "courbe système", "point de fonctionnement"],
    continuousDuty: ["moteur CC à balais", "moteur CC sans balais", "service continu", "durée de vie B10"],
    motorLife: ["moteur à balais", "moteur sans balais", "commutation mécanique", "commutation électronique", "3 000 heures de fonctionnement", "10 000 heures de fonctionnement", "usure des balais"],
    lifeScience: ["instrument de sciences de la vie", "circuit de lavage", "circuit d'effluents", "auto-amorçage", "mélange gaz-liquide"],
  },
  ko: {
    flowPressure: ["유량-압력 곡선", "펌프 곡선", "시스템 곡선", "작동점"],
    continuousDuty: ["브러시 DC 모터", "브러시리스 DC 모터", "연속 운전", "B10 수명"],
    motorLife: ["브러시 모터", "브러시리스 모터", "기계식 정류", "전자식 정류", "3,000시간 운전", "10,000시간 운전", "브러시 마모"],
    lifeScience: ["생명과학 장비", "세척 유로", "폐액 유로", "자흡", "기액 혼합"],
  },
  ru: {
    flowPressure: ["расходно-напорная характеристика", "характеристика насоса", "кривая системы", "рабочая точка"],
    continuousDuty: ["щёточный двигатель постоянного тока", "бесщёточный двигатель постоянного тока", "непрерывный режим", "ресурс B10"],
    motorLife: ["щёточный двигатель", "бесщёточный двигатель", "механическая коммутация", "электронная коммутация", "3000 часов работы", "10 000 часов работы", "износ щёток"],
    lifeScience: ["лабораторное оборудование", "контур промывки", "контур отходов", "самовсасывание", "газожидкостная смесь"],
  },
};

type DiaphragmSeriesKey = keyof typeof DIAPHRAGM_SERIES_SLUGS;

function getDiaphragmSeriesSchemaName(
  series: DiaphragmSeriesKey,
  locale: SupportedLocale,
) {
  if (locale === "zh-CN") {
    return DIAPHRAGM_SERIES_ZH_NAMES[series];
  }

  return (
    getProductDetailTitleOverride(
      { slug: DIAPHRAGM_SERIES_SLUGS[series] },
      locale,
    ) || DIAPHRAGM_SERIES_ZH_NAMES[series]
  );
}

export default function TechnicalArticleDetail({
  pageData,
  article,
  previousArticle,
  nextArticle,
}: TechnicalArticleDetailProps) {
  const locale = normalizeLocale(pageData.locale);
  const listHref = getArticleListHref(locale);
  const isDpl30Article =
    article.slug === "dpl30-liquid-diaphragm-pump-selection-guide";
  const isDpl60Article =
    article.slug === "dpl60-liquid-diaphragm-pump-selection-guide";
  const isDpgl800Article =
    article.slug === "dpgl800-gas-liquid-diaphragm-pump-selection-guide";
  const isDpl30hArticle =
    article.slug === "dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide";
  const isBrushlessWiringArticle =
    article.slug === brushlessWiringArticleSlug;
  const diaphragmPumpEngineeringArticleSlug =
    isDiaphragmPumpEngineeringArticleSlug(article.slug)
      ? article.slug
      : null;
  const isDiaphragmPumpEngineeringArticle =
    diaphragmPumpEngineeringArticleSlug !== null;
  const isDedicatedPumpArticle =
    isDpl30Article || isDpl30hArticle || isDpl60Article || isDpgl800Article;
  const brushlessWiringCopy = isBrushlessWiringArticle
    ? getBrushlessWiringArticleCopy(locale)
    : null;
  const diaphragmPumpEngineeringCopy = diaphragmPumpEngineeringArticleSlug
    ? getDiaphragmPumpEngineeringArticleCopy(
        diaphragmPumpEngineeringArticleSlug,
        locale,
      )
    : null;
  const localePrefix = locale === "zh-CN" ? "" : `/${locale}`;

  const breadcrumbItems = pageData.breadcrumbs.map((item, index) => {
    const isLastItem = index === pageData.breadcrumbs.length - 1;

    if (isLastItem) {
      return {
        ...item,
        href: listHref,
      };
    }

    return item;
  });

  const breadcrumbData = {
    items: breadcrumbItems,
    breadcrumbs: breadcrumbItems,
    breadcrumbItems,
  };

  const adaptedArticle = {
    category: article.category,
    title: article.title,
    date: article.date,
    // DPL30 的 summary 供列表和关联卡片自动读取正文首段；
    // 详情页正文已经从同一首段开始，因此此处不重复显示摘要。
    summary: isDedicatedPumpArticle ? "" : article.summary,
    // The new wiring article uses both confirmed photos inside the body. Keep
    // the 2-wire photo for list cards and structured data without repeating it
    // as an oversized detail-page cover.
    coverImage:
      isBrushlessWiringArticle || isDiaphragmPumpEngineeringArticle
        ? undefined
        : article.coverImage,
    coverAlt:
      article.coverAlt ??
      (isDpl60Article
        ? "FOREACH DPL60 brushed and brushless liquid diaphragm pumps, 600 mL/min"
        : article.title),
    content: article.content.map((block) => ({
      title: block.title,
      content: block.content,
    })),
  };

  const adaptedPageData = {
    listHref,
    backText: getBackText(locale),
    bottomBanner: diaphragmPumpEngineeringCopy
      ? {
          title: diaphragmPumpEngineeringCopy.cta.title,
          description: diaphragmPumpEngineeringCopy.cta.description,
          actions: [
            {
              label: diaphragmPumpEngineeringCopy.cta.contactLabel,
              href: `${localePrefix}/contact`,
            },
            {
              label: diaphragmPumpEngineeringCopy.cta.productsLabel,
              href: `${localePrefix}/products/pumps/diaphragm-pumps`,
            },
          ],
        }
      : brushlessWiringCopy
        ? {
            title: brushlessWiringCopy.cta.title,
            description: brushlessWiringCopy.cta.description,
            actions: [
              {
                label: brushlessWiringCopy.cta.contactLabel,
                href: `${localePrefix}/contact`,
              },
              {
                label: brushlessWiringCopy.cta.productsLabel,
                href: `${localePrefix}/products`,
              },
            ],
          }
        : pageData.bottomBanner,
  };

  const articleBody =
    diaphragmPumpEngineeringArticleSlug ? (
    <DiaphragmPumpEngineeringArticle
      articleSlug={diaphragmPumpEngineeringArticleSlug}
      locale={locale}
    />
  ) : isBrushlessWiringArticle ? (
    <BrushlessDiaphragmPumpWiringArticle locale={locale} />
  ) : article.slug === "cv-kv-correction-for-microfluidics" ? (
    <CvKvMicrofluidicsArticle locale={locale} />
  ) : isDedicatedPumpArticle ? (
    <Dpl30LiquidDiaphragmPumpArticle
      locale={locale}
      articleSeries={
        isDpgl800Article
          ? "dpgl800"
          : isDpl30hArticle
            ? "dpl30h"
            : isDpl60Article
              ? "dpl60"
              : "dpl30"
      }
    />
  ) : null;

  const structuredDataSubject: TechnicalArticleSubject | undefined =
    isDpl30Article
      ? {
          about: [getDiaphragmSeriesSchemaName("dpl30", locale)],
          mentions: DPL30_MENTIONED_MODELS,
        }
      : isDpl30hArticle
        ? {
            about: [getDiaphragmSeriesSchemaName("dpl30h", locale)],
            mentions: dpl30hStandardModels.map((item) => item.model),
          }
        : isDpl60Article
          ? {
              about: [getDiaphragmSeriesSchemaName("dpl60", locale)],
              mentions: dpl60StandardModels.map((item) => item.model),
            }
          : isDpgl800Article
            ? {
                about: [getDiaphragmSeriesSchemaName("dpgl800", locale)],
                mentions: dpgl800StandardModels.map((item) => item.model),
              }
            : isBrushlessWiringArticle
              ? {
                  about: (["dpl30", "dpl60", "dpl30h", "dpgl800"] as const).map(
                    (series) => getDiaphragmSeriesSchemaName(series, locale),
                  ),
                  mentions: (["dpl30", "dpl60", "dpl30h", "dpgl800"] as const).map(
                    (series) => getDiaphragmSeriesSchemaName(series, locale),
                  ),
                }
              : article.slug === diaphragmPumpFlowPressureCurveSlug
                ? {
                    about: (["dpl30", "dpl60", "dpl30h"] as const).map(
                      (series) => getDiaphragmSeriesSchemaName(series, locale),
                    ),
                    mentions: [
                      ...ENGINEERING_ARTICLE_TOPIC_LABELS[locale].flowPressure,
                    ],
                  }
                : article.slug === microDiaphragmPumpContinuousDutyLifeSlug
                  ? {
                      about: (["dpl30", "dpl60"] as const).map(
                        (series) => getDiaphragmSeriesSchemaName(series, locale),
                      ),
                      mentions: [
                        ...ENGINEERING_ARTICLE_TOPIC_LABELS[locale].continuousDuty,
                      ],
                    }
                  : article.slug === brushedVsBrushlessDiaphragmPumpMotorLifeSlug
                    ? {
                        about: (["dpl30", "dpl60"] as const).map((series) =>
                          getDiaphragmSeriesSchemaName(series, locale),
                        ),
                        mentions: [
                          ...ENGINEERING_ARTICLE_TOPIC_LABELS[locale].motorLife,
                        ],
                      }
                    : article.slug === lifeScienceInstrumentDpl60SelectionSlug
                      ? {
                          about: [getDiaphragmSeriesSchemaName("dpl60", locale)],
                          mentions: [
                            ...ENGINEERING_ARTICLE_TOPIC_LABELS[locale].lifeScience,
                          ],
                        }
                      : undefined;

  const structuredData = buildTechnicalArticleStructuredData(
    pageData,
    article,
    locale,
    isDpl30Article
      ? getDpl30ArticleFaq(locale)
      : isDpl60Article
        ? getDpl60ArticleFaq(locale)
        : isBrushlessWiringArticle
          ? getBrushlessWiringArticleFaq(locale)
          : isDiaphragmPumpEngineeringArticle
            ? getDiaphragmPumpEngineeringArticleFaq(article.slug, locale)
            : [],
    structuredDataSubject,
    isDedicatedPumpArticle ||
      isBrushlessWiringArticle ||
      isDiaphragmPumpEngineeringArticle
      ? "TechArticle"
      : "Article",
  );

  return (
    <div
      className="newsArticleDetailPage"
      data-locale={locale}
      data-article-slug={article.slug}
      {...(article.slug === brushedVsBrushlessDiaphragmPumpMotorLifeSlug ||
      article.slug === lifeScienceInstrumentDpl60SelectionSlug
        ? { lang: locale }
        : {})}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="newsArticleBreadcrumbShell">
        <BreadcrumbComponent {...breadcrumbData} />
      </div>

      <NewsArticleClient
        locale={locale}
        article={adaptedArticle}
        pageData={adaptedPageData}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
        afterContent={
          <RelatedResources
            key="technical-article-related-resources"
            sourceType="article"
            sourceId={article.id}
            sourceSlug={article.slug}
            relationKeys={article.relationKeys}
            locale={locale}
          />
        }
      >
        {articleBody}
      </NewsArticleClient>
    </div>
  );
}
