"use client";

/* =========================================================
   SiteAnnouncementBar.tsx
   恒永达官网｜全站顶部公告条（放在 SiteHeader 的 <header> 里第一行）

   说明：
   1. 内容、时间、链接全部来自 data/site-announcement.ts
   2. 布局调整全部写在 SiteAnnouncementBar.css，且只在公告条存在时生效；
      公告条不渲染时，网站布局与原来完全一致
   3. 显示哪套文案、是否显示，全部在 data/site-announcement.ts 手动控制（不按时间自动切换）
   4. 左侧：展会名标签 + 展位 + 地点 · 日期（地点、日期加粗）；右侧：两个按钮
   5. “立即预约”：配置了 bookingSlug 且预约开启 → 打开「预约现场洽谈」弹窗（ExhibitionBookingLink）；
      否则复用官网现有询盘弹窗（ContactInquiryLink）。两种都是点击时才加载表单
========================================================= */

import Link from "next/link";

import ContactInquiryLink from "@/components/contact/ContactInquiryLink";
import ExhibitionBookingLink from "@/components/resources/news/exhibition/ExhibitionBookingLink";
import { isBookingEnabled } from "@/data/resources/news/news-booking.config";
import { siteAnnouncement } from "@/data/site-announcement";
import type { LocaleCode } from "@/lib/i18n";

import "./SiteAnnouncementBar.css";

export default function SiteAnnouncementBar({ locale }: { locale: LocaleCode }) {
  const config = siteAnnouncement;

  /* 关闭：data/site-announcement.ts 里 siteAnnouncement = null */
  if (!config) return null;

  const phase = config.phase;

  const copy = config.copy[locale] ?? config.copy.en;
  const text = copy[phase];
  const detailsHref = config.detailsHref[locale] ?? config.detailsHref.en;
  const bookHref = config.bookHref[locale] ?? config.bookHref.en;
  const opensBookingDialog = Boolean(config.bookingSlug) && isBookingEnabled(config.bookingSlug);

  return (
    <aside
      className="site-announcement"
      aria-label={copy.ariaLabel}
      data-announcement-id={config.id}
      data-announcement-phase={phase}
    >
      <div className="site-announcement__inner">
        <Link className="site-announcement__message" href={detailsHref}>
          <span className="site-announcement__tag">{text.tag}</span>
          <span className="site-announcement__booth">{text.booth}</span>
          <span className="site-announcement__highlight">
            <span className="site-announcement__place">
              <span className="site-announcement__full">{text.place}</span>
              <span className="site-announcement__compact">{text.placeShort}</span>
            </span>
            <span className="site-announcement__date">{text.date}</span>
          </span>
        </Link>

        <div className="site-announcement__actions">
          <Link className="site-announcement__button site-announcement__button--secondary" href={detailsHref}>
            {copy.details}
          </Link>
          {opensBookingDialog ? (
            <ExhibitionBookingLink
              className="site-announcement__button site-announcement__button--primary"
              href={bookHref}
              bookingLocale={locale}
            >
              {copy.book}
            </ExhibitionBookingLink>
          ) : (
            <ContactInquiryLink
              className="site-announcement__button site-announcement__button--primary"
              href={bookHref}
              inquiryLocale={locale}
            >
              {copy.book}
            </ContactInquiryLink>
          )}
        </div>
      </div>
    </aside>
  );
}
