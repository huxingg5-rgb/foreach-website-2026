"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import type { ContactPageData } from "@/data/contact-cooperation";
import type { LocaleCode } from "@/lib/i18n";
import { inquiryModalCopy } from "@/data/contact-cooperation/inquiry-modal.copy";
import styles from "./ContactInquiryModal.module.css";

type ContactInquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDraftStart?: () => void;
  onComplete?: () => void;
  data: ContactPageData;
  locale: LocaleCode;
  initialValues?: { requestType?: string; productType?: string };
  analyticsSourceSection?: string;
};

export default function ContactInquiryModal({
  isOpen, onClose, onDraftStart, onComplete, data, locale, initialValues,
  analyticsSourceSection,
}: ContactInquiryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const { title, description, closeLabel } = inquiryModalCopy[locale];

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
    // The native top layer makes the background inert and avoids clipping by page layout.
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  // Avoid inheriting banner-specific descendant styles from the trigger's page.
  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button, input:not([type="hidden"]), select, textarea, a[href], [tabindex]',
        )).filter((element) => !element.matches(":disabled") && element.tabIndex >= 0 && element.getClientRects().length > 0);
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
        if (event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <header className={styles.header}>
        <div>
          <h2 id={titleId}>{title}</h2>
          <p id={descriptionId}>{description}</p>
        </div>
        <button ref={closeRef} type="button" aria-label={closeLabel} onClick={onClose}>
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
        <ContactInquiryForm
          data={data}
          initialValues={initialValues}
          variant="modal"
          onSuccessClose={onComplete ?? onClose}
          onDraftStart={onDraftStart}
          analyticsSourceSection={analyticsSourceSection}
        />
      </div>
    </dialog>,
    document.body,
  );
}
