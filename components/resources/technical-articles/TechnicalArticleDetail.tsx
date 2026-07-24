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
import NewsArticleClient from "@/components/resources/news/NewsArticleClient";
import CvKvMicrofluidicsArticle from "@/components/resources/technical-articles/articles/CvKvMicrofluidicsArticle";

import type {
  TechnicalArticleItem,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

/* =========================================================
   支持的语言类型

   当前先处理中文详情路由，
   同时保留其他语言组件兼容能力。
========================================================= */

type SupportedLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

/* =========================================================
   上一篇 / 下一篇数据类型
========================================================= */

export type TechnicalArticlePagerItem = {
  title: string;
  href: string;
  date?: string;
};

/* =========================================================
   组件 Props
========================================================= */

interface TechnicalArticleDetailProps {
  pageData: TechnicalArticlesPageData;
  article: TechnicalArticleItem;
  previousArticle?: TechnicalArticlePagerItem | null;
  nextArticle?: TechnicalArticlePagerItem | null;
}

/* =========================================================
   公共面包屑兼容类型
========================================================= */

type SharedComponentProps =
  Record<string, unknown>;

const BreadcrumbComponent =
  SiteBreadcrumb as ComponentType<SharedComponentProps>;

/* =========================================================
   语言处理
========================================================= */

function normalizeLocale(
  locale: string
): SupportedLocale {
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

/* =========================================================
   获取技术文章列表地址
========================================================= */

function getArticleListHref(
  locale: SupportedLocale
) {
  if (locale === "zh-CN") {
    return "/resources/technical-articles";
  }

  return `/${locale}/resources/technical-articles`;
}

/* =========================================================
   获取返回按钮文案
========================================================= */

function getBackText(
  locale: SupportedLocale
) {
  if (locale === "en") {
    return "Back";
  }

  if (locale === "es") {
    return "Volver";
  }

  if (locale === "fr") {
    return "Retour";
  }

  if (locale === "ko") {
    return "뒤로";
  }

  if (locale === "ru") {
    return "Назад";
  }

  return "返回";
}

/* =========================================================
   TechnicalArticleDetail
========================================================= */

export default function TechnicalArticleDetail({
  pageData,
  article,
  previousArticle,
  nextArticle,
}: TechnicalArticleDetailProps) {
  const locale =
    normalizeLocale(pageData.locale);

  const listHref =
    getArticleListHref(locale);

  /* -------------------------------------------------------
     面包屑只保留：
     首页 / 资源中心 / 技术文章

     不再把文章完整标题放进面包屑。
  ------------------------------------------------------- */

  const breadcrumbItems =
    pageData.breadcrumbs.map(
      (item, index) => {
        const isLastItem =
          index ===
          pageData.breadcrumbs.length - 1;

        if (isLastItem) {
          return {
            ...item,
            href: listHref,
          };
        }

        return item;
      }
    );

  const breadcrumbData = {
    items: breadcrumbItems,
    breadcrumbs: breadcrumbItems,
    breadcrumbItems,
  };

  /* -------------------------------------------------------
     将技术文章数据转换为新闻详情组件需要的格式
  ------------------------------------------------------- */

  const adaptedArticle = {
    category: article.category,
    title: article.title,
    date: article.date,
    summary: article.summary,
    coverImage: article.coverImage,
    coverAlt: article.title,

    content: article.content.map(
      (block) => ({
        title: block.title,
        content: block.content,
      })
    ),
  };

  /* -------------------------------------------------------
     新闻详情组件页面配置

     底部 CTA 继续使用技术文章页面自己的文案，
     返回地址和返回文字改为技术文章栏目。
  ------------------------------------------------------- */

  const adaptedPageData = {
    listHref,
    backText: getBackText(locale),
    bottomBanner: pageData.bottomBanner,
  };

  const articleBody =
    article.slug === "cv-kv-correction-for-microfluidics"
      ? <CvKvMicrofluidicsArticle locale={locale} />
      : null;
  return (
    <div className="newsArticleDetailPage" data-locale={locale}>
      {/* 面包屑结构与新闻详情页一致 */}
      <div className="newsArticleBreadcrumbShell">
        <BreadcrumbComponent
          {...breadcrumbData}
        />
      </div>

      {/* 主体直接复用新闻详情组件 */}
      <NewsArticleClient
        locale={locale}
        article={adaptedArticle}
        pageData={adaptedPageData}
        previousArticle={previousArticle}
        nextArticle={nextArticle}>
        {articleBody}
      </NewsArticleClient>
    </div>
  );
}
