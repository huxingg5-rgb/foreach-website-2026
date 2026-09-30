"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ApplicationGuideNavigation.module.css";

export type ApplicationGuideNavigationItem = {
  label: string;
  href: string;
};

export type ApplicationGuideNavigationGroup = {
  id: string;
  label: string;
  overview: ApplicationGuideNavigationItem;
  children: readonly ApplicationGuideNavigationItem[];
};

type ApplicationGuideNavigationProps = {
  id: string;
  ariaLabel: string;
  overview: ApplicationGuideNavigationItem;
  groups: readonly ApplicationGuideNavigationGroup[];
  currentHref: string;
  mobileTitle: string;
  mobileMeta?: string;
  drawerEyebrow: string;
  drawerTitle: string;
  browseLabel?: string;
  closeLabel?: string;
};

function Chevron({ className }: { className?: string }) {
  return <span className={className} aria-hidden="true" />;
}

function initialExpandedGroups(groups: readonly ApplicationGuideNavigationGroup[], currentHref: string) {
  return Object.fromEntries(groups.map((group) => [
    group.id,
    group.overview.href === currentHref || group.children.some((entry) => entry.href === currentHref),
  ]));
}

/**
 * One semantic navigation tree for desktop and mobile. Next.js prerenders every
 * real link into the initial HTML; client state only controls the mobile drawer
 * and group disclosure.
 */
export default function ApplicationGuideNavigation({
  id,
  ariaLabel,
  overview,
  groups,
  currentHref,
  mobileTitle,
  mobileMeta,
  drawerEyebrow,
  drawerTitle,
  browseLabel = "Browse",
  closeLabel = "Close application guides",
}: ApplicationGuideNavigationProps) {
  const panelId = `${id}-panel`;
  const panelTitleId = `${id}-panel-title`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => initialExpandedGroups(groups, currentHref),
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 960px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false);
    };
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  const closeDrawer = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className={styles.navigationRoot} id={id} data-open={open ? "true" : "false"}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.mobileTrigger}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className={styles.mobileTriggerCopy}>
          <strong>{mobileTitle}</strong>
          {mobileMeta ? <span>{mobileMeta}</span> : null}
        </span>
        <span className={styles.mobileTriggerAction}>
          {browseLabel}
          <Chevron className={styles.forwardChevron} />
        </span>
      </button>

      <div className={styles.drawerLayer}>
        <button
          type="button"
          className={styles.drawerBackdrop}
          aria-label={closeLabel}
          tabIndex={-1}
          onClick={() => closeDrawer(true)}
        />

        <section
          ref={panelRef}
          className={styles.drawerPanel}
          id={panelId}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-labelledby={panelTitleId}
          tabIndex={-1}
        >
          <header className={styles.mobileHeader}>
            <div>
              <p>{drawerEyebrow}</p>
              <h2 id={panelTitleId}>{drawerTitle}</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              className={styles.closeButton}
              aria-label={closeLabel}
              onClick={() => closeDrawer(true)}
            >
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

          <nav
            aria-label={ariaLabel}
            className={styles.documentNavigation}
            onClickCapture={(event) => {
              if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
            }}
          >
            <Link
              href={overview.href}
              prefetch={false}
              className={styles.navOverview}
              aria-current={currentHref === overview.href ? "page" : undefined}
            >
              <span>{overview.label}</span>
            </Link>

            {groups.map((group) => {
              const branchActive = group.children.some((entry) => entry.href === currentHref);
              const expanded = expandedGroups[group.id] ?? false;
              const childrenId = `${id}-${group.id}-children`;

              return (
                <div key={group.id} className={styles.navGroup} data-expanded={expanded ? "true" : "false"}>
                  <div className={styles.navParentRow}>
                    <Link
                      href={group.overview.href}
                      prefetch={false}
                      className={`${styles.navParent}${branchActive ? ` ${styles.branchActive}` : ""}`}
                      aria-current={currentHref === group.overview.href ? "page" : undefined}
                    >
                      <span>{group.label}</span>
                    </Link>
                    {group.children.length > 0 ? <button
                      type="button"
                      className={styles.mobileGroupToggle}
                      aria-controls={childrenId}
                      aria-expanded={expanded}
                      aria-label={`${browseLabel} ${group.label}`}
                      onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !expanded }))}
                    >
                      <Chevron className={styles.groupChevron} />
                    </button> : null}
                  </div>

                  {group.children.length > 0 ? <div className={styles.navChildren} id={childrenId} aria-label={`${group.label} tasks`}>
                    {group.children.map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        prefetch={false}
                        className={styles.navChild}
                        aria-current={entry.href === currentHref ? "page" : undefined}
                      >
                        <span>{entry.label}</span>
                      </Link>
                    ))}
                  </div> : null}
                </div>
              );
            })}
          </nav>
        </section>
      </div>
    </div>
  );
}
