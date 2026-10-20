"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { YANDEX_METRICA_ID } from "@/lib/analytics/yandex-config";
import {
  markMetricaLoaded,
  prepareMetrica,
  startMetrica,
  stopMetrica,
  trackMetricaPageView,
} from "@/lib/analytics/yandex-metrica";
import { COOKIE_CONSENT_EVENT_NAME, readCookieConsent } from "@/lib/privacy/cookie-consent";

export default function YandexMetrica() {
  const pathname = usePathname();
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    if (!YANDEX_METRICA_ID) return;
    let disposed = false;
    function synchronizeConsent() {
      if (disposed) return;
      if (readCookieConsent()?.analytics === true) {
        prepareMetrica();
        setLoadScript(true);
        startMetrica();
      } else {
        stopMetrica();
      }
    }
    // Do not render a third-party script on the server or before reading consent.
    queueMicrotask(synchronizeConsent);
    window.addEventListener(COOKIE_CONSENT_EVENT_NAME, synchronizeConsent);
    return () => {
      disposed = true;
      window.removeEventListener(COOKIE_CONSENT_EVENT_NAME, synchronizeConsent);
      stopMetrica();
    };
  }, []);

  useEffect(() => {
    // Let the route commit its title before recording the view.
    const timer = window.setTimeout(trackMetricaPageView, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!YANDEX_METRICA_ID || !loadScript) return null;
  return (
    <Script
      id="foreach-yandex-metrica"
      src={`https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRICA_ID}`}
      strategy="afterInteractive"
      onReady={markMetricaLoaded}
      onError={stopMetrica}
    />
  );
}
