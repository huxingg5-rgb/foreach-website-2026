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
import CvKvMicrofluidicsArticle from "@/components/resources/technical-articles/articles/CvKvMicrofluidicsArticle";
import Dpl30LiquidDiaphragmPumpArticle from "@/components/resources/technical-articles/articles/Dpl30LiquidDiaphragmPumpArticle";

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

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

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
    summary: isDpl30Article ? "" : article.summary,
    coverImage: article.coverImage,
    coverAlt: article.title,
    content: article.content.map((block) => ({
      title: block.title,
      content: block.content,
    })),
  };

  const adaptedPageData = {
    listHref,
    backText: getBackText(locale),
    bottomBanner: pageData.bottomBanner,
  };

  const articleBody =
    article.slug === "cv-kv-correction-for-microfluidics" ? (
      <CvKvMicrofluidicsArticle locale={locale} />
    ) : isDpl30Article ? (
      <Dpl30LiquidDiaphragmPumpArticle locale={locale} />
    ) : null;

  return (
    <div className="newsArticleDetailPage" data-locale={locale}>
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
