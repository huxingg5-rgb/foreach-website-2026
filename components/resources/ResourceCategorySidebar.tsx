"use client";

import { useId } from "react";
import styles from "./ResourceCategorySidebar.module.css";

type CategoryOption = {
  id: string;
  label: string;
  countLabel: string;
  active: boolean;
  onSelect: () => void;
};

export type ResourceCategoryItem = CategoryOption & {
  expanded?: boolean;
  children?: readonly CategoryOption[];
};

type ResourceCategorySidebarProps = {
  title: string;
  items: readonly ResourceCategoryItem[];
};

/** Shared presentation; each resource page owns its filters and navigation. */
export default function ResourceCategorySidebar({ title, items }: ResourceCategorySidebarProps) {
  const id = useId();

  return (
    <aside className={styles.sidebar} aria-labelledby={`${id}-title`}>
      <h2 className={styles.title} id={`${id}-title`}>{title}</h2>
      <div className={styles.list}>
        {items.map((item, index) => {
          const hasChildren = Boolean(item.children?.length);
          const expanded = hasChildren && Boolean(item.expanded);
          const triggerId = `${id}-${index}-trigger`;
          const panelId = `${id}-${index}-panel`;

          return (
            <div className={styles.group} key={item.id}>
              <button
                type="button"
                id={triggerId}
                className={`${styles.button} ${styles.primary} ${item.active ? styles.active : ""}`}
                aria-pressed={item.active}
                aria-expanded={hasChildren ? expanded : undefined}
                aria-controls={expanded ? panelId : undefined}
                onClick={item.onSelect}
              >
                <span className={styles.label}>
                  {item.label}<span className={styles.count}>{item.countLabel}</span>
                </span>
                <span className={`${styles.toggle} ${hasChildren ? "" : styles.emptyToggle}`} aria-hidden="true" />
              </button>
              {expanded ? (
                <div className={styles.children} id={panelId} role="region" aria-labelledby={triggerId}>
                  {item.children?.map((child) => (
                    <button
                      type="button"
                      key={child.id}
                      className={`${styles.button} ${styles.secondary} ${child.active ? styles.active : ""}`}
                      aria-pressed={child.active}
                      onClick={child.onSelect}
                    >
                      <span className={styles.label}>
                        {child.label}<span className={styles.count}>{child.countLabel}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
