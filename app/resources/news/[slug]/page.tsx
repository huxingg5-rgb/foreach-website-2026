/* =========================================================
   page.tsx
   恒永达官网｜中文公司新闻详情页入口

   文件路径：
   app/resources/news/[slug]/page.tsx

   页面路径：
   /resources/news/[slug]

   说明：
   1. 中文新闻详情页入口
   2. 中文页面默认不加 /zh-CN 路径
   3. Top 栏继续走全站公共 SiteHeader，不在这里重复引用
   4. 面包屑继续使用统一组件 SiteBreadcrumb
   5. 新闻详情主体继续使用 NewsArticleClient
   6. 在这里根据当前 slug 自动计算上一篇 / 下一篇
   7. 支持静态导出
========================================================= */

import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import NewsArticleClient from "@/components/resources/news/NewsArticleClient";

import { getNewsPageData } from "@/services/resources/news/getNewsPageData";
import {
  getNewsArticleData,
  getNewsSlugs,
} from "@/services/resources/news/getNewsArticleData";

import "@/app/resources/news/news.css";

import type { NewsLocale } from "@/data/resources/news/news.types";

/* =========================================================
   中文新闻语言标识

   说明：
   1. 中文数据使用 zh-CN
   2. 中文路径不加 /zh-CN
========================================================= */

const NEWS_LOCALE: NewsLocale = "zh-CN";

/* =========================================================
   页面参数类型

   说明：
   1. slug：新闻文章唯一标识
   2. 当前项目使用 Next.js 16，params 是 Promise
========================================================= */

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   面包屑字段类型

   说明：
   1. href 可选
   2. 最后一项当前新闻标题不需要 href
========================================================= */

type BreadcrumbItem = {
  label: string;
  href?: string;
};

/* =========================================================
   上一篇 / 下一篇字段类型

   说明：
   1. NewsArticleClient 已经支持这个结构
   2. 这里在 page.tsx 中计算好后传进去
========================================================= */

type NewsPagerItem = {
  title: string;
  href: string;
  date?: string;
};

/* =========================================================
   统一面包屑组件兼容处理

   说明：
   1. 不修改 SiteBreadcrumb 本身
   2. 这里用宽松 props，避免统一组件 props 类型较严格导致报错
   3. 实际渲染仍然交给统一 SiteBreadcrumb 组件
========================================================= */

const BreadcrumbComponent = SiteBreadcrumb as ComponentType<
  Record<string, unknown>
>;
/* =========================================================
   getNewsBreadcrumbData
   生成中文新闻详情页面包屑数据

   页面层级：
   首页 / 资源中心 / 公司新闻

   说明：
   1. 新闻详情页不再把文章标题放进面包屑
   2. 文章标题已经在正文标题区显示
   3. 面包屑只负责显示当前所在栏目
========================================================= */

function getNewsBreadcrumbData() {
  const homeHref = "/";
  const resourcesHref = "/resources";
  const newsHref = "/resources/news";

  const items: BreadcrumbItem[] = [
    {
      label: "首页",
      href: homeHref,
    },
    {
      label: "资源中心",
      href: resourcesHref,
    },
    {
      label: "公司新闻",
      href: newsHref,
    },
  ];

  return {
    items,

    breadcrumb: {
      items,
      home: "首页",
      homeHref,
      resources: "资源中心",
      resourcesHref,
      news: "公司新闻",
      newsHref,
      current: "公司新闻",
    },

    home: "首页",
    homeHref,
    resources: "资源中心",
    resourcesHref,
    news: "公司新闻",
    newsHref,
    current: "公司新闻",
    currentLabel: "公司新闻",
  };
}
/* =========================================================
   getNewsPagerData
   根据当前 slug 生成上一篇 / 下一篇

   说明：
   1. getNewsSlugs(NEWS_LOCALE) 返回当前语言全部新闻 slug
   2. 根据当前 slug 所在位置计算 previous / next
   3. 如果没有上一篇或下一篇，则返回 null
   4. href 使用中文默认路径，不加 /zh-CN
========================================================= */

function getNewsPagerData(currentSlug: string): {
  previousArticle: NewsPagerItem | null;
  nextArticle: NewsPagerItem | null;
} {
  const slugs = getNewsSlugs(NEWS_LOCALE);
  const currentIndex = slugs.findIndex((item) => item === currentSlug);

  if (currentIndex < 0) {
    return {
      previousArticle: null,
      nextArticle: null,
    };
  }

  const previousSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  const previousArticleData = previousSlug
    ? getNewsArticleData(NEWS_LOCALE, previousSlug)
    : null;

  const nextArticleData = nextSlug
    ? getNewsArticleData(NEWS_LOCALE, nextSlug)
    : null;

  return {
    previousArticle:
      previousSlug && previousArticleData
        ? {
          title: previousArticleData.title,
          href: `/resources/news/${previousSlug}`,
          date: previousArticleData.date,
        }
        : null,

    nextArticle:
      nextSlug && nextArticleData
        ? {
          title: nextArticleData.title,
          href: `/resources/news/${nextSlug}`,
          date: nextArticleData.date,
        }
        : null,
  };
}

/* =========================================================
   generateStaticParams
   静态导出路径

   说明：
   1. 为中文新闻详情页生成 slug 路径
   2. 中文页面不生成 /zh-CN/resources/news/[slug]
========================================================= */

export function generateStaticParams() {
  return getNewsSlugs(NEWS_LOCALE).map((slug) => ({
    slug,
  }));
}

/* =========================================================
   generateMetadata
   中文新闻详情页 SEO 信息
========================================================= */

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getNewsArticleData(NEWS_LOCALE, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title}｜公司新闻｜FOREACH`,
    description: article.seoDescription ?? article.summary,
  };
}

/* =========================================================
   NewsArticlePage
   中文新闻详情页
========================================================= */

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;

  const pageData = getNewsPageData(NEWS_LOCALE);
  const article = getNewsArticleData(NEWS_LOCALE, slug);

  if (!article) {
    notFound();
  }

const breadcrumbData = getNewsBreadcrumbData();
  const { previousArticle, nextArticle } = getNewsPagerData(slug);

  return (
    <div className="newsArticleDetailPage">
      {/* 统一面包屑组件：不要放到 NewsArticleClient 里 */}
      <div className="newsArticleBreadcrumbShell">
        <BreadcrumbComponent {...breadcrumbData} />
      </div>

      <NewsArticleClient
        locale="zh-CN"
        pageData={pageData}
        article={article}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
      />
    </div>
  );
} 