"use client";

import Link from "next/link";
import styles from "./ResourcePagination.module.css";

type ResourcePaginationProps = {
  currentPage: number;
  totalPages: number;
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
} & (
  | { getPageHref: (page: number) => string; onPageChange?: never }
  | { onPageChange: (page: number) => void; getPageHref?: never }
);

/** Shared controls for resource lists, with crawlable links for static pages. */
export default function ResourcePagination({
  currentPage, totalPages, ariaLabel, previousLabel, nextLabel,
  getPageHref, onPageChange,
}: ResourcePaginationProps) {
  if (totalPages <= 1) return null;

  function control(page: number, label: string, rel: "prev" | "next") {
    const disabled = page < 1 || page > totalPages;
    if (!disabled && getPageHref) {
      return <Link className={styles.button} href={getPageHref(page)} rel={rel} prefetch={false}>{label}</Link>;
    }
    return <button type="button" className={styles.button} disabled={disabled}
      onClick={() => onPageChange?.(page)}>{label}</button>;
  }

  return (
    <nav className={styles.pagination} aria-label={ariaLabel}>
      {control(currentPage - 1, previousLabel, "prev")}
      <span className={styles.status} aria-live="polite">{currentPage} / {totalPages}</span>
      {control(currentPage + 1, nextLabel, "next")}
    </nav>
  );
}
