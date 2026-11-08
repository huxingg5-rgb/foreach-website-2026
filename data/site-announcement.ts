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

const localePath = (locale: LocaleCode, path: string) =>
  locale === "zh-CN" ? path : `/${locale}${path}`;

const allLocales: LocaleCode[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];

const perLocale = (path: string) =>
  Object.fromEntries(allLocales.map((locale) => [locale, localePath(locale, path)])) as Record<LocaleCode, string>;

export const siteAnnouncement: SiteAnnouncementConfig | null = {
  id: "medica-2026",
  /* 手动切换：展前 "upcoming"；展期想显示“进行中”时改成 "live" */
  phase: "upcoming",
  detailsHref: perLocale("/resources/news/medica-2026"),
  bookHref: perLocale("/contact"),
  /* “立即预约”打开「预约现场洽谈」弹窗；删掉这一行即恢复「联系我们」弹窗 */
  bookingSlug: "medica-2026",
  copy: {
    "zh-CN": {
      ariaLabel: "展会公告",
      details: "了解详情",
      book: "立即预约",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "恒永达展位 1H39-1",
        place: "德国杜塞尔多夫医疗展",
        placeShort: "杜塞尔多夫医疗展",
        date: "11月16 – 19日",
      },
      live: {
        tag: "MEDICA 2026 · 进行中",
        booth: "恒永达展位 1H39-1，欢迎莅临",
        place: "德国杜塞尔多夫医疗展",
        placeShort: "杜塞尔多夫医疗展",
        date: "11月16 – 19日",
      },
    },
    en: {
      ariaLabel: "Event announcement",
      details: "Learn More",
      book: "Book a Meeting",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "Foreach Booth 1H39-1",
        place: "Medical Trade Fair in Düsseldorf, Germany",
        placeShort: "Düsseldorf",
        date: "Nov 16–19",
      },
      live: {
        tag: "MEDICA 2026 · Live",
        booth: "Foreach Booth 1H39-1",
        place: "Medical Trade Fair in Düsseldorf, Germany",
        placeShort: "Düsseldorf",
        date: "Nov 16–19",
      },
    },
    /* 以下 4 种语言为初稿，待审核 */
    es: {
      ariaLabel: "Anuncio de feria",
      details: "Más información",
      book: "Reservar reunión",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "Stand de Foreach 1H39-1",
        place: "Feria médica en Düsseldorf, Alemania",
        placeShort: "Düsseldorf",
        date: "16–19 nov",
      },
      live: {
        tag: "MEDICA 2026 · En directo",
        booth: "Stand de Foreach 1H39-1",
        place: "Feria médica en Düsseldorf, Alemania",
        placeShort: "Düsseldorf",
        date: "16–19 nov",
      },
    },
    fr: {
      ariaLabel: "Annonce salon",
      details: "En savoir plus",
      book: "Prendre rendez-vous",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "Stand Foreach 1H39-1",
        place: "Salon médical à Düsseldorf, Allemagne",
        placeShort: "Düsseldorf",
        date: "16–19 nov.",
      },
      live: {
        tag: "MEDICA 2026 · En direct",
        booth: "Stand Foreach 1H39-1",
        place: "Salon médical à Düsseldorf, Allemagne",
        placeShort: "Düsseldorf",
        date: "16–19 nov.",
      },
    },
    ko: {
      ariaLabel: "전시회 안내",
      details: "자세히 보기",
      book: "미팅 예약",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "Foreach 부스 1H39-1",
        place: "독일 뒤셀도르프 의료기기 전시회",
        placeShort: "뒤셀도르프",
        date: "11월 16~19일",
      },
      live: {
        tag: "MEDICA 2026 · 진행 중",
        booth: "Foreach 부스 1H39-1",
        place: "독일 뒤셀도르프 의료기기 전시회",
        placeShort: "뒤셀도르프",
        date: "11월 16~19일",
      },
    },
    ru: {
      ariaLabel: "Объявление о выставке",
      details: "Подробнее",
      book: "Назначить встречу",
      upcoming: {
        tag: "MEDICA 2026",
        booth: "Стенд Foreach 1H39-1",
        place: "Медицинская выставка, Дюссельдорф",
        placeShort: "Дюссельдорф",
        date: "16–19 ноября",
      },
      live: {
        tag: "MEDICA 2026 · Сейчас",
        booth: "Стенд Foreach 1H39-1",
        place: "Медицинская выставка, Дюссельдорф",
        placeShort: "Дюссельдорф",
        date: "16–19 ноября",
      },
    },
  },
};
