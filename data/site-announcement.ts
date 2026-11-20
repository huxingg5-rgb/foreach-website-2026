/* =========================================================
   site-announcement.ts
   恒永达官网｜全站顶部公告条配置

   说明：
   1. 公告条显示在顶部导航的第一行，跟随导航一直置顶
   2. 全部手动控制，不按时间自动切换：
        phase: "upcoming" → 展会邀请（展前）
        phase: "live"     → 展会进行中（展期，需要时手动改）
   3. 关闭公告条：把 siteAnnouncement 改成 null，提交发布即可；
      布局让位规则只在公告条存在时生效，关闭后全站恢复原样
   4. 彻底删除：删除本文件、components/layout/SiteAnnouncementBar.tsx、
      components/layout/SiteAnnouncementBar.css，并去掉 SiteHeader.tsx 里的 2 行
   5. 下次参展：只改本文件的时间、文案、链接即可复用
========================================================= */

import type { LocaleCode } from "@/lib/i18n";

export type SiteAnnouncementPhase = "upcoming" | "live";

type PhaseCopy = {
  /** 青绿色标签：展会名 */
  tag: string;
  /** 常规字：展位 */
  booth: string;
  /** 粗体：地点（最重要） */
  place: string;
  /** 手机端地点 */
  placeShort: string;
  /** 粗体：日期（平板及以下隐藏） */
  date: string;
};

export type SiteAnnouncementConfig = {
  id: string;
  /** 当前显示哪一套文案（手动切换） */
  phase: SiteAnnouncementPhase;
  /** “了解详情”链接 */
  detailsHref: Record<LocaleCode, string>;
  /** “立即预约”无 JS 时的兜底链接；有 JS 时打开弹窗 */
  bookHref: Record<LocaleCode, string>;
  /**
   * “立即预约”打开「预约现场洽谈」弹窗时对应的展会 slug（选填）
   * 填了且 data/resources/news/news-booking.config.ts 里已开启 → 打开预约弹窗
   * 不填或预约已暂停 → 打开原来的「联系我们」询盘弹窗
   */
  bookingSlug?: string;
  copy: Record<
    LocaleCode,
    {
      ariaLabel: string;
      details: string;
      book: string;
      upcoming: PhaseCopy;
      live: PhaseCopy;
    }
  >;
};

export const siteAnnouncement: SiteAnnouncementConfig | null = null;
