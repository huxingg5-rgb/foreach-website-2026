"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  trackContactClick,
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

function getSourceSection(element: Element) {
  const explicitSection = element.closest<HTMLElement>("[data-analytics-section]")
    ?.dataset.analyticsSection;

  if (explicitSection) return explicitSection;
  if (element.closest("header")) return "site_header";
  if (element.closest("footer")) return "site_footer";
  if (element.closest("[class*='product']")) return "product_content";
  if (element.closest("[class*='resource']")) return "resource_content";
  if (element.closest("[class*='contact']")) return "contact_content";
  return "page_content";
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

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest('[data-analytics-skip="true"]')) return;

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

      const sourceSection = getSourceSection(sourceElement);
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
          contactChannel: "contact_form",
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

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [locale, pathname]);

  return null;
}
