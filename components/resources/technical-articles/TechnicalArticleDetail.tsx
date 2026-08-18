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
  dpl60StandardModels,
  getDpl60ArticleFaq,
} from "@/data/resources/technical-articles/dpl60-liquid-diaphragm-pump.article";
import {
  dpgl800StandardModels,
} from "@/data/resources/technical-articles/dpgl800-gas-liquid-diaphragm-pump.article";
import {
  dpl30hStandardModels,
} from "@/data/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump.article";

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

type TechnicalArticleProductItem = {
  sku: string;
  model: string;
};

type TechnicalArticleProductList = {
  name: string;
  category: string;
  items: readonly TechnicalArticleProductItem[];
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
  productList?: TechnicalArticleProductList,
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

  if (productList && productList.items.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonicalUrl}#standard-models`,
      name: productList.name,
      numberOfItems: productList.items.length,
      itemListElement: productList.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.model,
          sku: item.sku,
          brand: { "@type": "Brand", name: "FOREACH" },
          category: productList.category,
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
  const isDedicatedPumpArticle =
    isDpl30Article || isDpl30hArticle || isDpl60Article || isDpgl800Article;
  const brushlessWiringCopy = isBrushlessWiringArticle
    ? getBrushlessWiringArticleCopy(locale)
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
    coverImage: isBrushlessWiringArticle ? undefined : article.coverImage,
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
    bottomBanner: brushlessWiringCopy
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
    isBrushlessWiringArticle ? (
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
        : [],
    isDpl30hArticle
      ? {
          name: "FOREACH DPL30H standard models",
          category: "High-Pressure Liquid Diaphragm Pump",
          items: dpl30hStandardModels,
        }
      : isDpl60Article
      ? {
          name: "FOREACH DPL60 standard models",
          category: "Micro Liquid Diaphragm Pump",
          items: dpl60StandardModels,
        }
      : isDpgl800Article
        ? {
            name: "FOREACH DPGL800 standard models",
            category: "Gas-Liquid Diaphragm Pump",
            items: dpgl800StandardModels,
          }
        : undefined,
    isBrushlessWiringArticle ? "TechArticle" : "Article",
  );

  return (
    <div
      className="newsArticleDetailPage"
      data-locale={locale}
      data-article-slug={article.slug}
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
