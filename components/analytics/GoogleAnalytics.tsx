"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { flushPendingAnalyticsEvents, getAnalyticsPageUrl } from "@/lib/analytics/track-event";
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

    if (pageViewTimerRef.current !== null) {
      window.clearTimeout(pageViewTimerRef.current);
      pageViewTimerRef.current = null;
    }

    const pageLocation = getAnalyticsPageUrl(window.location.href);
    if (previousPageRef.current === pageLocation) return;

    pageViewTimerRef.current = window.setTimeout(() => {
      pageViewTimerRef.current = null;

      if (
        typeof window.gtag !== "function" ||
        previousPageRef.current === pageLocation
      ) {
        return;
      }

      const pageReferrer = previousPageRef.current || getAnalyticsPageUrl(document.referrer);
      previousPageRef.current = pageLocation;
      window.gtag("config", measurementId, {
        update: true,
        send_page_view: false,
        page_location: pageLocation,
        page_referrer: pageReferrer,
      });
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: pageLocation,
        page_referrer: pageReferrer,
        page_path: new URL(pageLocation).pathname,
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
      page_location: getAnalyticsPageUrl(window.location.href),
      page_referrer: getAnalyticsPageUrl(document.referrer),
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

    window.addEventListener(COOKIE_CONSENT_EVENT_NAME, handleConsentUpdated);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT_NAME, handleConsentUpdated);

      if (pageViewTimerRef.current !== null) {
        window.clearTimeout(pageViewTimerRef.current);
      }
    };
  }, [configureAnalytics]);

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
