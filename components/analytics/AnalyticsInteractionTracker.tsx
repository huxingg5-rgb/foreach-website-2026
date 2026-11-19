"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  getAnalyticsProductId,
  getAnalyticsSourceSection,
  trackContactClick,
  trackInteraction,
  trackProductSelect,
  trackContentSelect,
  trackResourceDownload,
  trackResourceView,
} from "@/lib/analytics/track-event";
import { getLocaleFromPathname } from "@/lib/i18n";

const RESOURCE_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "csv",
  "zip",
  "rar",
  "7z",
  "dwg",
  "dxf",
  "step",
  "stp",
  "glb",
  "gltf",
  "mp4",
]);

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getResourceType(pathname: string) {
  const path = pathname.toLowerCase();

  if (path.includes("drawing") || path.includes("2d-")) return "2d_drawing";
  if (path.includes("datasheet") || path.includes("spec")) return "datasheet";
  if (path.includes("model") || path.endsWith(".glb") || path.endsWith(".gltf")) {
    return "3d_model";
  }
  if (path.includes("guide") || path.endsWith(".mp4")) return "guide";
  return "technical_resource";
}

function getContentType(pathname: string) {
  if (/\/(?:applications)(?:\/|$)/.test(pathname)) return "application";
  if (/\/resources\/news(?:\/|$)/.test(pathname)) return "news";
  if (/\/resources\/technical-articles(?:\/|$)/.test(pathname)) {
    return "technical_article";
  }
  if (/\/resources(?:\/|$)/.test(pathname)) return "resource_center";
  return "";
}

function getStablePathId(pathname: string) {
  return safeDecode(pathname)
    .split("/")
    .filter(Boolean)
    .join(":")
    .toLowerCase();
}

function getStableResourceId(pathname: string) {
  const normalizedPath = safeDecode(pathname).trim().toLowerCase();
  let hash = 2166136261;

  for (let index = 0; index < normalizedPath.length; index += 1) {
    hash ^= normalizedPath.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `resource_${(hash >>> 0).toString(36)}`;
}

type ResourceAction = "view" | "download";

export default function AnalyticsInteractionTracker() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const playedVideos = useRef(new WeakSet<HTMLVideoElement>());

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest('[data-analytics-skip="true"]')) return;

      const marked = target.closest<HTMLElement>("[data-analytics-product-id], [data-analytics-hero-action]");
      if (marked && !marked.matches(":disabled, [aria-disabled='true']")) {
        const sourceSection = getAnalyticsSourceSection(marked);
        if (marked.dataset.analyticsHeroAction) {
          trackInteraction("home_hero_select", {
            locale, sourceSection, action: marked.dataset.analyticsHeroAction,
          });
        }
        if (marked.dataset.analyticsProductId) {
          trackProductSelect({
            locale, sourceSection, listId: sourceSection,
            productId: marked.dataset.analyticsProductId,
            productName: marked.dataset.analyticsProductName,
          });
        }
      }

      const resourceActionElement =
        target.closest<HTMLElement>("[data-analytics-resource-action]");
      const explicitResourceAction =
        resourceActionElement?.dataset.analyticsResourceAction;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");

      if (!anchor && !resourceActionElement) return;
      if (anchor?.getAttribute("aria-disabled") === "true") return;

      const rawHref = anchor?.getAttribute("href")?.trim() ?? "";
      if ((!rawHref || rawHref === "#") && !resourceActionElement) return;

      const sourceElement = resourceActionElement ?? anchor;
      if (!sourceElement) return;

      const sourceSection = getAnalyticsSourceSection(sourceElement);
      const lowerHref = rawHref.toLowerCase();

      if (lowerHref.startsWith("mailto:")) {
        trackContactClick({ contactChannel: "email", sourceSection, locale });
        return;
      }

      if (lowerHref.startsWith("tel:")) {
        trackContactClick({ contactChannel: "phone", sourceSection, locale });
        return;
      }

      if (/wa\.me|whatsapp/.test(lowerHref)) {
        trackContactClick({ contactChannel: "whatsapp", sourceSection, locale });
        return;
      }

      if (/wechat|weixin|微信/.test(lowerHref)) {
        trackContactClick({ contactChannel: "wechat", sourceSection, locale });
        return;
      }

      let url: URL | null = null;
      if (rawHref && rawHref !== "#") {
        try {
          url = new URL(rawHref, window.location.href);
        } catch {
          return;
        }
      }

      const normalizedPath = (url?.pathname ?? "").replace(
        /^\/(?:en|es|fr|ko|ru)(?=\/|$)/,
        "",
      );
      const normalizedCurrentPath = window.location.pathname.replace(
        /^\/(?:en|es|fr|ko|ru)(?=\/|$)/,
        "",
      );

      if (anchor && /^\/contact(?:\/|$)/.test(normalizedPath)) {
        trackContactClick({
          contactChannel: /^\/contact\/distributor(?:\/|$)/.test(normalizedPath)
            ? "distributor"
            : "contact_form",
          sourceSection,
          locale,
        });
        return;
      }

      const fileName = safeDecode(
        url?.pathname.split("/").filter(Boolean).at(-1) ?? "",
      );
      const fileType = fileName.includes(".")
        ? fileName.split(".").at(-1)?.toLowerCase() ?? ""
        : "";

      const hasExplicitResourceAction =
        explicitResourceAction === "view" || explicitResourceAction === "download";
      const isResourceLink =
        hasExplicitResourceAction ||
        anchor?.hasAttribute("download") === true ||
        RESOURCE_EXTENSIONS.has(fileType);

      if (isResourceLink) {
        const resourceAction: ResourceAction =
          explicitResourceAction === "download" ||
          (!hasExplicitResourceAction && anchor?.hasAttribute("download") === true)
            ? "download"
            : "view";
        const resourcePath = url?.pathname ?? "";
        const resourceInput = {
          resourceId:
            resourceActionElement?.dataset.analyticsResourceId ||
            getStableResourceId(resourcePath),
          resourceType:
            resourceActionElement?.dataset.analyticsResourceType ||
            getResourceType(resourcePath),
          fileType:
            resourceActionElement?.dataset.analyticsResourceFileType ||
            fileType ||
            "unknown",
          sourceSection,
          locale,
        };

        if (resourceAction === "download") {
          trackResourceDownload(resourceInput);
        } else {
          trackResourceView(resourceInput);
        }
        return;
      }

      if (!marked?.dataset.analyticsProductId && anchor?.closest("main") &&
          url?.origin === window.location.origin && normalizedPath.startsWith("/products/") &&
          /^\/(?:applications|resources\/(?:technical-articles|installation-guide))\//.test(normalizedCurrentPath)) {
        trackProductSelect({
          locale, sourceSection, listId: sourceSection,
          productId: getAnalyticsProductId(normalizedPath),
        });
      }

      const contentType = getContentType(normalizedPath);
      if (!contentType || normalizedPath === normalizedCurrentPath) return;

      trackContentSelect({
        contentType,
        contentId: getStablePathId(normalizedPath),
        contentName: anchor
          ?.closest<HTMLElement>("[data-analytics-content-name]")
          ?.dataset.analyticsContentName?.trim()
          .slice(0, 100),
        sourceSection,
        locale,
      });
    }

    function handleVideoPlaying(event: Event) {
      const video = event.target;
      if (!(video instanceof HTMLVideoElement) || !video.dataset.analyticsVideoId ||
          playedVideos.current.has(video)) return;
      playedVideos.current.add(video);
      trackInteraction("video_play", {
        locale, sourceSection: getAnalyticsSourceSection(video),
        resourceId: video.dataset.analyticsVideoId, action: "html5",
      });
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("playing", handleVideoPlaying, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("playing", handleVideoPlaying, true);
    };
  }, [locale, pathname]);

  return null;
}
