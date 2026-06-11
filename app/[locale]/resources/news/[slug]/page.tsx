/* =========================================================
   page.tsx
   恒永达官网｜外语公司新闻详情页入口

   文件路径：
   app/[locale]/resources/news/[slug]/page.tsx

   页面路径：
   /en/resources/news/[slug]
   /es/resources/news/[slug]
   /fr/resources/news/[slug]
   /ko/resources/news/[slug]
   /ru/resources/news/[slug]

   说明：
   1. 外语新闻详情页入口
   2. Top 栏继续走全站公共 SiteHeader，不在这里重复引用
   3. 面包屑继续使用统一组件 SiteBreadcrumb
   4. 新闻详情主体继续使用 NewsArticleClient
   5. 在这里根据当前 slug 自动计算上一篇 / 下一篇
   6. 支持静态导出
   7. 中文新闻详情页不走这里，中文走 app/resources/news/[slug]/page.tsx
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
   外语新闻语言类型

   说明：
   1. NewsLocale 里包含 zh-CN
   2. 当前这个文件是 app/[locale]/resources/news/[slug]/page.tsx
   3. 这里只处理外语页面，不处理中文
   4. 所以这里排除 zh-CN，避免面包屑文案索引报错
========================================================= */

type NewsIntlLocale = Exclude<NewsLocale, "zh-CN">;

/* =========================================================
   当前外语新闻详情页支持语言

   注意：
   1. 中文不走 /zh-CN
   2. 中文详情页在 app/resources/news/[slug]/page.tsx
========================================================= */

const SUPPORTED_LOCALES: NewsIntlLocale[] = ["en", "es", "fr", "ko", "ru"];

/* =========================================================
   页面参数类型

   说明：
   1. locale：当前语言
   2. slug：新闻文章唯一标识
   3. 当前项目使用 Next.js 16，params 是 Promise
========================================================= */

interface NewsIntlArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

/* =========================================================
   面包屑字段类型

   说明：
   1. href 可选
   2. 当前详情页不再把文章标题放进面包屑
   3. 面包屑只显示到 Company News / 公司新闻栏目
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
   isSupportedLocale
   判断是否为当前外语新闻详情页支持的语言

   说明：
   1. params.locale 来自 URL，类型上先按 string 处理更安全
   2. 通过这个函数后，locale 会被收窄为 NewsIntlLocale
========================================================= */

function isSupportedLocale(locale: string): locale is NewsIntlLocale {
  return SUPPORTED_LOCALES.includes(locale as NewsIntlLocale);
}

/* =========================================================
   外语新闻详情页面包屑文案

   说明：
   1. 英文新闻详情页使用 Company News
   2. 不再使用单独的 News，避免栏目含义太泛
   3. 新闻详情页不显示文章标题，标题只在正文标题区显示
   4. 这里只服务外语新闻详情页，不包含 zh-CN
========================================================= */

const NEWS_BREADCRUMB_LABELS: Record<
  NewsIntlLocale,
  {
    home: string;
    resources: string;
    news: string;
  }
> = {
  en: {
    home: "Home",
    resources: "Resources",
    news: "Company News",
  },
  es: {
    home: "Inicio",
    resources: "Recursos",
    news: "Noticias de la empresa",
  },
  fr: {
    home: "Accueil",
    resources: "Ressources",
    news: "Actualités de l’entreprise",
  },
  ko: {
    home: "홈",
    resources: "자료실",
    news: "회사 뉴스",
  },
  ru: {
    home: "Главная",
    resources: "Ресурсы",
    news: "Новости компании",
  },
};

/* =========================================================
   getNewsBreadcrumbData
   生成外语新闻详情页面包屑数据

   页面层级：
   Home / Resources / Company News

   说明：
   1. 新闻详情页不再把文章标题放进面包屑
   2. 文章标题已经在正文标题区显示
   3. 面包屑只负责显示当前所在栏目
   4. locale 使用 NewsIntlLocale，避免 zh-CN 类型误入
========================================================= */

function getNewsBreadcrumbData(locale: NewsIntlLocale) {
  const labels = NEWS_BREADCRUMB_LABELS[locale];

  const homeHref = `/${locale}`;
  const resourcesHref = `/${locale}/resources`;
  const newsHref = `/${locale}/resources/news`;

  const items: BreadcrumbItem[] = [
    {
      label: labels.home,
      href: homeHref,
    },
    {
      label: labels.resources,
      href: resourcesHref,
    },
    {
      label: labels.news,
      href: newsHref,
    },
  ];

  return {
    items,

    /* 兼容可能使用 breadcrumb 对象的统一组件 */
    breadcrumb: {
      items,
      home: labels.home,
      homeHref,
      resources: labels.resources,
      resourcesHref,
      news: labels.news,
      newsHref,
      current: labels.news,
    },

    /* 兼容可能使用独立字段的统一组件 */
    home: labels.home,
    homeHref,
    resources: labels.resources,
    resourcesHref,
    news: labels.news,
    newsHref,
    current: labels.news,
    currentLabel: labels.news,
  };
}

/* =========================================================
   getNewsPagerData
   根据当前 slug 生成上一篇 / 下一篇

   说明：
   1. 外语路径需要带 locale 前缀
   2. 如果没有上一篇或下一篇，则返回 null
   3. 顺序跟 getNewsSlugs(locale) 返回顺序一致
========================================================= */

function getNewsPagerData(
  locale: NewsIntlLocale,
  currentSlug: string,
): {
  previousArticle: NewsPagerItem | null;
  nextArticle: NewsPagerItem | null;
} {
  const slugs = getNewsSlugs(locale);
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
    ? getNewsArticleData(locale, previousSlug)
    : null;

  const nextArticleData = nextSlug
    ? getNewsArticleData(locale, nextSlug)
    : null;

  return {
    previousArticle:
      previousSlug && previousArticleData
        ? {
          title: previousArticleData.title,
          href: `/${locale}/resources/news/${previousSlug}`,
          date: previousArticleData.date,
        }
        : null,

    nextArticle:
      nextSlug && nextArticleData
        ? {
          title: nextArticleData.title,
          href: `/${locale}/resources/news/${nextSlug}`,
          date: nextArticleData.date,
        }
        : null,
  };
}

/* =========================================================
   generateStaticParams
   静态导出路径

   说明：
   1. 为每个外语 locale 生成新闻详情页路径
   2. slug 从 getNewsSlugs(locale) 读取
========================================================= */

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getNewsSlugs(locale).map((slug) => ({
      locale,
      slug,
    })),
  );
}

/* =========================================================
   generateMetadata
   外语新闻详情页 SEO 信息

   说明：
   1. 优先使用文章 seoTitle / seoDescription
   2. 如果没有，则回退到 title / summary
========================================================= */

export async function generateMetadata({
  params,
}: NewsIntlArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const article = getNewsArticleData(locale, slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.seoTitle ?? article.title}｜Company News｜FOREACH`,
    description: article.seoDescription ?? article.summary,
  };
}

/* =========================================================
   NewsIntlArticlePage
   外语新闻详情页

   页面结构：
   1. 公共 Top 栏：由 app/layout.tsx / SiteHeader 统一提供
   2. 统一面包屑：这里调用 SiteBreadcrumb
   3. 新闻详情主体：NewsArticleClient
   4. Footer：由全站 layout 统一提供

   注意：
   1. newsArticleDetailPage 只用于新闻详情页外层
   2. newsArticleBreadcrumbShell 用于给固定 Top 栏下面的面包屑留位置
   3. 不影响新闻首页 /en/resources/news
========================================================= */

export default async function NewsIntlArticlePage({
  params,
}: NewsIntlArticlePageProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const pageData = getNewsPageData(locale);
  const article = getNewsArticleData(locale, slug);

  if (!article) {
    notFound();
  }

  const breadcrumbData = getNewsBreadcrumbData(locale);
  const { previousArticle, nextArticle } = getNewsPagerData(locale, slug);

  return (
    <div className="newsArticleDetailPage">
      {/* 统一面包屑组件：不要放到 NewsArticleClient 里 */}
      <div className="newsArticleBreadcrumbShell">
        <BreadcrumbComponent {...breadcrumbData} />
      </div>

      <NewsArticleClient
        locale={locale}
        pageData={pageData}
        article={article}
        previousArticle={previousArticle}
        nextArticle={nextArticle}
      />
    </div>
  );
} 