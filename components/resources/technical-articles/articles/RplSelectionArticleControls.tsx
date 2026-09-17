"use client";

import { useEffect, useState } from "react";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import { rplArticleUi } from "@/data/resources/technical-articles/rpl-selection-locales/ui";
import styles from "./RplSelectionArticle.module.css";

export function ArticleShare({ title, locale }: { title: string; locale: TechnicalArticleLocale }) {
  const ui = rplArticleUi[locale];
  const [feedback, setFeedback] = useState("");
  async function share(platform: "facebook" | "linkedin" | "x" | "copy") {
    if (window.location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)) {
      setFeedback(ui.previewNotice);
      return;
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
    const url = canonical || `${window.location.origin}${window.location.pathname}`;
    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setFeedback(ui.copied);
      } catch {
        setFeedback(ui.copyFailed);
      }
      return;
    }
    const encoded = encodeURIComponent(url);
    const destinations = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      x: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`,
    };
    window.open(destinations[platform], "_blank", "noopener,noreferrer");
  }
  return <>
    <div className={styles.share} aria-label={ui.share}>
      <button className={styles.shareButton} type="button" aria-label={ui.shareLabels.facebook} onClick={() => share("facebook")}><span className={styles.facebook} aria-hidden="true">f</span></button>
      <button className={styles.shareButton} type="button" aria-label={ui.shareLabels.linkedin} onClick={() => share("linkedin")}><span className={styles.linkedin} aria-hidden="true">in</span></button>
      <button className={styles.shareButton} type="button" aria-label={ui.shareLabels.x} onClick={() => share("x")}><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.3-9.5L.8 2h6.5l4.5 6.6L18.9 2ZM17.8 20h1.7L6.3 3.9H4.5L17.8 20Z" /></svg></button>
      <button className={styles.shareButton} type="button" aria-label={ui.shareLabels.copy} onClick={() => share("copy")}><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-5.7-5.7l4-4a4 4 0 0 1 5.7 0m2 0 1-1a4 4 0 0 1 5.7 5.7l-4 4a4 4 0 0 1-5.7 0" transform="translate(2 0)" /></svg></button>
    </div>
    <p className={styles.shareFeedback} role="status" aria-live="polite" hidden={!feedback}>{feedback}</p>
  </>;
}

// Progressive enhancement only: article text, navigation and FAQ work without JavaScript.
export function ArticleEnhancements() {
  useEffect(() => {
    const root = document.getElementById("rpl-selection-article");
    if (!root) return;
    const sections = [...root.querySelectorAll<HTMLElement>("[data-article-body] > section")];
    const links = [...root.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")];
    let frame = 0;
    function updateActive() {
      frame = 0;
      const threshold = (parseFloat(getComputedStyle(root!).getPropertyValue("--site-header-height")) || 90) + 48;
      let active = sections[0]?.id;
      for (const section of sections) if (section.getBoundingClientRect().top <= threshold) active = section.id;
      links.forEach(link => {
        if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(updateActive); }
    updateActive();
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
