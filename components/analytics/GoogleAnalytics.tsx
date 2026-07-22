"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  COOKIE_CONSENT_EVENT_NAME,
  readCookieConsent,
  type CookieConsentState,
} from "@/lib/privacy/cookie-consent";

import {
  flushPendingAnalyticsEvents,
} from "@/lib/analytics/track-event";

type GtagFunction = (
  command: string,
  targetOrAction: string | Date,
  parameters?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  const [analyticsAllowed, setAnalyticsAllowed] =
    useState(false);
  const [tagReady, setTagReady] = useState(false);

  const configuredRef = useRef(false);
  const previousPageRef = useRef("");

  useEffect(() => {
    const storedConsent = readCookieConsent();

    setAnalyticsAllowed(storedConsent?.analytics === true);

    function handleConsentUpdated(event: Event) {
      const customEvent =
        event as CustomEvent<CookieConsentState>;

      setAnalyticsAllowed(
        customEvent.detail?.analytics === true,
      );
    }

    window.addEventListener(
      COOKIE_CONSENT_EVENT_NAME,
      handleConsentUpdated,
    );

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_EVENT_NAME,
        handleConsentUpdated,
      );
    };
  }, []);

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    const disableKey = `ga-disable-${measurementId}`;

    // 使用 Reflect.set 写入 GA4 的动态禁用标识，
    // 避免 TypeScript 要求 Window 提供字符串索引签名。
    Reflect.set(
      window,
      disableKey,
      !analyticsAllowed,
    );

    if (!analyticsAllowed) {
      configuredRef.current = false;
      previousPageRef.current = "";

      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }

      return;
    }

    if (typeof window.gtag === "function") {
      setTagReady(true);
    }
  }, [analyticsAllowed]);

  useEffect(() => {
    if (
      !analyticsAllowed ||
      !tagReady ||
      !measurementId ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    if (!configuredRef.current) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });

      window.gtag("config", measurementId, {
        send_page_view: false,
      });

      configuredRef.current = true;
    }

    flushPendingAnalyticsEvents();

    const pagePath =
      pathname +
      window.location.search +
      window.location.hash;

    if (previousPageRef.current === pagePath) {
      return;
    }

    previousPageRef.current = pagePath;

    const timer = window.setTimeout(() => {
      if (typeof window.gtag !== "function") {
        return;
      }

      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [analyticsAllowed, pathname, tagReady]);

  if (!analyticsAllowed || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        id="foreach-google-analytics-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
          };
          window.gtag('js', new Date());
        `}
      </Script>

      <Script
        id="foreach-google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onReady={() => setTagReady(true)}
      />
    </>
  );
}