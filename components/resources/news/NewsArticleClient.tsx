"use client";

/* =========================================================
   NewsArticleClient.tsx
   恒永达官网｜新闻中心详情页客户端组件

   文件路径：
   components/resources/news/NewsArticleClient.tsx

   作用：
   1. 渲染新闻详情页主体内容
   2. 不处理顶部导航栏，Top 栏继续使用全站公共组件
   3. 不处理面包屑，面包屑继续使用 page.tsx 里的统一组件
   4. 主图只作为新闻详情页主题图，放在正文外面
   5. 正文里面没有图，就不强制显示图片
   6. 正文之后显示上一篇 / 下一篇
   7. 底部 CTA 直接引用已有 ResourceSupportCta 模块，不重复写 Banner

   当前修正：
   1. 不再只依赖 page.tsx 传入的 locale
   2. 组件内部直接根据当前 pathname 判断语言
   3. 解决外语页面返回按钮仍显示中文“返回”的问题
========================================================= */

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import styles from "./NewsArticleClient.module.css";

/* =========================================================
   新闻正文块类型
========================================================= */

type NewsContentBlock = {
  title?: string;
  content?: string;
  text?: string;
  items?: string[];
};

/* =========================================================
   上一篇 / 下一篇类型
========================================================= */

type NewsPagerItem = {
  title: string;
  href: string;
  date?: string;
};

/* =========================================================
   新闻文章类型
========================================================= */

type NewsArticle = {
  category?: string;
  title: string;
  date: string;
  summary?: string;
  coverImage?: string;
  coverAlt?: string;
  content: NewsContentBlock[];
  previous?: NewsPagerItem | null;
  next?: NewsPagerItem | null;
};

/* =========================================================
   底部 Banner 数据类型
========================================================= */

type NewsBottomBannerAction = {
  label: string;
  href: string;
};

type NewsArticlePageData = {
  listHref?: string;
  backText?: string;
  bottomBanner: {
    title: string;
    description: string;
    actions?: NewsBottomBannerAction[];
  };
};

/* =========================================================
   组件 Props 类型

   说明：
   1. locale 可传可不传
   2. 即使 page.tsx 没传 locale，组件也会通过 URL 自动判断语言
========================================================= */

type NewsArticleClientProps = {
  locale?: "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";
  article: NewsArticle;
  pageData: NewsArticlePageData;
  previousArticle?: NewsPagerItem | null;
  nextArticle?: NewsPagerItem | null;
};

/* =========================================================
   ResourceSupportCta 组件兼容类型

   说明：
   1. 当前项目里 ResourceSupportCta 是已有公共模块
   2. 这里不重写 Banner，只引用这个模块
   3. 同时传入 buttonText / buttonLabel / actions，兼容公共模块不同字段名
========================================================= */

const SupportCtaComponent = ResourceSupportCta as ComponentType<
  Record<string, unknown>
>;

/* =========================================================
   getLocaleFromPathname
   从当前 URL 路径判断语言

   说明：
   1. 中文默认没有 /zh-CN 前缀
   2. 外语路径第一级是 en / es / fr / ko / ru
   3. 这里优先从 pathname 判断，避免 props 没传导致外语仍显示中文
========================================================= */

function getLocaleFromPathname(
  pathname: string | null,
  fallbackLocale?: "zh-CN" | "en" | "es" | "fr" | "ko" | "ru",
): "zh-CN" | "en" | "es" | "fr" | "ko" | "ru" {
  const firstSegment = String(pathname || "")
    .split("/")
    .filter(Boolean)[0];

  if (
    firstSegment === "en" ||
    firstSegment === "es" ||
    firstSegment === "fr" ||
    firstSegment === "ko" ||
    firstSegment === "ru"
  ) {
    return firstSegment;
  }

  return fallbackLocale ?? "zh-CN";
}

/* =========================================================
   splitParagraphs
   正文段落处理函数
========================================================= */

function splitParagraphs(value?: string) {
  return String(value || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/* =========================================================
   getNewsArticleUiText
   新闻详情页固定 UI 文案
========================================================= */

function getNewsArticleUiText(
  locale: "zh-CN" | "en" | "es" | "fr" | "ko" | "ru",
) {
  if (locale === "en") {
    return {
      back: "Back",
      previous: "Previous",
      next: "Next",
      noPrevious: "No previous news",
      noNext: "No next news",
      fallbackContact: "Contact Us",
      fallbackContactHref: "/en/contact",
      listHref: "/en/resources/news",
    };
  }

  if (locale === "es") {
    return {
      back: "Volver",
      previous: "Anterior",
      next: "Siguiente",
      noPrevious: "No hay noticia anterior",
      noNext: "No hay noticia siguiente",
      fallbackContact: "Contactar",
      fallbackContactHref: "/es/contact",
      listHref: "/es/resources/news",
    };
  }

  if (locale === "fr") {
    return {
      back: "Retour",
      previous: "Précédent",
      next: "Suivant",
      noPrevious: "Aucune actualité précédente",
      noNext: "Aucune actualité suivante",
      fallbackContact: "Nous contacter",
      fallbackContactHref: "/fr/contact",
      listHref: "/fr/resources/news",
    };
  }

  if (locale === "ko") {
    return {
      back: "돌아가기",
      previous: "이전 글",
      next: "다음 글",
      noPrevious: "이전 뉴스가 없습니다",
      noNext: "다음 뉴스가 없습니다",
      fallbackContact: "문의하기",
      fallbackContactHref: "/ko/contact",
      listHref: "/ko/resources/news",
    };
  }

  if (locale === "ru") {
    return {
      back: "Назад",
      previous: "Предыдущая",
      next: "Следующая",
      noPrevious: "Предыдущей новости нет",
      noNext: "Следующей новости нет",
      fallbackContact: "Связаться",
      fallbackContactHref: "/ru/contact",
      listHref: "/ru/resources/news",
    };
  }

  return {
    back: "返回",
    previous: "上一篇",
    next: "下一篇",
    noPrevious: "暂无上一篇",
    noNext: "暂无下一篇",
    fallbackContact: "联系我们",
    fallbackContactHref: "/contact",
    listHref: "/resources/news",
  };
}

/* =========================================================
   NewsPagerCard
   上一篇 / 下一篇卡片
========================================================= */

function NewsPagerCard({
  label,
  emptyText,
  item,
  align,
}: {
  label: string;
  emptyText: string;
  item?: NewsPagerItem | null;
  align: "prev" | "next";
}) {
  if (!item) {
    return (
      <div className={`${styles.pagerCard} ${styles.emptyPagerCard}`}>
        <span>{label}</span>
        <strong>{emptyText}</strong>
      </div>
    );
  }

  return (
    <Link
      className={`${styles.pagerCard} ${
        align === "next" ? styles.nextPagerCard : ""
      }`}
      href={item.href}
    >
      <span>{label}</span>
      <strong>{item.title}</strong>
      {item.date ? <em>{item.date}</em> : null}
    </Link>
  );
}

/* =========================================================
   NewsArticleClient
   新闻详情页主体组件
========================================================= */

export default function NewsArticleClient({
  locale,
  article,
  pageData,
  previousArticle,
  nextArticle,
}: NewsArticleClientProps) {
  const pathname = usePathname();

  /* 根据当前 URL 判断真实语言，解决外语返回仍显示中文的问题 */
  const currentLocale = getLocaleFromPathname(pathname, locale);

  /* 根据真实语言获取 UI 文案 */
  const uiText = getNewsArticleUiText(currentLocale);

  /* 返回新闻列表路径：
     1. 优先使用当前语言默认路径
     2. 不再直接依赖 pageData.listHref，避免外语页面拿到中文路径
  */
  const listHref = uiText.listHref;

  /* 上一篇 / 下一篇：优先使用 page.tsx 单独传入，其次使用 article 内部字段 */
  const previous = previousArticle ?? article.previous ?? null;
  const next = nextArticle ?? article.next ?? null;

  /* 底部 CTA：优先使用第一个 action */
  const primaryAction = pageData.bottomBanner.actions?.[0];

  return (
    <main className={styles.page}>
      {/* =====================================================
          1. 新闻标题区
      ====================================================== */}
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.container}>
            <Link className={styles.backLink} href={listHref}>
              {`< ${uiText.back}`}
            </Link>

            <h1 className={styles.title}>{article.title}</h1>

            <time className={styles.date}>{article.date}</time>

            {article.summary ? (
              <p className={styles.summary}>{article.summary}</p>
            ) : null}
          </div>
        </header>

        {/* =====================================================
            2. 新闻主题图
        ====================================================== */}
        {article.coverImage ? (
          <section className={styles.coverSection}>
            <div className={styles.container}>
              <figure className={styles.cover}>
                <Image
                  src={article.coverImage}
                  alt={article.coverAlt ?? article.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1600px"
                />
              </figure>
            </div>
          </section>
        ) : null}

        {/* =====================================================
            3. 正文内容
        ====================================================== */}
        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.content}>
              {article.content.map((block, index) => {
                const paragraphs = splitParagraphs(
                  block.content ?? block.text ?? "",
                );

                return (
                  <section
                    key={`${block.title ?? "news-block"}-${index}`}
                    className={styles.contentBlock}
                  >
                    {block.title ? <h2>{block.title}</h2> : null}

                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}

                    {block.items && block.items.length > 0 ? (
                      <ul>
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </article>

      {/* =====================================================
          4. 上一篇 / 下一篇
      ====================================================== */}
      <section className={styles.pagerSection}>
        <div className={styles.container}>
          <div className={styles.pagerGrid}>
            <NewsPagerCard
              label={uiText.previous}
              emptyText={uiText.noPrevious}
              item={previous}
              align="prev"
            />

            <NewsPagerCard
              label={uiText.next}
              emptyText={uiText.noNext}
              item={next}
              align="next"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          5. 底部 CTA
      ====================================================== */}
      <section className={styles.supportSection}>
        <SupportCtaComponent
          title={pageData.bottomBanner.title}
          description={pageData.bottomBanner.description}
          actions={pageData.bottomBanner.actions ?? []}
          buttonText={primaryAction?.label ?? uiText.fallbackContact}
          buttonLabel={primaryAction?.label ?? uiText.fallbackContact}
          href={primaryAction?.href ?? uiText.fallbackContactHref}
          buttonHref={primaryAction?.href ?? uiText.fallbackContactHref}
        />
      </section>
    </main>
  );
} 