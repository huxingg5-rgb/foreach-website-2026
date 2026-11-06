"use client";

/* =========================================================
   ExhibitionBookingDialog.tsx
   恒永达官网｜「预约现场洽谈」弹窗（顶部公告条“立即预约”专用）

   说明：
   1. 外框与「联系我们」弹窗同款（深蓝标题栏 + 关闭按钮 + 白底），
      样式单独放在 ExhibitionBookingDialog.module.css，不改原弹窗
   2. 字段与文章右侧预约表单一致：姓名* / 邮箱* / 联系方式（选填）/ 留言（选填）/ 上传附件 / 发送
   3. 接口：POST /api/inquiry/booking（与右侧表单同一接口、同一限流：每 IP 每小时 5 次）
      附件最多 5 个、合计 20 MB，作为邮件附件发到询盘邮箱
   4. 由 ExhibitionBookingLink 点击后才加载，不增加首屏体积
   5. 暂停：data/resources/news/news-booking.config.ts 里 enabled 改成 false，
      公告条按钮会自动换回原来的「联系我们」弹窗
========================================================= */

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  trackBeginInquiry,
  trackFormStart,
  trackInquirySubmitError,
  trackLeadGenerated,
  type InquiryErrorType,
} from "@/lib/analytics/track-event";
import { MEDICA_BOOKING_COPY, MEDICA_BOOKING_FORM_ID } from "@/data/resources/news/medica-2026-booking";
import { EXHIBITION_BOOKING_DIALOG_COPY } from "@/data/resources/news/exhibition-booking-dialog.copy";
import type { LocaleCode } from "@/lib/i18n";
import {
  addBookingFiles,
  BOOKING_ATTACHMENT_ACCEPT,
  formatBookingFileSize,
  submitBooking,
} from "./booking-submit";
import styles from "./ExhibitionBookingDialog.module.css";

type Props = {
  locale: LocaleCode;
  isOpen: boolean;
  /** 关闭弹窗（已填写内容时保留草稿） */
  onClose: () => void;
  /** 开始填写时通知外层，关闭后保留草稿 */
  onDraftStart: () => void;
  /** 提交成功并点“完成”后，外层卸载弹窗、清空表单 */
  onComplete: () => void;
  /** 统计来源，默认顶部公告条 */
  sourceSection?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ExhibitionBookingDialog({
  locale,
  isOpen,
  onClose,
  onDraftStart,
  onComplete,
  sourceSection = "site_announcement_bar",
}: Props) {
  const copy = MEDICA_BOOKING_COPY[locale] ?? MEDICA_BOOKING_COPY["zh-CN"];
  const dialogCopy = EXHIBITION_BOOKING_DIALOG_COPY[locale] ?? EXHIBITION_BOOKING_DIALOG_COPY["zh-CN"];

  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const fieldId = useId();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);
  const formStartedRef = useRef(false);
  const draftStartedRef = useRef(false);

  const analytics = {
    formId: MEDICA_BOOKING_FORM_ID,
    formType: "event_booking",
    sourceSection,
    locale,
  };

  /* 打开：原生 showModal（背景不可点、不被页面布局裁切）+ 锁定页面滚动；关闭时还原 */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const previousFocus = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbarWidth}px`;
    }
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    trackBeginInquiry({ formId: MEDICA_BOOKING_FORM_ID, formType: "event_booking", sourceSection, locale });

    return () => {
      dialog.close();
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, locale, sourceSection]);

  useEffect(() => {
    if (isDone) successRef.current?.focus({ preventScroll: true });
  }, [isDone]);

  /* 提交成功后再关闭 = 完成，下次打开是空表单 */
  function handleClose() {
    if (isDone) onComplete();
    else onClose();
  }

  function handleFirstFocus() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStart(analytics);
  }

  function markDraft() {
    if (draftStartedRef.current) return;
    draftStartedRef.current = true;
    onDraftStart();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const result = addBookingFiles(files, Array.from(event.target.files ?? []));
    event.target.value = "";
    setFiles(result.files);
    if (result.rejected) {
      fail(copy.messages.attachmentInvalid, "attachment_error", "client_validation");
    } else {
      setError("");
    }
    if (result.files.length > 0) markDraft();
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
  }

  function fail(text: string, errorType: InquiryErrorType, stage: string) {
    setError(text);
    trackInquirySubmitError({ ...analytics, errorType, submissionStage: stage });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

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

    trackLeadGenerated(analytics);
    setIsDone(true);
  }

  if (typeof document === "undefined") return null;

  /* 挂到 body 上，避免继承公告条 / 页面里的后代样式 */
  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button, input:not([type="hidden"]), select, textarea, a[href], [tabindex]',
          ),
        ).filter(
          (element) => !element.matches(":disabled") && element.tabIndex >= 0 && element.getClientRects().length > 0,
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          handleClose();
        }
      }}
    >
      <header className={styles.header}>
        <div>
          <h2 id={titleId}>{copy.title}</h2>
          <p id={descriptionId}>{copy.subtitle}</p>
        </div>
        <button ref={closeRef} type="button" aria-label={dialogCopy.closeLabel} onClick={handleClose}>
          <svg
            viewBox="0 0 20 20"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            focusable="false"
            aria-hidden="true"
          >
            <path d="M5 5L15 15M15 5L5 15" />
          </svg>
        </button>
      </header>

      <div className={styles.body}>
        {isDone ? (
          <div className={styles.success} ref={successRef} tabIndex={-1} role="status">
            <div className={styles.successIcon} aria-hidden="true">
              ✓
            </div>
            <h3>{dialogCopy.successTitle}</h3>
            <p>{copy.messages.submitSuccess}</p>
            <button type="button" className={styles.submit} onClick={onComplete}>
              {dialogCopy.done}
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} onFocus={handleFirstFocus} noValidate>
            <div className={styles.grid}>
              <div className={`${styles.field} ${styles.nameField}`}>
                <label className={styles.label} htmlFor={`${fieldId}-name`}>
                  {copy.name}
                  <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${fieldId}-name`}
                  className={styles.input}
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  placeholder={copy.namePlaceholder}
                  onChange={(event) => {
                    setName(event.target.value);
                    markDraft();
                  }}
                />
              </div>

              <div className={`${styles.field} ${styles.emailField}`}>
                <label className={styles.label} htmlFor={`${fieldId}-email`}>
                  {copy.email}
                  <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${fieldId}-email`}
                  className={styles.input}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  placeholder={copy.emailPlaceholder}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    markDraft();
                  }}
                />
              </div>

              <div className={`${styles.field} ${styles.full}`}>
                <label className={styles.label} htmlFor={`${fieldId}-contact`}>
                  {copy.contact}
                </label>
                <input
                  id={`${fieldId}-contact`}
                  className={styles.input}
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  value={contact}
                  placeholder={copy.contactPlaceholder}
                  onChange={(event) => {
                    setContact(event.target.value);
                    markDraft();
                  }}
                />
              </div>

              <div className={`${styles.field} ${styles.full}`}>
                <label className={styles.label} htmlFor={`${fieldId}-message`}>
                  {copy.message}
                </label>
                <textarea
                  id={`${fieldId}-message`}
                  className={styles.textarea}
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={message}
                  placeholder={copy.messagePlaceholder}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    markDraft();
                  }}
                />
              </div>

              {files.length > 0 ? (
                <ul className={`${styles.full} ${styles.fileList}`}>
                  {files.map((file, index) => (
                    <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                      <span className={styles.fileName}>{file.name}</span>
                      <span className={styles.fileSize}>{formatBookingFileSize(file.size)}</span>
                      <button
                        type="button"
                        aria-label={`${copy.removeFile} ${file.name}`}
                        disabled={isSubmitting}
                        onClick={() => removeFile(index)}
                      >
                        {copy.removeFile}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* 提交区：左侧附件说明 / 错误提示，右侧「上传附件」+「发送」 */}
            <div className={styles.actions}>
              <div className={styles.actionsText}>
                <span className={styles.fileTip}>{copy.attachTip}</span>
                <p className={styles.notice} role="status" aria-live="polite">
                  {error}
                </p>
              </div>
              <div className={styles.buttons}>
                <label className={styles.fileButton} data-disabled={isSubmitting || undefined}>
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false">
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
                <button type="submit" className={styles.submit} disabled={isSubmitting}>
                  {isSubmitting ? copy.submitting : copy.submit}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
