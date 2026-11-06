/* =========================================================
   NewsEventPanel
   恒永达官网｜展会新闻 · 关键信息卡 + 预约按钮

   说明：
   1. variant="full"：导语下方，显示时间 / 开馆时间 / 地点 / 展位 + 预约按钮
   2. variant="cta"：正文末尾，只显示预约按钮 + 邮箱
   3. 内容来自 data/resources/news/news-event-panels.ts
   4. “立即预约”复用官网现有询盘弹窗（ContactInquiryLink），无 JS 时跳转联系页
========================================================= */

import ContactInquiryLink from "@/components/contact/ContactInquiryLink";
import type { NewsEventPanelConfig } from "@/data/resources/news/news-event-panels";
import type { NewsLocale } from "@/data/resources/news/news.types";
import type { LocaleCode } from "@/lib/i18n";

import styles from "./NewsEventPanel.module.css";

export default function NewsEventPanel({
  config,
  locale,
  variant,
}: {
  config: NewsEventPanelConfig;
  locale: NewsLocale;
  variant: "full" | "cta";
}) {
  const copy = config.copy[locale] ?? config.copy.en;
  const contactHref = locale === "zh-CN" ? "/contact" : `/${locale}/contact`;

  if (variant === "cta" && !config.bookingOpen) return null;

  return (
    <div className={styles.panel} data-variant={variant} data-news-event-panel>
      {variant === "full" && (
        <dl className={styles.facts}>
          {copy.facts.map((fact) => (
            <div className={styles.fact} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {config.bookingOpen && (
        <div className={styles.actions}>
          <ContactInquiryLink
            className={styles.button}
            href={contactHref}
            inquiryLocale={locale as LocaleCode}
          >
            {copy.cta}
          </ContactInquiryLink>
          <p className={styles.email}>
            {copy.emailPrefix} <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
        </div>
      )}
    </div>
  );
}
