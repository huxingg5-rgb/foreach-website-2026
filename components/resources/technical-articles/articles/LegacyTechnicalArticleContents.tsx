"use client";

import { useEffect, useState } from "react";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { rplArticleUi } from "@/data/resources/technical-articles/rpl-selection-locales/ui";
import editorial from "./RplSelectionArticle.module.css";
import styles from "./TechnicalArticleBody.module.css";

type Entry = { id: string; label: string; numbered: boolean };

/** Optional navigation enhancement. The full original article is server rendered. */
export default function LegacyTechnicalArticleContents({ articleId, locale }: { articleId: string; locale: TechnicalArticleLocale }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const root = document.getElementById(`${articleId}-article`);
    if (!root) return;
    const headings = [...root.querySelectorAll<HTMLHeadingElement>("[data-article-body] h2")];
    const next = headings.map((heading, index) => {
      const label = heading.textContent?.trim() ?? "";
      const numbered = /^(?:\d+[.、．)）\s]|[一二三四五六七八九十]+[、．.])/.test(label);
      // Existing anchors and all heading text remain untouched.
      if (!heading.id) {
        const base = `${articleId}-section-${index + 1}`;
        let id = base, suffix = 1;
        while (document.getElementById(id)) id = `${base}-${suffix++}`;
        heading.id = id;
      }
      if (!numbered) heading.dataset.sectionNumber = String(index + 1).padStart(2, "0");
      return { id: heading.id, label, numbered };
    });
    const initialFrame = requestAnimationFrame(() => setEntries(next));
    let frame = 0;
    function updateActive() {
      frame = 0;
      const threshold = (parseFloat(getComputedStyle(root!).getPropertyValue("--site-header-height")) || 90) + 48;
      let id = headings[0]?.id ?? "";
      for (const heading of headings) if (heading.getBoundingClientRect().top <= threshold) id = heading.id;
      setActiveId(id);
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(updateActive); }
    function onHashChange() {
      let id = window.location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* An invalid fragment must not disable navigation. */ }
      const target = document.getElementById(id);
      if (target && root?.contains(target)) target.scrollIntoView({ block: "start" });
      onScroll();
    }
    onHashChange();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [articleId, locale]);
  const label = rplArticleUi[locale].contents;
  const links = entries.map((entry, index) => <a key={entry.id} href={`#${entry.id}`} aria-current={entry.id === activeId ? "location" : undefined}>
    {!entry.numbered && <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}{entry.label}
  </a>);
  return <div className={editorial.toc} data-legacy-toc>
    <nav className={styles.desktopToc} aria-label={label}>
      <p className={editorial.tocLabel}>{label}</p>{links}
    </nav>
    <details className={styles.mobileToc}>
      <summary>{label}</summary><nav aria-label={label}>{links}</nav>
    </details>
  </div>;
}
