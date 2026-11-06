/* =========================================================
   NewsEditorialArticle
   恒永达官网｜新闻详情页 · 技术文章版式

   说明：
   1. 让指定的新闻沿用技术文章的版式（RplSelectionArticle）：
      标题字重、日期分隔线、左侧“本页目录”、编号小标题、正文排版
   2. 正文仍然来自 news.zh.ts / news.intl.ts 的 content，不需要单独维护一份
   3. 每行“标签：内容”自动把标签加粗，例如“展会：MEDICA 2026”
   4. 哪些新闻使用这个版式，由 EDITORIAL_NEWS_SLUGS 控制
   5. 正文里写 [文字](/链接) 会渲染成链接，例如“[泵系列](/products/pumps)：……”
      单独一行写 ![图片说明](/images/xxx.webp 1200x760) 会渲染成图片；连续几行图片并排显示
   6. 展会新闻可在 news-event-panels.ts 配置信息卡与预约按钮（导语下方 + 正文末尾）
   7. 预约表单：ExhibitionBookingAside，宽屏为右侧第三栏（三栏整体居中），窄屏放在正文末尾
      开关与名单见 news-booking.config.ts
========================================================= */

import NewsEventPanel from "@/components/resources/news/NewsEventPanel";
import ExhibitionBookingAside from "@/components/resources/news/exhibition/ExhibitionBookingAside";
import RplSelectionArticle, {
  renderBlocks,
} from "@/components/resources/technical-articles/articles/RplSelectionArticle";
import { getNewsEventPanel } from "@/data/resources/news/news-event-panels";
import { isBookingEnabled } from "@/data/resources/news/news-booking.config";
import type {
  DiaphragmPumpEngineeringArticleCopy,
  EngineeringArticleBlock,
} from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import type { NewsArticle, NewsLocale } from "@/data/resources/news/news.types";

export const EDITORIAL_NEWS_SLUGS: ReadonlySet<string> = new Set(["medica-2026"]);

export function isEditorialNewsArticle(slug: string) {
  return EDITORIAL_NEWS_SLUGS.has(slug);
}

const BACK_TEXT: Record<NewsLocale, string> = {
  "zh-CN": "返回",
  en: "Back",
  es: "Volver",
  fr: "Retour",
  ko: "돌아가기",
  ru: "Назад",
};

/* “标签：内容” —— 标签最长 28 个字符，且不含句读符号 */
const LEAD_PATTERN = /^([^：:。.!?！？，,]{1,28}[：:])\s*\S/;

/* ![图片说明](/images/xxx.webp 1200x760) */
const IMAGE_PATTERN = /^!\[([^\]]*)\]\((\S+)\s+(\d+)x(\d+)\)$/;

/* [文字](/链接) */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function toLinksBlock(line: string): EngineeringArticleBlock | null {
  const matches = [...line.matchAll(LINK_PATTERN)];
  if (!matches.length) return null;

  let cursor = 0;
  const items = matches.map((match) => {
    const item = {
      prefix: line.slice(cursor, match.index) || undefined,
      label: match[1],
      href: match[2],
    };
    cursor = (match.index ?? 0) + match[0].length;
    return item;
  });
  const suffix = line.slice(cursor);
  const last = items[items.length - 1];

  return {
    type: "links",
    items: items.map((item) => (item === last && suffix ? { ...item, suffix } : item)),
  };
}

function toBlocks(content: string): EngineeringArticleBlock[] {
  return content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line): EngineeringArticleBlock => {
      const image = line.match(IMAGE_PATTERN);
      if (image) {
        return {
          type: "figure",
          src: image[2],
          alt: image[1],
          caption: image[1],
          width: Number(image[3]),
          height: Number(image[4]),
        };
      }

      const links = toLinksBlock(line);
      if (links) return links;

      const match = line.match(LEAD_PATTERN);
      return match
        ? { type: "paragraph" as const, text: line, lead: match[1] }
        : { type: "paragraph" as const, text: line };
    });
}

export default function NewsEditorialArticle({
  article,
  locale,
}: {
  article: NewsArticle;
  locale: NewsLocale;
}) {
  const listHref = locale === "zh-CN" ? "/resources/news" : `/${locale}/resources/news`;
  const coverAlt = article.coverAlt ?? article.title;
  const eventPanel = getNewsEventPanel(article.slug, locale);

  const summaryBlocks = article.summary ? toBlocks(article.summary) : [];
  const coverBlocks: EngineeringArticleBlock[] = article.coverImage
    ? [{
        type: "figure",
        src: article.coverImage,
        alt: coverAlt,
        width: 1920,
        height: 1080,
        caption: coverAlt,
      }]
    : [];

  /* 有展会信息卡时：导语 → 信息卡 + 预约按钮 → 封面图；否则：导语 → 封面图 */
  const leadBlocks: EngineeringArticleBlock[] = eventPanel
    ? summaryBlocks
    : [...summaryBlocks, ...coverBlocks];
  const afterLeadContent = eventPanel ? (
    <>
      <NewsEventPanel config={eventPanel} locale={locale} variant="full" />
      {renderBlocks(coverBlocks, undefined, undefined, locale)}
    </>
  ) : undefined;
  /* 预约表单：≥1280px 为右侧第三栏（目录 / 正文 / 表单整体居中），<1280px 放在正文末尾 */
  const bookingEnabled = isBookingEnabled(article.slug);
  const bookingRail = bookingEnabled ? (
    <ExhibitionBookingAside slug={article.slug} locale={locale} variant="rail" />
  ) : undefined;
  const bookingInline = bookingEnabled ? (
    <ExhibitionBookingAside slug={article.slug} locale={locale} variant="inline" />
  ) : null;
  const afterBody = eventPanel ? (
    <>
      <NewsEventPanel config={eventPanel} locale={locale} variant="cta" />
      {bookingInline}
    </>
  ) : bookingInline ?? undefined;

  const copy: DiaphragmPumpEngineeringArticleCopy = {
    metadata: {
      title: article.title,
      seoTitle: article.seoTitle ?? article.title,
      seoDescription: article.seoDescription ?? article.summary,
      coverImage: article.coverImage,
      coverAlt,
    },
    deck: article.summary,
    leadBlocks,
    sections: article.content.map((block) => ({
      title: block.title,
      blocks: toBlocks(block.content),
    })),
    faqTitle: "",
    faqItems: [],
    cta: { title: "", description: "", contactLabel: "", productsLabel: "" },
  };

  /* 自定义锚点 id：避免落到模板默认的 parameters / validation 等特殊分区 */
  const sectionNavigation = article.content.map((block, index) => ({
    id: `news-section-${index + 1}`,
    label: block.title,
  }));

  return (
    <RplSelectionArticle
      copy={copy}
      date={article.date}
      locale={locale}
      listHref={listHref}
      backText={BACK_TEXT[locale]}
      articleId={`news-${article.slug}`}
      sectionNavigation={sectionNavigation}
      afterLeadContent={afterLeadContent}
      afterBody={afterBody}
      relatedProducts={bookingRail}
    />
  );
}
