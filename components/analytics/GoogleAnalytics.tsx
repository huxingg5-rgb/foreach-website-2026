"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { flushPendingAnalyticsEvents } from "@/lib/analytics/track-event";
import {
  COOKIE_CONSENT_EVENT_NAME,
  readCookieConsent,
  type CookieConsentState,
} from "@/lib/privacy/cookie-consent";

type GtagFunction = (
  command: string,
  targetOrAction: string | Date,
  parameters?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __foreachGaReady?: boolean;
  }
}

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

const AD_STORAGE_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

function updateConsentMode(analyticsGranted: boolean) {
  if (typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: analyticsGranted ? "granted" : "denied",
    ...AD_STORAGE_DENIED,
  });
}

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const configuredRef = useRef(false);
  const consentLoadedRef = useRef(false);
  const analyticsGrantedRef = useRef(false);
  const tagReadyRef = useRef(false);
  const previousPageRef = useRef("");
  const pageViewTimerRef = useRef<number | null>(null);

  const schedulePageView = useCallback(() => {
    if (
      !measurementId ||
      !configuredRef.current ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (previousPageRef.current === pagePath) return;

    if (pageViewTimerRef.current !== null) {
      window.clearTimeout(pageViewTimerRef.current);
    }

    pageViewTimerRef.current = window.setTimeout(() => {
      pageViewTimerRef.current = null;

      if (
        typeof window.gtag !== "function" ||
        previousPageRef.current === pagePath
      ) {
        return;
      }

      previousPageRef.current = pagePath;
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }, 0);
  }, []);

  const configureAnalytics = useCallback(() => {
    if (
      !measurementId ||
      !consentLoadedRef.current ||
      !tagReadyRef.current ||
      configuredRef.current ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    // 顺序固定为：default denied（layout）→ 已存选择 update → config → 业务事件。
    updateConsentMode(analyticsGrantedRef.current);
    window.gtag("config", measurementId, {
      send_page_view: false,
    });

    configuredRef.current = true;
    window.__foreachGaReady = true;
    flushPendingAnalyticsEvents();
    schedulePageView();
  }, [schedulePageView]);

  useEffect(() => {
    const storedConsent = readCookieConsent();
    const isGranted = storedConsent?.analytics === true;

    updateConsentMode(isGranted);
    analyticsGrantedRef.current = isGranted;
    consentLoadedRef.current = true;
    configureAnalytics();

    function handleConsentUpdated(event: Event) {
      const customEvent = event as CustomEvent<CookieConsentState>;
      const nextGranted = customEvent.detail?.analytics === true;

      // 当前点击周期内同步写入 Consent Mode，不等待 React 下一次渲染。
      updateConsentMode(nextGranted);
      analyticsGrantedRef.current = nextGranted;
    }

    function handleHashChange() {
      schedulePageView();
    }

    window.addEventListener(COOKIE_CONSENT_EVENT_NAME, handleConsentUpdated);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT_NAME, handleConsentUpdated);
      window.removeEventListener("hashchange", handleHashChange);

      if (pageViewTimerRef.current !== null) {
        window.clearTimeout(pageViewTimerRef.current);
      }
    };
  }, [configureAnalytics, schedulePageView]);

  useEffect(() => {
    schedulePageView();
  }, [pathname, schedulePageView, search]);

  if (!measurementId) return null;

  return (
    <Script
      id="foreach-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      onReady={() => {
        tagReadyRef.current = true;
        configureAnalytics();
      }}
    />
  );
}

export default function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}
