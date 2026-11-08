"use client";

/* =========================================================
   ExhibitionBookingAside.tsx
   恒永达官网｜展会文章预约表单（与左侧「本文目录」同款样式）

   两种放法（都在 NewsEditorialArticle 里）：
   1. variant="rail"：传给 RplSelectionArticle 的 relatedProducts，成为右侧第三栏
      ≥1280px：目录 / 正文 / 表单 三栏整体居中，表单与目录一样 sticky 停住
      <1280px：隐藏
   2. variant="inline"：放在 afterBody（正文末尾）
      <1280px：显示在正文末尾；≥1280px：隐藏
   三栏布局规则见 exhibition-booking-layout.css（只对带预约表单的文章生效）

   暂停：data/resources/news/news-booking.config.ts 里 enabled 改成 false

   字段：姓名* / 邮箱* / 联系方式（选填）/ 留言（选填）/ 上传附件 / 发送
   接口：POST /api/inquiry/booking（同一 IP 每小时最多 5 次；附件最多 5 个、合计 20 MB）
========================================================= */

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  trackBeginInquiry,
  trackFormStart,
  trackInquirySubmitError,
  trackLeadGenerated,
  type InquiryErrorType,
} from "@/lib/analytics/track-event";
import {
  MEDICA_BOOKING_COPY,
  MEDICA_BOOKING_FORM_ID,
  type MedicaBookingLocale,
} from "@/data/resources/news/medica-2026-booking";
import { isBookingEnabled } from "@/data/resources/news/news-booking.config";
import {
  addBookingFiles,
  BOOKING_ATTACHMENT_ACCEPT,
  formatBookingFileSize,
  submitBooking,
} from "./booking-submit";
import "./exhibition-booking-layout.css";
import styles from "./ExhibitionBookingAside.module.css";

type Notice = { tone: "success" | "error"; text: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ExhibitionBookingAside({
  slug,
  locale = "zh-CN",
  variant = "rail",
}: {
  /** 新闻 slug：不在 news-booking.config.ts 的名单里就不显示 */
  slug?: string;
  locale?: MedicaBookingLocale;
  /** rail = 右侧第三栏（宽屏）；inline = 正文末尾（窄屏） */
  variant?: "rail" | "inline";
}) {
  const copy = MEDICA_BOOKING_COPY[locale] ?? MEDICA_BOOKING_COPY["zh-CN"];
  const titleId = useId();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const formStartedRef = useRef(false);

  const analytics = {
    formId: MEDICA_BOOKING_FORM_ID,
    formType: "event_booking",
    sourceSection: variant === "rail" ? "exhibition_article_right_rail" : "exhibition_article_end",
  };

  function handleFirstInteraction() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackBeginInquiry({ ...analytics, locale });
    trackFormStart({ ...analytics, locale });
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const result = addBookingFiles(files, Array.from(event.target.files ?? []));
    event.target.value = "";
    setFiles(result.files);
    if (result.rejected) {
      fail(copy.messages.attachmentInvalid, "attachment_error", "client_validation");
    } else {
      setNotice(null);
    }
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
  }

  function fail(text: string, errorType: InquiryErrorType, stage: string) {
    setNotice({ tone: "error", text });
    trackInquirySubmitError({ ...analytics, locale, errorType, submissionStage: stage });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    if (!name.trim()) return fail(copy.messages.nameRequired, "validation_error", "client_validation");
    if (!isValidEmail(email.trim())) return fail(copy.messages.emailInvalid, "validation_error", "client_validation");

    setIsSubmitting(true);
    const result = await submitBooking(
      {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        message: message.trim(),
        locale,
        currentUrl: window.location.href,
      },
      files,
    );
    setIsSubmitting(false);

    if (!result.ok) {
      return fail(copy.messages[result.reason], result.errorType, "api_submit");
    }

    setNotice({ tone: "success", text: copy.messages.submitSuccess });
    trackLeadGenerated({ ...analytics, locale });
    setName("");
    setContact("");
    setEmail("");
    setMessage("");
    setFiles([]);
    formStartedRef.current = false;
  }

  if (!isBookingEnabled(slug)) return null;

  const form = (
    <section className={styles.card} aria-labelledby={titleId}>
      <p id={titleId} className={styles.heading}>
        {copy.title}
      </p>

      <form className={styles.body} onSubmit={handleSubmit} onFocus={handleFirstInteraction} noValidate>
        <label className={styles.field}>
          <span className={styles.label}>
            {copy.name}
            <em aria-hidden="true">*</em>
          </span>
          <input
            className={styles.input}
            name="name"
            autoComplete="name"
            required
            value={name}
            placeholder={copy.namePlaceholder}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            {copy.email}
            <em aria-hidden="true">*</em>
          </span>
          <input
            className={styles.input}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            placeholder={copy.emailPlaceholder}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{copy.contact}</span>
          <input
            className={styles.input}
            name="contact"
            type="tel"
            autoComplete="tel"
            value={contact}
            placeholder={copy.contactPlaceholder}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{copy.message}</span>
          <textarea
            className={styles.textarea}
            name="message"
            rows={3}
            maxLength={1000}
            value={message}
            placeholder={copy.messagePlaceholder}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <div className={styles.attach}>
          <label className={styles.fileButton} data-disabled={isSubmitting || undefined}>
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M13.5 6.5 7.7 12.3a1.6 1.6 0 0 0 2.3 2.3l6.1-6.1a3.2 3.2 0 0 0-4.5-4.5L5.4 10.2a4.8 4.8 0 0 0 6.8 6.8l4.3-4.3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {copy.attach}
            <input
              type="file"
              name="attachments"
              multiple
              accept={BOOKING_ATTACHMENT_ACCEPT}
              disabled={isSubmitting}
              onChange={handleFileChange}
            />
          </label>
          <span className={styles.fileTip}>{copy.attachTip}</span>

          {files.length > 0 ? (
            <ul className={styles.fileList}>
              {files.map((file, index) => (
                <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                  <span className={styles.fileName} title={file.name}>
                    {file.name}
                  </span>
                  <span className={styles.fileSize}>{formatBookingFileSize(file.size)}</span>
                  <button
                    type="button"
                    aria-label={`${copy.removeFile} ${file.name}`}
                    title={copy.removeFile}
                    disabled={isSubmitting}
                    onClick={() => removeFile(index)}
                  >
                    <svg viewBox="0 0 20 20" width="12" height="12" fill="none" aria-hidden="true" focusable="false">
                      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submit}
        </button>

        <p className={styles.notice} role="status" aria-live="polite" data-tone={notice?.tone}>
          {notice?.text}
        </p>
      </form>
    </section>
  );

  return variant === "rail" ? (
    <aside className={styles.rail} data-booking-rail>
      <div className={styles.sticky}>{form}</div>
    </aside>
  ) : (
    <div className={styles.inline} data-booking-inline>
      {form}
    </div>
  );
}
