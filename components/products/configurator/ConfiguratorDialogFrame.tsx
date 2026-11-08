"use client";

import type { ReactNode, Ref } from "react";
import { createPortal } from "react-dom";
import ConfiguratorButton from "./ConfiguratorButton";
import shared from "./product-variant-configurator.module.css";
import styles from "./ConfiguratorDialogFrame.module.css";

type Props = {
  dialogRef: Ref<HTMLElement>;
  closeRef: Ref<HTMLButtonElement>;
  locale: string;
  titleId: string;
  descriptionId: string;
  title: ReactNode;
  description: ReactNode;
  closeLabel: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
  notice: ReactNode;
  actions: ReactNode;
};

/** Shared hard-tube dialog layout; each selector owns its fields and focus lifecycle. */
export default function ConfiguratorDialogFrame({
  dialogRef,
  closeRef,
  locale,
  titleId,
  descriptionId,
  title,
  description,
  closeLabel,
  onClose,
  className,
  children,
  notice,
  actions,
}: Props) {
  return createPortal(
    <div className={`${shared.overlay} ${styles.overlay}`}>
      <section
        ref={dialogRef}
        className={[shared.selector, styles.dialog, className].filter(Boolean).join(" ")}
        lang={locale}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <header className={shared.header}>
          <div className={shared.headerText}>
            <h2 id={titleId}>{title}</h2>
            <p id={descriptionId}>{description}</p>
          </div>
          <ConfiguratorButton ref={closeRef} variant="close" aria-label={closeLabel} onClick={onClose} />
        </header>
        {children}
        <footer className={`${shared.footer} ${styles.footer}`}>
          <div className={`${shared.notice} ${styles.notice}`}>{notice}</div>
          <div className={shared.actions}>{actions}</div>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
