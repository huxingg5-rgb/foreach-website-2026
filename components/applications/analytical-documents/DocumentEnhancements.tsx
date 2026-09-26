"use client";

import { useEffect } from "react";

/** Progressive enhancement only: the article, navigation and references are server HTML. */
export default function DocumentEnhancements({ rootId, documentSlug }: { rootId: string; documentSlug: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    let scrollFrame = 0;
    let referenceFrame = 0;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-document-section]"));
    const outlineLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-outline-link]"));

    const updateOutline = () => {
      scrollFrame = 0;
      const headerHeight = Number.parseFloat(getComputedStyle(root).getPropertyValue("--site-header-height")) || 82;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= headerHeight + 48) current = section.id;
      }
      for (const link of outlineLinks) {
        if (link.dataset.outlineLink === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const scheduleOutline = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateOutline);
    };

    const showReference = (hash: string, smooth: boolean) => {
      let id: string;
      try { id = decodeURIComponent(hash.replace(/^#/, "")); } catch { return false; }
      const target = document.getElementById(id);
      if (!target || !root.contains(target) || !target.hasAttribute("data-reference-item")) return false;
      const disclosure = target.closest<HTMLDetailsElement>("details[data-reference-disclosure]");
      if (!disclosure) return false;
      disclosure.open = true;
      window.cancelAnimationFrame(referenceFrame);
      referenceFrame = window.requestAnimationFrame(() => {
        target.focus({ preventScroll: true });
        target.scrollIntoView({
          block: "start",
          behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto",
        });
      });
      return true;
    };
    const onReferenceClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[data-application-reference]");
      if (!link || !root.contains(link) || !showReference(link.hash, true)) return;
      event.preventDefault();
      if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
    };
    const onHashChange = () => { showReference(window.location.hash, false); };

    root.addEventListener("click", onReferenceClick);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", scheduleOutline, { passive: true });
    window.addEventListener("resize", scheduleOutline);
    showReference(window.location.hash, false);
    updateOutline();

    return () => {
      root.removeEventListener("click", onReferenceClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", scheduleOutline);
      window.removeEventListener("resize", scheduleOutline);
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(referenceFrame);
    };
  }, [rootId, documentSlug]);

  return null;
}
