/* =========================================================
   news-event-panels.ts
   恒永达官网｜新闻详情页 · 展会信息卡与预约按钮

   说明：
   1. 某篇展会新闻同时作为“落地页”时（例如全站顶部公告条的“了解详情”指向它），
      在导语下方显示关键信息卡 + “立即预约”按钮，并在正文末尾再放一次预约按钮
   2. 按 slug 配置；没有配置的新闻完全不受影响
   3. “立即预约”复用官网现有询盘弹窗（ContactInquiryLink）
   4. bookingOpen：是否显示预约按钮（预约表单做好后再改成 true；展会结束后改回 false）
   5. enabledLocales：哪些语言显示信息卡
   6. 删除整条配置，新闻恢复普通文章样式
========================================================= */

import type { NewsLocale } from "./news.types";

export type NewsEventPanelCopy = {
  /** 信息卡：时间、开馆时间、地点、展位 */
  facts: readonly { label: string; value: string }[];
  /** 预约按钮文字 */
  cta: string;
  /** 邮箱前的说明文字 */
  emailPrefix: string;
};

export type NewsEventPanelConfig = {
  /** 是否显示预约按钮（预约表单做好后再打开；展会结束后关闭） */
  bookingOpen: boolean;
  /** 哪些语言显示信息卡 */
  enabledLocales: readonly NewsLocale[];
  email: string;
  copy: Record<NewsLocale, NewsEventPanelCopy>;
};

export const newsEventPanels: Readonly<Record<string, NewsEventPanelConfig>> = {
  "medica-2026": {
    /* 预约表单做好后改成 true */
    bookingOpen: false,
    /* 6 种语言正文已同步（展会信息由信息卡展示，正文不再单列） */
    enabledLocales: ["zh-CN", "en", "es", "fr", "ko", "ru"],
    email: "info@foreachtek.com",
    copy: {
      "zh-CN": {
        facts: [
          { label: "时间", value: "2026 年 11 月 16 – 19 日" },
          { label: "开馆时间", value: "周一至周三 10:00–18:00，周四 10:00–16:00" },
          { label: "地点", value: "德国杜塞尔多夫展览中心（Messe Düsseldorf）" },
          { label: "展位", value: "1H39-1" },
        ],
        cta: "立即预约洽谈",
        emailPrefix: "也可发送邮件至",
      },
      en: {
        facts: [
          { label: "Dates", value: "November 16–19, 2026" },
          { label: "Opening hours", value: "Mon–Wed 10:00–18:00, Thu 10:00–16:00" },
          { label: "Venue", value: "Messe Düsseldorf, Germany" },
          { label: "Booth", value: "1H39-1" },
        ],
        cta: "Book a Meeting",
        emailPrefix: "Or email us at",
      },
      es: {
        facts: [
          { label: "Fechas", value: "16–19 de noviembre de 2026" },
          { label: "Horario", value: "lun.–mié. 10:00–18:00, jue. 10:00–16:00" },
          { label: "Lugar", value: "Messe Düsseldorf, Alemania" },
          { label: "Stand", value: "1H39-1" },
        ],
        cta: "Reservar reunión",
        emailPrefix: "O escríbanos a",
      },
      fr: {
        facts: [
          { label: "Dates", value: "16–19 novembre 2026" },
          { label: "Horaires", value: "lun.–mer. 10h00–18h00, jeu. 10h00–16h00" },
          { label: "Lieu", value: "Messe Düsseldorf, Allemagne" },
          { label: "Stand", value: "1H39-1" },
        ],
        cta: "Prendre rendez-vous",
        emailPrefix: "Ou écrivez-nous à",
      },
      ko: {
        facts: [
          { label: "일정", value: "2026년 11월 16~19일" },
          { label: "운영 시간", value: "월–수 10:00–18:00, 목 10:00–16:00" },
          { label: "장소", value: "독일 뒤셀도르프 메세(Messe Düsseldorf)" },
          { label: "부스", value: "1H39-1" },
        ],
        cta: "미팅 예약",
        emailPrefix: "이메일 문의:",
      },
      ru: {
        facts: [
          { label: "Даты", value: "16–19 ноября 2026 г." },
          { label: "Часы работы", value: "пн–ср 10:00–18:00, чт 10:00–16:00" },
          { label: "Место", value: "Messe Düsseldorf, Германия" },
          { label: "Стенд", value: "1H39-1" },
        ],
        cta: "Назначить встречу",
        emailPrefix: "Или напишите нам:",
      },
    },
  },
};

export function getNewsEventPanel(slug: string, locale: NewsLocale) {
  const config = newsEventPanels[slug];
  return config && config.enabledLocales.includes(locale) ? config : undefined;
}
