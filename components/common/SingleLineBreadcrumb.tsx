"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./SiteBreadcrumb.module.css";

type BreadcrumbEntry = { label: string; content: ReactNode };

function Separator() {
  return <span className={styles.separator} aria-hidden="true">/</span>;
}

export default function SingleLineBreadcrumb({ items, overflowLabel }: {
  items: readonly BreadcrumbEntry[];
  overflowLabel: string;
}) {
  const row = useRef<HTMLDivElement>(null);
  const measurement = useRef<HTMLDivElement>(null);
  const ancestors = items.slice(0, -1);
  const current = items[items.length - 1];
  const [visibleCount, setVisibleCount] = useState(Math.min(2, ancestors.length));

  useEffect(() => {
    const rowElement = row.current;
    const measureElement = measurement.current;
    if (!rowElement || !measureElement) return;

    const observer = new ResizeObserver(() => {
      const availableWidth = rowElement.getBoundingClientRect().width;
      const widths = Array.from(measureElement.children, entry => entry.getBoundingClientRect().width);
      const overflowWidth = widths.pop() ?? 0;
      const currentWidth = widths.pop() ?? 0;
      // Keep the leading links readable and leave room for the current label on narrow screens.
      const currentSpace = Math.min(currentWidth, availableWidth / 5, 112);
      const ancestorsWidth = widths.reduce((total, width) => total + width, 0);

      if (ancestorsWidth + currentSpace <= availableWidth) {
        setVisibleCount(widths.length);
        return;
      }

      const budget = availableWidth - currentSpace - overflowWidth;
      let used = 0;
      let count = 0;
      for (const width of widths) {
        if (used + width > budget) break;
        used += width;
        count += 1;
      }
      setVisibleCount(count);
    });

    observer.observe(rowElement);
    observer.observe(measureElement);
    return () => observer.disconnect();
  }, [items]);

  const hidden = ancestors.slice(visibleCount);

  return (
    <div className={`${styles.inner} ${styles.singleLine}`} ref={row}>
      {ancestors.slice(0, visibleCount).map((item, index) => (
        <span className={styles.item} key={`${item.label}-${index}`}>
          {item.content}<Separator />
        </span>
      ))}
      {hidden.length > 0 && (
        <div className={styles.item}>
          <details onKeyDown={event => {
            if (event.key !== "Escape" || !event.currentTarget.open) return;
            event.currentTarget.open = false;
            event.currentTarget.querySelector("summary")?.focus();
          }}>
            <summary className={styles.overflowToggle} aria-label={overflowLabel}>…</summary>
            <ul className={styles.overflowLinks}>
              {hidden.map((item, index) => <li key={`${item.label}-${index}`}>{item.content}</li>)}
            </ul>
          </details>
          <Separator />
        </div>
      )}
      <span className={`${styles.item} ${styles.currentItem}`} title={current.label}>
        {current.content}
      </span>
      <div className={styles.measureClip} aria-hidden="true">
        <div className={styles.measureRow} ref={measurement}>
          {items.map((item, index) => (
            <span className={styles.item} key={`${item.label}-${index}`}>
              {item.label}{index < items.length - 1 && <Separator />}
            </span>
          ))}
          <span className={styles.item}><span className={styles.overflowToggle}>…</span><Separator /></span>
        </div>
      </div>
    </div>
  );
}
